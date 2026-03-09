import Typewriter from "../components/Typewriter";
import { useLang } from "../hooks/useLang";

export default function Home() {
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
              <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <span className="home__location-label">{t("home.locationLabel")}</span>
            <span>{t("home.location")}</span>
          </p>
          <p className="home__quote">{t("home.quote")}</p>
          <div className="home__actions">
            <a
              className="btn btn--primary"
              href="/cv/Guzman_Sofia_CV.pdf"
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
        <figure className="home__figure hero-media group perspective-1000 ml-[5px] flex justify-center md:justify-start">
          <div className="relative w-fit preserve-3d transition-transform duration-[800ms] group-hover:rotate-y-180">

            {/* Front: Avatar original con Marco Retro Neon */}
            <div className="backface-hidden z-20 relative rounded-3xl border-4 border-[#ff6fae] shadow-[0_0_25px_rgba(255,111,174,0.9)] animate-pulse group-hover:border-transparent group-hover:shadow-none transition-all duration-300">
              <img
                className="home__image rounded-[26px] relative z-10 block"
                src="/img/sofi-anime.png"
                srcSet="/img/sofi-anime.png 1x, /img/sofi-anime.png 2x"
                sizes="(min-width: 62rem) 360px, (min-width: 48rem) 300px, 70vw"
                alt={t("home.avatarAlt")}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Back: Carrusel iterativo (con textura de TV 80s) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#121216] overflow-hidden rounded-3xl flex items-center shadow-[0_0_20px_rgba(255,111,174,0.3)] border border-white/10 crt-overlay crt-vignette">
              <div className="flex h-[80%] w-max animate-scroll-carousel items-center">
                {/* 
                  10 fotos en total para un bucle matemático perfecto 
                  (2 sets exactos de 5 fotos. Al llegar al 50% de traslación, salta a 0 invisiblemente)
                */}
                {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((num, i) => (
                  <div key={i} className="h-full aspect-[4/3] px-[6px] flex-shrink-0">
                    <img
                      src={`/img/carrusel-${num}.jpg`}
                      className="w-full h-full object-cover rounded-2xl shadow-md border border-white/10"
                      alt={`Mi foto City Pop ${num}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </figure>
      </div>
    </section>
  );
}
