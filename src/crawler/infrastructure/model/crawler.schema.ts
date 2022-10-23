import { Schema, model } from "mongoose";
import { CrawlerEntity } from "../../domain/crawler.entity";

const CrawlerSchema = new Schema<CrawlerEntity>(
    {
        url: {
            type: String,
            required: true,
            unique: true,
        },
        links: {
            type: [String],

        },
        timesVisited: {
            type : Number,
        },
    }
);

const CrawlerModel = model("crawler", CrawlerSchema);

export default CrawlerModel;