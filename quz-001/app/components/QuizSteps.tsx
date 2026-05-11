"use client";

import { useEffect, useRef, useState } from "react";
import { Chip, Icon } from "./ui";
import {
  COMPANY_FIXTURES,
  type Company,
  type Q3,
  type Q4,
  type Q5,
  type Q6,
  searchCompanies,
} from "@/lib/state";

// ---------- shared step header + continue button ----------

export function StepHeader({
  label,
  sub,
  micro,
}: {
  label?: string;
  sub?: string;
  micro?: string;
}) {
  return (
    <div className="stack gap-2 mb-6">
      {label && (
        <h2 style={{ fontSize: 26, lineHeight: 1.2 }}>{label}</h2>
      )}
      {sub && <p className="muted" style={{ fontSize: 15 }}>{sub}</p>}
      {micro && <p className="small muted-2 mt-2">{micro}</p>}
    </div>
  );
}

export function ContinueBtn({
  disabled,
  onClick,
  label = "Continue",
}: {
  disabled?: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <div className="mt-6 row between" style={{ flexWrap: "wrap", gap: 12 }}>
      <span className="tiny muted">
        Press{" "}
        <kbd
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            padding: "2px 6px",
            borderRadius: 6,
            fontFamily: "inherit",
            fontSize: 11,
          }}
        >
          Enter
        </kbd>{" "}
        to continue
      </span>
      <button className="btn primary lg" disabled={disabled} onClick={onClick}>
        {label}
        <Icon name="ArrowRight" size="sm" />
      </button>
    </div>
  );
}

// ---------- Q3 Purpose ----------

const Q3_OPTS: { v: Q3; l: string; ico: Parameters<typeof Icon>[0]["name"] }[] = [
  { v: "growth", l: "Growth or expansion", ico: "TrendingUp" },
  { v: "working", l: "Working capital or cashflow", ico: "Wallet" },
  { v: "vat", l: "VAT or HMRC bill", ico: "Receipt" },
  { v: "equip", l: "Equipment or vehicles", ico: "Truck" },
  { v: "bridge", l: "Bridging a contract", ico: "Link" },
  { v: "refi", l: "Refinancing existing debt", ico: "RefreshCw" },
  { v: "other", l: "Other", ico: "MoreHorizontal" },
];

