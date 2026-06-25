"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AhrefsHttpClient = void 0;
const constants_1 = require("./constants");
class AhrefsHttpClient {
    constructor(token, options = {}) {
        this.baseURL = options.baseURL ?? constants_1.API_BASE_URL;
        this.timeout = options.timeout;
        this.headers = {
            Accept: "application/json, application/xml",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        };
    }
    async request(method, path, options = {}) {
        const url = new URL(`${this.baseURL}${path}`);
        Object.entries(options.params ?? {}).forEach(([key, value]) => {
            if (value === undefined || value === null)
                return;
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
            if (timeoutId)
                clearTimeout(timeoutId);
        });
        const contentType = response.headers.get("content-type") ?? "";
        const data = contentType.includes("application/json")
            ? await response.json()
            : await response.text();
        return {
            data: data,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
        };
    }
}
exports.AhrefsHttpClient = AhrefsHttpClient;
//# sourceMappingURL=http-client.js.map