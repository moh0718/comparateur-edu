"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = "hover:text-slate-900";
  const navLinkBrandClass = "text-brand hover:text-brand-dark";

  const onEtablissements = pathname.startsWith(ROUTES.etablissements);
  const onFichesMetiers = pathname.startsWith(ROUTES.fichesMetiers);
  const onSalons = pathname.startsWith(ROUTES.salonsEtudiants);
  const onRankings = pathname.startsWith(ROUTES.rankings);
  const onBlog = pathname.startsWith(ROUTES.blog);
  const onContact = pathname.startsWith(ROUTES.contact);

  return (
    <header className="border-b border-slate-100 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-6 md:px-8">
        {/* Logo */}
        <Link href={ROUTES.home} className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-lg text-emerald-50 shadow-md" aria-hidden>
            🎓
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="flex items-center gap-1 text-sm font-semibold text-slate-900">
              kompar - edu
              <span role="img" aria-label="Algérie" className="text-base">
                🇩🇿
              </span>
            </span>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav
          aria-label="Navigation principale"
          className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium text-slate-700 md:flex"
        >
          <Link
            href={ROUTES.etablissements}
            className={cn(
              "rounded-lg px-3 py-2",
              navLinkBrandClass,
              onEtablissements && "font-semibold"
            )}
          >
            {t("nav.etablissements")}
          </Link>

          {/* Métiers & Salons — dropdown au survol */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span
              className={cn(
                "inline-flex cursor-default rounded-lg px-3 py-2",
                dropdownOpen || onFichesMetiers || onSalons
                  ? "text-brand font-semibold"
                  : navLinkBrandClass
              )}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {t("nav.metiersSalons")}
            </span>
            <div
              className={cn(
                "absolute left-0 top-full z-50 min-w-[220px] rounded-xl border border-slate-200 bg-white py-1 shadow-card transition-all duration-150",
                dropdownOpen ? "visible opacity-100" : "invisible opacity-0"
              )}
            >
              <Link
                href={ROUTES.fichesMetiers}
                className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {t("nav.fichesMetiers")}
              </Link>
              <Link
                href={ROUTES.salonsEtudiants}
                className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {t("nav.salons")}
              </Link>
            </div>
          </div>

          <Link
            href={ROUTES.blog}
            className={cn(
              "rounded-lg px-3 py-2",
              navLinkClass,
              onBlog && "font-semibold text-slate-900"
            )}
          >
            Le Mag&apos;
          </Link>
          <Link
            href={ROUTES.rankings}
            className={cn(
              "rounded-lg px-3 py-2",
              navLinkClass,
              onRankings && "font-semibold text-slate-900"
            )}
          >
            Rankings
          </Link>
          <Link
            href={ROUTES.contact}
            className={cn(
              "rounded-lg px-3 py-2",
              navLinkClass,
              onContact && "font-semibold text-slate-900"
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Sélecteur langue + CTA Lead Gen */}
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-600 sm:flex">
            <button
              type="button"
              onClick={() => {
                setLang("fr");
                if (typeof window !== "undefined") window.location.reload();
              }}
              className={cn(
                "rounded-full px-2 py-0.5",
                lang === "fr" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              )}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => {
                setLang("ar");
                if (typeof window !== "undefined") window.location.reload();
              }}
              className={cn(
                "rounded-full px-2 py-0.5",
                lang === "ar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              )}
            >
              AR
            </button>
          </div>
          <Button
            asChild
            variant="primary"
            size="sm"
            className="whitespace-nowrap text-sm font-semibold shadow-md md:text-base"
          >
            <Link href={LEAD_FORM_HREF}>{t("nav.cta")}</Link>
          </Button>
        </div>
      </div>

      {/* Bandeau valeur ajoutée */}
      <div className="border-t border-slate-100 bg-emerald-50/80">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-1.5 text-center sm:px-6 md:px-8">
          <p className="text-[11px] font-medium text-emerald-800 sm:text-xs">
            {t("header.tagline")}
          </p>
        </div>
      </div>

      {/* Navigation mobile */}
      <nav aria-label="Navigation mobile" className="border-t border-slate-100 py-2 text-xs font-medium text-slate-700 md:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 pb-1 pt-1 sm:px-6 md:px-8">
          <Link
            href={ROUTES.etablissements}
            className={cn(
              "rounded-lg px-3 py-2",
              onEtablissements
                ? "bg-emerald-100 text-emerald-900 font-semibold"
                : "bg-slate-100 text-slate-700"
            )}
          >
            {t("nav.etablissements")}
          </Link>
          <Link
            href={ROUTES.fichesMetiers}
            className={cn(
              "rounded-lg px-3 py-2",
              onFichesMetiers
                ? "bg-emerald-100 text-emerald-900 font-semibold"
                : "bg-slate-100 text-slate-700"
            )}
          >
            {t("nav.metiersSalons")}
          </Link>
          <Link
            href={ROUTES.salonsEtudiants}
            className={cn(
              "rounded-lg px-3 py-2",
              onSalons
                ? "bg-emerald-100 text-emerald-900 font-semibold"
                : "bg-slate-100 text-slate-700"
            )}
          >
            {t("nav.salons")}
          </Link>
          <Link
            href={ROUTES.blog}
            className={cn(
              "rounded-lg px-3 py-2",
              onBlog
                ? "bg-emerald-100 text-emerald-900 font-semibold"
                : "bg-slate-100 text-slate-700"
            )}
          >
            {t("nav.blog")}
          </Link>
          <Link
            href={ROUTES.rankings}
            className={cn(
              "rounded-lg px-3 py-2",
              onRankings
                ? "bg-emerald-100 text-emerald-900 font-semibold"
                : "bg-slate-100 text-slate-700"
            )}
          >
            {t("nav.rankings")}
          </Link>
          <Link
            href={ROUTES.contact}
            className={cn(
              "rounded-lg px-3 py-2",
              onContact
                ? "bg-emerald-100 text-emerald-900 font-semibold"
                : "bg-slate-100 text-slate-700"
            )}
          >
            {t("nav.contact")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
