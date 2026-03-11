# Plan: Full-Stack Defense BD Platform for Underdogs

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

81% of federal contracts in FY2024 received zero competition (single bid). The problem isn't beating competitors — it's **showing up to the right contracts with a compliant bid.** Small companies don't even know which doors to knock on.

## The Product: Full-Stack Defense BD for Underdogs

Nobody does the full pipeline for defense underdogs. Usul finds contracts but doesn't help you win them. GovDash writes proposals but isn't defense-specific. GovWin has data but costs $29K/yr and has terrible UX.

**We do the whole thing: Find → Strategize → Win.**

### Core Loop

```
Ingest all defense opportunities
        ↓
Match to your company profile (AI capability matching + win probability)
        ↓
For matched opportunities: build capture strategy
  - Who's the incumbent? Where are they weak?
  - What does this evaluator care about?
  - What should you price?
  - What's your win theme?
        ↓
Help you execute the win
  - Shred the RFP
  - Generate compliance matrix
  - Draft proposal sections informed by capture intel
  - Price-to-win analysis
        ↓
Track outcome → feed back into win models
```

### Phase 1: FIND (Contract Discovery + Intelligence)

The foundation. Everything starts with getting the right opportunities in front of the right companies.

**Contract Ingestion:**
- Every defense opportunity: SAM.gov, SBIR.gov, DIU, AFWERX, SOFWERX, OTAs, GSA eBuy, OASIS+, consortium sources
- Historical awards from FPDS (3-5 years of defense contracts)
- Federal spending data from USAspending.gov
- Recompete forecasting: contracts expiring in the next 12-24 months

**Company Profiles:**
- Rich onboarding: capabilities, NAICS, clearances, set-aside eligibility (8(a), HUBZone, SDVOSB, WOSB), past performance, geographic presence, focus areas
- Upload past proposals, capability statements, tech specs — AI learns your strengths
- Auto-detect set-aside advantages you might not be leveraging

**AI Matching Engine:**
- Capability-based matching, not keyword/NAICS (like Usul, but we also do everything after the match)
- Win probability score (1-100) for every opportunity, based on:
  - Capability fit
  - Set-aside eligibility and whether this is a set-aside opportunity
  - Incumbent analysis: who holds it, how long, displacement likelihood
  - Agency patterns: does this office favor small businesses? What's their award history?
  - Competition level: how many bidders typically for this type of contract?
  - Contract history: has this been re-competed before? How often does incumbent lose?
- **Bid/no-bid recommendation:** "Bid this (72% match, no incumbent, set-aside you qualify for). Skip that (wired for Lockheed, 3% win rate for challengers)."
- Push matches to you — the right opportunities find the company

**Budget & PEO Intelligence:**
- Map defense budget lines to PEOs who control the spending
- Track which programs have money for your type of capability
- Flag funding changes: "This program's budget just increased 40% — more opportunities coming"
- Identify unfunded requirements your tech could fill

**Competitive Landscape (always-on):**
- Build vendor profiles from FPDS award history: who wins what, at what price, in what domains
- For every opportunity: who's likely bidding, their strengths/weaknesses, their win rates in this space
- Track competitor movements: new awards, contract losses, modifications, pricing trends

### Phase 2: STRATEGIZE (Capture Intelligence)

This is where Usul stops and we keep going. For every opportunity you're pursuing, we build a capture playbook.

**Incumbent Analysis:**
- Who holds the current contract (linked from FPDS)
- How long they've held it
- Their performance: contract modifications, cost overruns, schedule delays (from FPDS data)
- Displacement likelihood based on historical patterns

**Evaluator Intelligence:**
- What has this contracting office awarded before?
- What do they value — lowest price technically acceptable (LPTA) vs. best value tradeoff?
- Small business track record: what % of their awards go to small businesses?
- Agency behavior profile: evaluation tendencies, patterns humans can't see

**Win Theme Generation:**
- Based on the solicitation + agency history + your strengths + competitor weaknesses:
- "Lead with [X capability], emphasize [Y past performance], differentiate on [Z] because the incumbent is weak there"
- Ghost the competition: "The incumbent had 3 contract modifications for cost overruns. Position your fixed-price approach as a differentiator."

**Pricing Intelligence:**
- What did similar contracts award for? (normalized from FPDS)
- Price range analysis: what's competitive without leaving money on the table
- Price-to-win: "Based on historical awards for similar scope, target $X-Y range"

