import type { AhrefsHttpClient } from "../http-client";
import type { AhrefsBody, AhrefsParams, AhrefsRequestOptions, AhrefsResponse, EndpointDefinition, Method } from "../types";
export declare class AhrefsResource {
    private readonly apiClient;
    private readonly resourcePath;
    constructor(apiClient: AhrefsHttpClient, resourcePath: string);
    protected request<TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(method: Method, path: string, options?: AhrefsRequestOptions<TParams, TBody>): Promise<AhrefsResponse<TResponse>>;
    protected registerEndpoints(endpoints: readonly EndpointDefinition[]): void;
}
export declare class GenericResource extends AhrefsResource {
    [key: string]: unknown;
    constructor(apiClient: AhrefsHttpClient, resourcePath: string, endpoints: readonly EndpointDefinition[]);
}
