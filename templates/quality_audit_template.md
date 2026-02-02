# Quality Audit Report: [Agent Name / Time Period]

**Audit Date**: YYYY-MM-DD
**Audit Period**: [Date Range]
**Audited Agent**: [Agent Name]
**Auditor**: System Evaluator Agent
**Audit Scope**: [e.g., "Last 7 days", "Last 30 days", "All PRDs generated in Q1"]

---

## Executive Summary

**Overall Quality Score**: [X/100]

**Key Findings**:
- [1-3 bullet points summarizing most critical findings]
- [Include both strengths and weaknesses]
- [Highlight any urgent issues requiring immediate attention]

**Recommended Actions**:
1. [Priority 1 action]
2. [Priority 2 action]
3. [Priority 3 action]

---

## Audit Methodology

**Standards Referenced**:
- `identity/STRATEGY.md` - Strategic alignment validation
- `identity/STANDARDS.md` - Quality standards and brand voice
- [Agent-specific quality gates from agent spec file]

**Artifacts Analyzed**: [X total files]
- File paths: [List of files audited]
- Date range: [Start date] to [End date]
- Artifact types: [PRDs, OSTs, Technical Specs, etc.]

**Quality Criteria**:
- [ ] Strategic alignment (cites NSM from identity/STRATEGY.md)
- [ ] Standards compliance (follows identity/STANDARDS.md)
- [ ] Template adherence (matches relevant template structure)
- [ ] Evidence-based reasoning (cites data/research/clear logic)
- [ ] Completeness (all required sections present)
- [ ] Professional writing (clear, concise, active voice)
- [ ] Technical accuracy (no errors, correct terminology)
- [ ] Security compliance (no vulnerabilities, proper auth handling)

---

## Detailed Findings

### 1. Strategic Alignment Analysis

**Score**: [X/100]

**North Star Metric Alignment**:
- Artifacts citing Time Efficiency metrics: [X/Y] ([Z%])
- Artifacts citing Quality & Rework metrics: [X/Y] ([Z%])
- Artifacts citing Discovery & Validation metrics: [X/Y] ([Z%])
- Artifacts citing Strategic Alignment metrics: [X/Y] ([Z%])

**Issues Found**:
- [ ] Missing NSM citations: [X artifacts]
  - Example: `[file-path]:[line-number]` - [Description of issue]
- [ ] Weak strategic justification: [X artifacts]
  - Example: `[file-path]:[line-number]` - [Description of issue]
- [ ] Misalignment with vision: [X artifacts]
  - Example: `[file-path]:[line-number]` - [Description of issue]

**Strengths**:
- [Specific examples of excellent strategic alignment]
- [Quote or reference file paths demonstrating best practices]

---

### 2. Standards Compliance Analysis

**Score**: [X/100]

**Brand Voice Compliance** (identity/STANDARDS.md:6-10):
- Professional tone: [Pass/Fail] - [X/Y artifacts] ([Z%])
- Technical precision: [Pass/Fail] - [X/Y artifacts] ([Z%])
- Active voice usage: [Pass/Fail] - [X/Y artifacts] ([Z%])
- Concise writing: [Pass/Fail] - [X/Y artifacts] ([Z%])

**Tech Stack Compliance** (identity/STANDARDS.md:22):
- Approved technologies used: [X/Y artifacts] ([Z%])
- Unapproved technologies proposed: [X artifacts]
  - Example: `[file-path]:[line-number]` - [Technology] (should use [Approved Alternative])

**Security Compliance** (identity/STANDARDS.md:75-80):
- No hardcoded secrets: [Pass/Fail] - [X/Y artifacts] ([Z%])
- Proper authentication handling: [Pass/Fail] - [X/Y artifacts] ([Z%])
- Input validation specified: [Pass/Fail] - [X/Y artifacts] ([Z%])
- Security review included: [Pass/Fail] - [X/Y artifacts] ([Z%])

**Issues Found**:
- [List specific violations with file paths and line numbers]

**Strengths**:
- [Specific examples of excellent standards compliance]

---

### 3. Template Adherence Analysis

**Score**: [X/100]

**Template Compliance by Artifact Type**:

