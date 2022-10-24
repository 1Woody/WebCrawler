import express from "express";
import * as dotenv from 'dotenv';
import cors from "cors";
import dbConnect from "./infrastructure/db/mongo";
import CrawlerRoute from "./infrastructure/route/crawler.route";

dotenv.config();
const PORT = process.env.PORT || 3001;
 
const app = express();

app.use(cors());
app.use(express.json());
app.use(CrawlerRoute);

dbConnect();

const server = app.listen(PORT, () => console.log(`Crawler, Server up http://localhost:${PORT}`));

export { app, server }