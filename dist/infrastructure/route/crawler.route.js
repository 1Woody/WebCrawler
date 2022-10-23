"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawlerUseCase_1 = require("../../application/crawlerUseCase");
const crawler_ctrl_1 = require("../controller/crawler.ctrl");
const mongo_repository_1 = require("../repository/mongo.repository");
const express_validator_1 = require("express-validator");
const route = (0, express_1.Router)();
/**
 * Start Repository
 */
//const MockCrawlerRepository = new MockRepository();
const MongoCrawlerRepository = new mongo_repository_1.MongoRepository();
/**
 * Start Use cases
 */
const crawlerUseCase = new crawlerUseCase_1.CrawlerUseCase(MongoCrawlerRepository);
/**
 * Start Crawler Controller
 */
const crawlerController = new crawler_ctrl_1.CrawlerController(crawlerUseCase);
/**
 * [POST]
 */
route.post('/crawl', [(0, express_validator_1.check)("url", "Url is required").isURL()], crawlerController.crawlWebsite);
/**
 * [GET]
 */
route.get('/searchInHistory', [(0, express_validator_1.check)("url", "Url is required").isURL()], crawlerController.getWebById);
/**
 * [GET]
 */
route.get('/crawlHistory', crawlerController.getCrawlHistory);
exports.default = route;
