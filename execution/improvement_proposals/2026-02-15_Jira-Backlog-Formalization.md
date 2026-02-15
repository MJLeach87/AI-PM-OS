# PM OS Jira Backlog — Formalization Draft

**Date**: 2026-02-15
**Type**: Mode B — PM OS Self-Improvement
**Status**: APPROVED — Ready to Action in Jira
**Prepared By**: PM OS Orchestrator
**Sources**: ROADMAP.md (Phases 0–8), improvement proposals (IPs 1–5), Confluence-Jira reference, git status

> **Instructions**: Review all items below. After approval, action in a Rovo-enabled session.
> No Jira changes have been made yet — this is a read-only planning artifact.

---

## Part 1: Jira Taxonomy

### 1.1 Epic Structure

| # | Epic Title | Phase | Status | Jira Action |
|---|-----------|-------|--------|-------------|
| E1 | PM OS Bootstrap Foundation | Phase 0 | Done | Confirm exists via JQL |
| E2 | PM OS Core Agent Team + Google Drive MCP | Phase 1 | Done | Confirm exists via JQL |
| E3 | PM OS Execution Layer | Phase 2 | Done | Confirm exists via JQL |
| E4 | PM OS Self-Improvement Loop | Phase 3 | Done | Confirm exists via JQL |
| E5 | PM OS MCP Integration Suite | Phase 4 | Done | Confirm exists via JQL |
| E6 | PM OS Claude Code Skills Migration | Phase 5 | Done | Confirm exists via JQL |
| E7 | PM OS Data Intelligence Layer | Phase 6 | Done | **Create if missing** |
| E8 | PM OS Claude Code Advanced Workflows | Phase 7 | Done | **Create if missing** |
| E9 | PM OS Enterprise Readiness | Phase 8 | Open | **Create** |
| E10 | PM OS Maintenance & Continuous Improvement | Cross-cutting | Open | **Create** |

**JQL to confirm existing epics**:
```jql
project = PMOS AND issuetype = Epic ORDER BY created ASC
```

### 1.2 Label Conventions

| Label | Usage |
|-------|-------|
| `phase-6` | Stories belonging to Phase 6 scope |
| `phase-7` | Stories belonging to Phase 7 scope |
| `phase-8` | Stories belonging to Phase 8 scope |
| `maintenance` | Non-phase ongoing work under Maintenance Epic |
| `improvement-proposal` | Items originating from quality audit IPs 1–5 |
| `architecture` | ADRs, structural decisions, agent/skills changes |
| `skills` | Work in `.claude/skills/` |
| `templates` | Work in `templates/` |
| `mcp-integration` | Atlassian, Google Drive, or other MCP work |
| `identity-layer` | Changes to `identity/` files |
| `documentation` | Doc-only changes (no code changes) |
| `deferred` | Items explicitly deferred from a prior phase |
| `inter-phase` | Cleanup work between two phases |

### 1.3 Component Conventions

| Component | Codebase Path |
|-----------|--------------|
| `Identity Layer` | `identity/` |
| `Skills Layer` | `.claude/skills/` |
| `Templates` | `templates/` |
| `MCP Integrations` | `mcp/` |
| `Execution Layer` | `execution/` |
| `Documentation` | `pm-os-reference/documentation/` |
| `Security & Automation` | `scripts/`, `.github/` |

---

## Part 2: Backlog Items

> Format per item:
> - **Type** | **Title** | **Epic** | **Labels** | **Component** | **Priority** | **Status**
> - **Description**: 2–3 sentences
> - **Acceptance Criteria**: Gherkin-style where applicable

---

### Section A — Phase 6: Data Intelligence Layer

**Items A1–A5 go under Epic E7 (Data Intelligence Layer)**

---

#### A1. Create identity/DATA_DICTIONARY.md
- **Type**: Story | **Epic**: E7 | **Labels**: `phase-6`, `identity-layer` | **Component**: Identity Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Added the fourth identity layer file — `identity/DATA_DICTIONARY.md` — containing schema definitions, metric formulas, and instrumentation status template. This file serves as the single source of truth for all data definitions used in PM OS metric validation workflows.
- **Acceptance Criteria**:
  ```
  Given the identity/ directory
  When a user invokes /data-analyst or /prd
  Then DATA_DICTIONARY.md is available as required context
  And the file contains schema definitions and metric formulas
  ```

---

#### A2. Create templates/metrics_validation_template.md
- **Type**: Story | **Epic**: E7 | **Labels**: `phase-6`, `templates` | **Component**: Templates
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Created a standardized metrics validation report template. The template provides consistent format for baseline data gathering, goal-setting, and validation results across all PRD and feature pipeline workflows.
- **Acceptance Criteria**:
  ```
  Given a metrics validation request
  When the /data-analyst skill runs a validation
  Then the output follows the metrics_validation_template.md format
  ```

---

#### A3. Data Analyst agent v2.1 — DATA_DICTIONARY as required context
- **Type**: Story | **Epic**: E7 | **Labels**: `phase-6`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Upgraded `/data-analyst` SKILL.md to v2.1. DATA_DICTIONARY.md elevated from optional to required context; metrics_validation_template.md linked. Data Analyst now performs DATA_DICTIONARY-first lookup before generating any SQL or metric queries.
- **Acceptance Criteria**:
  ```
  Given the /data-analyst skill is invoked
  When the agent loads context
  Then identity/DATA_DICTIONARY.md is loaded as required (not optional)
  And metrics_validation_template.md is referenced in Step 3
  ```

