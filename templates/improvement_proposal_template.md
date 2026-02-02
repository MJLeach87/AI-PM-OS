# Improvement Proposal: [Brief Title]

**Proposal ID**: IP-YYYYMMDD-[sequence]
**Date**: YYYY-MM-DD
**Proposed By**: System Evaluator Agent
**Target Agent**: [Agent Name]
**Priority**: [Critical/High/Medium/Low]
**Status**: [Proposed/Under Review/Approved/Implemented/Rejected]

---

## Executive Summary

**Problem**: [1-2 sentence description of the issue]

**Proposed Solution**: [1-2 sentence description of the fix]

**Expected Impact**: [Quantified benefit - e.g., "Reduce missing accessibility requirements from 33% to < 5%"]

**Effort Estimate**: [XS/S/M/L/XL] ([X hours/days])

**NSM Alignment**: [Which North Star Metric(s) this advances]

---

## Problem Statement

### Issue Description

[Detailed description of the problem this proposal addresses. Be specific about what is currently wrong or missing.]

**Frequency**: [How often does this issue occur?]
- Occurs in [X/Y] artifacts ([Z%])
- Affects [Agent Name(s)]
- Identified in [Time Period]

**Root Cause Analysis**:
1. **Immediate Cause**: [What directly causes the issue?]
2. **Underlying Cause**: [Why does that happen?]
3. **Systemic Cause**: [What about the system allows this?]

**Example Instances**:
1. `[file-path]:[line-number]` - [Description of issue]
2. `[file-path]:[line-number]` - [Description of issue]
3. `[file-path]:[line-number]` - [Description of issue]

### Impact Assessment

**Quality Impact**:
- **Current State**: [Quantified measure - e.g., "33% of technical specs missing accessibility section"]
- **Consequence**: [What happens because of this issue?]
- **Cost**: [Estimated rework time, sprint delays, clarification questions]

**North Star Metric Impact**:
- **Time Efficiency**: [How does this affect PRD time or Time-to-Spec?]
- **Quality & Rework**: [How does this affect rework rate or Sprint Readiness?]
- **Discovery & Validation**: [How does this affect discovery output or Hypothesis-to-Halt?]
- **Strategic Alignment**: [How does this affect Identity Traceability or Alignment Score?]

**User Impact**:
- **PMs**: [How does this affect product managers using PM OS?]
- **Developers**: [How does this affect engineering teams?]
- **Stakeholders**: [How does this affect other stakeholders?]

---

## Proposed Solution

### Solution Overview

[High-level description of the proposed fix. What will change?]

**Approach**: [Describe the solution approach]
- [Key change 1]
- [Key change 2]
- [Key change 3]

**Scope**:
- **Files to Modify**: [List of files that need updates]
- **Sections to Add/Change**: [Specific sections]
- **New Templates/Checklists**: [Any new artifacts needed]

### Implementation Details

#### Change 1: [Change Title]

**File**: `[file-path]`

**Current Code/Content** (Before):
```markdown
[Show current problematic content or logic]
```

**Proposed Code/Content** (After):
```markdown
[Show proposed improved content or logic]
```

**Rationale**: [Why is this change needed?]

---

#### Change 2: [Change Title]

**File**: `[file-path]`

**Current Code/Content** (Before):
```markdown
[Show current problematic content or logic]
```

**Proposed Code/Content** (After):
```markdown
[Show proposed improved content or logic]
```

**Rationale**: [Why is this change needed?]

---

#### Change 3: [Change Title]

**File**: `[file-path]`

**Current Code/Content** (Before):
```markdown
[Show current problematic content or logic]
```

**Proposed Code/Content** (After):
```markdown
[Show proposed improved content or logic]
```

**Rationale**: [Why is this change needed?]

---

### Agent Logic Updates

**Orchestrator Routing**:
- [ ] No changes required
- [ ] Update routing keywords: [New keywords to add]
- [ ] Update routing logic: [Description of logic changes]

