import { CrawlerEntity } from "./crawler.model"

export class ModelMapper {
    
    public ObjectToEntity(obj: any): CrawlerEntity{
        const crawler: CrawlerEntity = 
        {
            url : obj.url,
            links : obj.links,
            timesVisited: obj.timesVisited
        }
        return crawler;
    }
}