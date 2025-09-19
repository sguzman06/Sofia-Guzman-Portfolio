import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type Props = {
  words: string[];
  typingSpeed?: number;   // ms por letra al escribir
  deletingSpeed?: number; // ms por letra al borrar
  pause?: number;         // pausa al final de cada palabra
};

export default function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pause = 1100,
}: Props){
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() => words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce || words.length === 0) {
      return;
    }
    const currentWord = words[index % words.length];
    if (!deleting && text.length < currentWord.length) {
      const timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed);
      return () => clearTimeout(timeout);
    }
    if (!deleting && text.length === currentWord.length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }
    if (deleting && text.length > 0) {
      const timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), deletingSpeed);
      return () => clearTimeout(timeout);
    }
    if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause, reduce]);

  if (reduce || words.length === 0) {
    const fallback = words[0] ?? "";
    return (
      <span className="typewriter" aria-live="off">
        <span aria-hidden="true">{fallback}</span>
        <span className="sr-only">{fallback}</span>
      </span>
    );
  }

  const visibleWord = words[index % words.length] ?? "";

  return (
    <span className="typewriter" aria-live="off">
      <span aria-hidden="true">{text}<span className="caret">|</span></span>
      <span className="sr-only">{visibleWord}</span>
    </span>
  );
}
