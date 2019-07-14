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

/**
 *	* Make a GET Request
 */
function makeRequest() {
	// ..
	log("MAKING REQUEST...");
	// Make a request
	axios.get(TARGET_URL)
		.then(function (response) {
			// Handle success
			log("\nREQUEST SUCCESS!");
			// . log(response.data);
			log("Status code: " + response.status);
			// . log(response.statusText);
			// . log(response.headers);
			// . log(response.config);
			// . log(response);
		})
		.catch(function (error) {
			// Handle error
			// . log(error);
			log("\nREQUEST ERROR!");
			log(error.response.status);
			// . log(error.response.data);
			// . log(error.response.headers);
		})
		.finally(function () {
			// Always executed
			log("\nDONE!");
			// ..
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
