#!/usr/bin/env node

/**
 *	`lib/index.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const axios = require("axios");

// . const myModule = require("./module");
// . let val = myModule.hello(); // . val is "Hello"

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

// Target URL
const TARGET_URL = "https://www.ishopnewworld.co.nz/specials";

/***************
 * * FUNCTIONS *
 ***************/

function makeRequest() {
	// ..
	log("\nMAKING REQUEST...");
	// Make a request
	axios.get(TARGET_URL)
		.then(function (response) {
			// Handle success
			log("\nREQUEST SUCCESS!");
			// . console.log(response);
		})
		.catch(function (error) {
			// Handle error
			// . console.log(error);
			log("\nREQUEST ERROR!");
		})
		.finally(function () {
			// Always executed
			log("\nAFTER REQUEST!");
		});
	// ..
}

// ------------------------------------------//

/**
 *	* Application entry point
 */
(function () {
	// ..
	// . log(val);
	// . log("APPLICATION ENTRY POINT!");
	makeRequest();
	// ..
})();

// . module.exports = {};

// EOF //
