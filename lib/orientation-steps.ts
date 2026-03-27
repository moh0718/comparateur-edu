/**
 * Logique des étapes du formulaire d'orientation.
 * Utilisé par app/orientation/[step]/page.tsx.
 */

export const TOTAL_STEPS = 7;

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type OrientationAnswers = Record<string, string>;

export type StepConfig = {
  id: StepId;
  title?: string;
  question: string;
  inputType?: "buttons" | "select" | "radio" | "checkboxes" | "custom";
  selectPlaceholder?: string;
  options: Array<{ value: string; label: string; icon?: string }>;
};

export const ORIENTATION_STEPS: Record<StepId, StepConfig> = {
  1: {
    id: 1,
    title: "Localisation",
    question: "Dans quelle wilaya cherchez-vous un établissement ?",
    options: [
      { value: "Alger", label: "Alger" },
      { value: "Blida", label: "Blida" },
      { value: "Tipaza", label: "Tipaza" },
      { value: "Boumerdès", label: "Boumerdès" },
    ],
  },
  2: {
    id: 2,
    title: "Parcours",
    question: "Dites-nous en plus sur votre parcours actuel",
    inputType: "custom",
    options: [],
  },
  3: {
    id: 3,
    title: "Type de formation",
    question: "Quel type d'établissement vous intéresse ?",
    options: [
      { value: "Superieur", label: "Supérieur", icon: "🎓" },
      { value: "Langues", label: "Langues", icon: "🌍" },
      { value: "Formation Pro", label: "Formation Pro", icon: "💼" },
      { value: "General", label: "Général (Maternelle → Lycée)", icon: "📚" },
      { value: "Sante", label: "Santé", icon: "🏥" },
      { value: "Prescolaire", label: "Préscolaire", icon: "👶" },
    ],
  },
  4: {
    id: 4,
    title: "Frais d'inscription",
    question: "Quels frais d'inscription annuels approximatifs (en DA) ?",
    options: [
      { value: "gratuit", label: "Gratuit (public)" },
      { value: "moins200", label: "Moins de 200 000 DA" },
      { value: "200-500", label: "200 000 - 500 000 DA" },
      { value: "500-1M", label: "500 000 - 1 000 000 DA" },
      { value: "plus1M", label: "Plus d'1 million DA" },
    ],
  },
  5: {
    id: 5,
    title: "Critères",
    question: "Avez-vous des critères particuliers ?",
    inputType: "checkboxes",
    options: [
      { value: "mesrs", label: "Établissement reconnu MESRS" },
      { value: "bac_non_requis", label: "Bac non requis" },
      { value: "internat", label: "Internat" },
      { value: "transport", label: "Transport scolaire" },
      { value: "bilingue", label: "Enseignement bilingue" },
      { value: "aucun", label: "Aucun en particulier" },
    ],
  },
  6: {
    id: 6,
    title: "Langue",
    question: "Langue d'enseignement souhaitée ?",
    options: [
      { value: "FR", label: "Français" },
      { value: "EN", label: "Anglais" },
      { value: "AR", label: "Arabe" },
      { value: "Bilingue", label: "Bilingue (FR/AR ou FR/EN)" },
    ],
  },
  7: {
    id: 7,
    title: "Identité",
    question: "Qui êtes-vous ?",
    inputType: "custom",
    options: [],
  },
};

export function getOrientationStepConfig(step: number): StepConfig | null {
  if (step < 1 || step > TOTAL_STEPS) return null;
  return ORIENTATION_STEPS[step as StepId] ?? null;
}

export function getNextOrientationStep(step: number): number | null {
  if (step >= TOTAL_STEPS) return null;
  return step + 1;
}

export function getPrevOrientationStep(step: number): number | null {
  if (step <= 1) return null;
  return step - 1;
}

export function isOrientationResultStep(step: number): boolean {
  return step > TOTAL_STEPS;
}

const CRITERE_LABELS: Record<string, string> = {
  mesrs: "Établissement reconnu MESRS",
  bac_non_requis: "Bac non requis",
  internat: "Internat",
  transport: "Transport scolaire",
  bilingue: "Enseignement bilingue",
  aucun: "Aucun en particulier",
};

const BUDGET_LABELS: Record<string, string> = {
  gratuit: "Gratuit (public)",
  moins200: "Moins de 200 000 DA",
  "200-500": "200 000 - 500 000 DA",
  "500-1M": "500 000 - 1 000 000 DA",
  plus1M: "Plus d'1 million DA",
};

/** Construit le résumé des réponses pour le message WhatsApp. */
export function buildOrientationWhatsAppMessage(answers: OrientationAnswers, whatsappNumber: string): string {
  const critValuesRaw = answers.critere || "";
  const critValues = critValuesRaw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  const critLabels =
    critValues.length > 0
      ? critValues.map((v) => CRITERE_LABELS[v] || v)
      : [];

  const budgetLabel =
    answers.budget && BUDGET_LABELS[answers.budget]
      ? BUDGET_LABELS[answers.budget]
      : answers.budget;

  const lines = [
    "📚 Nouvelle demande d'orientation",
    "────────────────────────────",
    answers.nom ? `👤 Nom : ${answers.nom}` : "",
    answers.email ? `📧 Email : ${answers.email}` : "",
    answers.whatsapp ? `📱 WhatsApp : ${answers.whatsapp}` : "",
    "────────────────────────────",
    answers.wilaya ? `📍 Wilaya : ${answers.wilaya}` : "",
    answers.niveau ? `🎓 Niveau actuel : ${answers.niveau}` : "",
    answers.moyenne ? `📈 Moyenne : ${answers.moyenne}` : "",
    answers.rentree ? `📅 Rentrée : ${answers.rentree}` : "",
    answers.category ? `🏫 Type : ${answers.category}` : "",
    budgetLabel ? `💰 Budget : ${budgetLabel}` : "",
    critLabels.length ? `✓ Critères : ${critLabels.join(", ")}` : "",
    answers.langue ? `🌍 Langue : ${answers.langue}` : "",
    answers.recommended ? `✨ Recommandations : ${answers.recommended}` : "",
    "────────────────────────────",
    "Demande issue de kompar - edu",
  ].filter(Boolean);
  return lines.join("\n");
}