---

#### A4. /prd skill Step 8 — Metrics validation offer
- **Type**: Story | **Epic**: E7 | **Labels**: `phase-6`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Updated the `/prd` SKILL.md to add Step 8: after PRD generation, explicitly offer to run a metrics validation pass using the Data Analyst skill. This closes the loop between PRD success criteria and quantified baselines.
- **Acceptance Criteria**:
  ```
  Given the /prd skill completes a PRD
  When Step 8 executes
  Then the user is offered a metrics validation option
  And the offer references /data-analyst and metrics_validation_template.md
  ```

---

#### A5. Automated data quality scoring (deferred — requires Snowflake MCP)
- **Type**: Story | **Epic**: E10 (Maintenance) | **Labels**: `phase-6`, `deferred`, `mcp-integration` | **Component**: MCP Integrations
- **Priority**: Low | **Status**: Open
- **Description**: Automated data quality scoring was scoped in Phase 6 but deferred pending Snowflake MCP integration. Once Snowflake is connected (Phase 8+), the Data Analyst should auto-generate quality scores on DATA_DICTIONARY fields during each audit run.
- **Acceptance Criteria**:
  ```
  Given the Snowflake MCP is active
  When /data-analyst runs a quality audit
  Then a quality score is computed for each field in DATA_DICTIONARY.md
  And scores are persisted to QUALITY_METRICS_DASHBOARD.md
  ```

---

### Section B — Phase 7: Claude Code Advanced Workflows

**Items B1–B6 go under Epic E8 (Advanced Workflows)**

---

#### B1. Create templates/ab_test_analysis_template.md
- **Type**: Story | **Epic**: E8 | **Labels**: `phase-7`, `templates` | **Component**: Templates
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Created the A/B test analysis template (deferred from Phase 6). Provides a complete framework for structuring A/B test hypotheses, instrumentation plans, statistical significance thresholds, and results interpretation. The template is linked from the Data Analyst SKILL.md v2.2.
- **Acceptance Criteria**:
  ```
  Given an A/B test analysis request
  When /data-analyst generates an analysis
  Then the output follows ab_test_analysis_template.md structure
  ```

---

#### B2. Create templates/domain_specialist_template.md
- **Type**: Story | **Epic**: E8 | **Labels**: `phase-7`, `templates` | **Component**: Templates
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Created the domain specialist framework template for building vertical domain agents (payments, healthcare, B2B SaaS, etc.). The template provides a reusable structure for domain-specific context files, reducing time-to-first-output for new verticals.
- **Acceptance Criteria**:
  ```
  Given a new vertical domain requirement
  When a user follows the domain_specialist_template.md guide
  Then they can generate a functional domain specialist in one session
  ```

---

#### B3. Create pm-os-reference/documentation/PARALLEL_WORKFLOWS.md
- **Type**: Story | **Epic**: E8 | **Labels**: `phase-7`, `documentation` | **Component**: Documentation
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Documented 5 named parallel processing patterns for Claude Code multi-agent workflows (Discovery+PRD, PRD+Specialists, Audit+Sync, etc.). Includes a velocity impact table showing 50–75% time savings vs sequential execution. Invocation templates provided for each pattern.
- **Acceptance Criteria**:
  ```
  Given a complex feature workflow
  When a PM reads PARALLEL_WORKFLOWS.md
  Then they can identify which named pattern applies
  And invoke agents in parallel using the provided template
  ```

---

#### B4. /feature-pipeline skill — [PARALLEL] notation
- **Type**: Story | **Epic**: E8 | **Labels**: `phase-7`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Updated `/feature-pipeline` (formerly `/feature`) SKILL.md to add explicit `[PARALLEL]` notation for Steps 2+3 (Engineering + UX) and Steps 4+5 (Data Analyst + GTM Strategist). PARALLEL_WORKFLOWS.md linked. Users can now invoke the pipeline knowing which steps can execute concurrently.
- **Acceptance Criteria**:
  ```
  Given the /feature-pipeline skill is invoked
  When Steps 2–5 are described
  Then Steps 2 and 3 are marked [PARALLEL]
  And Steps 4 and 5 are marked [PARALLEL]
  And PARALLEL_WORKFLOWS.md is referenced
  ```

---

#### B5. Data Analyst v2.2 — A/B template + PARALLEL_WORKFLOWS
- **Type**: Story | **Epic**: E8 | **Labels**: `phase-7`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Upgraded `/data-analyst` SKILL.md to v2.2. Added link to `ab_test_analysis_template.md` in the A/B analysis step; added reference to `PARALLEL_WORKFLOWS.md` for compound metric queries. Maintains backward compatibility with v2.1 DATA_DICTIONARY requirement.
- **Acceptance Criteria**:
  ```
  Given /data-analyst v2.2 is active
  When an A/B analysis is requested
  Then the output uses ab_test_analysis_template.md
  And PARALLEL_WORKFLOWS.md is referenced for compound analysis steps
  ```

---

