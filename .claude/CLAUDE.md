# PM OS - Claude Code Project Context

**Project Name**: Product Management Operating System (PM OS)
**Version**: Phase 1 (Core Agent Team + Google Drive MCP)
**Created**: 2026-01-31
**Updated**: 2026-02-01
**Status**: Active Development

---

## Project Overview

PM OS is a self-improving product management system that uses hybrid Cursor + Claude Code environments, full MCP integration suite, and multi-agent architecture to augment product managers into AI-powered product leaders.

### Vision
To transform Product Managers from document-authors into high-leverage Strategic Architects. The PM OS uses AI to bridge the gap between customer empathy, technical feasibility, and business impact—amplifying strategic judgment over administrative output.

### Mission
Institutionalize product strategy, discovery, and execution as executable code that improves itself over time.

### North Star Metrics (Flexible Framework)

Organizations choose 3-4 metrics that fit their context. Options include:

**Time Efficiency**: 50% PRD time reduction (8h → 4h) OR 80% Time-to-Spec reduction (< 4h)
**Quality & Rework**: 40% rework reduction (40% → 10%) OR > 95% Sprint Readiness (zero clarifications)
**Discovery & Validation**: 4x discovery artifacts (2 → 8/week) OR 2x Hypothesis-to-Halt velocity
**Strategic Alignment**: 100% Identity Traceability (all artifacts cite vision/mission/roadmap)

See `identity/STRATEGY.md` for detailed metric definitions and recommended sets for different team maturity levels.

---

## Current Phase: Phase 4 (MCP Integration Suite)

**Status**: Planning (Phase 3 completed 2026-02-02)
**Objective**: Integrate all external tools via Model Context Protocol (Jira, Confluence, Slack, Snowflake)

### Phase 1 Deliverables
- [x] Engineering Partner agent (Cursor + Claude versions) - v1.1 with legacy code analysis
- [x] UX Strategist agent (Cursor + Claude versions) - v1.0
- [x] Technical spec templates (feasibility, implementation analysis, API contract)
- [x] Google Drive MCP integration plan
- [ ] Google Drive MCP OAuth setup and connectivity testing
- [ ] End-to-end workflow test (Discovery → Feasibility → Prototype)

### Phase 0 Completed ✅
- [x] Directory structure
- [x] Identity Layer (STRATEGY.md, STANDARDS.md, ROADMAP.md)
- [x] Templates (agent spec, PRD, MCP integration)
- [x] Git configuration (.gitignore, .env.example)
- [x] Orchestrator agent (Cursor + Claude Code versions)
- [x] Product Architect agent (Cursor + Claude versions)
- [x] All 5 validation tests passed

---

## Key Architecture Components

### Identity Layer (Organizational Context)
The Identity Layer stores YOUR organizational intelligence that agents use for decision-making:

**YOUR Organizational Context** (in `identity/` - customize these templates!):
- **`identity/STRATEGY.md`**: YOUR company vision, mission, North Star metrics (template - replace with YOUR actual strategy!)
- **`identity/STANDARDS.md`**: YOUR brand voice, tech stack, security requirements (template - replace with YOUR actual standards!)
- **`identity/ROADMAP.md`**: YOUR product roadmap (template - replace with YOUR actual roadmap!)
- **`identity/README.md`**: Customization guide with step-by-step instructions

**PM OS's Own Context** (in `pm-os-reference/identity/` - reference examples, read-only):
- **`pm-os-reference/identity/STRATEGY.md`**: PM OS's vision, mission, NSM (reference example)
- **`pm-os-reference/identity/STANDARDS.md`**: PM OS's brand voice, tech stack (reference example)
- **`pm-os-reference/identity/ROADMAP.md`**: PM OS's Phase 0-7 implementation timeline (reference example)
- **`pm-os-reference/identity/README.md`**: Explains PM OS's meta-recursive organizational context

