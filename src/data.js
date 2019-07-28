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

// const loadJsonFile = require('load-json-file');

const fs = require('fs');

/**************
* * CONSTANTS *
***************/

// TODO: move this into constants module
const dataDir = 'data/';

var files = fs.readdirSync(dataDir);

/**************
* * FUNCTIONS *
***************/

/*
(async () => {
    console.log(await loadJsonFile('foo.json'));
    //=> {foo: true}
})();
*/

const readProductsData = () => {
    for (let f in files) {
        let date = files[f];
        let path = dataDir + date;
        let dataFiles = fs.readdirSync(path);
        console.log(dataFiles);
    }
};

/************
* * EXPORTS *
*************/

module.exports = {
    readProductsData
};

// EOF //
