# Phase 4 Implementation Plan: MCP Integration Suite

**Created**: 2026-02-02
**Phase**: 4 (MCP Integration Suite)
**Status**: Planning
**Estimated Duration**: 6-8 days (based on Phase 1 Google Drive velocity: 2 days/MCP × 4 MCPs)

---

## Executive Summary

Phase 4 will integrate 4 external tools via Model Context Protocol (Jira, Confluence, Slack, Snowflake), enabling PM OS to sync with enterprise tooling. The key challenge identified: **we need data to test these integrations**.

**Solution**: Use PM OS's own development (Phases 0-3) as synthetic data source. Create retrospective Jira issues, publish existing PRDs/specs to Confluence, simulate Slack development conversations, and warehouse velocity metrics in Snowflake.

**Meta-Recursive Benefit**: PM OS will manage its own development via the MCP integrations it's building.

---

## Phase 4 Objectives

1. **Integrate 4 MCP Services**: Jira, Confluence, Slack, Snowflake
2. **Unified OAuth Management**: Reuse Google Drive patterns for credential handling
3. **Synthetic Data Creation**: Populate each service with PM OS development data
4. **End-to-End Workflow Validation**: Demonstrate full integration chain (Jira → Confluence → Slack → Snowflake)
5. **Agent Integration**: Enable Product Architect, Engineering Partner, System Evaluator to use MCPs

---

## Challenge: Synthetic Data Strategy

### Problem Statement

To validate MCP integrations, we need realistic data in Jira, Confluence, Slack, and Snowflake. Without existing enterprise data, we risk:
- Untested edge cases (empty results, large datasets, pagination)
- Inability to validate end-to-end workflows
- No baseline for performance testing

### Solution: PM OS Self-Documentation

**Use PM OS development (Phases 0-3) as the data source**:
- Create retrospective Jira issues for completed work
- Publish existing PRDs/specs to Confluence
- Simulate Slack conversations about Phase 0-3 progress
- Warehouse velocity metrics in Snowflake

**Benefits**:
1. **Realistic**: Data mirrors actual enterprise PM work
2. **Complete**: Covers full artifact lifecycle (discovery → PRD → spec → delivery)
3. **Testable**: Known ground truth (we know Phase 0 took 1 day, etc.)
4. **Demonstrates value**: Shows how PM OS uses tools to manage its own development
5. **Meta-recursive**: PM OS builds itself AND documents itself via MCPs

---

## Synthetic Data Blueprint

### 1. Jira MCP - Synthetic Issue Data

**Epic Structure** (7 epics = 7 phases):
```
PMOS-EPIC-0: Phase 0 - Bootstrap Foundation
PMOS-EPIC-1: Phase 1 - Core Agent Team + Google Drive MCP
PMOS-EPIC-2: Phase 2 - Execution Layer
PMOS-EPIC-3: Phase 3 - Self-Improvement Loop
PMOS-EPIC-4: Phase 4 - MCP Integration Suite
PMOS-EPIC-5: Phase 5 - Data Intelligence Layer
PMOS-EPIC-6: Phase 6 - IDE Optimization
PMOS-EPIC-7: Phase 7 - Enterprise Readiness
```

