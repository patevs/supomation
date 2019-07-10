#!/usr/bin/env node

/**
 *  `cli.js`
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
const logSymbols = require("log-symbols");
// Interactive logging
const { Signale } = require("signale");

// Blessed dashboard
const blessed = require("blessed");
const contrib = require("blessed-contrib");

// Clear terminal
const clear = require("clear");

// File system
const fs = require("fs");

/*************
 * * GLOBALS *
 *************/

// TODO: Add scraper has run global boolean
// TODO: Save scraped data into global variable

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
const red = chalk.red;
const green = chalk.green;
const blue = chalk.cyan;

// Typography
const title = green.bold;
const header = title.underline;
const link = blue.underline;

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
 *	* Write some data to file
 */
function writeToFile(fileName, content) {
	//..
	// Initialize an interactive prompt
	const writePrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status
	writePrompt.await("[%d/2] - Saving data to file as: %s", 1, green(fileName));
	// Create data directory if doesnt exists
	if (!fs.existsSync("data")) {
		fs.mkdirSync("data");
	}
	// Build file path
	const filePath = "data/" + fileName;
	// Write data to file
	fs.writeFile(filePath, content, (err) => {
		if (err) {
			// Log any errors
			writePrompt.error(red(err));
			return;
		}
		// Log success
		writePrompt.success("[%d/2] - Data file saved as: %s", 2, green(fileName));
	});
	//..
}

//------------------------------------------//

/**
 *	* Load the blessed dashboard
 */
function loadDashboard() {
	//..
	// Dashboard screen
	let screen = blessed.screen();
	// Set screen title
	screen.title = "SUPOMATION DASHBOARD";
	// Use grid layout
	let grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

	// grid.set(row, col, rowSpan, colSpan, obj, opts)

	// Dashboard title
	grid.set(0, 4, 1, 4, blessed.box, {
		content: "SUPOMATION DASHBOARD",
		align: "center",
		border: {
			type: "line"
		},
		style: {
			border: {
				fg: "green"
			}
		}
	});
	// Dashboard content
	grid.set(1, 0, 4, 4, blessed.box, {
		label: "Content Top Left",
		content: "CONTENT TOP LEFT",
		align: "center",
		valign: "middle",
		style: {
			border: {
				fg: "cyan"
			}
		}
	});
	grid.set(1, 4, 4, 4, blessed.box, {
		content: "CONTENT TOP CENTER",
		align: "center",
		valign: "middle",
		style: {
			border: {
				fg: "red"
			}
		}
	});
	grid.set(1, 8, 11, 4, blessed.box, {
		label: "Content Right",
		content: "CONTENT RIGHT",
		align: "center",
		valign: "middle",
		style: {
			border: {
				fg: "yellow"
			}
		}
	});
	grid.set(5, 0, 7, 8, blessed.box, {
		label: "Content Bottom",
		content: "CONTENT BOTTOM",
		align: "center",
		valign: "middle",
		style: {
			border: {
				fg: "magenta"
			}
		}
	});
	// let map =
	// grid.set(0, 0, 4, 4, contrib.map, { label: "World Map" });

	// Key event handling
	// eslint-disable-next-line no-unused-vars
	screen.key(["escape", "q", "C-c"], function (ch, key) {
		// TODO: Exit to main menu
		return process.exit(0);
	});

	// Render the screen
	screen.render();
	//..
}

/********************************
 * * PUPPETEER HELPER FUNCTIONS *
 ********************************/

/**
 *	* Initialize a puppeteer browser instance
 */
async function initPuppeteer(headlessMode) {
	//..
	// Initialize an interactive prompt
	const browserPrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status to prompt
	browserPrompt.await("[%d/2] - Launching Puppeteer browser...", 1);
	// Launch puppeteer browser
	const browser = await puppeteer.launch({ headless: headlessMode });
	// Get browser version
	const browserVersion = await browser.version();
	// Log status to prompt
	browserPrompt.success("[%d/2] - Launched Puppetter browser version: %s \n", 2, green(browserVersion));
	// Return the browser instance
	return browser;
	//..
}

//------------------------------------------//

/**
 *	* Create a new page in puppeteer browser and navigate
 *	* 	to a given page.
 *
 * @param { puppeteer browser instance } browser
 * @param { target url } url
 */
async function createAndGotoPage(browser, url) {
	//..
	// Initialize an interactive prompt
	const pagePrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status to prompt
	pagePrompt.await("[%d/2] - Creating a new browser page...", 1);
	// Create a new page in the browser
	const page = await browser.newPage();
	// Log status to prompt
	pagePrompt.success("[%d/2] - New browser page created!\n", 2);
	// Log status to prompt
	pagePrompt.await("[%d/2] - Navigating to: %s", 1, link(url));
	// Navigate the page to the target url
	await page.goto(url);
	// Log status to prompt
	pagePrompt.success("[%d/2] - Navigated to: %s \n", 2, link(url));
	// Return the new page
	return page;
	//..
}

/***********************
 * * SCRAPER FUNCTIONS *
 ***********************/

/**
 *	* Get the name of a given product
 *
 * @param { product element } productElem
 */
async function getProductName(productElem) {
	//..
	// Get product's name
	let pname = await productElem.$eval(".u-p2", e => e.textContent);
	// Remove whitespace and return the result
	return pname.trim();
	//..
}

//------------------------------------------//

/**
 *	* Get the data for a given product
 *
 * @param { product element } productElem
 */
