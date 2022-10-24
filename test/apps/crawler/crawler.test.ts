import { app , server } from '../../../src/crawler/crawler.app';
import mongoose from 'mongoose';
import supertest from 'supertest';

const api = supertest(app);

describe("Crawler", () => {
    describe("GET /crawlHistory", () => {
        describe("given a correct request", () => {
            
            test("should return a 200 status code", async () => {
                const response = await api.get("/crawlHistory");
                expect(response.statusCode).toBe(200);
            });
            
            test("should return json content type", async () => {
                const response = await api.get("/crawlHistory");
                expect(response.headers["content-type"]).toEqual(
                    expect.stringContaining("json")
                );
            });

            test("should return JsonArray Object", async () => {
                const response = await api.get("/crawlHistory")   
                expect(response.body).toBeInstanceOf(Array);
                
            });
        });
    });

    describe("GET /searchInHistory", () => {

        const queryurl = "http://www.nnergix.com"

        describe("given a correct request", () => {
            
            test("should return a 200 status code", async () => {
                const response = await api.get("/searchInHistory?url="+queryurl);
                expect(response.statusCode).toBe(200);
            });
            
            test("should return json content type", async () => {
                const response = await api.get("/searchInHistory?url="+queryurl);
                expect(response.headers["content-type"]).toEqual(
                    expect.stringContaining("json")
                );
            });

            test("should return Object", async () => {
                const response = await api.get("/searchInHistory?url="+queryurl)   
                expect(response.body).toBeInstanceOf(Object);
                
            });
        });

        describe("given a incorrect request", () => {
            
            test("should return a 500 status code", async () => {
                const queryList: Array<string> = [
                    "htp://not.url",
                    ""
                ]

                for (const queryurl of queryList){
                    const response = await api.get("/searchInHistory?url="+queryurl);
                    expect(response.statusCode).toBe(500);
                }
            });
        });
    });

    describe("POST /crawl", ()=> {

        describe("given a correct request", () => {

            test("should return a 200 status code", async () => {
                const bodyList: Array<Object> = 
                [
                    { url : "http://www.nnergix.com" },
                    { url : "http://www.google.com"  }
                ]
                for (const body of bodyList) {
                    const response = await api.post("/crawl").send(body);
                    expect(response.statusCode).toBe(200);
                }
            });
            
            test("should return json content type", async () => {
                const url = { url : "http://www.nnergix.com" };
                const response = await api.post("/crawl").send(url);
                expect(response.headers["content-type"]).toEqual(
                    expect.stringContaining("json")
                );
            });

            test("should return Object", async () => {
                const url = { url : "http://www.nnergix.com" };
                const response = await api.post("/crawl").send(url); 
                expect(response.body).toBeInstanceOf(Object);
            });

        });

        describe("given a incorrect request", () => {

            test("should return a 500 status code", async () => {
                const bodyList: Array<Object> = [
                    { url : "htp://not.url"  },
                    { url : "" }

                ]
                for (const body of bodyList){
                    const response = await api.post("/crawl").send(body);
                    expect(response.statusCode).toBe(500);
                }
            });
        });
    });
});

afterAll(() => { 
    mongoose.connection.close();
    server.close();
});