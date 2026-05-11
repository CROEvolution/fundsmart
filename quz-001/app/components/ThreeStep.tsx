import { threeStep } from "@/lib/copy";

export default function ThreeStep() {
  return (
    <section className="bg-[var(--color-page)]">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="text-center">
          <div className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-green-dark)]">
            How it works
          </div>
          <h2 className="mt-3 text-[36px] md:text-[52px] leading-[1.02] font-bold tracking-tight text-[var(--color-navy)]">
            From Tight to{" "}
            <span className="serif-italic text-[var(--color-green)]">Funded</span>
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-[var(--color-ink-soft)] max-w-2xl mx-auto">
            Seven quick questions. One matched lender. Approval in as little as 1 hour.
          </p>
        </div>

        {/* Timeline */}
        <ol className="mt-14 relative">
          {/* Vertical line */}
          <div
            aria-hidden
            className="hidden md:block absolute left-[27px] top-2 bottom-2 w-px border-l-2 border-dashed border-[var(--color-line)]"
          />

          {threeStep.steps.map((s, i) => (
            <li key={s.n} className="relative md:pl-20 mb-6 last:mb-0">
              {/* Timeline dot */}
              <div
                aria-hidden
                className="hidden md:flex absolute left-0 top-7 w-14 h-14 rounded-full bg-white border-4 border-[var(--color-mint)] items-center justify-center text-[var(--color-green-dark)] font-bold text-[16px]"
              >
                {s.n}
              </div>

              <div className="card-step p-6 md:p-7 flex flex-col md:flex-row md:items-start gap-4">
                {/* Icon tile (mobile-visible) */}
                <div className="icon-tile flex-shrink-0">
                  <StepIcon n={i} />
                </div>
                <div className="flex-1">
                  <div className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-green-dark)]">
                    Step {s.n}
                  </div>
                  <h3 className="mt-1 text-[20px] md:text-[22px] font-bold text-[var(--color-navy)] leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepIcon({ n }: { n: number }) {
  // Eye / target / clock — same family as /landinggov step icons.
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  if (n === 0)
    return (
      <svg {...common}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  if (n === 1)
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
