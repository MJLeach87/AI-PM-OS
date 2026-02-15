# PM OS Quick Start Guide

**For**: Product Managers new to PM OS
**Time to First Artifact**: 5 minutes
**Current Phase**: 8 (Enterprise Readiness) - Planning
**Phase 7 Completed**: 2026-02-14 ✅

---

## What is PM OS?

PM OS is your AI-powered product management assistant that helps you:
- Generate Opportunity Solution Trees (OSTs) in minutes
- Draft comprehensive PRDs following BMAD methodology
- Create consistent, high-quality product artifacts
- Build new AI agents to expand capabilities

**Key Innovation**: PM OS can improve itself. The Product Architect agent can generate new specialist agents using templates.

---

## 3-Minute Setup

### Step 1: Verify Installation
You should see this directory structure:
```
PM OS/
├── .claude/
│   ├── CLAUDE.md           # Project context (auto-loaded by Claude Code)
│   └── skills/             # Canonical specialist source (10 skills — invoked as /skill-name)
│       ├── discovery/      # /discovery — OST + discovery artifacts
│       ├── prd/            # /prd — BMAD PRD generation
│       ├── feature/        # /feature — Full pipeline (parallel workflows)
│       ├── product-architect/    # /product-architect — Discovery, PRD, agent specs
│       ├── engineering-partner/  # /engineering-partner — Feasibility, security, API
│       ├── ux-strategist/        # /ux-strategist — Prototypes, IA, accessibility
│       ├── data-analyst/         # /data-analyst — SQL, metrics, A/B analysis
│       ├── gtm-strategist/       # /gtm-strategist — Positioning, battle cards, GTM
│       ├── pm-os-audit/          # /pm-os-audit — PM OS quality audit
│       └── pm-os-sync/           # /pm-os-sync — PM OS doc sync
├── identity/               # YOUR org's context (customize templates!)
├── pm-os-reference/identity/      # PM OS's own context (reference examples)
├── execution/              # YOUR outputs go here
├── templates/              # Standard formats
└── README.md               # Full documentation
```

**If missing**: Clone the PM OS repository or follow installation in README.md

### Step 2: Open in Claude Code

1. Navigate to the PM OS directory in your terminal
2. Run: `claude` to open Claude Code
3. Claude Code auto-loads project context from `.claude/CLAUDE.md`
4. Ready to use!

### Step 3: First Command

Try this now:

```
Product Architect: Generate an OST for improving team collaboration
```

Or use the skill shortcut:
```
/discovery Generate an OST for improving team collaboration
```

**Expected Result**:
- Mermaid diagram-based Opportunity Solution Tree
- Saved to `execution/discovery/YYYY-MM-DD_OST_Team-Collaboration.md`
- Takes ~2 minutes

---

## 5 Essential Commands

### 1. Generate Discovery Artifacts

**What**: Opportunity Solution Trees (OSTs) for problem exploration

**When**: Starting discovery, exploring problem space, before writing PRDs

**Command**:
```
Product Architect: Generate an OST for [problem or opportunity]
```

**Examples**:
- "Generate an OST for reducing customer churn"
- "Generate an OST for improving onboarding experience"
- "Generate an OST for PM OS discovery workflows" (meta!)

**Output**: `execution/discovery/YYYY-MM-DD_OST_[title].md`

---

### 2. Draft Product Requirements Documents

**What**: Comprehensive PRDs following BMAD structure (Business, Metrics, Approach, Details)

**When**: After discovery, when you have clarity on what to build

**Command**:
```
Product Architect: Create a PRD for [feature or capability]
```

**Examples**:
- "Create a PRD for real-time collaboration editing"
- "Create a PRD for advanced search filters"
- "Draft a PRD for user authentication flow"

**Output**: `execution/prds/YYYY-MM-DD_PRD_[feature]_v0.1.md`

**Note**: Version 0.1 is initial draft. In later phases, specialist agents will review and you'll get v1.0

---

### 3. Create New Agents (PM OS Self-Improvement)

**What**: Generate specifications for new specialist agents

**When**: You need expertise in a domain PM OS doesn't cover yet

**Command**:
```
Product Architect: Create a new agent for [domain]
```

**Examples**:
- "Create a new agent for API documentation review"
- "Create an agent for regulatory compliance checks"
- "Generate an agent spec for customer interview synthesis"

**Output**:
- `.claude/skills/[name]/SKILL.md` (skill implementation — the canonical source)

**Note**: These are specifications. You'll review and activate them.

