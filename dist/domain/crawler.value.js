"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerValue = void 0;
class CrawlerValue {
    constructor(url, links) {
        this.timesVisited = 1;
        this.url = url;
        this.links = links;
    }
}
exports.CrawlerValue = CrawlerValue;
