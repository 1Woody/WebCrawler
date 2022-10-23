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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerController = void 0;
const error_handle_1 = require("../utils/error.handle");
const express_validator_1 = require("express-validator");
class CrawlerController {
    constructor(crawlerUseCase) {
        this.crawlerUseCase = crawlerUseCase;
        this.getWebById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if ((0, express_validator_1.validationResult)(req).isEmpty()) {
                try {
                    const { url } = req.query;
                    const responseWeb = yield this.crawlerUseCase.findWebById(String(url));
                    if (responseWeb !== null)
                        res.send(responseWeb);
                    else
                        res.send({ message: "Not found" });
                }
                catch (e) {
                    (0, error_handle_1.handleHttp)(res, 'ERROR_GET_WEBSITE_FROM_HISTORY');
                }
            }
            else {
                (0, error_handle_1.handleHttp)(res, 'URL_INVALID');
            }
        });
        this.crawlWebsite = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if ((0, express_validator_1.validationResult)(req).isEmpty()) {
                try {
                    const { url } = req.body;
                    const responseWeb = yield this.crawlerUseCase.crawlWebsite(String(url));
                    if (responseWeb)
                        res.send(responseWeb);
                    else
                        res.send({ message: "Not found" });
                }
                catch (e) {
                    (0, error_handle_1.handleHttp)(res, 'ERROR_GET_WEBSITE_FROM_HISTORY');
                }
            }
            else {
                (0, error_handle_1.handleHttp)(res, 'URL_INVALID');
            }
        });
        this.getCrawlHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const responseWebList = yield this.crawlerUseCase.listCrawlHistory();
                res.send(responseWebList);
            }
            catch (e) {
                (0, error_handle_1.handleHttp)(res, 'ERROR_GET_WEBSITE_FROM_HISTORY');
            }
        });
    }
}
exports.CrawlerController = CrawlerController;
