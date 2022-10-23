import inquirer from "inquirer";
import * as termcliService from "../service/termcli.service";
import PressToContinuePrompt from 'inquirer-press-to-continue';
import type { KeyDescriptor } from 'inquirer-press-to-continue';

inquirer.registerPrompt('press-to-continue', PressToContinuePrompt);

enum Commands {
    crawl = "Crawl website",
    searchURL = "Search website in history cache",
    listAll = "List all websites in cache",
    exit = "Exit"
}

async function promptApp() {
    console.clear()
    const answers = await inquirer.prompt({
        type: 'list',
        name: 'command',
        message: "CRAWLER CLI APP\n" + "Choose a command to execute",
        choices: Object.values(Commands)
    });
    switch(answers["command"]) {
        case Commands.crawl:
            await termcliService.promptCrawlWebsite();
            await promptKeyToContinue();
            break;
        case Commands.searchURL:
            await termcliService.promptsearchURL();
            await promptKeyToContinue();
            break;
        case Commands.listAll: 
            await termcliService.promptListAll();
            await promptKeyToContinue();
            break;
        case Commands.exit:
            console.clear()
            break;
    }
    
}

async function promptKeyToContinue(): Promise<void> {
    await inquirer.prompt<{ key: KeyDescriptor }>({
        name: 'key',
        type: 'press-to-continue',
        pressToContinueMessage: 'Press enter to continue...',
        enter: true,
    });
    await promptApp();
}

export { promptApp };