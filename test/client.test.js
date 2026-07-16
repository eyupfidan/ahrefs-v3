const assert = require("node:assert/strict");
const test = require("node:test");
const AhrefsClient = require("..").default;

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

test("supports injected fetch implementations for browser and framework runtimes", async () => {
  const calls = [];
  const client = new AhrefsClient("test-token", {
    baseURL: "https://example.test",
    fetch: async (input, init) => {
      calls.push({ input, init });
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });

  const response = await client.siteExplorer.domainRating({
    params: { target: "ahrefs.com", output: "json" },
    config: { credentials: "include", mode: "cors" },
  });

  assert.deepEqual(response.data, { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].input.href, "https://example.test/site-explorer/domain-rating?target=ahrefs.com&output=json");
  assert.equal(calls[0].init.credentials, "include");
  assert.equal(calls[0].init.mode, "cors");
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-token");
});
