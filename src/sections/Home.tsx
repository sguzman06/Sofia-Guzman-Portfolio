import Typewriter from "../components/Typewriter";
import { useLang } from "../hooks/useLang";

export default function Home(){
  const { t } = useLang();
  const words = t<string[]>("home.typewriterWords");
  const cta = t<Record<string, string>>("home.cta");

  return (
    <section id="home" 
    className="section section--home hero hero--full hero--center citypop-hero" 
    aria-labelledby="home-title">
      <div className="section__inner home__grid hero-grid">
        <div className="home__content hero-text">
          <h1 id="home-title" className="home__title">{t("home.title")}</h1>
          <p className="home__type">
            <span className="home__type-prefix">{t("home.typewriterPrefix")}</span>{" "}
            <strong><Typewriter words={words} /></strong>
          </p>
          <p className="home__subtitle">{t("home.subtitle")}</p>
          <p className="home__location">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/>
            </svg>
            <span className="home__location-label">{t("home.locationLabel")}</span>
            <span>{t("home.location")}</span>
          </p>
          <p className="home__quote">{t("home.quote")}</p>
          <div className="home__actions">
            <a
              className="btn btn--primary"
              href="/cv/sofia-guzman.pdf"
              download
              aria-label={t("home.downloadAria")}
            >
              {cta.download}
            </a>
            <a
              className="btn btn--ghost"
              href="https://github.com/sguzman06"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cta.github}. ${t("common.externalNewTab")}`}
            >
              {cta.github}
            </a>
            <a
              className="btn btn--ghost"
              href="https://www.linkedin.com/in/sguzman06/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cta.linkedin}. ${t("common.externalNewTab")}`}
            >
              {cta.linkedin}
            </a>
          </div>
        </div>
        <figure className="home__figure hero-media">
          <img
            className="home__image"
            src="/img/sofi-anime.png"
            srcSet="/img/sofi-anime.png 1x, /img/sofi-anime.png 2x"
            sizes="(min-width: 62rem) 360px, (min-width: 48rem) 300px, 70vw"
            alt={t("home.avatarAlt")}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
