"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type Answers,
  computeProfile,
  fmtGBP,
  PURPOSE_LABEL,
  TRADING_LABEL,
  TURNOVER_LABEL,
} from "@/lib/state";
import Icon from "./ui/Icon";
import ScoreRing from "./ui/ScoreRing";

export default function ScoreScreen({
  answers,
  onContinue,
  onClose,
}: {
  answers: Answers;
  onContinue: () => void;
  onClose: () => void;
}) {
  const profile = useMemo(() => computeProfile(answers), [answers]);
  const { score, low, high, apr, percentile } = profile;
  const [val, setVal] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(eased * score));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div
      className="modal-back"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" data-screen-label="Quiz · Score reveal" style={{ maxWidth: 820 }}>
        <div className="modal-head">
          <div className="row gap-3" style={{ flex: 1 }}>
            <span className="badge emerald dot">Match found</span>
            <span className="tiny muted">
              Pre-qualification complete · soft search only
            </span>
          </div>
          <button
            className="btn ghost"
            onClick={onClose}
            aria-label="Close"
            style={{ padding: 8, height: 36, width: 36, borderRadius: 10 }}
          >
            <Icon name="X" size="md" />
          </button>
        </div>
        <div className="modal-body" style={{ padding: "36px 28px 28px" }}>
          <div
            className="row gap-6"
            style={{ alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}
          >
            <ScoreRing value={val} />
            <div className="stack gap-3" style={{ maxWidth: 380 }}>
              <span className="eyebrow">Your Funding Fitness Score</span>
              <h2 style={{ fontSize: 28, lineHeight: 1.15 }}>
                {val} out of 100. You&apos;re a strong match.
              </h2>
              <p className="muted small">
                Based on what you&apos;ve told us, here&apos;s where you stand against our 100+
                lender panel.
              </p>
            </div>
          </div>

          <div
            className="mt-6"
            style={{
              background: "linear-gradient(180deg,#F2FBF6,#D9F5E5)",
              border: "1px solid var(--green-200)",
              borderRadius: 14,
              padding: 22,
            }}
          >
            <div className="row between" style={{ flexWrap: "wrap", gap: 12 }}>
              <div>
                <div
                  className="tiny"
                  style={{
                    color: "var(--blue-700)",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  Indicative funding range
                </div>
                <div
                  className="num"
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "var(--navy-900)",
                    letterSpacing: "-.02em",
                    marginTop: 6,
                  }}
                >
                  {fmtGBP(low)} – {fmtGBP(high)}
                </div>
                <div className="small muted mt-2">
                  at indicative rates from{" "}
                  <span className="num" style={{ fontWeight: 700, color: "var(--navy-900)" }}>
                    {apr}% APR
                  </span>
                </div>
              </div>
              <div className="stack gap-2" style={{ alignItems: "flex-end" }}>
                <span className="badge blue dot">Soft search only</span>
                <span
                  className="tiny"
                  style={{
                    color: "var(--muted)",
                    textAlign: "right",
                    maxWidth: 220,
                  }}
                >
                  Not a binding offer. Your matched lender confirms final terms.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 style={{ fontSize: 17, marginBottom: 6 }}>
              Three reasons your score is where it is:
            </h3>
            <SignalList answers={answers} percentile={percentile} />
          </div>

          <div className="mt-8 stack gap-3">
            <button
              className="btn primary xl"
              style={{ width: "100%", padding: "18px 22px" }}
              onClick={onContinue}
            >
              Send my full report and unlock my matched lender
              <Icon name="ArrowRight" size="sm" />
            </button>
            <div className="trust-strip" style={{ justifyContent: "center", marginTop: 4 }}>
              <span className="ts-item">
                <Icon name="ShieldCheck" size="sm" /> Soft credit search, no impact on your score
              </span>
              <span className="ts-item">
                <Icon name="Users" size="sm" /> One matched lender, not a dozen
              </span>
              <span className="ts-item">
                <Icon name="Lock" size="sm" /> Your data is never sold to third parties
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalList({ answers, percentile }: { answers: Answers; percentile: number }) {
  const { q3, q4, q5, q6 } = answers;
  const timeframe =
    q6 === "today"
      ? "as soon as 4 hours after sign-off"
      : q6 === "week"
        ? "24 to 48 hours"
        : "this month";
  const items: { icon: Parameters<typeof Icon>[0]["name"]; kind: "emerald" | "amber" | "blue"; title: string; body: string }[] = [
    {
      icon: "TrendingUp",
      kind: "emerald",
      title: `Turnover signal: ${q4 ? TURNOVER_LABEL[q4] : "qualified"}`,
      body: `Puts you in the top ${percentile}% of approved applicants on our panel.`,
    },
    {
      icon: "CalendarCheck2",
      kind: "emerald",
      title: `Trading history: ${q5 ? TRADING_LABEL[q5] : "established"}`,
      body: "That's the level our lenders want to see before they engage.",
    },
    {
      icon: "Rocket",
      kind: q3 === "vat" ? "amber" : "blue",
      title: `Purpose: ${q3 ? PURPOSE_LABEL[q3] : "qualified"}`,
      body:
        q3 === "vat"
          ? `VAT/HMRC bridge is one of our fastest-routed reasons — typically funded inside ${timeframe}.`
          : `One of the three funding reasons our lender panel funds fastest — typically inside ${timeframe}.`,
    },
  ];
  return (
    <div>
      {items.map((s, i) => (
        <div className="signal-row" key={i}>
          <span className={`signal-icon ${s.kind}`}>
            <Icon name={s.icon} size="md" />
          </span>
          <div className="stack" style={{ gap: 4 }}>
            <strong style={{ color: "var(--navy-900)", fontSize: 15 }}>{s.title}</strong>
            <span className="small muted">{s.body}</span>
          </div>
          <span className="badge emerald dot" style={{ alignSelf: "flex-start" }}>
            Strong
          </span>
        </div>
      ))}
    </div>
  );
}
