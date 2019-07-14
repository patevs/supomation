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
const PRODUCT_SELECTOR = ".fs-product-card";

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

/***********************
 * * SCRAPER FUNCTIONS *
 ***********************/

/**
 *	* Get the name of a given product element
 *
 * @param { product element } productElem
 * @returns { name of product }
 */
function getProductName(productElem) {
	// ..
	// Load product element into cheerio
	const $ = cheerio.load(productElem);
	// Product name CSS selector
	let nameSelector = ".u-p2";
	// Get products name
	let pname = $(nameSelector).text();
	// Remove whitespace and return the result
	return pname.trim();
	// ..
}

// ------------------------------------------//

/**
 *	* Get the data for a given product element
 *
 * @param { product element } productElem
 * @returns { product data }
 */
function getProductData(productElem) {
	// ..
	// Load product element into cheerio
	const $ = cheerio.load(productElem);
	// Product data CSS selector
	let dataSelector = PRODUCT_SELECTOR + "__footer-container";
	// Get the product's data
	let pdata = $(dataSelector).attr("data-options");
	// Parse product data as JSON and return the result
	return JSON.parse(pdata);
	// ..
}

// ------------------------------------------ //

/**
 *	* Scrap the product data from the current page
 *
 * @param { target page html content } pageHtmlContent
 */
function scrapProducts(pageHtmlContent) {
	// ..
	log("\n" + logSymbols.info, "Scraping product data from target page...");
	// Load the target page HTML content into cheerio
	const $ = cheerio.load(pageHtmlContent);
	// Select all products from target page
	let productElems = $(PRODUCT_SELECTOR);
	// . log(productElem);
	let numProducts = productElems.length;
	log("Number of products: " + numProducts);
	// Iterate over all products
	for (let i = 0; i < numProducts; i++) {
		// Get the current product element
		let productElem = productElems[i];
		// Get the name of the current product
		let pname = getProductName(productElem);
		// Get the data for the current product
		let pdata = getProductData(productElem);
		log(pname);
		log(pdata);
		// TODO: Process the product name & data
		break;
	}
	// ..
}

/***************
 * * FUNCTIONS *
 ***************/

// ------------------------------------------ //

/**
 *	* Make a GET request to target URL
 */
function getTargetPage() {
	// ..
	log("\n" + logSymbols.info, "Making GET Request to target URL...");
	// Target page HTML content
	let pageHtmlContent;
	// Make a request
	axios.get(TARGET_URL)
		.then(function (response) {
			// Handle success
			log("\n" + logSymbols.success, "Request Successful!");
			log("\n" + logSymbols.info, "Response status code: " + response.status);
			pageHtmlContent = response.data;
			// . log("\n" + logSymbols.info, "Response data: " + response.data);
		})
		.catch(function (error) {
			// Handle error
			log("\n" + logSymbols.error, "Request Error!\n");
			log("\n" + logSymbols.info, "Response status code: " + error.response.status);
			log("\n" + logSymbols.info, "Response data: " + error.response.data);
		})
		.finally(function () {
			// Always executed
			log("\n" + logSymbols.success, "Done!\n");
			scrapProducts(pageHtmlContent);
			// ..
		});
	// ..
}

// ------------------------------------------//

/**
 *	* Run the Supomation webscrapper
 */
function runWebscraper() {
	// ..
	log("\n" + logSymbols.info, "Starting Supomation WebScrapper...");
	getTargetPage();
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
