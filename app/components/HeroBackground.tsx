// Decorative grain overlay for the navy hero. Subtle texture so the dark
// section doesn't read as flat.
export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-hero-navy" />
      {/* Subtle noise via SVG to break up the flat gradient. */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
