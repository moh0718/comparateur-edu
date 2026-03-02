# Salons étudiants — Scraping et mise à jour

Objectif : alimenter la page [Salons étudiants en Algérie](/salons-etudiants) avec des événements réels (SAFEX, salons régionaux, etc.) via scraping + résumé Gemini.

## Données cibles

Pour chaque salon :

- **nom** (ex. SAFEX Alger)
- **description** (court résumé)
- **dates** (ex. "Octobre 2025")
- **adresse** / **lieu** (ville, wilaya)
- **conditions_inscription** (lien ou texte)
- **site_web**
- **annee**

Structure actuelle : `data/salons-mock.ts` → type `SalonEtudiant`, tableau `salonsMock`.

## Sources à scraper

1. **SAFEX** (Salon Africain de l’Étudiant et de la Formation)  
   - Rechercher URL officielle (ex. safex.dz ou pages Facebook/événements).  
   - Scraper : dates, lieu (Alger, Palais des Expositions), conditions, édition.

2. **Salons régionaux**  
   - Oran, Constantine, Annaba : pages MESRS, universités, ou annonces presse.  
   - Moteur de recherche : "salon étudiant Oran 2025", "salon orientation Alger".

3. **Agrégation**  
   - Option : Serper (comme `blog_generator`) pour "salon étudiant Algérie 2025", puis Firecrawl sur les URLs.  
   - Gemini : à partir du texte scrapé, extraire nom, dates, lieu, conditions, site et produire un objet JSON par événement.

## Script suggéré (à créer)

Emplacement : `scripts/update_salons.py`

- **Étape 1** : Serper 2–3 requêtes ("SAFEX Alger 2025", "salon orientation étudiant Algérie").  
- **Étape 2** : Firecrawl sur les 5–10 URLs les plus pertinentes.  
- **Étape 3** : Gemini avec prompt du type :  
  "À partir du contenu suivant, liste les salons/événements d'orientation pour étudiants en Algérie. Pour chaque événement, retourne un objet JSON avec : nom, description, dates, adresse, lieu, conditions_inscription, site_web, annee. Réponds uniquement par un tableau JSON."  
- **Étape 4** : Écrire `data/salons-generated.json` ou upsert en base (table `salons` si elle existe).  
- **Étape 5** : Mise à jour manuelle ou CI : copier dans `salons-mock.ts` ou importer en Supabase.

## Dépendances

Les mêmes que `blog_generator.py` : `requests`, `python-dotenv`, `tenacity`. Variables d’environnement : `SERPER_API_KEY`, `FIRECRAWL_API_KEY`, `GEMINI_API_KEY`.

## Fréquence

Salons = peu fréquents (1–2 fois par an par ville). Lancer le script en début d’année scolaire et avant les périodes d’orientation (septembre–octobre, janvier–février).
