# Résumé complet du site kompar - edu (comparateur-edu)

Ce document décrit le fonctionnement global du site : objectif, stack technique, design, dynamisme, animations, i18n, front, back, et les demandes réalisées pendant le développement.

---

## 1. Objectif du site

**kompar - edu** est le **premier comparateur neutre d’établissements scolaires en Algérie** (publics et privés). Il permet de :

- **Comparer** des établissements (filtres par wilaya, catégorie, tarifs, services).
- **S’orienter** via un formulaire en 5 étapes qui produit une **recommandation personnalisée** d’écoles.
- **Consulter** des articles de blog (guides tarifs, inscriptions, vie pratique, orientation).
- **Découvrir** les classements internationaux des universités algériennes (Rankings).
- **Contacter** l’équipe (formulaire + option WhatsApp).

Le positionnement : **données vérifiées, filtres avancés, recommandations gratuites**, avec un échange de valeur (formulaire d’orientation) pour mériter une recommandation personnalisée.

---

## 2. Stack technique

### Frontend

- **Next.js** (App Router) — dernières versions.
- **React** — composants fonctionnels, hooks.
- **TypeScript** — typage strict.
- **Tailwind CSS** (v4 avec PostCSS) — design system, couleurs, ombres, responsive.
- **Radix UI** (via `@radix-ui/react-slot`) — primitives accessibles.
- **Polices** : **Plus Jakarta Sans** (texte), **DM Serif Display** (titres) via `next/font`.

Pas de librairie d’animations externe (pas de Framer Motion) : animations au scroll et transitions faites en **JavaScript (Intersection Observer) + CSS (transitions)**.

### Backend / données

- **Supabase** : base de données et auth.
  - Table **`institutions`** : établissements (nom, slug, wilaya, catégorie, tarifs, langues, internat, transport, etc.).
  - Utilisation de **@supabase/ssr** et **@supabase/supabase-js** avec gestion des cookies Next (server + client).
- **Fallback** : si Supabase est indisponible ou vide, le site utilise des **données mock** (`data/institutions-mock.ts`, `data/posts-education.ts`, etc.).
- **API Routes Next.js** :
  - `POST /api/whatsapp-url` : génère une URL WhatsApp (wa.me) à partir d’un message (env : `WHATSAPP_NUMBER` / `NEXT_PUBLIC_WA_NUMBER`).
  - `POST /api/revalidate` : revalidation du cache Next (paths `/`, `/blog`, `/comparer`, `/etablissements`) protégée par `REVALIDATION_SECRET` (Bearer).
  - Routes bancaires (ex. `api/bank-rates-enrichment`, `api/bank-ratings`) pour des parties liées à un comparateur bancaire (famille Kompar).

### Hébergement / env

- Préparé pour **Vercel** (variables d’environnement : Supabase, lead form, WhatsApp, revalidation).
- **Lead form** : URL du formulaire d’orientation configurable via `NEXT_PUBLIC_LEAD_FORM_HREF` (défaut : `/orientation/1`).

---

## 3. Design et style

### Charte visuelle

- **Famille Kompar** : vert confiance (brand), neutres (slate).
- **Couleurs** :
  - `brand` : `#16a34a` (défaut), `brand-light` / `brand-dark` pour états.
  - Fond général : `slate-50`, texte `slate-900` / `slate-700`.
  - Accents : `emerald` pour badges, CTAs, liens.
- **Typographie** : `font-sans` (Plus Jakarta Sans), `font-display` (DM Serif Display) pour les titres.
- **Ombres** : `shadow-card`, `shadow-card-hover`, `shadow-soft` (définis dans `tailwind.config.js`).
- **Coins** : `rounded-xl`, `rounded-2xl`, boutons souvent `rounded-full`.

### Structure des pages

- **Layout global** : `Header` fixe en haut, bandeau valeur ajoutée (tagline), `main` avec contenu, `Footer`.
- **Largeur contenu** : `max-w-7xl` centré, padding responsive (`px-5 sm:px-6 md:px-8`).
- **Composants UI** : `Button` (variants primary/secondary), cartes avec `shadow-card`, filtres et barres de recherche cohérents.

