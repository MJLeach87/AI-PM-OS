# Restart Required - Migrated to Atlassian Rovo MCP

**Date**: 2026-02-03
**Reason**: Strategic migration from custom MCP server to Atlassian's official Rovo MCP Server

---

## What Changed

PM OS has migrated from a **custom-built Jira MCP server** to **Atlassian's official Rovo MCP Server** for superior authentication, security, and maintainability.

### Migration Path

**Phase 1 (Direct API)** → **Phase 2 (Custom MCP)** → **Phase 3 (Rovo MCP)** ✅

### Before (Custom MCP Server):
- Custom `jira_server.js` with manual OAuth 2.0 token management
- Direct REST API calls to Jira/Confluence
- OAuth refresh_token issues (Atlassian OAuth 2.0 inconsistencies)
- Required ongoing maintenance for API changes
- 8 custom MCP tools (test_connection, create_epic, create_issue, etc.)

### After (Atlassian Rovo MCP):
- Official Atlassian-hosted MCP server at `https://mcp.atlassian.com/v1/mcp`
- Automatic OAuth 2.1 browser flow (zero token management!)
- Natural language interface for Jira/Confluence operations
- Respects existing user permissions automatically
- Built-in audit logging
- Free during beta, officially supported by Atlassian

---

## Why We Migrated

**Custom MCP Issues Encountered**:
- ❌ OAuth 2.0 refresh_token not consistently returned by Atlassian API
- ❌ Manual token expiry and refresh logic prone to errors
- ❌ Connection failures due to token management complexity
- ❌ Ongoing maintenance burden for API changes
- ❌ Custom permission logic required

**Rovo MCP Advantages**:
- ✅ OAuth 2.1 handled automatically via browser (no token files!)
- ✅ Zero maintenance (Atlassian-managed)
- ✅ Automatic permission inheritance from Jira/Confluence
- ✅ Enterprise-grade security and compliance
- ✅ Multi-client support (Claude, ChatGPT, Gemini)
- ✅ Built-in audit logging for all operations

---

## Configuration Updated

`.mcp.json` now connects to Atlassian's remote MCP server:

```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/mcp"]
    }
  }
}
```

**What this does**:
- Uses `npx` to run Atlassian's `mcp-remote` proxy (no global install needed)
- Connects to official Rovo MCP endpoint
- Handles OAuth 2.1 authentication automatically

---

## Action Required

### Step 1: Restart Claude Code

**Critical**: Claude Code must restart to load the new MCP configuration.

```bash
# Exit Claude Code completely
# Restart Claude Code in the PM OS directory
claude
```

### Step 2: Complete OAuth 2.1 Flow (First Time Only)

On first connection after restart:

1. **Browser Opens Automatically**
   - Redirects to `https://auth.atlassian.com`
   - Login with your Atlassian account (`@aipmos.atlassian.net` or personal)

2. **Grant Permissions**
   - Review requested scopes (read/write Jira, read/write Confluence)
   - Click "Accept" to authorize

3. **Confirmation**
   - Browser shows "Authorization Successful!"
   - Return to Claude Code - connection is live!

**Note for Site Admins**: First user to connect must be a site admin to establish OAuth app for the organization.

---

## Testing After Restart

### Verify Connection

```
Check available MCP servers
```

Expected output:
```
✅ atlassian - Connected
   - Jira (aipmos.atlassian.net)
   - Confluence (aipmos.atlassian.net)
```

### Test Jira Operations

Try natural language commands:

```
Search for all issues in project PMOS
```

```
Create a test issue in PMOS: Verify Rovo MCP connection
```

```
List all epics in PMOS project
```

---

## Archived Files

All custom MCP implementation files preserved in `mcp/reference/`:

**Direct API Implementation** (Day 1):
- `jira_server_direct_api.js` - Original API wrapper with OAuth 2.0
- `atlassian_auth.js` - OAuth flow with callback server
- `exchange_token.js` - Manual token exchange
- `test_jira.js`, `test_jira_crud.js` - Test scripts

**Custom MCP Server** (Day 1-2):
- `jira_server_mcp_v2.js` - Full MCP server with 8 tools (now archived)

**OAuth Credentials** (No longer needed):
- `mcp/credentials/atlassian_oauth.json` - Client credentials (archived)
- `mcp/credentials/atlassian_token.json` - Access/refresh tokens (archived)

These files demonstrate OAuth patterns and can be referenced for building other integrations, but are **not needed** for Rovo MCP (which handles auth automatically).

---

## Breaking Changes

### Custom MCP Tools No Longer Available

The following custom tools are replaced by natural language interface:

| Old Custom Tool | New Rovo MCP Approach |
|-----------------|----------------------|
| `jira_test_connection` | Automatic - connection tested on startup |
| `jira_create_epic` | "Create an epic in PMOS: [epic name]" |
| `jira_create_issue` | "Create a [story/task/bug] in PMOS: [summary]" |
| `jira_bulk_create_issues` | Multiple create commands (test if bulk supported) |
| `jira_get_issue` | "Get details for PMOS-123" |
| `jira_update_issue` | "Update PMOS-123 status to In Progress" |
| `jira_search_issues` | "Find all issues where [JQL query]" |
| `jira_get_project` | "Show project details for PMOS" |

### Agent Updates Required

- **Product Architect v1.1** → **v1.2**: Remove custom Jira integration code, use natural language commands
- **Phase 4 Implementation Plan**: Update Day 2 tasks to use Rovo MCP approach

---

## Next Steps

After restart and OAuth completion:

1. ✅ Verify connection (see "Testing After Restart" above)
2. 📝 Create Day 2 epics using natural language interface
3. 📝 Bulk create Phase 0-3 retrospective issues
4. 📝 Test Rovo MCP capabilities vs custom implementation
5. 📝 Update Product Architect agent to use Rovo MCP
6. 📝 Update all documentation to reflect new approach

---

## Troubleshooting

### "Authorization failed" or OAuth errors
- Ensure you're logged into `aipmos.atlassian.net`
- Verify site admin completed initial OAuth consent
- Try disconnecting and reconnecting: `/mcp disconnect atlassian` → `/mcp connect atlassian`

### "mcp-remote not found" or connection timeout
- Verify Node.js v18+ installed: `node --version`
- Check internet connectivity to `https://mcp.atlassian.com`
- Try manual install: `npm install -g mcp-remote`

### "Permission denied" for operations
- Rovo MCP respects your Jira/Confluence permissions
- Verify you can perform the action in Jira web UI
- Contact Jira admin to request appropriate permissions

**Full Setup Guide**: See `mcp/setup_guides/ROVO_MCP_SETUP.md`

---

## Resources

- **Setup Guide**: `mcp/setup_guides/ROVO_MCP_SETUP.md` (comprehensive instructions)
- **Official Docs**: [Atlassian Rovo MCP Server](https://support.atlassian.com/atlassian-rovo-mcp-server/)
- **GitHub**: [atlassian/atlassian-mcp-server](https://github.com/atlassian/atlassian-mcp-server)
- **Community**: [Atlassian Community - Rovo MCP](https://community.atlassian.com/forums/Atlassian-Rovo-MCP-Server/gh-p/AtlassianMCPServer)

---

**Status**: ✅ Ready for Restart
**Migration**: Custom MCP → Rovo MCP (Official Atlassian Integration)
**Next**: Restart Claude Code, complete OAuth 2.1 flow, test Jira operations
