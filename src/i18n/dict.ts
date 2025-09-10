// src/i18n/dict.ts
export type Lang = "es" | "en";

export const dict: Record<Lang, Record<string, string>> = {
  es: {
    "nav.inicio": "inicio",
    "nav.about": "sobre mi",
    "nav.skills": "skills",
    "nav.projects": "proyectos",
    "nav.experience": "experiencia",
    "nav.education": "educacion",
    "nav.contact": "contactos",
  },
  en: {
    "nav.inicio": "home",
    "nav.about": "about",
    "nav.skills": "skills",
    "nav.projects": "projects",
    "nav.experience": "experience",
    "nav.education": "education",
    "nav.contact": "contact",
  },
};
