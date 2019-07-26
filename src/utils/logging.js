#!/usr/bin/env node

/**
 *	`src/utils/logging.ts`
 *
 *	* Supomation CLI Logging Helper Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const chalk = require('chalk');
const logSymbols = require('log-symbols');
const boxen = require('boxen');

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const { log } = console;
// const log = console.log;

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
const title = blue.bold.underline;
// . const link = blue.underline;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  *logError
 *  Log an error message
 * @param { string } msg - message to log
 * @returns { void }
 */
function logError(msg) {
    log('\n' + logSymbols.error, msg);
}

// ------------------------------------------ //

/**
 *  *logInfo
 *  Log an information message
 * @param { string } msg - message to log
 * @returns { void }
 */
function logInfo(msg) {
    log(logSymbols.info, msg);
}

// ------------------------------------------ //

/**
 *  *logSuccess
 *  Log a success message
 * @param { string } msg - message to log
 * @returns { void }
 */
function logSuccess(msg) {
    log(logSymbols.success, msg);
}

// ------------------------------------------ //

/**
 *  *logTitle
 *  Log a menu title
 * @param { string } msg - message to log
 * @returns { void }
 */
function logTitle(msg) {
    // Construct title message
    const titleMsg = title(msg);
    // Box padding
    const pad = {
        top: 1,
        right: 11,
        bottom: 1,
        left: 11,
    };
    // Log title message
    log(boxen(titleMsg, { padding: pad }));
    log(); // new line
}

// ------------------------------------------ //

/**
 *  * logWelcome
 *  Log the Supomation main welcome message
 * @returns { void }
 */
function logWelcome() {
    require('clear')(); // Clear the terminal
    // log(); // new line
    const heading = header('WELCOME TO SUPOMATION CLI\n');
    const version = process.env.npm_package_version;
    const date = new Date().toDateString();
    // Construct welcome message
    const msg =
        heading +
        '\n' +
        magenta('Version ') +
        version +
        '\n\n' +
        magentaBright(date);
    // Log welcome message
    log(boxen(msg, { padding: 1, align: 'center' }));
    log(); // new line
}

/*************
 * * EXPORTS *
 *************/

module.exports = {
    log,
    green,
    blue,
    magenta,
    logError,
    logInfo,
    logSuccess,
    logTitle,
    logWelcome
};

// EOF //