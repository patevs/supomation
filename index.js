#!/usr/bin/env node

/**
 *  `index.js`
 */

// IMPORTS
const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');

async function runSupomation() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //let url = "https://www.newworld.co.nz/savings/virtual-mailer";
  let url = "https://www.ishopnewworld.co.nz/specials";

  console.log(chalk.green("-> Navigating to: ") + chalk.underline(url) + "\n");
  await page.goto(url);

  console.log(chalk.blue("* Getting products list...\n"));
  let products = await page.$$eval('.fs-product-card__description', nodes => nodes.map(node => node.textContent));

  for (let i = 0; i < products.length; i++) {
    console.log(products[i]);
  }

  //let description = await page.$eval('.fs-product-card__footer-container', e => e.outerHTML);

  //console.log(chalk.blue("\t * Saving page contents...\n"));
  //let content = await page.content();
  //console.log(content);
  //writeToFile("contents.html", content);

  await browser.close();
}

function writeToFile(name, content) {
  fs.writeFile(name, content, function (err) {
    if (err) {
      return console.log(chalk.red(err));
    }
    console.log(chalk.green("\t * " + name + " saved successfully!\n"));
  });
}

function run() {
  console.log(chalk.green.underline.bold('--- SUPOMATION ---\n'));
  console.log(chalk.blue("* Running puppeteer...\n"));
  runSupomation();
}

run();

// EOF //
