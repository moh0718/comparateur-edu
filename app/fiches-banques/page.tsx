import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { banks } from "@/data/banks-mock";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Établissements",
  description:
    "Découvrez les caractéristiques, offres et conditions des principales banques algériennes : BNA, CPA, BEA, BNP Paribas, Société Générale, AGB, Algérie Poste, Banxy et plus.",
  openGraph: {
    title: `Établissements | ${SITE_NAME}`,
    description: "Comparez les banques algériennes en détail.",
    url: `${getBaseUrl()}/fiches-banques`,
  },
  alternates: { canonical: `${getBaseUrl()}/fiches-banques` },
};

const logoBySlug: Record<string, string> = {
  "societe-generale-algerie": "/banks/societe-generale.png",
  agb: "/banks/agb.png",
  "bnp-paribas-algerie": "/banks/bnp-paribas.png",
  "algerie-poste": "/banks/algerie-poste.png",
  cpa: "/banks/cpa.png",
  banxy: "/banks/banxy.png",
  "fransabank-el-djazair": "/banks/fransabank.png",
  "banque-du-golf": "/banks/banque-du-golf.png",
};

export default function FichesBanquesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-6 md:px-8">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg text-emerald-50">
              <span aria-hidden>🏛️</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">Kompar - Banque</span>
              <span className="text-[11px] text-slate-500">Comparateur de banques algériennes</span>
            </div>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium text-slate-700 md:flex"
          >
            <Link href={ROUTES.etablissements} className="text-brand">
              Établissements
            </Link>
            <Link href={ROUTES.comparer} className="hover:text-brand">
              Comparer
            </Link>
            <Link href={ROUTES.blog} className="hover:text-brand">
              Blog
            </Link>
            <Link href={ROUTES.contact} className="hover:text-brand">
              Contact
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Button asChild variant="primary" size="sm" className="hidden whitespace-nowrap text-xs font-semibold md:inline-flex">
              <Link href={LEAD_FORM_HREF}>Trouver votre banque idéale</Link>
            </Button>
          </div>
        </div>

        <nav
          aria-label="Navigation mobile"
          className="border-t border-slate-100 bg-white py-2 text-xs font-medium text-slate-700 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto whitespace-nowrap px-5 pb-1 sm:px-6 md:px-8">
            <Link href={ROUTES.etablissements} className="text-brand">Établissements</Link>
            <Link href={ROUTES.comparer} className="hover:text-brand">Comparer</Link>
            <Link href={ROUTES.blog} className="hover:text-brand">Blog</Link>
            <Link href={ROUTES.contact} className="hover:text-brand">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 px-5 py-8 sm:px-6 md:py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Établissements algériennes
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Consultez les détails de chaque établissement : offres, frais, cartes, conditions.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {banks.map((bank) => {
              const slug = bank.slug ?? bank.id;
              const logo = logoBySlug[slug];
              return (
                <Link
                  key={bank.id}
                  href={`/fiche/${slug}`}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {logo ? (
                    <div className="relative h-12 w-16 shrink-0">
                      <Image
                        src={logo}
                        alt=""
                        fill
                        className="object-contain object-left"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      🏦
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-slate-900">{bank.name}</span>
                    <p className="text-xs text-slate-500">{bank.bankType}</p>
                  </div>
                  <span className="shrink-0 text-slate-400" aria-hidden>→</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="primary" size="lg">
              <Link href={LEAD_FORM_HREF}>Trouver ma banque idéale</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer variant="bordered" />
    </div>
  );
}
