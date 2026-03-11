# Plan: Defense Contract Platform for Underdogs

## The Problem

Small defense companies lose contracts they're technically qualified for — not because they can't do the work, but because:

1. **They can't find opportunities fast enough.** Primes have 50-person BD teams monitoring every solicitation. A 20-person company has one person doing BD part-time.
2. **They can't team effectively.** DoD wants "best of breed" teams. Primes assemble teams from their rolodex of thousands. Small companies don't know who complements them.
3. **They don't understand the game.** Who's the likely incumbent? What's the real budget? Is this wired? What does the evaluator actually care about? Primes have decades of institutional knowledge. Small companies are guessing.
4. **They bid alone when they should team, and team when they should bid alone.** No data-driven bid/no-bid framework.

The result: **the same 5 primes win 70%+ of defense dollars**, even when smaller companies could deliver better, faster, cheaper.

## The Product: A Contract Matchmaker for Defense Underdogs

This is NOT an intelligence dashboard. This is a **matchmaking and teaming platform** that actively puts contracts in front of the right small companies and helps them win.

### Core Loop

```
Opportunity drops → Match to qualified underdogs → Assemble optimal team → Arm them to win
```

### Feature Set

#### 1. Smart Matching (the engine)
- Ingest every defense opportunity (SAM.gov, SBIR, DIU, AFWERX, SOFWERX, OTAs)
- Build rich company profiles: capabilities, past performance, clearances, NAICS, set-asides, geographic presence
- Match opportunities to companies with a **win probability score** — not just keyword matching, but pattern-based: "companies like you win contracts like this X% of the time"
- **Push matches to companies.** Don't wait for them to search. The opportunity finds the company.

#### 2. Teaming Network (the moat)
This is what makes it NOT a wrapper. This is a proprietary network.

- Every company on the platform has a capability profile
- When an opportunity requires capabilities no single small company has, the platform **suggests teaming arrangements**: "You do the cyber piece, they do the hardware, together you're competitive against Raytheon"
- Team formation is the #1 thing small companies can't do at scale. Primes can. We give underdogs that superpower.
- **Network effects:** More companies on the platform → better teams get formed → more wins → more companies join
- Track teaming history, team chemistry, joint win rates

#### 3. Win Intelligence (the edge)
- For every opportunity: who's the incumbent? What did they bid last time? What's the contract ceiling vs. actual spend?
- **Win pattern analysis:** "For contracts like this, winning teams typically have [these capabilities] and bid [this range]"
- Bid/no-bid recommendation: "Your win probability is 12% solo, 47% if you team with a company that has [X clearance + Y past performance]"
- Post-award analysis: who won, at what price, what can you learn for next time

#### 4. Bid Support (the closer)
- AI-powered compliance matrix generation from RFP
- Shred the solicitation: pull out requirements, evaluation criteria, hidden preferences
- Draft initial proposal sections leveraging company profile + past performance
- Review checklist: "You're missing [X] — this is a common disqualification reason"

