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

**When to use**: System Evaluator auditing multiple agents simultaneously, or `/audit` on a large batch of artifacts.

**How to invoke**:

```
Run quality audit in parallel across:
- execution/prds/ — last 3 PRDs (Product Architect quality)
- execution/technical_specs/ — last 3 specs (Engineering Partner quality)
- execution/discovery/ — last 3 OSTs (Product Architect discovery quality)

Produce a single consolidated audit report.
```

**Output**: `execution/improvement_proposals/YYYY-MM-DD_Audit_[scope].md`

---

## Pattern 5: Parallel Documentation Sync

**When to use**: After multiple phases of work, sync all documentation simultaneously.

**How to invoke** (or use `/sync-docs`):

```
Documentation Maintainer: Sync all stale documentation in parallel:
- pm-os-reference/identity/ROADMAP.md (check phase status accuracy)
- pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md (update metrics)
- .claude/CLAUDE.md (verify phase table is current)
- identity/README.md (check customization checklist completeness)
```

---

## When NOT to Parallelize

| Scenario | Why Sequential |
|----------|---------------|
| Engineering Partner depends on UX Strategist's IA map | Wait for IA before writing API spec |
| Data Analyst needs Engineering Partner's schema clarification | Wait for schema before writing SQL |
| Product Architect final PRD needs all specialist inputs | Always sequential — last step |
| `/discovery` OST generation | Single-agent workflow — no parallelism needed |

---

## Monitoring Parallel Runs

When running parallel agents:

1. **Request status updates**: "Let me know when Engineering Partner and UX Strategist both complete."
2. **Check for blockers**: If one agent finishes early and finds a blocker (e.g., Engineering Partner flags an infeasibility), pause the other parallel agents if their work depends on the blocked outcome.
3. **Consolidation prompt**: After all parallel agents complete, explicitly say: "Product Architect: all specialist reviews are complete. Consolidate into PRD v1.0."

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

**Guide Version**: 1.0 (Phase 7)
**Related Skills**: `/feature` (uses Pattern 1+2), `/audit` (uses Pattern 4), `/sync-docs` (uses Pattern 5)
**Related Agents**: All core agents + Orchestrator
**Maintained By**: Documentation Maintainer Agent
**Last Updated**: 2026-02-14
