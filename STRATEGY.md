# Strategy Layer: The Intelligence Engine That Gets Smarter

## The Core Idea

Every BD platform in defense is static. GovWin sells you data. Usul matches you to contracts. GovDash writes proposals. None of them learn. None of them get better at predicting what wins and what doesn't. They're tools — not intelligence.

**We're building an intelligence engine.** Every contract outcome — win, loss, no-bid, protest, incumbent displacement — feeds back into the system. The models improve. The recommendations sharpen. The pricing gets tighter. A company using this platform for 12 months has a fundamentally different experience than one using it for 1 month, because the system has learned from every outcome in between.

This is the moat. Data pipelines can be replicated. UIs can be copied. A learning system that compounds intelligence over time cannot be fast-followed.

---

## The Three Layers

```
┌─────────────────────────────────────────────────┐
│              LAYER 3: STRATEGY                  │
│   Capture playbooks, win themes, pricing,       │
│   proposal strategy — all generated from        │
│   the intelligence below                        │
├─────────────────────────────────────────────────┤
│              LAYER 2: INTELLIGENCE              │
│   Win models, agency behavior, competitor       │
│   profiles, pricing benchmarks — learned        │
│   from outcomes, refined over time              │
├─────────────────────────────────────────────────┤
│              LAYER 1: DATA                      │
│   SAM.gov, FPDS, USAspending, SBIR,            │
│   defense budgets — ingested, cleaned,          │
│   cross-referenced                              │
└─────────────────────────────────────────────────┘
```

Most competitors operate at Layer 1 (data access) or Layer 3 (AI-generated content). **Layer 2 is where the compounding happens** and nobody owns it yet.

---

## Layer 2: The Intelligence Engine (Detail)

### 2.1 Win Probability Model

Not a keyword match score. A real predictive model trained on outcomes.

