# Execution Workspace - Product Artifact Pipeline Guide

## ⚠️ IMPORTANT: This is YOUR Workspace

**This directory should be EMPTY when you start using PM OS.** It fills up with YOUR product artifacts as you use the system:
- OSTs, PRDs, specs for YOUR features
- Prototypes, GTM materials for YOUR products
- Improvement proposals for YOUR PM OS instance

**NOT PM OS inception materials** - Those are in `examples/artifacts/` (PM OS building itself = meta-recursive work). This workspace is for YOUR actual product development work.

---

This directory is **YOUR workspace** for product artifacts. PM OS agents save all generated outputs here - discovery artifacts, PRDs, technical specs, prototypes, GTM materials, and improvement proposals.

**Purpose**: Version-controlled product development pipeline with structured artifact storage and clear workflow progression.

---

## Purpose of the Execution Workspace

The `execution/` directory is where PM OS transforms ideas into shippable features:

**Inputs**: User requests ("Generate OST for improving checkout flow")
**Process**: Agent pipeline (Discovery → PRD → Tech Spec → Prototype → GTM)
**Outputs**: Version-controlled artifacts stored in execution/ subdirectories

**Philosophy**: All product work should be:
- **Traceable**: Git history shows evolution of ideas
- **Structured**: Standardized templates ensure consistency
- **Quality-gated**: Artifacts validated against `identity/STANDARDS.md`
- **Collaborative**: Outputs reviewable via PR workflow

---

## Directory Structure

### `discovery/` - Problem Exploration & User Research

**What belongs here**:
- **Opportunity Solution Trees (OSTs)**: Mermaid diagrams mapping problems → opportunities → solutions
- **User interview notes**: Structured summaries with verbatim quotes
- **Information architecture maps**: Sitemaps, navigation flows, content hierarchies
- **Discovery research**: Market analysis, competitive research, user journey maps
- **DISCOVERY_INDEX.md** (Optional): Cross-reference guide for complex discovery work

**Agent**: Product Architect

**Example artifacts**:
- `2026-02-15_OST_Checkout-Flow-Improvements.md`
- `2026-02-16_User-Interviews_Checkout-Friction-Points.md`
- `2026-02-17_IA-Map_E-Commerce-Navigation.md`

**Workflow**: Discovery artifacts feed into PRDs (establish problem space before solution design)

---

### `prds/` - Product Requirements Documents

**What belongs here**:
- **PRDs**: BMAD-compliant (Business, Metrics, Approach, Details) product requirements
- **User stories**: Structured with Gherkin scenarios (Given/When/Then)
- **Success criteria**: Quantifiable metrics and acceptance criteria

**Agent**: Product Architect

**Example artifacts**:
- `2026-02-18_PRD_One-Click-Checkout_v0.1.md`
- `2026-02-25_PRD_One-Click-Checkout_v1.0.md` (after review/refinement)

**Workflow**: PRDs reference discovery/ artifacts and feed into technical_specs/ and prototypes/

---

### `technical_specs/` - Engineering Specifications

**What belongs here**:
- **Feasibility assessments**: Technical viability, complexity estimates (XS/S/M/L/XL)
- **Implementation analyses**: Architecture design, dependency mapping, migration plans
- **BPMN diagrams**: Complex workflow visualizations
- **API contracts**: OpenAPI/Swagger specifications
- **Gherkin scenarios**: Acceptance criteria in Given/When/Then format
- **Security reviews**: Authentication, authorization, PII handling assessments
- **Database schemas**: Table structures, relationships, indexes

**Agent**: Engineering Partner

**Example artifacts**:
- `2026-02-19_Feasibility_One-Click-Checkout.md`
- `2026-02-20_Implementation_One-Click-Checkout.md`
- `2026-02-21_API-Contract_Payment-Gateway-Integration.yaml`
- `2026-02-21_Security-Review_Payment-Processing.md`

**Workflow**: Technical specs validate PRD feasibility and guide implementation

---

### `prototypes/` - UX Specifications & Code Prototypes

**What belongs here**:
- **UX specifications**: Component structure, interaction design, accessibility requirements
- **React/Tailwind components**: Working code prototypes (.tsx files)
- **Wireframes**: Low-fidelity layout mockups
- **Design system documentation**: Component libraries, style guides

**Agent**: UX Strategist

**Example artifacts**:
- `2026-02-22_Prototype_One-Click-Checkout-Button.md` (UX spec)
- `2026-02-22_Prototype_One-Click-Checkout-Button.tsx` (React component)
- `2026-02-23_Wireframe_Checkout-Flow-Redesign.md`

**Workflow**: Prototypes validate UX approach before engineering implementation

