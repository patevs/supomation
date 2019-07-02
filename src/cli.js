#!/usr/bin/env node

/**
 *  `src/cli.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const chalk = require("chalk");
const logSymbols = require("log-symbols");
const inquirer = require("inquirer");

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

// Target URL
// const TARGET = "https://www.ishopnewworld.co.nz/specials";
// Product CSS selector
// const productBaseSelector = ".fs-product-card";

/***********
 * * THEME *
 ***********/

// Colors
// const red = chalk.red;
const green = chalk.green;
// const blue = chalk.blue;

// Typography
const title = green.underline.bold;
// const link = blue.underline;

/**********************
 * * HELPER FUNCTIONS *
 **********************/

/**
 * Quit Supomation CLI
 */
function quit() {
	log("\n" + logSymbols.error, "Quitting Supomation CLI...\n");
	process.exit(0);
}

//------------------------------------------//

/**
 * Process user selected main menu option
 * @param { user selected option } option
 */
function processOption(option) {
	if (option === "q") {
		quit();
	} else if (option === "s") {
		runSupomation();
	}
}

/***************
 * * FUNCTIONS *
 ***************/

/**
 * Run the Supomation webscrapper
 */
async function runSupomation() {
	//..
	log("\n" + logSymbols.info, "Starting Supomation WebScrapper...");
	// launch puppeteer browser instance
	// const browser = await initPuppeteer({ headless: false });
	// create a new page
	// const page = await browser.newPage();

	// Close the browser instance
	// await browser.close();
	// log("\n" + logSymbols.error, "Quitting Supomation CLI\n");
	//..
}

//------------------------------------------//

/**
 * Display the main menu prompt
 */
function prompt() {
	//..
	inquirer
		.prompt([
			{
				type: "list",
				name: "option",
				message: "Select an option:",
				choices: [
					"Start WebScrapper",
					"Quit Supomation CLI",
					new inquirer.Separator(),
					{
						name: "Display Help",
						disabled: "Unavailable at this time"
					}
				],
				filter: function (val) {
					return val.charAt(0).toLowerCase();
				}
			}
		])
		.then(answers => {
			//..
			processOption(answers.option);
			//..
		});
	//..
}

//------------------------------------------//

/**
* * Supomation application entry point
*/
(function () {
	//..
	log(title("\nWELCOME TO SUPOMATION CLI\n"));
	prompt();
	//..
})();


// EOF //