**Sample Issues for Phase 0** (8 issues = 8 deliverables):
```
PMOS-1: Create directory structure (18 folders)
  Status: Done
  Assignee: Product Architect Agent
  Story Points: 1
  Sprint: Phase 0
  Completed: 2026-01-31
  Time Spent: 1h

PMOS-2: Create Identity Layer templates (STRATEGY.md, STANDARDS.md, ROADMAP.md)
  Status: Done
  Assignee: Product Architect Agent
  Story Points: 3
  Sprint: Phase 0
  Completed: 2026-01-31
  Time Spent: 2h

PMOS-3: Create agent spec template
  Status: Done
  Assignee: Product Architect Agent
  Story Points: 2
  Sprint: Phase 0
  Completed: 2026-01-31
  Time Spent: 1.5h

PMOS-4: Create PRD template (BMAD-compliant)
  Status: Done
  Assignee: Product Architect Agent
  Story Points: 2
  Sprint: Phase 0
  Completed: 2026-01-31
  Time Spent: 1.5h

PMOS-5: Create MCP integration plan template
  Status: Done
  Assignee: Product Architect Agent
  Story Points: 1
  Sprint: Phase 0
  Completed: 2026-01-31
  Time Spent: 1h

PMOS-6: Implement Orchestrator agent (Cursor + Claude Code versions)
  Status: Done
  Assignee: Product Architect Agent
  Story Points: 5
  Sprint: Phase 0
  Completed: 2026-01-31
  Time Spent: 2h

PMOS-7: Implement Product Architect agent (Cursor + Claude Code versions)
  Status: Done
  Assignee: Product Architect Agent
  Story Points: 5
  Sprint: Phase 0
  Completed: 2026-01-31
  Time Spent: 2h

PMOS-8: Run Phase 0 validation tests (5 scenarios)
  Status: Done
  Assignee: Human PM
  Story Points: 2
  Sprint: Phase 0
  Completed: 2026-01-31
  Time Spent: 1h
```

**Total Synthetic Issues**: ~40 issues covering Phases 0-3 (8 + 5 + 5 + 7 = 25 done, 15 planned for Phase 4-7)

**Jira Board Structure**:
- **Backlog**: Phase 4-7 planned work
- **In Progress**: (empty - Phase 4 not started)
- **Done**: Phases 0-3 completed issues

**Custom Fields to Populate**:
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
│   ├── Engineering Partner - API Contract Template
│   └── Google Drive MCP OAuth Setup Guide
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
│   ├── Phase 2 Agent Selection OST
│   └── Phase 3 Self-Improvement OST
├── Phase Reports
│   ├── Phase 0 Completion Report
│   ├── Phase 1 Completion Report
│   ├── Phase 2 Completion Report
│   └── Phase 3 Completion Report
└── Operations
    ├── Quality Metrics Dashboard
    ├── Velocity Tracking
    └── ROADMAP-001 Implementation Summary
```

**Documents to Publish** (~25 pages):
- Existing PRDs from `execution/prds/`
- Existing specs from `execution/technical_specs/`
- Agent specs from `.claude/agents/` (convert .md → Confluence)
- Phase completion reports from `pm-os-reference/documentation/phase-history/`
- Quality dashboard, velocity tracking

**Confluence Page Metadata**:
- Labels: `phase-0`, `phase-1`, `agent-spec`, `prd`, `technical-spec`
- Space: `PMOS`
- Parent page hierarchy for navigation
- Version history (publish v1.0, then update to v1.1 to test versioning)

**Test Cases**:
- Publish new PRD to Confluence
- Retrieve existing spec by title search
- Update agent spec (version bump)
- Full-text search across all PM OS docs

---

### 3. Slack MCP - Synthetic Conversation Data

**Channel Structure**:
```
#pm-os-dev (development updates)
#pm-os-alerts (System Evaluator notifications)
#pm-os-metrics (daily/weekly stats)
#general (team discussions)
```

**Synthetic Messages for #pm-os-dev**:
```
[2026-01-31 09:00] @ProductArchitect: 🚀 Starting Phase 0 - Bootstrap Foundation
[2026-01-31 11:30] @ProductArchitect: ✅ Identity Layer templates complete (STRATEGY.md, STANDARDS.md, ROADMAP.md)
[2026-01-31 14:00] @ProductArchitect: 🤖 Orchestrator agent v1.0 deployed (Cursor + Claude versions)
[2026-01-31 17:00] @ProductArchitect: 🎉 Phase 0 COMPLETE! All 8 deliverables done in 1 day
[2026-01-31 18:00] @HumanPM: Amazing velocity! Phase 0 was estimated at 2 weeks, you crushed it in 1 day 🔥

[2026-02-01 10:00] @EngineeringPartner: 🔧 Engineering Partner v1.2 deployed with security review capability
[2026-02-01 12:00] @UXStrategist: 🎨 UX Strategist v1.0 deployed - ready for prototype generation
[2026-02-01 15:00] @DataAnalyst: 📊 Data Analyst v1.0 deployed - can now generate SQL queries and validate metrics
[2026-02-01 16:00] @GTMStrategist: 💼 GTM Strategist v1.0 deployed - positioning and value props ready
[2026-02-01 18:00] @ProductArchitect: ✅ Phase 2 COMPLETE! 5-agent team fully operational

