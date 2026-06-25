"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_BASE_URL = exports.Ahrefs = exports.AhrefsClient = exports.SiteExplorer = void 0;
const API_BASE_URL = "https://api.ahrefs.com/v3";
exports.API_BASE_URL = API_BASE_URL;
class AhrefsHttpClient {
    constructor(token, options = {}) {
        this.baseURL = options.baseURL ?? API_BASE_URL;
        this.timeout = options.timeout;
        this.headers = {
            Accept: "application/json, application/xml",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        };
    }
    async request(method, path, options = {}) {
        const url = new URL(`${this.baseURL}${path}`);
        Object.entries(options.params ?? {}).forEach(([key, value]) => {
            if (value === undefined || value === null)
                return;
            if (Array.isArray(value)) {
                value.forEach((item) => url.searchParams.append(key, String(item)));
                return;
            }
            url.searchParams.set(key, String(value));
        });
        const controller = this.timeout && !options.config?.signal ? new AbortController() : undefined;
        const timeoutId = controller ? setTimeout(() => controller.abort(), this.timeout) : undefined;
        const response = await fetch(url, {
            method,
            headers: {
                ...this.headers,
                ...(options.data ? { "Content-Type": "application/json" } : {}),
                ...options.config?.headers,
            },
            body: options.data ? JSON.stringify(options.data) : undefined,
            signal: options.config?.signal ?? controller?.signal,
        }).finally(() => {
            if (timeoutId)
                clearTimeout(timeoutId);
        });
        const contentType = response.headers.get("content-type") ?? "";
        const data = contentType.includes("application/json")
            ? await response.json()
            : await response.text();
        return {
            data: data,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
        };
    }
}
const toMethodName = (method, path) => {
    const normalizedMethod = method.toLowerCase();
    const normalizedPath = path
        .replace(/^\//, "")
        .split("-")
        .filter(Boolean)
        .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
        .join("");
    return `${normalizedMethod}${normalizedPath.charAt(0).toUpperCase()}${normalizedPath.slice(1)}`;
};
class AhrefsResource {
    constructor(apiClient, resourcePath) {
        this.apiClient = apiClient;
        this.resourcePath = resourcePath;
    }
    request(method, path, options = {}) {
        return this.apiClient.request(method, `${this.resourcePath}${path}`, options);
    }
    registerEndpoints(endpoints) {
        endpoints.forEach(([customName, method, path]) => {
            const requestMethod = (options) => this.request(method, path, options);
            Object.defineProperty(this, customName, { value: requestMethod, enumerable: true });
            Object.defineProperty(this, toMethodName(method, path), { value: requestMethod, enumerable: true });
        });
    }
}
class SiteExplorer extends AhrefsResource {
    constructor(apiClient) {
        super(apiClient, "/site-explorer");
        this.registerEndpoints([
            ["domainRating", "GET", "/domain-rating"],
            ["backlinksStats", "GET", "/backlinks-stats"],
            ["outlinksStats", "GET", "/outlinks-stats"],
            ["metrics", "GET", "/metrics"],
            ["aiResponsesCount", "GET", "/ai-responses-count"],
            ["refdomainsHistory", "GET", "/refdomains-history"],
            ["domainRatingHistory", "GET", "/domain-rating-history"],
            ["urlRatingHistory", "GET", "/url-rating-history"],
            ["pagesHistory", "GET", "/pages-history"],
            ["metricsHistory", "GET", "/metrics-history"],
            ["keywordsHistory", "GET", "/keywords-history"],
            ["metricsByCountry", "GET", "/metrics-by-country"],
            ["pagesByTraffic", "GET", "/pages-by-traffic"],
            ["totalSearchVolumeHistory", "GET", "/total-search-volume-history"],
            ["allBacklinks", "GET", "/all-backlinks"],
            ["brokenBacklinks", "GET", "/broken-backlinks"],
            ["refdomains", "GET", "/refdomains"],
            ["anchors", "GET", "/anchors"],
            ["organicKeywords", "GET", "/organic-keywords"],
            ["organicCompetitors", "GET", "/organic-competitors"],
            ["topPages", "GET", "/top-pages"],
            ["paidPages", "GET", "/paid-pages"],
            ["pagesByBacklinks", "GET", "/pages-by-backlinks"],
            ["pagesByInternalLinks", "GET", "/pages-by-internal-links"],
            ["crawledPages", "GET", "/crawled-pages"],
            ["linkedDomains", "GET", "/linkeddomains"],
            ["linkedAnchorsExternal", "GET", "/linked-anchors-external"],
            ["linkedAnchorsInternal", "GET", "/linked-anchors-internal"],
        ]);
    }
}
exports.SiteExplorer = SiteExplorer;
class GenericResource extends AhrefsResource {
    constructor(apiClient, resourcePath, endpoints) {
        super(apiClient, resourcePath);
        this.registerEndpoints(endpoints);
    }
}
const keywordsExplorerEndpoints = [["overview", "GET", "/overview"], ["volumeHistory", "GET", "/volume-history"], ["volumeByCountry", "GET", "/volume-by-country"], ["matchingTerms", "GET", "/matching-terms"], ["relatedTerms", "GET", "/related-terms"], ["searchSuggestions", "GET", "/search-suggestions"]];
const siteAuditEndpoints = [["projects", "GET", "/projects"], ["issues", "GET", "/issues"], ["pageContent", "GET", "/page-content"], ["pageExplorer", "GET", "/page-explorer"]];
const rankTrackerEndpoints = [["overview", "GET", "/overview"], ["serpOverview", "GET", "/serp-overview"], ["competitorsOverview", "GET", "/competitors-overview"], ["competitorsPages", "GET", "/competitors-pages"], ["competitorsDomains", "GET", "/competitors-domains"], ["competitorsStats", "GET", "/competitors-stats"]];
const managementEndpoints = [["projects", "GET", "/projects"], ["createProject", "POST", "/projects"], ["updateProject", "PATCH", "/update-project"], ["projectKeywords", "GET", "/project-keywords"], ["putProjectKeywords", "PUT", "/project-keywords"], ["deleteProjectKeywords", "PUT", "/project-keywords-delete"], ["addProjectKeywordsTags", "PUT", "/project-keywords-tags"], ["deleteProjectKeywordsTags", "PUT", "/project-keywords-tags-delete"], ["projectCompetitors", "GET", "/project-competitors"], ["createProjectCompetitors", "POST", "/project-competitors"], ["deleteProjectCompetitors", "POST", "/project-competitors-delete"], ["locations", "GET", "/locations"], ["keywordListKeywords", "GET", "/keyword-list-keywords"], ["putKeywordListKeywords", "PUT", "/keyword-list-keywords"], ["deleteKeywordListKeywords", "PUT", "/keyword-list-keywords-delete"], ["brandRadarPrompts", "GET", "/brand-radar-prompts"], ["createBrandRadarPrompts", "POST", "/brand-radar-prompts"], ["deleteBrandRadarPrompts", "PUT", "/brand-radar-prompts-delete"], ["brandRadarReports", "GET", "/brand-radar-reports"], ["createBrandRadarReports", "POST", "/brand-radar-reports"], ["updateBrandRadarReports", "PATCH", "/brand-radar-reports"]];
const brandRadarEndpoints = [["aiResponses", "GET", "/ai-responses"], ["createAiResponses", "POST", "/ai-responses"], ["citedPages", "GET", "/cited-pages"], ["createCitedPages", "POST", "/cited-pages"], ["citedDomains", "GET", "/cited-domains"], ["createCitedDomains", "POST", "/cited-domains"], ["impressionsOverview", "GET", "/impressions-overview"], ["createImpressionsOverview", "POST", "/impressions-overview"], ["createCitationsOverview", "POST", "/citations-overview"], ["mentionsOverview", "GET", "/mentions-overview"], ["createMentionsOverview", "POST", "/mentions-overview"], ["sovOverview", "GET", "/sov-overview"], ["createSovOverview", "POST", "/sov-overview"], ["impressionsHistory", "GET", "/impressions-history"], ["createImpressionsHistory", "POST", "/impressions-history"], ["createCitationsHistory", "POST", "/citations-history"], ["mentionsHistory", "GET", "/mentions-history"], ["createMentionsHistory", "POST", "/mentions-history"], ["sovHistory", "GET", "/sov-history"], ["createSovHistory", "POST", "/sov-history"]];
const webAnalyticsEndpoints = ["stats", "chart", "source-channels", "source-channels-chart", "sources", "sources-chart", "referrers", "referrers-chart", "utm-params", "utm-params-chart", "entry-pages", "entry-pages-chart", "exit-pages", "exit-pages-chart", "top-pages", "top-pages-chart", "cities", "cities-chart", "continents", "continents-chart", "countries", "countries-chart", "languages", "languages-chart", "browsers", "browsers-chart", "browser-versions", "browser-versions-chart", "devices", "devices-chart", "operating-systems", "operating-systems-chart", "operating-systems-versions", "operating-systems-versions-chart"].map((path) => [path.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), "GET", `/${path}`]);
const gscEndpoints = ["performance-history", "positions-history", "pages-history", "performance-by-device", "metrics-by-country", "ctr-by-position", "performance-by-position", "keyword-history", "keywords", "page-history", "pages", "anonymous-queries"].map((path) => [path.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), "GET", `/${path}`]);
const socialMediaEndpoints = [["channels", "GET", "/channels"], ["channelMetrics", "GET", "/channel-metrics"], ["authors", "GET", "/authors"], ["activityHistory", "GET", "/activity-history"], ["posts", "GET", "/posts"], ["postMetrics", "GET", "/post-metrics"], ["createPost", "POST", "/post"], ["deletePost", "DELETE", "/post"], ["updatePost", "PATCH", "/post"]];
const publicEndpoints = [["crawlerIps", "GET", "/crawler-ips"], ["crawlerIpRanges", "GET", "/crawler-ip-ranges"], ["domainRatingFree", "GET", "/domain-rating-free"]];
class AhrefsClient {
    constructor(token, options = {}) {
        const apiClient = new AhrefsHttpClient(token, options);
        this.siteExplorer = new SiteExplorer(apiClient);
        this.keywordsExplorer = new GenericResource(apiClient, "/keywords-explorer", keywordsExplorerEndpoints);
        this.siteAudit = new GenericResource(apiClient, "/site-audit", siteAuditEndpoints);
        this.rankTracker = new GenericResource(apiClient, "/rank-tracker", rankTrackerEndpoints);
        this.serpOverview = new GenericResource(apiClient, "/serp-overview", [["serpOverview", "GET", "/serp-overview"]]);
        this.batchAnalysis = new GenericResource(apiClient, "/batch-analysis", [["batchAnalysis", "POST", "/batch-analysis"]]);
        this.subscriptionInfo = new GenericResource(apiClient, "/subscription-info", [["limitsAndUsage", "GET", "/limits-and-usage"]]);
        this.management = new GenericResource(apiClient, "/management", managementEndpoints);
        this.brandRadar = new GenericResource(apiClient, "/brand-radar", brandRadarEndpoints);
        this.webAnalytics = new GenericResource(apiClient, "/web-analytics", webAnalyticsEndpoints);
        this.gsc = new GenericResource(apiClient, "/gsc", gscEndpoints);
        this.socialMedia = new GenericResource(apiClient, "/social-media", socialMediaEndpoints);
        this.public = new GenericResource(apiClient, "/public", publicEndpoints);
    }
}
exports.AhrefsClient = AhrefsClient;
exports.Ahrefs = AhrefsClient;
exports.default = AhrefsClient;
//# sourceMappingURL=index.js.map