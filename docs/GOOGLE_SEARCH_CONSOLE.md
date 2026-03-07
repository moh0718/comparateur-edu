# Validation Google Search Console

## Méthode recommandée : Balise HTML

La balise meta est déjà présente dans le layout. Dans Search Console :

1. Choisir **« Balise HTML »** (pas « Fichier HTML »).
2. Cliquer sur **Vérifier**.

Aucune configuration supplémentaire.

---

## Méthode Fichier HTML (si vous tenez à l’utiliser)

Google exige le **contenu exact** du fichier qu’il vous propose au téléchargement. Le site sert ce contenu via une variable d’environnement :

1. Dans Search Console, méthode **« Importer un fichier HTML »**, cliquez sur **Télécharger** le fichier de validation.
2. Ouvrez le fichier téléchargé avec un éditeur de texte et **copiez tout le contenu** (sans rien modifier).
3. Dans **Vercel** → projet → **Settings** → **Environment Variables**, ajoutez :
   - **Name** : `GOOGLE_SITE_VERIFICATION_FILE_CONTENT`
   - **Value** : collez le contenu copié à l’étape 2.
4. Redéployez le site (ou attendez le prochain déploiement).
5. Revenez dans Search Console et cliquez sur **Vérifier**.

L’URL `https://votresite.com/google48a9bad5586aa6d8.html` renverra alors exactement ce que Google attend.
