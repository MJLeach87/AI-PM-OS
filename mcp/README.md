# MCP Integration Directory

**Purpose**: Model Context Protocol (MCP) integrations for PM OS

---

## Directory Structure

```
mcp/
├── README.md                          # This file - directory overview
├── VALIDATION_INDEX.md                # Master index of all MCP validation status
├── .mcp.json                          # MCP server configurations (in project root)
├── config.json                        # Legacy config (deprecated)
├── credentials/                       # OAuth tokens & API keys (gitignored)
├── validations/                       # MCP validation reports
│   ├── _TEMPLATE.md                   # Template for new MCP validations
│   └── atlassian_rovo_mcp.md          # ✅ Atlassian Rovo MCP validation
├── setup_guides/                      # Step-by-step setup instructions
│   └── ROVO_MCP_SETUP.md              # Atlassian Rovo MCP setup guide
├── servers/                           # Custom MCP server implementations (if any)
└── reference/                         # Reference documentation & research
```

---

## Quick Start

### 1. View Integration Status
See all MCP integrations and their validation status:
```
View: mcp/VALIDATION_INDEX.md
```

### 2. Add New MCP Integration

**Step 1**: Create setup guide
```bash
cp mcp/setup_guides/_TEMPLATE.md mcp/setup_guides/[provider]_setup.md
# Fill in setup instructions
```

**Step 2**: Configure MCP server
Add to `.mcp.json` in project root:
```json
{
  "mcpServers": {
    "[provider-key]": {
      "command": "[command]",
      "args": ["[arg1]", "[arg2]"]
    }
  }
}
```

**Step 3**: Authenticate
Follow setup guide for OAuth/API key setup

**Step 4**: Create validation report
```bash
cp mcp/validations/_TEMPLATE.md mcp/validations/[provider]_mcp.md
# Run validation tests and document results
```

**Step 5**: Update index
Add new MCP to `mcp/VALIDATION_INDEX.md`

### 3. Test Existing MCP

Check connection:
```bash
claude mcp list
```

Test with natural language:
```
"List [resources] from [provider]"
"Create a [entity] in [provider]"
```

---

## Active Integrations

### Atlassian Rovo MCP ✅
**Status**: Complete (Phase 4)
**Tools**: 27 (Jira + Confluence)
**Setup**: `setup_guides/ROVO_MCP_SETUP.md`
**Validation**: `validations/atlassian_rovo_mcp.md`

**Example Commands**:
- "Get my Jira issues"
- "Create a story in PMOS: [summary]"
- "Show me Confluence spaces"
- "Publish this PRD to Confluence"

---

## Planned Integrations

### Google Drive (Phase 1)
**Purpose**: Legacy document retrieval
**Status**: 🟡 Planned
**Validation**: Not started

### Snowflake (Phase 5)
**Purpose**: Data warehouse queries
**Status**: 🟡 Planned
**Validation**: Not started

### Slack (Phase 7)
**Purpose**: Team communication
**Status**: 🟡 Planned
**Validation**: Not started

---

## Standards & Best Practices

### Authentication
- **Prefer OAuth 2.0/2.1** over API keys
- **Browser-based flows** over manual token copying
- **Session persistence** required for good UX
- **Credentials in `.env`** or OAuth session storage (never commit)

### Validation Requirements
All MCPs must pass:
- ✅ Authentication working
- ✅ 80%+ read operations passing
- ✅ 60%+ write operations passing (if applicable)
- ✅ Average response time < 10 seconds
- ✅ Documentation complete (setup guide + validation report)

### Documentation
- **Setup guide**: Step-by-step OAuth/credential setup
- **Validation report**: 11-section comprehensive test results
- **Index entry**: Add to VALIDATION_INDEX.md
- **Agent recommendations**: How each agent should use the MCP

---

## Troubleshooting

### MCP Server Not Connecting
```bash
# Check server definition
cat .mcp.json

# Verify command works
[command] [args]

# Check Claude Code logs
cat ~/.claude/logs/mcp.log

# Restart Claude Code
exit
claude
```

### Authentication Failing
```bash
# Clear credentials
rm -rf mcp/credentials/[provider]*

# Re-authenticate
# Follow setup guide for provider

# Verify connection
claude mcp list
```

### Tools Not Loading
```bash
# Check permissions granted
cat .claude/settings.local.json

# Grant permissions manually if needed
# (Claude Code will prompt on first use)

# Restart Claude Code
exit
claude
```

---

## Support Resources

**MCP Protocol**: https://modelcontextprotocol.io/
**Official Registry**: https://github.com/modelcontextprotocol/servers
**PM OS Documentation**: `pm-os-reference/documentation/`

---

**Last Updated**: 2026-02-04
**Maintained By**: PM OS System Evaluator
**Next Review**: After each new MCP integration
