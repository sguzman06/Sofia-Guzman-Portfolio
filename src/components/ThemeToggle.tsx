import { useLang } from "../hooks/useLang";
import { useTheme } from "../hooks/useTheme";

const Moon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z"/>
  </svg>
);
const Sun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42Zm10.48 0 1.79-1.8 1.42 1.41-1.8 1.79-1.41-1.4ZM12 4h0V1h0v3Zm0 19h0v-3h0v3ZM4 12H1v0h3v0Zm22 0h-3v0h3v0ZM6.76 19.16l-1.42 1.41-1.79-1.8 1.41-1.41 1.8 1.8Zm10.48 0 1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/>
  </svg>
);

export default function ThemeToggle(){
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  const isDark = theme === "dark";
  const nextMode = isDark ? "light" : "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={t(`common.themeToggle.aria.${nextMode}`)}
    >
      <span className="theme-icon" aria-hidden="true">{isDark ? <Moon/> : <Sun/>}</span>
      <span className="theme-label">{t(`common.themeToggle.${theme}`)}</span>
    </button>
  );
}
