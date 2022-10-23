import { CrawlerEntity } from "./crawler.entity";

export class CrawlerValue implements CrawlerEntity {
    url: string;
    links: String[];
    timesVisited: number;

    constructor(url: string, links: String[]){
        this.timesVisited = 1;
        this.url = url;
        this.links = links;
    }
}