#!/usr/bin/env python3
"""
Ping léger Supabase pour éviter la mise en pause automatique des projets gratuits.

À lancer par exemple une fois par jour via cron ou GitHub Actions :
  python scripts/ping_supabase.py
"""

from __future__ import annotations

import os
from pathlib import Path

import requests
from dotenv import load_dotenv


ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")
load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")


def main() -> None:
  if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("❌ NEXT_PUBLIC_SUPABASE_URL ou clé Supabase manquante, ping ignoré.")
    return

  url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/institutions"
  params = {"select": "id", "limit": "1"}
  headers = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
  }
  try:
    r = requests.get(url, headers=headers, params=params, timeout=10)
    if r.status_code < 300:
      print("✅ Ping Supabase OK")
    else:
      print(f"⚠️ Ping Supabase status {r.status_code}: {r.text[:200]}")
  except Exception as e:
    print(f"❌ Erreur ping Supabase: {e}")


if __name__ == "__main__":
  main()

