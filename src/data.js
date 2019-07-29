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
const DATA_DIR = 'data/';

/***************
 * * FUNCTIONS *
 ***************/

/**
 * @function dataDirExists
 * @description Check if data directory exists
 * @returns { boolean }
 */
const dataDirExists = () => {
    return fs.existsSync(DATA_DIR);
};

// -------------------------------------------------------- //

/**
 * @function ensureDataDirExists
 * @description Creates data directory if non existant
 * @returns { void }
 */
const ensureDataDirExists = () => {
    if (!dataDirExists()) {
        fs.mkdirSync(DATA_DIR);
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
    return fs.existsSync(DATA_DIR + date);
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
        fs.mkdirSync(DATA_DIR + date);
    }
};

// -------------------------------------------------------- //

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
    const filePath = DATA_DIR + date + '/' + fileName + '.json';
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
    const dates = fs.readdirSync(DATA_DIR);
    const date = dates[0];
    // data/date directory
    let dataPath = DATA_DIR + date;
    // data/date/category directories
    const categoryDirs = fs.readdirSync(dataPath);

    const categoryDir = categoryDirs[0];

    const categoryFilePath = dataPath + '/' + categoryDir;

    const categoryFile = fs.readFileSync(categoryFilePath);

    const categoryData = JSON.parse(categoryFile);

    // instantiate
    var table = new Table({
        head: ['Product Name', 'Price / Quantity'],
        colWidths: [30, 20]
    });

    for (let productData in categoryData) {
        let p = categoryData[productData];
        // console.log(p);
        table.push([p.name, p.pricePer + '/' + p.priceMode + ' ' + p.quantity]);
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
