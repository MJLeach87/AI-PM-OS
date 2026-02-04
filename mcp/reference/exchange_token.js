/**
 * Manual token exchange script
 * Exchanges authorization code for access/refresh tokens
 */

const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '../mcp/credentials/atlassian_oauth.json');
const TOKEN_PATH = path.join(__dirname, '../mcp/credentials/atlassian_token.json');

// Load credentials
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
const { client_id, client_secret, token_uri, redirect_uris } = credentials.installed;

// Authorization code from callback URL
const CODE = process.argv[2];

if (!CODE) {
  console.error('❌ Error: Please provide authorization code as argument');
  console.error('Usage: node scripts/exchange_token.js <code>');
  process.exit(1);
}

async function exchangeToken() {
  try {
    console.log('🔄 Exchanging authorization code for tokens...\n');

    // Step 1: Exchange code for tokens
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: client_id,
      client_secret: client_secret,
      code: CODE,
      redirect_uri: redirect_uris[0]
    });

    const response = await fetch(token_uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${error}`);
    }

    const tokens = await response.json();
    console.log('✅ Tokens received\n');

    // Step 2: Get accessible resources
    console.log('🔄 Fetching accessible Atlassian resources...\n');

    const resourcesResponse = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        'Accept': 'application/json'
      }
    });

    if (!resourcesResponse.ok) {
      const error = await resourcesResponse.text();
      throw new Error(`Failed to fetch resources: ${resourcesResponse.status} ${error}`);
    }

    const resources = await resourcesResponse.json();
    console.log('✅ Resources fetched\n');

    // Step 3: Save tokens
    const tokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
      token_type: tokens.token_type,
      scope: tokens.scope,
      created_at: Date.now(),
      resources: resources
    };

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2));
    console.log(`✅ Tokens saved to: ${TOKEN_PATH}\n`);

    // Print resource info
    console.log('📋 Accessible Atlassian Resources:\n');
    resources.forEach((resource, idx) => {
      console.log(`${idx + 1}. ${resource.name}`);
      console.log(`   Cloud ID: ${resource.id}`);
      console.log(`   URL: ${resource.url}`);
      console.log(`   Scopes: ${resource.scopes.join(', ')}\n`);
    });

    console.log('✅ OAuth flow complete!\n');
    console.log('Next steps:');
    console.log('1. Test connection: node scripts/test_jira.js');
    console.log('2. Create Jira project via API\n');

  } catch (error) {
    console.error('\n❌ Token exchange failed:', error.message);
    process.exit(1);
  }
}

exchangeToken();
