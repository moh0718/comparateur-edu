# Configurer Supabase pour que le site fonctionne sur Vercel

L’erreur **"Your project's URL and Key are required to create a Supabase client!"** signifie que les variables Supabase ne sont pas définies (ou pas prises en compte) sur Vercel.

## 1. Récupérer l’URL et les clés Supabase

1. Va sur [https://supabase.com/dashboard](https://supabase.com/dashboard) et connecte-toi.
2. Ouvre ton projet (ou crée-en un : **New project**).
3. Dans le menu de gauche : **Settings** (roue dentée) → **API**.
4. Tu y verras :
   - **Project URL** (ex. `https://xxxxx.supabase.co`)
   - **Project API keys** :
     - **anon public** : clé publique, safe pour le navigateur.
     - **service_role** : clé secrète, à utiliser uniquement côté serveur (scripts, API).

## 2. Ajouter les variables dans Vercel

1. Ouvre ton projet sur [Vercel](https://vercel.com) → **Settings** → **Environment Variables**.
2. Ajoute **exactement** ces variables (remplace les valeurs par les tiennes) :

| Name | Value | Environment |
|------|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://TON_PROJECT_REF.supabase.co` | Production (et Preview si tu veux) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | La clé **anon public** (longue chaîne) | Production (et Preview) |
| `SUPABASE_SERVICE_ROLE_KEY` | La clé **service_role** | Production (et Preview) |

3. **Save**.
4. **Redéploie** le projet : **Deployments** → menu du dernier déploiement → **Redeploy** (sans refaire un push, pour prendre en compte les nouvelles variables).

## 3. Vérifier

Après le redéploiement, recharge ton site. L’erreur doit disparaître et la connexion Supabase (auth admin, etc.) doit fonctionner.

Si l’erreur persiste : vérifie qu’il n’y a pas de typo dans les noms des variables (`NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`) et que tu as bien redéployé après les avoir ajoutées.
