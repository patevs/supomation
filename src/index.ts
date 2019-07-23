#!/usr/bin/env node

/**
 *  `src/index.ts`
 *
 *  * Supomation CLI
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// Logging utilities
import * as logging from "./utils/logging";
// Helper functions
import * as utils from "./utils/utilities";

// Interactive prompts
import inquirer from "inquirer";
// HTTP client
import axios from "axios";

import fs from "fs";

/***************
 * * CONSTANTS *
 ***************/

const VIRTUAL_MAILER_URL: string =
    "https://www.newworld.co.nz/savings/virtualmailer/";

// cookie
// new-world-store-id=storenodeid=1260;

// Base URL
// . const BASE_URL = "https://www.ishopnewworld.co.nz";
// Target URL
// . const TARGET_URL = BASE_URL + "/specials";
// Page target e.g. ?pg=2
// .. const PAGE_TARGET = "?pg=";

// Categories base URL
// . const CATEGORY_BASE_URL = BASE_URL + "/category/";

// Array of all categories
/*
const ALL_CATEGORIES = [
    "fresh-foods-and-bakery",
    "chilled-frozen-and-desserts",
    "pantry",
    "personal-care",
    "kitchen-dining-and-household"
];
*/

function writeToFile(filePath: string, data: any): void {
    fs.writeFileSync(filePath, data);
}

/***************
 * * FUNCTIONS *
 ***************/

function createAxiosInstance() {
    // TODO: Allow selection of store id
    const instance = axios.create({
        baseURL: VIRTUAL_MAILER_URL,
        timeout: 1000,
        headers: { Cookie: "new-world-store-id=storenodeid=1260" }
    });
    instance.get(VIRTUAL_MAILER_URL).then(function(response) {
        // . logging.log(response);
        const data = response.data;
        // . logging.log(data);
        writeToFile("data/data.html", data);
        // Write data to file
    });
}

function getVirtualMailer() {
    // TODO: Enumerate all store id's
    logging.log("\n TO BE IMPLEMENTED: GET VIRTUAL MAILER...\n");
    // Navigate to virtual mailer page
    createAxiosInstance();
}

/* axios async example
async function getUser() {
    try {
        const response = await axios.get("/user?ID=12345");
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
*/

/**********************
 * * PROMPT FUNCTIONS *
 **********************/

/**
 *	* processMainMenuOption
 * 	Process user selected main menu option
 * @param { prompt answers } answers
 * @returns { void }
 */
function processMainMenuOption(answers: any): void {
    // Get user selected option
    const option: string = answers.option;
    // Process option
    switch (option) {
        case "r":
            logging.log("\n TO BE IMPLEMENTED: RUN WEBSCRAPER...\n");
            // . runCategoryWebscraper();
            // . runWebscraper();
            break;
        case "g":
            getVirtualMailer();
            break;
        case "d":
            utils.help();
            promptMain();
            break;
        case "p":
            utils.version();
            promptMain();
            break;
        case "q":
            utils.quit();
            break;
        default:
            logging.logError(
                "Main menu option: " + option + " is not recognised"
            );
            promptMain();
    }
}

// ------------------------------------------ //

/**
 *	* promptMain
 * Display the main menu prompt
 * @returns { void }
 */
function promptMain(): void {
    // Print menu title
    logging.logTitle("MAIN MENU");
    // Main menu prompt
    inquirer
        .prompt([
            {
                type: "list",
                name: "option",
                message: "Select an option:",
                choices: [
                    "Run WebScraper",
                    "Get Virtual Mailer",
                    new inquirer.Separator(),
                    "Display Help",
                    "Print Version",
                    new inquirer.Separator(),
                    "Quit Supomation CLI"
                ],
                filter: function(val: string) {
                    return val.charAt(0).toLowerCase();
                }
            }
        ])
        .then(answers => {
            processMainMenuOption(answers);
        });
}

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

/**
 *	* Supomation CLI entry point
 */
(function() {
    // ..
    logging.logWelcome(); // Log Supomation main welcome
    promptMain(); // Main menu prompt
    // ..
})();

// EOF //
