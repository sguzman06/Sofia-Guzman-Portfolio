import { useEffect, useState } from "react";
import { useLang } from "../hooks/useLang";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function BackToTop() {
  const { t } = useLang();
  const reduce = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label={t("common.backToTop")}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
