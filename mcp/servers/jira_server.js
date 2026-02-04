/**
 * Jira MCP Server
 *
 * Model Context Protocol server for Jira Cloud API
 * Provides CRUD operations for issues, epics, and projects
 *
 * Version: 1.0
 * Phase: 4 (MCP Integration Suite)
 */

const fs = require('fs');
const path = require('path');

// Paths
const TOKEN_PATH = path.join(__dirname, '../credentials/atlassian_token.json');

// Load tokens and get Jira Cloud ID
let tokenData, accessToken, cloudId, baseUrl;

function loadTokens() {
  tokenData = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  accessToken = tokenData.access_token;

  // Get Jira resource (first one with read:jira-work scope)
  const jiraResource = tokenData.resources.find(r => r.scopes.includes('read:jira-work'));
  cloudId = jiraResource.id;
  baseUrl = `https://api.atlassian.com/ex/jira/${cloudId}`;
}

// Initialize on module load
loadTokens();

/**
 * Refresh access token if expired
 */
async function refreshTokenIfNeeded() {
  const now = Date.now();
  const expiresAt = tokenData.created_at + (tokenData.expires_in * 1000);
  const bufferTime = 5 * 60 * 1000; // Refresh 5 min before expiry

  if (now >= expiresAt - bufferTime) {
    console.log('🔄 Refreshing access token...');

    const credentials = JSON.parse(fs.readFileSync(
      path.join(__dirname, '../credentials/atlassian_oauth.json'),
      'utf-8'
    ));

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: credentials.installed.client_id,
      client_secret: credentials.installed.client_secret,
      refresh_token: tokenData.refresh_token
    });

    const response = await fetch(credentials.installed.token_uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`);
    }

    const newTokens = await response.json();
    tokenData.access_token = newTokens.access_token;
    tokenData.refresh_token = newTokens.refresh_token;
    tokenData.created_at = now;

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2));

    accessToken = newTokens.access_token;
    console.log('✅ Token refreshed');
  }
}

/**
 * Make authenticated Jira API request with retry logic
 */
async function jiraRequest(endpoint, options = {}) {
  await refreshTokenIfNeeded();

  const url = `${baseUrl}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers
  };

  let attempt = 0;
  const maxRetries = 3;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, { ...options, headers });

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '5');
        console.log(`⏳ Rate limited. Retrying after ${retryAfter}s...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        attempt++;
        continue;
      }

      // Handle errors
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Jira API error ${response.status}: ${errorText}`);
      }

      // Parse response
      const contentType = response.headers.get('content-type');
      const contentLength = response.headers.get('content-length');

      // Handle empty responses (common for PUT/DELETE)
      if (contentLength === '0' || !contentType) {
        return null;
      }

      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      }

      return await response.text();

    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        throw error;
      }

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`⚠️ Request failed, retrying in ${delay}ms... (${attempt}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * 1. Test Connection
 * GET /rest/api/3/myself
 */
async function testConnection() {
  const user = await jiraRequest('/rest/api/3/myself');
  return {
    success: true,
    user: {
      accountId: user.accountId,
      displayName: user.displayName,
      emailAddress: user.emailAddress
    },
    cloudId: cloudId,
    baseUrl: baseUrl
  };
}

/**
 * 2. Create Epic
 * POST /rest/api/3/issue
 */
async function createEpic(epicData) {
  const { summary, description, project = 'PMOS' } = epicData;

  const body = {
    fields: {
      project: { key: project },
      summary: summary,
      issuetype: { name: 'Epic' },
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: description || '' }]
          }
        ]
      }
    }
  };

  // Note: Next-gen projects don't use Epic Name custom field
  // Epic name is just the summary field

  const result = await jiraRequest('/rest/api/3/issue', {
    method: 'POST',
    body: JSON.stringify(body)
  });

  return {
    id: result.id,
    key: result.key,
    self: result.self
  };
}

/**
 * 3. Create Issue (Story/Task)
 * POST /rest/api/3/issue
 */
async function createIssue(issueData) {
  const {
    summary,
    description,
    issuetype = 'Story',
    project = 'PMOS',
    epicKey,
    labels = [],
    customFields = {}
  } = issueData;

  const body = {
    fields: {
      project: { key: project },
      summary: summary,
      issuetype: { name: issuetype },
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: description || '' }]
          }
        ]
      },
      labels: labels
    }
  };

  // Add parent (epic) if provided
  if (epicKey) {
    body.fields.parent = { key: epicKey };
  }

  // Add custom fields
  Object.assign(body.fields, customFields);

  const result = await jiraRequest('/rest/api/3/issue', {
    method: 'POST',
    body: JSON.stringify(body)
  });

  return {
    id: result.id,
    key: result.key,
    self: result.self
  };
}

/**
 * 4. Bulk Create Issues
 * POST /rest/api/3/issue/bulk
 */
async function bulkCreateIssues(issuesArray) {
  const issueUpdates = issuesArray.map(issueData => {
    const {
      summary,
      description,
      issuetype = 'Story',
      project = 'PMOS',
      epicKey,
      labels = [],
      customFields = {}
    } = issueData;

    const fields = {
      project: { key: project },
      summary: summary,
      issuetype: { name: issuetype },
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: description || '' }]
          }
        ]
      },
      labels: labels,
      ...customFields
    };

    if (epicKey) {
      fields.parent = { key: epicKey };
    }

    return { fields };
  });

  const result = await jiraRequest('/rest/api/3/issue/bulk', {
    method: 'POST',
    body: JSON.stringify({ issueUpdates })
  });

  return {
    issues: result.issues.map(i => ({
      id: i.id,
      key: i.key,
      self: i.self
    })),
    errors: result.errors || []
  };
}

/**
 * 5. Get Issue
 * GET /rest/api/3/issue/{issueKey}
 */
async function getIssue(issueKey) {
  const issue = await jiraRequest(`/rest/api/3/issue/${issueKey}`);

  return {
    id: issue.id,
    key: issue.key,
    self: issue.self,
    summary: issue.fields.summary,
    description: issue.fields.description,
    status: issue.fields.status.name,
    issuetype: issue.fields.issuetype.name,
    labels: issue.fields.labels,
    created: issue.fields.created,
    updated: issue.fields.updated,
    fields: issue.fields // Include all fields for custom field access
  };
}

/**
 * 6. Update Issue
 * PUT /rest/api/3/issue/{issueKey}
 */
async function updateIssue(issueKey, updates) {
  const { summary, description, status, labels, customFields = {} } = updates;

  const body = { fields: {} };

  if (summary) body.fields.summary = summary;
  if (description) {
    body.fields.description = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: description }]
        }
      ]
    };
  }
  if (labels) body.fields.labels = labels;

  // Add custom fields
  Object.assign(body.fields, customFields);

  await jiraRequest(`/rest/api/3/issue/${issueKey}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  });

  // Update status separately if provided (uses transitions API)
  if (status) {
    await updateIssueStatus(issueKey, status);
  }

  return { success: true, issueKey };
}

