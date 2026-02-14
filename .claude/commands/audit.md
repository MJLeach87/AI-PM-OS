Run a PM OS quality audit.

Invoke the System Evaluator to:
1. Scan `execution/` for all artifacts generated since the last audit
2. Evaluate against quality gates in `identity/STANDARDS.md`
3. Identify top 3-5 improvement opportunities
4. Generate improvement proposals in `execution/improvement_proposals/`
5. Update `pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md` with findings

Optional: Pass a specific focus area as $ARGUMENTS (e.g., "PRDs only", "agent routing accuracy")