---

### `gtm/` - Go-To-Market Materials

**What belongs here**:
- **Value propositions**: User-facing benefit statements
- **Positioning documents**: Competitive differentiation, target segments
- **Battle cards**: Competitive comparison matrices
- **Sales enablement**: Feature overviews, demo scripts, FAQ documents
- **Launch plans**: Phased rollout strategies, communication timelines
- **Pricing strategies**: Tiering proposals, pricing justifications

**Agent**: GTM Strategist

**Example artifacts**:
- `2026-02-24_Value-Prop_One-Click-Checkout.md`
- `2026-02-25_Battle-Card_Checkout-vs-Competitors.md`
- `2026-02-26_Launch-Plan_One-Click-Checkout-Rollout.md`

**Workflow**: GTM materials align product capabilities with market positioning

---

### `improvement_proposals/` - Self-Improvement Tracking

**What belongs here**:
- **Agent improvement proposals**: Suggested enhancements to agent logic, templates, workflows
- **Quality audit reports**: System Evaluator analyses of artifact quality
- **Performance dashboards**: Metrics on agent output quality, acceptance rates, rework reduction
- **Rejected proposals**: Improvement ideas that were declined (with reasoning)

**Agent**: System Evaluator (Phase 3+)

**Example artifacts**:
- `2026-03-01_Improvement-Proposal_PRD-Template-Enhancement.md`
- `2026-03-08_Quality-Audit_Week-10-Outputs.md`
- `2026-03-15_Performance-Dashboard_Q1-2026.md`

**Workflow**: Self-improvement loop (audit → pattern detection → proposals → PR → review → implement)

---

### `automation/` - Deployment & Reporting Scripts

**What belongs here** (Phase 5+):
- **Deployment scripts**: Bash/Python scripts for automated releases
- **Reporting cron jobs**: Scheduled metric aggregation, dashboard updates
- **Data validation scripts**: Automated data quality checks
- **CI/CD pipelines**: GitHub Actions, deployment workflows

**Agent**: Engineering Partner (with automation focus)

**Example artifacts**:
- `2026-04-15_Deploy-Script_PRD-to-Confluence.sh`
- `2026-04-16_Cron-Job_Weekly-Metrics-Report.py`

**Workflow**: Automate repetitive tasks (publishing, reporting, validation)

---

## Artifact Pipeline Flow

### End-to-End Feature Development

```
User Request
    ↓
[1] Product Architect: Discovery (OST, user research)
    → Saved to: execution/discovery/
    ↓
[2] Product Architect: PRD v0.1 (initial spec)
    → Saved to: execution/prds/
    ↓
[3] Engineering Partner: Technical Feasibility
    → Saved to: execution/technical_specs/
    ↓
[PARALLEL PROCESSING]
[4a] UX Strategist: Prototype            [4b] Data Analyst: Metrics Validation
    → Saved to: execution/prototypes/        → Insights inform PRD refinement
    ↓                                        ↓
[4c] GTM Strategist: Value Proposition
    → Saved to: execution/gtm/
    ↓
[5] Product Architect: Consolidate into Final PRD v1.0
    → Updated in: execution/prds/
    ↓
Human PM Review & Approval
```

**Parallel Processing Opportunities**:
- After PRD v0.1: Engineering Partner, UX Strategist, Data Analyst, GTM Strategist can work simultaneously
- Reduces total workflow time by ~60% compared to sequential processing

**Claude Code Advantage**: Use Task tool to spawn multiple agents in parallel (not available in Cursor)

---

## Quality Standards

All artifacts must pass quality gates defined in `identity/STANDARDS.md`:

### Before Agent Output Approval
- [ ] Aligns with `identity/STRATEGY.md` vision and North Star Metrics
- [ ] Follows brand voice from `identity/STANDARDS.md`
- [ ] Includes specific, measurable success criteria
- [ ] Cites evidence for key decisions (data, research, user feedback)
- [ ] Free of security vulnerabilities (no SQL injection, XSS, hardcoded secrets)
- [ ] Uses approved tech stack from `identity/STANDARDS.md`

### Before External Distribution
- [ ] Human PM review completed
- [ ] Stakeholder feedback incorporated
- [ ] Engineering Partner validation (for technical specs)
- [ ] Data Analyst validation (for metric claims)
- [ ] Spell check and grammar review
- [ ] Strategic alignment confirmed (cites vision/mission from identity/STRATEGY.md)

**Reference**: See `identity/STANDARDS.md` for full quality gate definitions

---

## File Naming Conventions

### Standard Format

All artifacts follow this naming pattern:

```
YYYY-MM-DD_[artifact-type]_[brief-title].md
```

