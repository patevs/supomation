#!/usr/bin/env node

/**
 *	`lib/utils.js`
 *
 *	* Utility Helper Functions
 */

"use strict";

/*************
 * * IMPORTS *
 *************/
const chalk = require("chalk");
// Logging utilities
const logging = require("./logging");

/***************
 * * CONSTANTS *
 ***************/

/***********
 * * THEME *
 ***********/

// Colors
const blue = chalk.cyan;
const magenta = chalk.magenta;

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Quit Supomation CLI
 */
function quit() {
	logging.logError("Quitting Supomation CLI...");
	process.exit(0);
}

// ------------------------------------------ //

/**
 *	* Print the Supomation CLI version
 */
function version() {
	const msg =
		"Supomation CLI version: " + blue(process.env.npm_package_version);
	logging.logInfo(msg);
}

// ------------------------------------------ //

/**
 *	* Print the Supomation help message
 */
function help() {
	logging.logInfo(" ---- " + magenta("HELP MESSAGE") + " ---- ");
}

// ------------------------------------------//

/**
 *	* Write some data to file
 */
// ! TODO: Make this async
/*
function writeToFile(fileName, content) {
	// ..
	// Initialize an interactive prompt
	const writePrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status
	writePrompt.await(
		"[%d/2] - Saving data to file as: %s",
		1,
		green(fileName)
	);
	// Create data directory if doesnt exists
	if (!fs.existsSync("data")) {
		fs.mkdirSync("data");
	}

	// Build file path
	const filePath = "data/" + fileName;
	// Write data to file
	fs.writeFile(filePath, content, err => {
		if (err) {
			// Log any errors
			writePrompt.error(red(err));
			return;
		}

		// Log success
		writePrompt.success(
			"[%d/2] - Data file saved as: %s",
			2,
			green(fileName)
		);
	});
	// ..
}
*/

// ------------------------------------------//


/*************
 * * EXPORTS *
 *************/

module.exports = {
	quit,
	version,
	help
};

// EOF //