**Agent Instructions**:
- [ ] No changes required
- [ ] Add new quality gate: [Description]
- [ ] Add new capability: [Description]
- [ ] Modify existing section: [Which section, how]

**Template Updates**:
- [ ] No changes required
- [ ] Modify existing template: [Which template, what changes]
- [ ] Create new template: [Template name and purpose]
- [ ] Add checklist: [Checklist purpose]

---

## Alternatives Considered

### Alternative 1: [Alternative Approach Title]

**Description**: [What is this alternative approach?]

**Pros**:
- [Advantage 1]
- [Advantage 2]

**Cons**:
- [Disadvantage 1]
- [Disadvantage 2]

**Why Not Chosen**: [Reason for rejecting this alternative]

---

### Alternative 2: [Alternative Approach Title]

**Description**: [What is this alternative approach?]

**Pros**:
- [Advantage 1]
- [Advantage 2]

**Cons**:
- [Disadvantage 1]
- [Disadvantage 2]

**Why Not Chosen**: [Reason for rejecting this alternative]

---

### Alternative 3: Do Nothing

**Cost of Inaction**:
- [What happens if we don't fix this?]
- [Quantified impact over time]

**Why Proposed Solution Is Better**: [Justification]

---

## Expected Outcomes

### Success Criteria

**Quantitative Metrics**:
- [ ] [Metric 1]: Improve from [X] to [Y] ([Z% improvement])
  - Measurement Method: [How will we measure this?]
  - Baseline: [Current value]
  - Target: [Goal value]
  - Timeline: [When should we see results?]

- [ ] [Metric 2]: Improve from [X] to [Y] ([Z% improvement])
  - Measurement Method: [How will we measure this?]
  - Baseline: [Current value]
  - Target: [Goal value]
  - Timeline: [When should we see results?]

**Qualitative Criteria**:
- [ ] [Quality improvement description]
- [ ] [User satisfaction improvement]
- [ ] [Process improvement description]

### North Star Metric Impact

**Primary NSM Impact**: [Which NSM is primarily affected?]
- **Current State**: [Baseline measurement]
- **Projected State**: [Expected after implementation]
- **Impact Magnitude**: [+/-X%]

**Secondary NSM Impacts**: [Any other NSMs affected?]
- [NSM Name]: [Expected change]

---

## Implementation Plan

### Phase 1: Preparation ([X hours/days])

**Tasks**:
1. [ ] Review proposal with human PM for approval
2. [ ] Create feature branch: `improvement/[brief-title]`
3. [ ] Back up affected files
4. [ ] Document current behavior (baseline)

**Deliverables**:
- Approved proposal
- Feature branch
- Baseline measurements

---

### Phase 2: Implementation ([X hours/days])

**Tasks**:
1. [ ] Update agent spec file(s): [List files]
2. [ ] Update template file(s): [List files]
3. [ ] Update orchestrator routing (if needed)
4. [ ] Add new checklists/sections
5. [ ] Update documentation

**Deliverables**:
- Modified agent spec(s)
- Modified template(s)
- Updated documentation

---

### Phase 3: Validation ([X hours/days])

**Tasks**:
1. [ ] Generate test artifact using updated agent
2. [ ] Verify quality gates enforced
3. [ ] Check for regressions (other capabilities still work)
4. [ ] Run quality audit on test artifacts
5. [ ] Compare to success criteria

**Validation Scenarios**:
- **Scenario 1**: [Description of test case]
  - Expected Result: [What should happen]
  - Validation Method: [How to verify]

- **Scenario 2**: [Description of test case]
  - Expected Result: [What should happen]
  - Validation Method: [How to verify]

**Deliverables**:
- Test artifacts
- Validation report
- Regression test results

---

### Phase 4: Deployment ([X hours/days])

**Tasks**:
1. [ ] Merge feature branch to main
2. [ ] Update CHANGELOG.md
3. [ ] Tag release: `v[X.Y]-[improvement-name]`
4. [ ] Monitor first 5-10 artifacts generated
5. [ ] Measure baseline → new state improvement

**Deliverables**:
- Merged PR
- Updated changelog
- Performance comparison report

---

## Risk Assessment

### Implementation Risks

**Risk 1**: [Risk Description]
- **Probability**: [High/Medium/Low]
- **Impact**: [High/Medium/Low]
- **Mitigation**: [How to prevent or minimize]

**Risk 2**: [Risk Description]
- **Probability**: [High/Medium/Low]
- **Impact**: [High/Medium/Low]
- **Mitigation**: [How to prevent or minimize]

**Risk 3**: [Risk Description]
- **Probability**: [High/Medium/Low]
- **Impact**: [High/Medium/Low]
- **Mitigation**: [How to prevent or minimize]

### Rollback Plan

**If Implementation Fails**:
1. [Step 1 to undo changes]
2. [Step 2 to restore previous state]
3. [Step 3 to notify stakeholders]

**Rollback Trigger Conditions**:
- [ ] Quality score decreases by > [X%]
- [ ] Regression detected in existing capabilities
- [ ] Agent fails to generate valid artifacts
- [ ] Human PM rejects implementation

---

## Dependencies

**Agent Dependencies**:
- **Blocks**: [List any proposals/work that should wait for this]
- **Blocked By**: [List any proposals/work that must complete first]
- **Related**: [List any related improvement proposals]

**External Dependencies**:
- [ ] Identity Layer updates required: [Which files?]
- [ ] MCP integration changes: [Which services?]
- [ ] Template creation needed: [Which templates?]
- [ ] Documentation updates: [Which docs?]

**Phase Alignment**:
- **Current Phase**: [Phase number and name]
- **Proposal Fits In**: [This phase / Future phase]
- **Phase Dependency**: [Any phase requirements?]

---

## Stakeholder Review

### Human PM Review

**Review Required**: [Yes/No]

**Review Questions**:
1. Does this align with PM OS strategic direction?
2. Is the effort estimate reasonable for the impact?
3. Are there alternative approaches we should consider?
4. What are the acceptance criteria?
5. When should this be implemented (priority)?

**Approval**: [Pending/Approved/Rejected]
**Reviewer**: [Human PM Name]
**Review Date**: [YYYY-MM-DD]
**Comments**: [Any feedback or modifications requested]

---

## Appendix A: Supporting Data

**Quality Audit Reference**: `execution/improvement_proposals/[audit-file].md`

**Affected Artifacts**:
| File Path | Issue Found | Current State | Expected After Fix |
|-----------|-------------|---------------|-------------------|
| [path]    | [issue]     | [current]     | [expected]        |
| [path]    | [issue]     | [current]     | [expected]        |

**Pattern Analysis Data**:
- [Relevant statistics from quality audits]
- [Frequency data]
- [Trend analysis]

---

## Appendix B: Example Before/After

**Before Implementation**:
```markdown
[Show example artifact excerpt demonstrating the problem]
```

**After Implementation**:
```markdown
[Show example artifact excerpt demonstrating the solution]
```

**Key Improvements**:
- [Specific improvement 1]
- [Specific improvement 2]
- [Specific improvement 3]

---

## Metadata

**Related Quality Audits**: [List audit file paths]
**Related Performance Dashboards**: [List dashboard file paths]
**Related Improvement Proposals**: [List related proposal IDs]

**Git Branch**: `improvement/[brief-title]`
**Pull Request**: #[PR number] (after implementation)
**Merge Commit**: [commit hash] (after merge)

**System Evaluator Version**: [X.Y]
**Proposal Generation Time**: [X minutes]
**Last Updated**: [YYYY-MM-DD]

---

**Proposal Status**: [Proposed/Under Review/Approved/Implemented/Rejected]
**Next Action**: [What should happen next?]
**Assigned To**: [Human PM / System Evaluator / Agent Team]
**Due Date**: [YYYY-MM-DD] (if approved)

---

**Generated by**: System Evaluator Agent v[X.Y]
**Proposal Location**: `execution/improvement_proposals/YYYY-MM-DD_Proposal_[brief-title].md`
**Implementation Tracking**: [Link to tracking issue/task]
