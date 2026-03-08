import { useLang, type Lang } from "../hooks/useLang";

export default function LanguageToggle() {
  const { lang, setLang, t, available } = useLang();
  const names = t<Record<Lang, string>>("common.languageToggle.names");

  return (
    <div className="flex items-center h-9 p-0.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-space-cadet/50 backdrop-blur-md shadow-sm" role="group" aria-label={t("common.languageToggle.label")}>
      {available.map((code) => {
        const isCurrent = code === lang;
        const label = isCurrent
          ? `${t("common.languageToggle.label")} ${names[code]}`
          : t(`common.languageToggle.switchTo.${code}`);
        return (
          <button
            key={code}
            type="button"
            className={`
              relative flex items-center justify-center h-full px-3 rounded-full text-xs font-bold tracking-wide transition-all duration-300
              ${isCurrent 
                ? "bg-white dark:bg-white/15 text-black dark:text-[#00fff7] shadow-sm" 
                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-[#00fff7]/80"}
            `}
            aria-pressed={isCurrent}
            aria-label={label}
            title={label}
            onClick={() => {
              if (!isCurrent) setLang(code);
            }}
          >
            {names[code]}
          </button>
        );
      })}
    </div>
  );
}
