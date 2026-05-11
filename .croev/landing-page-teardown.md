---
source: https://app.fundsmart.ai/landinggov
captured: 2026-05-11
captured_by: Claude (linear walkthrough, plausible UK SME test data)
gif: ./fundsmart-landinggov-walkthrough.gif (downloaded via browser, 7MB, 50 frames)
note: This is the CURRENT control. Variants we test must beat THIS specific funnel.
---

# Fundsmart `/landinggov` — Funnel Teardown

## TL;DR

It's an **inline hook → modal funnel** that splits the conversation into TWO psychological pieces:

1. **Inline on the page (Steps 0–1)**: amount + purpose. Frictionless. Two clicks. Zero typing.
2. **Modal stepper (Steps 1–4 + Offers)**: Companies House lookup → DOB → turnover → details + address → contact.

Total: **2 inline clicks + 4 modal steps**. The seven-node progress bar makes it *look* longer than it is. The "STEP 2 OF 3" eyebrow inside the modal undercuts the long stepper deliberately — to make you feel close to done.

**Persuasion engine** = Companies House pre-fill (makes the system feel omniscient) + "Good news — your business meets criteria" pre-qualification *before* asking for contact info + escalating CTA copy (`How much do you need?` → `Continue` → `Finalize and See Offers` → `Unlock My Offers`).

**Backend** = Astro / astro-island components (SSR), Supabase Edge Functions for Companies House proxy + funnel event tracking, Google Places (GB-restricted) for address autocomplete.

---

## Tech Stack (observable)

| Layer | What we see |
| --- | --- |
| Framework | **Astro** with `astro-island` hydration (SSR + selective client hydration) |
| Hosting | `app.fundsmart.ai` (likely Cloudflare/Vercel-style edge) |
| Auth/DB | **Supabase** — `kqnjzlrzlcbgpmyhlmqp.supabase.co` |
| Company lookup | Supabase Edge Function: `/functions/v1/company-search?q=...` (Companies House proxy) |
| Funnel tracking | Supabase REST: `POST /rest/v1/funnel_events` (one per step transition — returning 503 during test, possibly intermittent) |
| Address | **Google Places**, `country:gb`, `geocode` mode, `en-GB` locale. API key exposed client-side (normal pattern, restricted by referrer) |
| Analytics | No GA/Segment/Meta pixels caught in network panel (may be loaded later or in shadow DOM) |

---

## Page Anatomy (above-the-fold, before form starts)

### Hero
- **H1 (animates between 3 states)**:
  - "Stop Guessing"
  - "Know Your Options."
  - "Fund Faster." / "Fund smart. Faster. Clearer. Safer." / animated morph into **Fundsmart logo with green growth arrow**
- **Sub:** "See your offers instantly. No credit impact."
- **Bold below sub:** "Funding paid out in as little as 6 hours"

### Inline form card (Step 0 — Amount)
- Title: **"How much do you need?"**
- Sub: "2 minutes. We'll find your best deal and provide an **INSTANT** pre-qualification."
- 6 amount chips, 3×2 grid: **£10k, £25k, £50k, £100k, £250k, £1m+**
- "Other amount" small link beneath
- Eyebrow at footer of card: **"Access Government-backed Funding"** (in green) **"· Or Find a Better Alternative"**

### Below the card (still hero)
- 3 trust pills, side by side, dark-on-dark: **🛡 No Credit Impact · ⚡ 2-Minute Check · ⏱ 93% Approval Rate**
- **143,953** (huge number) — "UK businesses have found their best funding options with Fundsmart"

### Trust strip (next section)
- Header: "TRUSTED BY TOP UK FCA-REGULATED LENDERS"
- Logo marquee: Halo · Funding Options by Tide · Bizcap · Lending Box · Iwoca · Funding Circle (loops)

### "You shouldn't have to figure this out alone." (3-step framing)
- Step 1 — **Clarity first**: "See what you can qualify for, plus your company's key strengths and weaknesses."
- Step 2 — **Best deal for you**: "We match you to the lender most likely to approve — not the one paying us the most."
- Step 3 — **A human in your corner**: "A dedicated specialist supports your file end-to-end, right through to funding."

