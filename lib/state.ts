// Quiz state, scoring, and Companies House / address mock fixtures.
// Live API integration (Companies House officers + Google Places) plugs
// into the same shapes; the components only need to read these types.

export type Amount =
  | "10k"
  | "25k"
  | "50k"
  | "100k"
  | "250k"
  | "500k"
  | "1m"
  | "other";

export type Purpose =
  | "growth"
  | "working"
  | "vat"
  | "equip"
  | "bridge"
  | "refi"
  | "other";

export type Residency = "own" | "rent" | "live-with-family";

export type Director = {
  name: string;
  role: string;
  dobMonth: number; // 1-12, as Companies House exposes
  dobYear: number;
};

export type Company = {
  name: string;
  num: string;
  addr: string;
  status: string;
  directors: Director[];
};

export type AddressSuggestion = {
  line1: string;
  city: string;
  postcode: string;
  country: "UK";
};

export type Answers = {
  amount: Amount | null;
  purpose: Purpose | null;
  company: Company | null;
  director: Director | null;
  dobDay: number | null;
  annualTurnover: number | null;
  monthlyTurnover: number | null;
  residency: Residency | null;
  address: AddressSuggestion | null;
  email: string | null;
  phone: string | null; // digits only; UI prefixes +44
};

export const emptyAnswers: Answers = {
  amount: null,
  purpose: null,
  company: null,
  director: null,
  dobDay: null,
  annualTurnover: null,
  monthlyTurnover: null,
  residency: null,
  address: null,
  email: null,
  phone: null,
};

export type ContactDetails = {
  name: string; // derived from selected director
  email: string;
  phone: string;
};

export type Profile = {
  score: number;
  low: number;
  high: number;
  apr: string;
  percentile: number;
};

// "You may qualify for up to £X" — rule-of-thumb based on annual turnover.
// Lenders on the panel typically advance 20–30% of trailing annual revenue
// for short-term unsecured working capital; we cap at £1m for display.
export function qualifyMax(annualTurnover: number | null): number {
  if (!annualTurnover || annualTurnover <= 0) return 0;
  const raw = Math.round((annualTurnover * 0.3) / 1000) * 1000;
  return Math.min(1_000_000, raw);
}

// Indicative funding range used in the score screen.
function turnoverBracket(annual: number): [number, number] {
  if (annual >= 3_000_000) return [250_000, 1_000_000];
  if (annual >= 1_000_000) return [100_000, 500_000];
  if (annual >= 500_000) return [50_000, 250_000];
  return [25_000, 150_000];
}

export function computeProfile(answers: Answers): Profile {
  const annual = answers.annualTurnover ?? 0;
  const monthly = answers.monthlyTurnover ?? 0;

  let s = 64;
  if (annual >= 3_000_000) s += 22;
  else if (annual >= 1_000_000) s += 18;
  else if (annual >= 500_000) s += 12;
  else if (annual >= 200_000) s += 6;

  // Healthy monthly run-rate vs annual implied → +signal
  const expectedMonthly = annual / 12;
  if (expectedMonthly > 0 && monthly >= expectedMonthly * 0.8) s += 4;

  if (
    answers.purpose === "growth" ||
    answers.purpose === "working" ||
    answers.purpose === "vat"
  ) {
    s += 3;
  }

  if (answers.residency === "own") s += 3;
  s = Math.min(96, s);

  const [lo, hi] = turnoverBracket(annual);
  const apr = annual >= 3_000_000 ? "8.4" : annual >= 1_000_000 ? "9.2" : "10.6";

  const percentile =
    annual >= 3_000_000 ? 6 : annual >= 1_000_000 ? 12 : annual >= 500_000 ? 22 : 38;

  return { score: s, low: lo, high: hi, apr, percentile };
}

export function fmtGBP(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}m`;
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`;
  return `£${n.toLocaleString("en-GB")}`;
}

export const AMOUNT_LABEL: Record<Amount, string> = {
  "10k": "£10k",
  "25k": "£25k",
  "50k": "£50k",
  "100k": "£100k",
  "250k": "£250k",
  "500k": "£500k",
  "1m": "£1m+",
  other: "Other amount",
};

export const PURPOSE_LABEL: Record<Purpose, string> = {
  growth: "Growth funding",
  working: "Working capital",
  vat: "VAT / HMRC bill",
  equip: "Equipment finance",
  bridge: "Contract bridging",
  refi: "Refinancing",
  other: "General funding",
};

