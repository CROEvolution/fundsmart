export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 19L8 14L12 17L16 11L21 13"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="21" cy="13" r="2.2" fill="#22c55e" />
            </svg>
            <span className="text-[16px] font-bold tracking-tight text-white">Fundsmart</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />
              FCA-regulated brokerage
            </span>
            <span>100+ lenders</span>
            <span>Soft search only</span>
            <span>Data never sold</span>
          </div>
        </div>
        <p className="mt-7 max-w-4xl text-[12px] text-white/55 leading-relaxed">
          Fundsmart AI is a credit broker, not a lender. Loans, lines of credit, asset finance, and invoice finance are
          provided by FCA-regulated lender partners. Terms, fees, and eligibility set by each lender. By starting the
          Funding Fitness check you agree to a soft credit search, which has no impact on your credit score. We do not
          sell or share your data with third-party marketers.
        </p>
      </div>
    </footer>
  );
}
