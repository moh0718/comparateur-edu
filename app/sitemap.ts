import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import { ROUTES } from "@/lib/navigation";
import { posts } from "@/data/posts-mock";
import { metiersMock } from "@/data/metiers-mock";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}${ROUTES.home}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}${ROUTES.etablissements}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}${ROUTES.comparer}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}${ROUTES.fichesMetiers}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}${ROUTES.salonsEtudiants}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}${ROUTES.blog}`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}${ROUTES.contact}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}${ROUTES.conditionsGenerales}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}${ROUTES.mentionsLegales}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}${ROUTES.faq}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

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

  return [...staticPages, ...fichesMetiersPages, ...blogPages];
}
