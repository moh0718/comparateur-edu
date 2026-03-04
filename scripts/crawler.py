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
CRAWLER_MAX_INSTITUTIONS = int(os.getenv("CRAWLER_MAX_INSTITUTIONS", "40"))
CRAWLER_SLEEP_MIN = int(os.getenv("CRAWLER_SLEEP_MIN", "5"))
CRAWLER_SLEEP_MAX = int(os.getenv("CRAWLER_SLEEP_MAX", "10"))
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


def _normalize_name(name: str) -> str:
    """Normalisation simple pour matcher les noms d'établissements."""
    s = name.lower()
    s = re.sub(r"\(.*?\)", "", s)  # enlever le contenu entre parenthèses
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return s.strip()


# Petites surcharges manuelles pour certains établissements clés
MANUAL_WEBSITES = {
    # Supérieur / management / commerce
    "ifag": "https://ifag.edu.dz",
    "insim": "https://insim.dz",
    "esg educaform": "https://esgalgerie.com",
    "em alger": "https://insag.edu.dz",
    "insag": "https://insag.edu.dz",
    "esst": "https://esst-sup.com",
    "eftg sup": "https://eftg-sup.com",
    "ncuk algeria": "https://ncukalgeria.com",
    "cesi algerie": "https://cesi-algerie.com",
    "caci formation": "https://formations.caci.dz",
    "isg": "https://isg.dz",
    "esaa": "https://esaa.dz",

    # Centres linguistiques / pôles culturels
    "berlitz": "https://berlitz.dz",
    "institut torii": "https://institut-torii.com",
    "daf akademie": "https://daf-akademie.com",
    "dsia": "https://daf-akademie.com",
    "ef education first": "https://ef.dz",
    "study center": "https://studycenter-dz.com",
    "my coach in": "https://mycoach-in.com",
    "in tuition": "https://in-tuition.dz",
    "asl algerian school for languages": "https://aslalgerie.com",
    "castle school": "https://castle-school.dz",

    # Formations professionnelles spécialisées
    "fly fra academy": "https://flyfra.com",
    "fly fra": "https://flyfra.com",
    "esa ecole sup aeronautique": "https://esaero-dz.com",
    "esaero": "https://esaero-dz.com",
    "acca algerie": "https://acca-algerie.com",
    "code 213": "https://code213.dz",
    "apti": "https://apti.dz",
    "institut itm": "https://institut-itm.com",
    "medav": "https://ecolemedav.com",
    "dakira formations": "https://dakiraa.com",
    "bmgi center": "https://bmgicenter.com",
    "inter hotel school": "https://ihs-dz.com",
    "in academy": "https://in-academy.dz",

    # Enseignement général — Alger Ouest
    "lycee alexandre dumas": "https://liad.dz",
    "liad": "https://liad.dz",
    "petite ecole d hydra": "https://alger-peh.mlfmonde.org",
    "ecole cipele education": "https://cipeleschool.com",

    # Dely Ibrahim / Cheraga
    "ecole la majorelle": "https://ecole-lamajorelle.com",
    "ecole el manar": "https://ecole-el-manar.org",
    "groupe scolaire essalem": "https://groupe-scolaire-essalem.com",

    # Alger centre / kouba / est
    "el djoud": "https://eldjoudschool.com",
    "groupe scolaire nedame": "https://ecolenedame.com",
    "etablissement salim": "https://ets-salim.com",
    "aquaschool": "https://aquaschool.dz",

    # Wilayas limitrophes
    "gs l ecureuil": "https://ecole-ecureuil.dz",
    "groupe scolaire albert einstein": "https://groupeeinstein-dz.com",
    "albert einstein school": "https://groupeeinstein-dz.com",
    "avicenne school": "https://avicenneschool.com",
    "british school algiers": "https://britishschoolalgiers.com",

    # Santé / paramédical
    "inoof": "https://inoof.edu.dz",
    "institut ibn nafis": "https://ibn-nafis.com",
    "ecole el taraqui": "https://ecoleeltaraqui.com",
}


