# PM OS - Product Management Operating System

**Version**: Phase 0 (Bootstrap Foundation)
**Status**: Active Development
**Created**: 2026-01-31

---

## Overview

PM OS is a self-improving product management system that uses hybrid Cursor + Claude Code environments, full MCP integration suite, and multi-agent architecture to augment product managers into AI-powered product leaders.

### Vision
To transform Product Managers from document-authors into high-leverage Strategic Architects. The PM OS uses AI to bridge the gap between customer empathy, technical feasibility, and business impact—amplifying strategic judgment over administrative output.

### North Star Metrics (Flexible Framework)

Organizations choose 3-4 metrics that fit their context. Options include:

**Time Efficiency**: 50% PRD time reduction (8h → 4h) OR 80% Time-to-Spec reduction (< 4h)
**Quality & Rework**: 40% rework reduction (40% → 10%) OR > 95% Sprint Readiness (zero clarifications)
**Discovery & Validation**: 4x discovery artifacts (2 → 8/week) OR 2x Hypothesis-to-Halt velocity
**Strategic Alignment**: 100% Identity Traceability (all artifacts cite vision/mission/roadmap)

See `identity/STRATEGY.md` for detailed metric definitions and recommended sets for different team maturity levels.

---

## Quick Start

### Phase 0: Bootstrap Foundation (Current)

**What's Implemented**:
- ✅ Directory structure
- ✅ Identity Layer (organizational intelligence)
- ✅ Orchestrator agent (task routing)
- ✅ Product Architect agent (discovery & PRD generation)
- ✅ Templates (agent spec, PRD, MCP integration)
- ✅ Git configuration

**What You Can Do Now**:
1. Generate Opportunity Solution Trees (OSTs)
2. Draft Product Requirements Documents (PRDs)
3. Create new agent specifications
4. Explore PM OS architecture

### First Test

Try this to validate the bootstrap:

**In Cursor**:
```
@product_arch Generate an OST for improving PM OS discovery workflows
```

**In Claude Code**:
```
Product Architect: Generate an OST for improving PM OS discovery workflows
```

**Expected Output**:
- Mermaid diagram-based OST
- Saved to `execution/discovery/YYYY-MM-DD_OST_PM-OS-Discovery-Improvements.md`
- Aligned with `identity/STRATEGY.md` vision

---

## Project Structure

```
PM OS/
├── .cursor/
│   └── rules/                      # Cursor agent logic
│       ├── _orchestrator.mdc       # Master routing agent
│       └── product_arch.mdc        # Product Architect agent
│
├── .claude/
│   ├── CLAUDE.md                   # Project context for Claude Code
│   └── agents/                     # Claude Code agent logic
│       └── product_arch.md         # Product Architect agent
│
├── identity/                       # Organizational intelligence (loaded into all agents)
│   ├── STRATEGY.md                 # Vision, mission, North Star metrics
│   ├── STANDARDS.md                # Brand voice, tech stack, security requirements
│   └── ROADMAP.md                  # PM OS implementation timeline (meta-recursive)
│
├── examples/                       # PM OS inception materials (meta-recursive)
│   ├── README.md                   # Explains artifacts vs documentation
│   ├── artifacts/                  # PM OS outputs during Phase 0-1
│   │   ├── discovery/              # OSTs, implementation plans
│   │   ├── prds/                   # Product requirements docs
│   │   ├── technical_specs/        # Feasibility assessments
│   │   └── prototypes/             # React/Tailwind components
│   └── documentation/              # PM OS process documentation
│       ├── phase-history/          # Phase completion records
│       ├── validation-reports/     # Comprehensive test results
│       ├── changelogs/             # Agent evolution tracking
│       └── research/               # Background research, status tracking
│
├── execution/                      # Your outputs (currently empty, ready for use)
│   ├── discovery/                  # OSTs, user research, IA maps
│   ├── prds/                       # Product requirements documents
│   ├── technical_specs/            # API specs, BPMN models, Gherkin scenarios
│   ├── prototypes/                 # React/Tailwind components
│   ├── gtm/                        # Marketing materials
│   └── automation/                 # Scripts (Phase 5+)
│
├── templates/                      # Standardized formats
│   ├── agent_spec_template.md      # Agent definition format
│   ├── prd_template.md             # BMAD-compliant PRD structure
│   └── mcp_integration_plan.md     # MCP setup guide template
│
├── mcp/                            # MCP server configurations
│   ├── config.json                 # MCP server definitions (credentials via .env)
│   ├── credentials/                # Gitignored secrets storage
│   └── setup_guides/               # Service-specific setup docs (future)
│
├── .gitignore                      # Excludes .env, credentials, logs
├── .env.example                    # Credential template
├── README.md                       # This file (product overview)
├── QUICK_START.md                  # Fast-start guide for new users
└── VALIDATION_CHECKLIST.md         # Phase 0 validation tests
```