### Accessibilité et SEO

- **Layout** : `lang` et `dir` (rtl pour l’arabe) sur `<html>` selon la langue.
- **Metadata** : titre, description, Open Graph, Twitter, canonical, JSON-LD (Organization, WebSite, Article sur les posts).
- **Sitemap** et **robots** générés (routes principales, blog, établissements).
- **ConsentModal** : bandeau consentement (WhatsApp, analytics) avec version et `localStorage`.

### Publicité

- **Emplacements pub** : composants `AdSlotSkyscraper` et `AdSlotRectangle` (pour l’instant sans dimensions visuelles ni script, prêts pour une intégration type AdSense).

---

## 4. Dynamisme et animations (tes demandes)

### 4.1 Animations au scroll — première version

Tu as demandé un rendu **dynamique, type Apple ou Fortuneo** : éléments qui bougent au scroll, effet moderne et technologique.

- **Composant `ScrollReveal`** (client) : basé sur **Intersection Observer**.
  - Quand un bloc entre dans la zone visible (avec une marge `rootMargin`), il passe en état “visible”.
  - Transitions en **CSS** (opacité, `transform`) avec une durée et un easing fluides.
- **Variantes initiales** : `fade-up`, `fade-in`, `scale`, `slide-up-3d` (léger effet 3D avec `perspective` et `rotateX`).
- **Page d’accueil** : hero, recherche, catégories, section “Pourquoi nous”, CTA et visuels enveloppés dans `ScrollReveal` avec ces variantes.

### 4.2 “Pas impressionnant” — renforcement des animations

Tu as trouvé la première version peu marquée. Les changements suivants ont été faits :

- **Durée** : 700 ms → **1000 ms**.
- **Easing** : courbe type “ease-out-expo” pour un rendu plus net.
- **Mouvements plus marqués** :
  - **fade-up-strong** : translation de **16 px** (au lieu de 6–8).
  - **scale** : départ à **95 %** (au lieu de 98 %).
  - **slide-up-3d** : **18°** de rotation, **60 px** de montée, perspective 1200 px.
  - **card-3d** (nouveau) : bloc “carte” avec **22°**, **80 px**, scale **0,92 → 1** pour un effet 3D plus visible.
- **Hero en deux temps** : le **texte** apparaît en **fade-up-strong**, puis la **carte comparateur** (à droite) en **card-3d** avec un délai de 180 ms, comme si elle “sortait” de l’écran.
- **Cascade (stagger)** : composant **`ScrollRevealStagger`** qui prend une liste d’enfants et les révèle un par un avec un délai (ex. 120–140 ms).
  - Section “Pourquoi nous” : les 3 cartes (✓, ⚖️, 💬) apparaissent en cascade.
  - Section visuels (images) : les 3 figures en cascade.
- **Respect de l’accessibilité** : si `prefers-reduced-motion: reduce` est activé, les animations sont désactivées (contenu affiché directement).

Résultat : une home plus vivante, avec un hero en deux temps, des blocs 3D plus marqués et des listes/cartes qui se dévoilent en cascade.

---

## 5. Internationalisation (i18n) — tes demandes

### 5.1 Mise en place globale

Tu as voulu un site **bilingue français / arabe**.

- **Cookie `lang`** : valeur `fr` ou `ar`, stockée côté client (path `/`, longue durée).
- **Layout** (`app/layout.tsx`) : lecture du cookie via `cookies()` (côté serveur), puis :
  - `lang` et `dir` (rtl pour l’arabe) sur `<html>`.
  - Enveloppe de l’app avec **`I18nProvider`** (contexte React) qui expose `lang`, `setLang`, et `t(key)`.
