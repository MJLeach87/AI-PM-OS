# MCP Integration Plan: [Service Name]

**Service**: [Google Drive / Jira / Slack / Notion / Snowflake / Other]
**Priority**: [High / Medium / Low]
**Target Phase**: [Phase number from roadmap]
**Status**: [Planning / In Progress / Completed]
**Owner**: [Agent or Human PM]

---

## Integration Overview

### Business Value
[Why integrating this service matters for PM OS]

**Primary Use Cases**:
1. [Use case 1]
2. [Use case 2]
3. [Use case 3]

**Expected Impact**:
- **Time Savings**: [Estimate]
- **Quality Improvement**: [Specific metric]
- **Unlock Capability**: [What becomes possible]

### Service Capabilities
[What this MCP integration enables]

**Read Operations**:
- [Data type that can be retrieved]
- [Data type that can be retrieved]

**Write Operations** (if applicable):
- [Data type that can be created/updated]
- [Data type that can be created/updated]

**Limitations**:
- [What the MCP cannot do]
- [Rate limits or constraints]

---

## Prerequisites

### Service Account Setup

#### Step 1: [Service] Account Creation
**Instructions**:
1. [Detailed step-by-step process]
2. [Include screenshots or links to official docs]
3. [Verification step]

**Required Permissions**:
- [ ] [Permission name]: [Why needed]
- [ ] [Permission name]: [Why needed]

**Security Configuration**:
- [ ] Enable OAuth 2.0 (if applicable)
- [ ] Restrict to read-only (if applicable)
- [ ] Configure IP allowlisting (if required)
- [ ] Set up audit logging

#### Step 2: API Credentials
**Credential Type**: [OAuth / API Token / Service Account Key]

**What to Obtain**:
- [Credential component 1]: [Where to find]
- [Credential component 2]: [Where to find]

**Expiration**: [Credential lifetime, rotation policy]

### Local Environment Setup

**Required Tools**:
- [ ] Node.js version: [X.X.X or higher]
- [ ] npm packages: `[package-name]`
- [ ] [Other dependencies]

**Installation Commands**:
```bash
npm install -g [mcp-package-name]
# or
npx -y @[org]/[mcp-package-name]
```

---

## Configuration

### Environment Variables

**Add to `.env`** (gitignored):
```bash
# [Service Name] MCP Configuration
[SERVICE]_CLIENT_ID=[your-client-id]
[SERVICE]_CLIENT_SECRET=[your-client-secret]
[SERVICE]_API_TOKEN=[your-api-token]
[SERVICE]_REFRESH_TOKEN=[your-refresh-token]
```

**Add to `.env.example`** (committed to git):
```bash
# [Service Name] MCP Configuration
[SERVICE]_CLIENT_ID=your_client_id_here
[SERVICE]_CLIENT_SECRET=your_client_secret_here
[SERVICE]_API_TOKEN=your_api_token_here
[SERVICE]_REFRESH_TOKEN=your_refresh_token_here
```

### MCP Server Configuration

**Add to `mcp/config.json`**:
```json
{
  "mcpServers": {
    "[service-name]": {
      "command": "npx",
      "args": ["-y", "@[org]/[mcp-package-name]"],
      "env": {
        "[ENV_VAR_1]": "${[ENV_VAR_1]}",
        "[ENV_VAR_2]": "${[ENV_VAR_2]}"
      }
    }
  }
}
```

**Cursor-Specific Configuration**:
[Add to Cursor settings if different from above]

**Claude Code-Specific Configuration**:
[Add to Claude Code config if different from above]

---

## Security Considerations

### Credential Management

**Storage**:
- [ ] Credentials in `.env` (gitignored)
- [ ] No hardcoded values in config files
- [ ] Credentials encrypted at rest (if applicable)

**Access Control**:
- [ ] Read-only permissions by default
- [ ] Write permissions justified and documented
- [ ] Service account has minimum necessary privileges

**Rotation Policy**:
- **Frequency**: [Monthly / Quarterly / Annually]
- **Process**: [Who rotates, how to update]
- **Notification**: [How team is informed of rotation]

### Data Handling

**PII Redaction**:
- [ ] [What personal data might be accessed]
- [ ] [How it will be redacted in logs/outputs]

**Audit Logging**:
- [ ] Enable [Service] audit logs
- [ ] Log all PM OS requests to [Service]
- [ ] Retention period: [Duration]

**Compliance**:
- [ ] GDPR considerations addressed
- [ ] SOC 2 requirements met
- [ ] [Industry-specific compliance]

---

## Implementation Steps

### Phase 1: Basic Connectivity (Week N)

**Tasks**:
1. [ ] Install MCP package
2. [ ] Configure environment variables
3. [ ] Update `mcp/config.json`
4. [ ] Test connection with simple read operation
5. [ ] Verify credentials work in both Cursor and Claude Code

**Validation Test**:
```
[Specific command or prompt to verify connectivity]
Expected output: [What should be returned]
```

### Phase 2: Agent Integration (Week N+1)

**Agent Updates Required**:
- **[Agent Name]**: [What capability to add]
  - File: `.cursor/rules/[agent].mdc`
  - Change: [Specific modification]

- **[Agent Name]**: [What capability to add]
  - File: `.claude/agents/[agent].md`
  - Change: [Specific modification]

