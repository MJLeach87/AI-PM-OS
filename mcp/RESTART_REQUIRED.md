# Restart Required - MCP Server Configuration Changed

**Date**: 2026-02-03
**Reason**: Jira MCP server refactored from direct API to proper MCP protocol

## What Changed

The Jira integration was refactored from a direct API approach (calling functions via scripts) to a proper Model Context Protocol implementation:

### Before (Direct API):
- `mcp/servers/jira_server.js` exported functions as Node.js module
- Scripts like `create_epics.js` would call these functions directly
- Not a true MCP server

### After (Proper MCP):
- `mcp/servers/jira_server.js` is now a full MCP server using `@modelcontextprotocol/sdk`
- Communicates via stdio using JSON-RPC protocol
- Exposes 8 tools directly to Claude Code:
  1. `jira_test_connection`
  2. `jira_create_epic`
  3. `jira_create_issue`
  4. `jira_bulk_create_issues`
  5. `jira_get_issue`
  6. `jira_update_issue`
  7. `jira_search_issues`
  8. `jira_get_project`

## Configuration Updated

`.mcp.json` now points to the new MCP server:
```json
{
  "mcpServers": {
    "jira": {
      "command": "node",
      "args": ["mcp/servers/jira_server.js"]
    }
  }
}
```

## Action Required

**You must restart Claude Code for the MCP server to be loaded.**

1. Exit Claude Code completely
2. Restart Claude Code
3. The Jira MCP tools will be available automatically

## Testing After Restart

To verify the MCP server is working, try:
```
Use jira_test_connection to verify OAuth is working
```

Expected response:
```json
{
  "success": true,
  "user": {
    "accountId": "...",
    "displayName": "Your Name",
    "emailAddress": "your@email.com"
  },
  "cloudId": "...",
  "baseUrl": "https://api.atlassian.com/ex/jira/..."
}
```

## Old Files Archived

The original direct API implementation has been moved to `mcp/reference/` for preservation:
- `mcp/reference/jira_server_direct_api.js` - Original API wrapper
- `mcp/reference/atlassian_auth.js` - OAuth flow
- `mcp/reference/exchange_token.js` - Manual token exchange
- `mcp/reference/test_jira*.js` - Test scripts

These files preserve valuable OAuth patterns for future integrations.

---

**Status**: Awaiting restart to load Jira MCP tools
**Next**: Complete Day 2 tasks (epic creation, bulk issue population)
