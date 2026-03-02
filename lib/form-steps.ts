/**
 * Logique des étapes du formulaire de recommandation bancaire.
 * Navigation et branches conditionnelles (sans API, sans Supabase).
 */

export const TOTAL_STEPS = 14;

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type FormAnswers = Record<string, string>;

export type StepConfig = {
  id: StepId;
  /** Titre/catégorie affiché au-dessus de la question (optionnel). */
  title?: string;
  /** Intro/sous-titre affiché au-dessus de la question, en plus grand (optionnel). */
  intro?: string;
  question: string;
  /** "buttons" = boutons cliquables (défaut), "select" = menu déroulant, "radio" = liste radio verticale. */
  inputType?: "buttons" | "select" | "radio";
  /** Placeholder du select quand inputType = "select". */
  selectPlaceholder?: string;
  /** Plus d'espace vertical (étape aérée). */
  spacious?: boolean;
  /** variant "primary" = vert, "secondary" = bleu foncé. Par défaut = neutre (blanc). */
  /** icon = emoji ou identifiant pour icône. image = URL d'image circulaire (carte). description = texte secondaire sous le label (style carte). */
  options: Array<{
    value: string;
    label: string;
    variant?: "primary" | "secondary";
    icon?: string;
    image?: string;
    description?: string;
  }>;
};

/** Configuration des étapes du formulaire (Q1–Q14). */
const STEPS: Record<StepId, StepConfig> = {
  1: {
    id: 1,
    question: "Quand aimeriez-vous ouvrir votre compte ?",
    options: [
      { value: "le_plus_tot", label: "Le plus tôt possible" },
      { value: "dans_3_mois", label: "Dans 3 mois" },
      { value: "juste_comparer", label: "Juste comparer" },
    ],
  },
  2: {
    id: 2,
    title: "Statut Bancaire",
    question: "Avez-vous déjà un compte bancaire aujourd'hui ?",
    options: [
      { value: "oui", label: "Oui", variant: "primary" },
      { value: "non", label: "Non", variant: "secondary" },
    ],
  },
  3: {
    id: 3,
    title: "Carte Actuelle",
    question: "Quelle est votre carte bancaire actuelle ?",
    inputType: "select",
    selectPlaceholder: "Choisir votre carte",
    options: [
      { value: "visa_classique", label: "Visa Classique" },
      { value: "visa_gold", label: "Visa Gold" },
      { value: "visa_platinum", label: "Visa Platinum" },
      { value: "mastercard", label: "Mastercard" },
      { value: "maestro", label: "Maestro" },
      { value: "pas_de_carte", label: "Pas de carte" },
      { value: "autre", label: "Autre" },
    ],
  },
  4: {
    id: 4,
    question: "Souhaitez-vous ouvrir ce compte à titre personnel ou pour une activité professionnelle ?",
    options: [
      {
        value: "usage_personnel",
        label: "Usage Personnel",
        icon: "👤",
        description: "Gestion du budget, épargne, famille",
      },
      {
        value: "usage_professionnel",
        label: "Usage Professionnel",
        icon: "💼",
        description: "Auto-entrepreneur, entreprise, commerce",
      },
    ],
  },
  5: {
    id: 5,
    question: "Quel est votre statut professionnel actuel ?",
    inputType: "radio",
    options: [
      { value: "salarie_public", label: "Salarié du secteur public" },
      { value: "salarie_prive", label: "Salarié du secteur privé" },
      { value: "profession_liberale", label: "Profession libérale ou Commerçant" },
      { value: "etudiant", label: "Étudiant ou sans revenu fixe" },
    ],
  },
  6: {
    id: 6,
    question: "Quel type de chéquier préférez-vous recevoir ?",
    inputType: "radio",
    options: [
      { value: "standard", label: "Standard" },
      { value: "premium", label: "Premium" },
      { value: "eco_responsable", label: "Eco-responsable" },
    ],
  },
  7: {
    id: 7,
    question: "Quelle est votre priorité absolue au quotidien ?",
    options: [
      {
        value: "agences_partout",
        label: "Agences partout",
        variant: "secondary",
        icon: "🏛️",
        description: "Comptoir physique, conseiller dédié",
      },
      {
        value: "gerer_distance_app",
        label: "Gérer à distance sur une app",
        variant: "primary",
        icon: "📱",
        description: "Mobile, virement, suivi en ligne",
      },
    ],
  },
  8: {
    id: 8,
    question: "Envisagez-vous un projet spécifique prochainement ?",
    inputType: "radio",
    options: [
      {
        value: "achat_immobilier",
        label: "Un achat immobilier (AADL, LPP, ou crédit immobilier classique)",
      },
      {
        value: "credit_voiture_equipement",
        label: "Un crédit voiture ou un besoin de financement rapide pour du matériel",
      },
      {
        value: "quotidien",
        label: "Je cherche uniquement une banque pour gérer mon argent au quotidien",
      },
    ],
  },
  9: {
    id: 9,
    question: "Le respect des principes de la Finance Islamique est-il un critère pour vous ?",
    options: [
      { value: "oui", label: "Oui", variant: "primary" },
      { value: "non", label: "Non" },
    ],
  },
  10: {
    id: 10,
    question: "Où pensez-vous utiliser votre carte ?",
    inputType: "radio",
    options: [
      { value: "algerie_seulement", label: "Uniquement en Algérie (CIB/Dahabia)" },
      { value: "algerie_voyage", label: "En Algérie et en voyage (Visa + compte devise)" },
    ],
  },
  11: {
    id: 11,
    intro: "Pour vous proposer une carte adaptée",
    question: "Quel est votre revenu mensuel (ou votre capacité de dépôt) ?",
    inputType: "radio",
    options: [
      { value: "sans_revenu", label: "Sans revenu fixe et justificatif (Dahabia ou Prépayée)" },
      { value: "moins_50k", label: "Inférieur à 50 000 DA (Carte Classique)" },
      { value: "plus_100k", label: "Supérieur à 100 000 DA (Carte Premium Gold/Platinum)" },
    ],
  },
  12: {
    id: 12,
    question: "Avez-vous besoin d'un compte en devises (euros, dollars) ?",
    inputType: "radio",
    options: [
      { value: "oui", label: "Oui" },
      { value: "non", label: "Non" },
    ],
  },
  13: {
    id: 13,
    question: "Comment comptez-vous alimenter votre compte en devises ?",
    inputType: "radio",
    spacious: true,
    options: [
      { value: "depots_especes", label: "Dépôts d'espèces (Euros/Dollars)" },
      {
        value: "virements_internationaux",
        label: "Réception de virements internationaux (Freelance, retraite, famille à l'étranger)",
      },
      {
        value: "transfert_dinars",
        label: "Transfert depuis mon compte Dinars (Scolarité, soins à l'étranger)",
      },
    ],
  },
  14: {
    id: 14,
    question: "",
    options: [],
  },
};