[2026-02-02 12:00] @SystemEvaluator: 🔍 System Evaluator v1.0 deployed - weekly quality audits starting
[2026-02-02 14:00] @DocMaintainer: 📝 Documentation Maintainer v1.0 deployed - keeping docs in sync
[2026-02-02 19:00] @DocMaintainer: ✅ Phase 3 COMPLETE! Quality dashboard now tracking 67 metrics
```

**Synthetic Messages for #pm-os-alerts**:
```
[2026-02-02 19:30] @SystemEvaluator: 🎯 Quality Gate: Phase 3 - 100% pass rate (7/7 deliverables, zero rework)
[2026-02-02 19:31] @SystemEvaluator: ⚡ Velocity Alert: Phase 3 completed 7.5x faster than estimate (2 days vs 3 weeks)
[2026-02-02 19:32] @SystemEvaluator: 📈 North Star Metric Update: Discovery artifacts at 12/week (50% above 8/week target)
```

**Synthetic Messages for #pm-os-metrics**:
```
[2026-02-02 20:00] @SystemEvaluator: 📊 Daily Metrics Report (2026-02-02)
- Phases Complete: 4/7 (57%)
- Deliverables Complete: 25/37 (67.6%)
- Agents Operational: 7/7 (100%)
- Quality Gate Pass Rate: 100%
- Average Velocity: 11x faster than estimates
- Active Risks: 1 (OAuth complexity in Phase 4 - monitoring)
- Open Issues: 0
```

**Test Cases**:
- Post new message to #pm-os-dev
- Retrieve last 50 messages from #pm-os-alerts
- Search messages for "Phase 3"
- Daily metrics posting automation

**Message Metadata**:
- Timestamp (actual dates: 2026-01-31 to 2026-02-02)
- User (agent names as bot users)
- Reactions (👍 ✅ 🎉 for milestone messages)
- Thread replies (e.g., HumanPM responding to agent updates)

---

### 4. Snowflake MCP - Synthetic Data Warehouse

**Schema: `pm_os_analytics`**

**Table 1: `phase_history`**
```sql
CREATE TABLE pm_os_analytics.phase_history (
  phase_id INT,
  phase_name VARCHAR(100),
  status VARCHAR(20),
  start_date DATE,
  end_date DATE,
  duration_days DECIMAL(4,2),
  estimated_days INT,
  deliverables_planned INT,
  deliverables_completed INT,
  completion_pct DECIMAL(5,2),
  velocity_per_day DECIMAL(4,2)
);

-- Sample data
INSERT INTO phase_history VALUES
(0, 'Bootstrap Foundation', 'Complete', '2026-01-31', '2026-01-31', 1.0, 14, 8, 8, 100.00, 8.00),
(1, 'Core Agent Team + Google Drive MCP', 'Complete', '2026-01-31', '2026-02-01', 2.0, 21, 5, 5, 100.00, 2.50),
(2, 'Execution Layer', 'Complete', '2026-02-01', '2026-02-01', 0.17, 21, 5, 5, 100.00, 30.00),
(3, 'Self-Improvement Loop', 'Complete', '2026-02-01', '2026-02-02', 2.0, 21, 7, 7, 100.00, 3.50),
(4, 'MCP Integration Suite', 'Planned', NULL, NULL, NULL, 28, 4, 0, 0.00, NULL),
(5, 'Data Intelligence Layer', 'Planned', NULL, NULL, NULL, 21, 4, 0, 0.00, NULL),
(6, 'IDE Optimization', 'Planned', NULL, NULL, NULL, 21, 4, 0, 0.00, NULL),
(7, 'Enterprise Readiness', 'Planned', NULL, NULL, NULL, 42, 5, 0, 0.00, NULL);
```

**Table 2: `agent_performance`**
```sql
CREATE TABLE pm_os_analytics.agent_performance (
  agent_name VARCHAR(50),
  version VARCHAR(10),
  deployed_date DATE,
  phase_deployed INT,
  artifacts_generated INT,
  acceptance_rate DECIMAL(5,2),
  avg_time_hours DECIMAL(4,2),
  upgrades INT,
  last_upgrade_date DATE
);

