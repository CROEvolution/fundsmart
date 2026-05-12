"use client";

import { useEffect, useRef, useState } from "react";
import {
  type Answers,
  type ContactDetails,
  type AddressSuggestion,
  type Amount,
  type Company,
  type Director,
  type Purpose,
  type Residency,
  emptyAnswers,
} from "@/lib/state";

import { Icon } from "./ui";
import TopBar from "./TopBar";
import Hero from "./Hero";
import ModalShell from "./ModalShell";
import {
  StepPurpose,
  StepCompany,
  StepDirector,
  StepDob,
  StepTurnover,
  StepContact,
} from "./QuizSteps";
import ScoreScreen from "./ScoreScreen";
import SuccessScreen from "./SuccessScreen";
import { Stats, HowItWorks, LenderCompetition, CaseStudies, WhyOneLender, FAQ } from "./Blocks";
import Footer from "./Footer";

type Phase = "landing" | "quiz" | "score" | "success";

// Step 1 = hero (amount). Steps 2..7 live in the modal.
const TOTAL_STEPS = 7;
const MODAL_START = 2;
const MODAL_END = 7;

export default function QuizApp() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [step, setStep] = useState(MODAL_START);
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState<ContactDetails | null>(null);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);

  // Sticky bottom CTA only shows once the hero card is off-screen.
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const [heroCardVisible, setHeroCardVisible] = useState(true);
  useEffect(() => {
    const el = heroCardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroCardVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function setAmount(v: Amount) { setAnswers((a) => ({ ...a, amount: v })) }
  function setPurpose(v: Purpose) { setAnswers((a) => ({ ...a, purpose: v })) }
  function setCompany(v: Company | null) {
    setAnswers((a) => ({ ...a, company: v, director: null, dobDay: null }));
  }
  function setDirector(v: Director) {
    setAnswers((a) => ({ ...a, director: v, dobDay: null }));
  }
  function setDobDay(v: number) { setAnswers((a) => ({ ...a, dobDay: v })) }
  function setAnnual(n: number | null) { setAnswers((a) => ({ ...a, annualTurnover: n })) }
  function setMonthly(n: number | null) { setAnswers((a) => ({ ...a, monthlyTurnover: n })) }
  function patchContact(p: {
    residency?: Residency;
    address?: AddressSuggestion | null;
    email?: string;
    phone?: string;
  }) {
    setAnswers((a) => ({
      ...a,
      residency: p.residency ?? a.residency,
      address: p.address === undefined ? a.address : p.address,
      email: p.email ?? a.email,
      phone: p.phone ?? a.phone,
    }));
  }

  function start() {
    if (!answers.amount) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep(MODAL_START);
    setPhase("quiz");
  }

  function close() {
    setPhase("landing");
  }

  function nextFrom(s: number) {
    if (s < MODAL_END) setStep(s + 1);
    else submitLead();
  }
  function backFrom(s: number) {
    if (s > MODAL_START) setStep(s - 1);
    else setPhase("landing");
  }

  function submitLead() {
    setSubmitting(true);
    const c: ContactDetails = {
      name: answers.director?.name ?? "Director",
      email: answers.email ?? "",
      phone: answers.phone ?? "",
    };
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...c, answers }),
    }).catch(() => {});
    setTimeout(() => {
      setContact(c);
      setSubmitting(false);
      setPhase("score");
    }, 700);
  }

  return (
    <div className="page">
      <TopBar />

      <Hero
        amount={answers.amount}
        setAmount={setAmount}
        onContinue={start}
        cardRef={heroCardRef}
      />

      <Stats />
      <HowItWorks />
      <LenderCompetition />
      <CaseStudies />
      <WhyOneLender />
      <FAQ />

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
            See my match <Icon name="ArrowRight" size="sm" />
          </button>
        </div>
      </section>

      <Footer />

      <div
        className="sticky-cta"
        data-visible={heroCardVisible ? "false" : "true"}
        aria-hidden={heroCardVisible ? "true" : "false"}
      >
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

      {phase === "quiz" && (
        <ModalShell
          step={step}
          total={TOTAL_STEPS}
          onBack={() => backFrom(step)}
          onClose={close}
        >
          {step === 2 && (
            <StepPurpose
              value={answers.purpose}
              onChange={setPurpose}
              onNext={() => nextFrom(2)}
            />
          )}
          {step === 3 && (
            <StepCompany
              value={answers.company}
              onChange={setCompany}
              onNext={() => nextFrom(3)}
            />
          )}
          {step === 4 && (
            <StepDirector
              company={answers.company}
              value={answers.director}
              onChange={setDirector}
              onNext={() => nextFrom(4)}
            />
          )}
          {step === 5 && (
            <StepDob
              director={answers.director}
              value={answers.dobDay}
              onChange={setDobDay}
              onNext={() => nextFrom(5)}
            />
          )}
          {step === 6 && (
            <StepTurnover
              annual={answers.annualTurnover}
              monthly={answers.monthlyTurnover}
              onChangeAnnual={setAnnual}
              onChangeMonthly={setMonthly}
              onNext={() => nextFrom(6)}
            />
          )}
          {step === 7 && (
            <StepContact
              residency={answers.residency}
              address={answers.address}
              email={answers.email}
              phone={answers.phone}
              onChange={patchContact}
              onSubmit={submitLead}
              submitting={submitting}
            />
          )}
        </ModalShell>
      )}

      {phase === "score" && (
        <ScoreScreen
          answers={answers}
          onContinue={() => setPhase("success")}
          onClose={close}
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
