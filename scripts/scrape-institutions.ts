/**
 * Script de scraping établissements (Google Places + pré-mapping).
 *
 * Objectif :
 * - Partir de `INSTITUTIONS_SCRAPING_SEED`
 * - Interroger Google Places API (Find Place / Details)
 * - Produire un fichier JSON avec les données normalisées pour alimenter Supabase ou `institutions-mock`.
 *
 * Usage (Node 18+ recommandé) :
 *   export GOOGLE_PLACES_API_KEY=\"...\" &&
 *   npx ts-node scripts/scrape-institutions.ts --priority=high --limit=20
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INSTITUTIONS_SCRAPING_SEED, type SeedInstitution } from "@/data/institutions-seed";

type PlacesGeometry = { location: { lat: number; lng: number } };

type PlacesCandidate = {
  place_id: string;
  name: string;
  formatted_address?: string;
  geometry?: PlacesGeometry;
  website?: string;
  international_phone_number?: string;
  current_opening_hours?: { weekday_text?: string[] };
};

type PlacesFindResponse = {
  candidates: PlacesCandidate[];
  status: string;
};

type ScrapedInstitution = SeedInstitution & {
  google_place_id?: string;
  formatted_address?: string;
  latitude?: number;
  longitude?: number;
  website_url?: string;
  phone?: string;
  opening_hours?: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!API_KEY) {
  // eslint-disable-next-line no-console
  console.error("❌ GOOGLE_PLACES_API_KEY manquant. Définis-le dans ton environnement avant d'exécuter le script.");
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out: { priority?: "high" | "medium" | "low"; limit?: number } = {};
  for (const arg of args) {
    if (arg.startsWith("--priority=")) {
      const p = arg.split("=")[1] as "high" | "medium" | "low";
      out.priority = p;
    }
    if (arg.startsWith("--limit=")) {
      const n = Number.parseInt(arg.split("=")[1] || "0", 10);
      if (!Number.isNaN(n) && n > 0) out.limit = n;
    }
  }
  return out;
}

function buildSearchQuery(seed: SeedInstitution): string {
  const parts = [seed.name];
  if (seed.commune) parts.push(seed.commune);
  if (seed.wilaya) parts.push(seed.wilaya);
  parts.push("Algérie");
  return parts.join(" ");
}

async function findPlace(seed: SeedInstitution): Promise<PlacesCandidate | null> {
  const input = buildSearchQuery(seed);
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", input);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set(
    "fields",
    [
      "place_id",
      "name",
      "formatted_address",
      "geometry/location",
      "website",
      "international_phone_number",
      "current_opening_hours",
    ].join(","),
  );
  url.searchParams.set("language", "fr");
  url.searchParams.set("key", API_KEY!);

  const res = await fetch(url);
  if (!res.ok) {
    // eslint-disable-next-line no-console
    console.error(`Erreur HTTP Google Places pour ${seed.name}:`, res.status, res.statusText);
    return null;
  }
  const data = (await res.json()) as PlacesFindResponse;
  if (!data.candidates || data.candidates.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(`Aucun candidat Google Places pour ${seed.name} (${input})`);
    return null;
  }
  return data.candidates[0] ?? null;
}

function mapCandidate(seed: SeedInstitution, c: PlacesCandidate | null): ScrapedInstitution {
  if (!c) {
    return {
      ...seed,
    };
  }
  const lat = c.geometry?.location.lat;
  const lng = c.geometry?.location.lng;
  const openingText = c.current_opening_hours?.weekday_text?.join(" | ");

  return {
    ...seed,
    google_place_id: c.place_id,
    formatted_address: c.formatted_address,
    latitude: typeof lat === "number" ? lat : undefined,
    longitude: typeof lng === "number" ? lng : undefined,
    website_url: c.website,
    phone: c.international_phone_number,
    opening_hours: openingText,
  };
}

const DEFAULT_PLACES_LIMIT = 50; // Limite par défaut (1 appel/établissement). Gratuit: 5000/mois.

async function main() {
  const { priority, limit } = parseArgs();
  let seeds = INSTITUTIONS_SCRAPING_SEED;
  if (priority) {
    seeds = seeds.filter((s) => s.scraping_priority === priority);
  }
  const cap = limit ?? DEFAULT_PLACES_LIMIT;
  seeds = seeds.slice(0, cap);

  // eslint-disable-next-line no-console
  console.log(
    `Scraping Google Places pour ${seeds.length} établissement(s)${
      priority ? ` (priorité ${priority})` : ""
    }...`,
  );

  const results: ScrapedInstitution[] = [];
  for (const seed of seeds) {
    // eslint-disable-next-line no-console
    console.log(`→ ${seed.name} (${seed.commune ?? ""})...`);
    try {
      const candidate = await findPlace(seed);
      const mapped = mapCandidate(seed, candidate);
      results.push(mapped);
      // petit sleep pour éviter de spammer l'API
      await new Promise((r) => setTimeout(r, 250));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Erreur sur ${seed.name}:`, e);
    }
  }

  const outPath = path.join(__dirname, "..", "data", "institutions-places.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf8");
  // eslint-disable-next-line no-console
  console.log(`✅ Résultats sauvegardés dans ${outPath}`);

  // À partir de ce JSON, tu peux :
  // - soit générer un fichier TS pour compléter `institutions-mock.ts`
  // - soit écrire un petit script d'upsert Supabase (table institutions)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

