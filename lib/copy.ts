// All page copy lives here so the components stay free of long string literals.
// Every claim traces back to .croev/copy-QUZ-001-V1.md.

export const hero = {
  h1: "One matched lender. One soft search. No comparison-site cowboys.",
  sub: "Fundsmart's AI pulls your business from Companies House, looks at your real cashflow, and matches you to the single lender most likely to approve. Not twelve. Not your data sold on. One.",
  trust: [
    "Soft credit search only, zero impact on your score",
    "100+ FCA-regulated lenders, your business gets matched to one",
    "Approval in as little as 1 hour, funded in as soon as 4 hours",
  ],
};

export const q1 = {
  label: "Has your bank already said no, or are you skipping them this time?",
  options: [
    {
      value: "bank-no" as const,
      label: "Bank said no",
      micro: "You're not alone. 40% of UK SME loan applications get rejected. Their algorithm, not your business.",
    },
    {
      value: "skipping" as const,
      label: "Skipping the bank",
      micro: "Smart move. Bank lending takes weeks. Private finance moves in hours.",
    },
    {
      value: "never-tried" as const,
      label: "Haven't tried yet",
      micro: "Most operators who come to us don't bother with the bank first. Saves the hard credit pull.",
    },
  ],
};

export const q2 = {
  label: "How much funding do you need?",
  sub: "Soft credit search only. No impact on your score.",
  options: [
    { value: "10k" as const, label: "£10k" },
    { value: "25k" as const, label: "£25k" },
    { value: "50k" as const, label: "£50k" },
    { value: "100k" as const, label: "£100k" },
    { value: "250k" as const, label: "£250k" },
    { value: "1m+" as const, label: "£1m+" },
  ],
};

export const q3 = {
  label: "What's the funding for?",
  micro: "Pick the closest. Your specialist will fine-tune it on the call.",
  options: [
    { value: "growth" as const, label: "Growth or expansion" },
    { value: "working-capital" as const, label: "Working capital or cashflow" },
    { value: "vat-hmrc" as const, label: "VAT or HMRC bill" },
    { value: "equipment" as const, label: "Equipment or vehicles" },
    { value: "bridge" as const, label: "Bridging a contract" },
    { value: "refinance" as const, label: "Refinancing existing debt" },
    { value: "other" as const, label: "Other" },
  ],
};

export const q4 = {
  label: "What's your annual turnover?",
  micro: "Lenders use turnover to set your funding range. We match the lender whose box you actually fit, not the one paying us the most.",
  options: [
    { value: "under-200k" as const, label: "Under £200k", offRamp: true },
    { value: "200-500k" as const, label: "£200k to £500k" },
    { value: "500k-1m" as const, label: "£500k to £1m" },
    { value: "1m-3m" as const, label: "£1m to £3m" },
    { value: "3m+" as const, label: "£3m+" },
  ],
  offRamp: {
    headline: "We're not the right fit for you yet, and we'd rather say it now than waste your afternoon.",
    body: "Most of our 100+ lender partners need £200k+ turnover before they'll engage. Good news: there are lenders set up for earlier-stage businesses. Try Funding Circle's small business product or Iwoca's flexible line, both regulated, both faster than a bank.",
    cta: "Take me to suitable options",
    coda: "Come back when you cross £200k. We'll be here.",
  },
};

export const q5 = {
  label: "How long have you been trading?",
  micro: "Trading history is the second number lenders look at. Longer is better, but anything over a year opens real options.",
  options: [
    { value: "<1yr" as const, label: "Less than 1 year", offRamp: true },
    { value: "1-3yr" as const, label: "1 to 3 years" },
    { value: "3-5yr" as const, label: "3 to 5 years" },
    { value: "5yr+" as const, label: "5 years+" },
  ],
  offRamp: {
    headline: "A year in, you'll have proper options. Today, not quite yet.",
    body: "Our lender panel underwrites established trading. Under 12 months, you're outside what they'll currently take. Worth knowing: start-up loans, asset finance against new equipment, and the British Business Bank's Start Up Loan Scheme are built for where you are right now.",
    cta: "Show me early-stage options",
    coda: "Come back to us once you've got 12 months of trading on the books.",
  },
};

