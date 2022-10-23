import { CrawlerEntity } from "../../domain/crawler.entity";
import { CrawlerRepository } from "../../domain/crawler.repository";
import CrawlerModel from "../model/crawler.schema";
import { ModelMapper } from "./modelMapper";

/**
 * Infra Mongo
 */
export class MongoRepository implements CrawlerRepository {

    async findWebById(url: string): Promise<CrawlerEntity | null> {
        const mongoCrawler = await CrawlerModel.findOne({ url });
        if(mongoCrawler === null) return mongoCrawler;
        else {
            const mapper = new ModelMapper();
            return mapper.MongotoEntity(mongoCrawler);
        }
    }
    
    async insertCrawledWeb(crawler: CrawlerEntity): Promise<CrawlerEntity | null> {
        const mongoCrawler = await CrawlerModel.create(crawler);
        const mapper = new ModelMapper();
        const crawlerEnt: CrawlerEntity = mapper.MongotoEntity(mongoCrawler);
        return crawlerEnt;
    }
    
    async listCrawlHistory(): Promise<CrawlerEntity[] | null> {
        const mongoCrawlerList = await CrawlerModel.find();
        const mapper = new ModelMapper();
        let crawlerList : CrawlerEntity[] = [];
        mongoCrawlerList.map((e) => {
            crawlerList.push(mapper.MongotoEntity(e));
        })
        return crawlerList;
    }
}