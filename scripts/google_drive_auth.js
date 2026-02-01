#!/usr/bin/env node

/**
 * Google Drive OAuth 2.0 Token Acquisition Script
 *
 * This script helps you obtain a refresh token for Google Drive API access.
 *
 * Prerequisites:
 * 1. Google Cloud Project created
 * 2. Drive API enabled
 * 3. OAuth 2.0 credentials downloaded to mcp/credentials/google_drive_oauth.json
 *
 * Usage:
 *   node scripts/google_drive_auth.js
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const { google } = require('googleapis');
const open = require('open');

// Paths
const CREDENTIALS_PATH = path.join(__dirname, '../mcp/credentials/google_drive_oauth.json');
const TOKEN_PATH = path.join(__dirname, '../mcp/credentials/google_drive_token.json');

// OAuth 2.0 scopes
const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly', // Read-only access (Phase 1)
  // 'https://www.googleapis.com/auth/drive.file', // Uncomment for write access (Phase 2+)
];

/**
 * Load OAuth client credentials from downloaded JSON file
 */
function loadCredentials() {
  try {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      console.error(`❌ Error: Credentials file not found at ${CREDENTIALS_PATH}`);
      console.error('\nPlease follow these steps:');
      console.error('1. Go to https://console.cloud.google.com/');
      console.error('2. Create OAuth 2.0 credentials');
      console.error('3. Download the JSON file');
      console.error(`4. Save it to ${CREDENTIALS_PATH}`);
      process.exit(1);
    }

    const content = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
    const credentials = JSON.parse(content);

    // Handle both desktop app and web app credential formats
    const { client_secret, client_id, redirect_uris } =
      credentials.installed || credentials.web;

    if (!client_id || !client_secret) {
      console.error('❌ Error: Invalid credentials file format');
      process.exit(1);
    }

    return { client_id, client_secret, redirect_uris };
  } catch (error) {
    console.error(`❌ Error loading credentials: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Create OAuth2 client
 */
function createOAuth2Client(credentials) {
  const { client_id, client_secret, redirect_uris } = credentials;
  // Use the redirect URI from credentials file (Desktop app uses http://localhost)
  const redirectUri = redirect_uris?.[0] || 'http://localhost';

  return new google.auth.OAuth2(client_id, client_secret, redirectUri);
}

/**
 * Start local server to receive OAuth callback
 */
function startCallbackServer(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const queryParams = url.parse(req.url, true).query;

        if (queryParams.code) {
          // Exchange authorization code for tokens
          const { tokens } = await oAuth2Client.getToken(queryParams.code);
          oAuth2Client.setCredentials(tokens);

          // Save tokens to file
          const credentialsDir = path.dirname(TOKEN_PATH);
          if (!fs.existsSync(credentialsDir)) {
            fs.mkdirSync(credentialsDir, { recursive: true });
          }
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));

          // Send success response to browser
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: green;">✅ Authorization Successful!</h1>
                <p>You can close this window and return to the terminal.</p>
                <p>Your refresh token has been saved.</p>
              </body>
            </html>
          `);

          server.close();
          resolve(tokens);
        } else if (queryParams.error) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: red;">❌ Authorization Failed</h1>
                <p>Error: ${queryParams.error}</p>
                <p>Please try again.</p>
              </body>
            </html>
          `);

          server.close();
          reject(new Error(`OAuth error: ${queryParams.error}`));
        }
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
        server.close();
        reject(error);
      }
    });

    // Listen on port 80 to match Desktop app redirect URI (http://localhost)
    const port = 80;
    server.listen(port, () => {
      console.log(`🌐 OAuth callback server listening on http://localhost:${port}`);
    });
  });
}

/**
 * Authorize and obtain tokens
 */
async function authorize() {
  console.log('🔐 Starting Google Drive OAuth 2.0 authorization...\n');

  const credentials = loadCredentials();
  const oAuth2Client = createOAuth2Client(credentials);

  // Generate authorization URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // Get refresh token
    scope: SCOPES,
    prompt: 'consent', // Force consent screen to get refresh token
  });

  console.log('📋 Authorization Steps:');
  console.log('1. Your browser will open automatically');
  console.log('2. Sign in with your Google account');
  console.log('3. Grant permissions to PM OS');
  console.log('4. You\'ll be redirected back automatically\n');

  console.log('🔗 If browser doesn\'t open, visit this URL manually:');
  console.log(`   ${authUrl}\n`);

  // Open browser
  try {
    await open(authUrl);
  } catch (error) {
    console.warn('⚠️  Could not open browser automatically. Please visit the URL above.');
  }

  // Wait for OAuth callback
  try {
    const tokens = await startCallbackServer(oAuth2Client);

    console.log('\n✅ Authorization successful!\n');
    console.log('📝 Tokens saved to:', TOKEN_PATH);
    console.log('\n🔑 Your credentials:');
    console.log(`   Access Token: ${tokens.access_token?.substring(0, 20)}...`);
    console.log(`   Refresh Token: ${tokens.refresh_token?.substring(0, 20)}...`);
    console.log(`   Expires: ${new Date(tokens.expiry_date).toLocaleString()}\n`);

    console.log('📋 Next steps:');
    console.log('1. Copy the following to your .env file:');
    console.log(`\n   GOOGLE_DRIVE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    console.log('2. Update mcp/config.json to enable Google Drive MCP');
    console.log('3. Test connectivity with: node scripts/test_google_drive.js\n');

    return tokens;
  } catch (error) {
    console.error(`\n❌ Authorization failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Main execution
 */
(async () => {
  try {
    await authorize();
  } catch (error) {
    console.error(`\n❌ Unexpected error: ${error.message}`);
    process.exit(1);
  }
})();
