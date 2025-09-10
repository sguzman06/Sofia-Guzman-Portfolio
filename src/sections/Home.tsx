
import Typewriter from "../components/Typewriter";

export default function Home(){
  return (
    <header id="inicio" className="hero">
      <div className="container grid">
        <div>
          <h1>Hola! Soy Sofi</h1>

          <p style={{fontSize: 22, margin: "6px 0 8px"}}>
            Soy <strong>
              <Typewriter words={[
                "Analista de datos",
                "Amante de los michis",
                "Curiosa por los insights",
              ]}/>
            </strong>
          </p>

          <p className="subtitle">Estudiante de Informática (UBA)</p>
          <p className="subtitle" style={{marginTop: -6, display:"flex", alignItems:"center", gap:8}}>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
            </svg>
            Buenos Aires, Argentina
          </p>

          {/* Cita profesional */}
          <p className="quote">
            Aspiro a conectar y dejar una huella significativa en cada proyecto.
          </p>

          <div className="cta">
            <a className="btn" href="/cv/sofia-guzman.pdf" download>Descargar CV</a>
            <a className="btn github" href="https://github.com/sguzman06" target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn linkedin" href="https://www.linkedin.com/in/sguzman06/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* imagen anime, discreta */}
        <div style={{display:"flex", justifyContent:"center"}}>
          <img className="avatar" src="/img/sofi-anime.png" alt="Sofi estilo anime" />
        </div>
      </div>

      {/* orbes */}
      <div className="orb pink" />
      <div className="orb turq" />
      <div className="orb sun" />

      {/* micro orbes que aparecen/desaparecen */}
      <div className="orb micro pink m1" />
      <div className="orb micro turq m2" />
      <div className="orb micro pink m3" />
      <div className="orb micro sun  m4" />

    </header>
  );
}