### "The Fundsmart Difference / Why It Works"
- Funding At Your Pace card (4-step inner process: report → match → open banking → funded)
- 100+ Lenders Compete
- Soft Search Only
- No Spammers, Ever (3 bullets each)

### "vs Banks / vs Brokers" comparison table

### Case studies (4 — name, city, industry, amount, time-to-fund)
- James M., Manchester · Construction — **£75k / 24h**
- Sarah L., London · E-commerce — **£150k / 48h**
- Michael T., Birmingham · Restaurant Chain — **£250k / 3d**
- Emma R., Edinburgh · Tech Startup — **£50k / same day**

### FAQ (13 items, full text in `brand-research.md`)

### Founder section — Max Hein, "Founder, Fundsmart AI" — long origin story about loan sharks + data privacy

### Sticky nav (appears on scroll only)
- Fundsmart logo (left) + **"Get Started"** green button (right)

---

## Form Walkthrough

> Notation: every step records position on the **modal stepper** (top of modal) and the **inline counter** (eyebrow inside the card). The two often disagree on purpose.

---

### STEP 0 — Amount (inline on page, no modal)

| | |
| --- | --- |
| **Position** | Pre-modal hero card |
| **Question** | "How much do you need?" |
| **Microcopy** | "2 minutes. We'll find your best deal and provide an INSTANT pre-qualification." |
| **Input** | 6 chip buttons + "Other amount" link |
| **Options** | £10k, £25k, £50k, £100k, £250k, £1m+ |
| **CTA** | Click any chip — auto-advances (no submit button) |
| **Validation** | None — every chip is valid |
| **Transition** | Inline DOM swap to Step 1 (no modal yet) |
| **Network** | Nothing observable |

**Trick**: Click-to-advance with no submit button. Removes a friction point and a decision ("did I pick the right one?"). Also lets them track funnel drop-off at the *chip-click* level.

---

### STEP 1 — Purpose (still inline on page)

| | |
| --- | --- |
| **Position** | Same card, swapped content; thin progress bar appears at top of card (~15% filled) |
| **Question** | "What's the funding for?" |
| **Input** | 4 chip buttons + "Other" dropdown |
| **Options** | **Growth · Working Capital · Debt Refinance · Equipment** (+ Other ▾) |
| **Back link** | "← Change amount" (preserves state) |
| **CTA** | Click any chip — auto-advances (opens modal) |
| **Eyebrow** | "Access Government-backed Funding · Or Find a Better Alternative" (still visible) |
| **Trust pills** | Still visible below card |
| **Transition** | Click triggers **modal open** (background dims, page blurs) |

**Trick**: Still no modal yet, still no typing — chip clicks only. **By the time the modal opens, the user has invested two micro-decisions.** Bailing now feels worse than continuing. This is the "foot in the door" before the heavy lifting.

---

### MODAL OPENS — Trust bar fixed at top of modal

Every modal step has this header (sticky):

```
✓ 143,953+ UK Businesses Matched   🛡 FCA-regulated partners   🔒 Soft search only · no credit impact
```

And a 7-node progress stepper:

```
✓——✓——[1]——[2]——[3]——[4]——[★ Offers!]
Amount  Purpose  Company  Turnover  Details  Contact  Offers!
```

The two completed ticks (Amount, Purpose) on entry create instant momentum — "you're already 28% done before you've typed a thing."

---

### STEP 1 (Modal) — Company / Find Your Business

#### Sub-step A: Company search

| | |
| --- | --- |
| **Eyebrow** | "Let's find your business" |
| **Title** | "Find Your Company" |
| **Sub** | "We pull your data automatically — no paperwork needed" |
| **Input** | Single text field — placeholder "Search your business name..." (building icon prefix) |
| **Behavior** | Live autocomplete (debounced ~300–500ms) hitting `/functions/v1/company-search` |
| **Result row** | Bold uppercase name · 🟢 active / 🔴 dissolved · "Est. {date}" · DIRECTOR_SURNAME, INITIAL |
| **Below input** | "🏛 Companies House Search" badge · "We check 200+ data points to find your best match." · "Your data is encrypted and never shared." |
| **Bail-out link** | "I'm a Sole Trader →" (likely opens a parallel non-Companies-House flow) |
| **CTA** | None — click a result to advance |

