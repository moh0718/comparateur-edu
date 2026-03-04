"use client";

import type { Institution } from "@/data/institutions-mock";
import { cn } from "@/lib/utils";

interface CompareTableProps {
  institutions: Institution[];
  className?: string;
}

type CriterionKey =
  | "category"
  | "wilaya"
  | "annual_cost_range"
  | "mesrs_recognized"
  | "languages"
  | "bac_required"
  | "has_internat"
  | "has_transport"
  | "points_forts";

const ROWS: { key: CriterionKey; label: string; type: "text" | "boolean" | "list" }[] = [
  { key: "category", label: "Catégorie", type: "text" },
  { key: "wilaya", label: "Wilaya", type: "text" },
  { key: "annual_cost_range", label: "Coût annuel", type: "text" },
  { key: "mesrs_recognized", label: "MESRS reconnu", type: "boolean" },
  { key: "languages", label: "Langue(s)", type: "list" },
  { key: "bac_required", label: "Bac requis", type: "boolean" },
  { key: "has_internat", label: "Internat", type: "boolean" },
  { key: "has_transport", label: "Transport", type: "boolean" },
  { key: "points_forts", label: "Points forts", type: "list" },
];

function getValue(inst: Institution, key: CriterionKey): string | boolean | null {
  const v = inst[key as keyof Institution];
  if (v === undefined || v === null) return null;
  if (key === "languages" && Array.isArray(v)) return v.join(", ");
  if (key === "points_forts" && Array.isArray(v)) return v.slice(0, 2).join(" ; ");
  if (key === "mesrs_recognized" || key === "bac_required" || key === "has_internat" || key === "has_transport")
    return Boolean(v);
  return String(v);
}

function Cell({ value, type }: { value: string | boolean | null; type: string }) {
  if (value === null || value === undefined || value === "")
    return <span className="text-slate-400">Non renseigné</span>;
  if (type === "boolean") {
    const b = value === true;
    return (
      <span
        className={cn(
          "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
          b ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        )}
      >
        {b ? "Oui" : "Non"}
      </span>
    );
  }
  return <span className="text-slate-800">{String(value)}</span>;
}

export function CompareTable({ institutions, className }: CompareTableProps) {
  if (institutions.length === 0) return null;

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-slate-200 bg-white", className)}>
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-3 font-semibold text-slate-900">Critère</th>
            {institutions.map((inst) => (
              <th key={inst.id} className="px-4 py-3 font-semibold text-slate-900">
                {inst.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ key, label, type }) => (
            <tr key={key} className="border-b border-slate-100">
              <td className="px-4 py-2 font-medium text-slate-700">{label}</td>
              {institutions.map((inst) => (
                <td key={inst.id} className="px-4 py-2">
                  <Cell value={getValue(inst, key)} type={type} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
