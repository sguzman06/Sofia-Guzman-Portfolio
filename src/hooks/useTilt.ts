import { useRef } from "react";

export function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    const rx = (0.5 - py) * 2 * maxDeg;          // -max..max
    const ry = (px - 0.5) * 2 * maxDeg;          // -max..max
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  }
  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  }

  return { ref, onMouseMove, onMouseLeave };
}