**Pre-RFP Engagement:**
- Flag sources sought, RFIs, industry days for opportunities in your pipeline
- "This agency posted an RFI 6 months ago. Here's the industry day schedule. Engage NOW."
- Track contracting officer contacts and engagement history

### Phase 3: WIN (Proposal Support)

You've found the opportunity and have a capture strategy. Now close it.

**RFP Analysis:**
- Upload or link solicitation → structured breakdown
- Parse into: requirements, evaluation criteria (Section L & M), mandatory vs. desirable items
- Identify "hidden" evaluation factors based on agency history
- Flag unusual or risky requirements

**Compliance Matrix:**
- Auto-generate from solicitation — every requirement mapped to a proposal section
- Nothing missed — common disqualification risks flagged
- "You're missing [X] — this agency has disqualified 3 of the last 5 losers for this"

**Proposal Strategy + Drafting:**
- Not just "fill in the template" — "here's how to score highest on each evaluation factor based on what this agency cares about"
- Draft key sections: executive summary, technical approach, management approach, past performance narratives
- All informed by the capture intelligence — win themes woven throughout
- Leverages your company profile, past proposals, and capability statements

**Review & Quality:**
- Compliance check: does the proposal address every requirement in the matrix?
- Strength assessment: where will evaluators score this highest/lowest?
- Suggestions for strengthening weak sections

### Phase 4: LEARN (Outcome Tracking + Win Model Improvement)

Close the loop. Every outcome makes the system smarter.

**Pipeline Tracking:**
- Kanban: matched → qualified → pursuing → submitted → won/lost
- Track every opportunity through the full lifecycle

**Post-Award Intelligence:**
- When contracts are awarded: who won, at what price (from FPDS)
- Win/loss analysis: "You lost to [Company] who bid $X. Here's what their proposal likely emphasized based on their capabilities."
- Feed outcomes back into win probability model — the system gets better with every data point

**SBIR Transition Support (feature, not focus):**
- For SBIR Phase II companies: map technology to Programs of Record that need it
- Identify STRATFI/TACFI/CATALYST/APFIT transition funding opportunities
- Phase III sole-source guidance
- PEO sponsorship strategy

**Contract Risk Monitoring:**
- Track budget changes affecting your active contracts
- DOGE-era awareness: flag programs under review or at risk
- "Your program's funding was reduced 15% in the latest CR — here's what that means"

