"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Chip, Icon } from "./ui";
import {
  type AddressSuggestion,
  type Company,
  type Director,
  type Purpose,
  type Residency,
  fmtGBP,
  formatAddress,
  formatMonthYear,
  qualifyMax,
  searchAddresses,
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
      {label && <h2 style={{ fontSize: 26, lineHeight: 1.2 }}>{label}</h2>}
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
  const [mobile, setMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 600px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const btn = (
    <button className="btn primary lg" disabled={disabled} onClick={onClick}>
      {label}
      <Icon name="ArrowRight" size="sm" />
    </button>
  );

  if (mounted && mobile) {
    return createPortal(
      <div className="continue-row-portal">{btn}</div>,
      document.body,
    );
  }

  return (
    <div className="mt-6 row" style={{ justifyContent: "flex-end", flexWrap: "wrap", gap: 12 }}>
      {btn}
    </div>
  );
}

// ---------- Step: Purpose ----------

const PURPOSE_OPTS: { v: Purpose; l: string; ico: Parameters<typeof Icon>[0]["name"] }[] = [
  { v: "growth", l: "Growth or expansion", ico: "TrendingUp" },
  { v: "working", l: "Working capital or cashflow", ico: "Wallet" },
  { v: "vat", l: "VAT or HMRC bill", ico: "Receipt" },
  { v: "equip", l: "Equipment or vehicles", ico: "Truck" },
  { v: "bridge", l: "Bridging a contract", ico: "Link" },
  { v: "refi", l: "Refinancing existing debt", ico: "RefreshCw" },
  { v: "other", l: "Other", ico: "Ellipsis" },
];

export function StepPurpose({
  value,
  onChange,
  onNext,
}: {
  value: Purpose | null;
  onChange: (v: Purpose) => void;
  onNext: () => void;
}) {
  return (
    <>
      <StepHeader
        label="What's the funding for?"
        micro="Pick the closest. Your specialist fine-tunes it on the call."
      />
      <div className="stack gap-2">
        {PURPOSE_OPTS.map((o) => (
          <Chip
            key={o.v}
            active={value === o.v}
            onClick={() => onChange(o.v)}
            leftIcon={
              <span className="step-icon">
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

// ---------- Step: Companies House search ----------

export function StepCompany({
  value,
  onChange,
  onNext,
}: {
  value: Company | null;
  onChange: (c: Company | null) => void;
  onNext: () => void;
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
        sub="Type your business name. We'll pull your registered details and the appointed officers automatically. No copy-paste, no PDFs."
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
                <span className="search-icon">
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
        <div className="mt-4 selected-company">
          <span className="selected-icon">
            <Icon name="CircleCheckBig" size="md" />
          </span>
          <div className="stack" style={{ gap: 2 }}>
            <strong style={{ color: "#065F46", fontSize: 15 }}>{value.name}</strong>
            <span className="tiny" style={{ color: "#047857" }}>
              Pulled from Companies House · No. {value.num} · {value.addr}
            </span>
            <span className="tiny" style={{ color: "#047857" }}>
              {value.directors.length} appointed officer
              {value.directors.length === 1 ? "" : "s"} found
            </span>
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

      <ContinueBtn disabled={!value} onClick={onNext} />
    </>
  );
}

// ---------- Step: Director selection ----------

export function StepDirector({
  company,
  value,
  onChange,
  onNext,
}: {
  company: Company | null;
  value: Director | null;
  onChange: (d: Director) => void;
  onNext: () => void;
}) {
  if (!company) {
    return (
      <>
        <StepHeader label="Select your role." sub="Please pick a company first." />
      </>
    );
  }
  return (
    <>
      <StepHeader
        label="Which director are you?"
        sub={`We pulled ${company.directors.length} appointed officer${
          company.directors.length === 1 ? "" : "s"
        } from Companies House for ${company.name}. Pick yours.`}
      />
      <div className="stack gap-2">
        {company.directors.map((d) => (
          <Chip
            key={`${d.name}-${d.dobYear}-${d.dobMonth}`}
            active={value?.name === d.name && value?.dobYear === d.dobYear}
            onClick={() => onChange(d)}
            sublabel={`${d.role} · Born ${formatMonthYear(d)}`}
            leftIcon={
              <span className="step-icon">
                <Icon name="CircleUserRound" size="sm" />
              </span>
            }
          >
            {d.name}
          </Chip>
        ))}
      </div>
      <p
        className="tiny muted mt-4"
        style={{ background: "var(--bg)", padding: 12, borderRadius: 10 }}
      >
        Don&apos;t see yourself? Companies House lists only currently appointed officers. If your
        appointment is in progress, your specialist will reconcile this on the call.
      </p>
      <ContinueBtn disabled={!value} onClick={onNext} />
    </>
  );
}

// ---------- Step: DOB day confirmation ----------

export function StepDob({
  director,
  value,
  onChange,
  onNext,
}: {
  director: Director | null;
  value: number | null;
  onChange: (n: number) => void;
  onNext: () => void;
}) {
  const [raw, setRaw] = useState(value ? String(value) : "");
  const day = parseInt(raw, 10);
  const valid = Number.isInteger(day) && day >= 1 && day <= 31;

  useEffect(() => {
    if (valid) onChange(day);
  }, [valid, day, onChange]);

  if (!director) {
    return (
      <>
        <StepHeader label="Confirm date of birth" sub="Please pick a director first." />
      </>
    );
  }
  return (
    <>
      <StepHeader
        label="Quick identity check."
        sub={`Companies House shows ${director.name} as born ${formatMonthYear(director)}. Confirm the day to verify it's you.`}
        micro="We only ever store the day during this session, never linked back to your file."
      />
      <div className="dob-row">
        <div className="dob-cell readonly">
          <span className="dob-cell-label">Day</span>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            value={raw}
            placeholder="DD"
            onChange={(e) => setRaw(e.target.value.replace(/\D/g, "").slice(0, 2))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && valid) onNext();
            }}
            autoFocus
            className="dob-input"
          />
        </div>
        <div className="dob-cell readonly">
          <span className="dob-cell-label">Month</span>
          <span className="dob-value">{formatMonthYear(director).split(" ")[0]}</span>
        </div>
        <div className="dob-cell readonly">
          <span className="dob-cell-label">Year</span>
          <span className="dob-value">{director.dobYear}</span>
        </div>
      </div>
      {raw.length > 0 && !valid && (
        <p className="tiny" style={{ color: "var(--red-600, #B91C1C)", marginTop: 8 }}>
          Day must be between 1 and 31.
        </p>
      )}
      <ContinueBtn disabled={!valid} onClick={onNext} />
    </>
  );
}

// ---------- Step: Business performance (turnover) ----------

function parseGBP(raw: string): number | null {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;
  return parseInt(digits, 10);
}

function formatGBPInput(n: number | null): string {
  if (n == null) return "";
  return n.toLocaleString("en-GB");
}

export function StepTurnover({
  annual,
  monthly,
  onChangeAnnual,
  onChangeMonthly,
  onNext,
}: {
  annual: number | null;
  monthly: number | null;
  onChangeAnnual: (n: number | null) => void;
  onChangeMonthly: (n: number | null) => void;
  onNext: () => void;
}) {
  const max = useMemo(() => qualifyMax(annual), [annual]);
  const annualValid = (annual ?? 0) >= 50_000;
  const monthlyValid = (monthly ?? 0) > 0;

  return (
    <>
      <StepHeader
        label="Tell us about your business performance."
        sub="Turnover is the first number lenders look at. We use this to gauge what panel you fit and what range you'll see on the call."
      />

      <div className="stack gap-4">
        <div className="field">
          <label className="label">Annual turnover (last 12 months)</label>
          <div className="input-group">
            <span className="prefix">£</span>
            <input
              inputMode="numeric"
              placeholder="e.g. 450,000"
              value={formatGBPInput(annual)}
              onChange={(e) => onChangeAnnual(parseGBP(e.target.value))}
              autoFocus
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Average monthly turnover</label>
          <div className="input-group">
            <span className="prefix">£</span>
            <input
              inputMode="numeric"
              placeholder="e.g. 38,000"
              value={formatGBPInput(monthly)}
              onChange={(e) => onChangeMonthly(parseGBP(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className={`qualify-band ${annualValid ? "live" : ""}`}>
        <span className="qualify-icon">
          <Icon name="Sparkles" size="sm" />
        </span>
        <div className="stack" style={{ gap: 2 }}>
          <span className="qualify-eyebrow">Based on your turnover</span>
          <strong className="qualify-amount num">
            {annualValid
              ? `You may qualify for up to ${fmtGBP(max)}`
              : "Enter your annual turnover to see your indicative range"}
          </strong>
          {annualValid && (
            <span className="qualify-foot tiny muted">
              Indicative only · final terms confirmed by your matched lender.
            </span>
          )}
        </div>
      </div>

      <ContinueBtn disabled={!annualValid || !monthlyValid} onClick={onNext} />
    </>
  );
}

// ---------- Step: Contact (residency + address + email + phone) ----------

const RESIDENCY_OPTS: { v: Residency; l: string; ico: Parameters<typeof Icon>[0]["name"] }[] = [
  { v: "own", l: "I own my home", ico: "House" },
  { v: "rent", l: "I rent", ico: "KeyRound" },
  { v: "live-with-family", l: "I live with family", ico: "Users" },
];

export function StepContact({
  residency,
  address,
  email,
  phone,
  onChange,
  onSubmit,
  submitting,
}: {
  residency: Residency | null;
  address: AddressSuggestion | null;
  email: string | null;
  phone: string | null;
  onChange: (patch: {
    residency?: Residency;
    address?: AddressSuggestion | null;
    email?: string;
    phone?: string;
  }) => void;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const [addrQ, setAddrQ] = useState(address ? formatAddress(address) : "");
  const [addrOpen, setAddrOpen] = useState(false);
  const [addrLoading, setAddrLoading] = useState(false);
  const aRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!addrQ || addrQ.length < 2) {
      setAddrOpen(false);
      return;
    }
    setAddrLoading(true);
    if (aRef.current) clearTimeout(aRef.current);
    aRef.current = setTimeout(() => {
      setAddrLoading(false);
      setAddrOpen(true);
    }, 250);
    return () => {
      if (aRef.current) clearTimeout(aRef.current);
    };
  }, [addrQ]);

  const addrSuggestions = addrQ.length >= 2 ? searchAddresses(addrQ) : [];

  const emailValid = !!email && /\S+@\S+\.\S+/.test(email);
  const phoneDigits = (phone ?? "").replace(/\D/g, "");
  const phoneValid = phoneDigits.length >= 9 && phoneDigits.length <= 11;
  const allValid = !!residency && !!address && emailValid && phoneValid;

  return (
    <>
      <StepHeader
        label="Last step: where do we send your match?"
        sub="Quick personal details. Your specialist rings in as little as 1 hour during working hours with your matched lender's indicative offer."
      />

      {/* Residency */}
      <div className="stack gap-2">
        <label className="label">Do you own or rent your home?</label>
        <div className="stack gap-2">
          {RESIDENCY_OPTS.map((o) => (
            <Chip
              key={o.v}
              active={residency === o.v}
              onClick={() => onChange({ residency: o.v })}
              leftIcon={
                <span className="step-icon">
                  <Icon name={o.ico} size="sm" />
                </span>
              }
            >
              {o.l}
            </Chip>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="field mt-4" style={{ position: "relative" }}>
        <label className="label">Residential address</label>
        <div className="input-group">
          <span className="prefix">
            <Icon name="MapPin" size="sm" />
          </span>
          <input
            placeholder="Start typing your address or postcode…"
            value={addrQ}
            onChange={(e) => {
              setAddrQ(e.target.value);
              if (address) onChange({ address: null });
            }}
            onFocus={() => addrQ.length >= 2 && setAddrOpen(true)}
            autoComplete="off"
          />
          {addrLoading && (
            <span style={{ display: "flex", alignItems: "center", padding: "0 12px" }}>
              <span className="shimmer" style={{ width: 20, height: 20, borderRadius: 999 }} />
            </span>
          )}
        </div>
        {addrOpen && addrSuggestions.length > 0 && !address && (
          <div className="search-pop">
            {addrSuggestions.map((a, i) => (
              <button
                key={i}
                className="search-row"
                onClick={() => {
                  onChange({ address: a });
                  setAddrQ(formatAddress(a));
                  setAddrOpen(false);
                }}
              >
                <span className="search-icon">
                  <Icon name="MapPin" size="sm" />
                </span>
                <span className="stack" style={{ gap: 2, flex: 1, minWidth: 0 }}>
                  <strong style={{ color: "var(--navy-900)", fontSize: 14 }}>{a.line1}</strong>
                  <span className="tiny muted">
                    {a.city} · {a.postcode}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
        {address && (
          <p className="tiny mt-2" style={{ color: "var(--emerald-700, #047857)" }}>
            <Icon name="Check" size="sm" /> Address verified
          </p>
        )}
      </div>

      {/* Email */}
      <div className="field mt-4">
        <label className="label">Email address</label>
        <div className="input-group">
          <span className="prefix">
            <Icon name="Mail" size="sm" />
          </span>
          <input
            type="email"
            inputMode="email"
            placeholder="you@yourcompany.co.uk"
            value={email ?? ""}
            onChange={(e) => onChange({ email: e.target.value })}
            autoComplete="email"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="field mt-4">
        <label className="label">Mobile number</label>
        <div className="input-group phone-group">
          <span className="prefix phone-prefix" aria-label="United Kingdom dial code">
            <span style={{ fontSize: 14 }}>🇬🇧</span>
            <span className="num">+44</span>
          </span>
          <input
            type="tel"
            inputMode="tel"
            placeholder="7XXX XXX XXX"
            value={phone ?? ""}
            onChange={(e) =>
              onChange({ phone: e.target.value.replace(/[^\d\s]/g, "").slice(0, 15) })
            }
            autoComplete="tel-national"
            maxLength={15}
          />
        </div>
        <p className="tiny muted mt-2">UK mobile numbers only. We never call from a withheld number.</p>
      </div>

      <button
        type="button"
        className="btn primary xl mt-6"
        style={{ width: "100%", padding: "18px 22px" }}
        disabled={!allValid || submitting}
        onClick={onSubmit}
      >
        {submitting
          ? "Sending…"
          : "See my match"}
        {!submitting && <Icon name="ArrowRight" size="sm" />}
      </button>

      <p
        className="tiny muted mt-3"
        style={{
          background: "#F8F9FB",
          border: "1px solid var(--border)",
          padding: 12,
          borderRadius: 10,
          lineHeight: 1.55,
        }}
      >
        By submitting, you agree that Fundsmart AI may share your information with our matched
        FCA-regulated lender and with credit reference and fraud prevention agencies, who will run
        a soft credit search and identity check. A soft search has no impact on your credit score.
        We do not sell your data. See our Privacy Policy for the full detail.
      </p>
    </>
  );
}
