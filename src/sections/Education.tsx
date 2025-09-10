
export default function Education(){
  return (
    <section id="educacion" className="section edu-section">
      <div className="container">
        <span className="kicker">educación · 教育</span>
        <h2>Formación</h2>

        <article className="edu-card">
          <div className="edu-head">
            <h3>UBA — Ingeniería en Informática</h3>
            <span className="year">En curso</span>
          </div>
          <p className="edu-sub">Buenos Aires, Argentina</p>

          <ul className="list-icon" style={{marginTop:8}}>
            <li>Materias afines: Estadística, Base de Datos, Algoritmos</li>
            <li>Intereses: Data Analytics, Visualización, UX de datos</li>
          </ul>
        </article>
      </div>

      <div className="orb micro pink m1" />
      <div className="orb micro turq m2" />
    </section>
  );
}
