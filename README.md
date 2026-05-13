# Fundsmart AI — Landing Page Builds

CRO Evolution workspace for **Fundsmart AI** (UK SME credit broker, FCA-regulated, 100+ lender panel, 93% approval rate).

Operate brand: [`fundsmart-ai`](https://app.croevolution.com) (id `ad78179a-0fbf-4c00-80ab-3b9ad15d8b2d`)
Live competitor LP being beaten: <https://app.fundsmart.ai/landinggov>
Primary client contact: Max Hein (max@atlasmarketing.pro)

---

## Repo structure

One Next.js 16 app at the repo root. Each landing page is a route under `/app`.

```
fundsmart/
├── .croev/                         ← Workspace docs (research, copy, teardown, compliance)
│   ├── context.json
│   ├── brand-research.md
│   ├── landing-page-teardown.md
│   ├── research-synthesis.md
│   ├── copy-QUZ-001-V*.md
│   ├── copy-ADV-001-V1.md
│   └── angles.json
│
├── app/
│   ├── layout.tsx                  ← Global layout (Inter font, root metadata template)
│   ├── globals.css                 ← Global styles
│   ├── page.tsx                    ← Root index → redirects to /quz-001
│   ├── api/lead/route.ts           ← Shared lead-capture endpoint (mock)
│   ├── quz-001/                    ← Quiz LP, Anti-Spam / AI-Matched angle (BUILT)
│   │   ├── page.tsx
│   │   └── components/             ← Route-scoped components
│   ├── sal-001/                    ← Sales LP, Line-of-Credit angle (TODO)
│   └── adv-001/                    ← Advertorial, GGS angle (TODO)
│
├── lib/                            ← Shared utilities (state, copy, helpers)
└── public/                         ← Shared static assets (logos, favicons)
```

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000 → /quz-001
```

Visit individual routes directly:

- `/quz-001` — Quiz LP (Anti-Spam / AI-Matched)
- `/quz-001/v2` — Quiz LP form variant: Progressive Intent
- `/quz-001/v3` — Quiz LP form variant: Eligibility First
- `/quz-001/v4` — Quiz LP form variant: Fast Lead Capture
- Future: `/sal-001`, `/adv-001`, etc.

## Deployment

One Vercel project for the repo. The root URL `/` redirects to the first live LP; each new landing page ships as a new route. Branch deploys give every PR a preview URL across all routes.

## Per-LP angles

### QUZ-001 — Quiz

- Primary angle: **Anti-Spam / AI-Matched** ("One matched lender. One soft search. No comparison-site cowboys.")
- 7-step funnel: amount (hero) → purpose → Companies House → director → DOB-day verification → turnover (with live qualify estimate) → contact (residency + address + email + +44 phone)
- Score reveal screen with dynamic match reasons + indicative range
- Mock Companies House lookup with director DOB fixtures (swap for live `/officers` API when keys land)
- Mock Google Places address autocomplete (swap when key is added)
- `/api/lead` is a mocked POST that logs the payload

#### Form split-test variants

- **V1 Control:** `/quz-001` keeps the existing amount-first hero form, then opens the full qualification modal.
- **V2 Progressive Intent:** `/quz-001/v2` uses a one-question-at-a-time hero flow: amount → funding reason → timing, then opens the modal.
- **V3 Eligibility First:** `/quz-001/v3` asks amount, annual turnover band, and trading length before Companies House, with an early off-ramp for under-£200k or under-12-month businesses.
- **V4 Fast Lead Capture:** `/quz-001/v4` captures amount, email, and phone in the hero, posts a `hero_capture` lead, then enriches the lead with qualification details.

## Compliance gates (non-negotiable)

Every claim on every page must pass `.croev/USP_Compliance.md` (kept in the workspace, not in this repo). The non-negotiables:

- **Never:** `pre-approved` (→ `pre-qualified`), `instant decision` (→ `as little as 1 hour`), `no personal guarantee` in any government-scheme context (→ `your home stays safe`), `safe` / `risk-free` describing any funding product, comparisons between GGS and the Bounceback Loan Scheme.
- **Lender count:** locked to `100+ FCA-regulated lenders` (existing video ads say 250; resolve with Max before unlocking).
- **Speed claims:** always `as little as 1 hour` (approval) / `as soon as 4 hours` (funding). Typical fundings sit at 24–48 hours.
- **No sole traders.** Companies-House gate + director-only flow filters them out.

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