**Trick**: Showing Companies House results live (with dates and directors) telegraphs *we know who you are*. Lookup feedback < 500ms feels like magic. The "Sole Trader" off-ramp captures the segment that wouldn't be in Companies House.

#### Sub-step B: Select Director

| | |
| --- | --- |
| **Header** | "Company confirmed ✓ — now tell us about directors" |
| **Title** | "Select Director" |
| **Top row (locked)** | The selected company with a checkmark (visual confirmation, not a director option) |
| **List items** | Each director: avatar circle · "Full Name" / "director" |
| **Bail-out link** | "← Change company" |
| **CTA** | Click a director to advance |

**Trick**: They pull the *real director list* from Companies House. Telling the user "now tell us about directors" frames the next click as collaborative, not interrogative.

#### Sub-step C: Confirm Date of Birth

| | |
| --- | --- |
| **Eyebrow** | "Director selected — confirm your date of birth" |
| **Pill** | Green pill with company name (e.g. "INNOCENT LIMITED") |
| **Title** | "Nice — your company is established." |
| **Sub** | "Please confirm your date of birth for identity confirmation and to help us prevent fraud." |
| **Locked card** | Company name + "Director: {selected name}" with checkmark |
| **DOB input** | 3 fields: **DD / MM / YYYY**. **MM and YYYY pre-filled** from Companies House public data. **Only the day is missing.** |
| **Helper text above DOB** | "We have {MM}/{YYYY} on record from Companies House" |
| **Trust copy below CTA** | "Next: a few quick details to **unlock a snapshot** of your likely rates and terms, plus best-fit lender offers and pre-qualifications." |
| **Footer** | 🔒 "Bank-level encryption" |
| **CTAs** | Back ← / **Proceed** (disabled until DD filled) |

**Trick — the cleverest part of the whole funnel**: 

By pre-filling MM/YYYY from public Companies House data, they (a) reduce typing to 2 keystrokes, and (b) communicate "we've already done the homework — confirm we got the right person." It's a one-shot trust + friction-reduction play. **The user is also locked in by this point** because the system has *named the company and the director*. Backing out now feels like quitting on yourself.

---

### STEP 2 (Modal) — Turnover

| | |
| --- | --- |
| **Eyebrow (top)** | "Almost there — just a few numbers" |
| **Inner counter** | "STEP 2 OF 3" (in green) — **contradicts the 7-node stepper deliberately**. The 7-step bar = legitimacy. The "2 of 3" = "you're almost done." Both true. |
| **Title** | "Your business performance" |
| **Sub** | "Lenders use turnover to calculate your funding range." |
| **Inputs (both £-prefixed)** | Annual turnover (placeholder e.g. 150000) · Monthly turnover (placeholder e.g. 12500) |
| **Auto-format** | Typing "500000" → displays "£ 500,000" (commas inserted live) |
| **Dynamic placeholder** | Once Annual is filled, Monthly placeholder updates to **annual ÷ 12** ("e.g. 41,667"). |
| **CTAs** | Back ← / **Continue** (disabled until both filled) |

**Trick**: The justification copy ("Lenders use turnover to calculate your funding range") removes the "why are you asking" objection inline. The dynamic Monthly placeholder eliminates math friction *and* signals "we did the arithmetic for you, so you can quickly check your number is right."

---

### STEP 3 (Modal) — Details

| | |
| --- | --- |
| **Eyebrow (top)** | "Last step — then see your personalised offers" |
| **Inner counter** | **"FINAL STEP"** (green) — **this is a lie.** Step 4 Contact still follows. |
| **Title** | "You're one step away from your offers" |
| **Sub** | "A quick verification so lenders can match you with the best rates." |
| **Q1 (required)** | "Do you own your home?" — chips: **Own / Rent** |
| **Q2 (optional)** | "Do you accept card payments?" — chips: **Yes / No** |
| **Q2 conditional** | If **Yes** → reveals **"Monthly card revenue"** field with hint *"Merchants accepting cards often qualify for higher advances."* (£ prefix, placeholder e.g. 5000) |
| **Q3 (required, lock icon)** | **"Your residential address"** with inline explainer: *"We confirm your home address to prevent fraud, and run a soft credit search to show you instant rates and offers. This does not affect your credit score."* |
| **Address autocomplete** | Google Places, GB-restricted, geocode mode. After selection, trust pills appear *inside the field card*: 🛡 256-bit encrypted · ✓ FCA-regulated · ✕ Never sold |
| **Below address (sticky info card)** | Clock icon · "**Soft Search Only:** We'll show you your likely rates, the products you qualify for, your best-match lender, and instant finance offers where available." |
| **CTAs** | Back ← / **Finalize and See Offers** (dark navy when valid) |

