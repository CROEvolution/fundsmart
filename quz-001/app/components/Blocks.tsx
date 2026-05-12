"use client";

// Below-the-fold trust blocks: Stats, HowItWorks, LenderCompetition,
// CaseStudies, WhyOneLender, FAQ. All section shells use the same
// `.container` (1180px) for grid sections; text-heavy sections (FAQ,
// FinalCTA) use `.container.narrow`. This keeps the page width
// consistent on desktop.

import Icon from "./ui/Icon";

const LENDERS = [
  { name: "Iwoca", src: "/lender-logos/iwoca.webp" },
  { name: "Funding Circle", src: "/lender-logos/funding-circle.webp" },
  { name: "Halo", src: "/lender-logos/halo.webp" },
  { name: "Funding Options by Tide", src: "/lender-logos/funding-options-by-tide.webp" },
  { name: "Bizcap", src: "/lender-logos/bizcap.webp" },
  { name: "Lending Box", src: "/lender-logos/lending-box.webp" },
];

export function Stats() {
  const items = [
    { v: "142,468", k: "UK businesses matched" },
    { v: "93%", k: "Approval rate, once matched" },
    { v: "100+", k: "FCA-regulated lenders" },
    { v: "£1m+", k: "Funding ceiling per match" },
  ];
  return (
    <section
      className="section tight"
      style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}
      data-screen-label="Trust · Stats"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 24,
          }}
        >
          {items.map((s, i) => (
            <div className="stat" key={i}>
              <span className="v num">{s.v}</span>
              <span className="k">{s.k}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps: { n: string; title: string; body: string; ico: Parameters<typeof Icon>[0]["name"] }[] = [
    {
      n: "1",
      title: "Tell us about your business.",
      body: "Seven quick questions. Chips, not paperwork. Soft search only, your credit file stays clean.",
      ico: "ClipboardList",
    },
    {
      n: "2",
      title: "Get matched to one lender.",
      body: "Our AI cross-references you against 100+ FCA-regulated lenders and picks the single one most likely to approve. Not the one paying us the highest commission.",
      ico: "GitBranch",
    },
    {
      n: "3",
      title: "Get funded.",
      body: "Approval in as little as 1 hour. Money in your account in as soon as 4 hours after sign-off. A human specialist runs your file end to end.",
      ico: "Banknote",
    },
  ];
  return (
    <section className="section" data-screen-label="Trust · How it works">
      <div className="container">
        <div className="stack gap-3 mb-8" style={{ maxWidth: 720 }}>
          <span className="eyebrow">How it actually works</span>
          <h2>Three steps. One matched lender. Nobody else gets your file.</h2>
        </div>
        <div className="steps3">
          {steps.map((s, i) => (
            <div
              className="card"
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                minHeight: 220,
              }}
            >
              <div className="row between">
                <span className="badge blue dot">Step {s.n}</span>
                <span
                  style={{
                    color: "var(--blue-700)",
                    background: "var(--blue-50)",
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={s.ico} size="md" />
                </span>
              </div>
              <h3 style={{ fontSize: 18 }}>{s.title}</h3>
              <p className="muted small">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LenderCompetition() {
  // Two duplicated tracks scroll-left infinitely (matches the live site's
  // marquee). Grayscale + opacity by default; full colour on hover.
  return (
    <section
      className="section tight"
      style={{
        background: "#fff",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
      data-screen-label="Trust · Lenders"
    >
      <div className="container">
        <div className="stack gap-3 mb-6 center">
          <span className="eyebrow">Lender competition</span>
          <h2 style={{ fontSize: 24 }}>
            100+ FCA-regulated lenders compete. You only ever talk to one.
          </h2>
          <p className="muted small">We do the filtering across the panel. You don&apos;t get a dozen calls.</p>
        </div>
      </div>
      <div className="marquee mt-6">
        <div className="marquee-track" aria-hidden="true">
          {[...LENDERS, ...LENDERS].map((l, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="lender-cell" key={`${l.name}-${i}`}>
              <img src={l.src} alt={l.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudies() {
  const cases = [
    {
      who: "Construction firm",
      where: "£400k turnover · Yorkshire",
      sum: "£50k line of credit",
      time: "Funded in 24 hours",
      quote:
        "Tried Barclays first. Two weeks to tell me no. Then a comparison site. Three brokers submitted my details without asking and tanked my credit file. Fundsmart matched me to one lender. One call. One decision. Money in 24 hours. Turnover's up 60% since.",
      bg: "#E9FBF1",
    },
    {
      who: "James M.",
      where: "Manchester · Construction",
      sum: "£75k",
      time: "Funded next day",
      quote:
        "Bank said no even though my books were clean and the order book was full. Fundsmart's AI sent my file to one specialist. One soft search. Funded the next day.",
      bg: "#ECFDF5",
    },
    {
      who: "Sarah L.",
      where: "London · E-commerce",
      sum: "£150k",
      time: "Funded in 48 hours",
      quote:
        "Needed stock funding for peak season. Wanted offers without a dozen brokers ringing. One application, one matched lender, one soft search, funded inside 48 hours.",
      bg: "#FEF3F2",
    },
  ];
  return (
    <section className="section" data-screen-label="Trust · Case studies">
      <div className="container">
        <div className="stack gap-3 mb-6" style={{ maxWidth: 720 }}>
          <span className="eyebrow">Funded last quarter</span>
          <h2>Operators the bank turned down. Funded by us inside 48 hours.</h2>
        </div>
        <div className="steps3">
          {cases.map((c, i) => (
            <article className="case" key={i}>
              <div className="row between" style={{ alignItems: "flex-start" }}>
                <div className="stack" style={{ gap: 2 }}>
                  <strong style={{ color: "var(--navy-900)", fontSize: 15 }}>{c.who}</strong>
                  <span className="tiny muted">{c.where}</span>
                </div>
                <span
                  style={{
                    background: c.bg,
                    padding: "8px 12px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--navy-900)",
                  }}
                >
                  {c.sum}
                </span>
              </div>
              <blockquote>&ldquo;{c.quote}&rdquo;</blockquote>
              <div className="funded">
                <Icon name="CircleCheckBig" size="sm" /> {c.time}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyOneLender() {
  const points: { ico: Parameters<typeof Icon>[0]["name"]; title: string; body: string }[] = [
    {
      ico: "TriangleAlert",
      title: "Twelve applications mean twelve hard credit pulls.",
      body: "Comparison sites and broker farms fire your data across their panel. Every submission risks a hard search. Stack five in a week and lenders see a credit file in distress.",
    },
    {
      ico: "PhoneOff",
      title: "Twelve applications mean your phone ringing for a fortnight.",
      body: "Brokers buy and resell lead data. Once you're in, you're spammed for weeks by people who've never seen your business.",
    },
    {
      ico: "CircleCheckBig",
      title: "One matched lender means one decision, one soft search, one specialist.",
      body: "Our AI cross-references your business across 100+ lenders and approaches the one whose underwriting box you actually fit. If they pass, your concierge finds a second match. Your file stays clean either way.",
    },
  ];
  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(180deg, var(--navy-900) 0%, var(--navy-950) 100%)",
        color: "#fff",
      }}
      data-screen-label="Trust · Why one lender"
    >
      <div className="container">
        <div className="stack gap-3 mb-8" style={{ maxWidth: 720 }}>
          <span className="eyebrow" style={{ color: "#93C5FD" }}>
            Proprietary mechanism
          </span>
          <h2 style={{ color: "#fff" }}>Why we match you to one lender, not twelve.</h2>
        </div>
        <div className="stack gap-4">
          {points.map((p, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr",
                gap: 18,
                padding: "20px 22px",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(59,130,246,.18)",
                  color: "#BFDBFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={p.ico} size="lg" />
              </div>
              <div className="stack gap-2">
                <h3 style={{ color: "#fff", fontSize: 17 }}>{p.title}</h3>
                <p style={{ color: "#cbd5e1", fontSize: 14 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const items = [
    {
      q: "Will this affect my credit score?",
      a: "No. We run a soft credit search only. Soft searches are visible to you on your credit file but invisible to other lenders. Your score does not move.",
    },
    {
      q: "Who actually sees my data?",
      a: "Your matched lender, plus credit reference and fraud prevention agencies for identity checks. That's the list. We do not pass your data to third-party marketers. We do not sell it. Ever.",
    },
    {
      q: "Why one lender, not many?",
      a: "Because applying to many lenders is what causes the damage. Multiple submissions risk hard pulls, lead-broker resale, and an inbox that won't stop ringing. Our AI does the filtering across 100+ lenders so only the one most likely to approve sees your file. If they pass, your specialist finds a second match. You stay in control the whole way.",
    },
    {
      q: "How fast is funding really?",
      a: "Approval is possible in as little as 1 hour during working hours. Funding lands in as soon as 4 hours after documents are signed off, in the fastest cases. Typical fundings sit at 24 to 48 hours. We tell you the realistic timeline on the call, not the marketing one.",
    },
    {
      q: "What if I'm not approved?",
      a: "Your human specialist looks at why and routes you to a second pre-qualification on the panel. If nothing on our panel fits, we'll tell you straight and point you somewhere that might. We'd rather be honest than waste your time.",
    },
    {
      q: "What does it cost me?",
      a: "Nothing. Fundsmart is paid by the lender when funding completes. You pay the lender's interest and any product fee they disclose up front. There is no Fundsmart fee on your side.",
    },
  ];
  return (
    <section className="section" data-screen-label="Trust · FAQ">
      <div className="container narrow">
        <div className="stack gap-3 mb-6">
          <span className="eyebrow">FAQ</span>
          <h2>Straight answers, no asterisks.</h2>
        </div>
        <div>
          {items.map((f, i) => (
            <details className="faq" key={i} open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
