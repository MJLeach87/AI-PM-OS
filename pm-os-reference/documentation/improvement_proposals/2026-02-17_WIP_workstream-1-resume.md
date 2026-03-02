# PM OS Workstream 1 — Resume Reference
**Created**: 2026-02-17 | **Status**: ✅ COMPLETE — 2026-02-18
**Source plan**: `execution/improvement_proposals/2026-02-16_work-plan.md` (the full plan)

---

## Session Progress

### Completed This Session
- ✅ Task list created (Tasks #1–8 in Claude Code task tracker)
- ✅ Read: `pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md` (already current as of 2026-02-15)
- ✅ Read: `pm-os-reference/identity/ROADMAP.md` (has duplicate `---` separator at lines 417-418)
- ✅ Read: `execution/improvement_proposals/2026-02-15_Confluence-Jira-Update-Reference.md`
- ✅ Read: `.claude/skills/pm-os-quality-audit/SKILL.md`
- ❌ MCP connection failed before any Jira/Confluence writes

### Nothing Changed Yet
No files modified, no Jira stories created. Resuming session starts from scratch on all work items.

---

## Resume Checklist (Execute in This Order)

### TIER 0 — Create 3 Jira Stories (First Action)
Cloud ID: `d1d9d612-3182-4d76-ad10-bce2f315b8f3`
Project: `PMOS`
Epic parent: `PMOS-59` (E9 — Phase 8 epic)

**Story 1: Slack Integration Assessment**
```
Type: Story
Summary: Evaluate Slack MCP options for PM OS team coordination
Priority: Medium
Parent/Epic: PMOS-59
Description:
Slack MCP was deferred from Phase 4 (Atlassian Rovo provided sufficient value).
Evaluate whether Slack integration adds meaningful value for Phase 8 team coordination.

Scope:
- Assess official Atlassian Slack integration vs. third-party MCP options
- Evaluate free tier limitations vs. paid tier value
- Determine if Rovo MCP covers team coordination needs adequately
- Produce: use/no-use decision + implementation plan if warranted

Acceptance Criteria:
- [ ] Decision document: Slack MCP yes/no with rationale
- [ ] If yes: implementation plan with auth setup and skill update
- [ ] Jira story updated with decision outcome
```

**Story 2: Snowflake MCP Integration**
```
Type: Story
Summary: Stand up Snowflake MCP connection (prerequisite for PMOS-65)
Priority: Medium
Parent/Epic: PMOS-59
Description:
Snowflake MCP was deferred from Phase 4 (better fit with Data Intelligence phase).
Required as prerequisite for PMOS-65 (automated data quality scoring).

Scope:
- Auth setup (OAuth or key-pair auth)
- Query testing with Data Analyst skill
- Data Analyst SKILL.md update: add Snowflake query patterns
- Add to .mcp.json

Acceptance Criteria:
- [ ] Snowflake connection in .mcp.json
- [ ] Data Analyst SKILL.md updated with Snowflake context
- [ ] Test query executes successfully
- [ ] PMOS-65 unblocked
```

**Story 3: Google Workspace Expansion (Docs, Slides, Sheets)**
```
Type: Story
Summary: Execute Google Workspace MCP expansion — Docs, Slides, Sheets
Priority: Low
Parent/Epic: PMOS-59
Description:
Complete implementation plan exists at:
pm-os-reference/documentation/2026-02-04_Phase-4.3-Google-Workspace-Expansion.md
(425-line plan covering Docs creation, Slides template gen, Sheets dashboards)

Google Drive MCP is already operational (Phase 1). This story extends it.

Scope:
- Docs: create PM OS document templates
- Slides: generate presentation artifacts from PRD content
- Sheets: dashboard creation via Sheets API

Acceptance Criteria:
- [ ] Implementation plan executed per reference document
- [ ] Google Workspace operations documented in mcp/setup_guides/
- [ ] Link this story to pm-os-reference/documentation/2026-02-04_Phase-4.3-Google-Workspace-Expansion.md
```

---

### TIER 1 — Documentation Fixes (All XS)

#### PMOS-88 (IP-001): Quality Dashboard Update
**Finding**: Dashboard was already updated 2026-02-15 with Phase 4-7 data.
**Remaining work**:
1. Add "dashboard update" as required success criterion in Phase 8 entry of `pm-os-reference/identity/ROADMAP.md` (currently missing from the `[ ]` criteria list)
2. Update pm-os-quality-audit SKILL.md: add "dashboard update required at phase close" note to Step 6
3. Update IP-001 status in dashboard from "✅ Implemented" to confirm step 2 done

#### PMOS-90 (IP-003): Fix ROADMAP.md Duplicate
**File**: `pm-os-reference/identity/ROADMAP.md`
**Issue**: Duplicate `---` separator at lines 416-418 (two consecutive `---` with blank line between them, just before ROADMAP-002 section)
**Fix**: Remove one of the duplicate separators

#### PMOS-91 (IP-004): Clear ROADMAP-001 Pending Markers
**File**: `pm-os-reference/documentation/ROADMAP-001_IMPLEMENTATION_SUMMARY.md` (NOT yet read — read this first)
**Issue**: Plan says 5 ⏳ markers exist in "Documentation Updates" section
**Action**: Read the file, find ⏳ markers, mark ✅ with date or convert to tasks

#### PMOS-93 (F1): Update Confluence Architecture Overview
**Content ready in**: `execution/improvement_proposals/2026-02-15_Confluence-Jira-Update-Reference.md` (already read)
**Confluence page**: Search for "PM OS Architecture Overview" in space PM
**Replace**: Any `.claude/agents/` references with the 11-skill table from the reference doc
**Note**: Reference doc shows 10 skills but SKILL.md and CLAUDE.md show 11 — verify count before posting

#### PMOS-94 (F2): Create Confluence Changelog Entry
**Content ready in**: `execution/improvement_proposals/2026-02-15_Confluence-Jira-Update-Reference.md`
**Action**: Create or update Confluence Changelog page with 2026-02-15 agent retirement entry
**Parent page**: 1212417 (PM OS - Operations) or search for existing Changelog

---

### TIER 1B — CC Best Practices Quick Wins

#### 1. Trim CLAUDE.md to ≤150 lines
**File**: `.claude/CLAUDE.md`
**Current**: 154 lines (4 over)
**Action**: Read and condense — the routing table and identity section can be compressed

#### 2. Plan Mode Guidance
**File**: `pm-os-reference/documentation/PARALLEL_WORKFLOWS.md`
**Add**: "When to Use Plan Mode" section — rule: for any skill triggering multi-agent work or cross-skill orchestration, enter plan mode first

#### 3. Document --resume + Context Tracking
**File**: `identity/README.md`
**Add**: "PM OS Workflow Tips" section covering:
- `--resume` for session recovery
- Status line setup
- `--max-turns` for controlled execution
- `/compact` threshold guidance

#### 4. Commit Pattern in Skills
**File**: `.claude/skills/release-check/SKILL.md`
**Add**: "Commit after task completion" reminder to the workflow
Also add to `pm-os-reference/documentation/PARALLEL_WORKFLOWS.md`

---

### TIER 2 — System Health

#### PMOS-89 (IP-002): Extend Quality Audit Publishing
**File**: `.claude/skills/pm-os-quality-audit/SKILL.md`
**Current Step 6b**: Only publishes for phase-specific arguments (e.g., "Phase 7")
**Change**: Publish for ALL invocations
**New title pattern**: `Quality Audit: [scope] – YYYY-MM-DD`
**Parent page**: `1212417` (PM OS - Operations)

#### PMOS-92 (IP-005): Action Confluence/Jira Update Reference
**Already done**: Jira story for agent retirement is in backlog
**Remaining**: PMOS-93 (F1) + PMOS-94 (F2) above cover the Confluence updates

---

### TIER 3 — pm-os-reference Cleanup

#### Create archive/ directory
`pm-os-reference/documentation/archive/`

#### Files to move to archive/
1. `pm-os-reference/documentation/2026-02-02_Phase-4-Implementation-Plan.md` → `archive/`
2. `pm-os-reference/documentation/2026-02-03_Phase-4-Granular-Implementation-Plan.md` → `archive/`

#### ROADMAP-001 deprecation
**File**: `pm-os-reference/documentation/ROADMAP-001_IMPLEMENTATION_SUMMARY.md`
**Action**: Add deprecation header at top, then move to `phase-evolution/` subfolder
**Header to add**:
```
> **ARCHIVED**: This document reflects Phase 3 state (2026-02-02).
> For current state, see pm-os-reference/documentation/phase-history/
> Last active: 2026-02-02
```

#### validation-reports/ README
**File**: `pm-os-reference/documentation/validation-reports/README.md` (create new)
**Content**:
```
# Validation Reports — Historical Archive
These are Phase 0-3 QA test records. No longer updated after Phase 3.
For current quality metrics, see ../QUALITY_METRICS_DASHBOARD.md
```

#### Google Workspace plan — keep, link to Tier 0 Jira story
`pm-os-reference/documentation/2026-02-04_Phase-4.3-Google-Workspace-Expansion.md`
No change needed — just ensure the new Jira story links to it.

---

### TIER 1B Priority 2 — Context7 + Mermaid

#### Add Context7 to .mcp.json
```json
"context7": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp@latest"]
}
```

#### Update engineering-partner SKILL.md
1. Add: "If Context7 is available, use it to validate API/library recommendations before including them in feasibility assessments"
2. Add Mermaid diagram offer to output options: "Would you like a Mermaid architecture diagram for this system?"

#### Update PARALLEL_WORKFLOWS.md
Add Mermaid as a "diagramming pattern" (no separate MCP needed — Mermaid renders in GitHub/Confluence)

---

### TIER 1B Priority 3 — PERMISSIONS_GUIDE.md

**Create**: `mcp/setup_guides/PERMISSIONS_GUIDE.md`
**Contents**:
- Fine-grained `/permissions` setup for PM OS
- Per-skill minimum required permissions table
- Read-only defaults; write only for Confluence publish / Jira writes
- Sandbox mode guidance: when to use (exploration, research) vs full permissions (Confluence publish, Jira writes)

---

### TIER 1B Priority 4 — Plugin Packaging Evaluation

This is M-effort — do after all other tiers complete.
See full plan in `execution/improvement_proposals/2026-02-16_work-plan.md` (Plugin Packaging section).
**Deliverables**: ADR + pm-os-template/ prototype + 3 subagent .md files + hooks.json

---

## Key Reference Data

| Item | Value |
|------|-------|
| Cloud ID | `d1d9d612-3182-4d76-ad10-bce2f315b8f3` |
| Space key | `PM` |
| PRD/Feature parent page | `1048577` |
| Discovery parent page | `1146881` |
| Phase Reports parent page | `1179649` |
| Operations parent page | `1212417` |
| Phase 8 epic | `PMOS-59` |
| Full work plan | `execution/improvement_proposals/2026-02-16_work-plan.md` |
| Confluence/Jira content reference | `execution/improvement_proposals/2026-02-15_Confluence-Jira-Update-Reference.md` |

## Files Still to Read Before Executing

- `pm-os-reference/documentation/ROADMAP-001_IMPLEMENTATION_SUMMARY.md` — for PMOS-91
- `.claude/CLAUDE.md` — for CLAUDE.md trim (1B)
- `pm-os-reference/documentation/PARALLEL_WORKFLOWS.md` — for plan mode + Mermaid additions
- `identity/README.md` — for workflow tips addition
- `.claude/skills/release-check/SKILL.md` — for commit reminder
- `.claude/skills/engineering-partner/SKILL.md` — for Context7 + Mermaid update
- `.mcp.json` — for Context7 addition
- `pm-os-reference/documentation/IMPLEMENTATION_STATUS.md` — verify Phase 7 state
