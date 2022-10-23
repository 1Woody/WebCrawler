"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
const crawler_schema_1 = __importDefault(require("../model/crawler.schema"));
const modelMapper_1 = require("./modelMapper");
/**
 * Infra Mongo
 */
class MongoRepository {
    findWebById(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoCrawler = yield crawler_schema_1.default.findOne({ url });
            if (mongoCrawler === null)
                return mongoCrawler;
            else {
                const mapper = new modelMapper_1.ModelMapper();
                return mapper.MongotoEntity(mongoCrawler);
            }
        });
    }
    insertCrawledWeb(crawler) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoCrawler = yield crawler_schema_1.default.create(crawler);
            const mapper = new modelMapper_1.ModelMapper();
            const crawlerEnt = mapper.MongotoEntity(mongoCrawler);
            return crawlerEnt;
        });
    }
    listCrawlHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoCrawlerList = yield crawler_schema_1.default.find();
            const mapper = new modelMapper_1.ModelMapper();
            let crawlerList = [];
            mongoCrawlerList.map((e) => {
                crawlerList.push(mapper.MongotoEntity(e));
            });
            return crawlerList;
        });
    }
}
exports.MongoRepository = MongoRepository;
