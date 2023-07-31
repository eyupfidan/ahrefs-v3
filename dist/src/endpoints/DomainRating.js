"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainRating = void 0;
const axios_1 = __importDefault(require("axios"));
class DomainRating {
    constructor(token) {
        this.token = token;
        this.apiClient = axios_1.default.create({
            baseURL: "https://api.ahrefs.com/v3/site-explorer",
            headers: {
                Accept: "application/json, application/xml",
                Authorization: `Bearer ${token}`,
            },
        });
    }
    get(domain, date, output = "json", protocol = "both") {
        return this.apiClient.get("/domain-rating", {
            params: {
                target: domain,
                date: date,
                output: output,
                protocol: protocol,
            },
        });
    }
}
exports.DomainRating = DomainRating;
