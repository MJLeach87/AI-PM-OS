# PM OS Permissions Guide

**Created**: 2026-02-17
**Purpose**: Fine-grained permission configuration for PM OS Claude Code sessions

---

## Overview

PM OS operates in two permission modes depending on the task:

- **Read-only (exploration/research)**: Use when running discovery, reviewing Jira/Confluence, or researching options — no writes needed
- **Write-enabled (publish/create)**: Required when Confluence publishing, Jira writes, or file creation is the goal

The automated bash hook (`scripts/pre-push`) handles security scanning on every push. This guide covers per-skill MCP write permissions and when to apply them.

---

## Per-Skill Minimum Required Permissions

| Skill | Local Writes | MCP Writes Required |
|-------|-------------|---------------------|
| `/discovery` | `execution/discovery/` | None |
| `/prd` | `execution/prds/` | Confluence (publish) |
| `/feature-pipeline` | All `execution/` dirs | Confluence (publish) |
| `/product-architect` | `execution/` | None |
| `/engineering-partner` | `execution/technical_specs/` | None |
| `/ux-strategist` | `execution/prototypes/`, `execution/discovery/` | None |
| `/data-analyst` | `execution/` | None |
| `/gtm-strategist` | `execution/gtm/` | None |
| `/pm-os-quality-audit` | `pm-os-reference/documentation/improvement_proposals/` | Confluence (conditional on phase arg) |
| `/pm-os-doc-sync` | Multiple docs | Confluence (publish) |
| `/release-check` | `pm-os-reference/documentation/improvement_proposals/` (conditional) | Confluence (conditional) |

---

## MCP Write Permissions

### Atlassian Rovo MCP

**Read-only operations** (safe for all sessions, no approval needed):
- `searchJiraIssuesUsingJql` — search Jira
- `getJiraIssue` — read issue details
- `searchConfluenceUsingCql` — search Confluence
- `getConfluencePage` — read page content
- `getConfluencePageDescendants` — navigate page tree

**Write operations** (require explicit justification per CLAUDE.md security gate #3):
- `createJiraIssue` — create new Jira tickets
- `editJiraIssue` — modify existing tickets
- `transitionJiraIssue` — change issue status
- `addCommentToJiraIssue` — add comments
- `createConfluencePage` — create new pages
- `updateConfluencePage` — modify existing pages
- `createConfluenceFooterComment` / `createConfluenceInlineComment` — add comments

---

## Sandbox Mode Guidance

### Use read-only / sandbox when:
- Running `/discovery` research phase (reading artifacts, exploring options)
- Reviewing Jira backlog with JQL searches only
- Exploring Confluence space structure
- Running `/release-check` steps 1–4 (no saves needed if all checks pass)
- Any exploratory session where you're unsure if writes are needed

### Use full permissions when:
- Publishing a Confluence page (any skill with auto-publish enabled)
- Creating or transitioning Jira tickets
- Running `/pm-os-doc-sync` (writes to multiple docs + Confluence)
- Running `/feature-pipeline` end-to-end (writes across all `execution/` dirs)

---

## Read-Only Default

All PM OS skills follow **read-only by default** (from `identity/STANDARDS.md` and CLAUDE.md security gate #3):

1. Read `identity/`, `pm-os-reference/`, and `execution/` freely
2. Write to local `execution/` directories (no MCP required)
3. MCP writes (Confluence/Jira) require explicit skill step authorization

When in doubt, start read-only and escalate permissions only when a skill's publish step requires it.

---

**Maintained By**: PM OS Orchestrator
**Last Updated**: 2026-02-17
**Related Files**: `.mcp.json`, `mcp/setup_guides/ROVO_MCP_SETUP.md`, `.claude/CLAUDE.md`
