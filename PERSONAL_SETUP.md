# Personal Setup — Not Committed

This file documents configuration that is **personal to each user** of PM OS and should not be committed to the shared repo. Each person who clones or forks PM OS needs to set these up for their own environment.

---

## 1. Identity Layer (`identity/`)

The files in `identity/` are templates — they ship with placeholder content. **Replace them with your own organization's context before using PM OS for real work.**

| File | What to fill in |
|------|----------------|
| `identity/STRATEGY.md` | Your company vision, mission, and North Star Metrics |
| `identity/STANDARDS.md` | Your tech stack, component library, security requirements |
| `identity/ROADMAP.md` | Your product roadmap (not PM OS's implementation phases) |
| `identity/DATA_DICTIONARY.md` | Your data schema, metric formulas, instrumentation status |

> These files are committed to the repo so PM OS agents can read them — but their **content** is yours to customize. If you fork this repo for your own use, overwrite the placeholders before running any skills.

---

## 2. MCP Credentials (`.mcp.json` / `mcp/credentials/`)

MCP integrations require credentials that are personal and must never be committed.

| Integration | What you need |
|-------------|--------------|
| Atlassian Rovo (Jira + Confluence) | OAuth token — see `mcp/setup_guides/ROVO_MCP_SETUP.md` |
| Google Drive | OAuth credentials via Google Cloud Console |
| Context7 | API key (if required by your plan) |

Store all credentials in `.env` or as Claude Code environment variables — never in `.mcp.json` directly.

---

## 3. Environment Variables

For the PM OS Companion Web App (when built), you will need:

```
GITHUB_TOKEN=          # Personal access token — repo read scope; used by web app to read execution/ via GitHub API
GITHUB_OWNER=          # Your GitHub username (e.g., MJLeach87)
GITHUB_REPO=           # Repo name (e.g., AI-PM-OS)
```

Set these in Vercel's environment variables dashboard — never commit them.

---

## 4. `execution/` — Your Artifacts

The `execution/` directory contains PM OS outputs for your projects (PRDs, OSTs, sprint logs, etc.). These **are committed** to this repo so the companion web app can read them via the GitHub API.

**If you fork PM OS for your own use**: clear out the existing `execution/` content and start fresh with your own projects.

**Privacy note**: Don't put PII or sensitive business data in artifact files — they will be readable by anyone with repo access (or via the web app if deployed).

---

## 5. Authorized Users (Web App)

The companion web app uses Vercel's built-in password protection for access control. Set the password in the Vercel dashboard under **Settings → Password Protection**. Share it with team members who need access — no per-user account setup required.

---

*This file is committed as a reference guide. The actual credentials and personal config it describes are not.*
