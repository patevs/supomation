#!/usr/bin/env node

/**
 *  `cli.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// const puppeteer = require("puppeteer");
// const logSymbols = require("log-symbols");
const inquirer = require("inquirer");
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

/**
* * Application entry point
*/
(function () {
	log(title("\n  SUPOMATION\n"));
	cli();
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

