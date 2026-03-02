import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Conditions générales et politique de confidentialité",
  description:
    "Conditions générales d'utilisation et politique de confidentialité de Kompar - Banque : rôle, collecte des données, sécurité (Loi 18-07), consentement, cookies et contact.",
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
    title: "Collecte et utilisation des données",
    content:
      "Pour vous proposer des recommandations adaptées, nous collectons des informations telles que : Nom, prénom, âge, wilaya, besoins en produits bancaires et préférences. Ces données sont utilisées uniquement pour établir votre diagnostic et vous orienter vers les offres les plus pertinentes.",
  },
  {
    num: 3,
    title: "Sécurité et confidentialité",
    icon: "lock",
    content: (
      <>
        <p className="mb-2 font-medium text-slate-800">Protection de vos données (Loi 18-07)</p>
        <p className="mb-3 text-slate-700">
          Soucieux de votre vie privée, notre service est conçu selon le principe de &laquo;&nbsp;Minimisation des données&nbsp;&raquo;&nbsp;:
        </p>
        <ul className="list-none space-y-2 text-slate-700">
          <li>
            <strong className="text-slate-800">Zéro Stockage Permanent :</strong> Notre serveur ne contient aucune base de données de vos informations personnelles. Une fois votre diagnostic terminé, les informations ne sont pas conservées sur nos systèmes cloud.
          </li>
          <li>
            <strong className="text-slate-800">Mise en relation en temps réel :</strong> Nous agissons uniquement comme un tunnel de mise en relation. Vos réponses nous sont transmises instantanément via un canal sécurisé pour établir votre diagnostic, puis sont effacées de la mémoire de transit.
          </li>
          <li>
            <strong className="text-slate-800">Souveraineté :</strong> Aucune gestion &laquo;&nbsp;Big Data&nbsp;&raquo; n&apos;est effectuée sur des serveurs tiers. Vos informations servent exclusivement à vous fournir la recommandation bancaire demandée.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: 4,
    title: "Consentement et droits",
    content:
      "En utilisant le site, vous consentez à ce que nous utilisions vos informations pour vous proposer des recommandations personnalisées. Vous disposez d'un droit d'accès, de rectification et d'opposition concernant vos données. Pour les exercer, contactez-nous via le formulaire ou l'adresse indiquée en section Contact.",
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
    title: "Résultat immédiat et formulaire",
    content:
      "Pour le formulaire : Remplissez le formulaire, vous recevrez rapidement des recommandations adaptées directement par nous. Aucune donnée n'est conservée après la mise en relation.",
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
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg text-white">
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
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white"
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