MANUAL_EMAILS = {
    # Supérieur / management / commerce
    "insag": "contact@insag.edu.dz",
    "ifag": "contact@insag.edu.dz",
    "em alger": "contact@em-alger.com",
    "insim": "info@insim-dz.com",
    "esg educaform": "contact@esg-algerie.com",
    "esst": "contact@esst-dz.com",
    "eftg sup": "contact@eftg-sup.com",
    "ncuk algeria": "info@ncuk.ac.uk",
    "mgp": "contact@mgp-algerie.com",
    "cesi algerie": "contact@cesi-algerie.dz",
    "caci formation": "formation@caci.dz",

    # Centres linguistiques / pôles culturels
    "berlitz": "info@berlitz.dz",
    "institut torii": "contact@institut-torii.com",
    "daf akademie": "info@daf-akademie.dz",
    "dsia": "info@daf-akademie.dz",
    "ef education first": "info@ef.com",
    "study center": "contact@studycenter-dz.com",
    "my coach in": "contact@mycoach-in.com",
    "in tuition": "info@intuition-dz.com",
    "asl algerian school for languages": "contact@asl-dz.com",
    "yemma khadidja": "contact@yemma-khadidja.dz",
    "castle school": "info@castleschool-dz.com",

    # Formations professionnelles spécialisées
    "fly fra academy": "contact@flyfra.com",
    "fly fra": "contact@flyfra.com",
    "esa ecole sup aeronautique": "info@esa-algerie.com",
    "esaero": "info@esa-algerie.com",
    "acca algerie": "contact@acca-algerie.dz",
    "code 213": "contact@code213.dz",
    "apti": "contact@apti-dz.com",
    "institut itm": "contact@itm-algerie.com",
    "masterful institute": "info@masterful-dz.com",
    "medav": "contact@ecolemedav.com",
    "dakira formations": "contact@dakira-dz.com",
    "bmgi center": "contact@bmgi-dz.com",
    "inter hotel school": "contact@ihs-dz.com",
    "in academy": "contact@in-academy.dz",
    "iris school": "info@iris-school.dz",
    "ecole sanahilwa": "contact@sanahilwa.dz",
    "ecole mezaourou": "contact@mezaourou-dz.com",

    # Enseignement général (K-12)
    "lycee alexandre dumas": "secretariat.proviseur@liad-alger.fr",
    "liad": "secretariat.proviseur@liad-alger.fr",
    "petite ecole d hydra": "direction@peh-alger.org",
    "ecole eveil scolaire": "contact@eveil-scolaire.dz",
    "meilleures generations": "contact@emg-algerie.com",
    "ardh el maarifa": "contact@ardhelmaarifa.dz",
    "ecole saoudienne": "hsnm.mansour@gmail.com",
    "ecole l envol": "contact@lenvol-alger.dz",
    "cipele education": "contact@cipele-alger.dz",
    "les glycines": "ecolelesglycines@gmail.com",
    "l eclosion": "contact@leclosion-dz.com",
    "ecole la majorelle": "contact@lamajorelle.dz",
    "ecole el manar": "info@elmanar-dz.com",
    "groupe scolaire essalem": "contact@gs-essalem.dz",
    "cours soleil": "contact@courssoleil.com",
    "l eden de hind": "contact@ledendehind.dz",
    "ecole dalia": "contact@ecole-elmalik.dz",
    "ecole el malik": "contact@ecole-elmalik.dz",
    "creche champ d etoiles": "contact@champdetoiles.dz",
    "le declic": "contact@ledeclic-dz.com",
    "el djoud": "contact@ecole-eldjoud.dz",
    "iris maternelle ecole": "info@iris-ecole.dz",
    "ecole 0 1 2 3 soleil": "contact@123soleil-dz.com",
    "mafatif el ilm": "contact@mafatihelilm.dz",
    "groupe scolaire nedame": "contact@gs-nedame.dz",
    "etablissement salim": "contact@ets-salim.com",
    "new scientifique school": "contact@nss-dz.com",
    "ecole maali": "contact@ecolemaali.dz",
    "aladin": "contact@ecole-aladin.dz",
    "aquaschool": "contact@aquaschool-dz.com",
    "l ecureuil": "contact@ecole-lecureuil.dz",
    "gs l ecureuil": "contact@ecole-lecureuil.dz",
    "albert einstein": "contact@gae-dz.com",
    "daya school": "contact@dayaschool.dz",
    "bbc school": "contact@bbcschool-dz.com",
    "avicenne school": "contact@avicenne-dz.com",

    # Santé / paramédical
    "paramely": "contact@paramely-dz.com",
    "inoof": "contact@inoof.dz",
    "institut ibn nafis": "contact@ibnnafis-dz.com",
    "ecole el hachimia": "contact@elhachimia-dz.com",
    "ecole el taraqui": "contact@eltaraqui.dz",
    "institut dheb": "contact@institut-dheb.com",
    "el manar paramedical": "info@elmanar-sante.dz",
    "ecole l arc": "contact@ecole-larc.dz",
}


def get_manual_email(name: str) -> Optional[str]:
    norm = _normalize_name(name)
    for key, email in MANUAL_EMAILS.items():
        if key in norm:
            return email
    return None

