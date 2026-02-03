# Phase 4: MCP Integration Suite - Quick Reference

**Created**: 2026-02-03
**Status**: Ready to begin (Phase 3 complete ✅)
**Duration**: 7-9 days
**Full Plan**: `C:\Users\MJLea\.claude\plans\buzzing-mapping-peach.md`

---

## Quick Summary

### 4 MCP Integrations
1. **Jira MCP** (Days 1-2) - Issue tracking with 25 retrospective issues
2. **Confluence MCP** (Days 3-4) - Documentation publishing with search-before-create
3. **Google Workspace MCP** (Days 5-7) - Docs + Slides + Sheets expansion ⭐
4. **Snowflake MCP** (Days 8-9) - Data warehouse queries

### Key Changes
- ❌ **Removed**: Slack (requires paid plan → deferred to Phase 8+)
- ✅ **Added**: Google Slides + Sheets (foundational PM documents)
- ✅ **Pattern**: Search before create (agents reference existing docs)
- ✅ **Auto-gen**: PRD → Slides summary, Phase → Retrospective presentation

### Synthetic Data (PM OS's own Phases 0-3)
- 25 Jira issues (retrospective tracking)
- 25 Confluence pages (PRDs, specs, reports)
- 10-15 Google Docs (PRDs, specs, agent specs)
- **8-10 Google Slides** (4 phase retrospectives + roadmap + PRD summaries) ⭐
- **3-5 Google Sheets** (velocity tracker, agent scorecard, OKR tracker) ⭐
- 5 Snowflake tables (~100 rows of metrics)

### Agent Upgrades
- **Product Architect v1.1**: Search before create, multi-platform publish, auto-gen Slides
- **Engineering Partner v1.3**: Search for specs, cite sources
- **Data Analyst v1.1**: Query Snowflake, update Sheets, publish to Confluence
- **System Evaluator v1.1**: Create Jira issues, trend analysis via Snowflake

### Why Slides/Sheets Matter
**Slides are foundational PM documents**:
- Executive reviews (feature proposals, roadmap updates)
- Phase retrospectives (visual summaries with charts)
- Stakeholder presentations (cross-functional alignment)
- Weekly/monthly metrics dashboards

**Auto-generation workflows**:
1. PRD → 5-slide summary deck (auto-generated)
2. Phase completion → 6-7 slide retrospective (with velocity charts)
3. Phase completion → Velocity tracker update (spreadsheet auto-refreshes)

### Implementation Sequence
```
Days 1-2:  Jira MCP (OAuth + 25 issues + agent integration)
Days 3-4:  Confluence MCP (OAuth + 25 pages + search-before-create)
Days 5-7:  Google Workspace (Docs + Slides + Sheets + auto-gen workflows) ⭐
Days 8-9:  Snowflake MCP (OAuth + 5 tables + analytics)
```

### Success Criteria (9 total)
1. ✅ All 4 MCPs operational
2. ✅ Synthetic data populated (all platforms)
3. ✅ Search-before-create pattern working
4. ✅ Multi-platform publishing (Confluence + Docs + Slides)
5. ✅ Agent integrations complete (4 agents upgraded)
6. ✅ End-to-end workflows validated (3 workflows)
7. ✅ **Auto-generation workflows operational** ⭐
8. ✅ OAuth unified (Google reuses Phase 1, Jira+Confluence share)
9. ✅ Performance targets met (<2-3s API latency)

### OAuth Strategy
- **Google Workspace**: Reuse Phase 1 OAuth ✅ (just add scopes for Docs/Slides/Sheets)
- **Jira + Confluence**: Single Atlassian OAuth app (1 setup for both)
- **Snowflake**: New OAuth with key pair authentication

### Example Workflow: New Feature Proposal
```
User: "Generate PRD for two-factor authentication"

Product Architect:
1. Searches Confluence for related PRDs (finds 2)
2. Searches Google Drive for docs (finds 1)
3. Generates PRD citing all 3 sources
4. Publishes to Confluence (Product Requirements space)
5. Creates in Google Docs (PM OS/Product Requirements folder)
6. Auto-generates 5-slide summary deck in Google Slides ⭐
7. Creates Jira issue PMOS-XX linking to all 3 artifacts
8. Records in Snowflake artifact_catalog table
```

### Files to Create
**New MCP servers**:
- `mcp/servers/jira_server.js`
- `mcp/servers/confluence_server.js`
- `mcp/servers/google_workspace_server.js` (expand from google_drive_server.js)
- `mcp/servers/snowflake_server.js`

**Setup guides**:
- `mcp/setup_guides/JIRA_SETUP.md`
- `mcp/setup_guides/CONFLUENCE_SETUP.md`
- `mcp/setup_guides/GOOGLE_WORKSPACE_SETUP.md` (expand from GOOGLE_DRIVE_SETUP.md)
- `mcp/setup_guides/SNOWFLAKE_SETUP.md`

**Agent updates**:
- Product Architect v1.0 → v1.1
- Engineering Partner v1.2 → v1.3
- Data Analyst v1.0 → v1.1
- System Evaluator v1.0 → v1.1

### Next Steps When Ready
1. Provision trial accounts (Jira Cloud, Confluence, Snowflake - Google already ✅)
2. Create OAuth playbook (document unified OAuth strategy)
3. Begin MCP 1: Jira (Days 1-2)

---

**Full detailed plan**: `C:\Users\MJLea\.claude\plans\buzzing-mapping-peach.md`
**Plan status**: Ready to execute
**Prerequisites**: Phase 3 complete ✅, all documentation synced ✅
**Blockers**: None