#### B6. Skills expansion evaluation — no new skills decision
- **Type**: Story | **Epic**: E8 | **Labels**: `phase-7`, `architecture` | **Component**: Skills Layer
- **Priority**: Low | **Status**: Done ✅
- **Description**: Conducted a skills expansion evaluation as part of Phase 7 scope. Decision: no new skills warranted at this time. All proposed capabilities (domain specialist, parallel orchestration) are achievable via CLAUDE.md ambient routing + existing 10 skills + the domain_specialist_template.md framework. Decision documented in Phase 7 phase history.
- **Acceptance Criteria**:
  ```
  Given the Phase 7 evaluation
  When skills expansion is assessed
  Then the decision and rationale are documented in PHASE_7_ADVANCED_WORKFLOWS.md
  And no new SKILL.md files were created (10 skills total)
  ```

---

### Section C — Inter-Phase: Agent Retirement

**Items C1–C3 go under Epic E6 (Skills Migration) or E10 (Maintenance). Recommend E6 as this completes Phase 5's scope.**

---

#### C1. Retire all .claude/agents/ files — skills-only architecture
- **Type**: Story | **Epic**: E6 | **Labels**: `architecture`, `inter-phase` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Deleted all 9 remaining `.claude/agents/` files (4 in inter-phase cleanup, 5 in Phase 5). Files retired: orchestrator.md (539 lines), system_evaluator.md (669 lines), documentation_maintainer.md (455 lines), api_doc_reviewer.md (616 lines). Skills are now the sole canonical source.
- **Acceptance Criteria**:
  ```
  Given the .claude/agents/ directory
  When all agent retirement actions are complete
  Then .claude/agents/ is empty
  And all 10 .claude/skills/ SKILL.md files are present and functional
  And no agent references remain in active documentation
  ```

---

#### C2. Update CLAUDE.md as ambient orchestrator and routing authority
- **Type**: Story | **Epic**: E6 | **Labels**: `documentation`, `architecture` | **Component**: Documentation
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Rewrote `.claude/CLAUDE.md` from 516 lines to 152 lines as the ambient orchestrator. Now contains the canonical skills routing table, Mode A/B guidance, and two-mode operating model. All agent references removed. This is the sole routing file.
- **Acceptance Criteria**:
  ```
  Given CLAUDE.md is loaded as Claude Code context
  When a user request arrives
  Then Claude routes to the correct skill via the routing table in CLAUDE.md
  And no .claude/agents/ references exist in the file
  ```

---

#### C3. ADR: 2026-02-15_ADR_Skills-Only-Architecture.md
- **Type**: Story | **Epic**: E6 | **Labels**: `documentation`, `architecture` | **Component**: Documentation
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Created Architecture Decision Record documenting the skills-only architecture decision. ADR covers context (dual-track costs), decision (skills as sole layer), rationale (100% Claude Code usage confirmed), and consequences (no maintenance overhead for agent files). Stored in `pm-os-reference/documentation/`.
- **Acceptance Criteria**:
  ```
  Given the ADR file exists at pm-os-reference/documentation/2026-02-15_ADR_Skills-Only-Architecture.md
  When someone reviews the architecture decision
  Then the ADR clearly explains why agent files were retired
  And references Phase 5 skills migration as the precursor decision
  ```

---

### Section D — Phase 8: Enterprise Readiness

**Items D1–D6 go under Epic E9 (Enterprise Readiness)**

---

#### D1. Multi-user Git workflow
- **Type**: Story | **Epic**: E9 | **Labels**: `phase-8`, `architecture` | **Component**: Security & Automation
- **Priority**: High | **Status**: Open
- **Description**: Design and implement multi-user Git collaboration model: CODEOWNERS file, branch protection rules for `main`, merge conflict resolution conventions for `identity/` files, and PM-specific branching strategy (feature branches per session or PM).
- **Acceptance Criteria**:
  ```
  Given 5+ PMs using PM OS concurrently
  When multiple PMs commit changes
  Then CODEOWNERS enforces review requirements
  And branch protection prevents direct pushes to main
  And the conventions document resolves identity/ conflicts deterministically
  ```

---

#### D2. Security hardening — SOC 2 readiness assessment
- **Type**: Story | **Epic**: E9 | **Labels**: `phase-8`, `architecture` | **Component**: Security & Automation
- **Priority**: High | **Status**: Open
- **Description**: Conduct SOC 2 readiness gap assessment against PM OS as-is architecture. Identify gaps in access control, audit logging, data handling, and secret management. Produce a gap report and remediation plan. Focus on controls relevant to PM tooling (not full SOC 2 audit).
- **Acceptance Criteria**:
  ```
  Given the SOC 2 readiness assessment is complete
  When the gap report is reviewed
  Then all critical gaps (P0) are remediated before Phase 8 close
  And medium gaps (P1) have a tracked remediation plan
  And zero security incidents occur during Phase 8
  ```

---

#### D3. Onboarding documentation and training
- **Type**: Story | **Epic**: E9 | **Labels**: `phase-8`, `documentation` | **Component**: Documentation
- **Priority**: High | **Status**: Open
- **Description**: Create PM OS onboarding guide targeting < 2-hour setup time for a new PM. Covers: prerequisites, Claude Code setup, `.env` configuration, first skill invocation, and Mode A vs Mode B orientation. Optionally includes a recorded walkthrough or annotated examples.
- **Acceptance Criteria**:
  ```
  Given a new PM with no prior PM OS experience
  When they follow the onboarding guide
  Then they can invoke their first skill within 2 hours
  And the guide covers all required configuration steps
  And at least one worked example is included
  ```

