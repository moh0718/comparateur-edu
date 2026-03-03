"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { banks, type BankRecord } from "@/data/banks-mock";
import type { BankRatings } from "@/lib/bank-ratings";
import type { BankRatesEnrichment } from "@/lib/bank-rates";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

type CriterionKind = "text" | "boolean";

type CriterionId =
  | "cost"
  | "offer"
  | "rate"
  | "insurance"
  | "dossierFees"
  | "cards"
  | "eligibility"
  | "accountOpeningDelay"
  | "processingDelays"
  | "acceptsFxAndInternational"
  | "customerServiceQuality"
  | "hasMobileApp"
  | "appRating"
  | "bankType"
  | "noHiddenFees"
  | "billPayment"
  | "storePayment"
  | "cashWithdrawal"
  | "hasForeignCurrencyAccount"
  | "atmFeaturesAdvanced";

type CriterionConfig = {
  id: CriterionId;
  label: string;
  kind: CriterionKind;
  field: keyof BankRecord;
};

const CRITERIA: CriterionConfig[] = [
  {
    id: "cost",
    label: "Coût",
    kind: "text",
    field: "cost"
  },
  {
    id: "offer",
    label: "L'offre",
    kind: "text",
    field: "offer"
  },
  {
    id: "rate",
    label: "Taux",
    kind: "text",
    field: "rate"
  },
  {
    id: "insurance",
    label: "Assurance",
    kind: "text",
    field: "insurance"
  },
  {
    id: "dossierFees",
    label: "Frais de dossier",
    kind: "text",
    field: "dossierFees"
  },
  {
    id: "cards",
    label: "Cartes (Classique / Gold / Platinum / Visa / MasterCard)",
    kind: "text",
    field: "cards"
  },
  {
    id: "eligibility",
    label: "Conditions d'éligibilité (salaire minimum, CDI requis)",
    kind: "text",
    field: "eligibility"
  },
  {
    id: "accountOpeningDelay",
    label: "Délai de création d'un compte",
    kind: "text",
    field: "accountOpeningDelay"
  },
  {
    id: "processingDelays",
    label: "Délais de traitement réels (virements, etc.)",
    kind: "text",
    field: "processingDelays"
  },
  {
    id: "acceptsFxAndInternational",
    label: "Acceptation devises / virements étrangers",
    kind: "boolean",
    field: "acceptsFxAndInternational"
  },
  {
    id: "customerServiceQuality",
    label: "Qualité du service client (agence / téléphone / WhatsApp)",
    kind: "text",
    field: "customerServiceQuality"
  },
  {
    id: "hasMobileApp",
    label: "Application mobile fonctionnelle",
    kind: "boolean",
    field: "hasMobileApp"
  },
  {
    id: "appRating",
    label: "Note app (App Store / Google Play)",
    kind: "text",
    field: "hasMobileApp"
  },
  {
    id: "bankType",
    label: "Type de banque (publique / privée / islamique)",
    kind: "text",
    field: "bankType"
  },
  {
    id: "noHiddenFees",
    label: "Frais cachés (retraits, inactivité, clôture)",
    kind: "boolean",
    field: "noHiddenFees"
  },
  {
    id: "billPayment",
    label: "Paiement de factures",
    kind: "boolean",
    field: "billPayment"
  },
  {
    id: "storePayment",
    label: "Paiement en magasin",
    kind: "boolean",
    field: "storePayment"
  },
  {
    id: "cashWithdrawal",
    label: "Retrait d'argent",
    kind: "boolean",
    field: "cashWithdrawal"
  },
  {
    id: "hasForeignCurrencyAccount",
    label: "Compte en devises",
    kind: "boolean",
    field: "hasForeignCurrencyAccount"
  },
  {
    id: "atmFeaturesAdvanced",
    label: "Fonctionnalités distributeurs",
    kind: "boolean",
    field: "atmFeaturesAdvanced"
  }
];

/** Filtre par nom de banque : ensemble d’ids sélectionnés, ou "all" = toutes. */
type BankNameFilter = Set<string> | "all";

function BooleanBadge({ value }: { value: boolean }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold";
  return value ? (
    <span className={`${base} bg-emerald-100 text-emerald-800`}>
      ✅ Oui / Disponible
    </span>
  ) : (
    <span className={`${base} bg-red-100 text-red-800`}>
      ❌ Non / Indisponible
    </span>
  );
}

const BANK_IDS = banks.map((b) => b.id);

