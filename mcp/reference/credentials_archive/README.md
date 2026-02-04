# OAuth Credentials Archive

**Archived**: 2026-02-03
**Reason**: Migrated to Atlassian Rovo MCP (automatic OAuth 2.1 via browser)

---

## Files

- **atlassian_oauth.json**: OAuth 2.0 client credentials for custom Jira/Confluence integration
  - Client ID, client secret, auth/token URIs, redirect URIs, scopes
  - Used by custom MCP server (`jira_server_mcp_v2.js`)

- **atlassian_token.json**: OAuth 2.0 access tokens (incomplete)
  - Access token, expires_in, scope, created_at timestamp
  - **Missing refresh_token** (Atlassian OAuth 2.0 API inconsistency)
  - Caused 403 token refresh errors in custom implementation

---

## Why Archived

These credentials are **no longer needed** because:

1. **Rovo MCP Handles OAuth Automatically**
   - Atlassian Rovo MCP uses OAuth 2.1 browser flow
   - Zero manual token management required
   - No credential files to maintain

2. **OAuth 2.0 Issues Resolved**
   - Custom implementation had refresh_token problems
   - Atlassian API inconsistently returned refresh tokens
   - Rovo MCP eliminates this complexity entirely

3. **Security Improvement**
   - No credentials stored in project files
   - Session-based authentication via browser
   - Automatic token refresh (managed by Atlassian)

---

## Historical Context

### Custom MCP OAuth Flow (Deprecated)

**Day 1 Approach** (2026-02-03):
1. Create OAuth app in Atlassian Developer Console
2. Save client credentials to `atlassian_oauth.json`
3. Run `atlassian_auth.js` to trigger browser OAuth flow
4. Exchange authorization code for access + refresh tokens
5. Save tokens to `atlassian_token.json`
6. Custom MCP server (`jira_server_mcp_v2.js`) loads tokens on startup
7. Manual refresh logic checks token expiry, calls refresh endpoint

**Problems Encountered**:
- ❌ Atlassian OAuth 2.0 API didn't always return `refresh_token`
- ❌ Token refresh failures (403 errors)
- ❌ Manual token expiry management prone to errors
- ❌ Credentials in version control (even if gitignored, risky)

### Rovo MCP OAuth Flow (Current)

**2026-02-03+ Approach**:
1. Configure `.mcp.json` with `npx mcp-remote https://mcp.atlassian.com/v1/mcp`
2. Restart Claude Code
3. Browser opens automatically for OAuth 2.1 flow
4. User logs in, grants permissions
5. Rovo MCP handles all token management
6. No credential files needed ✅

---

## When to Reference

Use these files as reference when:
- Building custom OAuth 2.0 integrations for non-Atlassian services
- Understanding OAuth authorization code flow
- Debugging OAuth issues in other integrations
- Comparing custom vs official integration approaches

**Do NOT use for Jira/Confluence** - use Rovo MCP instead.

---

## Migration Notes

If reverting to custom MCP server (not recommended):
1. Move files back to `mcp/credentials/`
2. Re-run OAuth flow: `node mcp/servers/run_oauth.cjs`
3. Update `.mcp.json` to use custom server
4. Restart Claude Code

**Recommended**: Stay on Rovo MCP for zero maintenance and better security.

---

**Status**: Reference Only
**Replacement**: Atlassian Rovo MCP (automatic OAuth 2.1)
