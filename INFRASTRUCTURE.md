# Infrastructure Decisions

## Cache-First Architecture

Every data source interaction goes through a local cache layer. We bulk download, store locally, and serve from our database. The APIs are for incremental updates, not real-time queries.

```
Government APIs → Scheduled Ingestion → PostgreSQL (source of truth) → App
                  (not per-request)
```

### Why

1. **SAM.gov rate limit is 1,000 requests/day.** That's it. No way to increase it without a federal account. If we hit the API per user request, 10 active users searching would burn through the limit in hours. Cache-first means we decouple user activity from API limits entirely.

2. **Bulk extracts are available and massive.** SAM.gov offers bulk downloads up to 1M records. USAspending has full database dumps. FPDS has Atom feeds with hundreds of thousands of records. The smart move is: pull everything once, store it, then poll for deltas.

3. **Government APIs are slow and unreliable.** SAM.gov has documented outages, maintenance windows, and response times measured in seconds. Our users need sub-second search. Serving from our own PostgreSQL + pgvector gives us that.

4. **We need to enrich the data anyway.** Raw government data is messy — inconsistent NAICS codes, missing fields, duplicates across sources. We need an ETL layer that cleans, deduplicates, cross-references (e.g., linking SAM.gov opportunities to USAspending award history), and generates embeddings. This only works if the data lives in our database.

5. **Win probability scoring requires historical data.** The AI matching engine needs years of FPDS award data to score opportunities. You can't compute "what's the incumbent's win rate in recompetes for this agency" with a live API call. That's a query against our local dataset.

6. **API keys expire every 90 days (SAM.gov).** If the key lapses, a cache-first system keeps working with stale data. A pass-through system goes down completely.

7. **Cost control.** Claude API calls for enrichment (entity extraction, capability tagging, embedding generation) are expensive per-record but cheap in batch. Processing 50K opportunities in a nightly batch with Haiku is ~$5. Processing them on-demand per user request would be 10-100x more.

### Ingestion Strategy

| Source | Method | Frequency | Volume |
|--------|--------|-----------|--------|
| SAM.gov Opportunities | Bulk extract + API delta | Every 6 hours | ~3K active defense opportunities |
| SAM.gov Entity Data | Bulk extract | Weekly | ~650K entities (filter to defense-relevant) |
| USAspending Awards | Bulk download + API delta | Daily | ~500K defense awards (3-5 year window) |
| USAspending Spending | API | Weekly | By agency/program/contractor |
| SBIR.gov Awards | API | Daily | ~4K awards/year |
| Defense Budget Docs | Open-source JSON extracts | Annually (budget cycle) | ~10K program elements |

### What This Means for the Stack

- **PostgreSQL + pgvector** is the single source of truth for all government data
- **Scheduled workers** (cron jobs or task queue) handle all API interactions
- **The app never calls government APIs directly** — it queries our database
- **Freshness SLA**: opportunities updated within 6 hours, awards within 24 hours, entities within 7 days
- **Embeddings** generated at ingestion time, not query time

## Cost Estimates

| Service | What | Cost |
|---------|------|------|
| Supabase Pro | PostgreSQL + pgvector, 8GB DB, managed backups | $25/mo |
| Vercel | Next.js frontend hosting | $0-20/mo |
| Railway | FastAPI backend + scheduled workers | $5-20/mo |
| Claude API | RFP analysis, proposal drafting, enrichment (~100 proposals/mo + batch enrichment) | $50-200/mo |
| Domain | | ~$12/yr |
| **Total** | | **~$100-265/mo** |

### Why These Choices

- **Supabase over self-hosted Postgres**: Managed backups, pgvector included, auth built in, $25/mo is cheaper than ops time
- **Railway over AWS/GCP**: No config overhead, deploy from git, predictable pricing, good for early stage
- **Vercel for frontend**: Free tier is generous, Next.js-native, zero config deploys
- **Claude API model mix**: Haiku 4.5 for extraction/tagging ($1/$5 per 1M tokens), Sonnet 4.6 for analysis/proposals ($3/$15), batch API for 50% discount on bulk jobs

## Data Source Access

Every government data source is free. No paid subscriptions required.

| Source | Auth | Rate Limit | Cost |
|--------|------|------------|------|
| SAM.gov API | API key via Login.gov | 1,000 req/day | Free |
| USAspending.gov API | None | Generous (unpublished) | Free |
| SBIR.gov API | None | None published | Free |
| Defense Budget (540co/FedAPI) | None | N/A (static files) | Free |
| FPDS.gov | None | N/A (being sunset into SAM.gov) | Free |

### Access Notes

- SAM.gov keys expire every 90 days — need automated rotation or calendar reminders
- SBIR/STTR congressional authority expired Sept 2025 — historical data available, no new data until reauthorized
- USAspending bulk downloads available at https://www.usaspending.gov/download_center/custom_award_data
- SAM.gov bulk extracts at https://sam.gov/data-services
- No classified or CUI data access needed — public data covers everything in our scope
