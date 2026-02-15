---
name: prd
description: Generate a BMAD-compliant Product Requirements Document. Loads organizational context, checks for existing discovery artifacts, and produces a structured PRD with Gherkin user stories and measurable success metrics.
---

You are generating a Product Requirements Document for: $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

### 1. Load Organizational Context
- Read `identity/STRATEGY.md` — PRD must cite vision/mission and connect to North Star Metrics
- Read `identity/STANDARDS.md` — apply brand voice, quality gates, and approved tech stack
- Read `templates/prd_template.md` — use as structural guide

### 2. Check for Existing Discovery
Search `execution/discovery/` for any OSTs, insights, user flows, or problem statements related to $ARGUMENTS. If found:
- Cite them in the PRD Business Case as evidence
- Pull verbatim insight quotes for the Problem Statement section
- Reference any validated opportunity hypotheses

### 3. Generate PRD — BMAD Structure

Follow the BMAD method throughout:

**B — Business Case**
- Problem statement (grounded in discovery evidence if available)
- Who is affected and how severely
- Business impact: which North Star Metric does this move, and by how much
- Strategic alignment: cite identity/STRATEGY.md vision connection

**M — Metrics**
- 2-4 measurable success metrics with current baselines
- Leading indicators (early signals before full metric moves)
- Guardrail metrics (what must not degrade)
- Measurement method: how/where tracked

**A — Approach**
- Proposed solution at appropriate level of abstraction (not implementation spec)
- What's in scope vs. explicitly out of scope
- Key assumptions and dependencies
- Risks and open questions

**D — Details**
- User stories in Gherkin format:
  ```
  Given [context]
  When [user action]
  Then [expected outcome]
  ```
- Acceptance criteria for each story
- Edge cases and error states
- Security and privacy requirements if feature handles user data

### 4. Save the PRD
Save to `execution/prds/YYYY-MM-DD_PRD_[feature]_v0.1.md`

### 5. Publish to Confluence
Publish the saved PRD to the PM OS Confluence space using the idempotency pattern:

1. **Search** for an existing page:
   - CQL: `title = "PRD: [feature] (Draft)"` (for v0.x) or `title = "PRD: [feature]"` (for v1.0) AND `space = "PM"`
   - Cloud ID: `d1d9d612-3182-4d76-ad10-bce2f315b8f3`
2. **If found** → call `updateConfluencePage` with the existing page ID
3. **If not found** → call `createConfluencePage` under parent page ID `1048577` (PM OS - PRDs & Discovery)
4. **Confirm**: State the published Confluence page title and URL to the user

**Title convention**:
- v0.x (draft) → `PRD: [feature] (Draft)`
- v1.0+ (final) → `PRD: [feature]`

**Content**: Full PRD markdown (same content written to `execution/prds/`)

### 6. Offer Follow-On Actions
After saving, offer:
- **Jira story**: "Would you like me to create a linked Jira story in your project via Rovo MCP?"
- **Metrics validation**: If `identity/DATA_DICTIONARY.md` is customized — "Would you like the Data Analyst to validate these metrics against your data schema and generate baseline SQL?"
- **Full pipeline**: "Ready to run the full feature pipeline? Use `/feature-pipeline [feature name]` to run Engineering Partner + UX Strategist + Data Analyst + GTM Strategist in parallel."
