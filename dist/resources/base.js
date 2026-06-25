"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericResource = exports.AhrefsResource = void 0;
const toMethodName = (method, path) => {
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
    constructor(apiClient, resourcePath) {
        this.apiClient = apiClient;
        this.resourcePath = resourcePath;
    }
    request(method, path, options = {}) {
        return this.apiClient.request(method, `${this.resourcePath}${path}`, options);
    }
    registerEndpoints(endpoints) {
        endpoints.forEach(([customName, method, path]) => {
            const requestMethod = (options) => this.request(method, path, options);
            Object.defineProperty(this, customName, { value: requestMethod, enumerable: true });
            Object.defineProperty(this, toMethodName(method, path), { value: requestMethod, enumerable: true });
        });
    }
}
exports.AhrefsResource = AhrefsResource;
class GenericResource extends AhrefsResource {
    constructor(apiClient, resourcePath, endpoints) {
        super(apiClient, resourcePath);
        this.registerEndpoints(endpoints);
    }
}
exports.GenericResource = GenericResource;
//# sourceMappingURL=base.js.map