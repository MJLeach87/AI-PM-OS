# PM OS Template Setup — Post-Clone Checklist

**Time to first output**: ~45 minutes
**Prerequisites**: Claude Code installed, Atlassian Rovo MCP access

---

## Step 1: Clone Your New Workspace (2 min)

You should have already clicked "Use this template" on GitHub and created your repo. Now:

```bash
git clone https://github.com/[your-org]/[your-pm-os-repo].git
cd [your-pm-os-repo]
```

---

## Step 2: Configure MCP Credentials (5 min)

```bash
cp .env.example .env
```

Edit `.env` and add your credentials. Then verify MCP is working:

```
# In Claude Code, ask:
"Search Jira for any open issues in my project"
```

If it returns results, Atlassian Rovo MCP is live. If not, see `mcp/setup_guides/ROVO_MCP_SETUP.md`.

---

## Step 3: Activate Hooks (2 min)

Copy the hooks from `templates/hooks_template.json` into `.claude/settings.json`:

```json
{
  "hooks": [
    // paste hooks array here from templates/hooks_template.json
  ]
}
```

---

## Step 4: Customize Identity Layer (30 min)

This is the most important step. PM OS agents use these files for every output.

### 4a. STRATEGY.md (~10 min)
Open `identity/STRATEGY.md`. Replace all `[placeholders]`:
- [ ] Company vision statement
- [ ] Product team mission
- [ ] 3-4 North Star Metrics
- [ ] Strategic principles

### 4b. STANDARDS.md (~10 min)
Open `identity/STANDARDS.md`. Replace:
- [ ] Tech stack (frontend, backend, database)
- [ ] Brand voice guidelines
- [ ] Security requirements

### 4c. ROADMAP.md (~10 min)
Open `identity/ROADMAP.md`. Replace:
- [ ] Your product's current roadmap themes
- [ ] Active initiatives
- [ ] Dependencies and risks

### 4d. DATA_DICTIONARY.md (~5 min minimum)
Open `identity/DATA_DICTIONARY.md`. Complete at least Sections 1–3:
- [ ] Key data tables relevant to your product
- [ ] North Star Metric formulas
- [ ] Instrumentation status

---

## Step 5: Commit Your Identity Layer (2 min)

```bash
git add identity/
git commit -m "Customize Identity Layer with [Your Company] organizational context"
git push
```

---

## Step 6: Validate PM OS Is Working (5 min)

```
# Test 1: Product Architect knows your strategy
"Product Architect: Generate a one-paragraph PRD summary for [simple feature]"
→ Output should cite YOUR company's vision from identity/STRATEGY.md

# Test 2: Skills are discoverable
"/pm-os-quality-audit skills"
→ Should list all 11 skills as present and correctly formatted

# Test 3: MCP is working
"/pm-os-quality-audit"
→ Should publish an audit report to Confluence
```

---

## Troubleshooting

**"Agents reference PM OS's own vision instead of mine"**
→ You haven't customized `identity/STRATEGY.md`. Replace all `[placeholders]` and re-run.

**"MCP connection failed"**
→ Check `.env` credentials and see `mcp/setup_guides/ROVO_MCP_SETUP.md`.

**"Skill not found"**
→ Verify `.claude/skills/[skill-name]/SKILL.md` exists. Run `/release-check` for a full inventory check.

---

**Setup complete!** You're ready to use PM OS for your product work.
Start with: `/discovery [your first feature topic]`
