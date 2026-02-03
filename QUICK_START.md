# PM OS Quick Start Guide

**For**: Product Managers new to PM OS
**Time to First Artifact**: 5 minutes
**Current Phase**: 4 (MCP Integration Suite) - Planning
**Phase 3 Completed**: 2026-02-02 ✅

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
├── .cursor/rules/          # Cursor agent logic
├── .claude/                # Claude Code agent logic
├── identity/               # YOUR org's context (customize templates!)
├── examples/identity/      # PM OS's own context (reference examples)
├── execution/              # YOUR outputs go here
├── templates/              # Standard formats
└── README.md               # Full documentation
```

**If missing**: Clone the PM OS repository or follow installation in README.md

### Step 2: Open in Your IDE

**Using Cursor**:
1. Open PM OS folder in Cursor
2. Cursor will auto-load agents from `.cursor/rules/`
3. Ready to use!

**Using Claude Code**:
1. Navigate to PM OS directory in terminal
2. Run: `claude-code` (or open in IDE with Claude Code support)
3. Claude Code loads context from `.claude/CLAUDE.md`
4. Ready to use!

### Step 3: First Command

Try this now:

**In Cursor**:
```
@product_arch Generate an OST for improving team collaboration
```

**In Claude Code**:
```
Product Architect: Generate an OST for improving team collaboration
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
- `.cursor/rules/[agent-name].mdc`
- `.claude/agents/[agent-name].md`

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
Read examples/identity/STRATEGY.md # PM OS's own strategy (reference example)
```

**In Claude Code**: Use Read tool directly
**In Cursor**: View files or ask "What is our North Star Metric?"

**Important**: `identity/` contains YOUR customized files (active), `examples/identity/` contains PM OS's reference examples (read-only)

---

### 5. Check Phase Status

**What**: Understand what's implemented in PM OS and what's coming

**When**: Wondering what PM OS can do, planning next capabilities

**Commands**:
```
Read examples/documentation/IMPLEMENTATION_STATUS.md  # Current PM OS phase progress
Read examples/identity/ROADMAP.md                    # PM OS's 7-phase implementation plan
Read identity/README.md                              # Guide to customizing YOUR identity layer
Read execution/README.md                             # Guide to YOUR artifact workspace
```

**Shows**: Current phase progress, validation status, next steps

**Note**: See `examples/` folder for PM OS inception artifacts demonstrating output quality

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
   - Check `.cursor/rules/security_compliance.mdc`
   - Check `.claude/agents/security_compliance.md`
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

### Orchestrator (Master Router)
**Active**: Always (behind the scenes)
**You Don't Invoke Directly**: It routes your requests to the right specialist

**What It Does**:
- Routes tasks to appropriate agents
- Injects organizational context from `identity/` files
- Enforces security and quality standards
- Maintains workflow state

**When You Notice It**: When a request automatically goes to the right specialist

---

### Product Architect (Discovery & Strategy)
**Active**: Phase 0 (now)
**Invoke With**: `@product_arch` (Cursor) or "Product Architect:" (Claude Code)

**What It Does**:
- Generates Opportunity Solution Trees (OSTs)
- Drafts PRDs following BMAD methodology
- Creates new agent specifications
- Consolidates multi-agent outputs (Phase 1+)

**Use For**:
- Discovery and problem exploration
- PRD generation
- Creating new PM OS agents
- Strategic planning artifacts

---

### Engineering Partner v1.2
**Status**: ✅ Active (deployed 2026-01-31)
**Phase**: 1 (Core Agent Team)

**What It Does**:
- Technical feasibility audits
- Legacy code analysis
- BPMN process modeling
- API specification generation
- Security review for technical features

---

### UX Strategist v1.0
**Status**: ✅ Active (deployed 2026-01-31)
**Phase**: 1 (Core Agent Team)

**What It Does**:
- Information architecture mapping
- React/Tailwind prototype generation
- Accessibility audits
- User flow design

---

### System Evaluator v1.0
**Status**: ✅ Active (deployed 2026-02-01)
**Phase**: 3 (Self-Improvement Loop)
**Purpose**: Meta-agent that audits other agents and proposes improvements

**What It Does**:
- Weekly quality audits of agent outputs
- Detect drift from standards
- Propose agent logic improvements
- Enable self-improvement loop

---

### Documentation Maintainer v1.0
**Status**: ✅ Active (deployed 2026-02-02)
**Phase**: 3 (Self-Improvement Loop)
**Purpose**: Keeps documentation synchronized across all files

**What It Does**:
- Auto-sync phase status across README, CLAUDE.md, ROADMAP.md
- Maintain Phase Evolution History
- Track velocity and actual completion times
- Ensure documentation accuracy

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
3. **See reference examples**: `examples/identity/` contains PM OS's own organizational context (for structural inspiration only)

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

## Keyboard Shortcuts (IDE-Specific)

### Cursor
- `@product_arch`: Invoke Product Architect
- `Cmd/Ctrl + K`: Open command palette (select agents)
- `Cmd/Ctrl + Shift + P`: Cursor settings (configure agents)

### Claude Code
- Type agent name in natural language: "Product Architect:"
- Use Read/Write tools for file operations
- Git workflow integrated (commit directly from Claude Code)

---

## Troubleshooting (Top 5 Issues)

### 1. "Agent not responding"
**Symptom**: You invoke an agent but nothing happens

**Fix**:
- **Cursor**: Check `.cursor/rules/[agent].mdc` file exists
- **Claude Code**: Check `.claude/CLAUDE.md` has project context
- Verify you're using correct invocation syntax

**Example**: Use `@product_arch` in Cursor, not just "product architect"

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

**Common mistake**: Confusing `examples/identity/` (PM OS's reference files, read-only) with `identity/` (YOUR templates to customize)

---

### 5. "Identity layer not loading"
**Symptom**: Agent outputs lack strategic context or reference to North Star Metrics

**Fix**:
- **Claude Code**: Explicitly run `Read identity/STRATEGY.md` before invoking agent
- **Cursor**: Check Orchestrator is active (should be automatic)
- Verify `identity/` files exist and aren't empty

---

## Phase 0 Limitations (What PM OS Can't Do Yet)

### Currently Not Available
- ❌ **Technical feasibility reviews** (Engineering Partner coming in Phase 1)
- ❌ **UI/UX prototyping** (UX Strategist coming in Phase 1)
- ❌ **Data analysis and SQL queries** (Data Analyst coming in Phase 2)
- ❌ **GTM and positioning materials** (GTM Strategist coming in Phase 2)
- ❌ **MCP integrations** (Google Drive, Jira, Slack, etc. coming in Phases 1-4)
- ❌ **Self-improvement loop** (System Evaluator coming in Phase 3)

### Workarounds (For Now)
- Technical questions: Note them in PRD, escalate to engineering team
- Prototypes: Describe desired UI in PRD "User Interface Specifications" section
- Data questions: Note metric baselines as "TBD - validate with data team"
- GTM needs: Use PRD "Business Case" section, expand with human GTM expert

**These capabilities unlock progressively across 6 phases (see `identity/ROADMAP.md`)**

---

## Next Steps After Quick Start

### Immediate (Phase 0 Validation)
1. **Generate your first OST** (try the team collaboration example above)
2. **Draft your first PRD** (pick a simple internal tool or feature)
3. **Review outputs** against templates and identity files
4. **Customize identity layer** with your organization's actual context

### Short-Term (Explore PM OS Capabilities)
5. **Review inception examples** in `examples/artifacts/` to see quality benchmarks
6. **Generate a test agent** to understand self-building capability
7. **Read full documentation** (`README.md`) for deep dive
8. **Check implementation status** in `examples/documentation/IMPLEMENTATION_STATUS.md`

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
| **New Agent** | `Product Architect: Create agent for [domain]` | `.cursor/rules/` + `.claude/agents/` |
| **Check Strategy** | `Read identity/STRATEGY.md` | Display YOUR strategy |
| **Check Standards** | `Read identity/STANDARDS.md` | Display YOUR standards |
| **Check PM OS Phase** | `Read examples/identity/ROADMAP.md` | Display PM OS status |
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
| **PM OS Org Context (reference)** | `examples/identity/` (read-only) |
| **Agent Logic** | `.cursor/rules/` + `.claude/agents/` |

---

**Quick Start Version**: 1.0 (Phase 0)
**Last Updated**: 2026-01-31
**For More**: See `README.md` for comprehensive guide
**Next**: Run your first OST generation command!
