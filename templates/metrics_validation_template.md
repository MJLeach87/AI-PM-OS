# Metrics Validation Report: [Feature Name]

**Date**: YYYY-MM-DD
**PRD Reference**: `execution/prds/YYYY-MM-DD_PRD_[feature-name].md`
**Data Dictionary Reference**: `identity/DATA_DICTIONARY.md`
**Analyst**: Data Analyst Agent (v2.1)
**Status**: Draft / Final

---

## Executive Summary

| Total Metrics Reviewed | Fully Trackable | Partially Trackable | Not Trackable | Instrumentation Gaps |
|----------------------|-----------------|---------------------|---------------|----------------------|
| [N] | [N] ✅ | [N] ⚠️ | [N] ❌ | [N] items |

**Overall Recommendation**: [Proceed / Proceed with conditions / Block on instrumentation]

**Key finding**: [One sentence on the most important finding — e.g., "3 of 5 metrics are immediately measurable; 2 require new event tracking before launch."]

---

## 1. PRD Metrics Review

For each success metric defined in the PRD:

---

### Metric 1: [Metric Name from PRD]

| Field | Value |
|-------|-------|
| **PRD Definition** | [Exact metric definition as written in PRD] |
| **Measurability** | ✅ Fully trackable / ⚠️ Partially trackable / ❌ Not trackable |
| **Data Source** | `[TABLE].[column]` |
| **Tracking Feasibility** | [Can we measure this today? Yes/No/Partially] |

**Baseline (Current State)**:
- Current value: [X] (measured as of [date], via [source])
- Sample size: [N users / events / records]
- Measurement period: [e.g., Last 90 days]

**Target (from PRD)**:
- Target value: [X]
- Target date: [YYYY-MM-DD or sprint/release]
- Required lift: [+X% or +N absolute]

**SQL Query — Baseline**:
```sql
-- Baseline query for [Metric Name]
-- Expected runtime: < [N] seconds | Expected rows: ~[N]
SELECT
  [calculation]
FROM [TABLE]
WHERE [filters]
-- [Add comments explaining business logic]
```

**Instrumentation Status**: ✅ Ready / ⚠️ Partial — [describe gap] / ❌ Missing — [what needs to be built]

**Notes**: [Any edge cases, exclusions, or measurement caveats]

---

### Metric 2: [Metric Name from PRD]

[Repeat the structure above for each metric]

---

### Metric 3: [Metric Name from PRD]

[Repeat the structure above]

---

## 2. Instrumentation Gap Log

Items requiring engineering work before metrics can be tracked:

| Gap ID | Metric Affected | Missing Data | Engineering Effort | Priority | Jira Ticket |
|--------|----------------|-------------|-------------------|----------|-------------|
| GAP-001 | [Metric name] | [e.g., 'feature_x_opened' event not emitted] | [S/M/L] | [High/Med/Low] | [PROJ-XXX or TBD] |
| GAP-002 | [Metric name] | [e.g., session_duration not captured on mobile] | [S/M/L] | [High/Med/Low] | [PROJ-XXX or TBD] |

**Engineering Partner handoff**: These gaps should be incorporated into the technical spec. Tag Engineering Partner to review GAP-00X items before PRD v1.0.

---

## 3. Data Quality Warnings

Issues with existing data that may affect metric accuracy:

| Warning | Affected Metric | Severity | Estimated Impact | Workaround Applied |
|---------|----------------|----------|------------------|--------------------|
| [e.g., 8% of users missing created_at] | [Metric 2] | Medium | Undercounts cohort by ~8% | Added `WHERE created_at IS NOT NULL` |
| [Add from identity/DATA_DICTIONARY.md Section 5] | | | | |

---

## 4. Baseline SQL Query Library

All executable queries for reproducing baseline values. Validated for syntax.

### Query 1: [Descriptive Name]
**Purpose**: [What question this answers]
**Expected runtime**: [< N seconds]

```sql
-- [Query name] — [purpose one-liner]
-- Validated: [date]
-- Last executed result: [value or "not yet run"]
SELECT
  [columns]
FROM [tables]
WHERE [filters]
GROUP BY [columns]
ORDER BY [columns]
LIMIT 1000;
```

### Query 2: [Descriptive Name]

```sql
-- [Add additional queries]
```

---

## 5. A/B Test Setup (if applicable)

If this feature will be launched as an experiment:

**Recommended test design**:
- **Control**: [Description of control group]
- **Treatment**: [Description of treatment group]
- **Split**: [e.g., 50/50 or 80/20]
- **Primary metric**: [Metric 1 from Section 1]
- **Guardrail metrics**: [Metrics that should not degrade]

**Sample size calculation**:
- Minimum detectable effect: [X%]
- Statistical power: [80% / 90%]
- Significance threshold: p < [0.05]
- Required sample size per variant: [N users]
- Estimated time to significance: [N days based on current traffic of X users/day]

**Notes**: [Flag if sample size is insufficient or test feasibility is uncertain]

---

## 6. Recommendations

### For Product Architect (PRD finalization)
- [ ] [e.g., Replace Metric 3 definition — currently unmeasurable, propose alternative: [X]]
- [ ] [e.g., Add baseline value to PRD Business Case section: Metric 1 baseline = X]
- [ ] [e.g., Confirm GAP-001 is in Engineering Partner's tech spec scope]

### For Engineering Partner (Technical spec)
- [ ] GAP-001: Add `feature_x_opened` event to analytics telemetry (estimate: [S])
- [ ] GAP-002: [Additional instrumentation requirement]

### For PM (Human review)
- [ ] [Any metric redefinitions requiring PM judgment]
- [ ] [Any go/no-go decisions on instrumentation gaps blocking launch]

---

## 7. Validation Checklist

- [ ] All PRD metrics reviewed (N/N complete)
- [ ] All SQL queries include comments explaining business logic
- [ ] Performance estimates provided for each query
- [ ] Metrics explicitly mapped to `DATA_DICTIONARY.md` source columns
- [ ] Statistical analyses include confidence intervals (if applicable)
- [ ] Baseline data includes sample size and time period
- [ ] Instrumentation gaps logged with Jira ticket references (or TBD)
- [ ] Engineering Partner notified of instrumentation requirements

---

## 8. Appendix

### A. PRD Metrics Not Reviewed (Out of Scope)
[List any PRD metrics explicitly excluded from this validation and why]

### B. Data Sources Referenced
- `identity/DATA_DICTIONARY.md` — Section [X] for [table/metric]
- [Any external data sources consulted]

### C. Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| v0.1 | YYYY-MM-DD | Initial validation draft | Data Analyst Agent |

---

**Template Version**: 1.0 (Phase 6 — Data Intelligence)
**Storage Location**: `execution/data_analysis/YYYY-MM-DD_MetricsValidation_[feature-name].md`
**Related Agents**: Data Analyst, Product Architect, Engineering Partner
**Related Identity Files**: `identity/DATA_DICTIONARY.md`, `identity/STRATEGY.md`