---

#### D4. Web application prototype (optional)
- **Type**: Story | **Epic**: E9 | **Labels**: `phase-8`, `skills` | **Component**: Skills Layer
- **Priority**: Low | **Status**: Open
- **Description**: Build a web prototype demonstrating PM OS PRD generation with feature parity to the CLI experience. Target: React/Tailwind, read-only demonstration of PM OS skill flows. Useful for stakeholder demos and recruiting (shows PM OS capabilities visually).
- **Acceptance Criteria**:
  ```
  Given the web prototype is running
  When a stakeholder views a PRD generation demo
  Then the output matches CLI feature parity
  And the prototype is deployable via the standard PM OS setup process
  ```

---

#### D5. Deployment automation
- **Type**: Story | **Epic**: E9 | **Labels**: `phase-8`, `architecture` | **Component**: Security & Automation
- **Priority**: Medium | **Status**: Open
- **Description**: Create a repeatable, scripted PM OS installation and configuration process. Should handle: dependency installation, `.env` setup wizard, MCP credential configuration, and first-run validation. Target: zero manual steps beyond providing credentials.
- **Acceptance Criteria**:
  ```
  Given a new machine with Node.js and Claude Code installed
  When the deployment automation script runs
  Then PM OS is fully configured in a single command
  And all MCPs connect successfully
  And a validation test confirms skills are functional
  ```

---

#### D6. Quality dashboard update — Phase 8 success criteria gate
- **Type**: Story | **Epic**: E9 | **Labels**: `phase-8`, `documentation`, `improvement-proposal` | **Component**: Documentation
- **Priority**: High | **Status**: Open
- **Description**: As part of Phase 8 success criteria (implementing IP-001 process fix), update the Quality Metrics Dashboard at Phase 8 close. This story enforces the new policy: phase closeout requires a dashboard update AND a Confluence publish of the latest audit report.
- **Acceptance Criteria**:
  ```
  Given Phase 8 is complete
  When the phase closeout checklist runs
  Then QUALITY_METRICS_DASHBOARD.md is updated to reflect Phase 8 state
  And a Phase 8 completion report is published to Confluence PM OS - Phase Reports
  And the dashboard update is required (not optional) for phase closure
  ```

---

### Section E — Improvement Proposals (IPs)

**Items E1–E5 go under Epic E10 (Maintenance & Continuous Improvement)**

---

#### E1. IP-001: Enforce quality dashboard update at phase closeout
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `improvement-proposal`, `documentation` | **Component**: Documentation
- **Priority**: High | **Status**: Open
- **Description**: Root cause: dashboard update is not required in phase closeout criteria. Phases 4–7 all closed without triggering a dashboard update. Fix: add "Update quality dashboard" as explicit success criterion in Phase 8 ROADMAP.md entry, add a note to pm-os-quality-audit SKILL.md prompting dashboard update for all phase closeout invocations. (Dashboard manually updated during 2026-02-15 audit; this story enforces the policy going forward.)
- **Acceptance Criteria**:
  ```
  Given Phase 8 completes in the future
  When the pm-os-quality-audit skill runs for phase closeout
  Then the quality dashboard is updated as a required step (not optional)
  And the Phase 8 ROADMAP.md success criteria include this requirement
  ```

---

#### E2. IP-002: Extend quality audit publishing to non-phase runs
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `improvement-proposal`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Open
- **Description**: Currently, Step 6b in the pm-os-quality-audit SKILL.md only triggers Confluence publish when `$ARGUMENTS` contains a phase reference. Regular audits leave no Confluence evidence trail. Fix: extend Step 6b to publish for all invocations with a scope-appropriate title (phase report vs. targeted audit vs. full audit).
- **Acceptance Criteria**:
  ```
  Given /pm-os-quality-audit is invoked with no arguments
  When Step 6b executes
  Then a Confluence page is created at parent 1212417 (PM OS - Operations)
  With title "Quality Audit: Full System – YYYY-MM-DD"

  Given /pm-os-quality-audit is invoked with "agents" argument
  When Step 6b executes
  Then a Confluence page is created with title "Quality Audit: agents – YYYY-MM-DD"
  ```

---

#### E3. IP-003: Fix ROADMAP.md dependency chain duplicate
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `improvement-proposal`, `documentation` | **Component**: Documentation
- **Priority**: Low | **Status**: Open
- **Description**: The dependency chain diagram in `pm-os-reference/identity/ROADMAP.md` contains duplicate entries — "Phase 7 → Phase 8" appears twice. Flagged by the 2026-02-15 release-check. A clean linear chain from Phase 0 → Future is correct.
- **Acceptance Criteria**:
  ```
  Given pm-os-reference/identity/ROADMAP.md
  When the dependency chain is reviewed
  Then Phase 7 → Phase 8 appears exactly once
  And the chain flows linearly with no duplicate entries
  ```

---

