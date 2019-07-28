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

/***************
* * FUNCTIONS *
***************/

var files = fs.readdirSync('data/');

/*
(async () => {
    console.log(await loadJsonFile('foo.json'));
    //=> {foo: true}
})();
*/

const readProductsData = () => {
    console.log(files);
};

/************
* * EXPORTS *
*************/

module.exports = {
    readProductsData
};

// EOF //
