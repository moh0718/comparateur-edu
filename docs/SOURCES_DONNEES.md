# Les 4 sources de données et comment les traiter

| Source | Outil | Ce qu'on y trouve |
|--------|-------|-------------------|
| Site officiel de l'école | Firecrawl | Description, programmes, diplômes, admissions |
| Google Maps / Places API | Google Places API (gratuit) | Horaires, avis, photos, phone, adresse exacte |
| Instagram / Facebook | Apify Instagram Scraper | Tarifs (souvent dans les stories), ambiance, photos |
| Serper + médias / forums | Serper → Firecrawl cible | Avis parents, comparatifs, témoignages, coûts réels |

Variables d'environnement associées : `FIRECRAWL_API_KEY`, `GOOGLE_PLACES_API_KEY`, `APIFY_API_KEY`, `SERPER_API_KEY`.