- **Dictionnaires** (`lib/i18n.ts`) : objets `fr` et `ar` avec des clés (ex. `nav.etablissements`, `home.hero.title`, `blog.cta.primary`). La fonction `t(lang, key)` renvoie la traduction selon la langue.
- **Composants client** : Header, Footer, pages listant du contenu utilisent **`useI18n()`** pour afficher les libellés et le sélecteur FR/AR (changement de langue + rechargement de la page pour que le serveur relise le cookie).

### 5.2 Blog et articles — traduction du contenu

Tu as demandé que **les articles du blog** soient disponibles en arabe : pas seulement les libellés de l’interface, mais **le contenu des articles** (titres, résumés, et si possible corps).

- **Modèle de données** (`data/posts-mock.ts`, type `Post`) : champs optionnels **`titleAr`**, **`excerptAr`**, **`contentAr`**.
- **Données** (`data/posts-education.ts`) : pour **chaque article** (19 au total), ajout des traductions **`titleAr`** et **`excerptAr`** (traductions réelles en arabe, noms propres et marques laissés tels quels).
- **Liste blog** (`app/blog/page.tsx`) : selon `lang` (cookie), affichage de `titleAr` / `excerptAr` quand présents ; tous les libellés (Lire l’article, Précédent, Suivant, CTA) passent par `t("blog.*")`.
- **Page article** (`app/blog/[slug]/page.tsx`) :
  - Lecture du cookie `lang` côté serveur.
  - **Métadonnées** (titre, description, OG, Twitter) : utilisation de `titleAr` / `excerptAr` quand `lang === "ar"`.
  - **Affichage** : titre (h1), résumé, partage social, articles similaires et JSON-LD utilisent la version arabe si disponible.
  - **Contenu** : le composant `ArticleContent` reçoit `lang` ; si `lang === "ar"` et que `post.contentAr` existe, ce contenu est affiché (sinon le corps reste en français).
  - **UI** : textes de la page (Partager, Retour au blog, Articles similaires, CTA, message “Article introuvable”) passent par `t(lang, "blog.article.*")` et `t(lang, "blog.cta.*")`.
  - **Date** : formatée avec `ar-DZ` ou `fr-FR` selon la langue.

Les clés i18n pour la page article ont été ajoutées en FR et AR dans `lib/i18n.ts` (ex. `blog.article.share`, `blog.article.back`, `blog.article.similar`).

---

## 6. Menu burger et navigation mobile — tes demandes

### 6.1 Problème initial

Sur mobile, le menu était “bizarre” : plusieurs liens en pastilles qui s’enchaînaient ou se recoupaient, pas de structure claire.

### 6.2 Solution : menu burger fluide

- **Barre header** : sur mobile, affichage du **logo**, d’un **bouton burger** (icône ☰) et du **bouton CTA** (“Trouver mon école”). Au clic sur le burger, l’icône devient une **croix (✕)**.
- **Panneau déroulant** : sous le header, un panneau qui s’ouvre avec une transition (max-height) et contient :
  - Une **liste verticale** de liens : Annuaire, puis le groupe “Métiers & Salons” (sous-titre + Fiches métiers, Salons en retrait), Le Mag', Rankings, Contact.
  - En bas : **sélecteur de langue** (FR/AR) et **bouton CTA** en pleine largeur.
- **Fermeture** : le menu se ferme quand on clique sur un lien (changement de page), quand la route change (useEffect sur `pathname`), ou quand on clique sur la **croix**.

### 6.3 Fermer sans choisir un lien — “revoir la page”

Tu as demandé que, si le visiteur ne veut rien choisir dans le menu, il puisse **revoir la page complète** : soit en cliquant sur une croix, soit en cliquant sur “le vide” (la page).

- **Croix** : déjà en place (bouton burger qui devient ✕ à l’ouverture).
- **Fond cliquable** : quand le menu burger est ouvert, un **overlay** (bouton sémantique) couvre la zone sous le header :
  - `position: fixed`, plein écran, `z-index` inférieur au panneau du menu.
  - Fond semi-transparent (`bg-slate-900/40`) + léger `backdrop-blur`.
  - Un **clic sur ce fond** ferme le menu et permet de “revoir la page” sans choisir d’entrée.
  - Accessible : `aria-label="Fermer le menu et revoir la page"`.