**Examples**:
- `2026-02-15_OST_Checkout-Flow-Improvements.md`
- `2026-02-18_PRD_One-Click-Checkout_v0.1.md`
- `2026-02-19_Feasibility_One-Click-Checkout.md`
- `2026-02-22_Prototype_One-Click-Checkout-Button.tsx`

### Rationale

**Why YYYY-MM-DD prefix?**
- Chronological sorting in file browsers
- Easy to find recent artifacts (ls -lrt)
- Git history tracking by date

**Why artifact-type in filename?**
- Clear identification of artifact type at a glance
- Enables grep/search by type: `grep -r "PRD_" execution/prds/`

**Why brief-title?**
- Human-readable context
- Distinguishes multiple artifacts of same type created on same day

### Version Suffixes

For iterative artifacts (PRDs, prototypes):

- `_v0.1.md` - Initial draft (for review/feedback)
- `_v1.0.md` - Final approved version (ready for implementation)
- `_v1.1.md` - Minor revision (clarifications, small updates)
- `_v2.0.md` - Major revision (significant scope changes)

**Example progression**:
1. `2026-02-18_PRD_One-Click-Checkout_v0.1.md` (initial draft)
2. Feedback/review cycle
3. `2026-02-25_PRD_One-Click-Checkout_v1.0.md` (approved final version)

**Git advantage**: Use `git log execution/prds/2026-02-18_PRD_One-Click-Checkout*` to see full version history

---

## Optional Documentation

### DISCOVERY_INDEX.md (Optional)

**Purpose**: Cross-reference guide for complex discovery work with many interconnected artifacts.

**When to use**:
- You have 10+ discovery artifacts that reference each other
- Multiple OSTs exploring related problem spaces
- Long-term discovery work spanning weeks/months
- Need to explain relationships between artifacts to stakeholders

**When to skip**:
- Small, isolated discovery efforts (1-3 OSTs)
- Git history and file naming provide sufficient context
- File search (grep, Glob tool) is fast enough for your needs

**Example**: See `execution/discovery/DISCOVERY_INDEX.md` for reference structure

**Philosophy**: PM OS favors flexibility - create index files when they add value, skip when file search suffices.

---

### Artifact Changelog Sections (Optional)

**Purpose**: Track major revisions within a single artifact file.

**When to use**:
- PRD undergoes significant scope changes (v1.0 → v2.0)
- Technical spec updated after architecture pivot
- Prototype redesigned after user testing

**When to skip**:
- Minor clarifications (v1.0 → v1.1) - git commit messages sufficient
- One-time artifacts (feasibility assessments, research notes)

**Example structure** (top of PRD file):
```markdown
## Changelog

### v2.0 - 2026-03-15
- Scope expansion: Added enterprise SSO integration
- Revised metrics based on stakeholder feedback

### v1.0 - 2026-02-25
- Final approved version, ready for implementation

### v0.1 - 2026-02-18
- Initial draft for review
```

**Philosophy**: Use when helpful, skip when git history provides enough context.

---

## What Belongs Where

### Distinguishing execution/ from identity/ and examples/

