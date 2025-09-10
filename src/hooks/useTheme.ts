import { useEffect, useState } from "react";
type Theme = "light" | "dark";

export default function useTheme(){
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem("theme") as Theme) || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme(t => (t === "light" ? "dark" : "light"));
  return { theme, setTheme, toggle };
}


export function useActiveSection(ids: string[], rootMargin = "-40% 0px -55% 0px"){
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id;
            setActive(id);
          }
        });
      },
      { rootMargin, threshold: 0.01 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [ids, rootMargin]);

  return active;
}
