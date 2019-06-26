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
// const productBaseSelector = ".fs-product-card";

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
	log("  " + logSymbols.success, "Browser version: \n\t" + green(browserVersion));
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

// eslint-disable-next-line no-unused-vars
async function runSupomation() {
	// launch puppeteer browser instance
	const browser = await initPuppeteer();
	// log(await browser.version()); // check we have the browser instance
	// create a new page
	const page = await browser.newPage();
	// Navigate to url target
	await gotoPage(page, TARGET);
}

/**
 * Process main menu options
 * @param { selected user option } option
 */
function processMenuOption(option) {
	if (option === "q") {
		log(logSymbols.error, "Quitting Supomation CLI...\n");
		process.exit(0);
	} else if (option === "s") {
		log(logSymbols.info, "Starting Supomation WebScrapper...");
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
/*
function startSupomationCLI() {
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
			if (answers.option === "q") {
				log(logSymbols.error, "Quitting Supomation CLI...\n");
				process.exit(0);
			} else if (answers.option === "s") {
				log(logSymbols.info, "Starting Supomation WebScrapper...");
				initPuppeteer();
			}
		});
}
*/

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

