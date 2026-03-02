/**
 * Algorithme de matching établissements selon les réponses du formulaire d'orientation.
 * Utilisé côté client pour filtrer / scorer les établissements.
 */

import type { Institution } from "@/data/institutions-mock";

export interface OrientationAnswers {
  wilaya?: string;
  category?: string;
  budget?: string;
  niveau?: string;
  langue?: string;
  bacRequis?: string;
  internat?: string;
  transport?: string;
}

/**
 * Score de 0 à 100 selon correspondance avec les réponses.
 * Priorité : wilaya > catégorie > budget > langue > critères (internat, transport, bac).
 */
export function computeInstitutionScore(
  institution: Institution,
  answers: OrientationAnswers
): number {
  let score = 0;
  const max = 100;
  let weightLeft = max;

  if (answers.wilaya && institution.wilaya) {
    const match = institution.wilaya.toLowerCase() === answers.wilaya.toLowerCase();
    const w = 35;
    if (match) score += w;
    weightLeft -= w;
  }

  if (answers.category && institution.category) {
    const match = institution.category === answers.category;
    const w = 25;
    if (match) score += w;
    weightLeft -= w;
  }

  if (answers.budget && institution.annual_cost_range) {
    const range = institution.annual_cost_range;
    const w = 20;
    if (answers.budget === "moins200" && /^\s*[0-9\s-]*\s*[0-9]{2,3}\s*000/.test(range)) score += w;
    else if (answers.budget === "200-500" && range.includes("-")) score += w;
    else if (answers.budget === "500-1M" || answers.budget === "plus1M") score += w * 0.8;
    weightLeft -= w;
  }

  if (answers.langue && institution.languages?.length) {
    const want = answers.langue === "Bilingue" ? ["FR", "EN", "AR"] : [answers.langue];
    const match = want.some((l) => institution.languages?.includes(l));
    const w = 10;
    if (match) score += w;
    weightLeft -= w;
  }

  if (answers.internat === "oui" && institution.has_internat) score += 3;
  if (answers.transport === "oui" && institution.has_transport) score += 2;
  if (answers.bacRequis === "non" && institution.bac_required === false) score += 5;

  score += Math.min(weightLeft, (institution.data_confidence === "high" ? 8 : institution.data_confidence === "medium" ? 4 : 0));
  return Math.min(max, Math.round(score));
}

/**
 * Trie les établissements par score décroissant, puis par is_partner et data_confidence.
 */
export function sortInstitutionsByMatch(
  institutions: Institution[],
  answers: OrientationAnswers
): Institution[] {
  const withScore = institutions.map((inst) => ({
    institution: inst,
    score: computeInstitutionScore(inst, answers),
  }));
  return withScore
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if ((b.institution.is_partner ? 1 : 0) !== (a.institution.is_partner ? 1 : 0))
        return (b.institution.is_partner ? 1 : 0) - (a.institution.is_partner ? 1 : 0);
      const conf = { high: 3, medium: 2, low: 1 };
      const ac = conf[a.institution.data_confidence ?? "low"] ?? 0;
      const bc = conf[b.institution.data_confidence ?? "low"] ?? 0;
      return bc - ac;
    })
    .map((x) => x.institution);
}
