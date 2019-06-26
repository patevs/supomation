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
// const logSymbols = require("log-symbols");
const chalk = require("chalk");
//const fs = require("fs");

/***********
 * * THEME *
 ***********/

const log = console.log;
const title = chalk.bold.underline.green;
// const link = chalk.underline.blue;
const green = chalk.green;
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

/*
function startSupomationCLI_() {
	inquirer
		.prompt([
			{
				type: "expand",
				message: "Select an option: ",
				name: "overwrite",
				choices: [
					{
						key: "s",
						name: "Start WebScrapper",
						value: "start"
					},
					{
						key: "q",
						name: "Quit Supomation CLI",
						value: "quit"
					},
					new inquirer.Separator(),
					{
						key: "o",
						name: "Other",
						value: "other"
					}
				]
			}
		])
		.then(answers => {
			console.log(JSON.stringify(answers, null, "  "));
		});
}
*/

/**
 * Start the supomation interactive prompt
 */
function startSupomationCLI() {
	inquirer
		.prompt([
			{
				type: "list",
				name: "option",
				message: green("Select an option:"),
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
					return val.toLowerCase();
				}
			}
		])
		.then(answers => {
			console.log(JSON.stringify(answers, null, "  "));
		});
}

/**
* * Application entry point
*/
(function () {
	log(title("\nWELCOME TO SUPOMATION CLI\n"));
	startSupomationCLI();
	// initPuppeteer();
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

