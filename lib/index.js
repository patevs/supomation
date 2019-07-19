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
// Interactive logging
const { Signale } = require("signale");
// Interactive command line user interfaces
const inquirer = require("inquirer");
// Date utilities
const dayjs = require("dayjs");
// File system
// . const fs = require("fs").promises;
// . const writeJsonFile = require('write-json-file');

// Utility helper functions
const utils = require("./utils");
// Logging helper functions
const logging = require("./logging");
// Scraper helper functions
const scraper = require("./scraper");

/***************
 * * CONSTANTS *
 ***************/

// Target URL
const TARGET_URL = "https://www.ishopnewworld.co.nz/specials";
// Page target e.g. ?pg=2
// .. const PAGE_TARGET = "?pg=";

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Run the Supomation WebScrapper
 */
async function runWebscraper() {
	// ..
	logging.logInfo("Starting Supomation WebScrapper...\n");
	// Initialize an interactive prompt
	const navPrompt = new Signale({ interactive: true, scope: "supomation" });
	navPrompt.await(
		"[%d/2] - Navigating to target page: %s",
		1,
		logging.link(TARGET_URL)
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

				logging.link(TARGET_URL)
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
			// TODO: Check pageHtmlContent is not empty. If empty log an error
			// Scrap all products from target page
			let scrapedProducts = scraper.scrapProducts(pageHtmlContent);
			// TODO: Check we have actually scraper some products
			scrapPrompt.success(
				"[%d/2] - Scraped " +
				logging.green("%d") +
				" products from target page!",
				2,
				scrapedProducts.length
			);
			// . scrapPrompt.await("[%d/3] - Saving products...", 3);
			// ! TODO make save products async
			// . saveProductData();
			// . saveProducts("products.json", scrapedProducts);
			logging.logSuccess("Done!");
			// ..
		});
	// ..
}

// ------------------------------------------ //

/**
 *	* saveProductData
 */
/*
async function saveProductData() {
	// ..
	// . await writeJsonFile(filePath, JsonData);
	await writeJsonFile('foo.json', { foo: true });
	// ..
}
*/

// ------------------------------------------ //

/* .
async function saveProducts(fileName, data) {
	// .
	const productData = JSON.stringify(data, null, 2);
	// . console.log(productData);
	// . const file = await fs.readFile('filename.txt', 'utf8');
	// . logging.logSuccess("Saving products...");
	// TODO: Make this async
	fs.writeFile(fileName, productData);
	// . await fs.writeFile('filename.txt', 'test');
	// . const out = JSON.stringify(fileName, null, 2);
	// . await fs.writeFile(productDataFileName, productData);
}
*/

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
