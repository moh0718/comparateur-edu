"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FicheMetier } from "@/data/metiers-mock";

const MAX_SUGGESTIONS = 8;

interface SearchMetiersProps {
  metiers: FicheMetier[];
  placeholder?: string;
}

export function SearchMetiers({ metiers, placeholder = "Rechercher un métier (ex. médecin, ingénieur, comptable)…" }: SearchMetiersProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<FicheMetier[]>([]);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const updateSuggestions = useCallback(
    (q: string) => {
      const qq = q.trim().toLowerCase();
      if (!qq) {
        setSuggestions([]);
        setOpen(false);
        return;
      }
      const filtered = metiers.filter(
        (m) =>
          m.titre.toLowerCase().includes(qq) ||
          (m.domaine ?? "").toLowerCase().includes(qq)
      );
      setSuggestions(filtered.slice(0, MAX_SUGGESTIONS));
      setOpen(filtered.length > 0);
      setFocusedIndex(-1);
    },
    [metiers]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    updateSuggestions(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && e.key !== "Escape") return;
    if (e.key === "Escape") {
      setOpen(false);
      setFocusedIndex(-1);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && suggestions[focusedIndex]) {
        router.push(`/fiches-metiers/${suggestions[focusedIndex].slug}`);
        setOpen(false);
        setQuery("");
        return;
      }
      const q = query.trim();
      if (q) {
        router.push(`/fiches-metiers/recherche?q=${encodeURIComponent(q)}`);
        setOpen(false);
        setQuery("");
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    }
  };

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 150);
  };

  const handleSuggestionClick = (m: FicheMetier) => {
    router.push(`/fiches-metiers/${m.slug}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => updateSuggestions(query)}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="suggestions-list"
          id="metiers-search"
          className="w-full rounded-2xl border-2 border-slate-200 bg-white py-4 pl-5 pr-12 text-slate-900 placeholder:text-slate-500 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden>
          ↵
        </span>
      </div>
      {open && suggestions.length > 0 && (
        <ul
          id="suggestions-list"
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-80 overflow-auto rounded-2xl border border-slate-200 bg-white py-2 shadow-lg"
        >
          {suggestions.map((m, i) => (
            <li key={m.slug} role="option" aria-selected={focusedIndex === i}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(m);
                }}
                className={`flex w-full flex-col gap-0.5 px-5 py-3 text-left transition-colors ${
                  focusedIndex === i ? "bg-brand/10 text-slate-900" : "hover:bg-slate-50"
                }`}
              >
                <span className="font-medium text-slate-900">{m.titre}</span>
                {m.domaine && (
                  <span className="text-xs text-slate-500">{m.domaine}</span>
                )}
              </button>
            </li>
          ))}
          {query.trim() && (
            <li className="border-t border-slate-100 px-5 py-2.5">
              <Link
                href={`/fiches-metiers/recherche?q=${encodeURIComponent(query.trim())}`}
                className="text-sm font-medium text-brand hover:underline"
                onMouseDown={(e) => e.preventDefault()}
              >
                Voir tous les résultats pour « {query.trim()} »
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
