#!/usr/bin/env python3
"""
Script comparateur — scrape banques, extraction Gemini, upsert Supabase, revalidation ISR.

ÉTAPES: 1) Charger banques (Supabase/fallback) 2) Scrape selon source_type 3) Gemini + Pydantic
        4) Upsert bank_rates + rates_history + scraping_logs 5) Délai 8–15s 6) POST revalidate.

SCRAPING / CONFORMITÉ :
  - Les pages web des banques sont récupérées via l’API Firecrawl (api.firecrawl.dev).
    Les requêtes HTTP vers les sites des banques sont faites par l’infrastructure Firecrawl
    (leurs serveurs, leur politique de respect des sites). Aucune requête directe depuis
    ce script vers les sites bancaires pour le scraping des pages.
  - Les PDFs de tarifs (liens fournis par la table banks) sont téléchargés via une seule
    requête GET avec un User-Agent identifiant clairement le projet (Kompar, comparateur
    bancaire). C’est à l’outil (Firecrawl, etc.) et à la configuration des banques
    (robots.txt, CGU) de gérer les contraintes d’accès.
"""
from __future__ import annotations

import json
import os
import random
import time
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Literal, Optional

import requests
from dotenv import load_dotenv
from pydantic import BaseModel
from tenacity import retry, stop_after_attempt, wait_exponential

# Charger .env (racine projet prioritaire si on lance depuis scripts/)
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv()

