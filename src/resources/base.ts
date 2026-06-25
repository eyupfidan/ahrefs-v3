import type { AhrefsHttpClient } from "../http-client";
import type { AhrefsBody, AhrefsParams, AhrefsRequestOptions, AhrefsResponse, EndpointDefinition, Method, RequestMethod } from "../types";

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

export class AhrefsResource {
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

export class GenericResource extends AhrefsResource {
  [key: string]: unknown;

  constructor(apiClient: AhrefsHttpClient, resourcePath: string, endpoints: readonly EndpointDefinition[]) {
    super(apiClient, resourcePath);
    this.registerEndpoints(endpoints);
  }
}
