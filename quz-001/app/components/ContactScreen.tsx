"use client";

import { useState } from "react";
import { type Answers, type ContactDetails } from "@/lib/state";
import Icon from "./ui/Icon";

export default function ContactScreen({
  onSubmit,
  onClose,
  onBack,
}: {
  answers: Answers;
  onSubmit: (c: ContactDetails) => void;
  onClose: () => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const valid =
    name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(email) &&
    phone.replace(/\D/g, "").length >= 9;

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    }).catch(() => {});
    setTimeout(() => onSubmit({ name, email, phone }), 700);
  }

  return (
    <div
      className="modal-back"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" data-screen-label="Quiz · Contact details">
        <div className="modal-head">
          <div className="row gap-3" style={{ flex: 1 }}>
            <button
              className="btn ghost"
              onClick={onBack}
              aria-label="Back"
              style={{ padding: 8, height: 36, width: 36, borderRadius: 10 }}
            >
              <Icon name="ChevronLeft" size="md" />
            </button>
            <span className="badge blue dot">Final step</span>
            <span className="tiny muted">Your report is ready</span>
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
        <div className="modal-body">
          <div className="stack gap-2">
            <h2 style={{ fontSize: 26, lineHeight: 1.2 }}>
              You&apos;re matched. Where shall we send the report?
            </h2>
            <p className="muted" style={{ fontSize: 15 }}>
              Pop your details in. Your specialist rings you back in as little as 1 hour during
              working hours, with your full report and your matched lender&apos;s indicative offer.
            </p>
          </div>

          <form className="stack gap-4 mt-6" onSubmit={submit}>
            <div className="field">
              <label className="label">Full name</label>
              <input
                className="input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label className="label">Business email</label>
              <input
                className="input"
                type="email"
                placeholder="you@yourcompany.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label className="label">Mobile</label>
              <div className="input-group">
                <span className="prefix">🇬🇧 +44</span>
                <input
                  type="tel"
                  placeholder="7XXX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div
              className="mt-2"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div
                className="tiny"
                style={{
                  color: "var(--blue-700)",
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                What happens next
              </div>
              <ol
                className="stack gap-3"
                style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}
              >
                {[
                  "We call you in as little as 1 hour (working hours) with your matched lender.",
                  "You decide if you like the indicative offer.",
                  "Documents over, soft search confirmed, funded in as soon as 4 hours after sign-off.",
                ].map((s, i) => (
                  <li
                    key={i}
                    className="row gap-3"
                    style={{ alignItems: "flex-start" }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        background: "#fff",
                        border: "1px solid var(--blue-200)",
                        color: "var(--blue-700)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 12,
                        flexShrink: 0,
                      }}
                      className="num"
                    >
                      {i + 1}
                    </span>
                    <span className="small" style={{ color: "var(--text-2)" }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              type="submit"
              className="btn primary xl"
              disabled={!valid || submitting}
              style={{ width: "100%", padding: "18px 22px", marginTop: 6 }}
            >
              {submitting
                ? "Sending…"
                : "Send my report and connect me to my matched lender"}
              {!submitting && <Icon name="ArrowRight" size="sm" />}
            </button>

            <div className="trust-strip" style={{ justifyContent: "center", marginTop: 2 }}>
              <span className="ts-item">
                <Icon name="ShieldCheck" size="sm" /> FCA-regulated brokerage
              </span>
              <span className="ts-item">
                <Icon name="Search" size="sm" /> Soft credit search only
              </span>
              <span className="ts-item">
                <Icon name="Ban" size="sm" /> Data never sold
              </span>
              <span className="ts-item">
                <Icon name="Users" size="sm" /> Matched to one lender
              </span>
            </div>

            <p
              className="tiny muted mt-2"
              style={{
                background: "#F8F9FB",
                border: "1px solid var(--border)",
                padding: 12,
                borderRadius: 10,
                lineHeight: 1.55,
              }}
            >
              By submitting, you agree that Fundsmart AI may share your information with our
              matched FCA-regulated lender and with credit reference and fraud prevention agencies,
              who will run a soft credit search and identity check. A soft search has no impact on
              your credit score. We will not pass your data to third-party marketers or sell it. See
              our Privacy Policy for the full detail.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