**Input features:**
- Capability fit (semantic similarity between company profile and opportunity requirements)
- Set-aside match (does the company's socioeconomic status match the opportunity type?)
- Incumbent strength (CPARS proxy, contract duration, modification history, pricing trends)
- Agency behavior (this contracting office's historical small business award rate, LPTA vs. best value tendencies, average number of bidders)
- Competition density (how many vendors have won similar work in this NAICS/PSC?)
- Pricing position (can this company price competitively based on historical award ranges?)
- Recompete dynamics (is the incumbent vulnerable? cost overruns, schedule delays, aging contract)
- Pre-RFP engagement (has this company engaged with this agency before? RFI responses, industry days)
- Past performance relevance (does the company have CPARS-documented work in this domain?)

**Output:** Pwin score (0-100) with confidence interval and factor breakdown.

**Initial model:** Rules-based, using base rates from FPDS data. Example: "Small business set-aside with no incumbent = 25% base rate. Adjust up for capability fit, down for no past performance in this agency."

**Target model:** Gradient-boosted classifier trained on historical bid outcomes (our users' + FPDS public award data). Calibrated so that opportunities scored at 60% actually result in wins ~60% of the time.

### 2.2 Agency Behavior Profiles

Every contracting office behaves differently. We build profiles from their award history:

- **Evaluation method preference:** What % of this office's awards are LPTA vs. best value tradeoff?
- **Small business friendliness:** What % goes to small businesses? Which set-aside categories?
- **Incumbent loyalty:** What's their incumbent re-award rate on recompetes?
- **Competition level:** Average number of bidders per solicitation?
- **Price sensitivity:** How often does lowest price win vs. highest-rated technical?
- **Award timeline:** Average days from solicitation close to award?
- **Modification patterns:** How often do they modify contracts (indicates scope creep tolerance)?

These profiles are built automatically from FPDS data and updated continuously. When a user pursues an opportunity, the agency profile informs every recommendation — pricing, proposal emphasis, competitive positioning.

### 2.3 Competitor Intelligence Graph

A living map of the defense contracting landscape:

- **Vendor nodes:** Every company that's won a defense contract in the last 5 years
- **Edges:** Teaming relationships (who subs to whom), competitive overlaps (who bids against whom)
- **Attributes per vendor:**
  - Win rate by NAICS, PSC, agency, contract size
  - Average contract value and pricing patterns
  - Capability clusters (inferred from awards, not self-reported)
  - Growth trajectory (increasing/decreasing award volume)
  - Incumbent positions (which contracts they hold, when they expire)
  - Set-aside utilization (how much of their work comes through set-asides)
  - CPARS signal (proxy from modifications, option exercises, follow-on awards)

When a user looks at an opportunity, we can answer: "Here are the 3-5 companies most likely bidding, their win rates on similar work, their probable pricing range, and where they're vulnerable."

### 2.4 Pricing Intelligence

Historical award prices normalized into queryable benchmarks:

- **By labor category:** What does a Senior Systems Engineer cost on DoD contracts? By agency, by region, by contract type.
- **By contract type:** T&M vs. FFP vs. cost-plus — how do award values differ for similar scope?
- **By agency:** Which agencies pay above market? Which squeeze pricing?
- **Price-to-win ranges:** For a given scope/NAICS/agency combination, what's the competitive price band?
- **Wrap rate benchmarks:** Inferred from GSA Schedule rates, FOIA'd rate cards, and award value analysis.

---

## The Recursive Self-Improvement Loop

This is the most important section in this document. This is what makes us fundamentally different from every tool in the market.

### The Feedback Cycle

```
   ┌──────────────────────────────────────────────────────┐
   │                                                      │
   ▼                                                      │
FIND opportunity                                          │
   │                                                      │
   ▼                                                      │
SCORE it (Pwin, pricing, competitive landscape)           │
   │                                                      │
   ▼                                                      │
User DECIDES (bid / no-bid / watch)                       │
   │                                                      │
   ▼                                                      │
STRATEGIZE (capture plan, win themes, pricing)            │
   │                                                      │
   ▼                                                      │
EXECUTE (proposal, submission)                            │
   │                                                      │
   ▼                                                      │
OUTCOME (win / loss / no-award / protest)                 │
   │                                                      │
   ▼                                                      │
LEARN ─────────────────────────────────────────────────────┘
```

Every step generates data. Every outcome validates or invalidates the models. The system doesn't just track outcomes — it interrogates them.

### What "Learn" Actually Means

#### Level 1: Model Calibration (Automatic)

After every outcome, the system asks: **"Did we predict this correctly?"**

- **Win probability calibration:** We predicted 70% Pwin and the user won → confirms model. We predicted 70% and they lost → the model was overconfident. Over hundreds of outcomes, we calibrate so Pwin scores map to real-world probabilities.
- **Feature importance update:** Which factors actually predicted the outcome? Maybe incumbent vulnerability matters more than we weighted it. Maybe agency behavior patterns are more predictive than capability fit for certain contract types. The model reweights.
- **Pricing accuracy:** We recommended a price range of $2.1-2.5M. The award went for $1.8M. Our pricing model was too high for this agency/NAICS combination. Adjust.
- **Competitor prediction accuracy:** We said Company X was likely bidding. Were they? Who actually won? Update the competitor intelligence graph.

**Implementation:** Every outcome gets logged as a training example. Monthly retraining cycle initially, moving to continuous learning as volume increases. Backtesting against historical FPDS data provides the initial training set.

#### Level 2: Pattern Recognition (Semi-Automatic)

Across all outcomes, the system surfaces patterns humans can't see:

- **"Companies that engage pre-RFP with this agency win 3x more often."** → Surface pre-RFP opportunities more aggressively for this agency.
- **"On LPTA contracts at DISA, the winner's price is consistently 15-20% below the government estimate."** → Tighten pricing recommendations for DISA LPTA.
- **"Incumbents at this contracting office lose 40% of recompetes when the contract has 3+ modifications."** → Flag modification-heavy incumbents as vulnerable.
- **"Small businesses that team with a specific mid-tier partner have 2x the win rate at SOCOM."** → Suggest that partner for SOCOM opportunities.
- **"Companies that bid on more than 5 opportunities per quarter have lower win rates than those who bid on 2-3."** → Reinforce bid/no-bid discipline.

**Implementation:** Periodic analysis jobs (Claude-powered) that query the outcome database for statistically significant patterns. Surfaced as insights in the dashboard and incorporated into recommendation logic.

#### Level 3: User-Specific Learning (The Real Differentiator)

The system learns about each company individually:

- **Your strengths:** Not what you told us during onboarding — what the data shows. "You've won 3/4 contracts at Army contracting offices but 0/3 at Navy. Your Army win rate is 2x the baseline." → Weight Army opportunities higher in your feed.
- **Your pricing sweet spot:** "You've won contracts priced in the $1-3M range but lost both bids above $5M. Your cost structure isn't competitive at scale." → Adjust price-to-win for your specific overhead.
- **Your competitive matchups:** "You've beaten Company X twice but lost to Company Y three times. When Y is in the competitive set, your Pwin drops." → Factor competitor-specific matchup history.
- **Your proposal patterns:** "Your proposals score high on technical approach but weak on past performance narratives. The losses correlate with past performance being weighted highest." → Suggest strengthening past performance sections, or deprioritizing opportunities where past performance is the dominant factor.
- **Your BD cadence:** "You win when you start capture 6+ months before RFP. You lose when you start less than 60 days out." → Alert earlier, push harder on early-stage pipeline.

**Implementation:** Per-company outcome tracking from day one. Even before ML models are mature, rules-based insights ("You've won N of M at this agency") are immediately valuable.

#### Level 4: Cross-User Network Intelligence (The Flywheel)

This is where the platform becomes something no single-company tool can replicate:

- **Aggregate win rates by segment:** "Companies like yours (50-person, SDVOSB, cyber) win 35% of set-aside opportunities at DISA but only 12% at NRO." No individual company has enough data to know this. The platform does.
- **Emerging opportunity signals:** "3 of our users just got matched to RFIs from the same program office. Something big is coming." → Alert all relevant users to start pre-RFP engagement.
- **Teaming recommendations from outcomes:** "Companies that team for this type of work win 40% more often than solo bidders. Here are companies with complementary capabilities who've won similar work." → Teaming suggestions backed by outcome data.
- **Bid density warnings:** "12 of our users are considering bidding on this opportunity. Historical average is 5 bidders. Competition will be fierce." → Inform bid/no-bid decisions.
- **De-identified benchmarks:** "Your Pwin on this type of work is 25%. The top quartile of similar companies on our platform achieves 45%. Here's what they do differently." → Aspirational benchmarking without revealing specifics.

**Implementation:** Requires meaningful user base (50+ active companies generating outcomes). This is the network effect moat — the more companies using the platform, the smarter it gets for everyone.

### Learning from Losses (The Most Valuable Data)

Losses are more informative than wins. When a user loses, the system:

1. **Captures the award data.** Who won? At what price? (From FPDS, within days of award.)
2. **Asks for the debrief.** "Upload your debrief letter and we'll extract the evaluation findings." Users who share debriefs contribute to the most valuable dataset in the system.
3. **Runs post-mortem analysis:**
   - Was it price? → Adjust pricing model for this agency/contract type.
   - Was it technical? → Which evaluation factors scored low? Cross-reference with the capture strategy we generated.
   - Was it past performance? → Were we overconfident about relevance? Adjust past performance matching.
   - Was it compliance? → What did we miss in RFP analysis? Improve the compliance checker.
4. **Updates all models.** The Pwin model, agency profile, competitor graph, and pricing benchmarks all get the new data point.
5. **Generates user-specific insight.** "You lost on price by 18%. For future contracts at this agency, target 10-15% below our standard pricing recommendation."

**The debrief database is potentially the most valuable dataset in defense contracting.** No one aggregates evaluation feedback across hundreds of companies. GAO protest data is public, but debriefs are private. A platform that accumulates debrief intelligence — even de-identified — can tell you things no other tool can: what evaluators actually care about, how they score, what language triggers strengths vs. weaknesses.

### Learning from Wins (Reinforcing What Works)

Wins validate the system, but they also teach:

1. **What was the winning price?** Tightens the pricing model.
2. **What was the Pwin score when we recommended bid?** Calibrates confidence.
3. **What capture activities happened?** If the user engaged pre-RFP and we recommended it, that's signal. If they won without pre-RFP engagement, that's signal too.
4. **What proposal approach was used?** The win themes, technical approach, and differentiators that led to a win become part of the institutional knowledge base.
5. **Did the user follow our recommendations?** If they diverged and still won, our recommendation was wrong. If they followed and won, we were right. Both are training data.

### Learning from No-Bids (The Invisible Data)

Most platforms ignore no-bid decisions. We don't.

- **Why did the user no-bid?** Capture the reason: wrong fit, incumbent too strong, pricing impossible, capacity constraints, timeline too tight.
- **What happened to the opportunity?** Was it awarded? To whom? At what price? Single-bid or competitive?
- **Was the no-bid correct?** If the user no-bid and the contract went for a price they could have beaten, with a winner whose capabilities they match — the no-bid was wrong. The Pwin model should have scored higher.
- **No-bid pattern analysis:** "You're no-bidding 80% of matched opportunities. Your selection criteria may be too conservative." Or: "You're bidding everything and winning 8%. Your selection criteria are too loose."

---

## How the Strategy Layer Uses Intelligence

Layer 2 intelligence flows into Layer 3 strategy. Here's how each strategic output is informed by the learning engine:

### Bid/No-Bid Recommendation
- Pwin score from the calibrated model (not a static formula)
- Agency behavior profile (small business friendliness, evaluation method, competition level)
- Competitor matchup analysis (your historical record against likely bidders)
- Pricing feasibility (can you price competitively based on market data?)
- Capacity check (do you have bandwidth given your current pipeline?)
- User-specific hit rate at similar opportunities

**Output:** "Bid. Pwin: 62%. Here's why: set-aside you qualify for, incumbent has 4 modifications indicating performance issues, this agency awards to small businesses 45% of the time (vs. 23% DoD average). Price target: $1.8-2.2M."

### Capture Strategy Generation
- Incumbent vulnerability assessment (from FPDS modification/option data + outcome learning)
- Agency evaluation preferences (from agency profile + debrief database)
- Win themes tailored to what this evaluator values (from pattern recognition across outcomes)
- Competitive positioning based on likely bidder analysis
- Pre-RFP engagement recommendations with timeline

**Output:** A capture playbook — not generic advice, but specific, data-backed strategy informed by every relevant outcome the system has learned from.

### Pricing Guidance
- Historical award range for this NAICS/PSC/agency combination
- Competitor pricing patterns (from the intelligence graph)
- User's competitive position (overhead, wrap rate, fee tolerance)
- Agency price sensitivity (LPTA tendency, price realism track record)
- Adjustment based on outcome learning ("this agency's actual awards run 12% below our model — adjust down")

### Proposal Strategy
- Evaluation criteria emphasis based on agency patterns (what this office weights most, from debrief data)
- Strength/weakness prediction ("based on your profile, expect strengths in technical approach and weakness in past performance")
- Compliance risk factors (what trips up bidders at this agency, from loss analysis)
- Language and framing recommendations ("this evaluator responds to specificity over innovation claims")

---

## Implementation Roadmap for the Learning Loop

### Phase 1: Foundation (Ship with MVP)
- Log every user action: matches viewed, bid/no-bid decisions, opportunities pursued
- Track outcomes manually: user marks won/lost, system pulls award data from FPDS
- Rules-based Pwin using FPDS base rates (no ML yet)
- Simple win/loss dashboard per user
- Debrief upload (free text, structured later)

### Phase 2: Calibration (After ~100 outcomes across users)
- Pwin calibration: compare predicted vs. actual win rates by score bucket
- Agency profile generation from FPDS data
- Pricing model v1: historical award ranges by NAICS/PSC/agency
- Competitor prediction: who's likely bidding based on past awards
- First pattern recognition pass: surface top 5 cross-user insights

### Phase 3: Personalization (After ~50 outcomes per active user)
- User-specific Pwin adjustments (your win rate vs. baseline by segment)
- User-specific pricing recommendations (adjusted for your cost structure)
- Competitive matchup tracking (your record vs. specific competitors)
- Proposal pattern analysis (which sections correlate with your wins vs. losses)
- BD cadence analysis (optimal capture timeline for your company)

### Phase 4: Network Intelligence (After ~50 active companies)
- Cross-user aggregate insights
- Bid density signals
- Teaming recommendations from outcome data
- De-identified benchmarking
- Emerging opportunity detection from collective activity

### Phase 5: Predictive (After ~1000 outcomes)
- ML-based Pwin model (gradient boosting on outcome features)
- Automated feature importance discovery
- Continuous model retraining
- Anomaly detection (opportunities where model confidence is low → flag for manual review)
- Win rate forecasting by portfolio

---

## The Flywheel Effect

```
More users → More outcomes → Better models → Better recommendations →
Higher win rates → More users → More outcomes → ...
```

This is not a linear improvement. It compounds:

1. **Month 1:** Rules-based Pwin. Base rates from FPDS. Generic agency profiles. "Better than guessing."
2. **Month 6:** Calibrated Pwin with real outcome data. Agency profiles refined. Pricing benchmarks validated. "Measurably better than any tool on the market."
3. **Month 12:** User-specific models. Pattern recognition surfacing non-obvious insights. Debrief database informing proposal strategy. "Better than most capture managers."
4. **Month 24:** Network intelligence. Cross-user patterns. Predictive models trained on thousands of outcomes. "Better than anything a human team can do alone."

**The end state:** A small company using this platform for a year has better competitive intelligence than a Raytheon capture team — because they have access to aggregated intelligence from hundreds of companies' outcomes, not just one company's institutional knowledge.

---

## Metrics That Prove It's Working

### Model Quality
- **Pwin calibration:** Do 60%-scored opportunities win ~60% of the time?
- **Pricing accuracy:** Is the actual award price within our recommended range?
- **Competitor prediction accuracy:** Did the predicted likely bidders actually bid?
- **Feature importance stability:** Are the most predictive features consistent over time?

### User Outcomes
- **Win rate improvement:** User's win rate in month 6 vs. month 1
- **Bid efficiency:** Ratio of wins to bids (are users pursuing the right opportunities?)
- **No-bid quality:** When users no-bid on our recommendation, is the eventual winner someone they couldn't have beaten?
- **Capture timeline:** Are users engaging earlier in the capture cycle over time?

### Platform Intelligence
- **Outcome volume:** Total outcomes captured per month (the fuel for learning)
- **Debrief capture rate:** What % of losses include debrief data?
- **Insight engagement:** Are users acting on pattern-recognition insights?
- **Model improvement rate:** Is Pwin accuracy improving quarter over quarter?

---

## Why This Can't Be Replicated Quickly

1. **The debrief database.** No one else is systematically collecting evaluation feedback across hundreds of small defense companies. This is proprietary training data for understanding what evaluators actually value.

2. **The outcome dataset.** Public FPDS data tells you who won and at what price. It doesn't tell you who bid and lost, what their Pwin was, what strategy they used, or why they lost. Our users generate this data.

3. **The network effect.** Every new user makes the system smarter for every existing user. A competitor starting from zero faces a cold start problem that takes years to overcome.

4. **The compounding accuracy.** Our models get better every month. A competitor launching 18 months from now is competing against 18 months of compounded learning — they don't just need to match our features, they need to match our intelligence, which is impossible without the same data.

5. **User-specific learning.** A user who's been on the platform for a year has a personalized intelligence engine tuned to their company, their strengths, their competitive position. Switching costs are enormous — you'd lose your institutional memory.

---

## What This Means for the Product

Every feature we build should ask: **does this generate learning data?**

- A pipeline view that doesn't track outcomes is just a Kanban board. Ours tracks outcomes.
- A matching engine that doesn't validate against results is just a search filter. Ours calibrates.
- A pricing tool that doesn't learn from award data is just a calculator. Ours gets sharper.
- A proposal tool that doesn't learn from debriefs is just a text generator. Ours learns what wins.

The intelligence layer isn't a feature. It's the product. Everything else is UI for interacting with it.
