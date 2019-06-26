#!/usr/bin/env node

/**
 *  `cli.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const puppeteer = require("puppeteer");
// const inquirer = require("inquirer");
const ora = require("ora");
// const logSymbols = require("log-symbols");
const chalk = require("chalk");
//const fs = require("fs");

/***********
 * * THEME *
 ***********/

const log = console.log;
const title = chalk.bold.underline.green;
// const link = chalk.underline.blue;
// const green = chalk.green;
//const red = chalk.red;

/***************
 * * CONSTANTS *
 ***************/

// Target URL
// const TARGET = "https://www.ishopnewworld.co.nz/specials";
// Product CSS selector
// const productBaseSelector = ".fs-product-card";

/***************
 * * FUNCTIONS *
 ***************/

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

/**
 * Initialize puppeteer browser instance
 */
// eslint-disable-next-line no-unused-vars
async function initPuppeteer() {
	const spinner = ora("Launching Puppeteer...").start();
	//log(logSymbols.info, "Launching Puppeteer...");
	const browser = await puppeteer.launch();
	// const browserVersion = await browser.version();
	spinner.succeed();
	// log(logSymbols.success, "Browser version: \n\t" + green(browserVersion));
	return browser;
}

// eslint-disable-next-line no-unused-vars
function startSupomation() {
	//..
}

/**
* * Application entry point
*/
(function () {
	log(title("\nWELCOME TO SUPOMATION\n"));
	// initPuppeteer();
	// runSupomation();
})();

/* self invoking async function
(async () => {
  //..
})();
*/

/* ora usage
const spinner = ora("Loading CLI...").start();
setTimeout(() => {
	spinner.succeed();
	//..
}, 2000);
*/

// EOF //