**execution/** (YOUR workspace) ← **YOU ARE HERE**:
- Artifacts PM OS generates for YOUR product work
- OSTs, PRDs, specs, prototypes, GTM materials for YOUR features
- Currently empty - fills up as you use PM OS

**identity/** (YOUR organizational context):
- YOUR company's strategy, standards, roadmap
- Templates with "🔧 CUSTOMIZE THIS" headers
- Agents load these files to guide their work
- See `identity/README.md` for customization guide

**examples/identity/** (PM OS's organizational context):
- PM OS's own strategy, roadmap, standards (meta-recursive)
- Reference examples showing complete Identity Layer
- Read-only, don't edit

**examples/artifacts/** (PM OS's workspace):
- Artifacts PM OS generated when building itself
- Examples of output quality (OSTs, PRDs, specs, prototypes)
- See `examples/README.md` for details

### Quick Decision Tree

**Where does this go?**
- OST for YOUR feature → `execution/discovery/`
- PRD for YOUR feature → `execution/prds/`
- YOUR company's vision → `identity/STRATEGY.md`
- PM OS's vision (reference) → `examples/identity/STRATEGY.md`
- PM OS inception OST (reference) → `examples/artifacts/discovery/`
- Agent improvement proposal → `execution/improvement_proposals/`

---

## Troubleshooting

### "Where should I save this artifact?"

**Problem**: Not sure which execution/ subdirectory to use.

**Solution**: Match artifact type to subdirectory:
- Opportunity Solution Tree (OST) → `discovery/`
- Product Requirements Document (PRD) → `prds/`
- Feasibility assessment or API spec → `technical_specs/`
- React component or wireframe → `prototypes/`
- Value proposition or battle card → `gtm/`
- Agent improvement idea → `improvement_proposals/`

**Rule of thumb**: If unsure, ask Product Architect: "Where should this artifact be saved?" - it will route to correct subdirectory.

---

### "Can I organize execution/ subdirectories differently?"

**Problem**: Want to organize by feature/project instead of artifact type.

**Solution**: PM OS recommends artifact-type organization for:
- Template consistency (all PRDs follow same structure)
- Cross-feature learning (compare multiple OSTs side-by-side)
- Agent routing simplicity (Orchestrator knows where to save)

**Alternative**: Create feature-specific subdirectories within artifact types:
```
execution/
  prds/
    checkout/
      2026-02-18_PRD_One-Click-Checkout_v0.1.md
      2026-03-05_PRD_Guest-Checkout_v0.1.md
    user-profile/
      2026-02-20_PRD_Profile-Customization_v0.1.md
```

**Trade-off**: More organization overhead, but clearer feature grouping. Choose what works for your team.

---

### "Should I create DISCOVERY_INDEX.md?"

**Problem**: Unsure if index file is needed.

**Decision criteria**:
- **Create index if**: 10+ interconnected discovery artifacts, complex problem space, need stakeholder navigation aid
- **Skip index if**: 1-5 isolated artifacts, file search (grep/Glob) works fine, low cross-referencing needs

**Philosophy**: PM OS favors flexibility - create when valuable, skip when unnecessary overhead.

---

### "What if I want to delete old artifacts?"

**Problem**: execution/ filling up with outdated artifacts.

**Solution**:
1. **Don't delete from git** - use git to preserve history
2. **Create archive/ subdirectory** within each artifact type:
   ```
   execution/prds/archive/2025-Q4/[old-prds].md
   ```
3. **Use .gitignore sparingly** - version control is valuable for traceability

**Alternative**: Tag stable releases, then filter by date:
```bash
git tag v1.0-checkout-launch
git log --since="2026-01-01" execution/prds/
```

---

## Links to Related Documentation

**Organizational Context**:
- [identity/](../identity/) - YOUR company's strategy, standards, roadmap (customize these templates)
- [identity/README.md](../identity/README.md) - Detailed customization guide for Identity Layer
- [examples/identity/](../examples/identity/) - PM OS's own organizational context (reference examples)

**PM OS Framework**:
- [Main README](../README.md) - Product overview and quick start
- [QUICK_START.md](../QUICK_START.md) - Fast-start guide
- [.claude/CLAUDE.md](../.claude/CLAUDE.md) - Project context for Claude Code

**Templates**:
- [templates/prd_template.md](../templates/prd_template.md) - BMAD PRD structure
- [templates/agent_spec_template.md](../templates/agent_spec_template.md) - Agent definition format
- [templates/mcp_integration_plan.md](../templates/mcp_integration_plan.md) - MCP setup guide

**Examples**:
- [examples/README.md](../examples/README.md) - PM OS inception materials overview
- [examples/artifacts/](../examples/artifacts/) - PM OS's own outputs (quality reference)

---

## Summary

**Key Takeaways**:
1. **execution/** is YOUR workspace - agents save all outputs here
2. **7 subdirectories** organize artifacts by type (discovery, PRDs, specs, prototypes, GTM, improvements, automation)
3. **File naming convention**: `YYYY-MM-DD_[artifact-type]_[brief-title].md` (chronological, searchable)
4. **Quality gates** from `identity/STANDARDS.md` ensure all artifacts meet YOUR standards
5. **Artifact pipeline**: Discovery → PRD → Tech Spec → Prototype → GTM (with parallel processing)
6. **Optional documentation**: DISCOVERY_INDEX.md, changelogs (use when valuable, skip when unnecessary)

**Next Steps**:
1. ✅ Start using PM OS to generate artifacts (they'll be saved in execution/ automatically)
2. ✅ Review agent outputs against quality gates from `identity/STANDARDS.md`
3. ✅ Use git to track artifact evolution: `git log execution/prds/[file]`
4. ✅ Create DISCOVERY_INDEX.md if complex discovery work warrants it
5. ✅ Consider parallel agent processing (Claude Code Task tool) to accelerate workflow

---

**Directory Purpose**: Version-controlled workspace for product development artifacts
**Maintained By**: You (Product Manager) + PM OS Agents (generate outputs)
**Update Frequency**: Continuously as features developed
**Related Files**: See `identity/README.md` for organizational context, `examples/README.md` for output quality examples