export const RESIDENCY_LABEL: Record<Residency, string> = {
  own: "I own my home",
  rent: "I rent",
  "live-with-family": "I live with family",
};

// ---- Mock Companies House + officer fixtures ----
// Shape mirrors what api.company-information.service.gov.uk returns from
// /search/companies and /company/{number}/officers. Live wiring just swaps
// `searchCompanies` for a fetch().

export const COMPANY_FIXTURES: Company[] = [
  {
    name: "Foreman & Sons Construction Ltd",
    num: "08321456",
    addr: "12 Mill Lane, Sheffield, S1 4QQ",
    status: "Active",
    directors: [
      { name: "James A. Foreman", role: "Director", dobMonth: 3, dobYear: 1978 },
      { name: "Linda C. Foreman", role: "Director", dobMonth: 11, dobYear: 1981 },
      { name: "Daniel R. Foreman", role: "Director", dobMonth: 7, dobYear: 1986 },
    ],
  },
  {
    name: "Foreman Joinery & Build Limited",
    num: "11210987",
    addr: "Unit 3, Vulcan Works, Leeds, LS9 8DA",
    status: "Active",
    directors: [
      { name: "Daniel R. Foreman", role: "Director", dobMonth: 7, dobYear: 1986 },
      { name: "Priya K. Sharma", role: "Director", dobMonth: 5, dobYear: 1990 },
    ],
  },
  {
    name: "Foreman Group (UK) Limited",
    num: "13540021",
    addr: "44 King Edward St, Manchester, M4 1AG",
    status: "Active",
    directors: [
      { name: "James A. Foreman", role: "Director", dobMonth: 3, dobYear: 1978 },
      { name: "Marcus T. Bell", role: "Director", dobMonth: 9, dobYear: 1972 },
    ],
  },
  {
    name: "Foreman Logistics & Haulage Ltd",
    num: "09887765",
    addr: "Foreman House, Bristol, BS2 0EE",
    status: "Active",
    directors: [
      { name: "Marcus T. Bell", role: "Director", dobMonth: 9, dobYear: 1972 },
      { name: "Aisha N. Patel", role: "Director", dobMonth: 1, dobYear: 1984 },
    ],
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

// ---- Mock address autocomplete (Google Places stand-in) ----

const ADDRESS_FIXTURES: AddressSuggestion[] = [
  { line1: "10 Downing Street", city: "London", postcode: "SW1A 2AA", country: "UK" },
  { line1: "221B Baker Street", city: "London", postcode: "NW1 6XE", country: "UK" },
  { line1: "1 Salford Quays", city: "Manchester", postcode: "M50 3AH", country: "UK" },
  { line1: "5 Princes Street", city: "Edinburgh", postcode: "EH2 2DG", country: "UK" },
  { line1: "44 King Edward St", city: "Manchester", postcode: "M4 1AG", country: "UK" },
  { line1: "12 Mill Lane", city: "Sheffield", postcode: "S1 4QQ", country: "UK" },
  { line1: "Foreman House, Temple Way", city: "Bristol", postcode: "BS2 0EE", country: "UK" },
];

export function searchAddresses(query: string): AddressSuggestion[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return ADDRESS_FIXTURES.filter(
    (a) =>
      a.line1.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.postcode.toLowerCase().replace(/\s+/g, "").includes(q.replace(/\s+/g, "")),
  );
}

export function formatAddress(a: AddressSuggestion): string {
  return `${a.line1}, ${a.city}, ${a.postcode}`;
}

// Dynamic remaining-seconds estimate shown next to the quiz progress bar.
// Total ≈ 90s on step 1; counts down per step. Rounded to nearest 5s.
const TOTAL_QUIZ_STEPS = 7;
export function secondsLeft(step: number, total: number = TOTAL_QUIZ_STEPS): number {
  const clamped = Math.min(Math.max(step, 1), total);
  const remaining = Math.max(0, total - clamped + 1);
  const ratio = remaining / total;
  const raw = Math.round((ratio * 90) / 5) * 5;
  return Math.max(15, raw);
}

export const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

export function formatMonthYear(d: Director): string {
  return `${MONTHS_SHORT[d.dobMonth - 1]} ${d.dobYear}`;
}
