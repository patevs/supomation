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

/*
(async () => {
    console.log(await loadJsonFile('foo.json'));
    //=> {foo: true}
})();
*/

// ------------------------------------------ //

/**
 *  @function saveProductData
 *  @description Save given product data to file
 *  @param { string } fileName
 *  @param { object } productData
 *  @returns { void }
 */
const saveProductData = async (fileName, productData) => {
    const d = new Date();
    const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    const filePath = 'data/' + date + '/' + fileName + '.json';
    // TODO: Wrap in try/catch
    await writeJsonFile(filePath, productData);
};

// ------------------------------------------ //

const readProductData = async () => {
    var files = fs.readdirSync(dataDir);
    var file = files[0];
    let dataPath = dataDir + file;
    let dataFiles = fs.readdirSync(dataPath);
    let dataFile = dataFiles[0];

    console.log(dataPath + '/' + dataFile);

    let productData = await loadJsonFile(dataPath + '/' + dataFile);

    console.log(productData);

    return productData;
    /*
    for (let f in files) {
        let date = files[f];
        let dataPath = dataDir + date;
        let dataFiles = fs.readdirSync(dataPath);
        console.log(dataFiles);
        aProductPath = dataFiles[0];
        break;
    };
    console.log(aProductPath);
    */
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
    saveProductData,
    readProductData
};

// EOF //