#### E4. IP-004: Clear ⏳ pending markers in ROADMAP-001 evolution tracking
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `improvement-proposal`, `documentation` | **Component**: Documentation
- **Priority**: Low | **Status**: Open
- **Description**: ROADMAP-001 "Documentation Updates" section lists 5 files with ⏳ pending markers. README.md, QUICK_START.md, and CLAUDE.md were updated in later phases but the markers were never cleared. Remaining items should be verified and marked ✅ or removed.
- **Acceptance Criteria**:
  ```
  Given the ROADMAP-001 Documentation Updates list
  When all ⏳ markers are reviewed
  Then completed items are marked ✅ with completion date
  And any genuinely remaining items are converted to standalone tasks
  And no ⏳ markers remain in the list
  ```

---

#### E5. IP-005: Action Jira/Confluence Update Reference items
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `improvement-proposal`, `mcp-integration` | **Component**: MCP Integrations
- **Priority**: Low | **Status**: Open
- **Description**: `execution/improvement_proposals/2026-02-15_Confluence-Jira-Update-Reference.md` contains 3 Jira and 2 Confluence items from the inter-phase agent retirement that haven't been actioned. In a Rovo-enabled session: create the agent retirement story (Ticket 2), update the Confluence Architecture Overview, and add the Confluence Changelog entry. (Note: This backlog formalization effort itself is the parent action for this IP.)
- **Acceptance Criteria**:
  ```
  Given a Rovo-enabled session
  When IP-005 is executed
  Then PMOS ticket for agent retirement is created and set to Done
  Then Confluence Architecture Overview reflects skills-only table
  Then Confluence Changelog has 2026-02-15 entry for agent retirement
  ```

---

### Section F — Confluence Auto-Publish (Partially Complete)

**Items F1–F2 go under Epic E10 (Maintenance)**

---

#### F1. Update Confluence Architecture Overview — skills-only table
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `documentation`, `mcp-integration` | **Component**: Documentation
- **Priority**: Low | **Status**: Open
- **Description**: The Confluence Architecture Overview page still references `.claude/agents/` as an active directory. Replace with the skills-only table (10 skills + CLAUDE.md routing). Content ready in `execution/improvement_proposals/2026-02-15_Confluence-Jira-Update-Reference.md`.
- **Acceptance Criteria**:
  ```
  Given the Confluence PM OS Architecture Overview page
  When updated
  Then .claude/agents/ is described as EMPTY
  And the 10-skill routing table is present
  And ADR-003 is linked
  ```

---

#### F2. Create Confluence Changelog entry — 2026-02-15 agent retirement
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `documentation`, `mcp-integration` | **Component**: Documentation
- **Priority**: Low | **Status**: Open
- **Description**: Create a changelog entry in the Confluence PM OS Changelog page for the 2026-02-15 agent retirement. Full entry text is available in `execution/improvement_proposals/2026-02-15_Confluence-Jira-Update-Reference.md`.
- **Acceptance Criteria**:
  ```
  Given the Confluence PM OS Changelog page
  When the entry is added
  Then a "2026-02-15 — Skills-Only Architecture (Agent Retirement)" entry exists
  And the entry describes what changed, why, and the impact
  ```

---

### Section G — Mode B Skills: Confluence Auto-Publish (Completed)

**Items G1–G3 go under Epic E10 (Maintenance)**

---

#### G1. pm-os-quality-audit: Confluence auto-publish for phase closeout
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Added Step 6b to the pm-os-quality-audit SKILL.md: when invoked with a phase argument, automatically publishes the audit report to Confluence parent page 1179649 (PM OS - Phase Reports). This closes the loop between audit runs and Confluence knowledge base.
- **Acceptance Criteria**:
  ```
  Given /pm-os-quality-audit is invoked with a phase argument
  When Step 6b executes
  Then a Confluence page is created at parent 1179649
  With the phase completion report content
  ```

---

#### G2. pm-os-doc-sync: Confluence auto-publish for doc sync reports
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Added Confluence publish step to the pm-os-doc-sync SKILL.md. After a sync run, the doc sync report is published to Confluence parent page 1212417 (PM OS - Operations). Maintains a Confluence record of all sync activity.
- **Acceptance Criteria**:
  ```
  Given /pm-os-doc-sync is invoked
  When the sync report is generated
  Then the report is published to Confluence at parent 1212417
  With title "Doc Sync Report – YYYY-MM-DD"
  ```

---

#### G3. release-check: Confluence auto-publish for release check reports
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Done ✅
- **Description**: Added Confluence publish step to the release-check SKILL.md. After a release check run, the report is published to Confluence parent page 1212417 (PM OS - Operations). Ensures all pre-push deep reviews are persisted for audit trail.
- **Acceptance Criteria**:
  ```
  Given /release-check is invoked
  When the release check report is generated
  Then the report is published to Confluence at parent 1212417
  With title "Release Check Report – YYYY-MM-DD"
  ```

---

### Section H — Mode B Infrastructure: GitHub Actions & Scripts

> **Note**: H1 and H2 are committed. H3 and H4 (`scripts/confluence-sync.js` and
> `scripts/confluence-sync-manifest.json`) are untracked and will be committed alongside
> this artifact. Mark H3/H4 as Done in Jira after that commit.

**Items H1–H4 go under Epic E10 (Maintenance)**

---