---

## Core Concepts

### Identity Layer (Organizational Context)

The Identity Layer stores all organizational intelligence that agents use for decision-making:

- **`identity/STRATEGY.md`**: Company vision, mission, North Star metrics, strategic principles
- **`identity/STANDARDS.md`**: Brand voice, tech stack, security requirements, quality gates
- **`identity/ROADMAP.md`**: PM OS implementation timeline (the system builds itself!)

**Key Principle**: All agents automatically load relevant identity context before generating outputs. This ensures consistency and strategic alignment.

### Multi-Agent Architecture

**Orchestrator Agent** (Master Router):
- Routes tasks to appropriate specialist agents
- Injects Identity Layer context
- Enforces security and quality standards
- Maintains session state across workflows

**Specialist Agents** (Progressive Implementation):

| Agent | Phase | Capabilities |
|-------|-------|--------------|
| **Product Architect** | 0-1 | Discovery, OSTs, PRD generation, agent spec creation |
| **Engineering Partner** | 1 | Technical feasibility, BPMN modeling, API specs |
| **UX Strategist** | 1 | Information architecture, React/Tailwind prototypes |
| **Data Analyst** | 2 | SQL queries, metrics validation, A/B test analysis |
| **GTM Strategist** | 2 | Value propositions, positioning, sales enablement |
| **System Evaluator** | 3 | Meta-agent for quality audits and self-improvement |

### MCP Integration Suite

PM OS integrates external tools via Model Context Protocol:

| Service | Phase | Purpose |
|---------|-------|---------|
| **Google Drive** | 1 ✅ | Legacy document retrieval |
| **Jira** | 4 | Bi-directional dev workflow sync (issues, epics, stories) |
| **Confluence** | 4 | Documentation publishing and wiki search |
| **Slack** | 4 | Historical context + notifications |
| **Snowflake** | 4 | Data warehouse queries |

**Future Integrations** (under evaluation): Linear, Notion

**Current Status**: Phase 4 consolidates ALL MCP integrations into single focused phase for unified OAuth management, consistent error handling, and batch testing. Google Drive MCP already operational (Phase 1). Configuration framework ready (`mcp/config.json`).

---

## How to Use PM OS

### For Discovery Tasks

**Example**: "Generate an OST for improving user onboarding"

**What Happens**:
1. Orchestrator routes to Product Architect
2. Product Architect loads `identity/STRATEGY.md` for strategic alignment
3. Generates Opportunity Solution Tree in Mermaid format
4. Saves to `execution/discovery/YYYY-MM-DD_OST_[title].md`

### For PRD Generation

**Example**: "Create a PRD for collaborative editing feature"

**What Happens**:
1. Product Architect loads identity files and `templates/prd_template.md`
2. Generates PRD following BMAD structure:
   - **Business Case**: Why this matters
   - **Metrics**: Success criteria with baselines and targets
   - **Approach**: Solution overview, alternatives considered
   - **Details**: User stories, specs, edge cases, security
3. Saves to `execution/prds/YYYY-MM-DD_PRD_[feature-name]_v0.1.md`

### For PM OS Self-Improvement

**Example**: "Add a new agent for handling payments domain"

**What Happens**:
1. Product Architect checks `identity/ROADMAP.md` to verify in-scope
2. Uses `templates/agent_spec_template.md` as foundation
3. Generates both Cursor (`.mdc`) and Claude Code (`.md`) versions
4. Proposes Orchestrator routing update
5. Creates files in `.cursor/rules/` and `.claude/agents/`

**Current Phase**: Phase 1 (Core Agent Team + Google Drive MCP) - ~70% complete

**For detailed roadmap and implementation status**, see:
- `examples/documentation/IMPLEMENTATION_STATUS.md` - Current phase progress and timeline
- `identity/ROADMAP.md` - Comprehensive 6-phase roadmap

---

## Key Principles

### 1. Self-Improvement First
PM OS is capable of building and improving itself. By Phase 3, the system generates 70% of its own improvements.

**Example**: Product Architect can generate new agent specifications, which then become part of PM OS.

### 2. Context as Code
Organizational intelligence (vision, standards, market positioning) is version-controlled in the Identity Layer and automatically injected into agent context.

### 3. Hybrid Intelligence
Combine AI automation with human strategic oversight. Agents generate, humans approve and refine.

### 4. Progressive Disclosure
Start minimal (Phase 0 bootstrap) → self-building (Phases 1-2) → self-improving (Phase 3) → enterprise-ready (Phases 4-6).

### 5. Multi-Environment Design
Optimize for both:
- **Cursor IDE**: Real-time collaborative editing, plan mode, integrated browser
- **Claude Code**: Deep codebase analysis, terminal automation, parallel processing

---

