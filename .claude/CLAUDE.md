# Full Stack PM — Claude Code Project Context

**Project Name**: Full Stack PM (formerly PM OS)
**Created**: 2026-01-31 | **Updated**: 2026-02-28
**Status**: Phase 8 In Progress (Enterprise Readiness + Engineering Standards)

Full Stack PM is an end-to-end product lifecycle operating system — from initial discovery
through production delivery and monitoring. Using Claude Code, MCP integrations, and a
skills-based architecture, it covers the complete arc:

**Discovery → Specs → Engineering Standards → `/launch` → Development → Testing → Deployment → Monitoring**

`identity/STANDARDS.md` contains both product and engineering standards. All skills read it.
See `identity/STRATEGY.md` for vision, mission, and North Star metrics.

---

## Current Status

**Phase 8 In Progress** (2026-02-28) — Full Stack PM repositioning, engineering standards
integration, `/launch` skill, platform profiles, config templates, skill updates.
**Phase history**: `pm-os-reference/documentation/phase-history/`

---

## Two Modes of Operation

**Mode A — Your product work** (what PM OS is built for):
- Context: `identity/STRATEGY.md`, `identity/ROADMAP.md`, `identity/STANDARDS.md` (YOUR org)
- Outputs: `execution/[JIRA-KEY]_[slug]/` (project-centric; all artifact types flat in one folder per initiative)
- Skills: `/discovery`, `/prd`, `/feature-pipeline`, `/launch`, `/product-architect`, `/engineering-partner`, `/ux-strategist`, `/data-analyst`, `/gtm-strategist`