**PRDs** (templates/prd_template.md):
- BMAD structure complete: [X/Y] ([Z%])
- Business case section: [X/Y] ([Z%])
- Metrics section with baselines: [X/Y] ([Z%])
- Approach section with alternatives: [X/Y] ([Z%])
- Details section with Gherkin scenarios: [X/Y] ([Z%])

**Technical Specs** (templates/technical_spec_template.md):
- Architecture diagrams present: [X/Y] ([Z%])
- API contracts (OpenAPI): [X/Y] ([Z%])
- Security review section: [X/Y] ([Z%])
- Acceptance criteria (Gherkin): [X/Y] ([Z%])

**OSTs** (Mermaid diagram format):
- Proper Mermaid syntax: [X/Y] ([Z%])
- Opportunity → Solutions structure: [X/Y] ([Z%])
- Strategic alignment section: [X/Y] ([Z%])

**Issues Found**:
- [ ] Missing required sections: [X artifacts]
  - Example: `[file-path]` - Missing [Section Name]
- [ ] Incorrect structure: [X artifacts]
  - Example: `[file-path]` - [Description of structural issue]

**Strengths**:
- [Specific examples of excellent template adherence]

---

### 4. Evidence-Based Reasoning Analysis

**Score**: [X/100]

**Evidence Quality**:
- Artifacts with quantitative data: [X/Y] ([Z%])
- Artifacts citing user research: [X/Y] ([Z%])
- Artifacts with clear logic chains: [X/Y] ([Z%])
- Artifacts with supporting references: [X/Y] ([Z%])

**Issues Found**:
- [ ] Unsupported claims: [X instances]
  - Example: `[file-path]:[line-number]` - Claim "[quote]" lacks evidence
- [ ] Weak reasoning: [X instances]
  - Example: `[file-path]:[line-number]` - [Description of logical gap]
- [ ] Missing baselines: [X instances]
  - Example: `[file-path]:[line-number]` - Metric proposed without current state

**Strengths**:
- [Specific examples of excellent evidence-based reasoning]

---

### 5. Completeness Analysis

**Score**: [X/100]

**Section Completeness**:
- All required sections present: [X/Y artifacts] ([Z%])
- Sections meeting minimum length: [X/Y artifacts] ([Z%])
- No placeholder text remaining: [X/Y artifacts] ([Z%])

**Issues Found**:
- [ ] Incomplete artifacts: [X artifacts]
  - Example: `[file-path]` - Missing [Section(s)]
- [ ] Placeholder text not replaced: [X instances]
  - Example: `[file-path]:[line-number]` - "[placeholder text]"

**Strengths**:
- [Specific examples of comprehensive completeness]

---

## Pattern Analysis

**Recurring Issues**:
1. **[Pattern Name]**: Occurs in [X/Y artifacts] ([Z%])
   - Description: [What is the pattern?]
   - Root Cause: [Why is this happening?]
   - Impact: [What is the consequence?]
   - Example: `[file-path]:[line-number]`

2. **[Pattern Name]**: Occurs in [X/Y artifacts] ([Z%])
   - Description: [What is the pattern?]
   - Root Cause: [Why is this happening?]
   - Impact: [What is the consequence?]
   - Example: `[file-path]:[line-number]`

3. **[Pattern Name]**: Occurs in [X/Y artifacts] ([Z%])
   - Description: [What is the pattern?]
   - Root Cause: [Why is this happening?]
   - Impact: [What is the consequence?]
   - Example: `[file-path]:[line-number]`

**Successful Patterns**:
1. **[Pattern Name]**: Occurs in [X/Y artifacts] ([Z%])
   - Description: [What is the pattern?]
   - Why It Works: [What makes this successful?]
   - Impact: [What is the benefit?]
   - Example: `[file-path]:[line-number]`

2. **[Pattern Name]**: Occurs in [X/Y artifacts] ([Z%])
   - Description: [What is the pattern?]
   - Why It Works: [What makes this successful?]
   - Impact: [What is the benefit?]
   - Example: `[file-path]:[line-number]`

---

## Impact Assessment

**North Star Metric Impact**:
- **Time Efficiency**: [Positive/Negative/Neutral]
  - [Explanation with supporting data]