## Security & Quality Standards

### Security Non-Negotiables
1. **No hardcoded secrets**: All credentials in `.env` (gitignored)
2. **OAuth 2.0 required**: For all MCP integrations with user data
3. **Read-only by default**: Write permissions require explicit justification
4. **PII redaction**: Automatically redact sensitive data in logs/outputs
5. **Pre-commit scanning**: Git hooks scan for accidentally committed secrets (future)

### Quality Gates
Before any agent output is approved:
- [ ] Aligns with `identity/STRATEGY.md` vision
- [ ] Follows brand voice from `identity/STANDARDS.md`
- [ ] Includes specific metrics/acceptance criteria
- [ ] Cites evidence for key decisions
- [ ] Free of security vulnerabilities
- [ ] Technical stack matches approved technologies

**Full standards**: See `identity/STANDARDS.md`

---

## Environment Setup

### Prerequisites
- Cursor IDE (recommended) or Visual Studio Code
- Claude Code CLI (recommended for deep analysis)
- Node.js (for MCP integrations in future phases)
- Git

### Initial Setup

1. **Clone or initialize repository**:
   ```bash
   # If starting fresh, initialize git
   git init
   ```

2. **Set up environment variables** (for future MCP integrations):
   ```bash
   cp .env.example .env
   # Edit .env with your credentials when ready
   ```

3. **Verify structure**:
   ```bash
   ls -la
   # Should see .cursor/, .claude/, identity/, execution/, templates/, mcp/
   ```

4. **Test bootstrap**:
   - Open in Cursor or Claude Code
   - Try the "First Test" from Quick Start section above

### MCP Configuration (Future Phases)

MCP integrations are configured but disabled by default. To enable when ready:

1. Follow setup guide: `mcp/setup_guides/[SERVICE]_SETUP.md`
2. Add credentials to `.env`
3. Edit `mcp/config.json`: Change `"disabled": true` to `"disabled": false`
4. Restart IDE

---

## Contributing

### For PM Team Members

**Adding New Features to PM OS**:
1. Use Product Architect to generate OST and PRD
2. Follow existing templates in `templates/`
3. Store artifacts in appropriate `execution/` subdirectory
4. Commit with descriptive message

**Creating New Agents**:
1. Use Product Architect: "Create agent spec for [domain]"
2. Review generated spec for completeness
3. Test agent with example scenarios
4. Submit PR for review

### Git Workflow

**Branch Strategy**:
- `main`: Stable, approved changes
- `feature/[agent-name]-[description]`: New capabilities
- `fix/[issue-description]`: Bug fixes

**Commit Messages**:
- Use imperative mood: "Add discovery workflow" (not "Added")
- Include agent that generated changes if applicable
- Example: "Add PRD for collaborative editing (Product Architect generated)"

**CODEOWNERS** (future):
- `identity/*` requires Head of Product approval
- `.cursor/rules/*` and `.claude/agents/*` require validation testing

---

## Troubleshooting

### "Agent not responding"
- **Cursor**: Verify `.cursor/rules/[agent].mdc` exists
- **Claude Code**: Verify context in `.claude/CLAUDE.md` is loaded
- Check Orchestrator routing logic recognizes keywords

### "Identity Layer not loading"
- Verify files exist in `identity/` directory
- Check agent spec includes identity files in context requirements
- For Claude Code: Use Read tool explicitly to load files

### "MCP integration failing"
- Verify credentials in `.env` are correct
- Check `mcp/config.json` has `"disabled": false` for that service
- Restart IDE after configuration changes
- Consult `mcp/setup_guides/[SERVICE]_SETUP.md`

### "Artifacts not saving"
- Verify `execution/` subdirectories exist
- Check file naming follows convention: `YYYY-MM-DD_[type]_[title].md`
- Ensure write permissions on directory

**Future**: See `docs/TROUBLESHOOTING.md` (Phase 1+)

---

## Success Metrics

**Flexible Framework**: Teams choose 3-4 metrics based on their context. See `identity/STRATEGY.md` for full framework.

### Example Metric Tracking (Early-Stage Teams)

| Metric Category | Specific Metric | Baseline | Target | Current Status |
|----------------|-----------------|----------|--------|----------------|
| Time Efficiency | PRD Drafting Time | 8 hours | 4 hours | TBD (Phase 0 testing) |
| Quality & Rework | Engineering Rework | 40% | 10% | TBD |
| Discovery & Validation | Discovery Artifacts/Week | 2 | 8 | TBD |
| Strategic Alignment | Identity Traceability | 0% | 100% | TBD |

**Alternative Metrics Available**:
- Time-to-Spec (< 4h for complex features)
- Sprint Readiness (> 95% zero-clarification)
- Hypothesis-to-Halt Velocity (1-week validation cycles)

