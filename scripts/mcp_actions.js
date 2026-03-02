/**
 * MCP Actions Script
 * Executes 3 architectural record-keeping updates via Atlassian Rovo MCP:
 * 1. Create Jira story (Done) — agent retirement
 * 2. Update/create Confluence Architecture Overview page
 * 3. Update/create Confluence Changelog page
 */

const { spawn } = require('child_process');

class MCPClient {
  constructor() {
    this.proc = null;
    this.buffer = '';
    this.pendingRequests = new Map();
    this.nextId = 1;
    this.initialized = false;
    this.ready = false;
    this.readyResolve = null;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.readyResolve = resolve;

      this.proc = spawn('cmd', ['/c', 'npx', '-y', 'mcp-remote', 'https://mcp.atlassian.com/v1/mcp'], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      this.proc.stdout.on('data', (data) => {
        this.buffer += data.toString();
        const lines = this.buffer.split('\n');
        this.buffer = lines.pop();

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line);
            this._handleMessage(msg);
          } catch (e) {
            // non-JSON line, ignore
          }
        }
      });

      this.proc.stderr.on('data', () => {}); // suppress noise

      // Wait for process to start, then initialize
      setTimeout(() => {
        this._send({
          method: 'initialize',
          params: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            clientInfo: { name: 'pm-os-mcp-client', version: '1.0.0' }
          }
        });
      }, 4000);
    });
  }

  _handleMessage(msg) {
    if (msg.id && this.pendingRequests.has(msg.id)) {
      const { resolve, reject } = this.pendingRequests.get(msg.id);
      this.pendingRequests.delete(msg.id);
      if (msg.error) {
        reject(new Error(`MCP error ${msg.error.code}: ${msg.error.message}`));
      } else {
        resolve(msg.result);
      }

      // First response is the initialize response
      if (!this.initialized) {
        this.initialized = true;
        // Send initialized notification
        this.proc.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
        this.ready = true;
        if (this.readyResolve) {
          this.readyResolve(this);
          this.readyResolve = null;
        }
      }
    }
  }

  _send(payload) {
    const id = this.nextId++;
    const msg = { jsonrpc: '2.0', id, ...payload };
    this.proc.stdin.write(JSON.stringify(msg) + '\n');
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
    });
  }

  callTool(name, args) {
    return this._send({
      method: 'tools/call',
      params: { name, arguments: args }
    });
  }

  stop() {
    if (this.proc) this.proc.kill();
  }
}

function extractText(result) {
  if (!result || !result.content) return JSON.stringify(result);
  return result.content.map(c => c.text || '').join('');
}

