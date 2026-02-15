# PM OS Skills Migration: Plan Prompt

**Created**: 2026-02-14
**Type**: Strategic Overhaul Prompt
**Purpose**: Input prompt to a Claude Plan agent for full implementation planning

---

## How to Use This Prompt

Feed the content below (starting at "---PROMPT START---") to a Claude Plan agent. The Plan agent will explore the codebase, assess the full scope of change, and produce a step-by-step implementation plan for human approval.

---PROMPT START---

# Task: PM OS Skills Migration — Consolidate to Claude Code, Eliminate Dual-Track

You are the PM OS Plan Agent. Your objective is to produce a **holistic, step-by-step implementation plan** for migrating and consolidating the PM OS rules/agents into the Claude Code skills architecture.

**Do not implement anything yet. Explore the codebase, assess the full scope, then output a detailed written plan.**

---

## Context: Why This Migration

PM OS was originally built for dual-track operation: every agent was maintained in two places simultaneously — a **Cursor rule** (`.cursor/rules/*.mdc`) and a **Claude Code sub-agent** (`.claude/agents/*.md`). This produced paired files for every agent (9 agents × 2 = 18 agent files, plus the CLAUDE.md orchestration layer).

**The usage pattern has diverged.** PM OS is now used exclusively through Claude Code. The Cursor track is dead weight — it adds:
- Maintenance burden (every change must be duplicated)
- Divergence risk (files drift out of sync)
- Conceptual overhead (dual-environment design constraints in agent logic)
- Stale references throughout documentation

**The migration objective is threefold:**
1. **Eliminate** the `.cursor/rules/` track entirely
2. **Consolidate** agent logic into Claude Code's native skill architecture (sub-agents + user-invocable skills/commands)
3. **Update** all downstream documentation and meta-recursive tracking to reflect the new single-track architecture

---

## Before You Plan: Explore These Files

Read and understand the following to inform your plan. Do this **before** writing any plan content.

### Core Architecture Files
- `.claude/CLAUDE.md` — Project context, orchestration logic, phase roadmap table
- `.claude/agents/orchestrator.md` — Master router with routing decision tree
- `.claude/agents/product_arch.md` — Most detailed agent; note all references to creating `.mdc` files
- `.claude/agents/engineering_partner.md`
- `.claude/agents/ux_strategist.md`
- `.claude/agents/data_analyst.md`
- `.claude/agents/gtm_strategist.md`
- `.claude/agents/system_evaluator.md`
- `.claude/agents/documentation_maintainer.md`
- `.claude/agents/api_doc_reviewer.md`

### Cursor Rules (to be eliminated — read to understand what's in them vs. the Claude agents)
- `.cursor/rules/_orchestrator.mdc`
- `.cursor/rules/product_arch.mdc`
- One additional `.mdc` file of your choice (spot-check for divergence)

### Meta-Recursive Tracking (must be updated)
- `pm-os-reference/identity/ROADMAP.md` — Phase history, phase evolution section
- `pm-os-reference/documentation/PHASE_4_MASTER_TRACKER.md`
- `pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md`
- `pm-os-reference/documentation/SELF_IMPROVEMENT_WORKFLOW.md`
- `pm-os-reference/documentation/phase-evolution/README.md`
- `pm-os-reference/documentation/phase-history/PHASE_3_COMPLETION_REPORT.md` (for context on format)

### Templates (agents reference these — check for dual-track assumptions)
- `templates/agent_spec_template.md` — Defines how new agents are created; will need revision

### Additional Context
- `README.md` — Surface-level references to Cursor that need updating
- `QUICK_START.md` — Usage instructions mentioning Cursor
- `.mcp.json` and `.claude/settings.local.json` — Understand current tooling setup

---

## Architecture Understanding You Must Establish

Before planning, form a clear mental model of the following:

### Claude Code's Native Skill Architecture (Three Layers)

**Layer 1 — Project Context** (`CLAUDE.md`):
Always-active project instructions loaded into every Claude Code session. Contains orchestration logic, routing rules, identity layer instructions, security non-negotiables. This is the "ambient orchestration" layer.

**Layer 2 — Sub-Agents** (`.claude/agents/*.md`):
Specialist agents invoked programmatically via the `Task` tool. They have `name:` and `description:` frontmatter. Used for parallel processing, deep specialist work, and background tasks. These are already Claude Code-native.

**Layer 3 — User-Invocable Skills/Commands** (`.claude/commands/*.md`):
Slash commands (e.g., `/discovery`, `/prd`, `/feasibility`) that users invoke directly. They are prompt templates that expand when called, optionally accepting `$ARGUMENTS`. These are the **missing layer** in the current PM OS — no `.claude/commands/` directory exists yet.

