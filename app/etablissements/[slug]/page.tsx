import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { Button } from "@/components/ui/button";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { LEAD_FORM_HREF } from "@/lib/navigation";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 86400;

type PageProps = { params: Promise<{ slug: string }> };

type InstitutionRow = {
  name: string;
  slug: string;
  commune?: string | null;
  wilaya?: string | null;
  category?: string | null;
  address?: string | null;
  website_url?: string | null;
  phone?: string | null;
  contact_email?: string | null;
  instagram_username?: string | null;
  opening_hours?: string | null;
  description?: string | null;
  programmes?: string | null;
  annual_cost_range?: string | null;
  mesrs_recognized?: boolean | null;
  languages?: string[] | null;
  bac_required?: boolean | null;
  diploma_type?: string | null;
  intl_equivalence?: string | null;
  admission_type?: string | null;
  promo_size?: string | null;
  internship_provided?: boolean | null;
  internship_duration?: string | null;
  corporate_partners?: unknown;
  school_partners?: unknown;
  real_outcomes?: string | null;
  insertion_rate?: string | null;
  passerelles?: string | null;
  school_levels?: string[] | null;
  curriculum?: string | null;
  boarding_available?: boolean | null;
  transport_available?: boolean | null;
  canteen_available?: boolean | null;
  elearning_platform?: boolean | null;
  special_needs_inclusion?: boolean | null;
  level_general?: string[] | null;
  logo_url?: string | null;
  points_forts?: string[] | null;
  points_faibles?: string[] | null;
  data_confidence?: "high" | "medium" | "low" | null;
};

const categoryLabelMap: Record<string, string> = {
  Superieur: "Écoles et universités privées",
  Langues: "Centres de langues",
  "Formation Pro": "Formations professionnelles et courtes",
  General: "Écoles générales et lycées",
  Sante: "Écoles et instituts paramédicaux",
  Prescolaire: "Crèches et maternelles privées",
};

