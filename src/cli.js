#!/usr/bin/env node

/**
 *  `src/cli.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const chalk = require("chalk");
const inquirer = require("inquirer");

/***********
 * * THEME *
 ***********/

const log = console.log;

// Colors
// const red = chalk.red;
const green = chalk.green;
// const blue = chalk.blue;

// Typography
const title = green.underline.bold;
// const link = blue.underline;

/***************
 * * CONSTANTS *
 ***************/

// Target URL
// const TARGET = "https://www.ishopnewworld.co.nz/specials";
// Product CSS selector
// const productBaseSelector = ".fs-product-card";

/**********************
 * * HELPER FUNCTIONS *
 **********************/

//--------------------//

/***************
 * * FUNCTIONS *
 ***************/

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
			//..
			log(answers);
			// processOption(answers.option);
			//..
		});
	//..
}

/**
* * Application entry point
*/
(function () {
	//..
	log(title("\nWELCOME TO SUPOMATION CLI\n"));
	prompt();
	//..
})();

// EOF //
