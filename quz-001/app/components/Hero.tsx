"use client";

import { Badge, Chip, HairDivider, Icon, PriceChip, TrustStrip } from "./ui";
import type { Q1, Q2 } from "@/lib/state";

type Props = {
  q1: Q1 | null;
  setQ1: (v: Q1) => void;
  q2: Q2 | null;
  setQ2: (v: Q2) => void;
  onContinue: () => void;
};

const Q1_OPTS: { v: Q1; l: string; sub: string; ico: "XCircle" | "FastForward" | "CircleHelp" }[] = [
  {
    v: "rejected",
    l: "Bank said no",
    sub: "You're not alone. 40% of UK SME loan applications get rejected. Their algorithm, not your business.",
    ico: "XCircle",
  },
  {
    v: "skipping",
    l: "Skipping the bank",
    sub: "Smart move. Bank lending takes weeks. Private finance moves in hours.",
    ico: "FastForward",
  },
  {
    v: "untried",
    l: "Haven't tried yet",
    sub: "Most operators who come to us don't bother with the bank first. Saves the hard credit pull.",
    ico: "CircleHelp",
  },
];

const AMOUNTS: Q2[] = ["£10k", "£25k", "£50k", "£100k", "£250k", "£1m+"];

export default function Hero({ q1, setQ1, q2, setQ2, onContinue }: Props) {
  return (
    <section className="hero hero-band" data-screen-label="Hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left: pitch */}
          <div className="stack gap-5">
            <div className="row gap-2" style={{ flexWrap: "wrap" }}>
              <Badge variant="emerald" dot>
                Soft search only · no credit impact
              </Badge>
              <Badge
                dot
                style={{
                  color: "var(--blue-700)",
                  background: "var(--blue-50)",
                  borderColor: "var(--blue-200)",
                }}
              >
                FCA-regulated brokerage
              </Badge>
            </div>
            <h1>
              One matched lender.
              <br />
              One soft search.
              <br />
              <span style={{ color: "var(--green-400)" }}>No comparison-site cowboys.</span>
            </h1>
            <p style={{ fontSize: 18, maxWidth: "56ch" }} className="on-dark">
              Fundsmart&apos;s AI pulls your business from Companies House, looks at your real cashflow,
              and matches you to the single lender most likely to approve. Not twelve. Not your data
              sold on. <strong>One.</strong>
            </p>
            <TrustStrip
              items={[
                { icon: "ShieldCheck", text: "Soft credit search only, zero impact on your score" },
                { icon: "Users", text: "100+ FCA-regulated lenders, matched to one" },
                {
                  icon: "Zap",
                  text: "Approval in as little as 1 hour, funded in as soon as 4 hours",
                },
              ]}
            />

            <div className="mt-4 stack gap-2">
              <span
                className="tiny muted"
                style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em" }}
              >
                Compared across our panel
              </span>
              <div className="row gap-6" style={{ flexWrap: "wrap" }}>
                {["Iwoca", "Funding Circle", "Halo", "Bizcap", "Tide"].map((l) => (
                  <span
                    key={l}
                    style={{
                      fontWeight: 700,
                      letterSpacing: "-.01em",
                      fontSize: 15,
                      color: "rgba(230,237,248,.5)",
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: quiz card */}
          <div
            className="card"
            style={{
              padding: 0,
              overflow: "hidden",
              boxShadow:
                "0 24px 48px -16px rgba(11,18,32,.10), 0 8px 16px -8px rgba(11,18,32,.06)",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                background: "linear-gradient(180deg, #F4FCF8, #E9FBF1)",
                borderBottom: "1px solid var(--green-200)",
              }}
            >
              <div className="row between">
                <span
                  className="row gap-2 small"
                  style={{ fontWeight: 600, color: "var(--blue-700)" }}
                >
                  <Icon name="Sparkles" size="sm" />
                  Free Funding Fitness Score
                </span>
                <span className="tiny muted">About 2 minutes</span>
              </div>
            </div>

            <div className="stack gap-6" style={{ padding: 24 }}>
              {/* Q1 */}
              <div className="stack gap-3">
                <div className="row between" style={{ alignItems: "baseline" }}>
                  <label className="label">
                    Q1. Has your bank already said no — or are you skipping them this time?
                  </label>
                  <Badge variant="blue" dot>
                    1 of 7
                  </Badge>
                </div>
                <div className="stack gap-2">
                  {Q1_OPTS.map((o) => (
                    <Chip
                      key={o.v}
                      active={q1 === o.v}
                      onClick={() => setQ1(o.v)}
                      sublabel={q1 === o.v ? o.sub : undefined}
                      leftIcon={
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: "var(--blue-50)",
                            color: "var(--blue-700)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon name={o.ico} size="sm" />
                        </span>
                      }
                    >
                      {o.l}
                    </Chip>
                  ))}
                </div>
              </div>

              <HairDivider />

              {/* Q2 */}
              <div
                className={`stack gap-3 ${q1 ? "fade-in" : ""}`}
                style={{
                  opacity: q1 ? 1 : 0.45,
                  pointerEvents: q1 ? "auto" : "none",
                  transition: "opacity .3s",
                }}
              >
                <div className="row between" style={{ alignItems: "baseline" }}>
                  <label className="label">Q2. How much funding do you need?</label>
                  <Badge dot style={{ background: "var(--bg)" }}>
                    2 of 7
                  </Badge>
                </div>
                <p className="tiny muted" style={{ marginTop: -4 }}>
                  Soft credit search only. No impact on your score.
                </p>
                <div className="grid-6">
                  {AMOUNTS.map((a) => (
                    <PriceChip key={a} active={q2 === a} onClick={() => setQ2(a)}>
                      {a}
                    </PriceChip>
                  ))}
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setQ2("other");
                  }}
                  className="tiny"
                  style={{
                    color: "var(--blue-700)",
                    fontWeight: 600,
                    textDecoration: q2 === "other" ? "underline" : "none",
                  }}
                >
                  Other amount →
                </a>
              </div>

              <button
                className="btn primary xl"
                disabled={!q1 || !q2}
                onClick={onContinue}
                style={{ width: "100%", padding: "18px 22px" }}
              >
                See my Funding Fitness Score
                <Icon name="ArrowRight" size="sm" />
              </button>

              <div
                className="row gap-4"
                style={{
                  flexWrap: "wrap",
                  justifyContent: "center",
                  color: "var(--muted)",
                  fontSize: 12,
                }}
              >
                <span className="row gap-2">
                  <Icon name="ShieldCheck" size="sm" /> No credit impact
                </span>
                <span className="row gap-2">
                  <Icon name="Clock" size="sm" /> ~2 minutes
                </span>
                <span className="row gap-2">
                  <Icon name="Lock" size="sm" /> Data never sold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
