# Plan: Defense Contract Wins for Underdogs

## The Problem

Small defense companies lose contracts they're technically qualified for. Not because they can't do the work — because they don't have the BD infrastructure.

A prime like Raytheon has:
- A 50-person BD team tracking every solicitation
- Capture managers who study each opportunity for months before the RFP drops
- Decades of institutional knowledge: who the evaluators are, what they care about, what the incumbent bid last time
- Pricing databases from thousands of past contracts
- Relationships with contracting officers built over years

A 20-person defense startup has:
- One person doing BD part-time
- No idea if an opportunity is wired for the incumbent
- No data on what similar contracts awarded for
- No capture strategy — they find the RFP, write a proposal, hope for the best
- They bid on everything instead of focusing on what they can actually win

The result: **small companies waste 80% of their BD effort on contracts they were never going to win**, and miss the ones where they had a real shot.

## The Product: A Capture Team in a Box

We give every small defense company the equivalent of a $500K/year capture team. Not a dashboard. Not a chatbot. A system that tells you **exactly which contracts to pursue and exactly how to win them.**

### Core Loop

```
Opportunity drops → Should you bid? (qualify) → How do you win? (capture strategy) → Execute (proposal support)
```

### Features by Priority

#### P0 — Opportunity Matching (the core, day-1 value)

This is the product. Everything else builds on top of this.

Most small companies' #1 mistake: bidding on everything. They spread thin across 20 opportunities and win zero, when they should have gone all-in on 3. We fix that.

**What we do:**
- Ingest every defense opportunity (SAM.gov, SBIR, DIU, AFWERX, SOFWERX, OTAs)
- Build rich company profiles during onboarding: capabilities, NAICS, clearances, set-asides, past performance, focus areas
- For each opportunity, build a **win probability score** based on:
  - Your capabilities vs. requirements match
  - Set-aside eligibility (8(a), HUBZone, SDVOSB, WOSB — your unfair advantages)
  - Incumbent analysis: who holds the current contract, how long, are they likely to be displaced?
  - Contract history: has this been re-competed before? How often does the incumbent lose?
  - Agency patterns: does this contracting office favor small businesses? What's their award history?
- **Bid/no-bid recommendation:** "Bid this one (72% match, no incumbent, set-aside you qualify for). Skip that one (wired for Lockheed, they've held it for 8 years, 3% win rate for challengers)."
- Push the right opportunities to you. Don't make you search.

**Why this matters:** Primes qualify ruthlessly — they have entire teams deciding what to bid on. We give small companies that same discipline with data.

#### P1 — Capture Intelligence (the "how to win" playbook)

Once you decide to bid, you need to know: **what does winning look like for THIS specific contract?**

**What we do:**
- **Competitive landscape:** Who else is likely bidding? What are their strengths and weaknesses? Where can you differentiate?
- **Evaluator intelligence:** What has this contracting office awarded before? What do they value — lowest price, technical excellence, past performance, small business participation?
- **Win theme generation:** Based on the solicitation, the agency's history, and your strengths — "Lead with your [X capability], emphasize your [Y past performance], differentiate on [Z] because the incumbent is weak there."
- **Ghost the competition:** "The likely incumbent is [Company]. They've delivered [these results]. Here's where they've underperformed: [contract modifications, schedule delays, cost overruns from FPDS data]. Position against these weaknesses."

**Why this matters:** This is the stuff capture managers at primes do for 6-12 months before a bid. Small companies usually skip it entirely and go straight to proposal writing. We compress months of capture work into minutes.

#### P2 — RFP Shredding + Proposal Support (the closer)

You've qualified the opportunity and have a capture strategy. Now close it.

**What we do:**
- **Shred the solicitation:** Parse RFP into structured requirements, evaluation criteria (Section L & M), and mandatory vs. desirable items
- **Compliance matrix:** Auto-generate from solicitation — every requirement mapped, nothing missed
- **Proposal strategy:** Not just "fill in the template" but "here's how to score highest on each evaluation factor based on what this agency cares about"
- **Draft key sections:** Executive summary, technical approach, past performance narratives — all leveraging your company profile and the capture intelligence
- **Review checklist:** "You're missing [X] — this is a common disqualification reason for this agency"

**Why this matters:** GovDash and others do proposal automation. We do proposal *strategy*. The difference between a compliant proposal and a winning one is knowing what the evaluator wants — and we feed that in from the capture intelligence.

#### P3 — Pricing Intelligence

- **Historical award prices** for similar contracts, extracted and normalized from FPDS
- **Price-to-win analysis:** "Based on historical awards for similar scope, target $X-Y range. Here's why."
- Where should you price to be competitive without leaving money on the table?

#### P4 — Agency Behavior Profiling

