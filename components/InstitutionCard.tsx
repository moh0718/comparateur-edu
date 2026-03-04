import Image from "next/image";
import Link from "next/link";
import type { Institution } from "@/data/institutions-mock";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  Superieur: "bg-green-100 text-green-800",
  Langues: "bg-blue-100 text-blue-800",
  "Formation Pro": "bg-orange-100 text-orange-800",
  General: "bg-violet-100 text-violet-800",
  Sante: "bg-rose-100 text-rose-800",
  Prescolaire: "bg-amber-100 text-amber-800",
};

interface InstitutionCardProps {
  institution: Institution;
  className?: string;
}

export function InstitutionCard({ institution, className }: InstitutionCardProps) {
  const category = institution.category || "General";
  const categoryClass = CATEGORY_COLORS[category] || "bg-slate-100 text-slate-800";
  const logoUrl = institution.logo_url;
  const pointsForts = institution.points_forts?.slice(0, 2) ?? [];

  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-slate-300/80",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {logoUrl ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
            <Image src={logoUrl} alt="" fill className="object-contain" sizes="48px" />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl">
            🎓
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", categoryClass)}>
              {category}
            </span>
            <ConfidenceBadge confidence={institution.data_confidence ?? null} />
          </div>
          <h2 className="mt-1 font-semibold text-slate-900 line-clamp-1">{institution.name}</h2>
          {institution.commune && (
            <p className="text-xs text-slate-500">{institution.commune}{institution.wilaya ? `, ${institution.wilaya}` : ""}</p>
          )}
        </div>
      </div>

      {pointsForts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {pointsForts.map((p) => (
            <span key={p} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700">
              {p}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        {institution.annual_cost_range && (
          <span className="text-sm font-medium text-slate-800">{institution.annual_cost_range}</span>
        )}
        <Link
          href={`/etablissements/${institution.slug}`}
          className="rounded-full border border-emerald-600 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm hover:bg-emerald-100 hover:text-emerald-950"
        >
          Voir la fiche
        </Link>
      </div>
    </article>
  );
}
