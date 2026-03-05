"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { InstitutionCard } from "@/components/InstitutionCard";
import { FilterBar, defaultFilters, type FilterState } from "@/components/FilterBar";
import type { Institution } from "@/data/institutions-mock";
import { Button } from "@/components/ui/button";
import { LEAD_FORM_HREF } from "@/lib/navigation";

function filterInstitutions(list: Institution[], f: FilterState): Institution[] {
  return list.filter((inst) => {
    // Filtre secteur public / privé
    const isPublic = Boolean((inst as any).sub_category);
    if (f.sector === "Public" && !isPublic) return false;
    if (f.sector === "Prive" && isPublic) return false;

    if (f.category && inst.category !== f.category) return false;
    if (f.wilaya && inst.wilaya !== f.wilaya) return false;
    if (f.level && inst.level_general && !inst.level_general.includes(f.level)) return false;
    if (f.langue && (!inst.languages || !inst.languages.includes(f.langue))) return false;
    if (f.mesrs === true && !inst.mesrs_recognized) return false;
    if (f.bacNonRequis === true && inst.bac_required !== false) return false;
    if (f.internat === true && !inst.has_internat) return false;
    if (f.transport === true && !inst.has_transport) return false;
    if (f.bilingue === true && (!inst.languages || !inst.languages.includes("Bilingue"))) return false;
    if (f.budget) {
      const range = inst.annual_cost_range ?? "";
      if (f.budget === "gratuit") {
        if (!range || !/gratu/i.test(range)) return false;
      } else {
        if (f.budget === "moins200" && range && parseBudgetMax(range) > 200000) return false;
        if (f.budget === "200-500" && range && (parseBudgetMax(range) < 200000 || parseBudgetMin(range) > 500000)) return false;
        if (f.budget === "500-1M" && range && (parseBudgetMax(range) < 500000 || parseBudgetMin(range) > 1e6)) return false;
        if (f.budget === "plus1M" && range && parseBudgetMin(range) < 1e6) return false;
      }
    }
    return true;
  });
}

function parseBudgetMin(s: string): number {
  const m = s.match(/(\d[\\d\\s]*)\\s*000/);
  return m ? parseInt(m[1].replace(/\\s/g, ""), 10) * 1000 : 0;
}

function parseBudgetMax(s: string): number {
  const parts = s.split(/-|à|–/);
  const m = parts[parts.length - 1]?.match(/(\d[\\d\\s]*)\\s*000/);
  return m ? parseInt(m[1].replace(/\\s/g, ""), 10) * 1000 : 999999999;
}

function sortInstitutions(list: Institution[]): Institution[] {
  return [...list].sort((a, b) => {
    if ((b.is_partner ? 1 : 0) !== (a.is_partner ? 1 : 0)) return (b.is_partner ? 1 : 0) - (a.is_partner ? 1 : 0);
    const conf = { high: 3, medium: 2, low: 1 };
    return (conf[b.data_confidence ?? "low"] ?? 0) - (conf[a.data_confidence ?? "low"] ?? 0);
  });
}

type EtablissementsClientProps = {
  institutions: Institution[];
};

export function EtablissementsClient({ institutions }: EtablissementsClientProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    category: (searchParams.get("categorie") as FilterState["category"]) || "",
    wilaya: searchParams.get("wilaya") || "",
    langue: searchParams.get("langue") || "",
    sector: (searchParams.get("secteur") as FilterState["sector"]) || "",
  }));
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const list = useMemo(() => {
    let base = institutions.filter((i) => i.is_active !== false);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      base = base.filter((i) => i.name.toLowerCase().includes(q) || i.commune?.toLowerCase().includes(q));
    }
    const filtered = filterInstitutions(base, filters);
    return sortInstitutions(filtered);
  }, [query, filters, institutions]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            L&apos;annuaire d&apos;établissements le plus complet d&apos;Algérie, mis à jour pour vous.
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-600">
            Filtrez par wilaya, frais d&apos;inscription et services pour explorer les écoles, ou laissez{" "}
            <span className="font-semibold">kompar - edu</span> vous proposer une sélection personnalisée.
          </p>
        </div>
        <div className="flex justify-start md:justify-end">
          <Button asChild variant="primary" size="lg" className="rounded-full px-6">
            <Link href={LEAD_FORM_HREF}>Trouver mon école</Link>
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row">
        <input
          type="search"
          placeholder="Rechercher par nom ou commune..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          aria-label="Recherche"
        />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <FilterBar filters={filters} onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))} />

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-slate-600">
            {list.length} établissement{list.length !== 1 ? "s" : ""} trouvé{list.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((inst) => (
              <InstitutionCard key={inst.id} institution={inst} />
            ))}
          </div>
          {list.length === 0 && (
            <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              Aucun établissement ne correspond à vos filtres. Essayez d&apos;élargir la recherche.
            </p>
          )}

          {list.length > 0 && (
            <section
              aria-label="Recommandation personnalisée"
              className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-6 py-6 text-center sm:px-8"
            >
              <p className="text-sm text-emerald-900 sm:text-base">
                Vous hésitez entre plusieurs établissements ? Répondez à quelques questions et{" "}
                <span className="font-semibold">recevez une recommandation personnalisée</span> gratuite.
              </p>
              <div className="mt-4 flex justify-center">
                <Button asChild variant="primary" size="lg" className="rounded-full px-8">
                  <Link href={LEAD_FORM_HREF}>Lancer le formulaire</Link>
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

