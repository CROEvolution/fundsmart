"use client";

import { useState, type CSSProperties, type RefObject } from "react";
import { Icon, PriceChip, TrustStrip } from "./ui";
import ProgressBar from "./ui/ProgressBar";
import {
  AMOUNT_LABEL,
  PURPOSE_LABEL,
  TURNOVER_BAND_LABEL,
  TRADING_LENGTH_LABEL,
  fmtGBP,
  isEmailValid,
  isPhoneValid,
  qualifyMax,
  secondsLeft,
  type Answers,
  type Amount,
  type Purpose,
  type TradingLength,
  type TurnoverBand,
  type Urgency,
  URGENCY_LABEL,
} from "@/lib/state";
import { quizVariants, type QuizVariantId } from "@/lib/quizVariants";

type Props = {
  variant: QuizVariantId;
  answers: Answers;
  setAmount: (v: Amount) => void;
  setPurpose: (v: Purpose) => void;
  setUrgency: (v: Urgency) => void;
  setTurnoverBand: (v: TurnoverBand) => void;
  setTradingLength: (v: TradingLength) => void;
  patchContact: (p: { email?: string; phone?: string }) => void;
  onContinue: () => void;
  cardRef?: RefObject<HTMLDivElement | null>;
};

const AMOUNTS: Amount[] = ["10k", "25k", "50k", "100k", "250k", "1m"];
const PURPOSES: Purpose[] = ["growth", "working", "vat", "equip", "bridge", "refi"];
const TURNOVER_BANDS: TurnoverBand[] = [
  "under-200k",
  "200-500k",
  "500k-1m",
  "1m-3m",
  "3m-plus",
];

const PANEL_LOGOS = [
  { name: "Iwoca", src: "/lender-logos/iwoca.webp" },
  { name: "Funding Circle", src: "/lender-logos/funding-circle.webp" },
  { name: "Halo", src: "/lender-logos/halo.webp" },
  { name: "Bizcap", src: "/lender-logos/bizcap.webp" },
  { name: "Funding Options by Tide", src: "/lender-logos/funding-options-by-tide.webp" },
];

const TRADING_LENGTHS: {
  value: TradingLength;
  label: string;
  micro: string;
  icon: Parameters<typeof Icon>[0]["name"];
}[] = [
  {
    value: "under-1",
    label: "Less than 1 year",
    micro: "Most of our panel needs 12 months of trading.",
    icon: "Clock",
  },
  {
    value: "1-3",
    label: "1 to 3 years",
    micro: "Enough history for real options.",
    icon: "TrendingUp",
  },
  {
    value: "3-5",
    label: "3 to 5 years",
    micro: "Strong signal for established-trading lenders.",
    icon: "Building2",
  },
  {
    value: "5-plus",
    label: "5 years+",
    micro: "Best fit for larger panel coverage.",
    icon: "CircleCheckBig",
  },
];

const PURPOSE_DETAILS: Record<
  Purpose,
  { icon: Parameters<typeof Icon>[0]["name"]; micro: string }
> = {
  growth: {
    icon: "TrendingUp",
    micro: "Expansion, stock, hiring, or new sites.",
  },
  working: {
    icon: "Wallet",
    micro: "Smooth cashflow without waiting on invoices.",
  },
  vat: {
    icon: "Receipt",
    micro: "VAT, HMRC, suppliers, or payroll pressure.",
  },
  equip: {
    icon: "Truck",
    micro: "Equipment, vehicles, machinery, or fit-out.",
  },
  bridge: {
    icon: "Link",
    micro: "Start a contract before the first payment lands.",
  },
  refi: {
    icon: "RefreshCw",
    micro: "Replace existing debt with a cleaner structure.",
  },
  other: {
    icon: "Ellipsis",
    micro: "Your specialist will route it on the call.",
  },
};

const URGENCY_DETAILS: Record<
  Urgency,
  { icon: Parameters<typeof Icon>[0]["name"]; micro: string }
> = {
  today: {
    icon: "Zap",
    micro: "We route fastest-fit lenders first. Approval can be as little as 1 hour.",
  },
  "this-week": {
    icon: "Clock",
    micro: "Best fit for VAT, supplier, payroll, or contract-start pressure.",
  },
  "this-month": {
    icon: "CalendarDays",
    micro: "Enough time to compare the most suitable lender path.",
  },
  exploring: {
    icon: "ShieldCheck",
    micro: "Check your range privately before you need the money.",
  },
};

