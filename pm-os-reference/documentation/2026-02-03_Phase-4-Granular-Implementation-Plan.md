# Phase 4 (Revised): MCP Integration Suite - Google Workspace Focus

**Created**: 2026-02-03
**Status**: Planning
**Estimated Duration**: 7 days (Jira 2d + Confluence 2d + Google Workspace 3d)

---

## Executive Summary

Phase 4 will integrate **3 external tools** via Model Context Protocol:
1. **Jira** - Issue tracking with retrospective PM OS issues
2. **Confluence** - Documentation publishing with search-before-create
3. **Google Workspace** - Expand beyond Drive to include **Docs, Slides, Sheets** creation/editing

**Key Innovation**: Meta-recursive synthetic data using PM OS's own Phases 0-3 development history.

**Strategic Deferrals**:
- **Slack** → Phase 7-8 (Productivity Apps alongside Notion, Linear)
- **Snowflake** → Phase 5 (Data Intelligence Layer with dedicated analytics focus)

**Why Google Workspace First**: Slides and Sheets are foundational PM documents (executive reviews, phase retrospectives, stakeholder presentations, velocity tracking). Building this capability now enables PM OS to self-document visually.

---

## ⚠️ IMPORTANT: Tool Stack Flexibility

**These integrations are OPTIONAL and contingent on YOUR product management tool stack.**

This plan uses **Jira + Confluence + Google Workspace** as reference implementations, but PM OS is designed to work with ANY PM stack:

**Alternative Stacks Supported**:
- **Issue Tracking**: Linear, Azure DevOps, GitHub Issues, Monday.com, Asana
- **Documentation**: Notion, Microsoft SharePoint, Coda, GitBook
- **Document Creation**: Microsoft Office 365 (Word, PowerPoint, Excel), Apple iWork, Notion

