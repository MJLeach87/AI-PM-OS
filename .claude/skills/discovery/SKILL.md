---
name: discovery
description: Run a comprehensive PM OS discovery workflow. Goes beyond OST generation — synthesizes customer interviews, feedback data, and qualitative research into insights first, then generates evidence-grounded opportunity artifacts.
---

You are running a PM OS discovery workflow for: $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

### 1. Load Strategic Context
- Read `identity/STRATEGY.md` — all opportunities must connect to North Star Metrics
- Read `identity/STANDARDS.md` — apply evidence-based decision making standards

### 2. Audit Existing Research
Check `execution/discovery/` for any existing materials related to $ARGUMENTS:
- Customer interview transcripts or summaries
- Feedback data (NPS comments, support tickets, survey responses)
- Prior OSTs or discovery artifacts on this topic
- Analytics insights or baseline metrics

If materials exist, load them. If the user has provided research in this message, work with that directly.

### 3. Synthesize Research → Extract Insights
**This step is required before generating any OST or opportunity artifact.**

For each research source available (interviews, feedback, analytics):
- Extract verbatim or paraphrased evidence quotes
- Identify recurring themes (need ≥2 independent sources to elevate a theme)
- Categorize: Pain Points / Unmet Needs / Workarounds / Delight Moments / Mental Models
- Note frequency and severity for each theme

Produce an **Insights Summary**:
```
## Insights Summary: [Topic]

### Theme 1: [Name]
- Frequency: [N of N sources]
- Severity: High / Medium / Low
- Evidence: "[verbatim quote or paraphrase]" — [source]
- Evidence: "[verbatim quote or paraphrase]" — [source]
- Implication: [What this means for product direction]

### Theme 2: [Name]
...
```

Save insights to `execution/discovery/YYYY-MM-DD_Insights_[topic].md` before proceeding.

### 4. Identify Opportunities
From the synthesized insights, derive product opportunities:
- What problems are frequent AND severe enough to address?
- Which unmet needs align with our North Star Metrics (identity/STRATEGY.md)?
- What's the opportunity size (how many users affected, what's the business impact)?
- Are there quick wins vs. strategic bets? Distinguish clearly.

### 5. Generate Opportunity Artifact (choose based on scope)

> For structured discovery cataloging across multiple artifacts, see `templates/discovery_index_template.md` (optional).

**For broad problem space exploration → Opportunity Solution Tree (OST)**
- Root: The outcome aligned to a North Star Metric
- Opportunities: Problems/needs from insight themes (cite evidence)
- Solutions: Potential approaches (do not over-specify at this stage)
- Format: Mermaid diagram + Evidence section citing specific research
- Save to `execution/discovery/YYYY-MM-DD_OST_[topic].md`

**For a specific user journey or workflow → User Flow + Pain Point Map**
- Map current state with friction points annotated
- Note where evidence was observed
- Save to `execution/discovery/YYYY-MM-DD_UserFlow_[topic].md`

**For competitive or market framing → Problem Statement + Market Context**
- Structured problem statement: [User] struggles to [job] because [obstacle], resulting in [impact]
- Market evidence: competitor approaches, analyst data if available
- Save to `execution/discovery/YYYY-MM-DD_ProblemStatement_[topic].md`

### 6. Cite All Evidence
Every opportunity in the output must cite at minimum one piece of evidence. Uncited opportunities must be marked as **[ASSUMPTION — validate]**.

### 7. Offer Next Steps
- OST complete → offer Product Architect to generate PRD for highest-priority opportunity
- Insights summary complete → offer Data Analyst to validate quantitative baseline for top themes
- If major gaps in research: specify what additional data would most de-risk the top opportunities

### 8. Publish to Confluence
For each artifact saved in steps 3 and 5, publish to the PM OS Confluence space using the idempotency pattern:

1. **Search** for an existing page matching the artifact title in space `PM`
   - Cloud ID: `d1d9d612-3182-4d76-ad10-bce2f315b8f3`
2. **If found** → call `updateConfluencePage` with the existing page ID
3. **If not found** → call `createConfluencePage` under parent page ID `1146881` (PM OS - Discovery)
4. **Confirm**: State each published page title and URL to the user

**Title conventions**:
- Insights → `Insights: [topic]`
- OST → `OST: [topic]`
- User Flow → `User Flow: [topic]`
- Problem Statement → `Problem Statement: [topic]`

**Content**: Artifact markdown (same content written to `execution/discovery/`)
