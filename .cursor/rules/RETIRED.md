# Cursor Rules — Retired

**Retirement Date**: 2026-02-14
**Phase**: Phase 5 — Claude Code Skills Migration

---

## What Happened

PM OS migrated to **Claude Code-only** operation as of Phase 5. All Cursor `.mdc` agent rules have been deleted from this directory.

## Migration Targets

| Former File | Migrated To |
|------------|-------------|
| `_orchestrator.mdc` | `.claude/agents/orchestrator.md` (routing reference) + `.claude/CLAUDE.md` (ambient layer) |
| `product_arch.mdc` | `.claude/agents/product_arch.md` |
| `engineering_partner.mdc` | `.claude/agents/engineering_partner.md` (includes merged content) |
| `ux_strategist.mdc` | `.claude/agents/ux_strategist.md` |
| `data_analyst.mdc` | `.claude/agents/data_analyst.md` |
| `gtm_strategist.mdc` | `.claude/agents/gtm_strategist.md` |
| `system_evaluator.mdc` | `.claude/agents/system_evaluator.md` |
| `documentation_maintainer.mdc` | `.claude/agents/documentation_maintainer.md` |
| `api_doc_reviewer.mdc` | `.claude/agents/api_doc_reviewer.md` |

## New Architecture

**Sub-agents** (deep specialist context): `.claude/agents/`
**Skills** (user-invocable slash commands): `.claude/commands/`

Available skills:
- `/discovery` — OST generation workflow
- `/prd` — BMAD PRD generation
- `/feature` — Full end-to-end pipeline
- `/audit` — System Evaluator quality check
- `/sync-docs` — Documentation Maintainer sync

## Accessing Archived Content

The `.mdc` file content is preserved in git history. To retrieve:

```bash
git log --oneline -- .cursor/rules/engineering_partner.mdc
git show <commit-hash>:.cursor/rules/engineering_partner.mdc
```

The pre-migration commit is tagged in the git log with message:
`[Phase 5] Retire .cursor/rules — archived, migrated to Claude Code skills`

## Rationale

Usage pattern analysis confirmed 100% Claude Code usage since Phase 4. Dual-track maintenance created:
- 2× file maintenance burden
- Active content divergence (Engineering Partner .mdc had ~546 lines not in Claude version)
- Constraint on agent spec format (required both .mdc + .md output)

See: `pm-os-reference/documentation/2026-02-14_ADR_Skills-Migration-Architecture.md`