export default function Hero({
  variant,
  answers,
  setAmount,
  setPurpose,
  setUrgency,
  setTurnoverBand,
  setTradingLength,
  patchContact,
  onContinue,
  cardRef,
}: Props) {
  return (
    <section className="hero hero-band" data-screen-label="Hero">
      <div className="container">
        <div className="hero-grid">
          {/* TOP: h1 + 2-line sub. Above the form on mobile. */}
          <div className="hero-copy-top">
            <h1>
              Bank said no to your SME loan? In 2 minutes, we find the{" "}
              <span style={{ color: "var(--green-400)" }}>1 lender</span> most likely to say
              yes.
            </h1>
            <p className="hero-sub on-dark">
              <strong>40% of UK SME loan applications get rejected.</strong> One soft search, one
              matched lender, one decision, funded in as soon as 4 hours.
            </p>
          </div>

          {/* FORM CARD: right column on desktop, second on mobile */}
          <div
            ref={cardRef}
            className="card hero-card"
            data-hero-card
            style={{
              padding: 0,
              overflow: "hidden",
              boxShadow:
                "0 24px 48px -16px rgba(11,18,32,.10), 0 8px 16px -8px rgba(11,18,32,.06)",
            }}
          >
            <div className="hero-card-head hero-card-progress">
              <HeroProgress variant={variant} answers={answers} />
            </div>

            <HeroForm
              variant={variant}
              answers={answers}
              setAmount={setAmount}
              setPurpose={setPurpose}
              setUrgency={setUrgency}
              setTurnoverBand={setTurnoverBand}
              setTradingLength={setTradingLength}
              patchContact={patchContact}
              onContinue={onContinue}
            />
          </div>

          {/* TAIL: trust strip + lender logos. Below the form on mobile. */}
          <div className="hero-copy-tail">
            <TrustStrip
              items={[
                { icon: "ShieldCheck", text: "Soft credit search only · zero impact on your score" },
                { icon: "Users", text: "100+ FCA-regulated lenders · matched to one" },
                {
                  icon: "Zap",
                  text: "Approval in as little as 1 hour · funded in as soon as 4 hours",
                },
              ]}
            />

            <div className="mt-4 stack gap-3">
              <span
                className="tiny muted"
                style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em" }}
              >
                Compared across our panel
              </span>
              <div className="panel-logos">
                {PANEL_LOGOS.map((l) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={l.name}
                    src={l.src}
                    alt={l.name}
                    loading="lazy"
                    className="panel-logo"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroProgress({
  variant,
  answers,
}: {
  variant: QuizVariantId;
  answers: Answers;
}) {
  const cfg = quizVariants[variant];
  const total = cfg.heroStepCount + cfg.modalSteps.length;
  if (variant === "control") {
    return (
      <ProgressBar
        value={(1 / total) * 100}
        label={`Step 1 of ${total} · About ${secondsLeft(1, total)} seconds left`}
      />
    );
  }

  const complete = heroCompletedCount(variant, answers);
  const step =
    complete >= cfg.heroStepCount
      ? cfg.heroStepCount + 1
      : Math.max(1, complete + 1);
  const label =
    complete >= cfg.heroStepCount
      ? `Ready for step ${cfg.heroStepCount + 1} of ${total} · About ${secondsLeft(
          cfg.heroStepCount + 1,
          total,
        )} seconds left`
      : `Step ${step} of ${total} · ${complete} of ${cfg.heroStepCount} questions answered`;

  return <ProgressBar value={(step / total) * 100} label={label} />;
}

function heroCompletedCount(variant: QuizVariantId, answers: Answers): number {
  if (variant === "control") return answers.amount ? 1 : 0;
  if (variant === "v2") {
    return [answers.amount, answers.purpose, answers.urgency].filter(Boolean).length;
  }
  if (variant === "v3") {
    return [answers.amount, answers.turnoverBand, answers.tradingLength].filter(Boolean).length;
  }
  return [
    answers.amount,
    isEmailValid(answers.email) && isPhoneValid(answers.phone) ? "contact" : null,
  ].filter(Boolean).length;
}

function HeroForm({
  variant,
  answers,
  setAmount,
  setPurpose,
  setUrgency,
  setTurnoverBand,
  setTradingLength,
  patchContact,
  onContinue,
}: Props) {
  if (variant === "v2") {
    return (
      <V2HeroFunnel
        answers={answers}
        setAmount={setAmount}
        setPurpose={setPurpose}
        setUrgency={setUrgency}
        onContinue={onContinue}
      />
    );
  }

  if (variant === "v3") {
    return (
      <V3HeroFunnel
        answers={answers}
        setAmount={setAmount}
        setTurnoverBand={setTurnoverBand}
        setTradingLength={setTradingLength}
        onContinue={onContinue}
      />
    );
  }

  if (variant === "v4") {
    return (
      <div className="stack gap-5 hero-card-body">
        <AmountQuestion value={answers.amount} onChange={setAmount} />
        <FastLeadContact answers={answers} patchContact={patchContact} />
        <HeroSubmit
          label="Save my lender match"
          disabled={!answers.amount || !isEmailValid(answers.email) || !isPhoneValid(answers.phone)}
          onContinue={onContinue}
        />
        <p
          className="tiny muted"
          style={{
            background: "#F8F9FB",
            border: "1px solid var(--border)",
            padding: 12,
            borderRadius: 10,
            lineHeight: 1.5,
          }}
        >
          We save the report destination first, then use the next few checks to calculate your
          range. Soft search only. Your data is never sold.
        </p>
      </div>
    );
  }

  return (
    <div className="stack gap-5 hero-card-body">
      <AmountQuestion value={answers.amount} onChange={setAmount} />
      <HeroSubmit label="Continue" disabled={!answers.amount} onContinue={onContinue} />
      <HeroMicroRow />
    </div>
  );
}

function V3HeroFunnel({
  answers,
  setAmount,
  setTurnoverBand,
  setTradingLength,
  onContinue,
}: {
  answers: Answers;
  setAmount: (v: Amount) => void;
  setTurnoverBand: (v: TurnoverBand) => void;
  setTradingLength: (v: TradingLength) => void;
  onContinue: () => void;
}) {
  const [active, setActive] = useState<0 | 1 | 2>(
    !answers.amount ? 0 : !answers.turnoverBand ? 1 : 2,
  );
  const disqualifiedTurnover = answers.turnoverBand === "under-200k";
  const disqualifiedTrading = answers.tradingLength === "under-1";
  const eligible =
    !!answers.amount &&
    !!answers.turnoverBand &&
    !!answers.tradingLength &&
    !disqualifiedTurnover &&
    !disqualifiedTrading;

  function chooseAmount(v: Amount) {
    setAmount(v);
    setActive(1);
  }

  function chooseTurnoverBand(v: TurnoverBand) {
    setTurnoverBand(v);
    setActive(v === "under-200k" ? 1 : 2);
  }

  return (
    <div className="stack hero-card-body v2-hero-shell">
      <div
        className="v2-summary-rail"
        aria-label="Eligibility questions"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 8,
        }}
      >
        <button
          type="button"
          className={`v2-summary-pill ${active === 0 ? "active" : ""} ${
            answers.amount ? "done" : ""
          }`}
          style={v2SummaryPillStyle(active === 0, !!answers.amount)}
          onClick={() => setActive(0)}
        >
          <span style={v2SummaryNumberStyle(!!answers.amount)}>1</span>
          <strong style={v2SummaryTextStyle}>
            {answers.amount ? AMOUNT_LABEL[answers.amount] : "Amount"}
          </strong>
        </button>
        <button
          type="button"
          className={`v2-summary-pill ${active === 1 ? "active" : ""} ${
            answers.turnoverBand ? "done" : ""
          }`}
          style={v2SummaryPillStyle(active === 1, !!answers.turnoverBand, !answers.amount)}
          onClick={() => setActive(1)}
          disabled={!answers.amount}
        >
          <span style={v2SummaryNumberStyle(!!answers.turnoverBand)}>2</span>
          <strong style={v2SummaryTextStyle}>
            {answers.turnoverBand ? TURNOVER_BAND_LABEL[answers.turnoverBand] : "Turnover"}
          </strong>
        </button>
        <button
          type="button"
          className={`v2-summary-pill ${active === 2 ? "active" : ""} ${
            answers.tradingLength ? "done" : ""
          }`}
          style={v2SummaryPillStyle(
            active === 2,
            !!answers.tradingLength,
            !answers.amount || !answers.turnoverBand || disqualifiedTurnover,
          )}
          onClick={() => setActive(2)}
          disabled={!answers.amount || !answers.turnoverBand || disqualifiedTurnover}
        >
          <span style={v2SummaryNumberStyle(!!answers.tradingLength)}>3</span>
          <strong style={v2SummaryTextStyle}>
            {answers.tradingLength ? TRADING_LENGTH_LABEL[answers.tradingLength] : "Trading"}
          </strong>
        </button>
      </div>

      <div className="v2-step-panel" style={{ borderTop: "1px solid var(--border)" }}>
        {active === 0 && (
          <AmountQuestion value={answers.amount} onChange={chooseAmount} />
        )}
        {active === 1 && (
          <TurnoverBandQuestion
            value={answers.turnoverBand}
            onChange={chooseTurnoverBand}
          />
        )}
        {active === 2 && (
          <TradingLengthQuestion
            value={answers.tradingLength}
            onChange={setTradingLength}
          />
        )}
      </div>

      {(disqualifiedTurnover || disqualifiedTrading) && (
        <div className="offramp compact">
          <h3>Probably not our fit yet.</h3>
          <p className="small">
            Most lenders on our panel need £200k+ turnover and at least 12 months of trading.
          </p>
        </div>
      )}

      {eligible && (
        <>
          <div className="qualify-band live compact" style={{ marginTop: 0 }}>
            <span className="qualify-icon">
              <Icon name="Sparkles" size="sm" />
            </span>
            <div className="stack" style={{ gap: 2 }}>
              <span className="qualify-eyebrow">Based on your turnover band</span>
              <strong className="qualify-amount num">
                You may qualify for up to {fmtGBP(qualifyMax(answers.annualTurnover))}
              </strong>
            </div>
          </div>
          <HeroSubmit label="Check my lender fit" disabled={false} onContinue={onContinue} />
        </>
      )}

      <HeroMicroRow />
    </div>
  );
}

function V2HeroFunnel({
  answers,
  setAmount,
  setPurpose,
  setUrgency,
  onContinue,
}: {
  answers: Answers;
  setAmount: (v: Amount) => void;
  setPurpose: (v: Purpose) => void;
  setUrgency: (v: Urgency) => void;
  onContinue: () => void;
}) {
  const [active, setActive] = useState<0 | 1 | 2>(
    !answers.amount ? 0 : !answers.purpose ? 1 : 2,
  );
  const ready = !!answers.amount && !!answers.purpose && !!answers.urgency;

  function chooseAmount(v: Amount) {
    setAmount(v);
    setActive(1);
  }

  function choosePurpose(v: Purpose) {
    setPurpose(v);
    setActive(2);
  }

  return (
    <div className="stack gap-5 hero-card-body v2-hero-shell">
      <div className="stack gap-2">
        <span className="eyebrow">Funding Fitness Score</span>
        <h2 style={{ fontSize: 24, lineHeight: 1.15, letterSpacing: "-.01em" }}>
          First, tell us what you need funded.
        </h2>
        <p className="small muted">
          These questions are part of the funding check. Companies House and contact details come
          after.
        </p>
      </div>

      <div
        className="v2-summary-rail"
        aria-label="Funding score inputs"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 8,
        }}
      >
        <button
          type="button"
          className={`v2-summary-pill ${active === 0 ? "active" : ""} ${
            answers.amount ? "done" : ""
          }`}
          style={v2SummaryPillStyle(active === 0, !!answers.amount)}
          onClick={() => setActive(0)}
        >
          <span style={v2SummaryNumberStyle(!!answers.amount)}>1</span>
          <strong style={v2SummaryTextStyle}>
            {answers.amount ? AMOUNT_LABEL[answers.amount] : "Amount"}
          </strong>
        </button>
        <button
          type="button"
          className={`v2-summary-pill ${active === 1 ? "active" : ""} ${
            answers.purpose ? "done" : ""
          }`}
          style={v2SummaryPillStyle(active === 1, !!answers.purpose, !answers.amount)}
          onClick={() => setActive(1)}
          disabled={!answers.amount}
        >
          <span style={v2SummaryNumberStyle(!!answers.purpose)}>2</span>
          <strong style={v2SummaryTextStyle}>
            {answers.purpose ? PURPOSE_LABEL[answers.purpose] : "Reason"}
          </strong>
        </button>
        <button
          type="button"
          className={`v2-summary-pill ${active === 2 ? "active" : ""} ${
            answers.urgency ? "done" : ""
          }`}
          style={v2SummaryPillStyle(
            active === 2,
            !!answers.urgency,
            !answers.amount || !answers.purpose,
          )}
          onClick={() => setActive(2)}
          disabled={!answers.amount || !answers.purpose}
        >
          <span style={v2SummaryNumberStyle(!!answers.urgency)}>3</span>
          <strong style={v2SummaryTextStyle}>
            {answers.urgency ? URGENCY_LABEL[answers.urgency] : "Timing"}
          </strong>
        </button>
      </div>

      <div
        className="v2-step-panel"
        style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}
      >
        {active === 0 && (
          <AmountQuestion value={answers.amount} onChange={chooseAmount} />
        )}
        {active === 1 && (
          <PurposeQuestion value={answers.purpose} onChange={choosePurpose} />
        )}
        {active === 2 && (
          <UrgencyQuestion value={answers.urgency} onChange={setUrgency} />
        )}
      </div>

      {ready && (
        <HeroSubmit
          label="See my Funding Fitness Score"
          disabled={false}
          onContinue={onContinue}
        />
      )}
      <HeroMicroRow />
    </div>
  );
}

