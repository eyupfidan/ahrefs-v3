import { API_BASE_URL } from "./constants.js";
import type { AhrefsBody, AhrefsClientOptions, AhrefsParams, AhrefsRequestOptions, AhrefsResponse, Method } from "./types.js";

export class AhrefsHttpClient {
  private readonly baseURL: string;
  private readonly headers: Record<string, string>;
  private readonly timeout?: number;
  private readonly fetcher: AhrefsClientOptions["fetch"];

  constructor(token: string, options: AhrefsClientOptions = {}) {
    this.baseURL = options.baseURL ?? API_BASE_URL;
    this.timeout = options.timeout;
    this.fetcher = options.fetch ?? globalThis.fetch?.bind(globalThis);
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
    if (!this.fetcher) {
      throw new Error("AhrefsClient requires a fetch implementation. Pass one with the `fetch` client option.");
    }

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

    const response = await this.fetcher(url, {
      method,
      headers: {
        ...this.headers,
        ...(options.data ? { "Content-Type": "application/json" } : {}),
        ...options.config?.headers,
      },
      body: options.data ? JSON.stringify(options.data) : undefined,
      signal: options.config?.signal ?? controller?.signal,
      credentials: options.config?.credentials,
      mode: options.config?.mode,
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
