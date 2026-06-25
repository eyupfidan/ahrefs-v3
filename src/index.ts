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

type RequestMethod = <TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(
  options?: AhrefsRequestOptions<TParams, TBody>
) => Promise<AhrefsResponse<TResponse>>;

type EndpointDefinition = readonly [name: string, method: Method, path: string];

const API_BASE_URL = "https://api.ahrefs.com/v3";


class AhrefsHttpClient {
  private readonly baseURL: string;
  private readonly headers: Record<string, string>;
  private readonly timeout?: number;

  constructor(token: string, options: AhrefsClientOptions = {}) {
    this.baseURL = options.baseURL ?? API_BASE_URL;
    this.timeout = options.timeout;
    this.headers = {
      Accept: "application/json, application/xml",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };
  }

  async request<TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(
    method: Method,
    path: string,
    options: AhrefsRequestOptions<TParams, TBody> = {}
  ): Promise<AhrefsResponse<TResponse>> {
    const url = new URL(`${this.baseURL}${path}`);

    Object.entries(options.params ?? {}).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
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
      if (timeoutId) clearTimeout(timeoutId);
    });

    const contentType = response.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      data: data as TResponse,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    };
  }
}

const toMethodName = (method: Method, path: string): string => {
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
  constructor(private readonly apiClient: AhrefsHttpClient, private readonly resourcePath: string) {}

  protected request<TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(
    method: Method,
    path: string,
    options: AhrefsRequestOptions<TParams, TBody> = {}
  ): Promise<AhrefsResponse<TResponse>> {
    return this.apiClient.request<TResponse, TParams, TBody>(method, `${this.resourcePath}${path}`, options);
  }

  protected registerEndpoints(endpoints: readonly EndpointDefinition[]): void {
    endpoints.forEach(([customName, method, path]) => {
      const requestMethod: RequestMethod = (options) => this.request(method, path, options);
      Object.defineProperty(this, customName, { value: requestMethod, enumerable: true });
      Object.defineProperty(this, toMethodName(method, path), { value: requestMethod, enumerable: true });
    });
  }
}

export class SiteExplorer extends AhrefsResource {
  domainRating!: RequestMethod;
  getDomainRating!: RequestMethod;
  backlinksStats!: RequestMethod;
  getBacklinksStats!: RequestMethod;
  outlinksStats!: RequestMethod;
  metrics!: RequestMethod;
  aiResponsesCount!: RequestMethod;
  refdomainsHistory!: RequestMethod;
  domainRatingHistory!: RequestMethod;
  urlRatingHistory!: RequestMethod;
  pagesHistory!: RequestMethod;
  metricsHistory!: RequestMethod;
  keywordsHistory!: RequestMethod;
  metricsByCountry!: RequestMethod;
  pagesByTraffic!: RequestMethod;
  totalSearchVolumeHistory!: RequestMethod;
  allBacklinks!: RequestMethod;
  brokenBacklinks!: RequestMethod;
  refdomains!: RequestMethod;
  anchors!: RequestMethod;
  organicKeywords!: RequestMethod;
  organicCompetitors!: RequestMethod;
  topPages!: RequestMethod;
  paidPages!: RequestMethod;
  pagesByBacklinks!: RequestMethod;
  pagesByInternalLinks!: RequestMethod;
  crawledPages!: RequestMethod;
  linkedDomains!: RequestMethod;
  linkedAnchorsExternal!: RequestMethod;
  linkedAnchorsInternal!: RequestMethod;

