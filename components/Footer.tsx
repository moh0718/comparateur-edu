import Link from "next/link";
import { cookies } from "next/headers";
import { ROUTES } from "@/lib/navigation";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

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

  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang")?.value as Lang | undefined;
  const lang: Lang = langCookie === "ar" ? "ar" : "fr";

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
            {t(lang, "footer.links.mentions")}
          </Link>
          <Link href={ROUTES.faq} className="hover:text-slate-900">
            {t(lang, "footer.links.faq")}
          </Link>
          <Link href={ROUTES.conditionsGenerales} className="hover:text-slate-900">
            {t(lang, "footer.links.conditions")}
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
          <span className="text-[11px] text-slate-500">
            {t(lang, "footer.family.label")}
          </span>
          <Link
            href="https://kompar-banques.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-sm hover:border-emerald-300 hover:bg-emerald-50"
          >
            <span aria-hidden>🏦</span>
            <span>{t(lang, "footer.family.bank")}</span>
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          {t(lang, "footer.copyright")}
        </p>

        <p className="text-[11px] leading-relaxed text-slate-600 md:text-xs">
          {t(lang, "footer.disclaimer")}
        </p>
      </div>
    </footer>
  );
}