- How each contracting office evaluates, what they weight, their historical patterns
- Small business friendliness scores per agency/office
- Derived from thousands of awards — patterns humans can't see manually

#### P5 — Daily Opportunity Digest (email/notifications)

- Morning briefing email: personalized matches with win probability scores
- Alerts for new high-match opportunities
- Contract award notifications in your space

#### P6 — Pre-RFP Tracking

- Monitor sources sought, RFIs, industry days — alert companies to opportunities before the RFP drops
- Pre-RFP engagement recommendations: "This agency posted an RFI 6 months ago. Engage NOW."

### What This Is NOT
- Not a general govcon tool (defense only — go deep, not wide)
- Not a CRM or proposal management system (GovDash does that)
- Not an AI chat about defense news (that's a blog)
- Not for primes (if you have 10,000 employees, this isn't for you)

## Why This Isn't a Wrapper

**The GPT wrapper test:** Could someone replicate this by prompting ChatGPT?

No, because the value is in the **data layer**, not the AI layer:
1. **Win probability model** — built on years of FPDS award data, contract modifications, incumbent performance, agency behavior patterns. You can't prompt your way into this.
2. **Pricing intelligence** — historical award prices for similar contracts, extracted and normalized from FPDS. This is a proprietary dataset.
3. **Competitive intelligence** — who bids on what, who wins, at what price, with what team composition. Built from public data but assembled into a queryable competitive graph that doesn't exist anywhere else.
4. **Agency behavior models** — how each contracting office evaluates, what they weight, their historical patterns. Derived from thousands of awards.
5. **Live data pipeline** — opportunities pushed to you in real-time, pre-qualified. Not a search engine.

**The moat is the data + the models trained on it.** AI is the interface. The intelligence comes from assembling public data into insights no one else has packaged.

## Technical Architecture

### Stack
- **Backend:** Python (FastAPI)
- **Database:** PostgreSQL + pgvector
- **Data Pipeline:** Scrapers + API integrations for contract data, run on schedule
- **Win Model:** Historical FPDS data → feature extraction → win probability scoring
- **AI Layer:** Claude API for RFP analysis, proposal drafting, capture strategy generation
- **Frontend:** Next.js
- **Notifications:** Email + SMS for opportunity alerts
- **Hosting:** Vercel + Railway (cheap to start)

### Data Model (core entities)
- **Companies** — capabilities, clearances, NAICS, past performance, set-aside eligibility, location
- **Opportunities** — from SAM.gov et al., parsed into structured fields + embeddings
- **Contracts** — historical awards: who won, price, duration, agency, program, modifications
- **Vendors** — every company that's won a defense contract: capabilities inferred from awards, win rates, pricing patterns
- **Agencies** — contracting offices: award patterns, evaluation tendencies, small business track record
- **Matches** — opportunity ↔ company pairings with win probability scores + capture strategy

### Key Data Sources
- **FPDS.gov** — historical contract awards (who won what, at what price, modifications, competition type)
- **USAspending.gov** — federal spending by program, contractor, agency
- **SAM.gov** — live opportunities + entity registrations
- **SBIR.gov** — small business innovation opportunities
- **DIU, AFWERX, SOFWERX** — innovation pipeline opportunities
- **DSBS (Dynamic Small Business Search)** — small business capability profiles

## MVP Build Plan (4 Weeks)

### Week 1: Data Foundation + Opportunity Matching (P0)
- Set up project (Next.js + FastAPI + PostgreSQL)
- Build data ingestion: SAM.gov opportunities API, FPDS bulk data, USAspending API
- Design and load database schema
- Ingest 3-5 years of defense contract awards from FPDS
- Build company profile creation (onboarding flow)
- Build opportunity ↔ company matching engine (capability + NAICS + set-aside matching)
- Win probability scoring from historical FPDS data (incumbent analysis, agency patterns, competition type)
- Bid/no-bid recommendations
- Dashboard: matched opportunities ranked by win probability

### Week 2: Capture Intelligence (P1)
- Incumbent identification for active opportunities (link current solicitations to prior awards in FPDS)
- Build vendor profiles from award history (auto-generated competitive intelligence)
- Competitive landscape generation: who's likely bidding, their strengths/weaknesses
- Win theme generation: how to position against likely competitors
- Ghost the competition: surface incumbent weaknesses from FPDS data (contract mods, cost overruns)
- Opportunity detail page: win probability + capture strategy + competitive landscape

### Week 3: RFP Shredding + Proposal Support (P2)
- RFP analysis: upload solicitation → structured breakdown of requirements + evaluation criteria (Section L & M)
- Compliance matrix auto-generation
- Proposal strategy: how to score highest on each evaluation factor
- Draft key sections (exec summary, technical approach, past performance) from company profile + capture intel
- Review checklist: flag common disqualification risks

### Week 4: Polish + Launch
- Pipeline view: qualified → pursuing → submitted → won/lost
- Landing page: "Stop guessing. Start winning."
- Onboarding: company profile setup in under 5 minutes
- Free tier: see matches, basic win scores
- Paid tier ($149/mo): full capture intelligence, proposal support, unlimited analyses
- Launch: X/Twitter, LinkedIn, defense tech communities, direct outreach to 50 small defense companies
- P3-P6 features are post-launch based on user feedback

## Business Model

| Tier | Price | What You Get |
|------|-------|-------------|
| Free | $0 | Top 5 matched opportunities/week with basic win scores |
| Pro | $149/mo | Full win intelligence, capture strategies, competitive landscape, pricing intel, 10 AI proposal analyses/mo |
| Operator | $349/mo | Everything + unlimited analyses, proposal drafting, price-to-win, dedicated support |

**Revenue targets:**
- Month 1: 20-30 companies signed up, 5-10 paying ($750-$3.5K MRR)
- Month 3: 100 companies, 30-50 paying ($4.5K-$17.5K MRR)
- Month 6: 500 companies, 100+ paying
- Apply to YC with: "X companies, Y% bid-win rate improvement, $A MRR"

## Go-to-Market

1. **Narrative:** "The primes have capture teams. Now you do too."
2. **Content:** Publish real competitive intelligence — "Here's what the data says about who wins cyber contracts at DISA" — the content IS the product demo.
3. **Direct outreach:** Target companies that recently lost bids (public data from FPDS). "You lost [X contract] to [incumbent]. Here's what the data says you should have done differently. Here's 3 opportunities you'd be competitive on right now."
4. **Defense accelerator partnerships:** NSIN, Catalyst, Techstars Allied Defense — free access for cohort companies.
5. **Community:** Slack/Discord for small defense companies. Share win insights, opportunity alerts, BD strategy.

## Post-MVP Roadmap

**Near-term (based on user feedback):**
- P3: Pricing intelligence — historical award prices, price-to-win analysis
- P4: Agency behavior profiling — evaluation tendencies, small business friendliness scores
- P5: Daily opportunity digest emails — morning briefings with personalized matches
- P6: Pre-RFP tracking — sources sought, RFIs, industry days

**Later:**
- **Teaming suggestions:** When an opportunity is too large for one small company, suggest potential teaming partners
- **Win/loss debrief analysis:** After award, analyze what the winner did right using public data
- **Subcontracting marketplace:** Primes need small business subs to hit their subcontracting goals. Connect them.
- **International:** Allied nations (AUKUS, NATO) rearming = same problem, new market

## Why YC Would Fund This

- **Data moat**, not a wrapper — proprietary win models and competitive intelligence built on years of FPDS data
- **Defense is YC's fastest-growing vertical** (0 → 19 companies in 2 batches)
- **Massive market:** $400B+ in annual defense contracts, small companies are underserved
- **Measurable outcome:** customer win rates. Did their bid-win rate go up? That's the metric.
- **Self-serve SaaS with transparent pricing** — GovDash requires enterprise sales. We're credit card from day one.
- **Mission-aligned:** American Dynamism narrative — help the little guy compete

## Risks

| Risk | Mitigation |
|------|-----------|
| Win probability model isn't accurate enough | Start simple (historical base rates by NAICS/set-aside/agency), improve with data. Even rough signals beat guessing. |
| GovDash adds capture intelligence | They serve primes too — can't offer "how to beat the incumbent" when the incumbent is their customer. We're picking a side. |
| Companies don't trust AI recommendations for high-stakes bids | Always show the data behind every recommendation. "Here's why we say this — here's the raw FPDS data." Human verifies, AI informs. |
| FPDS data quality/completeness | Supplement with USAspending, cross-validate. Start with well-populated contract types. |
| Sales cycle too long | Self-serve, credit card, $149/mo. Not selling to government — selling to contractors. |

## Verification Plan

1. Can a company sign up, build a profile, and see qualified opportunities with win scores in under 5 minutes?
2. Does the bid/no-bid recommendation correlate with actual outcomes? (Backtest against historical data)
3. Would a BD person at a 30-person defense company pay $149/mo for this?
4. Does the capture strategy surface non-obvious insights (pricing intel, incumbent weaknesses, agency preferences)?
5. Does the competitive landscape accurately identify likely competitors?
6. 30-second pitch: "We tell small defense companies exactly which contracts to bid on and exactly how to win them."

## Next Steps

1. Research and test data source APIs (SAM.gov, FPDS, USAspending, DSBS)
2. Design database schema
3. Build data ingestion pipeline
4. Build win probability model
5. Build capture intelligence engine
6. Build frontend + notifications
7. Launch
