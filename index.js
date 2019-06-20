#!/usr/bin/env node

/**
 *  `index.js`
 */

"use strict";

// IMPORTS
//const CFonts = require('cfonts');
const chalk = require("chalk");
const puppeteer = require("puppeteer");
//const fs = require("fs");

// CONSTANTS
//let url = "https://www.newworld.co.nz/savings/virtual-mailer";
const TARGET = "https://www.ishopnewworld.co.nz/specials";

async function runSupomation() {
	console.log(chalk.blue("-> Launching puppeteer..."));
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	console.log(chalk.blue("-> Navigating to: ") + chalk.underline(TARGET));
	await page.goto(TARGET);

	console.log(chalk.blue("-> Retrieving products list..."));
	let products = await page.$$eval(".fs-product-card__description", nodes => nodes.map(node => node.textContent));
	console.log({ products });

	//let description = await page.$eval('.fs-product-card__footer-container', e => e.outerHTML);
	//console.log(description);
	//writeToFile("desc.html", description);

	//let priceInfo = await page.$eval(".fs-price-lockup", e => e.textContent);
	//console.log(priceInfo);

	//console.log(chalk.blue("\t * Saving page contents...\n"));
	//let content = await page.content();
	//console.log(content);
	//writeToFile("contents.html", content);

	await browser.close();
}

/*
function writeToFile(name, content) {
	fs.writeFile(name, content, function (err) {
		if (err) {
			return console.log(chalk.red(err));
		}
		console.log(chalk.green(name + " written successfully!"));
	});
}
*/

/*
function printTitle() {
	CFonts.say('SUPOMATION', {
		font: 'block',              // define the font face; block, shade, chrome, simple, simpleBlock, 3d, simple3d, huge
		align: 'left',              // define text alignment
		colors: ['green'],         	// define all colors
	});
}
*/

function mainProcess() {
	console.log(chalk.underline.bold.green("SUPOMATION"));
	//printTitle();
	runSupomation();
}

mainProcess();


// EOF //
