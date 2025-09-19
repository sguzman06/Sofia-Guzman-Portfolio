import { createElement, useMemo } from "react";

type ElementTag = keyof HTMLElementTagNameMap;

type Props = {
  value: string;
  as?: ElementTag;
  className?: string;
};

function transformMarkup(value: string) {
  return value
    .replace(/\[strong\]/g, "<strong>")
    .replace(/\[\/strong\]/g, "</strong>")
    .replace(/\[em\]/g, "<em>")
    .replace(/\[\/em\]/g, "</em>")
    .replace(/\n/g, "<br />");
}

export default function RichText({ value, as = "span", className }: Props) {
  const html = useMemo(() => transformMarkup(value), [value]);
  return createElement(as, { className, dangerouslySetInnerHTML: { __html: html } });
}