### What This Is NOT
- Not a general govcon tool (defense only — go deep, not wide)
- Not an AI chat about defense news (that's a blog)
- Not a CRM or proposal management system (GovDash does that fine)
- Not for primes (if you have 10,000 employees, this isn't for you)

## Why This Wins

**The GPT wrapper test:** Could someone replicate this by prompting ChatGPT? No, because:
1. **Proprietary teaming network** — you can't prompt your way into knowing which small companies complement each other and have good working chemistry
2. **Win pattern data** — years of contract award data analyzed into predictive models, not just summaries
3. **Network effects** — the platform gets better as more companies join and team through it
4. **Push-based matching** — opportunities find you, not the other way around. This requires a live data pipeline, not a chatbot.

**The moat is the network, not the AI.** AI is the engine. The network of small defense companies teaming through us is the moat.

## Technical Architecture

### Stack
- **Backend:** Python (FastAPI)
- **Database:** PostgreSQL + pgvector
- **Data Pipeline:** Scrapers + API integrations for contract data, run on schedule
- **Matching Engine:** Embedding-based capability matching + historical win pattern model
- **AI Layer:** Claude API for RFP analysis, proposal drafting, compliance checking
- **Frontend:** Next.js
- **Notifications:** Email + SMS for opportunity alerts
- **Hosting:** Vercel + Railway (cheap to start)

### Data Model (core entities)
- **Companies** — capabilities, clearances, NAICS, past performance, set-aside eligibility, location
- **Opportunities** — from SAM.gov et al., parsed into structured fields + embeddings
- **Contracts** — historical awards: who won, price, duration, agency, program
- **Teams** — which companies have teamed, on what, outcome
- **Matches** — opportunity ↔ company pairings with win probability scores

### Key Data Sources
- **FPDS.gov** — historical contract awards (who won what, at what price)
- **USAspending.gov** — federal spending by program, contractor, agency
- **SAM.gov** — live opportunities + entity registrations
- **SBIR.gov** — small business innovation opportunities
- **DIU, AFWERX, SOFWERX** — innovation pipeline opportunities
- **DSBS (Dynamic Small Business Search)** — small business capability profiles

## MVP Build Plan (4 Weeks)

### Week 1: Data Foundation + Matching
- Set up project (Next.js + FastAPI + PostgreSQL)
- Build data ingestion: SAM.gov opportunities API, FPDS bulk data, USAspending API
- Design and load database schema
- Build company profile creation (onboarding flow)
- Build opportunity ↔ company matching engine (capability + NAICS + set-aside matching)
- Generate win probability scores from historical FPDS data

### Week 2: Teaming Engine
- Build company capability graph (who does what, where, at what clearance level)
- Teaming recommendation algorithm: "For this opportunity, the optimal team is [A + B + C]"
- Team formation flow: invite companies to team, accept/decline, form joint profile
- "Find a teaming partner" search: filter by capability, clearance, location, past performance
- Basic messaging between companies exploring teaming

### Week 3: Win Intelligence + Bid Support
- Incumbent analysis for each opportunity (who holds the current contract)
- Historical pricing intelligence (what similar contracts awarded for)
- Bid/no-bid scoring: solo win probability vs. teamed win probability
- RFP analysis feature: upload solicitation → structured breakdown of requirements + evaluation criteria
- Compliance matrix generator
- Basic proposal section drafting from company profile

### Week 4: Polish + Launch
- Daily opportunity digest email (personalized matches + win probability)
- Dashboard: my matches, my teams, my pipeline
- Landing page: "Stop losing contracts to primes. Team up and win."
- Onboarding: company profile setup in under 5 minutes
- Free tier: see matches, basic search
- Paid tier ($149/mo): teaming network, win intelligence, bid support, unlimited alerts
- Launch: X/Twitter, LinkedIn, defense tech communities, direct outreach to 50 small defense companies

## Business Model

| Tier | Price | What You Get |
|------|-------|-------------|
| Free | $0 | See your top 5 matches/week, basic contract search |
| Pro | $149/mo | Full matching, teaming network, win intelligence, 10 AI analyses/mo |
| Team | $349/mo | Everything + unlimited AI analyses, proposal support, team formation tools, API access |

**The real revenue play:** Once teams form and win contracts through the platform, take a **success fee** (0.5-1% of contract value) or **preferred teaming partner** placement. This aligns our incentives with the underdog's: we only make real money when they win.

**Revenue targets:**
- Month 1: 20-30 companies signed up, 5-10 paying ($750-$3.5K MRR)
- Month 3: 100 companies, 30-50 paying ($4.5K-$17.5K MRR), first teams formed
- Month 6: 500 companies, 100+ paying, first contract wins through platform teams
- Apply to YC with: "X companies, Y teams formed, Z contract wins facilitated, $A MRR"

## Go-to-Market

1. **Narrative:** "The primes have armies. You have us." The underdog story is inherently viral in defense tech.
2. **Content:** Publish "Underdog Win Reports" — case studies of small companies beating primes. This IS the marketing.
3. **Community:** Build a Slack/Discord for small defense companies. Give them a place to find each other. The community becomes the teaming network.
4. **Accelerator partnerships:** NSIN, Catalyst, Techstars Allied Defense — offer free access to their cohort companies. Every startup in these programs needs teaming partners.
5. **Direct outreach:** Target companies that recently lost bids (public data from FPDS). "You lost [X contract] to [prime]. Here's how you could have won with a team."

## Why YC Would Fund This

- **Network effects business**, not a GPT wrapper — moat deepens with every company that joins
- **Defense is YC's fastest-growing vertical** (0 → 19 companies in 2 batches)
- **Massive market:** $400B+ in annual defense contracts, underdogs are underserved
- **Aligned incentives:** success-fee model means we win when underdogs win
- **Data flywheel:** more companies → better matching → more wins → more companies
- **Clear wedge:** start with teaming/matching, expand into the full BD stack for small defense companies

## Expansion Path

1. **Months 1-6:** Matching + teaming + win intelligence (MVP). Prove teams form and win.
2. **Months 6-12:** Success fee model. Deeper proposal support. Clearance-aware matching.
3. **Year 2:** Become the marketplace for defense subcontracting. Primes come here to find small business subs (they have small business subcontracting goals they MUST hit).
4. **Year 3:** International — allied nations (AUKUS, NATO) have the same problem with defense monopolies.

## Risks

| Risk | Mitigation |
|------|-----------|
| Companies won't share capabilities publicly | They already do on DSBS and SAM.gov. We're just making it useful. |
| Teaming is relationship-driven, not platform-driven | Start with warm intros and lightweight teaming. Don't try to replace relationships — augment them with data. |
| Win probability model isn't accurate enough | Start simple (historical base rates by NAICS/set-aside), get better with data. Even rough signals beat guessing. |
| GovDash adds teaming features | Their customer base is primes. They can't credibly serve underdogs AND primes. We're picking a side. |
| Slow adoption | The community play (Slack/Discord) is free and builds the network even before paid features. |

## Verification Plan

1. Can a company sign up, build a profile, and see matched opportunities in under 5 minutes?
2. Does the teaming recommendation actually surface complementary companies?
3. Would a BD person at a 30-person defense company pay $149/mo for this?
4. Does the win probability score correlate with actual outcomes?
5. Can two companies that met through the platform form a team and submit a joint bid?
6. 30-second pitch: "We help small defense companies team up and beat the primes."

## Next Steps

1. Research and test data source APIs (SAM.gov, FPDS, USAspending, DSBS)
2. Design database schema around the core entities
3. Build data ingestion pipeline
4. Build matching + teaming engine
5. Build frontend + notifications
6. Seed the network with 50 companies
7. Launch