# --- Config (toutes les clés via os.getenv) ---
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")
LLAMAPARSE_API_KEY = os.getenv("LLAMAPARSE_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
MY_EMAIL = os.getenv("MY_EMAIL")
REVALIDATION_SECRET = os.getenv("REVALIDATION_SECRET")
VERCEL_REVALIDATE_URL = os.getenv("VERCEL_REVALIDATE_URL")

# Fallback liste fixe de banques si Supabase inaccessible
BANKS_FALLBACK = [
    {
        "id": "fallback-1",
        "name": "BNP Paribas Algérie",
        "slug": "bnp-paribas-algerie",
        "source_type": "direct",
        "website_url": "https://www.bnpparibas.dz",
        "tarif_pdf_url": None,
    },
    {
        "id": "fallback-2",
        "name": "CPA",
        "slug": "cpa",
        "source_type": "direct",
        "website_url": "https://www.cpa.dz",
        "tarif_pdf_url": None,
    },
]


# --- Schéma BankData (informations qualitatives) — aucune validation numérique ---
class BankData(BaseModel):
    """Données extraites par Gemini, validées par Pydantic. Texte libre ou listes, jamais inventer."""

    banque: str
    type_banque: Optional[str] = None  # publique | privee | islamique | mixte
    cartes: Optional[list[str]] = None  # ['Dahabia', 'Visa Classic', 'Mastercard Gold']
    app_mobile: Optional[str] = None  # 'Oui - notee 3.2/5' ou 'Non'
    virements_internationaux: Optional[str] = None  # 'Oui' | 'Non' | 'Partiel'
    compte_devises: Optional[str] = None
    finance_islamique: Optional[bool] = None
    frais_tenue_compte: Optional[str] = None  # '500 DA/an' ou 'Gratuit'
    frais_retrait_dam: Optional[str] = None
    frais_virement: Optional[str] = None
    credit_immobilier: Optional[str] = None
    credit_auto: Optional[str] = None
    conditions_ouverture: Optional[str] = None
    depot_minimum: Optional[str] = None
    nombre_agences: Optional[str] = None  # '80 agences, 48 wilayas'
    chequier: Optional[str] = None  # 'Oui' | 'Non' | 'Sur demande'
    points_forts: Optional[list[str]] = None  # max 3
    points_faibles: Optional[list[str]] = None  # max 3
    source_url: Optional[str] = None
    # Notes des stores (récupérées via iTunes API + Google Play scraper)
    app_rating_apple: Optional[float] = None  # 0–5
    app_rating_google: Optional[float] = None  # 0–5
    app_reviews_count: Optional[int] = None  # nombre d'avis (Apple + Google)


# --- Fichier de mapping slug banque -> package Play Store / terme recherche App Store ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_STORE_MAPPING_PATH = os.path.join(SCRIPT_DIR, "app_store_mapping.json")


def load_app_store_mapping() -> dict[str, Any]:
    """Charge le mapping slug -> { play_store_id, app_store_id } (IDs officiels stores)."""
    if not os.path.exists(APP_STORE_MAPPING_PATH):
        return {}
    try:
        with open(APP_STORE_MAPPING_PATH, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def fetch_apple_rating_by_id(app_store_id: str) -> tuple[Optional[float], int]:
    """Récupère note + nombre d'avis App Store (iTunes Lookup API). Retourne (rating, userRatingCount)."""
    if not app_store_id or not str(app_store_id).isdigit():
        return None, 0
    try:
        r = requests.get(
            f"https://itunes.apple.com/lookup?id={app_store_id}",
            timeout=10,
        )
        r.raise_for_status()
        data = r.json()
        results = data.get("results", [])
        if results:
            first = results[0]
            rating = first.get("averageUserRating")
            count = first.get("userRatingCount") or 0
            try:
                count = int(count)
            except (TypeError, ValueError):
                count = 0
            return (float(rating) if rating is not None else None, count)
        return None, 0
    except Exception:
        return None, 0


def fetch_google_rating(package: str) -> tuple[Optional[float], int]:
    """Récupère note + nombre d'avis Google Play. Retourne (score, reviews_count)."""
    try:
        from google_play_scraper import app as gp_app
        result = gp_app(package, lang="fr", country="dz")
        score = result.get("score")
        count = result.get("reviews") or result.get("ratings") or 0
        try:
            count = int(count)
        except (TypeError, ValueError):
            count = 0
        return (float(score) if score is not None else None, count)
    except Exception:
        return None, 0


def fetch_app_ratings_for_bank(
    bank_slug: Optional[str],
    bank_name: str,
    mapping: dict[str, Any],
) -> tuple[Optional[float], Optional[float], int]:
    """Retourne (app_rating_apple, app_rating_google, app_reviews_count) pour une banque."""
    apple_rating: Optional[float] = None
    google_rating: Optional[float] = None
    reviews_count = 0
    entry = mapping.get(bank_slug) if bank_slug else None
    if not entry:
        slug_candidate = (bank_name or "").lower().replace(" ", "-").replace("'", "")
        for key, val in mapping.items():
            if key in slug_candidate or slug_candidate in key:
                entry = val
                break
    if entry:
        app_store_id = entry.get("app_store_id")
        if app_store_id and str(app_store_id).strip() and str(app_store_id).isdigit():
            apple_rating, ac = fetch_apple_rating_by_id(str(app_store_id))
            reviews_count += ac
        pkg = entry.get("play_store_id") or entry.get("play_store_package")
        if pkg:
            google_rating, gc = fetch_google_rating(pkg)
            reviews_count += gc
    return apple_rating, google_rating, reviews_count


# --- ÉTAPE 1 : Charger les banques actives depuis Supabase (table banks) ---
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def load_banks_from_supabase() -> list[dict[str, Any]]:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        return BANKS_FALLBACK
    try:
        r = requests.get(
            f"{SUPABASE_URL.rstrip('/')}/rest/v1/banks",
            headers={
                "apikey": SUPABASE_SERVICE_KEY,
                "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
                "Content-Type": "application/json",
            },
            params={"is_active": "eq.true"},
            timeout=15,
        )
        r.raise_for_status()
        data = r.json()
        return data if isinstance(data, list) else BANKS_FALLBACK
    except Exception:
        return BANKS_FALLBACK


# --- Firecrawl : scrape une URL ---
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def firecrawl_scrape(url: str) -> str:
    if not FIRECRAWL_API_KEY:
        raise ValueError("FIRECRAWL_API_KEY manquant")
    r = requests.post(
        "https://api.firecrawl.dev/v1/scrape",
        headers={"Authorization": f"Bearer {FIRECRAWL_API_KEY}", "Content-Type": "application/json"},
        json={"url": url, "formats": ["markdown"]},
        timeout=120,
    )
    r.raise_for_status()
    out = r.json()
    if not out.get("success"):
        raise RuntimeError(out.get("error", "Scrape failed"))
    data = out.get("data", {})
    return data.get("markdown") or data.get("content") or ""


# User-Agent pour les rares requêtes directes (ex. téléchargement PDF) : identifie le projet.
USER_AGENT = "KomparBot/1.0 (comparateur banques algériennes; +https://kompar-banque.dz)"

# --- LlamaParse : lire un PDF (URL) ---
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def llamaparse_pdf_from_url(pdf_url: str) -> str:
    if not LLAMAPARSE_API_KEY:
        raise ValueError("LLAMAPARSE_API_KEY manquant")
    # Télécharger le PDF (une seule requête GET, User-Agent transparent)
    resp = requests.get(
        pdf_url,
        timeout=60,
        headers={"User-Agent": USER_AGENT},
    )
    resp.raise_for_status()
    pdf_bytes = resp.content
    # Appel API LlamaParse (upload + parse)
    r = requests.post(
        "https://api.cloud.llamaindex.ai/api/parsing/upload",
        headers={"Authorization": f"Bearer {LLAMAPARSE_API_KEY}"},
        files={"file": ("doc.pdf", pdf_bytes, "application/pdf")},
        timeout=120,
    )
    if r.status_code != 200:
        raise RuntimeError(f"LlamaParse upload: {r.status_code} {r.text[:200]}")
    job = r.json()
    job_id = job.get("id")
    if not job_id:
        raise RuntimeError("LlamaParse: pas d'id job")
    # Poll result
    for _ in range(60):
        time.sleep(2)
        r2 = requests.get(
            f"https://api.cloud.llamaindex.ai/api/parsing/job/{job_id}",
            headers={"Authorization": f"Bearer {LLAMAPARSE_API_KEY}"},
            timeout=30,
        )
        r2.raise_for_status()
        data = r2.json()
        status = data.get("status", "").lower()
        if status == "completed":
            return data.get("parsed_document", {}).get("markdown", "") or data.get("markdown", "") or ""
        if status == "failed":
            raise RuntimeError(data.get("error", "LlamaParse job failed"))
    raise TimeoutError("LlamaParse timeout")


# --- Serper : 3 articles récents (requête = website_url ou nom banque) ---
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def serper_search(query: str, num: int = 3) -> list[str]:
    if not SERPER_API_KEY:
        raise ValueError("SERPER_API_KEY manquant")
    r = requests.post(
        "https://google.serper.dev/search",
        headers={"X-API-KEY": SERPER_API_KEY, "Content-Type": "application/json"},
        json={"q": query, "num": num},
        timeout=15,
    )
    r.raise_for_status()
    data = r.json()
    urls = []
    for o in data.get("organic", [])[:num]:
        u = o.get("link")
        if u:
            urls.append(u)
    return urls


# --- ÉTAPE 2 : Collecter le texte selon source_type ---
def collect_text_for_bank(bank: dict[str, Any]) -> str:
    source_type: Literal["direct", "serper"] = (bank.get("source_type") or "direct").lower()
    website_url = (bank.get("website_url") or "").strip()
    tarif_pdf_url = (bank.get("tarif_pdf_url") or "").strip() or None
    name = bank.get("name") or "Banque"

    parts: list[str] = []

    if source_type == "direct":
        with ThreadPoolExecutor(max_workers=2) as ex:
            futures = {}
            if website_url:
                futures["site"] = ex.submit(firecrawl_scrape, website_url)
            if tarif_pdf_url:
                futures["pdf"] = ex.submit(llamaparse_pdf_from_url, tarif_pdf_url)
            for key, fut in futures.items():
                try:
                    t = fut.result()
                    if key == "pdf" and t:
                        parts.append("\n\n--- PDF tarifs ---\n\n" + t)
                    elif key == "site":
                        parts.append(t)
                except Exception as e:
                    parts.append(f"[Erreur {key}: {e}]")
    elif source_type == "serper":
        query = website_url or name
        try:
            urls = serper_search(query, num=3)
            for u in urls:
                try:
                    parts.append(firecrawl_scrape(u))
                except Exception as e:
                    parts.append(f"[Erreur scrape {u}: {e}]")
        except Exception as e:
            parts.append(f"[Erreur Serper: {e}]")

    return "\n\n".join(p for p in parts if p).strip() or "[Aucun contenu récupéré]"


# --- ÉTAPE 3 : Gemini + validation Pydantic (prompt extraction qualitatif) ---
BANK_DATA_SCHEMA = """
{
  "banque": "string",
  "type_banque": "string | null (publique | privee | islamique | mixte)",
  "cartes": ["string"] | null,
  "app_mobile": "string | null",
  "virements_internationaux": "string | null (Oui | Non | Partiel)",
  "compte_devises": "string | null",
  "finance_islamique": "boolean | null",
  "frais_tenue_compte": "string | null",
  "frais_retrait_dam": "string | null",
  "frais_virement": "string | null",
  "credit_immobilier": "string | null",
  "credit_auto": "string | null",
  "conditions_ouverture": "string | null",
  "depot_minimum": "string | null",
  "nombre_agences": "string | null",
  "chequier": "string | null (Oui | Non | Sur demande)",
  "points_forts": ["string"] | null,
  "points_faibles": ["string"] | null,
  "source_url": "string | null"
}
"""

PROMPT_EXTRACTION = """
Tu es un expert bancaire algérien. Analyse ce contenu et extrais TOUTES les informations
qualitatives et pratiques sur cette banque. Sois exhaustif : plus les fiches sont détaillées, mieux c'est.

RÈGLES IMPORTANTES :
- Ne jamais généraliser une condition qui ne s'applique qu'à un seul produit. Ex. : si "salaire min 40 000 et CDI" ne concerne qu'une carte ou un type de compte, précise-le ("Pour la carte Gold : salaire min 40 000 DA, CDI. Compte courant : sans condition de salaire."). Ne pas écrire uniquement "CDI 40 000 DA" comme si ça s'appliquait à tout.
- Pour les frais (frais_tenue_compte, frais_retrait_dam, frais_virement) : extraire les montants en DA, les grilles par type de compte/carte si présentes, et "Gratuit" ou "Variable" si indiqué.
- Pour conditions_ouverture : détailler par type de compte ou de carte quand les exigences diffèrent (documents, dépôt min, délai, en ligne ou en agence). Si le contenu dit "selon le produit" ou "variable", l'indiquer.

À extraire en priorité (remplir au maximum, null seulement si vraiment absent du contenu) :
- Cartes : liste précise (Dahabia, CIB, Visa, Mastercard, prépayée, etc.)
- Application mobile : existence, note si mentionnée
- Virements internationaux : Oui / Non / Partiel, SWIFT si mentionné
- Finance islamique, compte devises
- Frais réels : tenue de compte (montant ou Gratuit), retrait DAB/DAM, virement (national/international si différent)
- Réseau : nombre d'agences, wilayas
- CONDITIONS D'OUVERTURE (conditions_ouverture + depot_minimum) : documents demandés, délai de création, en ligne ou agence, dépôt minimum, et surtout ÉLIGIBILITÉ PAR PRODUIT si les conditions diffèrent (ex. compte courant vs carte premium)
- Crédit immobilier, crédit auto : disponibilité et conditions si présentes
- Points forts et points faibles (max 3 chacun)

Retourne UNIQUEMENT un JSON valide selon ce schéma : {schema}
conditions_ouverture : texte structuré et détaillé, sans inventer. Si une info est absente : null.
CONTENU : {content}
"""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def gemini_extract(text: str, bank_name: str) -> BankData:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY manquant")
    prompt = PROMPT_EXTRACTION.format(
        schema=BANK_DATA_SCHEMA,
        content=text[:120000],
    )
    r = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}",
        json={
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"responseMimeType": "application/json"},
        },
        timeout=60,
    )
    r.raise_for_status()
    out = r.json()
    cand = out.get("candidates", [{}])[0]
    content = cand.get("content", {})
    parts = content.get("parts", [{}])
    raw = parts[0].get("text", "{}").strip()
    # Nettoyer éventuel markdown
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return BankData.model_validate_json(raw)