**Measurement**: Metrics tracking begins after Phase 1 completion. Organizations customize based on their maturity level.

---

## Documentation

### Core Documentation
- **`identity/STRATEGY.md`**: Vision, mission, North Star metrics
- **`identity/STANDARDS.md`**: Brand voice, tech stack, security
- **`identity/ROADMAP.md`**: Implementation timeline and phase details
- **`templates/`**: All artifact templates

### Agent Documentation
- **`.cursor/rules/_orchestrator.mdc`**: Orchestrator agent logic
- **`.cursor/rules/product_arch.mdc`**: Product Architect agent (Cursor)
- **`.claude/agents/product_arch.md`**: Product Architect agent (Claude Code)

### Future Documentation (Phases 1+)
- `docs/GETTING_STARTED.md`: PM onboarding guide
- `docs/AGENT_CAPABILITIES.md`: Which agent for which task
- `docs/TROUBLESHOOTING.md`: Common issues and solutions
- `mcp/setup_guides/`: Service-specific MCP setup guides

---

## Frequently Asked Questions

### How is PM OS different from just using Claude/Cursor directly?

PM OS adds:
1. **Organizational Context**: Identity Layer ensures outputs align with your company's vision, standards, and tech stack
2. **Specialized Agents**: Domain experts (Product Architect, Engineering Partner, etc.) optimized for specific tasks
3. **Self-Improvement**: System Evaluator audits quality and proposes improvements over time
4. **MCP Integrations**: Seamless access to your tools (Jira, Slack, Snowflake, etc.)
5. **Standardized Templates**: Ensures consistency across all artifacts

### Can PM OS really build itself?

Yes! The Product Architect agent can:
- Generate new agent specifications using `templates/agent_spec_template.md`
- Create both Cursor and Claude Code agent files
- Propose Orchestrator routing updates
- By Phase 3, System Evaluator proposes improvements to existing agents

### Which IDE should I use, Cursor or Claude Code?

**Use Cursor for**:
- Real-time collaborative PRD editing
- Plan mode for complex discovery workflows
- Integrated browser for prototype previews

**Use Claude Code for**:
- Deep codebase exploration and analysis
- Parallel processing (spawn multiple agents)
- Terminal automation and git workflows
- Complex multi-step research tasks

**Best Practice**: Use both! They complement each other and share the same agent logic.

### What if I don't have access to Snowflake/Jira/Slack?

No problem! PM OS is designed for progressive enhancement:
- **Phase 0-1**: Core functionality works without any MCP integrations
- **Phase 2+**: MCP integrations are optional add-ons
- Agents degrade gracefully if MCP unavailable (operate in "offline mode")

### How do I customize PM OS for my organization?

1. **Edit Identity Layer**:
   - `identity/STRATEGY.md`: Update with your vision, mission, metrics
   - `identity/STANDARDS.md`: Update with your brand voice, tech stack
   - `identity/MARKET.md`: Add your competitive positioning

2. **Customize Templates**:
   - Modify `templates/prd_template.md` for your PRD format
   - Add custom templates for your specific artifacts

3. **Create Domain Specialists**:
   - Use Product Architect to generate agents for your specific domains
   - Example: "Create agent for regulatory compliance review"

### How much does PM OS cost?

PM OS itself is a framework (no direct cost). Costs come from:
- **Cursor/Claude subscriptions**: Check respective pricing pages
- **MCP services**: Costs for Jira, Snowflake, etc. (if used)
- **Development time**: Initial setup (Phase 0: ~8 hours)

---

## Support & Feedback

### For Questions
- Check `identity/ROADMAP.md` for current phase scope
- Consult `identity/STANDARDS.md` for quality guidelines
- Review relevant template in `templates/`

### For Issues
- Document in `docs/TROUBLESHOOTING.md` (future)
- Flag complex decisions for human PM review
- Use Product Architect to generate improvement proposals

### For Enhancements
- Use PM OS to improve itself! Generate OSTs for new capabilities
- Submit PRs with agent-generated specs
- Follow git workflow for agent logic changes

---

## License & Credits

**PM OS Framework**: Developed as a self-improving product management system

**Built With**:
- Cursor IDE (for collaborative editing)
- Claude Code (for deep analysis)
- Model Context Protocol (for external integrations)
- BMAD Method (for PRD structure)
- Opportunity Solution Trees (for discovery)

**Methodologies**:
- BMAD Method: https://docs.bmad-method.org/
- Opportunity Solution Trees: Product discovery framework
- BPMN: Technical process modeling standard

---

**PM OS Status**: Phase 0 Bootstrap - Active Development
**Version**: 1.0 (Bootstrap)
**Last Updated**: 2026-01-31
**Next Milestone**: Complete Phase 0 success criteria, begin Phase 1
**Maintained By**: PM OS Orchestrator + Product Architect + Human PM Team
