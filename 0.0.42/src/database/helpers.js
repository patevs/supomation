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

const Table = require('cli-table3');

/**********************
 * * HELPER FUNCTIONS *
 **********************/

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
    if (!dataDirExists(dataDir)) {
        fs.mkdirSync(dataDir);
    }
};

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  @function ensureDateDirExists
 *  @description Creates the data/date directory if non existant
 *  @param { string } dataDir - path to data directory
 *  @param { string } date - todays date formatted as: yyyy-mm-dd
 *  @returns { void }
 */
const ensureDateDirExists = (dataDir, date) => {
    ensureDataDirExists(dataDir);
    if (!dateDirExists(dataDir, date)) {
        fs.mkdirSync(dataDir + date);
    }
};

// -------------------------------------------------------- //

/**
 *  @function writeProductDataFile
 *  @description Write given data to file
 *  @param { string } filePath
 *  @param { string } data
 *  @returns { boolean }
 */
const writeProductDataFile = (filePath, data) => {
    // Write data to file
    fs.writeFile(filePath, data, err => {
        if (err) {
            return false;
        }
        return true;
    });
};

// -------------------------------------------------------- //

/**
 *  @function readProductDataFile
 *  @description Read data from a given file
 *  @param { string } filePath
 *  @returns { dataFile }
 */
const readProductDataFile = filePath => {
    return fs.readFileSync(filePath);
};

// -------------------------------------------------------- //

const displayProductDataTable = productData => {
    // instantiate
    var table = new Table({
        head: ['Product Name', 'Price / Quantity'],
        colWidths: [35, 20]
    });

    for (let product in productData) {
        let p = productData[product];
        table.push([p.name, p.pricePer + '/' + p.priceMode + ' ' + p.quantity]);
    }
    console.log(table.toString());
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
    ensureDateDirExists,
    writeProductDataFile,
    readProductDataFile,
    displayProductDataTable
};

// EOF //
