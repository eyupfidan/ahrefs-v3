# Ahrefs API v3 Node.js Client

<p align="center">
  <strong>Type-friendly Ahrefs API v3 client for Node.js and TypeScript.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ahrefs-v3"><img alt="npm version" src="https://img.shields.io/npm/v/ahrefs-v3.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/ahrefs-v3"><img alt="npm downloads" src="https://img.shields.io/npm/dm/ahrefs-v3.svg?style=flat-square"></a>
  <a href="./LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square"></a>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-ready-3178c6.svg?style=flat-square">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18%2B-339933.svg?style=flat-square">
</p>

`ahrefs-v3` is a small, modern SDK for calling the Ahrefs API v3 from JavaScript and TypeScript applications. It follows the Ahrefs API resource model and exposes ergonomic namespaces for Site Explorer, Keywords Explorer, Site Audit, Rank Tracker, SERP Overview, Batch Analysis, Subscription Information, Management, Brand Radar, Web Analytics, GSC Insights, Social Media, and Public endpoints.

## Highlights

- **Typed request/response primitives** through shared TypeScript exports such as `AhrefsRequestOptions`, `AhrefsResponse`, and `RequestMethod`.
- **Resource-based API surface** that mirrors Ahrefs API v3 namespaces, for example `ahrefs.siteExplorer.domainRating()`.
- **Readable endpoint aliases** with both friendly method names and HTTP-verb aliases, for example `domainRating()` and `getDomainRating()`.
- **Configurable transport layer** with custom base URL, timeout, headers, request body support, and `AbortSignal` support.
- **Maintainable source layout** split into client composition, HTTP transport, endpoint definitions, resources, constants, and types.

## Installation

```shell
npm install ahrefs-v3
```

## Quick start

### CommonJS

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

### TypeScript / ESM

```ts
import AhrefsClient from "ahrefs-v3";

const ahrefs = new AhrefsClient(process.env.AHREFS_API_TOKEN!);

const { data } = await ahrefs.keywordsExplorer.overview({
  params: {
    country: "us",
    keywords: ["seo", "keyword research"],
  },
});

console.log(data);
```

## API client

```ts
import { AhrefsClient } from "ahrefs-v3";

const ahrefs = new AhrefsClient("YOUR_API_TOKEN", {
  timeout: 30_000,
  headers: {
    "User-Agent": "my-product/1.0.0",
  },
});
```

### Client options

| Option | Type | Description |
| --- | --- | --- |
| `baseURL` | `string` | Optional API base URL. Defaults to `https://api.ahrefs.com/v3`. |
| `timeout` | `number` | Request timeout in milliseconds. Internally uses `AbortController`. |
| `headers` | `Record<string, string>` | Extra headers merged into each request. |

## Request shape

All endpoint methods accept the same request object:

```ts
await ahrefs.siteExplorer.organicKeywords({
  params: {
    target: "example.com",
    mode: "domain",
    country: "us",
    limit: 100,
    output: "json",
  },
  data: undefined, // JSON body for POST, PUT, PATCH, and DELETE endpoints when supported
  config: {
    headers: {
      "X-Request-ID": "request-123",
    },
    signal: abortController.signal,
  },
});
```

Every endpoint resolves to an `AhrefsResponse<T>`:

```ts
type AhrefsResponse<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
};
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

## Project structure

The source is intentionally split by responsibility:

```text
src/
├── client.ts                    # Top-level AhrefsClient composition
├── constants.ts                 # Shared constants such as API_BASE_URL
├── endpoints.ts                 # Endpoint definition lists
├── http-client.ts               # Fetch-based HTTP transport
├── index.ts                     # Public package entrypoint and exports
├── resources/
│   ├── base.ts                  # Base resource and generic endpoint registration
│   └── site-explorer.ts         # Typed Site Explorer resource
└── types.ts                     # Public/shared TypeScript types
```

Generated build output belongs in `dist/` and is intentionally ignored in git.

## Development

```shell
npm install
npm test
```

Useful scripts:

| Command | Description |
| --- | --- |
| `npm run build` | Compile TypeScript into `dist/`. |
| `npm test` | Build the package and run the Node.js test suite. |

## Documentation

See the official Ahrefs API v3 documentation for required parameters, response schemas, API unit consumption, and examples:

- https://docs.ahrefs.com/en/api/docs/introduction
- https://docs.ahrefs.com/en/api/reference/site-explorer

## License

This project is licensed under the [MIT License](./LICENSE).
