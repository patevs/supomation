#!/usr/bin/env node

/**
 *	`lib/utils.js`
 *
 *	* Utility Helper Functions
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// Terminal string styling
const chalk = require("chalk");

// Logging utilities
const logging = require("./logging");

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
// . const log = console.log;

/***********
 * * THEME *
 ***********/

// Colors
// . const red = chalk.red;
// . const green = chalk.green;
const blue = chalk.cyan;
const magenta = chalk.magenta;

// Typography
// . const header = green.bold.underline;
// . const title = blue.bold;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Quit Supomation CLI
 */
function quit() {
	logging.logError("Quitting Supomation CLI...");
	process.exit(0);
}

// ------------------------------------------ //

/**
 *	* Print the Supomation CLI version
 */
function version() {
	const msg =
		"Supomation CLI version: " + blue(process.env.npm_package_version);
	logging.logInfo(msg);
}

// ------------------------------------------ //

/**
 *	* Print the Supomation help message
 */
function help() {
	logging.logInfo(" ---- " + magenta("HELP MESSAGE") + " ---- ");
}

/*************
 * * EXPORTS *
 *************/

module.exports = {
	quit,
	version,
	help
};

// EOF //
