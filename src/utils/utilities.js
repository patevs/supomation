/**
 *	`src/utils/utilities.js`
 *
 *	* Supomation Utility Helper Functions
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
 *  @function getDate
 *  @description Get todays date string formatted as yyyy-mm-dd
 *  @returns { string } date string
 */
/*
const getDate = () => {
    const d = new Date();
    return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
};
*/

// -------------------------------------------------------- //

/**
 *  @function getDateFull
 *  @description Get todays date string formatted as 'day month date year'
 *  @returns { string } date string
 */
const getDateFull = () => {
    return new Date().toDateString();
};

// -------------------------------------------------------- //

/**
 *  @function quit
 *  @description Quit Supomation
 *  @returns { void }
 */
const quit = () => {
    logging.log(); // new line
    logging.logError('Quitting Supomation CLI...');
    // throw new Error('Quitting Supomation CLI...');
    const exit = process.exit;
    exit(0);
};

// ------------------------------------------ //

/**
 *	@function version
 *  @description Print the Supomation project version
 *  @param { string } projectVersion
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
    // getDate,
    getDateFull,
    quit,
    version,
    help
};

// EOF //
