import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdSlotSkyscraper } from "@/components/AdSlot";
import { banks } from "@/data/banks-mock";
import { getBankRatesForFiche } from "@/lib/bank-rates";
import { getBankRatingsForSlug } from "@/lib/bank-ratings";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

const logoBySlug: Record<string, string> = {
  "societe-generale-algerie": "/banks/societe-generale.png",
  agb: "/banks/agb.png",
  "bnp-paribas-algerie": "/banks/bnp-paribas.png",
  "algerie-poste": "/banks/algerie-poste.png",
  cpa: "/banks/cpa.png",
  banxy: "/banks/banxy.png",
  "fransabank-el-djazair": "/banks/fransabank.png",
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bank = banks.find((b) => (b.slug ?? b.id) === slug);
  if (!bank) return { title: "Banque introuvable" };
  const title = `Fiche ${bank.name} – Caractéristiques et offres`;
  const url = `${getBaseUrl()}/fiche/${slug}`;
  return {
    title,
    description: `Fiche complète ${bank.name} : offres, frais, cartes, conditions. Comparez avec les autres banques algériennes.`,
    openGraph: { title: `${title} | ${SITE_NAME}`, url },
    alternates: { canonical: url },
  };
}

export default async function FicheBankPage({ params }: PageProps) {
  const { slug } = await params;
  const bank = banks.find((b) => (b.slug ?? b.id) === slug);
  if (!bank) notFound();

  const logo = logoBySlug[slug] ?? null;
  const [appRatings, bankRates] = await Promise.all([
    getBankRatingsForSlug(slug),
    getBankRatesForFiche(slug),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-6 md:px-8">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg text-white">
              <span aria-hidden>🏛️</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">Kompar - Banque</span>
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium text-slate-700 md:flex">
            <Link href={ROUTES.etablissements} className="hover:text-brand">Établissements</Link>
            <Link href={ROUTES.comparer} className="hover:text-brand">Comparer</Link>
            <Link href={ROUTES.blog} className="hover:text-brand">Blog</Link>
            <Link href={ROUTES.contact} className="hover:text-brand">Contact</Link>
          </nav>
          <Button asChild variant="primary" size="sm" className="hidden md:inline-flex">
            <Link href={LEAD_FORM_HREF}>Trouver votre banque idéale</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 px-5 py-8 sm:px-6 md:py-12 md:px-8">
        <div className="mx-auto flex max-w-[1920px] justify-center gap-0">
          <AdSlotSkyscraper />
          <div className="min-w-0 flex-1 max-w-6xl">
          <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Fiche {bank.name}
              </h1>
              <p className="mt-1 text-sm text-slate-600">{bank.bankType}</p>
            </div>
            {logo && (
              <div className="relative h-20 w-24 shrink-0">
                <Image src={logo} alt="" fill className="object-contain object-right" sizes="96px" />
              </div>
            )}
          </section>

          {/* Conditions d'ouverture de compte (données détaillées Supabase / Gemini) */}
          {(bankRates?.conditions_ouverture || bankRates?.depot_minimum) && (
            <section className="mb-8 rounded-xl border border-green-100 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-base font-semibold text-slate-900">
                Conditions d&apos;ouverture de compte
              </h2>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                {bankRates.conditions_ouverture && (
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {bankRates.conditions_ouverture}
                  </p>
                )}
                {bankRates.depot_minimum && (
                  <p>
                    <span className="font-medium text-slate-800">Dépôt minimum :</span>{" "}
                    {bankRates.depot_minimum}
                  </p>
                )}
              </div>
            </section>
          )}

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Coût / Frais</h2>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                {bankRates?.frais_tenue_compte && <p>Tenue de compte : {bankRates.frais_tenue_compte}</p>}
                {bankRates?.frais_retrait_dam && <p>Retrait DAM : {bankRates.frais_retrait_dam}</p>}
                {bankRates?.frais_virement && <p>Virement : {bankRates.frais_virement}</p>}
                {!bankRates?.frais_tenue_compte && !bankRates?.frais_retrait_dam && !bankRates?.frais_virement && (
                  <p>{bank.cost}</p>
                )}
              </div>
            </article>
            <article className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Cartes</h2>
              <p className="mt-2 text-sm text-slate-700">
                {bankRates?.cartes?.length
                  ? bankRates.cartes.join(", ")
                  : bank.cards}
              </p>
            </article>
            <article className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Éligibilité</h2>
              <p className="mt-2 text-sm text-slate-700">
                {bankRates?.conditions_ouverture
                  ? "Détail dans la section « Conditions d'ouverture » ci-dessus (par type de compte/carte)."
                  : bank.eligibility}
              </p>
            </article>
            <article className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Délai ouverture compte</h2>
              <p className="mt-2 text-sm text-slate-700">{bank.accountOpeningDelay}</p>
            </article>
            <article className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Service client</h2>
              <p className="mt-2 text-sm text-slate-700">{bank.customerServiceQuality}</p>
            </article>
            <article className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Application mobile</h2>
              <p className="mt-2 text-sm text-slate-700">
                {bank.hasMobileApp ? "Oui" : "Non"}
                <span className="mt-2 block text-slate-600">
                  {appRatings &&
                  (appRatings.app_rating_apple != null || appRatings.app_rating_google != null) ? (
                    <>
                      Notes :{" "}
                      {appRatings.app_rating_apple != null && (
                        <span>App Store {appRatings.app_rating_apple}/5</span>
                      )}
                      {appRatings.app_rating_apple != null &&
                        appRatings.app_rating_google != null && " · "}
                      {appRatings.app_rating_google != null && (
                        <span>Google Play {appRatings.app_rating_google}/5</span>
                      )}
                      {appRatings.app_reviews_count != null &&
                        appRatings.app_reviews_count > 0 && (
                          <span className="text-slate-500">
                            {" "}
                            ({appRatings.app_reviews_count.toLocaleString("fr-FR")} avis)
                          </span>
                        )}
                    </>
                  ) : (
                    "Note indisponible"
                  )}
                </span>
              </p>
            </article>
            {((bankRates?.virements_internationaux ?? bankRates?.compte_devises ?? bankRates?.credit_immobilier ?? bankRates?.credit_auto ?? bankRates?.nombre_agences ?? bankRates?.chequier) != null) && (
              <>
                {bankRates?.virements_internationaux && (
                  <article className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">Virements internationaux</h2>
                    <p className="mt-2 text-sm text-slate-700">{bankRates.virements_internationaux}</p>
                  </article>
                )}
                {bankRates?.compte_devises && (
                  <article className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">Compte devises</h2>
                    <p className="mt-2 text-sm text-slate-700">{bankRates.compte_devises}</p>
                  </article>
                )}
                {bankRates?.credit_immobilier && (
                  <article className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">Crédit immobilier</h2>
                    <p className="mt-2 text-sm text-slate-700">{bankRates.credit_immobilier}</p>
                  </article>
                )}
                {bankRates?.credit_auto && (
                  <article className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">Crédit auto</h2>
                    <p className="mt-2 text-sm text-slate-700">{bankRates.credit_auto}</p>
                  </article>
                )}
                {bankRates?.nombre_agences && (
                  <article className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">Réseau d&apos;agences</h2>
                    <p className="mt-2 text-sm text-slate-700">{bankRates.nombre_agences}</p>
                  </article>
                )}
                {bankRates?.chequier && (
                  <article className="rounded-xl bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">Chéquier</h2>
                    <p className="mt-2 text-sm text-slate-700">{bankRates.chequier}</p>
                  </article>
                )}
              </>
            )}
          </section>

          {(bankRates?.points_forts?.length ?? 0) > 0 || (bankRates?.points_faibles?.length ?? 0) > 0 ? (
            <section className="mb-8 grid gap-5 sm:grid-cols-2">
              {bankRates?.points_forts && bankRates.points_forts.length > 0 && (
                <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-semibold text-slate-900">Points forts</h2>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
                    {bankRates.points_forts.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {bankRates?.points_faibles && bankRates.points_faibles.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-semibold text-slate-900">Points faibles</h2>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
                    {bankRates.points_faibles.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href={LEAD_FORM_HREF}>Trouver ma banque idéale</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href={ROUTES.etablissements}>← Tous les établissements</Link>
            </Button>
          </div>
          </div>
          <AdSlotSkyscraper />
        </div>
      </main>

      <Footer variant="bordered" />
    </div>
  );
}
