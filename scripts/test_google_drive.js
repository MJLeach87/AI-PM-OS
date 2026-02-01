#!/usr/bin/env node

/**
 * Google Drive MCP Connection Test
 *
 * Tests that OAuth credentials are working and can access Google Drive.
 *
 * Usage:
 *   node scripts/test_google_drive.js
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Paths
const CREDENTIALS_PATH = path.join(__dirname, '../mcp/credentials/google_drive_oauth.json');
const TOKEN_PATH = path.join(__dirname, '../mcp/credentials/google_drive_token.json');

/**
 * Load and validate credentials
 */
function loadCredentials() {
  try {
    const credContent = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
    const credentials = JSON.parse(credContent);
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;

    const tokenContent = fs.readFileSync(TOKEN_PATH, 'utf8');
    const tokens = JSON.parse(tokenContent);

    return { client_id, client_secret, redirect_uris, tokens };
  } catch (error) {
    console.error(`❌ Error loading credentials: ${error.message}`);
    console.error('\nPlease run: node scripts/google_drive_auth.js');
    process.exit(1);
  }
}

/**
 * Test Google Drive connection
 */
async function testConnection() {
  console.log('🧪 Testing Google Drive API connection...\n');

  const { client_id, client_secret, redirect_uris, tokens } = loadCredentials();
  const redirectUri = redirect_uris?.[0] || 'http://localhost:3000/oauth/callback';

  // Create OAuth2 client
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirectUri);
  oAuth2Client.setCredentials(tokens);

  // Create Drive API client
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });

  try {
    // Test 1: List files (limit 10)
    console.log('📂 Test 1: Listing recent files...');
    const startTime = Date.now();

    const res = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, mimeType, modifiedTime, owners)',
      orderBy: 'modifiedTime desc',
    });

    const latency = Date.now() - startTime;
    const files = res.data.files;

    if (!files || files.length === 0) {
      console.log('   ⚠️  No files found in your Google Drive');
    } else {
      console.log(`   ✅ Found ${files.length} recent files (${latency}ms):\n`);
      files.forEach((file, i) => {
        const owner = file.owners?.[0]?.displayName || 'Unknown';
        const date = new Date(file.modifiedTime).toLocaleDateString();
        console.log(`   ${i + 1}. ${file.name}`);
        console.log(`      Type: ${file.mimeType}`);
        console.log(`      Modified: ${date} by ${owner}`);
        console.log(`      ID: ${file.id}\n`);
      });
    }

    // Test 2: Search for specific file types
    console.log('📋 Test 2: Searching for documents...');
    const searchStart = Date.now();

    const searchRes = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.document' or mimeType='application/pdf'",
      pageSize: 5,
      fields: 'files(id, name, mimeType)',
      orderBy: 'modifiedTime desc',
    });

    const searchLatency = Date.now() - searchStart;
    const docs = searchRes.data.files;

    console.log(`   ✅ Found ${docs?.length || 0} documents (${searchLatency}ms)\n`);

    // Performance check
    console.log('⚡ Performance Check:');
    console.log(`   List latency: ${latency}ms ${latency < 3000 ? '✅' : '⚠️'} (target: <3000ms)`);
    console.log(`   Search latency: ${searchLatency}ms ${searchLatency < 3000 ? '✅' : '⚠️'} (target: <3000ms)\n`);

    // Summary
    console.log('✅ Google Drive API connection successful!\n');
    console.log('📋 Next steps:');
    console.log('1. Update mcp/config.json to enable Google Drive MCP');
    console.log('2. Update Product Architect to use Google Drive for historical context');
    console.log('3. Test with: "Search Google Drive for PRD documents"\n');

  } catch (error) {
    console.error(`\n❌ Connection test failed: ${error.message}`);

    if (error.message.includes('invalid_grant')) {
      console.error('\n💡 Tip: Your refresh token may have expired. Run: node scripts/google_drive_auth.js');
    } else if (error.message.includes('insufficient permissions')) {
      console.error('\n💡 Tip: You may need to add additional OAuth scopes');
    }

    process.exit(1);
  }
}

/**
 * Main execution
 */
(async () => {
  try {
    await testConnection();
  } catch (error) {
    console.error(`\n❌ Unexpected error: ${error.message}`);
    process.exit(1);
  }
})();
