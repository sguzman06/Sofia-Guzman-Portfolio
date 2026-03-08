import { useEffect, useMemo, useState } from "react";
import { Home, User, Wrench, FolderGit2, Mail } from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "about", label: "Sobre mí", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Proyectos", icon: FolderGit2 },
  { id: "contact", label: "Contacto", icon: Mail },
] as const;

type LinkId = (typeof NAV_LINKS)[number]["id"];

function scrollToSection(id: LinkId) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 80; // que coincida con NavBar
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function useActiveSection(ids: LinkId[]) {
  const [active, setActive] = useState<LinkId>(ids[0]);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          const visible = [...entries]
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target?.id && ids.includes(visible.target.id as LinkId)) {
            setActive(visible.target.id as LinkId);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.25, 0.5, 0.75, 1] }
      ),
    [ids]
  );

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];
    els.forEach((el) => observer.observe(el));
    return () => {
      els.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [ids, observer]);

  return active;
}

export default function MobileBar() {
  const active = useActiveSection(NAV_LINKS.map((l) => l.id) as LinkId[]);

  return (
    <nav
      className="
        md:hidden
        fixed bottom-0 inset-x-0 z-50
        h-16
        bg-[rgba(12,12,20,0.65)] backdrop-blur-md
        border-t border-white/10
      "
      aria-label="Navegación inferior"
    >
      <ul className="h-full grid grid-cols-5">
        {NAV_LINKS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="flex">
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                className={`
                  flex-1 flex flex-col items-center justify-center gap-1
                  text-[11px] font-medium
                  transition
                  ${isActive ? "text-white" : "text-white/70 hover:text-white"}
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {Icon ? (
                  <Icon size={18} className={isActive ? "" : "opacity-80"} />
                ) : (
                  <span className="text-base">{label[0]}</span>
                )}
                <span
                  className={`
                    px-2 py-0.5 rounded-md
                    ${isActive ? "bg-white/10" : "bg-transparent"}
                  `}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      {/* Espaciador para evitar que tape contenido si usás inputs al final */}
      <div aria-hidden className="h-safe" />
    </nav>
  );
}