**Tricks**:
1. **Homeownership = proxy for personal guarantee credit quality** — they ask the cheapest single question that lender models hinge on
2. **Card payments → conditional revenue unlock** — qualifies merchant-cash-advance candidates and hints at *better* products as a reward
3. **Address card mini-system**: privacy reassurance *before* the field, trust pills *after* the field, soft-search promise *below* the field. Three psychological layers around one sensitive input.
4. **"FINAL STEP" is rhetorical, not literal** — Step 4 follows. This is a known persuasion tactic; whether it survives an FCA review is a separate question.

---

### STEP 4 (Modal) — Contact

| | |
| --- | --- |
| **Eyebrow** | "Almost there — you're seconds from your offers" |
| **Hero icon** | Small animated sparkle/dots (suggests "we're processing you in") |
| **Title** | **"Good news — your business meets criteria."** |
| **Sub** | "Funding options are available — where shall we send your match report?" |
| **Field 1** | "Email Address" — placeholder "you@company.com", envelope icon |
| **Field 2** | "Mobile Number" — split: fixed `+44` chip + tel input, placeholder "7XXX XXX XXX", phone icon |
| **Compliance block (gray card)** | "We plan to show you credit offers from carefully selected providers. By submitting, you acknowledge that we have our permission to share relevant data with these providers. These providers will share your information with credit reference agencies to run soft credit and identity checks — this will not affect your credit score. They will also share it with fraud prevention agencies. For more information please see our Privacy Policy." |
| **CTA** | **"Unlock My Offers"** |

**Tricks**:
1. **Pre-qualification BEFORE contact ask** — the headline tells you you've already passed. You're not handing over PII to be evaluated; you're handing it over to *receive what you've earned*. Massively reduces drop-off here, which is normally the most painful step.
2. **Reframe**: contact info isn't a *form field*, it's a *delivery address* for your "match report." Loss aversion — they already have something for you.
3. **CTA copy peaks at "Unlock"** — strongest value verb in the funnel.
4. **Compliance disclosure is verbose and legally-styled but visible** — likely FCA-required for a credit broker. Not obscured.
5. **Email + phone in one step** — they want both channels. Phone is mandatory (UK SME concierge model needs to call).

---

### STEP 5 — Offers screen (NOT captured)

I stopped before submitting Step 4 to avoid triggering real soft credit search + lender notifications on the test data. Based on the stepper's final "★ Offers!" node + the multiple promises across the funnel ("match report", "personalised offers", "best-match lender"), the offers screen almost certainly shows:

- Funding amount confirmed / range
- Best-match lender name + logo
- Indicative APR/term
- Prequalification status
- CTA to "Continue with this offer" or upload bank statements / accounts

**Recommendation**: get a real screenshot of this from Max/Atlas via Slack — it's the one screen we can't capture without committing data.

---

## Persuasion Patterns Catalogued

| Pattern | Where it appears | Why it works |
| --- | --- | --- |
| **Foot-in-the-door** | Two inline clicks (amount + purpose) before any modal | Sunk cost from frictionless micro-decisions |
| **Dual counters** | 7-step bar + "STEP 2 OF 3" eyebrow | Long bar = legitimate. Short counter = nearly done. Both shown. |
| **Pre-fill from public data** | DOB MM/YYYY pulled from Companies House | "They already know me, this is real" |
| **Justification inline** | "Lenders use turnover to..." / "We confirm address to prevent fraud" | Removes objection before it forms |
| **Conditional unlocks** | Card payments Yes → "qualify for higher advances" | Carrot for honest disclosure |
| **Repeated soft-search promise** | At least 5 instances across the form | This is the #1 SME objection — they hammer it |
| **Pre-qualification before contact ask** | "Good news — your business meets criteria" on Step 4 | Reframes PII as redemption, not application |
| **Reframe contact as delivery** | "where shall we send your match report" | Loss aversion |
| **Escalating CTA copy** | "Continue" → "Finalize and See Offers" → "Unlock My Offers" | Each click feels bigger than the last |
| **State-preserving back links** | "← Change amount" / "← Change company" everywhere | Removes the fear of being trapped |
| **"FINAL STEP" eyebrow** | On Step 3 of 4 modal steps | Misleading-but-effective |
| **Trust bar fixed in modal header** | Every step | Constant reassurance |
| **Trust pills repeat at high-friction moments** | Below address field | Frontload reassurance where it's needed most |

