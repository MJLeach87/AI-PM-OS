# 🔧 CUSTOMIZE THIS: Your Data Dictionary

**IMPORTANT**: This is a template. Replace all placeholder content below with YOUR company's actual tables, metrics, and data definitions.

**Reference**: See `pm-os-reference/identity/STANDARDS.md` for how PM OS structures its technical standards as an example of the detail level expected.

**Purpose**: This file contains YOUR data schema and metric definitions that the Data Analyst agent will use to generate SQL queries, validate PRD metrics, and assess data quality. Agents load this automatically before any data analysis task.

**Who maintains this**: Data Engineering team (schema sections) + Product Analytics team (metric formulas)

---

## How Agents Use This File

**Data Analyst** loads this file to:
- Look up table names and column definitions before writing SQL
- Validate that PRD success metrics can be measured with available data
- Generate correctly-typed, schema-aware baseline queries
- Identify instrumentation gaps (metrics in PRDs not yet tracked in data)

**Product Architect** references this file to:
- Write data-grounded success metrics in PRDs (cite actual column names)
- Assess measurement feasibility before committing to a metric

---

## Section 1: Data Platform

🔧 **CUSTOMIZE THIS** — Replace with YOUR data warehouse details.

```
Platform:       [e.g., Snowflake / BigQuery / Redshift / Databricks]
Database:       [e.g., ANALYTICS_DB]
Default Schema: [e.g., PRODUCT]
Access:         [e.g., Read-only via Snowflake MCP / Manual query via SQL client]
SQL Dialect:    [e.g., Snowflake SQL / Standard SQL / PostgreSQL]
```

