# Données et sources — Enrichir le comparateur

## Procédure complète (relance script + vérifier les données)

1. **Supabase — exécuter la migration slug (une seule fois)**  
   Dans le **SQL Editor** Supabase : ouvrir et exécuter **`supabase/migrations/add_slug_to_banks.sql`**.  
   Sans ça, le site ne peut pas associer les données `bank_rates` aux fiches par URL.

2. **Lancer le script de scraping** (depuis la racine du projet) :
   ```bash
   source .venv/bin/activate
   # si pas encore de venv : python3 -m venv .venv && source .venv/bin/activate
   pip install -r scripts/requirements.txt
   python scripts/comparateur.py
   ```
   Le script charge les banques depuis Supabase, scrape (Firecrawl / Serper / PDF), extrait avec Gemini et remplit `bank_rates` et `rates_history`. Comptez ~5–10 min selon le nombre de banques.

3. **Vérifier que les données remontent**  
   - **Comparatif** (`/comparatif`) : cocher le critère « Coût » (et éventuellement « Éligibilité », « Cartes »). Les banques pour lesquelles le script a écrit dans `bank_rates` doivent afficher les valeurs (frais tenue compte, résumé conditions, etc.) au lieu de « — ».  
   - **Fiche** (ex. `/fiche/cpa`) : la section « Conditions d’ouverture », les blocs Coût/Frais (tenue compte, retrait, virement), Cartes, Éligibilité, etc. se remplissent à partir de `bank_rates` quand les slugs correspondent.

Si après le script tu vois encore des « — » pour une banque, soit elle n’a pas été scrapée (vérifier `scraping_logs` et les URLs dans `banks`), soit le slug dans `banks` ne correspond pas à celui utilisé sur le site (ex. `societe-generale-algerie` dans la migration).

---

## 1. Supabase : une seule chose à ajouter

Le site a besoin d’une colonne **`slug`** dans la table `banks` pour faire le lien entre les fiches (URL `/fiche/bna`, etc.) et les données Supabase.

**À faire une seule fois :** dans le **SQL Editor** de ton projet Supabase, exécute le fichier :

- **`supabase/migrations/add_slug_to_banks.sql`**

Ce script :
- ajoute la colonne `slug` à `banks` ;
- remplit les slugs pour les noms de banques déjà présents (AGB → `agb`, Société Générale → `societe-generale-algerie`, etc.).

Après ça, tu n’as **rien d’autre à créer** dans Supabase pour que le site et le script fonctionnent. Le schéma que tu as (banks, bank_rates, rates_history, scraping_logs, posts) suffit.

---

## 2. Lancer le script de scraping (comparateur)

```bash
# Depuis la racine du projet
python3 -m venv .venv
source .venv/bin/activate   # ou .venv\Scripts\activate sur Windows
pip install -r scripts/requirements.txt
python scripts/comparateur.py
```

Le script :
- charge les banques actives depuis Supabase ;
- scrape les sites / PDF (Firecrawl, LlamaParse) ou Serper selon `source_type` ;
- extrait les infos avec Gemini et envoie tout dans `bank_rates` et `rates_history`.

Assure-toi que ton `.env` contient les clés (Supabase, Firecrawl, Serper, Gemini, etc.). Voir `.env.example` si besoin.

---

## 3. Données « réelles » : forums, blogs, réseaux sociaux

L’idée : compléter les sources **officielles** (sites banques, tarifs) par des **retours d’expérience** (délai carte, encaissement chèque, etc.) pour afficher des **estimations / moyennes** utiles.

### Options possibles (sans tout casser)

| Approche | Idée | Limites gratuites / effort |
|----------|------|----------------------------|
| **Sondage / formulaire** | Les visiteurs indiquent leur banque + délai vécu (carte, chèque). Tu agrèges en « environ X jours ». | Gratuit, demande de la traction pour avoir assez de réponses. |
| **Curation manuelle** | Tu lis forums (ex. Facebook groupes Algérie, forums banques), tu notes « BNA : 5–7 j pour la carte » et tu les mets dans un tableau ou un champ en base. | Gratuit, un peu de temps. |
| **Firecrawl + recherche** | Tu fais une recherche Google (Serper/Bing) « BNA délai carte bancaire », tu scrapes 2–3 URLs (forums, articles) et tu passes le texte à Gemini pour en tirer une estimation. | Reste dans les quotas gratuits Serper/Firecrawl ; bien préciser dans le prompt de ne donner qu’une estimation et de citer la source. |
| **Apify / scrapers forums** | Scraper des pages de forums ou de groupes (avec respect des CGU et robots.txt). | Souvent payant au-delà du gratuit ; à réserver si tu veux industrialiser. |

### Recommandation courte

1. **Court terme**  
   - Garder le script actuel (sites officiels + PDF + Serper) comme base.  
   - Ajouter **une section « Délais / expérience »** sur les fiches (et éventuellement dans le comparatif) avec des champs du type :  
     - *Délai moyen création carte (indicatif)*  
     - *Encaissement chèque (indicatif)*  
   - Remplir ces champs **à la main** au début à partir de ce que tu trouves sur les forums / réseaux, avec une source du type « retours utilisateurs, forums ».

2. **Moyen terme**  
   - Si tu veux automatiser un peu : 1 requête Serper par banque du type « [Nom banque] délai carte bancaire Algérie », 1–2 URLs scrapées (Firecrawl), 1 passage Gemini « résume en une phrase indicatif + mentionne si c’est un forum ».  
   - Stocker le résultat en base (ex. champ `delai_carte_indicatif` ou dans un bloc « Témoignages / estimations »).  
   - Toujours afficher **« Indicatif, basé sur des retours en ligne »** pour rester honnête et éviter les erreurs.

3. **Réseaux sociaux**  
   - Pour Facebook / Twitter / LinkedIn : les APIs gratuites sont très limitées.  
   - Le plus réaliste : **curation manuelle** (copier-coller de quelques témoignages) ou un **sondage** sur le site pour accumuler tes propres données.

### Exemple de libellé sur le site

Sur la fiche ou le comparatif :

- **Délai création carte (indicatif)** : « ~5–7 jours ouvrés (retours utilisateurs, à titre indicatif). »  
- **Encaissement chèque (indicatif)** : « Variable selon agence ; souvent 2–5 jours (retours forums). »

Cela rend le site plus utile sans promettre des chiffres officiels, et tu restes dans les limites gratuites si tu automatises peu (1 recherche + 1–2 scrapes par banque de temps en temps).
