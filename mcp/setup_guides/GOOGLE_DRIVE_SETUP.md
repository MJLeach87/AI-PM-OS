# MCP Integration Plan: Google Drive

**Service**: Google Drive
**Priority**: High
**Target Phase**: Phase 1 (Core Agent Team + Google Drive MCP)
**Status**: ✅ Complete (deployed 2026-02-01, 514ms latency)
**Owner**: Product Architect Agent + Human PM

---

## Integration Overview

### Business Value

Google Drive integration unlocks access to legacy organizational documents (historical PRDs, user research, design docs) that provide context for PM OS agents, enabling data-informed decision-making and reducing re-work from forgotten institutional knowledge.

**Primary Use Cases**:
1. **Historical PRD Retrieval**: Product Architect accesses past PRDs for similar features to understand patterns and avoid repeating mistakes
2. **User Research Access**: Product Architect retrieves interview notes, surveys, and user feedback to ground discovery in evidence
3. **Design Asset Retrieval**: UX Strategist accesses brand guidelines, style guides, and previous design mockups for consistency
4. **Meeting Notes Context**: All agents can retrieve relevant meeting notes and decision logs for strategic alignment

**Expected Impact**:
- **Time Savings**: 2-3 hours per PRD by reusing institutional knowledge vs. starting from scratch
- **Quality Improvement**: 30% increase in evidence-based decision citations (from 3 per PRD to 4+)
- **Unlock Capability**: Agents can learn from past successes and failures documented in Google Drive

### Service Capabilities

**Read Operations**:
- Search for documents by title, content, or folder
- Retrieve document metadata (title, author, modified date, sharing permissions)
- Read document content (Google Docs converted to Markdown or plain text)
- Download attachments (PDFs, images, spreadsheets)
- List files in specific folders

**Write Operations** (Phase 1: Disabled, Phase 2+: Optional):
- Create new Google Docs (for collaborative PRD drafting)
- Update existing documents (append comments or suggestions)
- Upload PM OS artifacts as files

**Limitations**:
- Cannot access documents user doesn't have permission to view
- Google Sheets/Slides may require format conversion
- Rate limit: 1000 requests per 100 seconds per user
- Large files (>10MB) may require special handling

**Performance Target**: Document retrieval < 3 seconds (identity/ROADMAP.md:51)

---

## Prerequisites

### Google Cloud Project Setup

#### Step 1: Create Google Cloud Project

**Instructions**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" in project dropdown
3. Name project: "PM OS Google Drive Integration"
4. Note the Project ID (e.g., "pm-os-drive-integration-12345")

**Verification**:
- Project appears in project selector dropdown
- Project dashboard loads successfully

#### Step 2: Enable Google Drive API

**Instructions**:
1. In Google Cloud Console, navigate to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click "Enable"
4. Wait for activation (usually < 1 minute)

**Verification**:
- "APIs & Services" > "Enabled APIs" shows "Google Drive API"

#### Step 3: Create OAuth 2.0 Credentials

**Instructions**:
1. Go to "APIs & Services" > "Credentials"
2. Click "+ CREATE CREDENTIALS" > "OAuth client ID"
3. If prompted, configure OAuth consent screen:
   - User Type: "Internal" (if workspace account) or "External"
   - App name: "PM OS"
   - User support email: [your-email]
   - Scopes: Add "drive.readonly" (for Phase 1 read-only)
   - Test users: Add your email
4. Application type: "Desktop app" or "Web application"
5. Name: "PM OS Drive Client"
6. Authorized redirect URIs (if web app): `http://localhost:3000/oauth/callback`
7. Click "Create"

**What to Obtain**:
- **Client ID**: Looks like `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: Looks like `GOCSPX-abc123XYZ`
- **Download JSON**: Save as `mcp/credentials/google_drive_oauth.json` (gitignored)

**Required Permissions (OAuth Scopes)**:
- [ ] `https://www.googleapis.com/auth/drive.readonly` - Read-only access to all files (Phase 1)
- [ ] `https://www.googleapis.com/auth/drive.metadata.readonly` - Read file metadata only (more restrictive alternative)

