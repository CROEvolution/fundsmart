"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type Answers,
  computeProfile,
  fmtGBP,
  PURPOSE_LABEL,
  RESIDENCY_LABEL,
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
              <span className="eyebrow">Your match score</span>
              <h2 style={{ fontSize: 28, lineHeight: 1.15 }}>
                {val} / 100. You&apos;re a strong match.
              </h2>
              <p className="muted small">
                Against our panel of 100+ FCA-regulated lenders. Here&apos;s where you stand and
                what your indicative range looks like.
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
                  Indicative funding available
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
  const annual = answers.annualTurnover ?? 0;
  const items: {
    icon: Parameters<typeof Icon>[0]["name"];
    kind: "emerald" | "amber" | "blue";
    title: string;
    body: string;
  }[] = [
    {
      icon: "TrendingUp",
      kind: "emerald",
      title: `Turnover signal: ${annual > 0 ? fmtGBP(annual) : "qualified"}`,
      body: `Puts you in the top ${percentile}% of approved applicants on our panel.`,
    },
    {
      icon: "Building2",
      kind: "emerald",
      title: `Company: ${answers.company?.name ?? "verified"}`,
      body: `Pulled live from Companies House. Director on file: ${
        answers.director?.name ?? "verified"
      }.`,
    },
    {
      icon: "Rocket",
      kind: answers.purpose === "vat" ? "amber" : "blue",
      title: `Purpose: ${
        answers.purpose ? PURPOSE_LABEL[answers.purpose] : "qualified"
      }`,
      body:
        answers.purpose === "vat"
          ? "VAT/HMRC bridge is one of our fastest-routed reasons. Typically funded inside 24–48 hours from match."
          : `One of the funding reasons our lender panel funds fastest. ${
              answers.residency ? RESIDENCY_LABEL[answers.residency] + "." : ""
            }`,
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
