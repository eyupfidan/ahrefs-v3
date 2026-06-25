const assert = require("node:assert/strict");
const test = require("node:test");
const AhrefsClient = require("../dist/index.js").default;

test("creates resource methods for current Ahrefs API v3 endpoints", () => {
  const client = new AhrefsClient("test-token", { baseURL: "https://example.test" });

  assert.equal(typeof client.siteExplorer.domainRating, "function");
  assert.equal(typeof client.siteExplorer.backlinksStats, "function");
  assert.equal(typeof client.siteExplorer.getDomainRating, "function");
  assert.equal(typeof client.keywordsExplorer.overview, "function");
  assert.equal(typeof client.siteAudit.pageExplorer, "function");
  assert.equal(typeof client.rankTracker.competitorsStats, "function");
  assert.equal(typeof client.serpOverview.serpOverview, "function");
  assert.equal(typeof client.batchAnalysis.batchAnalysis, "function");
  assert.equal(typeof client.subscriptionInfo.limitsAndUsage, "function");
  assert.equal(typeof client.management.createProject, "function");
  assert.equal(typeof client.brandRadar.createAiResponses, "function");
  assert.equal(typeof client.webAnalytics.operatingSystemsVersionsChart, "function");
  assert.equal(typeof client.gsc.anonymousQueries, "function");
  assert.equal(typeof client.socialMedia.updatePost, "function");
  assert.equal(typeof client.public.domainRatingFree, "function");
});

test("exposes generated method aliases that include HTTP verbs", () => {
  const client = new AhrefsClient("test-token", { baseURL: "https://example.test" });

  assert.equal(typeof client.siteExplorer.getDomainRating, "function");
  assert.equal(typeof client.management.postProjects, "function");
  assert.equal(typeof client.management.patchUpdateProject, "function");
  assert.equal(typeof client.socialMedia.deletePost, "function");
});