-- Sample data
INSERT INTO agent_performance VALUES
('Orchestrator', 'v1.0', '2026-01-31', 0, NULL, NULL, NULL, 0, NULL),
('Product Architect', 'v1.0', '2026-01-31', 0, 5, 100.00, 2.0, 0, NULL),
('Engineering Partner', 'v1.2', '2026-01-31', 1, 6, 100.00, 1.5, 2, '2026-01-31'),
('UX Strategist', 'v1.0', '2026-01-31', 1, 3, 100.00, 2.0, 0, NULL),
('Data Analyst', 'v1.0', '2026-02-01', 2, 1, 100.00, 1.0, 0, NULL),
('GTM Strategist', 'v1.0', '2026-02-01', 2, 1, 100.00, 1.0, 0, NULL),
('System Evaluator', 'v1.0', '2026-02-01', 3, 2, 100.00, 2.0, 0, NULL),
('Documentation Maintainer', 'v1.0', '2026-02-02', 3, 3, 100.00, 1.0, 0, NULL);
```

**Table 3: `artifact_catalog`**
```sql
CREATE TABLE pm_os_analytics.artifact_catalog (
  artifact_id INT,
  artifact_name VARCHAR(200),
  artifact_type VARCHAR(50),
  phase INT,
  created_date DATE,
  created_by_agent VARCHAR(50),
  template_compliant BOOLEAN,
  strategic_alignment BOOLEAN,
  acceptance_status VARCHAR(20),
  rework_required BOOLEAN,
  time_to_complete_hours DECIMAL(4,2)
);

-- Sample data (21 artifacts)
INSERT INTO artifact_catalog VALUES
(1, 'Directory Structure', 'Infrastructure', 0, '2026-01-31', 'Product Architect', TRUE, TRUE, 'Approved', FALSE, 1.0),
(2, 'Identity Layer Templates', 'Template', 0, '2026-01-31', 'Product Architect', TRUE, TRUE, 'Approved', FALSE, 2.0),
(3, 'Agent Spec Template', 'Template', 0, '2026-01-31', 'Product Architect', TRUE, TRUE, 'Approved', FALSE, 1.5),
-- ... (18 more rows for all artifacts)
```

**Table 4: `quality_metrics_daily`**
```sql
CREATE TABLE pm_os_analytics.quality_metrics_daily (
  metric_date DATE,
  phases_complete INT,
  deliverables_complete INT,
  deliverables_total INT,
  completion_pct DECIMAL(5,2),
  agents_operational INT,
  quality_gate_pass_rate DECIMAL(5,2),
  security_incidents INT,
  open_issues INT,
  avg_velocity_multiplier DECIMAL(5,2)
);

-- Sample data
INSERT INTO quality_metrics_daily VALUES
('2026-01-31', 1, 8, 37, 21.62, 2, 100.00, 0, 0, 14.0),
('2026-02-01', 3, 18, 37, 48.65, 6, 100.00, 0, 0, 29.0),
('2026-02-02', 4, 25, 37, 67.57, 8, 100.00, 0, 0, 11.0);
```

**Table 5: `north_star_metrics`**
```sql
CREATE TABLE pm_os_analytics.north_star_metrics (
  metric_name VARCHAR(100),
  metric_date DATE,
  baseline_value DECIMAL(10,2),
  target_value DECIMAL(10,2),
  current_value DECIMAL(10,2),
  unit VARCHAR(20),
  status VARCHAR(20)
);

