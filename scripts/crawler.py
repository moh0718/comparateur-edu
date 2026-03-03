#!/usr/bin/env python3
"""
Script crawler — plateforme éducation privée algérienne.
Scrape 4 sources (site officiel, Google Places, Instagram, Serper+Firecrawl),
synthèse Gemini, validation Pydantic, upsert Supabase, logs, alerte Resend si échec.
Planifié : lundi 06h00.
"""
from __future__ import annotations

import json
import os
import random
import re
import time
from typing import Any, Literal, Optional

import requests
from dotenv import load_dotenv
from pydantic import BaseModel, field_validator

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv()

# --- Config (toutes les clés via os.getenv) ---
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL")
# Limite Google Places API (2 appels/établissement : Find + Details). 100 = 200 appels/run. Gratuit : 5000/mois par SKU.
CRAWLER_PLACES_MAX = int(os.getenv("CRAWLER_PLACES_MAX", "100"))
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")
APIFY_API_KEY = os.getenv("APIFY_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
MY_EMAIL = os.getenv("MY_EMAIL")
REVALIDATION_SECRET = os.getenv("REVALIDATION_SECRET")
VERCEL_REVALIDATE_URL = os.getenv("VERCEL_REVALIDATE_URL")

# Fallback liste fixe si Supabase inaccessible
INSTITUTIONS_FALLBACK = [
    {"id": "fallback-1", "name": "École Example Alger", "slug": "ecole-example-alger", "website_url": None, "commune": "Alger", "instagram_username": None},
]

ALLOWED_LANGUAGES = {"FR", "EN", "AR", "Bilingue"}


# --- Schéma InstitutionData (adapté éducation) ---
class InstitutionData(BaseModel):
    """Données extraites par Gemini, validées Pydantic. null si absent ou incertain."""

    name: str
    slug: Optional[str] = None
    description: Optional[str] = None  # résumé riche pour les parents (3–6 phrases)
    programmes: Optional[str] = None  # détails sur les filières / parcours (2–4 phrases)
    address: Optional[str] = None
    commune: Optional[str] = None
    phone: Optional[str] = None
    website_url: Optional[str] = None
    annual_cost_range: Optional[str] = None
    languages: Optional[list[str]] = None
    opening_hours: Optional[str] = None
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    data_confidence: Optional[Literal["high", "medium", "low"]] = None
    points_forts: Optional[list[str]] = None
    points_faibles: Optional[list[str]] = None
    mesrs_recognized: Optional[bool] = None
    bac_required: Optional[bool] = None
    has_internat: Optional[bool] = None
    has_transport: Optional[bool] = None
    level_general: Optional[list[str]] = None

    # Champs orientation (supérieur / pro)
    diploma_type: Optional[str] = None
    intl_equivalence: Optional[str] = None
    admission_type: Optional[str] = None
    promo_size: Optional[str] = None
    internship_provided: Optional[bool] = None
    internship_duration: Optional[str] = None
    corporate_partners: Optional[list[str]] = None
    school_partners: Optional[list[str]] = None
    real_outcomes: Optional[str] = None
    insertion_rate: Optional[str] = None
    passerelles: Optional[str] = None

    # Champs parents (enseignement général)
    school_levels: Optional[list[str]] = None
    curriculum: Optional[str] = None
    boarding_available: Optional[bool] = None
    transport_available: Optional[bool] = None
    canteen_available: Optional[bool] = None
    elearning_platform: Optional[bool] = None
    special_needs_inclusion: Optional[bool] = None

    @field_validator("languages")
    @classmethod
    def languages_allowed(cls, v: Optional[list[str]]) -> Optional[list[str]]:
        if v is None:
            return v
        out = [x for x in v if x in ALLOWED_LANGUAGES]
        return out if out else None

    @field_validator("annual_cost_range")
    @classmethod
    def cost_sensible(cls, v: Optional[str]) -> Optional[str]:
        if not v or not isinstance(v, str):
            return v
        # Rejeter valeurs impossibles (ex. négatives ou millions absurdes)
        if re.search(r"-\s*\d+\s*(DA|dinars?)", v, re.I) or re.search(r"\d+\s*millions?\s*DA", v, re.I):
            return None
        return v[:200].strip() or None

    @field_validator("points_forts", "points_faibles")
    @classmethod
    def trim_points(cls, v: Optional[list[str]]) -> Optional[list[str]]:
        if not v:
            return None
        cleaned = [s.strip() for s in v if isinstance(s, str) and s.strip()]
        return cleaned[:6] or None


# --- Charger institutions depuis Supabase (is_active = true) ---
def load_institutions_from_supabase() -> list[dict[str, Any]]:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        return INSTITUTIONS_FALLBACK
    try:
        r = requests.get(
            f"{SUPABASE_URL.rstrip('/')}/rest/v1/institutions",
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
        return data if isinstance(data, list) else INSTITUTIONS_FALLBACK
    except Exception:
        return INSTITUTIONS_FALLBACK


# --- SOURCE 1 : Site web officiel (Firecrawl) ---
def firecrawl_scrape(url: str, timeout: int = 90) -> str:
    if not FIRECRAWL_API_KEY:
        return ""
    try:
        r = requests.post(
            "https://api.firecrawl.dev/v1/scrape",
            headers={"Authorization": f"Bearer {FIRECRAWL_API_KEY}", "Content-Type": "application/json"},
            json={"url": url, "formats": ["markdown"]},
            timeout=timeout,
        )
        r.raise_for_status()
        out = r.json()
        if not out.get("success"):
            return ""
        data = out.get("data", {})
        return (data.get("markdown") or data.get("content") or "").strip()
    except Exception:
        return ""


def source1_official_website(website: Optional[str], name: str) -> tuple[str, bool]:
    """Scrape page d'accueil + /formations ou /programmes. Retourne (texte, utilisé)."""
    if not (website or "").strip():
        return "", False
    base = website.strip().rstrip("/")
    used = False
    parts = []
    try:
        text = firecrawl_scrape(base)
        if text:
            parts.append(f"--- Site officiel ({base}) ---\n\n{text}")
            used = True
    except Exception:
        pass
    for path in ["/formations", "/programmes", "/nos-formations"]:
        try:
            text = firecrawl_scrape(base + path)
            if text:
                parts.append(f"--- {path} ---\n\n{text}")
                used = True
        except Exception:
            pass
    return "\n\n".join(parts), used


# --- SOURCE 2 : Google Places (FindPlaceFromText + Place Details) ---
def source2_google_places(name: str, commune: Optional[str]) -> tuple[str, bool]:
    if not GOOGLE_PLACES_API_KEY:
        return "", False
    query = f"{name} {commune or ''} Algerie".strip()
    try:
        # FindPlaceFromText
        r = requests.get(
            "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
            params={
                "input": query,
                "inputtype": "textquery",
                # On récupère aussi le site web pour aider Gemini à extraire website_url
                "fields": "place_id,name,formatted_address,formatted_phone_number,website,rating,photos",
                "key": GOOGLE_PLACES_API_KEY,
            },
            timeout=15,
        )
        r.raise_for_status()
        data = r.json()
        candidates = data.get("candidates", [])
        if not candidates:
            return "", False
        place = candidates[0]
        place_id = place.get("place_id")
        parts = [
            "--- Google Maps ---",
            f"Nom: {place.get('name', '')}",
            f"Adresse: {place.get('formatted_address', '')}",
            f"Tél: {place.get('formatted_phone_number', '')}",
            f"Site web: {place.get('website', '')}",
            f"Note: {place.get('rating', '')}",
        ]
        # Place Details pour reviews et opening_hours
        if place_id:
            r2 = requests.get(
                "https://maps.googleapis.com/maps/api/place/details/json",
                params={
                    "place_id": place_id,
                    "fields": "reviews,opening_hours",
                    "key": GOOGLE_PLACES_API_KEY,
                },
                timeout=15,
            )
            if r2.status_code == 200:
                det = r2.json().get("result", {})
                reviews = det.get("reviews", [])[:5]
                if reviews:
                    parts.append("Avis:")
                    for rev in reviews:
                        parts.append(f"  - {rev.get('text', '')[:300]}")
                hours = det.get("opening_hours", {}).get("weekday_text", [])
                if hours:
                    parts.append("Horaires: " + "; ".join(hours))
        return "\n".join(parts), True
    except Exception:
        return "", False


# --- SOURCE 3 : Instagram (Apify) ---
def _apify_instagram_for_username(handle: str) -> tuple[str, bool]:
    """Scrape un compte Instagram unique via Apify. Retourne (texte, utilisé)."""
    if not APIFY_API_KEY or not handle.strip():
        return "", False
    username = handle.strip().lstrip("@")
    try:
        r = requests.post(
            "https://api.apify.com/v2/acts/apify~instagram-scraper/runs",
            headers={"Authorization": f"Bearer {APIFY_API_KEY}", "Content-Type": "application/json"},
            json={
                "startUrls": [{"url": f"https://instagram.com/{username}"}],
                "resultsLimit": 5,
            },
            timeout=30,
        )
        r.raise_for_status()
        run = r.json().get("data", {})
        run_id = run.get("id")
        if not run_id:
            return "", False
        for _ in range(40):
            time.sleep(3)
            r2 = requests.get(
                f"https://api.apify.com/v2/actor-runs/{run_id}",
                headers={"Authorization": f"Bearer {APIFY_API_KEY}"},
                timeout=10,
            )
            if r2.status_code != 200:
                continue
            run_data = r2.json().get("data", {})
            status = run_data.get("status")
            if status == "SUCCEEDED":
                dataset_id = run_data.get("defaultDatasetId")
                if not dataset_id:
                    return "", True
                r3 = requests.get(
                    f"https://api.apify.com/v2/datasets/{dataset_id}/items",
                    headers={"Authorization": f"Bearer {APIFY_API_KEY}"},
                    timeout=10,
                )
                if r3.status_code != 200:
                    return "", True
                items = r3.json() if isinstance(r3.json(), list) else []
                parts = ["--- Instagram ---"]
                for item in items[:5]:
                    if isinstance(item, dict):
                        parts.append(f"Bio: {item.get('biography', '')}")
                        parts.append(f"Followers: {item.get('followersCount', '')}")
                        parts.append(f"Last post: {item.get('caption', '')}")
                        break
                return "\n".join(parts), True
            if status == "FAILED":
                break
        return "", True
    except Exception:
        return "", False


def source3_instagram(username: Optional[str]) -> tuple[str, bool]:
    """
    Scrape Instagram avec éventuellement plusieurs pseudos séparés par '/'.
    On essaie chaque handle en séquence jusqu'à trouver du contenu.
    """
    if not APIFY_API_KEY or not (username or "").strip():
        return "", False

    raw = (username or "").replace("\\", "/")
    candidates = [h.strip() for h in raw.split("/") if h.strip()]
    if not candidates:
        return "", False

    any_used = False
    for handle in candidates:
        text, used = _apify_instagram_for_username(handle)
        if used:
            any_used = True
        if text:
            return text, True
    return ("", any_used)


# --- SOURCE 4 : Serper + Firecrawl (médias/forums) ---
def source4_serper_firecrawl(name: str) -> tuple[str, bool]:
    if not SERPER_API_KEY or not FIRECRAWL_API_KEY:
        return "", False
    query = f"{name} Alger avis tarif inscription 2025"
    try:
        r = requests.post(
            "https://google.serper.dev/search",
            headers={"X-API-KEY": SERPER_API_KEY, "Content-Type": "application/json"},
            json={"q": query, "num": 3},
            timeout=15,
        )
        r.raise_for_status()
        data = r.json()
        urls = []
        for o in data.get("organic", [])[:3]:
            u = o.get("link")
            if u:
                urls.append(u)
        if not urls:
            return "", False
        parts = ["--- Médias / Forums ---"]
        for u in urls:
            try:
                text = firecrawl_scrape(u, timeout=60)
                if text:
                    parts.append(f"URL: {u}\n{text[:15000]}")
            except Exception:
                pass
        return "\n\n".join(parts), len(parts) > 1
    except Exception:
        return "", False


# --- Collecte 4 sources pour un établissement ---
def collect_sources(inst: dict[str, Any], places_rank: int = 0) -> tuple[str, list[str]]:
    name = inst.get("name") or "Établissement"
    website = inst.get("website_url")
    commune = inst.get("commune")
    instagram = inst.get("instagram_username")
    combined = []
    sources_used = []

    s1, u1 = source1_official_website(website, name)
    if s1:
        combined.append(s1)
    if u1:
        sources_used.append("site_officiel")

    if places_rank < CRAWLER_PLACES_MAX:
        s2, u2 = source2_google_places(name, commune)
        if s2:
            combined.append(s2)
        if u2:
            sources_used.append("google_places")

    s3, u3 = source3_instagram(instagram)
    if s3:
        combined.append(s3)
    if u3:
        sources_used.append("instagram")

    s4, u4 = source4_serper_firecrawl(name)
    if s4:
        combined.append(s4)
    if u4:
        sources_used.append("serper_firecrawl")

    text = "\n\n".join(combined).strip() if combined else ""
    return text or "[Aucun contenu récupéré]", sources_used


# --- Schéma JSON pour Gemini ---
INSTITUTION_SCHEMA = """
{
  "name": "string",
  "slug": "string | null",
  "description": "string | null (3 à 6 phrases complètes pour présenter l'établissement à un parent hésitant entre plusieurs options, sans marketing excessif)",
  "programmes": "string | null (2 à 4 phrases expliquant les principaux types de formations, niveaux et publics visés)",
  "address": "string | null",
  "commune": "string | null",
  "phone": "string | null",
  "website_url": "string | null",
  "annual_cost_range": "string | null (ex: 80 000 - 200 000 DA)",
  "languages": ["FR" | "EN" | "AR" | "Bilingue"] | null,
  "opening_hours": "string | null",
  "rating": number | null,
  "reviews_count": number | null,
  "data_confidence": "high" | "medium" | "low",
  "points_forts": ["string"] | null (3 à 6 puces claires, orientées parents/élèves, sans langage vide),
  "points_faibles": ["string"] | null (2 à 5 puces sur les points de vigilance ou limites possibles),
  "mesrs_recognized": true | false | null,
  "bac_required": true | false | null,
  "has_internat": true | false | null,
  "has_transport": true | false | null,
  "level_general": ["Primaire" | "Collège" | "Lycée"] | null,

  "diploma_type": "string | null (ex: Diplôme national, Diplôme international, Certification, Attestation)",
  "intl_equivalence": "string | null (ex: Équivalence France possible)",
  "admission_type": "string | null (ex: Sélective, Dossier, Entretien, Ouverte)",
  "promo_size": "string | null (ex: Petites promos (15-20), Grandes (50+))",
  "internship_provided": true | false | null,
  "internship_duration": "string | null (ex: 3 mois, 6 mois)",
  "corporate_partners": ["string"] | null (ex: noms d'entreprises partenaires),
  "school_partners": ["string"] | null (ex: écoles / universités partenaires),
  "real_outcomes": "string | null (débouchés réels observés)",
  "insertion_rate": "string | null (ex: 80% en 6 mois (estimé))",
  "passerelles": "string | null (passerelles / équivalences possibles)",

  "school_levels": ["Maternelle" | "Primaire" | "CEM" | "Lycee"] | null,
  "curriculum": "string | null (ex: Programme algérien, AEFE, bilingue, international)",
  "boarding_available": true | false | null,
  "transport_available": true | false | null,
  "canteen_available": true | false | null,
  "elearning_platform": true | false | null,
  "special_needs_inclusion": true | false | null
}
"""

PROMPT_EXTRACTION = """
Tu es un expert éducation algérien. Extrais UNIQUEMENT les informations présentes dans ce texte selon le schéma JSON ci-dessous.
Si une info est absente ou incertaine → null. Ne jamais inventer, ne pas extrapoler au-delà de ce qui est dit dans le texte.

Style attendu :
- description : texte riche en français (3 à 6 phrases complètes) qui aide des parents à comprendre pour qui est l'établissement, son positionnement et ce qu'il apporte concrètement.
- programmes : 2 à 4 phrases qui expliquent clairement les types de formations, niveaux (maternelle, collège, lycée, supérieur, pro...) et publics visés.
- points_forts : 3 à 6 puces très concrètes (ex : \"Taux de réussite bac élevé\", \"Double diplomation avec université étrangère\", \"Accompagnement insertion professionnelle\"), sans phrases creuses.
- points_faibles : 2 à 5 puces factuelles (budget élevé, sélection forte, accès difficile, éloigné du centre, etc.) uniquement si ces éléments apparaissent dans les sources.

data_confidence :
- high : info confirmée par 2+ sources
- medium : 1 source
- low : déduction ou supposition

Schéma : {schema}

CONTENU :
---
{content}
---

Réponds UNIQUEMENT par un JSON valide, sans markdown.
"""


def gemini_extract(text: str, institution_name: str) -> InstitutionData:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY manquant")
    prompt = PROMPT_EXTRACTION.format(schema=INSTITUTION_SCHEMA, content=text[:120000])
    r = requests.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY,
        json={
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"responseMimeType": "application/json"},
        },
        timeout=90,
    )
    r.raise_for_status()
    out = r.json()
    cand = out.get("candidates", [{}])[0]
    raw = (cand.get("content", {}).get("parts", [{}])[0].get("text", "{}") or "{}").strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    data = json.loads(raw)
    if not data.get("name"):
        data["name"] = institution_name
    return InstitutionData.model_validate(data)


