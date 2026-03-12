# Government Data APIs: Costs, Rate Limits & Access Requirements

Research completed 2026-03-12. Every potential cost and blocker documented.

---

## 1. SAM.gov API (Opportunities + Entity Data)

**Cost: FREE** | **Blocker Level: MEDIUM (rate limits)**

SAM.gov is the single most important data source. It provides contract opportunities, entity/vendor registrations, exclusions, contract awards (migrating from FPDS), and federal hierarchy data.

### Available APIs (all free, all require API key)
| API | What it provides |
|-----|-----------------|
| Get Opportunities Public API | All published opportunity details, updated daily (active) / weekly (archived) |
| Entity Management API | Vendor registrations: name, UEI, NAICS, PSC, business types, addresses, POCs |
| Entity/Exclusions Extracts API | Bulk downloads of entity and exclusion data (JSON/CSV), up to 1M records |
| Contract Awards API | Historical contract awards (migrated from FPDS, soft launch July 2025) |
| Federal Hierarchy Public API | Federal organization structure |
| Opportunity Management API | For registered system accounts only |

### Rate Limits (THIS IS THE BLOCKER)
| Account Type | Rate Limit |
|-------------|-----------|
| Public (no registration) | 10 requests/day |
| Registered non-federal user | 1,000 requests/day |
| Federal system account | 1,000 requests/day (can request increase with business justification) |

**Key constraints:**
- API keys expire every 90 days (email notifications 15 days before)
- Only federal system accounts can request rate limit increases (case-by-case)
- Non-federal users are capped at 1,000/day with no path to increase
- Entity extract API caps at 1,000,000 records per request