**Mode B — PM OS self-improvement** (improving the system itself):
- Context: `pm-os-reference/identity/ROADMAP.md` (PM OS's implementation timeline)
- Outputs: `pm-os-reference/documentation/improvement_proposals/`
- Skills: `/pm-os-quality-audit`, `/pm-os-doc-sync`, `/release-check`
- **Audit cadence**: Monthly (GitHub Issue + Jira ticket auto-created by `.github/workflows/audit-reminder.yml`) + after each phase closes

**Critical**: Always load `identity/` (YOUR org context), never `pm-os-reference/identity/`
(PM OS's own reference examples), for Mode A work.

---

## Key Architecture Components

### Identity Layer

`identity/` holds YOUR organizational intelligence. Customize these templates:

| File | Contents |
|------|----------|
| `identity/STRATEGY.md` | YOUR vision, mission, North Star metrics |
| `identity/STANDARDS.md` | YOUR brand voice, tech stack, security requirements |
| `identity/ROADMAP.md` | YOUR product roadmap |
| `identity/DATA_DICTIONARY.md` | YOUR data schema and metric formulas |

See `identity/README.md` for customization instructions.

### Skills Layer (Strategy & Planning)

`.claude/skills/` defines PM OS's custom specialist capabilities for strategy, discovery,
and planning. For implementation capabilities, see **Plugins** below.
`.claude/agents/` is empty — CLAUDE.md routes, skills execute.

| Trigger | Skill | Capability |
|---------|-------|------------|
| Discovery / OST / research | `/discovery` | OST + discovery artifacts |
| PRD / requirements | `/prd` | BMAD PRD with metrics validation |
| Full feature pipeline | `/feature-pipeline` | End-to-end parallel workflow |
| Discovery / PRD / agent specs | `/product-architect` | Core PM outputs |
| Technical / security / API / BPMN | `/engineering-partner` | Feasibility + security + AI services |
| Prototypes / IA / accessibility | `/ux-strategist` | shadcn/ui React/Tailwind + flows |
| SQL / metrics / A/B analysis | `/data-analyst` | Data queries + validation |
| Positioning / GTM / battle cards | `/gtm-strategist` | Competitive + GTM |
| Launch product for development | `/launch` | Validate specs + generate dev-ready repo scaffolding |
| PM OS quality audit | `/pm-os-quality-audit` | System health (Mode B) |
| PM OS doc sync | `/pm-os-doc-sync` | Meta-docs consistency (Mode B) |
| Pre-push deep review | `/release-check` | Doc currency + PII scan (Mode B) |

Automated on every push: `scripts/pre-push` (security + hygiene).

### Execution Layer (Mode A)

Artifacts use naming convention `YYYY-MM-DD_[artifact-type]_[brief-title].[ext]`, organized by project:

| Directory | Contents |
|-----------|----------|
| `execution/[JIRA-KEY]_[slug]/` | All artifact types for one initiative (PRD, OST, specs, prototype, GTM — flat) |
| `execution/shared/` | Cross-project GTM artifacts (battle cards, broad market research) |

**Project slug format**: `[JIRA-KEY]_[brief-kebab-title]` — e.g., `PMOS-110_one-click-checkout`
Skills derive the slug from the Jira key in the request, or ask the PM before writing any output.

Mode B outputs (improvement proposals, ADRs): `pm-os-reference/documentation/improvement_proposals/`

PM OS inception examples (Phase 0–1): `pm-os-reference/artifacts/`

### MCP Integration Suite

| Integration | Status | Capability |
|-------------|--------|------------|
| Atlassian Rovo MCP | ✅ Active | Jira (issues, JQL) + Confluence (pages, search) |
| Google Drive | ✅ Active | Legacy document retrieval |
| Context7 | ✅ Active | Library/API docs for Engineering Partner validation |
| Slack / Snowflake | 🟡 Planned | Phase 8 (PMOS-107, PMOS-108) |

Config: `.mcp.json` | Setup guide: `mcp/setup_guides/ROVO_MCP_SETUP.md`

**Known constraint**: Confluence space creation requires Confluence UI — Rovo MCP supports
page CRUD, search, and comments only.

### Plugins (Implementation Layer)

PM OS is end-to-end: strategy → planning → implementation → review → ship. Plugins from
the Anthropic marketplace extend PM OS with structured implementation, code review, and
security enforcement capabilities. They work alongside skills and MCPs as part of one system.

**Three capability layers, one workflow**:

| Layer | Source | Lifecycle Phase |
|-------|--------|----------------|
| **Skills** (`.claude/skills/`) | PM OS custom | Strategy, discovery, planning, specs |
| **Plugins** (global marketplace) | Anthropic official | Implementation, code review, security |
| **MCPs** (`.mcp.json`) | External services | Jira, Confluence, docs, data |

**Active plugins**:

| Plugin | Role in PM OS Workflow |
|--------|----------------------|
| `/feature-dev` | 7-phase structured implementation — picks up where `/feature-pipeline` leaves off |
| `/frontend-design` | Production-grade UI — enforces quality standards from `/ux-strategist` prototypes |
| `/code-review` | 5 parallel review agents — post-implementation counterpart to `/engineering-partner` |
| `/security-guidance` | Real-time security hooks on every file edit — enforces OWASP/STRIDE from planning |
| `/commit-commands` | Git commit/push/PR workflow automation |
| `/pr-review-toolkit` | 6 specialized PR review agents — deep pre-merge quality gate |
| `/typescript-lsp` | Type checking, go-to-definition, find-references for TypeScript codebases |

**End-to-end flow** (skills + plugins + MCPs together):
```
/discovery → /feature-pipeline → /launch → /feature-dev → /code-review → /pr-review-toolkit → ship
     ↑              ↑               ↑            ↑              ↑                ↑
  identity/    Jira + Confluence  STANDARDS.md  security-guidance  typescript-lsp   Vercel
  STRATEGY.md  (Rovo MCP)        + configs     (hooks on edits)   (type checking)  (deploy)
```

**Product repos** hold source code separately (their own Git repo, CI/CD, deployment) but
PM OS orchestrates the full lifecycle. Product repos get a `.claude/CLAUDE.md` from
`templates/web_project_claudemd_template.md` that references back to PM OS execution artifacts.

**Standards**: `identity/STANDARDS.md` — engineering standards (platform profiles, tech stack, AI services, component library, security, testing, observability).
**Config templates**: `templates/configs/web/` — ready-to-copy: biome, tsconfig, vitest, playwright, next.config, CI workflow.
**Test patterns**: `templates/testing/` — server action, component, E2E, setup file examples.
**ADR**: `pm-os-reference/documentation/improvement_proposals/2026-02-28_ADR_Full-Stack-PM-Engineering-Standards.md`

---

## Security & Quality Gates

**Non-negotiables**:
1. No hardcoded secrets — all credentials in `.env` (gitignored)
2. OAuth 2.0 required for all MCP integrations
3. Read-only by default — write permissions require explicit justification
4. PII redacted in all logs and outputs
5. Pre-push hook scans for accidentally committed secrets

**Before approving any agent output**:
- Aligns with `identity/STRATEGY.md` vision
- Follows brand voice and tech stack from `identity/STANDARDS.md`
- Includes specific metrics and acceptance criteria
- Evidence-based decisions, no security vulnerabilities

---

## Key Principles

**Self-Awareness**: Keep Mode A (your product → `identity/ROADMAP.md`) and Mode B (PM OS → `pm-os-reference/identity/ROADMAP.md`) clearly separated. New skills → `.claude/skills/[name]/SKILL.md` + update routing table. Propose changes via `pm-os-reference/documentation/improvement_proposals/`.

**Quality over speed**: Validate against `identity/STANDARDS.md`. Flag uncertainties.
Never skip security checks.

---

## Getting Help

| Resource | Path |
|----------|------|
| Customization guide | `identity/README.md` |
| Templates (PRD, agent spec, MCP) | `templates/` |
| Phase history | `pm-os-reference/documentation/phase-history/` |
| Velocity + quality metrics | `pm-os-reference/documentation/VELOCITY_TRACKING.md` |
| MCP setup | `mcp/setup_guides/ROVO_MCP_SETUP.md` |
| Execution workspace guide | `execution/README.md` |

---

**Last Updated**: 2026-02-28 | **Maintained By**: Full Stack PM Orchestrator + Human PM
