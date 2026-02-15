---
name: pm-os-doc-sync
description: PM OS MAINTENANCE SKILL — Documentation sync for PM OS meta-documentation. Keeps CLAUDE.md, ROADMAP, phase history, and quality dashboard consistent after agent updates, phase completions, or structural changes. Not for syncing your product documentation.
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

### 6b. Save Sync Report
Save a record of this sync run to:
`execution/improvement_proposals/YYYY-MM-DD_DocSync_[trigger].md`

Where `[trigger]` is a slug of the sync trigger (e.g., `full-audit`, `after-phase-7`, `new-skill-release-check`).

Contents: sync trigger, files audited, stale references found, updates applied, proposed changes (if any), broken paths.

### 7. Publish to Confluence
Publish the sync report to the PM OS Confluence space using the idempotency pattern:

1. **CQL search**: `title = "Doc Sync: [trigger description]"` AND `space = "PM"`
   - Cloud ID: `d1d9d612-3182-4d76-ad10-bce2f315b8f3`
2. **If found** → call `updateConfluencePage` with the existing page ID
3. **If not found** → call `createConfluencePage` under parent page ID `1212417` (PM OS - Operations)
4. **Confirm**: State the published page title and URL to the user
