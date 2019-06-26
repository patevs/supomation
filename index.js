#!/usr/bin/env node

/**
 *  `index.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/
const puppeteer = require("puppeteer");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
//const fs = require("fs");

/***********
 * * THEME *
 ***********/
const log = console.log;
const title = chalk.bold.underline.green;
const link = chalk.underline.blue;
const green = chalk.green;
//const red = chalk.red;

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
	log(logSymbols.info, "Launching Puppeteer...");
	const browser = await puppeteer.launch();
	const browserVersion = await browser.version();
	log(logSymbols.success, "Browser version: \n\t" + green(browserVersion));
	return browser;
}

/**
 * Navigate puppeteer to a given page
 * @param { puppeteer page instance } page
 * @param { url to naviagte to } url
 */
async function gotoPage(page, url) {
	log(logSymbols.info, "Navigating browser page to: \n\t" + link(url));
	await page.goto(url);
}

/**
 * Process the products data
 * @param { all products element } allProducts
 */
async function processProducts(allProducts) {
	log(logSymbols.info, "Processing products data...");
	// Product data to return
	let productsData = [];
	// Iterate over all products
	for (let i = 0; i < allProducts.length; i++) {
		// Current product element
		let productElem = allProducts[i];
		// Get product's name
		let pname = await productElem.$eval(".u-p2", e => e.textContent);
		// Remove white space
		pname = pname.trim();
		// Get product data
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
	// return array of all products
	return productsData;
}

/**
 * Scrap the product data from a given page
 * @param { page to scrap } page
 */
async function scrapProducts(page) {
	log(logSymbols.info, "Scrapping products list...");
	// Select all products from page
	let allProducts = await page.$$(productBaseSelector);
	// Process the products data
	return processProducts(allProducts);
}

/**
 * Run Supomation Scrapper
 */
async function runSupomation() {
	// Initialize puppeteer browser
	const browser = await initPuppeteer();
	// Create a new page
	const page = await browser.newPage();

	// Navigate to url target
	await gotoPage(page, TARGET);

	// Scrap products from page
	let scrappedProducts = await scrapProducts(page);
	log({ scrappedProducts });

	// Close the browser instance
	await browser.close();
	log("\n" + logSymbols.success, green("DONE!"));
}

/**
 * Writes content to disk.
 * @param { name of file } name
 * @param { content to write } content
 */
/*
function writeToFile(name, content) {
	fs.writeFile(name, content, function (err) {
		if (err) {
			return log(red(err));
		}
		log(green(name + " written successfully!"));
	});
}
*/

/**
 * * Application entry point
 */
(async () => {
	log(title("\nSUPOMATION\n"));
	runSupomation();
})();


// EOF //

