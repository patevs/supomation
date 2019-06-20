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
	//let product = await page.$eval(".fs-product-card", e => e.innerHTML);
	//console.log(product);
	let product = await page.$(".fs-product-card");
	let pname = await product.$eval(".u-p2", e => e.textContent);
	console.log(pname);
	let pdetails = await product.$eval(".fs-product-card__footer-container", e => e.getAttribute("data-options"));
	console.log(pdetails);
	//console.log(product);
	/*
	let products = await page.$$eval(".fs-product-card__description", nodes =>
		nodes.map(node => node.textContent)
	);
	console.log({ products });
	*/

	//let description = await page.$eval(".fs-product-card__footer-container", e => e.getAttribute("data-options"));
	//console.log(description);
	//writeToFile("desc.html", description);

	//let priceInfo = await page.$eval(".fs-product-card", e => e.outerHTML);
	//console.log(priceInfo);

	//let priceDollars = await page.$eval(".fs-price-lockup__dollars", e => e.innerHTML);
	//console.log("Dollars: " + priceDollars);

	//let priceCents = await page.$eval(".fs-price-lockup__cents", e => e.innerHTML);
	//console.log("Cents: " + priceCents);

	// "fs-price-lockup__dollars";
	// "fs-price-lockup__cents"

	//console.log(chalk.blue("* Saving page contents..."));
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
