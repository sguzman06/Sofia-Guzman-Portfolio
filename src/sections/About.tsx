import RichText from "../components/RichText";
import { useLang } from "../hooks/useLang";

type AboutCard = {
  title: string;
  items: string[];
  internshipTitle: string;
  internshipSummary: string;
};

export default function About(){
  const { t } = useLang();
  const paragraphs = t<string[]>("about.paragraphs");
  const interestsTitle = t<string>("about.interestsTitle");
  const interests = t<string[]>("about.interests");
  const card = t<AboutCard>("about.card");

  return (
    <section id="about" className="section section--about" aria-labelledby="about-title">
      <div className="section__inner">
        <span className="section__kicker">{t("about.kicker")}</span>
        <h2 id="about-title" className="section__title">{t("about.title")}</h2>
        <p className="section__note">{t("about.note")}</p>
        <div className="about__grid">
          <div className="about__text">
            {paragraphs.map((paragraph) => (
              <RichText key={paragraph} value={paragraph} as="p" className="about__paragraph" />
            ))}
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">{interestsTitle}</h3>
              <ul className="space-y-4">
                {interests.map((interest, idx) => (
                  <li key={idx} className="text-[0.95rem] leading-relaxed">
                    <RichText value={interest} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="about__card" aria-label={card.title}>
            <h3 className="about__card-title">{card.title}</h3>
            <ul className="about__card-list">
              {card.items.map((item) => (
                <li key={item}>
                  <RichText value={item} />
                </li>
              ))}
            </ul>
            <div className="about__card-divider" aria-hidden="true" />
            <h3 className="about__card-subtitle">{card.internshipTitle}</h3>
            <RichText value={card.internshipSummary} as="p" className="about__card-summary" />
          </aside>
        </div>
      </div>
    </section>
  );
}
