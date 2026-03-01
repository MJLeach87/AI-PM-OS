# PM OS Plugin Prototype

**Status**: Phase 8 prototype — GitHub template packaging
**ADR**: `execution/improvement_proposals/2026-02-17_ADR_Plugin-Packaging.md`

---

## What This Is

This directory sketches the structure of PM OS as a distributable GitHub template. When Phase 8 enables GitHub template mode, users will click "Use this template" to get a clean PM OS workspace pre-configured with all skills, hooks, and identity layer templates.

---

## Template Structure (What Users Get)

```
pm-os/                          ← User's new workspace
├── .claude/
│   ├── CLAUDE.md               ← Ambient orchestrator (pre-configured)
│   ├── settings.json           ← Hooks pre-loaded from hooks_template.json
│   └── skills/                 ← All 11 skills (ready to use)
│       ├── discovery/
│       ├── prd/
│       ├── feature-pipeline/
│       ├── product-architect/
│       ├── engineering-partner/
│       ├── ux-strategist/
│       ├── data-analyst/
│       ├── gtm-strategist/
│       ├── pm-os-quality-audit/
│       ├── pm-os-doc-sync/
│       └── release-check/
├── identity/                   ← BLANK TEMPLATES (user customizes these)
│   ├── README.md               ← Customization guide
│   ├── STRATEGY.md             ← 🔧 CUSTOMIZE THIS
│   ├── ROADMAP.md              ← 🔧 CUSTOMIZE THIS
│   ├── STANDARDS.md            ← 🔧 CUSTOMIZE THIS
│   └── DATA_DICTIONARY.md     ← 🔧 CUSTOMIZE THIS
├── execution/                  ← User's workspace (empty, gitignored outputs)
│   ├── README.md
│   ├── discovery/
│   ├── prds/
│   ├── technical_specs/
│   ├── prototypes/
│   ├── gtm/
│   └── improvement_proposals/
├── templates/                  ← PM OS artifact templates
├── mcp/
│   └── setup_guides/           ← Rovo MCP, Google Drive, Permissions guides
├── pm-os-reference/            ← PM OS inception materials (read-only reference)
├── scripts/
│   └── pre-push               ← Security + hygiene hook (pre-configured)
├── .mcp.json                   ← MCP servers (Atlassian pre-configured)
├── .env.example               ← Credential template
├── TEMPLATE_SETUP.md          ← Post-clone onboarding checklist (Phase 8)
├── QUICK_START.md
└── README.md
```

---

## What's Different from a Regular Clone

| Feature | Regular Clone | Template Install |
|---------|--------------|-----------------|
| Fork history | Included | Not included (clean start) |
| pm-os-reference/ | Included | Included (reference only) |
| identity/ files | PM OS defaults | Blank templates |
| execution/ outputs | PM OS's own | Empty |
| hooks | Manual setup | Pre-loaded via settings.json |
| Git history | PM OS history | Fresh history |

---

## Post-Clone Setup (TEMPLATE_SETUP.md preview)

After using the template:

1. `git clone [your-new-repo-url]`
2. Copy `.env.example` → `.env` and add your MCP credentials
3. Customize `identity/STRATEGY.md` with your company's vision
4. Customize `identity/STANDARDS.md` with your tech stack
5. Customize `identity/ROADMAP.md` with your product roadmap
6. Customize `identity/DATA_DICTIONARY.md` with your metrics
7. Run `/prd [any feature]` to test PM OS is working
8. Run `/pm-os-quality-audit` to verify system health

**Time to first output**: ~45 minutes (identity layer customization)

---

## Hooks Pre-Loaded

The template includes `templates/hooks_template.json` with recommended Claude Code hooks. Copy the hooks array into `.claude/settings.json` to activate:

```json
{
  "hooks": [
    // See templates/hooks_template.json
  ]
}
```

See `templates/hooks_template.json` for the full hooks configuration.

---

**Maintained By**: PM OS Orchestrator
**Phase**: 8 (Enterprise Readiness)
**Related ADR**: ADR-004 — Plugin Packaging Strategy
