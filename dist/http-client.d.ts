import type { AhrefsBody, AhrefsClientOptions, AhrefsParams, AhrefsRequestOptions, AhrefsResponse, Method } from "./types";
export declare class AhrefsHttpClient {
    private readonly baseURL;
    private readonly headers;
    private readonly timeout?;
    constructor(token: string, options?: AhrefsClientOptions);
    request<TResponse = unknown, TParams extends AhrefsParams = AhrefsParams, TBody = AhrefsBody>(method: Method, path: string, options?: AhrefsRequestOptions<TParams, TBody>): Promise<AhrefsResponse<TResponse>>;
}
