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

			// TODO: Go back to main menu prompt
			logging.logSuccess(logging.green("Done!"));
			// ..
		});
	// ..
}

// ------------------------------------------ //

/**
 *	* saveProductData
 * 	Saves product json data to disk
 * @param { file name } filePath
 * @param { json data } jsonData
 */
async function saveProductData(filePath, jsonData) {
	// ..
	// . await writeJsonFile('foo.json', { foo: true });
	await writeJsonFile(filePath, jsonData);
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
	logging.logWelcome(); // Log Supomation main welcome
	promptMain();
	// ..
})();

// . module.exports = {};

// EOF //