- **Comportement** : quand le menu est ouvert, le défilement du body est désactivé (`overflow: hidden`) pour éviter de scroller la page derrière.

### 6.4 Autres demandes navigation / footer

- **Menus en gras là où on est** : en **desktop**, le lien de la page courante a `font-semibold` ; dans le **menu burger**, le lien actif a en plus un fond vert clair (`bg-emerald-50`, `text-emerald-800`) pour bien montrer “où on est”.
- **Menu aligné en responsive mobile** : les liens du panneau burger sont en **liste verticale alignée** (pas de pastilles qui se recoupent), avec un sous-titre pour “Métiers & Salons” et des sous-liens en retrait.
- **Bouton “autre Kompar” dans le footer** : tu as demandé un lien vers l’autre site de la famille (kompar - banques). C’est en place : bloc “De la même famille” avec un **bouton** (style pill, vert) vers **kompar - banques · comparateur de banques en Algérie**, clé i18n `footer.family.bank`, lien `https://kompar-banques.vercel.app/` en nouvel onglet.

Résultat : navigation mobile claire, fermeture possible par la croix ou par un clic sur la page (overlay).

---

## 7. Fonctionnement métier et parcours

### 7.1 Annuaire des établissements

- **Page** : `app/etablissements/page.tsx`.
- **Données** : chargement côté serveur via **Supabase** (table `institutions`, `is_active = true`). En cas d’erreur ou de tableau vide, **fallback** sur `institutionsMock`.
- **Client** : `EtablissementsClient` reçoit la liste, gère **filtres** (recherche texte, catégorie, wilaya, etc.), **tri** et **affichage** (grille de cartes, tableau comparatif selon le contexte).
- **Fiche détail** : `app/etablissements/[slug]/page.tsx` pour une institution donnée.

### 7.2 Formulaire d’orientation (recommandation)

- **Parcours** : 5 étapes (`app/orientation/[step]/page.tsx`), config dans `lib/orientation-steps.ts` (wilaya, type de formation, budget, critères, langue / bac / internat / transport).
- **Réponses** : stockées en state (ou en cookie/session selon l’implémentation) et utilisées pour le **matching**.
- **Algorithme** (`lib/matching.ts`) : **`computeInstitutionScore`** score chaque établissement (0–100) selon :
  - Wilaya (poids fort), catégorie, budget, langue, critères (internat, transport, bac non requis).
  - Bonus selon `data_confidence` et `is_partner`.
- **Tri** : **`sortInstitutionsByMatch`** pour afficher les établissements les plus pertinents en premier.
- **Page de remerciement** : `app/orientation/merci/page.tsx` après soumission.

### 7.3 Blog

- **Source** : articles dans `data/posts-education.ts` (type `Post` dans `data/posts-mock.ts`), réexportés comme `posts`.
- **Liste** : `app/blog/page.tsx` — pagination ou liste, avec i18n (titres/résumés en arabe si `lang === "ar"`).
- **Article** : `app/blog/[slug]/page.tsx` — rendu du contenu (markdown-like en texte brut, paragraphes, listes, tableaux parsés), métadonnées et UI selon la langue, liens “articles similaires” via `relatedSlugs`.

### 7.4 Rankings

- **Page** : `app/rankings/page.tsx` avec composant client `RankingsClient` pour hero, CTAs et contenu des classements internationaux (ex. QS Arab), avec textes i18n.

### 7.5 Contact

- **Page** : `app/contact/page.tsx` avec formulaire (`ContactForm`).
- **Confirmation** : `app/contact/confirmation/page.tsx`.
- **WhatsApp** : possibilité d’envoyer un message via l’API `/api/whatsapp-url` pour ouvrir WhatsApp avec un texte prérempli.

### 7.6 Autres pages

