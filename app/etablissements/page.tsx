import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EtablissementsClient } from "@/components/etablissements/EtablissementsClient";
import { ScrollToTop } from "@/components/ScrollToTop";
import { createClient } from "@/lib/supabase/server";
import { institutionsMock, type Institution } from "@/data/institutions-mock";

// Utilisation de Supabase (cookies) → route rendue dynamiquement
export const dynamic = "force-dynamic";

async function loadInstitutions(): Promise<Institution[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("institutions")
      .select("*")
      .eq("is_active", true);
    if (error) {
      console.error("Supabase institutions error:", error.message);
      return institutionsMock;
    }
    if (data && data.length > 0) {
      return data as Institution[];
    }
  } catch (e) {
    console.error("Supabase institutions fetch failed:", e);
  }
  return institutionsMock;
}

export default async function EtablissementsPage() {
  const institutions = await loadInstitutions();
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 pb-16 pt-8 sm:px-6 md:px-8 md:pb-24 md:pt-12">
        <Suspense
          fallback={
            <div className="mx-auto max-w-7xl">
              <h1 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
                Annuaire des établissements
              </h1>
              <p className="text-slate-600">Chargement de l&apos;annuaire…</p>
            </div>
          }
        >
          <EtablissementsClient institutions={institutions} />
        </Suspense>
        <ScrollToTop />
      </main>

      <Footer />
    </div>
  );
}
