import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

const PAGE_TITLE = "Fiche BNP Paribas Algérie – Caractéristiques et avis";
const PAGE_DESCRIPTION =
  "Fiche complète BNP Paribas Algérie : offres, frais, cartes, conditions d'éligibilité, délais et avis. Comparez avec les autres banques algériennes.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${getBaseUrl()}/fiche-bnp-paribas-algerie`,
  },
  alternates: { canonical: `${getBaseUrl()}/fiche-bnp-paribas-algerie` },
};

export default function FicheBnpParibasPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-6 md:px-8">
          {/* Logo */}
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

          {/* Navigation centre (desktop) */}
          <nav
            aria-label="Navigation principale"
            className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium text-slate-700 md:flex"
          >
            <Link href={ROUTES.etablissements} className="hover:text-brand">
              Fiches banques
            </Link>
            <Link href={ROUTES.comparer} className="hover:text-brand">
              Comparatif
            </Link>
            <Link href={ROUTES.blog} className="hover:text-brand">
              Blog
            </Link>
            <Link href={ROUTES.contact} className="hover:text-brand">
              Contact
            </Link>
          </nav>

          {/* Langues + CTA */}
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

        {/* Navigation compacte mobile */}
        <nav
          aria-label="Navigation principale mobile"
          className="border-t border-slate-100 bg-white py-2 text-xs font-medium text-slate-700 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto whitespace-nowrap px-5 pb-1 sm:px-6 md:px-8">
            <Link href={ROUTES.etablissements} className="hover:text-brand">
              Fiches banques
            </Link>
            <Link href={ROUTES.comparer} className="hover:text-brand">
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
        <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-6 md:space-y-10 md:px-8">
          {/* Titre + logo banque */}
          <section
            aria-labelledby="fiche-bnp-titre"
            className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
          >
            <header className="space-y-1">
              <h1
                id="fiche-bnp-titre"
                className="text-lg font-semibold text-slate-900 sm:text-xl md:text-2xl"
              >
                Fiche complète&nbsp;: BNP Paribas Algérie (Caractéristiques et
                avis)
              </h1>
            </header>
            <aside
              aria-label="Logo BNP Paribas Algérie"
              className="flex items-center justify-end"
            >
              <div className="flex h-24 w-28 items-center justify-center rounded-xl bg-white shadow-soft">
                <img
                  src="/banks/bnp-paribas.svg"
                  alt="BNP Paribas Algérie"
                  className="h-auto max-h-20 w-auto"
                />
              </div>
            </aside>
          </section>

          {/* Grille principale des cartes */}
          <section
            aria-label="Informations principales sur la banque"
            className="grid gap-5 md:grid-cols-2"
          >
            {/* Identification de la banque */}
            <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
              <header className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-brand">
                  <span aria-hidden>🏦</span>
                </div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Identification de la Banque
                </h2>
              </header>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <span className="font-semibold">Type de banque&nbsp;:</span>{" "}
                  commerciale, publique, internationale, en ligne...
                </li>
                <li>
                  <span className="font-semibold">Site web officiel&nbsp;:</span>{" "}
                  <a
                    href="https://www.banquenom.com"
                    className="text-blue-600 underline underline-offset-2"
                  >
                    www.banquenom.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold">Année de création (ou d&apos;implantation)&nbsp;:</span>{" "}
                  1990
                </li>
                <li>
                  <span className="font-semibold">Réseau&nbsp;:</span> 120 agences
                  en Algérie
                </li>
              </ul>
            </article>

            {/* Produits et Services */}
            <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
              <header className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-brand">
                  <span aria-hidden>🧾</span>
                </div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Produits et Services Principaux
                </h2>
              </header>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Comptes&nbsp;: courants, épargne</li>
                <li>Cartes bancaires&nbsp;: classique, premium, virtuelle</li>
                <li>Prêts et crédits&nbsp;: immobilier, personnel, auto</li>
                <li>Virements nationaux et internationaux</li>
                <li>
                  Services digitaux&nbsp;: application mobile, services en ligne,
                  notifications, paiement mobile
                </li>
                <li>Services aux entreprises / particuliers spécifiques</li>
                <li>Retraits à l&apos;étranger</li>
              </ul>
            </article>
          </section>

          {/* Documents + Avis clients */}
          <section
            aria-label="Documents requis et avis clients"
            className="grid gap-5 md:grid-cols-2"
          >
            {/* Documents Required */}
            <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
              <header className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-brand">
                  <span aria-hidden>💵</span>
                </div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Documents Required
                </h2>
              </header>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Valid ID or Passport</li>
                <li>Proof of Residence</li>
                <li>Recent Salary Slip or Proof of Income</li>
              </ul>
            </article>

            {/* Avis clients */}
            <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
              <header className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-brand">
                  <span aria-hidden>💬</span>
                </div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Avis clients
                </h2>
              </header>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-600">
                    &ldquo;Interface digitale claire, délais de traitement
                    rapides, mais parfois des files d&apos;attente en agence.&rdquo;
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs text-slate-600">
                    &ldquo;Service client réactif sur WhatsApp, cartes
                    internationales pratiques pour voyager.&rdquo;
                  </p>
                </div>
              </div>
            </article>
          </section>

          {/* Pros / Cons */}
          <section
            aria-label="Avantages et inconvénients"
            className="grid gap-5 md:grid-cols-2"
          >
            <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
              <h2 className="mb-2 text-base font-semibold text-emerald-700 sm:text-lg">
                Pros
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Ouverture de compte rapide</li>
                <li>Distributeurs modernes multifonctions</li>
                <li>Support client réactif</li>
              </ul>
            </article>

            <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
              <h2 className="mb-2 text-base font-semibold text-red-700 sm:text-lg">
                Cons
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Limitations sur les retraits internationaux</li>
                <li>Pas de programme de fidélité</li>
                <li>Frais élevés</li>
              </ul>
            </article>
          </section>

          {/* Verdict + Formulaire d'intérêt */}
          <section
            aria-label="Verdict expert et formulaire de contact"
            className="grid gap-5 md:grid-cols-2"
          >
            {/* Verdict expert */}
            <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
              <header className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-brand">
                  <span aria-hidden>📊</span>
                </div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Notre verdict d&apos;expert
                </h2>
              </header>
              <p className="text-sm leading-relaxed text-slate-700">
                BNP Paribas Algérie se distingue par la solidité de son groupe,
                ses standards de conformité stricts et la qualité de son
                accompagnement, offrant un cadre fiable et structuré, surtout
                pour les entreprises. Plus exigeante que des banques comme la
                Banque Extérieure d&apos;Algérie ou la Banque Nationale
                d&apos;Algérie ou Société Générale Algérie, elle propose en
                contrepartie un niveau élevé de professionnalisme, à évaluer
                selon les besoins de chaque client.
              </p>
            </article>

            {/* Formulaire d'intérêt */}
            <article className="rounded-2xl bg-white p-5 shadow-soft sm:p-6">
              <header className="mb-3">
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Intéressé par cette banque&nbsp;?
                </h2>
              </header>
              <form className="space-y-3 text-sm">
                <div className="space-y-1">
                  <label
                    htmlFor="nom"
                    className="block text-xs font-medium text-slate-700"
                  >
                    Nom
                  </label>
                  <input
                    id="nom"
                    type="text"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="telephone"
                    className="block text-xs font-medium text-slate-700"
                  >
                    Téléphone
                  </label>
                  <input
                    id="telephone"
                    type="tel"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="mt-2 w-full justify-center"
                >
                  Envoyer
                </Button>
                <p className="text-center text-[11px] text-slate-500">
                  Rappel gratuit sous 24h
                </p>
              </form>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

