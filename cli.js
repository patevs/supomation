#!/usr/bin/env node

/**
 *  `cli.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const puppeteer = require("puppeteer");
const inquirer = require("inquirer");
const ora = require("ora");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
const fs = require("fs");

/***********
 * * THEME *
 ***********/

const log = console.log;
const title = chalk.bold.underline.green;
const link = chalk.underline.cyan;
const green = chalk.green;
const red = chalk.red;
// const blue = chalk.blue;

/***************
 * * CONSTANTS *
 ***************/

// Target URL
const TARGET = "https://www.ishopnewworld.co.nz/specials";
// Product CSS selector
const productBaseSelector = ".fs-product-card";

/***************
 * * FUNCTIONS *
 ***************/

/**
 * Initialize puppeteer browser instance
 */
async function initPuppeteer() {
	const spinner = ora("Launching Puppeteer...").start();
	spinner.indent = 2;
	// launch puppeteer
	const browser = await puppeteer.launch();
	const browserVersion = await browser.version();
	spinner.succeed();
	log("  " + logSymbols.info, "Browser version: \n\t" + green(browserVersion));
	return browser;
}

/**
 * Navigate puppeteer to a given page
 * @param { puppeteer page instance } page
 * @param { url to naviagte to } url
 */
async function gotoPage(page, url) {
	const spinner = ora("Navigating browser page to: \n\t" + link(url)).start();
	spinner.indent = 2;
	await page.goto(url);
	spinner.succeed();
}

/**
 * Writes content to disk.
 * @param { name of file } name
 * @param { content to write } content
 */
// eslint-disable-next-line no-unused-vars
function writeToFile(name, content) {
	fs.writeFile(name, content, function (err) {
		if (err) {
			return log(logSymbols.error, red(err));
		}
		log("\n" + logSymbols.success, green(name) + " saved successfully!");
	});
}

/**
 * Process the products data
 * @param { all products element } allProducts
 */
async function processProducts(allProducts) {
	// log(logSymbols.info, "Processing products data...");
	const spinner = ora("Processing products data...").start();
	spinner.indent = 2;
	// Product data to return
	let productsData = [];
	// Iterate over all products
	for (let i = 0; i < allProducts.length; i++) {
		// Current product element
		let productElem = allProducts[i];
		// Get product's name
		// TODO: Move this to seperate method
		let pname = await productElem.$eval(".u-p2", e => e.textContent);
		// Remove white space
		pname = pname.trim();
		// Get product data
		// TODO: Move this to seperate method
		let pdata = await productElem.$eval(productBaseSelector + "__footer-container", e => e.getAttribute("data-options"));
		// Parse product data as JSON
		pdata = JSON.parse(pdata);
		// Get products unique id
		let pid = pdata.productId;
		// Get product details
		let pdetails = pdata.ProductDetails;
		// Get price info
		let priceMode = pdetails.PriceMode;
		let pricePer = pdetails.PricePerItem;
		// Create product object
		let product = {
			uid: pid,
			name: pname,
			pricePer: pricePer,
			priceMode: priceMode
		};
		// push product object into products data array
		productsData.push(product);
	}
	spinner.succeed();
	// return array of all products
	return productsData;
}

/**
 * Scrap the product data from a given page
 * @param { page to scrap } page
 */
async function scrapProducts(page) {
	const spinner = ora("Scrapping products from page...").start();
	spinner.indent = 2;
	// Select all products from page
	const allProducts = await page.$$(productBaseSelector);
	spinner.succeed();
	const numProducts = allProducts.length;
	// log("\tNumber of products: " + green(numProducts));
	log("  " + logSymbols.info, "Number of products: " + green(numProducts));
	// Process the products data
	return processProducts(allProducts);
}

/**
 * RUn the supomation webscrapper
 */
async function runSupomation() {
	// launch puppeteer browser instance
	const browser = await initPuppeteer();
	// log(await browser.version()); // check we have the browser instance
	// create a new page
	// const spinner = ora("Creating new page...").start();
	// spinner.indent = 2;
	const page = await browser.newPage();
	// spinner.succeed();
	// Navigate to url target
	await gotoPage(page, TARGET);
	// Scrap products from page
	let scrappedProducts = await scrapProducts(page);
	// log({ scrappedProducts });
	// ! This will break if the scrapped products array is too large
	const out = JSON.stringify(scrappedProducts, null, 2);
	writeToFile("products.json", out);
	// Close the browser instance
	await browser.close();
	log("\n" + logSymbols.error, "Quitting Supomation CLI\n");
}

/**
 * Process main menu options
 * @param { selected user option } option
 */
function processMenuOption(option) {
	if (option === "q") {
		// TODO: Make this reusable
		log("\n" + logSymbols.error, "Quitting Supomation CLI...\n");
		process.exit(0);
	} else if (option === "s") {
		log("\n" + logSymbols.info, "Starting Supomation WebScrapper...");
		runSupomation();
	}
}

/**
 * Displays the supomation cli main menu
 */
function mainMenuPrompt() {
	inquirer
		.prompt([
			{
				type: "list",
				name: "option",
				message: "Select an option:",
				choices: [
					"Start WebScrapper",
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
			// console.log(JSON.stringify(answers, null, "  "));
			processMenuOption(answers.option);
		});
}

/**
 * Start the supomation interactive prompt
 */
function startSupomationCLI() {
	mainMenuPrompt();
}

/**
* * Application entry point
*/
(function () {
	log(title("\nWELCOME TO SUPOMATION CLI\n"));
	startSupomationCLI();
})();

/* self invoking async function
(async () => {
  //..
})();
*/

/* inquirer usage
function cli() {
	inquirer
		.prompt([
			// Pass your questions in here
			{
				type: "confirm",
				name: "toBeDelivered",
				message: "Is this for delivery?",
				default: false
			},
		])
		.then(answers => {
			// Use user feedback for... whatever!!
			log("\nOrder receipt:");
			log(JSON.stringify(answers, null, "  "));
		});
}
*/

/* ora usage
const spinner = ora("Loading CLI...").start();
setTimeout(() => {
	spinner.succeed();
	//..
}, 2000);
*/

/* log-update usage
const frames = ["-", "\\", "|", "/"];
let i = 0;
setInterval(() => {
	const frame = frames[i = ++i % frames.length];
	logUpdate(
		`
        ♥♥
   ${frame} unicorns ${frame}
        ♥♥
`);
}, 80);
*/

// EOF //

