import type { AhrefsClientOptions } from "./types";
import { GenericResource } from "./resources/base";
import { SiteExplorer } from "./resources/site-explorer";
export declare class AhrefsClient {
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
    constructor(token: string, options?: AhrefsClientOptions);
}
