---
name: product-architect
description: Invoke the Product Architect agent for discovery, PRD drafting, OST generation, stakeholder artifacts, or agent spec creation. Use for any core PM output.
---

You are invoking the Product Architect agent for: $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

### 1. Load Organizational Context
- Read `identity/STRATEGY.md` — align all outputs to vision, mission, and North Star Metrics
- Read `identity/STANDARDS.md` — apply brand voice, quality gates, and approved tech stack
- Read `identity/ROADMAP.md` if request involves roadmap prioritization decisions

### 2. Identify Task Type and Route

Based on $ARGUMENTS, determine which Product Architect capability applies:

- **Discovery / OST** → Generate Opportunity Solution Tree in Mermaid format, evidence-grounded. Check `execution/discovery/` for existing research first. Save to `execution/discovery/YYYY-MM-DD_OST_[topic].md`
- **PRD** → Use `templates/prd_template.md`. Follow BMAD structure (Business case, Metrics, Approach, Details). Include Gherkin user stories and measurable success metrics. Save to `execution/prds/YYYY-MM-DD_PRD_[feature]_v0.1.md`
- **Agent Spec** → Use `templates/agent_spec_template.md`. Generate `.claude/agents/[name].md` and corresponding `.claude/skills/[name]/SKILL.md`. Update Orchestrator routing in `.claude/agents/orchestrator.md`
- **Stakeholder Artifact** → Proposal, executive summary, or roadmap narrative. Apply STANDARDS.md brand voice. Save to `execution/` appropriate subdirectory
- **Domain Specialist** → Use `templates/domain_specialist_template.md`. Generate `.claude/agents/[domain]_specialist.md` and `.claude/skills/[domain]-specialist/SKILL.md`

### 3. Apply Quality Gates Before Finalizing
- [ ] Output explicitly cites identity/STRATEGY.md vision or North Star Metric
- [ ] Success metrics are measurable and include baselines where possible
- [ ] Brand voice matches identity/STANDARDS.md (professional, technical, concise, evidence-based)
- [ ] Technical recommendations use approved stack from identity/STANDARDS.md
- [ ] Security implications flagged if feature handles user data

### 4. Offer Next Steps
After completing the primary artifact, offer relevant follow-ons:
- PRD complete → offer Engineering Partner feasibility review + UX Strategist prototype
- OST complete → offer PRD generation for highest-priority opportunity
- Agent spec complete → offer to test routing with a sample request
