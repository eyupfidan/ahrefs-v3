"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AhrefsClient = void 0;
const http_client_1 = require("./http-client");
const endpoints_1 = require("./endpoints");
const base_1 = require("./resources/base");
const site_explorer_1 = require("./resources/site-explorer");
class AhrefsClient {
    constructor(token, options = {}) {
        const apiClient = new http_client_1.AhrefsHttpClient(token, options);
        this.siteExplorer = new site_explorer_1.SiteExplorer(apiClient);
        this.keywordsExplorer = new base_1.GenericResource(apiClient, "/keywords-explorer", endpoints_1.keywordsExplorerEndpoints);
        this.siteAudit = new base_1.GenericResource(apiClient, "/site-audit", endpoints_1.siteAuditEndpoints);
        this.rankTracker = new base_1.GenericResource(apiClient, "/rank-tracker", endpoints_1.rankTrackerEndpoints);
        this.serpOverview = new base_1.GenericResource(apiClient, "/serp-overview", [["serpOverview", "GET", "/serp-overview"]]);
        this.batchAnalysis = new base_1.GenericResource(apiClient, "/batch-analysis", [["batchAnalysis", "POST", "/batch-analysis"]]);
        this.subscriptionInfo = new base_1.GenericResource(apiClient, "/subscription-info", [["limitsAndUsage", "GET", "/limits-and-usage"]]);
        this.management = new base_1.GenericResource(apiClient, "/management", endpoints_1.managementEndpoints);
        this.brandRadar = new base_1.GenericResource(apiClient, "/brand-radar", endpoints_1.brandRadarEndpoints);
        this.webAnalytics = new base_1.GenericResource(apiClient, "/web-analytics", endpoints_1.webAnalyticsEndpoints);
        this.gsc = new base_1.GenericResource(apiClient, "/gsc", endpoints_1.gscEndpoints);
        this.socialMedia = new base_1.GenericResource(apiClient, "/social-media", endpoints_1.socialMediaEndpoints);
        this.public = new base_1.GenericResource(apiClient, "/public", endpoints_1.publicEndpoints);
    }
}
exports.AhrefsClient = AhrefsClient;
//# sourceMappingURL=client.js.map