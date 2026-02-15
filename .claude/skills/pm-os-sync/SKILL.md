---
name: pm-os-sync
description: PM OS MAINTENANCE SKILL — Invoke the Documentation Maintainer to synchronize PM OS meta-documentation. Keeps CLAUDE.md, ROADMAP, phase history, and quality dashboard consistent after agent updates, phase completions, or structural changes. Not for syncing your product documentation.
---

You are running PM OS documentation sync. $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

**Scope**: This skill maintains PM OS's own documentation — phase status, agent versions, cross-references, and system docs. It does NOT sync your product documentation or execution/ artifacts. For product doc work, use the Product Architect or ask directly.

### 1. Identify Sync Trigger
Based on $ARGUMENTS, understand what changed:
- **No argument** → Full cross-reference audit of all meta-docs
- **"after phase [N]"** → Update all docs to reflect phase N completion
- **"agent update: [name]"** → Propagate agent version change across all references
- **"new skill: [name]"** → Ensure new skill is documented in CLAUDE.md, QUICK_START.md, and skills inventory
- **"structural change: [description]"** → Audit all cross-references for broken paths

### 2. Audit Cross-References
Check these files for consistency with the current system state:

| File | What to Verify |
|------|---------------|
| `.claude/CLAUDE.md` | Phase table current, file structure accurate, agent list complete, skills list complete |
| `pm-os-reference/identity/ROADMAP.md` | Phase statuses correct, completed phases have actual dates/durations |
| `pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md` | Phase rows match ROADMAP, deliverable counts accurate |
| `README.md` | Current phase referenced, skills list current |
| `QUICK_START.md` | Skills invocation examples current, no references to deleted files |
| `VALIDATION_CHECKLIST.md` | Tests reflect current architecture |

### 3. Identify Stale References
Flag any:
- Phase status marked "planned" that is now complete
- File paths that no longer exist (agent renamed, file moved)
- Version numbers not updated after agent edits
- Skills listed that don't exist in `.claude/skills/`
- Skills in `.claude/skills/` not documented anywhere

### 4. Propose or Apply Updates
For each stale reference found:
- **Minor updates** (version numbers, dates, status) → apply directly
- **Structural changes** (section rewrites, new sections) → propose with before/after diff, confirm with user before writing

Default: **propose, don't auto-apply** unless user passes "apply" in $ARGUMENTS.

### 5. Verify Skills Inventory
Specifically audit the skills layer after any phase involving skill creation:
- List all directories in `.claude/skills/`
- Verify each has a `SKILL.md` with valid frontmatter (`name` and `description`)
- Confirm all skills are referenced in `.claude/CLAUDE.md` skills section
- Flag any skills missing from QUICK_START.md invocation guide

### 6. Summary
Report:
- Files audited
- Stale references found (count by file)
- Updates applied vs. proposed
- Any broken paths that need human resolution
