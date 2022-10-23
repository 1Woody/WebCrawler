"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CrawlerSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    links: {
        type: [String],
    },
    timesVisited: {
        type: Number,
    },
});
const CrawlerModel = (0, mongoose_1.model)("crawler", CrawlerSchema);
exports.default = CrawlerModel;
