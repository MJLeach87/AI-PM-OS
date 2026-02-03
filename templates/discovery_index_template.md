# Discovery Index Template

**Template Type**: Optional Catalog Structure
**Purpose**: Provide a suggested format for maintaining a cross-referenced inventory of discovery research - use when catalog benefits outweigh maintenance effort
**Philosophy**: Like a research library index, this is helpful when discovery work is extensive and cross-referencing adds value. For smaller projects or linear discovery, file naming and search may suffice. This index is a tool to consider, not a requirement.

---

## When to Use This Index

**Consider maintaining a discovery index when**:
- Discovery work spans multiple sources (interviews, feedback, analytics, trends)
- Cross-referencing research helps identify patterns or gaps
- Team members need to quickly find relevant discovery artifacts
- Discovery knowledge builds over time (multi-month discovery phases)
- Tracking research gaps and future discovery priorities valuable

**Feel free to skip or simplify when**:
- Discovery work is limited (< 5-10 artifacts)
- File naming conventions and search sufficient for finding artifacts
- Linear discovery workflows don't require cross-referencing
- Maintaining index adds overhead without clear benefit

**Note**: This index can be maintained manually, auto-updated by Product Architect, updated periodically, or skipped entirely based on project needs.

---

## Optional Structure (Adapt as Needed)

# [Product Name] Discovery Index

**Last Updated**: [Date]
**Maintained By**: [Product Architect / PM / Team]
**Index Scope**: [What discovery work does this index cover? All time? Specific initiative?]

---

## Research Inventory

### Customer Interviews

| Date | Artifact | Participants | Key Themes | Informs |
|------|----------|--------------|------------|---------|
| 2026-01-15 | [Interview-Synthesis_Enterprise-PMs.md](link) | 5 PMs (Enterprise) | AI adoption, workflow automation | OST_AI-PM-Tools, PRD_Workflow-Automation |
| 2026-01-22 | [Interview-Synthesis_SMB-PMs.md](link) | 8 PMs (SMB) | Simplicity, onboarding friction | OST_Onboarding-V2 |