  constructor(apiClient: AhrefsHttpClient) {
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

class GenericResource extends AhrefsResource {
  [key: string]: unknown;
  constructor(apiClient: AhrefsHttpClient, resourcePath: string, endpoints: readonly EndpointDefinition[]) {
    super(apiClient, resourcePath);
    this.registerEndpoints(endpoints);
  }
}

const keywordsExplorerEndpoints = [["overview", "GET", "/overview"], ["volumeHistory", "GET", "/volume-history"], ["volumeByCountry", "GET", "/volume-by-country"], ["matchingTerms", "GET", "/matching-terms"], ["relatedTerms", "GET", "/related-terms"], ["searchSuggestions", "GET", "/search-suggestions"]] as const;
const siteAuditEndpoints = [["projects", "GET", "/projects"], ["issues", "GET", "/issues"], ["pageContent", "GET", "/page-content"], ["pageExplorer", "GET", "/page-explorer"]] as const;
const rankTrackerEndpoints = [["overview", "GET", "/overview"], ["serpOverview", "GET", "/serp-overview"], ["competitorsOverview", "GET", "/competitors-overview"], ["competitorsPages", "GET", "/competitors-pages"], ["competitorsDomains", "GET", "/competitors-domains"], ["competitorsStats", "GET", "/competitors-stats"]] as const;
const managementEndpoints = [["projects", "GET", "/projects"], ["createProject", "POST", "/projects"], ["updateProject", "PATCH", "/update-project"], ["projectKeywords", "GET", "/project-keywords"], ["putProjectKeywords", "PUT", "/project-keywords"], ["deleteProjectKeywords", "PUT", "/project-keywords-delete"], ["addProjectKeywordsTags", "PUT", "/project-keywords-tags"], ["deleteProjectKeywordsTags", "PUT", "/project-keywords-tags-delete"], ["projectCompetitors", "GET", "/project-competitors"], ["createProjectCompetitors", "POST", "/project-competitors"], ["deleteProjectCompetitors", "POST", "/project-competitors-delete"], ["locations", "GET", "/locations"], ["keywordListKeywords", "GET", "/keyword-list-keywords"], ["putKeywordListKeywords", "PUT", "/keyword-list-keywords"], ["deleteKeywordListKeywords", "PUT", "/keyword-list-keywords-delete"], ["brandRadarPrompts", "GET", "/brand-radar-prompts"], ["createBrandRadarPrompts", "POST", "/brand-radar-prompts"], ["deleteBrandRadarPrompts", "PUT", "/brand-radar-prompts-delete"], ["brandRadarReports", "GET", "/brand-radar-reports"], ["createBrandRadarReports", "POST", "/brand-radar-reports"], ["updateBrandRadarReports", "PATCH", "/brand-radar-reports"]] as const;
const brandRadarEndpoints = [["aiResponses", "GET", "/ai-responses"], ["createAiResponses", "POST", "/ai-responses"], ["citedPages", "GET", "/cited-pages"], ["createCitedPages", "POST", "/cited-pages"], ["citedDomains", "GET", "/cited-domains"], ["createCitedDomains", "POST", "/cited-domains"], ["impressionsOverview", "GET", "/impressions-overview"], ["createImpressionsOverview", "POST", "/impressions-overview"], ["createCitationsOverview", "POST", "/citations-overview"], ["mentionsOverview", "GET", "/mentions-overview"], ["createMentionsOverview", "POST", "/mentions-overview"], ["sovOverview", "GET", "/sov-overview"], ["createSovOverview", "POST", "/sov-overview"], ["impressionsHistory", "GET", "/impressions-history"], ["createImpressionsHistory", "POST", "/impressions-history"], ["createCitationsHistory", "POST", "/citations-history"], ["mentionsHistory", "GET", "/mentions-history"], ["createMentionsHistory", "POST", "/mentions-history"], ["sovHistory", "GET", "/sov-history"], ["createSovHistory", "POST", "/sov-history"]] as const;
const webAnalyticsEndpoints = ["stats", "chart", "source-channels", "source-channels-chart", "sources", "sources-chart", "referrers", "referrers-chart", "utm-params", "utm-params-chart", "entry-pages", "entry-pages-chart", "exit-pages", "exit-pages-chart", "top-pages", "top-pages-chart", "cities", "cities-chart", "continents", "continents-chart", "countries", "countries-chart", "languages", "languages-chart", "browsers", "browsers-chart", "browser-versions", "browser-versions-chart", "devices", "devices-chart", "operating-systems", "operating-systems-chart", "operating-systems-versions", "operating-systems-versions-chart"].map((path) => [path.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), "GET", `/${path}`] as const);
const gscEndpoints = ["performance-history", "positions-history", "pages-history", "performance-by-device", "metrics-by-country", "ctr-by-position", "performance-by-position", "keyword-history", "keywords", "page-history", "pages", "anonymous-queries"].map((path) => [path.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), "GET", `/${path}`] as const);
const socialMediaEndpoints = [["channels", "GET", "/channels"], ["channelMetrics", "GET", "/channel-metrics"], ["authors", "GET", "/authors"], ["activityHistory", "GET", "/activity-history"], ["posts", "GET", "/posts"], ["postMetrics", "GET", "/post-metrics"], ["createPost", "POST", "/post"], ["deletePost", "DELETE", "/post"], ["updatePost", "PATCH", "/post"]] as const;
const publicEndpoints = [["crawlerIps", "GET", "/crawler-ips"], ["crawlerIpRanges", "GET", "/crawler-ip-ranges"], ["domainRatingFree", "GET", "/domain-rating-free"]] as const;

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

export { AhrefsClient as Ahrefs, API_BASE_URL };
export default AhrefsClient;
