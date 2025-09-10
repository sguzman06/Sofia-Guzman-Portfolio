import { createContext, useContext, useMemo, useState } from "react";
import { dict } from "../i18n/dict";     // valor
import type { Lang } from "../i18n/dict"; // tipo  ✅

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "es");
  const t = (key: string) => dict[lang][key] ?? dict.es[key] ?? key;

  const value = useMemo(() => ({
    lang,
    setLang: (l: Lang) => { localStorage.setItem("lang", l); setLang(l); },
    t,
  }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
