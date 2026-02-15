# A/B Test Analysis Report: [Experiment Name]

**Date**: YYYY-MM-DD
**Experiment ID**: [e.g., EXP-042 or Jira: PROJ-XXX]
**PRD Reference**: `execution/prds/YYYY-MM-DD_PRD_[feature-name].md`
**Data Dictionary Reference**: `identity/DATA_DICTIONARY.md`
**Analyst**: Data Analyst Agent (v2.2)
**Status**: In Progress / Final

---

## Executive Summary

| | Control (A) | Treatment (B) |
|---|---|---|
| **Sample Size** | [N users] | [N users] |
| **Duration** | [N days] | [N days] |
| **Primary Metric** | [X%] | [X%] |
| **Relative Lift** | — | [+X% / -X%] |
| **Statistical Significance** | — | [p = X.XX] |
| **Confidence Interval** | — | [[lower, upper] at 95%] |

**Recommendation**: ✅ Ship to 100% / ⚠️ Ship with conditions / ❌ Do not ship / 🔄 Extend test

**One-line rationale**: [e.g., "Treatment shows +12% improvement in primary metric at p=0.02, with no guardrail metric degradation — ship."]

---

## 1. Experiment Design Review

### Setup

| Field | Value |
|-------|-------|
| **Hypothesis** | [If we [change X], then [metric Y] will [increase/decrease] because [reason]] |
| **Control** | [What control group sees — existing behavior] |
| **Treatment** | [What treatment group sees — new behavior] |
| **Traffic split** | [e.g., 50/50 / 80/20] |
| **Targeting** | [e.g., All users / New users only / Enterprise plan users] |
| **Randomization unit** | [e.g., user_id / session_id / account_id] |

### Pre-registered Metrics

| Metric | Type | Direction | Minimum Detectable Effect | Status |
|--------|------|-----------|--------------------------|--------|
| [Primary metric] | Primary | ↑ Increase | [+X%] | ✅ / ⚠️ / ❌ |
| [Guardrail metric 1] | Guardrail | → No change | [±Y%] | ✅ / ⚠️ / ❌ |
| [Guardrail metric 2] | Guardrail | → No change | [±Y%] | ✅ / ⚠️ / ❌ |
| [Secondary metric] | Secondary | ↑ Increase | [+Z%] | ✅ / ⚠️ / ❌ |

### Sample Size Validation

| | Pre-calculated | Actual |
|---|---|---|
| **Required per variant** | [N] | [N] |
| **Achieved** | — | ✅ Sufficient / ⚠️ Underpowered |
| **Power** | [80%] | [Achieved X%] |
| **Significance threshold** | p < 0.05 | — |

**Notes**: [e.g., "Test ended early due to novelty effect concerns — see Section 5"]

---

## 2. Results Summary

### Primary Metric: [Metric Name]

| | Control (A) | Treatment (B) | Difference |
|---|---|---|---|
| **Value** | [X.X%] | [X.X%] | [+X.X% / -X.X%] |
| **Relative lift** | — | — | [+X%] |
| **p-value** | — | — | [0.0XX] |
| **95% CI** | — | — | [[lower, upper]] |
| **Significant?** | — | — | ✅ Yes (p < 0.05) / ❌ No |

**SQL query used**:
```sql
-- Primary metric calculation
-- [Add the query used to compute this result]
SELECT
  variant,
  COUNT(DISTINCT user_id) AS users,
  [metric_calculation] AS metric_value
FROM [TABLE]
WHERE experiment_id = '[EXP-XXX]'
  AND event_timestamp BETWEEN '[start_date]' AND '[end_date]'
GROUP BY 1
```

---

### Guardrail Metrics

#### [Guardrail Metric 1]: [Name]

| | Control (A) | Treatment (B) | Change | Status |
|---|---|---|---|---|
| **Value** | [X] | [X] | [±X%] | ✅ No degradation / ❌ Degraded |

**Threshold**: Must not degrade by more than [Y%]
**Result**: [Metric stayed within / exceeded] acceptable range

---

#### [Guardrail Metric 2]: [Name]

| | Control (A) | Treatment (B) | Change | Status |
|---|---|---|---|---|
| **Value** | [X] | [X] | [±X%] | ✅ No degradation / ❌ Degraded |

---

### Secondary Metrics (Directional Only)

| Metric | Control | Treatment | Direction | Notes |
|--------|---------|-----------|-----------|-------|
| [Secondary 1] | [X] | [X] | ↑ / ↓ / → | [Underpowered for significance] |
| [Secondary 2] | [X] | [X] | ↑ / ↓ / → | |

---

## 3. Statistical Rigor

### Distribution Checks

- **Normality**: [e.g., "Primary metric is proportional — binomial distribution appropriate"]
- **Variance**: Control: [σ²=X], Treatment: [σ²=X]
- **Test used**: [e.g., Two-proportion z-test / t-test / Mann-Whitney U]
- **One-tailed or two-tailed**: [Two-tailed — pre-registered]

