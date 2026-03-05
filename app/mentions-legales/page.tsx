import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de kompar - edu : éditeur, hébergement, objet du site d'orientation scolaire en Algérie. Aucune donnée personnelle stockée — mise en relation exclusivement par WhatsApp avec consentement.",
  openGraph: {
    title: `Mentions légales | ${SITE_NAME}`,
    description: "Éditeur, hébergeur, objet du comparateur d'établissements scolaires et informations légales.",
    url: `${getBaseUrl()}/mentions-legales`,
  },
  alternates: { canonical: `${getBaseUrl()}/mentions-legales` },
};

/*
 * Personnalisation : modifier les constantes LEGAL_* ci-dessous.
 * - Section 1 (Éditeur) : LEGAL_SITE_NAME, LEGAL_RAISON_SOCIALE, LEGAL_ADDRESS, LEGAL_RCCM, LEGAL_NIF, LEGAL_PHONE, LEGAL_EMAIL, LEGAL_DIRECTEUR_PUBLICATION
 * - Section 2 (Hébergement) : LEGAL_HEBERGEUR_*
 * L'email peut aussi être défini via NEXT_PUBLIC_CONTACT_EMAIL dans .env
 */
// ——— À personnaliser : éditeur du site (section 1) ———
/** Nom officiel du site affiché dans les mentions légales */
const LEGAL_SITE_NAME = "kompar - edu";
/** Raison sociale (ex. SARL, EURL, auto-entrepreneur) */
const LEGAL_RAISON_SOCIALE = "[Raison Sociale / SARL ou équivalent]";
/** Adresse complète du siège en Algérie */
const LEGAL_ADDRESS = "[Adresse complète de l'entreprise en Algérie]";
/** Numéro RCCM (Registre de commerce) */
const LEGAL_RCCM = "[RCCM]";
/** Numéro d'identification fiscale (NIF) */
const LEGAL_NIF = "[NIF]";
/** Téléphone de contact (format international ou national) */
const LEGAL_PHONE = "[Numéro de contact]";
/** Email de contact (ou utiliser NEXT_PUBLIC_CONTACT_EMAIL dans .env) */
const LEGAL_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[Email de contact]";
/** Nom du directeur de publication / responsable légal */
const LEGAL_DIRECTEUR_PUBLICATION = "[Nom du responsable / dirigeant]";

// ——— Hébergement (section 2) : Vercel ———
/** Hébergeur du site (scripts et contenus). Aucune donnée personnelle des visiteurs n'est hébergée chez Vercel. */
const LEGAL_HEBERGEUR_NAME = "Vercel Inc.";
const LEGAL_HEBERGEUR_ADDRESS = "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis";
const LEGAL_HEBERGEUR_PHONE = "—";
const LEGAL_HEBERGEUR_EMAIL = "privacy@vercel.com";
const LEGAL_HEBERGEUR_PRECISION = "L'hébergement est assuré par Vercel Inc. pour la mise à disposition du site (scripts et contenus). Aucune donnée personnelle des visiteurs n'est stockée sur l'infrastructure Vercel ni sur ce site ; la mise en relation se fait exclusivement par WhatsApp avec consentement (voir section 4).";