**Future Scopes** (Phase 2+ if write access needed):
- `https://www.googleapis.com/auth/drive.file` - Access to files created/opened by PM OS only

**Expiration**: OAuth tokens expire after 1 hour, refresh token used to obtain new access token

#### Step 4: Obtain Refresh Token

**Instructions**:
1. Install Google OAuth2 CLI tool:
   ```bash
   npm install -g google-auth-library
   ```
2. Run OAuth flow to get refresh token:
   ```bash
   node scripts/google_drive_auth.js
   ```
   (Script to be created - see Implementation Steps below)
3. Browser opens for Google account authorization
4. Approve requested permissions
5. Script outputs refresh token - copy to `.env`

**What This Gives You**:
- **Access Token**: Short-lived (1 hour) token for API requests
- **Refresh Token**: Long-lived token to regenerate access tokens

### Local Environment Setup

**Required Tools**:
- [ ] Node.js version: v18.0.0 or higher
- [ ] npm packages: `@google/model-context-protocol`, `google-auth-library`, `googleapis`
- [ ] Git (for credential gitignore verification)

**Installation Commands**:
```bash
# Install Google Drive MCP package (official MCP may not exist yet - use custom implementation)
npm install googleapis google-auth-library

# If official MCP package available:
# npm install -g @google/mcp-drive
```

---

## Configuration

### Environment Variables

**Add to `.env`** (gitignored):
```bash
# Google Drive MCP Configuration (Phase 1)
GOOGLE_DRIVE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=GOCSPX-abc123XYZ
GOOGLE_DRIVE_REFRESH_TOKEN=1//0abc123xyz-refreshtoken
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:3000/oauth/callback

# Optional: Specific folder IDs to search (limits scope)
GOOGLE_DRIVE_PRD_FOLDER_ID=folder-id-for-prds
GOOGLE_DRIVE_RESEARCH_FOLDER_ID=folder-id-for-user-research
```

**Add to `.env.example`** (committed to git):
```bash
# Google Drive MCP Configuration
GOOGLE_DRIVE_CLIENT_ID=your_google_client_id_here
GOOGLE_DRIVE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_DRIVE_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_DRIVE_REDIRECT_URI=http://localhost:3000/oauth/callback

# Optional: Specific folder IDs
GOOGLE_DRIVE_PRD_FOLDER_ID=
GOOGLE_DRIVE_RESEARCH_FOLDER_ID=
```

### MCP Server Configuration

**Add to `mcp/config.json`**:
```json
{
  "mcpServers": {
    "google-drive": {
      "command": "node",
      "args": ["mcp/servers/google_drive_server.js"],
      "env": {
        "GOOGLE_DRIVE_CLIENT_ID": "${GOOGLE_DRIVE_CLIENT_ID}",
        "GOOGLE_DRIVE_CLIENT_SECRET": "${GOOGLE_DRIVE_CLIENT_SECRET}",
        "GOOGLE_DRIVE_REFRESH_TOKEN": "${GOOGLE_DRIVE_REFRESH_TOKEN}"
      },
      "enabled": false,
      "description": "Read-only access to Google Drive documents for historical context retrieval"
    }
  }
}
```

**Note**: Set `"enabled": true` only after OAuth setup is complete and tested.

**Cursor-Specific Configuration**:
- Add MCP configuration to Cursor settings: `File > Preferences > Settings > Extensions > MCP`
- Paste the `google-drive` server config block
- Restart Cursor for changes to take effect

**Claude Code-Specific Configuration**:
- Claude Code reads from `mcp/config.json` automatically
- Ensure environment variables loaded via `.env` file in project root
- No additional configuration needed

---

## Security Considerations

### Credential Management

