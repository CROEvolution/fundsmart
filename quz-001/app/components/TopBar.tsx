export default function TopBar() {
  return (
    <header className="bg-[var(--color-navy)] border-b border-[var(--color-navy-line)] sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-3.5 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <Logo />
          <span className="text-[17px] font-bold tracking-tight text-white">
            Fundsmart
          </span>
        </a>
        <a href="#quiz" className="btn-nav">
          Get Started
        </a>
      </div>
    </header>
  );
}

function Logo() {
  // Compact upward-trend chart mark on a transparent BG. Renders crisp in nav.
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 19L8 14L12 17L16 11L21 13"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 19L8 14L12 17L16 11"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.0"
      />
      <circle cx="21" cy="13" r="2.2" fill="#22c55e" />
    </svg>
  );
}
