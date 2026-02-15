# ADR: Skills Migration Architecture
**Date**: 2026-02-14
**Status**: Accepted
**Phase**: Phase 5 — Claude Code Skills Migration
**Jira**: PMOS-TBD (to be updated after Jira story creation)

---

## Context

PM OS was originally designed as a **dual-track system**: every specialist agent existed as both a Cursor `.mdc` rule (`.cursor/rules/`) and a Claude Code sub-agent (`.claude/agents/`). This was intended to support two usage modes — Cursor IDE via `@agent-name` mentions, and Claude Code via the Task tool.

By Phase 4 (February 2026), actual usage was 100% Claude Code. No Cursor invocations had been recorded since initial system setup. The dual-track requirement was also creating active content drift: an audit found the Engineering Partner `.mdc` contained ~546 lines not present in the corresponding `.md` file, including full OWASP walkthrough examples and secondary function definitions.

### Forces

- **Maintenance burden**: Every agent update required editing two files
- **Content drift**: Files diverged without active enforcement (546-line gap discovered)
- **Agent spec constraint**: The `agent_spec_template.md` required generating BOTH `.mdc` + `.md` outputs for every new agent, adding friction to PM OS self-improvement
- **Zero Cursor value**: No Cursor usage meant dual-track provided zero benefit
- **UX gap**: New users had no discoverable entry points for common workflows (no slash commands)

---

## Decision

**Eliminate the dual-track architecture. Migrate PM OS to Claude Code-only.**

Specific decisions:

1. **Delete all 9 `.mdc` files** from `.cursor/rules/` (after merging unique content into Claude versions)
2. **Create `.claude/commands/` skills layer** — 5 user-invocable slash commands for high-value workflows
3. **Keep `.cursor/` directory** with a single `RETIRED.md` retirement notice for discoverability
4. **Orchestrator disposition**: Keep `.claude/agents/orchestrator.md` as sub-agent reference; CLAUDE.md remains the ambient layer
5. **Single-track agent spec template**: Remove dual-file output requirement; agents generate only `.claude/agents/[name].md`

### Skills Created

| Skill | File | Purpose |
|-------|------|---------|
| `/discovery` | `.claude/commands/discovery.md` | OST generation with evidence-first workflow |
| `/prd` | `.claude/commands/prd.md` | BMAD PRD entry point with Jira MCP offer |
| `/feature` | `.claude/commands/feature.md` | Full 6-agent end-to-end pipeline |
| `/audit` | `.claude/commands/audit.md` | System Evaluator quality audit |
| `/sync-docs` | `.claude/commands/sync-docs.md` | Documentation Maintainer sync |

### Skills NOT Created (Served by ambient CLAUDE.md routing)

`/feasibility`, `/prototype`, `/analyze`, `/gtm` — well-served by natural language routing without dedicated commands.

---

## Consequences

### Positive
- **Reduced surface area**: 9 files deleted, maintenance burden halved for each agent update
- **No drift**: Single source of truth per agent
- **Simplified agent spec workflow**: New agents require only one file
- **Skills layer**: Discoverable entry points for new users; explicit invocation for complex workflows
- **Content preserved**: Engineering Partner `.mdc`'s ~546 unique lines merged into `.md` Extended Reference section

### Negative / Risks
- **Cursor users blocked**: If anyone attempts to use PM OS in Cursor, agent rules no longer exist. Mitigated by: `RETIRED.md` in `.cursor/rules/` with clear migration instructions; git history preserves `.mdc` content
- **Phase 6 scope revision needed**: Phase 6 was "IDE Optimization" — with Cursor removed, scope must be revised (proposed: "Claude Code Advanced Workflows")

### Neutral
- Git history preserves all `.mdc` content with clear commit message for retrieval
- Phase numbering shifted: former Phase 5 (Data Intelligence) → Phase 6; former Phase 6 (IDE Optimization) → Phase 7 (revised scope); former Phase 7 (Enterprise) → Phase 8

---

## Alternatives Considered

### Alternative 1: Keep dual-track, enforce sync via git hooks
**Rejected**: Zero Cursor usage means any enforcement effort has negative ROI. Maintenance burden with no benefit.

### Alternative 2: Convert .mdc files to Cursor v2 format and maintain both
**Rejected**: Still dual-track maintenance; Cursor usage remains zero.

### Alternative 3: Delete .mdc files without skills layer
**Rejected**: Would leave a UX gap — no discoverable entry points for complex workflows like full feature pipeline.

---

## Phase Evolution Reference

See: `pm-os-reference/documentation/phase-evolution/PHASE_5_INSERT_2026-02-14.md`