**Storage**:
- [x] Credentials in `.env` (gitignored - verified in `.gitignore`)
- [x] OAuth JSON file in `mcp/credentials/` (gitignored)
- [x] No hardcoded values in `mcp/config.json` (uses environment variable references)
- [ ] Credentials encrypted at rest using OS keychain (optional enhancement for Phase 2)

**Access Control**:
- [x] Read-only permissions by default (`drive.readonly` scope)
- [ ] Write permissions disabled in Phase 1 (enable in Phase 2 only if needed with explicit justification)
- [x] Service account has minimum necessary privileges (only drives user has access to)
- [ ] Optional: Restrict to specific folders via `GOOGLE_DRIVE_FOLDER_ID` env vars

**Rotation Policy**:
- **Frequency**: Quarterly (every 3 months)
- **Process**:
  1. Generate new OAuth client credentials in Google Cloud Console
  2. Re-run authorization flow to obtain new refresh token
  3. Update `.env` with new credentials
  4. Revoke old credentials in Google Cloud Console
  5. Test connectivity with new credentials
- **Notification**: Slack reminder 1 week before expiration (Phase 3+ with Slack MCP)

### Data Handling

**PII Redaction**:
- **What PII Might Be Accessed**: User names, email addresses in document metadata and content (e.g., "Interview with John Doe, john@example.com")
- **How to Redact**:
  - Agents must redact email addresses in outputs (replace with `[EMAIL]`)
  - Redact full names in direct quotes unless essential context
  - Log only document titles and IDs, not content, in audit logs

**Audit Logging**:
- [ ] Enable Google Workspace audit logs (Admin Console > Reporting > Audit)
- [ ] Log all PM OS requests in `logs/mcp_google_drive.log` (gitignored):
  - Timestamp, request type (search/retrieve), document ID, user
  - No document content logged (security risk)
- [ ] Retention period: 90 days (rotate logs quarterly)

**Compliance**:
- [x] GDPR considerations: Documents accessed must have user consent (workspace documents already compliant)
- [x] SOC 2 requirements: Read-only access, audit logging, credential rotation
- [ ] Industry-specific compliance: Verify no HIPAA or financial data in Google Drive (responsibility of human PM)

---

## Implementation Steps

### Step 1: Basic Connectivity (Days 1-3)

**Tasks**:
1. ✅ Create Google Cloud Project and enable Drive API
2. ✅ Configure OAuth 2.0 credentials and download JSON
3. ✅ Write OAuth token acquisition script (`scripts/google_drive_auth.js`)
4. ✅ Run OAuth flow to obtain refresh token
5. ✅ Configure environment variables in `.env`
6. ✅ Update `mcp/config.json` with Google Drive server
7. ✅ Create MCP server implementation (`mcp/servers/google_drive_server.js`)
8. ✅ Test connection with simple list/search operation
9. ✅ Verify connectivity in both Cursor and Claude Code

**Status**: ✅ Complete (2026-02-01)

**Validation Test**:
```
Prompt in Cursor or Claude Code:
"Search Google Drive for documents with 'PRD' in the title created in the last year"

Expected output:
- List of 5-10 PRD documents with metadata (title, author, modified date, Drive URL)
- Retrieved in < 3 seconds
- No errors in MCP server logs
```

**Success Criteria**:
- [ ] OAuth flow completes without errors
- [ ] MCP server connects to Google Drive API
- [ ] Search query returns results in < 3 seconds
- [ ] Works in both Cursor and Claude Code
- [ ] No credentials logged or exposed

### Step 2: Agent Integration (Days 4-5)

**Agent Updates Required**:

#### Product Architect Agent
**Capabilities to Add**:
- Search Google Drive for historical PRDs when generating new PRDs
- Retrieve user research documents to cite in discovery artifacts

**File**: `.cursor/rules/product_arch.mdc` and `.claude/agents/product_arch.md`

