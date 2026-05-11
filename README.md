# Fundsmart AI — Landing Page Builds

CRO Evolution workspace for **Fundsmart AI** (UK SME credit broker, FCA-regulated, 100+ lender panel, 93% approval rate).

Operate brand: [`fundsmart-ai`](https://app.croevolution.com) (id `ad78179a-0fbf-4c00-80ab-3b9ad15d8b2d`)
Live competitor LP being beaten: <https://app.fundsmart.ai/landinggov>
Primary client contact: Max Hein (max@atlasmarketing.pro)

---

## Repo structure

```
fundsmart/
├── .croev/                     ← Workspace docs (research, copy, teardown, compliance)
│   ├── context.json            ← Brand metadata + LP IDs from Operate
│   ├── brand-research.md       ← First-pass site scrape + angle hypotheses
│   ├── landing-page-teardown.md← Live competitor funnel teardown
│   ├── research-synthesis.md   ← VOC + 6 angle families + Quiz recommendations
│   ├── copy-QUZ-001-V1.md      ← Quiz copy doc (Anti-Spam angle)
│   ├── copy-ADV-001-V1.md      ← Advertorial copy doc (GGS angle)
│   └── angles.json             ← Angle index for the brand
│
├── quz-001/                    ← Quiz LP, Anti-Spam / AI-Matched angle (BUILT)
│   └── (Next.js 16 app)
│
├── sal-001/                    ← Sales LP, Line-of-Credit angle (TODO)
└── adv-001/                    ← Advertorial, GGS angle (copy ready, build TODO)
```

## Per-LP builds

Each LP is an independent Next.js app. Run, build, and deploy each separately.

### QUZ-001 — Quiz

```bash
cd quz-001
npm install
npm run dev      # http://localhost:3000
```

- Primary angle: **Anti-Spam / AI-Matched** ("One matched lender. One soft search. No comparison-site cowboys.")
- 7-question funnel with inline Q1/Q2 pre-step + modal Q3–Q7
- Funding Fitness Score reveal screen with dynamic reasons + indicative range
- Honest off-ramps for sub-£200k turnover and sub-1yr trading
- Mock Companies House lookup (live filter on a seeded dataset)
- `/api/lead` is a mocked POST that logs the payload
- Backup hero variants (Bank-Rejection Vindication, VAT/HMRC) inside `lib/copy.ts` for split-test swaps

## Compliance gates (non-negotiable)

Every claim on every page must pass `.croev/USP_Compliance.md` (kept in the workspace, not in this repo). The non-negotiables:

- **Never:** `pre-approved` (→ `pre-qualified`), `instant decision` (→ `as little as 1 hour`), `no personal guarantee` in any government-scheme context (→ `your home stays safe`), `safe` / `risk-free` describing any funding product, comparisons between GGS and the Bounceback Loan Scheme.
- **Lender count:** locked to `100+ FCA-regulated lenders` (existing video ads say 250; resolve with Max before unlocking).
- **Speed claims:** always `as little as 1 hour` (approval) / `as soon as 4 hours` (funding). Typical fundings sit at 24–48 hours.
- **No sole traders.** Q5 trading-length gate + Q7 Companies House lookup filter them out; explicit sole-trader off-ramp destination pending from Max.

## Open questions for the client (blocking final cut)

1. British Business Bank logo + Growth Guarantee Scheme trademark permission (blocks advertorial design)
2. `Sponsored Editorial` eyebrow tag — FCA financial-promotion requirement check
3. Lender count (250 vs 100+)
4. Real median funded time (so body copy can quote it honestly)
5. Sole-trader off-ramp destination URL
6. Asset-finance / invoice-finance share of book (gates the optional `no-PG` claim)
7. Existing creative violates 3 compliance rules (`INSTANT DECISION`, `PRE-APPROVED`, `60 seconds`) — refresh alongside LP launch.

## Conventions

- UK English in user-facing copy (favour, optimise, organisation).
- No em dashes anywhere in the code or copy (commas / colons / full stops instead).
- No headlines starting with "The".
- All proof-point numbers traceable to `.croev/brand-research.md` or the ad transcript — no inventions.
