# PM OS Parallel Workflows Guide

**Created**: 2026-02-14
**Phase**: 7 (Claude Code Advanced Workflows)
**Audience**: PM OS users who want to maximize throughput on complex feature pipelines

---

## Overview

PM OS is designed for parallel agent execution. Several workflow steps have **no sequential dependency** and can run simultaneously — cutting end-to-end feature pipeline time significantly.

Claude Code's **Task tool** enables spawning multiple sub-agents in a single message. PM OS uses this pattern in the `/feature` skill and in ad-hoc multi-agent requests.

---

## The Core Parallelism Rule

**Two agents can run in parallel when they share the same input but produce independent outputs.**

In the PM OS feature pipeline:
- ✅ Engineering Partner + UX Strategist both read the PRD v0.1 independently → can run in parallel
- ✅ Data Analyst + GTM Strategist both read the PRD v0.1 independently → can run in parallel
- ❌ Product Architect (final PRD) cannot run until Engineering Partner, UX Strategist, Data Analyst, and GTM Strategist have all completed → sequential dependency

---

## The /feature Pipeline — Parallelism Annotated

```
Step 1: Product Architect
        ↓ Generate OST + PRD v0.1
        ↓ [SEQUENTIAL — all later steps depend on PRD v0.1]

Step 2 + 3: [PARALLEL — spawn both simultaneously]
        ├── Engineering Partner: Technical feasibility + security assessment
        └── UX Strategist: Prototype + information architecture

        ↓ [Both complete before continuing]

Step 4 + 5: [PARALLEL — spawn both simultaneously]
        ├── Data Analyst: Validate metrics + baseline queries
        └── GTM Strategist: Value proposition + positioning

        ↓ [Both complete before continuing]

Step 6: Product Architect
        ↓ Consolidate all inputs → Final PRD v1.0
        [SEQUENTIAL — needs all specialist outputs]

Step 7: Present summary with all artifact links
```

**Time savings**: Without parallelism, 6 sequential steps × ~90 min each = ~9 hours.
With parallelism, 4 sequential gates with 2 parallel pairs = ~4.5 hours (50% reduction).

---

## Pattern 1: Parallel Specialists After PRD v0.1

**When to use**: After `/prd` or after Product Architect produces PRD v0.1, run multiple reviewers simultaneously.

**How to invoke in Claude Code**:

```
Product Architect has generated PRD v0.1 at execution/prds/2026-02-14_PRD_[feature].md

Now run in parallel:
- Engineering Partner: Review technical feasibility for execution/prds/2026-02-14_PRD_[feature].md
- UX Strategist: Design information architecture and prototype for execution/prds/2026-02-14_PRD_[feature].md
```

Claude Code will spawn both as parallel Task tool calls. Wait for both to complete, then proceed.

**Output locations**:
- `execution/technical_specs/YYYY-MM-DD_Feasibility_[feature].md`
- `execution/discovery/YYYY-MM-DD_IA_[feature].md` + `execution/prototypes/`

---

## Pattern 2: Parallel Data + GTM After PRD v0.1

**When to use**: After PRD v0.1 is ready, validate metrics and prepare positioning simultaneously.

**How to invoke**:

```
Run in parallel:
- Data Analyst: Validate metrics in execution/prds/2026-02-14_PRD_[feature].md against identity/DATA_DICTIONARY.md
- GTM Strategist: Generate value proposition and positioning for execution/prds/2026-02-14_PRD_[feature].md
```

**Output locations**:
- `execution/data_analysis/YYYY-MM-DD_MetricsValidation_[feature].md`
- `execution/gtm/YYYY-MM-DD_ValueProp_[feature].md`

---

## Pattern 3: Full 4-Agent Parallel Sprint

**When to use**: Power users who want to run all four specialists at once after PRD v0.1.

**Trade-off**: More context windows open simultaneously → slightly more token usage, but cuts total elapsed time by 60-70%.

**How to invoke**:

```
PRD v0.1 complete at execution/prds/2026-02-14_PRD_[feature].md

Run all four specialists in parallel:
1. Engineering Partner: Technical feasibility review
2. UX Strategist: Prototype + IA
3. Data Analyst: Metrics validation against DATA_DICTIONARY
4. GTM Strategist: Value proposition + positioning

Notify when all four complete. Product Architect will then consolidate into PRD v1.0.
```

**Expected total time**: ~90 minutes (same as running one specialist) vs. 6 hours sequential.

---

## Pattern 4: Parallel Quality Audits

**When to use**: Running `/pm-os-quality-audit` on a large batch of artifacts simultaneously.

**How to invoke**:

```
Run quality audit in parallel across:
- execution/prds/ — last 3 PRDs (Product Architect quality)
- execution/technical_specs/ — last 3 specs (Engineering Partner quality)
- execution/discovery/ — last 3 OSTs (Product Architect discovery quality)

Produce a single consolidated audit report.
```

**Output**: `pm-os-reference/documentation/improvement_proposals/YYYY-MM-DD_Audit_[scope].md`

