/**
 * Fiches métiers — source unique pour toutes les pages (SEO, pas d'API).
 * Données 2025-2026, estimations marché algérien. Voir disclaimer sur les salaires.
 */

import type { FicheMetier } from "./metiers-mock";

function slugify(titre: string): string {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const DISCLAIMER_SALAIRES =
  "Les salaires indiqués sont des estimations moyennes du marché algérien (2025-2026), selon l'expérience, la wilaya, le secteur public/privé et la taille de l'entreprise. À titre indicatif uniquement.";

/** Secteurs pour filtre et affichage (ordre d'affichage). */
export const SECTEURS = [
  "Médecine et Santé",
  "Ingénierie et Industrie",
  "Informatique et Numérique",
  "Économie, Gestion et Finance",
  "Droit et Sciences Politiques",
  "Architecture, Urbanisme et BTP",
  "Agriculture et Environnement",
  "Éducation et Recherche",
  "Communication, Médias et Arts",
  "Commerce et Marketing",
  "Tourisme, Hôtellerie et Restauration",
  "Psychologie et Sciences Sociales",
  "Sciences Fondamentales",
  "Métiers du Sport",
  "Artisanat et Bâtiment",
  "Sécurité et Défense",
  "Métiers émergents et Numérique",
  "Transport et Logistique",
  "Métiers du quotidien et Services",
] as const;

function m(
  titre: string,
  domaine: string,
  description: string,
  salaires: string,
  formation: string,
  options?: Partial<FicheMetier>
): FicheMetier {
  const slug = options?.slug ?? slugify(titre);
  return {
    id: slug,
    slug,
    titre,
    domaine,
    description,
    salaires,
    diplomes_requis: formation ? [formation] : undefined,
    ...options,
  };
}

/** Liste complète des fiches métiers — une seule source pour build statique (generateStaticParams). */
export const METIERS_DATA: FicheMetier[] = [
  // ——— SECTEUR 1 — MÉDECINE ET SANTÉ ———
  m(
    "Médecin généraliste",
    "Médecine et Santé",
    "Diagnostique et traite les maladies courantes, oriente vers les spécialistes.",
    "Débutant public : 80 000 – 100 000 DA. Confirmé : 100 000 – 130 000 DA. Cabinet privé : 200 000 – 500 000 DA (estimations).",
    "7 ans (doctorat en médecine)",
    {
      diplomes_requis: ["Doctorat en médecine (7 ans)", "Facultés de médecine (Alger, Oran, Constantine, Annaba, Sétif, etc.)"],
      missions: ["Consulter et diagnostiquer les patients", "Prescrire traitements et examens", "Orienter vers les spécialistes", "Suivi des maladies chroniques", "Prévention et éducation à la santé"],
      challenges: ["Charge de travail élevée en secteur public", "Gestion du temps entre consultations", "Veille médicale continue"],
      perspectives_evolution: ["Spécialisation (4 ans)", "Ouverture cabinet privé", "Enseignement ou recherche"],
      competences_qualites: ["Empathie", "Rigueur diagnostique", "Communication", "Résistance au stress"],
    }
  ),
  m(
    "Médecin spécialiste",
    "Médecine et Santé",
    "Cardiologue, neurologue, dermatologue, pédiatre, gynécologue… 4 ans de spécialisation après le doctorat.",
    "Public : 130 000 – 220 000 DA. Privé : 400 000 DA et plus selon la spécialité (estimations).",
    "Doctorat + 4 ans spécialisation",
    {
      diplomes_requis: ["Doctorat en médecine", "DES (diplôme d'études spécialisées) 4 ans", "Facultés de médecine algériennes"],
      missions: ["Consultations spécialisées", "Actes techniques (examens, interventions)", "Travail en équipe avec généralistes et hôpitaux", "Recherche clinique possible"],
      challenges: ["Parcours long et sélectif", "Disponibilité (urgences, gardes)", "Équipements selon wilaya"],
      perspectives_evolution: ["Cabinet privé", "Pratique mixte public-privé", "Enseignement universitaire"],
      competences_qualites: ["Expertise pointue", "Dextérité pour certains actes", "Patience", "Organisation"],
    }
  ),
  m(
    "Chirurgien",
    "Médecine et Santé",
    "Réalise des opérations chirurgicales. Formation longue (11-14 ans total).",
    "Public : 150 000 – 250 000 DA. Clinique privée : souvent au-delà de 500 000 DA (estimations).",
    "11-14 ans (médecine + spécialisation chirurgie)",
    {
      diplomes_requis: ["Doctorat en médecine", "Spécialisation chirurgie (CHU)", "Formation souvent complétée à l'étranger pour sous-spécialités"],
      missions: ["Opérations programmées et urgences", "Visites pré et post-opératoires", "Collaboration avec anesthésistes et équipes", "Enseignement des internes"],
      challenges: ["Horaires chargés et gardes", "Stress opératoire", "Équipements et blocs opératoires"],
      perspectives_evolution: ["Chirurgie privée", "Sous-spécialisation (cardiaque, neuro, etc.)", "Recherche"],
      competences_qualites: ["Dextérité", "Sang-froid", "Travail d'équipe", "Prise de décision rapide"],
    }
  ),
  m(
    "Chirurgien-dentiste",
    "Médecine et Santé",
    "Soins bucco-dentaires, extractions, prothèses.",
    "Public : 70 000 – 120 000 DA. Cabinet privé : 200 000 – 600 000 DA (estimations).",
    "6 ans",
    {
      diplomes_requis: ["Diplôme de docteur en chirurgie dentaire (6 ans)", "Facultés de médecine / odontologie (Alger, Oran, Constantine, etc.)"],
      missions: ["Soins caries, dévitalisations", "Extractions et chirurgie buccale", "Pose de prothèses et implants", "Prévention et détartrage"],
      challenges: ["Coût du matériel en cabinet", "Gestion de la douleur patient", "Concurrence et positionnement"],
      perspectives_evolution: ["Cabinet propre", "Spécialisation (orthodontie, implantologie)", "Partage public-privé"],
      competences_qualites: ["Précision manuelle", "Relation patient", "Hygiène rigoureuse", "Gestion du stress"],
    }
  ),
  m(
    "Pharmacien",
    "Médecine et Santé",
    "Délivre les médicaments, conseille les patients.",
    "Débutant officine : 150 000 – 220 000 DA. Confirmé / propriétaire : 220 000 – 400 000 DA (estimations).",
    "6 ans",
    {
      diplomes_requis: ["Diplôme de pharmacien (6 ans)", "Facultés de pharmacie (Alger, Constantine, etc.)"],
      missions: ["Délivrance des ordonnances", "Conseil patient et bon usage du médicament", "Gestion des stocks et commandes", "Vigilance et signalement"],
      challenges: ["Réglementation et contrefaçons", "Pénuries ponctuelles", "Gestion commerciale si propriétaire"],
      perspectives_evolution: ["Propriétaire d'officine", "Industrie pharmaceutique (Saidal, etc.)", "Distribution"],
      competences_qualites: ["Rigueur", "Pédagogie", "Organisation", "Sens du contact"],
    }
  ),
  m(
    "Infirmier / Infirmière",
    "Médecine et Santé",
    "Soins aux patients sous prescription médicale.",
    "Public : 35 000 – 65 000 DA. Clinique privée : 50 000 – 90 000 DA (estimations).",
    "3 ans (IFSI)",
    {
      diplomes_requis: ["Diplôme d'État infirmier", "IFSI (Instituts de formation en soins infirmiers)", "BAC + 3"],
      missions: ["Administration des soins et médicaments", "Surveillance des constantes et état des patients", "Aide aux actes médicaux", "Accueil et information des familles"],
      challenges: ["Horaires décalés et gardes", "Charge émotionnelle", "Effectifs parfois limités"],
      perspectives_evolution: ["Cadre de santé", "Spécialisation (bloc, puériculture)", "Clinique privée ou libéral"],
      competences_qualites: ["Empathie", "Résistance au stress", "Rigueur hygiène", "Travail en équipe"],
    }
  ),
  m(
    "Sage-femme",
    "Médecine et Santé",
    "Accompagne les grossesses et accouchements.",
    "Public : 45 000 – 80 000 DA. Privé : 80 000 – 150 000 DA (estimations).",
    "4 ans",
    {
      diplomes_requis: ["Diplôme d'État de sage-femme", "Écoles de sages-femmes (formation 4 ans après concours)"],
      missions: ["Suivi des grossesses normales", "Accouchements et suites de couches", "Consultations et planning familial", "Sensibilisation à la santé maternelle"],
      challenges: ["Gardes et urgences", "Charge affective", "Conditions matérielles selon établissement"],
      perspectives_evolution: ["Cadre de santé", "Exercice libéral (suivi à domicile)", "Formation"],
      competences_qualites: ["Calme", "Écoute", "Décision rapide", "Empathie"],
    }
  ),
  m(
    "Kinésithérapeute",
    "Médecine et Santé",
    "Rééducation fonctionnelle, traitement de la douleur.",
    "Salarié : 60 000 – 100 000 DA. Cabinet privé : 80 000 – 200 000 DA (estimations).",
    "4 ans",
    {
      diplomes_requis: ["Diplôme d'État de masseur-kinésithérapeute", "Formation 4 ans (écoles agréées)"],
      missions: ["Rééducation après accident ou chirurgie", "Traitement de la douleur (dos, articulations)", "Rééducation respiratoire et neurologique", "Conseils et prévention"],
      challenges: ["Diversité des pathologies", "Régularité des séances à assurer", "Installation en cabinet"],
      perspectives_evolution: ["Cabinet propre", "Kiné du sport", "Freelance possible (prestations à domicile)"],
      competences_qualites: ["Patience", "Écoute", "Sens du contact", "Rigueur technique"],
    }
  ),
  m(
    "Psychologue clinicien",
    "Médecine et Santé",
    "Accompagnement psychologique, thérapies.",
    "Public : 45 000 – 80 000 DA. Cabinet privé : 80 000 – 180 000 DA (estimations).",
    "Master (5 ans)",
    {
      diplomes_requis: ["Master en Psychologie clinique (5 ans)", "Universités (Alger, Oran, Tizi Ouzou, etc.)"],
      missions: ["Entretiens et évaluations psychologiques", "Thérapies individuelles ou de groupe", "Bilans et rapports", "Prévention et orientation"],
      challenges: ["Déontologie et confidentialité", "Charge émotionnelle", "Reconnaissance du métier selon contexte"],
      perspectives_evolution: ["Cabinet libéral", "Hôpitaux et CMP", "Recherche ou enseignement"],
      competences_qualites: ["Écoute", "Empathie", "Neutralité bienveillante", "Résilience"],
    }
  ),
  m(
    "Radiologue",
    "Médecine et Santé",
    "Interprète les examens d'imagerie médicale (scanner, IRM, radio).",
    "Secteur privé : 300 000 – 700 000 DA (estimations). Profil très demandé.",
    "7 ans + 4 ans spécialisation",
    {
      diplomes_requis: ["Doctorat en médecine", "DES en radiologie et imagerie médicale", "CHU et centres équipés"],
      missions: ["Interprétation d'imagerie (radio, scanner, IRM, écho)", "Rapports pour les cliniciens", "Participation à des gestes guidés (ponctions)", "Veille sur les protocoles"],
      challenges: ["Équipements coûteux", "Formation continue", "Disponibilité pour urgences"],
      perspectives_evolution: ["Cabinet ou clinique privée", "Imagerie interventionnelle", "Enseignement"],
      competences_qualites: ["Analyse d'images", "Rigueur", "Travail en équipe", "Réactivité"],
    }
  ),
  m(
    "Biologiste médical",
    "Médecine et Santé",
    "Analyse les prélèvements biologiques (sang, urine).",
    "Laboratoire privé : 120 000 – 280 000 DA (estimations).",
    "6 ans",
    {
      diplomes_requis: ["Diplôme de biologiste médical (6 ans)", "Facultés de médecine / biologie"],
      missions: ["Validation des analyses biologiques", "Supervision des techniciens", "Interprétation et rapport aux prescripteurs", "Contrôle qualité et accréditation"],
      challenges: ["Équipements et réactifs", "Délais de rendu", "Normes et qualité"],
      perspectives_evolution: ["Laboratoire privé", "Recherche", "Industrie pharmaceutique"],
      competences_qualites: ["Rigueur", "Esprit d'analyse", "Organisation", "Réactivité"],
    }
  ),
  m(
    "Vétérinaire",
    "Médecine et Santé",
    "Soins aux animaux, santé publique, contrôle alimentaire.",
    "Public : 60 000 – 100 000 DA. Clinique privée : 120 000 – 300 000 DA (estimations).",
    "5 ans",
    {
      diplomes_requis: ["Diplôme de docteur vétérinaire", "École nationale vétérinaire (Alger) ou équivalent"],
      missions: ["Consultations et soins aux animaux", "Chirurgie et vaccinations", "Contrôle sanitaire (abattoirs, élevages)", "Santé publique et zoonoses"],
      challenges: ["Déplacements en zone rurale", "Gestion des urgences", "Sensibilisation des propriétaires"],
      perspectives_evolution: ["Clinique privée", "Spécialisation (équidés, NAC)", "Administration ou coopératives"],
      competences_qualites: ["Contact animal", "Sang-froid", "Polyvalence", "Rigueur sanitaire"],
    }
  ),
  m(
    "Orthophoniste",
    "Médecine et Santé",
    "Rééducation des troubles du langage et de la communication. Forte demande, profil rare en Algérie.",
    "Cabinet privé : 70 000 – 180 000 DA (estimations).",
    "4 ans",
    {
      diplomes_requis: ["Diplôme d'orthophoniste", "Formation 4 ans (écoles agréées, souvent à l'étranger ou formations locales)"],
      missions: ["Bilans du langage oral et écrit", "Rééducation des troubles (bégaiement, dyslexie, etc.)", "Suivi des enfants et adultes", "Travail avec familles et écoles"],
      challenges: ["Peu de formations en Algérie", "Demande forte", "Patience et régularité des séances"],
      perspectives_evolution: ["Cabinet libéral", "Écoles et structures spécialisées", "Partenariats avec médecins"],
      competences_qualites: ["Patience", "Créativité", "Écoute", "Pédagogie"],
    }
  ),
  m(
    "Nutritionniste / Diététicien",
    "Médecine et Santé",
    "Conseils alimentaires, gestion des pathologies liées à l'alimentation.",
    "Cabinet : 60 000 – 150 000 DA (estimations).",
    "Licence ou Master",
    {
      diplomes_requis: ["Licence ou Master en Nutrition / Diététique", "Universités (sciences de la vie, ST)"],
      missions: ["Bilans nutritionnels", "Conseils personnalisés (poids, diabète, sport)", "Éducation alimentaire", "Travail avec médecins et structures"],
      challenges: ["Adhésion des patients", "Reconnaissance du métier", "Diversification des revenus"],
      perspectives_evolution: ["Cabinet", "Cliniques et hôpitaux", "Entreprises (restauration collective)"],
      competences_qualites: ["Écoute", "Pédagogie", "Rigueur scientifique", "Empathie"],
    }
  ),
  m(
    "Technicien de laboratoire médical",
    "Médecine et Santé",
    "Réalise les analyses biologiques sous supervision.",
    "Public : 30 000 – 55 000 DA. Privé : 45 000 – 80 000 DA (estimations).",
    "3 ans",
    {
      diplomes_requis: ["Diplôme de technicien de laboratoire", "Instituts de formation paramédicale", "BTS ou équivalent"],
      missions: ["Réalisation des analyses (sang, urines, etc.)", "Utilisation des automates et techniques", "Contrôle qualité", "Transmission des résultats au biologiste"],
      challenges: ["Rythme et délais", "Normes d'hygiène", "Évolution des techniques"],
      perspectives_evolution: ["Technicien senior", "Spécialisation (biologie moléculaire)", "Laboratoire privé"],
      competences_qualites: ["Rigueur", "Précision", "Organisation", "Travail en équipe"],
    }
  ),
  // ——— SECTEUR 2 — INGÉNIERIE ET INDUSTRIE ———
  m(
    "Ingénieur en génie civil",
    "Ingénierie et Industrie",
    "Conception et supervision de constructions (bâtiments, ponts, routes).",
    "Débutant bureau d'études : 80 000 – 120 000 DA. Confirmé : 120 000 – 160 000 DA. Grands groupes : jusqu'à 250 000 DA (estimations).",
    "5 ans",
    {
      diplomes_requis: ["Diplôme d'ingénieur en génie civil (5 ans)", "ENP (École Nationale Polytechnique), USTHB, universités (Batna, Biskra, etc.)"],
      missions: ["Conception et dimensionnement d'ouvrages", "Plans et cahiers des charges", "Suivi de chantier et contrôle", "Études de sol et structures"],
      challenges: ["Responsabilité technique et juridique", "Délais et coûts", "Travail terrain selon poste"],
      perspectives_evolution: ["Chef de projet", "Bureau d'études indépendant", "Expertise ou enseignement"],
      competences_qualites: ["Rigueur", "Esprit d'analyse", "Travail en équipe", "Gestion du stress"],
    }
  ),
  m(
    "Ingénieur en génie mécanique",
    "Ingénierie et Industrie",
    "Conception de systèmes mécaniques, maintenance industrielle.",
    "Débutant : 80 000 – 120 000 DA. Confirmé : 120 000 – 180 000 DA (estimations).",
    "5 ans",
    {
      diplomes_requis: ["Diplôme d'ingénieur en génie mécanique", "ENP, USTHB, universités (Annaba, Batna, etc.)"],
      missions: ["Conception de pièces et systèmes", "Maintenance et fiabilité", "Optimisation des process", "CAO et simulations"],
      challenges: ["Veille technologique", "Contraintes de production", "Sécurité des équipements"],
      perspectives_evolution: ["Responsable maintenance", "Bureau d'études", "Industrie automobile ou aéronautique"],
      competences_qualites: ["Esprit technique", "Rigueur", "Autonomie", "Travail en atelier"],
    }
  ),
  m(
    "Ingénieur en génie électrique",
    "Ingénierie et Industrie",
    "Réseaux électriques, automatismes, énergie.",
    "Sonelgaz, Sonatrach et privé : 90 000 – 200 000 DA (estimations).",
    "5 ans",
    {
      diplomes_requis: ["Diplôme d'ingénieur en électrotechnique / génie électrique", "ENP, USTHB, universités"],
      missions: ["Dimensionnement d'installations électriques", "Automatismes et contrôle-commande", "Réseaux HT/BT", "Maintenance et dépannage"],
      challenges: ["Normes et sécurité", "Évolution des énergies renouvelables", "Charge de travail terrain"],
      perspectives_evolution: ["Sonelgaz, Sonatrach", "Bureaux d'études", "Energies renouvelables"],
      competences_qualites: ["Logique", "Précision", "Sens des normes", "Travail en équipe"],
    }
  ),
  m(
    "Ingénieur pétrolier",
    "Ingénierie et Industrie",
    "Exploration, forage, production d'hydrocarbures.",
    "Sonatrach : 150 000 – 400 000 DA + avantages. Multinationales : encore plus élevé (estimations).",
    "5 ans (Boumerdès, ENSP)",
    {
      diplomes_requis: ["Diplôme d'ingénieur pétrolier ou génie des procédés", "ENSP (École Nationale Supérieure du Pétrole, Boumerdès)", "USTHB, ENP"],
      missions: ["Études de gisements", "Forage et production", "Optimisation des puits", "Travail sur sites ou en bureau"],
      challenges: ["Sites parfois éloignés", "Exigences sécurité", "Concurrence internationale"],
      perspectives_evolution: ["Sonatrach et filiales", "Partenaires étrangers (TotalEnergies, etc.)", "Expatriation possible"],
      competences_qualites: ["Rigueur", "Esprit d'analyse", "Anglais technique", "Adaptation terrain"],
    }
  ),
  m(
    "Ingénieur en sécurité industrielle / HSE",
    "Ingénierie et Industrie",
    "Prévention des risques, conformité réglementaire. Très demandé.",
    "Énergie et BTP : 100 000 – 250 000 DA (estimations).",
    "5 ans ou spécialisation post-Licence",
    {
      diplomes_requis: ["Ingénieur + spécialisation HSE", "Certifications (NEBOSH, IOSH) appréciées", "Universités et formations continues"],
      missions: ["Audits sécurité et conformité", "Formation des équipes", "Analyse des risques", "Suivi des indicateurs et rapports"],
      challenges: ["Faire respecter les règles", "Urgences et accidents", "Évolution des normes"],
      perspectives_evolution: ["Responsable HSE groupe", "Consultant", "Secteur pétrolier et BTP"],
      competences_qualites: ["Autorité bienveillante", "Pédagogie", "Rigueur", "Réactivité"],
    }
  ),
  m(
    "Technicien supérieur en maintenance industrielle",
    "Ingénierie et Industrie",
    "Entretien préventif et curatif des équipements.",
    "Industrie : 45 000 – 90 000 DA (estimations).",
    "BTS (2-3 ans)",
    {
      diplomes_requis: ["BTS Maintenance industrielle", "CFPA, instituts techniques", "Licence pro possible"],
      missions: ["Maintenance préventive et corrective", "Dépannage sur machines", "Gestion des pièces", "Rapports et traçabilité"],
      challenges: ["Disponibilité", "Diversité des équipements", "Contraintes de production"],
      perspectives_evolution: ["Chef d'équipe maintenance", "Ingénieur après poursuite d'études", "Spécialisation (électrique, mécanique)"],
      competences_qualites: ["Débrouillardise", "Rigueur", "Travail en équipe", "Sens de la sécurité"],
    }
  ),
  m(
    "Ingénieur en génie chimique",
    "Ingénierie et Industrie",
    "Procédés industriels, raffinage, pétrochimie.",
    "Sonatrach et filiales : 120 000 – 280 000 DA (estimations).",
    "5 ans",
    {
      diplomes_requis: ["Diplôme d'ingénieur en génie chimique / procédés", "USTHB, ENSP, universités (Annaba, Bejaia)"],
      missions: ["Conception et optimisation de procédés", "Pilotage d'unités de production", "Contrôle qualité et sécurité", "R&D en industrie"],
      challenges: ["Risques chimiques", "Normes environnementales", "Coûts et rendements"],
      perspectives_evolution: ["Sonatrach, pétrochimie", "Pharmaceutique, agroalimentaire", "Recherche"],
      competences_qualites: ["Esprit d'analyse", "Rigueur", "Sens des flux", "Travail en équipe"],
    }
  ),
  // ——— SECTEUR 3 — INFORMATIQUE ET NUMÉRIQUE ———
  m(
    "Développeur web / mobile",
    "Informatique et Numérique",
    "Création de sites internet et d'applications.",
    "Débutant local : 60 000 – 100 000 DA. Confirmé : 100 000 – 150 000 DA. Freelance international : 300 000 DA et plus en devises (estimations).",
    "Licence, bootcamp ou autodidacte certifié",
    {
      diplomes_requis: ["Licence informatique (USTHB, ESI, universités)", "Bootcamps (local ou en ligne)", "Autodidacte avec portfolio solide"],
      missions: ["Développement front-end et/ou back-end", "Intégration d'APIs", "Tests et déploiement", "Maintenance et évolutions"],
      challenges: ["Veille technologique", "Délais et priorités", "Qualité et sécurité du code"],
      perspectives_evolution: ["Lead dev", "Freelance international (Upwork, Malt)", "Startup ou ESN"],
      competences_qualites: ["Logique", "Autonomie", "Anglais technique", "Curiosité"],
    }
  ),
  m(
    "Développeur full-stack",
    "Informatique et Numérique",
    "Maîtrise du front-end et du back-end.",
    "Startups et ESN : 80 000 – 200 000 DA. Freelance : variable, souvent plus (estimations).",
    "Licence + expérience ou bootcamp",
    {
      diplomes_requis: ["Licence ou Master informatique", "ESI, USTHB, bootcamps", "Projets personnels valorisés"],
      missions: ["Conception et développement d'applications complètes", "Base de données et API", "Interface utilisateur", "DevOps basique (CI/CD)"],
      challenges: ["Stack large à maintenir", "Choix techniques", "Délais projets"],
      perspectives_evolution: ["Architecte", "Tech lead", "Freelance remote très rémunérateur"],
      competences_qualites: ["Polyvalence", "Rigueur", "Travail en équipe", "Anglais"],
    }
  ),
  m(
    "Ingénieur en cybersécurité",
    "Informatique et Numérique",
    "Protection des systèmes contre les cyberattaques. Profil très rare, très demandé.",
    "Banques, télécoms, énergie : 120 000 – 300 000 DA (estimations).",
    "Master ou certifications (CEH, CISSP, CompTIA Security+)",
    {
      diplomes_requis: ["Master Sécurité informatique", "Certifications : CEH, CISSP, CompTIA Security+", "USTHB, ESI, formations certifiantes"],
      missions: ["Audits de sécurité", "Mise en place de politiques et outils", "Réponse aux incidents", "Sensibilisation des équipes"],
      challenges: ["Menaces en évolution", "Équilibre sécurité / facilité d'usage", "Disponibilité"],
      perspectives_evolution: ["Responsable sécurité", "Consultant", "Pentester / bug bounty (international)"],
      competences_qualites: ["Esprit d'analyse", "Éthique", "Rigueur", "Veille constante"],
    }
  ),
  m(
    "Ingénieur en intelligence artificielle / Data Science",
    "Informatique et Numérique",
    "Analyse de données massives, modèles prédictifs.",
    "Tech et banques : 120 000 – 350 000 DA. Freelance international : très élevé (estimations).",
    "Master spécialisé",
    {
      diplomes_requis: ["Master Mathématiques / Informatique + spécialisation ML ou Data", "USTHB, ESI", "Formations en ligne (Coursera, etc.)"],
      missions: ["Conception de modèles ML", "Traitement et analyse de données", "Mise en production de modèles", "Recherche et expérimentation"],
      challenges: ["Données de qualité", "Coût des ressources", "Explication des modèles"],
      perspectives_evolution: ["Lead Data Scientist", "Freelance international très bien payé", "Recherche"],
      competences_qualites: ["Maths et stats", "Programmation (Python)", "Curiosité", "Rigueur"],
    }
  ),
  m(
    "Administrateur systèmes et réseaux",
    "Informatique et Numérique",
    "Gestion des infrastructures informatiques.",
    "Entreprises et administrations : 70 000 – 150 000 DA (estimations).",
    "Licence + certifications Cisco",
    {
      diplomes_requis: ["Licence Réseaux / Systèmes", "Certifications Cisco (CCNA, CCNP)", "USTHB, ESI, formations professionnelles"],
      missions: ["Administration serveurs et réseaux", "Sauvegardes et supervision", "Support niveau 2/3", "Évolution de l'infrastructure"],
      challenges: ["Disponibilité 24/7", "Sécurité", "Multi-environnements"],
      perspectives_evolution: ["Architecte infrastructure", "Cloud (AWS, Azure)", "Responsable IT"],
      competences_qualites: ["Rigueur", "Réactivité", "Autonomie", "Documentation"],
    }
  ),
  m(
    "UX/UI Designer",
    "Informatique et Numérique",
    "Conception d'interfaces utilisateur et d'expériences numériques.",
    "Startups et agences : 60 000 – 140 000 DA. Freelance international : plus (estimations).",
    "Licence design ou autodidacte",
    {
      diplomes_requis: ["Licence Design, Arts appliqués", "Formations UX/UI (Bootcamp, en ligne)", "Portfolio déterminant"],
      missions: ["Maquettes et prototypes (Figma, etc.)", "Recherche utilisateur", "Design systems", "Collaboration avec les devs"],
      challenges: ["Arbitrage esthétique / fonctionnel", "Retours clients", "Veille tendances"],
      perspectives_evolution: ["Lead UX", "Freelance remote", "Product designer"],
      competences_qualites: ["Créativité", "Empathie utilisateur", "Esprit de synthèse", "Travail en équipe"],
    }
  ),
  m(
    "Chef de projet informatique",
    "Informatique et Numérique",
    "Coordination des projets de développement technologique.",
    "Grandes entreprises : 120 000 – 250 000 DA (estimations).",
    "Master + expérience",
    {
      diplomes_requis: ["Master Informatique ou Management", "ESI, universités", "Certifications (PMP, Scrum) appréciées"],
      missions: ["Pilotage des plannings et livrables", "Animation des équipes dev / design", "Relation client ou interne", "Reporting et risques"],
      challenges: ["Délais et scope", "Arbitrages techniques", "Communication multi-acteurs"],
      perspectives_evolution: ["Directeur de projet", "Product owner", "Consultant"],
      competences_qualites: ["Organisation", "Communication", "Diplomatie", "Résolution de problèmes"],
    }
  ),
  m(
    "Ingénieur en télécommunications",
    "Informatique et Numérique",
    "Réseaux mobiles, fibre optique, satellites.",
    "Opérateurs (Djezzy, Ooredoo, Mobilis) : 100 000 – 220 000 DA (estimations).",
    "5 ans",
    {
      diplomes_requis: ["Diplôme d'ingénieur en télécommunications", "USTHB, ENP, École Polytechnique", "5 ans"],
      missions: ["Conception et déploiement de réseaux", "Optimisation 4G/5G et fibre", "Support technique", "Études de couverture"],
      challenges: ["Normes et réglementation", "Terrain et zones difficiles", "Évolution des technologies"],
      perspectives_evolution: ["Opérateurs télécoms", "Algérie Télécom", "Fournisseurs d'accès"],
      competences_qualites: ["Esprit technique", "Analyse", "Travail en équipe", "Rigueur"],
    }
  ),
  // ——— SECTEUR 4 — ÉCONOMIE, GESTION ET FINANCE ———
  m(
    "Comptable / Expert-comptable",
    "Économie, Gestion et Finance",
    "Tenue des comptes, déclarations fiscales, bilans.",
    "Débutant cabinet : 60 000 – 100 000 DA. Confirmé / expert : 100 000 – 200 000 DA (estimations).",
    "Licence + stage CAC",
    {
      diplomes_requis: ["Licence Comptabilité (CGC, etc.)", "Stage et passage CAC pour expert-comptable", "Universités et écoles de gestion"],
      missions: ["Tenue des comptes et clôtures", "Déclarations fiscales et sociales", "Bilans et reporting", "Conseil aux dirigeants"],
      challenges: ["Réglementation évolutive", "Délais légaux", "Exactitude et traçabilité"],
      perspectives_evolution: ["Expert-comptable", "DAF", "Cabinet propre"],
      competences_qualites: ["Rigueur", "Organisation", "Maîtrise des outils", "Discrétion"],
    }
  ),
  m(
    "Contrôleur de gestion",
    "Économie, Gestion et Finance",
    "Suivi des performances financières, tableaux de bord.",
    "Grandes entreprises : 90 000 – 200 000 DA (estimations).",
    "Master Finance ou Contrôle de Gestion",
    {
      diplomes_requis: ["Master Finance, Contrôle de Gestion, CCA", "Universités (Alger, Oran, etc.)", "Écoles de commerce"],
      missions: ["Budgets et prévisions", "Tableaux de bord et KPIs", "Analyse des écarts", "Aide à la décision"],
      challenges: ["Données fiables", "Délais de reporting", "Arbitrages entre directions"],
      perspectives_evolution: ["DAF", "Directeur contrôle", "Consultant"],
      competences_qualites: ["Analyse", "Rigueur", "Excel avancé", "Communication"],
    }
  ),
  m(
    "Auditeur interne / externe",
    "Économie, Gestion et Finance",
    "Vérification de la conformité et de l'efficacité des procédures.",
    "Cabinets d'audit (Big Four en Algérie) : 80 000 – 180 000 DA (estimations).",
    "Master",
    {
      diplomes_requis: ["Master Comptabilité, Audit, Finance", "Diplôme d'école de commerce", "Certifications (CIA, etc.) appréciées"],
      missions: ["Audits sur site", "Tests de conformité", "Rapports et recommandations", "Suivi des plans d'action"],
      challenges: ["Indépendance", "Pression des délais", "Relation avec les audités"],
      perspectives_evolution: ["Manager audit", "DAF en entreprise", "Consultant"],
      competences_qualites: ["Esprit critique", "Rigueur", "Rédaction", "Diplomatie"],
    }
  ),
  m(
    "Banquier / Chargé de clientèle bancaire",
    "Économie, Gestion et Finance",
    "Gestion des comptes clients, crédits, placements.",
    "CPA, BNA, BEA, banques privées : 55 000 – 120 000 DA (estimations).",
    "Licence ou Master",
    {
      diplomes_requis: ["Licence ou Master Finance, Commerce, Économie", "Écoles de banque (formation interne)"],
      missions: ["Accueil et conseil clientèle", "Vente de produits (comptes, crédits, épargne)", "Suivi des dossiers", "Objectifs commerciaux"],
      challenges: ["Objectifs de vente", "Réglementation", "Relation client"],
      perspectives_evolution: ["Responsable agence", "Conseiller patrimoine", "Back-office"],
      competences_qualites: ["Relation client", "Rigueur", "Négociation", "Respect des procédures"],
    }
  ),
  m(
    "Directeur financier (DAF)",
    "Économie, Gestion et Finance",
    "Pilotage stratégique des finances d'une entreprise.",
    "Grandes entreprises : 200 000 – 500 000 DA (estimations).",
    "Master + expérience",
    {
      diplomes_requis: ["Master CCA, Finance, Audit", "Expérience significative en contrôle ou audit", "Écoles de commerce ou universités"],
      missions: ["Pilotage de la trésorerie et du financement", "Relations banques et investisseurs", "Stratégie financière", "Encadrement des équipes compta / contrôle"],
      challenges: ["Vision long terme", "Gestion des crises", "Articulation avec la stratégie"],
      perspectives_evolution: ["DG", "Administrateur", "Consultant senior"],
      competences_qualites: ["Vision", "Leadership", "Négociation", "Rigueur"],
    }
  ),
  m(
    "Gestionnaire des ressources humaines (DRH)",
    "Économie, Gestion et Finance",
    "Recrutement, formation, gestion des carrières.",
    "Entreprises : 80 000 – 200 000 DA (estimations).",
    "Master RH ou Psychologie du travail",
    {
      diplomes_requis: ["Master RH, Psychologie du travail, Gestion", "Universités", "Formations certifiantes RH"],
      missions: ["Recrutement et intégration", "Formation et développement", "Paie et administration du personnel", "Conformité et dialogue social"],
      challenges: ["Arbitrages humains", "Conflits", "Évolution du droit du travail"],
      perspectives_evolution: ["DRH groupe", "Consultant RH", "Responsable formation"],
      competences_qualites: ["Écoute", "Discrétion", "Organisation", "Diplomatie"],
    }
  ),
  m(
    "Responsable logistique / Supply Chain",
    "Économie, Gestion et Finance",
    "Organisation des flux de marchandises et des approvisionnements.",
    "Commerce et industrie : 80 000 – 180 000 DA (estimations).",
    "Master Logistique",
    {
      diplomes_requis: ["Master Logistique, Supply Chain, Transport", "Universités", "Écoles de commerce"],
      missions: ["Planification des approvisionnements", "Gestion des stocks et entrepôts", "Transport et livraisons", "Optimisation des flux"],
      challenges: ["Délais et coûts", "Imprévus", "Coordination multi-acteurs"],
      perspectives_evolution: ["Directeur logistique", "Consultant", "E-commerce"],
      competences_qualites: ["Organisation", "Esprit d'analyse", "Résolution de problèmes", "Négociation"],
    }
  ),
  // ——— SECTEUR 5 — DROIT ET SCIENCES POLITIQUES ———
  m(
    "Avocat",
    "Droit et Sciences Politiques",
    "Défense des clients devant les tribunaux, conseils juridiques.",
    "Débutant : 50 000 – 80 000 DA. Confirmé : 200 000 – 600 000 DA et plus (estimations).",
    "Licence Droit + 2 ans école du barreau + stage",
    {
      diplomes_requis: ["Licence en Droit", "École du barreau (2 ans) + stage", "Facultés de droit (Alger, Oran, Constantine, etc.)"],
      missions: ["Conseil et rédaction juridique", "Plaidoyers et représentation", "Négociations", "Défense des intérêts du client"],
      challenges: ["Charge de travail", "Stress des audiences", "Concurrence et notoriété"],
      perspectives_evolution: ["Cabinet propre", "Spécialisation (affaires, pénal)", "International"],
      competences_qualites: ["Argumentation", "Rigueur", "Éloquence", "Respect du secret professionnel"],
    }
  ),
  m(
    "Notaire",
    "Droit et Sciences Politiques",
    "Rédaction d'actes officiels (ventes immobilières, successions, mariages).",
    "Revenus très élevés selon l'étude notariale (estimations).",
    "Licence Droit + concours national",
    {
      diplomes_requis: ["Licence en Droit", "Concours national notariat", "Stage en étude notariale"],
      missions: ["Rédaction d'actes authentiques", "Ventes, successions, donations", "Conseil en immobilier et famille", "Conservation des actes"],
      challenges: ["Responsabilité civile", "Concurrence", "Charge administrative"],
      perspectives_evolution: ["Notaire titulaire", "Associé", "Spécialisation"],
      competences_qualites: ["Rigueur", "Disponibilité", "Relation client", "Intégrité"],
    }
  ),
  m(
    "Juriste d'entreprise",
    "Droit et Sciences Politiques",
    "Conseils juridiques internes, rédaction de contrats.",
    "Grandes entreprises : 80 000 – 180 000 DA (estimations).",
    "Master Droit des affaires",
    {
      diplomes_requis: ["Master Droit des affaires, Droit des contrats", "Facultés de droit"],
      missions: ["Rédaction et négociation de contrats", "Conformité et contentieux", "Conseil aux directions", "Veille juridique"],
      challenges: ["Délais", "Arbitrage risque / business", "Multi-domaines"],
      perspectives_evolution: ["Directeur juridique", "Avocat d'affaires", "Cabinet"],
      competences_qualites: ["Rigueur", "Esprit de synthèse", "Négociation", "Discrétion"],
    }
  ),
  // ——— SECTEUR 6 — ARCHITECTURE, URBANISME ET BTP ———
  m(
    "Architecte",
    "Architecture, Urbanisme et BTP",
    "Conception de bâtiments et espaces.",
    "Bureau d'études : 80 000 – 200 000 DA. Cabinet propre : très variable (estimations).",
    "5 ans (diplôme d'architecte)",
    {
      diplomes_requis: ["Diplôme d'architecte (5 ans)", "École Nationale d'Architecture (Alger, Oran, etc.)"],
      missions: ["Conception de projets", "Plans et maquettes", "Suivi de chantier", "Relations maître d'ouvrage et entreprises"],
      challenges: ["Créativité et contraintes", "Délais et coûts", "Réglementation urbanisme"],
      perspectives_evolution: ["Cabinet propre", "Architecte en chef", "Urbanisme ou enseignement"],
      competences_qualites: ["Créativité", "Espace et volumes", "Travail en équipe", "Négociation"],
    }
  ),
  m(
    "Architecte d'intérieur",
    "Architecture, Urbanisme et BTP",
    "Aménagement intérieur des espaces résidentiels et commerciaux. Marché en forte croissance.",
    "70 000 – 200 000 DA. Freelance établi : 200 000 – 600 000 DA/mois (estimations).",
    "Licence ou Master Arts appliqués",
    {
      diplomes_requis: ["Licence ou Master Arts appliqués, Design", "Écoles d'architecture ou de design", "Portfolio déterminant"],
      missions: ["Conception d'espaces intérieurs", "Choix des matériaux et mobilier", "Suivi des travaux", "Relation client"],
      challenges: ["Budgets clients", "Délais chantier", "Concurrence"],
      perspectives_evolution: ["Cabinet reconnu", "Freelance international", "Décoration ou scénographie"],
      competences_qualites: ["Créativité", "Sens du détail", "Écoute client", "Gestion de projet"],
    }
  ),
  m(
    "Chef de chantier BTP",
    "Architecture, Urbanisme et BTP",
    "Coordination des travaux sur site.",
    "Secteur BTP : 80 000 – 180 000 DA (estimations).",
    "BTS ou Licence + expérience",
    {
      diplomes_requis: ["BTS BTP, Travaux publics", "Licence Génie Civil", "CFPA, instituts techniques"],
      missions: ["Coordination des équipes et des corps de métier", "Respect du planning et du budget", "Sécurité sur chantier", "Liaison avec la maîtrise d'œuvre"],
      challenges: ["Imprévus terrain", "Sécurité", "Relations avec les ouvriers"],
      perspectives_evolution: ["Conducteur de travaux", "Directeur de travaux", "Chef d'entreprise BTP"],
      competences_qualites: ["Autorité", "Organisation", "Résistance physique", "Esprit pratique"],
    }
  ),
  m(
    "Conducteur de travaux",
    "Architecture, Urbanisme et BTP",
    "Gestion opérationnelle d'un chantier.",
    "BTP : 90 000 – 180 000 DA (estimations).",
    "Licence Génie Civil",
    {
      diplomes_requis: ["Licence Génie Civil", "ENP, USTHB, universités"],
      missions: ["Pilotage de plusieurs chantiers", "Budget et planning", "Négociation avec sous-traitants", "Reporting direction"],
      challenges: ["Multi-chantiers", "Risques et imprévus", "Objectifs coût/délai"],
      perspectives_evolution: ["Directeur de travaux", "Directeur d'opérations", "Création d'entreprise"],
      competences_qualites: ["Leadership", "Gestion", "Rigueur", "Terrain"],
    }
  ),
  // ——— SECTEUR 7 — AGRICULTURE ET ENVIRONNEMENT ———
  m(
    "Ingénieur agronome",
    "Agriculture et Environnement",
    "Amélioration des productions agricoles, gestion des exploitations.",
    "Public : 60 000 – 100 000 DA. Privé et coopératives : jusqu'à 180 000 DA (estimations).",
    "5 ans (ENSA, INSFP Agro)",
    {
      diplomes_requis: ["Diplôme d'ingénieur agronome", "ENSA (École Nationale Supérieure d'Agronomie)", "INSFP Agro", "Universités"],
      missions: ["Conseil aux agriculteurs", "Expérimentation et R&D", "Gestion des exploitations", "Formation et vulgarisation"],
      challenges: ["Climat et ressources en eau", "Rentabilité des exploitations", "Terrain et déplacements"],
      perspectives_evolution: ["Coopératives", "Entreprises semences / phytosanitaires", "Recherche"],
      competences_qualites: ["Terrain", "Esprit d'analyse", "Pédagogie", "Adaptation"],
    }
  ),
  m(
    "Spécialiste en énergies renouvelables",
    "Agriculture et Environnement",
    "Développement de projets solaires, éoliens. Secteur en plein essor en Algérie.",
    "80 000 – 200 000 DA (estimations).",
    "Master Énergétique",
    {
      diplomes_requis: ["Master Énergétique, Génie électrique", "USTHB, ENP", "Spécialisation solaire / éolien"],
      missions: ["Études et dimensionnement d'installations", "Suivi de chantiers ENR", "Maintenance", "Conseil aux collectivités et entreprises"],
      challenges: ["Réglementation en évolution", "Financement des projets", "Stockage et réseau"],
      perspectives_evolution: ["Bureaux d'études ENR", "Sonelgaz et filiales", "Freelance possible"],
      competences_qualites: ["Technique", "Rigueur", "Veille", "Travail en équipe"],
    }
  ),
  // ——— SECTEUR 8 — ÉDUCATION ET RECHERCHE ———
  m(
    "Enseignant du primaire / du secondaire",
    "Éducation et Recherche",
    "Formation, transmission des savoirs.",
    "Public : 35 000 – 75 000 DA. Privé : 50 000 – 100 000 DA (estimations).",
    "ENS ou Licence",
    {
      diplomes_requis: ["ENS (École Normale Supérieure)", "Licence + concours CAPES ou équivalent", "Formation pédagogique"],
      missions: ["Enseignement des matières", "Suivi des élèves", "Projets pédagogiques", "Relations avec les familles"],
      challenges: ["Effectifs parfois élevés", "Diversité des niveaux", "Moyens limités selon établissement"],
      perspectives_evolution: ["Formation continue", "Direction d'établissement", "Inspection"],
      competences_qualites: ["Pédagogie", "Patience", "Autorité bienveillante", "Adaptation"],
    }
  ),
  m(
    "Professeur de l'enseignement supérieur",
    "Éducation et Recherche",
    "Cours universitaires, encadrement de recherche.",
    "Maître assistant : 80 000 – 130 000 DA. Professeur : 130 000 – 200 000 DA (estimations).",
    "Doctorat",
    {
      diplomes_requis: ["Doctorat", "Concours maître de conférences / professeur", "Universités algériennes"],
      missions: ["Cours et TD/TP", "Encadrement de thèses et mémoires", "Recherche et publications", "Participation à la vie universitaire"],
      challenges: ["Charge administrative", "Équilibre enseignement / recherche", "Moyens laboratoires"],
      perspectives_evolution: ["Professeur", "Responsable de formation", "Coopération internationale"],
      competences_qualites: ["Expertise", "Pédagogie", "Rigueur", "Curiosité"],
    }
  ),
  m(
    "Formateur professionnel",
    "Éducation et Recherche",
    "Formation des adultes dans des centres agréés.",
    "Centres privés : 50 000 – 120 000 DA (estimations).",
    "Licence + certification",
    {
      diplomes_requis: ["Licence ou Master", "Certification formateur (souvent requise)", "Expérience métier dans le domaine formé"],
      missions: ["Conception de modules", "Animation de formations", "Évaluation des stagiaires", "Adaptation aux publics"],
      challenges: ["Publics variés", "Mise à jour des contenus", "Taux de réussite"],
      perspectives_evolution: ["Responsable pédagogique", "Consultant", "Freelance"],
      competences_qualites: ["Pédagogie adulte", "Communication", "Organisation", "Expertise métier"],
    }
  ),
  // ——— SECTEUR 9 — COMMUNICATION, MÉDIAS ET ARTS ———
  m(
    "Journaliste",
    "Communication, Médias et Arts",
    "Collecte et diffusion de l'information.",
    "Presse publique : 45 000 – 90 000 DA. Privé et en ligne : très variable (estimations).",
    "Licence Journalisme (INSJC)",
    {
      diplomes_requis: ["Licence Journalisme", "INSJC (Alger)", "Écoles de journalisme", "Portfolio et stages"],
      missions: ["Enquêtes et reportages", "Rédaction d'articles", "Interviews", "Montage vidéo ou radio selon support"],
      challenges: ["Délais", "Vérification des sources", "Contexte médiatique"],
      perspectives_evolution: ["Rédacteur en chef", "Média en ligne", "Freelance"],
      competences_qualites: ["Curiosité", "Rigueur", "Expression", "Réactivité"],
    }
  ),
  m(
    "Graphiste / Directeur artistique",
    "Communication, Médias et Arts",
    "Création visuelle pour les marques et les médias.",
    "Agences : 55 000 – 140 000 DA. Freelance : variable et souvent plus (estimations).",
    "Licence arts graphiques ou autodidacte",
    {
      diplomes_requis: ["Licence Arts graphiques, Design", "Écoles d'art", "Autodidacte avec portfolio solide"],
      missions: ["Création d'identités visuelles", "Maquettes print et digital", "Direction artistique de campagnes", "Collaboration avec les équipes"],
      challenges: ["Deadlines", "Retours clients", "Veille tendances"],
      perspectives_evolution: ["Directeur artistique", "Freelance international (très possible)", "Studio propre"],
      competences_qualites: ["Créativité", "Logiciels (Suite Adobe, Figma)", "Écoute", "Gestion du temps"],
    }
  ),
  m(
    "Community Manager / Social Media Manager",
    "Communication, Médias et Arts",
    "Gestion des réseaux sociaux d'une marque.",
    "Entreprises : 50 000 – 120 000 DA. Freelance plusieurs clients : plus (estimations).",
    "Licence communication ou marketing digital",
    {
      diplomes_requis: ["Licence Communication, Marketing", "Formations digital (certifications)", "Expérience sur les plateformes"],
      missions: ["Création de contenus", "Animation des communautés", "Stratégie et calendrier éditorial", "Reporting et analyse"],
      challenges: ["Algorithmes", "Crise et réputation", "Objectifs de croissance"],
      perspectives_evolution: ["Responsable digital", "Freelance (plusieurs comptes)", "Influence / contenu"],
      competences_qualites: ["Créativité", "Rédaction", "Réactivité", "Sens des données"],
    }
  ),
  m(
    "Traducteur / Interprète",
    "Communication, Médias et Arts",
    "Traduction entre langues (arabe, français, anglais, amazigh).",
    "Freelance et organismes internationaux : 50 000 – 200 000 DA selon les langues (estimations). Potentiel freelance international élevé.",
    "Licence Traduction",
    {
      diplomes_requis: ["Licence Traduction / Interprétation", "Universités (Alger, Oran)", "Langues rares très valorisées"],
      missions: ["Traduction de textes", "Interprétation (simultanée ou consécutive)", "Sous-titrage", "Relecture et révision"],
      challenges: ["Délais", "Terminologie spécialisée", "Concurrence et tarifs"],
      perspectives_evolution: ["Traducteur spécialisé (médical, juridique, technique)", "Freelance international (ProZ, Gengo)", "Organismes internationaux"],
      competences_qualites: ["Maîtrise des langues", "Rigueur", "Culture générale", "Discipline"],
    }
  ),
  // ——— SECTEUR 10 — COMMERCE ET MARKETING ———
  m(
    "Commercial / Représentant",
    "Commerce et Marketing",
    "Vente de produits ou services auprès de clients.",
    "Fixe + commissions : 50 000 – 150 000 DA (estimations).",
    "Licence ou BTS Commerce",
    {
      diplomes_requis: ["BTS ou Licence Commerce, Vente", "Universités", "Formation produit en entreprise"],
      missions: ["Prospection et rendez-vous", "Présentation des offres", "Négociation et closing", "Suivi client et fidélisation"],
      challenges: ["Objectifs chiffrés", "Rejets", "Concurrence"],
      perspectives_evolution: ["Responsable commercial", "Directeur des ventes", "Création d'activité"],
      competences_qualites: ["Relationnel", "Résilience", "Écoute", "Persévérance"],
    }
  ),
  m(
    "Responsable marketing",
    "Commerce et Marketing",
    "Stratégie de développement des marques et produits.",
    "Grandes entreprises : 90 000 – 200 000 DA (estimations).",
    "Master Marketing",
    {
      diplomes_requis: ["Master Marketing", "Écoles de commerce", "Universités"],
      missions: ["Stratégie marketing et positionnement", "Campagnes et communication", "Études marché", "Pilotage des équipes"],
      challenges: ["Budgets", "Mesure du ROI", "Évolution des canaux"],
      perspectives_evolution: ["Directeur marketing", "Consultant", "Startup"],
      competences_qualites: ["Créativité", "Analyse", "Leadership", "Orientation résultats"],
    }
  ),
  m(
    "E-commerce Manager",
    "Commerce et Marketing",
    "Gestion d'une boutique en ligne, optimisation des ventes digitales. Marché en forte croissance en Algérie.",
    "60 000 – 150 000 DA (estimations).",
    "Licence Commerce + digital",
    {
      diplomes_requis: ["Licence Commerce, Marketing", "Formations e-commerce (Shopify, etc.)", "Expérience en ligne"],
      missions: ["Gestion du site et des catalogues", "SEO et campagnes (Google, réseaux)", "Logistique et SAV", "Analyse des ventes"],
      challenges: ["Concurrence", "Logistique et livraison", "Paiement en ligne"],
      perspectives_evolution: ["Directeur e-commerce", "Freelance (gestion de boutiques)", "Création de sa boutique"],
      competences_qualites: ["Digital", "Analytics", "Organisation", "Réactivité"],
    }
  ),
  // ——— SECTEUR 11 — TOURISME, HÔTELLERIE ET RESTAURATION ———
  m(
    "Hôtelier / Directeur d'hôtel",
    "Tourisme, Hôtellerie et Restauration",
    "Gestion d'un établissement hôtelier.",
    "Grands hôtels : 100 000 – 300 000 DA (estimations).",
    "Licence Hôtellerie-Tourisme",
    {
      diplomes_requis: ["Licence Hôtellerie, Tourisme", "Écoles hôtelières", "Expérience en réception puis direction"],
      missions: ["Pilotage de l'établissement", "Gestion des équipes", "Relation client et réclamations", "Budget et rentabilité"],
      challenges: ["Saisonnalité", "Recrutement", "Qualité de service"],
      perspectives_evolution: ["Groupe hôtelier", "Chaine internationale", "Consultant"],
      competences_qualites: ["Leadership", "Relation client", "Organisation", "Sang-froid"],
    }
  ),
  m(
    "Chef cuisinier / Chef de cuisine",
    "Tourisme, Hôtellerie et Restauration",
    "Conception des menus, direction de cuisine.",
    "Restaurants haut de gamme : 80 000 – 250 000 DA (estimations).",
    "École hôtelière ou apprentissage",
    {
      diplomes_requis: ["CAP/BEP Cuisine", "Écoles hôtelières", "Apprentissage en restaurant"],
      missions: ["Création des menus", "Direction de la brigade", "Approvisionnement", "Respect hygiène et coûts"],
      challenges: ["Horaires décalés", "Pression du service", "Recrutement"],
      perspectives_evolution: ["Restaurant propre", "Traiteur", "Consultant culinaire"],
      competences_qualites: ["Créativité", "Résistance", "Autorité", "Organisation"],
    }
  ),
  m(
    "Guide touristique",
    "Tourisme, Hôtellerie et Restauration",
    "Accompagnement de groupes de touristes. Revenus saisonniers en hausse avec le tourisme algérien.",
    "Variable, saisonnier. En hausse (estimations).",
    "Licence Tourisme + certification guide",
    {
      diplomes_requis: ["Licence Tourisme", "Certification guide (wilaya / national)", "Langues étrangères"],
      missions: ["Accompagnement de groupes", "Commentaires et animation", "Logistique et timing", "Sécurité et réglementation"],
      challenges: ["Saisonnalité", "Publics variés", "Connaissances actualisées"],
      perspectives_evolution: ["Guide spécialisé (sahara, patrimoine)", "Création d'agence", "Freelance"],
      competences_qualites: ["Communication", "Culture générale", "Patience", "Langues"],
    }
  ),
  // ——— SECTEUR 12 — PSYCHOLOGIE ET SCIENCES SOCIALES ———
  m(
    "Psychologue du travail",
    "Psychologie et Sciences Sociales",
    "Bien-être des salariés, gestion des RPS.",
    "Grandes entreprises : 80 000 – 160 000 DA (estimations).",
    "Master Psychologie du Travail",
    {
      diplomes_requis: ["Master Psychologie du travail", "Universités", "Formations en RPS"],
      missions: ["Prévention des RPS", "Accompagnement individuel ou collectif", "Audits climat social", "Formation des managers"],
      challenges: ["Reconnaissance du métier", "Confidentialité", "Résistance interne"],
      perspectives_evolution: ["Consultant RH", "Cabinet", "Recherche"],
      competences_qualites: ["Écoute", "Analyse", "Discrétion", "Pédagogie"],
    }
  ),
  m(
    "Sociologue",
    "Psychologie et Sciences Sociales",
    "Études sociales, enquêtes de terrain, conseils en politiques publiques.",
    "Universités, ONG, administrations : 50 000 – 120 000 DA (estimations).",
    "Master Sociologie",
    {
      diplomes_requis: ["Master Sociologie", "Universités (Alger, Oran, etc.)", "Doctorat pour recherche"],
      missions: ["Enquêtes et terrain", "Analyse de données", "Rapports et recommandations", "Enseignement ou conseil"],
      challenges: ["Financement des études", "Demande variable", "Objectivité"],
      perspectives_evolution: ["Recherche", "ONG", "Cabinet d'études"],
      competences_qualites: ["Esprit d'analyse", "Rigueur", "Écriture", "Curiosité"],
    }
  ),
  m(
    "Assistant social / Travailleur social",
    "Psychologie et Sciences Sociales",
    "Accompagnement des personnes en difficulté.",
    "Public : 35 000 – 65 000 DA (estimations).",
    "Licence Travail Social",
    {
      diplomes_requis: ["Licence Travail social", "Formations spécialisées", "Universités"],
      missions: ["Accompagnement des familles", "Orientation vers les dispositifs", "Dossiers et suivi", "Travail en réseau"],
      challenges: ["Charge émotionnelle", "Moyens limités", "Complexité des situations"],
      perspectives_evolution: ["Cadre", "Spécialisation (enfance, insertion)", "ONG"],
      competences_qualites: ["Empathie", "Résilience", "Écoute", "Rigueur administrative"],
    }
  ),
  // ——— SECTEUR 13 — SCIENCES FONDAMENTALES ———
  m(
    "Mathématicien / Statisticien",
    "Sciences Fondamentales",
    "Modélisation, analyse de données, actuariat.",
    "Banques, assurances, recherche : 80 000 – 200 000 DA (estimations).",
    "Master Mathématiques",
    {
      diplomes_requis: ["Master Mathématiques, Statistique", "USTHB, universités", "Actuariat pour assurances"],
      missions: ["Modèles mathématiques", "Analyse statistique", "Reporting", "Recherche selon poste"],
      challenges: ["Abstraction", "Données réelles vs modèles", "Interdisciplinarité"],
      perspectives_evolution: ["Data Scientist", "Actuaire", "Recherche"],
      competences_qualites: ["Rigueur", "Logique", "Programmation (R, Python)", "Esprit de synthèse"],
    }
  ),
  m(
    "Chimiste industriel",
    "Sciences Fondamentales",
    "Contrôle qualité, formulation, R&D.",
    "Agroalimentaire, pharmaceutique, pétrochimie : 80 000 – 180 000 DA (estimations).",
    "Master Chimie",
    {
      diplomes_requis: ["Master Chimie", "USTHB, universités (Annaba, Bejaia)", "Spécialisation industrielle"],
      missions: ["Contrôle qualité", "Formulation de produits", "R&D", "Normes et sécurité"],
      challenges: ["Réglementation", "Coûts", "Innovation"],
      perspectives_evolution: ["Responsable labo", "Industrie pharma / agro", "Recherche"],
      competences_qualites: ["Rigueur", "Esprit d'analyse", "Travail en labo", "Documentation"],
    }
  ),
  m(
    "Géologue",
    "Sciences Fondamentales",
    "Études des sols et sous-sols.",
    "Sonatrach et bureaux d'études : 90 000 – 220 000 DA (estimations).",
    "Master Géologie",
    {
      diplomes_requis: ["Master Géologie", "USTHB, universités", "Spécialisation pétrolier ou minier"],
      missions: ["Études de terrain", "Cartographie", "Analyse d'échantillons", "Rapports pour projets"],
      challenges: ["Terrain", "Interprétation", "Outils coûteux"],
      perspectives_evolution: ["Sonatrach", "Bureaux d'études", "Recherche"],
      competences_qualites: ["Observation", "Rigueur", "Travail terrain", "Synthèse"],
    }
  ),
  // ——— SECTEUR 14 — MÉTIERS DU SPORT ———
  m(
    "Professeur d'éducation physique",
    "Métiers du Sport",
    "Enseignement du sport en milieu scolaire.",
    "Public : 45 000 – 80 000 DA (estimations).",
    "INJEPS ou STAPS",
    {
      diplomes_requis: ["INJEPS", "STAPS ou équivalent", "Concours enseignement"],
      missions: ["Cours d'EPS", "Organisation d'événements sportifs", "Suivi des élèves", "Sécurité"],
      challenges: ["Effectifs", "Équipements", "Diversité des niveaux"],
      perspectives_evolution: ["Entraînement", "Direction", "Clubs"],
      competences_qualites: ["Pédagogie", "Autorité", "Exemple physique", "Organisation"],
    }
  ),
  m(
    "Entraîneur sportif / Coach",
    "Métiers du Sport",
    "Préparation physique et tactique d'athlètes.",
    "Clubs : très variable. Coaching privé : 60 000 – 200 000 DA (estimations).",
    "Licence STAPS + diplôme fédéral",
    {
      diplomes_requis: ["Licence STAPS", "Diplômes fédéraux (sport concerné)", "Formations continues"],
      missions: ["Préparation des séances", "Suivi des performances", "Tactique et stratégie", "Relation avec les dirigeants"],
      challenges: ["Résultats", "Relation avec les joueurs", "Médiatisation"],
      perspectives_evolution: ["Club pro", "Sélection nationale", "Coaching privé / entreprise"],
      competences_qualites: ["Leadership", "Psychologie", "Stratégie", "Résilience"],
    }
  ),
  // ——— SECTEUR 15 — ARTISANAT ET BÂTIMENT ———
  m(
    "Électricien du bâtiment",
    "Artisanat et Bâtiment",
    "Installation et maintenance électrique.",
    "Indépendant bien installé : 80 000 – 200 000 DA (estimations).",
    "Formation professionnelle (1-2 ans)",
    {
      diplomes_requis: ["CAP/BEP Électricité", "CFPA", "Habilitation électrique obligatoire"],
      missions: ["Installations neuves", "Mise aux normes", "Dépannage", "Devis et facturation"],
      challenges: ["Normes", "Concurrence", "Gestion d'entreprise"],
      perspectives_evolution: ["Artisan avec équipe", "Bureau d'études", "Formation"],
      competences_qualites: ["Précision", "Sécurité", "Autonomie", "Relation client"],
    }
  ),
  m(
    "Plombier / Installateur sanitaire",
    "Artisanat et Bâtiment",
    "Plomberie, chauffage, eau.",
    "Indépendant : 70 000 – 180 000 DA (estimations).",
    "Formation professionnelle",
    {
      diplomes_requis: ["CAP Plomberie", "CFPA", "Apprentissage"],
      missions: ["Installation sanitaires", "Dépannage", "Chauffage", "Devis et chantiers"],
      challenges: ["Urgences", "Approvisionnement", "Prix matière première"],
      perspectives_evolution: ["Entreprise avec équipe", "Spécialisation (chauffage)", "Partnership avec promoteurs"],
      competences_qualites: ["Débrouillardise", "Propreté", "Ponctualité", "Relation client"],
    }
  ),
  m(
    "Mécanicien automobile",
    "Artisanat et Bâtiment",
    "Entretien et réparation de véhicules.",
    "Garage privé : 50 000 – 150 000 DA (estimations).",
    "Formation professionnelle ou apprentissage",
    {
      diplomes_requis: ["CAP Mécanique auto", "CFPA", "Apprentissage en garage"],
      missions: ["Diagnostic", "Réparations moteur et carrosserie", "Entretien", "Gestion des pièces"],
      challenges: ["Évolution des véhicules (électrique, électronique)", "Concurrence", "Qualité des pièces"],
      perspectives_evolution: ["Propriétaire de garage", "Spécialisation (électronique)", "Réseau ou franchise"],
      competences_qualites: ["Technicité", "Débrouillardise", "Organisation", "Honnêteté"],
    }
  ),
  m(
    "Maçon",
    "Artisanat et Bâtiment",
    "Construit les murs, fondations, dalles.",
    "Artisan indépendant avec clientèle : 80 000 – 250 000 DA/mois (estimations).",
    "Formation professionnelle ou apprentissage",
    {
      diplomes_requis: ["CAP Maçonnerie", "CFPA", "Apprentissage sur chantier"],
      missions: ["Coulage et coffrage", "Montage de murs", "Pose de carrelage possible", "Respect des plans"],
      challenges: ["Physique", "Météo", "Coordination avec autres corps de métier"],
      perspectives_evolution: ["Chef d'équipe", "Entrepreneur BTP", "Spécialisation (ravalement, etc.)"],
      competences_qualites: ["Endurance", "Précision", "Travail d'équipe", "Sérieux"],
    }
  ),
  // ——— SECTEUR 16 — SÉCURITÉ ET DÉFENSE ———
  m(
    "Agent de la police nationale",
    "Sécurité et Défense",
    "Maintien de l'ordre, prévention, enquêtes.",
    "Public : 45 000 – 100 000 DA selon grade (estimations).",
    "École de Police (concours)",
    {
      diplomes_requis: ["Concours École de Police", "Niveau requis selon concours", "Formation initiale"],
      missions: ["Surveillance et patrouilles", "Enquêtes", "Accueil du public", "Application de la loi"],
      challenges: ["Risques", "Horaires", "Image et confiance citoyenne"],
      perspectives_evolution: ["Spécialisation", "Grades", "Enquêtes"],
      competences_qualites: ["Sang-froid", "Intégrité", "Condition physique", "Communication"],
    }
  ),
  m(
    "Pompier / Sapeur-pompier",
    "Sécurité et Défense",
    "Protection civile, secours d'urgence.",
    "Public : 40 000 – 80 000 DA (estimations).",
    "Protection Civile (concours)",
    {
      diplomes_requis: ["Concours Protection Civile", "Formation secours", "Permis poids lourd selon poste"],
      missions: ["Secours incendie", "Secours à personnes", "Prévention", "Interventions diverses"],
      challenges: ["Risques", "Gardes", "Stress"],
      perspectives_evolution: ["Grade", "Spécialisation", "Encadrement"],
      competences_qualites: ["Courage", "Esprit d'équipe", "Réactivité", "Condition physique"],
    }
  ),
  m(
    "Douanier",
    "Sécurité et Défense",
    "Contrôle des marchandises aux frontières.",
    "Public : 55 000 – 100 000 DA (estimations).",
    "École Nationale des Douanes (concours)",
    {
      diplomes_requis: ["Concours École Nationale des Douanes", "Formation douanière"],
      missions: ["Contrôle des flux", "Vérification des déclarations", "Lutte contre la fraude", "Accueil des voyageurs"],
      challenges: ["Volume", "Réglementation", "Terrain (ports, frontières)"],
      perspectives_evolution: ["Spécialisation", "Grades", "Administration centrale"],
      competences_qualites: ["Rigueur", "Intégrité", "Esprit d'analyse", "Respect des procédures"],
    }
  ),
  // ——— SECTEUR 17 — MÉTIERS ÉMERGENTS ET NUMÉRIQUE ———
  m(
    "Freelancer tech",
    "Métiers émergents et Numérique",
    "Développeur, designer, rédacteur — missions pour clients internationaux payées en devises. Grande opportunité pour les jeunes connectés.",
    "300 000 – 1 000 000 DA selon le profil et la clientèle (estimations). Fort potentiel freelance remote.",
    "Compétences techniques + plateformes (Upwork, Fiverr)",
    {
      diplomes_requis: ["Compétences techniques (dev, design, rédaction)", "Portfolio", "Plateformes : Upwork, Fiverr, Malt"],
      missions: ["Missions à la demande", "Livrables selon cahier des charges", "Communication client", "Facturation et suivi"],
      challenges: ["Instabilité des revenus", "Concurrence mondiale", "Gestion administrative"],
      perspectives_evolution: ["Agence", "Spécialisation premium", "Produits digitaux"],
      competences_qualites: ["Autonomie", "Anglais", "Réactivité", "Qualité des livrables"],
    }
  ),
  m(
    "Data Analyst",
    "Métiers émergents et Numérique",
    "Analyse des données pour guider les décisions stratégiques.",
    "Banques et grandes entreprises : 80 000 – 200 000 DA. Freelance possible (estimations).",
    "Licence + Excel, SQL, Python",
    {
      diplomes_requis: ["Licence Maths, Stats, Informatique", "Formations Data (Excel, SQL, Python, Power BI)", "USTHB, ESI, bootcamps"],
      missions: ["Extraction et nettoyage de données", "Tableaux de bord", "Analyses et recommandations", "Reporting"],
      challenges: ["Qualité des données", "Demandes changeantes", "Outils en évolution"],
      perspectives_evolution: ["Data Scientist", "Consultant", "Freelance international"],
      competences_qualites: ["Esprit d'analyse", "Rigueur", "Visualisation", "Communication"],
    }
  ),
  m(
    "Chef de projet digital",
    "Métiers émergents et Numérique",
    "Coordination de projets de transformation numérique.",
    "Grandes entreprises : 120 000 – 250 000 DA (estimations).",
    "Master + expérience",
    {
      diplomes_requis: ["Master Informatique, Management", "Expérience en projet digital", "Certifications (Scrum, PMP) appréciées"],
      missions: ["Pilotage de projets digitaux", "Animation des équipes", "Relation MOA / MOE", "Livraison et déploiement"],
      challenges: ["Changement des habitudes", "Délais et scope", "Multi-intervenants"],
      perspectives_evolution: ["Directeur digital", "Consultant", "CPO"],
      competences_qualites: ["Organisation", "Communication", "Résolution de problèmes", "Vision produit"],
    }
  ),
  m(
    "Prompt Engineer",
    "Métiers émergents et Numérique",
    "Optimise l'usage des IA (ChatGPT, Claude, Midjourney) en contexte professionnel. Métier récent, forte demande.",
    "Freelance international : 200 000 – 800 000 DA/mois selon les missions (estimations). 100 % remote possible.",
    "Autodidacte + certifications en ligne",
    {
      diplomes_requis: ["Autodidacte", "Certifications IA (en ligne)", "Expérience sur projets concrets"],
      missions: ["Rédaction de prompts efficaces", "Intégration d'IA dans les process", "Formation des équipes", "Optimisation des coûts IA"],
      challenges: ["Évolution rapide des modèles", "Reconnaissance du métier", "Mesure de la valeur"],
      perspectives_evolution: ["Consultant IA", "Freelance international", "Lead IA en entreprise"],
      competences_qualites: ["Curiosité", "Rédaction", "Logique", "Veille techno"],
    }
  ),
  m(
    "Développeur d'automatisations (No-Code / Low-Code)",
    "Métiers émergents et Numérique",
    "Automatise les tâches répétitives avec Zapier, Make, n8n — sans code complexe. Marché immense.",
    "Freelance : 100 000 – 400 000 DA/mois (estimations). Remote possible.",
    "Autodidacte",
    {
      diplomes_requis: ["Autodidacte sur Zapier, Make, n8n", "Compréhension des process métier", "Certifications plateformes possibles"],
      missions: ["Conception de workflows", "Connexion d'outils (CRM, emails, bases)", "Maintenance et évolutions", "Formation des utilisateurs"],
      challenges: ["Limites des outils", "Sécurité des données", "Documentation"],
      perspectives_evolution: ["Consultant automation", "Freelance international", "Création de produits"],
      competences_qualites: ["Esprit process", "Rigueur", "Autonomie", "Pédagogie"],
    }
  ),
  // ——— SECTEUR 18 — TRANSPORT ET LOGISTIQUE ———
  m(
    "Chauffeur de taxi",
    "Transport et Logistique",
    "Transport de passagers en ville ou longue distance. Taxi conventionné ou VTC (Yassir, Careem).",
    "60 000 – 200 000 DA/mois net selon la ville et les horaires (estimations).",
    "Permis B + licence taxi (wilaya)",
    {
      diplomes_requis: ["Permis B", "Licence taxi (délivrée par wilaya)", "Pas de diplôme supérieur requis"],
      missions: ["Transport de passagers", "Respect du code de la route", "Entretien du véhicule", "Relation client"],
      challenges: ["Horaires", "Trafic", "Concurrence VTC"],
      perspectives_evolution: ["Propriétaire de plusieurs véhicules", "VTC", "Société de transport"],
      competences_qualites: ["Ponctualité", "Conduite sûre", "Courtoisie", "Connaissance du terrain"],
    }
  ),
  m(
    "Chauffeur VTC (Yassir, Careem, InDrive)",
    "Transport et Logistique",
    "Conduit des clients via des plateformes de réservation.",
    "Après commission : 70 000 – 180 000 DA/mois (estimations).",
    "Véhicule personnel ou loué",
    {
      diplomes_requis: ["Permis B", "Véhicule aux normes", "Inscription sur plateforme"],
      missions: ["Courses réservées via app", "Respect des horaires", "Propreté du véhicule", "Suivi des gains"],
      challenges: ["Commissions plateforme", "Usure véhicule", "Concurrence"],
      perspectives_evolution: ["Plusieurs véhicules (location)", "Taxi conventionnel", "Autre activité"],
      competences_qualites: ["Ponctualité", "Conduite", "Courtoisie", "Autonomie"],
    }
  ),
  m(
    "Livreur à domicile",
    "Transport et Logistique",
    "Livraison de repas, colis ou courses (Yassir Food, Jumia Food, boutiques en ligne).",
    "Livreur actif à temps plein : 50 000 – 120 000 DA/mois (estimations).",
    "Moto ou vélo",
    {
      diplomes_requis: ["Permis ou pas (selon véhicule)", "Inscription plateforme", "Smartphone"],
      missions: ["Récupération des commandes", "Livraison à l'adresse", "Respect des délais", "Relation client"],
      challenges: ["Météo", "Trafic", "Rémunération à la course"],
      perspectives_evolution: ["Superviseur", "Autre métier", "Création d'activité livraison"],
      competences_qualites: ["Ponctualité", "Orientation", "Endurance", "Sérieux"],
    }
  ),
  m(
    "Chauffeur de camion / Poids lourd",
    "Transport et Logistique",
    "Transport de marchandises sur longue distance. Permis CE requis.",
    "Secteur privé : 80 000 – 200 000 DA. Indépendant propriétaire : bien plus (estimations).",
    "Permis CE",
    {
      diplomes_requis: ["Permis CE", "FIMO (formation obligatoire)", "Expérience progressive"],
      missions: ["Transport de marchandises", "Respect des délais", "Entretien du véhicule", "Documents de transport"],
      challenges: ["Longues absences", "Fatigue", "Sécurité"],
      perspectives_evolution: ["Propriétaire de camion", "Chef de convoi", "Logistique"],
      competences_qualites: ["Conduite sûre", "Endurance", "Autonomie", "Rigueur"],
    }
  ),
  m(
    "Pilote de ligne (OPL / Commandant de bord)",
    "Transport et Logistique",
    "Pilote les avions commerciaux. Formation très exigeante.",
    "Commandant Air Algérie : 400 000 – 900 000 DA/mois. Copilote : 200 000 – 400 000 DA (estimations).",
    "Licence PPL puis CPL puis ATPL",
    {
      diplomes_requis: ["Licences pilote (PPL, CPL, ATPL)", "Formation souvent via Air Algérie ou écoles privées", "Coût de formation élevé"],
      missions: ["Pilotage des vols", "Briefing équipage", "Sécurité et procédures", "Relation avec le contrôle aérien"],
      challenges: ["Responsabilité", "Décalages horaires", "Formation continue"],
      perspectives_evolution: ["Commandant", "Instructeur", "Compagnies internationales"],
      competences_qualites: ["Sang-froid", "Rigueur", "Travail d'équipe", "Condition physique"],
    }
  ),
  m(
    "Hôtesse de l'air / Steward",
    "Transport et Logistique",
    "Sécurité et confort des passagers à bord.",
    "Air Algérie et compagnies privées : 80 000 – 180 000 DA + indemnités (estimations).",
    "Stage cabin crew (2-3 mois) après sélection",
    {
      diplomes_requis: ["Bac minimum", "Stage cabin crew", "Langues", "Condition physique"],
      missions: ["Sécurité à bord", "Accueil et service", "Procédures d'urgence", "Respect des consignes"],
      challenges: ["Décalages", "Publics difficiles", "Contraintes physiques"],
      perspectives_evolution: ["Chef de cabine", "Formation", "Autre métier transport"],
      competences_qualites: ["Relationnel", "Sang-froid", "Langues", "Présentation"],
    }
  ),
  // ——— SECTEUR 19 — MÉTIERS DU QUOTIDIEN ET SERVICES ———
  m(
    "Téléconseiller / Agent de call center",
    "Métiers du quotidien et Services",
    "Répond aux appels : service client, assistance technique, prise de commandes. Souvent premier emploi des jeunes.",
    "Centres locaux : 30 000 – 55 000 DA. Offshore (clients français/européens) : 55 000 – 90 000 DA (estimations).",
    "Bac minimum + formation interne",
    {
      diplomes_requis: ["Bac minimum", "Formation interne (quelques semaines)", "Langues pour offshore"],
      missions: ["Réponse aux appels entrants/sortants", "Saisie et suivi des dossiers", "Respect des procédures", "Objectifs de qualité"],
      challenges: ["Charge d'appels", "Clients mécontents", "Horaires parfois décalés"],
      perspectives_evolution: ["Superviseur", "Back-office", "Offshore mieux payé"],
      competences_qualites: ["Écoute", "Calme", "Parole claire", "Résilience"],
    }
  ),
  m(
    "Secrétaire / Secrétaire de direction",
    "Métiers du quotidien et Services",
    "Gère l'agenda, les appels, le courrier du responsable qu'elle assiste.",
    "Administrations et entreprises : 35 000 – 75 000 DA. Senior : jusqu'à 120 000 DA (estimations).",
    "BTS Secrétariat ou Licence",
    {
      diplomes_requis: ["BTS Secrétariat", "Licence Assistant de direction", "CFPA, lycées pro"],
      missions: ["Agenda et déplacements", "Courrier et classement", "Accueil", "Préparation de dossiers"],
      challenges: ["Priorisation", "Confidentialité", "Multi-tâches"],
      perspectives_evolution: ["Secrétaire de direction", "Assistant(e) de direction", "Office manager"],
      competences_qualites: ["Organisation", "Discretion", "Rédaction", "Relationnel"],
    }
  ),
  m(
    "Boulanger",
    "Métiers du quotidien et Services",
    "Fabrique et vend pain et viennoiseries.",
    "Salarié : 35 000 – 70 000 DA. Propriétaire bien placé : 200 000 – 800 000 DA/mois net (estimations).",
    "CAP Boulangerie ou apprentissage",
    {
      diplomes_requis: ["CAP Boulangerie", "CFPA", "Apprentissage"],
      missions: ["Fabrication du pain", "Viennoiseries", "Vente", "Gestion des stocks et commandes"],
      challenges: ["Horaires (nuit)", "Physique", "Concurrence"],
      perspectives_evolution: ["Propriétaire de boulangerie", "Plusieurs points de vente", "Spécialité (bio, tradition)"],
      competences_qualites: ["Rigueur", "Endurance", "Sens du contact", "Qualité"],
    }
  ),
  m(
    "Traiteur",
    "Métiers du quotidien et Services",
    "Prépare et livre des repas pour mariages, fêtes d'entreprise. Un des business les plus rentables en Algérie.",
    "Traiteur reconnu : 500 000 – 3 000 000 DA sur un grand mariage (estimations).",
    "Cuisine + sens de l'organisation",
    {
      diplomes_requis: ["Formation cuisine", "Expérience en restauration", "Pas de diplôme obligatoire mais compétences requises"],
      missions: ["Devis et menus", "Préparation en amont", "Service le jour J", "Coordination équipe et logistique"],
      challenges: ["Pression du jour J", "Qualité constante", "Gestion des quantités"],
      perspectives_evolution: ["Entreprise structurée", "Spécialisation (mariages, corporate)", "Catering permanent"],
      competences_qualites: ["Organisation", "Créativité", "Résistance au stress", "Relation client"],
    }
  ),
  m(
    "Agent immobilier",
    "Métiers du quotidien et Services",
    "Met en relation acheteurs, vendeurs et locataires. Commission sur chaque transaction.",
    "Commission 1 à 3 % du prix. Agent actif à Alger : peut dépasser 500 000 DA/mois en période active (estimations).",
    "Licence Droit ou Commerce",
    {
      diplomes_requis: ["Licence Droit, Commerce, ou équivalent", "Formation immobilière", "Carte professionnelle"],
      missions: ["Prospection de biens", "Visites et valorisation", "Mise en relation", "Suivi des dossiers jusqu'à la signature"],
      challenges: ["Concurrence", "Cycles du marché", "Confiance client"],
      perspectives_evolution: ["Responsable agence", "Réseau", "Création d'agence"],
      competences_qualites: ["Relationnel", "Négociation", "Connaissance du marché", "Rigueur administrative"],
    }
  ),
  m(
    "Professeur particulier",
    "Métiers du quotidien et Services",
    "Cours à domicile ou en centres de soutien.",
    "1 500 – 5 000 DA/heure selon matière et niveau. Plusieurs élèves : 80 000 – 250 000 DA/mois (estimations). Freelance par nature.",
    "Licence dans la matière enseignée",
    {
      diplomes_requis: ["Licence (ou plus) dans la matière", "Pédagogie", "Pas d'obligation de diplôme enseignement"],
      missions: ["Cours individuels ou petits groupes", "Préparation des séances", "Suivi des progrès", "Préparation examens"],
      challenges: ["Niveaux variés", "Horaires en fin de journée", "Concurrence des centres"],
      perspectives_evolution: ["Centre de soutien propre", "Spécialisation (concours, BAC)", "En ligne"],
      competences_qualites: ["Pédagogie", "Patience", "Adaptation", "Rigueur"],
    }
  ),
];

/** Export unique pour le site : toutes les fiches. */
export function getAllMetiers(): FicheMetier[] {
  return METIERS_DATA;
}

/** Récupère une fiche par slug. */
export function getMetierBySlug(slug: string): FicheMetier | undefined {
  return METIERS_DATA.find((m) => m.slug === slug);
}

/** Filtre par recherche texte (titre, domaine) et optionnellement par secteur. */
export function searchMetiers(query: string, secteur?: string): FicheMetier[] {
  const q = query.trim().toLowerCase();
  return METIERS_DATA.filter((m) => {
    const matchText = !q || m.titre.toLowerCase().includes(q) || (m.domaine ?? "").toLowerCase().includes(q);
    const matchSecteur = !secteur || m.domaine === secteur;
    return matchText && matchSecteur;
  });
}

/** Disclaimer salaires (à afficher sur les pages métiers). */
export const DISCLAIMER_SALAIRES_METIERS = DISCLAIMER_SALAIRES;
