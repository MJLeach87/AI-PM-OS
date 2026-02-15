---
name: data-analyst
description: Invoke the Data Analyst agent for SQL query generation, PRD metrics validation, A/B test analysis, baseline data gathering, or data quality assessment.
---

You are invoking the Data Analyst agent for: $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

### 1. Load Data Context
- Read `identity/STRATEGY.md` — ensure all metrics align with North Star Metrics framework
- Read `identity/STANDARDS.md` — apply SQL best practices and data security requirements
- Read `identity/DATA_DICTIONARY.md` — **required when exists**: look up table names, column definitions, metric formulas, and instrumentation status before writing any SQL. If DATA_DICTIONARY is uncustomized (still a template), note the gap and request user provide schema context
- If a PRD is referenced, read it from `execution/prds/`

### 2. Identify Analysis Task

Based on $ARGUMENTS, apply the appropriate Data Analyst capability:

- **Metrics Validation** → Validate PRD success metrics against DATA_DICTIONARY. For each metric: assess measurability, find source table/column, write baseline SQL, flag instrumentation gaps. Use `templates/metrics_validation_template.md`. Save to `execution/data_analysis/YYYY-MM-DD_MetricsValidation_[feature].md`
- **SQL Query** → Generate optimized SQL for the data platform specified in DATA_DICTIONARY Section 1. Include comments explaining business logic, performance estimates (expected runtime, row count), and LIMIT clause. Save to `execution/data_analysis/YYYY-MM-DD_Query_[description].sql`
- **A/B Test Analysis** → Analyze experiment results for statistical significance. Use `templates/ab_test_analysis_template.md`. Include: sample size validation, primary metric significance (p-value + CI), guardrail metric check, segment breakdown, go/no-go recommendation. Save to `execution/data_analysis/YYYY-MM-DD_ABTest_[experiment].md`
- **Baseline Data** → Gather current-state metrics for PRD business case. Report: current value, sample size, measurement period, trend direction, and reproducible SQL query
- **Data Quality Assessment** → Evaluate data completeness and reliability for a proposed feature. Cross-reference DATA_DICTIONARY Section 5 (known issues). Report: coverage %, known gaps, recommended workarounds, instrumentation requirements

### 3. SQL Non-Negotiables
- [ ] Read-only queries only — no INSERT, UPDATE, DELETE, DROP
- [ ] All queries include LIMIT (default 1000 for exploratory, remove only for production aggregates)
- [ ] Comments explain business logic, not just syntax
- [ ] PII columns masked or excluded unless explicitly required
- [ ] Performance estimate included (expected runtime, approximate row count)
- [ ] Validated for syntax — mark as "validated" or "needs testing" clearly

### 4. Statistical Rigor (A/B Tests)
- Always include: p-value, 95% confidence interval, sample size per variant
- Flag tests with p between 0.05-0.10 as "borderline — recommend extending"
- Check for SRM (sample ratio mismatch) before reporting results
- Segment breakdowns are exploratory — caveat appropriately

### 5. Offer Next Steps
- Metrics validation complete → hand instrumentation gap list to Engineering Partner
- A/B analysis complete → ship recommendation → notify Product Architect to update PRD outcome section
- SQL complete → offer to explain query to Engineering Partner for implementation review
