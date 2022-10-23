import { CrawlerRepository } from "../domain/crawler.repository";
import axios from "axios";
import * as cheerio from "cheerio";
import { CrawlerEntity } from "../domain/crawler.entity";
import { CrawlerValue } from "../domain/crawler.value";

export class CrawlerUseCase {
    constructor(private readonly CrawlerRepository:CrawlerRepository){}

    public findWebById(url: string){
        const webResponse = this.CrawlerRepository.findWebById(url);
        return webResponse;
    }

    /**
     * If Crawler Object exists in DB return form DB
     * Else add New Crawl and return New Crawl
     */
    public async crawlWebsite(url: string): Promise<CrawlerEntity | null>{
        const crawlInHistory = await this.CrawlerRepository.findWebById(url);
        if(crawlInHistory === null){
            const crawlerResponse = await this.addNewCrawl(url);
            return crawlerResponse;
        }else{
            //DB needs and update
            crawlInHistory.timesVisited++;
            return crawlInHistory;
        }
    }

    public listCrawlHistory(){
        const webListResponse = this.CrawlerRepository.listCrawlHistory();
        return webListResponse;
    }

    /**
     * Add new crawl Object to DB and return object
     */
    private async addNewCrawl(url: string): Promise<CrawlerEntity | null>{
        const linkList = await this.extractLinks(url);
        const crawler = new CrawlerValue(url, linkList);
        const crawlerResponse = await this.CrawlerRepository.insertCrawledWeb(crawler);
        return crawlerResponse;
    }

    /**
     * Extract all links from the Website DOM
    **/
    private async extractLinks(url: string): Promise<string[]> {
        const pageHTML = await axios.get(url);
        const $ = cheerio.load(pageHTML.data);
        const linkObjects = $('a');
        let links: string[] = [];
        linkObjects.each((i, link) => {
            const href = link.attribs.href;
            if (href) links.push(href);
        });
        return links;
    }
}