export const q6 = {
  label: "When do you need the money?",
  micro: "Honest answer please. Urgency changes which lenders we approach first.",
  options: [
    { value: "today" as const, label: "Today, it's urgent" },
    { value: "this-week" as const, label: "This week" },
    { value: "this-month" as const, label: "This month" },
    { value: "exploring" as const, label: "Just exploring options" },
  ],
};

export const q7 = {
  label: "Find your company on Companies House.",
  sub: "Type your business name. We'll pull your registered details automatically, so you don't have to.",
  placeholder: "Start typing your business name",
  proofRow: [
    { icon: "🏛", text: "Live Companies House search" },
    { icon: "🔒", text: "Encrypted. Never sold. Never shared without your permission." },
  ],
  bailOut: "I trade under a different name",
  soleTrader: "I'm a sole trader",
};

export const score = {
  sub: "Based on what you've told us, here's where you stand against our 100+ lender panel.",
  cta: "Send my full report and unlock my matched lender",
  trust: [
    "Soft credit search, no impact on your score",
    "One matched lender, not a dozen",
    "Your data is never sold to third parties",
    "100+ FCA-regulated lenders on the panel",
  ],
};

export const contact = {
  headline: "You're matched. Where shall we send the report?",
  sub: "Pop your details in. Your specialist rings you back in as little as 1 hour during working hours, with your full report and your matched lender's indicative offer.",
  fields: {
    name: { label: "Full name", placeholder: "Your name" },
    email: { label: "Business email", placeholder: "you@yourcompany.co.uk" },
    phone: { label: "Mobile", placeholder: "7XXX XXX XXX" },
  },
  whatHappensNext: [
    "We call you in as little as 1 hour (working hours) with your matched lender.",
    "You decide if you like the indicative offer.",
    "Documents over, soft search confirmed, funded in as soon as 4 hours after sign-off.",
  ],
  submit: "Send my report and connect me to my matched lender",
  trustStrip: [
    { icon: "🛡", text: "FCA-regulated brokerage" },
    { icon: "🔒", text: "Soft credit search only, no impact on your score" },
    { icon: "✕", text: "Your data is never sold" },
    { icon: "🤝", text: "100+ FCA-regulated lenders, matched to one" },
  ],
  disclosure:
    "By submitting, you agree that Fundsmart AI may share your information with our matched FCA-regulated lender and with credit reference and fraud prevention agencies, who will run a soft credit search and identity check. A soft search has no impact on your credit score. We will not pass your data to third-party marketers or sell it. See our Privacy Policy for the full detail.",
};

export const success = {
  headline: "Report on its way. Your specialist is on it.",
  sub: "We've matched you to one lender and your specialist will call you in as little as 1 hour during working hours. Keep an eye on your inbox for the full report.",
  next: "What to expect next:",
  steps: [
    "Specialist call with your matched lender's indicative offer",
    "You decide. No pressure, no upsell.",
    "If you accept, documents over and funding in as soon as 4 hours after sign-off",
  ],
};

export const threeStep = {
  headline: "How it actually works",
  steps: [
    {
      n: 1,
      title: "Tell us about your business.",
      body: "Seven quick questions. Chips, not paperwork. Soft search only, your credit file stays clean.",
    },
    {
      n: 2,
      title: "Get matched to one lender.",
      body: "Our AI cross-references your business against 100+ FCA-regulated lenders and picks the one most likely to approve, not the one paying us the most.",
    },
    {
      n: 3,
      title: "Get funded.",
      body: "Approval in as little as 1 hour. Money in your account in as soon as 4 hours after documents are signed off. A human specialist runs your file end to end.",
    },
  ],
};

