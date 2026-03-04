"use client";

import React, { createContext, useContext, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t as baseT, DEFAULT_LANG } from "@/lib/i18n";

type I18nContextValue = {
  lang: Lang;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({
  initialLang = DEFAULT_LANG,
  children,
}: {
  initialLang?: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (next: Lang) => {
    if (typeof document !== "undefined") {
      document.cookie = `lang=${next}; path=/; max-age=31536000`;
    }
    setLangState(next);
  };

  const value: I18nContextValue = {
    lang,
    t: (key: string) => baseT(lang, key),
    setLang,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}

