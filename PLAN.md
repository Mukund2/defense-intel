# Plan: Defense Intelligence Agent for Small Contractors

## The Idea

An AI-powered defense intelligence agent that helps small defense contractors compete against the primes. Defense-only, intelligence-first, agent-first.

**Not a govcon workflow tool (that's GovDash). A defense strategic intelligence agent.**

## Differentiation from GovDash

| | GovDash | Us |
|---|---------|-----|
| **Scope** | All government (health, education, civilian, defense) | Defense-only — 10x deeper |
| **Product** | Workflow tool (find, propose, manage) | Intelligence agent (understand, predict, advise) |
| **Experience** | Dashboard you log into | Agent that messages YOU proactively |
| **Intelligence** | Contract data | Contract data + OSINT + geopolitical context + budget analysis + scenario planning |
| **Positioning** | "AI for government contracting" | "Strategic intelligence for defense underdogs" |
| **Serves primes?** | Yes (top 100 contractors are customers) | No — explicitly for small companies fighting primes |

## What the Product Does

### The Agent Experience
You set up your company profile (capabilities, NAICS codes, past performance, focus areas). Then the agent works for you 24/7:

**Daily:**
- Monitors SAM.gov, SBIR.gov, DIU, AFWERX, SOFWERX for new opportunities matching your profile
- Sends you a morning briefing: "3 new opportunities match your profile. 1 is high-priority."
- Alerts you to contract awards in your space (competitive intelligence)

**Weekly:**
- Defense market intelligence briefing: budget shifts, new programs, threat developments
- Win/loss analysis of contracts in your space
- Teaming partner recommendations

**On demand:**
- "Analyze this RFP for me" — agent reads the full solicitation, identifies requirements, flags risks, assesses your competitiveness
- "Who are my competitors for this?" — competitive landscape for any specific opportunity
- "What's happening in [domain]?" — deep dive on any defense sector (counter-UAS, autonomous systems, AI/ML, cyber, etc.)
- "Draft an initial response to this opportunity" — leveraging your company profile and past proposals

**Scenario planning:**
- "What happens to my market if China moves on Taiwan?"
- "How do DOGE cuts affect programs in my space?"
- "Which programs are growing fastest and why?"

### The Intelligence Engine (Under the Hood)

**Data sources (all public, no clearance needed):**
- FPDS.gov — every federal contract (historical + real-time)
- USAspending.gov API — federal spending data
- SAM.gov API — active opportunities + entity data
- SBIR.gov — small business innovation opportunities
- DIU.mil, AFWERX, SOFWERX — innovation org solicitations
- Congress.gov — NDAA text, appropriations bills, committee reports
- Defense.gov — press releases, budget documents, strategy papers
- DefenseScoop, Breaking Defense, Defense News — news via RSS
- SEC filings — public defense company financials
- LinkedIn — personnel moves (who's moving where in defense)

**AI analysis:**
- Claude API for natural language analysis, summarization, matching
- Pattern recognition: which types of companies win which types of contracts
- Trend analysis: program growth/decline, budget trajectories
- Competitive positioning: how your company compares on specific opportunities

## Technical Architecture

### Stack
- **Backend:** Python (FastAPI)
- **Database:** PostgreSQL + pgvector (for semantic search)
- **Data Pipeline:** Scheduled scrapers + API integrations → ETL → AI analysis
- **AI:** Claude API (analysis, summarization, drafting, recommendations)
- **Frontend:** Next.js dashboard + email/SMS alerts
- **Notifications:** Email (daily briefings), SMS/Slack (urgent alerts)
- **Hosting:** Vercel (frontend) + Railway or Fly.io (backend) — cheap, scalable

### MVP Build Plan (4 Weeks)

**Week 1: Data Foundation**
- Set up project (Next.js + FastAPI + PostgreSQL)
- Build data ingestion for FPDS.gov (bulk download + incremental updates)
- Build data ingestion for USAspending.gov API
- Build SAM.gov API integration (active opportunities)
- Design database schema: contracts, vendors, agencies, programs, opportunities
- Initial data load: last 3-5 years of defense contracts

**Week 2: Intelligence Engine**
- Company profile system (capabilities, NAICS, past performance, focus areas)
- Opportunity matching algorithm (profile → relevant opportunities)
- Competitive intelligence engine (who wins similar contracts, at what price)
- Program trend analysis (growing vs. shrinking programs)
- Claude-powered analysis pipeline for each opportunity

**Week 3: Agent Experience**
- Daily morning briefing generation (email)
- Real-time opportunity alerts (new matches)
- Contract award notifications (competitive intel)
- "Analyze this RFP" feature (upload or link → AI analysis)
- "Draft response" feature (company profile + opportunity → initial proposal sections)
- Dashboard: opportunity pipeline, market intelligence, competitive landscape

**Week 4: Launch**
- Landing page with mission statement ("Help the underdogs win")
- Onboarding flow (company profile setup)
- Free tier (basic search + 3 alerts/week)
- Paid tier ($99/mo for full agent experience)
- Launch on X/Twitter, LinkedIn, Product Hunt
- Direct outreach to 50 small defense companies

## Business Model

| Tier | Price | What You Get |
|------|-------|-------------|
| Free | $0 | Basic contract search, limited defense news |
| Scout | $99/mo | Daily briefings, opportunity matching, competitive intel, 10 AI analyses/mo |
| Operator | $299/mo | Everything + unlimited AI analyses, proposal drafting, scenario planning |
| Team | $499/mo | Multi-user, custom alerts, API access, teaming recommendations |

**Revenue targets:**
- Month 1: 10-20 customers ($1K-6K MRR)
- Month 3: 50-100 customers ($5K-30K MRR)
- Month 6: 200-500 customers ($20K-150K MRR)
- Apply to YC with traction

**Unit economics:**
- Claude API: ~$0.05-0.50 per analysis
- Data: Free (public APIs)
- Hosting: ~$100-200/mo
- Gross margin: 90%+

## Go-to-Market

### Launch Strategy
1. **X/Twitter:** Share defense market insights generated by the platform. Tag defense tech community. The "underdog vs. primes" narrative is viral in this ecosystem.
2. **LinkedIn:** Targeted outreach to BD/capture managers at small defense companies. Share analysis that demonstrates value.
3. **Defense tech events:** AUSA, Sea-Air-Space, SOFIC — attend, network, demo.
4. **Newsletter:** Weekly "Defense Intelligence Briefing" (free) → drives signups to the platform.
5. **Partnerships:** Defense accelerators (NSIN, Catalyst, xTech) — offer free access to their cohort companies.

### Why Customers Will Switch from GovDash/Sweetspot
- Defense-only depth (they cover everything, we go deep)
- Geopolitical intelligence layer (they don't have this)
- Agent-first experience (they're still dashboard-first)
- Mission alignment (they serve primes too — we explicitly don't)
- Cheaper for the intelligence-only use case ($99 vs. GovDash ERP pricing)

## Why YC Would Fund This

- Fits "AI for Government" RFS
- Defense is YC's fastest-growing portfolio (0 → 19 companies in 2 years)
- Differentiated from GovDash (intelligence vs. workflow, defense-only vs. all-gov)
- Clear traction metrics (paying customers, MRR, engagement)
- Mission-aligned with American Dynamism narrative
- Agentic AI is the wave (47% of YC batch)
- Solo founder who built and shipped — demonstrates technical capability

## Risks and Mitigations

| Risk | Severity | Mitigation |
|------|----------|-----------|
| GovDash adds defense depth | Medium | Move fast, build brand, own the "underdog" narrative. They serve primes — they can't credibly be the underdog champion. |
| Data quality issues | Medium | Start with official APIs (USAspending, SAM.gov). Validate with known contracts. |
| Sales cycle too long | Low | SaaS, self-serve, credit card. Not selling to government. |
| Credibility as young founder | Low | The product IS the credibility. Ethan Thornton was 19. Content marketing builds authority. |
| Regulatory/legal | Very Low | All public data, no classified info, no ITAR concerns. |
| AI hallucination on contract details | Medium | Always link to source data. "Here's my analysis, here's the raw data." Human verifies. |

## Expansion Path

1. **Months 1-6:** Contract intelligence + opportunity matching + competitive intel (MVP)
2. **Months 6-12:** Add OSINT/geopolitical intelligence layer, scenario planning
3. **Year 2:** Teaming/matchmaking (connect complementary small companies), proposal collaboration
4. **Year 2-3:** Become the operating system for defense startups — intelligence → proposals → compliance → teaming → contract management
5. **Long term:** International expansion (allied nations rearming = massive demand for defense market intelligence)

## Verification Plan

After building, test these:
1. Can a user sign up, set up their profile, and get matched opportunities in under 3 minutes?
2. Does the daily briefing contain non-obvious, actionable intelligence?
3. Would a BD manager at a 50-person defense company pay $99/mo for this?
4. Does the competitive intelligence reveal patterns humans would miss?
5. Is the agent proactive enough that users feel like they have a "teammate"?
6. Can I demonstrate clear differentiation from GovDash in a 30-second pitch?

## Next Steps

1. Research and test data source APIs (FPDS, USAspending, SAM.gov)
2. Design database schema
3. Build data ingestion pipeline
4. Build AI analysis engine
5. Build frontend + agent notifications
6. Launch
