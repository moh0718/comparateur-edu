# Scripts

## comparateur.py

Scrape les banques (Firecrawl / Serper / LlamaParse), extraction Gemini, upsert Supabase, revalidation ISR.

---

## blog_generator.py

Génère des articles de blog à partir d’actualités (Serper News → Firecrawl → Gemini → Supabase).

- **ÉTAPE 1** : Serper News — 3 dernières actualités (requête « banque finance Algérie actualité », `hl=fr`).
- **ÉTAPE 2** : Firecrawl extrait le texte complet de chaque article.
- **ÉTAPE 3** : Gemini rédige un article ~500 mots (titre, intro 100 mots, 3 points clés, conclusion 50 mots, citation source). Pas de sujet polémique.
- **ÉTAPE 4** : Insert dans la table `posts` avec `status='draft'` et `source_type='auto'`. Jamais `published` automatiquement.

**Variables d’environnement** : `SERPER_API_KEY`, `FIRECRAWL_API_KEY`, `GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

**Lancement** : `python scripts/blog_generator.py`

---

### Installation

```bash
pip install -r scripts/requirements.txt
```

### Variables d'environnement (.env à la racine)

- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — Supabase
- `FIRECRAWL_API_KEY`, `LLAMAPARSE_API_KEY`, `SERPER_API_KEY`, `GEMINI_API_KEY`
- `RESEND_API_KEY`, `MY_EMAIL` — alertes en cas d’échec
- `REVALIDATION_SECRET`, `VERCEL_REVALIDATE_URL` — revalidation ISR (ex. `https://ton-site.com/api/revalidate`)

### Lancement

```bash
cd /chemin/vers/comparateur-banques
python scripts/comparateur.py
```

### Table Supabase `banks`

Colonnes attendues (à adapter selon ton schéma) : `id`, `name`, `slug`, `source_type` (`direct` | `serper`), `website_url`, `tarif_pdf_url`, `active` (ou `is_active`).

**Alimenter la table** : le script ne scrape que les banques présentes dans `banks` avec `active = true`. Pour couvrir toutes les banques algériennes (BNA, CPA, BEA, BDL, BADR, Société Générale Algérie, BNP Paribas El Djazaïr, AGB, Algérie Poste, Banxy, etc.), insérer les lignes dans Supabase. Un exemple d’insert est commenté dans `supabase/schema-posts-scraping_logs.sql`.
