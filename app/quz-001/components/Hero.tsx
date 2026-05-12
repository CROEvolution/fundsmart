"use client";

import { Icon, PriceChip, TrustStrip } from "./ui";
import ProgressBar from "./ui/ProgressBar";
import { AMOUNT_LABEL, secondsLeft, type Amount } from "@/lib/state";

const TOTAL_STEPS = 7;
const HERO_STEP = 1;

type Props = {
  amount: Amount | null;
  setAmount: (v: Amount) => void;
  onContinue: () => void;
  cardRef?: React.RefObject<HTMLDivElement | null>;
};

const AMOUNTS: Amount[] = ["10k", "25k", "50k", "100k", "250k", "1m"];

const PANEL_LOGOS = [
  { name: "Iwoca", src: "/lender-logos/iwoca.webp" },
  { name: "Funding Circle", src: "/lender-logos/funding-circle.webp" },
  { name: "Halo", src: "/lender-logos/halo.webp" },
  { name: "Bizcap", src: "/lender-logos/bizcap.webp" },
  { name: "Funding Options by Tide", src: "/lender-logos/funding-options-by-tide.webp" },
];

export default function Hero({ amount, setAmount, onContinue, cardRef }: Props) {
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
              <ProgressBar
                value={(HERO_STEP / TOTAL_STEPS) * 100}
                label={`Step ${HERO_STEP} of ${TOTAL_STEPS} · About ${secondsLeft(
                  HERO_STEP,
                  TOTAL_STEPS,
                )} seconds left`}
              />
            </div>

            <div className="stack gap-5 hero-card-body">
              <div className="stack gap-3">
                <label className="label">How much funding do you need?</label>
                <div className="grid-6">
                  {AMOUNTS.map((a) => (
                    <PriceChip key={a} active={amount === a} onClick={() => setAmount(a)}>
                      {AMOUNT_LABEL[a]}
                    </PriceChip>
                  ))}
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setAmount("other");
                  }}
                  className="tiny"
                  style={{
                    color: "var(--blue-700)",
                    fontWeight: 600,
                    textDecoration: amount === "other" ? "underline" : "none",
                  }}
                >
                  Other amount →
                </a>
              </div>

              <button
                className="btn primary xl"
                disabled={!amount}
                onClick={onContinue}
                style={{ width: "100%", padding: "18px 22px" }}
              >
                Continue
                <Icon name="ArrowRight" size="sm" />
              </button>

              <div
                className="row"
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
            </div>
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
