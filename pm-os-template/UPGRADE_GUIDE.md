# PM OS Upgrade Guide

**Audience**: Teams who installed PM OS via GitHub template and want to pull updates from upstream

---

## How Updates Work

PM OS is distributed as a GitHub template. When Anthropic or the PM OS maintainer publishes improvements (new skills, updated SKILL.md files, new templates), you pull them manually. There is no automatic update mechanism — this is intentional to prevent upstream changes from overwriting your customizations.

---

## What Changes Between Versions

| Component | Changes Frequently | Safe to Auto-Update |
|-----------|-------------------|---------------------|
| `.claude/skills/*/SKILL.md` | Yes — skill improvements | ✅ Usually safe |
| `.claude/CLAUDE.md` | Occasionally — routing updates | ⚠️ Review before merging |
| `templates/` | Yes — new artifact templates | ✅ Usually safe |
| `pm-os-reference/` | Rarely | ✅ Read-only, safe |
| `identity/` | Never from upstream | ❌ Never overwrite — your customizations |
| `execution/` | Never from upstream | ❌ Never overwrite — your artifacts |
| `mcp/setup_guides/` | Occasionally | ✅ Usually safe |

---

## Upgrade Process

### 1. Add upstream remote (one-time setup)

```bash
git remote add pm-os-upstream https://github.com/[original-pm-os-repo].git
git fetch pm-os-upstream
```

### 2. Check what changed

```bash
# See commits since your last sync
git log HEAD..pm-os-upstream/main --oneline

# Preview changes to skills (most common update)
git diff HEAD pm-os-upstream/main -- .claude/skills/
```

### 3. Merge selectively

```bash
# Option A: Merge entire upstream (review conflicts carefully)
git merge pm-os-upstream/main

# Option B: Cherry-pick specific skill updates (safer)
git checkout pm-os-upstream/main -- .claude/skills/[skill-name]/SKILL.md

# Option C: Copy-paste specific sections manually (most controlled)
```

### 4. Protect your customizations

These files should NEVER be overwritten from upstream:
```bash
# If a merge created conflicts in identity/, always keep YOURS:
git checkout HEAD -- identity/
git checkout HEAD -- execution/
git checkout HEAD -- .env
```

### 5. Run release check after upgrade

```
/release-check
```

This verifies skill inventory matches CLAUDE.md, no phase alignment drift, no PII in artifacts.

---

## Version Tracking

Check `pm-os-reference/documentation/phase-history/` for what was added in each PM OS phase. When you pull from upstream, the phase history files tell you what changed and why.

---

## When NOT to Upgrade

- Mid-sprint: wait until sprint boundary to minimize disruption
- During active `/feature-pipeline` runs: complete the pipeline first
- If a skill is working well for your team: "if it ain't broke..."

---

## Changelog Format

When you customize PM OS for your team, document your changes in `execution/improvement_proposals/` with the naming convention `YYYY-MM-DD_CustomChanges_[description].md`. This makes it easy to track what's yours vs. upstream when merging future updates.

---

**Related**: `pm-os-template/README.md`, `pm-os-template/MULTI_USER_GUIDE.md`
**Questions?**: Run `/pm-os-quality-audit` to verify your PM OS is healthy after any upgrade.
