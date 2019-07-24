#!/usr/bin/env node

/**
 *	`src/utils/utilities.ts`
 *
 *	* Supomation CLI Utility Helper Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// JSON file writer
import writeJsonFile from 'write-json-file';

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* quit
 *  Quit Supomation CLI
 *  @returns { void }
 */
/*
function quit(): void {
    logging.logError('Quitting Supomation CLI...');
    process.exit(0);
}
*/

// ------------------------------------------ //

/**
 *	*version
 *  Print the Supomation CLI version
 *  @returns { void }
 */
/*
function version(): void {
    logging.log(); // new line
    const version = process.env.npm_package_version;
    const msg = logging.magenta('Supomation CLI version: ') + version;
    logging.logInfo(msg);
    logging.log(); // new line
}
*/

// ------------------------------------------ //

/**
 *	* help
 *  Print the Supomation help message
 *  @returns { void }
 */
/*
function help(): void {
    logging.log(); // new line
    logging.logInfo(' ---- ' + logging.magenta('HELP MESSAGE') + ' ---- ');
    logging.log(); // new line
}
*/

// ------------------------------------------ //

/**
 *  * saveProductData
 * @param { string } fileName
 * @param { any } productData
 */
const saveProductData = async (fileName: string, productData: any) => {
    const d = new Date();
    const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    const filePath = 'data/' + date + '/' + fileName + '.json';
    // TODO: Wrap in try/catch
    await writeJsonFile(filePath, productData);
};

/*************
 * * EXPORTS *
 *************/

export { saveProductData };

// EOF //