function v2SummaryPillStyle(
  active: boolean,
  done: boolean,
  disabled = false,
): CSSProperties {
  return {
    border: `1px solid ${active ? "var(--green-400)" : "var(--border)"}`,
    background: active ? "#F7FCF9" : "#fff",
    borderRadius: 12,
    padding: 10,
    minHeight: 56,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: 8,
    alignItems: "center",
    textAlign: "left",
    color: active || done ? "var(--navy-900)" : "var(--muted)",
    boxShadow: "var(--shadow-btn)",
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  };
}

function v2SummaryNumberStyle(done: boolean): CSSProperties {
  return {
    width: 24,
    height: 24,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: done ? "var(--green-500)" : "var(--bg)",
    color: done ? "#fff" : "var(--muted)",
    fontSize: 12,
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
  };
}

const v2SummaryTextStyle: CSSProperties = {
  minWidth: 0,
  fontSize: 12,
  lineHeight: 1.25,
  color: "inherit",
};

function AmountQuestion({
  value,
  onChange,
}: {
  value: Amount | null;
  onChange: (v: Amount) => void;
}) {
  return (
    <div className="stack gap-3">
      <label className="label">How much funding do you need?</label>
      <div className="grid-6">
        {AMOUNTS.map((a) => (
          <PriceChip key={a} active={value === a} onClick={() => onChange(a)}>
            {AMOUNT_LABEL[a]}
          </PriceChip>
        ))}
      </div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onChange("other");
        }}
        className="tiny"
        style={{
          color: "var(--blue-700)",
          fontWeight: 600,
          textDecoration: value === "other" ? "underline" : "none",
        }}
      >
        Other amount →
      </a>
    </div>
  );
}

