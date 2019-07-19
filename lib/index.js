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

// Base URL
const BASE_URL = "https://www.ishopnewworld.co.nz"
// Target URL
const TARGET_URL = BASE_URL + "/specials";
// Page target e.g. ?pg=2
// .. const PAGE_TARGET = "?pg=";

// Categories base URL
const CATEGORY_BASE_URL = BASE_URL + "/category/";
// TODO: Put all categories into an array
// Fresh Foods & Bakery
// . const CATEGORY_FRESH = BASE_URL + "/category/fresh-foods-and-bakery"
// . https://www.ishopnewworld.co.nz/category/fresh-foods-and-bakery
// Chilled, Frozen & Desserts
// . https://www.ishopnewworld.co.nz/category/chilled-frozen-and-desserts
// Pantry
// . https://www.ishopnewworld.co.nz/category/pantry
// Personal Care
// . https://www.ishopnewworld.co.nz/category/personal-care
// Kitchen, Dining & Household
// . https://www.ishopnewworld.co.nz/category/kitchen-dining-and-household

// Array of all categories
const ALL_CATEGORIES = [
	"fresh-foods-and-bakery"
]

/***************
 * * FUNCTIONS *
 ***************/

function scrapPage(prompt, targetPageUrl) {
	// ..
	// . logging.logInfo("URL: " + targetPageUrl);
	// Target page HTML content to return
	let pageHtmlContent = null;
	// Make GET request to target page
	axios
		.get(targetPageUrl)
		.then(function (response) {
			// Handle success
			prompt.success("[%d/2] - Navigated to category page: %s\n", 2, logging.link(targetPageUrl));
			// TODO: return page html content
			pageHtmlContent = response.data; // Target page HTML content
		})
		.catch(function (error) {
			// Handle error
			prompt.error("[%d/2] - Error navigating to category page! %s", 2, logging.logError(error));
			// TODO: Log error.response.status & error.response.data
		})
		.finally(function () {
			// Always executed
			/*
			const scrapPrompt = new Signale({ interactive: true, scope: "supomation" });
			scrapPrompt.await("[%d/2] - Scraping products from target page...", 1);
			// Check we have retrieved the target page HTML content
			if (pageHtmlContent === null) {
				scrapPrompt.error("[%d/2] - Error retrieving target page HTML content!", 2);
			} else {
				// Scrap all products from target page
				let scrapedProducts = scraper.scrapProducts(pageHtmlContent);
				// TODO: Check we have actually scraped some products
				const numProducts = scrapedProducts.length;
				scrapPrompt.success("[%d/2] - Scraped %s products from target page!", 2, logging.green(numProducts));
			}
			*/

			// TODO: Go back to main menu prompt or prompt user what to do with scraped data
			logging.logSuccess(logging.green("Done!"));
			// Return scraped page HTML content
			return pageHtmlContent;
			// TODO: return scraped data
		});
	// ..
}

function scrapCategory(category) {
	// ..
	logging.logInfo("Scraping category: " + logging.green(category) + "\n");
	const categoryUrl = CATEGORY_BASE_URL + category;
	const scrapPrompt = new Signale({ interactive: true, scope: "supomation" });
	scrapPrompt.await("[%d/2] - Navigating to category page: %s", 1, logging.link(categoryUrl));
	scrapPage(scrapPrompt, categoryUrl);
	// TODO: Return scraped data
	// ..
}

function runCategoryWebscraper() {
	// ..
	logging.logInfo("Starting Supomation WebScrapper...");
	// Iterate over all categories
	for (let i = 0; i < ALL_CATEGORIES.length; i++) {
		const CATEGORY = ALL_CATEGORIES[i];
		scrapCategory(CATEGORY);
	}
	// ..
}

// ------------------------------------------ //

/**
 *	* runWebscraper
 *	Run the Supomation WebScrapper
 */
// eslint-disable-next-line no-unused-vars
/*
function runWebscraper() {
	// ..
	logging.logInfo("Starting Supomation WebScrapper...\n");
	// Initialize an interactive prompt
	const navPrompt = new Signale({ interactive: true, scope: "supomation" });
	navPrompt.await(
		"[%d/2] - Navigating to target page: %s",
		1,
		logging.link(TARGET_URL)
	);
	let pageHtmlContent = null;
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
			// Check we have retrieved the target page HTML content
			if (pageHtmlContent === null) {
				scrapPrompt.error("[%d/2] - Error retrieving target page HTML content!", 2);
			} else {
				// Scrap all products from target page
				let scrapedProducts = scraper.scrapProducts(pageHtmlContent);
				// TODO: Check we have actually scraped some products
				// . const numProducts = scrapedProducts.length;
				scrapPrompt.success(
					"[%d/2] - Scraped " +
					logging.green("%d") +
					" products from target page!\n",
					2,
					scrapedProducts.length
				);
				const savePrompt = new Signale({
					interactive: true,
					scope: "supomation"
				});
				const d = new Date();
				const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
				const filePath = "data/" + date + "/products.json";
				savePrompt.await("[%d/2] - Saving products data to file: %s", 1, logging.green(filePath));
				saveProductData(filePath, scrapedProducts);
				savePrompt.success("[%d/2] - Saved products data to file: %s", 2, logging.green(filePath));
			}

			// TODO: Go back to main menu prompt or prompt user what to do with scraped data
			logging.logSuccess(logging.green("Done!"));
			// ..
		});
	// ..
}
*/

// ------------------------------------------ //

/**
 *	* saveProductData
 * 	Saves product json data to disk
 * @param { file name } filePath
 * @param { json data } jsonData
 */
// TODO: Move this to utils module
/*
async function saveProductData(filePath, jsonData) {
	// . await writeJsonFile('foo.json', { foo: true });
	await writeJsonFile(filePath, jsonData);
}
*/

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
