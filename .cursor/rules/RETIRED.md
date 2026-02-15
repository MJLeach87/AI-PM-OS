# Cursor Rules — Retired

**Retirement Date**: 2026-02-14
**Phase**: Phase 5 — Claude Code Skills Migration

---

## What Happened

PM OS migrated to **Claude Code-only** operation as of Phase 5. All Cursor `.mdc` agent rules have been deleted from this directory.

## Migration Targets

| Former File | Migrated To |
|------------|-------------|
| `_orchestrator.mdc` | `.claude/CLAUDE.md` (ambient routing layer) |
| `product_arch.mdc` | `.claude/skills/product-architect/SKILL.md` |
| `engineering_partner.mdc` | `.claude/skills/engineering-partner/SKILL.md` (includes merged content) |
| `ux_strategist.mdc` | `.claude/skills/ux-strategist/SKILL.md` |
| `data_analyst.mdc` | `.claude/skills/data-analyst/SKILL.md` |
| `gtm_strategist.mdc` | `.claude/skills/gtm-strategist/SKILL.md` |
| `system_evaluator.mdc` | `.claude/skills/pm-os-quality-audit/SKILL.md` |
| `documentation_maintainer.mdc` | `.claude/skills/pm-os-doc-sync/SKILL.md` |
| `api_doc_reviewer.mdc` | `.claude/skills/engineering-partner/SKILL.md` (API doc review is part of Engineering Partner) |

## New Architecture

**Skills** (sole canonical source): `.claude/skills/`
**Routing** (ambient orchestration): `.claude/CLAUDE.md`

Available skills:
- `/product-architect` — Discovery, PRD, OST, agent spec creation
- `/engineering-partner` — Feasibility, security, API contracts, BPMN
- `/ux-strategist` — Prototypes, IA, user flows, accessibility
- `/data-analyst` — SQL, metrics validation, A/B analysis
- `/gtm-strategist` — Positioning, battle cards, GTM
- `/discovery` — Full OST + discovery pipeline
- `/prd` — BMAD PRD generation
- `/feature-pipeline` — End-to-end feature workflow
- `/pm-os-quality-audit` — PM OS quality audit
- `/pm-os-doc-sync` — PM OS documentation sync
- `/release-check` — Pre-push deep review (security, doc currency, phase alignment)

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
