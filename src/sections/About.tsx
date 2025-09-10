
export default function About(){
  return (
    <section id="sobre-mi" className="section sunset-bg">
      <div className="container">
        <span className="kicker">sobre mi · ソフィ</span>
        <h2>Construyo historias con datos, sin perder lo humano.</h2>

        {/* Nota en japonés (discreta) */}
        <p className="jp-note">データで物語を作る — crear historias con datos.</p>

        <div className="grid-2">
          {/* Columna texto */}
          <div>
            <p style={{maxWidth: 740, lineHeight: 1.7, marginTop: 6}}>
              Soy Sofi, estudiante de Ingeniería en Informática (UBA) con foco en
              <strong> análisis de datos</strong>.
              Me mueven la curiosidad, el diseño claro y la colaboración. Busco que cada entrega
              conecte con personas reales y aporte valor medible.
            </p>

            <p style={{maxWidth: 740, lineHeight: 1.7}}>
              Actualmente trabajo con <strong>SQL</strong>, <strong>Python</strong>,
              <strong> Power BI</strong>, <strong>Tableau</strong>, <strong>Excel avanzado</strong> y una base en
              <strong> SAP</strong>. Me interesan la <strong>IA aplicada</strong>, la <strong>visualización</strong> y el
              <strong> UX de datos</strong>.
            </p>

            {/* Chips de skills — reforzamos Data y ocultamos web */}
            <div className="chips" style={{marginTop: 14}}>
              <span className="chip">SQL</span>
              <span className="chip">Python</span>
              <span className="chip">Power BI</span>
              <span className="chip">Tableau</span>
              <span className="chip">Excel Avanzado</span>
              <span className="chip">Estadística</span>
              <span className="chip">ETL</span>
              <span className="chip">Data Viz</span>
              <span className="chip">SAP (base)</span>
              <span className="chip">Git</span>
            </div>
          </div>

          {/* Columna “tarjeta” */}
          <div className="card" style={{alignSelf:"start"}}>
            <h3 style={{marginTop:0, marginBottom: 10}}>Ahora mismo</h3>
            <ul className="list-icon" style={{margin:0, padding:0, listStyle:"none"}}>
              <li>📚 UBA – Ingeniería en Informática</li>
              <li>📊 Proyectos de <strong>Data Analytics</strong> & visualización</li>
              <li>🔧 Práctica y base en <strong>SAP</strong></li>
            </ul>

            <hr className="soft" />

            <h3 style={{marginTop:10, marginBottom:10}}>Pasantía · Pescar — Artech</h3>
            <p style={{marginTop:0, lineHeight:1.6}}>
              Estoy completando una pasantía donde preparo un <strong>proyecto final. </strong> 
              El enfoque: limpieza de datos, modelado, KPIs y un dashboard claro para tomar decisiones.
              (<em>En Experiencia</em> voy a detallar metodología y aprendizajes.)
            </p>
          </div>
        </div>
      </div>

      {/* orbes tenues repartidos en la sección */}
      <div className="orb micro pink m1" />
      <div className="orb micro turq m2" />
    </section>
  );
}
