# Admin, publicité et SEO

## 1. Se connecter à l’espace admin

L’admin ne se déverrouille **pas** avec un simple mot de passe : il faut un **compte Supabase Auth** (email + mot de passe) **et** que ton email soit autorisé.

### Étapes

1. **Créer un utilisateur dans Supabase**  
   - Ouvre ton projet sur [supabase.com](https://supabase.com) → **Authentication** → **Users**.  
   - Clique sur **Add user** → **Create new user**.  
   - Saisis l’**email** (ex. celui que tu utilises pour le projet) et un **mot de passe** (minimum 6 caractères).  
   - Valide. L’utilisateur est créé.

2. **Autoriser cet email pour l’admin**  
   Le code n’accepte que l’email défini dans la variable d’environnement **`ADMIN_ALLOWED_EMAIL`**.  
   - En local : dans ton `.env`, ajoute (en remplaçant par ton email) :
     ```
     ADMIN_ALLOWED_EMAIL=ton-email@exemple.com
     ```
   - Sur Vercel : **Settings** → **Environment Variables** → ajoute `ADMIN_ALLOWED_EMAIL` avec le même email.  
   - Si tu ne mets pas cette variable, la valeur par défaut dans le code est utilisée (voir `lib/supabase/middleware.ts`).

3. **Connexion**  
   - Va sur **`https://ton-site.com/login`** (ou `https://ton-projet.vercel.app/login`).  
   - Saisis **exactement** le même **email** et le **mot de passe** que dans Supabase.  
   - Clique sur **Se connecter**. Tu es redirigé vers **`/admin`**.

En résumé : **email + mot de passe** (compte Supabase), et l’email doit être celui défini dans `ADMIN_ALLOWED_EMAIL`. Pas uniquement un mot de passe.

---

## 2. Vendre des espaces publicitaires (monétisation)

Ce n’est **pas** Google **AdWords** : AdWords (maintenant Google Ads) sert à **acheter** des clics. Pour **afficher** des annonces sur ton site et être rémunéré, c’est **Google AdSense**.

### Option A : Google AdSense (recommandé pour démarrer)

- Tu t’inscris sur [google.com/adsense](https://www.google.com/adsense).  
- Google vérifie ton site (traffic, contenu, conformité).  
- Une fois accepté, tu récupères un **script** et un **identifiant** (ex. `ca-pub-XXXXXXXX`).  
- Tu ajoutes le script sur tes pages et tu places des **blocs** (emplacements) où les annonces s’afficheront.

Dans ce projet, des emplacements sont déjà prévus (composants **`AdSlotSkyscraper`** et **`AdSlotRectangle`** dans `components/AdSlot.tsx`). Ils sont pour l’instant invisibles (largeur 0). Pour activer AdSense plus tard :

1. Créer un composant (ex. `AdSenseSkyscraper`) qui injecte le script AdSense et un bloc avec ton `data-ad-client` et `data-ad-slot`.  
2. Remplacer `<AdSlotSkyscraper />` par ce composant aux endroits où tu veux une pub (sidebar, etc.) et donner une vraie largeur/hauteur (ex. 160×600 pour le skyscraper).

Tu peux trouver des exemples “Next.js + AdSense” en cherchant “Next.js Google AdSense component”.

### Option B : Vente directe d’espaces (bannières)

Quand tu auras du trafic, tu peux vendre des emplacements à des banques, assureurs ou comparateurs. Dans ce cas :

- Tu héberges une **image** ou un **tag** fourni par l’annonceur.  
- Tu peux garder les mêmes zones (skyscraper, rectangle) mais au lieu du script AdSense, tu affiches une balise `<a href="..."><img src="..." /></a>` ou un iframe.  
- Le contrat (tarif, durée, format) se fait en direct avec l’annonceur.

En résumé : **AdSense** = config côté Google (script + blocs) ; **vente directe** = tu affiches ce que l’annonceur te donne dans les mêmes emplacements.

---

## 3. SEO avec l’URL Vercel : les Algériens me trouveront ?

**Oui.** Un site hébergé sur Vercel (ex. `ton-projet.vercel.app`) est **indexable** par Google et les autres moteurs. Si le contenu est en français et ciblé “banques Algérie”, les Algériens peuvent te trouver en cherchant des requêtes comme “comparateur banques algériennes”, “meilleure banque Algérie”, etc.

Pour **mieux** apparaître en Algérie et donner une image pro :

1. **Domaine personnalisé**  
   Utilise un nom dédié (ex. **kompar-banque.dz** ou **kompar-banque.com**) et le configurer dans Vercel (Domain). C’est plus mémorisable et souvent mieux perçu que `xxx.vercel.app`.

2. **Contenu et technique**  
   - Titres et meta descriptions clairs (déjà en place avec ton SEO).  
   - URLs propres (fiches, comparatif, blog).  
   - Site rapide (Next.js + Vercel le permettent).  
   - Contenu utile (fiches, comparatif, articles) pour que Google considère le site comme pertinent.

3. **Géolocalisation**  
   Google utilise surtout la langue et le contenu pour cibler. Du contenu “banques Algérie” en français aide pour les recherches depuis l’Algérie ou “banque Algérie” depuis la France. Tu peux aussi ajouter dans les meta ou le schema.org une indication géographique (ex. “Algérie”) si tu veux renforcer le signal.

En résumé : **avec l’URL Vercel tu es déjà visible en SEO**. Un domaine personnalisé (.dz ou .com) et un bon contenu améliorent encore les chances que les Algériens te trouvent.
