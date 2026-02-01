# Implementation Analysis: [Feature Name]

**Author**: Engineering Partner Agent
**Date**: [YYYY-MM-DD]
**PRD Reference**: `execution/prds/[link-to-prd].md`
**Feasibility Report**: `execution/technical_specs/[link-to-feasibility].md`

---

## Purpose

This document analyzes the existing codebase to identify optimal implementation strategies for the proposed feature, including reusable components, integration patterns, and refactoring opportunities.

---

## Existing Code Analysis

### Codebase Search Results

**Search Strategy**:
[Describe how you searched for relevant existing code: keywords, file patterns, function names]

**Relevant Files Identified**:
1. `[filepath]` (lines X-Y) - [Brief description of what this code does]
2. `[filepath]` (lines X-Y) - [Brief description]
3. `[filepath]` (lines X-Y) - [Brief description]

### Current Implementation Patterns

#### Pattern 1: [Pattern Name/Area]
**Location**: `[filepath]`
**Description**: [What this code currently does]
**Quality Assessment**: [High / Medium / Low]
- **Pros**: [Well-tested, clean architecture, good documentation]
- **Cons**: [Technical debt, poor performance, outdated patterns]

**Code Sample** (representative snippet):
```[language]
// [filepath:line-number]
[Relevant code excerpt showing current pattern]
```

**Maintainability Score**: [1-5 stars]
- **Test Coverage**: [High / Medium / Low / None]
- **Code Clarity**: [Clear / Moderate / Complex]
- **Documentation**: [Comprehensive / Partial / Missing]

#### Pattern 2: [Pattern Name/Area]
[Same structure as Pattern 1]

---

## Reusability Assessment

### ✅ Can Reuse (No Changes Needed)

#### Component/Utility 1: [Name]
**Location**: `[filepath]`
**Purpose**: [What it does]
**How to Use**:
```[language]
import { [function] } from '[filepath]';
// Usage example
[function]([params]);
```

**Why Reusable**:
- [Already handles the exact use case needed]
- [Well-tested with >90% coverage]
- [Matches required API contract]

#### Component/Utility 2: [Name]
[Same structure]

### ⚠️ Can Reuse with Enhancements

#### Component/Utility 1: [Name]
**Location**: `[filepath]`
**Current Functionality**: [What it does now]
**Enhancement Needed**: [What needs to be added/modified]

**Proposed Changes**:
```diff
// [filepath:line-number]
- [old code]
+ [new code with enhancement]
```

**Effort to Enhance**: [XS / S / M / L]
**Justification**: [Why enhance instead of build new]

**Risks**:
- [Breaking changes to existing functionality?]
- [Regression testing required?]

#### Component/Utility 2: [Name]
[Same structure]

### ❌ Cannot Reuse (Must Build New)

#### Existing Code 1: [Name]
**Location**: `[filepath]`
**Why Not Reusable**:
- [Tightly coupled to different domain]
- [Poor code quality, scheduled for deprecation]
- [Different architectural pattern (e.g., class-based vs functional)]

**What to Build Instead**:
[New component/module description]

---

## Integration Strategy

### Recommended Approach

**Strategy**: [Extend Existing / Build New Module / Hybrid]

**Justification**:
[Why this approach is optimal based on code analysis]

### Implementation Steps

#### Step 1: [Action]
**File(s) to Modify**: `[filepath]`, `[filepath]`
**Changes Required**:
- [Specific code change 1]
- [Specific code change 2]

**Effort**: [XS/S/M/L/XL]

#### Step 2: [Action]
**File(s) to Create**: `[new-filepath]`
**Purpose**: [What this new file will contain]
**Effort**: [XS/S/M/L/XL]

#### Step 3: [Action]
[Continue pattern]

**Total Estimated Effort**: [Sum of T-shirt sizes or overall assessment]

### Alternative Approach: [Greenfield Implementation]

**What This Means**: Build entirely new module without modifying existing code

**Pros**:
- [No risk of breaking existing functionality]
- [Clean architecture from scratch]

**Cons**:
- [Code duplication]
- [More effort: [Effort estimate]]
- [Maintenance of two similar systems]

**Rejected Because**: [Reasoning]

---

## Integration Points

### Database Integration

**Existing Schema**:
- **Tables to Read**: `[table_name]` - [columns needed]
- **Tables to Write**: `[table_name]` - [columns to populate]
- **New Tables Required**: [Yes/No]

**Schema Changes Needed**:
```sql
-- Migration script preview
ALTER TABLE [table_name] ADD COLUMN [column] [type];
CREATE INDEX [index_name] ON [table]([column]);
```

**Data Migration**: [Required / Not Required]
- **Scope**: [How many records affected]
- **Downtime**: [Required / Zero-downtime possible]

### API Integration

**Existing Endpoints to Use**:
- `GET /api/v1/[endpoint]` - [Purpose]
- `POST /api/v1/[endpoint]` - [Purpose]

**New Endpoints to Create**:
- `[METHOD] /api/v1/[new-endpoint]` - [Purpose]

**Versioning Strategy**: [Use existing v1 / Create v2 / Add optional params]

### Frontend Integration

**Existing Components to Extend**:
- `[ComponentName]` (`[filepath]`) - [How to extend]

**New Components to Create**:
- `[NewComponent]` - [Purpose and location]

