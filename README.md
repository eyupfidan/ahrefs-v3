# Ahrefs API v3 Node.js Client

A small, type-friendly npm package for calling Ahrefs API v3 from Node.js and TypeScript projects.

The client follows the current Ahrefs API v3 resource structure and exposes methods for every endpoint listed in the official documentation: Site Explorer, Keywords Explorer, Site Audit, Rank Tracker, SERP Overview, Batch Analysis, Subscription Information, Management, Brand Radar, Web Analytics, GSC Insights, Social Media, and Public endpoints.

## Installation

```shell
npm install ahrefs-v3
```

## Quick start

```js
const { AhrefsClient } = require("ahrefs-v3");

const ahrefs = new AhrefsClient(process.env.AHREFS_API_TOKEN);

async function main() {
  const response = await ahrefs.siteExplorer.domainRating({
    params: {
      target: "ahrefs.com",
      date: "2026-06-25",
      output: "json",
      protocol: "both",
    },
  });

  console.log(response.data);
}

main().catch(console.error);
```

TypeScript:

```ts
import AhrefsClient from "ahrefs-v3";

const ahrefs = new AhrefsClient(process.env.AHREFS_API_TOKEN!);

const { data } = await ahrefs.keywordsExplorer.overview({
  params: {
    country: "us",
    keywords: ["seo", "keyword research"],
  },
});
```

## Request shape

All endpoint methods accept the same object:

```ts
await ahrefs.siteExplorer.organicKeywords({
  params: {
    target: "example.com",
    mode: "domain",
    country: "us",
    limit: 100,
    output: "json",
  },
  data: undefined, // used for POST, PUT, PATCH, DELETE bodies when the endpoint supports it
  config: {
    // optional request config, for example custom headers or signal
  },
});
```

Every method returns an `AhrefsResponse`, so you can read `response.data`, `response.status`, and response headers.

## Client options

```js
const ahrefs = new AhrefsClient("YOUR_API_TOKEN", {
  timeout: 30_000,
  headers: {
    "User-Agent": "my-app/1.0.0",
  },
});
```

## Endpoint methods

Each endpoint has a readable camelCase method name and an HTTP-verb alias. For example, `siteExplorer.domainRating(...)` and `siteExplorer.getDomainRating(...)` call the same endpoint.

### Site Explorer

Base API resource: `/site-explorer`

| Method | Endpoint |
| --- | --- |
| `siteExplorer.domainRating()` / `siteExplorer.getDomainRating()` | `GET /domain-rating` |
| `siteExplorer.backlinksStats()` / `siteExplorer.getBacklinksStats()` | `GET /backlinks-stats` |
| `siteExplorer.outlinksStats()` | `GET /outlinks-stats` |
| `siteExplorer.metrics()` | `GET /metrics` |
| `siteExplorer.aiResponsesCount()` | `GET /ai-responses-count` |
| `siteExplorer.refdomainsHistory()` | `GET /refdomains-history` |
| `siteExplorer.domainRatingHistory()` | `GET /domain-rating-history` |
| `siteExplorer.urlRatingHistory()` | `GET /url-rating-history` |
| `siteExplorer.pagesHistory()` | `GET /pages-history` |
| `siteExplorer.metricsHistory()` | `GET /metrics-history` |
| `siteExplorer.keywordsHistory()` | `GET /keywords-history` |
| `siteExplorer.metricsByCountry()` | `GET /metrics-by-country` |
| `siteExplorer.pagesByTraffic()` | `GET /pages-by-traffic` |
| `siteExplorer.totalSearchVolumeHistory()` | `GET /total-search-volume-history` |
| `siteExplorer.allBacklinks()` | `GET /all-backlinks` |
| `siteExplorer.brokenBacklinks()` | `GET /broken-backlinks` |
| `siteExplorer.refdomains()` | `GET /refdomains` |
| `siteExplorer.anchors()` | `GET /anchors` |
| `siteExplorer.organicKeywords()` | `GET /organic-keywords` |
| `siteExplorer.organicCompetitors()` | `GET /organic-competitors` |
| `siteExplorer.topPages()` | `GET /top-pages` |
| `siteExplorer.paidPages()` | `GET /paid-pages` |
| `siteExplorer.pagesByBacklinks()` | `GET /pages-by-backlinks` |
| `siteExplorer.pagesByInternalLinks()` | `GET /pages-by-internal-links` |
| `siteExplorer.crawledPages()` | `GET /crawled-pages` |
| `siteExplorer.linkedDomains()` | `GET /linkeddomains` |
| `siteExplorer.linkedAnchorsExternal()` | `GET /linked-anchors-external` |
| `siteExplorer.linkedAnchorsInternal()` | `GET /linked-anchors-internal` |

