"use client";

import { useState } from "react";
import TopBar from "@/app/quz-001/components/TopBar";
import Footer from "@/app/quz-001/components/Footer";
import Icon from "@/app/quz-001/components/ui/Icon";
import { AMOUNT_LABEL, type Amount } from "@/lib/state";

const QUIZ_HREF = "/quz-001";
const AMOUNTS: Amount[] = ["10k", "25k", "50k", "100k", "250k", "1m"];

function quizHref(amount: Amount | null): string {
  return amount ? `${QUIZ_HREF}?amount=${encodeURIComponent(amount)}` : QUIZ_HREF;
}

export default function Advertorial() {
  return (
    <div className="page">
      <SponsoredBar />
      <TopBar />
      <div className="adv-shell">
        <div className="adv-layout">
          <main className="adv-main">
            <HeroContent />
            <Article />
          </main>
          <aside className="adv-rail" aria-label="Eligibility check">
            <RailCard />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function SponsoredBar() {
  return (
    <div className="adv-sponsored">
      <div className="adv-sponsored-inner">
        <span className="ad-label">Sponsored Editorial</span>
        <span>Business Finance</span>
      </div>
    </div>
  );
}

function HeroContent() {
  return (
    <header className="adv-hero">
      <span className="adv-eyebrow">
        Government-Backed Funding
        <span className="sep" />
        UK SMEs
      </span>
      <h1>
        A <span className="accent">£3 Billion</span> Government Fund Is Quietly
        Funding the SMEs Banks Refuse to Lend To
      </h1>
      <p className="adv-deck">
        After 2008, regulators forced high-street banks to hoard capital. The
        Treasury&apos;s answer, fifteen years later, is a government-backed
        scheme that pays lenders to say yes to the businesses Barclays says no
        to. Few business owners have heard of it. Even fewer know they qualify.
      </p>
      <div className="adv-byline">
        <span>
          By <span className="byline-author">The Fundsmart Editorial Team</span>
        </span>
        <span className="byline-dot" />
        <span>Updated 11 May 2026</span>
        <span className="byline-dot" />
        <span>9 minute read</span>
      </div>

      <figure className="adv-figure">
        <div className="adv-figure-art">
          <div className="adv-figure-overlay">
            <div className="stat-row">
              <div>
                <div className="big">
                  £3B<small>+</small>
                </div>
                <div className="lbl">Scheme allocation</div>
              </div>
              <div>
                <div className="big">
                  70<small>%</small>
                </div>
                <div className="lbl">Lender risk backed</div>
              </div>
              <div>
                <div className="big">£250k</div>
                <div className="lbl">Per-loan ceiling</div>
              </div>
            </div>
            <h3>
              A Treasury-backed lending facility, administered by the British
              Business Bank, built for the operators the high street stopped
              serving.
            </h3>
          </div>
        </div>
        <figcaption className="adv-figure-caption">
          <strong>The Growth Guarantee Scheme at a glance.</strong> A government
          guarantee that covers 70p in every pound a lender risks on a
          qualifying UK SME. Loans run from £1,000 to £250,000.
        </figcaption>
      </figure>
      <hr className="adv-article-divider" />
    </header>
  );
}

function RailCard() {
  const [amount, setAmount] = useState<Amount | null>(null);
  const href = quizHref(amount);

  return (
    <>
      <div className="adv-rail-card">
        <div className="adv-rail-head">
          <div className="progress-label">
            <span>
              Step <span className="num">1</span> of 7
            </span>
            <span>About 90 seconds left</span>
          </div>
          <div className="progress progress-shimmer" aria-hidden="true">
            <span style={{ width: "14%" }} />
          </div>
        </div>
        <div className="adv-rail-body">
          <h3 className="adv-rail-title">
            See what you qualify for in 2 minutes
          </h3>
          <p className="adv-rail-sub">
            One soft credit search. One matched lender from a panel of 100+
            FCA-regulated firms.
          </p>

          <span className="adv-rail-question">How much funding do you need?</span>
          <div className="adv-rail-grid">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                className={`adv-rail-chip ${amount === a ? "active" : ""}`}
                aria-pressed={amount === a}
                onClick={() => setAmount(a)}
              >
                {AMOUNT_LABEL[a]}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`adv-rail-other ${amount === "other" ? "active" : ""}`}
            onClick={() => setAmount("other")}
            aria-pressed={amount === "other"}
          >
            Other amount →
          </button>

          <a
            className="btn primary xl adv-rail-cta"
            href={href}
            aria-disabled={!amount}
          >
            {amount ? "Continue" : "Pick an amount to continue"}
            <Icon name="ArrowRight" size="sm" />
          </a>

          <div className="adv-rail-micro">
            <span>
              <Icon name="ShieldCheck" size="sm" /> No credit impact
            </span>
            <span>
              <Icon name="Clock" size="sm" /> ~2 minutes
            </span>
            <span>
              <Icon name="Lock" size="sm" /> Data never sold
            </span>
          </div>
        </div>
      </div>

      <div className="adv-rail-trust">
        <div className="row">
          <Icon name="ShieldCheck" size="sm" />
          <span>
            <strong>FCA-regulated.</strong> Fundsmart AI is an independent
            credit broker.
          </span>
        </div>
        <div className="row">
          <Icon name="Users" size="sm" />
          <span>
            <strong>142,468+</strong> UK businesses funded through the platform.
          </span>
        </div>
      </div>
    </>
  );
}

function Article() {
  return (
    <section className="adv-article">
      <div className="adv-article-col">
        <Lede />
        <ProblemSection />
        <RevealSection />
        <MechanismSection />
        <EligibilitySection />
        <CaseStudiesSection />
        <FaqSection />
        <CtaSection />
        <AuthorBio />
      </div>
    </section>
  );
}

function Lede() {
  return (
    <>
      <p className="adv-lede">
        A construction firm in the North-West, eight years trading, just under
        half a million in turnover. Order book full. Three vans on the road. The
        owner walked into his Barclays branch on a Monday in March, asked for a
        £20,000 working-capital loan to cover materials on a contract that
        started the following week, and waited.
      </p>
      <p>
        Two weeks later he got the letter. Declined. No proper reason given,
        just a line about the risk profile not matching internal criteria. He
        spent that weekend turning down an £80,000 contract because he could
        not buy the materials to start it.
      </p>
      <p>
        His story is not unusual. The British Business Bank&apos;s own figures
        put rejection rates on small-business loan applications at around 40%.
        Most of those declines are not about the borrower. They are about the
        lender&apos;s regulatory ceiling, set in Basel committee rooms a long
        way from a yard in Salford.
      </p>
      <p>
        There is, however, a route that almost none of the owners we speak to
        have heard of. It is not a workaround. It is not a fintech promise. It
        is a Treasury-backed scheme, administered by the British Business Bank,
        that was built specifically because the high street stopped lending to
        businesses like the one in our opening paragraph. This article explains
        what it is, how it works, who qualifies, and what the catch is.
      </p>
      <p>
        <a className="adv-inline-cta" href={QUIZ_HREF}>
          See what you qualify for in two minutes
          <Icon name="ArrowRight" size="sm" />
        </a>
      </p>
    </>
  );
}

function ProblemSection() {
  return (
    <>
      <h2>Why the bank said no, and why it wasn&apos;t about you</h2>
      <p>
        For most of the past decade, &ldquo;the bank said no&rdquo; has been
        treated as a private failing. Owners hear it as a verdict on the
        business. Often it is the opposite.
      </p>
      <p>
        After the 2008 financial crisis, regulators rewrote the rules for how
        much capital banks have to hold against the loans they make. The
        post-crisis framework, broadly known as Basel III, was tightened again
        through the 2010s. The intent was good. Banks should not blow up. The
        unintended consequence was that lending to anything that looked even
        slightly non-standard, including most SMEs without freehold property as
        collateral, became expensive on a bank&apos;s balance sheet.
      </p>

      <blockquote className="adv-pull">
        &ldquo;The bank that wants to say yes to you is constrained by a model
        written in 2009. It treats your contracts and your real cashflow as
        decoration. It treats last year&apos;s filed accounts as gospel. If you
        have grown, the model has not caught up.&rdquo;
        <cite>SME lending analyst, trade body source</cite>
      </blockquote>

      <p>
        Around 40% of UK small-business loan applications now end in a no. That
        figure is not a comment on the books of those businesses. It is a
        comment on the cost, to the bank, of saying yes.
      </p>
      <p>
        The emotional weight of this lands hardest on the operators who have
        done everything right. Twenty years with the same business banking
        provider. A clean payment history. Profitable trading. Walk in with a
        request that is small relative to turnover, and walk out with a polite
        refusal. The shame of that letter is the wrong response to it. It is not
        a verdict on you. It is a structural failure of the credit market the
        Treasury identified more than a decade ago, and has been trying to fix
        ever since.
      </p>
      <p>
        <a className="adv-inline-cta" href={QUIZ_HREF}>
          Run a two-minute eligibility check
          <Icon name="ArrowRight" size="sm" />
        </a>
      </p>
    </>
  );
}

function RevealSection() {
  return (
    <>
      <h2>What the Growth Guarantee Scheme actually is</h2>
      <p>
        The Growth Guarantee Scheme is the Treasury&apos;s current answer to
        that structural failure. It is administered by the British Business
        Bank, the government-owned development bank set up in 2014 to fix the
        SME funding gap. The scheme allocates a fund of nearly £3 billion to
        back lending to UK businesses that the high street is otherwise unable
        to underwrite.
      </p>
      <p>The mechanism is straightforward, and it is the part that most owners do not realise.</p>
      <p>
        When a participating lender, an FCA-regulated commercial lender, decides
        whether to fund your business, they are weighing the upside against the
        risk that you cannot repay. Under the scheme, the government guarantees
        70% of the lender&apos;s loss on the loan if you default. That is the
        lever. The lender&apos;s downside is cut by more than two thirds. The
        &ldquo;no&rdquo; they would otherwise have to give you, on a model that
        was written for a 2009 world, becomes a &ldquo;yes&rdquo; at a rate the
        lender can defend to their own credit committee.
      </p>
      <p>
        Loans under the scheme run from £1,000 to £250,000. Terms vary by
        lender, by product, and by the borrower&apos;s profile. The British
        Business Bank publishes the headline framework; the participating
        lenders set the specifics.
      </p>
      <p>
        And, in the GGS context specifically, there is a feature that matters
        more than any rate sheet. Under the scheme&apos;s rules, your primary
        residence is off the table as security. Your home stays safe. That
        single design choice is what unlocks the scheme for the operators who,
        for years, have refused to grow because growing meant putting a charge
        on the family home.
      </p>

      <aside className="adv-sidebar">
        <div className="adv-sidebar-head">Sidebar</div>
        <h3>What the scheme is. What it isn&apos;t.</h3>
        <div className="adv-sidebar-grid">
          <div className="is">
            <h4>It is</h4>
            <ul>
              <li>
                <span className="ico-mark">
                  <Icon name="Check" size="sm" strokeWidth={2.5} />
                </span>
                <span>
                  A government-backed lending facility administered by the
                  British Business Bank.
                </span>
              </li>
              <li>
                <span className="ico-mark">
                  <Icon name="Check" size="sm" strokeWidth={2.5} />
                </span>
                <span>
                  A guarantee that covers 70% of the lender&apos;s loss in the
                  event of borrower default.
                </span>
              </li>
              <li>
                <span className="ico-mark">
                  <Icon name="Check" size="sm" strokeWidth={2.5} />
                </span>
                <span>
                  Available for loans between £1,000 and £250,000 to UK limited
                  companies and partnerships.
                </span>
              </li>
              <li>
                <span className="ico-mark">
                  <Icon name="Check" size="sm" strokeWidth={2.5} />
                </span>
                <span>
                  Designed so that your primary residence is off the table as
                  security.
                </span>
              </li>
            </ul>
          </div>
          <div className="isnt">
            <h4>It isn&apos;t</h4>
            <ul>
              <li>
                <span className="ico-mark">
                  <Icon name="X" size="sm" strokeWidth={2.5} />
                </span>
                <span>A grant. This is debt finance. You pay it back.</span>
              </li>
              <li>
                <span className="ico-mark">
                  <Icon name="X" size="sm" strokeWidth={2.5} />
                </span>
                <span>
                  A direct government loan. The lender is a private
                  FCA-regulated firm. The government&apos;s role is to guarantee
                  a portion of the lender&apos;s risk.
                </span>
              </li>
              <li>
                <span className="ico-mark">
                  <Icon name="X" size="sm" strokeWidth={2.5} />
                </span>
                <span>
                  Available to sole traders or individuals. The scheme is for
                  trading businesses.
                </span>
              </li>
              <li>
                <span className="ico-mark">
                  <Icon name="X" size="sm" strokeWidth={2.5} />
                </span>
                <span>
                  Available without underwriting. The guarantee changes the
                  maths, not the diligence.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

function MechanismSection() {
  const steps = [
    {
      title: "Two-minute eligibility check",
      body: "An owner runs through a short questionnaire that captures turnover band, trading length, and funding purpose. The check uses Companies House data on the back end to confirm the registered entity. No documents required at this stage. The credit search is soft, visible to you, invisible to other lenders, and it does not move your score.",
    },
    {
      title: "Matched lender",
      body: "Once the basic profile is confirmed, the broker's matching system narrows the panel of 100+ FCA-regulated lenders to the one whose underwriting model is most likely to approve the file. Only that lender sees the application. Your data is not flogged across a panel; the cowboy-broker model is what tanks credit files and produces the spam calls most operators have learned to dread.",
    },
    {
      title: "Specialist call",
      body: "A human specialist, not an automated chatbot, walks through the proposed structure with the owner. Indicative rates, term, and any additional documents required for sign-off are agreed on the call.",
    },
    {
      title: "Documents and approval",
      body: "With the documents back, the lender confirms the approval. Approval is possible in as little as one hour during working hours.",
    },
    {
      title: "Funded",
      body: "After documents are signed off, funds can land in your business account in as soon as 4 hours in the fastest cases. Typical fundings sit at 24 to 48 hours.",
    },
  ];

  return (
    <>
      <h2>How it works in practice</h2>
      <p>
        The scheme is the policy. The application is where it lives or dies for
        most owners. The route that has emerged as the fastest, for the segment
        of the market the high street ignores, runs through specialist
        FCA-regulated brokers who hold a panel of participating lenders.
        Fundsmart AI is one of those brokers, and the steps below describe how
        an application typically moves from a phone in a yard to money in a
        business account.
      </p>

      <div className="adv-steps">
        {steps.map((s, i) => (
          <div className="adv-step" key={s.title}>
            <div className="n">{i + 1}</div>
            <div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p>
        A note on the matching engine. Lenders publish their underwriting boxes,
        the turnover floor, trading length, industry codes, lend size, security
        preferences. A modern broker holds those boxes in software and
        cross-references each new applicant against the panel in real time. The
        result is that one application can be qualified across a panel of 100+
        FCA-regulated lenders without a stack of duplicate hard credit
        searches. This is the part that the 2008-era bank model cannot match.
        Your contracts, your real cashflow via open banking, and your trading
        history are weighted by the matching engine in a way no high-street
        algorithm currently does.
      </p>

      <p>
        <a className="adv-inline-cta" href={QUIZ_HREF}>
          Run the two-minute fitness check
          <Icon name="ArrowRight" size="sm" />
        </a>
      </p>
    </>
  );
}

function EligibilitySection() {
  return (
    <>
      <h2>Who it is for, and who it is not</h2>
      <p>
        The scheme is designed for established UK trading businesses.
        Eligibility, on the broker-channel route specifically, sits roughly as
        follows. Worth confirming with a specialist before assuming you do or do
        not qualify.
      </p>
      <ul>
        <li>
          <strong>Entity type.</strong> UK limited company or partnership. Sole
          traders and individuals are not eligible under the Fundsmart panel.
        </li>
        <li>
          <strong>Trading length.</strong> A year of trading or more.
          Earlier-stage businesses are better served by the British Business
          Bank&apos;s Start Up Loan scheme, which is a separate programme.
        </li>
        <li>
          <strong>Turnover floor.</strong> Roughly £200,000 in annual turnover
          and up. Below that, the lender panel will engage on a narrower set of
          products.
        </li>
        <li>
          <strong>Use of funds.</strong> Working capital, growth, equipment,
          contract bridging, VAT or HMRC obligations, refinancing. Most ordinary
          business reasons fit.
        </li>
      </ul>
      <p>
        In practice, the operators who get the strongest matches across the
        panel sit in a handful of industry profiles. Construction and trades,
        where contracts are large and payment cycles long. E-commerce, where
        stock funding for peak seasons is the difference between a quiet year
        and a record one. Services businesses with predictable monthly revenue.
        Manufacturers with order books the high street cannot read. Hospitality
        and food groups with multi-site plans.
      </p>
      <p>
        If you do not yet fit the eligibility floor, there is no harm done by
        checking. The eligibility quiz routes early-stage operators to the
        British Business Bank&apos;s Start Up Loan programme and other
        early-stage products without taking their details. The principle is
        simple. We would rather lose a five-minute conversation today than waste
        an afternoon on an application that was never going to fund.
      </p>
    </>
  );
}

function CaseStudiesSection() {
  const cases = [
    {
      meta: "£400k turnover · Construction · North-West",
      funded: "£50,000 line · funded in 24h",
      body: "An eight-year-old construction business, profitable, growing, with a full order book. Their twenty-year banking relationship at Barclays produced a no on a £20,000 working-capital request. The owner came in to Fundsmart with an £80,000 contract on the table and no cash to start it. One soft credit search. One matched lender. A £50,000 line of credit landed inside 24 hours. The owner drew down £18,000, bought materials, started the contract, and repaid the draw at the end of the month for around £200 in interest. Turnover is up 60% in the six months since.",
    },
    {
      meta: "Sarah L. · E-commerce · London",
      funded: "£150,000 stock · funded in 48h",
      body: "A peak-season stock funding case. Sarah needed £150,000 of inventory ahead of a Q4 push, and she had been burned by comparison-site brokers in the past. One application. One matched lender. Funded inside 48 hours. The most important detail, in her own words, was that her phone did not ring for a fortnight afterwards with brokers chasing the same file.",
    },
    {
      meta: "James M. · Construction · Manchester",
      funded: "£75,000 · funded next day",
      body: "A clean trading history, a full order book, and a bank that declined the funding anyway. James was matched to a single specialist lender on the panel inside the quiz, completed a soft credit search, and had £75,000 in his account the next day. He came back the following year on a larger contract and took out a second facility through the same channel.",
    },
  ];

  return (
    <>
      <h2>Three operators, one route</h2>
      <p>
        Three short narratives, drawn from real Fundsmart fundings, that show
        what the scheme and the matching mechanism can do in practice.
      </p>

      <div className="adv-cases">
        {cases.map((c) => (
          <article className="adv-case" key={c.funded}>
            <header className="adv-case-meta">
              <span className="funded-pill">
                <Icon name="CircleCheckBig" size="sm" />
                {c.funded}
              </span>
              <span className="case-title">{c.meta}</span>
            </header>
            <p>{c.body}</p>
          </article>
        ))}
      </div>

      <p>
        The thread across all three is mundane in its way. There is no headline
        trick. There is no proprietary product. There is a panel of
        FCA-regulated lenders, a matching engine that uses the right inputs,
        and a scheme that lets those lenders say yes to operators their model
        would have rejected on its own.
      </p>

      <p>
        <a className="adv-inline-cta" href={QUIZ_HREF}>
          See your funding range in two minutes
          <Icon name="ArrowRight" size="sm" />
        </a>
      </p>
    </>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "Is this just another comparison site?",
      a: "No. A comparison site sells your details across a panel of brokers, each of whom files an application with one or more lenders. The result, predictably, is a stack of hard credit pulls and a phone that rings for weeks. The broker-panel model that Fundsmart runs is different by design. One application matches to one lender. Your data does not get sold on. If the matched lender declines, a human specialist routes a second pre-qualification on the panel.",
    },
    {
      q: "Will checking my eligibility hurt my credit score?",
      a: "No. The eligibility check uses a soft credit search only. A soft search is visible to you on your credit file. It is invisible to other lenders. It does not move your credit score, and it does not stack with other recent applications to produce the distressed-file signal that hard pulls create.",
    },
    {
      q: "What if I am declined?",
      a: "Your specialist looks at the file and routes you to a second pre-qualification on the panel of 100+ FCA-regulated lenders. If nothing on the panel fits, we say so plainly, and where possible we point you to a programme that does. Wasting an afternoon is not in anyone's interest.",
    },
    {
      q: "What does it cost?",
      a: "Nothing on the borrower side. Fundsmart is paid by the lender on the back of a completed funding. You pay the lender's disclosed interest rate, and any product fee the lender publishes up front. There is no Fundsmart fee on top.",
    },
    {
      q: "Why hasn't my accountant told me about this?",
      a: "Most accountants are not lending specialists. The scheme is recent enough, in its current form, that the broker channel has been the fastest route in. Accountants are excellent at structuring the numbers in support of an application. The matching to the right lender is what brokers do.",
    },
    {
      q: "Is this regulated?",
      a: "Yes. Fundsmart is an FCA-regulated broker. The lender partners on the panel are FCA-regulated firms. The Growth Guarantee Scheme itself is a Treasury-backed programme administered by the British Business Bank. The compliance footprint here is heavier than on a standard commercial loan, not lighter.",
    },
  ];

  return (
    <>
      <h2>Six questions every owner asks first</h2>
      <p>
        Six questions come up on every initial call. They are the questions that
        turn a curious reader into a funded operator, or stop them at the
        threshold. Plain answers below.
      </p>

      <div className="adv-faq">
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>
              <span>{f.q}</span>
              <span className="plus" aria-hidden="true">
                <Icon name="Plus" size="sm" strokeWidth={2.25} />
              </span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>

      <p>
        <a className="adv-inline-cta" href={QUIZ_HREF}>
          Check whether your business qualifies
          <Icon name="ArrowRight" size="sm" />
        </a>
      </p>
    </>
  );
}

function CtaSection() {
  return (
    <>
      <h2>See what you actually qualify for</h2>
      <p>
        If after reading this you would like to see what your business actually
        qualifies for, the entry point is a two-minute eligibility check.
      </p>

      <div className="adv-cta-block">
        <h3>What happens on the next page</h3>
        <ul>
          <li>
            <span className="ico-mark">
              <Icon name="Check" size="sm" strokeWidth={2.5} />
            </span>
            <span>
              Seven short questions, mostly chip-buttons, no documents required.
            </span>
          </li>
          <li>
            <span className="ico-mark">
              <Icon name="Check" size="sm" strokeWidth={2.5} />
            </span>
            <span>A live Companies House lookup confirms your registered entity.</span>
          </li>
          <li>
            <span className="ico-mark">
              <Icon name="Check" size="sm" strokeWidth={2.5} />
            </span>
            <span>
              The check uses a soft credit search only. It does not affect your
              credit score.
            </span>
          </li>
          <li>
            <span className="ico-mark">
              <Icon name="Check" size="sm" strokeWidth={2.5} />
            </span>
            <span>
              At the end you see your Funding Fitness Score, an indicative
              funding range, and a route to a specialist call with your matched
              lender.
            </span>
          </li>
          <li>
            <span className="ico-mark">
              <Icon name="Check" size="sm" strokeWidth={2.5} />
            </span>
            <span>Your data is never sold to third parties.</span>
          </li>
        </ul>

        <a className="btn primary xl" href={QUIZ_HREF}>
          See what you qualify for
          <Icon name="ArrowRight" size="sm" />
        </a>

        <p className="cta-foot">
          Average time to complete the check is around two minutes. Approval, in
          the fastest cases, follows in as little as one hour during working
          hours. Funding can land in as soon as 4 hours after documents are
          signed off, with typical fundings completing inside 24 to 48 hours.
        </p>
      </div>

      <div className="adv-disclosure">
        <strong>Compliance disclosure</strong>
        Fundsmart AI is an FCA-regulated credit broker, not a lender. By
        starting the eligibility check, you agree that Fundsmart may share your
        information with a matched FCA-regulated lender and with credit
        reference and fraud prevention agencies, who will run a soft credit
        search and identity check. A soft search has no impact on your credit
        score and is invisible to other lenders. Fundsmart does not pass your
        data to third-party marketers, and does not sell it. The Growth
        Guarantee Scheme is administered by the British Business Bank. Loans
        made under the scheme are subject to lender underwriting and scheme
        eligibility criteria. Loans are available to UK limited companies and
        partnerships; sole traders are not eligible on the Fundsmart panel. See
        our Privacy Policy and Terms for the full detail.
      </div>
    </>
  );
}

function AuthorBio() {
  return (
    <aside className="adv-author">
      <div className="adv-author-mark" aria-hidden="true">
        FS
      </div>
      <div>
        <h3>About the Fundsmart Editorial Team</h3>
        <p>
          Fundsmart AI is an independent UK credit broker authorised and
          regulated by the Financial Conduct Authority. The editorial team
          writes about SME finance, government-backed lending, and the practical
          mechanics of getting funded in the United Kingdom. Articles are
          reviewed for accuracy by Fundsmart&apos;s compliance lead before
          publication.
        </p>
        <ul className="adv-author-creds">
          <li>
            <Icon name="ShieldCheck" size="sm" /> FCA-regulated brokerage
          </li>
          <li>
            <Icon name="Users" size="sm" /> 142,468+ UK businesses funded through the platform to date
          </li>
          <li>
            <Icon name="Building2" size="sm" /> 100+ FCA-regulated lender partners
          </li>
          <li>
            <Icon name="Lock" size="sm" /> Soft credit search only
          </li>
          <li>
            <Icon name="CircleCheckBig" size="sm" /> 93% approval rate on matched applications
          </li>
        </ul>
      </div>
    </aside>
  );
}
