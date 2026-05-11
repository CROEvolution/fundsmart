"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  contact,
  hero,
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  score as scoreCopy,
  success as successCopy,
} from "@/lib/copy";
import {
  calculateScore,
  fundingRange,
  formatGBP,
  initialState,
  mockCompanies,
  percentile,
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  Q6,
  QuizState,
  scoreReasons,
  searchCompanies,
  Step,
} from "@/lib/state";

export default function QuizFlow() {
  const [state, setState] = useState<QuizState>(initialState);
  const modalOpen = state.step !== "inline";

  // Lock body scroll while modal is open.
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const set = (patch: Partial<QuizState>) => setState((s) => ({ ...s, ...patch }));
  const goto = (step: Step) => set({ step });

  return (
    <>
      <HeroCard state={state} set={set} goto={goto} />
      {modalOpen && <Modal state={state} set={set} goto={goto} />}
    </>
  );
}

// ---------------------------------------------------------------------------
// Hero card with inline Q1 + Q2 pre-step.

function HeroCard({
  state,
  set,
  goto,
}: {
  state: QuizState;
  set: (p: Partial<QuizState>) => void;
  goto: (s: Step) => void;
}) {
  const q1Selected = state.q1;
  const q2Selected = state.q2;
  const hoveredQ1 = useHoverChip<Q1>();
  const microQ1 = hoveredQ1.hovered ?? state.q1;

  const canAdvance = q1Selected && q2Selected;
  const startQuiz = () => goto("q3");

  // Headline split. The last fragment gets the serif-italic accent treatment
  // (matches /landinggov "Why It Works" + "Our Case Studies" pattern).
  // We use the dot before "No comparison-site cowboys" as the split point so
  // the italic word is "cowboys" — that's the line that does the work.
  return (
    <section className="text-center max-w-3xl mx-auto w-full">
      <h1 className="text-[40px] leading-[1.05] md:text-[64px] md:leading-[1.02] font-bold tracking-[-0.02em] text-white">
        One matched lender.
        <br />
        One soft search.
        <br />
        <span className="text-white/95">No comparison-site </span>
        <span className="serif-italic text-[var(--color-green)]">cowboys.</span>
      </h1>
      <p className="mt-6 text-[15px] md:text-[17px] text-white/75 leading-relaxed max-w-2xl mx-auto">
        {hero.sub}
      </p>

      {/* White card embedded on navy hero */}
      <div className="card-hero mt-10 p-6 md:p-8 max-w-xl mx-auto text-left">
        {/* Top progress strip (matches /landinggov gradient bar) */}
        <div className="-mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 h-1.5 progress-grad rounded-t-3xl" />

        <div>
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-green-deep)]">
              Step 1 of 7
            </div>
            <div className="text-[12px] text-[var(--color-stone)]">2-minute check</div>
          </div>
          <h2 className="mt-2 text-[18px] md:text-[20px] font-bold text-[var(--color-ink)] leading-tight">
            {q1.label}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {q1.options.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className="chip"
                data-selected={q1Selected === opt.value}
                onClick={() => set({ q1: opt.value })}
                onMouseEnter={() => hoveredQ1.setHovered(opt.value)}
                onMouseLeave={() => hoveredQ1.setHovered(null)}
                onFocus={() => hoveredQ1.setHovered(opt.value)}
                onBlur={() => hoveredQ1.setHovered(null)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div
            className="mt-3 min-h-[20px] text-[12.5px] text-[var(--color-green-deep)] fade-in"
            key={microQ1 ?? "empty"}
          >
            {microQ1 ? q1.options.find((o) => o.value === microQ1)?.micro : null}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--color-line)]">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-green-deep)]">
              Step 2 of 7
            </div>
            <div className="text-[12px] text-[var(--color-stone)]">{q2.sub}</div>
          </div>
          <h2 className="mt-2 text-[18px] md:text-[20px] font-bold text-[var(--color-ink)] leading-tight">
            {q2.label}
          </h2>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {q2.options.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className="chip"
                data-selected={q2Selected === opt.value}
                onClick={() => set({ q2: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="btn-primary w-full"
            disabled={!canAdvance}
            onClick={startQuiz}
          >
            Continue to my Funding Fitness Score
            <Arrow />
          </button>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-[var(--color-stone)]">
            <Lock />
            Soft search only. No impact on your credit score.
          </div>
        </div>
      </div>

      {/* Trust pills row below the white card, on the navy BG */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {hero.trust.map((t, i) => (
          <span key={t} className="pill-dark">
            <span className="pill-dot" />
            <span>{shortTrust(t, i)}</span>
          </span>
        ))}
      </div>

      {/* Big stat */}
      <div className="mt-10 md:mt-12">
        <div className="text-[44px] md:text-[64px] font-bold tracking-tight text-white leading-none">
          142,468
        </div>
        <p className="mt-2 text-[14px] text-white/70">
          UK businesses funded through Fundsmart&apos;s 100+ lender panel
        </p>
      </div>
    </section>
  );
}

// Compress hero.trust copy into pill labels.
function shortTrust(t: string, i: number): string {
  // Map our long-form trust bullets to short pill chips that read well
  // in the dark-pill format. Keeps the source copy untouched in copy.ts.
  const shorts = [
    "No credit impact",
    "Matched to one lender",
    "Funded in as soon as 4 hours",
  ];
  return shorts[i] ?? t;
}

function Lock() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 7V5a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Modal shell.

function Modal({
  state,
  set,
  goto,
}: {
  state: QuizState;
  set: (p: Partial<QuizState>) => void;
  goto: (s: Step) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // ESC closes the modal but only when we're not on the success step.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.step !== "success") goto("inline");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state.step, goto]);

  const progress = stepProgress(state.step);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[rgba(11,22,32,0.55)] backdrop-blur-sm"
      ref={containerRef}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full md:max-w-xl md:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Sticky trust bar + progress */}
        <div className="px-5 md:px-7 pt-4 pb-3 border-b border-[var(--color-line)] bg-[var(--color-mint-soft)]">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[12px] font-medium text-[var(--color-green-deep)] flex flex-wrap gap-x-3 gap-y-1">
              <span>✓ 100+ FCA-regulated lenders</span>
              <span>🛡 Soft search only</span>
              <span>🔒 Data never sold</span>
            </div>
            {state.step !== "success" && (
              <button
                type="button"
                aria-label="Close"
                className="text-[var(--color-stone)] hover:text-[var(--color-ink)] cursor-pointer"
                onClick={() => goto("inline")}
              >
                ✕
              </button>
            )}
          </div>
          <div className="mt-3 h-1.5 bg-white/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-green-deep)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-5 md:p-7 fade-in" key={state.step}>
          {state.step === "q3" && (
            <ChipQuestion
              n={3}
              label={q3.label}
              micro={q3.micro}
              options={q3.options}
              value={state.q3}
              onSelect={(v) => set({ q3: v as Q3 })}
              onNext={() => goto("q4")}
            />
          )}
          {state.step === "q4" && (
            <ChipQuestion
              n={4}
              label={q4.label}
              micro={q4.micro}
              options={q4.options}
              value={state.q4}
              onSelect={(v) => {
                set({ q4: v as Q4 });
                const opt = q4.options.find((o) => o.value === v);
                if (opt && "offRamp" in opt && opt.offRamp) {
                  setTimeout(() => goto("q4-offramp"), 220);
                } else {
                  setTimeout(() => goto("q5"), 220);
                }
              }}
            />
          )}
          {state.step === "q4-offramp" && (
            <OffRamp copy={q4.offRamp} onBack={() => goto("q4")} />
          )}
          {state.step === "q5" && (
            <ChipQuestion
              n={5}
              label={q5.label}
              micro={q5.micro}
              options={q5.options}
              value={state.q5}
              onSelect={(v) => {
                set({ q5: v as Q5 });
                const opt = q5.options.find((o) => o.value === v);
                if (opt && "offRamp" in opt && opt.offRamp) {
                  setTimeout(() => goto("q5-offramp"), 220);
                } else {
                  setTimeout(() => goto("q6"), 220);
                }
              }}
            />
          )}
          {state.step === "q5-offramp" && (
            <OffRamp copy={q5.offRamp} onBack={() => goto("q5")} />
          )}
          {state.step === "q6" && (
            <ChipQuestion
              n={6}
              label={q6.label}
              micro={q6.micro}
              options={q6.options}
              value={state.q6}
              onSelect={(v) => set({ q6: v as Q6 })}
              onNext={() => goto("q7")}
            />
          )}
          {state.step === "q7" && (
            <CompanyLookup state={state} set={set} onNext={() => goto("score")} />
          )}
          {state.step === "score" && (
            <ScoreReveal state={state} onContinue={() => goto("contact")} />
          )}
          {state.step === "contact" && (
            <ContactStep state={state} set={set} onSubmitted={() => goto("success")} />
          )}
          {state.step === "success" && <Success />}
        </div>
      </div>
    </div>
  );
}

function stepProgress(step: Step): number {
  const map: Record<Step, number> = {
    inline: 0,
    q3: 35,
    q4: 45,
    "q4-offramp": 45,
    q5: 55,
    "q5-offramp": 55,
    q6: 65,
    q7: 78,
    score: 88,
    contact: 95,
    success: 100,
  };
  return map[step];
}

// ---------------------------------------------------------------------------
// Generic chip question.

type Option = { value: string; label: string };

function ChipQuestion({
  n,
  label,
  micro,
  options,
  value,
  onSelect,
  onNext,
}: {
  n: number;
  label: string;
  micro?: string;
  options: readonly Option[];
  value: string | null;
  onSelect: (v: string) => void;
  onNext?: () => void;
}) {
  return (
    <div>
      <div className="text-[12px] font-medium uppercase tracking-wide text-[var(--color-stone)]">
        Step {n} of 7
      </div>
      <h2 className="mt-1 text-[20px] md:text-[22px] font-semibold text-[var(--color-ink)] leading-tight">
        {label}
      </h2>
      {micro && (
        <p className="mt-2 text-[13.5px] text-[var(--color-ink-soft)] leading-relaxed">
          {micro}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            type="button"
            key={opt.value}
            className="chip"
            data-selected={value === opt.value}
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {onNext && (
        <div className="mt-6">
          <button
            type="button"
            className="btn-primary"
            disabled={!value}
            onClick={onNext}
          >
            Continue
            <Arrow />
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Off-ramp.

function OffRamp({
  copy,
  onBack,
}: {
  copy: { headline: string; body: string; cta: string; coda: string };
  onBack: () => void;
}) {
  return (
    <div className="text-center md:text-left">
      <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-mint-soft)] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[var(--color-green-deep)]">
        Honest answer
      </div>
      <h2 className="mt-3 text-[20px] md:text-[22px] font-semibold text-[var(--color-ink)] leading-snug">
        {copy.headline}
      </h2>
      <p className="mt-3 text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed">
        {copy.body}
      </p>
      <div className="mt-5 flex flex-col md:flex-row md:items-center gap-3">
        <a
          href="https://www.fca.org.uk/firms"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          {copy.cta}
          <Arrow />
        </a>
        <button type="button" className="btn-ghost" onClick={onBack}>
          ← Change my answer
        </button>
      </div>
      <p className="mt-4 text-[13px] text-[var(--color-stone)] italic">{copy.coda}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Companies House mock lookup.

function CompanyLookup({
  state,
  set,
  onNext,
}: {
  state: QuizState;
  set: (p: Partial<QuizState>) => void;
  onNext: () => void;
}) {
  const [query, setQuery] = useState(state.q7?.name ?? "");
  const results = useMemo(() => searchCompanies(query), [query]);
  const selected = state.q7;

  return (
    <div>
      <div className="text-[12px] font-medium uppercase tracking-wide text-[var(--color-stone)]">
        Step 7 of 7
      </div>
      <h2 className="mt-1 text-[20px] md:text-[22px] font-semibold text-[var(--color-ink)] leading-tight">
        {q7.label}
      </h2>
      <p className="mt-2 text-[13.5px] text-[var(--color-ink-soft)] leading-relaxed">
        {q7.sub}
      </p>

      <div className="mt-5">
        <div className="relative">
          <input
            type="text"
            value={selected ? selected.name : query}
            disabled={!!selected}
            onChange={(e) => {
              setQuery(e.target.value);
              if (state.q7) set({ q7: null });
            }}
            placeholder={q7.placeholder}
            className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3.5 text-[15px] placeholder-[var(--color-stone)] outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-mint-soft)] disabled:bg-[var(--color-mint-soft)] disabled:font-medium disabled:text-[var(--color-ink)]"
          />
          {!selected && query.length >= 2 && results.length > 0 && (
            <div className="absolute z-10 mt-2 w-full rounded-2xl border border-[var(--color-line)] bg-white shadow-xl overflow-hidden">
              <div className="px-3 py-2 text-[11px] uppercase tracking-wide text-[var(--color-stone)] bg-[var(--color-mint-soft)]/40">
                <span className="brand-pulse">●</span> Live Companies House search
              </div>
              {results.map((c) => (
                <button
                  type="button"
                  key={c.number}
                  className="w-full text-left px-4 py-3 hover:bg-[var(--color-mint-soft)] border-t border-[var(--color-line)] cursor-pointer"
                  onClick={() => {
                    set({ q7: c });
                    setQuery(c.name);
                  }}
                >
                  <div className="text-[14.5px] font-medium text-[var(--color-ink)]">
                    {c.name}
                  </div>
                  <div className="text-[12.5px] text-[var(--color-stone)]">
                    Company no. {c.number} · {c.address}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className="mt-3 rounded-2xl bg-[var(--color-mint-soft)] border border-[var(--color-mint)] p-4">
            <div className="text-[13px] font-medium text-[var(--color-green-deep)] uppercase tracking-wide">
              ✓ Matched on Companies House
            </div>
            <div className="mt-1 text-[15px] font-semibold text-[var(--color-ink)]">
              {selected.name}
            </div>
            <div className="text-[13px] text-[var(--color-ink-soft)]">
              Company no. {selected.number} · {selected.address}
            </div>
            <button
              type="button"
              className="mt-2 text-[12.5px] underline text-[var(--color-stone)] hover:text-[var(--color-ink)] cursor-pointer"
              onClick={() => set({ q7: null })}
            >
              Not this one
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-[var(--color-stone)]">
          {q7.proofRow.map((p) => (
            <span key={p.text}>
              <span className="mr-1">{p.icon}</span>
              {p.text}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px]">
          <button className="underline text-[var(--color-stone)] hover:text-[var(--color-ink)] cursor-pointer" type="button">
            {q7.bailOut} →
          </button>
          <button className="underline text-[var(--color-stone)] hover:text-[var(--color-ink)] cursor-pointer" type="button">
            {q7.soleTrader} →
          </button>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="btn-primary"
          disabled={!selected}
          onClick={onNext}
        >
          See my Funding Fitness Score
          <Arrow />
        </button>
        {!selected && query.length < 2 && (
          <p className="mt-2 text-[12px] text-[var(--color-stone)]">
            Tip for the demo: try typing &quot;Inn&quot;, &quot;Northwest&quot;, or &quot;Fund&quot;.
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Score reveal.

function ScoreReveal({
  state,
  onContinue,
}: {
  state: QuizState;
  onContinue: () => void;
}) {
  const s = calculateScore(state);
  const reasons = scoreReasons(state);
  const range = fundingRange(state);
  const tier = percentile(state);

  return (
    <div>
      <div className="text-[12px] font-medium uppercase tracking-wide text-[var(--color-green-deep)]">
        Your matched result
      </div>
      <h2 className="mt-1 text-[24px] md:text-[28px] font-semibold text-[var(--color-ink)] leading-tight">
        Your Funding Fitness Score:{" "}
        <span className="text-[var(--color-green-deep)]">{s} / 100</span>
      </h2>
      <p className="mt-2 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
        {scoreCopy.sub}{" "}
        <span className="font-medium text-[var(--color-ink)]">
          You&apos;re in the {tier} of approved applicants.
        </span>
      </p>

      <div className="mt-5 rounded-2xl border border-[var(--color-line)] p-4 bg-[var(--color-mint-soft)]/40">
        <div className="text-[12.5px] font-medium uppercase tracking-wide text-[var(--color-green-deep)]">
          Three strongest reasons
        </div>
        <ul className="mt-2 space-y-2">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2 text-[14px] text-[var(--color-ink-soft)]">
              <Check />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-2xl border-2 border-[var(--color-green)] bg-white p-5">
        <div className="text-[12.5px] uppercase tracking-wide font-medium text-[var(--color-stone)]">
          Indicative funding range
        </div>
        <div className="mt-1 text-[26px] md:text-[30px] font-semibold text-[var(--color-ink)] leading-tight">
          {formatGBP(range.low)} to {formatGBP(range.high)}
        </div>
        <div className="mt-1 text-[12.5px] text-[var(--color-stone)]">
          Soft search only. Not a binding offer. Your matched lender confirms terms.
        </div>
      </div>

      <div className="mt-6">
        <button type="button" className="btn-primary w-full md:w-auto" onClick={onContinue}>
          {scoreCopy.cta}
          <Arrow />
        </button>
        <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4">
          {scoreCopy.trust.map((t) => (
            <li key={t} className="trust-row text-[12.5px]">
              <Check />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Contact step.

function ContactStep({
  state,
  set,
  onSubmitted,
}: {
  state: QuizState;
  set: (p: Partial<QuizState>) => void;
  onSubmitted: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    state.name.trim().length >= 2 &&
    /.+@.+\..+/.test(state.email) &&
    state.phone.replace(/\D/g, "").length >= 9;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...state,
        score: calculateScore(state),
        range: fundingRange(state),
        submittedAt: new Date().toISOString(),
      };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      onSubmitted();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-[12px] font-medium uppercase tracking-wide text-[var(--color-stone)]">
        Last step
      </div>
      <h2 className="mt-1 text-[22px] md:text-[24px] font-semibold text-[var(--color-ink)] leading-tight">
        {contact.headline}
      </h2>
      <p className="mt-2 text-[13.5px] text-[var(--color-ink-soft)] leading-relaxed">
        {contact.sub}
      </p>

      <div className="mt-5 space-y-3">
        <Field
          label={contact.fields.name.label}
          placeholder={contact.fields.name.placeholder}
          value={state.name}
          onChange={(v) => set({ name: v })}
        />
        <Field
          label={contact.fields.email.label}
          placeholder={contact.fields.email.placeholder}
          type="email"
          value={state.email}
          onChange={(v) => set({ email: v })}
        />
        <div>
          <label className="block text-[13px] font-medium text-[var(--color-ink-soft)]">
            {contact.fields.phone.label}
          </label>
          <div className="mt-1 flex rounded-2xl border border-[var(--color-line)] bg-white overflow-hidden focus-within:border-[var(--color-green)] focus-within:ring-2 focus-within:ring-[var(--color-mint)]">
            <span className="px-3 py-3.5 bg-[var(--color-mint-soft)] text-[14px] font-medium text-[var(--color-green-deep)] border-r border-[var(--color-line)]">
              +44
            </span>
            <input
              type="tel"
              value={state.phone}
              onChange={(e) => set({ phone: e.target.value })}
              placeholder={contact.fields.phone.placeholder}
              className="flex-1 px-3 py-3.5 text-[15px] outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[var(--color-line)] p-4 bg-[var(--color-mint-soft)]/40">
        <div className="text-[12.5px] font-medium uppercase tracking-wide text-[var(--color-green-deep)]">
          What happens next
        </div>
        <ol className="mt-2 space-y-1.5 text-[13.5px] text-[var(--color-ink-soft)] list-decimal pl-5">
          {contact.whatHappensNext.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>

      {error && (
        <div className="mt-4 text-[13px] text-[var(--color-warning)]">{error}</div>
      )}

      <div className="mt-6">
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={!canSubmit || submitting}
        >
          {submitting ? "Sending…" : contact.submit}
          {!submitting && <Arrow />}
        </button>
        <ul className="mt-3 grid grid-cols-2 gap-y-1 gap-x-4">
          {contact.trustStrip.map((t) => (
            <li key={t.text} className="text-[12px] text-[var(--color-stone)] flex items-start gap-1.5">
              <span>{t.icon}</span>
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl bg-[var(--color-page)] border border-[var(--color-line)] p-3.5 text-[11.5px] text-[var(--color-stone)] leading-relaxed">
        {contact.disclosure}
      </div>
    </form>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[var(--color-ink-soft)]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3.5 text-[15px] outline-none focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-mint-soft)]"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success screen.

function Success() {
  return (
    <div className="text-center py-2">
      <div className="mx-auto w-14 h-14 rounded-full bg-[var(--color-mint-soft)] flex items-center justify-center text-[var(--color-green-deep)] text-2xl">
        ✓
      </div>
      <h2 className="mt-4 text-[22px] md:text-[24px] font-semibold text-[var(--color-ink)] leading-tight">
        {successCopy.headline}
      </h2>
      <p className="mt-3 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
        {successCopy.sub}
      </p>
      <div className="mt-5 rounded-2xl border border-[var(--color-line)] p-4 bg-[var(--color-mint-soft)]/40 text-left">
        <div className="text-[12.5px] font-medium uppercase tracking-wide text-[var(--color-green-deep)]">
          {successCopy.next}
        </div>
        <ol className="mt-2 space-y-1.5 text-[13.5px] text-[var(--color-ink-soft)] list-decimal pl-5">
          {successCopy.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tiny utility components.

function Check() {
  return (
    <svg
      className="text-[var(--color-green-deep)] shrink-0 mt-0.5"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useHoverChip<T>() {
  const [hovered, setHovered] = useState<T | null>(null);
  return { hovered, setHovered };
}

// Re-exports kept tiny so we don't pollute the bundle.
export { mockCompanies };
