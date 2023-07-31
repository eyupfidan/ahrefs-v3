"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteExplorer = void 0;
const DomainRating_1 = require("./endpoints/DomainRating");
class SiteExplorer {
    constructor(token) {
        this.domainRating = new DomainRating_1.DomainRating(token);
    }
}
exports.SiteExplorer = SiteExplorer;