export default function ComparatifPage() {
  const [selectedCriteria, setSelectedCriteria] = useState<CriterionId[]>([]);
  const [bankNameFilter, setBankNameFilter] = useState<BankNameFilter>("all");
  const [criteriaOpen, setCriteriaOpen] = useState<boolean>(false);
  const [ratingsMap, setRatingsMap] = useState<Record<string, BankRatings>>({});
  const [enrichmentMap, setEnrichmentMap] = useState<Record<string, BankRatesEnrichment>>({});

  useEffect(() => {
    fetch("/api/bank-ratings")
      .then((r) => r.ok ? r.json() : {})
      .then(setRatingsMap)
      .catch(() => {});
  }, []);
  useEffect(() => {
    fetch("/api/bank-rates-enrichment")
      .then((r) => r.ok ? r.json() : {})
      .then(setEnrichmentMap)
      .catch(() => {});
  }, []);

  const toggleCriterion = (id: CriterionId) => {
    setSelectedCriteria((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleBankFilter = (id: string) => {
    setBankNameFilter((prev) => {
      const next = prev === "all" ? new Set<string>() : new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next.size === 0 ? "all" : next;
    });
  };

  const selectAllBanks = () => setBankNameFilter("all");
  const isBankSelected = (id: string) =>
    bankNameFilter === "all" || bankNameFilter.has(id);

  const filteredBanks = useMemo(() => {
    if (bankNameFilter === "all") return banks;
    return banks.filter((bank) => bankNameFilter.has(bank.id));
  }, [bankNameFilter]);

  const activeCriteria = useMemo(
    () => CRITERIA.filter((criterion) => selectedCriteria.includes(criterion.id)),
    [selectedCriteria]
  );

  const hasCriteria = activeCriteria.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header identique au reste du site, avec onglet Comparatif actif */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-6 md:px-8">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg text-emerald-50">
              <span aria-hidden>🏛️</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                Kompar - Banque
              </span>
              <span className="text-[11px] text-slate-500">
                Comparateur de banques algériennes
              </span>
            </div>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium text-slate-700 md:flex"
          >
            <Link href={ROUTES.etablissements} className="hover:text-brand">
              Fiches banques
            </Link>
            <Link href={ROUTES.comparer} className="text-brand">
              Comparatif
            </Link>
            <Link href={ROUTES.blog} className="hover:text-brand">
              Blog
            </Link>
            <Link href={ROUTES.contact} className="hover:text-brand">
              Contact
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div
              aria-label="Sélecteur de langue"
              className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-600"
            >
              <span className="rounded-full bg-white px-2 py-0.5 text-slate-900 shadow-sm">
                FR
              </span>
              <span className="px-2 py-0.5 text-slate-400">AR</span>
            </div>
            {/* CTA formulaire lead : modifier LEAD_FORM_HREF dans lib/navigation.ts */}
            <Button asChild variant="primary" size="sm" className="hidden whitespace-nowrap text-xs font-semibold md:inline-flex">
              <Link href={LEAD_FORM_HREF}>Trouver votre banque idéale</Link>
            </Button>
          </div>
        </div>

        <nav
          aria-label="Navigation principale mobile"
          className="border-t border-slate-100 bg-white py-2 text-xs font-medium text-slate-700 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto whitespace-nowrap px-5 pb-1 sm:px-6 md:px-8">
            <Link href={ROUTES.etablissements} className="hover:text-brand">
              Fiches banques
            </Link>
            <Link href={ROUTES.comparer} className="text-brand">
              Comparatif
            </Link>
            <Link href={ROUTES.blog} className="hover:text-brand">
              Blog
            </Link>
            <Link href={ROUTES.contact} className="hover:text-brand">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <section aria-labelledby="comparateur-titre" className="text-center">
            <header className="space-y-2">
              <h1
                id="comparateur-titre"
                className="text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl"
              >
                Comparateur de banques algériennes
              </h1>
              <p className="text-sm text-slate-600 sm:text-base">
                Sélectionnez vos critères et comparez les offres en temps réel.
              </p>
            </header>
          </section>

          {/* Layout 2 colonnes fixes : panneau gauche 260px + tableau à droite */}
          <section
            aria-label="Comparateur interactif"
            className="mt-6 overflow-x-auto"
          >
            <div className="flex min-w-[960px] rounded-2xl border border-slate-200 bg-white shadow-soft">
              {/* Panneau critères */}
              <aside className="flex w-[260px] flex-shrink-0 flex-col border-r border-slate-200 bg-white p-4 sm:p-5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left md:cursor-default"
                  onClick={() => setCriteriaOpen((open) => !open)}
                >
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                      Critères de comparaison
                    </h2>
                    <p className="text-[11px] text-slate-500 sm:text-xs">
                      Cochez les colonnes que vous souhaitez afficher.
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 md:hidden">
                    {criteriaOpen ? "Masquer" : "Afficher"}
                  </span>
                </button>

                <div
                  className={`mt-4 flex-1 space-y-2 overflow-y-auto text-sm text-slate-700 ${
                    criteriaOpen ? "block" : "hidden md:block"
                  }`}
                >
                  {CRITERIA.map((criterion) => (
                    <label
                      key={criterion.id}
                      className="flex items-start gap-2 rounded-md px-1 py-1 hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                        checked={selectedCriteria.includes(criterion.id)}
                        onChange={() => toggleCriterion(criterion.id)}
                      />
                      <span className="text-xs leading-snug text-slate-700 sm:text-[13px]">
                        {criterion.label}
                      </span>
                    </label>
                  ))}
                </div>
              </aside>

              {/* Tableau + filtres à droite */}
              <section className="flex flex-1 flex-col bg-slate-50 p-4 sm:p-5">
                {/* Filtre par banque */}
                <div className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Filtrer par banque
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={selectAllBanks}
                    >
                      Toutes
                    </Button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {banks.map((bank) => (
                      <label
                        key={bank.id}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 has-[:checked]:border-green-500 has-[:checked]:bg-green-50 has-[:checked]:text-green-800"
                      >
                        <input
                          type="checkbox"
                          checked={isBankSelected(bank.id)}
                          onChange={() => toggleBankFilter(bank.id)}
                          className="h-3.5 w-3.5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                        />
                        {bank.name}
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">
                    Type de banque et type de carte restent visibles dans les colonnes du tableau (cochez les critères à gauche).
                  </p>
                </div>

                {/* Tableau ou message vide */}
                <div className="mt-4 flex-1">
                  {!hasCriteria ? (
                    <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 sm:text-base">
                      Cochez des critères à gauche pour afficher le comparatif.
                    </div>
                  ) : (
                    <div className="h-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
                      <table className="min-w-full border-collapse text-left text-xs text-slate-800 sm:text-sm">
                        <thead>
                          <tr className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-600">
                            <th className="sticky left-0 z-10 bg-slate-100 px-4 py-3">
                              Banque
                            </th>
                            {activeCriteria.map((criterion) => (
                              <th key={criterion.id} className="px-4 py-3">
                                {criterion.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBanks.map((bank, index) => {
                            const isEven = index % 2 === 0;
                            const rowBg = isEven ? "bg-white" : "bg-slate-50";
                            return (
                              <tr
                                key={bank.id}
                                className={`${rowBg} border-t border-slate-100 hover:bg-slate-100`}
                              >
                                <td
                                  className={`sticky left-0 z-10 px-4 py-3 text-sm font-semibold text-slate-900 ${rowBg}`}
                                >
                                  <Link
                                    href={`/fiche/${bank.slug ?? bank.id}`}
                                    className="text-green-700 underline decoration-green-200 hover:decoration-green-500"
                                  >
                                    {bank.name}
                                  </Link>
                                </td>
                                {activeCriteria.map((criterion) => {
                                  if (criterion.id === "appRating") {
                                    const r = ratingsMap[bank.slug ?? bank.id];
                                    const parts: string[] = [];
                                    if (r?.app_rating_apple != null) parts.push(`App Store ${r.app_rating_apple}/5`);
                                    if (r?.app_rating_google != null) parts.push(`Google Play ${r.app_rating_google}/5`);
                                    let text = parts.length ? parts.join(" · ") : "Note indisponible";
                                    if (r?.app_reviews_count != null && r.app_reviews_count > 0) {
                                      text += ` (${r.app_reviews_count.toLocaleString("fr-FR")} avis)`;
                                    }
                                    return (
                                      <td key={criterion.id} className="px-4 py-3 align-top">
                                        <span className="text-xs text-slate-700 sm:text-sm">{text}</span>
                                      </td>
                                    );
                                  }
                                  const slug = bank.slug ?? bank.id;
                                  const enrichment = enrichmentMap[slug];
                                  let value: string | boolean | undefined = bank[criterion.field];
                                  if (criterion.kind === "text" && enrichment) {
                                    if (criterion.id === "cost" && enrichment.cost) value = enrichment.cost;
                                    else if (criterion.id === "eligibility" && enrichment.eligibility) value = enrichment.eligibility;
                                    else if (criterion.id === "cards" && enrichment.cards) value = enrichment.cards;
                                  }
                                  return (
                                    <td
                                      key={criterion.id}
                                      className="px-4 py-3 align-top"
                                    >
                                      {criterion.kind === "boolean" ? (
                                        <BooleanBadge value={Boolean(value)} />
                                      ) : (
                                        <span className="text-xs text-slate-700 sm:text-sm">
                                          {String(value)}
                                        </span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </section>

          {/* Bandeau sombre bas de page */}
          <section
            aria-label="Recommandation personnalisée"
            className="mt-8 rounded-2xl bg-gray-900 px-5 py-6 text-center text-slate-50 sm:px-8 sm:py-7"
          >
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="space-y-1 text-left">
                <h2 className="text-base font-semibold sm:text-lg">
                  Vous voulez une recommandation personnalisée&nbsp;?
                </h2>
                <p className="text-xs text-slate-200 sm:text-sm">
                  Répondez à quelques questions, nous trouvons la banque la plus
                  adaptée à votre profil.
                </p>
              </div>
              {/* CTA formulaire lead : modifier LEAD_FORM_HREF dans lib/navigation.ts */}
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                <Link href={LEAD_FORM_HREF}>Trouver ma banque idéale</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

