#!/usr/bin/env node

/**
 *	`lib/index.js`
 *
 *	* Supomation CLI
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// HTTP Client
const axios = require("axios");
// Terminal string styling
const chalk = require("chalk");
// Interactive logging
const { Signale } = require("signale");
// Interactive command line user interfaces
const inquirer = require("inquirer");

// Utility helper functions
const utils = require("./utils");
// Logging helper functions
const logging = require("./logging");
// Product helper functions
const products = require("./products");

/***************
 * * CONSTANTS *
 ***************/

// Target URL
const TARGET_URL = "https://www.ishopnewworld.co.nz/specials";
// Page target e.g. ?pg=2
// .. const PAGE_TARGET = "?pg=";

/***********
 * * THEME *
 ***********/

// Colors
// . const red = chalk.red;
const green = chalk.green;
const blue = chalk.cyan;

// Typography
const link = blue.underline;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Run the Supomation WebScrapper
 */
function runWebscraper() {
	// ..
	logging.logInfo("Starting Supomation WebScrapper...\n");
	// Initialize an interactive prompt
	const navPrompt = new Signale({ interactive: true, scope: "supomation" });
	navPrompt.await(
		"[%d/2] - Navigating to target page: %s",
		1,
		link(TARGET_URL)
	);
	let pageHtmlContent;
	// Make a GET request to target page
	axios
		.get(TARGET_URL)
		.then(function (response) {
			// Handle success
			navPrompt.success(
				"[%d/2] - Navigated to target page: %s\n",
				2,

				link(TARGET_URL)
			);
			pageHtmlContent = response.data; // Target page HTML content
			// . response.status // response status code
			// . response.data // response data
		})
		.catch(function (error) {
			// Handle error
			navPrompt.error(
				"[%d/2] - Error navigating to target page! %s",
				2,
				logging.logError(error)
			);
			// . error.response.status // response code
			// . error.response.data // response data
		})
		.finally(function () {
			// Always executed
			const scrapPrompt = new Signale({
				interactive: true,
				scope: "supomation"
			});
			scrapPrompt.await(
				"[%d/2] - Scraping products from target page...",
				1
			);
			// Scrap all products from target page
			let scrapedProducts = products.scrapProducts(pageHtmlContent);
			// ! TODO save products
			scrapPrompt.success(
				"[%d/2] - Scraped " +
				green("%d") +
				" products from target page!",
				2,
				scrapedProducts.length
			);
			logging.logSuccess("Done!");
			// ..
		});
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

// ------------------------------------------ //

/**
 *	* Display the main menu prompt
 */
function promptMain() {
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

// ------------------------------------------ //

/**
 *	* Supomation application entry point
 */
(function () {
	// ..
	logging.logHeading(); // Log Supomation main heading
	promptMain();
	// ..
})();

// . module.exports = {};

// EOF //