export function getStepConfig(step: number): StepConfig | null {
  if (step < 1 || step > TOTAL_STEPS) return null;
  return STEPS[step as StepId] ?? null;
}

/**
 * Prochaine étape selon la réponse (branches conditionnelles).
 * Q1 : "Juste comparer" → étape 14 (résultat). Sinon → 2.
 * Q12 : "non" → étape 14 (résultat). "oui" → étape 13 (alimenter devises).
 */
export function getNextStep(currentStep: number, answers: FormAnswers): number {
  if (currentStep < 1 || currentStep >= TOTAL_STEPS) return currentStep;

  if (currentStep === 1) {
    const q1 = answers["q1"];
    if (q1 === "juste_comparer") return 14;
    return 2;
  }

  if (currentStep === 12) {
    if (answers["q12"] === "non") return 14;
    return 13;
  }

  return currentStep + 1;
}

export function getPrevStep(currentStep: number, answers?: FormAnswers): number {
  if (currentStep <= 1) return 1;
  if (currentStep === 14 && answers?.["q12"] === "non") return 12;
  return currentStep - 1;
}

export function isResultStep(step: number): boolean {
  return step === TOTAL_STEPS;
}

/** Indique si on est passé par "Juste comparer" en Q1 (résultat sans bouton WhatsApp). */
export function isCompareOnlyFlow(answers: FormAnswers): boolean {
  return answers["q1"] === "juste_comparer";
}

/** Retourne le label affiché pour une réponse donnée. */
export function getAnswerLabel(stepId: number, value: string): string {
  const config = getStepConfig(stepId);
  if (!config) return value;
  const opt = config.options.find((o) => o.value === value);
  return opt?.label ?? value;
}

/** Construit le résumé des réponses pour WhatsApp (format profil). */
export function buildAnswersSummary(answers: FormAnswers): string {
  const lines: string[] = [];
  const shortLabels: Record<string, string> = {
    q1: "Timing",
    q2: "Compte bancaire",
    q3: "Carte actuelle",
    q4: "Usage",
    q5: "Statut",
    q6: "Chéquier",
    q7: "Priorité",
    q8: "Projet",
    q9: "Finance islamique",
    q10: "Zone carte",
    q11: "Revenu",
    q12: "Compte devises",
    q13: "Alimentation devises",
  };
  for (let i = 1; i <= 12; i++) {
    const v = answers[`q${i}`];
    if (!v) continue;
    const label = getAnswerLabel(i, v);
    const short = shortLabels[`q${i}`] ?? `Q${i}`;
    lines.push(`  • ${short} : ${label}`);
  }
  if (answers["q13"]) {
    const label = getAnswerLabel(13, answers["q13"]);
    lines.push(`  • ${shortLabels["q13"]} : ${label}`);
  }
  return lines.join("\n");
}

/** Construit le message WhatsApp complet (format Claude). */
export function buildWhatsAppMessage(
  answers: FormAnswers,
  contact: {
    nomPrenom: string;
    trancheAgeLabel: string;
    wilaya: string;
    email?: string;
    whatsapp: string;
  },
  result: { profile: string; cardType: string; suggestedBanks: string[] }
): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "kompar-banque.dz";
  const lines: string[] = [
    "🏦 Nouvelle demande — " + site.replace(/^https?:\/\//, ""),
    "─────────────────────────────────────",
    `👤 ${contact.nomPrenom} · ${contact.trancheAgeLabel} · ${contact.wilaya}`,
    `📱 WhatsApp : ${contact.whatsapp}`,
  ];
  if (contact.email) lines.push(`📧 Email : ${contact.email}`);
  lines.push(
    "─────────────────────────────────────",
    "📋 SON PROFIL :",
    buildAnswersSummary(answers),
    "─────────────────────────────────────",
    "🎯 RECOMMANDATION CALCULÉE :",
    `  Profil : ${result.profile}`,
    `  Carte : ${result.cardType}`,
    ...(result.suggestedBanks.length > 0
      ? [`  → ${result.suggestedBanks.join(" ou ")}`]
      : []),
    "─────────────────────────────────────",
    "📩 Envoyé depuis " + site.replace(/^https?:\/\//, ""),
  );
  return lines.join("\n");
}
