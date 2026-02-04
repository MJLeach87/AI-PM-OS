# MCP Reference - Custom Implementation Archive

This folder contains archived custom implementations of Jira/Confluence integration, preserved for reference and learning purposes.

## Migration History

**Phase 1 (Direct API)** → **Phase 2 (Custom MCP)** → **Phase 3 (Atlassian Rovo MCP)** ✅

PM OS migrated to **Atlassian's official Rovo MCP Server** on 2026-02-03 for superior authentication, security, and maintainability.

## Archived Files

### Direct API Implementation (Day 1)
- **jira_server_direct_api.js** - Original Jira API wrapper with OAuth 2.0, retry logic, rate limiting
- **atlassian_auth.js** - OAuth 2.0 flow with callback server
- **exchange_token.js** - Manual token exchange workflow
- **test_jira.js** - Basic connection test
- **test_jira_crud.js** - Comprehensive CRUD test suite (10 tests)

### Custom MCP Server (Day 1-2)
- **jira_server_mcp_v2.js** - Full MCP server implementation using @modelcontextprotocol/sdk
  - 8 MCP tools (test_connection, create_epic, create_issue, bulk_create, get_issue, update_issue, search_issues, get_project)
  - OAuth 2.0 token management with refresh logic
  - Retry logic with exponential backoff
  - Rate limiting handling (429 responses)

## Why We Migrated to Rovo MCP

**Custom Implementation Issues**:
- ❌ OAuth 2.0 refresh token problems (Atlassian API inconsistently returns refresh_token)
- ❌ Manual token management and expiry handling
- ❌ Custom permission logic required
- ❌ Ongoing maintenance burden
- ❌ OAuth security complexity

**Rovo MCP Advantages**:
- ✅ OAuth 2.1 handled automatically via browser flow
- ✅ Zero token management (no refresh_token issues!)
- ✅ Respects existing Jira/Confluence permissions automatically
- ✅ Officially supported by Atlassian
- ✅ Free during beta period
- ✅ Built-in audit logging
- ✅ Natural language interface for common operations
- ✅ Multi-client support (Claude, ChatGPT, Gemini)

## When to Reference

Use these files when:
- Building new MCP servers that need OAuth patterns
- Implementing retry logic and rate limiting
- Understanding the underlying Jira API structure
- Debugging OAuth token refresh issues
- Adding new Jira API endpoints not yet in the MCP server

## OAuth Patterns Preserved

The `atlassian_auth.js` and `exchange_token.js` files contain robust OAuth 2.0 implementation:
- Authorization code flow with PKCE
- Token refresh with proactive expiry check
- Retry logic with exponential backoff (1s, 2s, 4s)
- Rate limiting handling (429 responses)
- Multi-resource support (Jira + Confluence)

These patterns can be adapted for other Atlassian services or OAuth 2.0 integrations.

## Current Integration (Rovo MCP)

PM OS now uses **Atlassian Rovo MCP Server** via remote connection:
- **Endpoint**: `https://mcp.atlassian.com/v1/mcp`
- **Setup Guide**: See `mcp/setup_guides/ROVO_MCP_SETUP.md`
- **Configuration**: `.mcp.json` uses `npx mcp-remote` proxy

---

**Created**: 2026-02-03
**Updated**: 2026-02-03 (Migration to Rovo MCP)
**Status**: Reference Only (Do Not Execute)
