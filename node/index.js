#!/usr/bin/env node

/**
 *  `index.js`
 */

// IMPORTS
//const program = require('commander');
const chalk = require('chalk');
const puppeteer = require('puppeteer');

console.log(chalk.green.underline.bold('\t--- SUPOMATION ---\n'));

(async () => {
  //const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false }); // default is true
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();

/*
async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com');
  await page.screenshot({ path: 'github.png' });
  browser.close();
}
run();
*/

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
