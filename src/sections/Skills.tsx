//import type { ReactNode } from "react";
import { useLang } from "../hooks/useLang";
import { useTilt } from "../hooks/useTilt";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type SkillCardData = {
  id: string;
  title: string;
  items: string[];
};

/* ─── Emoji único por card ─── */
const CARD_EMOJI: Record<string, string> = {
  analysis: "⚙️",
  bi: "📊",
  dataops: "🔄",
  soft: "🌱",
};

/* ─── Clase de animación per-card ─── */
const EMOJI_ANIM: Record<string, string> = {
  analysis: "skill-emoji--spin",
  bi: "skill-emoji--bars",
  dataops: "skill-emoji--spin",
  soft: "skill-emoji--leaf",
};

/* ─── Keyframes inyectados una sola vez vía <style> ─── */
const KEYFRAMES = `
  @keyframes skillSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes skillBars {
    0%, 100% { transform: scaleY(1)   translateY(0); }
    25%       { transform: scaleY(1.3) translateY(-4px); }
    50%       { transform: scaleY(0.8) translateY(3px); }
    75%       { transform: scaleY(1.2) translateY(-2px); }
  }
  @keyframes skillLeaf {
    0%, 100% { transform: translateY(0)   rotate(-5deg); }
    33%       { transform: translateY(-6px) rotate(5deg); }
    66%       { transform: translateY(-3px) rotate(-3deg); }
  }

  .skill-emoji {
    font-size: 3.0rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 8px rgba(255,111,174,0.5));
    transition: filter 0.3s;
    will-change: transform;
    width: 100%;
  }
  .skill-emoji:hover,
  .skill-card:hover .skill-emoji {
    filter: drop-shadow(0 0 18px rgba(255,111,174,0.8));
  }

  /* Spin continuo */
  .skill-emoji--spin {
    animation: skillSpin 4s linear infinite;
  }

  /* Barras – simula bounce de chart */
  .skill-emoji--bars {
    animation: skillBars 1.8s ease-in-out infinite;
  }

  /* Hoja – flota suavemente */
  .skill-emoji--leaf {
    animation: skillLeaf 3s ease-in-out infinite;
  }
`;

let injected = false;
function injectKeyframes() {
  if (injected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.innerHTML = KEYFRAMES;
  document.head.appendChild(style);
  injected = true;
}

/* ─── Card ─── */
function SkillCard({ data }: { data: SkillCardData }) {
  injectKeyframes();
  const reduce = usePrefersReducedMotion();
  const tilt = useTilt(6);
  const handlers = reduce ? {} : { onMouseMove: tilt.onMouseMove, onMouseLeave: tilt.onMouseLeave };
  const animClass = reduce ? "" : (EMOJI_ANIM[data.id] ?? "");

  return (
    <div
      ref={tilt.ref}
      {...handlers}
      className="skill-card group relative overflow-hidden transition-all duration-300 hover:border-[#ff6fae]/50 hover:shadow-[0_0_30px_rgba(255,111,174,0.15)]"
    >
      {/* Blob decorativo fondo */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-[#ff6fae]/0 via-[#ff6fae]/5 to-[#ff8fbc]/20 rounded-full blur-2xl group-hover:bg-[#ff6fae]/20 transition-colors duration-500" />

      {/* Emoji centrado con animación */}
      <div className="flex items-center justify-center mb-5 relative z-10" aria-hidden="true">
        <span className={`skill-emoji ${animClass}`}>
          {CARD_EMOJI[data.id] ?? "✨"}
        </span>
      </div>

      <h3 className="skill-card__title font-bold tracking-tight relative z-10 text-center">{data.title}</h3>

      {/* Línea punteada neón */}
      <div className="w-full relative my-5 flex items-center z-10">
        <div className="absolute inset-0 border-b-[2px] border-dotted border-[#ff6fae]/40 dark:border-[#ff8fbc]/40 opacity-70" />
        <div className="w-2 h-2 rounded-full bg-[#ff6fae] absolute right-0 shadow-[0_0_10px_#ff6fae] animate-pulse" />
        <div className="absolute h-[2px] w-0 bg-gradient-to-r from-transparent via-[#ff6fae] to-transparent group-hover:w-full transition-all duration-[800ms] opacity-0 group-hover:opacity-100 ease-in-out" />
      </div>

      <ul className="skill-card__list relative z-10">
        {data.items.map((item) => (
          <li key={item} className="group/item flex items-center text-[0.95rem]">
            <span className="text-[#ff6fae] mr-2 text-xs opacity-50 group-hover/item:opacity-100 transition-opacity">►</span>
            <span className="group-hover/item:text-[#ff6fae] transition-colors">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  const { t } = useLang();
  const cards = t<SkillCardData[]>("skills.cards");

  return (
    <section id="skills" className="section section--skills" aria-labelledby="skills-title">
      <div className="section__inner">
        <span className="section__kicker">{t("skills.kicker")}</span>
        <h2 id="skills-title" className="section__title">{t("skills.title")}</h2>
        <div className="skills__grid">
          {cards.map((card) => (
            <SkillCard key={card.id} data={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
