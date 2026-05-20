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
  type TradingLength,
  type TurnoverBand,
  type Urgency,
  emptyAnswers,
  isEmailValid,
  isPhoneValid,
  turnoverBandAnnualValue,
} from "@/lib/state";
import { quizVariants, type ModalStepId, type QuizVariantId } from "@/lib/quizVariants";

import { Icon } from "./ui";
import TopBar from "./TopBar";
import Hero from "./Hero";
import ModalShell from "./ModalShell";
import {
  StepPurpose,
  StepUrgency,
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

export default function QuizApp({ variant = "control" }: { variant?: QuizVariantId }) {
  const variantConfig = quizVariants[variant];
  const totalSteps = variantConfig.heroStepCount + variantConfig.modalSteps.length;
  const [phase, setPhase] = useState<Phase>("landing");
  const [modalIndex, setModalIndex] = useState(0);
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

  // Seed amount from `?amount=` on first mount (e.g. handed off from the
  // /adv-001 sticky rail). Runs once; never overrides a user pick.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seed = new URLSearchParams(window.location.search).get("amount");
    if (!seed) return;
    const valid: Amount[] = ["10k", "25k", "50k", "100k", "250k", "500k", "1m", "other"];
    if ((valid as string[]).includes(seed)) {
      setAnswers((a) => (a.amount ? a : { ...a, amount: seed as Amount }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function setPurpose(v: Purpose) { setAnswers((a) => ({ ...a, purpose: v })) }
  function setTradingLength(v: TradingLength) {
    setAnswers((a) => ({ ...a, tradingLength: v }));
  }
  function setUrgency(v: Urgency) { setAnswers((a) => ({ ...a, urgency: v })) }
  function setTurnoverBand(v: TurnoverBand) {
    const annual = turnoverBandAnnualValue(v);
    setAnswers((a) => ({
      ...a,
      turnoverBand: v,
      annualTurnover: annual,
      monthlyTurnover: Math.round(annual / 12),
    }));
  }
  function setCompany(v: Company | null) {
    setAnswers((a) => ({ ...a, company: v, director: null, dobDay: null }));
  }
  function setDirector(v: Director) {
    setAnswers((a) => ({ ...a, director: v, dobDay: null }));
  }
  function setDobDay(v: number) { setAnswers((a) => ({ ...a, dobDay: v })) }
  function setAnnual(n: number | null) {
    setAnswers((a) => ({ ...a, annualTurnover: n, turnoverBand: null }));
  }
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

  function heroReady() {
    if (variant === "control") return !!answers.amount;
    if (variant === "v2") return !!answers.amount && !!answers.purpose && !!answers.urgency;
    if (variant === "v3") {
      return (
        !!answers.amount &&
        !!answers.turnoverBand &&
        answers.turnoverBand !== "under-200k" &&
        !!answers.tradingLength &&
        answers.tradingLength !== "under-1"
      );
    }
    return !!answers.amount && isEmailValid(answers.email) && isPhoneValid(answers.phone);
  }

  function start() {
    if (!heroReady()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (variant === "v4") {
      void postLead("hero_capture");
    }
    setModalIndex(0);
    setPhase("quiz");
  }

  function close() {
    setPhase("landing");
  }

  function nextFrom(i: number) {
    if (i < variantConfig.modalSteps.length - 1) setModalIndex(i + 1);
    else submitLead();
  }
  function backFrom(i: number) {
    if (i > 0) setModalIndex(i - 1);
    else setPhase("landing");
  }

  function postLead(stage: "hero_capture" | "complete") {
    const c: ContactDetails = {
      name: answers.director?.name ?? "Director",
      email: answers.email ?? "",
      phone: answers.phone ?? "",
    };
    return fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...c, variant, stage, answers }),
    }).catch(() => {});
  }

  function submitLead() {
    setSubmitting(true);
    const c: ContactDetails = {
      name: answers.director?.name ?? "Director",
      email: answers.email ?? "",
      phone: answers.phone ?? "",
    };
    void postLead("complete");
    setTimeout(() => {
      setContact(c);
      setSubmitting(false);
      setPhase("score");
    }, 700);
  }

  function renderModalStep(stepId: ModalStepId, i: number) {
    switch (stepId) {
      case "purpose":
        return (
          <StepPurpose
            value={answers.purpose}
            onChange={setPurpose}
            onNext={() => nextFrom(i)}
          />
        );
      case "urgency":
        return (
          <StepUrgency
            value={answers.urgency}
            onChange={setUrgency}
            onNext={() => nextFrom(i)}
          />
        );
      case "company":
        return (
          <StepCompany
            value={answers.company}
            onChange={setCompany}
            onNext={() => nextFrom(i)}
          />
        );
      case "director":
        return (
          <StepDirector
            company={answers.company}
            value={answers.director}
            onChange={setDirector}
            onNext={() => nextFrom(i)}
          />
        );
      case "dob":
        return (
          <StepDob
            director={answers.director}
            value={answers.dobDay}
            onChange={setDobDay}
            onNext={() => nextFrom(i)}
          />
        );
      case "turnover":
        return (
          <StepTurnover
            annual={answers.annualTurnover}
            monthly={answers.monthlyTurnover}
            onChangeAnnual={setAnnual}
            onChangeMonthly={setMonthly}
            onNext={() => nextFrom(i)}
          />
        );
      case "contact":
        return (
          <StepContact
            residency={answers.residency}
            address={answers.address}
            email={answers.email}
            phone={answers.phone}
            onChange={patchContact}
            onSubmit={() => nextFrom(i)}
            submitting={submitting}
          />
        );
    }
  }

  const modalStep = variantConfig.modalSteps[modalIndex];
  const displayStep = variantConfig.heroStepCount + modalIndex + 1;

  return (
    <div className="page">
      <TopBar />

      <Hero
        variant={variant}
        answers={answers}
        setAmount={setAmount}
        setPurpose={setPurpose}
        setUrgency={setUrgency}
        setTurnoverBand={setTurnoverBand}
        setTradingLength={setTradingLength}
        patchContact={patchContact}
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
            {variant === "control" ? "See my match" : variantConfig.stickyCta}{" "}
            <Icon name="ArrowRight" size="sm" />
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
            {variantConfig.stickyCta}
          </span>
          <span className="tiny muted">{variantConfig.stickySub}</span>
        </div>
        <button className="btn primary" onClick={start}>
          Start <Icon name="ArrowRight" size="sm" />
        </button>
      </div>

      {phase === "quiz" && (
        <ModalShell
          step={displayStep}
          total={totalSteps}
          onBack={() => backFrom(modalIndex)}
          onClose={close}
        >
          {renderModalStep(modalStep, modalIndex)}
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
