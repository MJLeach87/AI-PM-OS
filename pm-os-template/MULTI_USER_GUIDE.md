# PM OS Multi-User Guide

**Phase**: 8 (Enterprise Readiness)
**Audience**: Teams of 2–10 PMs sharing a PM OS workspace

---

## Overview

PM OS is designed for single-PM use by default. This guide covers how to extend it for team collaboration while preserving the identity layer as a shared source of truth.

---

## Recommended Team Structure

```
Shared PM OS repo (org-owned)
├── identity/          ← Shared, owned by Head of Product
│   ├── STRATEGY.md    ← Updated quarterly by Head of Product
│   ├── STANDARDS.md   ← Updated by eng lead + PM lead
│   ├── ROADMAP.md     ← Updated by PM lead at each planning cycle
│   └── DATA_DICTIONARY.md  ← Updated by data + PM lead
├── execution/         ← Each PM works in their own subdirs
│   ├── discovery/     ← All PMs contribute here
│   ├── prds/          ← All PMs contribute here
│   └── improvement_proposals/  ← System health (any PM)
└── pm-os-reference/   ← Read-only for everyone
```

---

## Git Workflow for Teams

### Branch Strategy
```bash
# Each PM works on a feature branch
git checkout -b pm/[your-initials]/[feature-name]

# Run PM OS skills on your branch
/discovery [topic]
/prd [feature]

# PR to main when artifacts are ready for review
gh pr create --title "Add [feature] discovery + PRD"
```

### CODEOWNERS Setup
Create `.github/CODEOWNERS`:
```
# Identity layer requires Head of Product approval
/identity/STRATEGY.md   @head-of-product
/identity/ROADMAP.md    @head-of-product
/identity/STANDARDS.md  @head-of-product @eng-lead

# PM OS infrastructure requires any PM lead approval
/.claude/              @pm-lead
/pm-os-reference/      @pm-lead
```

### Merge Conflict Prevention
- `identity/` files: Only update at planning boundaries (quarterly for STRATEGY, sprint for ROADMAP)
- `execution/` files: Use date-prefixed naming (enforced by skill naming convention) — conflicts unlikely
- `.claude/CLAUDE.md`: Changes require PM lead review before merge

---

## Parallel Workstreams

Multiple PMs can run PM OS simultaneously on the same repo without conflicts:

| PM | Branch | Running |
|----|--------|---------|
| PM-A | `pm/a/auth-feature` | `/feature-pipeline auth redesign` |
| PM-B | `pm/b/onboarding` | `/discovery onboarding drop-off` |
| PM-C | `main` | `/pm-os-quality-audit` |

Each PM's Claude Code session operates independently. Artifacts are saved to `execution/` with unique date-prefixed names.

---

## Shared Confluence Space

All PMs publish to the same Confluence space (`PM`). Skill auto-publish uses the idempotency pattern (search before create), so duplicate pages are prevented.

**Page ownership**: The PM who generates the artifact owns the Confluence page. Use Confluence page watchers to notify stakeholders.

---

## Identity Layer Governance

| File | Update Frequency | Who Updates | Review Required |
|------|-----------------|-------------|-----------------|
| STRATEGY.md | Annually / major pivots | Head of Product | Leadership sign-off |
| ROADMAP.md | Quarterly | PM lead | Team review |
| STANDARDS.md | Semi-annual | PM lead + Eng lead | Engineering review |
| DATA_DICTIONARY.md | As metrics change | Data + PM lead | Data governance review |

**Process**: Create a git PR with the change, tag CODEOWNERS, merge after approval. PM OS agents automatically use the latest version after merge — no reconfiguration needed.

---

## Monthly Audit Cadence

The GitHub Actions workflow (`.github/workflows/audit-reminder.yml`) auto-creates a Jira ticket and GitHub Issue each month prompting the team to run `/pm-os-quality-audit`. Assign to rotating PM lead.

---

**Related**: `pm-os-template/UPGRADE_GUIDE.md`, `mcp/setup_guides/PERMISSIONS_GUIDE.md`