async function main() {
  console.log('Starting MCP client...');
  const client = new MCPClient();
  await client.start();
  console.log('MCP client ready.\n');

  // ─── ACTION 1: Create Jira Story ────────────────────────────────────────────
  console.log('=== ACTION 1: Creating Jira Story ===');
  let jiraResult;
  try {
    jiraResult = await client.callTool('createJiraIssue', {
      projectKey: 'PMOS',
      issueType: 'Story',
      summary: '[PMOS] Retire all .claude/agents/ files — skills-only architecture',
      description: [
        'Completed the agent retirement that Phase 5 began. All 4 remaining .claude/agents/ files deleted. ',
        'Skills (.claude/skills/) are now the sole canonical source for all specialist capabilities.\n\n',
        'Deleted files:\n',
        '- orchestrator.md (539 lines) → covered by .claude/CLAUDE.md routing\n',
        '- system_evaluator.md (669 lines) → covered by /pm-os-quality-audit skill\n',
        '- documentation_maintainer.md (455 lines) → covered by /pm-os-doc-sync skill\n',
        '- api_doc_reviewer.md (616 lines) → covered by /engineering-partner skill\n\n',
        'Active docs updated (7 files): CLAUDE.md, QUICK_START.md, VALIDATION_CHECKLIST.md, README.md, ',
        'agent_spec_template.md, domain_specialist_template.md, identity/README.md\n\n',
        'pm-os-reference meta-recursive docs created:\n',
        '- ADR: 2026-02-15_ADR_Skills-Only-Architecture.md\n',
        '- Phase history: PHASE_5_ADDENDUM_Agent-Retirement_2026-02-15.md\n\n',
        'Acceptance Criteria:\n',
        '✅ .claude/agents/ empty\n',
        '✅ All 11 skills present and functional\n',
        '✅ No stale agent references in active docs\n',
        '✅ Changes committed and pushed to GitHub\n\n',
        'Status: Done (completed 2026-02-15)'
      ].join(''),
      priority: 'Medium',
      labels: ['architecture', 'cleanup', 'skills-migration']
    });
    console.log('Jira create result:', extractText(jiraResult).substring(0, 800));
  } catch (e) {
    console.error('Jira create error:', e.message);
    jiraResult = null;
  }

  // Parse the issue key from the result
  let issueKey = null;
  if (jiraResult) {
    const text = extractText(jiraResult);
    const match = text.match(/PMOS-\d+/);
    if (match) issueKey = match[0];
    console.log('Issue key:', issueKey);
  }

  // ─── ACTION 1b: Transition to Done ──────────────────────────────────────────
  if (issueKey) {
    console.log('\n=== ACTION 1b: Getting transitions for', issueKey, '===');
    try {
      const transResult = await client.callTool('getTransitionsForJiraIssue', {
        issueKey
      });
      const transText = extractText(transResult);
      console.log('Transitions:', transText.substring(0, 600));

      // Find the "Done" transition ID
      const doneMatch = transText.match(/"id"\s*:\s*"(\d+)"[^}]*"name"\s*:\s*"Done"/);
      const doneMatch2 = transText.match(/"name"\s*:\s*"Done"[^}]*"id"\s*:\s*"(\d+)"/);
      const anyDone = transText.match(/Done.*?id['":\s]+(\d+)/i) || transText.match(/id['":\s]+(\d+)[^}]*Done/i);

      let transitionId = null;
      if (doneMatch) transitionId = doneMatch[1];
      else if (doneMatch2) transitionId = doneMatch2[1];

      console.log('Done transition ID:', transitionId);

      if (transitionId) {
        const transitionResult = await client.callTool('transitionJiraIssue', {
          issueKey,
          transitionId
        });
        console.log('Transition result:', extractText(transitionResult).substring(0, 300));
      } else {
        console.log('Could not find Done transition ID from:', transText.substring(0, 400));
      }
    } catch (e) {
      console.error('Transition error:', e.message);
    }
  }

  // ─── ACTION 2: Search for Architecture Overview page ────────────────────────
  console.log('\n=== ACTION 2: Searching for Architecture Overview page ===');
  let archPageId = null;
  try {
    const searchResult = await client.callTool('searchConfluenceUsingCql', {
      cql: 'space = "PM" AND title = "PM OS Architecture Overview"',
      cloudId: 'd1d9d612-3182-4d76-ad10-bce2f315b8f3'
    });
    const searchText = extractText(searchResult);
    console.log('Search result:', searchText.substring(0, 600));
    const idMatch = searchText.match(/"id"\s*:\s*"?(\d+)"?/);
    if (idMatch) archPageId = idMatch[1];
    console.log('Found page ID:', archPageId);
  } catch (e) {
    console.error('Search error:', e.message);
  }

  const archContent = `<h2>Agent Architecture (Updated 2026-02-15)</h2>
<p>PM OS uses a skills-only architecture:</p>
<ul>
  <li><code>.claude/skills/</code> — 11 skills, canonical source for all specialist capabilities</li>
  <li><code>.claude/CLAUDE.md</code> — Ambient orchestrator; handles routing, identity context injection</li>
  <li><code>.claude/agents/</code> — EMPTY (all agent files retired 2026-02-15)</li>
</ul>
<p>Specialist skills available:</p>
<table>
  <thead><tr><th>Slash Command</th><th>Role</th></tr></thead>
  <tbody>
    <tr><td>/product-architect</td><td>Discovery, PRD, OST, agent spec creation</td></tr>
    <tr><td>/engineering-partner</td><td>Feasibility, security (STRIDE/OWASP), API contracts, BPMN</td></tr>
    <tr><td>/ux-strategist</td><td>React/Tailwind prototypes, IA, user flows, accessibility</td></tr>
    <tr><td>/data-analyst</td><td>SQL, metrics validation, A/B test analysis</td></tr>
    <tr><td>/gtm-strategist</td><td>Positioning, value props, battle cards, pricing</td></tr>
    <tr><td>/discovery</td><td>Full OST + discovery artifact pipeline</td></tr>
    <tr><td>/prd</td><td>BMAD PRD generation (with metrics validation at step 8)</td></tr>
    <tr><td>/feature-pipeline</td><td>End-to-end feature workflow (supports parallel notation)</td></tr>
    <tr><td>/pm-os-quality-audit</td><td>PM OS quality audit</td></tr>
    <tr><td>/pm-os-doc-sync</td><td>PM OS documentation sync</td></tr>
    <tr><td>/release-check</td><td>Pre-push deep review for PM OS updates</td></tr>
  </tbody>
</table>
<p>ADR: 2026-02-15_ADR_Skills-Only-Architecture.md (in GitHub)</p>`;

  if (archPageId) {
    console.log('\n=== ACTION 2: Updating existing Architecture Overview page ===');
    try {
      // Get current page version first
      const pageResult = await client.callTool('getConfluencePage', {
        pageId: archPageId,
        cloudId: 'd1d9d612-3182-4d76-ad10-bce2f315b8f3'
      });
      const pageText = extractText(pageResult);
      console.log('Current page:', pageText.substring(0, 400));
      const versionMatch = pageText.match(/"number"\s*:\s*(\d+)/);
      const currentVersion = versionMatch ? parseInt(versionMatch[1]) : 1;
      console.log('Current version:', currentVersion);

      const updateResult = await client.callTool('updateConfluencePage', {
        pageId: archPageId,
        cloudId: 'd1d9d612-3182-4d76-ad10-bce2f315b8f3',
        title: 'PM OS Architecture Overview',
        content: archContent,
        version: currentVersion + 1
      });
      console.log('Update result:', extractText(updateResult).substring(0, 500));
    } catch (e) {
      console.error('Update error:', e.message);
    }
  } else {
    console.log('\n=== ACTION 2: Creating Architecture Overview page ===');
    try {
      const createResult = await client.callTool('createConfluencePage', {
        cloudId: 'd1d9d612-3182-4d76-ad10-bce2f315b8f3',
        spaceKey: 'PM',
        title: 'PM OS Architecture Overview',
        content: archContent
      });
      console.log('Create result:', extractText(createResult).substring(0, 500));
    } catch (e) {
      console.error('Create error:', e.message);
    }
  }

  // ─── ACTION 3: Search for Changelog page ────────────────────────────────────
  console.log('\n=== ACTION 3: Searching for PM OS Changelog page ===');
  let changelogPageId = null;
  try {
    const searchResult = await client.callTool('searchConfluenceUsingCql', {
      cql: 'space = "PM" AND title = "PM OS Changelog"',
      cloudId: 'd1d9d612-3182-4d76-ad10-bce2f315b8f3'
    });
    const searchText = extractText(searchResult);
    console.log('Changelog search result:', searchText.substring(0, 600));
    const idMatch = searchText.match(/"id"\s*:\s*"?(\d+)"?/);
    if (idMatch) changelogPageId = idMatch[1];
    console.log('Found changelog page ID:', changelogPageId);
  } catch (e) {
    console.error('Changelog search error:', e.message);
  }

  const newEntry = `<h2>2026-02-15 — Skills-Only Architecture (Agent Retirement)</h2>
<p><strong>Type</strong>: Architectural cleanup (inter-phase, between Phase 7 and Phase 8)</p>
<p><strong>Changes</strong>:</p>
<ul>
  <li>Deleted all 4 remaining .claude/agents/ files</li>
  <li>.claude/agents/ is now empty</li>
  <li>Skills (.claude/skills/) are the sole canonical implementation layer</li>
  <li>QUICK_START.md updated to v2.0 with all 11 skills documented</li>
  <li>7 active docs cleaned of stale agent references</li>
</ul>
<p><strong>Why</strong>:<br/>
Phase 5 (2026-02-14) created 10 skills but left 4 agent files as "partial matches."
Review confirmed CLAUDE.md handles orchestration and all skills cover specialist capabilities.
Retiring agent files eliminates maintenance overhead with no user-facing regression.</p>
<p><strong>Impact</strong>: None — all capabilities preserved via skills. Zero regressions.</p>
<p><strong>Decision record</strong>: ADR-003 — 2026-02-15_ADR_Skills-Only-Architecture.md</p>
<hr/>`;

  if (changelogPageId) {
    console.log('\n=== ACTION 3: Updating existing Changelog page (prepend entry) ===');
    try {
      const pageResult = await client.callTool('getConfluencePage', {
        pageId: changelogPageId,
        cloudId: 'd1d9d612-3182-4d76-ad10-bce2f315b8f3'
      });
      const pageText = extractText(pageResult);
      const versionMatch = pageText.match(/"number"\s*:\s*(\d+)/);
      const currentVersion = versionMatch ? parseInt(versionMatch[1]) : 1;
      console.log('Current changelog version:', currentVersion);

      // Extract existing body content to prepend new entry
      const bodyMatch = pageText.match(/"body"\s*:\s*"([\s\S]*?)(?:","|\})/);
      const existingBody = bodyMatch ? bodyMatch[1] : '';

      const updateResult = await client.callTool('updateConfluencePage', {
        pageId: changelogPageId,
        cloudId: 'd1d9d612-3182-4d76-ad10-bce2f315b8f3',
        title: 'PM OS Changelog',
        content: newEntry + (existingBody || ''),
        version: currentVersion + 1
      });
      console.log('Changelog update result:', extractText(updateResult).substring(0, 500));
    } catch (e) {
      console.error('Changelog update error:', e.message);
    }
  } else {
    console.log('\n=== ACTION 3: Creating new Changelog page ===');
    try {
      const createResult = await client.callTool('createConfluencePage', {
        cloudId: 'd1d9d612-3182-4d76-ad10-bce2f315b8f3',
        spaceKey: 'PM',
        title: 'PM OS Changelog',
        content: `<h1>PM OS Changelog</h1>
<p>Records of significant changes to the PM OS system.</p>
<hr/>
${newEntry}`,
        parentId: '1212417'
      });
      console.log('Changelog create result:', extractText(createResult).substring(0, 500));
    } catch (e) {
      console.error('Changelog create error:', e.message);
    }
  }

  console.log('\n=== All actions complete ===');
  client.stop();
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
