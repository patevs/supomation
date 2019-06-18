#!/usr/bin/env node

/**
 *  `index.js`
 */

// IMPORTS
//const program = require('commander');
const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');

/*
async function runPuppeteerEx() {
  const browser = await puppeteer.launch({ headless: false }); // default is true
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: "example.png" });
  const textContent = await page.evaluate(() => document.querySelector('p').textContent);
  console.log(chalk.blue(textContent));
  //const innerText = await page.evaluate(() => document.querySelector('p').innerText);
  //console.log(innerText);
  await browser.close();
}
*/

async function runPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //let url = "https://www.newworld.co.nz/savings/virtual-mailer";
  let url = "https://www.ishopnewworld.co.nz/specials";

  console.log(chalk.green("\t * Navigating to: ") + chalk.underline(url) + "\n");
  await page.goto(url);

  console.log(chalk.blue("\t * Getting products list...\n"));

  let products = await page.$$eval('.fs-product-card__description', nodes => nodes.map(node => node.textContent));
  console.log(products);

  //let description = await page.$eval('.fs-product-card__footer-container', e => e.outerHTML);
  //console.log(description);

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
  console.log(chalk.green.underline.bold('\t--- SUPOMATION ---\n'));
  console.log(chalk.blue("\t * Running puppeteer...\n"));
  runPuppeteer();
}

run();

/*
program
  .version('0.0.1')
  .description('Application simple description')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz')
  .parse(process.argv);

if (!program.args.length) program.help();
*/

// EOF //
