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
const cheerio = require("cheerio");
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

// Terminal string styling
const chalk = require("chalk");

// Clear the terminal screen
const clear = require("clear");

// Interactive command line user interfaces
const inquirer = require("inquirer");

// Utility helper functions
const utils = require("./utils");

// . const myModule = require("./module");
// . let val = myModule.hello(); // . val is "Hello"

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
// .. const blue = chalk.cyan;
const magenta = chalk.magenta;

// Typography
const title = magenta.bold;
const header = green.bold.underline;
// .. const link = blue.underline;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Run cheerio
 */
function runCheerio() {
	// ..
	log("RUNNING CHEERIO...");
	$('h2.title').text('Hello there!');
	$('h2').addClass('welcome');
	let _ = $.html();
	log(_);
	// ..
}

// ------------------------------------------//

/**
 *	* Make a GET Request
 */
function makeRequest() {
	// ..
	log("\nMAKING REQUEST...");
	// Make a request
	axios.get(TARGET_URL)
		.then(function (response) {
			// Handle success
			log("\nREQUEST SUCCESS!");
			// . log(response.data);
			log("Status code: " + response.status);
			// . log(response.statusText);
			// . log(response.headers);
			// . log(response.config);
			// . log(response);
		})
		.catch(function (error) {
			// Handle error
			// . log(error);
			log("\nREQUEST ERROR!");
			log(error.response.status);
			// . log(error.response.data);
			// . log(error.response.headers);
		})
		.finally(function () {
			// Always executed
			log("\nDONE!");
			runCheerio();
			// ..
		});
	// ..
}

// ------------------------------------------//

/**
 * Process user selected main menu option
 *
 * @param { user selected option } option
 * @returns { void }
 */
function processMainMenuOption(option) {
	// ..
	if (option === "q") {
		utils.quit();
	} else if (option === "r") {
		// . promptHeadless();
		makeRequest();
	} else if (option === "d") {
		log("\nDisplay help...");
	} else if (option === "p") {
		log("\nPrint version...");
	}
	// ..
}

// ------------------------------------------//

/**
 *	* Display the main menu prompt
 */
function promptMain() {
	// ..
	log("\n-- " + title("MAIN MENU") + " --\n");
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
	// . log(val);
	clear();
	log(header("\nWELCOME TO SUPOMATION CLI"));
	promptMain();
	// . makeRequest();
	// ..
})();

// . module.exports = {};

// EOF //