/**
 * Update Issue Status (via transitions)
 */
async function updateIssueStatus(issueKey, statusName) {
  // Get available transitions
  const transitions = await jiraRequest(`/rest/api/3/issue/${issueKey}/transitions`);

  // Find transition to desired status
  const transition = transitions.transitions.find(
    t => t.to.name.toLowerCase() === statusName.toLowerCase()
  );

  if (!transition) {
    throw new Error(`No transition found to status "${statusName}"`);
  }

  // Execute transition
  await jiraRequest(`/rest/api/3/issue/${issueKey}/transitions`, {
    method: 'POST',
    body: JSON.stringify({ transition: { id: transition.id } })
  });
}

/**
 * 7. Search Issues (JQL)
 * GET /rest/api/3/search/jql (new endpoint as of 2024)
 */
async function searchIssues(jql, options = {}) {
  const { maxResults = 50, startAt = 0 } = options;

  // Use GET with query parameters for the new JQL endpoint
  const params = new URLSearchParams({
    jql: jql,
    maxResults: maxResults.toString(),
    startAt: startAt.toString()
  });

  const result = await jiraRequest(`/rest/api/3/search/jql?${params.toString()}`, {
    method: 'GET'
  });

  // Handle both old (issues) and new (values) response formats
  const issuesList = result.values || result.issues || [];

  return {
    total: result.total || issuesList.length,
    maxResults: result.maxResults || maxResults,
    startAt: result.startAt || startAt,
    issues: issuesList.map(issue => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status.name,
      issuetype: issue.fields.issuetype.name,
      fields: issue.fields
    }))
  };
}

/**
 * 8. Delete Issue
 * DELETE /rest/api/3/issue/{issueKey}
 */
async function deleteIssue(issueKey) {
  await jiraRequest(`/rest/api/3/issue/${issueKey}`, {
    method: 'DELETE'
  });

  return { success: true, issueKey };
}

/**
 * 9. Get Project
 * GET /rest/api/3/project/{projectKey}
 */
async function getProject(projectKey = 'PMOS') {
  const project = await jiraRequest(`/rest/api/3/project/${projectKey}`);

  return {
    id: project.id,
    key: project.key,
    name: project.name,
    projectTypeKey: project.projectTypeKey,
    style: project.style,
    issueTypes: project.issueTypes.map(t => ({
      id: t.id,
      name: t.name,
      subtask: t.subtask
    }))
  };
}

/**
 * 10. Get Custom Fields
 * GET /rest/api/3/field
 */
async function getCustomFields() {
  const fields = await jiraRequest('/rest/api/3/field');

  // Filter to custom fields only
  return fields
    .filter(f => f.custom)
    .map(f => ({
      id: f.id,
      name: f.name,
      schema: f.schema
    }));
}

// Export all functions
module.exports = {
  testConnection,
  createEpic,
  createIssue,
  bulkCreateIssues,
  getIssue,
  updateIssue,
  searchIssues,
  deleteIssue,
  getProject,
  getCustomFields
};

// CLI testing support
if (require.main === module) {
  const command = process.argv[2];

  (async () => {
    try {
      switch (command) {
        case 'test':
          const result = await testConnection();
          console.log('✅ Connection successful:', result);
          break;

        case 'fields':
          const fields = await getCustomFields();
          console.log('Custom Fields:', JSON.stringify(fields, null, 2));
          break;

        case 'project':
          const project = await getProject();
          console.log('Project:', JSON.stringify(project, null, 2));
          break;

        default:
          console.log('Usage: node jira_server.js [test|fields|project]');
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  })();
}