---

## Backend / Tracking Notes

- Every step transition fires `POST /rest/v1/funnel_events` to Supabase REST.
- During my session these returned **503** — could be intermittent Supabase incident, could be rate-limited, could be a known bug. **Worth flagging to Atlas** — if 503s are persistent, their funnel analytics are broken.
- No GA / Segment / Meta / TikTok pixels were caught in 15 network requests across Step 3 alone. Either they fire late, are in a service worker, or are simply not implemented.
- **If Meta/TikTok pixels aren't firing on step events, that's a big finding** — they can't optimize ad bidding without conversion-step events back to the ad platforms. Verify with Max.

---

## Friction Points / Weaknesses (places we can beat them)

1. **No microcopy under the amount chips** — picking £100k vs £1m+ has no consequence explainer. Could test eyebrow under each tier ("typical for stock-up funding" / "for acquisitions & expansion").
2. **"Other amount" is a dead-end link** — pressing it likely opens a numeric input. Lower-prominence than the chips — but if users genuinely don't know their amount, this becomes a major drop point.
3. **Purpose has only 4 chips + "Other"** — categories may not map to all real funding reasons (R&D tax credit bridging, VAT bills, payroll). "Other" likely under-captures.
4. **Companies House search depends on knowing your exact registered name** — many directors think of their trading name, not the legal entity. No fallback if they type their trading name and get no useful matches. Worth testing a "what's on your bank statements?" hint.
5. **DOB pre-fill assumes the user IS the director** — if the *applicant* is a finance manager, an admin, or a part-owner with no Companies House role, this step fails them. Need a "I'm filling this in for someone else" branch.
6. **No financial qualification given in the funnel** — they say "£200k+ turnover, 1+ year trading" in the FAQ, but the form will let a £50k turnover business proceed all the way and then presumably reject at the offers step. Wastes user time and Fundsmart cost-per-lead.
7. **Address Q3 isn't optional even on bank loans where it usually wouldn't matter** — losing some applicants to address paranoia.
8. **"FINAL STEP" labeling on Step 3 is a misrepresentation** — risk: backlash on review sites, FCA scrutiny. Variant could use honest "STEP 3 OF 4" and bet on the credibility lift.
9. **No "save & resume"** — if the user abandons mid-modal, refresh starts them over (need to verify, but appears so).
10. **The "Other" dropdown on Purpose was not explored** — single linear pass per agreement. Worth a second pass to capture the full set.
11. **Hero H1 animation is 3 states, two of which are functionally redundant** ("Stop Guessing" / "Know Your Options" / "Fund Faster") — clarity competes with motion-design. Could test a static "best version" headline.
12. **No visible progress percentage / "we'll show offers in ~30 seconds" timer** — the existing stepper is binary (checked/unchecked) rather than continuous (a percentage). Continuous progress correlates with completion in form research.

---

## How To Beat It — Variant Hypotheses

> Tagged by the three landing-page types we have in the Operate brief (SAL-001 Sales LP, QUZ-001 Quiz, ADV-001 Advertorial). Each hypothesis says **which variant it fits** and **why we'd expect a lift**.

### High-conviction tests

