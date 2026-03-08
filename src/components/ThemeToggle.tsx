import { useLang } from "../hooks/useLang";
import { useTheme } from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle(){
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  const isDark = theme === "dark";
  const nextMode = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(`common.themeToggle.aria.${nextMode}`)}
      className={`
        group flex items-center gap-2 h-9 px-1.5 rounded-full
        border border-black/10 dark:border-white/10
        bg-white/50 dark:bg-space-cadet/50 backdrop-blur-md
        hover:bg-white/80 dark:hover:bg-space-light/80
        transition-all duration-300 shadow-sm
      `}
    >
      <div className={`p-1 rounded-full transition-colors ${isDark ? "bg-[#00fff7]/20 text-[#00fff7]" : "bg-[#ff6fae]/20 text-[#ff6fae]"}`}>
        {isDark ? <Moon size={14} strokeWidth={2.5} /> : <Sun size={14} strokeWidth={2.5} />}
      </div>
      <span className="text-sm font-semibold pr-2 text-black/80 dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors">
        {t(`common.themeToggle.${theme}`)}
      </span>
    </button>
  );
}
