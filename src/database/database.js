/**
 *  `src/database/database.js`
 *
 *  * Supomation Database Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// const fs = require('fs');

// const Table = require('cli-table3');

const helpers = require('./helpers');

/***************
 * * CONSTANTS *
 ***************/

const DATA_DIR = 'data/';

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  @function setupDataDir
 *  @description Ensures the data/date directory exists
 *  @param { string } date - todays date formatted as: yyyy-mm-dd
 *  @returns { void }
 */
const setupDataDir = date => {
    helpers.ensureDateDirExists(DATA_DIR, date);
};

// -------------------------------------------------------- //

/**
 *  @function saveProductData
 *  @description Save given product data to file
 *  @param { string } date - todays date formatted as: yyyy-mm-dd
 *  @param { string } fileName - name of the data file to save
 *  @param { object } productData - JSON object containing product data to save
 *  @returns { boolean }
 */
const saveProductData = (date, fileName, productData) => {
    // Construct file path
    const filePath = DATA_DIR + date + '/' + fileName + '.json';
    // Convert JSON data to string
    const data = JSON.stringify(productData, null, 4);
    // Write data to file
    return helpers.writeProductDataFile(filePath, data);
};

// -------------------------------------------------------- //

/*
const readProductData = () => {
    const dates = fs.readdirSync(DATA_DIR);
    const date = dates[0];
    // data/date directory
    let dataPath = DATA_DIR + date;
    // data/date/category directories
    const categoryDirs = fs.readdirSync(dataPath);

    const categoryFilePath = dataPath + '/' + categoryDirs[0];

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
*/

/*************
 * * EXPORTS *
 *************/

module.exports = {
    setupDataDir,
    saveProductData
    // readProductData
};

// EOF //
