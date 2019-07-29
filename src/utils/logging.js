#!/usr/bin/env node

/**
 *	`src/utils/logging.js`
 *
 *	* Supomation CLI Logging Utilities and Helper Functions
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
 * @function logError
 * @description Log an error message
 * @param { string } msg - message to log as error
 * @returns { void }
 */
function logError(msg) {
    log(logSymbols.error, msg);
}

// ------------------------------------------ //

/**
 * @function logInfo
 * @description Log an information message
 * @param { string } msg - message to log as information
 * @returns { void }
 */
function logInfo(msg) {
    log(logSymbols.info, msg);
}

// ------------------------------------------ //

/**
 * @function logSuccess
 * @description Log a success message
 * @param { string } msg - message to log as successful
 * @returns { void }
 */
function logSuccess(msg) {
    log(logSymbols.success, msg);
}

// ------------------------------------------ //

/**
 * @function logTitle
 * @description Log a menu title
 * @param { string } msg - message to log as menu title
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
        left: 11
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
function logWelcome(projectVersion) {
    require('clear')(); // Clear the terminal
    const heading = header('WELCOME TO SUPOMATION CLI\n');
    const date = new Date().toDateString();
    // Construct welcome message
    const msg =
        heading +
        '\nVersion: ' +
        magenta(projectVersion) +
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
