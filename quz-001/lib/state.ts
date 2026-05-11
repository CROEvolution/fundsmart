// Quiz state machine + scoring + mock Companies House data.
// Pure functions only. No React imports.

export type Q1 = "bank-no" | "skipping" | "never-tried";
export type Q2 = "10k" | "25k" | "50k" | "100k" | "250k" | "1m+";
export type Q3 =
  | "growth"
  | "working-capital"
  | "vat-hmrc"
  | "equipment"
  | "bridge"
  | "refinance"
  | "other";
export type Q4 = "under-200k" | "200-500k" | "500k-1m" | "1m-3m" | "3m+";
export type Q5 = "<1yr" | "1-3yr" | "3-5yr" | "5yr+";
export type Q6 = "today" | "this-week" | "this-month" | "exploring";
export type Q7Company = {
  name: string;
  number: string;
  address: string;
};

export type Step =
  | "inline"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "q4-offramp"
  | "q5-offramp"
  | "score"
  | "contact"
  | "success";

export type QuizState = {
  step: Step;
  q1: Q1 | null;
  q2: Q2 | null;
  q3: Q3 | null;
  q4: Q4 | null;
  q5: Q5 | null;
  q6: Q6 | null;
  q7: Q7Company | null;
  name: string;
  email: string;
  phone: string;
};

export const initialState: QuizState = {
  step: "inline",
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
  q6: null,
  q7: null,
  name: "",
  email: "",
  phone: "",
};

// Mock Companies House dataset. Realistic UK SME shape; first names match the
// case studies and a few generic builds so the demo feels real.
export const mockCompanies: Q7Company[] = [
  { name: "Northwest Construction Ltd", number: "08217492", address: "12 Albert Square, Manchester M2 5HD" },
  { name: "Innocent Limited", number: "04007092", address: "342 Ladbroke Grove, London W10 5BU" },
  { name: "Edinburgh Coffee Roasters Ltd", number: "SC456912", address: "44 Rose Street, Edinburgh EH2 2YJ" },
  { name: "Sarah L Trading Ltd", number: "09932184", address: "8 Charterhouse Square, London EC1M 6AX" },
  { name: "Halo Industries Ltd", number: "07512309", address: "27 Old Gloucester Street, London WC1N 3AX" },
  { name: "James M Builders Ltd", number: "08812491", address: "120 Deansgate, Manchester M3 2QG" },
  { name: "Fundsmart Demo Co Ltd", number: "11111111", address: "1 Demo Way, London EC1A 1AA" },
];

export function searchCompanies(query: string): Q7Company[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return mockCompanies.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 5);
}

// Funding Fitness Score. Weighted by turnover (40), trading length (30),
// purpose timing (20), Q1 identification (10). Bounded 30..98 so we never
// show a 0 or a glib 100.
export function calculateScore(s: QuizState): number {
  let score = 30;

  // Turnover weight
  const turnoverPoints: Record<Q4, number> = {
    "under-200k": 0,
    "200-500k": 20,
    "500k-1m": 30,
    "1m-3m": 38,
    "3m+": 40,
  };
  if (s.q4) score += turnoverPoints[s.q4];

  // Trading length weight
  const tradingPoints: Record<Q5, number> = {
    "<1yr": 0,
    "1-3yr": 18,
    "3-5yr": 26,
    "5yr+": 30,
  };
  if (s.q5) score += tradingPoints[s.q5];

  // Purpose-timing fit
  const purposeBoost: Partial<Record<Q3, number>> = {
    "vat-hmrc": 14,
    "bridge": 16,
    "working-capital": 12,
    "growth": 16,
    "equipment": 14,
    "refinance": 10,
    "other": 8,
  };
  if (s.q3) score += purposeBoost[s.q3] ?? 8;

  // Q1 identification
  const idBoost: Record<Q1, number> = {
    "bank-no": 6,
    "skipping": 8,
    "never-tried": 4,
  };
  if (s.q1) score += idBoost[s.q1];

  // Slight nudge for urgency match
  if (s.q6 === "today" || s.q6 === "this-week") score += 2;

  return Math.min(98, Math.max(30, score));
}

export function fundingRange(s: QuizState): { low: number; high: number } {
  const amountMap: Record<Q2, [number, number]> = {
    "10k": [10_000, 25_000],
    "25k": [20_000, 50_000],
    "50k": [40_000, 80_000],
    "100k": [80_000, 150_000],
    "250k": [180_000, 280_000],
    "1m+": [500_000, 1_500_000],
  };
  if (!s.q2) return { low: 25_000, high: 100_000 };
  const [low, high] = amountMap[s.q2];

  // Stretch the upper bound for stronger turnover profiles
  const turnoverMultiplier: Record<Q4, number> = {
    "under-200k": 0.7,
    "200-500k": 0.9,
    "500k-1m": 1.0,
    "1m-3m": 1.15,
    "3m+": 1.3,
  };
  const m = s.q4 ? turnoverMultiplier[s.q4] : 1.0;
  return { low: Math.round(low * m), high: Math.round(high * m) };
}

export function formatGBP(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `£${Math.round(n / 1_000)}k`;
  return `£${n}`;
}

// Score-reveal "three strongest reasons" templates, generated from state.
export function scoreReasons(s: QuizState): string[] {
  const reasons: string[] = [];

  // Turnover reason
  if (s.q4) {
    const map: Record<Q4, string> = {
      "under-200k": "Your turnover is below most lenders' floor, but we have a path that fits.",
      "200-500k": "Your £200k to £500k turnover meets the floor on most of our 100+ lender panel.",
      "500k-1m": "Your £500k to £1m turnover puts you in the top 40% of approved applicants.",
      "1m-3m": "Your £1m to £3m turnover puts you in the top 25% of approved applicants.",
      "3m+": "Your £3m+ turnover puts you in the top 10% of approved applicants on our panel.",
    };
    reasons.push(map[s.q4]);
  }

  // Trading length reason
  if (s.q5) {
    const map: Record<Q5, string> = {
      "<1yr": "Under 12 months trading limits panel access today.",
      "1-3yr": "1 to 3 years trading opens most of the panel, including specialist short-trading lenders.",
      "3-5yr": "3 to 5 years trading is the underwriting sweet spot for our panel.",
      "5yr+": "5+ years trading is what our lenders want to see before they engage.",
    };
    reasons.push(map[s.q5]);
  }

  // Purpose reason
  if (s.q3) {
    const map: Record<Q3, string> = {
      "growth": "Growth funding is one of the three reasons our panel funds fastest.",
      "working-capital": "Working capital is the most common reason our lenders say yes, typically inside 24 to 48 hours.",
      "vat-hmrc": "VAT and HMRC bridging is a top-three reason our lenders fund, often inside 48 hours.",
      "equipment": "Asset and equipment finance has the deepest panel coverage on our side.",
      "bridge": "Contract bridging is one of the three reasons our panel funds fastest.",
      "refinance": "Refinancing existing debt opens better-rate options for stronger profiles.",
      "other": "Your specialist will pick the closest-fit product on the call.",
    };
    reasons.push(map[s.q3]);
  }

  return reasons.slice(0, 3);
}

export function percentile(s: QuizState): string {
  const score = calculateScore(s);
  if (score >= 90) return "top 10%";
  if (score >= 80) return "top 25%";
  if (score >= 70) return "top 40%";
  if (score >= 60) return "top 55%";
  return "mid-range";
}
