# Agent Specification: [Agent Name]

## Overview

**Agent Type**: [Discovery / Technical / Analysis / Communication / Meta]
**Primary Owner**: [Which agent generated this spec]
**Created**: [YYYY-MM-DD]
**Status**: [Draft / Active / Deprecated]

**Purpose Statement**:
[1-2 sentences explaining why this agent exists and what unique value it provides]

---

## Capabilities

### Core Functions
[List the 3-5 primary tasks this agent performs]

1. **[Capability Name]**
   - Description: [What it does]
   - Input: [What information is needed]
   - Output: [What artifact/format is produced]
   - Example: [Concrete use case]

2. **[Capability Name]**
   - Description:
   - Input:
   - Output:
   - Example:

3. **[Capability Name]**
   - Description:
   - Input:
   - Output:
   - Example:

### Secondary Functions
[Optional supporting capabilities]

---

## Triggers & Routing

### Automatic Activation Patterns
[File glob patterns or keywords that route tasks to this agent via Orchestrator]

**File Patterns**:
- `execution/[specific-type]/**/*.md`
- `docs/[specific-topic]/**/*`

**Keyword Triggers**:
- User message contains: "[specific phrase]"
- Task involves: "[specific domain term]"

**Workflow Triggers**:
- Invoked by: [Other Agent Name] when [specific condition]
- Follows completion of: [Previous workflow step]

### Manual Invocation
[How users explicitly request this agent]
- Cursor: [Specific @mention or command]
- Claude Code: [Specific prompt pattern]

---

## Context Requirements

### Identity Layer Dependencies
[Which files from identity/ must be loaded into context]

**Required**:
- `identity/STRATEGY.md` - [Why needed]
- `identity/STANDARDS.md` - [Why needed]

**Optional**:
- `identity/MARKET.md` - [When needed]
- `identity/DATA_DICTIONARY.md` - [When needed]

### External Data Sources
[MCP integrations or other external context needed]

- **[MCP Service Name]**: [What data is retrieved and why]
- **[Local File Path]**: [What reference data is needed]

### Agent Dependencies
[Other agents that must be consulted or whose outputs are required]

- **[Agent Name]**: [What is needed from them]

---

## Non-Negotiables

### Quality Standards
[Specific requirements that outputs MUST satisfy]

- [ ] [Specific quality criterion with measurable definition]
- [ ] [Security requirement]
- [ ] [Format requirement]
- [ ] [Validation requirement]

### Security & Compliance
[Security-specific requirements beyond general standards]

- [ ] [Data handling requirement]
- [ ] [Access control requirement]
- [ ] [Audit logging requirement]

### Validation Gates
[Checks before output is considered complete]

- [ ] [Technical validation - e.g., "All SQL queries tested"]
- [ ] [Business validation - e.g., "Metrics align with STRATEGY.md"]
- [ ] [Human review - e.g., "Engineering Partner approval required"]

---

## Output Formats

### Primary Artifacts
[Detailed specification of what this agent produces]

**Artifact Type**: [e.g., PRD, Technical Spec, OST, Prototype]
**Template**: `templates/[template-file].md`
**Storage Location**: `execution/[artifact-type]/`
**Naming Convention**: `YYYY-MM-DD_[agent-name]_[brief-title].md`

**Structure**:
```
[Outline of expected sections/format]
```

**Example Output**:
[Link to real example or inline abbreviated example]

---

## Workflow Integration

### Typical Sequences

**Sequence 1**: [Common workflow name]
```
[Previous Agent] → THIS AGENT → [Next Agent]
```
Description: [When this sequence is used]

**Sequence 2**: [Alternative workflow name]
```
[Different flow]
```
Description: [When this alternative is used]

### Parallel Processing
[When this agent can operate simultaneously with others]

- Can run in parallel with: [Agent Name(s)]
- Must run sequentially after: [Agent Name(s)]

---

## Performance Expectations

### Speed Targets
- **Simple tasks**: [Time estimate or "< N minutes"]
- **Complex tasks**: [Time estimate or "< N minutes"]
- **Research-heavy**: [Time estimate or depends on X]

### Quality Metrics
- **Acceptance rate**: [Target % of outputs approved without major changes]
- **Rework reduction**: [Target % compared to manual baseline]
- **Stakeholder satisfaction**: [Target rating]

---

## Examples & Test Cases

### Example 1: [Use Case Name]
**Input**:
```
[User prompt or workflow trigger]
```

**Expected Output**:
```
[Abbreviated example of correct output]
```

**Validation**:
- [ ] [How to verify correctness]

### Example 2: [Use Case Name]
**Input**:
```
[Different scenario]
```

**Expected Output**:
```
[Abbreviated example]
```

**Validation**:
- [ ] [How to verify correctness]

---

## Known Limitations

### What This Agent Does NOT Do
[Explicit boundaries to prevent scope creep]

- ❌ [Task that might seem related but is out of scope]
- ❌ [Common misconception about capabilities]
- ❌ [Handoff point where other agent takes over]

### Edge Cases Requiring Human Judgment
[Scenarios where agent should defer to human PM]

- [Complex decision requiring strategic trade-offs]
- [High-risk decision with compliance implications]
- [Novel situation without clear precedent]

---

## Improvement History

### Version Log
| Version | Date | Changes | Reason |
|---------|------|---------|--------|
| 1.0 | YYYY-MM-DD | Initial specification | [Agent Name] generated during [Phase] |
| 1.1 | YYYY-MM-DD | [Specific change] | [Reason for update] |

### Self-Improvement Opportunities
[Tracked by System Evaluator in Phase 3+]

- [Identified gap or enhancement opportunity]
- [Pattern of recurring issues to address]

---

## References

**Related Agents**:
- [Agent Name]: [Relationship description]

**Related Templates**:
- `templates/[template-name].md`

**Related Documentation**:
- `docs/[doc-name].md`

**External Resources**:
- [Methodology or framework this agent implements]

---

**Specification Status**: [Draft / Active / Deprecated]
**Next Review Date**: [YYYY-MM-DD]
**Owner for Updates**: [Agent Name or Human PM]
