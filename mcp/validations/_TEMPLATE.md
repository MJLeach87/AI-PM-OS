# [Provider Name] MCP Validation Report

**MCP Server**: [Provider Name] (e.g., Google Drive, Slack, Snowflake)
**Date**: YYYY-MM-DD
**Status**: 🔄 In Progress / ✅ Complete / ❌ Failed
**Phase**: Phase N
**Validation Duration**: [Time from setup to complete validation]

---

## Executive Summary

[Brief overview of what this MCP enables and validation status]

**Quick Stats**:
- **Authentication**: ✅/❌
- **Read Operations**: X/Y passed
- **Write Operations**: X/Y passed
- **Tools Available**: X tools
- **Performance**: < X seconds average response

---

## 1. Configuration & Setup

### MCP Server Config
**File**: `.mcp.json`

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

**Configuration Status**: ✅/❌
**Endpoint**: [API endpoint or server URL]
**Protocol**: [HTTP, stdio, SSE, etc.]

### Authentication Method
- **Type**: OAuth 2.0 / OAuth 2.1 / API Key / Service Account
- **Flow**: [Browser-based / Token-based / Credentials file]
- **Token Storage**: [Session / .env / Keychain]
- **Persistence**: ✅ Persists across sessions / ❌ Requires re-auth

### Connection Test
```bash
claude mcp list
```

**Expected Output**: `[provider-key]: [command] [args] - ✓ Connected`
**Actual Result**: [Paste actual output]
**Status**: ✅/❌

---

## 2. Authentication Validation

### OAuth Flow (if applicable)
- **Start Command**: [Command to initiate OAuth]
- **Browser Redirect**: ✅ Opens automatically / ❌ Manual URL copy required
- **Callback**: ✅ Success message displayed / ❌ Error encountered
- **User Info Retrieved**: ✅/❌

### Credentials Test
- **User/Account**: [Username or account ID]
- **Email**: [User email]
- **Permissions**: [List granted scopes/permissions]
- **Status**: ✅ Authenticated / ❌ Authentication failed

**Token Persistence Test**:
1. Authenticate successfully
2. Restart Claude Code
3. Execute test command without re-authenticating
4. **Result**: ✅ Token persisted / ❌ Re-auth required

---

## 3. Read Operations Validation

### Test 1: Resource Discovery
**Objective**: List available resources (workspaces, folders, databases, etc.)

**Test Command**: [Natural language or tool call]
**Expected**: [Description of expected output]
**Actual**: [Describe actual results]
**Status**: ✅/❌

**Details**:
- Resources found: [Number and types]
- Access level: [Read-only / Read-write]
- Performance: [Response time]

### Test 2: Entity Listing
**Objective**: List primary entities (files, messages, rows, etc.)

**Test Command**: [Natural language or tool call]
**Expected**: [Description of expected output]
**Actual**: [Describe actual results]
**Status**: ✅/❌

**Details**:
- Entities found: [Number]
- Metadata included: [Fields returned]
- Filtering/sorting: ✅ Works / ❌ Not available

### Test 3: Content Retrieval
**Objective**: Retrieve full content of specific entity

**Test Command**: [Natural language or tool call]
**Expected**: [Description of expected output]
**Actual**: [Describe actual results]
**Status**: ✅/❌

**Details**:
- Content format: [Raw / Markdown / JSON / etc.]
- Encoding: ✅ Correct / ❌ Issues
- Full content retrieved: ✅/❌

### Test 4: Search/Query
**Objective**: Search or query entities using filters

**Test Command**: [Natural language or tool call]
**Expected**: [Description of expected output]
**Actual**: [Describe actual results]
**Status**: ✅/❌

**Details**:
- Query language: [JQL / SQL / Natural language / etc.]
- Results accuracy: ✅ Correct / ❌ Incorrect
- Performance: [Response time]

---

## 4. Write Operations Validation

### Test 5: Create Entity
**Objective**: Create new entity (file, message, record, etc.)

**Test Command**: [Natural language or tool call]
**Expected**: [Description of expected output]
**Actual**: [Describe actual results]
**Status**: ✅/❌

**Details**:
- Entity created: [ID/link to created entity]
- Fields set: [List fields that were set]
- Validation errors: [Any errors encountered]

### Test 6: Update Entity
**Objective**: Update existing entity

**Test Command**: [Natural language or tool call]
**Expected**: [Description of expected output]
**Actual**: [Describe actual results]
**Status**: ✅/❌

**Details**:
- Fields updated: [List updated fields]
- Version control: ✅ Tracked / ❌ Not tracked
- Validation: ✅ Successful / ❌ Errors

### Test 7: Delete Entity (Optional)
**Objective**: Delete or archive entity

**Test Command**: [Natural language or tool call]
**Expected**: [Description of expected output]
**Actual**: [Describe actual results]
**Status**: ✅/❌ / N/A

**Details**:
- Deletion type: [Hard delete / Soft delete / Archive]
- Reversible: ✅/❌
- Validation: ✅ Successful / ❌ Errors

