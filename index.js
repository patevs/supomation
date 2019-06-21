#!/usr/bin/env node

/**
 *  `index.js`
 */

"use strict";

// IMPORTS
const puppeteer = require("puppeteer");
const logSymbols = require("log-symbols");
const chalk = require("chalk");

// chalk theme data
const log = console.log;
const title = chalk.bold.underline.green;
const green = chalk.green;
const link = chalk.underline.blue;

//const CFonts = require('cfonts');
//const fs = require("fs");

// CONSTANTS
const TARGET = "https://www.ishopnewworld.co.nz/specials";

async function runSupomation() {
	log(logSymbols.info, "Launching Puppeteer...");

	const browser = await puppeteer.launch();
	const browserVersion = await browser.version();

	log(logSymbols.success, "Browser version: " + green(browserVersion));

	const page = await browser.newPage();

	log(logSymbols.info, "Navigating page to: \n\t" + link(TARGET));

	await page.goto(TARGET);

	log(logSymbols.info, "Scrapping products list...");

	let allProducts = await page.$$(".fs-product-card");

	let productData = [];

	for (let i = 0; i < allProducts.length; i++) {
		let productElem = allProducts[i];
		let pname = await productElem.$eval(".u-p2", e => e.textContent);
		let pdata = await productElem.$eval(".fs-product-card__footer-container", e => e.getAttribute("data-options"));
		let product = {
			name: pname,
			data: pdata
		};
		productData.push(product);
	}

	//console.log({ productData });

	/*
	let products = await page.$$eval(".fs-product-card__description", nodes =>
		nodes.map(node => node.textContent)
	);
	console.log({ products });
	*/

	//console.log(chalk.blue("* Saving page contents..."));
	//let content = await page.content();
	//console.log(content);
	//writeToFile("contents.html", content);

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

/*
function printTitle() {
	CFonts.say('SUPOMATION', {
		font: 'block',              // define the font face; block, shade, chrome, simple, simpleBlock, 3d, simple3d, huge
		align: 'left',              // define text alignment
		colors: ['green'],         	// define all colors
	});
}
*/

/*
	console.log(logSymbols.info, "INFO!");
	console.log(logSymbols.success, "SUCCESS!");
	console.log(logSymbols.warning, "WARNING!");
	console.log(logSymbols.error, "ERROR!");
*/


// EOF //
