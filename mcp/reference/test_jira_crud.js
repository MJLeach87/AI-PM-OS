/**
 * Comprehensive Jira CRUD Test
 * Tests all MCP server operations with PM OS label conventions
 */

const jira = require('../mcp/servers/jira_server.js');

// PM OS Label Conventions
// Format: category-value
// Examples:
//   - phase-0, phase-1, phase-2, etc.
//   - agent-product-architect, agent-engineering-partner, etc.
//   - type-prd, type-spec, type-agent, type-template
//   - acceptance-100, acceptance-90, etc. (percentage)

async function runTests() {
  console.log('🧪 Starting comprehensive Jira CRUD tests...\n');

  let testEpicKey, testIssueKey;

  try {
    // Test 1: Connection
    console.log('Test 1: Connection');
    const connection = await jira.testConnection();
    console.log(`✅ Connected as: ${connection.user.displayName}\n`);

    // Test 2: Create Test Epic
    console.log('Test 2: Create Epic');
    const epic = await jira.createEpic({
      summary: 'TEST EPIC - Phase 4 MCP Integration (DELETE ME)',
      description: 'Test epic for validating Jira MCP server functionality'
    });
    testEpicKey = epic.key;
    console.log(`✅ Created epic: ${epic.key}\n`);

    // Test 3: Create Test Issue with Labels
    console.log('Test 3: Create Issue with PM OS labels');
    const issue = await jira.createIssue({
      summary: 'TEST ISSUE - Validate Jira MCP (DELETE ME)',
      description: 'Test issue for validating CRUD operations and label conventions',
      issuetype: 'Task',
      epicKey: testEpicKey,
      labels: [
        'phase-4',
        'agent-product-architect',
        'type-test',
        'acceptance-100'
      ]
    });
    testIssueKey = issue.key;
    console.log(`✅ Created issue: ${issue.key} with labels\n`);

    // Test 4: Get Issue
    console.log('Test 4: Get Issue');
    const retrievedIssue = await jira.getIssue(testIssueKey);
    console.log(`✅ Retrieved: ${retrievedIssue.summary}`);
    console.log(`   Status: ${retrievedIssue.status}`);
    console.log(`   Labels: ${retrievedIssue.labels.join(', ')}\n`);

    // Test 5: Update Issue
    console.log('Test 5: Update Issue');
    await jira.updateIssue(testIssueKey, {
      summary: 'TEST ISSUE - UPDATED (DELETE ME)',
      labels: [
        'phase-4',
        'agent-engineering-partner', // Changed agent
        'type-test',
        'acceptance-100'
      ]
    });
    console.log(`✅ Updated issue summary and labels\n`);

    // Test 6: Search Issues with JQL
    console.log('Test 6: Search Issues (JQL)');
    const searchResults = await jira.searchIssues(
      'project=PMOS AND labels="phase-4"',
      { maxResults: 10 }
    );
    console.log(`✅ Found ${searchResults.total} issues with label "phase-4"`);
    searchResults.issues.forEach(i => {
      console.log(`   - ${i.key}: ${i.summary}`);
    });
    console.log('');

    // Test 7: Search by multiple labels
    console.log('Test 7: Search by multiple labels');
    const multiLabelSearch = await jira.searchIssues(
      'project=PMOS AND labels="agent-engineering-partner" AND labels="type-test"',
      { maxResults: 10 }
    );
    console.log(`✅ Found ${multiLabelSearch.total} issues with both labels\n`);

    // Test 8: Get Project Info
    console.log('Test 8: Get Project');
    const project = await jira.getProject('PMOS');
    console.log(`✅ Project: ${project.name} (${project.key})`);
    console.log(`   Issue types: ${project.issueTypes.map(t => t.name).join(', ')}\n`);

    // Test 9: Delete Test Issue
    console.log('Test 9: Delete Test Issue');
    await jira.deleteIssue(testIssueKey);
    console.log(`✅ Deleted issue: ${testIssueKey}\n`);

    // Test 10: Delete Test Epic
    console.log('Test 10: Delete Test Epic');
    await jira.deleteIssue(testEpicKey);
    console.log(`✅ Deleted epic: ${testEpicKey}\n`);

    console.log('✅ All tests passed!\n');
    console.log('📋 PM OS Label Conventions Validated:');
    console.log('   - phase-{0-7}: Phase assignment');
    console.log('   - agent-{agent-name}: Agent owner');
    console.log('   - type-{artifact-type}: Artifact type');
    console.log('   - acceptance-{percentage}: Acceptance rate\n');

    console.log('Next steps:');
    console.log('1. Create 7 epics for PM OS phases 0-7');
    console.log('2. Bulk create 25-30 issues for completed phases');
    console.log('3. Integrate Product Architect v1.1 with Jira MCP\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);

    // Cleanup on error
    if (testIssueKey) {
      try {
        await jira.deleteIssue(testIssueKey);
        console.log(`🧹 Cleaned up test issue: ${testIssueKey}`);
      } catch (e) {
        // Issue might already be deleted or not exist
      }
    }

    if (testEpicKey) {
      try {
        await jira.deleteIssue(testEpicKey);
        console.log(`🧹 Cleaned up test epic: ${testEpicKey}`);
      } catch (e) {
        // Epic might already be deleted or not exist
      }
    }

    process.exit(1);
  }
}

runTests();
