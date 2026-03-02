#!/usr/bin/env python3
"""
Seed initial des établissements dans Supabase à partir de data/institutions-places.json.

Pipeline prévu :
- 1) Tu exécutes (quand tu auras ta clé) :
      GOOGLE_PLACES_API_KEY=xxx npx ts-node scripts/scrape-institutions.ts --priority=high --limit=20
   -> ça génère data/institutions-places.json
- 2) Tu exécutes ensuite ce script :
      NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... python scripts/seed_institutions_from_places.py
   -> ça upsert les lignes dans la table institutions (on_conflict=slug).
"""

from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv


ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")
load_dotenv()  # seconde passe éventuelle

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

PLACES_JSON = ROOT / "data" / "institutions-places.json"


def slugify(value: str) -> str:
  s = (
    value.strip()
    .lower()
    .replace("'", " ")
    .replace("’", " ")
  )
  out = []
  prev_dash = False
  for ch in s:
    if ch.isalnum():
      out.append(ch)
      prev_dash = False
    else:
      if not prev_dash:
        out.append("-")
        prev_dash = True
  slug = "".join(out).strip("-")
  return slug or "etablissement"


def load_places() -> list[dict[str, Any]]:
  if not PLACES_JSON.exists():
    print(f"❌ Fichier {PLACES_JSON} introuvable. Lance d'abord scripts/scrape-institutions.ts.")
    return []
  try:
    with PLACES_JSON.open(encoding="utf-8") as f:
      data = json.load(f)
    if not isinstance(data, list):
      print("❌ JSON invalide: attend une liste.")
      return []
    return data
  except Exception as e:
    print(f"❌ Erreur lecture JSON: {e}")
    return []


def upsert_institution(item: dict[str, Any]) -> None:
  assert SUPABASE_URL and SUPABASE_SERVICE_KEY
  name = item.get("name") or "Établissement sans nom"
  commune = item.get("commune") or ""
  slug_source = f"{name} {commune}".strip()
  slug = slugify(slug_source)

  wilaya = item.get("wilaya") or "Alger"
  category = item.get("category") or "General"

  payload: dict[str, Any] = {
    "name": name,
    "slug": slug,
    "commune": commune or None,
    "wilaya": wilaya,
    "category": category,
    "description": item.get("description") or None,
    "scraping_priority": item.get("scraping_priority") or None,
    "google_place_id": item.get("google_place_id") or None,
    "google_place_formatted_address": item.get("formatted_address") or None,
    "latitude": item.get("latitude"),
    "longitude": item.get("longitude"),
    "website_url": item.get("website_url") or None,
    "website": item.get("website_url") or None,
    "phone": item.get("phone") or None,
    "phone_numbers": [item["phone"]] if item.get("phone") else None,
    "opening_hours": item.get("opening_hours") or None,
    "google_place_opening_hours": item.get("opening_hours") or None,
    "is_active": True,
  }

  headers = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates",
  }

  url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/institutions?on_conflict=slug"
  try:
    r = requests.post(url, headers=headers, json=payload, timeout=15)
    if r.status_code >= 300:
      print(f"⚠️  Échec upsert {name} ({slug}) — {r.status_code}: {r.text[:200]}")
    else:
      print(f"✅ Upsert {name} ({slug})")
  except Exception as e:
    print(f"❌ Erreur requête Supabase pour {name}: {e}")


def main() -> None:
  if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("❌ NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquants dans .env.")
    return

  items = load_places()
  if not items:
    return

  print(f"Seed institutions: {len(items)} élément(s) trouvés dans {PLACES_JSON}.")
  for i, item in enumerate(items, start=1):
    print(f"[{i}/{len(items)}] {item.get('name')}...")
    upsert_institution(item)
    time.sleep(0.5)  # petite pause pour ne pas saturer Supabase

  print("✅ Seed terminé.")


if __name__ == "__main__":
  main()

