# Confluence & Jira Update Reference: Skills-Only Architecture

**Date**: 2026-02-15
**Type**: Jira ticket + Confluence page content for manual creation
**Context**: Rovo MCP not callable in current session; use this document to action updates manually or in a Rovo-enabled session.

---

## Jira Updates

### Epic to Update or Create

**Epic**: PM OS Architecture Evolution
**Project**: PMOS (or your project key)

---

### Ticket 1: Close/Complete — Skills Migration (Phase 5)

**Action**: Mark existing Phase 5 epic/story as complete with amendment note

**Ticket Title**: `[PMOS] Phase 5: Skills Migration — Complete (with Phase 5 Addendum)`

**Update Comment to Add**:
```
2026-02-15 Addendum: Phase 5 skills migration is now fully complete.

The remaining 4 agent files (orchestrator.md, system_evaluator.md, documentation_maintainer.md, api_doc_reviewer.md) were retired on 2026-02-15. Skills are now the sole canonical implementation layer.

.claude/agents/ is now empty.

ADR: pm-os-reference/documentation/2026-02-15_ADR_Skills-Only-Architecture.md
Phase history: pm-os-reference/documentation/phase-history/PHASE_5_ADDENDUM_Agent-Retirement_2026-02-15.md
```

**Status Change**: Set to Done/Closed if previously open.

---

### Ticket 2: New Story — Agent Retirement (Cleanup)

**Action**: Create new story under Phase 5 Epic or as standalone

**Ticket**:
```
Title: [PMOS] Retire all .claude/agents/ files — skills-only architecture

Type: Story
Priority: Medium
Labels: architecture, cleanup, skills-migration
Sprint: (backlog or current)

Description:
Completed the agent retirement that Phase 5 began. All 4 remaining .claude/agents/ files
deleted. Skills (.claude/skills/) are now the sole canonical source for all specialist
capabilities.

Deleted files:
- orchestrator.md (539 lines) → covered by .claude/CLAUDE.md routing
- system_evaluator.md (669 lines) → covered by /pm-os-audit skill
- documentation_maintainer.md (455 lines) → covered by /pm-os-sync skill
- api_doc_reviewer.md (616 lines) → covered by /engineering-partner skill

Active docs updated (7 files): CLAUDE.md, QUICK_START.md, VALIDATION_CHECKLIST.md,
README.md, agent_spec_template.md, domain_specialist_template.md, identity/README.md

pm-os-reference meta-recursive docs created:
- ADR: 2026-02-15_ADR_Skills-Only-Architecture.md
- Phase history: PHASE_5_ADDENDUM_Agent-Retirement_2026-02-15.md

Acceptance Criteria:
✅ .claude/agents/ empty
✅ All 10 skills present and functional
✅ No stale agent references in active docs
✅ Changes committed and pushed to GitHub
```

**Status**: Done

---

### Ticket 3: Update Phase 8 Epic (If Exists)

**Action**: Add note that skills-only architecture is pre-Phase 8 cleanup (resolved before Phase 8 begins)

**Comment to Add**:
```
Pre-Phase 8 cleanup complete (2026-02-15):
- Agent retirement: .claude/agents/ now empty
- Skills-only architecture confirmed
- No architectural debt carried into Phase 8

Phase 8 can start with clean architecture. See ROADMAP.md inter-phase section.
```

---

## Confluence Updates

### Page to Update: PM OS Architecture Overview

**Location**: PM OS Space > Architecture

**Current content to find**: Any reference to `.claude/agents/` as active directory

**Replace with**:
```
## Agent Architecture (Updated 2026-02-15)

PM OS uses a skills-only architecture:

- `.claude/skills/` — 10 skills, canonical source for all specialist capabilities
- `.claude/CLAUDE.md` — Ambient orchestrator; handles routing, identity context injection
- `.claude/agents/` — EMPTY (all agent files retired 2026-02-15)

Specialist skills available:
| Slash Command | Role |
|--------------|------|
| /product-architect | Discovery, PRD, OST, agent spec creation |
| /engineering-partner | Feasibility, security (STRIDE/OWASP), API contracts, BPMN |
| /ux-strategist | React/Tailwind prototypes, IA, user flows, accessibility |
| /data-analyst | SQL, metrics validation, A/B test analysis |
| /gtm-strategist | Positioning, value props, battle cards, pricing |
| /discovery | Full OST + discovery artifact pipeline |
| /prd | BMAD PRD generation (with metrics validation at step 8) |
| /feature | End-to-end feature workflow (supports parallel notation) |
| /pm-os-audit | PM OS quality audit |
| /pm-os-sync | PM OS documentation sync |

ADR: [Link to 2026-02-15_ADR_Skills-Only-Architecture.md in GitHub]
```

---

### Page to Create: PM OS Changelog (or update existing)

**Location**: PM OS Space > Changelog

**New entry to add**:
```
## 2026-02-15 — Skills-Only Architecture (Agent Retirement)

**Type**: Architectural cleanup (inter-phase, between Phase 7 and Phase 8)

**Changes**:
- Deleted all 4 remaining .claude/agents/ files
- .claude/agents/ is now empty
- Skills (.claude/skills/) are the sole canonical implementation layer
- QUICK_START.md updated to v2.0 with all 10 skills documented
- 7 active docs cleaned of stale agent references

**Why**:
Phase 5 (2026-02-14) created 10 skills but left 4 agent files as "partial matches."
Review confirmed CLAUDE.md handles orchestration and all skills cover specialist capabilities.
Retiring agent files eliminates maintenance overhead with no user-facing regression.

**Impact**: None — all capabilities preserved via skills. Zero regressions.

**Decision record**: ADR-003 — 2026-02-15_ADR_Skills-Only-Architecture.md
```

---

## How to Action These Updates

### Option A: Manual (any session)
1. Log into Jira → PMOS project → create/update tickets above
2. Log into Confluence → PM OS space → update Architecture page and Changelog

### Option B: Rovo MCP (next Rovo-enabled session)
```
# In a Claude Code session where Rovo MCP is working:

Create a Jira story in PMOS:
Title: "[PMOS] Retire all .claude/agents/ files — skills-only architecture"
[paste Ticket 2 content above]

Update Confluence page "PM OS Architecture Overview":
[paste architecture table above]

Create Confluence changelog entry for 2026-02-15:
[paste changelog entry above]
```

### Option C: Verify Rovo MCP availability
```bash
# Check if Rovo MCP is configured
cat .mcp.json

# Then test in Claude Code:
# "Search Jira for PM OS skills migration ticket"
# If it works, Rovo MCP is live in this session
```

---

**Document Owner**: PM
**Created**: 2026-02-15
**Action Required**: Create Jira tickets and update Confluence pages using content above
**Priority**: Low (architectural record-keeping; system fully functional without it)