**Currently, PM OS only uses Layers 1 and 2.** The migration creates Layer 3 and removes the Cursor parallel.

### What Changes vs. What Stays

**Eliminated entirely:**
- `.cursor/rules/` directory and all `.mdc` files

**Kept and refined (sub-agents — already Claude Code native):**
- All `.claude/agents/*.md` files — these are the right tool for specialist work invoked via `Task`
- Remove any Cursor-specific references or dual-track instructions within them

**Newly created (Layer 3 — user-invocable skills):**
- `.claude/commands/` directory
- One skill per major workflow entry point (see candidate list below)

**Updated to reflect single-track:**
- `.claude/CLAUDE.md` — Remove all dual-track language; update phase roadmap table; update file structure reference
- All `pm-os-reference/` documentation and tracking files (meta-recursive requirement)
- `templates/agent_spec_template.md` — Remove requirement to create `.mdc` files; update to single `.md` format
- `README.md`, `QUICK_START.md` — Remove Cursor references from user-facing docs

---

## Candidate Skill Commands to Create

For each of these, assess whether it should be a standalone skill, combined with another, or handled purely by CLAUDE.md ambient orchestration. Document your reasoning.

| Candidate Skill | Invocation | What It Would Do |
|---|---|---|
| Discovery workflow | `/discovery` | Triggers Product Architect for OST + optional research synthesis; accepts topic as `$ARGUMENTS` |
| PRD generation | `/prd` | Generates PRD from current context or given `$ARGUMENTS`; invokes Product Architect |
| Technical feasibility | `/feasibility` | Invokes Engineering Partner for feasibility + security review |
| UX prototype | `/prototype` | Invokes UX Strategist for wireframe/prototype generation |
| Data analysis | `/analyze` | Invokes Data Analyst for metrics/SQL work |
| GTM positioning | `/gtm` | Invokes GTM Strategist for value prop / positioning work |
| Quality audit | `/audit` | Invokes System Evaluator for quality review |
| Documentation sync | `/sync-docs` | Invokes Documentation Maintainer |
| Full feature pipeline | `/feature` | Orchestrates end-to-end workflow: OST → PRD → Feasibility → Prototype |

**Design consideration**: Some of these may be redundant with CLAUDE.md ambient routing (users can already type "generate a PRD" without a `/prd` command). Your plan should explicitly address which skills add distinct value vs. which would be noise.

---

## Meta-Recursive Tracking Requirements

This migration is itself a PM OS improvement. It must be tracked through PM OS's own self-improvement infrastructure. Your plan **must include** the following meta-recursive artifacts:

### 1. Phase Classification
Determine whether this migration is:
- An extension of Phase 4 (MCP Integration Suite) — unlikely, different scope
- A new Phase 4.4 / 4.5 sub-phase within Phase 4
- A new Phase 5 (shifting Data Intelligence to Phase 6)
- A standalone architectural overhaul inserted between Phase 4 and Phase 5

Justify your recommendation with reference to PM OS's phase evolution history (see `ROADMAP-001` evolution pattern in the ROADMAP).

### 2. Required Documentation Artifacts

Your implementation plan must produce or update these files:

**New phase documentation:**
- `pm-os-reference/documentation/phase-history/PHASE_[X]_SKILLS_MIGRATION.md` (new — archive this phase)
- `pm-os-reference/documentation/2026-02-14_Skills-Migration-Architecture.md` (new — architectural decision record)

**Updated identity layer:**
- `pm-os-reference/identity/ROADMAP.md` — Add phase entry, update Phase Evolution History section
- `pm-os-reference/documentation/PHASE_4_MASTER_TRACKER.md` — Update or retire

**Updated product documentation:**
- `.claude/CLAUDE.md` — Remove dual-track, update phase table, update file structure diagram
- `README.md` — Remove Cursor references from the product description
- `QUICK_START.md` — Update usage instructions to Claude Code-only

**Updated quality tracking:**
- `pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md` — Add skills migration metrics
- `pm-os-reference/documentation/SELF_IMPROVEMENT_WORKFLOW.md` — Update to reflect skills-aware improvement loop

### 3. Jira Issue Creation

After plan approval, the Product Architect should create a Jira epic/story in the PMOS project for this migration using the Atlassian Rovo MCP. Include the Jira issue creation as a plan step.

---

## Specific Issues to Resolve in the Plan

Your plan must explicitly address each of these:

### Issue 1: Agent Spec Template Dual-Track Assumption
`templates/agent_spec_template.md` currently instructs agents to create BOTH a `.mdc` (Cursor) and `.md` (Claude Code) file for any new agent. The `product_arch.md` agent spec creation capability also encodes this dual-output requirement. After migration, new agents are single-file `.claude/agents/*.md` only. Plan must update:
- `templates/agent_spec_template.md`
- The agent creation section in `.claude/agents/product_arch.md`
- The agent creation section in `.claude/agents/orchestrator.md`

