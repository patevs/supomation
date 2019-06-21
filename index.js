#!/usr/bin/env node

/**
 *  `index.js`
 */

"use strict";

// IMPORTS
const puppeteer = require("puppeteer");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
//const fs = require("fs");

// Chalk theme data
const log = console.log;
const title = chalk.bold.underline.green;
const green = chalk.green;
const link = chalk.underline.blue;

// CONSTANTS
const TARGET = "https://www.ishopnewworld.co.nz/specials";

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
 * Scrap the product data from a given page
 * @param { page to scrap } page 
 */
async function scrapProducts(page) {
	log(logSymbols.info, "Scrapping products list...");
	// Product data to return
	let productsData = [];
	// Product css selector
	const baseSelector = ".fs-product-card";
	// Select all products from page
	let allProducts = await page.$$(baseSelector);
	// Iterate over all products
	for (let i = 0; i < allProducts.length; i++) {
		// Current product element
		let productElem = allProducts[i];
		// Get product's name
		let pname = await productElem.$eval(".u-p2", e => e.textContent);
		// Get products details
		let pdata = await productElem.$eval(baseSelector + "__footer-container", e => e.getAttribute("data-options"));
		let product = {
			name: pname,
			data: pdata
		};
		productsData.push(product);
	}
	return productsData;
}

/**
 * Run Supomation scrapper
 */
async function runSupomation() {
	// Initialize puppeteer browser
	const browser = await initPuppeteer();
	// Create a new page
	const page = await browser.newPage();

	// Navigate to url target
	await gotoPage(page, TARGET);

	// scrap products from oage
	let scrappedProducts = await scrapProducts(page);
	log({ scrappedProducts });

	// Close the browser instance
	await browser.close();
	log(logSymbols.success, "DONE!");
}

/*
function writeToFile(name, content) {
	fs.writeFile(name, content, function (err) {
		if (err) {
			return console.log(chalk.red(err));
		}
		console.log(chalk.green(name + " written successfully!"));
	});
}
*/

/**
 * Application entry point
 */
(async () => {
	log(title("\nSUPOMATION"));
	runSupomation();
})();


// EOF //