function joinJsonArray(value: unknown): string | null {
  if (Array.isArray(value)) {
    const flat = value
      .map((v) => (typeof v === "string" ? v : null))
      .filter((v): v is string => Boolean(v));
    return flat.length ? flat.join(", ") : null;
  }
  if (value && typeof value === "object" && "map" in (value as any)) {
    try {
      // Supabase peut renvoyer un objet {key: value}
      const vals = Object.values(value as Record<string, unknown>).filter((v): v is string => typeof v === "string");
      return vals.length ? vals.join(", ") : null;
    } catch {
      return null;
    }
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("institutions")
    .select("name, description, commune, wilaya, category")
    .eq("slug", slug)
    .maybeSingle<InstitutionRow>();

  if (!data) return { title: "Établissement introuvable" };

  const title = `${data.name} – Fiche établissement`;
  const url = `${getBaseUrl()}/etablissements/${slug}`;
  return {
    title,
    description:
      data.description ??
      `Fiche de ${data.name}. ${data.commune ?? ""} ${data.wilaya ?? ""} ${data.category ?? ""}`.trim(),
    openGraph: { title: `${title} | ${SITE_NAME}`, url },
    alternates: { canonical: url },
  };
}

export default async function EtablissementSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: inst } = await supabase.from("institutions").select("*").eq("slug", slug).maybeSingle<InstitutionRow>();
  if (!inst) notFound();

  const categoryLabel = inst.category ? categoryLabelMap[inst.category] ?? inst.category : "Établissement privé";

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "";
  const contactLabel = "Remplir le formulaire pour recevoir 3 à 5 propositions adaptées";

  const orientationRows: { label: string; value: string | boolean | null }[] = [
    { label: "Bac requis", value: inst.bac_required ?? null },
    { label: "Diplôme", value: inst.diploma_type ?? null },
    { label: "Reconnaissance MESRS", value: inst.mesrs_recognized ?? null },
    { label: "Équivalence à l'étranger", value: inst.intl_equivalence ?? null },
    {
      label: "Langue(s) d'enseignement",
      value: inst.languages && inst.languages.length ? inst.languages.join(", ") : null,
    },
    { label: "Coût total estimé", value: inst.annual_cost_range ?? null },
    { label: "Type d'admission", value: inst.admission_type ?? null },
    { label: "Taille des promos", value: inst.promo_size ?? null },
    { label: "Stage prévu", value: inst.internship_provided ?? null },
    { label: "Durée de stage", value: inst.internship_duration ?? null },
    { label: "Réseau d'entreprises partenaires", value: joinJsonArray(inst.corporate_partners) },
    { label: "Réseau d'écoles partenaires", value: joinJsonArray(inst.school_partners) },
    { label: "Débouchés réels", value: inst.real_outcomes ?? null },
    { label: "Taux d'insertion estimé", value: inst.insertion_rate ?? null },
    { label: "Passerelles possibles", value: inst.passerelles ?? null },
  ].filter((r) => r.value !== undefined);

  const parentsRows: { label: string; value: string | boolean | null }[] = [
    {
      label: "Niveaux scolaires",
      value:
        (inst.school_levels && inst.school_levels.length && inst.school_levels.join(", ")) ||
        (inst.level_general && inst.level_general.length && inst.level_general.join(", ")) ||
        null,
    },
    { label: "Programme", value: inst.curriculum ?? null },
    { label: "Internat", value: inst.boarding_available ?? null },
    { label: "Transport scolaire", value: inst.transport_available ?? null },
    { label: "Cantine", value: inst.canteen_available ?? null },
    { label: "Plateforme e-learning", value: inst.elearning_platform ?? null },
    { label: "Accueil besoins spécifiques", value: inst.special_needs_inclusion ?? null },
  ].filter((r) => r.value !== undefined);

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
              {inst.contact_email && (
                <li>
                  <strong className="text-slate-800">Email :</strong>{" "}
                  <a href={`mailto:${inst.contact_email}`} className="text-green-600 underline hover:no-underline">
                    {inst.contact_email}
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
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Décision orientation (supérieur / pro)</h2>
            <dl className="space-y-3 text-sm">
              {orientationRows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-2"
                >
                  <dt className="font-medium text-slate-700">{row.label}</dt>
                  <dd className="flex items-center gap-2 text-slate-800">
                    {row.value === null || row.value === "" ? (
                      <span className="text-slate-400">Non renseigné</span>
                    ) : typeof row.value === "boolean" ? (
                      <span className={row.value ? "text-green-600" : "text-slate-500"}>
                        {row.value ? "Oui" : "Non"}
                      </span>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-slate-500">
              Ces éléments sont fournis à titre indicatif à partir des sources publiques et du crawler kompar - edu. Pour
              une recommandation personnalisée (budget, projet, contraintes), remplissez le formulaire en bas de page.
            </p>
          </section>

          {/* Section 3 — Critères parents (général) */}
          {parentsRows.length > 0 && (
            <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Pour les parents (vie d&apos;établissement)</h2>
              <dl className="space-y-3 text-sm">
                {parentsRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-2"
                  >
                    <dt className="font-medium text-slate-700">{row.label}</dt>
                    <dd className="flex items-center gap-2 text-slate-800">
                      {row.value === null || row.value === "" ? (
                        <span className="text-slate-400">Non renseigné</span>
                      ) : typeof row.value === "boolean" ? (
                        <span className={row.value ? "text-green-600" : "text-slate-500"}>
                          {row.value ? "Oui" : "Non"}
                        </span>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Section 4 — Points forts / faibles */}
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

          {/* Section 5 — CTA formulaire */}
          <section className="sticky bottom-4 z-10 mt-8 md:static md:mt-0">
            <div className="rounded-xl bg-green-600 p-4 text-center text-emerald-50 shadow-lg md:rounded-2xl md:p-6">
              <p className="text-sm font-medium md:text-base">{contactLabel}</p>
              <Button
                asChild
                variant="primary"
                size="lg"
                className="mt-3 rounded-full px-8 text-base font-semibold"
              >
                <Link href={LEAD_FORM_HREF}>Lancer le formulaire kompar - edu</Link>
              </Button>
              {waNumber && (
                <p className="mt-3 text-xs text-emerald-100">
                  Besoin d&apos;un échange rapide ? Vous pouvez aussi nous écrire directement sur WhatsApp au{" "}
                  <span className="font-semibold">{waNumber}</span>.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer variant="bordered" />
      <ScrollToTop />
    </div>
  );
}
