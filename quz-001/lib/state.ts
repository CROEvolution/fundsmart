// Quiz state + scoring + mock Companies House.
// Ported from the Claude Design handoff bundle's score.jsx + quiz.jsx fixtures.
// Pure functions only.

export type Q1 = "rejected" | "skipping" | "untried";
export type Q2 = "£10k" | "£25k" | "£50k" | "£100k" | "£250k" | "£1m+" | "other";
export type Q3 = "growth" | "working" | "vat" | "equip" | "bridge" | "refi" | "other";
export type Q4 = "u200" | "200_500" | "500_1m" | "1m_3m" | "3m_plus";
export type Q5 = "u1" | "1_3" | "3_5" | "5p";
export type Q6 = "today" | "week" | "month" | "explore";

export type Company = {
  name: string;
  num: string;
  addr: string;
  status: string;
};

export type Answers = {
  q1: Q1 | null;
  q2: Q2 | null;
  q3: Q3 | null;
  q4: Q4 | null;
  q5: Q5 | null;
  q6: Q6 | null;
  q7: Company | null;
};

export const emptyAnswers: Answers = {
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
  q6: null,
  q7: null,
};

export type ContactDetails = { name: string; email: string; phone: string };

export type Profile = {
  score: number;
  low: number;
  high: number;
  apr: string;
  percentile: number;
};

// Scoring weights match the prototype exactly so the score, range, and
// percentile match the design's reveal screen.
export function computeProfile(answers: Answers): Profile {
  const { q4, q5, q6, q3 } = answers;
  let s = 62;
  const tMap: Partial<Record<Q4, number>> = {
    "200_500": 6,
    "500_1m": 12,
    "1m_3m": 18,
    "3m_plus": 22,
  };
  s += (q4 && tMap[q4]) || 0;
  const trMap: Partial<Record<Q5, number>> = { "1_3": 4, "3_5": 8, "5p": 12 };
  s += (q5 && trMap[q5]) || 0;
  if (q6 === "today" || q6 === "week") s += 4;
  if (q3 === "growth" || q3 === "working" || q3 === "vat") s += 3;
  s = Math.min(96, s);

  const ranges: Record<Q4, [number, number]> = {
    u200: [25_000, 150_000],
    "200_500": [25_000, 150_000],
    "500_1m": [50_000, 250_000],
    "1m_3m": [100_000, 500_000],
    "3m_plus": [250_000, 1_000_000],
  };
  const [lo, hi] = (q4 && ranges[q4]) || [25_000, 150_000];

  const apr = q4 === "3m_plus" ? "8.4" : q4 === "1m_3m" ? "9.2" : "10.6";

  const pctMap: Partial<Record<Q4, number>> = {
    "200_500": 38,
    "500_1m": 22,
    "1m_3m": 12,
    "3m_plus": 6,
  };
  const percentile = (q4 && pctMap[q4]) ?? 50;

  return { score: s, low: lo, high: hi, apr, percentile };
}

export function fmtGBP(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}m`;
  return `£${(n / 1_000).toFixed(0)}k`;
}

// Display labels
export const TURNOVER_LABEL: Record<Q4, string> = {
  u200: "Under £200k",
  "200_500": "£200k – £500k",
  "500_1m": "£500k – £1m",
  "1m_3m": "£1m – £3m",
  "3m_plus": "£3m+",
};

export const TRADING_LABEL: Record<Q5, string> = {
  u1: "Under 1 year",
  "1_3": "1 to 3 years",
  "3_5": "3 to 5 years",
  "5p": "5 years+",
};

export const PURPOSE_LABEL: Record<Q3, string> = {
  growth: "Growth funding",
  working: "Working capital",
  vat: "A VAT or HMRC bill",
  equip: "Equipment finance",
  bridge: "Contract bridging",
  refi: "Refinancing",
  other: "General funding",
};

export const TIMEFRAME: Record<Q6, string> = {
  today: "the same day",
  week: "this week",
  month: "this month",
  explore: "when you're ready",
};

// Mock Companies House fixtures. Live search filters by name or number.
export const COMPANY_FIXTURES: Company[] = [
  {
    name: "Foreman & Sons Construction Ltd",
    num: "08321456",
    addr: "12 Mill Lane, Sheffield, S1 4QQ",
    status: "Active",
  },
  {
    name: "Foreman Joinery & Build Limited",
    num: "11210987",
    addr: "Unit 3, Vulcan Works, Leeds, LS9 8DA",
    status: "Active",
  },
  {
    name: "Foreman Group (UK) Limited",
    num: "13540021",
    addr: "44 King Edward St, Manchester, M4 1AG",
    status: "Active",
  },
  {
    name: "Foreman Logistics & Haulage Ltd",
    num: "09887765",
    addr: "Foreman House, Bristol, BS2 0EE",
    status: "Active",
  },
];

export function searchCompanies(query: string): Company[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const matches = COMPANY_FIXTURES.filter(
    (c) => c.name.toLowerCase().includes(q) || c.num.includes(q),
  );
  return matches.length ? matches : COMPANY_FIXTURES.slice(0, 3);
}
