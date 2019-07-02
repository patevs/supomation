#!/usr/bin/env node

/**
 *  `src/cli.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const blessed = require("blessed");
const contrib = require("blessed-contrib");

// const puppeteer = require("puppeteer");
// const inquirer = require("inquirer");
// const ora = require("ora");
// const logSymbols = require("log-symbols");
// const chalk = require("chalk");
// const fs = require("fs");

/***********
 * * THEME *
 ***********/

// const log = console.log;
// const title = chalk.bold.underline.green;
// const link = chalk.underline.cyan;
// const green = chalk.green;
// const red = chalk.red;
// const blue = chalk.blue;

/***************
 * * CONSTANTS *
 ***************/

// terminal screen
const screen = blessed.screen();

// line chart
const line = contrib.line({
	style: {
		line: "yellow",
		text: "green",
		baseline: "black"
	},
	xLabelPadding: 3,
	xPadding: 5,
	label: "Title"
});

// data to display
const data = {
	x: ["t1", "t2", "t3", "t4"],
	y: [5, 1, 7, 5]
};

// Target URL
// const TARGET = "https://www.ishopnewworld.co.nz/specials";
// Product CSS selector
// const productBaseSelector = ".fs-product-card";

/***************
 * * FUNCTIONS *
 ***************/

screen.append(line); //must append before setting data
line.setData([data]);

// Handle key events
// eslint-disable-next-line no-unused-vars
screen.key(["escape", "q", "C-c"], function (ch, key) {
	return process.exit(0);
});

// Render the screen
screen.render();

/**
* * Application entry point
*/
/*
(function () {
	//..
	// log(title("\nWELCOME TO SUPOMATION CLI\n"));
	//..
})();
*/

// EOF //