def send_resend_alert(subject: str, body: str) -> None:
    if not RESEND_API_KEY or not MY_EMAIL:
        return
    try:
        requests.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {RESEND_API_KEY}", "Content-Type": "application/json"},
            json={
                "from": "Comparateur <onboarding@resend.dev>",
                "to": [MY_EMAIL],
                "subject": subject,
                "text": body,
            },
            timeout=10,
        )
    except Exception:
        pass


# --- ÉTAPE 4 : Upsert bank_rates + rates_history + insert scraping_logs ---
def supabase_upsert_rates_and_log(
    bank_id: str,
    bank_name: str,
    data: BankData,
    log_status: Literal["OK", "ERREUR"],
    message_erreur: str | None,
) -> None:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        return
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
    }
    # Tous les champs BankData pour bank_rates / rates_history (adapter colonnes Supabase si besoin)
    payload = {
        "bank_id": bank_id,
        "banque": data.banque,
        "type_banque": data.type_banque,
        "cartes": data.cartes,
        "app_mobile": data.app_mobile,
        "virements_internationaux": data.virements_internationaux,
        "compte_devises": data.compte_devises,
        "finance_islamique": data.finance_islamique,
        "frais_tenue_compte": data.frais_tenue_compte,
        "frais_retrait_dam": data.frais_retrait_dam,
        "frais_virement": data.frais_virement,
        "credit_immobilier": data.credit_immobilier,
        "credit_auto": data.credit_auto,
        "conditions_ouverture": data.conditions_ouverture,
        "depot_minimum": data.depot_minimum,
        "nombre_agences": data.nombre_agences,
        "chequier": data.chequier,
        "points_forts": data.points_forts,
        "points_faibles": data.points_faibles,
        "source_url": data.source_url,
        "app_rating_apple": data.app_rating_apple,
        "app_rating_google": data.app_rating_google,
        "app_reviews_count": data.app_reviews_count,
        "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    try:
        requests.post(
            f"{SUPABASE_URL.rstrip('/')}/rest/v1/bank_rates",
            headers=headers,
            json=payload,
            timeout=10,
        )
        # rates_history : ta table attend (banque, infos JSONB, created_at)
        requests.post(
            f"{SUPABASE_URL.rstrip('/')}/rest/v1/rates_history",
            headers={**headers, "Prefer": "return=minimal"},
            json={"banque": data.banque, "infos": payload},
            timeout=10,
        )
    except Exception:
        pass
    try:
        requests.post(
            f"{SUPABASE_URL.rstrip('/')}/rest/v1/scraping_logs",
            headers={**headers, "Prefer": "return=minimal"},
            json={
                "bank_name": bank_name,
                "status": log_status,
                "error_message": message_erreur,
            },
            timeout=10,
        )
    except Exception:
        pass


# --- ÉTAPE 6 : Signal ISR Vercel ---
def trigger_revalidate() -> None:
    if not VERCEL_REVALIDATE_URL or not REVALIDATION_SECRET:
        return
    try:
        r = requests.post(
            VERCEL_REVALIDATE_URL,
            headers={"Authorization": f"Bearer {REVALIDATION_SECRET}"},
            timeout=15,
        )
        if r.status_code != 200:
            send_resend_alert(
                "[Comparateur] Revalidation ISR échouée",
                f"Status {r.status_code}\n{r.text[:500]}",
            )
    except Exception as e:
        send_resend_alert("[Comparateur] Revalidation ISR erreur", str(e))


# --- Main ---
def main() -> None:
    banks = load_banks_from_supabase()
    if not banks:
        send_resend_alert("[Comparateur] Aucune banque", "Supabase et fallback vides.")
        return

    app_mapping = load_app_store_mapping()

    for i, bank in enumerate(banks):
        bank_id = str(bank.get("id", ""))
        bank_name = bank.get("name") or "Inconnu"
        bank_slug = bank.get("slug") or None
        try:
            text = collect_text_for_bank(bank)
            data = gemini_extract(text, bank_name)
            # Récupération des notes App Store / Google Play (mapping par slug)
            apple_rating, google_rating, reviews_count = fetch_app_ratings_for_bank(
                bank_slug, bank_name, app_mapping
            )
            if apple_rating is not None:
                data.app_rating_apple = round(apple_rating, 1)
            if google_rating is not None:
                data.app_rating_google = round(google_rating, 1)
            if reviews_count > 0:
                data.app_reviews_count = reviews_count
            supabase_upsert_rates_and_log(bank_id, bank_name, data, "OK", None)
        except Exception as e:
            msg = str(e)[:500]
            supabase_upsert_rates_and_log(
                bank_id,
                bank_name,
                BankData(banque=bank_name),
                "ERREUR",
                msg,
            )
            send_resend_alert(f"[Comparateur] FAILED — {bank_name}", msg)

        if i < len(banks) - 1:
            delay = random.randint(8, 15)
            time.sleep(delay)

    trigger_revalidate()


if __name__ == "__main__":
    main()
