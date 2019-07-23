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
import * as logging from "./logging";

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* quit
 *  Quit Supomation CLI
 *  @returns { void }
 */
function quit(): void {
    logging.logError("Quitting Supomation CLI...");
    process.exit(0);
}

// ------------------------------------------ //

/**
 *	*version
 *  Print the Supomation CLI version
 *  @returns { void }
 */
function version(): void {
    logging.log(); // new line
    const version = process.env.npm_package_version;
    const msg = logging.magenta("Supomation CLI version: ") + version;
    logging.logInfo(msg);
}

// ------------------------------------------ //

/**
 *	* help
 *  Print the Supomation help message
 *  @returns { void }
 */
function help(): void {
    logging.log(); // new line
    logging.logInfo(" ---- " + logging.magenta("HELP MESSAGE") + " ---- ");
}

/*************
 * * EXPORTS *
 *************/

export { quit, version, help };

/*
module.exports = {
    quit,
    version,
    help
};
*/

// EOF //
