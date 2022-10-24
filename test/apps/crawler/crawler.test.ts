import { app , server } from '../../../src/crawler/crawler.app';
import mongoose from 'mongoose';
import supertest from 'supertest';

const api = supertest(app);

describe("Crawler", () => {
    describe("GET /crawlHistory", () => {
        describe("given the response exists", () => {
            
            test("should return a 200 status code", async () => {
                await api.get("/crawlHistory");
                expect(200)
            });
            
            test("should return json content type", async () => {
                await api.get("/crawlHistory")
                .expect('Content-Type', /application\/json/);
            });

            test("should return JsonArray Object", async () => {
                const response = await api.get("/crawlHistory")   
                expect(response.body).toBeInstanceOf(Array);
                
            });
        });

    });

    describe.skip("GET /searchInHistory", () => {

    });

    describe.skip("POST /crawl", ()=> {

    });

   
});

afterAll(() => { 
    mongoose.connection.close();
    server.close();
});