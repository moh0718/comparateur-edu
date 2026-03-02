#!/usr/bin/env python3
"""
Script blog_generator — plateforme éducation privée algérienne.
ÉTAPES: 1) Serper 3 requêtes actualités éducation Algérie
        2) Firecrawl scrape les URLs retournées
        3) Gemini rédige article ~600 mots (titre, intro, 3 points, conclusion, CTA)
        4) INSERT posts status=draft, source_type=auto (jamais published automatiquement).
Planifié : mercredi 08h00.
"""
from __future__ import annotations

import os
import re
import time
from typing import Any

import requests
from dotenv import load_dotenv
from tenacity import retry, stop_after_attempt, wait_exponential

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")
FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


def slugify(title: str) -> str:
    s = title.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "-", s).strip("-")
    return s[:80] if s else "article"


# --- ÉTAPE 1 : Serper — 3 requêtes actualités éducation Algérie ---
SERPER_QUERIES = [
    "education privee Algerie actualite 2025",
    "orientation post-bac Algerie",
    "reconnaissance diplomes prives MESRS Algerie",
]


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def serper_search(query: str, num: int = 5) -> list[dict[str, Any]]:
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
        title = o.get("title", "")
        if link:
            out.append({"url": link, "title": title})
    return out


# --- ÉTAPE 2 : Firecrawl scrape une URL ---
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


# --- ÉTAPE 3 : Gemini rédige article ~600 mots ---
ARTICLE_PROMPT = """Tu es un rédacteur pour un site comparateur d'écoles privées algériennes (éducation).
À partir du contenu source ci-dessous, rédige un article de blog en français d'environ 600 mots.

Structure obligatoire :
- Un titre accrocheur (une ligne)
- Une introduction qui pose le sujet (utile aux parents et étudiants algériens)
- Trois points clés développés (sous-forme de paragraphes)
- Une conclusion
- En fin d'article, un CTA sur une seule ligne : "Vous cherchez la meilleure école pour votre profil ? Utilisez notre comparateur gratuit."

Règles :
- Ton neutre, informatif, utile pour les parents et étudiants en Algérie.
- Sujets liés aux recherches habituelles en SEO éducation : orientation, diplômes, reconnaissance, coûts, qualité.
- Mots-clés importants présents de façon naturelle (éducation privée, orientation, diplôme, MESRS, inscription, etc.).
- Rien de polémique, dangereux, interdit ou problématique.
- Si le contenu source est hors-sujet ou trop limité, rédige tout de même un article général et utile sur l'éducation en Algérie en t'appuyant sur le peu d'éléments disponibles.

Réponds UNIQUEMENT avec le texte de l'article : première ligne = titre, puis ligne vide, puis le corps (intro, 3 points, conclusion, CTA). Pas de préambule ni "Voici l'article".

CONTENU SOURCE :
---
{content}
---

ARTICLE :"""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def gemini_write_article(source_text: str, source_title: str, source_url: str) -> str:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY manquant")
    content = (source_text[:80000] or "[Contenu vide]").strip()
    prompt = ARTICLE_PROMPT.format(content=content)
    r = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}",
        json={"contents": [{"parts": [{"text": prompt}]}]},
        timeout=90,
    )
    r.raise_for_status()
    out = r.json()
    cand = out.get("candidates", [{}])[0]
    text = (cand.get("content", {}).get("parts", [{}])[0].get("text", "") or "").strip()
    if source_url and "comparateur gratuit" not in text and "Comparateur gratuit" not in text:
        text = text.rstrip() + "\n\nVous cherchez la meilleure école pour votre profil ? Utilisez notre comparateur gratuit."
    return text


def extract_title_and_body(article_text: str) -> tuple[str, str]:
    lines = article_text.strip().split("\n")
    if not lines:
        return "Sans titre", ""
    title = lines[0].strip()
    body = "\n\n".join(l.strip() for l in lines[1:] if l.strip()).strip()
    return title or "Sans titre", body or article_text


# --- ÉTAPE 4 : INSERT posts draft, source_type=auto ---
def save_post(title: str, slug: str, content: str, excerpt: str, source_url: str) -> None:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        raise ValueError("SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant")
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    payload: dict[str, Any] = {
        "title": title,
        "slug": slug,
        "status": "draft",
        "source_type": "auto",
        "content": content,
        "excerpt": (excerpt or content[:200].replace("\n", " "))[:300],
    }
    if source_url:
        payload["source_url"] = source_url
    r = requests.post(
        f"{SUPABASE_URL.rstrip('/')}/rest/v1/posts",
        headers=headers,
        json=payload,
        timeout=15,
    )
    r.raise_for_status()


def main() -> None:
    seen_urls: set[str] = set()
    for query in SERPER_QUERIES:
        try:
            results = serper_search(query, num=3)
            for item in results:
                url = (item.get("url") or "").strip()
                title_src = (item.get("title") or "Actualité").strip()
                if not url or url in seen_urls:
                    continue
                seen_urls.add(url)
                try:
                    print(f"Scrape: {url[:60]}...")
                    text = firecrawl_scrape(url)
                    if not text.strip():
                        continue
                    print("  → Rédaction Gemini (600 mots)...")
                    article = gemini_write_article(text, title_src, url)
                    title, body = extract_title_and_body(article)
                    slug_base = slugify(title)
                    slug = f"{slug_base}-{int(time.time())}"
                    excerpt = (body[:160].replace("\n", " ").strip() + "…") if len(body) > 160 else body
                    save_post(title, slug, body, excerpt, url)
                    print(f"  → Brouillon enregistré: {title[:50]}...")
                except Exception as e:
                    print(f"  → Erreur: {e}")
                time.sleep(2)
        except Exception as e:
            print(f"Serper query '{query}': {e}")
    print("Terminé.")


if __name__ == "__main__":
    main()
