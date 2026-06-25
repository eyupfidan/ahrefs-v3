export type AhrefsOutput = "json" | "csv" | "xml" | "php";
export type AhrefsParams = Record<string, string | number | boolean | string[] | number[] | undefined | null>;
export type AhrefsBody = Record<string, unknown> | unknown[];
export interface AhrefsClientOptions {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
}
export interface AhrefsResponse<TResponse = unknown> {
    data: TResponse;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}
export interface AhrefsRequestConfig {
    headers?: Record<string, string>;
    signal?: AbortSignal;
}
export interface AhrefsRequestOptions<TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody> {
    params?: TParams;
    data?: TBody;
    config?: AhrefsRequestConfig;
}
type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type RequestMethod = <TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(options?: AhrefsRequestOptions<TParams, TBody>) => Promise<AhrefsResponse<TResponse>>;
type EndpointDefinition = readonly [name: string, method: Method, path: string];
declare const API_BASE_URL = "https://api.ahrefs.com/v3";
declare class AhrefsHttpClient {
    private readonly baseURL;
    private readonly headers;
    private readonly timeout?;
    constructor(token: string, options?: AhrefsClientOptions);
    request<TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(method: Method, path: string, options?: AhrefsRequestOptions<TParams, TBody>): Promise<AhrefsResponse<TResponse>>;
}
declare class AhrefsResource {
    private readonly apiClient;
    private readonly resourcePath;
    constructor(apiClient: AhrefsHttpClient, resourcePath: string);
    protected request<TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(method: Method, path: string, options?: AhrefsRequestOptions<TParams, TBody>): Promise<AhrefsResponse<TResponse>>;
    protected registerEndpoints(endpoints: readonly EndpointDefinition[]): void;
}
export declare class SiteExplorer extends AhrefsResource {
    domainRating: RequestMethod;
    getDomainRating: RequestMethod;
    backlinksStats: RequestMethod;
    getBacklinksStats: RequestMethod;
    outlinksStats: RequestMethod;
    metrics: RequestMethod;
    aiResponsesCount: RequestMethod;
    refdomainsHistory: RequestMethod;
    domainRatingHistory: RequestMethod;
    urlRatingHistory: RequestMethod;
    pagesHistory: RequestMethod;
    metricsHistory: RequestMethod;
    keywordsHistory: RequestMethod;
    metricsByCountry: RequestMethod;
    pagesByTraffic: RequestMethod;
    totalSearchVolumeHistory: RequestMethod;
    allBacklinks: RequestMethod;
    brokenBacklinks: RequestMethod;
    refdomains: RequestMethod;
    anchors: RequestMethod;
    organicKeywords: RequestMethod;
    organicCompetitors: RequestMethod;
    topPages: RequestMethod;
    paidPages: RequestMethod;
    pagesByBacklinks: RequestMethod;
    pagesByInternalLinks: RequestMethod;
    crawledPages: RequestMethod;
    linkedDomains: RequestMethod;
    linkedAnchorsExternal: RequestMethod;
    linkedAnchorsInternal: RequestMethod;
    constructor(apiClient: AhrefsHttpClient);
}
declare class GenericResource extends AhrefsResource {
    [key: string]: unknown;
    constructor(apiClient: AhrefsHttpClient, resourcePath: string, endpoints: readonly EndpointDefinition[]);
}
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
export { AhrefsClient as Ahrefs, API_BASE_URL };
export default AhrefsClient;
