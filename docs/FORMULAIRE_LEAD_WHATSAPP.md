# Formulaire lead et récap sur WhatsApp — est-ce que ça marche ?

## Réponse courte

**Oui, ça peut fonctionner**, mais **tu dois configurer ton numéro WhatsApp** dans l’environnement (Vercel ou `.env`). Sans ça, le bouton « Recevoir sur WhatsApp » reste désactivé et l’API renvoie une erreur.

**Tu recevras le récap sur ton WhatsApp** lorsque le visiteur, après avoir rempli le formulaire, clique sur « Recevoir sur WhatsApp » puis **envoie** le message qui s’ouvre dans WhatsApp. Le site ne peut pas envoyer le message à ta place : c’est le visiteur qui l’envoie vers ton numéro (design « zéro stockage », consentement).

---

## Comment c’est fait aujourd’hui

1. **Formulaire d’orientation** (`/orientation/1` … `/orientation/6`)  
   Le visiteur remplit les 5 étapes (wilaya, type, budget, critères, langue). Les réponses sont en **sessionStorage** (rien n’est enregistré sur un serveur).

2. **Étape 6 — Résultat**  
   - Affichage des établissements recommandés (algorithme de matching).  
   - Bloc **« Recevez cette sélection sur WhatsApp »** : le visiteur saisit **son** numéro (pour afficher un champ obligatoire), puis clique sur **« Recevoir sur WhatsApp »**.

3. **Côté front**  
   - Le front construit un **récap texte** des réponses (wilaya, type, budget, critère, langue + phrase type « Je souhaite recevoir des recommandations… ») via `buildOrientationWhatsAppMessage` (`lib/orientation-steps.ts`).  
   - Il envoie ce message à l’API :  
     `POST /api/whatsapp-url` avec `{ "message": "…" }`.

4. **API** (`app/api/whatsapp-url/route.ts`)  
   - Elle lit **ton** numéro (celui sur lequel tu veux recevoir les leads) dans :  
     `process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WA_NUMBER`.  
   - Si ce numéro est absent ou trop court (&lt; 8 caractères), elle répond **503** « Service non configuré ».  
   - Sinon elle répond :  
     `{ "url": "https://wa.me/TON_NUMERO?text=..." }`  
     où le `text` est le récap encodé pour l’URL.

5. **Côté front après la réponse**  
   - Si l’API renvoie bien une `url`, le front fait :  
     `window.open(data.url, "_blank")`  
     puis redirige le visiteur vers la page **Merci** (`/orientation/merci`).  
   - Donc **WhatsApp s’ouvre** (app ou web) avec un message **pré-rempli** et **adressé à ton numéro**.  
   - C’est le **visiteur** qui doit cliquer sur **Envoyer** dans WhatsApp.  
   - Dès qu’il envoie, **toi tu reçois ce récap sur ton WhatsApp**.

---

## Ce que tu dois configurer pour que ça marche

- **En production (Vercel)** :  
  - Va dans **Settings → Environment Variables**.  
  - Ajoute au moins **une** des deux variables suivantes (ton numéro au format international **sans +**, ex. Algérie = 213…) :  
    - **`WHATSAPP_NUMBER`** (côté serveur, utilisé par l’API),  
    - **ou** **`NEXT_PUBLIC_WA_NUMBER`** (visible côté client et utilisé par l’API ; permet aussi d’activer le bouton « Recevoir sur WhatsApp »).  
  - Exemple : `NEXT_PUBLIC_WA_NUMBER=213661234567`.

- **En local** :  
  - Dans ton fichier **`.env`** (copié depuis `.env.example`), ajoute la même variable avec ton vrai numéro :  
    `NEXT_PUBLIC_WA_NUMBER=213...`

- **Important** :  
  - Si **aucun** de ces deux numéros n’est défini (ou trop court), l’API renvoie 503 et le bouton reste **désactivé** (`disabled={!waNumber}` côté orientation étape 6).  
  - Le numéro dans l’URL `wa.me/...` est **le tien** (celui qui reçoit les leads). Le message est envoyé **par le visiteur** vers toi.

---

## Récap : tu recevras bien le récap sur ton numéro ?

- **Oui**, à condition que :  
  1. **WHATSAPP_NUMBER** ou **NEXT_PUBLIC_WA_NUMBER** soit bien renseigné (Vercel + `.env` en local).  
  2. Le visiteur clique sur « Recevoir sur WhatsApp », puis **envoie** le message dans la fenêtre / l’app WhatsApp qui s’ouvre.

- **Non**, si :  
  - Les variables d’environnement ne sont pas configurées (bouton désactivé ou API 503),  
  - ou le visiteur ferme WhatsApp sans envoyer le message.

Le site ne stocke pas les réponses et n’envoie pas de message serveur vers WhatsApp : tout passe par un lien `wa.me` ouvert chez le visiteur, qui envoie lui-même le récap vers ton numéro. C’est voulu (RGPD, zéro stockage, consentement).
