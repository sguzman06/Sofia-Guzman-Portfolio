import { useLang } from "../hooks/useLang";

type EducationCardData = {
  title: string;
  year: string;
  location: string;
  bullets: string[];
};

export default function Education(){
  const { t } = useLang();
  const card = t<EducationCardData>("education.card");

  return (
    <section id="education" className="section section--education" aria-labelledby="education-title">
      <div className="section__inner">
        <span className="section__kicker">{t("education.kicker")}</span>
        <h2 id="education-title" className="section__title">{t("education.title")}</h2>
        <article className="education-card">
          <div className="education-card__header">
            <h3 className="education-card__title">{card.title}</h3>
            <span className="education-card__year">{card.year}</span>
          </div>
          <p className="education-card__location">{card.location}</p>
          <ul className="education-card__list">
            {card.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