### What This Is NOT
- Not a general govcon tool (defense only — go deep, not wide)
- Not for primes (if you have 10,000 employees, this isn't for you)
- Not a CRM replacement (we're intelligence + strategy, not pipeline management — though we have a basic pipeline view)
- Not just a chatbot wrapping public data (the value is in the data models and the full pipeline)

## Why This Isn't a Wrapper

**Could someone replicate this by prompting ChatGPT?** No.

The value is in the **data layer + the full pipeline**:
1. **Live contract ingestion** from dozens of sources, defense-filtered, continuously updated
2. **Win probability model** built on years of FPDS award data, contract modifications, incumbent performance, agency behavior patterns
3. **Pricing intelligence dataset** — historical award prices normalized and queryable
4. **Competitive graph** — who bids on what, wins at what price, with what capabilities. Built from public data but assembled into something that doesn't exist elsewhere
5. **Agency behavior models** — evaluation tendencies derived from thousands of awards
6. **Capture-informed proposals** — the proposal drafting is informed by all the intelligence above, not just generic AI writing

**The moat is the data pipeline + the models + the full-stack integration.** Each phase feeds the next. Finding informs strategy. Strategy informs proposals. Outcomes improve the models. No single-point tool can replicate the full loop.

## Competitive Positioning

| | Usul | GovDash | GovWin | Us |
|---|------|---------|--------|-----|
| **Defense-specific** | Yes | No (all gov) | No (all gov) | Yes |
| **Find contracts** | Yes (core strength) | Basic | Yes | Yes |
| **Win probability scoring** | Match score (1-100) | No | No | Yes (data-backed) |
| **Budget/PEO mapping** | Yes (key asset) | No | Partial | Yes |
| **Capture intelligence** | Minimal | No | Partial | Yes (core strength) |
| **Incumbent analysis** | Basic | No | Yes | Yes (deep, from FPDS) |
| **Pricing intelligence** | Competitor pricing shown | No | Partial | Yes (price-to-win) |
| **RFP shredding** | No | Yes | No | Yes |
| **Proposal writing** | No | Yes (core strength) | No | Yes (strategy-informed) |
| **Compliance matrix** | No | Yes | No | Yes |
| **Win/loss feedback loop** | No | No | No | Yes |
| **SBIR transition tools** | No | No | No | Yes |
| **Serves underdogs** | Growth-stage companies | Small to top-100 | Enterprise ($29K/yr) | True underdogs |
| **Pricing** | Enterprise (est $1-5K/mo) | Custom quotes, enterprise | $13-119K/yr | Usage-based, accessible |

**The one-liner:** "Usul helps you find contracts. GovDash helps you write proposals. We help you win — from discovery to award, defense-specific, built for underdogs."

## Technical Architecture

### Stack
- **Backend:** Python (FastAPI)
- **Database:** PostgreSQL + pgvector (for semantic search on opportunities and capabilities)
- **Data Pipeline:** Scheduled scrapers + API integrations → ETL → enrichment → AI analysis
- **Win Model:** Historical FPDS data → feature extraction → win probability scoring
- **AI Layer:** Claude API for RFP analysis, proposal drafting, capture strategy, win theme generation
- **Frontend:** Next.js
- **Notifications:** Email + SMS for opportunity alerts
- **Hosting:** Vercel + Railway (cheap to start)

### Data Model (core entities)
- **Companies** (user profiles) — capabilities, clearances, NAICS, past performance, set-aside eligibility, location, uploaded docs
- **Opportunities** — from SAM.gov et al., parsed into structured fields + embeddings, linked to budget lines
- **Contracts** — historical awards: who won, price, duration, agency, program, modifications, competition type
- **Vendors** — every company that's won a defense contract: capabilities inferred from awards, win rates, pricing patterns
- **Agencies** — contracting offices: award patterns, evaluation tendencies, small business track record
- **PEOs** — program executive offices: budget lines, programs, contacts, spending patterns
- **Matches** — opportunity ↔ company pairings with win probability scores
- **Captures** — user's active pursuits: capture strategy, win themes, pricing, proposal status
- **Outcomes** — won/lost tracking, feeds back into win model

### Key Data Sources
- **FPDS.gov** — historical contract awards (who won what, at what price, modifications, competition type)
- **USAspending.gov** — federal spending by program, contractor, agency
- **SAM.gov** — live opportunities + entity registrations
- **SBIR.gov** — small business innovation opportunities
- **DIU, AFWERX, SOFWERX** — innovation pipeline opportunities
- **DSBS** — small business capability profiles
- **Defense budget documents** — program element lines, PEO budgets
- **Consortium sources** — OASIS+, NASA SEWP, GSA eBuy, SOF Vulcan

## Build Plan

No artificial time pressure. Build it right.

### Stage 1: Data Foundation
- Set up project (Next.js + FastAPI + PostgreSQL)
- Build data ingestion pipeline:
  - SAM.gov opportunities API (live defense opportunities)
  - FPDS bulk data (3-5 years of defense contract awards)
  - USAspending API (spending by program/agency/contractor)
  - SBIR.gov (small business innovation opportunities)
- Design and load database schema
- Build vendor profiles from FPDS award history
- Build agency/contracting office profiles from award patterns
- **Checkpoint: Can we query "who won contracts like X, at what price, from which agency?"**

### Stage 2: Matching + Intelligence Engine
- Company profile creation (onboarding flow)
- AI capability matching engine (opportunity ↔ company)
- Win probability scoring model (capability fit + set-aside + incumbent + agency patterns + competition level)
- Bid/no-bid recommendations
- Incumbent identification for active opportunities
- Competitive landscape generation: who's likely bidding, strengths/weaknesses
- Pricing intelligence: what similar contracts awarded for
- **Checkpoint: Can a user sign up, build a profile, and see ranked opportunities with win scores and competitive intel?**

### Stage 3: Capture Strategy + Proposal Support
- Capture strategy generator: win themes, differentiators, competitive positioning
- RFP analysis: upload solicitation → structured breakdown (requirements, evaluation criteria, Section L & M)
- Compliance matrix auto-generation
- Proposal strategy: how to score highest on each evaluation factor
- Draft proposal sections (exec summary, technical approach, past performance) from company profile + capture intel
- Price-to-win analysis
- **Checkpoint: For a real opportunity, does the platform produce a useful capture strategy and proposal draft?**

### Stage 4: Full Pipeline + Polish
- Pipeline view: matched → qualified → pursuing → submitted → won/lost
- Opportunity detail page: win probability + capture strategy + competitive landscape + pricing intel
- Post-award tracking: who won, at what price, win/loss analysis
- Budget/PEO intelligence integration
- Pre-RFP tracking: sources sought, RFIs, industry days
- Contract risk monitoring
- SBIR transition tools
- **Checkpoint: End-to-end flow works — from discovery to proposal to outcome tracking**

### Stage 5: Launch
- Landing page
- Onboarding: company profile setup in under 5 minutes
- Usage-based pricing implementation
- Launch: X/Twitter, LinkedIn, defense tech communities
- Direct outreach to 50 small defense companies
- Defense accelerator partnerships (NSIN, Catalyst, Techstars Allied Defense)

## Business Model

**Usage-based pricing with a premium layer.** Details TBD, but the direction:
- Pay per analysis/action (RFP shred, capture strategy, proposal draft, etc.)
- Small premium on top for platform access and continuous matching
- Accessible enough that a 10-person company can start without a big commitment
- Revenue scales with usage — more opportunities pursued = more revenue

## Go-to-Market

1. **Narrative:** "The primes have capture teams. Now you do too."
2. **Content as product demo:** Publish real competitive intelligence — "Here's what the data says about who wins cyber contracts at DISA." The content IS the product demo.
3. **Direct outreach:** Target companies that recently lost bids (public data from FPDS). "You lost [X contract] to [incumbent]. Here's what the data says you should have done differently. Here's 3 opportunities you'd be competitive on right now."
4. **Defense accelerator partnerships:** NSIN, Catalyst, Techstars Allied Defense — free access for cohort companies.
5. **Community:** Slack/Discord for small defense companies.

## Future Features

- **Teaming suggestions:** When an opportunity needs capabilities you don't have, suggest partners
- **Win/loss debrief analysis:** After award, deep analysis of what the winner did right
- **Subcontracting marketplace:** Primes need small business subs — connect them
- **International:** Allied nations (AUKUS, NATO) rearming = same problem, new market
- **Government-side tool:** Help contracting officers find qualified small businesses (flip the marketplace)

## Why YC Would Fund This

- **Full-stack in a fragmented market** — competitors do pieces, we do the pipeline
- **Data moat** — proprietary win models, competitive intelligence, pricing data built on years of FPDS
- **Defense is YC's fastest-growing vertical** (0 → 19 companies in 2 batches)
- **Massive market:** $100B+ in annual DoD small business contracts
- **Measurable outcome:** customer win rates. Did their bid-win rate go up?
- **Mission-aligned:** American Dynamism — help the little guy compete against incumbents who overcharge and underdeliver
- **Usul finds. GovDash writes. We win.** Clear positioning.

## Risks

| Risk | Mitigation |
|------|-----------|
| Usul adds proposal/capture features | They have 11 people across 6 products + international expansion. We go deeper on the winning side. |
| GovDash adds defense depth | They serve primes too — can't offer "how to beat the incumbent" when the incumbent is their customer. |
| Win probability model isn't accurate early | Start simple (base rates by NAICS/set-aside/agency), improve with data. Even rough signals beat guessing. Backtest against historical awards. |
| Companies don't trust AI for high-stakes bids | Always show the data. "Here's why — here's the raw FPDS data." Human verifies, AI informs. |
| FPDS data quality | Supplement with USAspending, cross-validate. Start with well-populated contract types. |
| Building too much at once | Stage gates with checkpoints. Each stage must work before moving to the next. |

## Verification Plan

1. Can a company sign up, build a profile, and see qualified opportunities with win scores in under 5 minutes?
2. Does the bid/no-bid recommendation correlate with actual outcomes? (Backtest against historical data)
3. Does the capture strategy surface non-obvious insights (incumbent weaknesses, agency preferences)?
4. Does the proposal draft actually reflect the capture intelligence (not generic AI output)?
5. Can we demonstrate the full pipeline on a real opportunity: find → strategize → draft proposal?
6. 30-second pitch: "We help small defense companies find the right contracts and win them. Full stack, defense-specific, built for underdogs."

## Next Steps

1. Research and test data source APIs (SAM.gov, FPDS, USAspending, DSBS, SBIR.gov)
2. Design database schema
3. Build data ingestion pipeline (Stage 1)
4. Build matching + intelligence engine (Stage 2)
5. Build capture + proposal support (Stage 3)
6. Build full pipeline + polish (Stage 4)
7. Launch (Stage 5)
