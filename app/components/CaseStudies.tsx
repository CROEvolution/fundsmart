import { caseStudies } from "@/lib/copy";

export default function CaseStudies() {
  return (
    <section className="bg-[var(--color-page)]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="text-center">
          <div className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-[var(--color-green-dark)]">
            Real businesses. Real funding.
          </div>
          <h2 className="mt-3 text-[36px] md:text-[52px] leading-[1.02] font-bold tracking-tight text-[var(--color-navy)]">
            Our Case{" "}
            <span className="serif-italic text-[var(--color-green)]">Studies</span>
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-[var(--color-ink-soft)] max-w-2xl mx-auto">
            One application. One matched lender. No phone ringing off the hook.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
          {caseStudies.map((c, i) => (
            <article
              key={c.title}
              className="card-step p-6 md:p-7 flex flex-col"
            >
              <div className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-[var(--color-green-dark)]">
                Case {i + 1}
              </div>
              <h3 className="mt-2 text-[17px] font-bold text-[var(--color-navy)] leading-tight">
                {c.title}
              </h3>
              <div className="mt-1 text-[14px] font-semibold text-[var(--color-green-dark)]">
                {c.summary}
              </div>
              <p className="mt-4 text-[14px] text-[var(--color-ink-soft)] leading-relaxed border-l-2 border-[var(--color-green)] pl-4 italic">
                &ldquo;{c.quote}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
