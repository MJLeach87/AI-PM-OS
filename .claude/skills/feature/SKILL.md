---
name: feature
description: Run the full end-to-end PM OS feature development pipeline. Orchestrates all specialist agents from discovery through final PRD — Engineering Partner, UX Strategist, Data Analyst, and GTM Strategist run in parallel after the initial PRD draft to maximize throughput.
---

You are running the full PM OS feature pipeline for: $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

### Step 1 — Strategic Alignment (Sequential)
Load `identity/STRATEGY.md` and confirm $ARGUMENTS aligns with current strategic priorities and North Star Metrics. If there is a misalignment, surface it before proceeding — do not generate artifacts for work that contradicts organizational strategy.

### Step 2 — Discovery Check (Sequential)
Search `execution/discovery/` for existing research on $ARGUMENTS:
- If OST or insights exist → use as evidence base for PRD
- If nothing exists → note that discovery was skipped and PRD assumptions will need validation

### Step 3 — Initial PRD v0.1 (Sequential)
Product Architect generates PRD following BMAD structure (Business case, Metrics, Approach, Details). Include Gherkin user stories and measurable success metrics.

Save to `execution/prds/YYYY-MM-DD_PRD_[feature]_v0.1.md`

**→ PRD v0.1 is the gate. Do not proceed to Step 4 until PRD v0.1 is saved.**

### Step 4 + 5 — Specialist Reviews [PARALLEL]
Run the following two agents simultaneously — both read PRD v0.1 independently:

**[PARALLEL] Engineering Partner:**
- Technical feasibility assessment (complexity, effort, dependencies)
- Security assessment (STRIDE + OWASP Top 10)
- Save to `execution/technical_specs/YYYY-MM-DD_Feasibility_[feature].md`

**[PARALLEL] UX Strategist:**
- Information architecture + user flow design
- React/Tailwind prototype of primary interaction
- Save to `execution/discovery/YYYY-MM-DD_IA_[feature].md` + `execution/prototypes/YYYY-MM-DD_Prototype_[feature].tsx`

### Step 6 + 7 — Data + GTM [PARALLEL]
Run the following two agents simultaneously after Steps 4+5 complete:

**[PARALLEL] Data Analyst:**
- Validate PRD success metrics against `identity/DATA_DICTIONARY.md`
- Generate baseline SQL queries for each metric
- Flag instrumentation gaps
- Save to `execution/data_analysis/YYYY-MM-DD_MetricsValidation_[feature].md`

**[PARALLEL] GTM Strategist:**
- Value proposition using Problem / Solution / Benefit framework
- Competitive positioning against top 2-3 competitors
- Save to `execution/gtm/YYYY-MM-DD_ValueProp_[feature].md`

### Step 8 — Final PRD v1.0 (Sequential)
Product Architect consolidates all specialist inputs:
- Incorporate Engineering Partner complexity rating and any security requirements
- Add UX Strategist's IA decisions and prototype reference
- Update metrics with Data Analyst baselines and gap notes
- Add value proposition language to Business Case section

Save to `execution/prds/YYYY-MM-DD_PRD_[feature]_v1.0.md`

### Step 9 — Pipeline Summary
Present to user:
- ✅ All artifact links (PRD v1.0, feasibility, security, IA, prototype, metrics validation, value prop)
- ⚠️ Any open items requiring human review (security risks, instrumentation gaps, open questions)
- 📋 Suggested Jira stories to create from this pipeline

See `pm-os-reference/documentation/PARALLEL_WORKFLOWS.md` for detailed parallelism patterns and time estimates.
