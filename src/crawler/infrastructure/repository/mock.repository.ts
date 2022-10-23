import { CrawlerEntity } from "../../domain/crawler.entity";
import { CrawlerRepository } from "../../domain/crawler.repository";

/**
 * MOCK 
 */

const MOCK_CRAWLER: CrawlerEntity= {
    url : "http://mocklink.com/",
    links : ["http://listmock.com/"],
    timesVisited: 10,
}



export class MockRepository implements CrawlerRepository {
    async findWebById(url: string): Promise<CrawlerEntity | null> {
        return null;
    }
    async insertCrawledWeb(crawler: CrawlerEntity): Promise<CrawlerEntity | null> {
        return crawler;
    }
    
    async listCrawlHistory(): Promise<CrawlerEntity[] | null> {
       return [MOCK_CRAWLER, MOCK_CRAWLER];
    }
}