#### H1. GitHub Actions: Monthly Audit Reminder (audit-reminder.yml)
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `architecture` | **Component**: Security & Automation
- **Priority**: Medium | **Status**: Done ✅ *(committed — commit `7a8cd85`)*
- **Description**: Created `.github/workflows/audit-reminder.yml` — a GitHub Actions workflow that auto-triggers on the 1st of each month. Creates a GitHub Issue titled "Monthly PM OS Quality Audit Due" AND a Jira story in PMOS for each occurrence. Ensures the monthly audit cadence is enforced without manual tracking.
- **Acceptance Criteria**:
  ```
  Given the 1st day of any month
  When the audit-reminder workflow triggers
  Then a GitHub Issue is created with "Monthly PM OS Quality Audit Due" title
  And a Jira story is created in PMOS project
  And the workflow file is committed to main branch
  ```

---

#### H2. GitHub Actions: Confluence Weekly Sync (confluence-sync.yml)
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `mcp-integration` | **Component**: Security & Automation
- **Priority**: Medium | **Status**: Done ✅ *(committed — commits `142b008`, `6be0d05`)*
- **Description**: Created `.github/workflows/confluence-sync.yml` — triggers on push to `main` AND on a weekly schedule. Syncs all 11 skills (SKILL.md files) and execution artifacts to Confluence using the `scripts/confluence-sync.js` script. Ensures Confluence remains current with the codebase.
- **Acceptance Criteria**:
  ```
  Given a push to main branch or weekly schedule trigger
  When confluence-sync.yml runs
  Then all SKILL.md files are synced to their Confluence counterparts
  And execution artifacts in the manifest are updated
  And the workflow completes without error
  ```

---

#### H3. Confluence Sync Script (scripts/confluence-sync.js)
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `mcp-integration` | **Component**: Security & Automation
- **Priority**: Medium | **Status**: Done ✅ *(pending git commit — will be committed with this backlog artifact)*
- **Description**: Created `scripts/confluence-sync.js` — a Node.js script using the Atlassian REST API directly (not MCP) to sync local markdown files to Confluence pages. Reads page mappings from `scripts/confluence-sync-manifest.json` and uses `ATLASSIAN_API_TOKEN` environment variable.
- **Acceptance Criteria**:
  ```
  Given scripts/confluence-sync.js is executed
  When a file in the manifest has changed since last sync
  Then the corresponding Confluence page is updated via REST API
  And the script exits 0 on success
  And errors are logged with actionable messages
  ```

---

#### H4. Confluence Sync Manifest (scripts/confluence-sync-manifest.json)
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `mcp-integration` | **Component**: Security & Automation
- **Priority**: Medium | **Status**: Done ✅ *(pending git commit — will be committed with this backlog artifact)*
- **Description**: Created `scripts/confluence-sync-manifest.json` — page ID mapping for all 11 skills and execution directory sync targets. Maps local file paths to Confluence page IDs for automated sync. Required by `scripts/confluence-sync.js`.
- **Acceptance Criteria**:
  ```
  Given scripts/confluence-sync-manifest.json is present
  When confluence-sync.js reads the manifest
  Then all 11 SKILL.md paths are mapped to correct Confluence page IDs
  And the manifest is committed to main branch
  ```

---

### Section I — Google Doc: Future Enhancements Ideas

> **Source**: Google Doc "Future Enhancements" tab (accessed 2026-02-15 via Drive API)
>
> **Curation note**: Items already implemented (e.g., Documentation Maintainer = /pm-os-doc-sync,
> Jira tracking = current effort, Confluence automation = H1–H4, phasing revision = ROADMAP-001)
> are excluded. Reference links and SaaS/commercial scope items are noted but not drafted as
> actionable tickets unless they have a clear next action.

**Items I1–I8 go under Epic E10 (Maintenance). Items I9–I12 go under Epic E9 (Phase 8).**

---

#### I1. Mermaid lifecycle diagram for PM OS
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `documentation` | **Component**: Documentation
- **Priority**: Low | **Status**: Open
- **Description**: Create a Mermaid diagram showing the PM OS lifecycle — Phase 0 → current → Phase 8, with Mode A and Mode B branches. Add to README.md or a dedicated architecture diagram page. Useful for onboarding and stakeholder communication.
- **Acceptance Criteria**:
  ```
  Given README.md or ARCHITECTURE.md
  When a new PM views the PM OS documentation
  Then a Mermaid diagram shows the full phase progression
  And Mode A (product work) vs Mode B (self-improvement) are visually distinguished
  ```

---

#### I2. Discovery skill: expand beyond OST to additional artifact types
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `skills` | **Component**: Skills Layer
- **Priority**: Medium | **Status**: Open
- **Description**: The `/discovery` skill currently centers on Opportunity Solution Trees. The Google Doc backlog notes "other discovery artifacts" — e.g., customer journey maps, Jobs-to-be-Done canvases, assumption maps, and problem statements. Expand the skill's Step menu to offer these as optional outputs.
- **Acceptance Criteria**:
  ```
  Given /discovery is invoked
  When the user selects an artifact type
  Then OST is available (existing)
  And at least 2 additional discovery artifact types are offered
  And each artifact follows a corresponding template in templates/
  ```

---

