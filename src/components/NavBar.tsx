import { useMemo, useRef, type KeyboardEvent } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useActiveSection } from "../hooks/useActiveSection";
import { useLang } from "../hooks/useLang";

type NavItem = { id: string; label: string };

export default function NavBar(){
  const { t } = useLang();
  const sections = t<NavItem[]>("nav.sections");
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const active = useActiveSection(ids);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  linkRefs.current.length = sections.length;

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const { key } = event;
    if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Home" && key !== "End") {
      return;
    }
    event.preventDefault();
    const items = linkRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (items.length === 0) {
      return;
    }
    if (key === "Home") {
      items[0]?.focus();
      return;
    }
    if (key === "End") {
      items[items.length - 1]?.focus();
      return;
    }
    const direction = key === "ArrowRight" ? 1 : -1;
    const currentIndex = items.findIndex((item) => item === document.activeElement);
    const fallbackIndex = direction === 1 ? 0 : items.length - 1;
    const nextIndex = currentIndex >= 0
      ? (currentIndex + direction + items.length) % items.length
      : fallbackIndex;
    items[nextIndex]?.focus();
  };

  return (
    <header className="site-header">
      <nav className="nav" aria-label={t("nav.aria")}>
        <div className="nav__inner">
          <a href="#home" className="brand">
            <img src="/brand/sg-logo.svg" className="brand__logo" alt={t("nav.logoAlt")}/>
            <span className="brand__label">{t("nav.brand")}</span>
          </a>
          <ul className="nav__list" onKeyDown={handleKeyDown}>
            {sections.map((section, index) => {
              const isActive = active === section.id;
              return (
                <li key={section.id} className="nav__item">
                  <a
                    ref={(el) => { linkRefs.current[index] = el; }}
                    href={`#${section.id}`}
                    className={`nav__link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="nav__actions">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