-- Sample data
INSERT INTO north_star_metrics VALUES
('PRD Drafting Time', '2026-02-02', 8.0, 4.0, NULL, 'hours', 'Pending'),
('Engineering Rework Rate', '2026-02-02', 40.0, 10.0, 0.0, 'percent', 'Exceeding'),
('Sprint Readiness', '2026-02-02', 60.0, 95.0, 100.0, 'percent', 'Exceeding'),
('Discovery Artifacts per Week', '2026-02-02', 2.0, 8.0, 12.0, 'count', 'Exceeding'),
('Identity Traceability', '2026-02-02', 0.0, 100.0, 100.0, 'percent', 'Met');
```

**Sample Queries to Test**:
```sql
-- What was average velocity in Phases 0-3?
SELECT AVG(velocity_per_day) FROM phase_history WHERE status = 'Complete';

-- Which agents have highest acceptance rates?
SELECT agent_name, acceptance_rate FROM agent_performance ORDER BY acceptance_rate DESC;

-- How many artifacts created per phase?
SELECT phase, COUNT(*) as artifact_count FROM artifact_catalog GROUP BY phase;

-- North Star metrics exceeding targets
SELECT metric_name, current_value, target_value
FROM north_star_metrics
WHERE current_value > target_value;

-- Daily completion trend
SELECT metric_date, completion_pct FROM quality_metrics_daily ORDER BY metric_date;
```

---

## Implementation Sequence

### MCP 1: Jira (Days 1-2)

**Day 1**: OAuth Setup + Basic Connectivity
- Create Jira Cloud instance (free tier: 10 users)
- Configure OAuth 2.0 app credentials
- Implement MCP server (`mcp/servers/jira_server.js`)
- Test connection: `GET /rest/api/3/myself`

**Day 2**: Data Population + Agent Integration
- Create PM OS project in Jira
- Bulk create 25 issues (Phases 0-3 retrospective)
- Create 7 epics (Phases 0-7)
- Test issue creation, retrieval, update
- Integrate Product Architect: "Create Jira issue for this PRD"

**Validation Test**:
```
Product Architect generates PRD → automatically creates Jira issue PMOS-XX with:
- Title from PRD
- Description from PRD summary
- Epic link to correct phase
- Story points estimated
- Labels: phase-N, agent-generated
```

---

### MCP 2: Confluence (Days 3-4)

**Day 3**: OAuth Setup + Page Publishing
- Use same Jira Cloud OAuth (Confluence included)
- Implement MCP server (`mcp/servers/confluence_server.js`)
- Test connection: `GET /wiki/rest/api/space`
- Create "PM OS Documentation" space

**Day 4**: Documentation Migration + Agent Integration
- Publish 25 existing docs to Confluence (PRDs, specs, agent specs, phase reports)
- Set up page hierarchy (Product Requirements → Phase 0 PRD, etc.)
- Test page creation, retrieval, update, search
- Integrate Product Architect: "Publish this PRD to Confluence"

**Validation Test**:
```
Product Architect generates PRD → publishes to Confluence → creates linked Jira issue → posts Slack notification
```

---

### MCP 3: Slack (Days 5-6)

**Day 5**: OAuth Setup + Channel Creation
- Create Slack workspace (free tier)
- Configure OAuth 2.0 app (bot token scopes: `channels:read`, `chat:write`, `chat:history`)
- Implement MCP server (`mcp/servers/slack_server.js`)
- Create channels: #pm-os-dev, #pm-os-alerts, #pm-os-metrics

**Day 6**: Message Population + Agent Integration
- Populate #pm-os-dev with 20 synthetic messages (Phase 0-3 history)
- Test message posting, retrieval, search
- Integrate System Evaluator: "Post quality gate alert to #pm-os-alerts"
- Set up daily metrics posting automation

**Validation Test**:
```
System Evaluator detects quality issue → posts alert to #pm-os-alerts → creates Jira issue → updates Confluence runbook
```

---

### MCP 4: Snowflake (Days 7-8)

**Day 7**: OAuth Setup + Schema Creation
- Create Snowflake trial account (30 days free)
- Configure OAuth 2.0 app
- Implement MCP server (`mcp/servers/snowflake_server.js`)
- Create database `PM_OS_ANALYTICS` and schema
- Create 5 tables (phase_history, agent_performance, artifact_catalog, quality_metrics_daily, north_star_metrics)

**Day 8**: Data Population + Agent Integration
- Populate all 5 tables with Phase 0-3 data (~100 rows total)
- Test SQL query execution
- Integrate Data Analyst: "Query Snowflake for average velocity in completed phases"
- Create view: `v_system_health` (pre-aggregated metrics)

**Validation Test**:
```
Data Analyst queries Snowflake → generates insight → updates quality dashboard → posts to Slack → creates Confluence report
```

---

## End-to-End Workflow Validation

### Workflow 1: New Feature Proposal

**Trigger**: User asks Product Architect to "Generate PRD for agent versioning system"

**Expected Flow**:
1. Product Architect generates PRD (saves to `execution/prds/`)
2. Product Architect publishes PRD to Confluence (page created in "Product Requirements")
3. Product Architect creates Jira issue PMOS-XX (linked to Confluence page)
4. Product Architect posts to #pm-os-dev: "📄 New PRD: Agent Versioning System - [Confluence](link) | [Jira](link)"
5. System Evaluator records artifact in Snowflake (`artifact_catalog` table)

**Validation**: All 5 systems updated within 30 seconds

---

### Workflow 2: Daily Metrics Report

**Trigger**: Scheduled daily at 8:00 AM

**Expected Flow**:
1. Data Analyst queries Snowflake (`SELECT * FROM quality_metrics_daily WHERE metric_date = CURRENT_DATE`)
2. Data Analyst formats metrics report
3. Data Analyst posts to #pm-os-metrics (Slack)
4. Data Analyst updates Quality Dashboard Confluence page
5. If anomalies detected (velocity drop >20%), System Evaluator creates Jira issue

**Validation**: Daily report posted automatically, no human intervention

---

### Workflow 3: Phase Completion

**Trigger**: Human PM confirms "Phase 4 complete"

**Expected Flow**:
1. Documentation Maintainer updates ROADMAP.md (marks Phase 4 complete)
2. Documentation Maintainer publishes Phase 4 Completion Report to Confluence
3. Documentation Maintainer closes all Phase 4 Jira issues (status → Done)
4. Documentation Maintainer posts to #pm-os-dev: "🎉 Phase 4 COMPLETE! [Report](link)"
5. Data Analyst inserts Phase 4 row into Snowflake `phase_history` table
6. System Evaluator triggers quality audit (scheduled post-phase)

**Validation**: All 6 steps complete, Phase 5 automatically becomes current phase

---

## Unified OAuth Management

### OAuth Playbook (Google Drive Learnings)

Based on Phase 1 Google Drive MCP (514ms latency, 0% error rate):

**Key Learnings**:
1. **Refresh Token Strategy**: Store refresh tokens in `.env`, rotate every 30 days
2. **Token Caching**: Cache access tokens in memory (1hr TTL), refresh proactively at 50min
3. **Error Handling**: Retry 3x with exponential backoff (1s, 2s, 4s) on 5xx errors
4. **Credential Isolation**: Each MCP has separate credentials file (`.env.jira`, `.env.confluence`, etc.)
5. **OAuth Scopes**: Request minimum scopes (read-only for Phase 4, write for Phase 5+)

**OAuth Configuration Template**:
```bash
# .env.jira
JIRA_CLIENT_ID=abc123...
JIRA_CLIENT_SECRET=xyz789...
JIRA_REFRESH_TOKEN=1//0abc...
JIRA_REDIRECT_URI=http://localhost:3000/oauth/callback
JIRA_CLOUD_URL=https://your-domain.atlassian.net
```

**Unified OAuth Helper** (`mcp/lib/oauth_manager.js`):
```javascript
class OAuthManager {
  constructor(service, envPrefix) {
    this.service = service;
    this.clientId = process.env[`${envPrefix}_CLIENT_ID`];
    this.clientSecret = process.env[`${envPrefix}_CLIENT_SECRET`];
    this.refreshToken = process.env[`${envPrefix}_REFRESH_TOKEN`];
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
    // Refresh logic with retry + exponential backoff
  }
}
```

**Reusable Across All MCPs**: Jira, Confluence, Slack, Snowflake all use same OAuthManager class

---

## Agent Integration Updates

### Product Architect v1.1

**New Capabilities**:
- Publish PRDs to Confluence
- Create Jira issues from PRDs
- Post feature announcements to Slack

**Context Loading**:
```markdown
### MCP Integrations (Phase 4+)

