# Supabase — Résumé de ce que tu as et ce qu’il faut faire

## Ce que tu as déjà fait

1. **Script 1** : Tu as exécuté le schéma qui crée les tables :
   - `banks` (id BIGINT, name, website_url, tarif_pdf_url, source_type, logo_url, is_active, created_at)
   - `bank_rates` (une ligne par banque, données riches)
   - `rates_history` (banque, infos JSONB, created_at)
   - `posts` (title, slug, content, status, created_at, published_at)
   - `scraping_logs` (bank_name, status, error_message, scraped_at)
   - RLS + politiques de lecture publique

2. **Script 2** : Tu as peuplé `banks` avec un premier jeu de banques (AGB, SGA, BNP, Al Salam, Al Baraka, CNEP, BEA, Baridimob, Banxy, BNA, CPA, BADR, Banque Algerie).

---

## Ce qui a été adapté dans le code (sans toucher à Supabase)

Le **script Python** `comparateur.py` et la **page admin** ont été alignés sur **ton** schéma :

- **Banks** : le script charge les banques avec `is_active = true` (plus `active`).
- **scraping_logs** : le script écrit maintenant `bank_name`, `status`, `error_message` (au lieu de banque, statut, message_erreur). L’admin lit `scraped_at`, `bank_name`, `status`, `error_message`.
- **posts** : l’admin lit `created_at` et `published_at` (plus `updated_at`). Le bouton « Publier » met à jour `status` et `published_at`.
- **banks** : l’admin lit `id`, `name`, `is_active` (plus `slug` ni `active`). Le toggle active/inactive met à jour uniquement `is_active`.
- **rates_history** : le script envoie un objet `{ banque, infos }` (JSONB) comme dans ta table.

Tu n’as **rien à re-exécuter** sur Supabase pour ces changements : tout est côté code.

---

## Migration : notes des applications (App Store / Google Play)

Pour afficher les notes des apps bancaires sur les fiches et le comparatif, exécute dans le **SQL Editor Supabase** le fichier :

`supabase/migrations/add_app_ratings_to_bank_rates.sql`

Cela ajoute à `bank_rates` les colonnes `app_rating_apple` et `app_rating_google` (REAL). Si tu ne les ajoutes pas, le site affichera « Note indisponible » sans erreur.

---

## Ce que tu peux faire sur Supabase (optionnel)

1. **Enrichir la liste des banques**  
   Si tu veux que le robot scrape plus d’établissements, ajoute des lignes dans `banks` (via l’interface Table Editor ou un nouvel `INSERT`), avec au minimum :
   - `name` (ex. "BNH (Banque Nationale de l'Habitat)")
   - `website_url` ou une requête pour `source_type = 'serper'`
   - `source_type` : `'direct'` ou `'serper'`
   - `is_active` : `true`

2. **Vérifier les politiques RLS**  
   Tu as déjà des politiques « Lecture publique » sur `bank_rates`, `banks`, et « Lecture articles publiés » sur `posts`. Pour que l’admin (authentifié) puisse modifier les données, il faut des politiques **INSERT/UPDATE** sur `posts` et `banks` pour les utilisateurs autorisés (par exemple ton email). Si tu n’as pas encore ces politiques et que l’admin doit pouvoir publier des articles ou activer/désactiver des banques, on peut les ajouter au schéma la prochaine fois.

---

## En résumé

- **Supabase** : tu gardes tes deux scripts et tes tables telles quelles.
- **Code** : il est déjà adapté à tes noms de colonnes (`is_active`, `bank_name`, `status`, `error_message`, `scraped_at`, `published_at`).
- **Optionnel** : ajouter des banques dans `banks` et, si besoin, des politiques RLS pour que l’admin puisse écrire (publier des posts, toggle `is_active`).

Si tu veux, on peut détailler ensemble les politiques RLS pour l’admin ou un exemple d’`INSERT` pour les banques manquantes.
