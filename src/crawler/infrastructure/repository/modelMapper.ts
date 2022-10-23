import { CrawlerEntity } from "../../domain/crawler.entity";

export class ModelMapper {
    
    public MongotoEntity(mongoObject: any): CrawlerEntity{
        const crawler: CrawlerEntity = 
        {
            url : mongoObject.url,
            links : mongoObject.links,
            timesVisited: mongoObject.timesVisited
        }
        return crawler;
    }
}