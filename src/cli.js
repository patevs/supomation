#!/usr/bin/env node

/**
 *  `src/cli.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// WebDriver
const puppeteer = require("puppeteer");

// CLI iteraction
const inquirer = require("inquirer");

// Text styling
const chalk = require("chalk");
// Logging symbols
// TODO: Use signale instead of log-symbols
const logSymbols = require("log-symbols");
// Interactive logging
const { Signale } = require("signale");

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

// Target URL
const TARGET_URL = "https://www.ishopnewworld.co.nz/specials";
// Product CSS selector
const PRODUCT_SELECTOR = ".fs-product-card";

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
 *	* Quit Supomation CLI
 */
function quit() {
	log("\n" + logSymbols.error, "Quitting Supomation CLI...\n");
	process.exit(0);
}

//------------------------------------------//

/**
 *	* Process user selected main menu option
 *
 * @param { user selected option } option
 */
function processOption(option) {
	if (option === "q") {
		quit();
	} else if (option === "o") {
		// TODO: Implement blessed-contrib dashboard
		log("\n--- LAUNCHING DASHBOARD ---\n");
	} else if (option === "r") {
		runSupomation();
	}
}

/********************************
 * * PUPPETEER HELPER FUNCTIONS *
 ********************************/

/**
 *	* Initialize a puppeteer browser instance
 */
async function initPuppeteer() {
	//..
	// Initialize an interactive prompt
	const browserPrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status to prompt
	browserPrompt.await("[%d/2] - Launching Puppeteer browser...", 1);
	// Launch puppeteer browser
	const browser = await puppeteer.launch({ headless: true });
	// TODO: Log browser version
	// const browserVersion = await browser.version();
	// log("  " + logSymbols.info, "Browser version: \n\t" + green(browserVersion));
	// Log status to prompt
	browserPrompt.success("[%d/2] - Puppetter browser launched!\n", 2);
	// Return the browser instance
	return browser;
	//..
}

//------------------------------------------//

/**
 *	* Create a new page in the puppeteer browser
 *
 * @param { puppeteer browser } browser
 */
async function createPage(browser) {
	//..
	// Initialize an interactive prompt
	const pagePrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status to prompt
	pagePrompt.await("[%d/2] - Creating a new browser page...", 1);
	// Create a new page in the browser
	const page = await browser.newPage();
	// Log status to prompt
	pagePrompt.success("[%d/2] - New browser page created!\n", 2);
	// Return the new page
	return page;
	//..
}

//------------------------------------------//

/**
 *	* Navigate puppeteer to a given page
 *
 * @param { puppeteer page instance } page
 * @param { target url } url
 */
async function gotoPage(page, url) {
	//..
	// Initialize an interactive prompt
	const navPrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status to prompt
	navPrompt.await("[%d/2] - Navigating to target page...", 1);
	// Navigate the page to the target url
	await page.goto(url);
	// Log status to prompt
	navPrompt.success("[%d/2] - Navigated to target page!\n", 2);
	//..
}


//------------------------------------------//

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Scrap the product data from a given page
 *
 * @param { page to scrap } page
 */
async function scrapProducts(page) {
	//..
	// Initialize an interactive prompt
	const scrapPrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status to prompt
	scrapPrompt.await("[%d/2] - Scrapping products from target page...", 1);
	// Select all products from page
	// const allProducts =
	await page.$$(PRODUCT_SELECTOR);
	// Log status to prompy
	scrapPrompt.success("[%d/2] - Scrapped all products from target page!", 2);
	// TODO: Log number of scrapped products
	// const numProducts = allProducts.length;
	// log("\tNumber of products: " + green(numProducts));
	// log("  " + logSymbols.info, "Number of products: " + green(numProducts));
	// Process the products data
	// return processProducts(allProducts);
	//..
}

//------------------------------------------//

/**
 *	* Run the Supomation webscrapper
 */
// TODO: Add option to run in headless mode
async function runSupomation() {
	//..
	log("\n" + logSymbols.info, "Starting Supomation WebScrapper...\n");

	// Initialize a puppeteer browser instance
	const browser = await initPuppeteer();

	// Create a new page in the browser
	const page = await createPage(browser);

	// Navigate to target page
	await gotoPage(page, TARGET_URL);

	// Scrap products from target page
	// let scrappedProducts =
	await scrapProducts(page);
	// log({ scrappedProducts });

	// ! This will break if the scrapped products array is too large
	//const out = JSON.stringify(scrappedProducts, null, 2);
	// writeToFile("products-" + count + ".json", out, count);
	// }

	// TODO: Check if user wants to quit or goto main menu
	// Close the browser instance
	await browser.close();
	// Quit Supomation CLI
	quit();
	//..
}

//------------------------------------------//

/**
 *	* Display the main menu prompt
 */
// TODO: Add question to enable headless mode
// TODO: Add question for number of pages to scrap
function prompt() {
	//..
	inquirer
		.prompt([
			{
				type: "list",
				name: "option",
				message: "Select an option:",
				choices: [
					"Run WebScrapper",
					"Open Dashboard",
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
 *	* Supomation application entry point
 */
(function () {
	//..
	log(title("\nWELCOME TO SUPOMATION CLI\n"));
	prompt();
	//..
})();


// EOF //

