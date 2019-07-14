#!/usr/bin/env node

/**
 *	`lib/index.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const myModule = require('./module');
let val = myModule.hello(); // . val is "Hello"

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Application entry point
 */
(function () {
	// .
	log(val);
	log("APPLICATION ENTRY POINT!");
	// .
})();

// . module.exports = {};

// EOF //
