/**
 *  `src/database/helpers.js`
 *
 *  * Supomation Database Helper Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// const fs = require('fs');

/***************
 * * CONSTANTS *
 ***************/

// ? Move this to globals ?
// const DATA_DIR = 'data/';

/***************
 * * FUNCTIONS *
 ***************/

/**
 * @function dataDirExists
 * @description Check if data directory exists
 * @returns { boolean }
 */
/*
const dataDirExists = () => {
    return fs.existsSync(DATA_DIR);
};
*/

// -------------------------------------------------------- //

/**
 * @function ensureDataDirExists
 * @description Creates data directory if non existant
 * @returns { void }
 */
/*
const ensureDataDirExists = () => {
    if (!dataDirExists()) {
        fs.mkdirSync(DATA_DIR);
    }
};
*/

// -------------------------------------------------------- //

/**
 * @function dateDirExists
 * @description Check if the date/date directory exists
 * @param { string } date
 * @returns { boolean }
 */
/*
const dateDirExists = date => {
    return fs.existsSync(DATA_DIR + date);
};
*/

// -------------------------------------------------------- //

/**
 * @function ensureDateDirExists
 * @description Creates the data/date directory if non existant
 * @param { string } date
 * @returns { void }
 */
/*
const ensureDateDirExists = date => {
    ensureDataDirExists();
    if (!dateDirExists(date)) {
        fs.mkdirSync(DATA_DIR + date);
    }
};
*/

/*************
 * * EXPORTS *
 *************/

// module.exports = { };

// EOF //

