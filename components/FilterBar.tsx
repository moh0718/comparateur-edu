"use client";

import { cn } from "@/lib/utils";

export type FilterCategory =
  | "Superieur"
  | "Langues"
  | "Formation Pro"
  | "General"
  | "Sante"
  | "Prescolaire";

export interface FilterState {
  category: FilterCategory | "";
  wilaya: string;
  level: string;
  budget: string;
  /** Secteur : public / privé */
  sector: "" | "Public" | "Prive";
  mesrs: boolean | null;
  bacNonRequis: boolean | null;
  internat: boolean | null;
  transport: boolean | null;
  bilingue: boolean | null;
  langue: string;
}

const CATEGORIES: FilterCategory[] = ["Superieur", "Langues", "Formation Pro", "General", "Sante"];
const WILAYAS = ["Alger", "Blida", "Tipaza", "Boumerdès"];
const LEVELS = ["Maternelle", "Primaire", "CEM", "Lycee"];
const BUDGETS = [
  { value: "gratuit", label: "Gratuit (public)" },
  { value: "moins200", label: "Moins 200K DA" },
  { value: "200-500", label: "200-500K DA" },
  { value: "500-1M", label: "500K-1M DA" },
  { value: "plus1M", label: "Plus 1M DA" },
];
const LANGUES = ["FR", "EN", "AR", "Bilingue"];

interface FilterBarProps {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  className?: string;
  /** Sur mobile : afficher en accordéon (ouvert par défaut si true) */
  openOnMobile?: boolean;
}

export function FilterBar({ filters, onChange, className, openOnMobile = false }: FilterBarProps) {
  return (
    <aside
      className={cn(
        "w-full shrink-0 rounded-xl border border-slate-200 bg-white p-4 lg:w-[260px]",
        className
      )}
      role="search"
      aria-label="Filtres établissements"
    >
      <h3 className="mb-4 text-sm font-semibold text-slate-900">Filtres</h3>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-600">Type d&apos;établissement</label>
          <select
            value={filters.sector}
            onChange={(e) => onChange({ sector: e.target.value as FilterState["sector"] })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Public &amp; privé</option>
            <option value="Public">Public uniquement</option>
            <option value="Prive">Privé uniquement</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-slate-600">Catégorie</label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value as FilterState["category"] })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Toutes</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-slate-600">Wilaya</label>
          <select
            value={filters.wilaya}
            onChange={(e) => onChange({ wilaya: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Toutes</option>
            {WILAYAS.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {filters.category === "General" && (
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">Niveau</label>
            <select
              value={filters.level}
              onChange={(e) => onChange({ level: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
            >
              <option value="">Tous</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-2 block text-xs font-medium text-slate-600">Frais d'inscription annuels</label>
          <select
            value={filters.budget}
            onChange={(e) => onChange({ budget: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Tous</option>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-slate-600">Langue enseignement</label>
          <select
            value={filters.langue}
            onChange={(e) => onChange({ langue: e.target.value })}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Toutes</option>
            {LANGUES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-3">
          <label className="block text-xs font-medium text-slate-600">Critères</label>
          {[
            { key: "mesrs" as const, label: "MESRS reconnu" },
            { key: "bacNonRequis" as const, label: "Bac non requis" },
            { key: "internat" as const, label: "Internat" },
            { key: "transport" as const, label: "Transport" },
            { key: "bilingue" as const, label: "Bilingue" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={filters[key] === true}
                onChange={(e) => onChange({ [key]: e.target.checked ? true : null })}
                className="rounded border-slate-300 text-green-600 focus:ring-green-500"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export const defaultFilters: FilterState = {
  category: "",
  wilaya: "",
  level: "",
  budget: "",
   sector: "",
  mesrs: null,
  bacNonRequis: null,
  internat: null,
  transport: null,
  bilingue: null,
  langue: "",
};
