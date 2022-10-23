import * as apiCrawlerService from "../service/apiCrawler.service";

    const crawlWebsite = async (url: string) => {
        try{
            const response = await apiCrawlerService.crawlWebsite(url);
            return response;
        } catch(e){
            return { url: "Failed"};
        }
    }
    
    const getWebById = async (url: string) => { 
        try{
            const response = await apiCrawlerService.getWebById(url);
            return response;
        } catch(e){
        return { url: "Failed"};
        }
    }

    const getCrawlHistory = async () => {
        try{
            const response = await apiCrawlerService.getCrawlHistory();
            return response;
        } catch(e){
            return { url: "Failed"};
        }
    }

export { crawlWebsite, getWebById, getCrawlHistory };