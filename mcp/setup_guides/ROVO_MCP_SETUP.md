# Atlassian Rovo MCP Server Setup Guide

**Created**: 2026-02-03
**Status**: Official Integration Approach
**Difficulty**: Easy (5 minutes)

---

## Overview

The **Atlassian Rovo MCP Server** is the official, native integration for connecting Jira, Confluence, and Compass with Claude Code, ChatGPT, and other AI tools via the Model Context Protocol.

**Why Rovo MCP?**
- ✅ **Zero OAuth complexity**: Automatic browser-based OAuth 2.1 flow
- ✅ **Respects permissions**: Uses your existing Jira/Confluence access controls
- ✅ **Officially supported**: Built and maintained by Atlassian
- ✅ **Free during beta**: No additional cost
- ✅ **Multi-client**: Works with Claude, ChatGPT, Gemini, AWS QuickSuite
- ✅ **Audit logging**: Tracks all operations for compliance

---

## Prerequisites

Before starting, ensure you have:

1. **Atlassian Cloud Site**
   - Jira, Confluence, or Compass instance
   - Example: `https://yourcompany.atlassian.net`
   - ✅ PM OS uses: `https://aipmos.atlassian.net`

2. **Site Admin Access** (for initial setup)
   - Only required for first-time OAuth consent
   - Regular users can connect after admin approval

3. **Node.js v18+** (for `mcp-remote` proxy)
   - Verify: `node --version`
   - Install: https://nodejs.org

4. **Claude Code**
   - Already installed if you're reading this!

---

## Setup Steps

### Step 1: Configure `.mcp.json`

The `.mcp.json` file in the PM OS root is already configured:

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
- Uses `npx` to run `mcp-remote` without global installation
- `-y` flag auto-accepts the package installation
- Connects to Atlassian's remote MCP endpoint

### Step 2: Restart Claude Code

**Critical**: Claude Code must restart to load the new MCP configuration.

```bash
# Exit Claude Code completely
# Restart Claude Code
claude
```

### Step 3: Complete OAuth 2.1 Flow

On first connection, you'll be prompted to authenticate:

1. **Browser Opens Automatically**
   - Redirects to `https://auth.atlassian.com`
   - Shows Atlassian login page

2. **Log In with Your Atlassian Account**
   - Use your `@yourcompany.atlassian.net` credentials
   - Or personal Atlassian account

3. **Grant Permissions**
   - Review requested scopes:
     - Read Jira issues, projects, users
     - Write Jira issues (create, update)
     - Read Confluence pages
     - Write Confluence pages
   - Click "Accept" to authorize

4. **Confirmation**
   - Browser shows "Authorization Successful!"
   - Claude Code receives OAuth token automatically

**For Site Admins**: The first user to connect must be a site admin. This establishes the OAuth app for the organization. After initial setup, regular users can connect with their own permissions.

### Step 4: Verify Connection

Test the connection using MCP tools in Claude Code:

```
Check available MCP servers
```

Expected output:
```
✅ atlassian - Connected
   - Jira (aipmos.atlassian.net)
   - Confluence (aipmos.atlassian.net)
```

---

## Available Capabilities

Once connected, you can:

### Jira Operations
- **Search**: "Find all issues in project PMOS assigned to me"
- **Create**: "Create a new issue in PMOS: Implement user authentication"
- **Update**: "Update PMOS-123 status to In Progress"
- **Summarize**: "Summarize recent activity in epic PMOS-EPIC-4"

### Confluence Operations
- **Search**: "Find Confluence pages about API documentation"
- **Create**: "Create a new Confluence page for Phase 4 retrospective"
- **Update**: "Update the Phase 4 timeline page with completion dates"
- **Summarize**: "Summarize all meeting notes from last week"

### Natural Language Interface

Rovo MCP uses natural language commands instead of direct API calls:

**Custom MCP (Old Approach)**:
```javascript
await jiraRequest('/rest/api/3/issue', {
  method: 'POST',
  body: JSON.stringify({
    fields: {
      project: { key: 'PMOS' },
      summary: 'Test Issue',
      issuetype: { name: 'Story' }
    }
  })
});
```

**Rovo MCP (New Approach)**:
```
Create a story in PMOS: Test Issue
```

---

## Troubleshooting

### Issue: "Authorization failed" or "Access denied"

**Solution**:
1. Ensure you're logged into the correct Atlassian site
2. Verify site admin has completed initial OAuth consent
3. Check your Jira/Confluence permissions:
   - Go to Settings → Products → Jira/Confluence
   - Verify you have access to the projects/spaces you're querying

### Issue: "Connection timeout" or "mcp-remote not found"

**Solution**:
1. Verify Node.js v18+ is installed: `node --version`
2. Check internet connectivity
3. Try manual installation: `npm install -g mcp-remote`
4. Restart Claude Code

### Issue: "OAuth token expired"

**Solution**:
- Rovo MCP handles token refresh automatically
- If issues persist, disconnect and reconnect:
  1. Run `/mcp disconnect atlassian`
  2. Run `/mcp connect atlassian`
  3. Complete OAuth flow again

