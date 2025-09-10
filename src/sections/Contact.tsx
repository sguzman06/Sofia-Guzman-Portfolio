
export default function Contact(){
  return (
    <section id="contactos" className="section contact-section">
      <div className="container">
        <span className="kicker">contacto · 連絡先</span>
        <h2>¿Charlamos?</h2>
        <p className="subtitle" style={{maxWidth:680}}>
          Si te interesa colaborar o conocer más sobre mis proyectos, escribime.
        </p>

        <div className="cta" style={{marginTop:14}}>
          <a className="btn ghost linkedin" href="https://www.linkedin.com/in/sguzman06/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn ghost github" href="https://github.com/sguzman06" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>

      <div className="orb micro pink m1" />
      <div className="orb micro turq m2" />
    </section>
  );
}
