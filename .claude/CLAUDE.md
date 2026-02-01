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
Augment Product Managers into AI-powered product leaders who deliver higher-quality outcomes in a fraction of the time.

### Mission
Institutionalize product strategy, discovery, and execution as executable code that improves itself over time.

### North Star Metrics
- **50% reduction in PRD drafting time** (from 8 hours to 2 hours)
- **40% reduction in engineering rework** (from 40% to 10% of PRDs requiring major edits)
- **4x increase in discovery artifacts** (from 2 to 8 per week)

---

## Current Phase: Phase 1 (Core Agent Team + Google Drive MCP)

**Duration**: Weeks 3-5
**Objective**: Establish specialized agent team and enable access to legacy organizational documents

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
The Identity Layer stores all organizational intelligence that agents use for decision-making:

- **`identity/STRATEGY.md`**: Company vision, mission, North Star metrics, strategic principles
- **`identity/STANDARDS.md`**: Brand voice, tech stack, security requirements, quality gates
- **`identity/ROADMAP.md`**: PM OS implementation timeline (meta-recursive roadmap)
- **`identity/MARKET.md`**: (Future) Competitive positioning
- **`identity/DATA_DICTIONARY.md`**: (Future Phase 4) Data warehouse schema definitions

**Usage**: All agents automatically load relevant identity context before generating outputs.

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

Artifacts are stored in `execution/` with version control:

- `execution/discovery/`: Opportunity Solution Trees, user research, IA maps
- `execution/prds/`: Product requirements documents
- `execution/technical_specs/`: BPMN models, API contracts, Gherkin scenarios
- `execution/prototypes/`: React/Tailwind components
- `execution/gtm/`: Value propositions, battle cards, positioning docs
- `execution/automation/`: (Phase 5) Deployment scripts, reporting cron jobs

**Naming Convention**: `YYYY-MM-DD_[artifact-type]_[brief-title].md`

### MCP Integration Suite

PM OS integrates external tools via Model Context Protocol:

**Phase 1**: Google Drive (legacy document retrieval)
**Phase 2**: Jira/Linear (bi-directional dev workflow sync)
**Phase 3**: Slack (historical context + notifications), Notion (corporate wiki sync)
**Phase 4**: Snowflake (data warehouse queries)

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
   - Always: `identity/STRATEGY.md`, `identity/STANDARDS.md`
   - Conditionally: `identity/ROADMAP.md` (for PM OS meta-tasks), `identity/DATA_DICTIONARY.md` (for data tasks)

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
1. Check `identity/ROADMAP.md` to ensure current phase supports new agents
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
│   └── agents/                        # Future specialist agents
├── identity/
│   ├── STRATEGY.md                    # Vision, mission, North Star
│   ├── STANDARDS.md                   # Brand voice, tech stack, security
│   └── ROADMAP.md                     # PM OS implementation timeline
├── execution/
│   ├── discovery/                     # OSTs, research notes
│   ├── prds/                          # Product requirements docs
│   ├── technical_specs/               # API specs, BPMN, Gherkin
│   ├── prototypes/                    # React components
│   ├── gtm/                           # Marketing materials
│   └── automation/                    # Scripts (Phase 5+)
├── templates/
│   ├── agent_spec_template.md         # Agent definition format
│   ├── prd_template.md                # BMAD PRD structure
│   └── mcp_integration_plan.md        # MCP setup guide
├── mcp/
│   ├── config.json                    # MCP server configurations
│   ├── credentials/                   # Gitignored secrets
│   └── setup_guides/                  # Service-specific setup docs
├── docs/                              # User-facing documentation
├── .gitignore                         # Excludes .env, credentials
└── .env.example                       # Credential template
```

---

## Common Commands & Patterns

### Reading Identity Context

Before any substantive task:
```
Read identity/STRATEGY.md and identity/STANDARDS.md to understand organizational context
```

### Generating Artifacts

Always use templates:
```
Use templates/prd_template.md as structure for this PRD
Save to execution/prds/2026-01-31_PRD_[feature-name].md
```

### Checking Current Phase

To understand what's in scope:
```
Read identity/ROADMAP.md to check current phase status
Verify this task aligns with Phase [N] objectives
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

| Phase | Timeline | Focus | Key Deliverables |
|-------|----------|-------|------------------|
| **0** | Weeks 1-2 | Bootstrap | Orchestrator, Product Architect, Templates, Identity Layer |
| **1** | Weeks 3-5 | Core Agents | Engineering Partner, UX Strategist, Google Drive MCP |
| **2** | Weeks 6-8 | Execution Layer | Data Analyst, GTM Strategist, Jira/Linear MCP |
| **3** | Weeks 9-11 | Self-Improvement | System Evaluator, Slack/Notion MCP, improvement loop |
| **4** | Weeks 12-14 | Data Intelligence | Snowflake MCP, data dictionary |
| **5** | Weeks 15-17 | IDE Optimization | Parallel processing, domain specialists, automation |
| **6** | Weeks 18-24 | Enterprise | Multi-user, security hardening, web prototype |

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
- When working on PM OS improvements, consult `identity/ROADMAP.md`
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
- Identity Layer: `identity/*.md`
- Templates: `templates/*.md`
- MCP Setup Guides: `mcp/setup_guides/*.md` (future)
- Troubleshooting: `docs/TROUBLESHOOTING.md` (future)

**For PM OS Issues**:
1. Check `identity/ROADMAP.md` for current phase scope
2. Consult `identity/STANDARDS.md` for quality guidelines
3. Review relevant template in `templates/`
4. Flag complex decisions for human PM review

---

**Project Status**: Phase 0 (Bootstrap) - Active Development
**Last Updated**: 2026-01-31
**Next Milestone**: Product Architect agent creation
**Maintained By**: PM OS Orchestrator + Human PM
