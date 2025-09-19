import { useMemo, useState } from "react";
import { useLang } from "../hooks/useLang";

type ProjectFilter = { id: string; label: string };

type ProjectCard = {
  id: string;
  title: string;
  year: string;
  summary: string;
  tags: string[];
  status?: string;
  badge?: string;
  viewUrl?: string | null;
  repoUrl?: string | null;
};

export default function Projects(){
  const { t } = useLang();
  const filters = t<ProjectFilter[]>("projects.filters");
  const projects = t<ProjectCard[]>("projects.cards");
  const links = t<Record<string, string>>("projects.links");
  const [activeFilter, setActiveFilter] = useState(() => filters[0]?.id ?? "all");

  const tagLabels = useMemo(() => new Map(filters.map((filter) => [filter.id, filter.label])), [filters]);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }
    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="section section--projects" aria-labelledby="projects-title">
      <div className="section__inner">
        <span className="section__kicker">{t("projects.kicker")}</span>
        <h2 id="projects-title" className="section__title">{t("projects.title")}</h2>
        <div className="projects__filters" role="group" aria-label={t("projects.kicker")}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`chip${activeFilter === filter.id ? " is-active" : ""}`}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="projects__grid">
          {visibleProjects.map((project) => {
            const isUpcoming = project.status === "upcoming";
            return (
              <article key={project.id} className={`project-card${isUpcoming ? " project-card--upcoming" : ""}`}>
                <div className="project-card__cover" aria-hidden="true">
                  <div className="project-card__placeholder" />
                  {isUpcoming && project.badge && <span className="project-card__badge">{project.badge}</span>}
                </div>
                <div className="project-card__body">
                  <div className="project-card__header">
                    <h3 className="project-card__title">{project.title}</h3>
                    <span className="project-card__year">{project.year}</span>
                  </div>
                  <p className="project-card__summary">{project.summary}</p>
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={`${project.id}-${tag}`} className="chip chip--ghost">
                        {tagLabels.get(tag) ?? tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-card__actions">
                    {project.viewUrl && project.viewUrl !== "#" && (
                      <a
                        className="btn btn--ghost"
                        href={project.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${links.view} · ${project.title}. ${t("common.externalNewTab")}`}
                      >
                        {links.view}
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        className="btn btn--ghost"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${links.repo} · ${project.title}. ${t("common.externalNewTab")}`}
                      >
                        {links.repo}
                      </a>
                    )}
                    {isUpcoming && (
                      <span className="project-card__hint">{links.upcoming}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
