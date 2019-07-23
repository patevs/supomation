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

// Logging Utilities
import * as logging from "./utils/logging";
// Helper Functions
import * as utils from "./utils/utilities";
// Scraper Helper Functions
import * as scraper from "./utils/scraper";

// Interactive Prompts
import inquirer from "inquirer";
// HTTP Client
import axios from "axios";

// Environment config
// . require("dotenv").config();
// . const testKey = process.env.TEST_KEY;
// . logging.log(testKey);
// . import dotenv from "dotenv";

// File system
// import fs from "fs";

/***************
 * * CONSTANTS *
 ***************/

// const VIRTUAL_MAILER_URL: string =
//    "https://www.newworld.co.nz/savings/virtualmailer/";

// https://app.redpepperdigital.net/app/redpepper/home/91

const BASE_URL = "https://www.ishopnewworld.co.nz";
// . const TARGET_URL = BASE_URL + "/specials";
// . const PAGE_TARGET = "?pg=";
const CATEGORY_BASE_URL = BASE_URL + "/category/";

// Array of all categories
const ALL_CATEGORIES = [
    "fresh-foods-and-bakery",
    "chilled-frozen-and-desserts",
    "pantry",
    "personal-care",
    "kitchen-dining-and-household"
];

/***************
 * * FUNCTIONS *
 ***************/

/*
function writeToFile(filePath: string, data: any): void {
    fs.writeFileSync(filePath, data);
}
*/

// ------------------------------------------ //

async function runWebScraper() {
    logging.log("\n TO BE IMPLEMENTED: RUN WEBSCRAPER...\n");
    const TARGET_URL = CATEGORY_BASE_URL + ALL_CATEGORIES[0];
    logging.log(TARGET_URL + "\n");
    try {
        const response = await axios.get(TARGET_URL);
        const data = response.data;
        const products = await scraper.scrapProducts(data);
        await logging.log(products);
    } catch (error) {
        logging.logError(error);
    }
}

/**********************
 * * PROMPT FUNCTIONS *
 **********************/

/**
 *	* processMainMenuOption
 * 	Process user selected main menu option
 * @param { prompt answers } answers
 * @returns { void }
 */
async function processMainMenuOption(answers: any) {
    // Get user selected option
    const option: string = answers.option;
    // Process option
    switch (option) {
        case "r":
            await runWebScraper();
            promptMain();
            break;
        case "g":
            logging.log("\n TO BE IMPLEMENTED: GET VIRTUAL MAILER...\n");
            // . getVirtualMailer();
            promptMain();
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
