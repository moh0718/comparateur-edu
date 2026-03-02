"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="border-b border-slate-100 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-6 md:px-8">
        {/* Logo */}
        <Link href={ROUTES.home} className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg text-white shadow-sm" aria-hidden>
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
        <nav aria-label="Navigation principale" className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium text-slate-700 md:flex">
          <Link href={ROUTES.ecoles} className={cn("rounded-lg px-3 py-2", navLinkBrandClass)}>
            Écoles
          </Link>
          <Link href={ROUTES.universites} className={cn("rounded-lg px-3 py-2", navLinkBrandClass)}>
            Universités
          </Link>
          <Link href={ROUTES.formationsPro} className={cn("rounded-lg px-3 py-2", navLinkBrandClass)}>
            Formations Pro
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
                dropdownOpen ? "text-brand" : navLinkBrandClass
              )}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Métiers & Salons
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
                Fiches métiers
              </Link>
              <Link
                href={ROUTES.salonsEtudiants}
                className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                Salons étudiants en Algérie
              </Link>
            </div>
          </div>

          <Link href={ROUTES.blog} className={cn("rounded-lg px-3 py-2", navLinkClass)}>
            Le Mag&apos;
          </Link>
          <Link href={ROUTES.contact} className={cn("rounded-lg px-3 py-2", navLinkClass)}>
            Contact
          </Link>
        </nav>

        {/* CTA Lead Gen — doit "sauter aux yeux" */}
        <div className="ml-auto shrink-0">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="whitespace-nowrap text-sm font-semibold shadow-md md:text-base"
          >
            <Link href={LEAD_FORM_HREF}>Trouver mon École</Link>
          </Button>
        </div>
      </div>

      {/* Bandeau valeur ajoutée */}
      <div className="border-t border-slate-100 bg-emerald-50/80">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-1.5 text-center sm:px-6 md:px-8">
          <p className="text-[11px] font-medium text-emerald-800 sm:text-xs">
            <span className="font-semibold">1er comparateur neutre d&apos;établissements privés en Algérie</span> — données vérifiées, filtres avancés et recommandations gratuites par WhatsApp.
          </p>
        </div>
      </div>

      {/* Navigation mobile */}
      <nav aria-label="Navigation mobile" className="border-t border-slate-100 py-2 text-xs font-medium text-slate-700 md:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 pb-1 pt-1 sm:px-6 md:px-8">
          <Link href={ROUTES.ecoles} className="rounded-lg bg-slate-100 px-3 py-2 text-brand">Écoles</Link>
          <Link href={ROUTES.universites} className="rounded-lg bg-slate-100 px-3 py-2 text-brand">Universités</Link>
          <Link href={ROUTES.formationsPro} className="rounded-lg bg-slate-100 px-3 py-2 text-brand">Formations Pro</Link>
          <Link href={ROUTES.fichesMetiers} className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700">Fiches métiers</Link>
          <Link href={ROUTES.salonsEtudiants} className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700">Salons étudiants</Link>
          <Link href={ROUTES.blog} className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700">Le Mag&apos;</Link>
          <Link href={ROUTES.contact} className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
