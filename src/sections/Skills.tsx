import type { ReactNode } from "react";
import { useLang } from "../hooks/useLang";
import { useTilt } from "../hooks/useTilt";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type SkillCardData = {
  id: string;
  title: string;
  items: string[];
};

const RETRO_EMOJIS: Record<string, string> = {
  analysis: "💾", // Floppy disk
  bi: "📺",       // Retro CRT TV
  dataops: "🕹️",  // Arcade Joystick
  soft: "👾",     // Space Invader
};

const ICONS: Record<string, ReactNode> = {
  analysis: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M4 19h16v2H4zm2-3h2v3H6zm4-5h2v8h-2zm4-3h2v11h-2zm4-6h2v17h-2z"/>
    </svg>
  ),
  bi: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M3 13h2v8H3zm4-4h2v12H7zm4 2h2v10h-2zm4-8h2v18h-2zm4 6h2v12h-2z"/>
    </svg>
  ),
  dataops: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M4 7h16v4H4zM4 13h7v4H4zm9 0h7v4h-7z"/>
    </svg>
  ),
  soft: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
    </svg>
  ),
};

function SkillCard({ data }: { data: SkillCardData }) {
  const reduce = usePrefersReducedMotion();
  const tilt = useTilt(6);
  const handlers = reduce ? {} : { onMouseMove: tilt.onMouseMove, onMouseLeave: tilt.onMouseLeave };

  return (
    <div ref={tilt.ref} {...handlers} className="skill-card group relative overflow-hidden transition-all duration-300 hover:border-[#ff6fae]/50 hover:shadow-[0_0_30px_rgba(255,111,174,0.15)]">
      
      {/* Esquina City Pop (Decoración sutil de fondo) */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-[#ff6fae]/0 via-[#ff6fae]/5 to-[#ff8fbc]/20 rounded-full blur-2xl group-hover:bg-[#ff6fae]/20 transition-colors duration-500"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="skill-card__icon relative" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff6fae] to-[#60a5fa] blur-[6px] opacity-40 group-hover:opacity-80 transition-opacity duration-300 rounded-xl"></div>
          <span className="relative z-10">{ICONS[data.id] ?? ICONS.analysis}</span>
        </div>
        
        {/* Retro Emoji animado en hover */}
        <span className="text-3xl opacity-70 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:opacity-100 transition-all duration-300 cursor-default" aria-hidden="true" title="Estética Retro 2000s">
          {RETRO_EMOJIS[data.id] || "✨"}
        </span>
      </div>

      <h3 className="skill-card__title font-bold tracking-tight relative z-10">{data.title}</h3>
      
      {/* Línea punteada neón con tracking point */}
      <div className="w-full relative my-5 flex items-center z-10">
        <div className="absolute inset-0 border-b-[2px] border-dotted border-[#ff6fae]/40 dark:border-[#ff8fbc]/40 opacity-70"></div>
        <div className="w-2 h-2 rounded-full bg-[#ff6fae] absolute right-0 shadow-[0_0_10px_#ff6fae] animate-pulse"></div>
        {/* Destello que corre en hover */}
        <div className="absolute h-[2px] w-0 bg-gradient-to-r from-transparent via-[#ff6fae] to-transparent group-hover:w-full transition-all duration-[800ms] opacity-0 group-hover:opacity-100 ease-in-out"></div>
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

export default function Skills(){
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
