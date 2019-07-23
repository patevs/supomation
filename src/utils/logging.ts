#!/usr/bin/env node

/**
 *	`src/utils/logging.ts`
 *
 *	* Supomation CLI Logging Helper Functions
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// Terminal string styling
const chalk = require("chalk");
// Logging symbols
// . const logSymbols = require("log-symbols");
// Create boxes
// . const boxen = require("boxen");

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
const magentaBright = chalk.magentaBright;

// Typography
const header = green.bold.underline;
const title = blue.bold;
const link = blue.underline;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  *logError
 *  Log an error message
 * @param { message to log } msg
 */
/*
function logError(msg) {
    log("\n" + logSymbols.error, msg);
}
*/

// ------------------------------------------ //

/**
 *  *logInfo
 *  Log an information message
 * @param { message to log } msg
 */
/*
function logInfo(msg) {
    log(logSymbols.info, msg);
}
*/

// ------------------------------------------ //

/**
 *  *logSuccess
 *  Log a success message
 * @param { message to log } msg
 */
/*
function logSuccess(msg) {
    log(logSymbols.success, msg);
}
*/

// ------------------------------------------ //

/**
 *  *logTitle
 *  Log a menu title
 * @param { title } msg
 */
/*
function logTitle(msg) {
    log("\n ----- " + title(msg) + " ----- \n");
}
*/

// ------------------------------------------ //

/**
 *  * logWelcome
 *  Log the Supomation main welcome message
 */
function logWelcome() {
    // . require("clear")(); // Clear the terminal
    log(header("\nWELCOME TO SUPOMATION CLI\n"));
    const version = " version:" + magenta(process.env.npm_package_version);
    const date = new Date().toDateString();
    const msg = version + "\n\n" + magentaBright(date);
    log(msg);
    // . log(boxen(msg, { padding: 1, align: "center" }));
}

/*************
 * * EXPORTS *
 *************/

/*
module.exports = {
    green,
    magenta,
    link,
    logError,
    logInfo,
    logSuccess,
    logTitle,
    logWelcome
};
*/

// EOF //
