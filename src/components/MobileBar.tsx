import { useLang } from "../hooks/useLang";
import { useActiveSection } from "../hooks/useActiveSection";
import { useMemo } from "react";

type NavItem = { id: string; label: string };

export default function MobileBar() {
  const { t } = useLang();
  const sections = t<NavItem[]>("nav.sections");
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 md:hidden h-14 backdrop-blur-md bg-white/70 dark:bg-slate-900/50 border-t border-white/20 dark:border-white/10"
      aria-label={t("nav.mobileAria")}
    >
      <ul className="h-full grid grid-cols-4 items-center text-sm font-medium">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id} className="text-center">
              <a
                href={`#${section.id}`}
                className={`block py-2 transition-opacity duration-150 ${
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="pointer-events-none h-[env(safe-area-inset-bottom,0)]" />
    </nav>
  );
}
