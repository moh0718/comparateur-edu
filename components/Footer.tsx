import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

/** Disclaimer obligatoire (éducation) — à afficher dans le footer de toutes les pages. */
const FOOTER_DISCLAIMER =
  "Les informations presentees sur ce site sont collectees a partir de sources publiques (sites officiels, Google Maps, reseaux sociaux des etablissements) a titre informatif. Elles ne constituent pas un conseil pedagogique officiel et peuvent etre incompletes. Verifiez toujours directement aupres de l'etablissement avant toute inscription. Ce site est gere par un particulier et n'est affilie a aucun etablissement d'enseignement.";

type FooterProps = {
  className?: string;
  /** Variante visuelle : default (fond gris) ou bordered (bordure haute). */
  variant?: "default" | "bordered";
};

export function Footer({ className = "", variant = "default" }: FooterProps) {
  const baseClass =
    variant === "bordered"
      ? "mt-auto border-t border-slate-200 bg-gray-100 py-10 text-center text-xs text-slate-600"
      : "mt-auto bg-gray-100 py-10 text-xs text-slate-600 md:py-12";

  return (
    <footer className={`${baseClass} ${className}`.trim()} role="contentinfo">
      <div
        className={
          variant === "bordered"
            ? "mx-auto max-w-5xl space-y-5 px-5 sm:px-6"
            : "mx-auto max-w-5xl space-y-5 px-5 text-center sm:px-6"
        }
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
          <Link href={ROUTES.mentionsLegales} className="hover:text-slate-900">
            Mentions légales
          </Link>
          <Link href={ROUTES.faq} className="hover:text-slate-900">
            FAQ
          </Link>
          <Link href={ROUTES.conditionsGenerales} className="hover:text-slate-900">
            Conditions générales et politique de confidentialité
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
          <span className="text-[11px] text-slate-500">
            De la même famille&nbsp;:
          </span>
          <Link
            href="https://kompar-banques.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-sm hover:border-emerald-300 hover:bg-emerald-50"
          >
            <span aria-hidden>🏦</span>
            <span>kompar - banques · comparateur de banques en Algérie</span>
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          © 2026 kompar - edu. Tous droits réservés.
        </p>

        <p className="text-[11px] leading-relaxed text-slate-600 md:text-xs">
          {FOOTER_DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
