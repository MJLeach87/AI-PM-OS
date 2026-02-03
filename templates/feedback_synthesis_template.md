# Customer Feedback Synthesis Template

**Template Type**: Optional Reference Structure
**Purpose**: Provide a suggested format for synthesizing customer feedback data (NPS, surveys, support tickets, feature requests) - adapt to fit your analysis needs
**Philosophy**: This template offers a starting structure, not a mandatory workflow. Choose the depth and format that serves your discovery objectives.

---

## When to Use This Template

**Consider referencing this structure when**:
- User provides NPS comments, survey responses, or support ticket exports
- Feature request logs need thematic analysis
- Quantifying feedback volume/sentiment supports discovery goals
- Triangulating feedback with interview or analytics data

**Feel free to adapt or skip when**:
- Single source of feedback can be summarized narratively
- Feedback directly feeds into existing OST (no separate synthesis needed)
- Quick sentiment check sufficient (no comprehensive analysis required)
- Alternative format better suits your discovery approach

---

## Optional Structure (Adapt as Needed)

### Feedback Sources

**Data Collection Period**:
[Date range: e.g., Q1 2026, January 2026, Last 90 days]

**Sources Overview**:
| Source Type | Volume | Date Range | Collection Method |
|-------------|--------|------------|-------------------|
| NPS Comments | 150 responses | 2026-01-01 to 2026-01-31 | Post-purchase survey |
| Support Tickets | 45 tickets | 2026-01-01 to 2026-01-31 | Zendesk exports |
| Feature Requests | 30 requests | 2026-01-01 to 2026-01-31 | ProductBoard |
| In-App Feedback | 80 submissions | 2026-01-01 to 2026-01-31 | Feedback widget |

**Total Feedback Volume**: [X pieces of feedback analyzed]

**Response Rate** (if applicable):
- Survey sent to: [Y users]
- Response rate: [X/Y = Z%]
- Statistical significance: [Yes/No - note if sample too small]

---

### Volume & Distribution

**Feedback by Category**:
```
[Optional: Simple visualization or table showing feedback distribution]

Product Feature Requests: 45% (135 items)
Bug Reports: 25% (75 items)
Usability Issues: 20% (60 items)
Pricing/Billing: 10% (30 items)
```

**Feedback by Source**:
- **NPS Comments**: [Breakdown by score - Promoters/Passives/Detractors]
- **Support Tickets**: [Breakdown by priority/category]
- **Feature Requests**: [Breakdown by theme]

**Trend Analysis**:
[Compare to previous period if available]
- Feature requests: +15% vs. Q4 2025
- Bug reports: -10% vs. Q4 2025 (improvement!)
- Usability issues: +30% vs. Q4 2025 (flag for investigation)

---

### Sentiment Analysis