- **Quality & Rework**: [Positive/Negative/Neutral]
  - [Explanation with supporting data]
- **Discovery & Validation**: [Positive/Negative/Neutral]
  - [Explanation with supporting data]
- **Strategic Alignment**: [Positive/Negative/Neutral]
  - [Explanation with supporting data]

**Estimated Quality Cost**:
- Rework required for [X] artifacts (estimated [Y] hours)
- Sprint delays from unclear specs: [X sprints]
- Developer clarification questions: [X questions/artifact average]

---

## Improvement Recommendations

### Priority 1: Critical (Immediate Action Required)
1. **[Recommendation Title]**
   - Issue: [What is wrong?]
   - Impact: [What is the consequence?]
   - Solution: [What needs to be done?]
   - Effort: [XS/S/M/L/XL]
   - Expected Impact: [Quantified benefit]
   - Example: [File path or specific instance]

### Priority 2: High (Address Within 1 Week)
1. **[Recommendation Title]**
   - Issue: [What is wrong?]
   - Impact: [What is the consequence?]
   - Solution: [What needs to be done?]
   - Effort: [XS/S/M/L/XL]
   - Expected Impact: [Quantified benefit]

### Priority 3: Medium (Address Within 1 Month)
1. **[Recommendation Title]**
   - Issue: [What is wrong?]
   - Impact: [What is the consequence?]
   - Solution: [What needs to be done?]
   - Effort: [XS/S/M/L/XL]
   - Expected Impact: [Quantified benefit]

### Priority 4: Low (Nice to Have)
1. **[Recommendation Title]**
   - Issue: [What is wrong?]
   - Impact: [What is the consequence?]
   - Solution: [What needs to be done?]
   - Effort: [XS/S/M/L/XL]
   - Expected Impact: [Quantified benefit]

---

## Comparison to Previous Audits

**Quality Score Trend**:
- Current audit: [X/100]
- Previous audit ([Date]): [Y/100]
- Change: [+/-Z points] ([+/-W%])

**Issue Resolution**:
- Issues from previous audit: [X total]
- Issues resolved: [Y] ([Z%])
- Issues remaining: [A]
- New issues: [B]

**Performance Trend**:
- [Improving/Declining/Stable]
- [Supporting data and analysis]

---

## Agent-Specific Observations

**[Agent Name] Strengths**:
- [What does this agent do particularly well?]
- [Specific examples with file paths]

**[Agent Name] Weaknesses**:
- [What does this agent struggle with?]
- [Specific examples with file paths]

**[Agent Name] Unique Characteristics**:
- [Any patterns specific to this agent?]
- [How does this agent differ from others?]

---

## Appendix A: Artifact Inventory

| File Path | Artifact Type | Date | Quality Score | Issues | Notes |
|-----------|---------------|------|---------------|--------|-------|
| [path]    | [type]        | YYYY-MM-DD | [X/100] | [Y] | [brief note] |
| [path]    | [type]        | YYYY-MM-DD | [X/100] | [Y] | [brief note] |

---

## Appendix B: Detailed Issue Log

| Issue ID | Severity | File Path | Line Number | Issue Description | Recommendation |
|----------|----------|-----------|-------------|-------------------|----------------|
| QA-001   | Critical | [path]    | [line]      | [description]     | [fix]          |
| QA-002   | High     | [path]    | [line]      | [description]     | [fix]          |

---

## Metadata

**Audit Configuration**:
- Audit Type: [Comprehensive/Targeted/Post-Update]
- Automated Checks: [List of automated validations run]
- Manual Review: [List of manual assessments performed]

**System Evaluator Version**: [X.Y]
**Audit Duration**: [X minutes/hours]
**Next Audit Scheduled**: [YYYY-MM-DD]

---

**Audit Status**: Complete
**Approval Required**: [Yes/No]
**Approved By**: [Human PM Name] (if applicable)
**Approval Date**: [YYYY-MM-DD] (if applicable)

---

**Generated by**: System Evaluator Agent v[X.Y]
**Report Location**: `execution/improvement_proposals/YYYY-MM-DD_QualityAudit_[scope].md`
**Related Artifacts**: [List of improvement proposals generated from this audit]
