#!/usr/bin/env node

/**
 * Jira MCP Server
 *
 * Model Context Protocol server for Jira Cloud API
 * Provides tools for creating and managing issues, epics, and projects
 *
 * Version: 2.0 (Proper MCP Implementation)
 * Phase: 4 (MCP Integration Suite)
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const TOKEN_PATH = path.join(__dirname, '../credentials/atlassian_token.json');

// Token data
let tokenData, accessToken, cloudId, baseUrl;

/**
 * Load OAuth tokens
 */
function loadTokens() {
  tokenData = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  accessToken = tokenData.access_token;

  // Get Jira resource
  const jiraResource = tokenData.resources.find(r => r.scopes.includes('read:jira-work'));
  if (!jiraResource) {
    throw new Error('No Jira resource found in token data');
  }
  cloudId = jiraResource.id;
  baseUrl = `https://api.atlassian.com/ex/jira/${cloudId}`;
}

/**
 * Refresh access token if expired
 */
async function refreshTokenIfNeeded() {
  const now = Date.now();
  const expiresAt = tokenData.created_at + (tokenData.expires_in * 1000);
  const bufferTime = 5 * 60 * 1000; // Refresh 5 min before expiry

  if (now >= expiresAt - bufferTime) {
    console.error('🔄 Refreshing access token...');

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
    console.error('✅ Token refreshed');
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
        const retryAfter = parseInt(response.headers.get('Retry-After') || '1');
        console.error(`⏳ Rate limited. Retrying after ${retryAfter}s...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        attempt++;
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Jira API error ${response.status}: ${errorText}`);
      }

      return await response.json();

    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        throw error;
      }
      const backoff = Math.pow(2, attempt) * 1000; // Exponential backoff
      console.error(`❌ Request failed (attempt ${attempt}/${maxRetries}). Retrying in ${backoff}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
}

/**
 * Tool Implementations
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

async function createEpic({ summary, description, project = 'PMOS' }) {
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

  const result = await jiraRequest('/rest/api/3/issue', {
    method: 'POST',
    body: JSON.stringify(body)
  });

  return {
    id: result.id,
    key: result.key,
    url: `https://pm-os.atlassian.net/browse/${result.key}`
  };
}

async function createIssue({ summary, description, issuetype = 'Story', project = 'PMOS', epicKey, labels = [] }) {
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

  if (epicKey) {
    body.fields.parent = { key: epicKey };
  }

  const result = await jiraRequest('/rest/api/3/issue', {
    method: 'POST',
    body: JSON.stringify(body)
  });

  return {
    id: result.id,
    key: result.key,
    url: `https://pm-os.atlassian.net/browse/${result.key}`
  };
}

async function bulkCreateIssues({ issues }) {
  const issueUpdates = issues.map(issueData => {
    const {
      summary,
      description,
      issuetype = 'Story',
      project = 'PMOS',
      epicKey,
      labels = []
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
      labels: labels
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
      url: `https://pm-os.atlassian.net/browse/${i.key}`
    })),
    errors: result.errors || []
  };
}

async function getIssue({ issueKey }) {
  const issue = await jiraRequest(`/rest/api/3/issue/${issueKey}`);
  return {
    key: issue.key,
    summary: issue.fields.summary,
    status: issue.fields.status.name,
    issuetype: issue.fields.issuetype.name,
    description: issue.fields.description,
    labels: issue.fields.labels,
    url: `https://pm-os.atlassian.net/browse/${issue.key}`
  };
}

async function updateIssue({ issueKey, updates }) {
  const body = { fields: {} };

  if (updates.summary) body.fields.summary = updates.summary;
  if (updates.description) {
    body.fields.description = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: updates.description }]
        }
      ]
    };
  }
  if (updates.labels) body.fields.labels = updates.labels;

  await jiraRequest(`/rest/api/3/issue/${issueKey}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  });

  return {
    success: true,
    key: issueKey,
    url: `https://pm-os.atlassian.net/browse/${issueKey}`
  };
}

async function searchIssues({ jql, maxResults = 50 }) {
  const params = new URLSearchParams({
    jql: jql,
    maxResults: maxResults.toString()
  });

  const result = await jiraRequest(`/rest/api/3/search/jql?${params}`);

  return {
    total: result.total,
    issues: result.issues.map(i => ({
      key: i.key,
      summary: i.fields.summary,
      status: i.fields.status.name,
      issuetype: i.fields.issuetype.name,
      url: `https://pm-os.atlassian.net/browse/${i.key}`
    }))
  };
}

async function getProject({ projectKey = 'PMOS' }) {
  const project = await jiraRequest(`/rest/api/3/project/${projectKey}`);
  return {
    id: project.id,
    key: project.key,
    name: project.name,
    projectTypeKey: project.projectTypeKey,
    simplified: project.simplified,
    style: project.style,
    url: project.self
  };
}