**New Workflows Enabled**:
1. **[Workflow Name]**
   - Trigger: [User action or agent invocation]
   - [Service] Operation: [What is retrieved/created]
   - Output: [What artifact is generated]

### Phase 3: Advanced Features (Week N+2)

**Optional Enhancements**:
- [ ] [Advanced feature 1]
- [ ] [Advanced feature 2]
- [ ] [Caching strategy for frequent queries]
- [ ] [Error retry logic]

---

## Usage Documentation

### For Product Architect Agent

**Use Case**: [When to use this MCP]

**Example Prompt**:
```
[Specific prompt that triggers MCP usage]
```

**Expected Workflow**:
1. Agent identifies need for [data type]
2. Agent calls [Service] MCP with [parameters]
3. Agent processes response to extract [information]
4. Agent generates [artifact] incorporating [data]

**Example Code** (if applicable):
```javascript
// How agent would invoke MCP
const result = await mcp.[service].[method]({
  param1: "value",
  param2: "value"
});
```

### For Other Agents

**[Agent Name]**:
- **Use Case**: [When this agent uses the MCP]
- **Typical Query**: [Example of what it retrieves]

**[Agent Name]**:
- **Use Case**:
- **Typical Query**:

---

## Testing & Validation

### Test Cases

#### Test 1: Basic Read Operation
**Objective**: Verify MCP can retrieve data

**Steps**:
1. [Specific action]
2. [Expected result]
3. [Validation method]

**Pass Criteria**: [Measurable success criterion]

#### Test 2: Error Handling
**Objective**: Verify graceful failure on invalid credentials

**Steps**:
1. Temporarily invalidate credentials
2. Attempt [operation]
3. Verify error message is clear

**Pass Criteria**: User-friendly error, no crashes

#### Test 3: Performance
**Objective**: Verify response time meets requirements

**Steps**:
1. Query for [data type] with [size]
2. Measure response time

**Pass Criteria**: < [X] seconds for [Y] data size

### Regression Testing
**After Each Update**:
- [ ] Re-run all test cases
- [ ] Verify backward compatibility
- [ ] Check no new security warnings

---

## Troubleshooting

### Common Issues

#### Issue 1: Authentication Failed
**Symptoms**: [Error message]

**Diagnosis**:
1. Check `.env` has correct values
2. Verify credentials haven't expired
3. [Service-specific check]

**Solution**: [Step-by-step fix]

#### Issue 2: Rate Limit Exceeded
**Symptoms**: [Error message]

**Diagnosis**:
1. Check [Service] usage dashboard
2. Review recent request volume

**Solution**:
- Implement request caching
- Add delay between requests
- Upgrade [Service] plan if needed

#### Issue 3: [Service-Specific Issue]
**Symptoms**:
**Diagnosis**:
**Solution**:

### Getting Help
- **[Service] Documentation**: [Link]
- **MCP Package Issues**: [GitHub link]
- **Internal Support**: [Contact person/channel]

---

## Monitoring & Maintenance

### Health Checks
**Automated Monitoring**:
- [ ] Daily connectivity test
- [ ] Weekly credential expiration check
- [ ] Monthly usage audit

**Alerts**:
- **Trigger**: [Condition that triggers alert]
- **Notification**: [Where alert is sent]
- **Response**: [Who responds, expected action]

### Usage Metrics
**Track**:
- Requests per day/week
- Average response time
- Error rate
- Most common query types

**Review Frequency**: [Weekly / Monthly]

### Maintenance Schedule
- **Credential Rotation**: [Frequency, process]
- **Dependency Updates**: [How often to check for MCP package updates]
- **Configuration Review**: [Quarterly audit of settings]

---

## Rollback Plan

### If Integration Fails

**Immediate Actions**:
1. [ ] Disable MCP in `mcp/config.json`
2. [ ] Notify affected agents (revert to manual workflow)
3. [ ] Document failure in `docs/TROUBLESHOOTING.md`

**Investigation**:
- [ ] Review error logs
- [ ] Check [Service] status page
- [ ] Consult MCP package issues

**Recovery**:
- [ ] Fix identified issue
- [ ] Re-test in isolation
- [ ] Gradually re-enable for agents

---

## Success Criteria

**Integration Complete When**:
- [ ] All test cases pass
- [ ] At least one agent actively using MCP
- [ ] Documentation updated in `docs/`
- [ ] Team trained on usage
- [ ] Monitoring/alerts configured

**Post-Launch (After 2 Weeks)**:
- [ ] Usage metrics meet expectations
- [ ] No critical errors logged
- [ ] Stakeholder feedback positive
- [ ] Identified at least one improvement opportunity

---

## Future Enhancements

**Potential Improvements**:
- [Enhancement idea 1]
- [Enhancement idea 2]
- [Integration with other services]

**Deferred Features**:
- [Feature deemed out of scope for now]
- [Why deferred, when to revisit]

---

## References

**Official Documentation**:
- [Service] API Docs: [Link]
- MCP Package: [Link]
- OAuth 2.0 Setup: [Link]

**Internal Documentation**:
- Related Agent Specs: `[path]`
- Security Standards: `identity/STANDARDS.md`

**Related Integrations**:
- [Other MCP that works well with this one]

---

**Integration Status**: [Planning / In Progress / Completed]
**Last Updated**: [YYYY-MM-DD]
**Next Review**: [YYYY-MM-DD]