**Overall Sentiment**:
- **Positive**: X% [Themes: What are users praising?]
- **Neutral**: Y% [Themes: What's functional but unremarkable?]
- **Negative**: Z% [Themes: What's frustrating users?]

**NPS Score** (if applicable):
- **Promoters (9-10)**: X% [What delights them?]
- **Passives (7-8)**: Y% [What would convert them to promoters?]
- **Detractors (0-6)**: Z% [What's causing churn risk?]
- **Net Promoter Score**: [Promoters% - Detractors%]

**Sentiment by Feature/Area**:
| Product Area | Positive | Neutral | Negative | Key Sentiment Driver |
|--------------|----------|---------|----------|----------------------|
| Onboarding | 60% | 30% | 10% | "Easy to get started" |
| Collaboration | 30% | 40% | 30% | "Real-time sync is buggy" |
| Reporting | 20% | 50% | 30% | "Limited export options" |

---

### Top Themes

**Theme 1: [Theme Name]**
- **Volume**: X mentions across Y sources
- **Sentiment**: Positive/Negative/Mixed
- **Representative Quotes**:
  > "Direct quote from NPS comment" — Promoter, Enterprise user

  > "Support ticket excerpt" — Ticket #12345
- **Context**: [When does this theme surface? New users? Power users? Specific workflows?]
- **Related Pain Points**: [Link to pain points section if negative theme]

**Theme 2: [Theme Name]**
[Repeat structure for top 5-7 themes]

**Theme Frequency Ranking**:
1. [Theme 1] - X mentions
2. [Theme 2] - Y mentions
3. [Theme 3] - Z mentions
[Continue for all major themes]

---

### Actionable Insights

**Insight 1: [Discovery Insight]**
- **Evidence**: [Which theme(s), quotes, data points support this?]
- **Volume**: [How many users mentioned this? Is it widespread or niche?]
- **Opportunity**: [What could we build/fix/improve?]
- **Priority Signal**: [High/Medium/Low based on volume + sentiment + strategic fit]

**Insight 2: [Discovery Insight]**
[Repeat structure]

**Prioritized Opportunities**:
| Opportunity | Volume | Sentiment Impact | Strategic Alignment | Priority |
|-------------|--------|------------------|---------------------|----------|
| [Opportunity from feedback] | High | High (detractors→promoters) | ✅ Aligns with Q1 OKRs | P0 |
| [Another opportunity] | Medium | Medium | ⚠️ Adjacent to roadmap | P1 |

---

### Feature Request Analysis

**Top Requested Features**:
1. **[Feature Name]**: X requests
   - **User Need**: [What job are they trying to do?]
   - **Current Workaround**: [How do they solve this today?]
   - **Business Impact**: [Revenue/retention/acquisition driver?]

2. **[Feature Name]**: Y requests
   [Repeat structure]

**Feature Request Clustering**:
```
[Group related requests into themes]
Real-Time Collaboration (25 requests):
  - Multi-user editing (15)
  - Live cursors (5)
  - Conflict resolution (5)

Advanced Reporting (18 requests):
  - Custom dashboards (10)
  - Scheduled exports (5)
  - API access to data (3)
```

---

### Bug Reports & Usability Issues

**Critical Bugs** (High frequency or high severity):
| Bug Description | Frequency | Severity | User Impact |
|-----------------|-----------|----------|-------------|
| [Bug summary] | X reports | High | [Impact on workflow] |
| [Bug summary] | Y reports | Medium | [Impact on workflow] |

**Usability Friction Points**:
- **[Friction Point]**: Z mentions → [What's confusing/slow/error-prone?]
- **[Friction Point]**: W mentions → [What's the root cause?]

**Patterns**:
[Do bugs cluster around specific features? Recent releases? User segments?]

---

### Divergent Feedback

**Where Users Disagree**:
- **Topic**: [What's the disagreement about?]
- **Perspective A**: [X users love Feature Y]
- **Perspective B**: [Z users find Feature Y unnecessary]
- **Hypothesis**: [Why might this divergence exist? Persona? Use case? Maturity?]

**Segment-Specific Feedback**:
- **Enterprise Users**: [What do they uniquely care about?]
- **SMB Users**: [Different priorities?]
- **Power Users vs. Casual Users**: [Usage pattern differences?]

---

### Feedback Gaps & Follow-Up

**What Feedback Doesn't Tell Us**:
- [ ] [Unanswered question - feedback is sparse or contradictory]
- [ ] [Hypothesis that needs qualitative validation via interviews]
- [ ] [Metric we need to measure (transition to analytics assessment)]

**Recommended Next Steps**:
- [ ] Interview users who mentioned [Theme X] to understand deeper context
- [ ] Analyze analytics for [Feature Y] to quantify usability friction
- [ ] Prototype [Solution Z] for validation with detractors

---

### Related Artifacts

**Informed By**:
- [Links to interview synthesis, analytics assessments, trend analyses that complement this feedback]

**Informs**:
- [Links to OSTs, PRDs, bug fix backlogs that reference this feedback synthesis]

**Cross-Reference**:
- See `execution/discovery/DISCOVERY_INDEX.md` for full research inventory (if maintaining index)

---

## Template Usage Tips

**Flexibility Reminders**:
- **Adapt to data type**: NPS synthesis looks different from support ticket analysis
- **Volume matters**: 5 feedback items = narrative summary; 500 items = structured quantification
- **Combine sources**: Merge feedback + interviews if they address same discovery question
- **Skip irrelevant sections**: Not all feedback has sentiment trends or feature requests

**Quality Signals**:
- **Frequency ≠ Importance**: 1 enterprise customer request may outweigh 50 SMB requests depending on strategy
- **Verbatim quotes**: Use real user language to bring feedback to life
- **Actionable > Comprehensive**: Focus on insights that drive decisions, not exhaustive categorization

**Evidence-Based Discovery**:
- Cite feedback source IDs for traceability (Ticket #, NPS Response #)
- Quantify where possible (X mentions, Y% sentiment)
- Connect feedback to strategic context (does this align with North Star Metrics?)

---

## Common Feedback Synthesis Patterns

**Pattern A: NPS Comment Analysis**
- Focus on promoter praise (what to amplify?) + detractor complaints (what to fix?)
- Passives reveal "almost great" opportunities
- Track NPS trends over time to validate product improvements

**Pattern B: Support Ticket Clustering**
- Group by root cause, not symptom
- High-frequency tickets = usability/reliability gaps
- Tickets declining over time = successful fixes

**Pattern C: Feature Request Prioritization**
- Volume × Strategic Fit × User Segment Value = Priority
- Look for requests from high-LTV customers
- Cluster requests into themes (10 small requests may = 1 major feature opportunity)

---

**Template Version**: 1.0
**Last Updated**: 2026-02-02
**Maintained By**: PM OS Product Architect
**Related Templates**: interview_synthesis_template.md, analytics_assessment_template.md, discovery_index_template.md
