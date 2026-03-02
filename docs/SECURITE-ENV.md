# Sécurité — variables d'environnement

- **Ne jamais committer** le fichier `.env` (ni `.env.local`, etc.) : il contient des secrets (clés API, mots de passe).
- Le fichier `.env` est listé dans `.gitignore`. Vérifier avec `git status` qu'il n'apparaît pas avant un commit.
- Pour partager la structure des variables sans exposer les valeurs : utiliser `.env.example` (sans secrets, avec des placeholders). Copier en `.env` et remplir en local.
