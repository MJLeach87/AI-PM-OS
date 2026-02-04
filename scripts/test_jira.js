/**
 * Test Jira API connection
 * Verifies OAuth tokens work and can access Jira API
 */

const fs = require('fs');
const path = require('path');

const TOKEN_PATH = path.join(__dirname, '../mcp/credentials/atlassian_token.json');

// Load tokens
const tokenData = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
const { access_token, resources } = tokenData;

// Get Jira Cloud ID (first resource with Jira scopes)
const jiraResource = resources.find(r => r.scopes.includes('read:jira-work'));
const CLOUD_ID = jiraResource.id;
const BASE_URL = `https://api.atlassian.com/ex/jira/${CLOUD_ID}`;

async function testConnection() {
  try {
    console.log('🔄 Testing Jira API connection...\n');

    // Test 1: Get current user
    console.log('Test 1: GET /rest/api/3/myself');
    const userResponse = await fetch(`${BASE_URL}/rest/api/3/myself`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error(`Failed: ${userResponse.status} ${await userResponse.text()}`);
    }

    const user = await userResponse.json();
    console.log(`✅ Connected as: ${user.displayName} (${user.emailAddress})\n`);

    // Test 2: List projects
    console.log('Test 2: GET /rest/api/3/project');
    const projectsResponse = await fetch(`${BASE_URL}/rest/api/3/project`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json'
      }
    });

    if (!projectsResponse.ok) {
      throw new Error(`Failed: ${projectsResponse.status} ${await projectsResponse.text()}`);
    }

    const projects = await projectsResponse.json();
    console.log(`✅ Found ${projects.length} project(s):`);

    if (projects.length === 0) {
      console.log('   (No projects yet - we\'ll create PM OS project next)\n');
    } else {
      projects.forEach(p => {
        console.log(`   - ${p.name} (${p.key})`);
      });
      console.log('');
    }

    console.log('✅ Connection test passed!\n');
    console.log('Cloud ID:', CLOUD_ID);
    console.log('Base URL:', BASE_URL);

  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
    process.exit(1);
  }
}

testConnection();
