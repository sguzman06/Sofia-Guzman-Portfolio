import { useEffect } from "react";
import { useLang } from "../hooks/useLang";

const CANONICAL_URL = "https://sofiaguzman.dev/";

function setMetaName(name: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (element) {
    element.setAttribute("content", content);
  }
}

function setMetaProperty(property: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (element) {
    element.setAttribute("content", content);
  }
}

export default function SeoHead() {
  const { t, lang } = useLang();

  useEffect(() => {
    const title = t("meta.title");
    document.title = title;
    setMetaName("description", t("meta.description"));
    setMetaName("keywords", t("meta.keywords"));
    setMetaProperty("og:title", t("meta.ogTitle"));
    setMetaProperty("og:description", t("meta.ogDescription"));
    setMetaProperty("og:locale", t("meta.locale"));
    setMetaProperty("og:url", CANONICAL_URL);
    const canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (canonical) {
      canonical.href = CANONICAL_URL;
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [t, lang]);

  return null;
}