---

### 4. Get Strategic Context

**What**: Understand YOUR organization's vision, standards, or roadmap

**When**: Checking alignment, understanding priorities, planning work

**Commands**:
```
Read identity/STRATEGY.md          # YOUR company's strategy (after customization)
Read identity/STANDARDS.md         # YOUR tech stack and standards (after customization)
Read identity/ROADMAP.md           # YOUR product roadmap (after customization)
Read pm-os-reference/identity/STRATEGY.md # PM OS's own strategy (reference example)
```

Use the Read tool directly, or ask: "What is our North Star Metric?" (the Orchestrator will load context automatically)

**Important**: `identity/` contains YOUR customized files (active), `pm-os-reference/identity/` contains PM OS's reference examples (read-only)

---

### 5. Check Phase Status

**What**: Understand what's implemented in PM OS and what's coming

**When**: Wondering what PM OS can do, planning next capabilities

**Commands**:
```
Read pm-os-reference/documentation/IMPLEMENTATION_STATUS.md  # Current PM OS phase progress
Read pm-os-reference/identity/ROADMAP.md                    # PM OS's 7-phase implementation plan
Read identity/README.md                              # Guide to customizing YOUR identity layer
Read execution/README.md                             # Guide to YOUR artifact workspace
```

**Shows**: Current phase progress, validation status, next steps

**Note**: See `pm-os-reference/` folder for PM OS inception artifacts demonstrating output quality

---

## Common Workflows

### Workflow 1: Feature Discovery → PRD (Solo)

**Time**: 30-45 minutes
**Phases**: Phase 0 (available now)

**Steps**:
1. **Generate OST**:
   ```
   Product Architect: Generate an OST for [feature idea]
   ```
   Review output in `execution/discovery/`

2. **Draft PRD**:
   ```
   Product Architect: Create a PRD for [chosen solution from OST]
   ```
   Review output in `execution/prds/`

3. **Human Review**:
   - Read generated PRD
   - Edit for specifics only you know
   - Validate metrics are realistic
   - Share with stakeholders

**Result**: Complete discovery artifact + initial PRD in under an hour

---

### Workflow 2: Expanding PM OS Capabilities

**Time**: 20-30 minutes
**Phases**: Phase 0 (available now)

**Steps**:
1. **Identify Gap**:
   "We need an agent to review security compliance"

2. **Generate Agent Spec**:
   ```
   Product Architect: Create a new agent for security compliance review
   ```

3. **Review Generated Spec**:
   - Check `.claude/skills/security-compliance/SKILL.md`
   - Validate capabilities, triggers, quality criteria

4. **Activate** (or defer to later):
   - If spec looks good: Start using the agent
   - If needs refinement: Edit the spec files
   - If not urgent: Save for later phase

**Result**: PM OS gains new capability tailored to your needs

---

### Workflow 3: Multi-Agent Feature Development (Future: Phase 1+)

**Time**: 60-90 minutes
**Phases**: Phase 1 and later

**Steps**:
1. **Discovery** (Product Architect): Generate OST + Initial PRD
2. **Feasibility** (Engineering Partner): Technical review, API specs
3. **Prototype** (UX Strategist): Wireframes, IA, React components
4. **Metrics** (Data Analyst): Validate baselines, measurement plan
5. **GTM** (GTM Strategist): Positioning, value proposition
6. **Consolidation** (Product Architect): Final PRD v1.0

**Result**: Comprehensive, multi-disciplinary feature specification

**Note**: Available after Phase 1 (Engineering Partner & UX Strategist) and Phase 2 (Data Analyst & GTM Strategist) complete

---

## Understanding Agent Roles

### Product Architect (Discovery & Strategy)
**Invoke With**: `/product-architect [request]` or `/discovery` / `/prd` skill commands

**What It Does**:
- Generates Opportunity Solution Trees (OSTs)
- Drafts PRDs following BMAD methodology
- Creates new agent/skill specifications
- Consolidates multi-agent outputs

**Use For**:
- Discovery and problem exploration
- PRD generation
- Creating new PM OS agents
- Strategic planning artifacts

---

### Engineering Partner (Technical & Security)
**Invoke With**: `/engineering-partner [request]`

**What It Does**:
- Technical feasibility audits (complexity, effort sizing)
- STRIDE + OWASP Top 10 security assessments
- Legacy code analysis
- BPMN process modeling
- API specification generation (OpenAPI)

---

### UX Strategist (Design & Accessibility)
**Invoke With**: `/ux-strategist [request]`