def send_resend_alert(subject: str, body: str) -> None:
    if not RESEND_API_KEY or not MY_EMAIL:
        return
    try:
        requests.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {RESEND_API_KEY}", "Content-Type": "application/json"},
            json={"from": "Comparateur Edu <onboarding@resend.dev>", "to": [MY_EMAIL], "subject": subject, "text": body},
            timeout=10,
        )
    except Exception:
        pass


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "-", s).strip("-")
    return s[:80] if s else "etablissement"


# --- Upsert institutions + log scraping_logs ---
def supabase_upsert_institution_and_log(
    inst: dict[str, Any],
    data: InstitutionData,
    sources_used: list[str],
    log_status: Literal["OK", "ERREUR"],
    message_erreur: Optional[str],
) -> None:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        return
    slug = data.slug or slugify(data.name or inst.get("name", ""))
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
    }
    payload = {
        "name": data.name or inst.get("name"),
        "slug": slug,
        "website_url": data.website_url or inst.get("website_url"),
        "commune": data.commune or inst.get("commune"),
        "address": data.address,
        "phone": data.phone,
        "rating": data.rating,
        "reviews_count": data.reviews_count,
        "opening_hours": data.opening_hours,
        "annual_cost_range": data.annual_cost_range,
        "languages": data.languages,
        "description": data.description,
        "programmes": data.programmes,
        "data_confidence": data.data_confidence,
        "points_forts": data.points_forts,
        "points_faibles": data.points_faibles,
        "mesrs_recognized": data.mesrs_recognized,
        "bac_required": data.bac_required,
        "has_internat": data.has_internat,
        "has_transport": data.has_transport,
        "level_general": data.level_general,

        # Orientation (sup / pro)
        "diploma_type": data.diploma_type,
        "intl_equivalence": data.intl_equivalence,
        "admission_type": data.admission_type,
        "promo_size": data.promo_size,
        "internship_provided": data.internship_provided,
        "internship_duration": data.internship_duration,
        "corporate_partners": data.corporate_partners,
        "school_partners": data.school_partners,
        "real_outcomes": data.real_outcomes,
        "insertion_rate": data.insertion_rate,
        "passerelles": data.passerelles,

        # Parents (général)
        "school_levels": data.school_levels,
        "curriculum": data.curriculum,
        "boarding_available": data.boarding_available,
        "transport_available": data.transport_available,
        "canteen_available": data.canteen_available,
        "elearning_platform": data.elearning_platform,
        "special_needs_inclusion": data.special_needs_inclusion,

        "is_active": True,
        "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    try:
        requests.post(
            f"{SUPABASE_URL.rstrip('/')}/rest/v1/institutions?on_conflict=slug",
            headers={**headers, "Prefer": "resolution=merge-duplicates"},
            json=payload,
            timeout=15,
        )
    except Exception:
        pass
    try:
        requests.post(
            f"{SUPABASE_URL.rstrip('/')}/rest/v1/scraping_logs",
            headers={**headers, "Prefer": "return=minimal"},
            json={
                "etablissement": inst.get("name"),
                "statut": log_status,
                "message_erreur": message_erreur,
                "sources_used": sources_used,
            },
            timeout=10,
        )
    except Exception:
        pass


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
            send_resend_alert("[Crawler Edu] Revalidation ISR échouée", f"Status {r.status_code}\n{r.text[:500]}")
    except Exception as e:
        send_resend_alert("[Crawler Edu] Revalidation ISR erreur", str(e))


def main() -> None:
    institutions = load_institutions_from_supabase()
    if not institutions:
        send_resend_alert("[Crawler Edu] Aucune institution", "Supabase et fallback vides.")
        return

    for i, inst in enumerate(institutions):
        name = inst.get("name") or "Inconnu"
        try:
            combined, sources_used = collect_sources(inst, places_rank=i)
            if not combined or combined == "[Aucun contenu récupéré]":
                supabase_upsert_institution_and_log(inst, InstitutionData(name=name), [], "ERREUR", "Aucune source disponible")
                send_resend_alert(f"[Crawler Edu] Échec — {name}", "Aucune donnée récupérée (4 sources).")
            else:
                data = gemini_extract(combined, name)
                data.slug = data.slug or slugify(name)
                supabase_upsert_institution_and_log(inst, data, sources_used, "OK", None)
        except Exception as e:
            msg = str(e)[:500]
            supabase_upsert_institution_and_log(inst, InstitutionData(name=name), [], "ERREUR", msg)
            send_resend_alert(f"[Crawler Edu] Échec — {name}", msg)

        if i < len(institutions) - 1:
            time.sleep(random.randint(10, 20))

    trigger_revalidate()
    print("Crawler terminé.")


if __name__ == "__main__":
    main()
