---
name: release-check
description: PM OS MAINTENANCE SKILL — Deep pre-push review for PM OS updates. Checks documentation currency (skills inventory vs CLAUDE.md), commit message quality, phase alignment, and PII in artifacts. The bash hook (scripts/pre-push) handles automated security and hygiene on every push — run this skill for deeper periodic review after major changes or phase completions.
---

You are running a PM OS pre-push deep review. $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

**Scope**: This skill performs Claude-powered checks that the automated bash hook (`scripts/pre-push`) cannot do — documentation currency, commit quality, phase alignment, and PII scanning. Run this after completing a phase, before a major structural change, or monthly.

**Note**: The bash hook (`scripts/pre-push`) already runs on every push and handles: .env tracking, secret patterns, merge conflict markers, and junk files. Do not re-check those here.

---

### 1. Documentation Currency Check

**Goal**: Confirm the skills inventory matches CLAUDE.md.

- Glob `.claude/skills/` and list all subdirectories (each should have a `SKILL.md`)
- Read `.claude/CLAUDE.md` and extract the skills list from the "Skills Layer" section
- Compare: flag any skill directory not mentioned in CLAUDE.md, and any CLAUDE.md entry with no matching directory

Report as:
- ✅ Skill directories match CLAUDE.md
- ⚠️ [skill-name] — in CLAUDE.md but no directory found
- ⚠️ [skill-name] — directory exists but not in CLAUDE.md

---

### 2. Commit Message Quality Check

**Goal**: Ensure recent commits have descriptive messages (not single words like "fix", "update", "wip").

- Run: last 5 commit messages
- Flag messages that are: fewer than 5 words, purely generic ("update", "fix", "wip", "changes"), or lack context about what changed

Report as:
- ✅ All recent commits are descriptive
- ⚠️ Commit [hash]: "[message]" — too generic, consider amending before push

---

### 3. Phase Alignment Check

**Goal**: Confirm CLAUDE.md current phase header matches ROADMAP.md completed phases.

- Read CLAUDE.md header: extract stated current phase and status
- Read `pm-os-reference/identity/ROADMAP.md`: check which phases are marked complete
- Flag if CLAUDE.md claims a phase is complete that ROADMAP.md still shows as planned, or vice versa

Report as:
- ✅ CLAUDE.md phase (Phase N) matches ROADMAP.md
- ❌ Mismatch: CLAUDE.md says [X], ROADMAP.md says [Y] — update one to match

---

### 4. PII Scan in Execution Artifacts

**Goal**: Check `execution/` artifacts for PII-like patterns before pushing.

Scan all files in `execution/` for:
- Email addresses: `\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b`
- Phone numbers: patterns like `\d{3}[-.\s]\d{3}[-.\s]\d{4}` or `\(\d{3}\)\s*\d{3}`
- Names that appear in context suggesting real user data (subjective — flag for human review if uncertain)

Report as:
- ✅ No PII patterns found in execution/
- ⚠️ Potential PII in [file]: [excerpt] — review before pushing

---

### 5. Summary Report

Present a final table:

| Check | Status | Action Required |
|-------|--------|----------------|
| Documentation currency | ✅ / ⚠️ / ❌ | [detail or "none"] |
| Commit message quality | ✅ / ⚠️ | [detail or "none"] |
| Phase alignment | ✅ / ❌ | [detail or "none"] |
| PII scan | ✅ / ⚠️ | [detail or "none"] |

**Overall**: ✅ Ready to push / ⚠️ Review recommended / ❌ Fix required before push

If any ❌ items: list specific fixes required before the push proceeds.
If only ⚠️ items: user decides whether to proceed.

---

### 6. Save & Publish (conditional)

**Only proceed with steps 6a and 6b if**:
- Overall status is ⚠️ or ❌ (there is something to act on), **OR**
- The user explicitly requested a saved record (e.g., passed a phase argument like "Phase 8" or "save")

If all checks are ✅ with no action items, **skip steps 6a and 6b entirely** — do not create a file or publish to Confluence.

#### 6a. Save Release Check Report
Save a record of this review to:
`execution/improvement_proposals/YYYY-MM-DD_ReleaseCheck_[ref].md`

Where `[ref]` is a phase reference if applicable (e.g., `phase-7`), otherwise today's date (e.g., `2026-02-15`).

Contents: scope, all four check results with detail, overall status, required actions (if any).

#### 6b. Publish to Confluence
Publish the release check report to the PM OS Confluence space using the idempotency pattern:

1. **CQL search**: `title = "Release Check: [phase or date ref]"` AND `space = "PM"`
   - Cloud ID: `d1d9d612-3182-4d76-ad10-bce2f315b8f3`
2. **If found** → call `updateConfluencePage` with the existing page ID
3. **If not found** → call `createConfluencePage` under parent page ID `1212417` (PM OS - Operations)
4. **Confirm**: State the published page title and URL to the user