**What It Does**:
- Information architecture mapping
- React/Tailwind prototype generation
- Accessibility audits (WCAG 2.1 AA)
- User flow design

---

### Data Analyst (Metrics & Analytics)
**Invoke With**: `/data-analyst [request]`

**What It Does**:
- SQL query generation
- PRD metrics validation (cross-referenced with DATA_DICTIONARY)
- A/B test statistical analysis
- Baseline data gathering
- Data quality assessment

---

### GTM Strategist (Positioning & Sales)
**Invoke With**: `/gtm-strategist [request]`

**What It Does**:
- Value proposition development
- Competitive positioning and battle cards
- Pricing strategy analysis
- Market segmentation

---

### System Evaluator / Quality Audit
**Invoke With**: `/pm-os-audit`
**What It Does**: Audits PM OS agents, templates, and phase consistency; proposes self-improvement

---

### Documentation Maintainer / Doc Sync
**Invoke With**: `/pm-os-sync`
**What It Does**: Syncs PM OS documentation across CLAUDE.md, ROADMAP.md, README and phase history files

---

## Tips for Success

### 1. Start with OSTs
Don't jump straight to PRDs. Generate an OST first to explore the problem space.

**Why**: OSTs help you:
- Identify multiple solutions (not just first idea)
- Align with strategic objectives
- Gather evidence before committing

**Example**: Instead of "Create a PRD for dark mode", do "Generate an OST for UI customization" first

---

### 2. Customize the Identity Layer (CRITICAL!)
The `identity/` folder contains templates for YOUR organizational context. **You must customize these before using PM OS for real work!**

