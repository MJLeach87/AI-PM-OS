/**
 * Atlassian OAuth 2.0 Authentication Flow
 *
 * This script handles the OAuth flow to get access and refresh tokens
 * for Jira and Confluence APIs.
 *
 * Usage: node scripts/atlassian_auth.js
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const { execSync } = require('child_process');

// Paths
const CREDENTIALS_PATH = path.join(__dirname, '../mcp/credentials/atlassian_oauth.json');
const TOKEN_PATH = path.join(__dirname, '../mcp/credentials/atlassian_token.json');

// Load OAuth credentials
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
const { client_id, client_secret, auth_uri, token_uri, redirect_uris, scopes } = credentials.installed;

// OAuth state (for CSRF protection)
const STATE = Math.random().toString(36).substring(7);

/**
 * Step 1: Start local callback server
 */
function startCallbackServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const parsedUrl = url.parse(req.url, true);

      if (parsedUrl.pathname === '/oauth/callback') {
        const { code, state } = parsedUrl.query;

        // Verify state matches (CSRF protection)
        if (state !== STATE) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end('<h1>Error: Invalid state parameter</h1>');
          server.close();
          reject(new Error('Invalid state parameter'));
          return;
        }

        if (!code) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end('<h1>Error: No authorization code received</h1>');
          server.close();
          reject(new Error('No authorization code'));
          return;
        }

        // Success! Show user
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>✅ Authorization Successful!</h1>
          <p>You can close this window and return to the terminal.</p>
          <script>setTimeout(() => window.close(), 3000);</script>
        `);

        // Close server and resolve with code
        server.close();
        resolve(code);
      }
    });

    server.listen(3000, () => {
      console.log('✅ Callback server started on http://localhost:3000');
    });

    // Timeout after 5 minutes
    setTimeout(() => {
      server.close();
      reject(new Error('OAuth flow timeout (5 minutes)'));
    }, 5 * 60 * 1000);
  });
}

/**
 * Step 2: Generate authorization URL
 */
function getAuthorizationUrl() {
  const params = new URLSearchParams({
    audience: 'api.atlassian.com',
    client_id: client_id,
    scope: scopes.join(' '),
    redirect_uri: redirect_uris[0],
    state: STATE,
    response_type: 'code',
    prompt: 'consent'
  });

  return `${auth_uri}?${params.toString()}`;
}

/**
 * Step 3: Exchange authorization code for tokens
 */
async function exchangeCodeForTokens(code) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: client_id,
    client_secret: client_secret,
    code: code,
    redirect_uri: redirect_uris[0]
  });

  console.log('🔄 Exchanging authorization code for tokens...');

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
  return tokens;
}

/**
 * Step 4: Get accessible Atlassian resources (Cloud IDs)
 */
async function getAccessibleResources(accessToken) {
  console.log('🔄 Fetching accessible Atlassian resources...');

  const response = await fetch('https://api.atlassian.com/oauth/token/accessible-resources', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch resources: ${response.status} ${error}`);
  }

  const resources = await response.json();
  return resources;
}

/**
 * Step 5: Save tokens to file
 */
function saveTokens(tokens, resources) {
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
  console.log(`✅ Tokens saved to: ${TOKEN_PATH}`);

  // Print resource info
  console.log('\n📋 Accessible Atlassian Resources:');
  resources.forEach((resource, idx) => {
    console.log(`\n${idx + 1}. ${resource.name}`);
    console.log(`   Cloud ID: ${resource.id}`);
    console.log(`   URL: ${resource.url}`);
    console.log(`   Scopes: ${resource.scopes.join(', ')}`);
  });
}

/**
 * Main OAuth flow
 */
async function main() {
  try {
    console.log('🚀 Starting Atlassian OAuth 2.0 flow...\n');

    // Step 1: Start callback server
    const codePromise = startCallbackServer();

    // Step 2: Generate and open authorization URL
    const authUrl = getAuthorizationUrl();
    console.log('📖 Opening authorization URL in browser...');
    console.log(`   ${authUrl}\n`);

    // Open browser (cross-platform)
    const command = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    try {
      execSync(`${command} "${authUrl}"`);
    } catch (error) {
      console.log('⚠️  Could not open browser automatically. Please open the URL above manually.');
    }

    console.log('⏳ Waiting for authorization...\n');

    // Wait for callback with code
    const code = await codePromise;
    console.log('✅ Authorization code received\n');

    // Step 3: Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);
    console.log('✅ Tokens received\n');

    // Step 4: Get accessible resources
    const resources = await getAccessibleResources(tokens.access_token);
    console.log('✅ Resources fetched\n');

    // Step 5: Save tokens
    saveTokens(tokens, resources);

    console.log('\n✅ OAuth flow complete!');
    console.log('\nNext steps:');
    console.log('1. Test connection: node scripts/test_jira.js');
    console.log('2. Create Jira project via API');

  } catch (error) {
    console.error('\n❌ OAuth flow failed:', error.message);
    process.exit(1);
  }
}

// Run
main();
