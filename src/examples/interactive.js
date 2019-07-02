#!/usr/bin/env node

/**
 *  `src/examples/interactive.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const logSymbols = require("log-symbols");
const chalk = require("chalk");
const ora = require("ora");
const inquirer = require("inquirer");
const puppeteer = require("puppeteer");

const fs = require("fs");

/***********
 * * THEME *
 ***********/

const log = console.log;

const red = chalk.red;
const green = chalk.green;
const blue = chalk.blue;

// const title = chalk.bold.underline.green;
const title = green.underline.bold;
const link = blue.underline;

/***************
 * * CONSTANTS *
 ***************/

// Target URL
const TARGET = "https://www.ishopnewworld.co.nz/specials";
// Product CSS selector
// const productBaseSelector = ".fs-product-card";

/**********************
 * * HELPER FUNCTIONS *
 **********************/

function quit() {
	log("\n" + logSymbols.error, "Quitting Supomation CLI...\n");
	process.exit(0);
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
	const browser = await puppeteer.launch({ headless: true });
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
 * Run supomation
 */
async function runSupomation() {
	//..
	log("\n" + logSymbols.info, "Starting Supomation WebScrapper...");
	// launch puppeteer browser instance
	const browser = await initPuppeteer({ headless: false });
	// create a new page
	const page = await browser.newPage();
	// Navigate to url target
	// let count = 0;
	// for (count; count < 5; count++) {
	// let targets = TARGET;
	// if (count > 0) {
	// 	targets = TARGET + "?pg=" + count;
	// };
	await gotoPage(page, TARGET);
	// Scrap products from page

	// let scrappedProducts = await scrapProducts(page);
	// log({ scrappedProducts });
	// ! This will break if the scrapped products array is too large
	//const out = JSON.stringify(scrappedProducts, null, 2);
	// writeToFile("products-" + count + ".json", out, count);
	// }

	// Close the browser instance
	await browser.close();
	log("\n" + logSymbols.error, "Quitting Supomation CLI\n");
}

/**
 * Process user option
 * @param { user option } option
 */
function processOption(option) {
	if (option === "q") {
		quit();
	} else if (option === "s") {
		runSupomation();
	}
}

/**
 * Main menu prompt
 */
function prompt() {
	//..
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
			processOption(answers.option);
		});
	//..
}

/**
* * Application entry point
*/
(function () {
	log(title("\nWELCOME TO SUPOMATION CLI\n"));
	prompt();
})();

/* qoa example usage
const interactive = {
		type: "interactive",
		query: "Please select an option: ",
		handle: "option",
		symbol: ">",
		menu: [
			"Start",
			"Quit",
			"Help"
		]
	};
	// using the `prompt` async method
	qoa.prompt([interactive]).then(log);
*/

// EOF //