- **Fiches métiers** : listes et fiches détail (`app/fiches-metiers`, `app/fiches-metiers/[slug]`), données dans `data/metiers-data.ts` / `data/metiers-mock.ts`.
- **Salons étudiants** : `app/salons-etudiants/page.tsx`, données dans `data/salons-mock.ts`.
- **FAQ**, **Mentions légales**, **Conditions générales** : pages statiques.
- **Admin** : `app/admin/page.tsx` — tableau de bord (auth Supabase, liste posts, institutions, logs de scraping) pour la gestion interne.

---

## 8. Récapitulatif de tes demandes et des réponses

| Demande | Réponse technique |
|--------|-------------------|
| **Animations au scroll type Apple/Fortuneo** | Composant `ScrollReveal` (Intersection Observer + CSS), variantes fade-up, scale, slide-up-3d ; appliqué sur la page d’accueil. |
| **“Pas impressionnant”** | Renforcement : durée 1000 ms, easing fort, fade-up-strong, card-3d, hero en deux temps, `ScrollRevealStagger` pour les cartes “Pourquoi nous” et visuels. |
| **i18n FR/AR** | Cookie `lang`, layout avec `lang`/`dir`, `I18nProvider`, dictionnaires dans `lib/i18n.ts`, Header/Footer et pages principales en `t(key)`. |
| **Blog en arabe** | Champs `titleAr`, `excerptAr`, `contentAr` sur les posts ; traduction de tous les titres/résumés dans `posts-education.ts` ; page liste et page article utilisent la langue pour métadonnées, affichage et UI. |
| **Menu mobile “bizarre”** | Remplacement par un **menu burger** : panneau déroulant avec liens **alignés** en liste verticale (responsive mobile), groupe Métiers & Salons, langue + CTA. |
| **Menus en gras là où on est** | **Desktop** : lien de la page courante en `font-semibold` (nav principale). **Menu burger** : lien actif avec `font-semibold` + fond `bg-emerald-50` / `text-emerald-800` pour bien identifier la page. |
| **Bouton “autre Kompar” dans le footer** | Lien **“De la même famille”** → **kompar - banques** (comparateur de banques en Algérie) : bouton style pill avec icône 🏦, `footer.family.bank` en i18n (FR/AR), ouvre `https://kompar-banques.vercel.app/` en nouvel onglet. |
| **Fermer le menu sans choisir** | Overlay cliquable (fond semi-transparent) + croix ; clic sur l’un ou l’autre ferme le menu et permet de revoir la page. |
| **Optimiser le site (SEO, GEO, templates, popin, alerte, phrase importante)** | Section 9 : stratégie SEO/GEO (`lib/seo.ts`, titleWithGeo, GEO_WILAYAS), par type de page ce qu’on met (titre, phrase, popin, CTA), popins existantes (ConsentModal, modal Quitter), phrases importantes (tagline, disclaimer, CTAs). Pistes : alerte annonce temporaire, phrase “données indicatives” sur fiches, centraliser phrases en i18n. |

---

## 9. Optimisation SEO / GEO, templates, popins, alertes et phrases importantes

Tu as demandé d’**optimiser le site pour le SEO et le GEO** (local), et d’avoir par type de page des **templates** clairs : **informer** tel élément, mettre une **popin**, une **alerte / annonce**, ou une **phrase importante**. Voici ce qui est en place et la logique à réutiliser.

### 9.1 Stratégie SEO et GEO (déjà en place)

- **Fichier central** : `lib/seo.ts`.
  - **SITE_NAME** : "kompar - edu".
  - **SITE_DESCRIPTION** : comparateur gratuit, agrégateur d’informations vérifiées, décision simplifiée + wilayas (Alger, Blida, Tipaza, Boumerdès).
  - **SITE_KEYWORDS** : positionnement ("comparateur gratuit écoles Algérie", "orientation scolaire Alger", "écoles privées Alger/Blida", "annuaire écoles Algerie", "MESRS reconnaissance diplômes", etc.) + géo.
  - **GEO_WILAYAS** : `["Alger", "Blida", "Tipaza", "Boumerdès"]`.
  - **titleWithGeo(baseTitle, wilaya?)** : génère un titre du type « [baseTitle] à [wilaya] | kompar - edu » ou « [baseTitle] en Algérie | kompar - edu » pour renforcer le GEO.
