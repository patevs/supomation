#!/usr/bin/env node

/**
 *	`lib/index.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// HTTP Client
const axios = require("axios");

// JQuery Implementation
// . const cheerio = require("cheerio");
// . const $ = cheerio.load('<h2 class="title">Hello world</h2>');

// Logging symbols
const logSymbols = require("log-symbols");

// Terminal string styling
const chalk = require("chalk");

// Clear the terminal screen
const clear = require("clear");

// Interactive command line user interfaces
const inquirer = require("inquirer");

// Utility helper functions
const utils = require("./utils");

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

// Target URL
const TARGET_URL = "https://www.ishopnewworld.co.nz/specials";
// Page target e.g. ?pg=2
// .. const PAGE_TARGET = "?pg=";
// Product CSS selector
// .. const PRODUCT_SELECTOR = ".fs-product-card";

/***********
 * * THEME *
 ***********/

// Colors
// .. const red = chalk.red;
const green = chalk.green;
const blue = chalk.cyan;
// . const magenta = chalk.magenta;

// Typography
const title = blue.bold;
const header = green.bold.underline;
// .. const link = blue.underline;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Run cheerio
 */
/*
function runCheerio() {
	// ..
	log("RUNNING CHEERIO...");
	$('h2.title').text('Hello there!');
	$('h2').addClass('welcome');
	let _ = $.html();
	log(_);
	// ..
}
*/

// ------------------------------------------ //

/**
 *	* Make a GET request to target URL
 */
function getTarget() {
	// ..
	log("\n" + logSymbols.info, "Making GET Request to taget URL...\n");
	// Make a request
	axios.get(TARGET_URL)
		.then(function (response) {
			// Handle success
			log("\n" + logSymbols.success, "Request Successful!\n");
			log("\n" + logSymbols.info, "Status code: " + response.status + "\n");
		})
		.catch(function (error) {
			// Handle error
			log("\n" + logSymbols.error, "Request Error!\n");
			log("\n" + logSymbols.info, "Status code: " + error.response.status + "\n");
		})
		.finally(function () {
			// Always executed
			log("\n" + logSymbols.success, "Done!\n");
			// . runCheerio();
			// ..
		});
	// ..
}

// ------------------------------------------//

/**
 *	* Run the Supomation webscrapper
 *
 *	@param { headless boolean flag } headless
 */
function runWebscraper() {
	// ..
	log("\n" + logSymbols.info, "Starting Supomation WebScrapper...\n");
	getTarget();
	// ..
}

/**********************
 * * PROMPT FUNCTIONS *
 **********************/

/**
 * Process user selected main menu option
 *
 * @param { user selected option } option
 * @returns { void }
 */
function processMainMenuOption(option) {
	// ..
	if (option === "r") {
		runWebscraper();
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

// ------------------------------------------//

/**
 *	* Display the main menu prompt
 */
function promptMain() {
	// ..
	log("\n--- " + title("MAIN MENU") + " ---\n");
	// Main menu prompt
	inquirer
		.prompt([
			{
				type: "list",
				name: "option",
				message: "Select an option:",
				choices: [
					"Run webscraper",
					new inquirer.Separator(),
					"Display help",
					"Print version",
					new inquirer.Separator(),
					"Quit Supomation CLI"
				],
				filter: function (val) {
					return val.charAt(0).toLowerCase();
				}
			}
		])
		.then(answers => {
			// ..
			processMainMenuOption(answers.option);
			// ..
		});
	// ..
}

// ------------------------------------------//

/**
 *	* Supomation application entry point
 */
(function () {
	// ..
	clear();
	log(header("\nWELCOME TO SUPOMATION CLI"));
	promptMain();
	// ..
})();

// . module.exports = {};

// EOF //
