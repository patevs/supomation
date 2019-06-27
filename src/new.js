#!/usr/bin/env node

/**
 *  `new.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// const puppeteer = require("puppeteer");
// const inquirer = require("inquirer");
// const ora = require("ora");
// const logSymbols = require("log-symbols");
const chalk = require("chalk");
const qoa = require("qoa");
// const fs = require("fs");

/***********
 * * THEME *
 ***********/

const log = console.log;
const title = chalk.bold.underline.green;
// const link = chalk.underline.cyan;
// const green = chalk.green;
// const red = chalk.red;
// const blue = chalk.blue;

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

function prompt() {
	//..

	const interactive = {
		type: "interactive",
		query: "What is your favorite treat?",
		handle: "treat",
		symbol: ">",
		menu: [
			"Chocolate",
			"Cupcakes",
			"Ice-Cream"
		]
	};

	// using the `prompt` async method
	qoa.prompt([interactive]).then(log);
	//=> { treat: 'Cupcakes' }

	// using the `interactive` async method
	qoa.interactive(interactive).then(log);
	//=> { treat: 'Cupcakes' }
	//..
}

/**
* * Application entry point
*/
(function () {
	log(title("\nWELCOME TO SUPOMATION CLI\n"));
	prompt();
})();


// EOF //

