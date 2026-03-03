import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Conditions générales et politique de confidentialité",
  description:
    "Conditions générales et politique de confidentialité : zéro stockage de données personnelles, mise en relation exclusivement par WhatsApp avec consentement, cookies et contact.",
  openGraph: {
    title: `Conditions générales et politique de confidentialité | ${SITE_NAME}`,
    description:
      "Notre rôle, l'utilisation de vos données, vos droits et la protection de votre vie privée.",
    url: `${getBaseUrl()}/conditions-generales`,
  },
  alternates: { canonical: `${getBaseUrl()}/conditions-generales` },
};

function IconLock() {
  return (
    <svg className="h-5 w-5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
function IconCookie() {
  return (
    <svg className="h-4 w-4 shrink-0 text-slate-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-3.5 3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm2 2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm5 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-8 4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm7 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" clipRule="evenodd" />
    </svg>
  );
}
function IconLightning() {
  return (
    <svg className="h-5 w-5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function IconHandshake() {
  return (
    <svg className="h-5 w-5 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
  );
}

const SECTIONS: Array<{
  num: number;
  title: string;
  content: React.ReactNode;
  icon?: "lock" | "cookie";
}> = [
  {
    num: 1,
    title: "Notre rôle",
    content:
      "Nous sommes un comparateur bancaire et conseiller marketing, destiné à vous aider à trouver la banque et l'offre qui correspondent le mieux à votre profil.",
  },
  {
    num: 2,
    title: "Données personnelles — zéro stockage",
    content: (
      <>
        <p className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-3 font-medium text-emerald-900">
          <strong>Aucune donnée personnelle n&apos;est stockée</strong> sur ce site ni dans aucune base de données.
        </p>
        <p className="text-slate-700">
          La mise en relation se fait <strong className="text-slate-800">exclusivement par WhatsApp</strong>, avec votre consentement préalable. Vos réponses au formulaire ne sont jamais enregistrées sur nos serveurs : un lien WhatsApp s&apos;ouvre avec un message pré-rempli que vous envoyez (ou non) directement à notre numéro.
        </p>
      </>
    ),
  },
  {
    num: 3,
    title: "Sécurité et confidentialité",
    icon: "lock",
    content: (
      <>
        <p className="mb-2 font-medium text-slate-800">Protection de vos données (Loi 18-07)</p>
        <p className="mb-3 text-slate-700">
          Soucieux de votre vie privée, notre service ne stocke aucune donnée personnelle :
        </p>
        <ul className="list-none space-y-2 text-slate-700">
          <li>
            <strong className="text-slate-800">Aucun stockage :</strong> Ce site et ses bases de données ne conservent aucune donnée personnelle des visiteurs. Ni nom, ni numéro, ni réponses aux formulaires ne sont enregistrés sur nos serveurs.
          </li>
          <li>
            <strong className="text-slate-800">WhatsApp avec consentement uniquement :</strong> La mise en relation se fait exclusivement par WhatsApp. En acceptant la bannière de confidentialité, vous autorisez le contact par WhatsApp pour vos demandes d&apos;orientation. Vous restez libre d&apos;envoyer ou non le message pré-rempli.
          </li>
          <li>
            <strong className="text-slate-800">Pas de profilage :</strong> Aucune donnée n&apos;est utilisée pour du ciblage publicitaire ou du profilage. Vos échanges restent entre vous et notre équipe via WhatsApp.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: 4,
    title: "Consentement et droits",
    content:
      "En acceptant les préférences de confidentialité proposées à votre première visite, vous autorisez le contact par WhatsApp pour vos demandes d'orientation. Vous pouvez à tout moment demander l'arrêt des échanges. Comme aucune donnée n'est stockée sur ce site, il n'existe pas de base de données à consulter ou rectifier ; les échanges se font directement via WhatsApp.",
  },
  {
    num: 5,
    title: "Limitation de responsabilité",
    content:
      "Nous faisons de notre mieux pour fournir des informations exactes et à jour sur les offres bancaires. Toutefois, les conditions des établissements peuvent évoluer. Les décisions d'ouverture de compte ou de souscription à un produit restent de votre seule responsabilité et doivent être validées directement auprès de la banque choisie.",
  },
  {
    num: 6,
    title: "Cookies et suivi",
    icon: "cookie",
    content:
      "Nous utilisons des cookies pour mémoriser vos préférences et améliorer l'expérience sur le site (langue, critères de comparaison). Aucun cookie publicitaire ou de profilage n'est déposé sans votre accord. Vous pouvez gérer vos préférences via les paramètres de votre navigateur.",
  },
  {
    num: 7,
    title: "Formulaire et mise en relation",
    content:
      "Remplissez le formulaire : un lien WhatsApp s'ouvre avec un message pré-rempli contenant vos réponses. Vous l'envoyez (ou non) directement à notre numéro. Aucune donnée personnelle n'est stockée sur ce site ni dans aucune base de données — la mise en relation se fait exclusivement par WhatsApp, avec votre consentement.",
  },
  {
    num: 8,
    title: "Contact",
    content: (
      <p className="text-slate-700">
        Pour toute question ou demande liée à vos données ou à cette politique :{" "}
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@kompar-banque.dz"}`}
          className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-800 hover:bg-slate-100 focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
        >
          {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@kompar-banque.dz"}
        </a>
      </p>
    ),
  },
];

export default function ConditionsGeneralesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-6 md:px-8">
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

      <main className="flex-1 px-5 py-8 sm:px-6 md:py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-center text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
              Conditions Générales et Politique de Confidentialité
            </h1>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-700 sm:text-base">
              Bienvenue sur notre site. Merci de prendre un instant pour lire ces informations. Elles expliquent notre rôle, l&apos;utilisation de vos données et vos droits.
            </p>

            <div className="mt-8 space-y-0 sm:mt-10">
              {SECTIONS.map((section) => (
                <section
                  key={section.num}
                  className="flex gap-4 border-l-2 border-slate-700 pl-4 py-5 sm:pl-6 sm:py-6"
                  aria-labelledby={`section-${section.num}-title`}
                >
                  <div className="flex shrink-0 items-start gap-2">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50"
                      aria-hidden
                    >
                      {section.num}
                    </span>
                    {section.icon === "lock" && (
                      <span className="mt-1.5">
                        <IconLock />
                      </span>
                    )}
                    {section.icon === "cookie" && (
                      <span className="mt-1.5">
                        <IconCookie />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h2
                      id={`section-${section.num}-title`}
                      className="text-base font-bold text-slate-900 sm:text-lg"
                    >
                      {section.title}
                    </h2>
                    <div className="text-sm leading-relaxed text-slate-700">
                      {section.content}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-slate-200 pt-8 sm:mt-12 sm:gap-x-14">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <IconLock />
                <span>Sécurité des données assurée</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <IconLightning />
                <span>Résultats rapides</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <IconHandshake />
                <span>Mise en relation avec partenaires</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
