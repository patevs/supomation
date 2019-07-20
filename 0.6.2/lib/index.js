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
// JSON file writer
const writeJsonFile = require('write-json-file');

// Utility helper functions
const utils = require("./utils");
// Logging helper functions
const logging = require("./logging");
// Scraper helper functions
const scraper = require("./scraper");

/***************
 * * CONSTANTS *
 ***************/

// Base URL
const BASE_URL = "https://www.ishopnewworld.co.nz"
// Target URL
// . const TARGET_URL = BASE_URL + "/specials";
// Page target e.g. ?pg=2
// .. const PAGE_TARGET = "?pg=";

// Categories base URL
const CATEGORY_BASE_URL = BASE_URL + "/category/";

// Array of all categories
const ALL_CATEGORIES = [
	"fresh-foods-and-bakery",
	"chilled-frozen-and-desserts",
	"pantry",
	"personal-care",
	"kitchen-dining-and-household"
]

/***************
 * * FUNCTIONS *
 ***************/

function scrapPage(targetPage, targetPageUrl) {
	// ..
	// Target page HTML content to return
	let pageHtmlContent = null;
	// Make GET request to target page
	axios
		.get(targetPageUrl)
		.then(function (response) {
			// Handle success
			// . logging.logSuccess("Navigated to: " + logging.link(targetPageUrl));
			// . prompt.success("[%d/2] - Navigated to: %s", 2, logging.link(targetPageUrl));
			pageHtmlContent = response.data; // Target page HTML content
		})
		.catch(function (error) {
			// Handle error
			// . logging.logError("Error navigating to page! " + error);
			// . prompt.error("[%d/2] - Error navigating to page! %s", 2, logging.logError(error));
			// TODO: Log error.response.status & error.response.data
		})
		.finally(async function () {
			// Check we have retrieved target page HTML content
			if (pageHtmlContent === null) {
				// . prompt.error("[%d/2] - Error retrieving page HTML content! %s", 2);
			} else {
				// TODO: Process scraped products
				// . prompt.success("[%d/2] - Retrieved page HTML content!", 2);
				let scrapedProducts = scraper.scrapProducts(pageHtmlContent);
				// . const numProducts = scrapedProducts.length;
				// . prompt.success("[%d/2] - Scraped %s products from page!\n", 2, logging.green(numProducts));
				await saveProductData(targetPage + ".json", scrapedProducts);
				logging.logSuccess(logging.green(targetPage) + " data saved to file!");
			}
		});
	// ..
}

function scrapCategory(category) {
	// ..
	logging.logInfo("Scraping Category: " + logging.green(category));
	const categoryUrl = CATEGORY_BASE_URL + category;
	// . const scrapPrompt = new Signale({ interactive: true, scope: "supomation" });
	// . scrapPrompt.await("[%d/2] - Navigating to: %s", 1, logging.link(categoryUrl));
	// . scrapPage(scrapPrompt, category, categoryUrl);
	scrapPage(category, categoryUrl);
	// ..
}

function runCategoryWebscraper() {
	// ..
	console.log();
	logging.logInfo("Starting Supomation WebScrapper...\n");
	for (let i = 0; i < ALL_CATEGORIES.length; i++) {
		const CATEGORY = ALL_CATEGORIES[i];
		// Scrap all products from target page
		scrapCategory(CATEGORY);
		// . break;
	}
	// ..
}

// ------------------------------------------ //

/**
 *	* saveProductData
 * 	Saves product json data to disk
 * @param { file name } filePath
 * @param { json data } jsonData
 */
// TODO: Move this to utils module
async function saveProductData(fileName, jsonData) {
	// . const savePrompt = new Signale({ interactive: true, scope: "supomation" });
	const d = new Date();
	const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
	const filePath = "data/" + date + "/" + fileName;
	// . savePrompt.await("[%d/2] - Saving products data to file: %s", 1, logging.green(filePath));
	// . await writeJsonFile('foo.json', { foo: true });
	await writeJsonFile(filePath, jsonData);
	// . savePrompt.success("[%d/2] - Saved products data to file: %s", 2, logging.green(filePath));
}

/**********************
 * * PROMPT FUNCTIONS *
 **********************/

/**
 *	* processMainMenuOption
 * 	Process user selected main menu option
 * @param { user selected option } option
 * @returns { void }
 */
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

// ------------------------------------------ //

/**
 *	* promptMain
 * Display the main menu prompt
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
	logging.logWelcome(); // Log Supomation main welcome
	promptMain();
	// ..
})();

// . module.exports = {};

// EOF //
