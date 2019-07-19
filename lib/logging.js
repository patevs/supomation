#!/usr/bin/env node

/**
 *	`lib/logging.js`
 *
 *	* Logging Helper Functions
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// Terminal styling
const chalk = require("chalk");
// Logging symbols
const logSymbols = require("log-symbols");

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

/***********
 * * THEME *
 ***********/

// Colors
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

/*************
 * * EXPORTS *
 *************/

module.exports = {
	green,
	magenta,
	logError,
	logInfo,
	logSuccess,
	logHeading,
	logTitle
}


// EOF //

