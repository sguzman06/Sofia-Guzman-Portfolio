
import { useLang, type Lang } from "../hooks/useLang";

export default function LanguageToggle() {
  const { lang, setLang, t, available } = useLang();
  const names = t<Record<Lang, string>>("common.languageToggle.names");

  return (
    <div className="lang-toggle" role="group" aria-label={t("common.languageToggle.label")}>
      {available.map((code) => {
        const isCurrent = code === lang;
        const label = isCurrent
          ? `${t("common.languageToggle.label")} ${names[code]}`
          : t(`common.languageToggle.switchTo.${code}`);
        return (
          <button
            key={code}
            type="button"
            className={`lang-pill${isCurrent ? " is-active" : ""}`}
            aria-pressed={isCurrent}
            aria-label={label}
            title={label}
            onClick={() => {
              if (!isCurrent) {
                setLang(code);
              }
            }}
          >
            <span aria-hidden="true">{names[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