**CRITICAL**: Agents load files from `identity/` (YOUR context), NOT from `pm-os-reference/identity/` (PM OS's reference examples). Users must customize `identity/` templates with THEIR actual organizational information.

**Usage**: All agents automatically load relevant identity context from `identity/` before generating outputs.

### Agent Architecture

**Orchestrator Agent**:
- **Role**: Master router for all tasks
- **File**: `.cursor/rules/_orchestrator.mdc` (Cursor), this file serves orchestration for Claude Code
- **Capabilities**: Task routing, context injection, security enforcement, workflow management

**Specialist Agents** (Progressive implementation):
- **Product Architect** (Phase 0-1): Discovery, OSTs, PRD generation, agent spec creation
- **Engineering Partner** (Phase 1): Technical feasibility, BPMN modeling, API specs
- **UX Strategist** (Phase 1): Information architecture, React/Tailwind prototypes
- **Data Analyst** (Phase 2): SQL queries, metrics validation, A/B test analysis
- **GTM Strategist** (Phase 2): Value propositions, positioning, sales enablement
- **System Evaluator** (Phase 3): Meta-agent for quality audits and self-improvement proposals

### Templates

All artifacts follow standardized templates stored in `templates/`:

- **`agent_spec_template.md`**: Format for defining new agents
- **`prd_template.md`**: BMAD-compliant PRD structure (Business, Metrics, Approach, Details)
- **`mcp_integration_plan.md`**: Standard setup guide for MCP services

### Execution Layer (Version-Controlled Outputs)

**User Workspace**: Artifacts are stored in `execution/` with version control:

- `execution/discovery/`: Opportunity Solution Trees, user research, IA maps
- `execution/prds/`: Product requirements documents
- `execution/technical_specs/`: BPMN models, API contracts, Gherkin scenarios
- `execution/prototypes/`: React/Tailwind components
- `execution/gtm/`: Value propositions, battle cards, positioning docs
- `execution/automation/`: (Phase 5) Deployment scripts, reporting cron jobs

**Naming Convention**: `YYYY-MM-DD_[artifact-type]_[brief-title].md`

**Examples**: PM OS inception materials (showing the system building itself) are in `pm-os-reference/`:
- `pm-os-reference/artifacts/`: PM OS discovery, PRDs, specs, prototypes from Phase 0-1
- `pm-os-reference/documentation/`: Validation reports, phase history, changelogs, research

### MCP Integration Suite

PM OS integrates external tools via Model Context Protocol:

**Phase 1** ✅: Google Drive (legacy document retrieval) - Already operational
**Phase 4** (Consolidated): All remaining MCPs in single phase
- Jira (bi-directional issue sync)
- Confluence (documentation publishing)
- Slack (team communication, notifications)
- Snowflake (data warehouse queries)
**Future**: Linear, Notion (under evaluation based on team stack preferences)

**Rationale**: Consolidating MCP work enables unified OAuth management, consistent error handling, and batch integration testing.

**Configuration**: `mcp/config.json` with credentials in `.env` (gitignored)

---

## Workflow Patterns

### Standard Task Routing (Orchestrator Logic)

When you receive a user request in Claude Code:

1. **Identify Task Type**:
   - Discovery (OST, user research) → Product Architect
   - Technical (API, architecture) → Engineering Partner
   - UI/UX (wireframes, prototypes) → UX Strategist
   - Data (SQL, analytics) → Data Analyst
   - GTM (positioning, value prop) → GTM Strategist
   - Quality audit → System Evaluator

2. **Load Identity Context**:
   - Always: `identity/STRATEGY.md` (USER's strategy), `identity/STANDARDS.md` (USER's standards)
   - For PM OS meta-tasks: `pm-os-reference/identity/ROADMAP.md` (PM OS's implementation timeline)
   - For user's product work: `identity/ROADMAP.md` (USER's product roadmap)
   - Conditionally: `identity/DATA_DICTIONARY.md` (Future Phase 5)

3. **Apply Quality Standards**:
   - Check output follows `identity/STANDARDS.md` brand voice
   - Verify technical stack matches approved technologies
   - Ensure security requirements met
   - Validate artifact structure matches relevant template

4. **Execute or Route**:
   - For tasks within Claude Code capabilities (deep analysis, file operations): Execute directly
   - For tasks requiring specific agent: Explain which agent would handle this in full implementation
   - For complex workflows: Outline multi-agent sequence

### End-to-End Feature Development Workflow

```
User Request
  ↓
Product Architect: Generate OST + Initial PRD
  ↓
Engineering Partner: Technical Feasibility Review
  ↓
UX Strategist: Prototype + Information Architecture
  ↓
Data Analyst: Validate Metrics
  ↓
GTM Strategist: Positioning + Value Proposition
  ↓
Product Architect: Consolidate into Final PRD
  ↓
Human PM Review & Approval
```

**Parallel Processing Opportunities**:
- UX Strategist + Engineering Partner (after initial PRD)
- Data Analyst + GTM Strategist (both use PRD independently)

---

## Security & Quality Standards

### Security Non-Negotiables (from `identity/STANDARDS.md`)

1. **No hardcoded secrets**: All credentials in `.env` (gitignored)
2. **OAuth 2.0 required**: For all MCP integrations with user data
3. **Read-only by default**: Write permissions require explicit justification
4. **PII redaction**: Automatically redact sensitive data in logs/outputs
5. **Pre-commit scanning**: Git hooks scan for accidentally committed secrets

### Quality Gates (Before Agent Output Approval)

- [ ] Aligns with `identity/STRATEGY.md` vision
- [ ] Follows brand voice from `identity/STANDARDS.md`
- [ ] Includes specific metrics/acceptance criteria
- [ ] Cites evidence for key decisions
- [ ] Free of security vulnerabilities (no SQL injection, XSS, etc.)
- [ ] Technical stack matches approved technologies

---

## How to Use PM OS in Claude Code

### For Discovery Tasks

**Example**: "Generate an OST for improving user onboarding"

**Process**:
1. Load `identity/STRATEGY.md` to check strategic alignment
2. Generate Opportunity Solution Tree in Mermaid format
3. Save to `execution/discovery/YYYY-MM-DD_OST_[brief-title].md`
4. Follow structure from any existing OST examples or best practices

### For PRD Generation

**Example**: "Create a PRD for collaborative editing feature"

**Process**:
1. Load `identity/STRATEGY.md` (vision alignment) and `identity/STANDARDS.md` (quality standards)
2. Use `templates/prd_template.md` as structure
3. Follow BMAD method (Business case, Metrics, Approach, Details)
4. Save to `execution/prds/YYYY-MM-DD_PRD_[brief-title].md`
5. Ensure includes: problem statement, success metrics, user stories with Gherkin scenarios

### For Technical Specifications

**Example**: "Design API for real-time sync"

**Process**:
1. Load `identity/STANDARDS.md` (approved tech stack: React, Node.js, TypeScript)
2. Generate OpenAPI specification
3. Create BPMN diagram for complex workflows (if applicable)
4. Write Gherkin acceptance scenarios
5. Include security review checklist
6. Save to `execution/technical_specs/YYYY-MM-DD_TechSpec_[brief-title].md`

### For PM OS Self-Improvement

**Example**: "Add a new agent for handling payments domain"

**Process**:
1. Check `pm-os-reference/identity/ROADMAP.md` to ensure PM OS's current phase supports new agents
2. Use `templates/agent_spec_template.md` as foundation
3. Generate both Cursor (`.mdc`) and Claude Code (`.md`) versions
4. Update Orchestrator routing logic to recognize payments-related keywords
5. Propose changes as documented enhancement for human review

---

## File Structure Reference

```
PM OS/
├── .cursor/
│   └── rules/
│       └── _orchestrator.mdc          # Master router (Cursor)
├── .claude/
│   ├── CLAUDE.md                      # This file (project context)
│   └── agents/                        # Specialist agents (Claude Code)
│       ├── orchestrator.md            # Master router
│       ├── product_arch.md            # Product Architect
│       ├── engineering_partner.md     # Engineering Partner v1.2
│       └── ux_strategist.md           # UX Strategist
├── identity/                          # YOUR organizational context (customize templates!)
│   ├── README.md                      # Customization guide
│   ├── STRATEGY.md                    # YOUR vision, mission, NSM (template)
│   ├── STANDARDS.md                   # YOUR brand voice, tech stack (template)
│   └── ROADMAP.md                     # YOUR product roadmap (template)
├── pm-os-reference/                          # PM OS inception materials (meta-recursive)
│   ├── README.md                      # Explains artifacts vs documentation
│   ├── identity/                      # PM OS's own organizational context (reference)
│   │   ├── README.md                  # Explains PM OS's meta-recursive identity
│   │   ├── STRATEGY.md                # PM OS's vision (reference example)
│   │   ├── STANDARDS.md               # PM OS's tech stack (reference example)
│   │   └── ROADMAP.md                 # PM OS's Phase 0-7 timeline (reference)
│   ├── artifacts/                     # PM OS outputs during Phase 0-1
│   │   ├── discovery/                 # OSTs, implementation plans
│   │   ├── prds/                      # Product requirements docs
│   │   ├── technical_specs/           # Feasibility assessments
│   │   └── prototypes/                # React/Tailwind components
│   └── documentation/                 # PM OS process documentation
│       ├── phase-history/             # Phase completion records
│       ├── validation-reports/        # Comprehensive test results
│       ├── changelogs/                # Agent evolution tracking
│       └── research/                  # Background research, status
├── execution/                         # YOUR workspace (currently empty)
│   ├── README.md                      # Artifact pipeline guide
│   ├── discovery/                     # OSTs, research notes
│   ├── prds/                          # Product requirements docs
│   ├── technical_specs/               # API specs, BPMN, Gherkin
│   ├── prototypes/                    # React components
│   ├── gtm/                           # Marketing materials
│   ├── improvement_proposals/         # PM OS self-improvement proposals
│   └── automation/                    # Scripts (Phase 5+)
├── templates/
│   ├── agent_spec_template.md         # Agent definition format
│   ├── prd_template.md                # BMAD PRD structure
│   └── mcp_integration_plan.md        # MCP setup guide
├── mcp/
│   ├── config.json                    # MCP server configurations
│   ├── credentials/                   # Gitignored secrets
│   └── setup_guides/                  # Service-specific setup docs
├── .gitignore                         # Excludes .env, credentials
├── .env.example                       # Credential template
├── README.md                          # Product overview
├── QUICK_START.md                     # Fast-start guide
└── VALIDATION_CHECKLIST.md            # Phase validation tests
```

---

## Common Commands & Patterns

### Reading Identity Context

Before any substantive task:
```
Read identity/STRATEGY.md and identity/STANDARDS.md to understand USER's organizational context
```

For PM OS meta-tasks (improving PM OS itself):
```
Read pm-os-reference/identity/ROADMAP.md to check PM OS's current phase status
```

### Generating Artifacts

Always use templates:
```
Use templates/prd_template.md as structure for this PRD
Save to execution/prds/2026-01-31_PRD_[feature-name].md
```

### Checking Current Phase

To understand what's in scope for PM OS development:
```
Read pm-os-reference/identity/ROADMAP.md to check PM OS's current phase status
Verify this task aligns with Phase [N] objectives for PM OS implementation
```

To understand user's product roadmap:
```
Read identity/ROADMAP.md to check USER's product roadmap
Verify feature aligns with USER's strategic timeline
```

### Validating Outputs

Before finalizing any artifact:
```
Validate against identity/STANDARDS.md quality gates:
- Professional, technical, concise writing
- Evidence-based decisions
- Approved tech stack
- Security requirements met
```

---

## Phase Roadmap Summary

| Phase | Status | Focus | Key Deliverables |
|-------|--------|-------|------------------|
| **0** | ✅ Complete (1 day) | Bootstrap | Orchestrator, Product Architect, Templates, Identity Layer |
| **1** | ✅ Complete (2 days) | Core Agents | Engineering Partner, UX Strategist, Google Drive MCP |
| **2** | ✅ Complete (4 hrs) | Execution Layer | Data Analyst, GTM Strategist (5-agent team complete) |
| **3** | ✅ Complete (2 days) | Self-Improvement | System Evaluator, Doc Maintainer, quality dashboard |
| **4** | 🟡 Planning | MCP Integration Suite | Jira, Confluence, Slack, Snowflake (all MCPs consolidated) |
| **5** | 🟡 Planned | Data Intelligence | Data dictionary, metric automation |
| **6** | 🟡 Planned | IDE Optimization | Parallel processing, domain specialists |
| **7** | 🟡 Planned | Enterprise | Multi-user, security hardening, web prototype |

**Note**: PM OS completed Phases 0-3 in **5.2 days** (2026-01-31 to 2026-02-02), vs. original 11-week estimate (11x faster). See `pm-os-reference/documentation/VELOCITY_TRACKING.md` for detailed velocity analysis and `pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md` for comprehensive system metrics.

---

## Key Principles for Claude Code Usage

### 1. Deep Analysis Mode
Use Claude Code for:
- Comprehensive codebase exploration (read multiple files, understand architecture)
- Complex multi-step workflows requiring extensive context
- Terminal operations (git, deployment scripts)
- Parallel agent processing (spawn multiple analysis tasks)

### 2. Context Preservation
- Maintain session state across multi-turn conversations
- Link related artifacts (OST → PRD → Tech Spec)
- Carry forward key decisions between workflow steps

### 3. Self-Awareness
- PM OS is building itself (meta-recursive)
- When working on PM OS improvements, consult `pm-os-reference/identity/ROADMAP.md` (PM OS's implementation phases)
- When working on user's product features, consult `identity/ROADMAP.md` (user's product roadmap)
- Propose enhancements aligned with current phase

### 4. Quality Over Speed
- Always validate against `identity/STANDARDS.md`
- Include evidence and reasoning
- Flag uncertainties for human review
- Don't skip security checks

---

## Current Status

**Phase 0 Progress**: ~60% complete

**Completed**:
- ✅ Directory structure
- ✅ Identity Layer (STRATEGY, STANDARDS, ROADMAP)
- ✅ Templates (agent spec, PRD, MCP integration)
- ✅ Git configuration
- ✅ Orchestrator agent (Cursor version)
- ✅ Project context (this file)

**Next Steps**:
1. Create Product Architect agent (Cursor + Claude versions)
2. Test bootstrap: Generate OST for PM OS discovery workflows
3. Validate Product Architect can generate agent specs using template
4. Complete Phase 0 success criteria
5. Begin Phase 1 planning

---

## Getting Help

**Documentation**:
- **Customization Guides**: `identity/README.md`, `execution/README.md`, `pm-os-reference/identity/README.md`
- **YOUR Organizational Context**: `identity/*.md` (customize these templates!)
- **PM OS's Own Context** (reference): `pm-os-reference/identity/*.md`
- **Templates**: `templates/*.md`
- **MCP Setup Guides**: `mcp/setup_guides/*.md` (future)
- **Troubleshooting**: `docs/TROUBLESHOOTING.md` (future)

**For PM OS Implementation Questions**:
1. Check `pm-os-reference/identity/ROADMAP.md` for PM OS's current phase scope
2. Consult `identity/STANDARDS.md` for USER's quality guidelines
3. Review relevant template in `templates/`
4. Flag complex decisions for human PM review

**For User's Product Work**:
1. Load `identity/STRATEGY.md` (USER's vision) and `identity/STANDARDS.md` (USER's standards)
2. Reference `identity/ROADMAP.md` (USER's product roadmap) for alignment
3. Save outputs to `execution/` subdirectories

---

**Project Status**: Phase 0 (Bootstrap) - Active Development
**Last Updated**: 2026-01-31
**Next Milestone**: Product Architect agent creation
**Maintained By**: PM OS Orchestrator + Human PM
