import Typewriter from "../components/Typewriter";
import RichText from "../components/RichText";
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
          <RichText value={t("home.quote")} className="home__quote mb-[3px] block" as="p" />
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
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              className="btn btn--ghost"
              href="https://www.linkedin.com/in/sguzman06/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cta.linkedin}. ${t("common.externalNewTab")}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
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
