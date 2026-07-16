export type AhrefsOutput = "json" | "csv" | "xml" | "php";
export type AhrefsParams = Record<string, string | number | boolean | string[] | number[] | undefined | null>;
export type AhrefsBody = Record<string, unknown> | unknown[];
export type AhrefsFetch = (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>;

export interface AhrefsClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  fetch?: AhrefsFetch;
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
  credentials?: RequestCredentials;
  mode?: RequestMode;
}

export interface AhrefsRequestOptions<TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody> {
  params?: TParams;
  data?: TBody;
  config?: AhrefsRequestConfig;
}

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestMethod = <TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(
  options?: AhrefsRequestOptions<TParams, TBody>
) => Promise<AhrefsResponse<TResponse>>;

export type EndpointDefinition = readonly [name: string, method: Method, path: string];
