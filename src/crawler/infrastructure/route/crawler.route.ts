import { Router } from "express";
import { CrawlerUseCase } from "../../application/crawlerUseCase";
import { CrawlerController } from "../controller/crawler.ctrl";
import { MockRepository } from "../repository/mock.repository";
import { MongoRepository } from "../repository/mongo.repository";
import { check, body, query } from "express-validator"

const route = Router();

/**
 * Start Repository
 */
//const MockCrawlerRepository = new MockRepository();
const MongoCrawlerRepository = new MongoRepository();

/**
 * Start Use cases
 */
const crawlerUseCase = new CrawlerUseCase(MongoCrawlerRepository);

/**
 * Start Crawler Controller
 */
const crawlerController = new CrawlerController(crawlerUseCase);


/**
 * [POST]
 */
route.post('/crawl', [body("url", "Url is required").isURL()] ,crawlerController.crawlWebsite);
 
/**
 * [GET]  
 */
route.get('/searchInHistory', [query("url", "Url is required").isURL()], crawlerController.getWebById);

/**
 * [GET]  
 */
 route.get('/crawlHistory', crawlerController.getCrawlHistory);


export default route;