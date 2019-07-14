/**
 *	`index.js`
 */

"use strict";

const myModule = require('./module');
let val = myModule.hello(); // . val is "Hello"

console.log(val);

module.exports = {};

// EOF //
