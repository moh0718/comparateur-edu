"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type PostStatus = "draft" | "published";
type PostSourceType = "auto" | "manual" | string;

type Post = {
  id: string;
  title: string;
  slug?: string | null;
  status: PostStatus;
  source_type?: PostSourceType | null;
  created_at?: string;
  updated_at?: string;
};

type Institution = {
  id: string;
  name: string;
  slug?: string | null;
  is_active?: boolean;
  is_verified?: boolean;
  is_partner?: boolean;
  data_confidence?: string | null;
  partner_whatsapp?: string | null;
};

type ScrapingLog = {
  id: string;
  created_at?: string;
  etablissement?: string | null;
  banque?: string | null;
  statut?: string | null;
  status?: string | null;
  message_erreur?: string | null;
  error_message?: string | null;
  sources_used?: string[] | null;
};

function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };
  return (
    <button type="button" onClick={handleSignOut} className="text-sm text-slate-600 hover:text-slate-900">
      Déconnexion
    </button>
  );
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [logs, setLogs] = useState<ScrapingLog[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [instError, setInstError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [confidenceFilter, setConfidenceFilter] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setInstError(null);
    try {
      const supabase = createClient();
      const [postsRes, logsRes, instRes] = await Promise.all([
        supabase.from("posts").select("id, title, slug, status, source_type, created_at").order("created_at", { ascending: false }),
        supabase.from("scraping_logs").select("id, created_at, etablissement, banque, statut, status, message_erreur, error_message, sources_used").order("created_at", { ascending: false }).limit(100),
        supabase.from("institutions").select("id, name, slug, is_active, is_verified, is_partner, data_confidence, partner_whatsapp").order("name"),
      ]);

      if (postsRes.error) throw new Error(postsRes.error.message);
      if (logsRes.error) throw new Error(logsRes.error.message);
      setPosts((postsRes.data ?? []) as Post[]);
      setLogs((logsRes.data ?? []) as ScrapingLog[]);
      if (instRes.error) {
        setInstitutions([]);
        setInstError(instRes.error.message);
      } else {
        setInstitutions((instRes.data ?? []) as Institution[]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isActive = (i: Institution) => i.is_active === true;
  const handleToggle = async (id: string) => {
    const inst = institutions.find((x) => x.id === id);
    if (!inst) return;
    setTogglingId(id);
    try {
      const supabase = createClient();
      const next = !isActive(inst);
      const { error } = await supabase.from("institutions").update({ is_active: next }).eq("id", id);
      if (error) throw new Error(error.message);
      setInstitutions((prev) => prev.map((x) => (x.id === id ? { ...x, is_active: next } : x)));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur");
    } finally {
      setTogglingId(null);
    }
  };

  const handleVerify = async (id: string) => {
    setVerifyingId(id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("institutions").update({ is_verified: true }).eq("id", id);
      if (error) throw new Error(error.message);
      setInstitutions((prev) => prev.map((x) => (x.id === id ? { ...x, is_verified: true } : x)));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur");
    } finally {
      setVerifyingId(null);
    }
  };

  const handlePublish = async (id: string) => {
    setPublishingId(id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("posts").update({ status: "published", updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw new Error(error.message);
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "published" as PostStatus } : p)));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erreur");
    } finally {
      setPublishingId(null);
    }
  };

  const formatDate = (d: string | undefined) =>
    d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

  const filteredInstitutions = confidenceFilter
    ? institutions.filter((i) => (i.data_confidence ?? "") === confidenceFilter)
    : institutions;
  const partners = institutions.filter((i) => i.is_partner === true);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white text-sm">🎓</div>
            <span className="font-semibold text-slate-900">Admin — Comparateur Edu</span>
          </Link>
          <SignOutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
        )}

        {/* Section 1 — Établissements */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Établissements</h2>
          {instError && (
            <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
              Table institutions : {instError}
            </div>
          )}
          <div className="mb-3 flex items-center gap-2">
            <label className="text-sm text-slate-600">Filtrer par confiance :</label>
            <select
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900"
            >
              <option value="">Tous</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Confiance</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Statut</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredInstitutions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">
                      Aucun établissement
                    </td>
                  </tr>
                ) : (
                  filteredInstitutions.map((inst) => (
                    <tr key={inst.id}>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{inst.name}</td>
                      <td className="px-4 py-3 text-xs text-slate-600">{inst.data_confidence ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${isActive(inst) ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-700"}`}>
                          {isActive(inst) ? "Actif" : "Inactif"}
                        </span>
                        {inst.is_verified && <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Vérifié</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {!inst.is_verified && (
                          <button
                            type="button"
                            onClick={() => handleVerify(inst.id)}
                            disabled={verifyingId === inst.id}
                            className="mr-2 rounded-lg bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            Vérifier
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleToggle(inst.id)}
                          disabled={togglingId === inst.id}
                          className={`rounded-lg px-2 py-1 text-xs font-medium disabled:opacity-50 ${isActive(inst) ? "bg-slate-200 text-slate-700 hover:bg-slate-300" : "bg-green-600 text-white hover:bg-green-700"}`}
                        >
                          {togglingId === inst.id ? "…" : isActive(inst) ? "Désactiver" : "Activer"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2 — Articles blog */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Articles blog</h2>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Titre</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">Aucun article</td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{post.title}</td>
                      <td className="px-4 py-3">
                        {(post.source_type ?? "").toLowerCase() === "auto" ? (
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">Auto</span>
                        ) : (
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Manuel</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${post.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                          {post.status === "published" ? "Publié" : "Brouillon"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{formatDate(post.created_at)}</td>
                      <td className="px-4 py-3 text-right">
                        {post.status === "draft" && (
                          <button
                            type="button"
                            onClick={() => handlePublish(post.id)}
                            disabled={publishingId === post.id}
                            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            {publishingId === post.id ? "…" : "Publier"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 — Logs scraping */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Logs scraping</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Établissement</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Sources utilisées</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Erreur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">Aucun log</td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id}>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{formatDate(log.created_at)}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{log.etablissement ?? log.banque ?? "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${((log.statut ?? log.status) ?? "").toUpperCase() === "OK" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {log.statut ?? log.status ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {Array.isArray(log.sources_used) ? log.sources_used.join(", ") : log.sources_used ?? "—"}
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-sm text-slate-600">{log.message_erreur ?? log.error_message ?? "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 — Partenaires */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-slate-900">Partenaires</h2>
          <p className="mb-3 text-sm text-slate-600">Établissements avec is_partner = true</p>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">WhatsApp partenaire</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {partners.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-500">Aucun partenaire</td>
                  </tr>
                ) : (
                  partners.map((inst) => (
                    <tr key={inst.id}>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{inst.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{inst.partner_whatsapp ?? "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin?edit=${inst.id}`} className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200">
                          Modifier
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
