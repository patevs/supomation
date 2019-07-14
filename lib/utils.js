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

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

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

/*************
 * * EXPORTS *
 *************/

module.exports = {
	quit
};

// EOF //
