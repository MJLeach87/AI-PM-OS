#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { marked } = require('marked');

// --- Config ---
const EMAIL = process.env.ATLASSIAN_EMAIL;
const API_TOKEN = process.env.ATLASSIAN_API_TOKEN;
const BASE_URL = (process.env.CONFLUENCE_BASE_URL || '').replace(/\/$/, '');

if (!EMAIL || !API_TOKEN || !BASE_URL) {
  console.error('Missing required env vars: ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN, CONFLUENCE_BASE_URL');
  process.exit(1);
}

const AUTH = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString('base64');
const MANIFEST_PATH = path.join(__dirname, 'confluence-sync-manifest.json');
const REPO_ROOT = path.join(__dirname, '..');

// --- Helpers ---

function hashFile(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex').slice(0, 16);
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function mdToHtml(content) {
  return marked(content);
}

function request(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const bodyStr = body ? JSON.stringify(body) : null;
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method,
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    if (bodyStr) {
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode} ${method} ${url}\n${data}`));
        }
      });
    });

    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

// --- Confluence API ---

async function getPage(pageId) {
  return request('GET', `${BASE_URL}/api/v2/pages/${pageId}`);
}

async function updatePage(pageId, title, htmlContent, currentVersion) {
  return request('PUT', `${BASE_URL}/api/v2/pages/${pageId}`, {
    id: pageId,
    status: 'current',
    title,
    body: {
      representation: 'storage',
      value: htmlContent,
    },
    version: {
      number: currentVersion + 1,
      message: 'Auto-sync from GitHub Actions',
    },
  });
}

async function createPage(spaceKey, parentId, title, htmlContent) {
  return request('POST', `${BASE_URL}/rest/api/content`, {
    type: 'page',
    title,
    space: { key: spaceKey },
    ancestors: [{ id: String(parentId) }],
    body: {
      storage: {
        value: htmlContent,
        representation: 'storage',
      },
    },
  });
}

async function searchPage(spaceKey, title) {
  const escapedTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const cql = `space="${spaceKey}" AND title="${escapedTitle}" AND type=page`;
  const url = `${BASE_URL}/rest/api/content/search?cql=${encodeURIComponent(cql)}&limit=1`;
  const result = await request('GET', url);
  return result.results && result.results.length > 0 ? result.results[0] : null;
}

// --- Sync logic ---

async function syncStaticPage(filePath, entry, manifest) {
  const absPath = path.join(REPO_ROOT, filePath);
  if (!fs.existsSync(absPath)) {
    console.log(`⚠️  File not found, skipping: ${filePath}`);
    return 'skipped';
  }

  const content = fs.readFileSync(absPath, 'utf8');
  const hash = hashFile(content);

  if (hash === entry.hash) {
    console.log(`⏭  Skipped (unchanged): ${filePath}`);
    return 'skipped';
  }

  const page = await getPage(entry.pageId);
  const title = extractTitle(content) || page.title;
  const html = mdToHtml(content);
  await updatePage(entry.pageId, title, html, page.version.number);
  manifest.pages[filePath].hash = hash;
  console.log(`✅ Updated: ${filePath} → page ${entry.pageId}`);
  return 'updated';
}

async function syncDirectoryFile(relPath, absPath, dirEntry, manifest) {
  const content = fs.readFileSync(absPath, 'utf8');
  const hash = hashFile(content);

  if (manifest.pages[relPath]) {
    // Already tracked — check hash
    if (hash === manifest.pages[relPath].hash) {
      console.log(`⏭  Skipped (unchanged): ${relPath}`);
      return 'skipped';
    }
    const page = await getPage(manifest.pages[relPath].pageId);
    const title = extractTitle(content) || page.title;
    const html = mdToHtml(content);
    await updatePage(manifest.pages[relPath].pageId, title, html, page.version.number);
    manifest.pages[relPath].hash = hash;
    console.log(`✅ Updated: ${relPath} → page ${manifest.pages[relPath].pageId}`);
    return 'updated';
  }

  // New file — search or create
  const title = extractTitle(content) || path.basename(relPath, '.md');
  const html = mdToHtml(content);

  const existing = await searchPage('PM', title);
  if (existing) {
    const fullPage = await getPage(existing.id);
    await updatePage(existing.id, title, html, fullPage.version.number);
    manifest.pages[relPath] = { pageId: existing.id, parentId: dirEntry.parentId, hash };
    console.log(`✅ Found + Updated: ${relPath} → page ${existing.id}`);
    return 'updated';
  }

  const newPage = await createPage('PM', dirEntry.parentId, title, html);
  manifest.pages[relPath] = { pageId: newPage.id, parentId: dirEntry.parentId, hash };
  console.log(`➕ Created: ${relPath} → page ${newPage.id}`);
  return 'created';
}

// --- Main ---

async function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const stats = { updated: 0, created: 0, skipped: 0, errors: 0 };

  // --- Static skill pages ---
  console.log('\n=== Syncing static skill pages ===');
  for (const [filePath, entry] of Object.entries(manifest.pages)) {
    // Skip directory-discovered entries (they have no initial hash and come from dirs scan)
    if (!entry.pageId) continue;
    try {
      const result = await syncStaticPage(filePath, entry, manifest);
      stats[result]++;
    } catch (err) {
      console.error(`❌ Error syncing ${filePath}: ${err.message}`);
      stats.errors++;
    }
  }

  // --- Dynamic execution directories ---
  console.log('\n=== Syncing execution directories ===');
  for (const [dirPath, dirEntry] of Object.entries(manifest.directories)) {
    const absDir = path.join(REPO_ROOT, dirPath);
    if (!fs.existsSync(absDir)) {
      console.log(`⚠️  Directory not found, skipping: ${dirPath}`);
      continue;
    }

    const files = fs.readdirSync(absDir).filter(
      f => f.endsWith('.md') && f !== 'README.md' && f !== '.gitkeep'
    );

    for (const filename of files) {
      const relPath = `${dirPath}/${filename}`;
      const absPath = path.join(absDir, filename);
      try {
        const result = await syncDirectoryFile(relPath, absPath, dirEntry, manifest);
        stats[result]++;
      } catch (err) {
        console.error(`❌ Error syncing ${relPath}: ${err.message}`);
        stats.errors++;
      }
    }
  }

  // Always update lastSync and write manifest
  manifest.lastSync = new Date().toISOString();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`\n=== Summary ===`);
  console.log(`✅ Updated: ${stats.updated}`);
  console.log(`➕ Created: ${stats.created}`);
  console.log(`⏭  Skipped: ${stats.skipped}`);
  console.log(`❌ Errors:  ${stats.errors}`);

  if (stats.errors > 0) {
    console.error('\nSync completed with errors.');
    process.exit(1);
  }
  console.log('\nSync complete.');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
