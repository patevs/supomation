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

const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');

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
 * @returns { boolean }
 */
const dateDirExists = date => {
    return fs.existsSync(dataDir + date);
};

// -------------------------------------------------------- //

/**
 * @function ensureDateDirExists
 * @description Creates the data/date directory if non existant
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
 *  @function saveProductDataNew
 *  @description Save given product data to file
 *  @param { string } fileName
 *  @param { object } productData
 *  @returns { void }
 */
const saveProductDataNew = (fileName, productData) => {
    const date = getDate();
    ensureDateDirExists(date);
    const filePath = dataDir + date + '/' + fileName + '.json';
    const data = JSON.stringify(productData, null, 4);
    fs.writeFile(filePath, data, () => {
        return true;
    });
};

// -------------------------------------------------------- //

/**
 *  @function saveProductData
 *  @description Save given product data to file
 *  @param { string } fileName
 *  @param { object } productData
 *  @returns { void }
 */
// TODO: Refactor to use fs module
const saveProductData = async (fileName, productData) => {
    const d = new Date();
    const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    const filePath = 'data/' + date + '/' + fileName + '.json';
    // TODO: Wrap in try/catch
    await writeJsonFile(filePath, productData);
};

// -------------------------------------------------------- //

/*
(async () => {
    console.log(await loadJsonFile('foo.json'));
    //=> {foo: true}
})();
*/

// -------------------------------------------------------- //

// TODO: Refactor to use fs module
const readProductData = async () => {
    const dates = fs.readdirSync(dataDir);
    const date = dates[0];
    let dataPath = dataDir + date;
    const categoryFiles = fs.readdirSync(dataPath);
    let categoryFile = categoryFiles[0];
    // console.log(dataPath + '/' + dataFile);
    let productData = await loadJsonFile(dataPath + '/' + categoryFile);
    let product = productData[0];
    console.log(product);
    // console.log(productData);
    return productData;
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
    saveProductDataNew,
    saveProductData,
    readProductData
};

// EOF //
