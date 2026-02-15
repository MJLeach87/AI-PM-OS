# PM OS - Product Management Operating System

**Status**: Phase 7 Complete → Phase 8 (Enterprise Readiness) Planned
**Created**: 2026-01-31 | **Last Updated**: 2026-02-15

PM OS is a self-improving product management system that uses Claude Code, a full MCP
integration suite, and a skills-based multi-agent architecture to augment product managers
into AI-powered product leaders. It transforms PMs from document-authors into high-leverage
Strategic Architects by institutionalizing strategy, discovery, and execution as executable
code that improves itself over time.

---

## Current Capabilities

All 11 skills are active. Invoke any skill with `/skill-name [request]` in Claude Code.

### Workflow Skills (End-to-End Pipelines)

| Skill | Command | What It Produces |
|-------|---------|-----------------|
| **Discovery** | `/discovery [topic]` | Synthesizes customer research into Opportunity Solution Trees + discovery artifacts |
| **PRD** | `/prd [feature]` | BMAD PRD with Gherkin user stories, metrics, and Data Analyst validation at step 8 |
| **Feature Pipeline** | `/feature-pipeline [description]` | Full end-to-end pipeline — Engineering Partner, UX Strategist, Data Analyst, GTM Strategist run in parallel after the initial PRD draft |

### Specialist Skills (Domain Experts)

Invoke a specific domain expert directly for targeted work:

| Skill | Command | Capabilities |
|-------|---------|-------------|
| **Product Architect** | `/product-architect` | Discovery, OST generation, PRD drafting, agent spec creation, stakeholder artifacts |
| **Engineering Partner** | `/engineering-partner` | Technical feasibility, STRIDE + OWASP security assessments, API contracts (OpenAPI), BPMN modeling, legacy code analysis |
| **UX Strategist** | `/ux-strategist` | React/Tailwind prototypes, information architecture, user flows, WCAG 2.1 AA accessibility audits |
| **Data Analyst** | `/data-analyst` | SQL queries, PRD metrics validation (cross-referenced with `identity/DATA_DICTIONARY.md`), A/B test analysis, baseline data gathering |
| **GTM Strategist** | `/gtm-strategist` | Value propositions, competitive positioning, sales battle cards, pricing strategy input, market segmentation |

### PM OS Maintenance Skills (System Self-Improvement)

| Skill | Command | What It Does |
|-------|---------|-------------|
| **Quality Audit** | `/pm-os-quality-audit` | Audits PM OS agents, templates, and system health; generates improvement proposals |
| **Doc Sync** | `/pm-os-doc-sync` | Syncs PM OS meta-documentation after structural changes |
| **Release Check** | `/release-check` | Deep pre-push review — doc currency, commit quality, phase alignment, PII scan |

**Automated**: `scripts/pre-push` hook runs security and hygiene checks on every push (no
invocation needed — install once with `cp scripts/pre-push .git/hooks/pre-push && chmod +x .git/hooks/pre-push`).

---

## Quick Start

See [`QUICK_START.md`](QUICK_START.md) for step-by-step setup. Three commands to try first:

```
/discovery Generate an OST for improving user onboarding
/prd Add advanced search filters to the artifact browser
/feature-pipeline Design a real-time collaboration feature
```

**Before first use**: Customize `identity/` templates with YOUR organization's context.
See `identity/README.md` for step-by-step instructions.

---

## Identity Layer (YOUR Organizational Context)

`identity/` holds YOUR organizational intelligence. All skills load these files
automatically before generating outputs. **You must customize these before production use.**

| File | Contents | Status |
|------|----------|--------|
| `identity/STRATEGY.md` | YOUR vision, mission, North Star metrics | ⚡ Customize |
| `identity/STANDARDS.md` | YOUR brand voice, tech stack, security requirements | ⚡ Customize |
| `identity/ROADMAP.md` | YOUR product roadmap | ⚡ Customize |
| `identity/DATA_DICTIONARY.md` | YOUR data schema and metric formulas | ⚡ Customize |

