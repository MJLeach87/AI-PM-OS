# MCP Integration Validation Index

**Purpose**: Track validation status for all Model Context Protocol (MCP) integrations in PM OS.

**Location**: All validation reports are stored in `mcp/validations/`

---

## MCP Integration Status

| MCP Server | Status | Phase | Validated | Read Ops | Write Ops | Report |
|------------|--------|-------|-----------|----------|-----------|--------|
| **Atlassian Rovo** | ✅ Complete | Phase 4 | 2026-02-04 | 8/8 ✅ | 3/3 ✅ | [Report](validations/atlassian_rovo_mcp.md) |
| **Google Drive** | 🟡 Planned | Phase 1 | Pending | - | - | Not started |
| **Slack** | 🟡 Planned | Phase 7 | Pending | - | - | Not started |
| **Snowflake** | 🟡 Planned | Phase 5 | Pending | - | - | Not started |

---

## Validation Standards

All MCP integrations must pass the following validation criteria:

### 1. Authentication ✓
- [ ] OAuth flow completes successfully
- [ ] Tokens persist across Claude Code sessions
- [ ] Automatic token refresh (if applicable)
- [ ] User credentials stored securely in `.env` or browser-based OAuth

### 2. Connection ✓
- [ ] MCP server appears in `claude mcp list`
- [ ] Server shows as "Connected"
- [ ] Tools load in `.claude/settings.local.json`

### 3. Read Operations ✓
- [ ] Resource discovery (list available resources)
- [ ] Read primary entities (files, issues, pages, etc.)
- [ ] Search/query capabilities
- [ ] Content retrieval with proper formatting

### 4. Write Operations ✓
- [ ] Create new entities
- [ ] Update existing entities
- [ ] Delete entities (if required)
- [ ] Batch operations (if applicable)

### 5. Natural Language Interface ✓
- [ ] Commands work via natural language prompts
- [ ] Error handling provides helpful messages
- [ ] Response format is consistent

### 6. Performance ✓
- [ ] Average response time < 5 seconds
- [ ] OAuth setup time < 10 minutes
- [ ] Session persistence confirmed
- [ ] No rate limit errors under normal usage

### 7. Documentation ✓
- [ ] Setup guide in `mcp/setup_guides/[provider]_setup.md`
- [ ] Validation report in `mcp/validations/[provider]_mcp.md`
- [ ] Tool reference with examples
- [ ] Known limitations documented

---

## Quick Reference

### Active MCPs (1)
- **Atlassian Rovo**: Jira + Confluence (27 tools)

### Upcoming MCPs (3)
- **Google Drive**: Phase 1 - Legacy document retrieval
- **Snowflake**: Phase 5 - Data warehouse queries
- **Slack**: Phase 7 - Team communication

### Configuration
- **Server Definitions**: `.mcp.json` (project root)
- **Permissions**: `.claude/settings.local.json`
- **Credentials**: `.env` (gitignored) or OAuth tokens (session storage)

### Testing a New MCP

1. **Setup**:
   - Add server config to `.mcp.json`
   - Create setup guide in `mcp/setup_guides/[provider]_setup.md`
   - Copy template: `mcp/validations/_TEMPLATE.md` → `[provider]_mcp.md`

2. **Authentication**:
   - Complete OAuth or credential setup
   - Verify `claude mcp list` shows server as connected

3. **Validation**:
   - Test authentication persistence
   - Validate all read operations
   - Validate all write operations
   - Test natural language interface
   - Measure performance metrics

4. **Documentation**:
   - Complete validation report
   - Update this index
   - Add agent workflow recommendations

---

## MCP Resources

**MCP Protocol**: https://modelcontextprotocol.io/
**Official Registry**: https://github.com/modelcontextprotocol/servers
**PM OS Setup Guides**: `mcp/setup_guides/`

---

**Last Updated**: 2026-02-04
**Maintained By**: PM OS System Evaluator
**Next Review**: After each new MCP integration
