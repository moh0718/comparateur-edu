/**
 * Algorithme de scoring pour la recommandation bancaire.
 * Zéro appel API, zéro Supabase — calcul côté client uniquement.
 */

import type { FormAnswers } from "./form-steps";

export type ScoringResult = {
  score: number;
  recommendation: string;
  /** Identifiants ou noms de banques suggérées (à brancher sur données réelles plus tard). */
  suggestedBanks: string[];
  /** Type de carte recommandé (Dahabia, Classique, Gold/Platinum). */
  cardType: string;
  /** Profil résumé (ex: Banque publique, Profil digital). */
  profile: string;
};

/**
 * Calcule le score et la recommandation à partir des réponses du formulaire.
 * À affiner selon les vraies règles métier et données banques.
 */
export function computeScore(answers: FormAnswers): ScoringResult {
  let score = 50;

  // Q1 : urgence
  if (answers["q1"] === "le_plus_tot") score += 15;
  else if (answers["q1"] === "dans_3_mois") score += 5;

  // Q2 : compte existant (oui = profil établi)
  if (answers["q2"] === "oui") score += 5;

  // Q4 : usage (pro = plus de critères)
  if (answers["q4"] === "usage_professionnel") score += 3;

  // Q5 : stabilité des revenus
  if (answers["q5"] === "salarie_public" || answers["q5"] === "salarie_prive") score += 5;
  else if (answers["q5"] === "profession_liberale") score += 3;

  // Q7 : priorité (digital = aligné tendance actuelle)
  if (answers["q7"] === "gerer_distance_app") score += 5;
  else if (answers["q7"] === "agences_partout") score += 2;

  // Q8 : projet spécifique (immobilier/crédit = besoin conseil structuré)
  if (answers["q8"] === "achat_immobilier") score += 5;
  else if (answers["q8"] === "credit_voiture_equipement") score += 3;
  else if (answers["q8"] === "quotidien") score += 2;

  // Q9 : finance islamique (préférence forte pour certains profils)
  if (answers["q9"] === "oui") score += 5;

  // Q10 : zone d'utilisation carte (Visa = profil international)
  if (answers["q10"] === "algerie_voyage") score += 5;
  else if (answers["q10"] === "algerie_seulement") score += 3;

  // Q11 : revenu (plus élevé = plus d'offres éligibles)
  if (answers["q11"] === "plus_100k") score += 8;
  else if (answers["q11"] === "moins_50k") score += 5;
  else if (answers["q11"] === "sans_revenu") score += 2;

  // Q12 : compte devises (besoin international)
  if (answers["q12"] === "oui") score += 5;

  // Q13 : alimentation compte devises (uniquement si Q12=oui)
  if (answers["q13"] === "virements_internationaux") score += 5;
  else if (answers["q13"] === "transfert_dinars") score += 3;
  else if (answers["q13"] === "depots_especes") score += 2;

  score = Math.max(0, Math.min(100, score));

  const suggestedBanks = getSuggestedBanks(score, answers);
  const { cardType, profile } = getCardTypeAndProfile(score, answers);

  return {
    score,
    recommendation: getRecommendationText(score),
    suggestedBanks,
    cardType,
    profile,
  };
}

function getCardTypeAndProfile(score: number, answers: FormAnswers): { cardType: string; profile: string } {
  const q11 = answers["q11"];
  let cardType = "Carte Classique";
  if (q11 === "sans_revenu") cardType = "Dahabia ou Prépayée";
  else if (q11 === "plus_100k") cardType = "Gold / Platinum";

  let profile = "Profil standard";
  if (score >= 80) profile = `Profil adapté (Score ${score}/100)`;
  else if (score >= 60) profile = `Profil intéressant (Score ${score}/100)`;

  return { cardType, profile };
}

function getRecommendationText(score: number): string {
  if (score >= 75) return "Votre profil correspond bien à plusieurs offres. Nous vous recommandons de comparer les propositions ci-dessous.";
  if (score >= 50) return "Quelques établissements correspondent à votre situation. Consultez les suggestions ci-dessous.";
  return "Remplissez les prochaines étapes pour affiner vos recommandations.";
}

function getSuggestedBanks(_score: number, _answers: FormAnswers): string[] {
  // Placeholder : à brancher sur data/banks-mock ou autre source
  return ["BNP Paribas Algérie", "Société Générale Algérie", "CPA"];
}
