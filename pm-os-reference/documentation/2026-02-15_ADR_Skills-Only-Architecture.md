# ADR: Skills-Only Architecture (Agent Retirement)

**Date**: 2026-02-15
**Status**: Accepted
**Decided By**: Human PM (confirmed deletion of all remaining agent files)
**Phase Context**: Between Phase 7 (Complete) and Phase 8 (Planned)

---

## Decision

Retire all files in `.claude/agents/`. Skills in `.claude/skills/` are the sole canonical source for all specialist capabilities. CLAUDE.md serves as the ambient orchestration layer.

## Context

Phase 5 (2026-02-14) created 10 skills and removed 5 redundant agent files (product_arch, engineering_partner, ux_strategist, data_analyst, gtm_strategist). Four agent files remained:

| Agent | Original Role | Reason Previously Kept |
|-------|------------|----------------------|
| `orchestrator.md` | Master router for Claude Code sessions | Believed needed for routing logic beyond CLAUDE.md |
| `system_evaluator.md` | Quality auditor for PM OS | `/pm-os-audit` seen as too narrow |
| `documentation_maintainer.md` | Doc sync | `/pm-os-sync` seen as too narrow |
| `api_doc_reviewer.md` | API doc review | No skill counterpart existed |

After reviewing the actual routing logic in CLAUDE.md and the content of each remaining agent:

1. **Orchestrator** — CLAUDE.md already contains identical routing logic in the "Orchestration" and "Standard Task Routing" sections. No additional capability existed in orchestrator.md that isn't already in CLAUDE.md.

2. **System Evaluator** — `/pm-os-audit` skill covers the same quality audit scope; the agent's "broader scope" was theoretical, not substantively different.

3. **Documentation Maintainer** — `/pm-os-sync` skill covers the same doc sync workflow; same reasoning as above.

4. **API Doc Reviewer** — `/engineering-partner` skill explicitly covers API documentation review as part of its Engineering Partner capabilities. A separate file is redundant.

## Decision Drivers

1. **DRY principle**: Two implementations of the same capability create maintenance burden with no user-facing benefit.
2. **Skills are already the user-facing layer**: Slash commands route through skills, not agents. Agent files were sub-agent artifacts that were never directly invoked by users.
3. **CLAUDE.md is the ambient orchestrator**: Claude Code reads CLAUDE.md as project context, providing routing without a separate orchestrator agent file.
4. **Phase 5 validated skills-first architecture**: Removing 5 agent files in Phase 5 caused zero regressions, confirming skills are sufficient.

## Consequences

### Positive
- Single source of truth: All specialist logic lives in `.claude/skills/[name]/SKILL.md`
- Simplified architecture: No dual-track maintenance between agents and skills
- Cleaner onboarding: New users learn one system (skills), not two (agents + skills)
- QUICK_START.md simplified (v2.0): Removed agent references, all 10 skills documented

### Negative / Mitigations
- **Agent-based Task tool invocation**: If future workflows need to spawn sub-agents via `Task tool`, they can use skills directly or a skill can describe Task tool usage. Mitigation: documented in `/feature` skill parallel notation.
- **api-doc-reviewer skill doesn't exist yet**: `/engineering-partner` covers this capability, but a dedicated `/api-doc-reviewer` skill could be created if routing clarity is needed. Deferred to Phase 8+.

## Alternatives Considered

1. **Keep orchestrator.md only** — Rejected. CLAUDE.md already contains routing logic; keeping orchestrator.md creates a maintenance split.
2. **Keep all 4 agents** — Rejected. Capability overlap confirmed after detailed file comparison. Maintenance cost > benefit.
3. **Create skills for remaining agents first** — Considered. Decided that existing skills (`/engineering-partner`, `/pm-os-audit`, `/pm-os-sync`) and CLAUDE.md routing already cover the capabilities. New skill creation would duplicate content a third time.

## Files Changed

**Deleted**:
- `.claude/agents/orchestrator.md` (539 lines)
- `.claude/agents/system_evaluator.md` (669 lines)
- `.claude/agents/documentation_maintainer.md` (455 lines)
- `.claude/agents/api_doc_reviewer.md` (616 lines)

*(5 additional agent files were deleted in Phase 5 — see `2026-02-14_ADR_Skills-Migration-Architecture.md`)*

**Updated (active docs)**:
- `.claude/CLAUDE.md` — Architecture section: agents/ empty, skills-only noted
- `QUICK_START.md` — v2.0: all 10 skills, agents section removed
- `VALIDATION_CHECKLIST.md` — All stale `.claude/agents/` references replaced
- `README.md` — Troubleshooting, CODEOWNERS, self-building example updated
- `templates/agent_spec_template.md` — Output path updated to `.claude/skills/[name]/SKILL.md`
- `templates/domain_specialist_template.md` — Save location and routing updated
- `identity/README.md` — Agent links updated to skill paths
- `.claude/skills/product-architect/SKILL.md` — Agent spec branch updated to output skill files

**Added (pm-os-reference meta-recursive docs)**:
- `pm-os-reference/documentation/2026-02-15_ADR_Skills-Only-Architecture.md` (this file)
- `pm-os-reference/documentation/phase-history/PHASE_5_ADDENDUM_Agent-Retirement_2026-02-15.md`
- `pm-os-reference/identity/ROADMAP.md` — Inter-phase section added

---

**ADR Number**: ADR-003 (following ADR-001: Atlassian Rovo MCP migration, ADR-002: Skills Migration Architecture)
**Supersedes**: N/A
**Related ADRs**: `2026-02-14_ADR_Skills-Migration-Architecture.md`