function PurposeQuestion({
  value,
  onChange,
}: {
  value: Purpose | null;
  onChange: (v: Purpose) => void;
}) {
  return (
    <div className="stack gap-3">
      <label className="label">What&apos;s it for?</label>
      <div className="quiz-choice-grid">
        {PURPOSES.map((p) => (
          <CompactChoice
            key={p}
            active={value === p}
            onClick={() => onChange(p)}
            icon={PURPOSE_DETAILS[p].icon}
            label={PURPOSE_LABEL[p]}
          >
            {PURPOSE_DETAILS[p].micro}
          </CompactChoice>
        ))}
      </div>
    </div>
  );
}

function UrgencyQuestion({
  value,
  onChange,
}: {
  value: Urgency | null;
  onChange: (v: Urgency) => void;
}) {
  const options: Urgency[] = ["today", "this-week", "this-month", "exploring"];

  return (
    <div className="stack gap-3">
      <label className="label">When do you need the money?</label>
      <div className="quiz-choice-grid">
        {options.map((urgency) => (
          <CompactChoice
            key={urgency}
            active={value === urgency}
            onClick={() => onChange(urgency)}
            icon={URGENCY_DETAILS[urgency].icon}
            label={URGENCY_LABEL[urgency]}
          >
            {URGENCY_DETAILS[urgency].micro}
          </CompactChoice>
        ))}
      </div>
    </div>
  );
}

