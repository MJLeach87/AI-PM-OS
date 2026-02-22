---
name: feature-pipeline
description: Run the full end-to-end PM OS feature development pipeline. Orchestrates all specialist agents from discovery through final PRD — Engineering Partner, UX Strategist, Data Analyst, and GTM Strategist run in parallel after the initial PRD draft to maximize throughput.
---

You are running the full PM OS feature pipeline for: $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

### Step 0 — Determine Project Slug
Before writing any files, identify the project folder:
- Extract the Jira issue key from $ARGUMENTS (e.g., `PMOS-110`) and derive a kebab-case title from the feature name
- **Project slug format**: `[JIRA-KEY]_[brief-kebab-title]` — e.g., `PMOS-110_one-click-checkout`
- If no Jira key is determinable from context, ask the PM: *"What is the Jira key for this feature? (e.g., PMOS-110) I'll use it to name the project folder in execution/."*
- **All outputs from every pipeline step go into `execution/[project-slug]/`** (flat — no subdirectories)

### Step 1 — Strategic Alignment (Sequential)
Load `identity/STRATEGY.md` and confirm $ARGUMENTS aligns with current strategic priorities and North Star Metrics. If there is a misalignment, surface it before proceeding — do not generate artifacts for work that contradicts organizational strategy.

### Step 2 — Discovery Check (Sequential)
Search `execution/[project-slug]/` for existing research on $ARGUMENTS:
- If OST or insights exist → use as evidence base for PRD
- If nothing exists → note that discovery was skipped and PRD assumptions will need validation

### Step 3 — Initial PRD v0.1 (Sequential)
Product Architect generates PRD following BMAD structure (Business case, Metrics, Approach, Details). Include Gherkin user stories and measurable success metrics.

Save to `execution/[project-slug]/YYYY-MM-DD_PRD_[feature]_v0.1.md`

**→ PRD v0.1 is the gate. Do not proceed to Step 4 until PRD v0.1 is saved.**

### Step 4 + 5 — Specialist Reviews [PARALLEL]
Run the following two agents simultaneously — both read PRD v0.1 independently from `execution/[project-slug]/`:

**[PARALLEL] Engineering Partner:**
- Technical feasibility assessment (complexity, effort, dependencies)
- Security assessment (STRIDE + OWASP Top 10)
- Save to `execution/[project-slug]/YYYY-MM-DD_Feasibility_[feature].md`

**[PARALLEL] UX Strategist:**
- Information architecture + user flow design
- React/Tailwind prototype of primary interaction
- Save to `execution/[project-slug]/YYYY-MM-DD_IA_[feature].md` + `execution/[project-slug]/YYYY-MM-DD_Prototype_[feature].tsx`

### Step 6 + 7 — Data + GTM [PARALLEL]
Run the following two agents simultaneously after Steps 4+5 complete:

**[PARALLEL] Data Analyst:**
- Validate PRD success metrics against `identity/DATA_DICTIONARY.md`
- Generate baseline SQL queries for each metric
- Flag instrumentation gaps
- Save to `execution/[project-slug]/YYYY-MM-DD_MetricsValidation_[feature].md`

**[PARALLEL] GTM Strategist:**
- Value proposition using Problem / Solution / Benefit framework
- Competitive positioning against top 2-3 competitors
- Save to `execution/[project-slug]/YYYY-MM-DD_ValueProp_[feature].md`
- Battle cards (cross-project) → `execution/shared/YYYY-MM-DD_BattleCard_[competitor].md`

### Step 8 — Final PRD v1.0 (Sequential)
Product Architect consolidates all specialist inputs:
- Incorporate Engineering Partner complexity rating and any security requirements
- Add UX Strategist's IA decisions and prototype reference
- Update metrics with Data Analyst baselines and gap notes
- Add value proposition language to Business Case section

Save to `execution/[project-slug]/YYYY-MM-DD_PRD_[feature]_v1.0.md`

### Step 9a — Publish Feature Summary to Confluence
Before presenting the summary, publish a consolidated feature summary to Confluence using the idempotency pattern:

1. **Search** for an existing page:
   - CQL: `title = "Feature Summary: [feature]"` AND `space = "PM"`
   - Cloud ID: `d1d9d612-3182-4d76-ad10-bce2f315b8f3`
2. **If found** → call `updateConfluencePage` with the existing page ID
3. **If not found** → call `createConfluencePage` under parent page ID `1048577` (PM OS - PRDs & Discovery)
4. **Confirm**: State the published page title and URL to the user

**Title convention**: `Feature Summary: [feature]`

**Content**: Consolidated summary including:
- PRD v1.0 core sections (Business Case, Metrics, Approach)
- Engineering Partner: complexity rating and top security requirement
- Data Analyst: metric baselines and any instrumentation gaps
- GTM Strategist: one-line value proposition

### Step 9b — Pipeline Summary
Present to user:
- ✅ All artifact links (PRD v1.0, feasibility, security, IA, prototype, metrics validation, value prop) — all in `execution/[project-slug]/`
- ✅ Feature Summary published to Confluence
- ⚠️ Any open items requiring human review (security risks, instrumentation gaps, open questions)
- 📋 Suggested Jira stories to create from this pipeline

See `pm-os-reference/documentation/PARALLEL_WORKFLOWS.md` for detailed parallelism patterns and time estimates.
