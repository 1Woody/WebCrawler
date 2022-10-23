import inquirer from "inquirer";
import * as apiCrawler from '../controller/apiCrawler.ctrl';

async function promptCrawlWebsite(url = "none") {
    if (url === "none") url = await promptInsertURL();
    console.clear();
    const website = JSON.parse(JSON.stringify(await apiCrawler.crawlWebsite(url)));
    if (website.url !== "Failed") {
        const answers = await inquirer.prompt({
            type: "rawlist",
            name: "url",
            message: `Website: ${website.url} \n  Times visited: ${website.timesVisited}`,
            choices: website.links
        });
    } else {
        console.log("Failed response");
    }
}

async function promptsearchURL() {
    const url = await promptInsertURL();
    console.clear();
    const website = JSON.parse(JSON.stringify(await apiCrawler.getWebById(url)));
    if (website.url !== "Failed") {
        const answers = await inquirer.prompt({
            type: "rawlist",
            name: "url",
            message: `Website ${website.url} \n Times visited: ${website.timesVisited}`,
            choices: website.links
        });
    } else {
        console.log("Failed response");
    }
}

async function promptListAll() {
    console.clear();
    const website = JSON.parse(JSON.stringify(await apiCrawler.getCrawlHistory()));
    const websiteList: string[] = []; 
    website.forEach((element: any) => websiteList.push(element.url));
    if (website.url !== "Failed") {
        const choice = await inquirer.prompt({
            type: "rawlist",
            name: "url",
            message: `Website history cache`,
            choices: websiteList
        });
        const answers = await inquirer.prompt({
            type: "list",
            name: 'getInfo',
            message: 'Do you want this website info ?',
            default: 'No',
            choices: ['yes', 'no']
        })
        if(answers['getInfo'] === "yes") await promptCrawlWebsite(choice["url"]);

    } else {
        console.log("Failed response");
    }
}

async function promptInsertURL(): Promise<string> {
    console.clear()
    const answers = await inquirer.prompt({
        type: "input",
        name: "url",
        message: "Insert website URL:",
        default: "http://www.nnergix.com"
    });
    const url = answers["url"];
    if(url !== "") return url;
    else return url;
}

export { promptCrawlWebsite, promptsearchURL, promptListAll }