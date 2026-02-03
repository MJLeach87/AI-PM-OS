# Product Analytics Assessment Template

**Template Type**: Optional Reference Structure
**Purpose**: Provide a suggested format for translating product analytics into discovery opportunities - adapt analysis depth to your needs
**Philosophy**: Like the NSM framework's flexible metrics, analytics assessments can range from quick data checks to comprehensive cohort analyses. Choose the approach that fits your discovery objectives.

---

## When to Use This Template

**Consider referencing this structure when**:
- User provides analytics data, CSV exports, or requests data-driven discovery
- Collaborating with Data Analyst to explore product metrics
- Quantitative validation needed for qualitative insights (interviews/feedback)
- Baseline metrics required for PRD success criteria

**Feel free to adapt or skip when**:
- Quick metric lookup sufficient (no comprehensive assessment needed)
- Analytics insights can be incorporated directly into OST/PRD
- Qualitative discovery sufficient for current exploration phase
- Data Analyst provides custom analysis format better suited to question

**Note**: Full analytics capability requires Data Analyst collaboration (Phase 2+) or user-provided data exports (Phase 0-1).

---

## Optional Structure (Adapt as Needed)

### Analytics Context

**Analysis Objective**:
[What question are you trying to answer? What discovery goal drives this analysis?]

**Date Range**:
- **Primary Period**: [e.g., Q1 2026, Last 90 days]
- **Comparison Period**: [e.g., Q4 2025, Same period last year]

**Data Sources**:
- **Analytics Platform**: [e.g., Mixpanel, Amplitude, Google Analytics, CSV export]
- **Data Warehouse**: [e.g., Snowflake - Phase 4+]
- **Data Quality Notes**: [Any known gaps, sampling issues, tracking bugs?]

**Metrics Tracked**:
[List specific metrics analyzed - align with North Star Metrics where applicable]
- User Activation Rate
- Feature Adoption Rate
- Time-to-Value
- Retention (D1, D7, D30)
- Engagement Frequency
- [etc.]

---

### Key Metrics

**Metric 1: [Metric Name]**
- **Definition**: [How is this metric calculated?]
- **Current Value**: [X%/count/average]
- **Trend**: [↑ Increasing / ↓ Decreasing / → Stable]
- **Comparison to Baseline**: [+/-% vs. previous period]
- **Benchmark**: [Industry standard or internal target, if available]
- **Significance**: [Why does this metric matter? Maps to which North Star Metric?]

**Metric 2: [Metric Name]**
[Repeat structure for all key metrics - typically 3-6 metrics per assessment]

**Metric Summary Table**:
| Metric | Current | Previous Period | Change | Trend | Target |
|--------|---------|-----------------|--------|-------|--------|
| Activation Rate | 65% | 60% | +5pp | ↑ | 75% |
| D7 Retention | 40% | 45% | -5pp | ↓ | 50% |
| Feature Adoption | 30% | 25% | +5pp | ↑ | 40% |

---

### User Behavior Patterns

**Cohort Analysis**:
[Segment users by acquisition date, persona, plan type, etc.]

**Example: Retention by Cohort**
| Cohort | D1 | D7 | D30 | D90 | Insight |
|--------|-------|-------|-------|-------|---------|
| Jan 2026 | 80% | 40% | 25% | 15% | Drop at D7 - onboarding issue? |
| Dec 2025 | 85% | 50% | 35% | 25% | Improved retention after feature X launch |

**Behavioral Segments**:
- **Power Users (top 10% engagement)**: [How do they use the product? What features?]
- **Casual Users**: [Different patterns? Where do they drop off?]
- **At-Risk Users**: [What signals predict churn?]

**Feature Usage Patterns**:
| Feature | Adoption Rate | Frequency (DAU/MAU) | Power User Usage | Casual User Usage |
|---------|---------------|---------------------|------------------|-------------------|
| Feature A | 45% | 0.6 | Daily | Weekly |
| Feature B | 20% | 0.2 | Rarely | Never |

---

### Drop-off & Friction Points

**Funnel Analysis**:
[Identify where users drop off in key workflows]

