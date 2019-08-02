/**
 *  `src/database/database.js`
 *
 *  * Supomation Database Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const fs = require('fs');

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
 *  @param { string } fileName
 *  @param { object } productData
 *  @returns { boolean }
 */
const saveProductData = (date, fileName, productData) => {
    // const date = getDate();
    // ensureDateDirExists(date);
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
