#!/usr/bin/env node

/**
 *	`lib/utils.js`
 *	Utility Helper Functions
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
 *	* Quit Supomation CLI
 */
function quit() {
	log("\n" + logSymbols.error, "Quitting Supomation CLI...\n");
	process.exit(0);
}

// ------------------------------------------//

/**
 *	* Print the Supomation CLI version
 */
function version() {
	// ..
	log("\n" + logSymbols.info, "Supomation CLI version: " + blue(process.env.npm_package_version) + "\n");
	// ..
}

// ------------------------------------------//

/**
 *	* Print the Supomation help message
 */
function help() {
	// ..
	log("\n" + logSymbols.info, "HELP MESSAGE... \n");
	// ..
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
