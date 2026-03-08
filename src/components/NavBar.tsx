import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

/** Editá acá tus secciones (el id debe existir en el DOM) */
const NAV_LINKS = [
  { id: "home", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Proyectos" },
  { id: "contact", label: "Contacto" },
] as const;

type LinkId = (typeof NAV_LINKS)[number]["id"];

function scrollToSection(id: LinkId) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 80; // ajustá a la altura real del header
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/** Hook de scroll-spy por intersección */
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

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  links: { id: LinkId; label: string }[];
  onNavigate: (id: LinkId) => void;
};

function MobileDrawer({ open, onClose, links, onNavigate }: MobileDrawerProps) {
  // Bloqueo del scroll del body cuando está abierto
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus trap mínimo
  useEffect(() => {
    if (!open) return;
    const drawer = document.getElementById("mobile-drawer");
    if (!drawer) return;
    const selectors =
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(
      drawer.querySelectorAll<HTMLElement>(selectors)
    ).filter((el) => !el.hasAttribute("disabled"));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    first?.focus();
    window.addEventListener("keydown", trap);
    return () => window.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } bg-black/60`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`md:hidden
          fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm
          bg-[rgba(12,12,20,0.92)] backdrop-blur-md
          border-l border-white/10
          transition-transform
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-400 via-cyan-300 to-amber-300" />
            <span className="text-sm font-semibold tracking-wide">Sofía Guzmán</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-3 rounded-lg border border-white/15 text-white/80 hover:text-white hover:bg-white/5 transition"
          >
            Cerrar
          </button>
        </div>

        <nav className="p-3">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-[15px] text-white/90 hover:text-white hover:bg-white/5 transition"
                  onClick={() => {
                    onNavigate(l.id);
                    onClose();
                  }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="h-px my-3 bg-white/10" />

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
                onClose();
              }}
              className="
                inline-flex h-10 px-4 items-center justify-center
                rounded-xl text-sm font-medium
                bg-white text-black hover:bg-white/90 transition
              "
            >
              Contacto
            </a>
            <ThemeToggle />
          </div>
        </nav>

        <div className="mt-auto p-3 text-xs text-white/50">
          © {new Date().getFullYear()} Sofía Guzmán
        </div>
      </aside>
    </>
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id) as LinkId[]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-black/10 dark:border-white/10
        bg-white/60 dark:bg-[rgba(12,12,20,0.55)] backdrop-blur-md
        text-black dark:text-white
      "
      role="banner"
    >
      <nav
        className="
          mx-auto max-w-6xl
          h-16 px-4 md:px-6
          flex items-center justify-between
        "
        aria-label="Principal"
      >
        {/* Marca */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="flex items-center gap-2 group"
          aria-label="Ir al inicio"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-400 via-cyan-300 to-amber-300 opacity-90 group-hover:opacity-100 transition" />
          <span className="text-sm md:text-base font-semibold tracking-wide">
            Sofía Guzmán
          </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-4">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className={`
                    px-3 py-2 rounded-xl text-sm
                    transition
                    ${isActive
                      ? "bg-black/10 text-black dark:bg-white/10 dark:text-white"
                      : "text-black/80 hover:text-black hover:bg-black/5 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/5"}
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="
              hidden sm:inline-flex
              h-9 px-4 items-center justify-center
              rounded-xl text-sm font-medium
              bg-black text-white hover:bg-black/90
              dark:bg-white dark:text-black dark:hover:bg-white/90
              transition
            "
          >
            Contacto
          </a>

          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Hamburguesa (solo mobile) */}
          <button
            type="button"
            className="
              md:hidden h-9 w-9 inline-flex items-center justify-center
              rounded-xl border border-black/15 dark:border-white/15 
              text-black/90 dark:text-white/90 
              hover:bg-black/5 dark:hover:bg-white/5 transition
            "
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            {/* Ícono hamburguesa simple sin libs */}
            <span className="sr-only">Abrir menú</span>
            <span className="block w-5 h-0.5 bg-black dark:bg-white mb-1.5"></span>
            <span className="block w-5 h-0.5 bg-black dark:bg-white mb-1.5"></span>
            <span className="block w-5 h-0.5 bg-black dark:bg-white"></span>
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        links={[...NAV_LINKS]}
        onNavigate={(id) => scrollToSection(id)}
      />
    </header>
  );
}
