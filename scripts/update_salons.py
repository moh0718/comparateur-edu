#!/usr/bin/env python3
"""
Mise à jour des salons étudiants (Algérie) via Serper + Firecrawl + Gemini.
Produit data/salons-generated.json (à fusionner dans salons-mock.ts ou importer en base).
Usage: SERPER_API_KEY=... FIRECRAWL_API_KEY=... GEMINI_API_KEY=... python scripts/update_salons.py
Voir docs/SALONS_SCRAPING.md.
"""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

import requests
from dotenv import load_dotenv
from tenacity import retry, stop_after_attempt, wait_exponential

load_dotenv(Path(__file__).resolve().parent.parent / ".env")
load_dotenv()

SERPER_API_KEY = os.getenv("SERPER_API_KEY")
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "data" / "salons-generated.json"

SERPER_QUERIES = [
    "SAFEX salon étudiant Alger 2025",
    "salon orientation formation étudiant Algérie",
]


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def serper_search(query: str, num: int = 5) -> list[dict]:
    if not SERPER_API_KEY:
        raise ValueError("SERPER_API_KEY manquant")
    r = requests.post(
        "https://google.serper.dev/search",
        headers={"X-API-KEY": SERPER_API_KEY, "Content-Type": "application/json"},
        json={"q": query, "num": num, "hl": "fr"},
        timeout=15,
    )
    r.raise_for_status()
    data = r.json()
    out = []
    for o in data.get("organic", [])[:num]:
        link = o.get("link")
        if link:
            out.append({"url": link, "title": o.get("title", "")})
    return out


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


SALONS_EXTRACT_PROMPT = """Tu es un expert en événements d'orientation en Algérie.
À partir du contenu source ci-dessous, extrais TOUS les salons ou événements d'orientation pour étudiants en Algérie (SAFEX, salons régionaux, etc.).

Pour chaque événement, retourne un objet JSON avec exactement ces champs (tous des chaînes sauf annee qui est un nombre) :
- nom
- description (courte)
- dates (ex. "15-17 mars 2025" ou "Octobre 2025")
- adresse
- lieu (ville ou wilaya)
- conditions_inscription (texte ou "À vérifier sur le site")
- site_web (URL si disponible)
- annee (ex. 2025)

Réponds UNIQUEMENT par un tableau JSON valide, sans markdown. Exemple : [{"nom":"SAFEX Alger","description":"...", ...}, ...]
Si aucun salon n'est trouvé dans le contenu, retourne [].

CONTENU SOURCE :
---
{content}
---

TABLEAU JSON :"""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def gemini_extract_salons(content: str) -> list[dict]:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY manquant")
    content = (content[:60000] or "[Contenu vide]").strip()
    prompt = SALONS_EXTRACT_PROMPT.format(content=content)
    r = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}",
        json={"contents": [{"parts": [{"text": prompt}]}]},
        timeout=90,
    )
    r.raise_for_status()
    out = r.json()
    cand = out.get("candidates", [{}])[0]
    text = (cand.get("content", {}).get("parts", [{}])[0].get("text", "") or "").strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```\s*$", "", text)
    data = json.loads(text)
    return data if isinstance(data, list) else [data]


def slugify(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "-", s).strip("-")[:60]
    return s or "salon"


def main() -> None:
    all_urls = set()
    for q in SERPER_QUERIES:
        for item in serper_search(q, num=5):
            all_urls.add(item["url"])
    if not all_urls:
        print("Aucune URL trouvée (Serper). Écriture d'un tableau vide.")
        OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
        with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump([], f, ensure_ascii=False, indent=2)
        return

    combined = []
    for url in list(all_urls)[:10]:
        try:
            md = firecrawl_scrape(url)
            if md:
                combined.append(md[:15000])
        except Exception as e:
            print(f"Skip {url}: {e}")
    content = "\n\n---\n\n".join(combined) if combined else "Aucun contenu scrapé."
    salons = gemini_extract_salons(content)

    # Normaliser : id, slug
    for i, s in enumerate(salons):
        s["id"] = str(i + 1)
        s["slug"] = s.get("slug") or slugify(s.get("nom", "salon"))

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(salons, f, ensure_ascii=False, indent=2)
    print(f"Écrit {len(salons)} salons dans {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
