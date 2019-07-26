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

const pjson = require('../../package.json');

// JSON file writer
// import writeJsonFile from 'write-json-file';

/***************
 * * CONSTANTS *
 ***************/

const projectVersion = pjson.version;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  @function quit
 *  @description Quit Supomation CLI
 *  @returns { void }
 */
const quit = () => {
    logging.logError('Quitting Supomation CLI...');
    process.exit(0);
};

// ------------------------------------------ //

/**
 *	@function version
 *  @description Print the Supomation CLI version
 *  @returns { void }
 */
const version = () => {
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

// ------------------------------------------ //

/**
 *  * saveProductData
 * @param { string } fileName
 * @param { any } productData
 */
/*
const saveProductData = async (fileName: string, productData: any) => {
    const d = new Date();
    const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    const filePath = 'data/' + date + '/' + fileName + '.json';
    // TODO: Wrap in try/catch
    await writeJsonFile(filePath, productData);
};
*/

/*************
 * * EXPORTS *
 *************/

module.exports = {
    quit,
    version,
    help
};

// EOF //
