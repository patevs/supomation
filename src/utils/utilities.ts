#!/usr/bin/env node

/**
 *	`src/utils/utilities.ts`
 *
 *	* Supomation Utility Helper Functions
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// Logging utilities
// const logging = require("./logging");
// . import * as logging from "./logging";

/***************
 * * CONSTANTS *
 ***************/

//

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* quit
 *  Quit Supomation CLI
 */
function quit(): void {
    // . logging.logError("Quitting Supomation CLI...");
    process.exit(0);
}

// ------------------------------------------ //

/**
 *	*version
 *  Print the Supomation CLI version
 */
/*
function version(): void {
    const msg =
        "Supomation CLI version: " +
        logging.magenta(process.env.npm_package_version);
    logging.logInfo(msg);
}
*/

// ------------------------------------------ //

/**
 *	* help
 *  Print the Supomation help message
 */
function help(): void {
    // . logging.logInfo(" ---- " + logging.magenta("HELP MESSAGE") + " ---- ");
}

/*************
 * * EXPORTS *
 *************/

module.exports = {
    quit,
    // . version,
    help
};

// EOF //