### Issue: "Permission denied for operation"

**Solution**:
- Rovo MCP respects your Jira/Confluence permissions
- If you can't perform an action in Jira web UI, you can't do it via MCP
- Contact your Jira/Confluence admin to request appropriate permissions

---

## Security & Privacy

### What Data is Shared?

- **Only data you explicitly request**: Rovo MCP doesn't sync or cache Atlassian data
- **Respects permissions**: You only see what you can see in Jira/Confluence web UI
- **Session-based**: OAuth tokens are session-specific and expire automatically

### How OAuth Works

1. **Authorization Code Flow** (OAuth 2.1):
   - User logs in via browser
   - Atlassian issues short-lived authorization code
   - `mcp-remote` exchanges code for access token
   - Token stored securely in session (not on disk)

2. **Token Refresh**:
   - Handled automatically by Rovo MCP
   - No manual token management required
   - No refresh_token issues (unlike OAuth 2.0)

3. **Audit Logging**:
   - All Rovo MCP operations are logged in Atlassian
   - Site admins can review usage in Security → Audit Log

### IP Allowlisting

If your organization uses IP allowlisting for Atlassian Cloud:
- Rovo MCP operations honor those rules automatically
- No additional configuration required

---

## Comparison: Rovo MCP vs Custom MCP

| Feature | Custom MCP (Old) | Rovo MCP (New) |
|---------|------------------|----------------|
| **OAuth** | Manual OAuth 2.0 with token refresh issues | Automatic OAuth 2.1 via browser |
| **Token Management** | Manual refresh_token handling | Automatic (no user involvement) |
| **Permissions** | Custom logic required | Inherits Jira/Confluence permissions |
| **Maintenance** | Ongoing code updates for API changes | Zero maintenance (Atlassian-managed) |
| **Security** | Self-managed OAuth credentials | Enterprise-grade security (Atlassian) |
| **Audit Logging** | None (must build custom) | Built-in (Atlassian Audit Log) |
| **API Precision** | Direct REST API calls | Natural language interface |
| **Bulk Operations** | Supported (bulk_create_issues) | Unknown (needs testing) |
| **Custom Fields** | Direct field manipulation | Unknown (needs testing) |
| **Setup Time** | 2-4 hours (OAuth debugging) | 5 minutes (automatic flow) |
| **Cost** | Free (self-hosted) | Free during beta |

---

## Advanced Usage

### Checking MCP Server Status

```bash
# List all MCP servers
/mcp list

# Check Atlassian connection
/mcp status atlassian

# View available tools
/mcp tools atlassian
```

### Disconnecting and Reconnecting

```bash
# Disconnect from Atlassian
/mcp disconnect atlassian

# Reconnect (re-triggers OAuth)
/mcp connect atlassian
```

### Using with Multiple Atlassian Sites

If you have multiple Atlassian sites (e.g., production + staging):

```json
{
  "mcpServers": {
    "atlassian-prod": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/mcp"]
    },
    "atlassian-staging": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/mcp"]
    }
  }
}
```

**Note**: OAuth will ask which site to connect to during the flow.

---

## Migration from Custom MCP

If you previously used PM OS's custom Jira MCP server:

**Archived Files** (preserved in `mcp/reference/`):
- `jira_server_direct_api.js` - Direct API implementation
- `jira_server_mcp_v2.js` - Custom MCP server
- `atlassian_auth.js` - OAuth 2.0 flow
- OAuth credentials in `mcp/credentials/` (no longer needed)

**Breaking Changes**:
- Custom MCP tools (`jira_create_epic`, `jira_bulk_create_issues`) no longer available
- Replace with natural language commands to Rovo MCP
- Label conventions (phase-0, agent-product-architect) may need adaptation

**Agent Updates Required**:
- Product Architect v1.1 → v1.2 (use natural language Jira commands)
- Remove direct `jiraRequest()` function calls
- Use conversational interface instead

---

## Next Steps

After setup:

1. **Test Connection** (see Step 4 above)
2. **Create First Issue**: "Create a test issue in PMOS"
3. **Search Existing Data**: "Find all issues in Phase 4 epic"
4. **Update Agents**: Modify Product Architect to use natural language Jira commands

---

## Resources

- **Official Docs**: [Atlassian Rovo MCP Server Documentation](https://support.atlassian.com/atlassian-rovo-mcp-server/)
- **GitHub Repo**: [atlassian/atlassian-mcp-server](https://github.com/atlassian/atlassian-mcp-server)
- **Community Forum**: [Atlassian Community - Rovo MCP](https://community.atlassian.com/forums/Atlassian-Rovo-MCP-Server/gh-p/AtlassianMCPServer)
- **Claude Code MCP Docs**: [code.claude.com/docs/mcp](https://code.claude.com/docs/en/mcp)
- **Pricing**: [Rovo Dev Pricing](https://www.atlassian.com/software/rovo-dev/pricing) (Free during beta)

---

**Status**: ✅ Production Ready
**Last Updated**: 2026-02-03
**Maintained By**: Atlassian (Official), PM OS (Documentation)
