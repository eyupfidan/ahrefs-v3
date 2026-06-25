import type { AhrefsHttpClient } from "../http-client";
import type { RequestMethod } from "../types";
import { AhrefsResource } from "./base";

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

