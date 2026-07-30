export type FaqItem = {
  id: string;
  question: string;
  emoji: string;
  preview: string;
  full: string;
};

// Source unique des questions/réponses de la FAQ, partagée entre la page
// (affichage) et le layout (données structurées FAQPage pour le SEO/GEO).
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "Qu'est-ce que kompar - edu ?",
    emoji: "🎓",
    preview:
      "Portail indépendant d'orientation scolaire et professionnelle en Algérie : annuaire des établissements privés (Alger, Blida, Tipaza, Boumerdès), comparateur gratuit, fiches métiers et accompagnement personnalisé.",
    full:
      "Portail indépendant d'orientation scolaire et professionnelle en Algérie : annuaire des établissements privés (Alger, Blida, Tipaza, Boumerdès), comparateur gratuit, fiches métiers et accompagnement personnalisé. Notre objectif est de centraliser les informations sur les écoles, universités et formations pour simplifier votre prise de décision, sans remplacer les conseils officiels des établissements ni ceux des services d'orientation publics.",
  },
  {
    id: "2",
    question: "Comment fonctionne le comparateur ?",
    emoji: "⚡",
    preview:
      "Vous répondez à quelques questions sur votre situation (wilaya, niveau, budget, critères) et le comparateur vous propose les 5 établissements les plus adaptés à votre profil.",
    full:
      "Vous répondez à quelques questions sur votre situation (wilaya, niveau, budget, critères) et le comparateur affiche directement, à la fin, les 5 établissements les plus adaptés à votre profil — sans inscription. Vous pouvez aussi consulter l'annuaire et utiliser les filtres pour explorer par vous-même (catégorie, wilaya, langue d'enseignement, MESRS, etc.).",
  },
  {
    id: "3",
    question: "Quels établissements sont répertoriés ?",
    emoji: "🏫",
    preview:
      "Écoles privées, universités et grandes écoles, centres de langues, formations professionnelles, établissements de santé et crèches/maternelles dans les wilayas d'Alger, Blida, Tipaza et Boumerdès.",
    full:
      "Écoles privées, universités et grandes écoles, centres de langues, formations professionnelles, établissements de santé et crèches/maternelles dans les wilayas d'Alger, Blida, Tipaza et Boumerdès. Nous couvrons également des établissements publics à titre informatif. L'annuaire est alimenté automatiquement à partir de sources publiques (Google Maps, sites officiels, réseaux sociaux) et mis à jour régulièrement.",
  },
  {
    id: "4",
    question: "Est-ce que les informations sont à jour ?",
    emoji: "🕒",
    preview:
      "L'annuaire est mis à jour automatiquement chaque semaine via un crawler qui agrège les données depuis les sites officiels, Google Maps et les réseaux sociaux.",
    full:
      "L'annuaire est mis à jour automatiquement chaque semaine via un crawler qui agrège les données depuis les sites officiels, Google Maps et les réseaux sociaux. Les frais d'inscription, horaires et programmes peuvent toutefois évoluer côté établissements. Nous indiquons un indice de confiance (haute / moyenne / basse) sur chaque fiche. Vérifiez toujours les détails directement auprès de l'établissement avant toute décision.",
  },
  {
    id: "5",
    question: "Que signifie la reconnaissance MESRS ?",
    emoji: "📜",
    preview:
      "Le MESRS (Ministère de l'Enseignement Supérieur et de la Recherche Scientifique) accrédite certains établissements privés. Un diplôme délivré par un établissement reconnu MESRS a une valeur officielle en Algérie.",
    full:
      "Le MESRS (Ministère de l'Enseignement Supérieur et de la Recherche Scientifique) accrédite certains établissements privés. Un diplôme délivré par un établissement reconnu MESRS a une valeur officielle en Algérie et est généralement requis pour les concours de la fonction publique. Nous indiquons cet attribut sur chaque fiche établissement lorsque l'information est disponible. En cas de doute, vérifiez auprès de l'établissement ou sur le site officiel du MESRS.",
  },
  {
    id: "6",
    question: "Le service est-il gratuit ?",
    emoji: "💰",
    preview:
      "Oui, entièrement gratuit pour les élèves, étudiants et parents. Nous ne percevons aucune commission sur les inscriptions.",
    full:
      "Oui, entièrement gratuit pour les élèves, étudiants et parents. Nous ne percevons aucune commission sur les inscriptions. Notre modèle repose sur des partenariats avec des établissements qui souhaitent améliorer leur visibilité (fiche vérifiée, mise en avant). Cela ne biaise pas les recommandations : le comparateur reste objectif et basé uniquement sur la correspondance avec votre profil.",
  },
  {
    id: "7",
    question: "Mes données personnelles sont-elles sécurisées ?",
    emoji: "🔒",
    preview:
      "Aucune donnée personnelle n'est stockée sur le site. Le formulaire d'orientation n'exige aucune information de contact : vos réponses servent uniquement à afficher vos recommandations à l'écran.",
    full:
      "Aucune donnée personnelle n'est stockée sur le site ni dans aucune base de données. Le formulaire d'orientation ne demande ni nom, ni email, ni numéro de téléphone : vos réponses sont utilisées uniquement, côté navigateur, pour afficher vos établissements recommandés, puis oubliées. Pour nous écrire, vous pouvez utiliser la page Contact (par email).",
  },
  {
    id: "8",
    question: "Dois-je fournir toutes mes informations personnelles ?",
    emoji: "👤",
    preview:
      "Non. Seuls la wilaya, le type de formation et quelques critères sont nécessaires pour les recommandations. Nom et email sont optionnels.",
    full:
      "Non. Seuls la wilaya, le type de formation et quelques critères (budget, langue, MESRS, etc.) sont nécessaires pour obtenir des recommandations pertinentes. Aucune information de contact n'est demandée. Vous pouvez aussi consulter l'annuaire complet sans remplir aucun formulaire.",
  },
  {
    id: "9",
    question: "Comment puis-je signaler une erreur sur une fiche ?",
    emoji: "✉️",
    preview:
      "Contactez-nous via la page Contact ou directement par email. Nous mettons à jour les fiches manuellement en cas d'erreur signalée.",
    full:
      "Contactez-nous via la page Contact ou directement par email. Indiquez le nom de l'établissement et la correction souhaitée. Nous mettons à jour les fiches manuellement en priorité pour les erreurs signalées. Les établissements peuvent aussi nous contacter pour revendiquer leur fiche et maintenir leurs informations à jour.",
  },
  {
    id: "10",
    question: "Qui peut utiliser kompar - edu ?",
    emoji: "👥",
    preview:
      "Toute personne concernée par l'orientation scolaire ou professionnelle en Algérie : élèves, étudiants, parents, ou professionnels en reconversion.",
    full:
      "Toute personne concernée par l'orientation scolaire ou professionnelle en Algérie : élèves du primaire au lycée, étudiants post-bac, parents cherchant une école pour leurs enfants, ou professionnels en reconversion cherchant une formation. Le comparateur couvre toutes les catégories : préscolaire, général, supérieur, langues, formation pro et santé.",
  },
  {
    id: "11",
    question: "Puis-je contacter directement les établissements ?",
    emoji: "📞",
    preview:
      "Oui. Chaque fiche établissement affiche les coordonnées disponibles : adresse, téléphone, site web, email et réseaux sociaux.",
    full:
      "Oui. Chaque fiche établissement affiche les coordonnées disponibles : adresse avec lien Google Maps, téléphone, site web, email de contact, page Facebook et compte Instagram. Pour les établissements sans coordonnées publiques, le formulaire d'orientation kompar - edu permet de les contacter via notre équipe.",
  },
  {
    id: "12",
    question: "Pourquoi remplir le formulaire d'orientation ?",
    emoji: "📝",
    preview:
      "Pour afficher, à la fin, une sélection personnalisée de 3 à 5 établissements adaptés à votre profil, wilaya, budget et critères — directement à l'écran.",
    full:
      "Pour afficher, à la fin, une sélection personnalisée de 3 à 5 établissements adaptés à votre profil, wilaya, budget et critères — directement à l'écran. Sans ces réponses, il est difficile de cibler les établissements qui vous correspondent vraiment parmi les centaines référencés. C'est gratuit, sans engagement et prend moins de 2 minutes.",
  },
  {
    id: "13",
    question: "Je ne trouve pas ma question ici — que faire ?",
    emoji: "💬",
    preview:
      "Contactez-nous via la page Contact. Nous répondons à toutes les questions liées à l'orientation scolaire et à l'utilisation du comparateur.",
    full:
      "Contactez-nous via la page Contact ou directement par email. Nous répondons à toutes les questions liées à l'orientation scolaire, à l'utilisation du comparateur et aux établissements référencés. Si vous êtes un établissement souhaitant apparaître ou mettre à jour votre fiche, vous pouvez également nous écrire.",
  },
];