function CompactChoice({
  active,
  onClick,
  icon,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  children: string;
}) {
  return (
    <button
      type="button"
      className={`quiz-choice ${active ? "active" : ""}`}
      aria-pressed={active}
      aria-label={`${label}. ${children}`}
      onClick={onClick}
    >
      <span className="quiz-choice-icon" aria-hidden="true">
        <Icon name={icon} size="sm" />
      </span>
      <span className="quiz-choice-copy">
        <strong>{label}</strong>
        <span>{children}</span>
      </span>
    </button>
  );
}

function TurnoverBandQuestion({
  value,
  onChange,
}: {
  value: TurnoverBand | null;
  onChange: (v: TurnoverBand) => void;
}) {
  return (
    <div className="stack gap-3">
      <label className="label">What&apos;s your annual turnover?</label>
      <div className="quiz-choice-grid">
        {TURNOVER_BANDS.map((band) => {
          const belowMinimum = band === "under-200k";
          return (
            <CompactChoice
              key={band}
              active={value === band}
              onClick={() => onChange(band)}
              icon={belowMinimum ? "TriangleAlert" : "ChartColumnIncreasing"}
              label={TURNOVER_BAND_LABEL[band]}
            >
              {belowMinimum
                ? "Below most panel minimums."
                : "Eligible for panel matching."}
            </CompactChoice>
          );
        })}
      </div>
    </div>
  );
}

