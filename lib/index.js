#!/usr/bin/env node

/**
 *	`lib/index.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// HTTP Client
const axios = require("axios");

// JQuery Implementation
const cheerio = require("cheerio");
const $ = cheerio.load('<h2 class="title">Hello world</h2>')

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
 *	* Run cheerio
 */
function runCheerio() {
	// ..
	log("RUNNING CHEERIO...");
	$('h2.title').text('Hello there!');
	$('h2').addClass('welcome');
	let _ = $.html();
	log(_);
	// ..
}

// ------------------------------------------//

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
			runCheerio();
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
