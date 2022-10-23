import axios from "axios";
import { ModelMapper } from "../model/crawler.modelMapper";

const crawlWebsite = async (url: string ) => {
    const { data } = await axios({
        method: 'post',
        url: `${process.env.API}crawl`,
        data: { url : url }
    });
    if (data){
        const mapper = new ModelMapper();
        return mapper.ObjectToEntity(data);
    } else return { url: "Not found"};
}

const getWebById = async (url: string) => {
    const { data } = await axios({
        method: 'get',
        url: `${process.env.API}searchInHistory`,
        params: { url : url }
    });
    if(data) return data;
    else return { url : "Not found"}
}

const getCrawlHistory = async () => {
    
    const { data } = await axios({
        method: 'get',
        url: `${process.env.API}crawlHistory`,
    });
    return data;
}

export { crawlWebsite, getWebById, getCrawlHistory };