**Example: Onboarding Funnel**
```
Step 1: Sign Up → 100% (baseline)
Step 2: Email Verification → 75% (25% drop)
Step 3: Profile Setup → 60% (15% drop)
Step 4: First Action → 45% (15% drop)
Step 5: Activation → 35% (10% drop)

Overall Conversion: 35%
```

**Friction Point Diagnosis**:
- **Step 2 (Email Verification)**: 25% drop
  - **Hypothesis**: Email not arriving? Verification process unclear?
  - **Supporting Data**: Avg. time to verify = 48 hours (users forget?)
  - **Opportunity**: Improve email deliverability + add in-app reminder

- **Step 4 (First Action)**: 15% drop
  - **Hypothesis**: Users don't know what to do after setup?
  - **Supporting Data**: 70% of users who complete step 4 within 5 minutes activate vs. 20% after 1+ hour delay
  - **Opportunity**: Add onboarding prompts/tutorial

**Page Performance**:
[If relevant - load times, errors impacting metrics]
- Dashboard load time: 3.2s avg (target: <2s)
- Error rate: 5% on Feature X (investigate?)

---

### Anomalies & Outliers

**Unexpected Patterns**:
- **Anomaly 1**: [What's unusual? Spike/drop in metric?]
  - **When**: [Date range]
  - **Magnitude**: [How big is the deviation?]
  - **Potential Causes**: [Release? Bug? External event?]
  - **Action**: [Investigate further? Monitor? Fix?]

**Segment Outliers**:
- **Enterprise users**: Retention 20pp higher than SMB (why?)
- **Mobile users**: Feature adoption 30% lower than web (friction?)

---

### Opportunity Hypotheses

**Data-Driven Opportunity 1: [Opportunity Name]**
- **Evidence**: [Which metrics/patterns support this opportunity?]
- **Problem Statement**: [What user need or friction does data reveal?]
- **Hypothesis**: [If we build/fix X, we expect Y metric to improve by Z%]
- **Impact Potential**: [Revenue? Retention? Activation? Map to North Star Metric]
- **Confidence**: High/Medium/Low [Based on data quality and sample size]

**Example**:
- **Opportunity**: Improve Email Verification Experience
- **Evidence**: 25% drop-off at email verification step; 48h avg. time to verify
- **Problem Statement**: Users lose momentum during onboarding waiting for email
- **Hypothesis**: If we add in-app email status + resend button, we can reduce drop-off from 25% → 15%
- **Impact Potential**: +10pp activation rate → +150 monthly activated users → $15K MRR (if 10% convert)
- **Confidence**: High (large sample size, clear friction point)

**Opportunity 2: [Opportunity Name]**
[Repeat structure for 3-5 opportunities]

**Opportunity Prioritization**:
| Opportunity | Impact (metric improvement) | Effort | Data Confidence | Priority |
|-------------|----------------------------|--------|-----------------|----------|
| Improve email verification | +10pp activation | S | High | P0 |
| Add onboarding tutorial | +5pp D7 retention | M | Medium | P1 |

---

### Validation Plan

**How to Test Hypotheses**:
1. **Opportunity 1 (Email Verification)**:
   - **Validation Method**: A/B test (control vs. in-app email status)
   - **Sample Size**: 1,000 users per variant (power analysis)
   - **Duration**: 2 weeks
   - **Success Metric**: Email verification drop-off <15% (vs. 25% baseline)

2. **Opportunity 2 (Onboarding Tutorial)**:
   - **Validation Method**: Prototype user testing (5-8 users)
   - **Duration**: 1 week
   - **Success Metric**: Time to first action <5 minutes for 80% of testers

**Monitoring Plan**:
[How will we track if opportunities pan out?]
- Weekly dashboard review: Activation rate, retention, feature adoption
- Automated alerts: If key metric drops >5% week-over-week
- Cohort tracking: Compare pre/post-launch cohorts

---

### Cross-Source Insights

**Qualitative + Quantitative Triangulation**:
[How does analytics data relate to interviews, feedback, trends?]

**Example**:
- **Analytics**: 25% drop at email verification (quantitative evidence)
- **Support Tickets**: 12 tickets about "didn't receive email" in Jan (qualitative validation)
- **User Interviews**: 3/5 participants mentioned onboarding confusion (qualitative context)
- **Synthesis**: Converging evidence → high-confidence opportunity

**Conflicting Signals**:
[Where do analytics and qualitative data disagree?]
- **Analytics**: Feature X adoption is low (20%)
- **Interviews**: Users love Feature X
- **Hypothesis**: Feature X delights those who find it, but discoverability is poor?

---

### Related Artifacts

**Informed By**:
- [Links to feedback syntheses, interview syntheses, trend analyses providing context]

**Informs**:
- [Links to OSTs where opportunities translated into solution trees]
- [Links to PRDs where metrics used as success criteria]
- [Links to A/B test plans, validation experiments]

**Cross-Reference**:
- See `execution/discovery/DISCOVERY_INDEX.md` for full research inventory (if maintaining index)

---

## Template Usage Tips

**Flexibility Reminders**:
- **Analysis Depth**: Quick metric check vs. comprehensive funnel analysis - choose based on discovery needs
- **Metric Selection**: Focus on metrics that matter for your discovery question (not all metrics)
- **Cohort Granularity**: Sometimes overall metrics sufficient; sometimes segment analysis critical
- **Combine with qualitative**: Analytics shows *what* is happening; interviews/feedback explain *why*

**Quality Over Quantity**:
- 3 high-confidence opportunities > 10 low-confidence hypotheses
- Deep analysis of 1 key metric > surface-level analysis of 20 metrics
- Actionable insights > comprehensive data dumps

**Evidence-Based Discovery**:
- Always note data quality and sample size (affects confidence)
- Distinguish correlation from causation (avoid claiming A caused B without evidence)
- Cite specific metrics, date ranges, and comparison periods for traceability

**Common Pitfalls**:
- **Vanity metrics**: Tracking metrics that look good but don't drive decisions
- **Analysis paralysis**: Over-analyzing data instead of forming hypotheses
- **Confirmation bias**: Only looking for data that supports pre-existing beliefs

---

## Analytics Assessment Patterns

**Pattern A: Baseline Metrics for PRD**
- Goal: Establish current state before feature launch
- Approach: Focus on 3-5 key metrics that new feature should impact
- Output: Baseline values + target improvements for PRD success criteria

**Pattern B: Funnel Optimization Discovery**
- Goal: Identify friction points in critical user journey
- Approach: Step-by-step funnel analysis + drop-off diagnosis
- Output: Prioritized list of friction points → OST opportunities

**Pattern C: Feature Post-Mortem**
- Goal: Understand why feature adoption is low/high
- Approach: Compare adopters vs. non-adopters, usage patterns, retention impact
- Output: Insights on what worked/didn't → inform future feature development

**Pattern D: Cohort Retention Analysis**
- Goal: Understand what drives long-term user engagement
- Approach: Compare cohorts, identify retention patterns, find "aha moments"
- Output: Hypotheses on activation drivers → onboarding/engagement improvements

---

## Integration with North Star Metrics

**NSM Framework Alignment**:
[How does this analytics assessment relate to PM OS North Star Metrics?]

**Example Mapping**:
- **NSM: 50% PRD Time Reduction**
  - Analytics: Track time spent in discovery phase (interviews + analytics)
  - Target: Discovery phase <4 hours

- **NSM: 4x Discovery Artifacts (2 → 8/week)**
  - Analytics: Count discovery artifacts generated weekly
  - Target: 8 artifacts/week sustained for 4 weeks

- **NSM: 2x Hypothesis-to-Halt Velocity**
  - Analytics: Track time from hypothesis formation → validation decision
  - Target: <1 week validation cycles

---

**Template Version**: 1.0
**Last Updated**: 2026-02-02
**Maintained By**: PM OS Product Architect + Data Analyst
**Related Templates**: interview_synthesis_template.md, feedback_synthesis_template.md, discovery_index_template.md
**Dependencies**: Requires Data Analyst collaboration (Phase 2+) or user-provided data exports (Phase 0-1)