### Issue 2: Orchestrator Routing Logic Location
The orchestrator currently exists in two forms: embedded in `CLAUDE.md` (ambient) AND as a separate `.claude/agents/orchestrator.md` sub-agent. With skills consolidation, assess whether the orchestrator should:
- (A) Stay as a sub-agent AND be ambient in CLAUDE.md (current state, minus Cursor)
- (B) Be folded entirely into CLAUDE.md (simpler, single source of truth)
- (C) Be restructured into a skill that users can invoke on demand

Recommend one approach with justification.

### Issue 3: Cursor Rules Divergence Assessment
Before deleting `.cursor/rules/*.mdc` files, the plan must include a divergence audit step: compare each `.mdc` against its paired `.claude/agents/*.md` to identify if any `.mdc` contains capabilities or routing logic NOT present in the Claude version. Any such content must be merged into the Claude version before deletion.

### Issue 4: Documentation Maintainer's Self-Reference
The Documentation Maintainer agent is responsible for keeping documentation synchronized. This migration will trigger a large documentation update. The plan should specify whether Documentation Maintainer runs:
- During migration (auto-updating docs as files change)
- After migration as a post-migration sweep
- Both

### Issue 5: `.cursor/` Directory Disposition
After removing all `.mdc` files, the `.cursor/rules/` directory will be empty. The plan should decide whether to:
- Delete the entire `.cursor/` tree
- Keep an empty `.cursor/rules/` with a `README.md` explaining it was retired
- Add a `.cursor/rules/README.md` redirect to `.claude/agents/` for any future Cursor users

### Issue 6: Settings and Permissions Cleanup
`.claude/settings.local.json` contains permissions accumulated over development. Check whether any Cursor-specific permissions exist that should be cleaned up.

---

## Plan Output Format Requirements

Your plan must include ALL of the following sections:

### Section 1: Current State Assessment
- Inventory all files that will change (create, modify, delete)
- Identify divergences found in `.mdc` vs `.md` spot-check
- Call out any surprises or risks

### Section 2: Architecture Decision Record
- Recommended skills to create (with reasoning for each)
- Orchestrator location recommendation (Option A/B/C above)
- Phase classification decision
- `.cursor/` directory disposition decision

### Section 3: Implementation Steps (Ordered, Atomic)
Each step must specify:
- Action (create / modify / delete / run)
- File(s) affected
- What specifically changes
- Who/what executes this (human, Documentation Maintainer, Product Architect, etc.)
- Dependencies (what must be done first)

Steps must be sequenced so:
1. Divergence audit happens BEFORE any deletion
2. Sub-agent content updates happen BEFORE Cursor files are deleted
3. Template updates happen BEFORE any new agent is ever created
4. Meta-recursive documentation happens AFTER changes are made
5. Jira tracking is set up early in the process

### Section 4: Validation Criteria
Define specific, checkable success criteria for the migration. Include:
- Functional tests (can each skill be invoked? do sub-agents still work?)
- Documentation completeness checks
- No dead Cursor references remaining
- Meta-recursive tracking completeness

### Section 5: Rollback Plan
If the migration causes problems, what is the recovery path? (Git history exists, but what's the procedure?)

### Section 6: Post-Migration Improvement Proposals
What improvements should the System Evaluator or Documentation Maintainer propose in the first audit cycle after migration? List 3-5 anticipatory improvement areas.

---

## Constraints and Non-Negotiables

- **Do not break existing sub-agent functionality.** The `.claude/agents/*.md` files are actively used via the Task tool and must continue working after migration.
- **Do not change agent capabilities or quality standards.** This is a structural migration, not a capability overhaul.
- **Preserve all meta-recursive tracking.** Every phase completion, quality metric, and evolution record in `pm-os-reference/` must be preserved and updated.
- **Skills must have clear value.** Do not create skills that simply duplicate what CLAUDE.md ambient routing already handles. Each skill must add distinct user-facing utility.
- **The identity layer (`identity/` directory) is USER context — do not modify it.** Only `pm-os-reference/` (PM OS's own context) changes.
- **Git-friendly.** Plan each step as a logical commit unit. Large sweeping changes should be split into reviewable chunks.
- **Maintain security standards.** No secrets in `.mdc` content to migrate, but verify and document this.

---

## Deliverable

Produce a complete written implementation plan following the Section 1–6 format above. The plan will be reviewed by the human PM before any implementation begins.

The plan should be written to `execution/improvement_proposals/2026-02-14_Skills-Migration-Implementation-Plan.md`.

---PROMPT END---