---

## 5. MCP Tools Reference

### Tool Category 1 (e.g., Resource Management)
- `mcp__[provider]__[toolName1]` - [Description]
- `mcp__[provider]__[toolName2]` - [Description]

### Tool Category 2 (e.g., Content Operations)
- `mcp__[provider]__[toolName3]` - [Description]
- `mcp__[provider]__[toolName4]` - [Description]

**Total Tools**: X

---

## 6. Natural Language Interface

### Example Commands
Test that these natural language commands work correctly:

1. "List all [entities] in [provider]"
   - **Status**: ✅/❌
   - **Response**: [Brief description]

2. "Create a [entity] in [provider] named [name]"
   - **Status**: ✅/❌
   - **Response**: [Brief description]

3. "Search [provider] for [query]"
   - **Status**: ✅/❌
   - **Response**: [Brief description]

---

## 7. Performance Metrics

### Response Times
- **Authentication**: [Time to complete OAuth/setup]
- **Connection**: [Time to connect MCP server]
- **Read operations**: [Average response time]
- **Write operations**: [Average response time]
- **Search queries**: [Average response time]

### Reliability
- **Success rate**: X% (Y/Z operations successful)
- **Error rate**: X%
- **Timeout incidents**: [Number of timeouts]

### Session Management
- **Token lifetime**: [Duration before refresh needed]
- **Persistence**: ✅ Persists / ❌ Expires
- **Reconnection required**: ✅ Yes / ❌ No

---

## 8. Integration Capabilities

### Read Capabilities (X/Y Passed)
- ✅/❌ Resource discovery
- ✅/❌ Entity listing
- ✅/❌ Content retrieval
- ✅/❌ Search/query
- ✅/❌ Metadata access
- ✅/❌ Batch reads

### Write Capabilities (X/Y Passed)
- ✅/❌ Create entities
- ✅/❌ Update entities
- ✅/❌ Delete entities
- ✅/❌ Batch operations
- ✅/❌ Transaction support
- 🔜 [Future capability]

---

## 9. Known Limitations

### Technical Limitations
- **Rate Limits**: [Describe rate limits, if any]
- **File Size Limits**: [Max file size, if applicable]
- **Query Complexity**: [Limitations on queries]
- **Concurrent Operations**: [Limitations on parallel requests]

### Feature Gaps
- [Feature 1 not available]
- [Feature 2 requires manual workaround]
- [Feature 3 planned for future release]

### Workarounds
- **Issue**: [Describe limitation]
  - **Workaround**: [Describe workaround]

---

## 10. PM OS Integration Recommendations

### Agent Workflow Enhancements

**Product Architect**:
- [How this MCP enhances Product Architect workflows]
- Example: Auto-save PRDs to [provider]

**Engineering Partner**:
- [How this MCP enhances Engineering Partner workflows]
- Example: Fetch legacy specs from [provider]

**[Other Agents]**:
- [Recommended enhancements]

### Example Workflows

#### Workflow 1: [Workflow Name]
```
User: "[Natural language request]"
→ Agent [X] does [action]
→ MCP call: [provider].[operation]
→ Result: [expected outcome]
```

#### Workflow 2: [Workflow Name]
```
User: "[Natural language request]"
→ Agent [Y] does [action]
→ MCP call: [provider].[operation]
→ Result: [expected outcome]
```

---

## 11. Validation Summary

### Overall Status
- **Configuration**: ✅/❌
- **Authentication**: ✅/❌
- **Read Operations**: X/Y ✅
- **Write Operations**: X/Y ✅
- **Performance**: ✅/❌
- **Documentation**: ✅/❌

### Pass/Fail Criteria
- **Minimum for PASS**:
  - Authentication working
  - At least 80% read operations passing
  - At least 60% write operations passing (if applicable)
  - Average response time < 10 seconds
  - Documentation complete

**FINAL STATUS**: ✅ PASS / ❌ FAIL / 🔄 IN PROGRESS

---

## 12. Support Resources

**Setup Guide**: `mcp/setup_guides/[provider]_setup.md`
**Official Docs**: [Link to provider's MCP documentation]
**MCP Registry**: [Link to MCP registry entry]
**PM OS Issue Tracker**: [Link to related JIRA/GitHub issues]

---

## Appendix: Configuration Files

### `.mcp.json`
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

### `.claude/settings.local.json` (Permissions)
```json
{
  "permissions": {
    "allow": [
      "mcp__[provider]__[tool1]",
      "mcp__[provider]__[tool2]"
    ]
  }
}
```

### `.env` (if applicable)
```bash
[PROVIDER]_CLIENT_ID=your_client_id
[PROVIDER]_CLIENT_SECRET=<your-client-secret>
[PROVIDER]_API_KEY=<your-api-key>
```

---

**Validation Report Created**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD HH:MM TZ
**Validated By**: [Agent or human name]
**Related Artifacts**: [Links to related validation issues, PRDs, etc.]