#### I3. Fix discovery template vs PRD template location inconsistency
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `documentation`, `templates` | **Component**: Templates
- **Priority**: Low | **Status**: Open
- **Description**: The Google Doc notes "template location inconsistent with PRD." Discovery-related templates may be stored or referenced inconsistently relative to PRD templates. Audit template paths referenced in `/discovery` and `/prd` SKILL.md files, resolve inconsistencies, and update references.
- **Acceptance Criteria**:
  ```
  Given templates/ directory
  When /discovery and /prd skills reference templates
  Then all template paths are consistent (same naming convention and directory)
  And no broken template references exist in either SKILL.md
  ```

---

#### I4. Identity layer expansion — branding, Help Center context
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `identity-layer` | **Component**: Identity Layer
- **Priority**: Low | **Status**: Open
- **Description**: The current identity layer (STRATEGY.md, STANDARDS.md, ROADMAP.md, DATA_DICTIONARY.md) is focused on product strategy and data. The Google Doc backlog suggests expanding to: brand voice guidelines, help center/knowledge base context, and processes for keeping identity docs updated (e.g., auto-refresh prompts after roadmap changes). Create a fifth identity template and update identity/README.md.
- **Acceptance Criteria**:
  ```
  Given identity/ directory
  When expanded
  Then a BRAND_CONTEXT.md template exists with brand voice, tone, and messaging guidelines
  And identity/README.md explains when and how to update each file
  And /prd and /gtm-strategist reference BRAND_CONTEXT.md as optional context
  ```

---

#### I5. Presentation generation — templates and skill capability
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `templates`, `skills` | **Component**: Templates
- **Priority**: Low | **Status**: Open
- **Description**: The Google Doc backlog identifies presentation generation as a future capability: Product Brief, Executive Summary, Release Notes, Help Center/KB Guide, and Project Kickoff. Initial scope: create markdown templates for each, evaluate Marp (markdown-to-slides) integration. python-pptx is noted as an option but requires Python setup.
- **Acceptance Criteria**:
  ```
  Given a PM needs to create a presentation
  When they invoke /prd or /product-architect with a presentation flag
  Then a structured markdown template (Marp-compatible) is offered
  And at least one template exists for: Executive Summary, Release Notes
  ```

---

#### I6. UX Strategist — OOUX methodology integration
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `skills` | **Component**: Skills Layer
- **Priority**: Low | **Status**: Open
- **Description**: Object-Oriented UX (OOUX) is a structured methodology for defining objects, attributes, and relationships before designing interfaces. The `/ux-strategist` skill currently focuses on React/Tailwind prototypes and IA. Add an OOUX artifact type to the skill's offering — Object Map generation from a PRD or discovery artifact.
- **Acceptance Criteria**:
  ```
  Given /ux-strategist is invoked
  When the user selects "OOUX Object Map"
  Then the skill generates an Object Map with objects, attributes, calls-to-action, and relationships
  And the output follows the OOUX methodology (Sophia Prater framework)
  ```

---

#### I7. Cagan Product Model — identity and template integration
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `identity-layer`, `templates` | **Component**: Identity Layer
- **Priority**: Low | **Status**: Open
- **Description**: Marty Cagan's Product Model (empowered teams, continuous discovery, outcome over output) is foundational PM philosophy. The Google Doc references this via SVPG. Add a Product Model alignment section to `identity/STRATEGY.md` template and a Cagan-aligned product principles template under `templates/`.
- **Acceptance Criteria**:
  ```
  Given identity/STRATEGY.md
  When customized by a new PM
  Then a "Product Model Principles" section is available (optional)
  And the section prompts for outcome-over-output framing
  And a templates/product_principles_template.md exists for reference
  ```

---

#### I8. Competitive market research capability
- **Type**: Story | **Epic**: E10 | **Labels**: `maintenance`, `skills` | **Component**: Skills Layer
- **Priority**: Low | **Status**: Open
- **Description**: The Google Doc backlog includes competitor evaluation and industry domain/subdomain analysis as PM OS capabilities. The `/gtm-strategist` already handles battle cards, but a dedicated market research artifact (competitor landscape, industry landscape) would add value. Evaluate extending `/gtm-strategist` vs. creating a standalone market research template.
- **Acceptance Criteria**:
  ```
  Given /gtm-strategist is invoked for market research
  When a competitor evaluation is requested
  Then the skill produces a structured competitor landscape artifact
  And includes PM OS as a subject if evaluating the system itself
  ```

---

#### I9. New integrations evaluation — Figma, Pendo, Heap, Fullstory, Datadog
- **Type**: Story | **Epic**: E9 | **Labels**: `phase-8`, `mcp-integration` | **Component**: MCP Integrations
- **Priority**: Low | **Status**: Open
- **Description**: The Google Doc backlog identifies five integration candidates: Figma (design files into UX Strategist context), Pendo/Heap/Fullstory (product analytics into Data Analyst context), and Datadog (engineering observability). Phase 8 should produce an integration evaluation matrix: prioritize by PM workflow impact, MCP availability, and auth complexity.
- **Acceptance Criteria**:
  ```
  Given Phase 8 planning
  When the integration evaluation is complete
  Then each of the 5 candidates has a priority rating (High/Medium/Low/Defer)
  And the top 1–2 integrations have an implementation plan
  And the evaluation is documented in execution/improvement_proposals/
  ```

---

