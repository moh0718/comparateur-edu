import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { getBaseUrl } from "@/lib/seo";
import { ROUTES } from "@/lib/navigation";
import { posts } from "@/data/posts-mock";
import { metiersMock } from "@/data/metiers-mock";
import { institutionsMock } from "@/data/institutions-mock";

async function getEtablissementSlugs(): Promise<string[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url?.trim() || !key?.trim()) {
    return institutionsMock.filter((i) => i.is_active !== false).map((i) => i.slug);
  }
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("institutions")
    .select("slug")
    .eq("is_active", true)
    .not("slug", "is", null);
  if (error) {
    console.warn("Sitemap: Supabase institutions error, using mock slugs:", error.message);
    return institutionsMock.filter((i) => i.is_active !== false).map((i) => i.slug);
  }
  return (data ?? []).map((r) => r.slug).filter(Boolean);
}

export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}${ROUTES.home}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}${ROUTES.etablissements}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}${ROUTES.comparer}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}${ROUTES.blog}`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}${ROUTES.fichesMetiers}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/fiches-metiers/recherche`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}${ROUTES.salonsEtudiants}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}${ROUTES.rankings}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}${ROUTES.contact}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}${ROUTES.faq}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}${ROUTES.conditionsGenerales}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}${ROUTES.mentionsLegales}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/fiche-bnp-paribas-algerie`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const slugs = await getEtablissementSlugs();
  const etablissementsPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/etablissements/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const fichesMetiersPages: MetadataRoute.Sitemap = metiersMock.map((m) => ({
    url: `${base}/fiches-metiers/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...etablissementsPages, ...fichesMetiersPages, ...blogPages];
}