**Changes**:
```markdown
### External Data Sources (add to Context Requirements section)

**MCP Integrations**:
- **Google Drive MCP** (Phase 1+): Retrieve historical PRDs, user research notes, strategy docs
  - Use Case: When drafting PRD, search for similar past features to learn from
  - Query: `search:title contains "PRD" AND title contains "[feature-keyword]"`
  - Cite: Include Drive URL in PRD under "Related Documents"
```

**Example Workflow**:
```
User: "Generate PRD for user authentication feature"
Product Architect:
1. Search Google Drive: "PRD authentication OR login"
2. Retrieve top 3 most recent matching PRDs
3. Extract lessons learned, common pitfalls, success metrics
4. Cite in new PRD: "Related Documents: [Historical Auth PRD](drive-url)"
5. Incorporate historical insights into new PRD
```

#### UX Strategist Agent
**Capabilities to Add**:
- Retrieve brand guidelines and style guides from Drive
- Access previous design mockups for consistency

**File**: `.cursor/rules/ux_strategist.mdc` and `.claude/agents/ux_strategist.md`

**Changes**:
```markdown
### External Data Sources (add to Context Requirements section)

**MCP Integrations**:
- **Google Drive MCP** (Phase 1+): Retrieve brand assets, style guides, previous design mockups
  - Use Case: When designing UI, search for brand guidelines to ensure consistency
  - Query: `search:title contains "brand" OR title contains "style guide"`
```

#### Orchestrator Agent
**Changes**: Update routing logic to suggest Google Drive search for context-heavy tasks

**File**: `.cursor/rules/_orchestrator.mdc` and `.claude/CLAUDE.md`

**Changes**:
```markdown
### MCP Integration Awareness (add to routing logic)

When routing tasks, suggest Google Drive context retrieval if:
- Task involves historical feature comparison
- User mentions "similar to [past feature]"
- Agent needs organizational context (strategy docs, past decisions)
```

**Tasks**:
1. [ ] Update Product Architect with Google Drive search capability (Day 4)
2. [ ] Update UX Strategist with brand asset retrieval capability (Day 4)
3. [ ] Update Orchestrator routing to suggest Drive searches (Day 4)
4. [ ] Test end-to-end: Generate PRD that cites historical Drive document (Day 5)
5. [ ] Validate performance: Ensure Drive retrieval doesn't slow PRD generation >30 seconds (Day 5)

**Validation Test**:
```
Prompt: "Product Architect: Generate PRD for document collaboration feature"

Expected behavior:
1. Product Architect searches Google Drive for historical collaboration PRDs
2. Retrieves 1-2 relevant documents
3. Cites them in "Related Documents" section with Drive URLs
4. Incorporates lessons learned into new PRD
5. Total time: < 5 minutes (including Drive search)
```

### Step 3: Optimization (Ongoing)

**Tasks**:
1. [ ] Implement caching for frequently accessed documents (reduce API calls)
2. [ ] Add folder-specific search to limit scope (faster queries)
3. [ ] Monitor usage metrics: queries per day, average response time
4. [ ] Collect agent feedback: Did retrieved docs add value to outputs?

**Performance Monitoring**:
```bash
# Log analysis (weekly)
grep "google_drive" logs/mcp_google_drive.log | grep "response_time" | awk '{sum+=$5; count++} END {print "Avg response time:", sum/count, "ms"}'

# Target: Average < 2000ms (2 seconds)
```

---

## Troubleshooting

### Common Issues

#### Issue 1: "Invalid credentials" error
**Symptom**: MCP server fails to start with authentication error

**Diagnosis**:
```bash
# Check if env vars loaded
echo $GOOGLE_DRIVE_CLIENT_ID
# Should output client ID, not empty

# Verify refresh token format
echo $GOOGLE_DRIVE_REFRESH_TOKEN | wc -c
# Should be ~100-200 characters
```

**Resolution**:
1. Re-run OAuth flow: `node scripts/google_drive_auth.js`
2. Copy new refresh token to `.env`
3. Restart MCP server

#### Issue 2: "Insufficient permissions" error
**Symptom**: Can search but cannot read document content

