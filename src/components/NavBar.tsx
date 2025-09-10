import { useMemo } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";     // <-- NUEVO
import { useActiveSection } from "../hooks/useActiveSection";
import { useLang } from "../hooks/useLang";        // <-- NUEVO

const ids = ["inicio","sobre-mi","skills","proyectos","experiencia","educacion","contactos"];

export default function NavBar(){
  const active = useActiveSection(ids);
  const { t } = useLang();                         // <-- NUEVO

  const links = useMemo(() => ([
    { href:"#inicio",      k:"nav.inicio" },
    { href:"#sobre-mi",    k:"nav.about" },
    { href:"#skills",      k:"nav.skills" },
    { href:"#proyectos",   k:"nav.projects" },
    { href:"#experiencia", k:"nav.experience" },
    { href:"#educacion",   k:"nav.education" },
    { href:"#contactos",   k:"nav.contact" },
  ]), []);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#inicio" className="brand">
          <img src="/brand/sg-logo.svg" className="logo" alt="Logo SG" />
          <span>sofia guzman</span>
        </a>

        <div className="menu">
          {links.map(l => (
            <a key={l.href} href={l.href} className={active === l.href.slice(1) ? "active" : ""}>
              {t(l.k)}
            </a>
          ))}
          {/* Acciones a la derecha */}
          <div style={{display:"flex", gap:8, marginLeft:8}}>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
