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
// Terminal string styling
const chalk = require("chalk");
// Logging symbols
const logSymbols = require("log-symbols");
// Interactive logging
const { Signale } = require("signale");
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
const link = blue.underline;

/***********************
 * * SCRAPER FUNCTIONS *
 ***********************/

/**
 *	* Get the name of a given product element
 *
 * @param { product element } productElem
 * @returns { name of product }
 */
// TODO: Move this into its own module
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
// TODO: Move this into its own module
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
 *	* Process the data for a given product
 *
 * @param { Product's name } pname
 * @param { Product's data } pdata
 * @returns { product }
 */
// TODO: Move this into its own module
function processProduct(pname, pdata) {
	// ..
	// Get the product's unique id
	let pid = pdata.productId;
	// Get the product's details
	let pdetails = pdata.ProductDetails;
	// Get the product's price info
	let priceMode = pdetails.PriceMode;
	let pricePer = pdetails.PricePerItem;
	let baseUnit = pdetails.PricePreBaseUnitText;
	// Create a product object
	let product = {
		uid: pid,
		name: pname,
		pricePer: pricePer,
		priceMode: priceMode,
		baseUnit: baseUnit
	};
	// Return the processed product
	return product;
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
	// . log("\n" + logSymbols.info, "Scraping all products from target page...");
	// Array of all products to return
	let allProducts = [];
	// Load the target page HTML content into cheerio
	const $ = cheerio.load(pageHtmlContent);
	// Select all products from target page
	let productElems = $(PRODUCT_SELECTOR);
	let numProducts = productElems.length;
	// Iterate over all products
	for (let i = 0; i < numProducts; i++) {
		// Get the current product element
		let productElem = productElems[i];
		// Get the name of the current product
		let pname = getProductName(productElem);
		// Get the data for the current product
		let pdata = getProductData(productElem);
		// Process the current product
		let product = processProduct(pname, pdata);
		// Push product object into products array
		allProducts.push(product);
		// . break;
	}

	// Return array containing all products
	return allProducts;
	// ..
}

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Run the Supomation webscrapper
 */
function runWebscraper() {
	// ..
	// . let numProducts = 0;
	log("\n" + logSymbols.info, "Starting Supomation WebScrapper...\n");
	// Initialize an interactive prompt
	const navPrompt = new Signale({ interactive: true, scope: "supomation" });
	navPrompt.await("[%d/2] - Navigating to target page: %s", 1, link(TARGET_URL));
	// Target page HTML content
	let pageHtmlContent;
	// Make a request
	axios.get(TARGET_URL)
		.then(function (response) {
			// Handle success
			navPrompt.success("[%d/2] - Navigated to target page: %s\n", 2, link(TARGET_URL));
			// Get target page HTML content
			pageHtmlContent = response.data;
			// . log("\n" + logSymbols.info, "Response status code: " + response.status);
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
			// Initialize an interactive prompt
			const scrapPrompt = new Signale({ interactive: true, scope: "supomation" });
			scrapPrompt.await("[%d/2] - Scraping products from target page...", 1);
			// Scrap all products from target page
			let scrapedProducts = scrapProducts(pageHtmlContent);
			// . log("Num products: " + scrapedProducts.length);
			scrapPrompt.success(
				"[%d/2] - Scraped " + green("%d") + " products from target page!",
				2,
				scrapedProducts.length
			);
			log("\n" + logSymbols.success, "Done!");
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
