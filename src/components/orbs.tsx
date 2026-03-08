export default function Orbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Orbe celeste grande (abajo-izquierda) */}
      <div className="motion-safe:animate-blob absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-[#8ECAE6]/35 blur-3xl" />

      {/* Orbe rosa grande (arriba-derecha) */}
      <div className="motion-safe:animate-blob absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-[#ff6ec7]/30 blur-3xl animation-delay-2000" />

      {/* Orbe amarillo suave (centro-izquierda) */}
      <div className="motion-safe:animate-blob absolute top-1/3 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#FFB703]/25 blur-3xl animation-delay-4000" />
    </div>
  );
}
