#!/usr/bin/env python3
"""
Génération de fiches métiers via Gemini pour Comparateur Edu.
Produit un JSON compatible avec data/metiers-mock.ts (FicheMetier).
Usage: GEMINI_API_KEY=xxx python scripts/generate_metiers.py
Sortie: data/metiers-generated.json (à fusionner manuellement dans metiers-mock.ts ou importer en base).
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

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "data" / "metiers-generated.json"

METIER_PROMPT = """Tu es un expert en orientation et en marché du travail pour l'Algérie et le Maghreb.
Génère une liste de fiches métiers au format JSON strict. Chaque objet doit avoir EXACTEMENT les champs suivants (tous des chaînes, sauf missions/challenges/diplomes_requis/perspectives_evolution/competences_qualites qui sont des tableaux de chaînes) :

- id : identifiant unique (ex. "1", "2", ...)
- slug : slug URL en minuscules, tirets (ex. "ingenieur-logiciel")
- titre : intitulé du métier
- domaine : un parmi "Tech & Numérique", "Santé", "Gestion & Finance", "Commerce & Marketing", "Enseignement", "BTP & Industrie", "Droit", "Art & Design", "Agriculture", "Transport & Logistique", "Ressources humaines", "Métiers du livre"
- description : 1-2 phrases
- missions : tableau de 3-5 missions principales
- challenges : tableau de 2-4 défis du métier
- diplomes_requis : tableau de diplômes ou formations (ex. "Licence informatique", "BTS", "École d'ingénieurs")
- salaires : une chaîne (ex. "Variable selon expérience (Algérie : à compléter)" ou "2 000 - 4 000 EUR en Europe")
- perspectives_evolution : tableau de 3-5 évolutions possibles
- competences_qualites : tableau de 4-6 compétences ou qualités

Contraintes :
- Au moins 25 métiers couvrant plusieurs domaines (tech, santé, gestion, commerce, enseignement, BTP, droit, etc.).
- Slugs uniques, en français, tirets.
- Ton utile pour l'orientation en Algérie (diplômes et salaires peuvent mentionner "Algérie" ou "à compléter").
- Réponds UNIQUEMENT par un tableau JSON valide, sans markdown ni commentaire. Exemple de début : [{"id":"1","slug":"ingenieur-logiciel", ...}, ...]
"""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def gemini_generate_metiers() -> list[dict]:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY manquant")
    r = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}",
        json={"contents": [{"parts": [{"text": METIER_PROMPT}]}]},
        timeout=120,
    )
    r.raise_for_status()
    out = r.json()
    cand = out.get("candidates", [{}])[0]
    text = (cand.get("content", {}).get("parts", [{}])[0].get("text", "") or "").strip()
    # Enlever éventuel markdown
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```\s*$", "", text)
    data = json.loads(text)
    if not isinstance(data, list):
        data = [data]
    return data


def slugify(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "-", s).strip("-")[:80]
    return s or "metier"


def normalize(metiers: list[dict]) -> list[dict]:
    out = []
    for i, m in enumerate(metiers):
        row = {
            "id": m.get("id") or str(i + 1),
            "slug": m.get("slug") or slugify(m.get("titre", "metier")),
            "titre": (m.get("titre") or "").strip(),
            "domaine": (m.get("domaine") or "").strip() or None,
            "description": (m.get("description") or "").strip() or None,
            "missions": [x.strip() for x in (m.get("missions") or []) if x],
            "challenges": [x.strip() for x in (m.get("challenges") or []) if x],
            "diplomes_requis": [x.strip() for x in (m.get("diplomes_requis") or []) if x],
            "salaires": (m.get("salaires") or "").strip() or None,
            "perspectives_evolution": [x.strip() for x in (m.get("perspectives_evolution") or []) if x],
            "competences_qualites": [x.strip() for x in (m.get("competences_qualites") or []) if x],
        }
        out.append(row)
    return out


def main() -> None:
    print("Génération des fiches métiers via Gemini...")
    raw = gemini_generate_metiers()
    metiers = normalize(raw)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(metiers, f, ensure_ascii=False, indent=2)
    print(f"Écrit {len(metiers)} fiches dans {OUTPUT_PATH}")
    print("Pour intégrer au site : copier dans data/metiers-mock.ts (export metiersMock) ou importer en base.")


if __name__ == "__main__":
    main()
