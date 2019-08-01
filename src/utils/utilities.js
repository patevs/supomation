#!/usr/bin/env node

/**
 *	`src/utils/utilities.js`
 *
 *	* Supomation CLI Utility Helper Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const logging = require('./logging');

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  @function quit
 *  @description Quit Supomation CLI
 *  @returns { void }
 */
const quit = () => {
    logging.log(); // new line
    logging.logError('Quitting Supomation CLI...');
    process.exit(0);
};

// ------------------------------------------ //

/**
 *	@function version
 *  @description Print the Supomation CLI version
 *  @returns { void }
 */
const version = projectVersion => {
    logging.log(); // new line
    const msg = 'Supomation CLI version: ' + logging.magenta(projectVersion);
    logging.logInfo(msg);
    logging.log(); // new line
};

// ------------------------------------------ //

/**
 *	@function help
 *  @description Print the Supomation help message
 *  @returns { void }
 */
const help = () => {
    logging.log(); // new line
    logging.logInfo(' ---- ' + logging.magenta('HELP MESSAGE') + ' ---- ');
    logging.log(); // new line
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
    quit,
    version,
    help
};

// EOF //
