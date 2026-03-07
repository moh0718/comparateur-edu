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

function toIso(date: Date | string | undefined): string {
  if (!date) return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().replace(/\.\d{3}Z$/, "Z");
}

export async function GET() {
  const entries = await getSitemapEntries();
  const xmlLines = entries.map((e) => {
    const url = escapeXml(e.url.replace(/[\r\n\s]+/g, "").trim());
    const lastmod = toIso(e.lastModified);
    const freq = e.changeFrequency ?? "weekly";
    const priority = e.priority ?? 0.8;
    return (
      "<url>" +
      "<loc>" + url + "</loc>" +
      "<lastmod>" + lastmod + "</lastmod>" +
      "<changefreq>" + freq + "</changefreq>" +
      "<priority>" + priority + "</priority>" +
      "</url>"
    );
  }).join("");
  const xml =
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
    "<urlset xmlns=\"" + XML_NS + "\">" +
    xmlLines +
    "</urlset>";
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
