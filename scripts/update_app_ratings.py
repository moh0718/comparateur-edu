#!/usr/bin/env python3
"""
Script à lancer tous les mois (cron) pour mettre à jour uniquement les notes
App Store et Google Play dans bank_rates. Ne fait pas de scrape site/PDF ni Gemini.
"""
from __future__ import annotations

import json
import os
import time

import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
APP_STORE_MAPPING_PATH = os.path.join(SCRIPT_DIR, "app_store_mapping.json")


def load_app_store_mapping() -> dict:
    if not os.path.exists(APP_STORE_MAPPING_PATH):
        return {}
    with open(APP_STORE_MAPPING_PATH, encoding="utf-8") as f:
        return json.load(f)


def fetch_apple_rating_by_id(app_store_id: str) -> tuple[float | None, int]:
    """(note, nombre d'avis) App Store via iTunes Lookup."""
    if not app_store_id or not str(app_store_id).strip().isdigit():
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
            return (round(float(rating), 1) if rating is not None else None, count)
    except Exception:
        pass
    return None, 0


def fetch_google_rating(package: str) -> tuple[float | None, int]:
    """(note, nombre d'avis) Google Play."""
    try:
        from google_play_scraper import app as gp_app
        result = gp_app(package, lang="fr", country="dz")
        score = result.get("score")
        count = result.get("ratings") or result.get("reviews") or 0
        try:
            count = int(count)
        except (TypeError, ValueError):
            count = 0
        return (round(float(score), 1) if score is not None else None, count)
    except Exception:
        pass
    return None, 0


def main() -> None:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants.")
        return

    # Charger toutes les banques (id, name, slug)
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
    banks = r.json()
    if not banks:
        print("Aucune banque active.")
        return

    # Charger bank_rates pour avoir bank_id -> row (pour PATCH)
    r2 = requests.get(
        f"{SUPABASE_URL.rstrip('/')}/rest/v1/bank_rates",
        headers={
            "apikey": SUPABASE_SERVICE_KEY,
            "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        },
        timeout=15,
    )
    r2.raise_for_status()
    rates_rows = r2.json()
    by_bank_id = {str(row["bank_id"]): row for row in rates_rows if row.get("bank_id")}

    mapping = load_app_store_mapping()
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

    for bank in banks:
        bank_id = str(bank.get("id", ""))
        bank_name = bank.get("name") or ""
        bank_slug = bank.get("slug")
        if not bank_id or bank_id not in by_bank_id:
            continue
        entry = mapping.get(bank_slug) if bank_slug else None
        if not entry:
            slug_candidate = (bank_name or "").lower().replace(" ", "-").replace("'", "")
            for key, val in mapping.items():
                if key in slug_candidate or slug_candidate in key:
                    entry = val
                    break
        if not entry:
            continue
        app_store_id = entry.get("app_store_id")
        apple_rating, apple_count = (
            fetch_apple_rating_by_id(str(app_store_id))
            if app_store_id and str(app_store_id).strip().isdigit()
            else (None, 0)
        )
        pkg = entry.get("play_store_id") or entry.get("play_store_package")
        google_rating, google_count = fetch_google_rating(pkg) if pkg else (None, 0)
        reviews_count = apple_count + google_count
        payload = {}
        if apple_rating is not None:
            payload["app_rating_apple"] = apple_rating
        if google_rating is not None:
            payload["app_rating_google"] = google_rating
        if reviews_count > 0:
            payload["app_reviews_count"] = reviews_count
        if not payload:
            continue
        try:
            # PATCH bank_rates où bank_id = X (Supabase: update avec filter)
            requests.patch(
                f"{SUPABASE_URL.rstrip('/')}/rest/v1/bank_rates",
                headers=headers,
                params={"bank_id": f"eq.{bank_id}"},
                json=payload,
                timeout=10,
            )
            print(f"OK {bank_name}: Apple={apple_rating} Google={google_rating} avis={reviews_count}")
        except Exception as e:
            print(f"ERREUR {bank_name}: {e}")
        time.sleep(1)

    print("Mise à jour des notes apps terminée.")


if __name__ == "__main__":
    main()
