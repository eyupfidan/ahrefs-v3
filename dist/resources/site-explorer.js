"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteExplorer = void 0;
const base_1 = require("./base");
class SiteExplorer extends base_1.AhrefsResource {
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
//# sourceMappingURL=site-explorer.js.map