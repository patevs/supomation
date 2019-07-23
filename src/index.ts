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

// Interactive prompts
import inquirer from "inquirer";

/**********************
 * * PROMPT FUNCTIONS *
 **********************/

/**
 *	* processMainMenuOption
 * 	Process user selected main menu option
 * @param { user selected option } option
 * @returns { void }
 */
/*
function processMainMenuOption(option) {
    // ..
    if (option === "r") {
        runCategoryWebscraper();
        // . runWebscraper();
    } else if (option === "d") {
        utils.help();
        promptMain();
    } else if (option === "p") {
        utils.version();
        promptMain();
    } else if (option === "q") {
        utils.quit();
    }
    // ..
}
*/

// ------------------------------------------ //

/**
 *	* promptMain
 * Display the main menu prompt
 */
function promptMain(): void {
    // ..
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
            console.log(answers);
            // . processMainMenuOption(answers.option);
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
