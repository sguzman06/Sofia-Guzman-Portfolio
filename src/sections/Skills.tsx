import type { ReactNode } from "react";
import { useLang } from "../hooks/useLang";
import { useTilt } from "../hooks/useTilt";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type SkillCardData = {
  id: string;
  title: string;
  items: string[];
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
    <div ref={tilt.ref} {...handlers} className="skill-card">
      <div className="skill-card__icon" aria-hidden="true">
        {ICONS[data.id] ?? ICONS.analysis}
      </div>
      <h3 className="skill-card__title">{data.title}</h3>
      <ul className="skill-card__list">
        {data.items.map((item) => (
          <li key={item}>{item}</li>
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