| # | Hypothesis | Variant fit | Why it'd lift |
| --- | --- | --- | --- |
| 1 | **Lead with the Companies House magic earlier.** Move "We'll find your business automatically from Companies House" into the hero so the *first* signal of intelligence happens before commitment. | SAL · QUZ | Their best persuasion device is hidden until step 3. Pull it forward. |
| 2 | **Real soft-search proof** (third-party trust mark from a credit bureau / "Experian-verified soft search") next to the 93% claim. | SAL | "No credit impact" is the #1 objection in the FAQ; ours can outdo theirs with an explicit logo. |
| 3 | **A continuous % progress bar** (not a 7-node stepper). Replace abstract icons with a real "%". | All | Stepper feels long; percentage feels short and finite. |
| 4 | **"Pre-approved" headline on Step 4 with the *specific* indicative range** ("Good news — based on your turnover, you typically qualify for £80k–£250k") instead of vague "meets criteria." | QUZ · SAL | Adding specificity at the contact ask is where you 2× completion if the math behind it is honest. |
| 5 | **Founder video on the page** (Max, 60s, "I built this because of X" — pulling directly from the long founder quote in the FAQ). | ADV · SAL | They have a great founder story already written; nobody has seen it on the page. |
| 6 | **Trade name / brand name search**, not just legal entity. Fuzzy-match to multiple Companies House entries. | All | Captures the user who knows "Bob's Bakery" but not "BAKERIES UK 4471 LIMITED". |

### Quiz-specific (QUZ-001)

| # | Hypothesis | Why |
| --- | --- | --- |
| 7 | Quiz frames as **"Funding Fitness Score"** with a numeric output (0–100) before the lender match — gamifies the form, gives the user something to share/screenshot. | Quiz funnels with a scored output beat unscored ones 30–50% on completion. |
| 8 | Replace the "FINAL STEP" lie with **honest 7-step counter** but make each step a 2-second animation. | Earnedness > urgency on the quiz audience (slower buyers). |
| 9 | Quiz adds a **"how do other businesses like yours typically fund?"** sidebar after step 2 (turnover) — peer comparison. | Peer normalization, social proof at decision-density. |

### Advertorial-specific (ADV-001)

| # | Hypothesis | Why |
| --- | --- | --- |
| 10 | Long-form advertorial leads with **a real UK SME case study** (one of the four they already have — Sarah L. / £150k / 48h black-friday stock) then drops the same inline amount chip card at the bottom. | Story-first, hook-last. Standard advertorial pattern. |
| 11 | Embed the **"Why we built this"** Max quote as the third major section. | They already wrote it. Just position it differently. |
| 12 | End with **a comparison vs. "applying to your bank directly"** with the £6 weeks vs 6 hours framing — they have it in the table but it's buried. | The 6h vs 6w contrast is the strongest single comparison they have. |

### Sales LP-specific (SAL-001)

| # | Hypothesis | Why |
| --- | --- | --- |
| 13 | **Two-CTA hero**: keep the inline form, but add a "Watch how it works (2 min)" video CTA next to it. | Captures users who need more proof before clicking. |
| 14 | **Replace the 6-amount chip grid with a slider** (£10k → £1m+ with live amount label). | One-click slider often beats discrete buckets on engagement and amount ceiling. |
| 15 | **Show a "businesses funded today" live counter** in the hero (real or simulated). | Recency social proof beats absolute counts. The "143,953 to date" is impressive but stale-feeling. |

---

## What I Did NOT Capture (for future passes)

- The "Other" funding amount input behavior on Step 0
- The "Other" funding purpose dropdown options on Step 1
- The "I'm a Sole Trader →" alternative flow on Step 1 (Modal)
- Validation error states (e.g. invalid email format, invalid UK postcode)
- What happens on a *failed* DOB match (does the form proceed anyway? Does it warn?)
- Mobile (responsive) version — captured at 1440×900 desktop only
- The **Offers!** screen (intentionally not submitted)
- Behavior on browser back button mid-modal
- A/B-test variants if Fundsmart is running any
- Network calls that fire on successful Step 4 submission (these are the most important — bank/credit bureau integrations)

These are good follow-up tasks for a second pass once we have:
1. Sign-off from Atlas that we can submit test data through to the Offers screen, OR
2. A dev environment / sandbox endpoint they can point us at

---

## Files

- `./fundsmart-landinggov-walkthrough.gif` — 50-frame screen recording of the walkthrough (downloaded; check Chrome's Downloads folder).
- `./brand-research.md` — landing-page copy + brand positioning (first-pass scrape).
- `./context.json` — brand metadata + landing-page tasks in Operate.
