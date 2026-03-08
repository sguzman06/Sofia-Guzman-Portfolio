import RichText from "../components/RichText";
import { useLang } from "../hooks/useLang";
import { Figma, Linkedin } from "lucide-react";

type CaseStudy = {
  badge: string;
  title: string;
  subtitle: string;
  problemTitle: string;
  problem: string;
  approachTitle: string;
  approach: string[];
  stackTitle: string;
  stack: string[];
  resultsTitle: string;
  results: string[];
  ctaLabel: string;
  ctaTitle: string;
  ctaUrl?: string;
  linkedinLabel?: string;
  linkedinUrl?: string;
  gallery?: string[];
};

type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  location?: string;
  bullets: string[];
};

export default function Experience(){
  const { t } = useLang();
  const caseStudy = t<CaseStudy>("experience.case");
  const timeline = t<TimelineEntry[]>("experience.timeline");

  return (
    <section id="experience" className="section section--experience" aria-labelledby="experience-title">
      <div className="section__inner">
        <span className="section__kicker">{t("experience.kicker")}</span>
        <h2 id="experience-title" className="section__title">{t("experience.title")}</h2>
        <article className="case-card" aria-labelledby="case-study-title">
          <div className="case-card__head">
            <span className="case-card__badge">{caseStudy.badge}</span>
            <h3 id="case-study-title" className="case-card__title">{caseStudy.title}</h3>
            <p className="case-card__subtitle">{caseStudy.subtitle}</p>
          </div>
          <div className="case-card__grid">
            <div>
              <h4 className="case-card__section-title">{caseStudy.problemTitle}</h4>
              <RichText value={caseStudy.problem} as="p" className="case-card__paragraph" />
              <h4 className="case-card__section-title">{caseStudy.approachTitle}</h4>
              <ul className="case-card__list">
                {caseStudy.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="case-card__section-title">{caseStudy.stackTitle}</h4>
              <div className="chip-list">
                {caseStudy.stack.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
              <h4 className="case-card__section-title">{caseStudy.resultsTitle}</h4>
              <ul className="case-card__list">
                {caseStudy.results.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mt-4">
                <a 
                  href={caseStudy.ctaUrl !== "#" ? caseStudy.ctaUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${caseStudy.ctaUrl === "#" ? "opacity-50 cursor-not-allowed" : "btn--primary"}`}
                  title={caseStudy.ctaTitle}
                >
                  <Figma size={18} />
                  {caseStudy.ctaLabel}
                </a>
                {caseStudy.linkedinUrl && (
                  <a 
                    href={caseStudy.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost text-sm h-full"
                    title={caseStudy.linkedinLabel}
                  >
                    <Linkedin size={18} />
                    {caseStudy.linkedinLabel}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Gallery / Media Section */}
          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caseStudy.gallery.map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 group">
                  <img 
                    src={imgUrl} 
                    alt={`Preview ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          )}
        </article>
        <div className="timeline">
          {timeline.map((entry) => (
            <article key={`${entry.role}-${entry.period}`} className="timeline__item">
              <div className="timeline__dot" aria-hidden="true" />
              <div className="timeline__content">
                <div className="timeline__header">
                  <h3 className="timeline__title">{entry.role}</h3>
                  <span className="timeline__period">{entry.period}</span>
                </div>
                <p className="timeline__org">
                  {entry.org}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                <ul className="timeline__list">
                  {entry.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