#### I10. End-user authorization setup guide — OAuth for new PM onboarding
- **Type**: Story | **Epic**: E9 | **Labels**: `phase-8`, `mcp-integration`, `documentation` | **Component**: MCP Integrations
- **Priority**: Medium | **Status**: Open
- **Description**: The Google Doc notes "How to Enable End User Authorization / Setup / Client Secret Store" as a future need. Currently, each PM must manually configure OAuth credentials (Google Drive, Atlassian). Phase 8 onboarding should include a step-by-step OAuth setup wizard or script that handles credential bootstrapping for new PMs.
- **Acceptance Criteria**:
  ```
  Given a new PM following the onboarding guide
  When they reach the MCP credential setup step
  Then a guided script or wizard walks them through OAuth setup
  And credentials are stored in .env without manual token exchange
  And setup time for all MCPs is under 30 minutes
  ```

---

#### I11. Identity layer rename consideration — "identity" vs "context"
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `architecture`, `identity-layer` | **Component**: Identity Layer
- **Priority**: Low | **Status**: Open
- **Description**: The Google Doc suggests renaming the `identity/` directory to `context/` for clarity. This is an architectural decision with non-trivial file path update impact across CLAUDE.md, all SKILL.md files, and templates. Create an ADR to document the tradeoffs before acting.
- **Acceptance Criteria**:
  ```
  Given the identity/ rename consideration
  When an ADR is created
  Then the ADR weighs: naming clarity (context/ more intuitive?) vs. migration cost
  And a decision is recorded with rationale
  And if approved, all references are updated atomically in one commit
  ```

---

#### I12. SaaS version assessment — ChatPRD competitive analysis
- **Type**: Task | **Epic**: E10 | **Labels**: `maintenance`, `documentation` | **Component**: Documentation
- **Priority**: Low | **Status**: Open
- **Description**: The Google Doc backlog notes a "SaaS Version" consideration and references ChatPRD as a comparable product. Before Phase 8 (Enterprise Readiness) closes, assess the feasibility of a PM OS SaaS offering — what would it take to productize PM OS for external teams? Produces a brief competitive analysis and go/no-go recommendation.
- **Acceptance Criteria**:
  ```
  Given the SaaS version assessment
  When complete
  Then ChatPRD and 1–2 other competitors are documented
  And a go/no-go framing for PM OS as a product is produced
  And the assessment is stored in execution/improvement_proposals/
  ```

---

## Part 3: Pre-Action Checklist

Before creating any Jira items, verify the following in a Rovo-enabled session:

### Step 1: Confirm Existing Epics (JQL)
```jql
project = PMOS AND issuetype = Epic ORDER BY created ASC
```
- Map result to E1–E6 in the taxonomy table above
- Note actual PMOS epic ticket numbers for cross-referencing

### Step 2: Commit Remaining Untracked Files
H1 and H2 (.github/ workflows) are already committed. H3 and H4 still need committing:
```bash
git add scripts/confluence-sync.js
git add scripts/confluence-sync-manifest.json
git add execution/improvement_proposals/2026-02-15_Jira-Backlog-Formalization.md
git commit -m "Add Confluence sync script, manifest, and Jira backlog formalization artifact"
```

### Step 3: Create Missing Epics
Based on JQL results, create any of E7–E10 that don't exist:
- E7: Phase 6 Data Intelligence Layer (Done)
- E8: Phase 7 Advanced Workflows (Done)
- E9: Phase 8 Enterprise Readiness (Open)
- E10: PM OS Maintenance & Continuous Improvement (Open, cross-cutting)

### Step 4: Create Stories in Order
Recommended creation order:
1. Completed stories (Done status) first: A1–A4, B1–B6, C1–C3, G1–G3, H1–H4
2. Deferred/open maintenance: A5, E1–E5, F1–F2
3. Phase 8 open: D1–D6

### Step 5: Verify Against ROADMAP.md
Cross-reference final Jira item count against `pm-os-reference/identity/ROADMAP.md` phase deliverables to confirm nothing is missed.

---

## Part 4: Summary Count

| Section | Items | Status |
|---------|-------|--------|
| A — Phase 6 | 5 items (4 Done, 1 deferred) | ✅ Confirmed vs ROADMAP.md |
| B — Phase 7 | 6 items (all Done) | ✅ Confirmed vs ROADMAP.md |
| C — Inter-Phase | 3 items (all Done) | ✅ Confirmed vs ROADMAP.md |
| D — Phase 8 | 6 items (all Open) | ✅ Confirmed vs ROADMAP.md |
| E — Improvement Proposals | 5 items (all Open) | ✅ From 2026-02-15_Proposals_full-system.md |
| F — Confluence (pending) | 2 items (all Open) | ✅ From Confluence-Jira-Update-Reference.md |
| G — Mode B Skills | 3 items (all Done) | ✅ Confirmed — Confluence auto-publish complete |
| H — Infrastructure | 4 items (Done, pending commit) | ⚠️ Untracked in git — commit before Done |
| I — Google Doc | 12 items (all Open) | ✅ Accessed via Drive API 2026-02-15 |
| **Total** | **46 items** | |

**Epics to create**: 4 (E7–E10)
**Epics to confirm**: 6 (E1–E6 via JQL)
**Stories/tasks to create in Jira**: 46 items total

---

**Artifact Status**: DRAFT — Awaiting User Review
**Next Action**: User reviews and approves → action in Rovo-enabled session
**Created**: 2026-02-15
**Owner**: PM OS Orchestrator