**Total Interviews**: [X syntheses covering Y participants]
**Coverage**: [What personas/segments have been interviewed? What's missing?]

---

### Customer Feedback

| Date | Artifact | Source | Volume | Top Themes | Informs |
|------|----------|--------|--------|------------|---------|
| 2026-01-10 | [Feedback-Synthesis_NPS-Q1.md](link) | NPS Survey | 150 responses | Real-time collab, export options | OST_Collaboration, PRD_Advanced-Exports |
| 2026-01-25 | [Feedback-Synthesis_Support-Tickets-Jan.md](link) | Zendesk | 45 tickets | Email verification, onboarding bugs | PRD_Onboarding-Improvements |

**Total Feedback**: [X syntheses analyzing Y feedback items]
**Coverage**: [What feedback sources tapped? What's missing? (e.g., feature request logs, in-app feedback)]

---

### Product Analytics

| Date | Artifact | Focus Area | Key Metrics | Key Insights | Informs |
|------|----------|------------|-------------|--------------|---------|
| 2026-01-30 | [Analytics-Assessment_User-Onboarding.md](link) | Onboarding Funnel | Activation rate: 35% | 25% drop at email verification | OST_Onboarding-V2, PRD_Email-Verification-Fix |
| 2026-02-05 | [Analytics-Assessment_Feature-Adoption.md](link) | Feature Usage | Adoption: 20-45% range | Feature B has discoverability issues | PRD_Feature-Discovery-UX |

**Total Assessments**: [X analytics reports]
**Coverage**: [What product areas analyzed? What metrics tracked? What's missing?]

---

### Trend Analysis

| Date | Artifact | Trend Type | Strategic Relevance | Key Insights | Informs |
|------|----------|------------|---------------------|--------------|---------|
| 2026-01-20 | [Trend-Analysis_AI-PM-Tools.md](link) | Market Trend | Critical | AI assistants becoming table stakes | OST_AI-Features, Roadmap_Q2-AI-Investment |
| 2026-02-01 | [Trend-Analysis_Async-Collaboration.md](link) | User Behavior | Important | Remote work driving async feature demand | OST_Collaboration |

**Total Analyses**: [X trend reports]
**Coverage**: [What trend types covered? Market, competitive, tech, user behavior?]

---

## Opportunity Solution Trees (OSTs)

| Date | Artifact | Discovery Inputs | Status | Led to PRD? |
|------|----------|------------------|--------|-------------|
| 2026-01-31 | [OST_PM-OS-Discovery-Improvements.md](link) | Interview-Synthesis_Enterprise-PMs, Feedback-Synthesis_NPS-Q1 | In Progress | PRD_Artifact-Search-Filter_v0.1 |
| 2026-02-05 | [OST_Onboarding-V2.md](link) | Interview-Synthesis_SMB-PMs, Analytics-Assessment_User-Onboarding, Feedback-Synthesis_Support-Tickets-Jan | Validated | PRD_Onboarding-V2_v1.0 (planned) |

**Total OSTs**: [X opportunity trees]
**Multi-Source OSTs**: [Y OSTs informed by 2+ discovery inputs - indicates strong evidence]

---

## Product Requirements Documents (PRDs)

| Date | Artifact | Discovery Sources | Status | Implementation Status |
|------|----------|-------------------|--------|----------------------|
| 2026-02-01 | [PRD_Artifact-Search-Filter_v0.1.md](link) | OST_PM-OS-Discovery-Improvements | Draft | Not Started |
| 2026-02-10 | [PRD_Onboarding-V2_v1.0.md](link) | OST_Onboarding-V2, Analytics-Assessment_User-Onboarding, Feedback-Synthesis_Support-Tickets-Jan | Final | In Development |

**Total PRDs**: [X product requirements docs]
**Evidence-Based PRDs**: [Y PRDs cite discovery artifacts in business case]

---

## Discovery Cross-Reference Map

**Purpose**: Show how discovery artifacts connect to inform opportunities and PRDs

### Example: Onboarding Improvement Discovery Chain
```
Customer Interviews (SMB PMs)
  → Identified onboarding confusion theme
      ↓
Support Tickets (Jan 2026)
  → Quantified email verification issues (25% drop)
      ↓
Analytics Assessment (User Onboarding)
  → Confirmed 25% drop at Step 2 + 48h avg verification time
      ↓
OST: Onboarding V2
  → Synthesized multi-source insights into opportunity tree
  → Opportunities: Email verification UX, onboarding tutorial, profile setup simplification
      ↓
PRD: Onboarding V2
  → Selected email verification + tutorial opportunities
  → Success metrics from analytics baseline
  → User stories from interview quotes
```

**Multi-Source Discovery Chains**: [List other examples where multiple discovery sources converged]

---

## Research Gaps & Future Discovery

### Coverage Gaps

**Personas Not Yet Interviewed**:
- [ ] Data Analysts (adjacent persona to PMs)
- [ ] Engineering Managers (stakeholder persona)
- [ ] [Other personas?]

**Product Areas Not Yet Analyzed**:
- [ ] Reporting feature (no analytics assessment yet)
- [ ] Mobile app (no user feedback specific to mobile)
- [ ] [Other areas?]

**Feedback Sources Untapped**:
- [ ] In-app feedback widget (not yet synthesized)
- [ ] Sales call notes (qualitative feedback from prospects)
- [ ] [Other sources?]

**Trend Types Not Covered**:
- [ ] Regulatory trends (e.g., data privacy regulations)
- [ ] Technology trends (e.g., new frameworks, platforms)
- [ ] [Other trends?]

---

### Future Discovery Priorities

**High Priority** (Next 30 days):
- [ ] Interview Data Analysts to validate analytics integration value prop
- [ ] Analyze Q1 NPS comments (just received)
- [ ] Conduct competitive analysis of Linear vs. Jira (inform Phase 4 MCP decision)

**Medium Priority** (Next 60 days):
- [ ] Baseline analytics for PRD generation time (validate NSM: 50% PRD time reduction)
- [ ] User testing of onboarding V2 prototype
- [ ] Trend analysis: No-code/low-code PM tools

**Low Priority** (Future):
- [ ] Stakeholder interview synthesis (internal PM OS adoption)
- [ ] Longitudinal analytics (track metrics over 6+ months)

---

## Discovery Velocity Tracking

**Purpose**: Monitor progress toward NSM: 4x Discovery Artifacts (2 → 8/week)

| Week | Interviews | Feedback | Analytics | Trends | OSTs | Total Artifacts | Target |
|------|-----------|----------|-----------|--------|------|-----------------|--------|
| Week 1 (Jan 15-21) | 1 | 0 | 0 | 1 | 0 | 2 | 8 |
| Week 2 (Jan 22-28) | 1 | 1 | 1 | 0 | 1 | 4 | 8 |
| Week 3 (Jan 29-Feb 4) | 0 | 1 | 1 | 1 | 1 | 4 | 8 |
| Week 4 (Feb 5-11) | 0 | 0 | 1 | 0 | 1 | 2 | 8 |

**Current Velocity**: [X artifacts/week (rolling 4-week average)]
**Progress to NSM**: [Y% of 8/week target]
**Trend**: [↑ Increasing / → Stable / ↓ Decreasing]

---

## Index Maintenance Notes

**Update Frequency**: [How often is this index updated?]
- Option 1: After each discovery artifact creation (real-time)
- Option 2: Weekly batch update (every Friday)
- Option 3: Monthly review and update
- Option 4: Ad-hoc as needed

**Maintenance Responsibility**: [Who maintains this index?]
- Product Architect (automated via agent)
- PM (manual curation)
- Shared (Product Architect generates, PM reviews)

**Quality Checks**:
- [ ] All discovery artifacts listed in index
- [ ] Cross-references accurate (links work, relationships correct)
- [ ] Research gaps reflect actual coverage
- [ ] Velocity tracking up-to-date

---

## Template Usage Tips

**When This Index Adds Value**:
- **Complex discovery**: 10+ artifacts across multiple sources benefit from catalog
- **Team collaboration**: Multiple PMs/researchers need shared discovery repository
- **Long-term projects**: Discovery spanning months accumulates knowledge worth indexing
- **Pattern recognition**: Cross-referencing helps identify convergent insights

**When to Skip or Simplify**:
- **Small projects**: < 5-10 artifacts → file naming/search sufficient
- **Solo PM**: No team collaboration needs → personal organization may work better
- **Linear discovery**: If not cross-referencing sources, index overhead not justified
- **Pilot phases**: Wait until discovery work scales before investing in index

**Flexibility Options**:
- **Minimal index**: Just artifact inventory (skip cross-reference map, velocity tracking)
- **Thematic index**: Organize by theme rather than artifact type
- **Auto-generated**: Product Architect maintains programmatically (low overhead)
- **Hybrid**: Index high-value artifacts only (interviews, analytics) but skip feedback syntheses

**Quality Over Completeness**:
- Perfect index not required - useful index is goal
- Better to have partial index than none (start simple, expand if valuable)
- If maintaining index feels burdensome, simplify or skip

---

## Common Discovery Index Patterns

**Pattern A: Comprehensive Research Library**
- **Use Case**: Large product org, extensive discovery work, multiple PMs
- **Approach**: Full index with cross-references, velocity tracking, research gaps
- **Maintenance**: Weekly updates, Product Architect auto-generates, PM reviews

**Pattern B: Lightweight Artifact Inventory**
- **Use Case**: Solo PM, moderate discovery volume, occasional cross-referencing
- **Approach**: Simple table of artifacts with links, skip cross-reference map
- **Maintenance**: Monthly batch updates, manual curation

**Pattern C: Thematic Discovery Catalog**
- **Use Case**: Feature-specific discovery (e.g., "Onboarding Redesign Discovery")
- **Approach**: Organize all artifacts by theme/opportunity rather than type
- **Maintenance**: Updated as discovery progresses, archived when feature ships

**Pattern D: No Index (File System Only)**
- **Use Case**: Small project, < 10 artifacts, linear discovery workflow
- **Approach**: Rely on file naming conventions and search (e.g., `YYYY-MM-DD_[type]_[topic].md`)
- **Maintenance**: None - file system is the index

---

## Integration with PM OS

**North Star Metrics**:
- **4x Discovery Artifacts (2 → 8/week)**: Velocity tracking section monitors progress
- **100% Identity Traceability**: Cross-reference map shows how discovery informs OSTs/PRDs

**Agent Integration**:
- **Product Architect**: Can optionally maintain index after artifact generation
- **System Evaluator** (Phase 3): Audits index completeness during quality reviews

**Workflow Integration**:
- New discovery artifact created → Product Architect updates index (if enabled)
- OST references discovery sources → Cross-reference map updated
- PRD cites evidence → Discovery chain documented

---

**Template Version**: 1.0
**Last Updated**: 2026-02-02
**Maintained By**: PM OS Product Architect
**Related Templates**: interview_synthesis_template.md, feedback_synthesis_template.md, analytics_assessment_template.md, trend_analysis_template.md
**Usage Philosophy**: This index is optional infrastructure - use when cross-referencing value exceeds maintenance cost
