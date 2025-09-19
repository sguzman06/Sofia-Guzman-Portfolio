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
  const chips = t<string[]>("about.chips");
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
            <div className="chip-list" aria-label={t("about.kicker")}>
              {chips.map((chip) => (
                <span className="chip" key={chip}>{chip}</span>
              ))}
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
