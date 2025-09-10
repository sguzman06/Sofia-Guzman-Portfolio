import { useMemo, useState } from "react";

type Project = {
  title: string;
  year: string;
  tags: string[];
  summary: string;
  view?: string;   // demo / dashboard
  repo?: string;   // GitHub (si aplica)
  upcoming?: boolean;
  cover?: string;  // opcional: ruta de imagen (public/img/...)
};

const ALL: Project[] = [
  {
    title: "Pasantía · Pescar — Artech",
    year: "2025",
    tags: ["Power BI", "SQL", "ETL", "Dashboard"],
    summary:
      "Proyecto final en Data Analytics: limpieza, modelado, KPIs y dashboard para la toma de decisiones.",
    upcoming: true,
  },
  {
    title: "Demo · KPIs de Ventas (Power BI)",
    year: "2024",
    tags: ["Power BI", "Dashboard"],
    summary:
      "Dashboard de ejemplo con segmentaciones y descripciones de KPIs. Focus en claridad visual.",
    view: "#",
  },
  {
    title: "EDA · Titanic (Python)",
    year: "2024",
    tags: ["Python", "Data Viz"],
    summary:
      "Exploración de datos, manejo de nulos y visualizaciones rápidas para entender patrones.",
    repo: "https://github.com/sguzman06",
  },
  {
    title: "Airbnb · Visualización (Tableau)",
    year: "2024",
    tags: ["Tableau", "Data Viz"],
    summary:
      "Vista general de precios, review score y distribución geográfica con filtros interactivos.",
    view: "#",
  },
];

const TAGS = ["Todos", "Power BI", "Python", "Tableau", "SQL", "ETL", "Dashboard", "Data Viz"];

export default function Projects(){
  const [tag, setTag] = useState("Todos");
  const items = useMemo(
    () => (tag === "Todos" ? ALL : ALL.filter(p => p.tags.includes(tag))),
    [tag]
  );

  return (
    <section id="proyectos" className="section projects-section">
      <div className="container">
        <span className="kicker">proyectos · プロジェクト</span>
        <h2>Algunos trabajos y experimentos</h2>

        <div className="chips" style={{marginTop: 8}}>
          {TAGS.map(t => (
            <button
              key={t}
              className={`chip ${tag === t ? "active" : ""}`}
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {items.map((p) => (
            <article key={p.title} className={`project-card ${p.upcoming ? "upcoming" : ""}`}>
              <div className="project-cover">
                {p.cover ? (
                  <img src={p.cover} alt={`Cover de ${p.title}`} />
                ) : (
                  <div className="grad" aria-hidden />
                )}
                {p.upcoming && <span className="badge">en progreso</span>}
              </div>

              <div className="project-body">
                <div className="project-head">
                  <h3>{p.title}</h3>
                  <span className="year">{p.year}</span>
                </div>
                <p className="project-summary">{p.summary}</p>

                <div className="chips small" style={{marginTop:6}}>
                  {p.tags.map(t => <span key={t} className="chip ghost">{t}</span>)}
                </div>

                <div className="project-cta">
                  {p.view && (
                    <a className="btn ghost" href={p.view} target="_blank" rel="noreferrer">
                      Ver
                    </a>
                  )}
                  {p.repo && (
                    <a className="btn ghost" href={p.repo} target="_blank" rel="noreferrer">
                      Repo
                    </a>
                  )}
                  {p.upcoming && (
                    <span className="hint">Publico pronto el dashboard</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* atmósfera sutil */}
      <div className="orb micro pink m1" />
      <div className="orb micro turq m2" />
    </section>
  );
}