**Jira MCP**: Create issues for new PRDs
- Use Case: After generating PRD, create tracking issue
- API: `POST /rest/api/3/issue` with fields: summary, description, issuetype, project, epic link

**Confluence MCP**: Publish PRDs to documentation
- Use Case: Publish PRD to "Product Requirements" space
- API: `POST /wiki/rest/api/content` with title, space, body (Confluence Storage Format)

**Slack MCP**: Announce new PRDs
- Use Case: Post to #pm-os-dev when PRD published
- API: `POST /api/chat.postMessage` with channel, text, attachments
```

---

### Engineering Partner v1.3

**New Capabilities**:
- Retrieve technical docs from Confluence
- Link Jira issues to specs
- Query Snowflake for technical debt metrics

**Context Loading**:
```markdown
### MCP Integrations (Phase 4+)

**Confluence MCP**: Retrieve architecture docs
- Use Case: Reference existing system design when generating specs
- API: `GET /wiki/rest/api/content/search?cql=type=page AND space=PMOS AND title~"architecture"`

**Snowflake MCP**: Query technical debt
- Use Case: Check accumulated tech debt before proposing new features
- Query: `SELECT SUM(time_estimate_hours) FROM technical_debt WHERE status = 'Open'`
```

---

### System Evaluator v1.1

**New Capabilities**:
- Post quality alerts to Slack
- Create Jira issues for quality violations
- Query Snowflake for trend analysis
- Update Confluence dashboard

**Context Loading**:
```markdown
### MCP Integrations (Phase 4+)

