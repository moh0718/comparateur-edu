import { NextResponse } from "next/server";
import { getSitemapEntries } from "@/lib/sitemap-entries";

const XML_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIso(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

export async function GET() {
  const entries = await getSitemapEntries();
  const urlElements = entries.map((entry) => {
    const loc = escapeXml(entry.url.trim());
    const lastmod = entry.lastModified ? toIso(entry.lastModified) : toIso(new Date());
    const changefreq = entry.changeFrequency ?? "weekly";
    const priority = entry.priority ?? 0.8;
    return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="${XML_NS}">${urlElements.join("")}</urlset>`;
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