- **Layout global** (`app/layout.tsx`) : metadata (titre, description, keywords, OG, Twitter, canonical), JSON-LD Organization + WebSite, `lang` et `dir` sur `<html>` selon la langue.
- **Sitemap** (`app/sitemap.ts`) et **robots** (`app/robots.ts`) : générés à partir de `getBaseUrl()` et des routes principales.
- **Établissements** : layout `app/etablissements/layout.tsx` utilise **titleWithGeo** pour le titre de l’annuaire ; fiche établissement `[slug]` : metadata dynamique (nom, description, commune, wilaya) et schéma type LocalBusiness avec `addressLocality` pour le GEO.
- **Blog** : layout avec keywords ; page article avec titre/description selon langue (FR/AR), JSON-LD Article, canonical.
- **Doc** `docs/ADMIN_ADS_SEO.md` : rappel que l’URL Vercel est indexable ; domaine personnalisé (.dz / .com) et contenu ciblé “Algérie” pour mieux apparaître ; géolocalisation via contenu et meta/schema.

En résumé : **SEO** = titres/descriptions/keywords cohérents, URLs propres, JSON-LD, sitemap/robots. **GEO** = wilayas dans les keywords, `titleWithGeo` sur les pages annuaire/fiches, et indication géographique dans les schémas (ex. adresse, Algérie).

### 9.2 Par type de page / template — ce qu’on met où

Idée : **sur chaque type de page, on peut “rajouter ça, informer ça, mettre une popin, une alerte annonce, une phrase importante”**. Ce qui existe aujourd’hui :

| Type de page | Titre / meta | Phrase importante / annonce | Popin / alerte | CTA principal |
|--------------|--------------|-----------------------------|----------------|---------------|
| **Accueil** | metadata layout + page | Bandeau header (tagline) : « 1er comparateur neutre… données vérifiées, filtres avancés… » ; texte “Pourquoi nous” (tiers de confiance, échange de valeur). | — | Trouver mon école, Comparer les établissements |
| **Annuaire établissements** | titleWithGeo dans layout | — | — | Filtres + liste ; CTA “Trouver mon école” (header) |
| **Fiche établissement** | generateMetadata (nom, description, commune/wilaya) | — | — | CTA contact / WhatsApp selon fiche |
| **Blog (liste)** | layout blog (keywords) | — | — | Lire l’article ; CTA blog en bas de liste |
| **Article blog** | titre/description selon lang (FR/AR) | En bas d’article : « Utilisez notre comparateur… » (CTA texte). | — | Trouver mon école ; Partager |
| **Orientation / Recommandation (étapes)** | titre par étape | Questions + options. | **Modal “Quitter ?”** (showQuitModal) si on clique “Abandonner” : confirmer avant de quitter le parcours. | Suivant / Valider ; “Abandonner” ouvre la popin |
| **Contact** | SITE_NAME + Contact | — | — | Envoyer ; option WhatsApp |
| **Contact confirmation** | page de remerciement | Message de confirmation. | — | Retour accueil / autre action |
| **Rankings** | titre + keywords | Badge “Données sources officielles”, phrase d’accroche hero. | — | Trouver mon école, Partager |
| **Global (toutes pages)** | — | **Bandeau header** : tagline (phrase de positionnement). **Footer** : **disclaimer** (informations à titre informatif, pas conseil officiel, vérifier auprès des établissements, site géré par un particulier). | **ConsentModal** : bandeau consentement (WhatsApp, analytics) au premier visit ; une fois accepté/refusé, stocké en localStorage, plus affiché. | Header : Trouver mon école |