**Slack MCP**: Post quality alerts
- Use Case: Alert #pm-os-alerts when quality gate fails
- API: `POST /api/chat.postMessage` with priority, severity, remediation steps

**Jira MCP**: Create quality issues
- Use Case: Create improvement proposal issues
- API: `POST /rest/api/3/issue` with label: `quality-improvement`

**Snowflake MCP**: Trend analysis
- Use Case: Query historical quality metrics for trend detection
- Query: `SELECT metric_date, quality_gate_pass_rate FROM quality_metrics_daily ORDER BY metric_date DESC LIMIT 30`
```

---

### Data Analyst v1.1

**New Capabilities**:
- Query Snowflake for all analytics
- Generate insights for Confluence reports
- Post daily metrics to Slack

**Context Loading**:
```markdown
### MCP Integrations (Phase 4+)

**Snowflake MCP**: Primary data source
- Use Case: All metric queries, trend analysis, forecasting
- Tables: phase_history, agent_performance, artifact_catalog, quality_metrics_daily, north_star_metrics

**Slack MCP**: Daily metrics posting
- Use Case: Post to #pm-os-metrics every morning at 8 AM
- Format: Text summary + chart attachment (if available)

**Confluence MCP**: Analytics reports
- Use Case: Publish weekly analytics reports to "Operations" space
- Include: Charts, trend analysis, recommendations
```

---

## Success Criteria

### Phase 4 Complete When:

1. ✅ **All 4 MCPs Operational**:
   - Jira: Create/read/update issues (100% success rate)
   - Confluence: Publish/retrieve/search pages (100% success rate)
   - Slack: Post/retrieve messages (100% success rate)
   - Snowflake: Execute SQL queries (<30s average)

2. ✅ **Synthetic Data Populated**:
   - Jira: 25+ issues (Phases 0-3 retrospective)
   - Confluence: 25+ pages (PRDs, specs, reports)
   - Slack: 20+ messages (development history)
   - Snowflake: 5 tables, 100+ rows (metrics data)

3. ✅ **Agent Integrations Complete**:
   - Product Architect: Publishes PRDs, creates Jira issues
   - Engineering Partner: Retrieves Confluence docs
   - System Evaluator: Posts Slack alerts, queries Snowflake
   - Data Analyst: Queries Snowflake, posts metrics

4. ✅ **End-to-End Workflows Validated**:
   - Workflow 1: New feature proposal (5-step chain)
   - Workflow 2: Daily metrics report (automated)
   - Workflow 3: Phase completion (6-step chain)

5. ✅ **OAuth Management Unified**:
   - Single OAuthManager class reused across all 4 MCPs
   - Credentials isolated in separate `.env.*` files
   - Token refresh working (<1% failure rate)

6. ✅ **Performance Targets Met**:
   - Jira API: <2s per request
   - Confluence API: <3s per page publish
   - Slack API: <1s per message post
   - Snowflake queries: <30s for complex queries

7. ✅ **Security Standards Maintained**:
   - No credentials in code (100% in `.env.*`)
   - OAuth 2.0 for all services (100%)
   - Read-only scopes by default (write only where needed)
   - No PII in logs (100%)

---

## Risk Mitigation

### RISK-004: OAuth Complexity in Phase 4

**Current Status**: Monitoring (Medium probability, High impact)

**Mitigation Strategy**:
1. **Reuse Google Drive Patterns**: OAuthManager class proven in Phase 1
2. **Service-Specific Quirks**: Document each service's OAuth flow differences
3. **Incremental Testing**: Test OAuth before building MCP server
4. **Fallback Plan**: If OAuth too complex for one service, defer to Phase 5

**Early Warning Signals**:
- OAuth setup taking >4 hours per service
- Refresh token failure rate >5%
- Token expiry handling inconsistent across services

**Contingency**: If 2+ services hit OAuth issues, create unified OAuth service (Phase 4a), then integrate MCPs (Phase 4b)

---

### NEW RISK-006: Synthetic Data Quality

**Probability**: Low
**Impact**: Medium
**Description**: Synthetic data may not cover edge cases, leading to untested scenarios

**Mitigation**:
1. **Edge Case Coverage**: Include empty results, large datasets (50+ Jira issues), pagination
2. **Real-World Simulation**: Simulate concurrent writes, rate limiting, API errors
3. **Data Validation**: Cross-check Snowflake data against VELOCITY_TRACKING.md
4. **Iterative Refinement**: Add more synthetic data if gaps found during testing

---

## Deliverables Checklist

- [ ] **Jira MCP** (OAuth, issue CRUD, bulk operations)
- [ ] **Confluence MCP** (OAuth, page publish/retrieve, search)
- [ ] **Slack MCP** (OAuth, message post/retrieve, channel management)
- [ ] **Snowflake MCP** (OAuth, SQL query execution, result parsing)
- [ ] **Synthetic Data**: 25 Jira issues, 25 Confluence pages, 20 Slack messages, 5 Snowflake tables
- [ ] **OAuth Playbook** (documented Google Drive learnings, OAuthManager class)
- [ ] **Agent Updates**: Product Architect v1.1, Engineering Partner v1.3, System Evaluator v1.1, Data Analyst v1.1
- [ ] **End-to-End Workflows**: 3 workflows validated (feature proposal, daily metrics, phase completion)
- [ ] **MCP Setup Guides**: 4 guides (Jira, Confluence, Slack, Snowflake) in `mcp/setup_guides/`
- [ ] **Performance Benchmarks**: API latency measured, documented in quality dashboard
- [ ] **Security Audit**: All credentials gitignored, OAuth scopes minimal, no PII in logs

---

## Next Steps

### Immediate (Start Phase 4)

1. **Create OAuth Playbook** (2 hours)
   - Document Google Drive OAuth learnings
   - Create OAuthManager class
   - Define credential storage pattern

2. **Provision Trial Accounts** (1 hour)
   - Jira Cloud (free tier, 10 users)
   - Slack workspace (free tier)
   - Snowflake trial (30 days free)
   - Confluence (included with Jira Cloud)

3. **Begin MCP 1: Jira** (Day 1-2)
   - OAuth setup
   - Create PM OS project
   - Populate 25 retrospective issues

---

**Plan Created By**: Product Architect Agent
**Reviewed By**: Human PM
**Status**: Ready to begin Phase 4
**Estimated Duration**: 6-8 days (2 days/MCP × 4 MCPs)
**Blocking Dependencies**: None (Phase 3 complete, Google Drive OAuth patterns documented)
