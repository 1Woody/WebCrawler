"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerUseCase = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const crawler_value_1 = require("../domain/crawler.value");
class CrawlerUseCase {
    constructor(CrawlerRepository) {
        this.CrawlerRepository = CrawlerRepository;
    }
    findWebById(url) {
        const webResponse = this.CrawlerRepository.findWebById(url);
        return webResponse;
    }
    /**
     * If Crawler Object exists in DB return form DB
     * Else add New Crawl and return New Crawl
     */
    crawlWebsite(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const crawlInHistory = yield this.CrawlerRepository.findWebById(url);
            if (crawlInHistory === null) {
                const crawlerResponse = yield this.addNewCrawl(url);
                return crawlerResponse;
            }
            else {
                //DB needs and update
                crawlInHistory.timesVisited++;
                return crawlInHistory;
            }
        });
    }
    listCrawlHistory() {
        const webListResponse = this.CrawlerRepository.listCrawlHistory();
        return webListResponse;
    }
    /**
     * Add new crawl Object to DB and return object
     */
    addNewCrawl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const linkList = yield this.extractLinks(url);
            const crawler = new crawler_value_1.CrawlerValue(url, linkList);
            const crawlerResponse = yield this.CrawlerRepository.insertCrawledWeb(crawler);
            return crawlerResponse;
        });
    }
    /**
     * Extract all links from the Website DOM
    **/
    extractLinks(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageHTML = yield axios_1.default.get(url);
            const $ = cheerio.load(pageHTML.data);
            const linkObjects = $('a');
            let links = [];
            linkObjects.each((i, link) => {
                const href = link.attribs.href;
                if (href)
                    links.push(href);
            });
            return links;
        });
    }
}
exports.CrawlerUseCase = CrawlerUseCase;