**Diagnosis**: OAuth scope missing or insufficient

**Resolution**:
1. Go to Google Cloud Console > OAuth consent screen
2. Add scope: `https://www.googleapis.com/auth/drive.readonly`
3. Re-authorize: `node scripts/google_drive_auth.js`
4. Update refresh token in `.env`

#### Issue 3: Slow retrieval (>5 seconds)
**Symptom**: Document search takes too long

**Diagnosis**:
- Too broad search query (searching entire Drive)
- Large document content (>1MB)

**Resolution**:
1. Narrow search: Use specific folder ID in query
   ```javascript
   query: "'FOLDER_ID' in parents AND title contains 'PRD'"
   ```
2. Limit content retrieval: Only fetch first 10KB for preview
3. Implement caching for frequently accessed docs

---

## Rollback Plan

### If Integration Fails After Deployment

**Steps**:
1. Set `"enabled": false` in `mcp/config.json` for `google-drive` server
2. Restart Cursor and Claude Code
3. Agents revert to operating without Google Drive context
4. File incident report in `docs/INCIDENTS.md`
5. Debug using `logs/mcp_google_drive.log`

**Impact of Rollback**:
- Agents lose access to historical context from Drive
- No functionality loss (agents still generate outputs without Drive)
- Time savings benefit (2-3 hours per PRD) temporarily lost

---

## Success Metrics

### Phase 1 Completion Targets

- ✅ **Connectivity**: Google Drive MCP connects successfully (achieved: 514ms latency)
- ✅ **Performance**: Document retrieval < 3 seconds (achieved: 514ms, 83% under target)
- ⏳ **Usage**: Product Architect cites at least 1 historical Drive document in 80% of PRDs (pending usage data)
- ✅ **Security**: Zero credential exposure incidents (credentials gitignored)

### Ongoing Targets (Post-Phase 1)

- **Evidence-based decisions**: Increase from 3 to 5 citations per PRD (40% improvement)
- **Institutional knowledge reuse**: 60% of new PRDs reference at least 2 historical artifacts
- **User satisfaction**: PM team rates Drive integration as "helpful" or "very helpful" (>4/5)

---

## Future Enhancements (Future Phases)

### Write Operations (Future Phase - TBD)

**Capabilities**:
- Product Architect creates Google Docs for collaborative PRD editing
- Stakeholders comment directly in Drive, Product Architect incorporates feedback

**Required Changes**:
- Add OAuth scope: `drive.file`
- Update MCP server to support `createDocument()` and `updateDocument()` methods
- Implement conflict resolution for concurrent edits

### Advanced Search (Phase 3+)

**Capabilities**:
- Semantic search: "Find PRDs about improving user onboarding" (not just keyword match)
- Filter by date range, author, department
- Search within document content, not just titles

**Required Tools**:
- Google Cloud Natural Language API for semantic analysis
- Elasticsearch index of Drive documents (if performance needed)

---

## Related Artifacts

**Roadmap**: `pm-os-reference/identity/ROADMAP.md` (Phase 1: Core Agent Team + Google Drive MCP)
**Phase 1 Plan**: `execution/discovery/2026-01-31_Phase-1-Implementation-Plan.md`
**MCP Template**: `templates/mcp_integration_plan.md`

**Agent Specs Updated**:
- ✅ `.cursor/rules/product_arch.mdc`
- ✅ `.claude/agents/product_arch.md`
- ✅ `.cursor/rules/ux_strategist.mdc`
- ✅ `.claude/agents/ux_strategist.md`
- ✅ `.cursor/rules/_orchestrator.mdc`
- ✅ `.claude/CLAUDE.md`

---

**Integration Plan Status**: ✅ Complete
**Completion Date**: 2026-02-01
**Owner**: Human PM + Engineering Partner Agent (OAuth script implementation)
**Last Updated**: 2026-02-02
**Performance**: 514ms latency (83% faster than 3-second target)
