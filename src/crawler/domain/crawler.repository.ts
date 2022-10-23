import { CrawlerEntity } from "./crawler.entity";

export interface CrawlerRepository {
    findWebById(url: string): Promise<CrawlerEntity | null>;
    insertCrawledWeb(crawler:CrawlerEntity): Promise<CrawlerEntity | null>;
    listCrawlHistory(): Promise<CrawlerEntity[] | null>;
}