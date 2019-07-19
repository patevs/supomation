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
// Create boxes
const boxen = require("boxen");

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
// . const blueBright = chalk.blueBright;
const magenta = chalk.magenta;
const magentaBright = chalk.magentaBright

// Typography
const header = green.bold.underline;
const title = blue.bold;
const link = blue.underline;

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
 *	* Log the Supomation main welcome
 */
function logWelcome() {
	require("clear")(); // Clear the terminal
	log(header("\nWELCOME TO SUPOMATION CLI\n"));
	const version = " version:" + magenta(process.env.npm_package_version);
	const date = new Date().toDateString();
	const msg = version + "\n\n" + magentaBright(date);
	log(boxen(msg, { padding: 1, align: 'center' }));
}

// ------------------------------------------ //

/**
 *	* Log a title
 * @param { title } msg
 */
function logTitle(msg) {
	log("\n ----- " + title(msg) + " ----- \n");
}

/*************
 * * EXPORTS *
 *************/

module.exports = {
	green,
	magenta,
	link,
	logError,
	logInfo,
	logSuccess,
	logWelcome,
	logTitle
}


// EOF //

