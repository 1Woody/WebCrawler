import { Request, Response } from "express";
import { CrawlerUseCase } from "../../application/crawlerUseCase";
import { handleHttp } from "../utils/error.handle";
import { validationResult } from "express-validator";

export class CrawlerController {
    constructor(private crawlerUseCase:CrawlerUseCase){

    }

    public getWebById = async (req: Request, res: Response) => {
        if (validationResult(req).isEmpty()){
            try{
                const { url } = req.query;
                const responseWeb = await this.crawlerUseCase.findWebById(String(url));
                if (responseWeb !== null) res.send(responseWeb);
                else res.send({ message : "Not found"});
            } catch(e){
                handleHttp(res, 'ERROR_GET_WEBSITE_FROM_HISTORY');
            }
        }else {
            handleHttp(res, 'URL_INVALID');
        }
    }

    public crawlWebsite = async (req: Request, res: Response) => {
        if (validationResult(req).isEmpty()){
            try{
                const { url } = req.body;
                const responseWeb = await this.crawlerUseCase.crawlWebsite(String(url));
                if (responseWeb) res.send(responseWeb);
                else res.send({ message : "Not found"})
            } catch(e){
                handleHttp(res, 'ERROR_GET_WEBSITE_FROM_HISTORY');
            }
        }else {
            handleHttp(res, 'URL_INVALID');
        }
    }

    public getCrawlHistory = async (req: Request, res: Response) => {
        try{
            const responseWebList = await this.crawlerUseCase.listCrawlHistory();
            res.send(responseWebList);
        } catch(e){
            handleHttp(res, 'ERROR_GET_WEBSITE_FROM_HISTORY');
        }
    }
}