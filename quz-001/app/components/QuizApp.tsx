"use client";

import { useState } from "react";
import {
  type Answers,
  type ContactDetails,
  emptyAnswers,
  type Q1,
  type Q2,
  type Q3,
  type Q4,
  type Q5,
  type Q6,
  type Company,
} from "@/lib/state";

import { Icon } from "./ui";
import TopBar from "./TopBar";
import Hero from "./Hero";
import ModalShell from "./ModalShell";
import {
  Q3Purpose,
  Q4Turnover,
  Q5Trading,
  Q6Timing,
  Q7Companies,
  OffRamp,
  type OfframpKind,
} from "./QuizSteps";
import ScoreScreen from "./ScoreScreen";
import ContactScreen from "./ContactScreen";
import SuccessScreen from "./SuccessScreen";
import { Stats, HowItWorks, LenderCompetition, CaseStudies, WhyOneLender, FAQ } from "./Blocks";
import Footer from "./Footer";

type Phase = "landing" | "quiz" | "score" | "contact" | "success";

export default function QuizApp() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [step, setStep] = useState(3);
  const [offramp, setOfframp] = useState<OfframpKind | null>(null);
  const [contact, setContact] = useState<ContactDetails | null>(null);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);

  function setQ1(v: Q1) { setAnswers((a) => ({ ...a, q1: v })) }
  function setQ2(v: Q2) { setAnswers((a) => ({ ...a, q2: v })) }
  function setQ3(v: Q3) { setAnswers((a) => ({ ...a, q3: v })) }
  function setQ4(v: Q4) { setAnswers((a) => ({ ...a, q4: v })) }
  function setQ5(v: Q5) { setAnswers((a) => ({ ...a, q5: v })) }
  function setQ6(v: Q6) { setAnswers((a) => ({ ...a, q6: v })) }
  function setQ7(v: Company | null) { setAnswers((a) => ({ ...a, q7: v })) }

  function start() {
    if (!answers.q1 || !answers.q2) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep(3);
    setPhase("quiz");
  }

  function close() {
    setPhase("landing");
    setOfframp(null);
  }

  function nextFrom(s: number) {
    if (s < 7) setStep(s + 1);
    else setPhase("score");
  }
  function backFrom(s: number) {
    if (s > 3) setStep(s - 1);
    else setPhase("landing");
  }

  return (
    <div className="page">
      <TopBar onStart={start} />

      <Hero
        q1={answers.q1}
        setQ1={setQ1}
        q2={answers.q2}
        setQ2={setQ2}
        onContinue={start}
      />

      <Stats />
      <HowItWorks />
      <LenderCompetition />
      <CaseStudies />
      <WhyOneLender />
      <FAQ />

      {/* Final CTA band */}
      <section
        className="section"
        style={{
          background: "linear-gradient(180deg, var(--navy-800) 0%, var(--navy-900) 100%)",
          color: "#fff",
        }}
        data-screen-label="Final CTA"
      >
        <div
          className="container narrow center stack gap-4"
          style={{ alignItems: "center" }}
        >
          <h2 style={{ color: "#fff", maxWidth: 720 }}>
            Get matched in 2 minutes. Soft search only.
          </h2>
          <p style={{ color: "rgba(230,237,248,.85)", maxWidth: 560 }}>
            One application. One matched lender. One specialist on the phone in as little as
            1 hour during working hours.
          </p>
          <button className="btn primary xl" style={{ marginTop: 8 }} onClick={start}>
            See my Funding Fitness Score <Icon name="ArrowRight" size="sm" />
          </button>
        </div>
      </section>

      <Footer />

      {/* Sticky mobile bottom */}
      <div className="sticky-cta">
        <div className="stack" style={{ gap: 0 }}>
          <span style={{ fontWeight: 700, color: "var(--navy-900)", fontSize: 14 }}>
            Get matched in 2 minutes
          </span>
          <span className="tiny muted">Soft search only · no credit impact</span>
        </div>
        <button className="btn primary" onClick={start}>
          Start <Icon name="ArrowRight" size="sm" />
        </button>
      </div>

      {/* Quiz modal */}
      {phase === "quiz" && !offramp && (
        <ModalShell step={step} total={7} onBack={() => backFrom(step)} onClose={close}>
          {step === 3 && (
            <Q3Purpose value={answers.q3} onChange={setQ3} onNext={() => nextFrom(3)} />
          )}
          {step === 4 && (
            <Q4Turnover
              value={answers.q4}
              onChange={setQ4}
              onNext={() => nextFrom(4)}
              setOfframp={setOfframp}
            />
          )}
          {step === 5 && (
            <Q5Trading
              value={answers.q5}
              onChange={setQ5}
              onNext={() => nextFrom(5)}
              setOfframp={setOfframp}
            />
          )}
          {step === 6 && (
            <Q6Timing value={answers.q6} onChange={setQ6} onNext={() => nextFrom(6)} />
          )}
          {step === 7 && (
            <Q7Companies
              value={answers.q7}
              onChange={setQ7}
              onNext={() => nextFrom(7)}
              setOfframp={setOfframp}
            />
          )}
        </ModalShell>
      )}

      {/* Off-ramp overlay (inside quiz) */}
      {phase === "quiz" && offramp && (
        <ModalShell step={step} total={7} onBack={() => setOfframp(null)} onClose={close}>
          <OffRamp kind={offramp} onBack={() => setOfframp(null)} />
        </ModalShell>
      )}

      {phase === "score" && (
        <ScoreScreen
          answers={answers}
          onContinue={() => setPhase("contact")}
          onClose={close}
        />
      )}
      {phase === "contact" && (
        <ContactScreen
          answers={answers}
          onSubmit={(c) => {
            setContact(c);
            setPhase("success");
          }}
          onClose={close}
          onBack={() => setPhase("score")}
        />
      )}
      {phase === "success" && contact && (
        <SuccessScreen
          answers={answers}
          contact={contact}
          onClose={() => {
            setPhase("landing");
            setContact(null);
          }}
        />
      )}
    </div>
  );
}