/**
 * Initialize MCP Server
 */
async function main() {
  // Load tokens
  loadTokens();

  const server = new Server(
    {
      name: 'jira-server',
      version: '2.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Tool definitions
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'jira_test_connection',
          description: 'Test Jira API connection and get current user info',
          inputSchema: {
            type: 'object',
            properties: {},
            required: []
          }
        },
        {
          name: 'jira_create_epic',
          description: 'Create a new epic in Jira',
          inputSchema: {
            type: 'object',
            properties: {
              summary: {
                type: 'string',
                description: 'Epic title/summary'
              },
              description: {
                type: 'string',
                description: 'Epic description'
              },
              project: {
                type: 'string',
                description: 'Project key (default: PMOS)',
                default: 'PMOS'
              }
            },
            required: ['summary']
          }
        },
        {
          name: 'jira_create_issue',
          description: 'Create a new issue (story/task) in Jira',
          inputSchema: {
            type: 'object',
            properties: {
              summary: {
                type: 'string',
                description: 'Issue title/summary'
              },
              description: {
                type: 'string',
                description: 'Issue description'
              },
              issuetype: {
                type: 'string',
                description: 'Issue type: Story, Task, Bug',
                default: 'Story'
              },
              project: {
                type: 'string',
                description: 'Project key (default: PMOS)',
                default: 'PMOS'
              },
              epicKey: {
                type: 'string',
                description: 'Parent epic key (e.g., PMOS-EPIC-4)'
              },
              labels: {
                type: 'array',
                items: { type: 'string' },
                description: 'Labels for the issue'
              }
            },
            required: ['summary']
          }
        },
        {
          name: 'jira_bulk_create_issues',
          description: 'Create multiple issues in bulk (up to 50 at once)',
          inputSchema: {
            type: 'object',
            properties: {
              issues: {
                type: 'array',
                description: 'Array of issue objects to create',
                items: {
                  type: 'object',
                  properties: {
                    summary: { type: 'string' },
                    description: { type: 'string' },
                    issuetype: { type: 'string' },
                    project: { type: 'string' },
                    epicKey: { type: 'string' },
                    labels: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  },
                  required: ['summary']
                }
              }
            },
            required: ['issues']
          }
        },
        {
          name: 'jira_get_issue',
          description: 'Get details of a specific issue by key',
          inputSchema: {
            type: 'object',
            properties: {
              issueKey: {
                type: 'string',
                description: 'Issue key (e.g., PMOS-1)'
              }
            },
            required: ['issueKey']
          }
        },
        {
          name: 'jira_update_issue',
          description: 'Update an existing issue',
          inputSchema: {
            type: 'object',
            properties: {
              issueKey: {
                type: 'string',
                description: 'Issue key to update'
              },
              updates: {
                type: 'object',
                description: 'Fields to update',
                properties: {
                  summary: { type: 'string' },
                  description: { type: 'string' },
                  labels: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                }
              }
            },
            required: ['issueKey', 'updates']
          }
        },
        {
          name: 'jira_search_issues',
          description: 'Search issues using JQL (Jira Query Language)',
          inputSchema: {
            type: 'object',
            properties: {
              jql: {
                type: 'string',
                description: 'JQL query (e.g., "project=PMOS AND status=Done")'
              },
              maxResults: {
                type: 'number',
                description: 'Maximum results to return (default: 50)',
                default: 50
              }
            },
            required: ['jql']
          }
        },
        {
          name: 'jira_get_project',
          description: 'Get project metadata',
          inputSchema: {
            type: 'object',
            properties: {
              projectKey: {
                type: 'string',
                description: 'Project key (default: PMOS)',
                default: 'PMOS'
              }
            }
          }
        }
      ]
    };
  });

  // Tool execution
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result;

      switch (name) {
        case 'jira_test_connection':
          result = await testConnection();
          break;
        case 'jira_create_epic':
          result = await createEpic(args);
          break;
        case 'jira_create_issue':
          result = await createIssue(args);
          break;
        case 'jira_bulk_create_issues':
          result = await bulkCreateIssues(args);
          break;
        case 'jira_get_issue':
          result = await getIssue(args);
          break;
        case 'jira_update_issue':
          result = await updateIssue(args);
          break;
        case 'jira_search_issues':
          result = await searchIssues(args);
          break;
        case 'jira_get_project':
          result = await getProject(args);
          break;
        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }
        ]
      };

    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`
          }
        ],
        isError: true
      };
    }
  });

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Jira MCP Server running on stdio');
}

main().catch(console.error);
