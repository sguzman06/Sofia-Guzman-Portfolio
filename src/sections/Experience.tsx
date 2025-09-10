
type Exp = {
  periodo: string;
  rol: string;
  org: string;
  ubicacion?: string;
  bullets: string[];
};

const TIMELINE: Exp[] = [
  {
    periodo: "2025 — actual",
    rol: "Pasantía en Data Analytics",
    org: "Fundación Pescar · Artech",
    ubicacion: "Remoto / Buenos Aires",
    bullets: [
      "Práctica intensiva en limpieza, modelado y presentación de datos.",
      "KPIs y dashboard orientados a toma de decisiones.",
      "Documentación y comunicación de hallazgos."
    ],
  },
  // Agregaremos más entradas cuando me pases detalles:
  // { periodo: "AÑO — AÑO", rol: "Rol", org: "Organización", ubicacion: "", bullets: ["..."] },
];

export default function Experience(){
  return (
    <section id="experiencia" className="section exp-section">
      <div className="container">
        <span className="kicker">experiencia · 経験</span>
        <h2>Lo que estoy haciendo y lo que hice</h2>

        {/* --- Case destacado: Pescar — Artech --- */}
        <article className="case-card">
          <div className="case-head">
            <span className="badge">Case • en progreso</span>
            <h3 className="case-title">Pasantía · Pescar — Artech</h3>
            <p className="case-sub">Proyecto final de Data Analytics para publicar en mi portfolio</p>
          </div>

          <div className="case-grid">
            <div>
              <h4>Problema</h4>
              <p>
                Necesidad de <strong>unificar datos</strong> y presentar <strong>KPIs claros</strong> que ayuden a
                priorizar acciones y medir impacto.
              </p>
              <h4>Enfoque</h4>
              <ul className="list-icon">
                <li>Limpieza y normalización · ETL</li>
                <li>Modelo analítico y cálculo de KPIs</li>
                <li>Dashboard con historia y foco en decisiones</li>
              </ul>
            </div>

            <div>
              <h4>Stack</h4>
              <div className="chips">
                <span className="chip tone-1">SQL</span>
                <span className="chip tone-2">Python</span>
                <span className="chip tone-3">Power BI</span>
                <span className="chip">Excel Avanzado</span>
              </div>

              <h4 style={{marginTop:12}}>Resultados esperados</h4>
              <ul className="list-icon">
                <li>KPIs accionables (seguimiento mensual)</li>
                <li>Visualización simple para stakeholders</li>
                <li>Guía de lectura + definiciones</li>
              </ul>

              {/* Botón: cambiale href cuando tengas el link */}
              <div style={{marginTop:12}}>
                <a
                  className="btn ghost disabled"
                  href="#"
                  aria-disabled="true"
                  title="Próximamente"
                >
                  Ver dashboard (pronto)
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* --- Timeline compacto --- */}
        <div className="timeline">
          {TIMELINE.map((e) => (
            <article key={e.rol + e.periodo} className="tl-item">
              <div className="tl-dot" />
              <div className="tl-content">
                <div className="tl-top">
                  <h3>{e.rol}</h3>
                  <span className="tl-periodo">{e.periodo}</span>
                </div>
                <p className="tl-org">{e.org} {e.ubicacion ? `· ${e.ubicacion}` : ""}</p>
                <ul className="list-icon" style={{marginTop:6}}>
                  {e.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                </ul>
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
