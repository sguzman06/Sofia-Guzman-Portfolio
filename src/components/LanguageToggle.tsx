
import { useLang } from "../hooks/useLang";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  const next = lang === "es" ? "en" : "es";
  return (
    <button
      aria-label={`Cambiar idioma a ${next.toUpperCase()}`}
      className="btn ghost compact"
      onClick={() => setLang(next)}
    >
      {/* icono “translate” */}
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M10 4h10v2h-4.59l-.7 1.94A12 12 0 0 1 19 12h-2.1a10 10 0 0 0-2.67-3.86l-1.2 3.3h2.07v2H9v-2h3.02l1.07-2.97A8.9 8.9 0 0 1 11 7.07 8.7 8.7 0 0 1 9.3 9H7.1c.55-.92 1.26-1.8 2.1-2.6V6H4V4h6Z"/>
      </svg>
      <span style={{fontWeight:700, letterSpacing:.3}}>{lang.toUpperCase()}</span>
    </button>
  );
}
