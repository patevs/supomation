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

// const writeJsonFile = require('write-json-file');

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
 *  @function saveProductData
 *  @description Save given product data to file
 *  @param { string } fileName
 *  @param { object } productData
 *  @returns { void }
 */
// TODO: Move this into data module
/*
const saveProductData = async (fileName, productData) => {
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
