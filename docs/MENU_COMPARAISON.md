# Comparaison menu demandé vs implémenté

## Ton menu (notes d’origine)

| # | Élément | Rôle |
|---|--------|------|
| 1 | **Logo** | Cliquable → Accueil |
| 2 | **Trouver mon École** | CTA principal / Lead Gen — **bouton** couleur contrastée, doit "sauter aux yeux" |
| 3 | **Écoles** | Maternelle → Lycée |
| 4 | **Universités** | Licence, Master, Grandes Écoles |
| 5 | **Formations Pro** | BTS, Langues, Hôtesse, Sans Bac |
| 6 | **Métiers & Salaires** | Fiches métiers, Débouchés → à étendre avec **Salons étudiants en Algérie** sous un nom commun, sous-menu au survol |
| 7 | **Le Mag'** | Blog & conseils SEO |
| 8 | **Contact** | Lien ou bouton secondaire |

---

## Ce qui est en place actuellement

| # | Élément actuel | Correspondance |
|---|----------------|----------------|
| 1 | Logo "Comparateur Edu" → Accueil | ✅ Logo OK |
| 2 | Bouton vert **"Me faire orienter"** (CTA) | ⚠️ Même rôle que "Trouver mon École" mais libellé différent |
| 3 | **Établissements** (lien) | ⚠️ Annuaire global, pas découpé en Écoles / Universités / Formations Pro |
| 4 | **Comparer** (lien) | ➕ En plus de ta liste (comparateur côte à côte) |
| 5 | **Blog** (lien) | ✅ Équivalent "Le Mag'" |
| 6 | **Contact** (lien) | ✅ OK |
| — | **Métiers & Salaires** / Fiches métiers / Salons | ❌ Pas encore en place |

---

## Recommandations

### 1. Aligner le CTA sur ton wording
- **Garder** le CTA en bouton bien visible à droite.
- **Changer** le libellé en **"Trouver mon École"** (ou "Trouver mon établissement") pour coller à ton menu et au lead gen.

### 2. Structurer le menu comme dans ta maquette
- **Écoles** → pointe vers l’annuaire filtré **Maternelle → Lycée** (ex. `/etablissements?categorie=General` ou page dédiée).
- **Universités** → annuaire filtré **Supérieur** (ex. `/etablissements?categorie=Superieur`).
- **Formations Pro** → annuaire filtré **Formation Pro** (ex. `/etablissements?categorie=Formation Pro`).
- **Comparer** peut rester en lien secondaire ou s’intégrer à l’un de ces blocs selon ta priorité.

### 3. Nom commun pour Fiches métiers + Salons étudiants
- **"Métiers & Salons"** : court, clair, rassemble fiches métiers + salons étudiants.
- **Sous-menu au survol** :  
  - Fiches métiers  
  - Salons étudiants en Algérie  
- Seuls les **liens du menu** (et le bouton CTA) sont cliquables ; le parent peut être un lien "Métiers & Salons" vers une page hub ou un simple déclencheur du sous-menu.

### 4. SEO (Google Trends + "page alternative à…")
- **Google Trends** : utiliser pour sujets saisonniers (rentrée, bac, brevet, orientation) et créer des articles dans **Le Mag'** aux bons moments.
- **Pages alternatives / guides** : créer des contenus du type "Tout savoir sur…", "Guide [filière]", "Alternatives à [formation/métier]" pour capter la demande déjà en phase de décision ; les intégrer au **Blog** (Le Mag') et les lier depuis les fiches métiers / établissements quand c’est pertinent.

---

## Suite implémentée dans le code

- **Header** : menu complet (Logo, **Trouver mon École** en CTA vert, Écoles, Universités, Formations Pro, **Métiers & Salons** avec dropdown au survol, Le Mag', Contact). Mobile : liens sans dropdown.
- **Routes** : `ROUTES.ecoles` / `universites` / `formationsPro` (filtres annuaire), `ROUTES.fichesMetiers`, `ROUTES.salonsEtudiants`, `/fiches-metiers/[slug]`.
- **Pages** :
  - **Fiches métiers** : liste de métiers (tous domaines/filières) ; fiche type : description, missions, défis, diplômes requis, salaires, évolutions, compétences/qualités (données préparées / générées par Gemini).
  - **Salons étudiants en Algérie** : liste d’événements (SAFEX, etc.) ; pour chaque : nom, description, dates, adresse, conditions d’inscription (scraping + résumé Gemini).

Tu peux utiliser ce fichier comme référence pour garder le menu et la structure alignés avec tes notes.
