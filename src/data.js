#!/usr/bin/env node
/**
 *  `src/data.js`
 *
 *  * Supomation Data Processing
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const Table = require('cli-table3');

const fs = require('fs');

/***************
 * * CONSTANTS *
 ***************/

// TODO: move this into constants module
const dataDir = 'data/';

/***************
 * * FUNCTIONS *
 ***************/

/**
 * @function dataDirExists
 * @description Check if the data directory exists
 * @returns { boolean }
 */
const dataDirExists = () => {
    return fs.existsSync(dataDir);
};

// -------------------------------------------------------- //

/**
 * @function ensureDataDirExists
 * @description Creates the data directory if non existant
 * @returns { void }
 */
const ensureDataDirExists = () => {
    if (!dataDirExists()) {
        fs.mkdirSync(dataDir);
    }
};

// -------------------------------------------------------- //

/**
 * @function dateDirExists
 * @description Check if the date/date directory exists
 * @param { string } date
 * @returns { boolean }
 */
const dateDirExists = date => {
    return fs.existsSync(dataDir + date);
};

// -------------------------------------------------------- //

/**
 * @function ensureDateDirExists
 * @description Creates the data/date directory if non existant
 * @param { string } date
 * @returns { void }
 */
const ensureDateDirExists = date => {
    ensureDataDirExists();
    if (!dateDirExists(date)) {
        fs.mkdirSync(dataDir + date);
    }
};

// -------------------------------------------------------- //

// TODO: Move this to constants module
const getDate = () => {
    const d = new Date();
    return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
};

// -------------------------------------------------------- //

/**
 *  @function saveProductData
 *  @description Save given product data to file
 *  @param { string } fileName
 *  @param { object } productData
 *  @returns { void }
 */
const saveProductData = (fileName, productData) => {
    const date = getDate();
    ensureDateDirExists(date);
    const filePath = dataDir + date + '/' + fileName + '.json';
    const data = JSON.stringify(productData, null, 4);
    fs.writeFile(filePath, data, err => {
        if (err) {
            // console.error(err);
            return false;
        }
        return true;
        // console.log("File has been created");
    });
};

// -------------------------------------------------------- //

const readProductData = () => {
    // TODO: Check data/date directory exists
    const dates = fs.readdirSync(dataDir);
    const date = dates[0];
    // data/date directory
    let dataPath = dataDir + date;
    // data/date/category directories
    const categoryDirs = fs.readdirSync(dataPath);

    const categoryDir = categoryDirs[0];

    const productFilePath = dataPath + '/' + categoryDir;

    const productFile = fs.readFileSync(productFilePath);

    const productData = JSON.parse(productFile);

    // instantiate
    var table = new Table({
        head: ['Product Name', 'Price', 'Quantity'],
        colWidths: [30, 10, 10]
    });

    for (let product in productData) {
        let p = productData[product];
        table.push([p.name, p.pricePer, p.priceMode]);
    }

    console.log(table.toString());
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
    saveProductData,
    readProductData
};

// EOF //
