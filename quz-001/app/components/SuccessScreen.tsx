"use client";

import { useMemo } from "react";
import { type Answers, computeProfile, type ContactDetails, fmtGBP } from "@/lib/state";
import Icon from "./ui/Icon";

export default function SuccessScreen({
  answers,
  contact,
  onClose,
}: {
  answers: Answers;
  contact: ContactDetails;
  onClose: () => void;
}) {
  const profile = useMemo(() => computeProfile(answers), [answers]);
  return (
    <div
      className="modal-back"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" data-screen-label="Quiz · Success">
        <div className="modal-body" style={{ padding: "40px 28px", textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "var(--emerald-50)",
              color: "var(--emerald-700)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Icon name="CheckCircle2" size="lg" />
          </div>
          <h2 className="mt-4" style={{ fontSize: 28 }}>
            Got it, {contact.name.split(" ")[0]}. Your match is queued.
          </h2>
          <p className="muted mt-3" style={{ maxWidth: 480, margin: "12px auto 0" }}>
            We&apos;ve got your details. Your specialist will ring{" "}
            <span className="num" style={{ fontWeight: 700, color: "var(--navy-900)" }}>
              +44 {contact.phone}
            </span>{" "}
            in as little as 1 hour during working hours, with your full report and the indicative
            offer from your matched lender.
          </p>
          <div
            className="mt-6"
            style={{
              background: "var(--bg)",
              borderRadius: 12,
              border: "1px solid var(--border)",
              padding: 20,
              textAlign: "left",
            }}
          >
            <div className="row between mb-3">
              <span
                className="tiny muted"
                style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}
              >
                Your match summary
              </span>
              <span className="badge emerald dot">Locked in</span>
            </div>
            <div className="stack gap-2 small">
              <Row k="Funding Fitness Score" v={`${profile.score} / 100`} />
              <Row k="Indicative range" v={`${fmtGBP(profile.low)} – ${fmtGBP(profile.high)}`} />
              <Row k="Indicative rate from" v={`${profile.apr}% APR`} />
              <Row k="Report sent to" v={contact.email} />
            </div>
          </div>
          <button className="btn lg mt-6" onClick={onClose}>
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="row between">
      <span className="muted">{k}</span>
      <span className="num" style={{ fontWeight: 700, color: "var(--navy-900)" }}>
        {v}
      </span>
    </div>
  );
}
