import { useEffect, useState } from "react";

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
  const [i, setI] = useState(0);      // índice palabra
  const [text, setText] = useState(""); 
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    if (!del && text.length < word.length) {
      const t = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
      return () => clearTimeout(t);
    }
    if (!del && text.length === word.length) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text.length > 0) {
      const t = setTimeout(() => setText(word.slice(0, text.length - 1)), deletingSpeed);
      return () => clearTimeout(t);
    }
    if (del && text.length === 0) {
      setDel(false);
      setI(prev => (prev + 1) % words.length);
    }
  }, [text, del, i, words, typingSpeed, deletingSpeed, pause]);

  return <span>{text}<span className="caret">|</span></span>;
}