function TradingLengthQuestion({
  value,
  onChange,
}: {
  value: TradingLength | null;
  onChange: (v: TradingLength) => void;
}) {
  return (
    <div className="stack gap-3">
      <label className="label">How long have you been trading?</label>
      <div className="quiz-choice-grid">
        {TRADING_LENGTHS.map((o) => (
          <CompactChoice
            key={o.value}
            active={value === o.value}
            onClick={() => onChange(o.value)}
            icon={o.icon}
            label={o.label}
          >
            {o.micro}
          </CompactChoice>
        ))}
      </div>
    </div>
  );
}

function FastLeadContact({
  answers,
  patchContact,
}: {
  answers: Answers;
  patchContact: (p: { email?: string; phone?: string }) => void;
}) {
  return (
    <div className="stack gap-4">
      <div className="field">
        <label className="label">Business email</label>
        <div className="input-group">
          <span className="prefix">
            <Icon name="Mail" size="sm" />
          </span>
          <input
            type="email"
            inputMode="email"
            placeholder="you@yourcompany.co.uk"
            value={answers.email ?? ""}
            onChange={(e) => patchContact({ email: e.target.value })}
            autoComplete="email"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Mobile number</label>
        <div className="input-group phone-group">
          <span className="prefix phone-prefix" aria-label="United Kingdom dial code">
            <span style={{ fontSize: 14 }}>UK</span>
            <span className="num">+44</span>
          </span>
          <input
            type="tel"
            inputMode="tel"
            placeholder="7XXX XXX XXX"
            value={answers.phone ?? ""}
            onChange={(e) =>
              patchContact({ phone: e.target.value.replace(/[^\d\s]/g, "").slice(0, 15) })
            }
            autoComplete="tel-national"
            maxLength={15}
          />
        </div>
      </div>
    </div>
  );
}

function HeroSubmit({
  label,
  disabled,
  onContinue,
}: {
  label: string;
  disabled: boolean;
  onContinue: () => void;
}) {
  return (
    <button
      className="btn primary xl"
      disabled={disabled}
      onClick={onContinue}
      style={{ width: "100%", padding: "18px 22px" }}
    >
      {label}
      <Icon name="ArrowRight" size="sm" />
    </button>
  );
}

function HeroMicroRow() {
  return (
    <div
      className="row hero-micro-row"
      style={{
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        color: "var(--muted)",
        fontSize: 12,
        whiteSpace: "nowrap",
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
  );
}