**State Management**:
- **Existing State**: [Redux slice / Context / Component state to tap into]
- **New State Needed**: [What to add]

---

## Refactoring Recommendations

### High Priority (Address Before Implementation)

#### Refactoring 1: [Issue Name]
**Location**: `[filepath]`
**Problem**: [Code smell, technical debt description]
**Impact**: [Why this blocks new feature implementation]

**Proposed Refactoring**:
```diff
// Before
[current problematic code]

// After
[refactored code]
```

**Effort**: [XS/S/M/L/XL]
**Why High Priority**: [New feature cannot be cleanly integrated without this fix]

### Medium Priority (Improve During Implementation)

#### Refactoring 2: [Issue Name]
**Location**: `[filepath]`
**Problem**: [Technical debt description]
**Opportunity**: [Since we're touching this code anyway, we can improve it]

**Effort**: [XS/S/M/L/XL]
**Benefits**: [Improved maintainability, performance gain, reduced duplication]

### Low Priority (Defer to Tech Debt Backlog)

#### Refactoring 3: [Issue Name]
**Location**: `[filepath]`
**Problem**: [Code smell, but not blocking]
**Recommendation**: [Create tech debt ticket for future sprint]

---

## Architectural Considerations

### Current Architecture Pattern
[Description of existing architecture: MVC, microservices, monolith, etc.]

**Diagram** (if helpful):
```
[Simple text diagram showing current architecture]
```

### How New Feature Fits

**Alignment**: [Does new feature follow existing patterns?]
- **Fits Well**: [Aspects that align cleanly]
- **Deviates**: [Where new feature diverges from current patterns]

**Recommended Pattern for New Code**:
[Should match existing OR introduce new pattern with justification]

### Backward Compatibility

**Breaking Changes**: [Yes / No]

**If Yes**:
- **What Breaks**: [Existing functionality that will change]
- **Migration Path**: [How to handle existing users/data]
- **Deprecation Timeline**: [When old functionality will be removed]

**If No**:
- **Assurance**: [How we ensure no regressions]

---

## Code Quality Improvements

### Testing Gaps in Existing Code

**Files Lacking Tests**:
- `[filepath]` - [Current coverage: X%]
- [More files]

**Recommendation**: [Add tests for existing code while implementing new feature]

**Effort**: [XS/S/M/L/XL additional testing effort]

### Documentation Gaps

**Undocumented Code**:
- `[filepath]` - [Missing API docs, inline comments]

**Recommendation**: [Document while integrating]

---

## Implementation Risks

### Risk 1: [Regression in Existing Functionality]
**Probability**: [H/M/L]
**Impact**: [H/M/L]
**Mitigation**:
- [Comprehensive regression testing]
- [Feature flag to isolate new code]
- [Staged rollout]

### Risk 2: [Merge Conflicts / Parallel Development]
**Probability**: [H/M/L]
**Impact**: [H/M/L]
**Mitigation**:
- [Coordinate with [Team/Person] working on [related feature]]
- [Lock affected files during implementation]

### Risk 3: [Performance Degradation]
**Probability**: [H/M/L]
**Impact**: [H/M/L]
**Mitigation**:
- [Benchmark before and after changes]
- [Optimize hot paths identified in analysis]

---

## Dependencies on Other Work

### Blocked By
[Work that must complete before this implementation can start]

- [ ] **[Prerequisite 1]**: [Description, owner, ETA]
- [ ] **[Prerequisite 2]**: [Description]

### Blocks
[Work that is waiting on this implementation]

- **[Dependent Feature 1]**: [Why it depends on this]

---

## Effort Estimate

### Total Implementation Effort

| Task | Effort |
|------|--------|
| **Reuse Existing Components** | [XS/S/M/L/XL] |
| **Enhance Existing Components** | [XS/S/M/L/XL] |
| **Build New Components** | [XS/S/M/L/XL] |
| **High-Priority Refactoring** | [XS/S/M/L/XL] |
| **Integration Work** | [XS/S/M/L/XL] |
| **Testing (Unit + Integration)** | [XS/S/M/L/XL] |
| **Documentation** | [XS/S/M/L/XL] |
| **TOTAL** | **[Overall T-shirt size]** |

**Comparison to Greenfield**:
- **Reusing Existing Code**: [Overall estimate]
- **Building From Scratch**: [Estimate if no code reuse]
- **Savings**: [X% effort reduction by reusing existing code]

---

## Recommendation

**Integration Strategy**: [Extend Existing / Build New / Hybrid]

**Key Integration Points**:
1. [Primary file/module to extend]
2. [Secondary integration point]

**Critical Path**:
1. [First step that unblocks everything else]
2. [Second critical step]

**When to Start Implementation**:
- [After [prerequisite] is complete]
- [Once [decision] is finalized]

---

## Related Artifacts

**PRD**: `execution/prds/[filename].md`
**Feasibility Report**: `execution/technical_specs/[filename].md`
**API Spec** (if needed): `execution/technical_specs/[filename].yaml`
**Relevant Existing Tests**: `[test-filepath]`

---

**Implementation Analysis Status**: [Draft / Completed / Approved]
**Reviewed By**: Engineering Partner Agent v[X.X]
**Human Review Required**: [Yes / No]
**Last Updated**: [YYYY-MM-DD]