async function getProductData(productElem) {
	//..
	// Get product data
	let pdata = await productElem.$eval(PRODUCT_SELECTOR + "__footer-container", e => e.getAttribute("data-options"));
	// Parse product data as JSON and return the result
	return JSON.parse(pdata);
	//..
}

//------------------------------------------//

/**
 *	* Process the data for a given product
 *
 * @param { Product's name } pname
 * @param { Product's data } pdata
 */
function processProduct(pname, pdata) {
	//..
	// Get the product's unique id
	let pid = pdata.productId;
	// Get the product's details
	let pdetails = pdata.ProductDetails;
	// Get the product's price info
	let priceMode = pdetails.PriceMode;
	let pricePer = pdetails.PricePerItem;
	// Create a product object
	let product = {
		uid: pid,
		name: pname,
		pricePer: pricePer,
		priceMode: priceMode
	};
	// Return the processed product
	return product;
	//..
}

//------------------------------------------//

/**
 *	* Process the scrapped product elements
 *
 * @param { all products element } allProductsElems
 */
async function processProducts(allProductsElems) {
	//..
	// TODO: Add logging to this function
	// Array of all products to return
	let allProducts = [];
	// Iterate over all product elements
	for (let i = 0; i < allProductsElems.length; i++) {
		// Get the current product element
		let productElem = allProductsElems[i];
		// Get product's name
		let pname = await getProductName(productElem);
		// Get product data
		let pdata = await getProductData(productElem);
		// Process the product
		let product = processProduct(pname, pdata);
		// Push product object into products array
		allProducts.push(product);
	}
	// Return array of all products
	return allProducts;
	//..
}

//------------------------------------------//

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
	scrapPrompt.await("[%d/2] - Scraping products from target page...", 1);
	// Select all products from page
	const allProductElems = await page.$$(PRODUCT_SELECTOR);
	// Get number of scraped products
	const numProducts = allProductElems.length;
	// Log status to prompy
	scrapPrompt.success("[%d/2] - Scraped " + green("%d") + " products!\n", 2, numProducts);
	// Process the product elements
	return processProducts(allProductElems);
	//..
}

//------------------------------------------//

/**
 *	* Run the Supomation webscrapper
 */
async function runSupomation(headlessMode) {
	//..
	log("\n" + logSymbols.info, "Starting Supomation WebScrapper...\n");

	// Initialize a puppeteer browser instance
	const browser = await initPuppeteer(headlessMode);

	// Create a new page and navigate to target url
	const page = await createAndGotoPage(browser, TARGET_URL);

	// Scrap products from target page
	let scrapedProducts = await scrapProducts(page);

	// Prompt user with what to do with data
	promptData(scrapedProducts);

	// TODO: Prompt if user wants to quit or goto main menu
	// Close the browser instance
	// await browser.close();
	// Quit Supomation CLI
	// quit();
	//..
}

/**********************
 * * PROMPT FUNCTIONS *
 **********************/

/**
 *	* Process user selected data menu option
 *
 * @param { user selected option } option
 * @param { scraped data } scrapedData
 */
// TODO: Implement; exit to main menu; print scraped data; save scraped data
// ! TODO: Complete this
function processDataOption(option, scrapedProducts) {
	if (option === "q") {
		quit();
	} else if (option === "e") {
		prompt();
	} else if (option === "o") {
		loadDashboard();
	} else if (option === "r") {
		promptHeadless();
	} else if (option === "v") {
		// print scraped data
		let product = scrapedProducts[0];
		log(product);
		quit();
	} else if (option === "s") {
		// Stringify json data
		const out = JSON.stringify(scrapedProducts, null, 2);
		// ! This will break if the scrapped products array is too large
		// ! Approximately upto 100MB max effectively
		// Write scraped data to file
		writeToFile("products.json", out);
		quit();
	}
}

/**
 *	* Process user selected main menu option
 *
 * @param { user selected option } option
 */
function processOption(option) {
	if (option === "q") {
		quit();
	} else if (option === "o") {
		loadDashboard();
	} else if (option === "r") {
		promptHeadless();
	}
}

//------------------------------------------//

/**
 *	* Prompt the user to select what to
 *	*	 do with the scraped product data.
 */
// TODO: Complete this
function promptData(scrapedProducts) {
	//..
	log("-- " + title("SCRAPED DATA MENU") + " --\n");
	// Scraped data prompt
	inquirer
		.prompt([
			{
				type: "list",
				name: "option",
				message: "Select an option:",
				choices: [
					"View scraped data",
					"Save data to file",
					"Open dashboard",
					// "Rerun WebScraper",
					new inquirer.Separator(),
					"Exit to main menu",
					"Quit Supomation CLI",
					new inquirer.Separator(),
					{
						name: "Display help",
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
			processDataOption(answers.option, scrapedProducts);
			//..
		});
	//..
}

//------------------------------------------//

/**
 *	* Prompt the user to confirm to run
 * 	* the webscraper in headless mode
 */
function promptHeadless() {
	//..
	inquirer
		.prompt([
			{
				type: "confirm",
				name: "headless",
				message: "Run in headless mode? (No GUI)",
				default: true
			}
		])
		.then(answers => {
			//..
			runSupomation(answers.headless);
			//..
		});
	//..
}

//------------------------------------------//

/**
 *	* Display the main menu prompt
 */
// TODO: Add question for number of pages to scrap
function prompt() {
	//..
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
					"Open dashboard (WIP)",
					new inquirer.Separator(),
					"Quit Supomation CLI",
					new inquirer.Separator(),
					{
						name: "Display help",
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
	clear();
	log(header("\nWELCOME TO SUPOMATION CLI"));
	prompt();
	//..
})();


// EOF //

