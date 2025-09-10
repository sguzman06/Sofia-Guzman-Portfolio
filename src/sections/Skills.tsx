import React from "react";
import { useTilt } from "../hooks/useTilt";

type Card = { title: string; icon: React.ReactNode; items: string[] };

const cards: Card[] = [
  {
    title: "Análisis de Datos",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M4 19h16v2H4zm2-3h2v3H6zm4-5h2v8h-2zm4-3h2v11h-2zm4-6h2v17h-2z"/>
      </svg>
    ),
    items: ["SQL", "Python", "Estadística", "Limpieza / Modelado", "KPIs"],
  },
  {
    title: "BI · Visualización",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M3 13h2v8H3zm4-4h2v12H7zm4 2h2v10h-2zm4-8h2v18h-2zm4 6h2v12h-2z"/>
      </svg>
    ),
    items: ["Power BI (DAX/M)", "Power Query", "Tableau", "Dashboards", "Reporting"],
  },
  {
    title: "DataOps · Integración",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M4 7h16v4H4zM4 13h7v4H4zm9 0h7v4h-7z"/>
      </svg>
    ),
    items: ["ETL", "Excel Avanzado", "Git", "SAP (base)", "Automatización"],
  },
  {
    title: "Habilidades Blandas",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="currentColor" d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
      </svg>
    ),
    items: ["Comunicación", "Colaboración", "Organización", "Detalle"],
  },
];

function SkillCard({ c }: { c: Card }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(6);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="skill-card"
    >
      <div className="iconpill">
        {c.icon}
      </div>
      <h3 className="card-title">{c.title}</h3>
      <ul className="skill-list">
        {c.items.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
}

export default function Skills(){
  return (
    <section id="skills" className="section skills-bg">
      <div className="container">
        <span className="kicker">skills · スキル</span>
        <h2>Herramientas que uso para entender y contar datos</h2>

        <div className="grid-cards">
          {cards.map((c) => <SkillCard key={c.title} c={c} />)}
        </div>
      </div>

      {/* orbes tenues para continuidad */}
      <div className="orb micro pink m5" />
      <div className="orb micro turq m6" />
    </section>
  );
}
