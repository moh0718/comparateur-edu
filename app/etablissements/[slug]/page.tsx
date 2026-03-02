import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { Button } from "@/components/ui/button";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { ROUTES } from "@/lib/navigation";
import { institutionsMock } from "@/data/institutions-mock";

export const revalidate = 86400;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const inst = institutionsMock.find((i) => i.slug === slug);
  if (!inst) return { title: "Établissement introuvable" };
  const title = `${inst.name} – Fiche établissement`;
  const url = `${getBaseUrl()}/etablissements/${slug}`;
  return {
    title,
    description: inst.description ?? `Fiche de ${inst.name}. ${inst.commune ?? ""} ${inst.category ?? ""}.`,
    openGraph: { title: `${title} | ${SITE_NAME}`, url },
    alternates: { canonical: url },
  };
}

export default async function EtablissementSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const inst = institutionsMock.find((i) => i.slug === slug);
  if (!inst) notFound();

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "";
  const contactWhatsApp = inst.is_partner && inst.partner_whatsapp ? inst.partner_whatsapp : waNumber;
  const contactLabel = inst.is_partner ? `Contacter ${inst.name}` : "Demander un conseil gratuit";

  const criteriaRows: { label: string; value: string | boolean | null; confidence?: "high" | "medium" | "low" }[] = [
    { label: "Catégorie", value: inst.category ?? null, confidence: inst.data_confidence ?? undefined },
    { label: "Wilaya / Commune", value: [inst.wilaya, inst.commune].filter(Boolean).join(" – ") || null },
    { label: "Coût annuel", value: inst.annual_cost_range ?? null },
    { label: "MESRS reconnu", value: inst.mesrs_recognized ?? null },
    { label: "Langues", value: inst.languages?.join(", ") ?? null },
    { label: "Bac requis", value: inst.bac_required ?? null },
    { label: "Internat", value: inst.has_internat ?? null },
    { label: "Transport", value: inst.has_transport ?? null },
    { label: "Programmes", value: inst.programmes ?? null },
  ].filter((r) => r.value !== undefined);

  const missingCriteriaCount = criteriaRows.filter((r) => r.value === null || r.value === "").length;

  const categoryLabelMap: Record<string, string> = {
    Superieur: "Écoles et universités privées",
    Langues: "Centres de langues",
    "Formation Pro": "Formations professionnelles et courtes",
    General: "Écoles générales et lycées",
    Sante: "Écoles et instituts paramédicaux",
    Prescolaire: "Crèches et maternelles privées",
  };

  const categoryLabel = inst.category ? categoryLabelMap[inst.category] ?? inst.category : "Établissement privé";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 py-8 sm:px-6 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header fiche */}
          <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              {inst.logo_url ? (
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
                  <Image src={inst.logo_url} alt="" fill className="object-contain" sizes="96px" />
                </div>
              ) : (
                <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-white text-4xl shadow-sm">
                  🎓
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{inst.name}</h1>
                <p className="mt-1 text-slate-600">
                  {[inst.commune, inst.wilaya].filter(Boolean).join(", ")}
                  {categoryLabel && ` • ${categoryLabel}`}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <ConfidenceBadge confidence={inst.data_confidence ?? null} />
                  {inst.mesrs_recognized && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      MESRS reconnu
                    </span>
                  )}
                  {inst.is_partner && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      Partenaire
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Résumé & valeur ajoutée du comparateur */}
          <section className="mb-8 grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">En un coup d&apos;œil</h2>
              <p className="text-sm text-slate-700">
                {inst.description
                  ? inst.description
                  : `Fiche ${categoryLabel.toLowerCase()} pour vous aider à comparer rapidement les options d'enseignement privé en Algérie : coûts, langues, reconnaissance et services (transport, internat, etc.).`}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                <li>• Positionnement de l&apos;établissement dans son secteur ({categoryLabel.toLowerCase()}).</li>
                <li>• Fourchette de frais de scolarité pour situer le budget.</li>
                <li>• Langues d&apos;enseignement et reconnaissance éventuelle par le MESRS.</li>
                <li>• Services pratiques : transport, internat, horaires, réseaux sociaux.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-emerald-50/70 p-5 text-sm text-slate-800 shadow-sm md:p-6">
              <h3 className="mb-2 text-sm font-semibold text-emerald-900">
                Pourquoi passer par kompar - edu plutôt que d&apos;appeler chaque école ?
              </h3>
              <ul className="space-y-1.5">
                <li>• Vue normalisée des critères clés (budget, langues, reconnaissance, services).</li>
                <li>• Sélection priorisée des établissements avec données vérifiées en premier.</li>
                <li>• Recommandations gratuites par WhatsApp selon votre profil, sans engagement.</li>
                <li>• Projet indépendant : objectif d&apos;éviter le &quot;marketing de rêve&quot; et de faciliter une décision lucide.</li>
              </ul>
            </div>
          </section>

          {/* Section 1 — Infos pratiques */}
          <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Informations pratiques</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {inst.address && (
                <li>
                  <strong className="text-slate-800">Adresse :</strong>{" "}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inst.address + " " + (inst.commune ?? ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline hover:no-underline"
                  >
                    {inst.address} – Carte
                  </a>
                </li>
              )}
              {inst.website_url && (
                <li>
                  <strong className="text-slate-800">Site web :</strong>{" "}
                  <a href={inst.website_url} target="_blank" rel="noopener noreferrer" className="text-green-600 underline hover:no-underline">
                    {inst.website_url.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
              {inst.phone && (
                <li>
                  <strong className="text-slate-800">Téléphone :</strong> {inst.phone}
                </li>
              )}
              {inst.instagram_username && (
                <li>
                  <strong className="text-slate-800">Instagram :</strong> @{inst.instagram_username}
                </li>
              )}
              {inst.opening_hours && (
                <li>
                  <strong className="text-slate-800">Horaires :</strong> {inst.opening_hours}
                </li>
              )}
              {!inst.address && !inst.website_url && !inst.phone && !inst.instagram_username && !inst.opening_hours && (
                <li className="text-slate-500">Information non disponible — Contacter l&apos;école</li>
              )}
            </ul>
          </section>

          {/* Section 2 — Tableau critères */}
          <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Critères</h2>
            <dl className="space-y-3 text-sm">
              {criteriaRows.map((row) => (
                <div key={row.label} className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-2">
                  <dt className="font-medium text-slate-700">{row.label}</dt>
                  <dd className="flex items-center gap-2 text-slate-800">
                    {row.value === null || row.value === "" ? (
                      <span className="text-slate-400">Non renseigné</span>
                    ) : typeof row.value === "boolean" ? (
                      <span className={row.value ? "text-green-600" : "text-slate-500"}>{row.value ? "Oui" : "Non"}</span>
                    ) : (
                      row.value
                    )}
                    {row.confidence && <ConfidenceBadge confidence={row.confidence} />}
                  </dd>
                </div>
              ))}
            </dl>
            {missingCriteriaCount > 3 && (
              <p className="mt-4 text-xs text-slate-500">
                Certaines informations sont encore en cours de collecte (sites officiels, Google Maps, échanges avec l&apos;établissement). Si
                vous êtes responsable de cette école, contactez-nous pour enrichir cette fiche.
              </p>
            )}
          </section>

          {/* Section 3 — Points forts / faibles */}
          {(inst.points_forts?.length || inst.points_faibles?.length) ? (
            <section className="mb-8 grid gap-6 md:grid-cols-2">
              {inst.points_forts?.length ? (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="mb-3 font-semibold text-slate-900">Points forts</h2>
                  <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
                    {inst.points_forts.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {inst.points_faibles?.length ? (
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="mb-3 font-semibold text-slate-900">Points faibles</h2>
                  <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
                    {inst.points_faibles.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}

          {/* Section 4 — CTA sticky mobile */}
          <section className="sticky bottom-4 z-10 mt-8 md:static md:mt-0">
            <div className="rounded-xl bg-green-600 p-4 text-center text-white shadow-lg md:rounded-2xl md:p-6">
              <p className="text-sm font-medium md:text-base">{contactLabel}</p>
              {contactWhatsApp ? (
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="mt-3 rounded-full border-2 border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <a
                    href={`https://wa.me/${contactWhatsApp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ouvrir WhatsApp
                  </a>
                </Button>
              ) : (
                <p className="mt-2 text-sm text-green-100">Numéro à configurer (NEXT_PUBLIC_WA_NUMBER)</p>
              )}
              <p className="mt-3 text-xs text-green-100">
                Ou remplissez le formulaire complet pour comparer plusieurs écoles :
              </p>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="mt-2 rounded-full border-2 border-white bg-white/5 px-5 py-2 text-xs font-semibold text-white hover:bg-white/15"
              >
                <Link href={LEAD_FORM_HREF}>Lancer le formulaire kompar - edu</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer variant="bordered" />
    </div>
  );
}
