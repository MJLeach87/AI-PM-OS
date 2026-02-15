/**
 * PM OS Jira Backlog Bulk Creation Script
 * Creates all 46 backlog items from the 2026-02-15_Jira-Backlog-Formalization.md
 *
 * Prerequisites:
 *   Add to .env:
 *     JIRA_API_TOKEN=your_api_token
 *     JIRA_EMAIL=your_atlassian_email
 *     JIRA_DOMAIN=aipmos.atlassian.net
 *
 *   Get your API token: https://id.atlassian.com/manage-profile/security/api-tokens
 *
 * Usage:
 *   node scripts/create_jira_backlog.js
 *   node scripts/create_jira_backlog.js --dry-run   (preview only, no API calls)
 *   node scripts/create_jira_backlog.js --epics-only (create epics, skip stories)
 *   node scripts/create_jira_backlog.js --stories-only (skip epic creation, needs epicMap)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes('--dry-run');
const EPICS_ONLY = process.argv.includes('--epics-only');
const STORIES_ONLY = process.argv.includes('--stories-only');

function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    const env = fs.readFileSync(envPath, 'utf8');
    for (const line of env.split('\n')) {
      const m = line.match(/^([A-Z_]+)=(.+)/);
      if (m) process.env[m[1]] = m[2].trim();
    }
  } catch (e) {
    // .env not found; rely on environment
  }
}
loadEnv();

const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const PROJECT_KEY = 'PMOS';

if (!JIRA_DOMAIN || !JIRA_EMAIL || !JIRA_API_TOKEN) {
  console.error('❌ Missing Jira credentials. Add JIRA_API_TOKEN, JIRA_EMAIL, JIRA_DOMAIN to .env');
  if (!DRY_RUN) process.exit(1);
}

const AUTH = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

// ─── HTTP helpers ─────────────────────────────────────────────────────────────
function jiraRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: JIRA_DOMAIN,
      path: '/rest/api/3' + path,
      method,
      headers: {
        'Authorization': 'Basic ' + AUTH,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };
    const req = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const parsed = d ? JSON.parse(d) : {};
          if (res.statusCode >= 400) reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed)}`));
          else resolve(parsed);
        } catch (e) { reject(new Error(`Parse error: ${d.substring(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Jira helpers ─────────────────────────────────────────────────────────────
async function findExistingEpics() {
  console.log('\n📋 Querying existing PMOS epics...');
  const jql = encodeURIComponent(`project = ${PROJECT_KEY} AND issuetype = Epic ORDER BY created ASC`);
  const result = await jiraRequest('GET', `/search?jql=${jql}&fields=summary,status&maxResults=50`);
  const epics = {};
  for (const issue of result.issues || []) {
    epics[issue.fields.summary] = { key: issue.key, status: issue.fields.status.name };
    console.log(`  ${issue.key}: ${issue.fields.summary} [${issue.fields.status.name}]`);
  }
  return epics;
}

async function createIssue(issueData) {
  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would create: ${issueData.fields.issuetype.name} — ${issueData.fields.summary}`);
    return { key: 'PMOS-DRY-' + Math.floor(Math.random() * 1000) };
  }
  await sleep(300); // rate limit
  return await jiraRequest('POST', '/issue', issueData);
}

async function transitionIssue(issueKey, statusName) {
  if (DRY_RUN) { console.log(`  [DRY RUN] Would transition ${issueKey} → ${statusName}`); return; }
  // Get available transitions
  const transitions = await jiraRequest('GET', `/issue/${issueKey}/transitions`);
  const target = transitions.transitions.find(t =>
    t.name.toLowerCase().includes(statusName.toLowerCase()) ||
    t.to.name.toLowerCase().includes(statusName.toLowerCase())
  );
  if (target) {
    await sleep(200);
    await jiraRequest('POST', `/issue/${issueKey}/transitions`, { transition: { id: target.id } });
    console.log(`  → Transitioned ${issueKey} to ${target.to.name}`);
  } else {
    console.log(`  ⚠️  No transition found for "${statusName}" on ${issueKey}`);
  }
}

// ─── Epic definitions ─────────────────────────────────────────────────────────
// E1–E6: confirm existing; E7–E10: create if missing
const EPIC_DEFINITIONS = [
  { key: 'E1', title: 'PM OS Bootstrap Foundation',                  status: 'Done',  create: false },
  { key: 'E2', title: 'PM OS Core Agent Team + Google Drive MCP',    status: 'Done',  create: false },
  { key: 'E3', title: 'PM OS Execution Layer',                        status: 'Done',  create: false },
  { key: 'E4', title: 'PM OS Self-Improvement Loop',                 status: 'Done',  create: false },
  { key: 'E5', title: 'PM OS MCP Integration Suite',                 status: 'Done',  create: false },
  { key: 'E6', title: 'PM OS Claude Code Skills Migration',          status: 'Done',  create: false },
  { key: 'E7', title: 'PM OS Data Intelligence Layer',               status: 'Done',  create: true  },
  { key: 'E8', title: 'PM OS Claude Code Advanced Workflows',        status: 'Done',  create: true  },
  { key: 'E9', title: 'PM OS Enterprise Readiness',                  status: 'Open',  create: true  },
  { key: 'E10', title: 'PM OS Maintenance & Continuous Improvement', status: 'Open',  create: true  },
];

// ─── Story definitions ────────────────────────────────────────────────────────
// Each story: { id, epic, type, title, labels, component, priority, status, description, ac }
function makeADF(text) {
  // Simple ADF (Atlassian Document Format) for description
  return {
    type: 'doc', version: 1,
    content: [{ type: 'paragraph', content: [{ type: 'text', text }] }]
  };
}

const STORIES = [
  // ── Section A: Phase 6 ────────────────────────────────────────────────────
  {
    id: 'A1', epic: 'E7', type: 'Story',
    title: 'Create identity/DATA_DICTIONARY.md — fourth identity layer file',
    labels: ['phase-6', 'identity-layer'], component: 'Identity Layer',
    priority: 'Medium', status: 'Done',
    description: 'Added DATA_DICTIONARY.md as the fourth identity layer file. Contains schema definitions, metric formulas, and instrumentation status template. Serves as single source of truth for all data definitions in PM OS metric validation workflows.',
  },
  {
    id: 'A2', epic: 'E7', type: 'Story',
    title: 'Create templates/metrics_validation_template.md',
    labels: ['phase-6', 'templates'], component: 'Templates',
    priority: 'Medium', status: 'Done',
    description: 'Standardized metrics validation report template providing consistent format for baseline data gathering, goal-setting, and validation results across PRD and feature pipeline workflows.',
  },
  {
    id: 'A3', epic: 'E7', type: 'Story',
    title: 'Data Analyst v2.1 — elevate DATA_DICTIONARY to Required context',
    labels: ['phase-6', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Done',
    description: 'Upgraded /data-analyst SKILL.md to v2.1. DATA_DICTIONARY.md elevated from optional to required context; metrics_validation_template.md linked. Data Analyst now performs DATA_DICTIONARY-first lookup before generating SQL or metric queries.',
  },
  {
    id: 'A4', epic: 'E7', type: 'Story',
    title: '/prd skill Step 8 — metrics validation offer after PRD generation',
    labels: ['phase-6', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Done',
    description: 'Updated /prd SKILL.md to add Step 8: after PRD generation, explicitly offer a metrics validation pass using the Data Analyst skill. Closes the loop between PRD success criteria and quantified baselines.',
  },
  {
    id: 'A5', epic: 'E10', type: 'Story',
    title: 'Automated data quality scoring — deferred, requires Snowflake MCP',
    labels: ['phase-6', 'deferred', 'mcp-integration'], component: 'MCP Integrations',
    priority: 'Low', status: 'Open',
    description: 'Automated data quality scoring was scoped in Phase 6 but deferred pending Snowflake MCP. Once connected, Data Analyst should auto-generate quality scores on DATA_DICTIONARY fields during each audit run.',
  },

  // ── Section B: Phase 7 ────────────────────────────────────────────────────
  {
    id: 'B1', epic: 'E8', type: 'Story',
    title: 'Create templates/ab_test_analysis_template.md',
    labels: ['phase-7', 'templates'], component: 'Templates',
    priority: 'Medium', status: 'Done',
    description: 'Full A/B test analysis template (deferred from Phase 6). Framework for hypotheses, instrumentation plans, statistical significance thresholds, and results interpretation. Linked from Data Analyst SKILL.md v2.2.',
  },
  {
    id: 'B2', epic: 'E8', type: 'Story',
    title: 'Create templates/domain_specialist_template.md — vertical domain framework',
    labels: ['phase-7', 'templates'], component: 'Templates',
    priority: 'Medium', status: 'Done',
    description: 'Domain specialist framework template for building vertical domain agents (payments, healthcare, B2B SaaS, etc.). Reusable structure for domain-specific context files, reducing time-to-first-output for new verticals.',
  },
  {
    id: 'B3', epic: 'E8', type: 'Story',
    title: 'Create pm-os-reference/documentation/PARALLEL_WORKFLOWS.md — 5 named patterns',
    labels: ['phase-7', 'documentation'], component: 'Documentation',
    priority: 'Medium', status: 'Done',
    description: 'Documented 5 named parallel processing patterns for Claude Code multi-agent workflows. Includes velocity impact table (50–75% time savings) and invocation templates for each pattern.',
  },
  {
    id: 'B4', epic: 'E8', type: 'Story',
    title: '/feature-pipeline skill — add [PARALLEL] notation for steps 2+3 and 4+5',
    labels: ['phase-7', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Done',
    description: 'Updated /feature-pipeline SKILL.md to add explicit [PARALLEL] notation for Steps 2+3 (Engineering + UX) and Steps 4+5 (Data Analyst + GTM). PARALLEL_WORKFLOWS.md linked.',
  },
  {
    id: 'B5', epic: 'E8', type: 'Story',
    title: 'Data Analyst v2.2 — A/B template link + PARALLEL_WORKFLOWS reference',
    labels: ['phase-7', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Done',
    description: 'Upgraded /data-analyst SKILL.md to v2.2. Added ab_test_analysis_template.md link in A/B analysis step; added PARALLEL_WORKFLOWS.md reference for compound metric queries.',
  },
  {
    id: 'B6', epic: 'E8', type: 'Story',
    title: 'Skills expansion evaluation — decision to not create new skills (documented)',
    labels: ['phase-7', 'architecture'], component: 'Skills Layer',
    priority: 'Low', status: 'Done',
    description: 'Phase 7 skills expansion evaluation: no new skills warranted. All proposed capabilities achievable via CLAUDE.md ambient routing + existing 10 skills + domain_specialist_template.md framework. Decision documented in PHASE_7_ADVANCED_WORKFLOWS.md.',
  },

  // ── Section C: Inter-Phase Agent Retirement ────────────────────────────────
  {
    id: 'C1', epic: 'E6', type: 'Story',
    title: 'Retire all .claude/agents/ files — skills-only architecture',
    labels: ['architecture', 'inter-phase'], component: 'Skills Layer',
    priority: 'Medium', status: 'Done',
    description: 'Deleted all 9 .claude/agents/ files. Skills are now the sole canonical source. Files retired: orchestrator.md, system_evaluator.md, documentation_maintainer.md, api_doc_reviewer.md + 5 retired in Phase 5. .claude/agents/ is now empty.',
  },
  {
    id: 'C2', epic: 'E6', type: 'Story',
    title: 'Update CLAUDE.md as ambient orchestrator and routing authority',
    labels: ['documentation', 'architecture'], component: 'Documentation',
    priority: 'Medium', status: 'Done',
    description: 'Rewrote .claude/CLAUDE.md from 516 to 152 lines as ambient orchestrator. Contains canonical skills routing table, Mode A/B guidance, and two-mode operating model. All agent references removed.',
  },
  {
    id: 'C3', epic: 'E6', type: 'Story',
    title: 'ADR: 2026-02-15_ADR_Skills-Only-Architecture.md',
    labels: ['documentation', 'architecture'], component: 'Documentation',
    priority: 'Medium', status: 'Done',
    description: 'Architecture Decision Record documenting the skills-only architecture: context, decision, rationale (100% Claude Code usage confirmed), and consequences. Stored in pm-os-reference/documentation/.',
  },

  // ── Section D: Phase 8 ────────────────────────────────────────────────────
  {
    id: 'D1', epic: 'E9', type: 'Story',
    title: 'Multi-user Git workflow — CODEOWNERS, branch protection, conflict conventions',
    labels: ['phase-8', 'architecture'], component: 'Security & Automation',
    priority: 'High', status: 'Open',
    description: 'Design and implement multi-user Git model: CODEOWNERS, branch protection for main, merge conflict resolution conventions for identity/ files, and PM-specific branching strategy for concurrent PM sessions.',
  },
  {
    id: 'D2', epic: 'E9', type: 'Story',
    title: 'Security hardening — SOC 2 readiness assessment and gap remediation',
    labels: ['phase-8', 'architecture'], component: 'Security & Automation',
    priority: 'High', status: 'Open',
    description: 'SOC 2 readiness gap assessment for PM OS architecture. Identify gaps in access control, audit logging, data handling, and secret management. Produce gap report and remediation plan focused on PM tooling controls.',
  },
  {
    id: 'D3', epic: 'E9', type: 'Story',
    title: 'Onboarding documentation — PM OS setup guide, training materials, <2hr target',
    labels: ['phase-8', 'documentation'], component: 'Documentation',
    priority: 'High', status: 'Open',
    description: 'PM OS onboarding guide targeting <2hr setup time. Covers: prerequisites, Claude Code setup, .env configuration, first skill invocation, and Mode A vs Mode B orientation.',
  },
  {
    id: 'D4', epic: 'E9', type: 'Story',
    title: 'Web application prototype — PRD generation feature parity demo (optional)',
    labels: ['phase-8', 'skills'], component: 'Skills Layer',
    priority: 'Low', status: 'Open',
    description: 'Web prototype demonstrating PM OS PRD generation with CLI feature parity. Target: React/Tailwind, read-only stakeholder demo. Useful for stakeholder demos and recruiting.',
  },
  {
    id: 'D5', epic: 'E9', type: 'Story',
    title: 'Deployment automation — repeatable install/config process',
    labels: ['phase-8', 'architecture'], component: 'Security & Automation',
    priority: 'Medium', status: 'Open',
    description: 'Repeatable, scripted PM OS installation and configuration: dependency install, .env setup wizard, MCP credential configuration, first-run validation. Target: zero manual steps beyond providing credentials.',
  },
  {
    id: 'D6', epic: 'E9', type: 'Story',
    title: 'Quality dashboard update — phase 8 success criteria gate (IP-001 process fix)',
    labels: ['phase-8', 'documentation', 'improvement-proposal'], component: 'Documentation',
    priority: 'High', status: 'Open',
    description: 'Enforce IP-001 policy at Phase 8 close: dashboard update AND Confluence publish are required for phase closure. Updates QUALITY_METRICS_DASHBOARD.md and publishes Phase 8 completion report.',
  },

  // ── Section E: Improvement Proposals ─────────────────────────────────────
  {
    id: 'E1', epic: 'E10', type: 'Story',
    title: 'IP-001: Enforce quality dashboard update at phase closeout',
    labels: ['maintenance', 'improvement-proposal', 'documentation'], component: 'Documentation',
    priority: 'High', status: 'Open',
    description: 'Root cause: dashboard update not required at phase close. Fix: add dashboard update as explicit Phase 8 success criterion + note in pm-os-quality-audit SKILL.md. Dashboard manually updated during 2026-02-15 audit.',
  },
  {
    id: 'E2', epic: 'E10', type: 'Story',
    title: 'IP-002: Extend quality audit publishing to non-phase runs',
    labels: ['maintenance', 'improvement-proposal', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Open',
    description: 'Step 6b in pm-os-quality-audit SKILL.md only publishes to Confluence for phase args. Fix: extend to all invocations with scope-appropriate title (full audit / targeted audit / phase report).',
  },
  {
    id: 'E3', epic: 'E10', type: 'Task',
    title: 'IP-003: Fix ROADMAP.md dependency chain duplicate (Phase 7→8 appears twice)',
    labels: ['maintenance', 'improvement-proposal', 'documentation'], component: 'Documentation',
    priority: 'Low', status: 'Open',
    description: 'Dependency chain diagram in pm-os-reference/identity/ROADMAP.md contains duplicate "Phase 7 → Phase 8" entries. Remove duplicates for clean linear chain.',
  },
  {
    id: 'E4', epic: 'E10', type: 'Task',
    title: 'IP-004: Clear ⏳ pending markers in ROADMAP-001 evolution tracking',
    labels: ['maintenance', 'improvement-proposal', 'documentation'], component: 'Documentation',
    priority: 'Low', status: 'Open',
    description: 'ROADMAP-001 "Documentation Updates" lists 5 files with ⏳ pending markers. README.md, QUICK_START.md, CLAUDE.md were updated in later phases but markers were never cleared.',
  },
  {
    id: 'E5', epic: 'E10', type: 'Story',
    title: 'IP-005: Action Jira/Confluence Update Reference items from agent retirement',
    labels: ['maintenance', 'improvement-proposal', 'mcp-integration'], component: 'MCP Integrations',
    priority: 'Low', status: 'Open',
    description: 'Confluence-Jira-Update-Reference.md has 3 Jira + 2 Confluence items from 2026-02-15 agent retirement. Action in Rovo-enabled session: agent retirement story, Confluence Architecture Overview update, Confluence Changelog entry.',
  },

  // ── Section F: Confluence pending ─────────────────────────────────────────
  {
    id: 'F1', epic: 'E10', type: 'Task',
    title: 'Update Confluence Architecture Overview — replace agents/ refs with skills-only table',
    labels: ['maintenance', 'documentation', 'mcp-integration'], component: 'Documentation',
    priority: 'Low', status: 'Open',
    description: 'Confluence Architecture Overview still references .claude/agents/ as active. Replace with 10-skill routing table. Content ready in 2026-02-15_Confluence-Jira-Update-Reference.md.',
  },
  {
    id: 'F2', epic: 'E10', type: 'Task',
    title: 'Create Confluence Changelog entry — 2026-02-15 agent retirement',
    labels: ['maintenance', 'documentation', 'mcp-integration'], component: 'Documentation',
    priority: 'Low', status: 'Open',
    description: 'Add 2026-02-15 agent retirement changelog entry to Confluence PM OS Changelog. Full entry text in 2026-02-15_Confluence-Jira-Update-Reference.md.',
  },

  // ── Section G: Mode B Skills — Confluence Auto-Publish ────────────────────
  {
    id: 'G1', epic: 'E10', type: 'Story',
    title: 'pm-os-quality-audit: Add Confluence auto-publish for phase closeout reports',
    labels: ['maintenance', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Done',
    description: 'Added Step 6b to pm-os-quality-audit SKILL.md: when invoked with a phase argument, automatically publishes audit report to Confluence parent page 1179649 (PM OS - Phase Reports).',
  },
  {
    id: 'G2', epic: 'E10', type: 'Story',
    title: 'pm-os-doc-sync: Add Confluence auto-publish for doc sync reports',
    labels: ['maintenance', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Done',
    description: 'Added Confluence publish step to pm-os-doc-sync SKILL.md. After a sync run, doc sync report is published to Confluence parent page 1212417 (PM OS - Operations).',
  },
  {
    id: 'G3', epic: 'E10', type: 'Story',
    title: 'release-check: Add Confluence auto-publish for release check reports',
    labels: ['maintenance', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Done',
    description: 'Added Confluence publish step to release-check SKILL.md. After a release check run, report is published to Confluence parent page 1212417 (PM OS - Operations).',
  },

  // ── Section H: Infrastructure (GitHub Actions + Scripts) ──────────────────
  {
    id: 'H1', epic: 'E10', type: 'Story',
    title: 'GitHub Actions: Monthly Audit Reminder (audit-reminder.yml)',
    labels: ['maintenance', 'architecture'], component: 'Security & Automation',
    priority: 'Medium', status: 'Done',
    description: 'GitHub Actions workflow triggering on the 1st of each month: creates a GitHub Issue AND Jira story in PMOS. Ensures monthly audit cadence without manual tracking. Committed in 7a8cd85.',
  },
  {
    id: 'H2', epic: 'E10', type: 'Story',
    title: 'GitHub Actions: Confluence Weekly Sync (confluence-sync.yml)',
    labels: ['maintenance', 'mcp-integration'], component: 'Security & Automation',
    priority: 'Medium', status: 'Done',
    description: 'GitHub Actions workflow triggering on push to main and weekly schedule. Syncs all 11 SKILL.md files and execution artifacts to Confluence using scripts/confluence-sync.js. Committed in 142b008.',
  },
  {
    id: 'H3', epic: 'E10', type: 'Story',
    title: 'Confluence Sync Script (scripts/confluence-sync.js)',
    labels: ['maintenance', 'mcp-integration'], component: 'Security & Automation',
    priority: 'Medium', status: 'Done',
    description: 'Node.js script using Atlassian REST API to sync local markdown files to Confluence. Reads page mappings from confluence-sync-manifest.json. Committed in df2a2ff.',
  },
  {
    id: 'H4', epic: 'E10', type: 'Task',
    title: 'Confluence Sync Manifest (scripts/confluence-sync-manifest.json)',
    labels: ['maintenance', 'mcp-integration'], component: 'Security & Automation',
    priority: 'Medium', status: 'Done',
    description: 'Page ID mapping for all 11 skills and execution directory sync targets. Maps local file paths to Confluence page IDs for automated sync. Committed in df2a2ff.',
  },

  // ── Section I: Google Doc Future Enhancements ──────────────────────────────
  {
    id: 'I1', epic: 'E10', type: 'Task',
    title: 'Mermaid lifecycle diagram for PM OS',
    labels: ['maintenance', 'documentation'], component: 'Documentation',
    priority: 'Low', status: 'Open',
    description: 'Create a Mermaid diagram showing PM OS lifecycle: Phase 0 → Phase 8+, with Mode A and Mode B branches. Add to README.md or a dedicated architecture diagram page.',
  },
  {
    id: 'I2', epic: 'E10', type: 'Story',
    title: 'Discovery skill: expand beyond OST to additional artifact types',
    labels: ['maintenance', 'skills'], component: 'Skills Layer',
    priority: 'Medium', status: 'Open',
    description: '/discovery currently centers on OSTs. Expand to additional artifacts: customer journey maps, Jobs-to-be-Done canvases, assumption maps, problem statements. Add as optional Step menu choices.',
  },
  {
    id: 'I3', epic: 'E10', type: 'Task',
    title: 'Fix discovery template vs PRD template location inconsistency',
    labels: ['maintenance', 'documentation', 'templates'], component: 'Templates',
    priority: 'Low', status: 'Open',
    description: 'Audit template paths in /discovery and /prd SKILL.md files. Resolve any naming or directory inconsistencies and update references.',
  },
  {
    id: 'I4', epic: 'E10', type: 'Story',
    title: 'Identity layer expansion — branding, Help Center context, update processes',
    labels: ['maintenance', 'identity-layer'], component: 'Identity Layer',
    priority: 'Low', status: 'Open',
    description: 'Expand identity layer beyond STRATEGY/STANDARDS/ROADMAP/DATA_DICTIONARY: add BRAND_CONTEXT.md template for brand voice, messaging guidelines, and Help Center context. Update identity/README.md with refresh processes.',
  },
  {
    id: 'I5', epic: 'E10', type: 'Story',
    title: 'Presentation generation — Marp templates and skill capability',
    labels: ['maintenance', 'templates', 'skills'], component: 'Templates',
    priority: 'Low', status: 'Open',
    description: 'Create markdown/Marp-compatible templates for: Product Brief, Executive Summary, Release Notes, Help Center/KB Guide, Project Kickoff. Evaluate Marp integration for slide generation from PRD outputs.',
  },
  {
    id: 'I6', epic: 'E10', type: 'Story',
    title: 'UX Strategist — OOUX methodology integration',
    labels: ['maintenance', 'skills'], component: 'Skills Layer',
    priority: 'Low', status: 'Open',
    description: 'Add Object-Oriented UX (OOUX) artifact type to /ux-strategist skill: Object Map generation with objects, attributes, calls-to-action, and relationships. Follows Sophia Prater OOUX framework.',
  },
  {
    id: 'I7', epic: 'E10', type: 'Story',
    title: 'Cagan Product Model — identity and template integration',
    labels: ['maintenance', 'identity-layer', 'templates'], component: 'Identity Layer',
    priority: 'Low', status: 'Open',
    description: 'Add Cagan Product Model alignment section to identity/STRATEGY.md template and a product principles template under templates/. Prompts outcome-over-output framing.',
  },
  {
    id: 'I8', epic: 'E10', type: 'Story',
    title: 'Competitive market research capability — competitor and industry analysis',
    labels: ['maintenance', 'skills'], component: 'Skills Layer',
    priority: 'Low', status: 'Open',
    description: 'Add competitor landscape and industry domain analysis to /gtm-strategist skill or as a standalone template. Covers structured competitor evaluation and industry subdomain analysis.',
  },
  {
    id: 'I9', epic: 'E9', type: 'Story',
    title: 'New integrations evaluation — Figma, Pendo, Heap, Fullstory, Datadog',
    labels: ['phase-8', 'mcp-integration'], component: 'MCP Integrations',
    priority: 'Low', status: 'Open',
    description: 'Phase 8: evaluate 5 MCP integration candidates. Priority matrix by PM workflow impact, MCP availability, and auth complexity. Top 1–2 integrations get an implementation plan.',
  },
  {
    id: 'I10', epic: 'E9', type: 'Story',
    title: 'End-user OAuth setup guide — guided credential bootstrap for new PMs',
    labels: ['phase-8', 'mcp-integration', 'documentation'], component: 'MCP Integrations',
    priority: 'Medium', status: 'Open',
    description: 'Phase 8 onboarding: step-by-step OAuth setup wizard handling credential bootstrap for all MCPs. Target: all MCPs configured in <30 min, zero manual token exchange steps.',
  },
  {
    id: 'I11', epic: 'E10', type: 'Task',
    title: 'Identity layer rename — "identity" vs "context" (ADR)',
    labels: ['maintenance', 'architecture', 'identity-layer'], component: 'Identity Layer',
    priority: 'Low', status: 'Open',
    description: 'Create ADR weighing identity/ → context/ rename: naming clarity vs. migration cost across CLAUDE.md, all SKILL.md files, and templates. Record decision with rationale.',
  },
  {
    id: 'I12', epic: 'E10', type: 'Task',
    title: 'SaaS version assessment — ChatPRD competitive analysis and go/no-go',
    labels: ['maintenance', 'documentation'], component: 'Documentation',
    priority: 'Low', status: 'Open',
    description: 'Before Phase 8 closes: assess feasibility of PM OS as a SaaS product. Document ChatPRD + 1–2 competitors, produce go/no-go framing for PM OS productization.',
  },
];

// ─── Priority mapping ─────────────────────────────────────────────────────────
const PRIORITY_MAP = { High: 'High', Medium: 'Medium', Low: 'Low' };

// ─── Main execution ───────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀 PM OS Jira Backlog Creation ${DRY_RUN ? '[DRY RUN]' : ''}`);
  console.log(`   Project: ${PROJECT_KEY} | Domain: ${JIRA_DOMAIN}`);
  console.log(`   Items to create: ${STORIES.length} stories + up to 4 epics\n`);

  // Step 1: Find existing epics
  let existingEpics = {};
  if (!DRY_RUN) {
    existingEpics = await findExistingEpics();
  }

  // Step 2: Create/map epics
  const epicMap = {}; // E1 → PMOS-xxx
  console.log('\n📁 Processing epics...');

  for (const epic of EPIC_DEFINITIONS) {
    // Check if already exists by title
    const existingKey = Object.entries(existingEpics).find(([title]) =>
      title.toLowerCase().includes(epic.title.toLowerCase().replace('pm os ', '').split(' ').slice(0, 2).join(' ').toLowerCase())
    );

    if (existingKey) {
      console.log(`  ✓ ${epic.key} exists: ${existingKey[1].key} — ${existingKey[0]}`);
      epicMap[epic.key] = existingKey[1].key;
    } else if (epic.create && !STORIES_ONLY) {
      const issueData = {
        fields: {
          project: { key: PROJECT_KEY },
          issuetype: { name: 'Epic' },
          summary: epic.title,
          labels: [`phase-${epic.key === 'E7' ? '6' : epic.key === 'E8' ? '7' : epic.key === 'E9' ? '8' : 'maintenance'}`],
          priority: { name: epic.key === 'E9' ? 'High' : 'Medium' },
          description: makeADF(`PM OS ${epic.title} epic. Created by backlog formalization script (2026-02-15).`),
        }
      };
      console.log(`  + Creating ${epic.key}: ${epic.title}`);
      try {
        const created = await createIssue(issueData);
        epicMap[epic.key] = created.key;
        console.log(`    → Created: ${created.key}`);
        if (epic.status === 'Done' && !DRY_RUN) {
          await transitionIssue(created.key, 'Done');
        }
      } catch (e) {
        console.error(`    ❌ Failed to create ${epic.key}: ${e.message}`);
        epicMap[epic.key] = null;
      }
    } else if (!epic.create) {
      console.log(`  ? ${epic.key}: not found in JQL results — may need manual linking`);
      epicMap[epic.key] = null;
    }
  }

  if (EPICS_ONLY) {
    console.log('\n✅ Epics-only mode complete.\n');
    console.log('Epic map:', epicMap);
    return;
  }

  // Step 3: Create stories
  console.log('\n📝 Creating stories...\n');
  const results = [];
  let created = 0, skipped = 0, failed = 0;

  for (const story of STORIES) {
    const epicKey = epicMap[story.epic];
    const issueData = {
      fields: {
        project: { key: PROJECT_KEY },
        issuetype: { name: story.type },
        summary: story.title,
        labels: story.labels,
        priority: { name: PRIORITY_MAP[story.priority] || 'Medium' },
        description: makeADF(story.description),
      }
    };

    // Link to epic if we have its key
    if (epicKey) {
      // customfield_10014 is the standard Epic Link field in Jira Cloud
      issueData.fields['customfield_10014'] = epicKey;
    }

    console.log(`  [${story.id}] ${story.title.substring(0, 70)}...`);
    try {
      const result = await createIssue(issueData);
      results.push({ id: story.id, key: result.key, title: story.title, status: story.status });
      created++;

      // Transition to Done if needed
      if (story.status === 'Done' && !DRY_RUN) {
        await transitionIssue(result.key, 'Done');
      }
    } catch (e) {
      console.error(`    ❌ Failed: ${e.message.substring(0, 150)}`);
      failed++;
      results.push({ id: story.id, key: 'FAILED', title: story.title, error: e.message });
    }
  }

  // Step 4: Summary
  console.log('\n' + '─'.repeat(60));
  console.log('📊 CREATION SUMMARY');
  console.log('─'.repeat(60));
  console.log(`Created: ${created} | Failed: ${failed} | Total: ${STORIES.length}`);
  console.log('\nEpic Map:');
  for (const [k, v] of Object.entries(epicMap)) {
    console.log(`  ${k}: ${v || '(not linked)'}`);
  }
  console.log('\nCreated Items:');
  for (const r of results) {
    const status = r.key === 'FAILED' ? '❌' : '✓';
    console.log(`  ${status} [${r.id}] ${r.key}: ${r.title.substring(0, 60)}`);
  }

  // Save results log
  if (!DRY_RUN) {
    const logPath = path.join(__dirname, '..', 'scripts', 'jira_creation_log.json');
    fs.writeFileSync(logPath, JSON.stringify({ run: new Date().toISOString(), epicMap, results }, null, 2));
    console.log(`\n📄 Results saved to scripts/jira_creation_log.json`);
  }
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
