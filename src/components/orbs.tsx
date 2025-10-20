export default function Orbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="motion-safe:animate-blob absolute -top-24 -left-24 h-72 w-72 rounded-full bg-neon-pink/30 blur-3xl" />
      <div className="motion-safe:animate-blob absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-neon-cyan/25 blur-3xl animation-delay-2000" />
      <div className="motion-safe:animate-blob absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-space-light/30 blur-3xl animation-delay-4000" />
    </div>
  );
}
