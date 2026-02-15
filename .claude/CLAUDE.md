# PM OS - Claude Code Project Context

**Project Name**: Product Management Operating System (PM OS)
**Created**: 2026-01-31 | **Updated**: 2026-02-15
**Status**: Phase 7 Complete → Phase 8 (Enterprise Readiness) Planned

PM OS is a self-improving product management system using Claude Code, MCP integrations, and
a skills-based multi-agent architecture. It transforms PMs from document-authors into
high-leverage Strategic Architects by institutionalizing strategy, discovery, and execution
as executable code that improves itself over time.

See `identity/STRATEGY.md` for vision, mission, and North Star metrics.

---

## Current Status

**Phase 7 Complete** (2026-02-14) — A/B test template, domain specialist framework,
PARALLEL_WORKFLOWS guide, Data Analyst v2.2.
**Next**: Phase 8 — Enterprise Readiness (multi-user Git, security hardening, web prototype).
**Phase history**: `pm-os-reference/documentation/phase-history/`

---

## Two Modes of Operation

**Mode A — Your product work** (what PM OS is built for):
- Context: `identity/STRATEGY.md`, `identity/ROADMAP.md`, `identity/STANDARDS.md` (YOUR org)
- Outputs: `execution/` subdirectories (`discovery/`, `prds/`, `technical_specs/`, etc.)
- Skills: `/discovery`, `/prd`, `/feature-pipeline`, `/product-architect`, `/engineering-partner`, `/ux-strategist`, `/data-analyst`, `/gtm-strategist`

**Mode B — PM OS self-improvement** (improving the system itself):
- Context: `pm-os-reference/identity/ROADMAP.md` (PM OS's implementation timeline)
- Outputs: `execution/improvement_proposals/`
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

### Skills Layer (Routing)

`.claude/skills/` is the **sole canonical source** for all specialist capabilities.
`.claude/agents/` is empty — CLAUDE.md routes, skills execute.

| Trigger | Skill | Capability |
|---------|-------|------------|
| Discovery / OST / research | `/discovery` | OST + discovery artifacts |
| PRD / requirements | `/prd` | BMAD PRD with metrics validation |
| Full feature pipeline | `/feature-pipeline` | End-to-end parallel workflow |
| Discovery / PRD / agent specs | `/product-architect` | Core PM outputs |
| Technical / security / API / BPMN | `/engineering-partner` | Feasibility + security |
| Prototypes / IA / accessibility | `/ux-strategist` | React/Tailwind + flows |
| SQL / metrics / A/B analysis | `/data-analyst` | Data queries + validation |
| Positioning / GTM / battle cards | `/gtm-strategist` | Competitive + GTM |
| PM OS quality audit | `/pm-os-quality-audit` | System health (Mode B) |
| PM OS doc sync | `/pm-os-doc-sync` | Meta-docs consistency (Mode B) |
| Pre-push deep review | `/release-check` | Doc currency + PII scan (Mode B) |

Automated on every push: `scripts/pre-push` (security + hygiene).

### Execution Layer

Artifacts use naming convention `YYYY-MM-DD_[artifact-type]_[brief-title].md`:

| Directory | Contents |
|-----------|----------|
| `execution/discovery/` | OSTs, user research, IA maps |
| `execution/prds/` | Product requirements documents |
| `execution/technical_specs/` | BPMN, API contracts, Gherkin |
| `execution/prototypes/` | React/Tailwind components |
| `execution/gtm/` | Value props, battle cards, positioning |
| `execution/improvement_proposals/` | PM OS self-improvement proposals |

PM OS inception examples (Phase 0–1): `pm-os-reference/artifacts/`

### MCP Integration Suite

| Integration | Status | Capability |
|-------------|--------|------------|
| Atlassian Rovo MCP | ✅ Active | Jira (issues, JQL) + Confluence (pages, search) |
| Google Drive | ✅ Active | Legacy document retrieval |
| Slack / Snowflake | 🟡 Planned | Phase 8 |

Config: `.mcp.json` | Setup guide: `mcp/setup_guides/ROVO_MCP_SETUP.md`

**Known constraint**: Confluence space creation requires Confluence UI — Rovo MCP supports
page CRUD, search, and comments only.

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

**Self-Awareness (meta-recursive)**:
- PM OS is building itself. Keep Mode A and Mode B clearly separated.
- Mode A improvements (user's product): reference `identity/ROADMAP.md`
- Mode B improvements (PM OS itself): reference `pm-os-reference/identity/ROADMAP.md`
- New skills → `.claude/skills/[name]/SKILL.md` + update routing table above
- Propose PM OS changes via `execution/improvement_proposals/` for human review

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

**Last Updated**: 2026-02-15 | **Maintained By**: PM OS Orchestrator + Human PM