### Multiple Testing Correction

- **Number of primary metrics**: [1] — No correction needed
- **Number of secondary metrics tested**: [N] — [Bonferroni applied / directional only, not corrected]
- **Adjusted significance threshold**: [p < 0.05 / p < 0.0X after correction]

### Confidence Interval Interpretation

> "We are 95% confident the true treatment effect on [metric] is between **[lower bound]** and **[upper bound]**."

If CI lower bound is [+X%] — minimum viable improvement is confirmed.
If CI crosses zero — effect direction is uncertain.

---

## 4. Cohort & Segment Breakdown

Breakdowns to identify heterogeneous treatment effects:

| Segment | Control | Treatment | Lift | Significant? |
|---------|---------|-----------|------|-------------|
| New users (< 30 days) | [X%] | [X%] | [±X%] | ✅ / ❌ |
| Power users (≥ 10 actions/week) | [X%] | [X%] | [±X%] | ✅ / ❌ |
| Mobile | [X%] | [X%] | [±X%] | ✅ / ❌ |
| Desktop | [X%] | [X%] | [±X%] | ✅ / ❌ |
| [Your key segments] | | | | |

**Key finding**: [e.g., "Effect is driven primarily by new users — power users show no significant lift"]

**Caution**: Segment-level analysis is exploratory. Do not over-index on segments — run dedicated experiments for segment-specific hypotheses.

---

## 5. Validity Checks

### Sanity Checks

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| Sample ratio mismatch (SRM) | 50/50 ± 5% | [X/Y split] | ✅ / ❌ Investigate |
| Pre-experiment metric parity | p > 0.05 on primary metric | p = [X.XX] | ✅ / ❌ |
| Assignment timing | Users assigned before exposure | [Confirmed / Issue found] | ✅ / ❌ |

**SRM note**: If actual split deviates >5% from expected, assignment mechanism is compromised — results may be invalid.

### Novelty & Seasonality Checks

- **Novelty effect**: [e.g., "Test ran for 21 days — first-week metric was +18%, stabilized to +12% by week 3. Using week 2-3 average for final result."]
- **Seasonality**: [e.g., "Test ran 2026-01-15 to 2026-02-05 — no major holidays or events in this period"]
- **External events**: [e.g., "No concurrent campaigns or major product releases during test period"]

---

## 6. Go / No-Go Recommendation

### Decision Framework

| Criterion | Result | Weight |
|-----------|--------|--------|
| Primary metric significant (p < 0.05) | ✅ / ❌ | Required |
| Primary metric CI lower bound > MDE | ✅ / ❌ | Required |
| All guardrail metrics within threshold | ✅ / ❌ | Required |
| Sample size sufficient (power ≥ 80%) | ✅ / ❌ | Required |
| No SRM detected | ✅ / ❌ | Required |

### Recommendation: [SHIP / DO NOT SHIP / EXTEND / ITERATE]

**Rationale**:
[2-3 sentences explaining the recommendation based on the criteria above]

**If shipping**:
- [ ] Roll out to [X%] of users first, monitor for [N] days
- [ ] Alert thresholds set on guardrail metrics
- [ ] Success review scheduled for: [YYYY-MM-DD]

**If not shipping**:
- [ ] Root cause: [What didn't work and why]
- [ ] Next iteration hypothesis: [What to test next]

---

## 7. Appendix

### A. Raw Data Summary

| Date Range | Total Users in Experiment | Control | Treatment |
|------------|--------------------------|---------|-----------|
| [Start] to [End] | [N] | [N] | [N] |

### B. Full SQL Queries

**Experiment assignment query**:
```sql
-- Users assigned to each variant
SELECT
  variant,
  COUNT(DISTINCT user_id) AS users
FROM [experiment_assignments_table]
WHERE experiment_id = '[EXP-XXX]'
GROUP BY 1
```

**Primary metric query** (full version):
```sql
-- [Full query — include all filters, joins, and logic]
```

**Guardrail metric query**:
```sql
-- [Query]
```

### C. References

- PRD: `execution/prds/[linked PRD]`
- Metrics Validation: `execution/data_analysis/[linked validation report]`
- Jira: [EXP-XXX]

### D. Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| v0.1 | YYYY-MM-DD | Initial analysis draft | Data Analyst Agent |
| v1.0 | YYYY-MM-DD | Final — go/no-go decision added | Data Analyst Agent + PM review |

---

**Template Version**: 1.0 (Phase 7 — Claude Code Advanced Workflows)
**Storage Location**: `execution/data_analysis/YYYY-MM-DD_ABTest_[experiment-name].md`
**Related Agents**: Data Analyst, Product Architect, Engineering Partner
**Related Templates**: `templates/metrics_validation_template.md`
**Related Identity Files**: `identity/DATA_DICTIONARY.md`
