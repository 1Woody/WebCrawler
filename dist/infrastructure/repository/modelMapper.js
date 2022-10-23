"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelMapper = void 0;
class ModelMapper {
    MongotoEntity(mongoObject) {
        const crawler = {
            url: mongoObject.url,
            links: mongoObject.links,
            timesVisited: mongoObject.timesVisited
        };
        return crawler;
    }
}
exports.ModelMapper = ModelMapper;
