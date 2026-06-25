import { AhrefsHttpClient } from "./http-client";
import type { AhrefsClientOptions } from "./types";
import {
  brandRadarEndpoints,
  gscEndpoints,
  keywordsExplorerEndpoints,
  managementEndpoints,
  publicEndpoints,
  rankTrackerEndpoints,
  siteAuditEndpoints,
  socialMediaEndpoints,
  webAnalyticsEndpoints,
} from "./endpoints";
import { GenericResource } from "./resources/base";
import { SiteExplorer } from "./resources/site-explorer";

export class AhrefsClient {
  readonly siteExplorer: SiteExplorer;
  readonly keywordsExplorer: GenericResource;
  readonly siteAudit: GenericResource;
  readonly rankTracker: GenericResource;
  readonly serpOverview: GenericResource;
  readonly batchAnalysis: GenericResource;
  readonly subscriptionInfo: GenericResource;
  readonly management: GenericResource;
  readonly brandRadar: GenericResource;
  readonly webAnalytics: GenericResource;
  readonly gsc: GenericResource;
  readonly socialMedia: GenericResource;
  readonly public: GenericResource;

  constructor(token: string, options: AhrefsClientOptions = {}) {
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
