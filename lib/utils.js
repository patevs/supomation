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

// Logging symbols
const logSymbols = require("log-symbols");
// Terminal string styling
const chalk = require("chalk");

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

/***********
 * * THEME *
 ***********/

// Colors
const blue = chalk.cyan;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Log an error message
 * @param { message to log } msg
 */
function logError(msg) {
	log("\n" + logSymbols.error, msg);
}

// ------------------------------------------//

/**
 *	* Log an information message
 * @param { message to log } msg
 */
function logInfo(msg) {
	log("\n", logSymbols.info, msg);
}

// ------------------------------------------//

/**
 *	* Quit Supomation CLI
 */
function quit() {
	logError("Quitting Supomation CLI...");
	process.exit(0);
}

// ------------------------------------------//

/**
 *	* Print the Supomation CLI version
 */
function version() {
	const msg = "Supomation CLI version: " + blue(process.env.npm_package_version);
	logInfo(msg);
}

// ------------------------------------------//

/**
 *	* Print the Supomation help message
 */
function help() {
	logInfo("--- HELP MESSAGE ---");
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