---

## Pattern 5: Parallel Documentation Sync

**When to use**: After multiple phases of work, sync all documentation simultaneously.

**How to invoke** (or use `/pm-os-doc-sync`):

```
Documentation Maintainer: Sync all stale documentation in parallel:
- pm-os-reference/identity/ROADMAP.md (check phase status accuracy)
- pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md (update metrics)
- .claude/CLAUDE.md (verify phase table is current)
- identity/README.md (check customization checklist completeness)
```

---

## Pattern 6: Mermaid Architecture Diagrams

**When to use**: Alongside any Engineering Partner assessment, or when you need architecture/flow visualization. Mermaid renders natively in GitHub and Confluence — no separate MCP or plugin needed.

**How to invoke** (alongside a specialist):

```
Engineering Partner: Include a Mermaid architecture diagram for [feature/system] in the feasibility output.
```

**Standalone requests**:

```
Generate a Mermaid sequence diagram for [flow description].
Generate a Mermaid flowchart for [workflow].
```

**Output**: Mermaid blocks embedded in the technical spec file — renders automatically in GitHub PR previews and Confluence pages.

---

## When NOT to Parallelize

| Scenario | Why Sequential |
|----------|---------------|
| Engineering Partner depends on UX Strategist's IA map | Wait for IA before writing API spec |
| Data Analyst needs Engineering Partner's schema clarification | Wait for schema before writing SQL |
| Product Architect final PRD needs all specialist inputs | Always sequential — last step |
| `/discovery` OST generation | Single-agent workflow — no parallelism needed |

---

## When to Use Plan Mode

For any skill that triggers multi-agent work or cross-skill orchestration, **enter plan mode first**. This validates the sequence before agents start writing artifacts.

**Use plan mode when**:
- Running `/feature-pipeline` (5+ agents, 90 min+)
- Combining 3+ skills in a custom cross-skill sequence
- Running a workflow you haven't done before in this session

**How to invoke**: Prepend "Plan:" to your request, or type the request and let EnterPlanMode activate automatically.

**Skippable for**: Single-skill invocations (`/prd`, `/discovery`, `/engineering-partner`) where the pattern is well-established.

---

## Monitoring Parallel Runs

When running parallel agents:

1. **Request status updates**: "Let me know when Engineering Partner and UX Strategist both complete."
2. **Check for blockers**: If one agent finishes early and finds a blocker (e.g., Engineering Partner flags an infeasibility), pause the other parallel agents if their work depends on the blocked outcome.
3. **Consolidation prompt**: After all parallel agents complete, explicitly say: "Product Architect: all specialist reviews are complete. Consolidate into PRD v1.0."
4. **Commit checkpoint**: After each parallel batch completes, commit progress before starting the next batch: `git add execution/ && git commit -m "Complete [batch]: [specialist 1] + [specialist 2] outputs"`. Preserves work if the session is interrupted.

---

## Advanced: Background Task Patterns

For very long workflows, Claude Code can run agents in the background while you continue other work.

**Pattern**: Start a full `/feature` pipeline for Feature A, then start research for Feature B while Feature A's specialists work.

```
Start /feature [Feature A] — this will take 90 minutes with parallel processing.
While that runs, let's do /discovery [Feature B topic].
```

**When to use**: When you have multiple parallel workstreams and want to maximize throughput across features, not just within a single feature.

---

## Velocity Impact

Based on PM OS Phase 0-6 velocity data:

| Workflow | Sequential Time | Parallel Time | Savings |
|----------|----------------|---------------|---------|
| Full /feature pipeline | ~6 hours | ~3 hours | 50% |
| PRD + 2 specialists | ~3 hours | ~1.5 hours | 50% |
| Quality audit (3 agents) | ~6 hours | ~2 hours | 67% |
| Doc sync (4 files) | ~4 hours | ~1 hour | 75% |

**Target** (Phase 7 success criterion): Parallel processing reduces review time by 60% on complex features.

---

## Troubleshooting Parallel Runs

**Problem**: One parallel agent blocks waiting for the other's output.
**Solution**: Check that both agents are truly independent. If Agent B needs Agent A's output, run sequentially.

**Problem**: Conflicting recommendations from parallel specialists.
**Solution**: Normal — Product Architect's consolidation step (final PRD v1.0) is specifically designed to resolve specialist conflicts.

**Problem**: One agent's output is higher quality than the other.
**Solution**: Product Architect synthesizes both. Explicitly note which specialist's recommendation to prioritize when inconsistencies arise.

---

**Guide Version**: 1.1 (Phase 8 prep)
**Related Skills**: `/feature-pipeline` (uses Pattern 1+2), `/pm-os-quality-audit` (uses Pattern 4), `/pm-os-doc-sync` (uses Pattern 5), `/engineering-partner` (uses Pattern 6)
**Related Agents**: All core agents + Orchestrator
**Maintained By**: PM OS Orchestrator
**Last Updated**: 2026-02-17
