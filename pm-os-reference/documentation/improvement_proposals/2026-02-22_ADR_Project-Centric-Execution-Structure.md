# ADR-005: Project-Centric execution/ Structure

**Date**: 2026-02-22
**Status**: Accepted
**Deciders**: Human PM + PM OS Orchestrator
**Phase**: 8 Prep (pre-Enterprise Readiness)

---

## Context

The previous `execution/` directory organized artifacts by *type* first — `discovery/`, `prds/`, `technical_specs/`, `prototypes/`, `gtm/`, `automation/`. Each type-directory held artifacts from every project.

**Problems with the old structure**:
1. **Scattered context**: A single feature's artifacts lived across 5–7 folders. Finding everything for "one-click-checkout" required navigating `discovery/`, `prds/`, `technical_specs/`, `prototypes/`, and `gtm/`.
2. **Onboarding friction**: New PMs or reviewers couldn't open one folder and see the full picture for an initiative.
3. **Project archival difficulty**: Archiving a shipped feature required collecting files from every type subdirectory.
4. **Multi-project confusion**: As PM OS scales to handle multiple concurrent projects, the old structure made it harder to isolate work per initiative.

---

## Decision

Switch `execution/` from **artifact-centric** to **project-centric** organization.

**New structure**:
```
execution/
├── [JIRA-KEY]_[brief-kebab-title]/    ← one folder per initiative
│   ├── YYYY-MM-DD_OST_Topic.md
│   ├── YYYY-MM-DD_PRD_Feature_v0.1.md
│   ├── YYYY-MM-DD_Feasibility_Feature.md
│   ├── YYYY-MM-DD_Prototype_Feature.tsx
│   ├── YYYY-MM-DD_ValueProp_Feature.md
│   └── YYYY-MM-DD_MetricsValidation_Feature.md
└── shared/
    └── YYYY-MM-DD_BattleCard_Competitor.md   ← cross-project GTM
```

**Project slug convention**: `[JIRA-KEY]_[brief-kebab-title]`
Example: `PMOS-110_one-click-checkout`

**Artifact type identification**: Filename prefix (unchanged): `YYYY-MM-DD_[artifact-type]_[brief-title].[ext]`

**Shared artifacts**: Cross-project competitive/market research → `execution/shared/`

**Project slug sourcing**: Skills derive slug from Jira key + feature name in the request, or ask the PM before writing any output.

---

## Changes Made

| File | Change |
|------|--------|
| `execution/` | Removed 6 type-based dirs (`discovery/`, `prds/`, `technical_specs/`, `prototypes/`, `gtm/`, `automation/`); created `shared/` |
| `execution/README.md` | Full rewrite documenting project-centric structure, slug convention, shared/ usage, pipeline flow |
| `.claude/CLAUDE.md` | Updated Execution Layer table and Mode A outputs description |
| `identity/STANDARDS.md` | Updated storage path convention example |
| All 8 skill files (discovery, prd, product-architect, engineering-partner, ux-strategist, data-analyst, gtm-strategist, feature-pipeline) | Added Step 0 project-slug derivation; updated all output paths to `execution/[project-slug]/` |
| `pm-os-quality-audit/SKILL.md` | Updated Glob pattern to `execution/*/` |
| 8 templates (prd, tech_spec, implementation_analysis, api_contract, metrics_validation, ab_test_analysis, security_assessment) | Updated cross-reference path examples |
| 4 discovery templates (interview_synthesis, feedback_synthesis, analytics_assessment, trend_analysis) | Updated DISCOVERY_INDEX path to `execution/[project-slug]/` |
| `scripts/confluence-sync-manifest.json` | Deprecated old `execution/[type]` directory mappings; added note for future project-based sync |

---

## Consequences

### Positive
- All artifacts for an initiative are co-located → faster context loading, easier review
- Project archival is trivial: move or tag one directory
- Skills use a consistent "Step 0" pattern to derive project slug before writing — no ambiguity about destination
- `execution/shared/` cleanly separates cross-project GTM from feature-specific work

### Negative / Trade-offs
- **Cross-type search** (e.g., "show me all PRDs") now requires `Glob execution/*/YYYY-MM-DD_PRD_*.md` instead of `Glob execution/prds/*.md` — slightly more complex but still straightforward
- **Confluence directory sync** was broken by this change (old type-mappings no longer match the file system). Deferred: future implementation will map each project slug to a Confluence page hierarchy dynamically

### Neutral
- File naming convention (`YYYY-MM-DD_[type]_[title].[ext]`) is unchanged — only the parent directory structure changed
- pm-os-reference/artifacts/ (PM OS inception examples) is unaffected — those still use type-based subdirs as a historical reference

---

## Alternatives Considered

1. **Keep type-based structure, add project subdirs within each type** — e.g., `execution/prds/PMOS-110_checkout/`. Rejected: still scattered, cross-type navigation still painful.
2. **Dual structure: keep type dirs + add project symlinks** — Rejected: adds complexity, symlinks don't work reliably on Windows.
3. **No change** — Rejected: the problem worsens as the number of concurrent projects grows.

---

## References

- Plan: Project-Centric Execution Structure (planning session 2026-02-22)
- Related: PMOS-110+ (multiple active feature work streams driving this change)
- Confluence sync future work: tracked in scripts/confluence-sync-manifest.json `__NOTE__` field