**How to Adapt This Plan**:
1. **Identify Your Stack**: What tools does your team actually use?
2. **Check MCP Availability**: Does the tool have an MCP server? (See https://github.com/modelcontextprotocol/servers)
3. **Substitute Integrations**: Replace Jira with Linear, Confluence with Notion, Google Workspace with Microsoft 365, etc.
4. **Keep Core Patterns**: The implementation patterns (search-before-create, auto-generation, multi-platform sync) apply to ANY stack

**If You Don't Use These Tools**:
- **Skip Phase 4 entirely**: Move to Phase 5 (Data Intelligence) or Phase 6 (IDE Optimization)
- **Implement different MCPs**: Use this plan as a template for YOUR tools
- **Use local files only**: PM OS works perfectly with markdown files in `execution/` - no cloud integrations required

**This Plan's Scope**: Documents implementation for Jira/Confluence/Google Workspace as a **reference architecture**. All patterns, workflows, and agent upgrades are tool-agnostic and can be adapted to your stack.

---

## Revised Phase 4 Objectives

1. **Integrate 3 MCP Services**: Jira, Confluence, Google Workspace
2. **Unified OAuth Management**: Reuse Google Drive patterns, share Atlassian OAuth (Jira+Confluence)
3. **Synthetic Data Creation**: Populate services with PM OS Phases 0-3 data
4. **Auto-Generation Workflows**: PRD → Slides summary, Phase completion → Retrospective deck
5. **Search-Before-Create Pattern**: Agents search existing docs before creating new ones
6. **Agent Integration**: Product Architect, Engineering Partner, Data Analyst, System Evaluator upgrades

---

## Phase 4 Scope Changes from Original Plan

### ❌ Removed (Deferred)

**Slack MCP** → Phase 7-8 (Productivity Apps):
- **Reason**: Requires paid plan for meaningful integrations (free tier too limited)
- **Future Context**: Bundle with Notion, Linear, other productivity tools for unified workflow
- **Value Preserved**: Notifications can use email/in-app until then

**Snowflake MCP** → Phase 5 (Data Intelligence):
- **Reason**: Better fit with Data Intelligence Layer's analytics focus
- **Future Context**: Phase 5 includes data dictionary, metric automation, SQL generation
- **Value Preserved**: Can use Google Sheets for basic metrics tracking in Phase 4

### ✅ Added

**Google Workspace Expansion** (beyond Drive):
- **Google Docs**: Create/edit PRDs, specs, agent specs (not just read)
- **Google Slides**: Auto-generate PRD summaries, phase retrospectives, roadmap decks
- **Google Sheets**: Velocity tracker, agent scorecard, OKR dashboard
- **Search-Before-Create**: Agents search existing docs to avoid duplicates, cite sources

---

## Synthetic Data Strategy (PM OS Self-Documentation)

### Overview

Use PM OS's own development (Phases 0-3) as realistic test data for all 3 MCPs.

**Benefits**:
1. **Realistic**: Mirrors actual enterprise PM work
2. **Complete**: Full artifact lifecycle (discovery → PRD → spec → delivery)
3. **Testable**: Known ground truth (Phase 0 took 1 day, Phase 1 took 2 days, etc.)
4. **Meta-recursive**: PM OS manages its own development via the tools it's building

---

### 1. Jira MCP - Synthetic Issue Data

**Epic Structure** (7 epics = 7 phases):
```
PMOS-EPIC-0: Phase 0 - Bootstrap Foundation
PMOS-EPIC-1: Phase 1 - Core Agent Team + Google Drive MCP
PMOS-EPIC-2: Phase 2 - Execution Layer
PMOS-EPIC-3: Phase 3 - Self-Improvement Loop
PMOS-EPIC-4: Phase 4 - MCP Integration Suite (Google Workspace Focus)
PMOS-EPIC-5: Phase 5 - Data Intelligence Layer
PMOS-EPIC-6: Phase 6 - IDE Optimization
PMOS-EPIC-7: Phase 7 - Enterprise Readiness
```

**Sample Issues for Phase 0** (8 issues):
```
PMOS-1: Create directory structure (18 folders)
  Status: Done | Assignee: Product Architect | Story Points: 1
  Sprint: Phase 0 | Completed: 2026-01-31 | Time: 1h

PMOS-2: Create Identity Layer templates (STRATEGY, STANDARDS, ROADMAP)
  Status: Done | Assignee: Product Architect | Story Points: 3
  Sprint: Phase 0 | Completed: 2026-01-31 | Time: 2h

PMOS-3: Create agent spec template
  Status: Done | Assignee: Product Architect | Story Points: 2
  Sprint: Phase 0 | Completed: 2026-01-31 | Time: 1.5h

PMOS-4: Create PRD template (BMAD-compliant)
  Status: Done | Assignee: Product Architect | Story Points: 2
  Sprint: Phase 0 | Completed: 2026-01-31 | Time: 1.5h

PMOS-5: Create MCP integration plan template
  Status: Done | Assignee: Product Architect | Story Points: 1
  Sprint: Phase 0 | Completed: 2026-01-31 | Time: 1h

PMOS-6: Implement Orchestrator agent (Cursor + Claude versions)
  Status: Done | Assignee: Product Architect | Story Points: 5
  Sprint: Phase 0 | Completed: 2026-01-31 | Time: 2h

PMOS-7: Implement Product Architect agent (Cursor + Claude versions)
  Status: Done | Assignee: Product Architect | Story Points: 5
  Sprint: Phase 0 | Completed: 2026-01-31 | Time: 2h

PMOS-8: Run Phase 0 validation tests (5 scenarios)
  Status: Done | Assignee: Human PM | Story Points: 2
  Sprint: Phase 0 | Completed: 2026-01-31 | Time: 1h
```

**Total Synthetic Issues**: ~25-30 issues covering Phases 0-3 completed work
- Phase 0: 8 issues
- Phase 1: 5 issues (agents + Google Drive MCP)
- Phase 2: 5 issues (Data Analyst + GTM Strategist)
- Phase 3: 7 issues (System Evaluator + Doc Maintainer + metrics dashboard)

**Custom Jira Fields**:
- `pm_os_phase`: Phase 0, 1, 2, 3, etc.
- `agent_owner`: Product Architect, Engineering Partner, etc.
- `artifact_type`: Agent, PRD, Spec, Template, etc.
- `acceptance_rate`: 100% (all passed first time)

---

### 2. Confluence MCP - Synthetic Documentation

**Space Structure**:
```
PM OS Documentation (PMOS)
├── Product Requirements
│   ├── Phase 0 Bootstrap PRD
│   ├── Phase 1 Core Agents PRD
│   ├── Phase 2 Execution Layer PRD
│   └── Phase 3 Self-Improvement PRD
├── Technical Specifications
│   ├── Engineering Partner - Feasibility Assessment Template
│   ├── Engineering Partner - Security Review Template
│   ├── Google Drive MCP OAuth Setup Guide
│   └── Google Workspace MCP Implementation Plan (NEW)
├── Agent Specifications
│   ├── Orchestrator Agent v1.0
│   ├── Product Architect Agent v1.0
│   ├── Engineering Partner Agent v1.2
│   ├── UX Strategist Agent v1.0
│   ├── Data Analyst Agent v1.0
│   ├── GTM Strategist Agent v1.0
│   ├── System Evaluator Agent v1.0
│   └── Documentation Maintainer Agent v1.0
├── Discovery Artifacts
│   ├── Phase 0 Opportunity Solution Tree
│   ├── Phase 1 Implementation Plan
│   └── Phase 3 Self-Improvement OST
├── Phase Reports
│   ├── Phase 0 Completion Report
│   ├── Phase 1 Workflow Validation
│   └── Phase 3 Completion Report
└── Operations
    ├── Quality Metrics Dashboard
    ├── Velocity Tracking
    └── ROADMAP-001 Implementation Summary
```

**Documents to Publish** (~25 pages):
- Existing PRDs from `pm-os-reference/artifacts/prds/`
- Existing specs from `pm-os-reference/artifacts/technical_specs/`
- Agent specs from `.claude/agents/` (convert .md → Confluence)
- Phase completion reports from `pm-os-reference/documentation/phase-history/`
- Quality dashboard, velocity tracking

**Search-Before-Create Pattern**:
- Before creating new page, search Confluence for similar titles
- If found, append version number or reference existing
- Agents cite existing Confluence pages as sources

---

### 3. Google Workspace MCP - Synthetic Document Data (NEW ⭐)

**Google Drive Folder Structure**:
```
PM OS (root folder, already exists from Phase 1)
├── Product Requirements/
│   ├── 2026-01-31_PRD_Artifact-Search-Filter_v0.1.gdoc (NEW)
│   ├── Phase 0 Bootstrap PRD.gdoc (NEW)
│   ├── Phase 1 Core Agents PRD.gdoc (NEW)
│   └── Phase 3 Self-Improvement PRD.gdoc (NEW)
├── Technical Specifications/
│   ├── 2026-02-01_Feasibility_Artifact-Search.gdoc (NEW)
│   ├── 2026-02-01_Implementation_Artifact-Search.gdoc (NEW)
│   └── Google Drive MCP OAuth Setup.gdoc (NEW)
├── Agent Specifications/
│   ├── Orchestrator Agent v1.0.gdoc (NEW)
│   ├── Product Architect Agent v1.0.gdoc (NEW)
│   ├── Engineering Partner Agent v1.2.gdoc (NEW)
│   └── [5 other agents].gdoc
├── Phase Retrospectives/ (NEW ⭐ - Google Slides)
│   ├── Phase 0 Retrospective.gslides (6 slides: title, overview, velocity, challenges, outcomes, next)
│   ├── Phase 1 Retrospective.gslides (7 slides: + agent performance)
│   ├── Phase 2 Retrospective.gslides (7 slides)
│   └── Phase 3 Retrospective.gslides (8 slides: + quality metrics)
├── PRD Summaries/ (NEW ⭐ - Google Slides)
│   ├── Artifact Search Filter - Summary.gslides (5 slides: problem, solution, metrics, approach, timeline)
│   └── [Future PRD summaries]
├── Metrics & Tracking/ (NEW ⭐ - Google Sheets)
│   ├── Velocity Tracker.gsheet (columns: Phase, Est Days, Actual Days, Deliverables, Velocity Multiplier)
│   ├── Agent Scorecard.gsheet (columns: Agent, Version, Artifacts, Acceptance Rate, Avg Time)
│   └── North Star Metrics.gsheet (columns: Metric, Baseline, Target, Current, Status)
└── Roadmap/ (NEW ⭐ - Google Slides)
    └── PM OS 7-Phase Roadmap.gslides (14 slides: overview, 7 phase slides, timeline, metrics, risks, team)
```

**Documents to Create** (~30-35 files):
- **10-12 Google Docs**: PRDs, specs, agent specs (converted from markdown)
- **8-10 Google Slides**: 4 phase retrospectives + roadmap + 3-4 PRD summaries
- **3-5 Google Sheets**: Velocity tracker, agent scorecard, North Star metrics, OKR tracker, risk register

**Auto-Generation Workflows** (⭐ Core Innovation):

**Workflow 1: PRD → Slides Summary**
```
Input: PRD markdown file
Output: 5-slide Google Slides deck

Slide Structure:
1. Title: "[Feature Name] - Product Proposal"
2. Problem Statement: User pain points, current state, opportunity size
3. Solution Overview: Key features, user stories, acceptance criteria
4. Success Metrics: North Star metrics, KPIs, target values
5. Implementation Approach: High-level architecture, phases, timeline

Template: Minimalist design, PM OS brand colors, bullet points only
```

**Workflow 2: Phase Completion → Retrospective Deck**
```
Input: Phase completion report, velocity tracking data
Output: 6-8 slide Google Slides deck

Slide Structure:
1. Title: "Phase [N] Retrospective - [Phase Name]"
2. Overview: Objectives, scope, duration
3. Velocity Analysis: Estimated vs actual (chart), acceleration metrics
4. Deliverables: List with checkmarks, artifact counts
5. Agent Performance: Acceptance rates, avg time, upgrades (chart)
6. Challenges & Learnings: What went well, what to improve
7. Quality Metrics: Gate pass rate, rework rate, strategic alignment
8. Next Phase Preview: Upcoming objectives, dependencies

Template: Data-driven design, charts auto-generated from Sheets
```

**Workflow 3: Phase Completion → Velocity Tracker Update**
```
Input: Phase completion data
Output: New row in Velocity Tracker Google Sheet

Columns:
- Phase ID (0, 1, 2, 3...)
- Phase Name
- Estimated Days
- Actual Days
- Deliverables Completed
- Velocity Multiplier (actual/estimated)
- Completion Date
- Notes

Auto-calculations:
- Average velocity across all phases
- Trend line (improving or declining)
- Phase 4 forecast based on historical data
```

**Search-Before-Create Pattern** (applies to all Google Workspace):
- Before creating Google Doc, search Drive for similar titles
- Before creating Slides, check if phase retrospective already exists
- Before creating Sheet row, check if phase already tracked
- Agents cite existing Google Docs/Slides as sources in new PRDs

---

## Implementation Sequence (Granular Breakdown)

### MCP 1: Jira (Days 1-2) - Issue Tracking Integration

---

#### Day 1: OAuth Setup + Project Configuration (4-6 hours)

**Hour 1-2: OAuth Configuration**

1. **Create Atlassian Developer App**:
   - Go to https://developer.atlassian.com/console/myapps/
   - Create OAuth 2.0 (3LO) app: "PM OS Integration"
   - Set callback URL: `http://localhost:3000/oauth/callback`
   - Request scopes:
     - `read:jira-work` - Read issues, projects, fields
     - `write:jira-work` - Create/update issues
     - `read:jira-user` - Read user information
   - Save credentials to `mcp/credentials/atlassian_oauth.json`:
     ```json
     {
       "client_id": "...",
       "client_secret": "...",
       "auth_uri": "https://auth.atlassian.com/authorize",
       "token_uri": "https://auth.atlassian.com/oauth/token",
       "redirect_uris": ["http://localhost:3000/oauth/callback"],
       "scopes": ["read:jira-work", "write:jira-work", "read:jira-user"]
     }
     ```

2. **Implement OAuth Flow** (`scripts/atlassian_auth.js`):
   ```javascript
   // Key functions:
   // - startAuthServer() - Launch callback server on port 3000
   // - getAuthorizationUrl() - Generate OAuth URL with state parameter
   // - exchangeCodeForTokens() - Exchange auth code for access + refresh tokens
   // - saveTokens() - Save to mcp/credentials/atlassian_token.json
   ```

3. **Test OAuth Flow**:
   ```bash
   node scripts/atlassian_auth.js
   # Opens browser → Authorize PM OS → Callback with code → Tokens saved
   ```

**Hour 2-3: Jira Cloud Setup**

1. **Create Jira Cloud Site**:
   - Go to https://www.atlassian.com/software/jira/free
   - Create site: `pm-os.atlassian.net` (or custom subdomain)
   - Note down Cloud ID (found via `GET /oauth/token/accessible-resources`)

2. **Create PM OS Project**:
   - Project Name: "PM OS"
   - Project Key: "PMOS"
   - Project Type: Scrum (for sprints/epics support)
   - Default Assignee: You

**Hour 3-4: MCP Server Implementation** (`mcp/servers/jira_server.js`)

**Core Functions**:

```javascript
// 1. Connection Test
async function testConnection(accessToken, cloudId) {
  // GET /rest/api/3/myself
  // Returns: { accountId, displayName, emailAddress }
}

// 2. Create Epic
async function createEpic(accessToken, cloudId, epicData) {
  // POST /rest/api/3/issue
  // Body:
  {
    "fields": {
      "project": { "key": "PMOS" },
      "summary": epicData.summary, // e.g., "Phase 0 - Bootstrap Foundation"
      "issuetype": { "name": "Epic" },
      "customfield_10011": epicData.epicName, // Epic Name (custom field ID varies)
      "description": {
        "type": "doc",
        "version": 1,
        "content": [
          { "type": "paragraph", "content": [{ "type": "text", "text": epicData.description }] }
        ]
      }
    }
  }
  // Returns: { id, key, self } - e.g., { key: "PMOS-EPIC-0" }
}

// 3. Create Story/Task
async function createIssue(accessToken, cloudId, issueData) {
  // POST /rest/api/3/issue
  // Body:
  {
    "fields": {
      "project": { "key": "PMOS" },
      "summary": issueData.summary,
      "issuetype": { "name": "Story" }, // or "Task"
      "description": issueData.description, // Jira ADF format
      "parent": { "key": issueData.epicKey }, // Link to epic (e.g., "PMOS-EPIC-0")
      "customfield_xxxxx": issueData.storyPoints, // Story Points (find field ID)
      "labels": issueData.labels, // ["phase-0", "agent-generated"]
      "customfield_10020": issueData.sprint // Sprint (if using Scrum)
    }
  }
  // Returns: { id, key, self }
}

// 4. Bulk Create Issues
async function bulkCreateIssues(accessToken, cloudId, issuesArray) {
  // POST /rest/api/3/issue/bulk
  // Body: { "issueUpdates": [ {...}, {...}, ... ] }
  // Max 50 issues per request
}

// 5. Get Issue
async function getIssue(accessToken, cloudId, issueKey) {
  // GET /rest/api/3/issue/{issueKey}
  // Returns: Full issue object with fields, changelog, etc.
}

// 6. Update Issue
async function updateIssue(accessToken, cloudId, issueKey, updates) {
  // PUT /rest/api/3/issue/{issueKey}
  // Body: { "fields": { "status": {...}, "assignee": {...} } }
}

// 7. Search Issues (JQL)
async function searchIssues(accessToken, cloudId, jql) {
  // GET /rest/api/3/search?jql={jql}&maxResults=100
  // Example JQL: "project=PMOS AND issuetype=Epic"
  // Returns: { issues: [...], total, maxResults }
}
```

**Hour 4-5: Custom Fields Configuration**

**PM OS Custom Fields** (create in Jira UI or via API):

1. **`pm_os_phase`** (Select List - Single Choice):
   - Options: Phase 0, Phase 1, Phase 2, ..., Phase 7
   - Use case: Filter issues by phase

2. **`agent_owner`** (Select List - Single Choice):
   - Options: Product Architect, Engineering Partner, UX Strategist, Data Analyst, GTM Strategist, System Evaluator, Documentation Maintainer, Human PM
   - Use case: Track which agent generated/owns the issue

3. **`artifact_type`** (Select List - Single Choice):
   - Options: Agent, PRD, Spec, Template, Documentation, MCP Integration, Other
   - Use case: Categorize issues by artifact type

4. **`acceptance_rate`** (Number Field):
   - Range: 0-100 (percentage)
   - Use case: Track quality (100% = accepted first time, <100% = rework)

**Find Custom Field IDs**:
```javascript
// GET /rest/api/3/field
// Returns: [{ id: "customfield_10030", name: "pm_os_phase", ... }]
// Store mapping in mcp/config.json for easy reference
```

**Hour 5-6: Connectivity Testing** (`scripts/test_jira.js`)

```javascript
// Test script workflow:
// 1. Load OAuth tokens from mcp/credentials/atlassian_token.json
// 2. Test connection (GET /myself)
// 3. Create test epic: "PMOS-TEST-EPIC"
// 4. Create test issue: "PMOS-TEST-1" linked to test epic
// 5. Update test issue (change status to In Progress)
// 6. Search for test issue using JQL
// 7. Delete test issue
// 8. Delete test epic
// 9. Report: ✅ All tests passed
```

---

#### Day 2: Data Population + Agent Integration (4-6 hours)

**Hour 1-2: Epic Creation (7 epics for 7 phases)**

**Epic Structure**:
```javascript
const epics = [
  {
    key: "PMOS-EPIC-0",
    summary: "Phase 0 - Bootstrap Foundation",
    description: "Establish directory structure, identity layer, templates, and initial agents (Orchestrator, Product Architect)",
    epicName: "Bootstrap Foundation",
    startDate: "2026-01-31",
    dueDate: "2026-01-31",
    status: "Done"
  },
  {
    key: "PMOS-EPIC-1",
    summary: "Phase 1 - Core Agent Team + Google Drive MCP",
    description: "Implement Engineering Partner, UX Strategist agents and integrate Google Drive MCP for legacy doc retrieval",
    epicName: "Core Agent Team",
    startDate: "2026-02-01",
    dueDate: "2026-02-02",
    status: "Done"
  },
  {
    key: "PMOS-EPIC-2",
    summary: "Phase 2 - Execution Layer",
    description: "Add Data Analyst and GTM Strategist agents to complete 5-agent core team",
    epicName: "Execution Layer",
    startDate: "2026-02-02",
    dueDate: "2026-02-02",
    status: "Done"
  },
  {
    key: "PMOS-EPIC-3",
    summary: "Phase 3 - Self-Improvement Loop",
    description: "Implement System Evaluator and Documentation Maintainer for quality audits and doc freshness",
    epicName: "Self-Improvement Loop",
    startDate: "2026-02-02",
    dueDate: "2026-02-03",
    status: "Done"
  },
  {
    key: "PMOS-EPIC-4",
    summary: "Phase 4 - MCP Integration Suite (Google Workspace Focus)",
    description: "Integrate Jira, Confluence, Google Workspace MCPs with auto-generation workflows",
    epicName: "MCP Integration Suite",
    startDate: "2026-02-03",
    dueDate: "2026-02-10",
    status: "In Progress"
  },
  {
    key: "PMOS-EPIC-5",
    summary: "Phase 5 - Data Intelligence Layer",
    description: "Add Snowflake MCP, data dictionary, metric automation, A/B test analysis",
    epicName: "Data Intelligence",
    status: "To Do"
  },
  {
    key: "PMOS-EPIC-6",
    summary: "Phase 6 - IDE Optimization",
    description: "Parallel agent processing, domain specialists, RAG for codebase context",
    epicName: "IDE Optimization",
    status: "To Do"
  },
  {
    key: "PMOS-EPIC-7",
    summary: "Phase 7 - Enterprise Readiness",
    description: "Multi-user support, security hardening, web interface prototype",
    epicName: "Enterprise Readiness",
    status: "To Do"
  }
];

// Create all epics via bulk API
await bulkCreateEpics(epics);
```

**Hour 2-4: Issue Creation (25-30 issues retrospective for Phases 0-3)**

**Phase 0 Issues** (8 issues):
```javascript
const phase0Issues = [
  {
    key: "PMOS-1",
    summary: "Create directory structure (18 folders)",
    description: "Set up PM OS folder hierarchy: .cursor/rules, .claude/agents, identity/, pm-os-reference/, execution/, templates/, mcp/, scripts/",
    epicKey: "PMOS-EPIC-0",
    issuetype: "Task",
    status: "Done",
    assignee: "Product Architect",
    storyPoints: 1,
    labels: ["phase-0", "infrastructure", "agent-generated"],
    customFields: {
      pm_os_phase: "Phase 0",
      agent_owner: "Product Architect",
      artifact_type: "Infrastructure",
      acceptance_rate: 100
    },
    timeSpent: "1h",
    completedDate: "2026-01-31"
  },
  {
    key: "PMOS-2",
    summary: "Create Identity Layer templates (STRATEGY, STANDARDS, ROADMAP)",
    description: "Generate templates for identity/STRATEGY.md, identity/STANDARDS.md, identity/ROADMAP.md with placeholders for user customization",
    epicKey: "PMOS-EPIC-0",
    issuetype: "Story",
    status: "Done",
    assignee: "Product Architect",
    storyPoints: 3,
    labels: ["phase-0", "identity-layer", "agent-generated"],
    customFields: {
      pm_os_phase: "Phase 0",
      agent_owner: "Product Architect",
      artifact_type: "Template",
      acceptance_rate: 100
    },
    timeSpent: "2h",
    completedDate: "2026-01-31"
  },
  // ... (6 more issues for PMOS-3 through PMOS-8)
  // Total: 8 issues for Phase 0
];
```

**Phase 1 Issues** (5 issues):
```javascript
const phase1Issues = [
  {
    key: "PMOS-9",
    summary: "Implement Engineering Partner agent v1.0",
    description: "Create agent for technical feasibility, BPMN modeling, API specs, security reviews",
    epicKey: "PMOS-EPIC-1",
    issuetype: "Story",
    status: "Done",
    assignee: "Product Architect",
    storyPoints: 5,
    labels: ["phase-1", "agent", "engineering"],
    customFields: {
      pm_os_phase: "Phase 1",
      agent_owner: "Product Architect",
      artifact_type: "Agent",
      acceptance_rate: 100
    },
    timeSpent: "3h",
    completedDate: "2026-02-01"
  },
  // ... (4 more issues: UX Strategist, Google Drive MCP, OAuth setup, end-to-end test)
];
```

**Phase 2 Issues** (5 issues):
```javascript
const phase2Issues = [
  {
    key: "PMOS-14",
    summary: "Implement Data Analyst agent v1.0",
    description: "Create agent for SQL queries, metrics validation, A/B test analysis, Snowflake integration",
    epicKey: "PMOS-EPIC-2",
    issuetype: "Story",
    status: "Done",
    assignee: "Product Architect",
    storyPoints: 5,
    labels: ["phase-2", "agent", "data"],
    customFields: {
      pm_os_phase: "Phase 2",
      agent_owner: "Product Architect",
      artifact_type: "Agent",
      acceptance_rate: 100
    },
    timeSpent: "2h",
    completedDate: "2026-02-02"
  },
  // ... (4 more issues: GTM Strategist, templates, validation)
];
```

**Phase 3 Issues** (7 issues):
```javascript
const phase3Issues = [
  {
    key: "PMOS-19",
    summary: "Implement System Evaluator agent v1.0",
    description: "Create meta-agent for quality audits, self-improvement proposals, quality gate enforcement",
    epicKey: "PMOS-EPIC-3",
    issuetype: "Story",
    status: "Done",
    assignee: "Product Architect",
    storyPoints: 8,
    labels: ["phase-3", "agent", "quality"],
    customFields: {
      pm_os_phase: "Phase 3",
      agent_owner: "Product Architect",
      artifact_type: "Agent",
      acceptance_rate: 100
    },
    timeSpent: "4h",
    completedDate: "2026-02-02"
  },
  // ... (6 more issues: Doc Maintainer, quality dashboard, velocity tracking, ROADMAP-001, validation, phase report)
];
```

**Bulk Creation**:
```javascript
// Combine all issues
const allIssues = [...phase0Issues, ...phase1Issues, ...phase2Issues, ...phase3Issues];

// Create in batches of 50 (Jira API limit)
for (let i = 0; i < allIssues.length; i += 50) {
  const batch = allIssues.slice(i, i + 50);
  await bulkCreateIssues(batch);
  console.log(`Created issues ${i + 1} to ${i + batch.length}`);
}

// Total created: 25 issues
```

**Hour 4-5: Issue CRUD Testing**

**Test Suite** (`scripts/test_jira_crud.js`):
```javascript
// Test 1: Create issue
const testIssue = await createIssue({
  summary: "Test issue for Phase 4",
  description: "Validating Jira MCP integration",
  epicKey: "PMOS-EPIC-4",
  issuetype: "Task",
  storyPoints: 1,
  labels: ["test", "phase-4"]
});
console.log(`✅ Created: ${testIssue.key}`);

// Test 2: Read issue
const retrieved = await getIssue(testIssue.key);
console.log(`✅ Retrieved: ${retrieved.fields.summary}`);

// Test 3: Update issue
await updateIssue(testIssue.key, {
  status: { name: "In Progress" },
  description: "Updated description"
});
console.log(`✅ Updated status to In Progress`);

// Test 4: Search via JQL
const results = await searchIssues("project=PMOS AND labels=test");
console.log(`✅ Search found ${results.total} test issues`);

// Test 5: Delete issue
await deleteIssue(testIssue.key);
console.log(`✅ Deleted test issue`);
```

**Hour 5-6: Product Architect v1.1 Integration**

**Agent Upgrade**: Add Jira MCP capability to Product Architect

**New Function** (in `.claude/agents/product_arch.md`):
```markdown
### Create Jira Issue for PRD

**When**: After generating a PRD
**What**: Automatically create a linked Jira issue for tracking

**Process**:
1. Extract metadata from PRD:
   - Summary: First heading (e.g., "Real-Time Collaboration Indicators")
   - Description: Problem statement section
   - Epic: Determine from phase (if Phase 4 work → PMOS-EPIC-4)
   - Story Points: Estimate from complexity (Small=2, Medium=5, Large=8)
   - Labels: ["prd", "agent-generated", "phase-N"]
2. Call Jira MCP: `createIssue(metadata)`
3. Store Jira issue key in PRD metadata:
   ```yaml
   ---
   jira_issue: PMOS-XX
   jira_url: https://pm-os.atlassian.net/browse/PMOS-XX
   ---
   ```
4. Return Jira URL to user

**Example**:
User: "Generate PRD for notification preferences"
Product Architect:
1. Generates PRD → saves to execution/prds/2026-02-03_PRD_Notification-Preferences.md
2. Creates Jira issue PMOS-30 with summary "Notification Preferences" linked to PMOS-EPIC-4
3. Returns: "PRD created. Track progress: https://pm-os.atlassian.net/browse/PMOS-30"
```

**Validation Test**:
```bash
# User request
"Generate PRD for two-factor authentication"

# Expected result
1. PRD file created: execution/prds/2026-02-03_PRD_Two-Factor-Authentication.md
2. Jira issue created: PMOS-31
   - Summary: "Two-Factor Authentication"
   - Epic: PMOS-EPIC-4 (or user-specified phase)
   - Status: To Do
   - Story Points: 5
   - Labels: ["prd", "agent-generated", "phase-4"]
   - Description: Problem statement from PRD
3. PRD contains Jira link in frontmatter
4. Agent returns Jira URL to user
```

---

### MCP 2: Confluence (Days 3-4) - Documentation Publishing Integration

---

#### Day 3: OAuth Reuse + Space Setup + Page Publishing (4-6 hours)

**Hour 1: OAuth Verification**

**Reuse Atlassian OAuth** (from Day 1):
- Confluence shares OAuth app with Jira (single Atlassian account)
- Verify scopes include Confluence:
  - `read:confluence-content.summary` - Read pages, spaces
  - `write:confluence-content` - Create/update pages
  - `read:confluence-space.summary` - Read space info
- Test Confluence API access:
  ```bash
  # GET https://pm-os.atlassian.net/wiki/rest/api/space
  # Should return list of spaces (currently empty)
  ```

**Hour 1-2: Confluence MCP Server** (`mcp/servers/confluence_server.js`)

**Core Functions**:

```javascript
// 1. Connection Test
async function testConnection(accessToken) {
  // GET /wiki/rest/api/space
  // Returns: { results: [], size: 0 }
}

// 2. Create Space
async function createSpace(accessToken, spaceData) {
  // POST /wiki/rest/api/space
  // Body:
  {
    "key": spaceData.key, // e.g., "PMOS" (uppercase, no spaces)
    "name": spaceData.name, // e.g., "PM OS Documentation"
    "description": {
      "plain": {
        "value": spaceData.description,
        "representation": "plain"
      }
    },
    "permissions": [
      { "subjects": { "user": { "results": [{ "accountId": "..." }] } }, "operations": { "key": "read", "target": "space" } }
    ]
  }
  // Returns: { id, key, name, _links: { webui: "/wiki/spaces/PMOS" } }
}

// 3. Create Page
async function createPage(accessToken, pageData) {
  // POST /wiki/rest/api/content
  // Body:
  {
    "type": "page",
    "title": pageData.title,
    "space": { "key": pageData.spaceKey }, // e.g., "PMOS"
    "ancestors": pageData.parentId ? [{ "id": pageData.parentId }] : [], // For hierarchy
    "body": {
      "storage": {
        "value": pageData.content, // Confluence Storage Format (XHTML-like)
        "representation": "storage"
      }
    }
  }
  // Returns: { id, title, _links: { webui: "/wiki/spaces/PMOS/pages/123/Page+Title" } }
}

// 4. Search Pages (CQL - Confluence Query Language)
async function searchPages(accessToken, cql) {
  // GET /wiki/rest/api/content/search?cql={cql}&limit=25
  // Example CQL: "type=page AND space=PMOS AND title~'authentication'"
  // Returns: { results: [...], size, totalSize }
}

// 5. Get Page
async function getPage(accessToken, pageId) {
  // GET /wiki/rest/api/content/{pageId}?expand=body.storage,version
  // Returns: Full page object with content, metadata, version
}

// 6. Update Page
async function updatePage(accessToken, pageId, updates) {
  // PUT /wiki/rest/api/content/{pageId}
  // Body: { version: { number: currentVersion + 1 }, title, body: {...} }
  // Note: Must include incremented version number (optimistic locking)
}

// 7. Convert Markdown to Confluence Storage Format
function markdownToStorage(markdown) {
  // Confluence uses "Storage Format" (XHTML-like), not Markdown
  // Need to convert:
  // - # Heading → <h1>Heading</h1>
  // - **bold** → <strong>bold</strong>
  // - [link](url) → <a href="url">link</a>
  // - ```code``` → <ac:structured-macro ac:name="code">...</ac:structured-macro>

  // Use library: npm install markdown-it confluence-markdown
  const MarkdownIt = require('markdown-it');
  const md = new MarkdownIt();

  // Custom renderer for Confluence macros
  // ... (implementation details)

  return confluenceHtml;
}
```

**Hour 2-3: Space Setup**

**Create "PM OS Documentation" Space**:
```javascript
const pmosSpace = await createSpace({
  key: "PMOS",
  name: "PM OS Documentation",
  description: "Product requirements, technical specifications, agent specs, and phase reports for PM OS development",
  permissions: "Private" // Only you can read/write
});

console.log(`✅ Created space: ${pmosSpace._links.webui}`);
// Output: ✅ Created space: https://pm-os.atlassian.net/wiki/spaces/PMOS
```

**Create Parent Pages for Hierarchy**:
```javascript
// Create top-level organizing pages
const parentPages = [
  { title: "Product Requirements", description: "All PRDs organized by phase" },
  { title: "Technical Specifications", description: "Feasibility assessments, implementation plans, API specs" },
  { title: "Agent Specifications", description: "Detailed specs for all PM OS agents" },
  { title: "Discovery Artifacts", description: "OSTs, user research, implementation plans" },
  { title: "Phase Reports", description: "Phase completion reports and retrospectives" },
  { title: "Operations", description: "Quality metrics, velocity tracking, roadmap status" }
];

for (const parent of parentPages) {
  const page = await createPage({
    title: parent.title,
    spaceKey: "PMOS",
    content: `<p>${parent.description}</p><p><em>Child pages will appear below.</em></p>`
  });
  parent.pageId = page.id; // Store for child page creation
}
```

**Hour 3-5: Documentation Migration (25 pages)**

**Page Publishing Workflow**:

1. **Read markdown files from pm-os-reference/**:
   ```javascript
   const prdFiles = fs.readdirSync('pm-os-reference/artifacts/prds/');
   const specFiles = fs.readdirSync('pm-os-reference/artifacts/technical_specs/');
   const agentFiles = fs.readdirSync('.claude/agents/');
   const reportFiles = fs.readdirSync('pm-os-reference/documentation/phase-history/');
   ```

2. **Convert Markdown → Confluence Storage Format**:
   ```javascript
   for (const file of prdFiles) {
     const markdown = fs.readFileSync(`pm-os-reference/artifacts/prds/${file}`, 'utf-8');
     const confluenceHtml = markdownToStorage(markdown);

     const pageTitle = extractTitle(markdown); // Get first # heading
     const parentId = parentPages.find(p => p.title === "Product Requirements").pageId;

     await createPage({
       title: pageTitle,
       spaceKey: "PMOS",
       parentId: parentId,
       content: confluenceHtml
     });

     console.log(`✅ Published: ${pageTitle}`);
   }
   ```

3. **Publish 25 pages**:
   - **Product Requirements** (4 pages):
     - Phase 0 Bootstrap PRD
     - Phase 1 Core Agents PRD
     - Phase 2 Execution Layer PRD
     - Phase 3 Self-Improvement PRD

   - **Technical Specifications** (4 pages):
     - Engineering Partner - Feasibility Assessment Template
     - Engineering Partner - Security Review Template
     - Google Drive MCP OAuth Setup Guide
     - 2026-02-01_Feasibility_Artifact-Search

   - **Agent Specifications** (8 pages):
     - Orchestrator Agent v1.0
     - Product Architect Agent v1.0
     - Engineering Partner Agent v1.2
     - UX Strategist Agent v1.0
     - Data Analyst Agent v1.0
     - GTM Strategist Agent v1.0
     - System Evaluator Agent v1.0
     - Documentation Maintainer Agent v1.0

   - **Discovery Artifacts** (3 pages):
     - Phase 0 Opportunity Solution Tree
     - Phase 1 Implementation Plan
     - Phase 3 Self-Improvement OST

   - **Phase Reports** (3 pages):
     - Phase 0 Completion Report
     - Phase 1 Workflow Validation
     - Phase 3 Completion Report

   - **Operations** (3 pages):
     - Quality Metrics Dashboard
     - Velocity Tracking
     - ROADMAP-001 Implementation Summary

**Hour 5-6: Search Implementation + Testing**

**CQL Query Patterns** (Confluence Query Language):

```javascript
// Search by title keyword
const searchByTitle = async (keyword) => {
  const cql = `type=page AND space=PMOS AND title~"${keyword}"`;
  return await searchPages(cql);
};

// Search by text content
const searchByContent = async (keyword) => {
  const cql = `type=page AND space=PMOS AND text~"${keyword}"`;
  return await searchPages(cql);
};

// Search by parent page (e.g., all PRDs)
const searchByParent = async (parentTitle) => {
  const cql = `type=page AND space=PMOS AND ancestor="${parentTitle}"`;
  return await searchPages(cql);
};

// Search by label (if using labels)
const searchByLabel = async (label) => {
  const cql = `type=page AND space=PMOS AND label="${label}"`;
  return await searchPages(cql);
};
```

**Test Script** (`scripts/test_confluence.js`):
```javascript
// Test 1: Search for "authentication" PRDs
const authResults = await searchByTitle("authentication");
console.log(`✅ Found ${authResults.totalSize} pages with "authentication" in title`);

// Test 2: Search for "agent" specs
const agentResults = await searchByParent("Agent Specifications");
console.log(`✅ Found ${agentResults.totalSize} agent specs`);

// Test 3: Full-text search for "OAuth"
const oauthResults = await searchByContent("OAuth");
console.log(`✅ Found ${oauthResults.totalSize} pages mentioning OAuth`);
```

---

#### Day 4: Search-Before-Create + Agent Integration (4-6 hours)

**Hour 1-2: Implement Search-Before-Create Logic**

**Pattern**: Before creating a new Confluence page, search for existing pages to avoid duplicates

**Implementation** (`mcp/servers/confluence_server.js`):
```javascript
async function searchBeforeCreate(accessToken, pageTitle, spaceKey) {
  // 1. Exact title match
  const exactMatch = await searchPages(
    `type=page AND space=${spaceKey} AND title="${pageTitle}"`
  );

  if (exactMatch.totalSize > 0) {
    return {
      exists: true,
      matchType: "exact",
      pages: exactMatch.results,
      recommendation: `Page "${pageTitle}" already exists. Use version suffix or update existing.`
    };
  }

  // 2. Fuzzy title match (similar titles)
  const keywords = pageTitle.split(' ').filter(w => w.length > 3); // Extract keywords
  const fuzzyMatch = await searchPages(
    `type=page AND space=${spaceKey} AND title~"${keywords.join(' OR ')}"`
  );

  if (fuzzyMatch.totalSize > 0) {
    return {
      exists: true,
      matchType: "fuzzy",
      pages: fuzzyMatch.results,
      recommendation: `Found ${fuzzyMatch.totalSize} similar pages. Consider updating existing or using more specific title.`
    };
  }

  // 3. No matches found - safe to create
  return {
    exists: false,
    recommendation: "No existing pages found. Safe to create new page."
  };
}
```

**Agent Integration**:
```markdown
### Publish to Confluence (Product Architect v1.1)

**Before Publishing PRD**:
1. Call `searchBeforeCreate(prdTitle, "PMOS")`
2. If exact match found:
   - Ask user: "PRD '{title}' already exists in Confluence. Options: (a) Update existing, (b) Create '{title} v2', (c) Cancel"
3. If fuzzy match found:
   - Show user similar pages: "Found similar PRDs: [{list}]. Proceed with new page?"
4. If no match:
   - Proceed with page creation

**Citation of Sources**:
- If fuzzy matches found, include links in PRD:
  ```markdown
  ## Related Documentation
  - [Existing Spec: User Authentication](https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/123)
  ```
```

**Hour 2-3: Product Architect v1.1 Confluence Integration**

**New Capability**: Publish PRDs to Confluence

**Agent Upgrade** (`.claude/agents/product_arch.md`):
```markdown
### Publish PRD to Confluence

**When**: After generating PRD (in addition to saving to execution/prds/)
**What**: Create Confluence page in "Product Requirements" space

**Process**:
1. Search for existing PRDs with similar title
2. Convert PRD markdown to Confluence Storage Format
3. Create page under "Product Requirements" parent
4. Add metadata table at top:
   | Field | Value |
   |-------|-------|
   | Phase | Phase 4 |
   | Agent | Product Architect v1.1 |
   | Created | 2026-02-03 |
   | Jira Issue | [PMOS-XX](https://pm-os.atlassian.net/browse/PMOS-XX) |
5. Store Confluence URL in PRD frontmatter:
   ```yaml
   ---
   confluence_url: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/456/PRD-Title
   ---
   ```
6. Return Confluence URL to user

**Example**:
User: "Generate PRD for real-time notifications"
Product Architect:
1. Searches Confluence for "notification" PRDs → finds 0
2. Generates PRD markdown
3. Converts to Confluence Storage Format
4. Creates page in PMOS space
5. Returns: "PRD published to Confluence: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/789/Real-Time-Notifications"
```

**Hour 3-4: Markdown → Confluence Conversion Deep Dive**

**Conversion Challenges**:

Confluence uses **Storage Format** (XHTML + macros), not Markdown. Need to handle:

1. **Headings**:
   ```markdown
   # H1 → <h1>H1</h1>
   ## H2 → <h2>H2</h2>
   ```

2. **Code Blocks**:
   ```markdown
   ```javascript
   const x = 1;
   ```

   →

   <ac:structured-macro ac:name="code">
     <ac:parameter ac:name="language">javascript</ac:parameter>
     <ac:plain-text-body><![CDATA[const x = 1;]]></ac:plain-text-body>
   </ac:structured-macro>
   ```

3. **Tables**:
   ```markdown
   | Col1 | Col2 |
   |------|------|
   | A    | B    |

   →

   <table>
     <tr><th>Col1</th><th>Col2</th></tr>
     <tr><td>A</td><td>B</td></tr>
   </table>
   ```

4. **Links**:
   ```markdown
   [text](url) → <a href="url">text</a>
   ```

5. **Mermaid Diagrams** (not supported):
   ```markdown
   ```mermaid
   graph TD
     A --> B
   ```

   → Screenshot or use Confluence Draw.io macro (manual)
   ```

**Recommended Library**: `markdown-it` + custom renderer

**Implementation**:
```javascript
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

// Custom renderer for Confluence macros
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info || '';
  const code = token.content;

  return `
    <ac:structured-macro ac:name="code">
      <ac:parameter ac:name="language">${lang}</ac:parameter>
      <ac:plain-text-body><![CDATA[${code}]]></ac:plain-text-body>
    </ac:structured-macro>
  `;
};

function markdownToStorage(markdown) {
  return md.render(markdown);
}
```

**Hour 4-5: Engineering Partner v1.3 Integration**

**New Capability**: Search Confluence for existing specs before generating new ones

**Agent Upgrade** (`.claude/agents/engineering_partner.md`):
```markdown
### Search Confluence for Existing Specs

**When**: Before generating feasibility assessment or implementation plan
**What**: Search for existing technical docs to reference/avoid duplicates

**Process**:
1. Extract keywords from user request (e.g., "authentication", "API", "database")
2. Search Confluence Technical Specifications space:
   ```javascript
   const cql = `type=page AND space=PMOS AND ancestor="Technical Specifications" AND text~"${keywords.join(' OR ')}"`;
   const results = await searchPages(cql);
   ```
3. Review top 3 results (by relevance score)
4. Cite in new spec:
   ```markdown
   ## Related Technical Documentation
   - [Existing Auth Spec](https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/123) - Referenced for OAuth patterns
   ```
5. Proceed with new spec generation

**Example**:
User: "Assess feasibility of SSO integration"
Engineering Partner:
1. Searches Confluence for "SSO", "authentication", "OAuth"
2. Finds "Google Drive MCP OAuth Setup Guide"
3. Generates new spec citing existing OAuth patterns
4. Publishes to Confluence under "Technical Specifications"
```

**Hour 5-6: Validation Testing**

**End-to-End Workflow Test**:
```bash
# Test: Generate PRD with Confluence + Jira integration

User: "Generate PRD for password reset flow"

Expected Flow:
1. Product Architect searches Confluence for "password" PRDs
   → CQL: type=page AND space=PMOS AND ancestor="Product Requirements" AND title~"password"
   → Found: 0 results

2. Product Architect generates PRD markdown

3. Product Architect converts markdown to Confluence Storage Format

4. Product Architect creates Confluence page:
   - Title: "Password Reset Flow"
   - Parent: "Product Requirements" page (id=456)
   - Content: Converted HTML with metadata table

5. Product Architect creates Jira issue:
   - Summary: "Password Reset Flow"
   - Description: Problem statement from PRD
   - Epic: PMOS-EPIC-4
   - Story Points: 3

6. Product Architect updates Jira issue with Confluence link:
   - Add remote link: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/789/Password-Reset-Flow

7. Product Architect saves PRD locally with metadata:
   ```yaml
   ---
   jira_issue: PMOS-32
   jira_url: https://pm-os.atlassian.net/browse/PMOS-32
   confluence_url: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/789/Password-Reset-Flow
   ---
   ```

8. Product Architect returns to user:
   "PRD created:
   - Local: execution/prds/2026-02-03_PRD_Password-Reset-Flow.md
   - Confluence: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/789/Password-Reset-Flow
   - Jira: https://pm-os.atlassian.net/browse/PMOS-32"

9. Verify:
   ✅ PRD exists in all 3 locations (local, Confluence, Jira)
   ✅ Jira issue links to Confluence page
   ✅ Search for "password" now finds this PRD
```

---

### MCP 3: Google Workspace (Days 5-7) ⭐ - Document Creation by Type

---

#### Day 5: OAuth Extension + Google Docs Creation (6-8 hours)

**Hour 1-2: OAuth Scope Extension**

**Current Status** (from Phase 1):
- OAuth configured for Google Drive (read-only)
- Scopes: `https://www.googleapis.com/auth/drive.readonly`
- Credential file: `mcp/credentials/google_drive_oauth.json`

**New Scopes Needed**:
```json
{
  "scopes": [
    "https://www.googleapis.com/auth/drive.file",        // Create/edit files created by PM OS
    "https://www.googleapis.com/auth/documents",         // Google Docs API (read/write)
    "https://www.googleapis.com/auth/presentations",     // Google Slides API (read/write)
    "https://www.googleapis.com/auth/spreadsheets"       // Google Sheets API (read/write)
  ]
}
```

**Scope Expansion Process**:

1. **Update OAuth config** (`mcp/credentials/google_drive_oauth.json`):
   ```javascript
   // Add new scopes to existing config
   const config = JSON.parse(fs.readFileSync('mcp/credentials/google_drive_oauth.json'));
   config.scopes = [
     ...config.scopes,
     'https://www.googleapis.com/auth/documents',
     'https://www.googleapis.com/auth/presentations',
     'https://www.googleapis.com/auth/spreadsheets'
   ];
   fs.writeFileSync('mcp/credentials/google_drive_oauth.json', JSON.stringify(config, null, 2));
   ```

2. **Re-run OAuth flow** (`scripts/google_drive_auth.js`):
   ```bash
   node scripts/google_drive_auth.js --refresh-scopes
   # Opens browser → Grant new permissions → Callback → Tokens refreshed
   ```

3. **Verify new scopes**:
   ```javascript
   // GET https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={token}
   // Response should include new scopes
   ```

**Hour 2-3: Google Workspace MCP Server** (`mcp/servers/google_workspace_server.js`)

**Server Structure** (extends Google Drive MCP from Phase 1):
```javascript
// Import Google APIs
const { google } = require('googleapis');
const drive = google.drive('v3');
const docs = google.docs('v1');
const slides = google.slides('v1');
const sheets = google.sheets('v4');

// OAuth client (reuse from Phase 1)
const oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);
oauth2Client.setCredentials(tokens);
```

**Hour 3-5: Google Docs API Implementation**

**Core Functions for Google Docs**:

```javascript
// 1. Create Blank Google Doc
async function createGoogleDoc(title, folderId) {
  // Step 1: Create blank doc
  const createResponse = await docs.documents.create({
    auth: oauth2Client,
    requestBody: {
      title: title
    }
  });

  const documentId = createResponse.data.documentId;

  // Step 2: Move to folder (via Drive API)
  if (folderId) {
    await drive.files.update({
      auth: oauth2Client,
      fileId: documentId,
      addParents: folderId,
      removeParents: 'root'
    });
  }

  return {
    documentId: documentId,
    title: title,
    url: `https://docs.google.com/document/d/${documentId}/edit`
  };
}

// 2. Insert Content into Google Doc
async function insertContentIntoDoc(documentId, content) {
  // Content is markdown - need to convert to Google Docs format
  // Google Docs uses structured requests (not HTML/markdown)

  // Parse markdown into structured elements
  const elements = parseMarkdownToDocElements(content);

  // Build batch update requests
  const requests = [];
  let currentIndex = 1; // Doc starts at index 1

  for (const element of elements) {
    if (element.type === 'heading1') {
      requests.push({
        insertText: {
          location: { index: currentIndex },
          text: element.text + '\n'
        }
      });
      requests.push({
        updateParagraphStyle: {
          range: {
            startIndex: currentIndex,
            endIndex: currentIndex + element.text.length
          },
          paragraphStyle: {
            namedStyleType: 'HEADING_1'
          },
          fields: 'namedStyleType'
        }
      });
      currentIndex += element.text.length + 1;
    }
    else if (element.type === 'heading2') {
      requests.push({
        insertText: {
          location: { index: currentIndex },
          text: element.text + '\n'
        }
      });
      requests.push({
        updateParagraphStyle: {
          range: {
            startIndex: currentIndex,
            endIndex: currentIndex + element.text.length
          },
          paragraphStyle: {
            namedStyleType: 'HEADING_2'
          },
          fields: 'namedStyleType'
        }
      });
      currentIndex += element.text.length + 1;
    }
    else if (element.type === 'paragraph') {
      requests.push({
        insertText: {
          location: { index: currentIndex },
          text: element.text + '\n\n'
        }
      });
      currentIndex += element.text.length + 2;
    }
    else if (element.type === 'bulletList') {
      for (const item of element.items) {
        requests.push({
          insertText: {
            location: { index: currentIndex },
            text: item + '\n'
          }
        });
        requests.push({
          createParagraphBullets: {
            range: {
              startIndex: currentIndex,
              endIndex: currentIndex + item.length
            },
            bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE'
          }
        });
        currentIndex += item.length + 1;
      }
      currentIndex += 1; // Extra newline after list
    }
    else if (element.type === 'table') {
      requests.push({
        insertTable: {
          location: { index: currentIndex },
          rows: element.rows,
          columns: element.columns
        }
      });
      // Fill table cells (complex - see Google Docs API docs)
      // ...
    }
  }

  // Execute batch update
  await docs.documents.batchUpdate({
    auth: oauth2Client,
    documentId: documentId,
    requestBody: {
      requests: requests
    }
  });

  return { success: true, requestsExecuted: requests.length };
}

// 3. Markdown → Google Docs Elements Parser
function parseMarkdownToDocElements(markdown) {
  const lines = markdown.split('\n');
  const elements = [];
  let currentList = null;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      elements.push({ type: 'heading1', text: line.slice(2) });
    }
    else if (line.startsWith('## ')) {
      elements.push({ type: 'heading2', text: line.slice(3) });
    }
    else if (line.startsWith('### ')) {
      elements.push({ type: 'heading3', text: line.slice(4) });
    }
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!currentList) {
        currentList = { type: 'bulletList', items: [] };
        elements.push(currentList);
      }
      currentList.items.push(line.slice(2));
    }
    else if (line.trim() === '') {
      currentList = null; // End of list
    }
    else if (line.startsWith('|')) {
      // Table row - complex parsing, skip for now
      // TODO: Implement table parsing
    }
    else {
      currentList = null;
      if (line.trim()) {
        elements.push({ type: 'paragraph', text: line });
      }
    }
  }

  return elements;
}

// 4. Convert PRD Markdown to Google Doc
async function createPRDDocument(prdMarkdown, title, folderId) {
  // Step 1: Create blank doc
  const doc = await createGoogleDoc(title, folderId);

  // Step 2: Insert content
  await insertContentIntoDoc(doc.documentId, prdMarkdown);

  return doc;
}
```

**Hour 5-6: Google Docs Testing**

**Test 1: Create Simple Doc**:
```javascript
const testDoc = await createGoogleDoc("Test PRD", productRequirementsFolderId);
console.log(`✅ Created doc: ${testDoc.url}`);
```

**Test 2: Insert Content**:
```javascript
const markdown = `
# Product Requirements Document
## Problem Statement
Users struggle with password resets.

## Solution
Implement self-service password reset flow.

## Success Metrics
- 80% self-service completion rate
- <2min average reset time
`;

await insertContentIntoDoc(testDoc.documentId, markdown);
console.log(`✅ Inserted content`);
```

**Test 3: Verify in Browser**:
- Open `testDoc.url` in browser
- Verify headings styled correctly
- Verify paragraphs formatted
- Verify doc in correct folder

**Hour 6-8: Migrate 10-12 PRDs to Google Docs**

**Migration Script** (`scripts/migrate_prds_to_docs.js`):
```javascript
const prdFiles = [
  'pm-os-reference/artifacts/prds/2026-01-31_PRD_Artifact-Search-Filter_v0.1.md',
  'pm-os-reference/artifacts/prds/Phase-0-Bootstrap-PRD.md',
  'pm-os-reference/artifacts/prds/Phase-1-Core-Agents-PRD.md',
  'pm-os-reference/artifacts/prds/Phase-3-Self-Improvement-PRD.md'
];

const specFiles = [
  'pm-os-reference/artifacts/technical_specs/2026-02-01_Feasibility_Artifact-Search.md',
  'pm-os-reference/artifacts/technical_specs/2026-02-01_Implementation_Artifact-Search.md',
  'pm-os-reference/artifacts/technical_specs/Google-Drive-MCP-OAuth-Setup.md'
];

const agentFiles = [
  '.claude/agents/orchestrator.md',
  '.claude/agents/product_arch.md',
  '.claude/agents/engineering_partner.md',
  '.claude/agents/ux_strategist.md',
  '.claude/agents/data_analyst.md',
  '.claude/agents/gtm_strategist.md',
  '.claude/agents/system_evaluator.md',
  '.claude/agents/doc_maintainer.md'
];

// Get folder IDs
const folders = await getDriveFolders('PM OS');
const prdFolderId = folders.find(f => f.name === 'Product Requirements').id;
const specFolderId = folders.find(f => f.name === 'Technical Specifications').id;
const agentFolderId = folders.find(f => f.name === 'Agent Specifications').id;

// Migrate PRDs
for (const file of prdFiles) {
  const markdown = fs.readFileSync(file, 'utf-8');
  const title = extractTitle(markdown); // Get first # heading

  const doc = await createPRDDocument(markdown, title, prdFolderId);
  console.log(`✅ Migrated PRD: ${title} → ${doc.url}`);
}

// Migrate specs
for (const file of specFiles) {
  const markdown = fs.readFileSync(file, 'utf-8');
  const title = extractTitle(markdown);

  const doc = await createPRDDocument(markdown, title, specFolderId);
  console.log(`✅ Migrated spec: ${title} → ${doc.url}`);
}

// Migrate agent specs
for (const file of agentFiles) {
  const markdown = fs.readFileSync(file, 'utf-8');
  const title = extractTitle(markdown);

  const doc = await createPRDDocument(markdown, title, agentFolderId);
  console.log(`✅ Migrated agent: ${title} → ${doc.url}`);
}

console.log(`\n✅ Total documents created: ${prdFiles.length + specFiles.length + agentFiles.length}`);
```

---

#### Day 6: Google Slides Auto-Generation (8-10 hours)

**Hour 1-2: Google Slides API Basics**

**Core Concepts**:
- Slides are built from **page elements** (text boxes, shapes, images, tables)
- Use **placeholders** in templates for easy text replacement
- Supports **master slides** for consistent branding

**Core Functions**:

```javascript
// 1. Create Blank Presentation
async function createGoogleSlides(title, folderId) {
  const createResponse = await slides.presentations.create({
    auth: oauth2Client,
    requestBody: {
      title: title
    }
  });

  const presentationId = createResponse.data.presentationId;

  // Move to folder
  if (folderId) {
    await drive.files.update({
      auth: oauth2Client,
      fileId: presentationId,
      addParents: folderId,
      removeParents: 'root'
    });
  }

  return {
    presentationId: presentationId,
    title: title,
    url: `https://docs.google.com/presentation/d/${presentationId}/edit`
  };
}

// 2. Add Slide to Presentation
async function addSlide(presentationId, slideIndex, layout = 'TITLE_AND_BODY') {
  const response = await slides.presentations.get({
    auth: oauth2Client,
    presentationId: presentationId
  });

  const layoutId = response.data.layouts.find(l => l.layoutProperties.name === layout).objectId;

  const requests = [{
    createSlide: {
      insertionIndex: slideIndex,
      slideLayoutReference: {
        layoutId: layoutId
      }
    }
  }];

  const updateResponse = await slides.presentations.batchUpdate({
    auth: oauth2Client,
    presentationId: presentationId,
    requestBody: {
      requests: requests
    }
  });

  return updateResponse.data.replies[0].createSlide.objectId; // Slide ID
}

// 3. Insert Text into Slide
async function insertTextIntoSlide(presentationId, slideId, text, placeholderType = 'TITLE') {
  // Find placeholder on slide
  const presentation = await slides.presentations.get({
    auth: oauth2Client,
    presentationId: presentationId
  });

  const slide = presentation.data.slides.find(s => s.objectId === slideId);
  const placeholder = slide.pageElements.find(
    el => el.shape && el.shape.placeholder && el.shape.placeholder.type === placeholderType
  );

  const requests = [{
    insertText: {
      objectId: placeholder.objectId,
      text: text
    }
  }];

  await slides.presentations.batchUpdate({
    auth: oauth2Client,
    presentationId: presentationId,
    requestBody: { requests: requests }
  });
}

// 4. Insert Bullet Points
async function insertBulletPoints(presentationId, slideId, bulletPoints) {
  const presentation = await slides.presentations.get({
    auth: oauth2Client,
    presentationId: presentationId
  });

  const slide = presentation.data.slides.find(s => s.objectId === slideId);
  const bodyPlaceholder = slide.pageElements.find(
    el => el.shape && el.shape.placeholder && el.shape.placeholder.type === 'BODY'
  );

  const text = bulletPoints.join('\n');

  const requests = [
    {
      insertText: {
        objectId: bodyPlaceholder.objectId,
        text: text
      }
    },
    {
      createParagraphBullets: {
        objectId: bodyPlaceholder.objectId,
        textRange: {
          type: 'ALL'
        },
        bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE'
      }
    }
  ];

  await slides.presentations.batchUpdate({
    auth: oauth2Client,
    presentationId: presentationId,
    requestBody: { requests: requests }
  });
}
```

**Hour 2-4: PRD Summary Template (5 slides)**

**Template Specification**:
```javascript
const PRD_SUMMARY_TEMPLATE = {
  title: "PRD Summary Template",
  slides: [
    {
      index: 0,
      layout: 'TITLE_ONLY',
      title: '{FEATURE_NAME} - Product Proposal',
      subtitle: 'Prepared by PM OS Product Architect',
      footer: 'PM OS | {DATE}'
    },
    {
      index: 1,
      layout: 'TITLE_AND_BODY',
      title: 'Problem Statement',
      bullets: [
        '{USER_PAIN_POINT_1}',
        '{USER_PAIN_POINT_2}',
        '{CURRENT_STATE}',
        'Opportunity: {OPPORTUNITY_SIZE}'
      ]
    },
    {
      index: 2,
      layout: 'TITLE_AND_BODY',
      title: 'Solution Overview',
      bullets: [
        'Key Feature 1: {FEATURE_1}',
        'Key Feature 2: {FEATURE_2}',
        'Key Feature 3: {FEATURE_3}',
        'User Story: {USER_STORY_SUMMARY}'
      ]
    },
    {
      index: 3,
      layout: 'TITLE_AND_BODY',
      title: 'Success Metrics',
      bullets: [
        'North Star: {NSM}',
        'KPI 1: {KPI_1}',
        'KPI 2: {KPI_2}',
        'Target: {TARGET_VALUE}'
      ]
    },
    {
      index: 4,
      layout: 'TITLE_AND_BODY',
      title: 'Implementation Approach',
      bullets: [
        'Architecture: {ARCHITECTURE_SUMMARY}',
        'Phase 1: {PHASE_1}',
        'Phase 2: {PHASE_2}',
        'Timeline: {TIMELINE}'
      ]
    }
  ]
};
```

**Auto-Generation Function**:
```javascript
async function generatePRDSummary(prdMarkdown, folderId) {
  // Step 1: Extract data from PRD markdown
  const data = extractPRDData(prdMarkdown);

  // Step 2: Create blank presentation
  const presentation = await createGoogleSlides(
    `${data.featureName} - Summary`,
    folderId
  );

  // Step 3: Delete default slide
  await deleteSlide(presentation.presentationId, 0);

  // Step 4: Create 5 slides from template
  for (const slideTemplate of PRD_SUMMARY_TEMPLATE.slides) {
    // Add slide
    const slideId = await addSlide(
      presentation.presentationId,
      slideTemplate.index,
      slideTemplate.layout
    );

    // Insert title
    await insertTextIntoSlide(
      presentation.presentationId,
      slideId,
      replacePlaceholders(slideTemplate.title, data),
      'TITLE'
    );

    // Insert bullets (if applicable)
    if (slideTemplate.bullets) {
      const bullets = slideTemplate.bullets.map(b => replacePlaceholders(b, data));
      await insertBulletPoints(
        presentation.presentationId,
        slideId,
        bullets
      );
    }
  }

  return presentation;
}

// Helper: Extract structured data from PRD markdown
function extractPRDData(markdown) {
  // Parse markdown to find sections
  const sections = parseMarkdownSections(markdown);

  return {
    featureName: extractFeatureName(sections),
    userPainPoint1: extractFirstPainPoint(sections['Problem Statement']),
    userPainPoint2: extractSecondPainPoint(sections['Problem Statement']),
    currentState: extractCurrentState(sections['Problem Statement']),
    opportunitySize: extractOpportunitySize(sections['Problem Statement']),
    feature1: extractFeature(sections['Solution Overview'], 1),
    feature2: extractFeature(sections['Solution Overview'], 2),
    feature3: extractFeature(sections['Solution Overview'], 3),
    userStorySummary: extractUserStory(sections['User Stories']),
    nsm: extractNSM(sections['Success Metrics']),
    kpi1: extractKPI(sections['Success Metrics'], 1),
    kpi2: extractKPI(sections['Success Metrics'], 2),
    targetValue: extractTarget(sections['Success Metrics']),
    architectureSummary: extractArchitecture(sections['Implementation Approach']),
    phase1: extractPhase(sections['Implementation Approach'], 1),
    phase2: extractPhase(sections['Implementation Approach'], 2),
    timeline: extractTimeline(sections['Implementation Approach']),
    date: new Date().toISOString().split('T')[0]
  };
}
```

**Hour 4-6: Phase Retrospective Template (8 slides)**

**Template Specification**:
```javascript
const PHASE_RETROSPECTIVE_TEMPLATE = {
  title: "Phase Retrospective Template",
  slides: [
    {
      index: 0,
      layout: 'TITLE_ONLY',
      title: 'Phase {PHASE_NUMBER} Retrospective',
      subtitle: '{PHASE_NAME}',
      footer: 'PM OS | {DATE}'
    },
    {
      index: 1,
      layout: 'TITLE_AND_BODY',
      title: 'Overview',
      bullets: [
        'Objective: {OBJECTIVE}',
        'Scope: {SCOPE}',
        'Duration: {DURATION} ({ESTIMATED} estimated)',
        'Team: {AGENTS_INVOLVED}'
      ]
    },
    {
      index: 2,
      layout: 'TITLE_AND_BODY',
      title: 'Velocity Analysis',
      bullets: [
        'Estimated: {ESTIMATED_DAYS} days',
        'Actual: {ACTUAL_DAYS} days',
        'Velocity Multiplier: {VELOCITY}x',
        'Cumulative Average: {AVG_VELOCITY}x'
      ],
      chart: 'VELOCITY_BAR_CHART' // Estimated vs Actual
    },
    {
      index: 3,
      layout: 'TITLE_AND_BODY',
      title: 'Deliverables',
      bullets: [
        '✅ {DELIVERABLE_1}',
        '✅ {DELIVERABLE_2}',
        '✅ {DELIVERABLE_3}',
        'Total Artifacts: {ARTIFACT_COUNT}'
      ]
    },
    {
      index: 4,
      layout: 'TITLE_AND_BODY',
      title: 'Agent Performance',
      bullets: [
        '{AGENT_1}: {ACCEPTANCE_RATE_1}% acceptance',
        '{AGENT_2}: {ACCEPTANCE_RATE_2}% acceptance',
        'Average Time per Artifact: {AVG_TIME}',
        'Upgrades Deployed: {UPGRADES}'
      ],
      chart: 'AGENT_ACCEPTANCE_BAR_CHART'
    },
    {
      index: 5,
      layout: 'TITLE_AND_BODY',
      title: 'Challenges & Learnings',
      bullets: [
        '✅ What Went Well: {WENT_WELL}',
        '⚠️ Challenges: {CHALLENGES}',
        '💡 Key Learning: {LEARNING}',
        '🔄 Process Improvement: {IMPROVEMENT}'
      ]
    },
    {
      index: 6,
      layout: 'TITLE_AND_BODY',
      title: 'Quality Metrics',
      bullets: [
        'Quality Gate Pass Rate: {GATE_PASS_RATE}%',
        'Rework Rate: {REWORK_RATE}%',
        'Strategic Alignment: {ALIGNMENT_SCORE}/100',
        'Metrics Tracked: {METRICS_COUNT}'
      ]
    },
    {
      index: 7,
      layout: 'TITLE_AND_BODY',
      title: 'Next Phase Preview',
      bullets: [
        'Phase {NEXT_PHASE}: {NEXT_PHASE_NAME}',
        'Objectives: {NEXT_OBJECTIVES}',
        'Dependencies: {DEPENDENCIES}',
        'Estimated Duration: {NEXT_DURATION}'
      ]
    }
  ]
};
```

**Auto-Generation Function**:
```javascript
async function generatePhaseRetrospective(phaseNumber, completionReportMarkdown, folderId) {
  // Step 1: Extract data from completion report + velocity tracker
  const data = extractPhaseData(phaseNumber, completionReportMarkdown);

  // Step 2: Create presentation
  const presentation = await createGoogleSlides(
    `Phase ${phaseNumber} Retrospective - ${data.phaseName}`,
    folderId
  );

  // Step 3: Generate 8 slides from template
  for (const slideTemplate of PHASE_RETROSPECTIVE_TEMPLATE.slides) {
    const slideId = await addSlide(presentation.presentationId, slideTemplate.index, slideTemplate.layout);

    await insertTextIntoSlide(presentation.presentationId, slideId, replacePlaceholders(slideTemplate.title, data), 'TITLE');

    if (slideTemplate.bullets) {
      const bullets = slideTemplate.bullets.map(b => replacePlaceholders(b, data));
      await insertBulletPoints(presentation.presentationId, slideId, bullets);
    }

    // Insert chart (if specified)
    if (slideTemplate.chart === 'VELOCITY_BAR_CHART') {
      await insertVelocityChart(presentation.presentationId, slideId, data);
    }
    else if (slideTemplate.chart === 'AGENT_ACCEPTANCE_BAR_CHART') {
      await insertAgentAcceptanceChart(presentation.presentationId, slideId, data);
    }
  }

  return presentation;
}

// Helper: Insert chart (uses Google Sheets as data source)
async function insertVelocityChart(presentationId, slideId, data) {
  // Step 1: Create Google Sheet with velocity data
  const sheet = await createGoogleSheet("Phase Velocity Data", data.folderId);
  await populateSheetWithVelocityData(sheet.spreadsheetId, data);

  // Step 2: Create chart in Slides linked to Sheet
  const requests = [{
    createSheetsChart: {
      objectId: `chart_${Date.now()}`,
      spreadsheetId: sheet.spreadsheetId,
      chartId: 1, // Chart created in Sheet
      linkingMode: 'LINKED',
      elementProperties: {
        pageObjectId: slideId,
        size: {
          width: { magnitude: 400, unit: 'PT' },
          height: { magnitude: 300, unit: 'PT' }
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 50,
          translateY: 150,
          unit: 'PT'
        }
      }
    }
  }];

  await slides.presentations.batchUpdate({
    auth: oauth2Client,
    presentationId: presentationId,
    requestBody: { requests: requests }
  });
}
```

**Hour 6-8: Roadmap Template (14 slides)**

**Template Specification** (abbreviated):
```javascript
const ROADMAP_TEMPLATE = {
  slides: [
    { index: 0, layout: 'TITLE_ONLY', title: 'PM OS 7-Phase Roadmap', subtitle: 'Product Development Timeline' },
    { index: 1, layout: 'TITLE_AND_BODY', title: 'Roadmap Overview', bullets: ['7 Phases', '11-week timeline → 5.2 days actual', '8 agents', '5 MCPs'] },
    { index: 2, layout: 'TITLE_AND_BODY', title: 'Phase 0: Bootstrap Foundation', bullets: ['Duration: 1 day', 'Deliverables: 8', 'Status: Complete'] },
    { index: 3, layout: 'TITLE_AND_BODY', title: 'Phase 1: Core Agent Team', bullets: ['Duration: 2 days', 'Deliverables: 5', 'Status: Complete'] },
    // ... (slides 4-9 for phases 2-7)
    { index: 10, layout: 'TITLE_AND_BODY', title: 'Timeline Gantt Chart', chart: 'GANTT_CHART' },
    { index: 11, layout: 'TITLE_AND_BODY', title: 'North Star Metrics', bullets: ['Metric 1', 'Metric 2', 'Metric 3'] },
    { index: 12, layout: 'TITLE_AND_BODY', title: 'Risks & Mitigation', bullets: ['Risk 1', 'Risk 2', 'Risk 3'] },
    { index: 13, layout: 'TITLE_AND_BODY', title: 'Team & Roles', bullets: ['Human PM', '8 AI Agents', 'Collaborative Model'] }
  ]
};
```

**Hour 8-10: Generate Synthetic Decks**

**Generate 4 Phase Retrospectives + 1 Roadmap + 1 PRD Summary**:
```javascript
// 1. Phase 0 Retrospective
const phase0Data = extractPhaseData(0, 'pm-os-reference/documentation/phase-history/Phase-0-Completion-Report.md');
const phase0Deck = await generatePhaseRetrospective(0, phase0Data, retrospectivesFolderId);
console.log(`✅ Generated: Phase 0 Retrospective → ${phase0Deck.url}`);

// 2. Phase 1 Retrospective
const phase1Data = extractPhaseData(1, 'pm-os-reference/documentation/phase-history/Phase-1-Workflow-Validation.md');
const phase1Deck = await generatePhaseRetrospective(1, phase1Data, retrospectivesFolderId);
console.log(`✅ Generated: Phase 1 Retrospective → ${phase1Deck.url}`);

// 3. Phase 2 Retrospective
const phase2Data = extractPhaseData(2, 'pm-os-reference/documentation/phase-history/Phase-2-Completion-Report.md');
const phase2Deck = await generatePhaseRetrospective(2, phase2Data, retrospectivesFolderId);
console.log(`✅ Generated: Phase 2 Retrospective → ${phase2Deck.url}`);

// 4. Phase 3 Retrospective
const phase3Data = extractPhaseData(3, 'pm-os-reference/documentation/phase-history/Phase-3-Completion-Report.md');
const phase3Deck = await generatePhaseRetrospective(3, phase3Data, retrospectivesFolderId);
console.log(`✅ Generated: Phase 3 Retrospective → ${phase3Deck.url}`);

// 5. PRD Summary (Artifact Search Filter)
const prdMarkdown = fs.readFileSync('pm-os-reference/artifacts/prds/2026-01-31_PRD_Artifact-Search-Filter_v0.1.md', 'utf-8');
const prdSummary = await generatePRDSummary(prdMarkdown, prdSummariesFolderId);
console.log(`✅ Generated: PRD Summary → ${prdSummary.url}`);

// 6. PM OS Roadmap
const roadmapData = extractRoadmapData('pm-os-reference/identity/ROADMAP.md');
const roadmapDeck = await generateRoadmapDeck(roadmapData, roadmapFolderId);
console.log(`✅ Generated: PM OS Roadmap → ${roadmapDeck.url}`);
```

---

#### Day 7: Google Sheets Integration + Workflows (6-8 hours)

**Hour 1-2: Google Sheets API Basics**

**Core Functions**:

```javascript
// 1. Create Google Sheet
async function createGoogleSheet(title, folderId) {
  const createResponse = await sheets.spreadsheets.create({
    auth: oauth2Client,
    requestBody: {
      properties: {
        title: title
      }
    }
  });

  const spreadsheetId = createResponse.data.spreadsheetId;

  // Move to folder
  if (folderId) {
    await drive.files.update({
      auth: oauth2Client,
      fileId: spreadsheetId,
      addParents: folderId,
      removeParents: 'root'
    });
  }

  return {
    spreadsheetId: spreadsheetId,
    title: title,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
  };
}

// 2. Write Data to Sheet (batch update)
async function writeToSheet(spreadsheetId, range, values) {
  // range format: "Sheet1!A1:D5"
  // values format: [[row1col1, row1col2], [row2col1, row2col2]]

  await sheets.spreadsheets.values.update({
    auth: oauth2Client,
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'USER_ENTERED', // Interprets formulas
    requestBody: {
      values: values
    }
  });
}

// 3. Append Row to Sheet
async function appendRowToSheet(spreadsheetId, range, values) {
  // Appends to first empty row in range
  await sheets.spreadsheets.values.append({
    auth: oauth2Client,
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [values] // Single row
    }
  });
}

// 4. Read Data from Sheet
async function readFromSheet(spreadsheetId, range) {
  const response = await sheets.spreadsheets.values.get({
    auth: oauth2Client,
    spreadsheetId: spreadsheetId,
    range: range
  });

  return response.data.values; // 2D array
}

// 5. Format Sheet (headers, freeze, formulas)
async function formatSheet(spreadsheetId, sheetId, formatting) {
  const requests = [];

  // Freeze header row
  if (formatting.freezeRows) {
    requests.push({
      updateSheetProperties: {
        properties: {
          sheetId: sheetId,
          gridProperties: {
            frozenRowCount: formatting.freezeRows
          }
        },
        fields: 'gridProperties.frozenRowCount'
      }
    });
  }

  // Bold headers
  if (formatting.boldHeaders) {
    requests.push({
      repeatCell: {
        range: {
          sheetId: sheetId,
          startRowIndex: 0,
          endRowIndex: 1
        },
        cell: {
          userEnteredFormat: {
            textFormat: {
              bold: true
            }
          }
        },
        fields: 'userEnteredFormat.textFormat.bold'
      }
    });
  }

  // Auto-resize columns
  if (formatting.autoResize) {
    requests.push({
      autoResizeDimensions: {
        dimensions: {
          sheetId: sheetId,
          dimension: 'COLUMNS',
          startIndex: 0,
          endIndex: formatting.columnCount
        }
      }
    });
  }

  await sheets.spreadsheets.batchUpdate({
    auth: oauth2Client,
    spreadsheetId: spreadsheetId,
    requestBody: {
      requests: requests
    }
  });
}
```

**Hour 2-4: Create Velocity Tracker Sheet**

**Sheet Structure**:
```javascript
const VELOCITY_TRACKER_STRUCTURE = {
  title: "PM OS Velocity Tracker",
  headers: [
    "Phase ID",
    "Phase Name",
    "Estimated Days",
    "Actual Days",
    "Deliverables Completed",
    "Velocity Multiplier",
    "Completion Date",
    "Notes"
  ],
  rows: [
    [0, "Bootstrap Foundation", 14, 1, 8, "=D2/C2", "2026-01-31", "11x faster than estimated"],
    [1, "Core Agent Team", 7, 2, 5, "=D3/C3", "2026-02-02", "3.5x faster"],
    [2, "Execution Layer", 7, 0.17, 5, "=D4/C4", "2026-02-02", "41x faster (4 hours)"],
    [3, "Self-Improvement Loop", 21, 2, 7, "=D5/C5", "2026-02-03", "10.5x faster"]
  ],
  formulas: {
    averageVelocity: "=AVERAGE(F2:F5)", // Cell F6
    totalDeliverables: "=SUM(E2:E5)", // Cell E6
    phase4Forecast: "=C6*$F$6" // Uses avg velocity to predict Phase 4
  }
};
```

**Creation Function**:
```javascript
async function createVelocityTrackerSheet(folderId) {
  // Step 1: Create sheet
  const sheet = await createGoogleSheet(VELOCITY_TRACKER_STRUCTURE.title, folderId);
  const spreadsheetId = sheet.spreadsheetId;

  // Step 2: Write headers
  await writeToSheet(spreadsheetId, "Sheet1!A1:H1", [VELOCITY_TRACKER_STRUCTURE.headers]);

  // Step 3: Write data rows
  await writeToSheet(spreadsheetId, "Sheet1!A2:H5", VELOCITY_TRACKER_STRUCTURE.rows);

  // Step 4: Write formula rows (summary)
  await writeToSheet(spreadsheetId, "Sheet1!A6:H6", [
    ["", "AVERAGE", "", "", `=SUM(E2:E5)`, `=AVERAGE(F2:F5)`, "", ""]
  ]);

  // Step 5: Format sheet
  await formatSheet(spreadsheetId, 0, {
    freezeRows: 1,
    boldHeaders: true,
    autoResize: true,
    columnCount: 8
  });

  // Step 6: Add conditional formatting (velocity > 5x = green)
  const requests = [{
    addConditionalFormatRule: {
      rule: {
        ranges: [{
          sheetId: 0,
          startRowIndex: 1,
          endRowIndex: 100,
          startColumnIndex: 5, // Velocity Multiplier column
          endColumnIndex: 6
        }],
        booleanRule: {
          condition: {
            type: 'NUMBER_GREATER_THAN_EQ',
            values: [{ userEnteredValue: '5' }]
          },
          format: {
            backgroundColor: { red: 0.7, green: 1, blue: 0.7 }
          }
        }
      },
      index: 0
    }
  }];

  await sheets.spreadsheets.batchUpdate({
    auth: oauth2Client,
    spreadsheetId: spreadsheetId,
    requestBody: { requests: requests }
  });

  return sheet;
}
```

**Hour 4-5: Create Agent Scorecard Sheet**

**Sheet Structure**:
```javascript
const AGENT_SCORECARD_STRUCTURE = {
  title: "PM OS Agent Scorecard",
  headers: [
    "Agent Name",
    "Version",
    "Artifacts Generated",
    "Acceptance Rate (%)",
    "Avg Time per Artifact (hrs)",
    "Upgrades",
    "Last Active",
    "Status"
  ],
  rows: [
    ["Orchestrator", "v1.0", 0, 100, 0, 0, "2026-01-31", "Active"],
    ["Product Architect", "v1.0", 12, 100, 2.5, 0, "2026-02-03", "Active"],
    ["Engineering Partner", "v1.2", 8, 100, 3.0, 2, "2026-02-02", "Active"],
    ["UX Strategist", "v1.0", 4, 100, 2.0, 0, "2026-02-01", "Active"],
    ["Data Analyst", "v1.0", 3, 100, 1.5, 0, "2026-02-02", "Active"],
    ["GTM Strategist", "v1.0", 2, 100, 1.0, 0, "2026-02-02", "Active"],
    ["System Evaluator", "v1.0", 5, 100, 2.5, 0, "2026-02-03", "Active"],
    ["Documentation Maintainer", "v1.0", 3, 100, 1.0, 0, "2026-02-03", "Active"]
  ],
  formulas: {
    totalArtifacts: "=SUM(C2:C9)",
    avgAcceptanceRate: "=AVERAGE(D2:D9)",
    avgTime: "=AVERAGE(E2:E9)"
  }
};
```

**Creation Function** (similar to Velocity Tracker):
```javascript
async function createAgentScorecardSheet(folderId) {
  // Similar to createVelocityTrackerSheet
  // ... (create sheet, write headers, write rows, format, add conditional formatting)
}
```

**Hour 5-6: Create North Star Metrics Sheet**

**Sheet Structure**:
```javascript
const NORTH_STAR_METRICS_STRUCTURE = {
  title: "PM OS North Star Metrics",
  headers: [
    "Metric",
    "Baseline",
    "Target",
    "Current",
    "Progress (%)",
    "Status",
    "Last Updated"
  ],
  rows: [
    ["PRD Generation Time", "8h", "4h", "2.5h", "=((B2-D2)/(B2-C2))*100", "On Track", "2026-02-03"],
    ["Rework Rate", "40%", "10%", "0%", "=((B3-D3)/(B3-C3))*100", "Exceeded", "2026-02-03"],
    ["Discovery Artifacts per Week", "2", "8", "6", "=((D4-B4)/(C4-B4))*100", "On Track", "2026-02-03"],
    ["Strategic Alignment Score", "60/100", "95/100", "100/100", "=((D5-B5)/(C5-B5))*100", "Exceeded", "2026-02-03"],
    ["Sprint Readiness (Zero Clarifications)", "60%", "95%", "100%", "=((D6-B6)/(C6-B6))*100", "Exceeded", "2026-02-03"]
  ]
};
```

**Hour 6-7: Auto-Update Workflow (Phase Completion → Velocity Tracker)**

**Workflow Implementation**:
```javascript
async function updateVelocityTrackerOnPhaseCompletion(phaseNumber, phaseData) {
  // Step 1: Read Velocity Tracker
  const velocityTrackerUrl = "https://docs.google.com/spreadsheets/d/ABC123..."; // Hardcoded or from config
  const spreadsheetId = extractSpreadsheetId(velocityTrackerUrl);

  // Step 2: Check if phase already exists
  const existingData = await readFromSheet(spreadsheetId, "Sheet1!A2:A100");
  const phaseExists = existingData.some(row => row[0] === phaseNumber);

  if (phaseExists) {
    console.log(`⚠️ Phase ${phaseNumber} already in Velocity Tracker. Skipping.`);
    return;
  }

  // Step 3: Append new row
  const newRow = [
    phaseNumber,
    phaseData.phaseName,
    phaseData.estimatedDays,
    phaseData.actualDays,
    phaseData.deliverablesCompleted,
    `=${phaseData.actualDays}/${phaseData.estimatedDays}`, // Formula for velocity multiplier
    phaseData.completionDate,
    phaseData.notes
  ];

  await appendRowToSheet(spreadsheetId, "Sheet1!A:H", newRow);

  console.log(`✅ Added Phase ${phaseNumber} to Velocity Tracker`);

  // Step 4: Update average formulas (if needed)
  // Google Sheets auto-updates AVERAGE formulas when new rows added

  return {
    spreadsheetId: spreadsheetId,
    url: velocityTrackerUrl,
    rowAdded: newRow
  };
}
```

**Integration with Data Analyst v1.1**:
```markdown
### Update Velocity Tracker (Data Analyst v1.1)

**When**: Phase completion confirmed by Human PM
**What**: Append phase data to Velocity Tracker Google Sheet

**Process**:
1. Read phase completion report (from pm-os-reference/documentation/phase-history/)
2. Extract data:
   - Phase ID
   - Phase Name
   - Estimated Days (from ROADMAP.md)
   - Actual Days (from completion report)
   - Deliverables Completed (count)
   - Completion Date
   - Notes (summary)
3. Call `updateVelocityTrackerOnPhaseCompletion(phaseNumber, data)`
4. Verify row added successfully
5. Return updated Velocity Tracker URL to user

**Example**:
User: "Phase 3 is complete"
Data Analyst:
1. Reads pm-os-reference/documentation/phase-history/Phase-3-Completion-Report.md
2. Extracts: Phase 3, Self-Improvement Loop, 21d est, 2d actual, 7 deliverables, 2026-02-03
3. Appends row to Velocity Tracker
4. Returns: "Velocity Tracker updated: https://docs.google.com/spreadsheets/d/ABC123..."
```

**Hour 7-8: Integration Testing**

**Test 1: Create 3 Sheets**:
```javascript
const velocityTracker = await createVelocityTrackerSheet(metricsFolderId);
console.log(`✅ Created Velocity Tracker: ${velocityTracker.url}`);

const agentScorecard = await createAgentScorecardSheet(metricsFolderId);
console.log(`✅ Created Agent Scorecard: ${agentScorecard.url}`);

const northStarMetrics = await createNorthStarMetricsSheet(metricsFolderId);
console.log(`✅ Created North Star Metrics: ${northStarMetrics.url}`);
```

**Test 2: Append Row to Velocity Tracker**:
```javascript
const phase4Data = {
  phaseName: "MCP Integration Suite",
  estimatedDays: 7,
  actualDays: 0, // In progress
  deliverablesCompleted: 0,
  completionDate: "TBD",
  notes: "In progress"
};

await updateVelocityTrackerOnPhaseCompletion(4, phase4Data);
console.log(`✅ Added Phase 4 placeholder to Velocity Tracker`);
```

**Test 3: Data Analyst Integration**:
```bash
# User request
"Update Velocity Tracker with Phase 3 completion"

# Expected result
1. Data Analyst reads Phase 3 Completion Report
2. Data Analyst extracts phase data
3. Data Analyst appends row to Velocity Tracker:
   [3, "Self-Improvement Loop", 21, 2, 7, "=D5/C5", "2026-02-03", "10.5x faster"]
4. Data Analyst returns: "Velocity Tracker updated: {url}"
```

---

### End-to-End Validation (All 3 MCPs)

**Final Test** (after Day 7):
```bash
User: "Generate PRD for agent versioning system"

Expected Flow:
1. Product Architect searches Confluence for "versioning" PRDs
   → CQL: type=page AND space=PMOS AND title~"versioning"
   → Found: 0 results

2. Product Architect searches Google Drive for "agent" docs
   → Query: fullText contains 'agent' and '10-12 Google Docs (PRDs, specs, agent specs)' in name
   → Found: 8 agent spec docs

3. Product Architect generates PRD markdown (cites agent spec docs as sources)

4. Product Architect publishes to Confluence:
   - Converts markdown → Confluence Storage Format
   - Creates page under "Product Requirements" parent
   - URL: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/890/Agent-Versioning-System

5. Product Architect creates Google Doc:
   - Converts markdown → Google Docs format
   - Creates doc in "Product Requirements" folder
   - URL: https://docs.google.com/document/d/XYZ456/edit

6. Product Architect auto-generates Google Slides summary:
   - Extracts data from PRD markdown
   - Creates 5-slide deck using PRD Summary Template
   - URL: https://docs.google.com/presentation/d/ABC789/edit

7. Product Architect creates Jira issue:
   - Summary: "Agent Versioning System"
   - Description: Problem statement from PRD
   - Epic: PMOS-EPIC-4
   - Story Points: 5
   - URL: https://pm-os.atlassian.net/browse/PMOS-33

8. Product Architect links all 3 URLs in Jira issue:
   - Add remote link to Confluence page
   - Add remote link to Google Doc
   - Add remote link to Google Slides

9. Product Architect saves PRD locally with metadata:
   ```yaml
   ---
   jira_issue: PMOS-33
   jira_url: https://pm-os.atlassian.net/browse/PMOS-33
   confluence_url: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/890/Agent-Versioning-System
   google_doc_url: https://docs.google.com/document/d/XYZ456/edit
   google_slides_url: https://docs.google.com/presentation/d/ABC789/edit
   created_by: Product Architect v1.1
   created_at: 2026-02-03T14:30:00Z
   ---
   ```

10. Product Architect returns to user:
    "PRD created and published to 3 platforms:
    📄 Local: execution/prds/2026-02-03_PRD_Agent-Versioning-System.md
    📄 Confluence: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/890/Agent-Versioning-System
    📄 Google Doc: https://docs.google.com/document/d/XYZ456/edit
    📊 Google Slides: https://docs.google.com/presentation/d/ABC789/edit (5-slide summary)
    🎫 Jira: https://pm-os.atlassian.net/browse/PMOS-33"

11. Verification:
    ✅ PRD exists in all 4 locations (local, Confluence, Google Doc, Google Slides)
    ✅ Jira issue links to all 3 cloud artifacts
    ✅ Slides deck has 5 slides with correct content
    ✅ Search for "versioning" now finds this PRD in Confluence + Google Drive
    ✅ All created within 60 seconds
```

---

## Agent Integration Updates

### Product Architect v1.0 → v1.1

**New Capabilities**:
- **Search-before-create**: Search Confluence + Google Drive before generating new PRD
- **Multi-platform publishing**: Publish to Confluence AND Google Docs
- **Auto-generate Slides**: Create 5-slide PRD summary deck
- **Create Jira issues**: Link PRD to tracking issue
- **Cite sources**: Reference existing docs found during search

**New Context Loading**:
```markdown
### MCP Integrations (Phase 4+)

**Jira MCP**: Create issues for new PRDs
- API: POST /rest/api/3/issue
- Fields: summary, description, issuetype=Story, project=PMOS, epic link

**Confluence MCP**: Publish PRDs + search existing
- Search API: GET /wiki/rest/api/content/search?cql=type=page AND space=PMOS AND title~"keyword"
- Publish API: POST /wiki/rest/api/content (Confluence Storage Format)

**Google Docs API**: Create PRDs in Drive
- API: POST /v1/documents (creates blank doc)
- API: POST /v1/documents/{id}:batchUpdate (inserts content)

**Google Slides API**: Auto-generate PRD summary
- Template: 5-slide structure (problem, solution, metrics, approach, timeline)
- API: POST /v1/presentations (creates from template)
- API: POST /v1/presentations/{id}:batchUpdate (updates text placeholders)
```

**Workflow Integration**:
```
1. User requests PRD generation
2. Product Architect searches Confluence for related PRDs
3. Product Architect searches Google Drive for related docs
4. Product Architect generates PRD citing sources
5. Product Architect publishes to:
   - Confluence (Product Requirements space)
   - Google Docs (PM OS/Product Requirements folder)
6. Product Architect auto-generates Slides summary
7. Product Architect creates Jira issue with all 3 URLs
```

---

### Engineering Partner v1.2 → v1.3

**New Capabilities**:
- **Search Confluence for specs**: Find existing technical docs to avoid duplicates
- **Search Google Drive for architecture**: Reference system design docs
- **Cite sources**: Link to existing specs in new feasibility assessments
- **Publish to Confluence + Google Docs**: Multi-platform technical documentation

**New Context Loading**:
```markdown
### MCP Integrations (Phase 4+)

**Confluence MCP**: Search for existing specs
- Search API: GET /wiki/rest/api/content/search?cql=type=page AND space=PMOS AND title~"architecture"
- Use case: Reference existing system design when generating specs

**Google Docs API**: Publish technical specs
- Create specs in Google Docs for collaborative editing
- Use case: Feasibility assessments, implementation plans, API contracts

**Jira MCP**: Link specs to technical debt issues
- API: POST /rest/api/3/issue/{issueKey}/remotelink
- Use case: Connect feasibility assessment to implementation issue
```

---

### Data Analyst v1.0 → v1.1

**New Capabilities**:
- **Update Google Sheets**: Add rows to Velocity Tracker, Agent Scorecard
- **Read Google Sheets**: Query current metrics for analysis
- **Publish reports to Confluence**: Analytics summaries, trend analysis
- **Auto-calculate metrics**: Use Google Sheets formulas for velocity, acceptance rate

**New Context Loading**:
```markdown
### MCP Integrations (Phase 4+)

**Google Sheets API**: Primary metrics data source (replaces Snowflake for Phase 4)
- Read API: GET /v4/spreadsheets/{id}/values/{range}
- Write API: POST /v4/spreadsheets/{id}/values/{range}:append
- Tables: Velocity Tracker, Agent Scorecard, North Star Metrics

**Confluence MCP**: Publish analytics reports
- Create weekly/monthly analytics reports in Operations space
- Include charts, trend analysis, recommendations

**Workflow**: Phase completion → update Velocity Tracker → generate report → publish to Confluence
```

---

### System Evaluator v1.0 → v1.1

**New Capabilities**:
- **Create Jira issues for quality violations**: Auto-generate improvement proposals
- **Search Google Sheets for historical quality data**: Trend analysis
- **Publish quality audits to Confluence**: Structured audit reports

**New Context Loading**:
```markdown
### MCP Integrations (Phase 4+)

**Jira MCP**: Create quality improvement issues
- API: POST /rest/api/3/issue
- Label: quality-improvement, priority-high
- Use case: When quality gate fails, create issue with remediation steps

**Google Sheets API**: Query historical quality metrics
- Read from quality_metrics sheet (created by Data Analyst)
- Use case: Trend detection (quality declining over last 3 phases)

**Confluence MCP**: Publish quality audit reports
- Create audit reports in Operations space
- Include quality gates, violations, recommendations
```

---

## End-to-End Workflow Validation

### Workflow 1: New Feature Proposal (3-Platform Sync)

**Trigger**: User asks Product Architect to "Generate PRD for real-time collaboration indicators"

**Expected Flow**:
1. Product Architect searches Confluence for "collaboration" PRDs → finds 0
2. Product Architect searches Google Drive for "real-time" docs → finds 1 related spec
3. Product Architect generates PRD citing the existing spec
4. Product Architect publishes PRD to Confluence (Product Requirements space)
5. Product Architect creates PRD in Google Docs (PM OS/Product Requirements folder)
6. Product Architect auto-generates 5-slide summary in Google Slides (PM OS/PRD Summaries folder)
7. Product Architect creates Jira issue PMOS-XX with links to:
   - Confluence page: `https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/123/Real-Time+Collaboration+Indicators`
   - Google Doc: `https://docs.google.com/document/d/abc123/edit`
   - Google Slides: `https://docs.google.com/presentation/d/xyz789/edit`
8. All 3 systems updated within 60 seconds

**Validation Criteria**:
- ✅ PRD exists in all 3 platforms (Confluence, Google Docs, Google Slides)
- ✅ Jira issue links to all 3 artifacts
- ✅ Slides deck has 5 slides with correct structure
- ✅ Search finds the PRD on subsequent searches (indexing works)

---

### Workflow 2: Phase Completion → Retrospective Generation

**Trigger**: Human PM confirms "Phase 3 complete"

**Expected Flow**:
1. Documentation Maintainer updates ROADMAP.md (marks Phase 3 complete)
2. Documentation Maintainer publishes Phase 3 Completion Report to Confluence
3. Documentation Maintainer closes all Phase 3 Jira issues (status → Done)
4. Data Analyst reads Phase 3 completion data (from completion report)
5. Data Analyst appends Phase 3 row to Velocity Tracker Google Sheet:
   - Phase: 3 | Name: Self-Improvement Loop
   - Est: 21 days | Actual: 2 days | Velocity: 10.5x
6. Data Analyst auto-generates Phase 3 Retrospective Slides deck:
   - Slide 1: Title "Phase 3 Retrospective - Self-Improvement Loop"
   - Slide 2: Overview (objectives, scope, 2-day duration)
   - Slide 3: Velocity chart (21d estimate vs 2d actual)
   - Slide 4: Deliverables (7/7 complete with checkmarks)
   - Slide 5: Agent Performance (System Evaluator 100% acceptance)
   - Slide 6: Challenges & Learnings (OAuth complexity managed)
   - Slide 7: Quality Metrics (100% gate pass rate, 67 metrics tracked)
   - Slide 8: Next Phase Preview (Phase 4 - MCP Integration Suite)
7. System Evaluator triggers quality audit (scheduled post-phase)

**Validation Criteria**:
- ✅ All Phase 3 Jira issues marked Done
- ✅ Confluence has Phase 3 Completion Report
- ✅ Velocity Tracker has Phase 3 row with correct data
- ✅ Google Slides deck exists with 8 slides, correct content
- ✅ Quality audit initiated automatically

---

### Workflow 3: Agent Performance Update

**Trigger**: Product Architect generates new PRD (artifact count increments)

**Expected Flow**:
1. Product Architect generates PRD for "Agent Versioning System"
2. Product Architect publishes to Confluence + Google Docs + Slides
3. Product Architect creates Jira issue
4. Data Analyst detects new artifact created by Product Architect
5. Data Analyst updates Agent Scorecard Google Sheet:
   - Product Architect row: artifacts_generated += 1
   - Recalculates acceptance_rate (still 100%)
   - Updates last_active_date to today
6. System Evaluator reads updated Agent Scorecard
7. System Evaluator validates Product Architect performance (on track)

**Validation Criteria**:
- ✅ Agent Scorecard shows incremented artifact count
- ✅ Acceptance rate remains 100%
- ✅ Last active date updated
- ✅ System Evaluator acknowledges performance update

---

## Unified OAuth Management

### OAuth Strategy Summary

**Google Workspace** (extend Phase 1):
- **Status**: OAuth already configured for Google Drive (read-only)
- **Action**: Extend scopes to include write access + Docs/Slides/Sheets APIs
- **Scopes to Add**:
  - `https://www.googleapis.com/auth/drive.file` (create/edit files)
  - `https://www.googleapis.com/auth/documents` (Docs API)
  - `https://www.googleapis.com/auth/presentations` (Slides API)
  - `https://www.googleapis.com/auth/spreadsheets` (Sheets API)
- **Refresh**: Re-run `scripts/google_drive_auth.js` with new scopes
- **Credential File**: Reuse `mcp/credentials/google_drive_oauth.json`

**Jira + Confluence** (single Atlassian OAuth):
- **Status**: New OAuth setup required
- **Action**: Create single Atlassian OAuth app (covers both Jira and Confluence)
- **Scopes**:
  - Jira: `read:jira-work`, `write:jira-work` (issue CRUD)
  - Confluence: `read:confluence-content.summary`, `write:confluence-content` (page CRUD)
- **Credential Files**:
  - `mcp/credentials/atlassian_oauth.json` (client ID/secret)
  - `mcp/credentials/atlassian_token.json` (refresh token)
- **OAuth Flow**: Same pattern as Google Drive (authorization code flow)

### OAuth Playbook (Lessons from Phase 1 Google Drive)

**Key Learnings**:
1. **Refresh Token Strategy**: Store refresh tokens in credential files, rotate every 30 days
2. **Token Caching**: Cache access tokens in memory (1hr TTL), refresh proactively at 50min
3. **Error Handling**: Retry 3x with exponential backoff (1s, 2s, 4s) on 5xx errors
4. **Credential Isolation**: Each MCP has separate credential files (`.json` in `mcp/credentials/`)
5. **OAuth Scopes**: Request minimum scopes (expand only when needed)

**OAuth Configuration Template** (for Atlassian):
```json
// mcp/credentials/atlassian_oauth.json
{
  "installed": {
    "client_id": "abc123...",
    "client_secret": "xyz789...",
    "auth_uri": "https://auth.atlassian.com/authorize",
    "token_uri": "https://auth.atlassian.com/oauth/token",
    "redirect_uris": ["http://localhost:80/oauth/callback"]
  }
}
```

**Unified OAuth Helper** (extend existing):
```javascript
// mcp/lib/oauth_manager.js (extend from Phase 1)
class OAuthManager {
  constructor(service, credentialPath) {
    this.service = service;
    this.credentialPath = credentialPath;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiry - 60000) {
      return this.accessToken; // Cached, valid for 1+ min
    }
    return await this.refreshAccessToken();
  }

  async refreshAccessToken() {
    // Refresh logic with retry + exponential backoff (from Phase 1)
  }
}

// Usage
const googleOAuth = new OAuthManager('google', 'mcp/credentials/google_drive_oauth.json');
const atlassianOAuth = new OAuthManager('atlassian', 'mcp/credentials/atlassian_oauth.json');
```

---

## Success Criteria

### Phase 4 Complete When:

1. ✅ **All 3 MCPs Operational**:
   - Jira: Create/read/update issues (100% success rate)
   - Confluence: Publish/retrieve/search pages (100% success rate)
   - Google Workspace: Create/edit Docs, Slides, Sheets (100% success rate)

2. ✅ **Synthetic Data Populated**:
   - Jira: 25-30 issues (Phases 0-3 retrospective), 7 epics
   - Confluence: 25+ pages (PRDs, specs, reports)
   - Google Docs: 10-12 documents (PRDs, specs, agent specs)
   - Google Slides: 8-10 decks (phase retrospectives, PRD summaries, roadmap)
   - Google Sheets: 3-5 spreadsheets (velocity tracker, agent scorecard, metrics)

3. ✅ **Search-Before-Create Pattern Working**:
   - Agents search Confluence before creating pages
   - Agents search Google Drive before creating docs
   - Duplicate detection >90% effective
   - Source citation in 100% of new artifacts

4. ✅ **Auto-Generation Workflows Operational**:
   - PRD → 5-slide summary deck (auto-generated within 30s)
   - Phase completion → 6-8 slide retrospective deck (auto-generated)
   - Phase completion → Velocity Tracker row appended (auto-updated)

5. ✅ **Agent Integrations Complete**:
   - Product Architect v1.1: Multi-platform publish, search-before-create, auto-gen Slides
   - Engineering Partner v1.3: Search Confluence for specs, cite sources
   - Data Analyst v1.1: Update Google Sheets, publish reports to Confluence
   - System Evaluator v1.1: Create Jira issues, read Sheets for trends

6. ✅ **End-to-End Workflows Validated**:
   - Workflow 1: New feature proposal (3-platform sync in <60s)
   - Workflow 2: Phase completion (retrospective auto-generated)
   - Workflow 3: Agent performance update (scorecard auto-updated)

7. ✅ **OAuth Management Unified**:
   - Google OAuth extended with write scopes (drive.file, docs, presentations, spreadsheets)
   - Atlassian OAuth configured (single app for Jira + Confluence)
   - Token refresh working (<1% failure rate)

8. ✅ **Performance Targets Met**:
   - Jira API: <2s per issue creation
   - Confluence API: <3s per page publish
   - Google Docs API: <3s per document creation
   - Google Slides API: <5s per deck generation (5 slides)
   - Google Sheets API: <2s per row append

9. ✅ **Security Standards Maintained**:
   - No credentials in code (100% in `mcp/credentials/*.json`, gitignored)
   - OAuth 2.0 for all services (100%)
   - Write scopes minimal (only where needed)
   - No PII in logs (100%)

---

## Deliverables Checklist

### MCP Servers (3 new files)
- [ ] `mcp/servers/jira_server.js` - Issue CRUD, epic management, search
- [ ] `mcp/servers/confluence_server.js` - Page CRUD, search (CQL), space management
- [ ] `mcp/servers/google_workspace_server.js` - Docs/Slides/Sheets creation/editing (extends Drive)

### Setup Guides (3 new files)
- [ ] `mcp/setup_guides/JIRA_SETUP.md` - OAuth, project creation, custom fields
- [ ] `mcp/setup_guides/CONFLUENCE_SETUP.md` - OAuth (shared with Jira), space setup, page templates
- [ ] `mcp/setup_guides/GOOGLE_WORKSPACE_SETUP.md` - Extend Phase 1 guide with Docs/Slides/Sheets

### Agent Updates (4 agents)
- [ ] Product Architect v1.0 → v1.1 (search-before-create, multi-platform, auto-gen Slides)
- [ ] Engineering Partner v1.2 → v1.3 (search Confluence, cite sources)
- [ ] Data Analyst v1.0 → v1.1 (Google Sheets instead of Snowflake)
- [ ] System Evaluator v1.0 → v1.1 (Jira issue creation, Sheets trend analysis)

### Synthetic Data (all platforms)
- [ ] 25-30 Jira issues (Phases 0-3), 7 epics
- [ ] 25+ Confluence pages (PRDs, specs, reports)
- [ ] 10-12 Google Docs (PRDs, specs, agent specs)
- [ ] 8-10 Google Slides (retrospectives, summaries, roadmap)
- [ ] 3-5 Google Sheets (velocity, scorecard, metrics)

### OAuth Configuration (2 services)
- [ ] Google Workspace OAuth extended (new scopes added, token refreshed)
- [ ] Atlassian OAuth configured (Jira + Confluence single app)
- [ ] `scripts/atlassian_auth.js` created (OAuth flow for Jira/Confluence)
- [ ] `scripts/test_jira.js` created (connectivity testing)
- [ ] `scripts/test_confluence.js` created (connectivity testing)

### Auto-Generation Templates (3 templates)
- [ ] PRD Summary Template (5 slides: problem, solution, metrics, approach, timeline)
- [ ] Phase Retrospective Template (8 slides: title, overview, velocity, deliverables, performance, challenges, quality, next)
- [ ] Roadmap Template (14 slides: overview, 7 phase slides, timeline, metrics, risks, team)

### End-to-End Workflows (3 workflows)
- [ ] Workflow 1: New feature proposal (search, generate, publish to 3 platforms, create Jira issue)
- [ ] Workflow 2: Phase completion (retrospective deck auto-gen, velocity tracker update)
- [ ] Workflow 3: Agent performance update (scorecard auto-update on new artifact)

### Performance Benchmarks
- [ ] API latency measured for all 3 MCPs
- [ ] Auto-generation workflow timing documented
- [ ] Search-before-create effectiveness measured (duplicate detection rate)

### Security Audit
- [ ] All credentials gitignored (no leaks)
- [ ] OAuth scopes minimal (documented justification for write scopes)
- [ ] No PII in logs (redaction tested)

---

## Risk Mitigation

### RISK-007: OAuth Scope Expansion for Google Workspace

**Probability**: Medium
**Impact**: Medium
**Description**: Expanding Google OAuth from read-only (Drive) to write access (Docs/Slides/Sheets) may require re-verification or trigger security reviews

**Mitigation**:
1. **Incremental Scope Addition**: Add one scope at a time (drive.file → docs → presentations → spreadsheets)
2. **Test Refresh Flow**: Verify token refresh works after scope expansion
3. **Fallback Plan**: If scope expansion fails, create new OAuth app (separate from Phase 1 read-only)
4. **Documentation**: Clearly document why write access is needed (PRD creation, retrospective generation)

**Early Warning Signals**:
- OAuth refresh fails after adding new scopes
- Google Cloud Console shows "verification required" warnings
- Token expiry handling breaks after scope change

**Contingency**: If write scopes blocked, defer Google Workspace write to Phase 5, use Confluence as primary platform for Phase 4

---

### RISK-008: Atlassian OAuth Complexity (Jira + Confluence)

**Probability**: Low
**Impact**: Medium
**Description**: Atlassian OAuth may have different flow than Google (different redirect URIs, scopes, token format)

**Mitigation**:
1. **Reuse OAuth Pattern**: Adapt `scripts/google_drive_auth.js` to Atlassian endpoints
2. **Read Atlassian Docs**: Follow official OAuth 2.0 (3LO) documentation
3. **Test Jira First**: Get Jira working, then add Confluence scopes
4. **Local Callback Server**: Reuse port 80 callback pattern from Phase 1

**Early Warning Signals**:
- OAuth flow taking >4 hours to configure
- Redirect URI mismatch errors persist after troubleshooting
- Token refresh failure rate >5%

**Contingency**: If Atlassian OAuth too complex, use API tokens (less secure but faster to implement) for Phase 4, migrate to OAuth in Phase 5

---

### RISK-009: Google Slides/Sheets API Complexity

**Probability**: Medium
**Impact**: Low
**Description**: Slides/Sheets APIs have different structure than Docs API (template-based, cell ranges, formatting)

**Mitigation**:
1. **Start Simple**: Create blank Slides/Sheets first (no formatting)
2. **Template Approach**: Create manual templates, copy via API
3. **Iterative Formatting**: Add text first, formatting second
4. **Reference Official Examples**: Use Google API samples as foundation

**Early Warning Signals**:
- Slide creation taking >8 hours to implement
- Auto-generation workflow producing malformed Slides
- Chart insertion failing consistently

**Contingency**: If Slides auto-generation too complex, create manual templates and defer auto-formatting to Phase 5

---

## Next Steps (Immediate Actions)

### 1. Provision Trial Accounts (1-2 hours)

**Jira Cloud**:
- Go to https://www.atlassian.com/software/jira/free
- Create free account (10 users, unlimited projects)
- Create "PM OS" project
- Note down Cloud URL (e.g., `https://pm-os.atlassian.net`)

**Confluence**:
- Included with Jira Cloud account (same login)
- Create "PM OS Documentation" space (space key: PMOS)
- Set permissions to private (only you)

**Google Workspace** (already done ✅):
- Phase 1 OAuth configured
- Need to extend scopes only (no new account)

---

### 2. Create OAuth Playbook (2 hours)

**Document Google Drive Learnings** (`mcp/oauth_playbook.md`):
- OAuth 2.0 authorization code flow (step-by-step)
- Token refresh strategy (proactive at 50min)
- Error handling patterns (retry with exponential backoff)
- Credential storage best practices (`.json` files, gitignored)
- Scope management (minimal scopes, expand as needed)

**Create Atlassian OAuth Script** (`scripts/atlassian_auth.js`):
- Adapt from `scripts/google_drive_auth.js`
- Use Atlassian OAuth endpoints
- Handle Jira + Confluence scopes
- Save tokens to `mcp/credentials/atlassian_token.json`

---

### 3. Begin MCP 1: Jira (Day 1-2)

**Day 1 Tasks**:
- Run `scripts/atlassian_auth.js` to get OAuth tokens
- Implement `mcp/servers/jira_server.js` (basic structure)
- Test connection: `GET /rest/api/3/myself` (returns user info)
- Create 7 epics in Jira (PMOS-EPIC-0 through PMOS-EPIC-7)

**Day 2 Tasks**:
- Bulk create 25-30 issues (use Jira REST API bulk endpoint)
- Set custom fields for PM OS tracking
- Test issue CRUD (create, read, update, delete)
- Write Product Architect v1.1 Jira integration (create issue for PRD)

---

## Critical Files to Create/Modify

### New Files (13 total)

**MCP Servers**:
- `mcp/servers/jira_server.js`
- `mcp/servers/confluence_server.js`
- `mcp/servers/google_workspace_server.js`

**Setup Guides**:
- `mcp/setup_guides/JIRA_SETUP.md`
- `mcp/setup_guides/CONFLUENCE_SETUP.md`
- `mcp/setup_guides/GOOGLE_WORKSPACE_SETUP.md`

**OAuth Scripts**:
- `scripts/atlassian_auth.js`
- `scripts/test_jira.js`
- `scripts/test_confluence.js`

**Templates**:
- `templates/slides_prd_summary.json` (5-slide PRD summary template)
- `templates/slides_retrospective.json` (8-slide phase retrospective template)
- `templates/slides_roadmap.json` (14-slide roadmap template)

**Documentation**:
- `mcp/oauth_playbook.md` (OAuth best practices from Phase 1-4)

---

### Modified Files (4 agents)

**Agent Upgrades**:
- `.claude/agents/product_arch.md` (v1.0 → v1.1)
- `.claude/agents/engineering_partner.md` (v1.2 → v1.3)
- `.claude/agents/data_analyst.md` (v1.0 → v1.1)
- `.claude/agents/system_evaluator.md` (v1.0 → v1.1)

**Configuration**:
- `mcp/config.json` (add Jira, Confluence, Google Workspace servers)
- `.env.example` (add Atlassian OAuth variables)

---

## Verification (How to Test End-to-End)

### Test 1: Jira Issue Creation

```bash
# After Day 2 of MCP 1
node scripts/test_jira.js

# Expected output:
# ✅ Connected to Jira Cloud
# ✅ Created issue PMOS-26: "Test Issue for Phase 4"
# ✅ Retrieved issue: PMOS-26 (Status: To Do, Epic: PMOS-EPIC-4)
# ✅ Updated issue: PMOS-26 (Status: In Progress)
# ✅ Deleted issue: PMOS-26
```

---

### Test 2: Confluence Page Publishing

```bash
# After Day 4 of MCP 2
node scripts/test_confluence.js

# Expected output:
# ✅ Connected to Confluence
# ✅ Created space: PMOS-TEST
# ✅ Published page: "Test PRD" in PMOS-TEST space
# ✅ Searched pages: Found "Test PRD" with CQL
# ✅ Updated page: "Test PRD" (added new section)
# ✅ Deleted page: "Test PRD"
# ✅ Deleted space: PMOS-TEST
```

---

### Test 3: Google Workspace Creation

```bash
# After Day 7 of MCP 3
node scripts/test_google_workspace.js

# Expected output:
# ✅ Connected to Google Drive
# ✅ Created Google Doc: "Test PRD" (ID: abc123...)
# ✅ Created Google Slides: "Test Summary" (5 slides, ID: xyz789...)
# ✅ Created Google Sheets: "Test Tracker" (3 columns, ID: def456...)
# ✅ Searched Drive: Found "Test PRD" in search results
# ✅ Deleted all test files
```

---

### Test 4: End-to-End Workflow

**Manual Test** (after Phase 4 complete):

```
1. User: "Generate PRD for notification preferences"

2. Verify Product Architect v1.1:
   - Searches Confluence for "notification" PRDs
   - Searches Google Drive for "preferences" docs
   - Generates PRD with citations
   - Publishes to Confluence (PMOS space, Product Requirements)
   - Creates in Google Docs (PM OS/Product Requirements folder)
   - Auto-generates 5-slide summary in Google Slides
   - Creates Jira issue with 3 URLs

3. Check results:
   - [ ] Confluence page exists: https://pm-os.atlassian.net/wiki/spaces/PMOS/pages/.../Notification+Preferences
   - [ ] Google Doc exists: https://docs.google.com/document/d/.../edit
   - [ ] Google Slides exists: https://docs.google.com/presentation/d/.../edit (5 slides)
   - [ ] Jira issue exists: PMOS-XX with all 3 URLs in description
   - [ ] All created within 60 seconds ✅
```

---

## Plan Summary

**Objective**: Integrate 3 MCPs (Jira, Confluence, Google Workspace) with auto-generation workflows and search-before-create pattern

**Duration**: 7 days (2d Jira + 2d Confluence + 3d Google Workspace)

**Scope Changes**:
- ❌ Deferred Slack → Phase 7-8 (Productivity Apps)
- ❌ Deferred Snowflake → Phase 5 (Data Intelligence)
- ✅ Added Google Workspace expansion (Docs + Slides + Sheets)

**Key Innovation**:
- Auto-generation: PRD → Slides summary, Phase → Retrospective deck
- Search-before-create: Agents reference existing docs before creating new
- Multi-platform: Publish to Confluence AND Google Workspace simultaneously

**Deliverables**:
- 3 MCP servers (Jira, Confluence, Google Workspace)
- 3 setup guides
- 4 agent upgrades (Product Architect, Engineering Partner, Data Analyst, System Evaluator)
- 30-35 synthetic data files (Jira issues, Confluence pages, Google Docs/Slides/Sheets)
- 3 auto-generation templates (PRD summary, retrospective, roadmap)
- 3 end-to-end workflows validated

**Success Metrics**:
- All 3 MCPs operational (100% success rate)
- Auto-generation workflows <30s per artifact
- Search-before-create >90% duplicate detection
- 3-platform sync in <60s
