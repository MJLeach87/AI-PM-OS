# ADR: Full Stack PM — Engineering Standards Integration

**Date**: 2026-02-28
**Status**: Accepted
**Author**: PM + Full Stack PM System

---

## Decision

PM OS expands from a product planning system to a full lifecycle management platform ("Full Stack PM"), covering discovery through production delivery and monitoring. Engineering standards are embedded directly into `identity/STANDARDS.md`, a `/launch` skill bridges planning to development, and existing skills are updated with engineering awareness.

---

## Context

When mealiflo was scaffolded as the first real product built through PM OS, engineering standards failed to transfer:

1. **`identity/STANDARDS.md` was placeholder text** — never populated with engineering standards. Every skill reads this file in Step 1, but it only contained `[CUSTOMIZE THIS]` markers.
2. **No launch mechanism existed** — `/feature-pipeline` output ended at specs. No formal bridge to development initiation (repo scaffolding, config files, CI/CD setup).
3. **UX Strategist lacked component library awareness** — prototypes generated without knowledge of shadcn/ui, making them less production-ready.
4. **AI services beyond Claude were undocumented** — Imagen 3, Google Vision, Google Books API discovered during implementation rather than planned upfront.
5. **Vercel platform not formalized** — deployment conventions existed as tribal knowledge.
6. **No config templates** — testing, CI/CD, and security configs were created from scratch each time.

The root cause: PM OS was designed as a product planning tool, not a full lifecycle system. The engineering half was assumed to live outside PM OS.

---

## Resolution

### Changes Made

| # | Change | Location |
|---|--------|----------|
| 1 | Populated `identity/STANDARDS.md` with platform profiles, tech stack, component library, AI services inventory, Vercel platform, security, testing, quality gates, git workflow, README standard, accessibility, observability, Claude plugins | `identity/STANDARDS.md` |
| 2 | Created config templates (biome, tsconfig, vitest, playwright, next.config, CI workflow) | `templates/configs/web/` |
| 3 | Created test pattern templates (server action, component, E2E, setup) | `templates/testing/` |
| 4 | Created project README template | `templates/project_readme_template.md` |
| 5 | Updated CLAUDE.md template to v2 (plugin sequencing, quality gates, AI services, component library) | `templates/web_project_claudemd_template.md` |
| 6 | Created `/launch` skill (validate specs, generate scaffolding, bootstrap instructions) | `.claude/skills/launch/SKILL.md` |
| 7 | Updated `/ux-strategist` (shadcn/ui awareness, touch targets, CSS variables) | `.claude/skills/ux-strategist/SKILL.md` |
| 8 | Updated `/engineering-partner` (AI services, Vercel security, config templates) | `.claude/skills/engineering-partner/SKILL.md` |
| 9 | Updated CLAUDE.md (Full Stack PM identity, `/launch` routing, updated flow diagram) | `.claude/CLAUDE.md` |
| 10 | Created mealiflo retrofit checklist (P0/P1/P2 prioritized) | `execution/RECIPE_mealiflo/` |

### Platform Profiles Architecture

Standards are now organized as shared standards + platform profiles. The web profile is active; mobile and agential development profiles are planned placeholders. This allows expansion without restructuring.

### `/launch` Skill

New 9-step skill that validates specs exist, generates starter CLAUDE.md and README from templates, lists config files to copy and customize, and outputs bootstrap instructions. Formally bridges PM OS planning output to development initiation.

---

## Consequences

### Positive

- **Single authority**: PM OS is now the single source of truth for both product and engineering standards
- **Automatic propagation**: all skills already read `identity/STANDARDS.md` in Step 1 — populating it made every skill engineering-aware with zero additional routing changes
- **Reproducible launches**: `/launch` eliminates the "scaffolding from memory" problem — every product repo starts with the same standards
- **Production-closer prototypes**: UX Strategist now generates shadcn/ui-aware prototypes that developers can refactor with minimal structural changes
- **Cost-aware feasibility**: Engineering Partner now references AI Services Inventory with per-call costs and rate limits

### Negative

- **`identity/STANDARDS.md` is larger** — went from ~320 lines of placeholder to ~400+ lines of content. Skills that read it consume more context.
- **Web-centric assumptions** — the active profile assumes Next.js/Vercel/Turso. Teams using different stacks need to customize significantly.
- **Maintenance burden** — engineering standards evolve faster than product standards. `STANDARDS.md` will need more frequent updates.

### Risks

- **Standards drift**: if product repos diverge from standards without updating STANDARDS.md, the system becomes inconsistent. Mitigated by `/launch` generating from templates and `/release-check` validating alignment.
- **Over-prescription**: highly specific standards (e.g., "three Zod schemas per AI endpoint") may not suit every product. Teams should treat these as strong defaults, not absolute rules.

---

## References

- Previous ADR: `2026-02-22_ADR_Web-Development-Standards.md` (established web stack; this ADR embeds it into PM OS identity)
- Mealiflo as case study: `execution/RECIPE_mealiflo/` (first product, revealed the standards gap)
- Phase 8 scope: `pm-os-reference/identity/ROADMAP.md`
