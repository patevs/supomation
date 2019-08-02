/**
 *  `src/database/helpers.js`
 *
 *  * Supomation Database Helper Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const fs = require('fs');

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  @function dataDirExists
 *  @description Check if data directory exists
 *  @param { string } dataDir - path to data directory
 *  @returns { boolean }
 */
const dataDirExists = dataDir => {
    return fs.existsSync(dataDir);
};

// -------------------------------------------------------- //

/**
 *  @function dateDirExists
 *  @description Check if the date/date directory exists
 *  @param { string } dataDir - path to data directory
 *  @param { string } date - todays date formatted as: yyyy-mm-dd
 *  @returns { boolean }
 */
const dateDirExists = (dataDir, date) => {
    return fs.existsSync(dataDir + date);
};

// -------------------------------------------------------- //

/**
 *  @function ensureDataDirExists
 *  @description Creates data directory if non existant
 *  @param { string } dataDir - path to data directory
 *  @returns { void }
 */
const ensureDataDirExists = dataDir => {
    if (!dataDirExists()) {
        fs.mkdirSync(dataDir);
    }
};

// -------------------------------------------------------- //

/**
 *  @function ensureDateDirExists
 *  @description Creates the data/date directory if non existant
 *  @param { string } dataDir - path to data directory
 *  @param { string } date - todays date formatted as: yyyy-mm-dd
 *  @returns { void }
 */
const ensureDateDirExists = (dataDir, date) => {
    ensureDataDirExists(dataDir);
    if (!dateDirExists(date)) {
        fs.mkdirSync(dataDir + date);
    }
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
    ensureDateDirExists
};

// EOF //