### Workaround Strategy
- Cache aggressively (opportunities don't change frequently; 1-hour cache is fine)
- Use bulk data extract downloads instead of paginated API calls where possible
- 1,000 requests/day is actually workable for a startup: that's ~1 request per 86 seconds
- Each request can return multiple results (paginated), so 1,000 requests can fetch tens of thousands of opportunities

### How to Get API Key
1. Register at SAM.gov (free, requires Login.gov account)
2. Go to Account Details / Profile page
3. Copy "Public API Key" field
4. No approval process for basic access

---

## 2. FPDS.gov (Historical Contract Awards)

**Cost: FREE** | **Blocker Level: LOW-MEDIUM (migrating to SAM.gov)**

### Current Status
FPDS is being absorbed into SAM.gov. As of February 2026, federal users can access contract award management at sam.gov/contracting. The legacy FPDS.gov site still operates but is being sunset.

### Data Access Methods
| Method | Details |
|--------|---------|
| FPDS Atom Feed | XML feed, limit of 399,990 records per search query |
| SAM.gov Contract Awards API | New replacement (see SAM.gov section above) |
| USAspending.gov | Contains FPDS data in a more accessible format |
| Web search on FPDS.gov | Free, no API key needed, but no bulk download |

### Key Constraints
- FPDS has NO bulk download functionality on the platform
- The Atom feed is the only programmatic access and is capped at ~400K records per query
- FPDS uses SOAP/XML (not REST/JSON) -- legacy architecture
- Migration to SAM.gov is ongoing; expect FPDS to be fully deprecated in 2026-2027

### Recommendation
Skip FPDS.gov entirely. Use SAM.gov Contract Awards API + USAspending.gov instead. Both have the same underlying data in more accessible formats.

---

## 3. USAspending.gov API

**Cost: FREE** | **Blocker Level: LOW (best government data API)**

### Overview
The gold standard for federal spending data. REST API, no authentication required for public endpoints, comprehensive documentation, open-source codebase.

### Access Details
| Feature | Details |
|---------|---------|
| Authentication | None required for public endpoints |
| API Version | V2 (V1 deprecated) |
| Format | REST/JSON |
| Rate Limits | Not explicitly published, but generous |
| Download Limit | 250,000 records per download request (temporary limit during enhancements) |
| Bulk Download | Available for full datasets by agency/year |
| Source Code | Open source on GitHub (fedspendingtransparency/usaspending-api) |

### Available Data
- All federal awards (contracts, grants, loans, other financial assistance)
- Sub-award data
- Agency spending by category (NAICS, PSC, recipient, etc.)
- Federal account / budget function breakdowns
- Geographic spending analysis

### Data Quality Notes
- Transition from FSRS to SAM.gov (March 2025) introduced better deduplication controls for subawards
- FY2026 introduces PARK (replacing Program Activity Codes) for better tracking
- Data is as good as what agencies report -- some lag and inconsistency exists
- Best used in conjunction with SAM.gov for cross-validation

### Bulk Download
Full database snapshots available at files.usaspending.gov. This is the most efficient way to seed an initial database rather than paginating through the API.

---

## 4. SBIR.gov API

**Cost: FREE** | **Blocker Level: HIGH (program authorization expired)**

### API Endpoints (all free, no auth required)
| Endpoint | Default Rows | Max Rows |
|----------|-------------|----------|
| Awards API (`/public/api/`) | 100 per request | Not specified |
| Solicitations API (`/public/api/solicitations`) | 25 per request | 50 per request |
| Company/Firm API (`/public/api/firm`) | 100 per request | 5,000 per request |

### Data Available
- SBIR/STTR solicitations and topics
- Award history
- Company profiles of past winners
- Supports JSON and XML output
- Offset-based pagination for large result sets

### CRITICAL BLOCKER
**Congressional authority for SBIR/STTR programs expired September 30, 2025.** If Congress does not reauthorize:
- Federal agencies cannot award new SBIR/STTR funding
- Solicitations may be delayed, cancelled, or rescinded
- The API and historical data likely remain accessible, but new data stops flowing

### Recommendation
Historical SBIR data is valuable for identifying small business competitors and past win patterns. Build the integration but don't make it a core feature until the program is reauthorized.

---

## 5. GovWin / Deltek & Paid Intelligence Platforms

**Cost: $5,000 - $119,000/yr** | **Blocker Level: N/A (competitor, not a data source for us)**

These are the incumbents we're competing against, not data sources we'd integrate.

### GovWin IQ (Deltek) Pricing
| Company Size | Estimated Annual Cost |
|-------------|---------------------|
| Small (low revenue) | $5,000 - $12,000/yr |
| Mid-size business | $25,000 - $45,000/yr |
| Enterprise (5+ users) | $30,000 - $119,000/yr |
| Average across all | ~$29,000/yr |

### Bloomberg Government (BGOV) Pricing
- $500 - $1,250/month (annual commitment required)
- ~$6,000 - $15,000/yr
- Unique value: connects congressional appropriations + regulatory developments to procurement

### Other Paid Platforms
| Platform | Approximate Cost |
|----------|-----------------|
| GovTribe | $1,350 - $4,000/yr |
| Find RFP | Free search, paid for details |
| Fedmine / GovSpend | Contact for pricing |

### Competitive Insight
Both GovWin and BGOV lack AI-generated outreach, predictive scoring, and automated signal detection. This is our opening -- they have the data moat but outdated UX and no AI layer.

---

## 6. Defense Budget Documents

**Cost: FREE** | **Blocker Level: LOW (excellent open-source tooling exists)**

### Machine-Readable Data Sources
| Source | Format | Coverage |
|--------|--------|----------|
| DoD Comptroller (comptroller.war.gov) | PDF (with embedded XML since 2013) | FY2013 - FY2026 |
| 540co GitHub repos | JSON, CSV, SQL extracted from PDF/XML | Historical P-1 and R-1 exhibits |
| FedAPI (jbooks.fedapi.io) | REST API + CSV + SQL | R&D and Procurement justification books |
| DoD R-1 / P-1 documents | PDF + embedded XML | Annual budget requests |

### Key Details
- Pre-2013 budget justification books have NO machine-readable attachments (PDF only, would need OCR)
- Post-2013 PDFs contain embedded XML that can be extracted programmatically
- The 540co open-source repos have already done this extraction work and provide JSON/CSV
- FedAPI exposes the same data via a REST API

### What's Available
- RDT&E (Research, Development, Test & Evaluation) program elements
- Procurement line items
- Budget justification narratives
- Year-over-year funding comparisons
- Program element to contractor mappings

### Recommendation
This is a goldmine of signal data for predicting where money is flowing. Use the 540co JSON extracts or FedAPI for structured data. For FY2026 data, may need to extract XML from fresh PDFs.

---

## 7. pgvector PostgreSQL Hosting Costs

### Supabase (Recommended for MVP)
| Plan | Monthly Cost | Includes |
|------|-------------|----------|
| Free Tier | $0 | 500MB database, pgvector included |
| Pro Plan | $25/month | 8GB database, 250GB bandwidth, 2-core ARM shared, 1GB RAM |
| Pro + Medium Compute | ~$85/month | $25 base + $60 compute add-on (dedicated 2-core/4GB) |
| Pro + Large Compute | ~$135/month | $25 base + $110 compute add-on (dedicated 2-core/8GB) |
| Storage overage | $0.125/GB/month | Beyond plan limits |

pgvector is included at no extra cost on all Supabase plans. The $10 compute credit on Pro covers one Micro instance.

### Railway
| Resource | Cost |
|----------|------|
| Volume storage | $0.15/GB/month |
| Memory | $10/GB/month |
| vCPU | $20/vCPU/month |
| Network egress | $0.10/GB |
| Hobby plan credit | $5/month included |

**Example Railway config for pgvector:**
- 2GB RAM + 1 vCPU + 10GB storage = ~$22/month
- 4GB RAM + 2 vCPU + 50GB storage = ~$88/month

### Self-Hosted (e.g., Hetzner, DigitalOcean)
- Cheapest option: ~$5-20/month for a small VPS with PostgreSQL + pgvector
- Full control but you manage backups, updates, scaling
- Only worth it above $500/month in managed DB costs

### Recommendation for MVP
Start with **Supabase Pro at $25/month**. pgvector included, managed backups, auth built in, realtime subscriptions. Migrate to Railway or self-hosted only if you outgrow Supabase's compute limits or need custom tuning.

---

## 8. Claude API Costs for RFP/Proposal Processing

### Current Claude API Pricing (2026)
| Model | Input (per 1M tokens) | Output (per 1M tokens) | Best For |
|-------|----------------------|----------------------|----------|
| Haiku 4.5 | $1 | $5 | Classification, extraction, routing |
| Sonnet 4.5 | $3 | $15 | RFP analysis, proposal drafting |
| Opus 4.5 | $5 | $25 | Complex strategy, win theme generation |

**Long context (>200K input tokens) pricing for Sonnet 4.5:** $6 input / $22.50 output per 1M tokens.

### Cost Estimate: 100 Proposals/Month

**Assumptions:**
- Average RFP document: ~100-250 pages = ~50,000 - 125,000 tokens
- Processing per RFP: extraction + analysis + competitive positioning + draft recommendations
- Estimated 200K-500K tokens per full RFP processing pipeline (input + output across multiple calls)
- Using Sonnet 4.5 for primary analysis, Haiku 4.5 for classification/extraction

| Task | Model | Est. Tokens/RFP | Monthly (100 RFPs) | Monthly Cost |
|------|-------|-----------------|-------------------|-------------|
| Document extraction & classification | Haiku 4.5 | 80K input, 10K output | 8M in, 1M out | $8 + $5 = $13 |
| RFP analysis & requirements parsing | Sonnet 4.5 | 100K input, 30K output | 10M in, 3M out | $30 + $45 = $75 |
| Competitive positioning & win themes | Sonnet 4.5 | 50K input, 20K output | 5M in, 2M out | $15 + $30 = $45 |
| Compliance matrix generation | Haiku 4.5 | 60K input, 20K output | 6M in, 2M out | $6 + $10 = $16 |
| **Total** | | | | **~$150/month** |

### Cost Optimization Levers
- **Batch API**: 50% discount on all tokens (would cut to ~$75/month)
- **Prompt Caching**: 90% discount on cached input tokens (huge for repeated RFP sections/templates)
- **Haiku for triage**: Use Haiku to classify/filter before sending to Sonnet (already factored above)
- **Chunking strategy**: Don't send entire RFP to every call; extract relevant sections first

### Realistic Range
| Scenario | Monthly Cost |
|----------|-------------|
| Lean (heavy Haiku, aggressive caching) | $50 - $80 |
| Standard (mix of Haiku + Sonnet) | $100 - $200 |
| Premium (Opus for strategy, full analysis) | $300 - $500 |

---

## 9. Data Sources Requiring Special Access

### Requires Security Clearance
| Source | Clearance Level | What's Behind It |
|--------|----------------|------------------|
| Classified SAM.gov entity data (CUI "Sensitive") | Federal system account w/ clearance | Sensitive entity registration details |
| DoD unrevealed award data | DoD user account | Contract awards within 90 days of signing |
| Classified budget programs | Secret/TS clearance | Black programs, SAPs |
| JWICS/SIPRNet procurement data | TS/SCI | Classified contract opportunities |

### Requires Paid Subscription
| Source | Cost | What You Get |
|--------|------|-------------|
| GovWin IQ (Deltek) | $5K - $119K/yr | Pre-RFP intelligence, relationship maps, win probability |
| Bloomberg Government | $6K - $15K/yr | Legislative-to-procurement connection, policy analysis |
| GovTribe | $1.4K - $4K/yr | Federal market intelligence, opportunity tracking |
| Library of Congress databases | Free on-site | Historical contracting research databases |

### Requires Federal Employee/Agency Status
| Source | What's Restricted |
|--------|------------------|
| SAM.gov CUI/FOUO data | Controlled Unclassified Information entity records |
| SAM.gov rate limit increases | Only federal system accounts can request >1,000 req/day |
| FPDS DoD unrevealed data | 90-day embargo on DoD contract award details |
| Contract writing system data (CIDS) | Internal procurement system |

### Free But With Friction
| Source | Friction |
|--------|---------|
| SAM.gov API | Need Login.gov account, 90-day key rotation, rate limits |
| SBIR.gov | Program authorization expired (Sep 2025) |
| Defense budget PDFs | Pre-2013 data requires OCR; post-2013 needs XML extraction |
| Regulations.gov | Free API but rate limited |

---

## Summary: Total Platform Cost Estimate

### Monthly Infrastructure Cost (MVP)
| Item | Monthly Cost |
|------|-------------|
| Supabase Pro (PostgreSQL + pgvector) | $25 |
| Claude API (100 proposals, standard tier) | $150 |
| Vercel / hosting | $20 |
| Domain + misc | $10 |
| **Total MVP** | **~$205/month** |

### Scaling Estimate (1,000 proposals/month)
| Item | Monthly Cost |
|------|-------------|
| Supabase Pro + Large Compute | $135 |
| Claude API (Batch API + caching) | $500 - $1,000 |
| Vercel Pro | $20 |
| **Total at scale** | **~$655 - $1,155/month** |

### Data Sources: All Free
Every government data source (SAM.gov, USAspending, SBIR, FPDS, defense budgets) is **free to access**. The only real costs are compute and AI processing. The paid intelligence platforms (GovWin, BGOV) are competitors, not dependencies.

### Key Blockers to Watch
1. **SAM.gov rate limits** (1,000 req/day for non-federal) -- workable with caching but needs careful architecture
2. **SBIR program expiration** -- historical data available but new data flow uncertain
3. **FPDS migration** -- transition period may have gaps; prefer USAspending as primary source
4. **No access to classified/CUI data** -- we can only work with public data (which is still a massive dataset)
5. **90-day API key rotation on SAM.gov** -- needs automated key refresh or manual reminder
