# PM OS Automations

All automated systems that run without manual intervention. Three mechanisms:
**git hooks** (local, every push), **GitHub Actions** (remote, scheduled + event-triggered),
and **Claude Code skills** (AI-powered, invoked manually or prompted by the above).

---

## Quick Reference

| Automation | Trigger | What it does | Blocks push? |
|-----------|---------|--------------|-------------|
| [Pre-Push Gate](#1-pre-push-gate) | Every `git push` | Security + quality checks (7 checks) | Yes (on fail) |
| [Confluence Sync](#2-confluence-document-sync) | Push to main (key paths) + Monday weekly | Syncs skills + execution artifacts to Confluence | No |
| [Audit Reminder](#3-monthly-quality-audit-reminder) | 1st of month + manual | Creates GitHub Issue + Jira story to run `/pm-os-quality-audit` | No |

---

## 1. Pre-Push Gate

**File**: `scripts/pre-push` (installed to `.git/hooks/pre-push`)
**Trigger**: Every `git push`, runs locally before the push is sent to GitHub
**Purpose**: Catch security issues, hygiene problems, and documentation drift before they reach the remote

### Checks

| # | Check | Type | Triggers on |
|---|-------|------|-------------|
| 1 | `.env` not tracked | 🔴 **Block** | `.env` file committed to git |
| 2 | No secret patterns | 🔴 **Block** | API keys, tokens, passwords with real values in tracked files |
| 3 | No conflict markers | 🔴 **Block** | Unresolved `<<<<<<<` / `>>>>>>>` merge conflicts |
| 4 | No junk files | 🔴 **Block** | `*.tmp`, `*.log`, `test_*.js`, `nul` committed |
| 5 | Skills in README.md | 🟡 **Warn** | A skill directory exists with no mention in `README.md` |
| 6 | Skills in CLAUDE.md | 🟡 **Warn** | A skill directory not present in `.claude/CLAUDE.md` routing table |
| 7 | Structural change + no doc update | 🟡 **Warn** | `ROADMAP.md`, `CLAUDE.md`, `templates/`, `.mcp.json`, or any `SKILL.md` pushed without a README or doc file in the same push set |

Blocking checks (1–4) prevent the push. Warning checks (5–7) let the push proceed but
prompt corrective action — typically running `/pm-os-doc-sync` in Claude Code.

### Install / Reinstall

```bash
cp scripts/pre-push .git/hooks/pre-push && chmod +x .git/hooks/pre-push
```

Run once after cloning, and again after any change to `scripts/pre-push`.

### Manual Test

```bash
bash scripts/pre-push
```

### Secret Pattern Logic

The hook uses `SECRET=[^<\[]` — values must not start with `<` or `[`. This means
placeholder formats like `SECRET=<your-secret>` or `SECRET=[placeholder]` pass cleanly.
The `sk-` pattern requires 20+ characters to avoid matching words like "risk-based".
`scripts/pre-push` itself is self-excluded from the secret scan (it contains the
pattern strings as shell variables).

---

## 2. Confluence Document Sync

**File**: `.github/workflows/confluence-sync.yml`
**Script**: `scripts/confluence-sync.js`
**Manifest**: `scripts/confluence-sync-manifest.json`

### Triggers

| Trigger | When |
|---------|------|
| Push to `main` | When any file matching the path filters below is pushed |
| Schedule | Every Monday at 9am UTC (full sweep) |
| Manual | GitHub Actions → "Confluence Weekly Sync" → Run workflow |

### Path Filters (push trigger)

Changes to these paths trigger an immediate sync — other paths don't:

```
.claude/skills/**            ← skill content changes
execution/**/*.md            ← new artifacts in the execution workspace
pm-os-reference/documentation/**/*.md  ← PM OS meta-docs
**/README.md                 ← any README across the repo
QUICK_START.md
VALIDATION_CHECKLIST.md
IMPLEMENTATION_STATUS.md
```

### What Gets Synced

| Source | Confluence destination | Behavior |
|--------|----------------------|----------|
| All 11 `.claude/skills/*/SKILL.md` | Mapped page IDs in manifest | Update if hash changed, skip if unchanged |
| `execution/prds/*.md` | PM OS - PRDs & Discovery (`1048577`) | Auto-create or update |
| `execution/discovery/*.md` | PM OS - Discovery (`1146881`) | Auto-create or update |
| `execution/technical_specs/*.md` | PM OS - Technical Specs (`1081345`) | Auto-create or update |
| `execution/improvement_proposals/*.md` | PM OS - Operations (`1212417`) | Auto-create or update |
| `execution/gtm/*.md` | PM OS - PRDs & Discovery (`1048577`) | Auto-create or update |

Change detection is hash-based — unchanged files are skipped, so pushes with many
files are efficient.

### Required GitHub Secrets

| Secret | Value |
|--------|-------|
| `ATLASSIAN_EMAIL` | Your Atlassian account email |
| `ATLASSIAN_API_TOKEN` | Atlassian API token (from id.atlassian.com) |
| `CONFLUENCE_BASE_URL` | `https://yourcompany.atlassian.net` |

Set under **GitHub repo → Settings → Secrets and variables → Actions → Secrets**.

### Manifest

`scripts/confluence-sync-manifest.json` maps local file paths to Confluence page IDs and
stores content hashes. After each sync run, updated hashes are committed back automatically
with `[skip ci]` to prevent infinite loops.

---

## 3. Monthly Quality Audit Reminder

**File**: `.github/workflows/audit-reminder.yml`

### Triggers

| Trigger | When |
|---------|------|
| Schedule | 1st of every month at 9am UTC |
| Manual | GitHub Actions → "PM OS Monthly Quality Audit Reminder" → Run workflow |

### What it Creates

**GitHub Issue** in this repository:
- Title: `🔄 Monthly PM OS Quality Audit — YYYY-MM-DD`
- Body: how-to instructions + 5-item checklist
- Prompts running `/pm-os-quality-audit` in Claude Code

**Jira Story** in the PMOS project:
- Title: `Monthly PM OS Quality Audit — YYYY-MM-DD`
- Type: Task, Priority: Medium, Labels: `maintenance`, `audit`, `pm-os`
- Jira failure is non-fatal — GitHub Issue is still created

### Required GitHub Secrets / Variables

| Name | Type | Value |
|------|------|-------|
| `ATLASSIAN_EMAIL` | Secret | Shared with confluence-sync |
| `ATLASSIAN_API_TOKEN` | Secret | Shared with confluence-sync |
| `CONFLUENCE_BASE_URL` | Secret | Shared with confluence-sync (Jira uses same domain) |
| `JIRA_PROJECT_KEY` | Variable (optional) | Defaults to `PMOS` if not set |

### What to do when the reminder fires

1. Open Claude Code in this directory
2. Run `/pm-os-quality-audit`
3. Review improvement proposals saved to `execution/improvement_proposals/`
4. Close the GitHub Issue and Jira ticket when done

---

## 4. Claude Code Skills (Manual / Prompted)

These aren't automated — they require a Claude Code session — but they are triggered
by the automations above and form the corrective action layer.

| Skill | When to run | Prompted by |
|-------|-------------|-------------|
| `/pm-os-doc-sync` | After structural PM OS changes | Pre-push check 7 warning |
| `/pm-os-quality-audit` | Monthly + after phase close | Audit reminder (GitHub Issue + Jira) |
| `/release-check` | Before major releases or phase completions | Manual judgment |

---

## Setup Checklist (New Clone)

```bash
# 1. Install the pre-push hook
cp scripts/pre-push .git/hooks/pre-push && chmod +x .git/hooks/pre-push

# 2. Set GitHub Secrets (repo Settings → Secrets and variables → Actions)
#    ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN, CONFLUENCE_BASE_URL

# 3. Optional: set repo Variable JIRA_PROJECT_KEY if not using PMOS
```

GitHub Actions workflows run automatically on GitHub — no local setup required beyond secrets.

---

## Maintenance

| Task | Frequency | How |
|------|-----------|-----|
| Re-install pre-push hook | After any change to `scripts/pre-push` | `cp scripts/pre-push .git/hooks/pre-push && chmod +x .git/hooks/pre-push` |
| Rotate Atlassian API token | Quarterly | Update `ATLASSIAN_API_TOKEN` secret in GitHub repo settings |
| Update Confluence manifest page IDs | When Confluence pages are reorganized | Edit `scripts/confluence-sync-manifest.json` |
| Add new skills to manifest | When a new skill is added | No action needed — pre-push check 5 warns if README drift is detected |

---

**Last Updated**: 2026-02-15
**Owner**: PM OS Orchestrator + Human PM
