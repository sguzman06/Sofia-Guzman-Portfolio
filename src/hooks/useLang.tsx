import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

type Resources = typeof es;
export type Lang = "es" | "en";

type TranslationValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | TranslationValue[]
  | { [key: string]: TranslationValue };

type TranslateFn = <T = string>(key: string, fallback?: T) => T;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslateFn;
  available: Lang[];
};

const resources: Record<Lang, Resources> = { es, en };
const fallbackLang: Lang = "es";
const availableLangs: Lang[] = ["es", "en"];

const LangContext = createContext<LangContextValue | null>(null);

function isLang(value: unknown): value is Lang {
  return typeof value === "string" && availableLangs.includes(value as Lang);
}

function getFromPath(lang: Lang, key: string): TranslationValue | undefined {
  const segments = key.split(".");
  let current: TranslationValue = resources[lang];
  for (const segment of segments) {
    if (typeof current !== "object" || current === null || Array.isArray(current)) {
      return undefined;
    }
    const next: TranslationValue | undefined = (current as Record<string, TranslationValue | undefined>)[segment];
    if (next === undefined) {
      return undefined;
    }
    current = next;
  }
  return current;
}

function detectInitialLang(): Lang {
  if (typeof window === "undefined") {
    return fallbackLang;
  }
  const stored = window.localStorage.getItem("lang");
  if (isLang(stored)) {
    return stored;
  }
  const params = new URLSearchParams(window.location.search);
  const query = params.get("lang");
  if (isLang(query)) {
    return query;
  }
  const navigatorLang = window.navigator.language?.slice(0, 2).toLowerCase();
  if (isLang(navigatorLang)) {
    return navigatorLang;
  }
  return fallbackLang;
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang());

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState({}, "", url);
    }
  }, []);

  const translate = useCallback(<T = string>(key: string, fallback?: T) => {
    const value = getFromPath(lang, key);
    if (value !== undefined) {
      return value as T;
    }
    const defaultValue = getFromPath(fallbackLang, key);
    if (defaultValue !== undefined) {
      return defaultValue as T;
    }
    return (fallback ?? (key as unknown as T)) as T;
  }, [lang]);

  const value = useMemo<LangContextValue>(() => ({
    lang,
    setLang,
    t: translate as TranslateFn,
    available: availableLangs,
  }), [lang, setLang, translate]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}