def get_manual_website(name: str) -> Optional[str]:
    norm = _normalize_name(name)
    for key, url in MANUAL_WEBSITES.items():
        if key in norm:
            return url
    return None


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
    contact_email: Optional[str] = None
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
def source2_google_places(name: str, commune: Optional[str]) -> tuple[str, bool, dict[str, Any]]:
    if not GOOGLE_PLACES_API_KEY:
        return "", False, {}
    query = f"{name} {commune or ''} Algerie".strip()
    try:
        # FindPlaceFromText
        r = requests.get(
            "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
            params={
                "input": query,
                "inputtype": "textquery",
                # On récupère aussi le site web + volume d'avis pour alimenter directement la fiche,
                # même si Gemini est en rate limit ou indisponible.
                "fields": "place_id,name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,photos",
                "key": GOOGLE_PLACES_API_KEY,
            },
            timeout=15,
        )
        r.raise_for_status()
        data = r.json()
        candidates = data.get("candidates", [])
        if not candidates:
            return "", False, {}
        place = candidates[0]
        place_id = place.get("place_id")
        base_fields: dict[str, Any] = {
            "address": place.get("formatted_address") or None,
            "phone": place.get("formatted_phone_number") or None,
            "website_url": place.get("website") or None,
            "rating": place.get("rating"),
            "reviews_count": place.get("user_ratings_total"),
            "commune": commune or None,
        }
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
                    # Alimente directement le champ opening_hours si absent
                    base_fields.setdefault("opening_hours", "; ".join(hours))
        return "\n".join(parts), True, base_fields
    except Exception:
        return "", False, {}


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
def collect_sources(inst: dict[str, Any], places_rank: int = 0) -> tuple[str, list[str], dict[str, Any]]:
    name = inst.get("name") or "Établissement"
    website = inst.get("website_url")
    commune = inst.get("commune")
    instagram = inst.get("instagram_username")
    combined: list[str] = []
    sources_used: list[str] = []
    enriched_fields: dict[str, Any] = {}

    s1, u1 = source1_official_website(website, name)
    if s1:
        combined.append(s1)
    if u1:
        sources_used.append("site_officiel")

    if places_rank < CRAWLER_PLACES_MAX:
        s2, u2, fields2 = source2_google_places(name, commune)
        if s2:
            combined.append(s2)
        if u2:
            sources_used.append("google_places")
        # On conserve les données structurées issues directement de Google Places
        enriched_fields.update({k: v for k, v in (fields2 or {}).items() if v not in (None, "", [])})

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
    return text or "[Aucun contenu récupéré]", sources_used, enriched_fields


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
  "contact_email": "string | null (email de contact principal de l'établissement, si clairement indiqué)",
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
        "contact_email": data.contact_email or inst.get("contact_email"),
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

    # On borne le nombre d'établissements traités par run pour garder un temps raisonnable.
    total = min(len(institutions), max(CRAWLER_MAX_INSTITUTIONS, 1))

    for i, inst in enumerate(institutions[:total]):
        name = inst.get("name") or "Inconnu"
        try:
            # Injection éventuelle d'un site officiel / email connus manuellement
            manual_site = get_manual_website(name)
            if manual_site and not inst.get("website_url"):
                inst["website_url"] = manual_site
            manual_email = get_manual_email(name)
            if manual_email and not inst.get("contact_email"):
                inst["contact_email"] = manual_email

            combined, sources_used, enriched_fields = collect_sources(inst, places_rank=i)
            if manual_email:
                enriched_fields.setdefault("contact_email", manual_email)
            base_data = InstitutionData(name=name, **enriched_fields)

            if not combined or combined == "[Aucun contenu récupéré]":
                # Aucune source texte exploitable : on garde quand même les infos structurées (adresse, téléphone, etc.)
                supabase_upsert_institution_and_log(
                    inst,
                    base_data,
                    sources_used,
                    "ERREUR",
                    "Aucune source texte disponible (sources structurées uniquement)",
                )
            else:
                try:
                    data = gemini_extract(combined, name)
                    # Si Gemini manque certaines infos basiques, on les remplit avec ce que Google Places a fourni.
                    for field, value in enriched_fields.items():
                        if getattr(data, field, None) in (None, "", []):
                            setattr(data, field, value)
                    if manual_email and not data.contact_email:
                        data.contact_email = manual_email
                    data.slug = data.slug or slugify(name)
                    supabase_upsert_institution_and_log(inst, data, sources_used, "OK", None)
                except Exception as e:
                    # En cas de rate limit Gemini (429) ou autre erreur IA,
                    # on ne perd pas les infos Google Places : on upsert au moins base_data.
                    msg = str(e)[:500]
                    supabase_upsert_institution_and_log(inst, base_data, sources_used, "ERREUR", msg)
                    send_resend_alert(f"[Crawler Edu] Échec (fallback Google Places) — {name}", msg)
        except Exception as e:
            msg = str(e)[:500]
            supabase_upsert_institution_and_log(inst, InstitutionData(name=name), [], "ERREUR", msg)
            send_resend_alert(f"[Crawler Edu] Échec — {name}", msg)

        # Pause entre chaque établissement pour respecter les limites d'API,
        # mais avec une plage plus courte pour accélérer le run global.
        if i < total - 1:
            lo = max(CRAWLER_SLEEP_MIN, 1)
            hi = max(CRAWLER_SLEEP_MAX, lo)
            time.sleep(random.randint(lo, hi))

    trigger_revalidate()
    print("Crawler terminé.")


if __name__ == "__main__":
    main()