export function Q3Purpose({
  value,
  onChange,
  onNext,
}: {
  value: Q3 | null;
  onChange: (v: Q3) => void;
  onNext: () => void;
}) {
  return (
    <>
      <StepHeader
        label="What's the funding for?"
        micro="Pick the closest. Your specialist will fine-tune it on the call."
      />
      <div className="stack gap-2">
        {Q3_OPTS.map((o) => (
          <Chip
            key={o.v}
            active={value === o.v}
            onClick={() => onChange(o.v)}
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
      <ContinueBtn disabled={!value} onClick={onNext} />
    </>
  );
}

// ---------- Q4 Turnover ----------

const Q4_OPTS: { v: Q4; l: string; off?: boolean }[] = [
  { v: "u200", l: "Under £200k", off: true },
  { v: "200_500", l: "£200k to £500k" },
  { v: "500_1m", l: "£500k to £1m" },
  { v: "1m_3m", l: "£1m to £3m" },
  { v: "3m_plus", l: "£3m+" },
];

export function Q4Turnover({
  value,
  onChange,
  onNext,
  setOfframp,
}: {
  value: Q4 | null;
  onChange: (v: Q4) => void;
  onNext: () => void;
  setOfframp: (k: OfframpKind) => void;
}) {
  const choice = Q4_OPTS.find((o) => o.v === value);
  return (
    <>
      <StepHeader
        label="What's your annual turnover?"
        micro="Lenders use turnover to set your funding range. We match the lender whose box you actually fit — not the one paying us the most."
      />
      <div className="stack gap-2">
        {Q4_OPTS.map((o) => (
          <Chip key={o.v} active={value === o.v} onClick={() => onChange(o.v)}>
            {o.l}
          </Chip>
        ))}
      </div>
      <ContinueBtn
        disabled={!value}
        onClick={() => (choice?.off ? setOfframp("turnover") : onNext())}
      />
    </>
  );
}

// ---------- Q5 Trading ----------

const Q5_OPTS: { v: Q5; l: string; off?: boolean }[] = [
  { v: "u1", l: "Less than 1 year", off: true },
  { v: "1_3", l: "1 to 3 years" },
  { v: "3_5", l: "3 to 5 years" },
  { v: "5p", l: "5 years+" },
];

export function Q5Trading({
  value,
  onChange,
  onNext,
  setOfframp,
}: {
  value: Q5 | null;
  onChange: (v: Q5) => void;
  onNext: () => void;
  setOfframp: (k: OfframpKind) => void;
}) {
  const choice = Q5_OPTS.find((o) => o.v === value);
  return (
    <>
      <StepHeader
        label="How long have you been trading?"
        micro="Trading history is the second number lenders look at. Longer is better, but anything over a year opens real options."
      />
      <div className="stack gap-2">
        {Q5_OPTS.map((o) => (
          <Chip key={o.v} active={value === o.v} onClick={() => onChange(o.v)}>
            {o.l}
          </Chip>
        ))}
      </div>
      <ContinueBtn
        disabled={!value}
        onClick={() => (choice?.off ? setOfframp("trading") : onNext())}
      />
    </>
  );
}

// ---------- Q6 Timing ----------

const Q6_OPTS: { v: Q6; l: string; ico: Parameters<typeof Icon>[0]["name"]; sub: string }[] = [
  { v: "today", l: "Today, it's urgent", ico: "Flame", sub: "Routes to the rapid-funding subset of our panel." },
  { v: "week", l: "This week", ico: "CalendarClock", sub: "Most fundings complete inside 24 to 48 hours from match." },
  { v: "month", l: "This month", ico: "Calendar", sub: "Plenty of runway. We'll set up your match this week." },
  { v: "explore", l: "Just exploring options", ico: "Compass", sub: "No pressure — your specialist won't push." },
];

export function Q6Timing({
  value,
  onChange,
  onNext,
}: {
  value: Q6 | null;
  onChange: (v: Q6) => void;
  onNext: () => void;
}) {
  return (
    <>
      <StepHeader
        label="When do you need the money?"
        micro="Honest answer please. Urgency changes which lenders we approach first."
      />
      <div className="stack gap-2">
        {Q6_OPTS.map((o) => (
          <Chip
            key={o.v}
            active={value === o.v}
            onClick={() => onChange(o.v)}
            sublabel={o.sub}
            leftIcon={
              <span
                style={{
                  width: 32,
                  height: 32,
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
      <ContinueBtn disabled={!value} onClick={onNext} />
    </>
  );
}

// ---------- Q7 Companies House lookup ----------

export function Q7Companies({
  value,
  onChange,
  onNext,
  setOfframp,
}: {
  value: Company | null;
  onChange: (c: Company | null) => void;
  onNext: () => void;
  setOfframp: (k: OfframpKind) => void;
}) {
  const [q, setQ] = useState(value?.name || "");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!q || q.length < 2) {
      setOpen(false);
      return;
    }
    setLoading(true);
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 300);
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, [q]);

  const shown = q.length >= 2 ? searchCompanies(q) : [];

  return (
    <>
      <StepHeader
        label="Find your company on Companies House."
        sub="Type your business name. We'll pull your registered details automatically, so you don't have to."
      />

      <div className="field" style={{ position: "relative" }}>
        <label className="label">Business name or company number</label>
        <div className="input-group">
          <span className="prefix">
            <Icon name="Search" size="sm" />
          </span>
          <input
            autoFocus
            placeholder="Start typing… e.g. Foreman & Sons"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              if (value) onChange(null);
            }}
            onFocus={() => q.length >= 2 && setOpen(true)}
          />
          {loading && (
            <span style={{ display: "flex", alignItems: "center", padding: "0 12px" }}>
              <span className="shimmer" style={{ width: 20, height: 20, borderRadius: 999 }} />
            </span>
          )}
        </div>

        {open && shown.length > 0 && !value && (
          <div className="search-pop">
            {shown.map((c, i) => (
              <button
                key={i}
                className="search-row"
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                  setQ(c.name);
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--blue-50)",
                    color: "var(--blue-700)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="Building2" size="sm" />
                </span>
                <span className="stack" style={{ gap: 2, flex: 1, minWidth: 0 }}>
                  <strong style={{ color: "var(--navy-900)", fontSize: 14 }}>{c.name}</strong>
                  <span className="tiny muted">
                    No. {c.num} · {c.addr}
                  </span>
                </span>
                <span className="badge emerald dot" style={{ alignSelf: "center" }}>
                  {c.status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {value && (
        <div
          className="mt-4 card"
          style={{ padding: 16, background: "var(--emerald-50)", border: "1px solid #A7F3D0" }}
        >
          <div className="row gap-3">
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#fff",
                color: "var(--emerald-700)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="CheckCircle2" size="md" />
            </span>
            <div className="stack" style={{ gap: 2 }}>
              <strong style={{ color: "#065F46", fontSize: 15 }}>{value.name}</strong>
              <span className="tiny" style={{ color: "#047857" }}>
                Pulled from Companies House · No. {value.num} · {value.addr}
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        className="mt-4 row gap-4"
        style={{ flexWrap: "wrap", color: "var(--muted)", fontSize: 13 }}
      >
        <span className="row gap-2">
          <Icon name="Landmark" size="sm" /> Live Companies House search
        </span>
        <span className="row gap-2">
          <Icon name="Lock" size="sm" /> Encrypted. Never sold. Never shared without your permission.
        </span>
      </div>

      <div className="mt-4 row gap-4" style={{ flexWrap: "wrap", fontSize: 13 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onChange({
              name: q || "Trading-name business",
              num: "—",
              addr: "Trading name to be confirmed on call",
              status: "Trading name",
            });
          }}
          style={{ color: "var(--blue-700)", fontWeight: 600, textDecoration: "none" }}
        >
          I trade under a different name →
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOfframp("soletrader");
          }}
          style={{ color: "var(--muted)", fontWeight: 600, textDecoration: "none" }}
        >
          I&apos;m a sole trader →
        </a>
      </div>

      <ContinueBtn
        disabled={!value}
        onClick={onNext}
        label="See my Funding Fitness Score"
      />
    </>
  );
}

// silence unused fixture warning in case tree-shaking removes searchCompanies inline use
void COMPANY_FIXTURES;

// ---------- Off-ramps ----------

export type OfframpKind = "turnover" | "trading" | "soletrader";

const OFFRAMP_COPY: Record<
  OfframpKind,
  { title: string; body: string; cta: string; footnote: string }
> = {
  turnover: {
    title:
      "We're not the right fit for you yet — and we'd rather say it now than waste your afternoon.",
    body: "Most of our 100+ lender partners need £200k+ turnover before they'll engage. Good news: there are lenders set up for earlier-stage businesses. Try Funding Circle's small business product or Iwoca's flexible line — both regulated, both faster than a bank.",
    cta: "Take me to suitable options",
    footnote: "Come back when you cross £200k. We'll be here.",
  },
  trading: {
    title: "A year in, you'll have proper options. Today, not quite yet.",
    body: "Our lender panel underwrites established trading. Under 12 months, you're outside what they'll currently take. Worth knowing: start-up loans, asset finance against new equipment, and the British Business Bank's Start Up Loan Scheme are built for where you are right now.",
    cta: "Show me early-stage options",
    footnote: "Come back to us once you've got 12 months of trading on the books.",
  },
  soletrader: {
    title: "We currently lend to limited companies only.",
    body: "Our lender panel is built for limited companies and LLPs. As a sole trader, you'll want a different product set — Iwoca and Funding Circle both have sole-trader products and are FCA-regulated. Worth a look while you're here.",
    cta: "Show me sole-trader options",
    footnote: "If you incorporate later, come back. We'll match you on day one.",
  },
};

export function OffRamp({ kind, onBack }: { kind: OfframpKind; onBack: () => void }) {
  const v = OFFRAMP_COPY[kind];
  return (
    <div className="offramp">
      <div className="row gap-3 mb-3">
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#fff",
            color: "var(--amber-700)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="Info" size="md" />
        </span>
        <span className="badge amber dot">Honest off-ramp</span>
      </div>
      <h3 style={{ color: "#92400E", fontSize: 20, lineHeight: 1.25 }}>{v.title}</h3>
      <p className="mt-3" style={{ color: "#78350F" }}>
        {v.body}
      </p>
      <div className="mt-6 row gap-3" style={{ flexWrap: "wrap" }}>
        <a
          className="btn primary lg"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          {v.cta} <Icon name="ArrowRight" size="sm" />
        </a>
        <button className="btn lg" onClick={onBack}>
          Go back
        </button>
      </div>
      <p className="mt-4 small" style={{ color: "#92400E" }}>
        {v.footnote}
      </p>
    </div>
  );
}