**Performance guidelines**:
- Always add `LIMIT` to exploratory queries (default: `LIMIT 1000`)
- Add `WHERE created_at >= DATEADD('day', -90, CURRENT_DATE)` for time-bounded queries
- Use `EXPLAIN` before running joins across large tables
- [Add your team's query performance rules]

---

## Section 2: Core Tables

🔧 **CUSTOMIZE THIS** — Add YOUR production tables. Delete example tables that don't apply.

### Template for each table entry:

```
Table: [SCHEMA].[TABLE_NAME]
Description: [What this table tracks, one sentence]
Grain: [One row per what? e.g., "one row per user per day"]
Update frequency: [e.g., Real-time / Hourly / Daily at 3am UTC]
Row count (approx): [e.g., ~50M rows]
Retention: [e.g., 2 years rolling]

Key columns:
| Column             | Type        | Description                              | Example Value    |
|--------------------|-------------|------------------------------------------|------------------|
| [column_name]      | [TIMESTAMP] | [What it captures]                       | 2026-02-14 09:00 |
| [column_name]      | [VARCHAR]   | [What it captures]                       | user_123         |
| [column_name]      | [BOOLEAN]   | [What it captures]                       | TRUE             |

Notes: [Any quirks, known data quality issues, or gotchas]
```

---

### 2.1 Users / Accounts

**[REPLACE WITH YOUR ACTUAL TABLE]**

```
Table: PRODUCT.USERS
Description: Master user account table — one record per registered user
Grain: One row per user
Update frequency: Real-time (event-driven)
Row count (approx): [e.g., ~2M rows]
Retention: Indefinite (hard-deleted accounts soft-deleted with deleted_at)

Key columns:
| Column             | Type        | Description                              |
|--------------------|-------------|------------------------------------------|
| user_id            | VARCHAR     | Primary key, UUID format                 |
| created_at         | TIMESTAMP   | Account creation timestamp (UTC)         |
| plan_type          | VARCHAR     | Subscription tier (free/pro/enterprise)  |
| is_active          | BOOLEAN     | FALSE if churned or suspended            |
| deleted_at         | TIMESTAMP   | NULL if active; set on soft delete       |

Notes: [e.g., "Exclude deleted_at IS NOT NULL for all active user queries"]
```

**[ADD YOUR REMAINING CORE TABLES FOLLOWING THE SAME FORMAT]**

---

### 2.2 Events / Activity

**[REPLACE WITH YOUR ACTUAL TABLE]**

```
Table: PRODUCT.USER_EVENTS
Description: Raw event stream from product telemetry
Grain: One row per user action
Update frequency: [e.g., Hourly batch from event pipeline]
Row count (approx): [e.g., ~500M rows / month]
Retention: [e.g., 13 months]

Key columns:
| Column             | Type        | Description                              |
|--------------------|-------------|------------------------------------------|
| event_id           | VARCHAR     | Unique event identifier                  |
| user_id            | VARCHAR     | FK to PRODUCT.USERS                      |
| event_name         | VARCHAR     | Action taken (e.g., 'prd_created')       |
| event_timestamp    | TIMESTAMP   | When action occurred (UTC)               |
| properties         | VARIANT     | JSON blob of event-specific metadata     |
| session_id         | VARCHAR     | Groups events within a single session    |

Notes: [e.g., "Use event_name IN (...) to filter relevant events. Full event taxonomy in Confluence."]
```

---

### 2.3 [Add Your Domain Tables]

**[REPLACE THIS SECTION]** — Examples of domain-specific tables to document:
- `PRODUCT.SUBSCRIPTIONS` — Billing and plan change history
- `PRODUCT.FEATURES` — Feature flag / entitlement assignments
- `PRODUCT.SESSIONS` — Session-level aggregates
- `PRODUCT.CONTENT` — User-generated content (documents, projects, etc.)
- `DWH.DAILY_METRICS` — Pre-aggregated metric snapshots

---

## Section 3: Metric Definitions

🔧 **CUSTOMIZE THIS** — Define YOUR North Star Metrics and key product metrics. These definitions prevent ambiguity when the Data Analyst generates SQL.

### Metric template:

```
Metric: [Metric Name]
Definition: [Precise one-sentence definition]
Formula: [numerator / denominator * 100] or [specific calculation]
Source table(s): [TABLE.column references]
Time grain: [daily / weekly / monthly]
Baseline (current): [e.g., 42% as of 2026-Q1]
Target: [e.g., 55% by 2026-Q3]
Owner: [Team or person]
Notes: [Edge cases, exclusions, or known measurement gaps]
```

---

### 3.1 North Star Metrics

**[REPLACE WITH YOUR ACTUAL NSMs FROM identity/STRATEGY.md]**

#### NSM 1: [Your First North Star Metric]

```
Metric: [e.g., Weekly Active Users]
Definition: [e.g., Count of distinct users who performed ≥1 core action in the past 7 days]
Formula: COUNT(DISTINCT user_id) WHERE core_action = TRUE AND event_timestamp >= DATEADD('day', -7, CURRENT_DATE)
Source table(s): PRODUCT.USER_EVENTS
Time grain: Weekly (calculated daily, 7-day rolling window)
Baseline (current): [Replace with actual value]
Target: [Replace with actual target]
Owner: [e.g., Product Analytics]
Notes: [e.g., "'Core actions' = prd_created, ost_created, spec_exported — exclude login events"]
```

#### NSM 2: [Your Second North Star Metric]

```
Metric: [Replace with your metric name]
Definition: [Replace with precise definition]
Formula: [Replace with formula]
Source table(s): [Replace with tables]
Time grain: [Replace]
Baseline: [Replace]
Target: [Replace]
Owner: [Replace]
Notes: [Replace]
```

#### NSM 3: [Your Third North Star Metric]

```
[Use same template]
```

---

### 3.2 Supporting Product Metrics

**[REPLACE WITH YOUR ACTUAL SUPPORTING METRICS]**

Examples to document:
- Activation rate (% of new signups who complete onboarding)
- Feature adoption rate (% of eligible users who use a feature within 30 days)
- Time-to-value (median time from signup to first meaningful output)
- Retention by cohort (% of users active 30/60/90 days after signup)
- NPS / CSAT (if tracked in your data warehouse)

---

### 3.3 Instrumentation Status

🔧 **CUSTOMIZE THIS** — Track which metrics are fully instrumented vs. have gaps.

| Metric | Instrumented | Data Source | Gap / Notes |
|--------|-------------|-------------|-------------|
| [NSM 1 name] | ✅ Full | [Table] | None |
| [NSM 2 name] | ⚠️ Partial | [Table] | Missing [X] for [Y% of users] |
| [NSM 3 name] | ❌ Not tracked | N/A | Requires new event: '[event_name]' |
| [Add rows for your metrics] | | | |

---

## Section 4: Common Query Patterns

🔧 **CUSTOMIZE THIS** — Add YOUR team's standard query building blocks. These accelerate Data Analyst SQL generation.

### 4.1 Active User Filter

```sql
-- Standard active user definition (customize for YOUR platform)
WHERE u.is_active = TRUE
  AND u.deleted_at IS NULL
  AND u.plan_type != 'internal'  -- [Add your exclusions]
```

### 4.2 Date Range Pattern

```sql
-- Rolling N-day window (replace N)
WHERE event_timestamp >= DATEADD('day', -N, CURRENT_DATE)
  AND event_timestamp < CURRENT_DATE

-- Specific quarter (replace YYYY and Q)
WHERE DATE_TRUNC('quarter', event_timestamp) = '20YY-QQ-01'
```

### 4.3 Cohort Join Pattern

```sql
-- Join users to their first-week activity (replace table/column names)
WITH user_cohort AS (
  SELECT
    user_id,
    DATE_TRUNC('week', created_at) AS cohort_week
  FROM PRODUCT.USERS
  WHERE [active user filter from 4.1]
)
SELECT
  c.cohort_week,
  COUNT(DISTINCT c.user_id) AS cohort_size,
  COUNT(DISTINCT e.user_id) AS retained_users,
  retained_users / cohort_size AS retention_rate
FROM user_cohort c
LEFT JOIN PRODUCT.USER_EVENTS e
  ON c.user_id = e.user_id
  AND e.event_timestamp BETWEEN c.cohort_week AND DATEADD('day', 7, c.cohort_week)
GROUP BY 1
ORDER BY 1 DESC
```

### 4.4 [Add Your Team's Standard Patterns]

```sql
-- [Pattern name]: [Description]
-- [Add SQL]
```

---

## Section 5: Data Quality Notes

🔧 **CUSTOMIZE THIS** — Document known data quality issues so the Data Analyst agent can flag them proactively.

| Table | Issue | Severity | Impact | Workaround |
|-------|-------|----------|--------|------------|
| [TABLE_NAME] | [e.g., 5% of rows missing user_id] | [High/Med/Low] | [e.g., Undercounts retention by ~5%] | [e.g., Filter WHERE user_id IS NOT NULL] |
| [TABLE_NAME] | [e.g., Timezone not normalized before 2025-06-01] | [Med] | [e.g., Off-by-up-to-23h for historical queries] | [e.g., Use UTC timestamp column, not local_time] |
| [Add rows] | | | | |

**Known gaps** (not yet instrumented):
- [e.g., Mobile app events not yet flowing to data warehouse — iOS events missing]
- [e.g., Enterprise SSO users lack email field — affects user identification queries]

---

## Section 6: Access & Tooling

🔧 **CUSTOMIZE THIS** — How to query your data in practice.

### Query Tools

| Tool | Access | Use Case |
|------|--------|----------|
| [e.g., Snowflake Web UI] | [URL or SSO path] | Ad-hoc queries, exploration |
| [e.g., Snowflake MCP] | Via PM OS `.mcp.json` | Data Analyst agent automated queries |
| [e.g., Looker / Tableau] | [URL or SSO path] | Pre-built dashboards |
| [e.g., dbt] | [Repo link] | Metric definitions source of truth |

### Request Process

**For new data access**:
[e.g., Submit request to #data-access Slack channel. Approval from Data Engineering team within 2 business days.]

**For new instrumentation**:
[e.g., File Jira ticket in DATA project. Engineering Partner agent can draft the instrumentation requirements.]

**For data quality issues**:
[e.g., Report in #data-quality Slack. Tag @data-oncall.]

---

## Section 7: Update Log

| Date | Change | Updated By |
|------|--------|------------|
| [YYYY-MM-DD] | Initial DATA_DICTIONARY.md created | [Your name / PM OS] |

---

## Customization Checklist

Before using PM OS for data analysis tasks, complete:

- [ ] **Section 1**: Fill in data platform details (Snowflake/BigQuery/etc.)
- [ ] **Section 2**: Document your core tables (at minimum: users + events)
- [ ] **Section 3**: Define your North Star Metrics with exact formulas
- [ ] **Section 3.3**: Mark instrumentation status for each metric
- [ ] **Section 4**: Add your team's standard query patterns
- [ ] **Section 5**: Document known data quality issues
- [ ] **Section 6**: Update query tool access details

**Minimum viable DATA_DICTIONARY**: Complete Sections 1, 2 (core tables), and 3.1 (NSMs) before running first Data Analyst metrics validation. The rest can be filled in iteratively.

---

**Identity File Type**: Data Intelligence (Phase 6)
**Loaded By**: Data Analyst agent (required), Product Architect (optional)
**Maintained By**: Data Engineering (schema) + Product Analytics (metrics)
**Update Frequency**: When schemas change or new metrics defined
**Last Updated**: [Replace with date when you customize this file]