**Critical**: Skills load `identity/` (YOUR context), not `pm-os-reference/identity/`
(PM OS's own reference examples).

See `identity/README.md` for customization instructions (~30-60 minutes to set up).

---

## MCP Integrations

| Integration | Status | Capability |
|-------------|--------|-----------|
| **Atlassian Rovo MCP** | ✅ Active | Jira (issue creation, epic linking, JQL search) + Confluence (page create/update, search, comments) |
| **Google Drive** | ✅ Active | Legacy document retrieval |
| **Slack / Snowflake** | 🟡 Phase 8 | Planned |

**Setup**: `mcp/setup_guides/ROVO_MCP_SETUP.md`
**Config**: `.mcp.json` (project-scoped, version-controlled)

**Known constraint**: Confluence space creation requires the Confluence UI — Rovo MCP
handles page CRUD, search, and comments only.

---

## Project Structure

```
PM OS/
├── .claude/
│   ├── CLAUDE.md                     # Ambient orchestration layer (routing + context)
│   └── skills/                       # 11 skills — sole canonical source for all capabilities
│       ├── discovery/SKILL.md        # /discovery
│       ├── prd/SKILL.md              # /prd
│       ├── feature-pipeline/SKILL.md # /feature-pipeline
│       ├── product-architect/SKILL.md
│       ├── engineering-partner/SKILL.md
│       ├── ux-strategist/SKILL.md
│       ├── data-analyst/SKILL.md
│       ├── gtm-strategist/SKILL.md
│       ├── pm-os-quality-audit/SKILL.md
│       ├── pm-os-doc-sync/SKILL.md
│       └── release-check/SKILL.md
│
├── identity/                         # YOUR org context (customize before use!)
│   ├── README.md                     # Customization guide
│   ├── STRATEGY.md                   # Vision, mission, North Star metrics
│   ├── STANDARDS.md                  # Brand voice, tech stack, security
│   ├── ROADMAP.md                    # Product roadmap
│   └── DATA_DICTIONARY.md            # Data schema + metric formulas
│
├── pm-os-reference/                  # PM OS's own inception materials (meta-recursive)
│   ├── identity/                     # PM OS's org context (reference examples, read-only)
│   ├── artifacts/                    # PM OS outputs during Phase 0-1
│   └── documentation/                # Phase history, velocity data, quality metrics
│
├── execution/                        # YOUR artifact workspace
│   ├── discovery/                    # OSTs, user research, IA maps
│   ├── prds/                         # Product requirements documents
│   ├── technical_specs/              # BPMN, API contracts, Gherkin scenarios
│   ├── prototypes/                   # React/Tailwind components
│   ├── gtm/                          # Battle cards, positioning, value props
│   └── improvement_proposals/        # PM OS self-improvement proposals
│
├── templates/                        # Standardized artifact formats
│   ├── prd_template.md
│   ├── agent_spec_template.md
│   ├── mcp_integration_plan.md
│   ├── metrics_validation_template.md
│   ├── ab_test_analysis_template.md
│   └── domain_specialist_template.md
│
├── scripts/pre-push                  # Automated pre-push security hook
├── .mcp.json                         # MCP server config
├── QUICK_START.md                    # Fast-start guide
├── AUTOMATIONS.md                    # All automated systems (hooks, workflows, cadences)
└── VALIDATION_CHECKLIST.md          # Phase validation tests
```

Artifact naming convention: `YYYY-MM-DD_[artifact-type]_[brief-title].md`

---

## Security Standards

1. **No hardcoded secrets** — all credentials in `.env` (gitignored)
2. **OAuth 2.0 required** for all MCP integrations
3. **Read-only by default** — write permissions require explicit justification
4. **PII redacted** in all logs and outputs
5. **Pre-push hook** scans for accidentally committed secrets on every push

Full standards: `identity/STANDARDS.md`

---

## Extending PM OS

**Add a new specialist skill**:
1. `/product-architect Create a skill for [domain]`
2. Review the generated `.claude/skills/[name]/SKILL.md`
3. Add a routing row to the skills table in `.claude/CLAUDE.md`
4. Submit PR for review

**Self-improvement**: `/pm-os-quality-audit` audits PM OS and proposes improvements.
**Doc consistency**: `/pm-os-doc-sync` keeps meta-docs in sync after structural changes.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Skill not responding | Check `.claude/skills/[name]/SKILL.md` exists; use explicit invocation `/skill-name [request]` |
| Output lacks strategic context | Verify `identity/STRATEGY.md` is customized; re-run after updating |
| Output cites PM OS defaults instead of your org | You haven't customized `identity/` yet — see `identity/README.md` |
| MCP integration failing | Verify `.mcp.json` is configured; check `mcp/setup_guides/` |
| File not saved | Check `execution/[artifact-type]/` subdirectory; confirm write permissions |

---

## Implementation History

PM OS built Phases 0-7 in **~6 days total** (2026-01-31 to 2026-02-14), versus an original
11-week estimate — approximately 11× faster than projected.

For detailed phase tracking:
- `pm-os-reference/documentation/IMPLEMENTATION_STATUS.md` — Phase-by-phase history
- `pm-os-reference/identity/ROADMAP.md` — Full roadmap including Phase 8 details
- `pm-os-reference/documentation/VELOCITY_TRACKING.md` — Development velocity data
- `pm-os-reference/documentation/phase-history/` — Individual phase completion records

---

**PM OS Status**: Phase 7 Complete → Phase 8 (Enterprise Readiness) Planned
**Last Updated**: 2026-02-15
**Maintained By**: PM OS Orchestrator + Human PM
