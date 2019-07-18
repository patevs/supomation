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
// . const red = chalk.red;
const green = chalk.green;
const blue = chalk.cyan;
const magenta = chalk.magenta;

// Typography
const header = green.bold.underline;
const title = blue.bold;

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

// ------------------------------------------ //

/**
 *	* Log an information message
 * @param { message to log } msg
 */
function logInfo(msg) {
	log("\n", logSymbols.info, msg);
}

// ------------------------------------------ //

/**
 * 	* Log a success message
 * @param { message to log } msg
 */
function logSuccess(msg) {
	log("\n" + logSymbols.success, msg);
}

// ------------------------------------------ //

/**
 *	* Log the Supomation main heading
 */
function logHeading() {
	require("clear")(); // Clear the terminal
	log(header("\nWELCOME TO SUPOMATION CLI"));
}

// ------------------------------------------ //

/**
 *	* Log a title
 * @param { title } msg
 */
function logTitle(msg) {
	log("\n ---- " + title(msg) + " ---- \n");
}

// ------------------------------------------ //

/**
 *	* Quit Supomation CLI
 */
function quit() {
	logError("Quitting Supomation CLI...");
	process.exit(0);
}

// ------------------------------------------ //

/**
 *	* Print the Supomation CLI version
 */
function version() {
	const msg =
		"Supomation CLI version: " + blue(process.env.npm_package_version);
	logInfo(msg);
}

// ------------------------------------------ //

/**
 *	* Print the Supomation help message
 */
function help() {
	logInfo(" ---- " + magenta("HELP MESSAGE") + " ---- ");
}

/*************
 * * EXPORTS *
 *************/

module.exports = {
	logInfo,
	logSuccess,
	logHeading,
	logTitle,
	quit,
	version,
	help
};

// EOF //