### Other Ahrefs API resources

| Resource | Methods |
| --- | --- |
| `keywordsExplorer` | `overview`, `volumeHistory`, `volumeByCountry`, `matchingTerms`, `relatedTerms`, `searchSuggestions` |
| `siteAudit` | `projects`, `issues`, `pageContent`, `pageExplorer` |
| `rankTracker` | `overview`, `serpOverview`, `competitorsOverview`, `competitorsPages`, `competitorsDomains`, `competitorsStats` |
| `serpOverview` | `serpOverview` |
| `batchAnalysis` | `batchAnalysis` (`POST`) |
| `subscriptionInfo` | `limitsAndUsage` |
| `management` | `projects`, `createProject`, `updateProject`, `projectKeywords`, `putProjectKeywords`, `deleteProjectKeywords`, `addProjectKeywordsTags`, `deleteProjectKeywordsTags`, `projectCompetitors`, `createProjectCompetitors`, `deleteProjectCompetitors`, `locations`, `keywordListKeywords`, `putKeywordListKeywords`, `deleteKeywordListKeywords`, `brandRadarPrompts`, `createBrandRadarPrompts`, `deleteBrandRadarPrompts`, `brandRadarReports`, `createBrandRadarReports`, `updateBrandRadarReports` |
| `brandRadar` | `aiResponses`, `createAiResponses`, `citedPages`, `createCitedPages`, `citedDomains`, `createCitedDomains`, `impressionsOverview`, `createImpressionsOverview`, `createCitationsOverview`, `mentionsOverview`, `createMentionsOverview`, `sovOverview`, `createSovOverview`, `impressionsHistory`, `createImpressionsHistory`, `createCitationsHistory`, `mentionsHistory`, `createMentionsHistory`, `sovHistory`, `createSovHistory` |
| `webAnalytics` | `stats`, `chart`, `sourceChannels`, `sourceChannelsChart`, `sources`, `sourcesChart`, `referrers`, `referrersChart`, `utmParams`, `utmParamsChart`, `entryPages`, `entryPagesChart`, `exitPages`, `exitPagesChart`, `topPages`, `topPagesChart`, `cities`, `citiesChart`, `continents`, `continentsChart`, `countries`, `countriesChart`, `languages`, `languagesChart`, `browsers`, `browsersChart`, `browserVersions`, `browserVersionsChart`, `devices`, `devicesChart`, `operatingSystems`, `operatingSystemsChart`, `operatingSystemsVersions`, `operatingSystemsVersionsChart` |
| `gsc` | `performanceHistory`, `positionsHistory`, `pagesHistory`, `performanceByDevice`, `metricsByCountry`, `ctrByPosition`, `performanceByPosition`, `keywordHistory`, `keywords`, `pageHistory`, `pages`, `anonymousQueries` |
| `socialMedia` | `channels`, `channelMetrics`, `authors`, `activityHistory`, `posts`, `postMetrics`, `createPost`, `deletePost`, `updatePost` |
| `public` | `crawlerIps`, `crawlerIpRanges`, `domainRatingFree` |

## Examples

### POST Batch Analysis

```js
await ahrefs.batchAnalysis.batchAnalysis({
  data: {
    targets: ["ahrefs.com", "example.com"],
  },
});
```

### Management endpoint with request body

```js
await ahrefs.management.createProject({
  data: {
    url: "https://example.com",
    name: "Example",
  },
});
```

### Public endpoint

```js
const { data } = await ahrefs.public.crawlerIpRanges();
console.log(data);
```

## Documentation

See the official Ahrefs API v3 documentation for required parameters, response schemas, API unit consumption, and examples:

- https://docs.ahrefs.com/en/api/docs/introduction
- https://docs.ahrefs.com/en/api/reference/site-explorer

## Development

```shell
npm install
npm test
```

## License

MIT