export const lenderStrip = {
  headline: "100+ FCA-regulated lenders compete for your business",
  sub: "Iwoca, Funding Circle, Halo, Funding Options by Tide, Bizcap, Lending Box, and more. You only ever talk to one. We do the filtering.",
  names: ["Iwoca", "Funding Circle", "Halo", "Funding Options by Tide", "Bizcap", "Lending Box"],
};

export const caseStudies = [
  {
    title: "Construction firm, £400k turnover",
    summary: "£50k line of credit, funded in 24 hours.",
    quote:
      "Tried Barclays first. Two weeks to tell me no. Then a comparison site, three brokers submitted my details without asking and tanked my credit file. Fundsmart matched me to one lender. One call. One decision. Money in 24 hours. Turnover's up 60% since.",
  },
  {
    title: "James M., Manchester, Construction",
    summary: "£75k, funded in 24 hours.",
    quote:
      "Bank rejected the application despite a clean trading history and a full order book. Fundsmart's AI matched James to a single specialist lender. One soft search. Funded the next day.",
  },
  {
    title: "Sarah L., London, E-commerce",
    summary: "£150k, funded in 48 hours.",
    quote:
      "Needed stock funding for a peak season. Wanted offers without a dozen brokers calling. One application, one matched lender, one soft search, funded inside 48 hours.",
  },
];

export const mechanism = {
  headline: "Why we match you to one lender, not twelve",
  bullets: [
    {
      title: "Twelve applications mean twelve hard credit pulls.",
      body: "Comparison sites and broker farms submit your data across their panel. Every submission risks a hard search. Stack five of those in a week and lenders see a credit file in distress.",
    },
    {
      title: "Twelve applications mean your phone ringing for a fortnight.",
      body: "Brokers buy and resell lead data. Once you're in, you're spammed for weeks by people who've never seen your business.",
    },
    {
      title: "One matched lender means one decision, one soft search, one specialist.",
      body: "Our AI cross-references your business across 100+ lenders and picks the one whose underwriting box you actually fit. That's the lender we approach. If they pass, your concierge finds you a second match. Your file stays clean either way.",
    },
  ],
};

export const faq = [
  {
    q: "Will this affect my credit score?",
    a: "No. We run a soft credit search only. Soft searches are visible to you on your credit file but invisible to other lenders. Your score does not move.",
  },
  {
    q: "Who actually sees my data?",
    a: "Your matched lender, plus credit reference and fraud prevention agencies for identity checks. That's the list. We do not pass your data to third-party marketers. We do not sell it. Ever.",
  },
  {
    q: "Why one lender, not many?",
    a: "Because applying to many lenders is what causes the damage. Multiple submissions risk hard pulls, lead-broker resale, and an inbox that won't stop ringing. Our AI does the filtering across 100+ lenders so only the one most likely to approve sees your file. If they pass, your specialist finds a second match. You stay in control the whole way.",
  },
  {
    q: "How fast is funding really?",
    a: "Approval is possible in as little as 1 hour during working hours. Funding lands in as soon as 4 hours after documents are signed off, in the fastest cases. Typical fundings sit at 24 to 48 hours. We tell you the realistic timeline on the call, not the marketing one.",
  },
  {
    q: "What if I'm not approved?",
    a: "Your human specialist looks at why and routes you to a second pre-qualification on the panel. If nothing on our panel fits, we'll tell you straight and point you somewhere that might. We'd rather be honest than waste your time.",
  },
  {
    q: "What does it cost me?",
    a: "Nothing. Fundsmart is paid by the lender when funding completes. You pay the lender's interest and any product fee they disclose up front. There is no Fundsmart fee on your side.",
  },
];

export const stickyCta = {
  bar: "Get matched in 2 minutes. Soft search only.",
  button: "See my Funding Fitness Score",
};