export default function MentionsLegalesPage() {
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
        <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6">
          {/* 1. Éditeur du site */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-1-title"
          >
            <h2 id="section-1-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>1</span>
              Éditeur du site
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><strong className="text-slate-800">Nom du site :</strong> {LEGAL_SITE_NAME}</li>
              <li><strong className="text-slate-800">Email :</strong>{" "}
                <a href={`mailto:${LEGAL_EMAIL}`} className="text-green-700 underline hover:text-green-800">{LEGAL_EMAIL}</a>
              </li>
              <li><strong className="text-slate-800">Directeur de publication :</strong> {LEGAL_DIRECTEUR_PUBLICATION}</li>
            </ul>
          </section>

          {/* 2. Hébergement du site */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-2-title"
          >
            <h2 id="section-2-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>2</span>
              Hébergement du site
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><strong className="text-slate-800">Hébergeur :</strong> {LEGAL_HEBERGEUR_NAME}</li>
              <li><strong className="text-slate-800">Adresse :</strong> {LEGAL_HEBERGEUR_ADDRESS}</li>
              <li><strong className="text-slate-800">Téléphone :</strong> {LEGAL_HEBERGEUR_PHONE}</li>
              <li><strong className="text-slate-800">Email :</strong>{" "}
                <a href={`mailto:${LEGAL_HEBERGEUR_EMAIL}`} className="text-green-700 underline hover:text-green-800">{LEGAL_HEBERGEUR_EMAIL}</a>
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {LEGAL_HEBERGEUR_PRECISION}
            </p>
          </section>

          {/* 3. Objet du site */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-3-title"
          >
            <h2 id="section-3-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>3</span>
              Objet du site
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
              <p>
                Le site {LEGAL_SITE_NAME} a pour objet de mettre en avant les formations et établissements scolaires en Algérie (publics et privés) et de faciliter la vie des{" "}
                <strong className="text-slate-800">étudiants, des parents et des établissements eux‑mêmes</strong> en centralisant les informations utiles.
              </p>
              <p>
                Concrètement, kompar - edu agit comme un <strong className="text-slate-800">comparateur et agrégateur d&apos;information</strong> : fiches établissements, critères pédagogiques et pratiques, fourchettes de frais d&apos;inscription, langues d&apos;enseignement, reconnaissance des diplômes, etc.
              </p>
              <p>
                <strong className="text-slate-800">Important :</strong> le site ne remplace ni les services officiels du Ministère, ni les services d&apos;orientation classiques. Les informations sont fournies à titre indicatif et doivent toujours être vérifiées directement auprès des établissements concernés.
              </p>
            </div>
          </section>

          {/* 4. Données personnelles — zéro stockage, WhatsApp avec consentement */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-4-title"
          >
            <h2 id="section-4-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>4</span>
              Données personnelles
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
              <p className="rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-3 font-medium text-emerald-900">
                <strong>Aucune donnée personnelle n&apos;est stockée</strong> sur ce site ni dans aucune base de données.
              </p>
              <p>
                La mise en relation se fait <strong className="text-slate-800">exclusivement par WhatsApp</strong>, avec votre consentement préalable (bannière de confidentialité). Vos réponses au formulaire ne sont jamais enregistrées sur nos serveurs : un lien WhatsApp s&apos;ouvre avec un message pré-rempli que vous envoyez (ou non) directement à notre numéro.
              </p>
              <p>
                <strong className="text-slate-800">Consentement :</strong> En acceptant les préférences de confidentialité proposées à votre première visite, vous autorisez le contact par WhatsApp pour vos demandes d&apos;orientation. Vous pouvez à tout moment demander l&apos;arrêt des échanges.
              </p>
            </div>
          </section>

          {/* 5. Conditions d'utilisation des services */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-5-title"
          >
            <h2 id="section-5-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>5</span>
              Conditions d&apos;utilisation des services
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Le site est accessible aux personnes majeures souhaitant comparer les offres bancaires en Algérie. L&apos;utilisateur s&apos;engage à fournir des informations exactes et à jour. Le site ne saurait être tenu responsable des erreurs ou omissions dans les informations publiées.
            </p>
          </section>

          {/* 6. Monétisation et partenaires */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-6-title"
          >
            <h2 id="section-6-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>6</span>
              Monétisation et partenaires
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Le site {LEGAL_SITE_NAME} est rémunéré par la mise en relation avec des partenaires bancaires (génération de leads). Les informations que vous communiquez permettent de vous faire bénéficier d&apos;offres personnalisées. Cette approche est transparente et permet de simplifier le choix bancaire tout en assurant la pérennité du service.
            </p>
          </section>

          {/* 7. Propriété intellectuelle */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-7-title"
          >
            <h2 id="section-7-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>7</span>
              Propriété intellectuelle
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              L&apos;ensemble du contenu du site (textes, images, logos, vidéos) est protégé par les droits de propriété intellectuelle. Toute reproduction, totale ou partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          {/* 8. Responsabilité */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-8-title"
          >
            <h2 id="section-8-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>8</span>
              Responsabilité
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Le site {LEGAL_SITE_NAME} s&apos;efforce de fournir des informations fiables et à jour mais ne peut garantir leur exactitude ou exhaustivité. Le site décline toute responsabilité quant aux décisions financières ou contractuelles prises par l&apos;utilisateur sur la base des informations ou comparaisons présentées.
            </p>
          </section>

          {/* 9. Loi applicable et juridiction */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-9-title"
          >
            <h2 id="section-9-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>9</span>
              Loi applicable et juridiction
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Les présentes mentions légales et conditions sont régies par le droit algérien. Tout litige sera soumis aux tribunaux compétents en Algérie.
            </p>
          </section>

          {/* 10. Contact */}
          <section
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="section-10-title"
          >
            <h2 id="section-10-title" className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-slate-50" aria-hidden>10</span>
              Contact
            </h2>
            <p className="mb-3 text-sm text-slate-700">
              Pour toute question relative aux mentions légales, à la protection des données ou à l&apos;utilisation du site :
            </p>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong className="text-slate-800">Email :</strong>{" "}
                <a href={`mailto:${LEGAL_EMAIL}`} className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-800 hover:bg-slate-100">{LEGAL_EMAIL}</a>
              </li>
              <li><strong className="text-slate-800">Téléphone :</strong> {LEGAL_PHONE}</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