À faire selon tes envies (sans répéter ce qui est déjà là) :
- **Informer** : sur les fiches établissement ou les articles, ajouter une courte phrase du type “Données à titre indicatif — vérifier auprès de l’établissement” si ce n’est pas déjà présent.
- **Popin** : réutiliser le même pattern que la modal “Quitter ?” (orientation/recommandation) pour d’autres actions (ex. “Enregistrer mes critères”, “Être rappelé”).
- **Alerte annonce** : un bandeau temporaire (ex. “Rentrée 2026 : inscriptions ouvertes”) en haut ou sous le header, closable, possiblement par page (template) ou global.
- **Phrase importante** : centraliser dans `lib/i18n.ts` (ex. “Comparateur gratuit · Tiers de confiance”, “Données indicatives”, “1er comparateur neutre…”) et les afficher aux bons endroits par template (hero, encart, footer).

### 9.3 Popins et modals existantes

- **ConsentModal** (`components/ConsentModal.tsx`) : bandeau (modal) consentement cookies / WhatsApp / analytics ; version stockée en localStorage ; une fois choisi, plus affiché. C’est l’**annonce / alerte** globale “on vous demande votre accord”.
- **Modal “Quitter le parcours”** (orientation `app/orientation/[step]/page.tsx` et recommandation `app/recommandation/[step]/page.tsx`) : **popin** de confirmation avant d’abandonner le formulaire (bouton “Abandonner” → ouvrir la modale → “Rester” / “Quitter”). Accessible (role dialog, aria-modal, focus sur le bouton d’annulation).

Pour **toute nouvelle popin ou alerte annonce** sur un type de page : réutiliser le même pattern (état `showX`, overlay + div centrée, bouton fermer / accepter, aria) et, si c’est une “phrase importante”, la mettre en clé i18n pour FR/AR.

### 9.4 Phrases importantes et annonces déjà présentes

- **Header** : `header.tagline` (FR/AR) — « 1er comparateur neutre d’établissements scolaires en Algérie — publics et privés, données vérifiées, filtres avancés et recommandations gratuites par WhatsApp. »
- **Footer** : `footer.disclaimer` (FR/AR) — informations à titre informatif, pas conseil pédagogique officiel, vérifier auprès des établissements, site géré par un particulier, non affilié.
- **Home** : “Comparateur gratuit · Tiers de confiance”, “Pourquoi kompar - edu ?”, “Décision simplifiée”, “Échange valeur/information”.
- **Blog** : CTA sous les articles (“Utilisez notre comparateur…”, “Trouver mon école”) et libellés de partage / retour.
- **Rankings** : badge “Données issues de sources officielles internationales”, titre et sous-titre hero.

Pour **optimiser encore le SEO / GEO** sans te répéter : on peut ajouter sur certaines templates (fiches établissement, fiches métiers, salons) une **phrase courte géo** (ex. “Établissement à Alger” / “Formation en Algérie”) dans le titre ou en début de contenu, et s’assurer que les **annonces / alertes** (bandeau rentrée, événement) sont courtes et claires pour le référencement (titres de section, aria-label).

---

## 10. Fichiers clés (référence rapide)

- **Layout / global** : `app/layout.tsx`, `app/globals.css`, `tailwind.config.js`
- **i18n** : `lib/i18n.ts`, `components/i18n/I18nProvider.tsx`
- **Navigation** : `lib/navigation.ts`, `components/Header.tsx`, `components/Footer.tsx`
- **Animations** : `components/ScrollReveal.tsx`, `app/page.tsx` (sections enveloppées)
- **Données** : `data/posts-education.ts`, `data/posts-mock.ts`, `data/institutions-mock.ts`, `lib/supabase/server.ts`
- **Blog** : `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- **Orientation** : `lib/orientation-steps.ts`, `lib/matching.ts`, `app/orientation/[step]/page.tsx`
- **API** : `app/api/whatsapp-url/route.ts`, `app/api/revalidate/route.ts`

---

*Document généré pour refléter l’état du projet et les demandes réalisées pendant les échanges de développement.*
