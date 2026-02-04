# MCP Reference - Direct API Patterns

This folder contains the original direct API implementation of the Jira integration, preserved for reference.

## Files

- **jira_server_direct_api.js** - Original Jira API wrapper with OAuth, retry logic, rate limiting
- **atlassian_auth.js** - OAuth 2.0 flow with callback server
- **exchange_token.js** - Manual token exchange workflow
- **test_jira.js** - Basic connection test
- **test_jira_crud.js** - Comprehensive CRUD test suite (10 tests)

## Why Archived

These files represented a direct API approach where functions were called as Node.js modules via scripts. This pattern was replaced with a proper MCP server implementation that follows the Model Context Protocol, allowing Claude Code to call Jira tools directly without intermediate scripts.

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

---

**Created**: 2026-02-03
**Status**: Reference Only (Do Not Execute)
