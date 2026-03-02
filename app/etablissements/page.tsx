import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EtablissementsClient } from "@/components/etablissements/EtablissementsClient";

export default function EtablissementsPage() {
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
          <EtablissementsClient />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
