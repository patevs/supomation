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
import chalk from "chalk";
// Logging symbols
import logSymbols from "log-symbols";
// Create boxes
import boxen from "boxen";

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
const magentaBright = chalk.magentaBright;

// Typography
const header = green.bold.underline;
const title = blue.bold;
// . const link = blue.underline;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  *logError
 *  Log an error message
 * @param { message to log } msg
 */
function logError(msg: string): void {
    log("\n" + logSymbols.error, msg);
}

// ------------------------------------------ //

/**
 *  *logInfo
 *  Log an information message
 * @param { message to log } msg
 */
function logInfo(msg: string): void {
    log(logSymbols.info, msg);
}

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
function logTitle(msg: string): void {
    // TODO: Put this in a boxen box
    log("\n ----- " + title(msg) + " ----- \n");
}

// ------------------------------------------ //

/**
 *  * logWelcome
 *  Log the Supomation main welcome message
 */
function logWelcome(): void {
    require("clear")(); // Clear the terminal
    log(); // new line
    const heading: string = header("WELCOME TO SUPOMATION CLI\n");
    const version: string | undefined = process.env.npm_package_version;
    const date: string = new Date().toDateString();
    // Construct welcome message
    const msg: string =
        heading +
        "\n" +
        magenta("Version ") +
        version +
        "\n\n" +
        magentaBright(date);
    // Log welcome message
    log(boxen(msg, { padding: 1, align: "center" }));
}

/*************
 * * EXPORTS *
 *************/

export { log, magenta, logError, logInfo, logTitle, logWelcome };

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
