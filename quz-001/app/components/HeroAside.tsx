// Right-rail aside content for the desktop hero. Reinforces the
// proprietary-mechanism wedge without distracting from the inline quiz.

import { caseStudies } from "@/lib/copy";

export default function HeroAside() {
  const featured = caseStudies[0];
  return (
    <aside className="hidden lg:block w-full max-w-sm">
      <div className="card p-6">
        <div className="flex items-center gap-2 text-[12px] font-medium text-[var(--color-brand-dark)] uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] brand-pulse" />
          Live now
        </div>
        <p className="mt-3 text-[14px] text-[var(--color-ink-soft)]">
          On the panel right now: businesses being matched across construction,
          e-commerce, services, manufacturing, and hospitality.
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-[var(--color-brand-tint)] p-3">
            <dt className="text-[11px] uppercase tracking-wide text-[var(--color-brand-dark)] font-medium">
              Approval rate
            </dt>
            <dd className="mt-0.5 text-[20px] font-semibold text-[var(--color-ink)]">93%</dd>
          </div>
          <div className="rounded-xl bg-[var(--color-brand-tint)] p-3">
            <dt className="text-[11px] uppercase tracking-wide text-[var(--color-brand-dark)] font-medium">
              Businesses funded
            </dt>
            <dd className="mt-0.5 text-[20px] font-semibold text-[var(--color-ink)]">142k+</dd>
          </div>
        </dl>
      </div>

      <div className="card mt-4 p-6">
        <div className="text-[11px] font-medium text-[var(--color-stone)] uppercase tracking-wide">
          Latest match
        </div>
        <h3 className="mt-2 text-[15px] font-semibold text-[var(--color-ink)] leading-snug">
          {featured.title}
        </h3>
        <div className="text-[13px] font-medium text-[var(--color-brand-dark)]">
          {featured.summary}
        </div>
        <p className="mt-3 text-[13px] text-[var(--color-ink-soft)] leading-relaxed italic border-l-2 border-[var(--color-brand)] pl-3">
          &ldquo;One call. One decision. Money in 24 hours.&rdquo;
        </p>
      </div>
    </aside>
  );
}
