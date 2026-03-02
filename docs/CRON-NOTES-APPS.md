# Mise à jour mensuelle des notes d’applications (App Store / Google Play)

Les notes des apps bancaires sont récupérées par le script principal `comparateur.py` (à chaque run) et peuvent être mises à jour **sans refaire tout le scrape** avec le script dédié.

## Script dédié (notes seules)

```bash
cd scripts
pip install -r requirements.txt
python update_app_ratings.py
```

- Lit les banques actives et le mapping dans `app_store_mapping.json`.
- Pour chaque banque mappée : appelle l’API iTunes (App Store) et `google-play-scraper` (Google Play).
- Met à jour uniquement les colonnes `app_rating_apple` et `app_rating_google` dans `bank_rates` (PATCH Supabase).

## Cron mensuel (exemple)

Pour exécuter ce script tous les mois (ex. le 1er à 3h) :

**Sur un serveur (crontab) :**
```cron
0 3 1 * * cd /chemin/vers/comparateur-banques/scripts && /usr/bin/python3 update_app_ratings.py
```

**Avec Vercel Cron** (si le projet est sur Vercel) : créer une route API protégée qui appelle un job externe ou un service (e.g. cron-job.org) qui lance le script sur une machine où Python et les clés sont configurés.

**Alternative :** lancer à la main une fois par mois après avoir exécuté la migration SQL qui ajoute `app_rating_apple` et `app_rating_google` à `bank_rates`.

## Prérequis

1. **Supabase** : colonnes ajoutées (voir `supabase/migrations/add_app_ratings_to_bank_rates.sql`).
2. **Table `banks`** : avoir une colonne `slug` (déjà dans le schéma) pour faire le lien avec le mapping.
3. **Mapping** : compléter `scripts/app_store_mapping.json` avec les packages Google Play et les termes de recherche App Store pour chaque banque (clé = slug de la banque).