**🚨 ACTION REQUIRED**:
1. **Read the customization guide**: `identity/README.md`
2. **Replace templates with YOUR actual information**:
   - `identity/STRATEGY.md`: YOUR company vision, mission, North Star Metrics (not PM OS defaults!)
   - `identity/STANDARDS.md`: YOUR brand voice, approved tech stack (not PM OS defaults!)
   - `identity/ROADMAP.md`: YOUR product roadmap (not PM OS's Phase 0-7 timeline!)
3. **See reference examples**: `pm-os-reference/identity/` contains PM OS's own organizational context (for structural inspiration only)

**Why this matters**: Agents automatically load YOUR `identity/` files to ensure outputs align with YOUR organization. If you skip customization, agents will use PM OS defaults instead of your actual context.

**Time required**: 30-60 minutes for initial customization

---

### 3. Review and Refine Agent Outputs
PM OS generates drafts, you provide strategic insight and domain expertise.

**Always Review**:
- Metrics: Are baselines realistic? Targets achievable?
- Security: Are there risks the agent might have missed?
- Strategic fit: Does this actually advance our goals?
- User stories: Are edge cases covered?

**Edit Directly**: Agents give you a 80% complete draft. You add the final 20% only you know.

---

### 4. Use Templates as Guides
All templates in `templates/` are comprehensive but customizable.

**PRD Template**: Includes every possible section. For simple features, you can skip optional sections.
**Agent Spec Template**: Very detailed. For quick agents, fill in core sections only.

**Customize**: Save your own template variants in `templates/` for faster reuse

---

### 5. Version Your Artifacts
Use the versioning convention in filenames:

- `v0.1`: Initial draft (agent solo)
- `v0.5`: Post-review (specialist agents incorporated)
- `v1.0`: Approved (ready for implementation)

**Example**:
- `2026-01-31_PRD_Auth-Flow_v0.1.md` → `2026-02-05_PRD_Auth-Flow_v1.0.md`

**Why**: Track evolution, easy rollback, clear approval status

---

## Skill Commands & Invocation Patterns

### Skill Commands (Slash Commands)
These invoke the `.claude/skills/` canonical source — self-contained specialist guides:

**Workflow Skills** (full pipelines):
- `/discovery [topic]`: Generate an Opportunity Solution Tree + discovery artifacts
- `/prd [feature]`: Draft a PRD using BMAD structure (with Data Analyst metrics validation)
- `/feature [description]`: End-to-end feature development workflow (supports parallel agent notation)

**Specialist Skills** (invoke a specific domain expert directly):
- `/product-architect [request]`: Discovery, PRD drafting, OST generation, agent spec creation
- `/engineering-partner [request]`: Technical feasibility, STRIDE + OWASP security assessment, API contracts, BPMN
- `/ux-strategist [request]`: React/Tailwind prototypes, information architecture, user flows, accessibility audits
- `/data-analyst [request]`: SQL queries, metrics validation, A/B test analysis, baseline data
- `/gtm-strategist [request]`: Value propositions, competitive positioning, battle cards, pricing strategy

**PM OS Maintenance Skills** (scoped to PM OS self-improvement):
- `/pm-os-audit`: Run a quality audit via System Evaluator
- `/pm-os-sync`: Sync PM OS documentation across files via Documentation Maintainer

### Natural Language Invocation
Address agents directly in any Claude Code message:
- `"Product Architect: Generate an OST for [topic]"`
- `/engineering-partner Review this PRD for security issues`
- `/ux-strategist Create an IA map for the onboarding flow`
- `/data-analyst Validate the metrics in this PRD`
- `/gtm-strategist Generate a value proposition for this feature`

### Claude Code Utilities
- Use Read/Write tools for file operations
- Git workflow integrated (commit directly from Claude Code)
- MCP tools available for Jira, Confluence, and other integrations

---

## Troubleshooting (Top 5 Issues)

### 1. "Agent not responding"
**Symptom**: You invoke an agent but nothing happens

**Fix**:
- Check `.claude/skills/[skill]/SKILL.md` exists
- Check `.claude/CLAUDE.md` has project context
- Verify you're using correct invocation syntax: `/skill-name [request]`

**Example**: Use `/product-architect [request]` or `/discovery [topic]`

---

### 2. "Output doesn't follow template"
**Symptom**: Generated PRD missing sections or wrong format

**Fix**:
- Read the relevant template: `Read templates/prd_template.md`
- Explicitly request: "Create a PRD using templates/prd_template.md for [feature]"
- Check `identity/STANDARDS.md` is being loaded (should see references in output)

---

### 3. "Can't find generated files"
**Symptom**: Agent says it created a file but you can't find it

**Fix**:
- Check `execution/[artifact-type]/` subdirectories
- Search by date: `execution/discovery/2026-01-31_*.md`
- In Claude Code: Use `ls execution/discovery/` to list files

---

### 4. "Strategic misalignment"
**Symptom**: Agent outputs don't match your organization's priorities or cite PM OS's vision instead of yours

**Fix**:
- **Read customization guide**: `identity/README.md`
- **Replace templates**: Update `identity/STRATEGY.md` with YOUR actual vision/metrics (not PM OS defaults)
- **Replace templates**: Update `identity/STANDARDS.md` with YOUR actual tech stack/brand voice
- **Replace templates**: Update `identity/ROADMAP.md` with YOUR actual product roadmap
- Re-run agent after customizing identity files
- **Verify**: Agent outputs should now cite YOUR vision from `identity/STRATEGY.md`

**Common mistake**: Confusing `pm-os-reference/identity/` (PM OS's reference files, read-only) with `identity/` (YOUR templates to customize)

---

### 5. "Identity layer not loading"
**Symptom**: Agent outputs lack strategic context or reference to North Star Metrics

**Fix**:
- Explicitly run `Read identity/STRATEGY.md` before invoking the agent
- Verify `identity/` files exist and aren't empty
- Check that `.claude/CLAUDE.md` is auto-loaded and references identity context

---

## Current Capabilities (Phase 7 Complete)

### All 10 Skills Active ✅
- ✅ **Discovery & PRD** → `/discovery`, `/prd`, `/product-architect`
- ✅ **Technical review & security** → `/engineering-partner`
- ✅ **UI/UX prototyping** → `/ux-strategist`
- ✅ **Data analysis & SQL** → `/data-analyst`
- ✅ **GTM and positioning** → `/gtm-strategist`
- ✅ **Full pipeline** → `/feature` (parallel workflow notation supported)
- ✅ **MCP integrations** → Atlassian Rovo MCP (Jira + Confluence), Google Drive MCP
- ✅ **Self-improvement loop** → `/pm-os-audit`, `/pm-os-sync`

### Phase 8 (Enterprise) — Coming Next
- 🟡 Multi-user Git workflow (CODEOWNERS, branch protection)
- 🟡 Security hardening (SOC 2 readiness checklist)
- 🟡 Web application prototype (optional)
- 🟡 Deployment automation

---

## Next Steps After Quick Start

### Immediate (Phase 0 Validation)
1. **Generate your first OST** (try the team collaboration example above)
2. **Draft your first PRD** (pick a simple internal tool or feature)
3. **Review outputs** against templates and identity files
4. **Customize identity layer** with your organization's actual context

### Short-Term (Explore PM OS Capabilities)
5. **Review inception examples** in `pm-os-reference/artifacts/` to see quality benchmarks
6. **Generate a test agent** to understand self-building capability
7. **Read full documentation** (`README.md`) for deep dive
8. **Check implementation status** in `pm-os-reference/documentation/IMPLEMENTATION_STATUS.md`

### Medium-Term (Phase 1 Prep)
9. **Identify 3 features** you want to use end-to-end workflow for
10. **Set up Google Drive MCP** (follow guide when available in Phase 1)
11. **Customize PRD template** for your organization's specific needs
12. **Train your PM team** on PM OS usage

---

## Getting Help

### Documentation Hierarchy
1. **Quick Start** (this file): Fast answers, common commands
2. **README.md**: Comprehensive overview, detailed explanations
3. **Identity Layer** (`identity/*.md`): Strategic context, standards, roadmap
4. **Templates** (`templates/*.md`): Reference formats for artifacts
5. **Phase Status** (`PHASE_0_STATUS.md`): Current capabilities, what's next

### For Specific Questions
- **"What can PM OS do?"** → Read `README.md` and `PHASE_0_STATUS.md`
- **"How do I create [artifact type]?"** → Check `templates/[artifact-type]_template.md`
- **"What's our strategy/vision?"** → Read `identity/STRATEGY.md`
- **"What's the tech stack?"** → Read `identity/STANDARDS.md`
- **"What's coming next?"** → Read `identity/ROADMAP.md`

### For Issues
- **Agent not working**: See Troubleshooting section above
- **Output quality issues**: Review against `identity/STANDARDS.md`
- **Strategic misalignment**: Update `identity/STRATEGY.md`
- **Template confusion**: Start with simplest sections, skip optional parts

---

## Success Stories (What To Expect)

### After 1 Week of Use
- ✅ Generated 3-5 OSTs for problem exploration
- ✅ Drafted 2-3 PRDs in fraction of usual time
- ✅ Identity layer customized for your organization
- ✅ Team familiar with Product Architect capabilities

### After 1 Month of Use (Phase 1 Complete)
- ✅ Engineering Partner reviewing technical feasibility
- ✅ UX Strategist generating prototypes
- ✅ End-to-end workflow (Discovery → Feasibility → Prototype) operational
- ✅ Google Drive integration retrieving historical context
- ✅ PRD drafting time reduced from 8 hours to 3 hours

### After 3 Months of Use (Phase 2-3 Complete)
- ✅ Data Analyst validating metrics with real data
- ✅ GTM Strategist generating positioning materials
- ✅ Jira/Linear bidirectional sync operational
- ✅ System Evaluator proposing weekly improvements
- ✅ PRD drafting time reduced from 8 hours to 2 hours (50% reduction goal achieved!)

---

## Quick Reference Card

### Most Common Commands

| Task | Command | Output Location |
|------|---------|-----------------|
| **Discovery** | `Product Architect: Generate OST for [topic]` | `execution/discovery/` |
| **PRD Draft** | `Product Architect: Create PRD for [feature]` | `execution/prds/` |
| **New Skill** | `/product-architect Create skill for [domain]` | `.claude/skills/[name]/SKILL.md` |
| **Check Strategy** | `Read identity/STRATEGY.md` | Display YOUR strategy |
| **Check Standards** | `Read identity/STANDARDS.md` | Display YOUR standards |
| **Check PM OS Phase** | `Read pm-os-reference/identity/ROADMAP.md` | Display PM OS status |
| **Customize Guide** | `Read identity/README.md` | Customization instructions |
| **Workspace Guide** | `Read execution/README.md` | Artifact pipeline guide |

### File Locations Quick Map

| What | Where |
|------|-------|
| **OSTs** | `execution/discovery/` |
| **PRDs** | `execution/prds/` |
| **Tech Specs** | `execution/technical_specs/` |
| **Prototypes** | `execution/prototypes/` |
| **GTM Materials** | `execution/gtm/` |
| **Templates** | `templates/` |
| **YOUR Org Context** | `identity/` (customize these!) |
| **PM OS Org Context (reference)** | `pm-os-reference/identity/` (read-only) |
| **Skills (all capabilities)** | `.claude/skills/[name]/SKILL.md` — 10 skills |

---

**Quick Start Version**: 2.0 (Phase 7)
**Last Updated**: 2026-02-14
**For More**: See `README.md` for comprehensive guide
**Next**: Run your first OST generation command!
