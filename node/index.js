#!/usr/bin/env node

/**
 *  `index.js`
 */

// IMPORTS
const program = require('commander');
const chalk = require('chalk');

console.log(chalk.green.underline.bold('\t--- SUPOMATION ---\n'));

program
  .version('0.0.1')
  .description('Application simple description')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz')
  .parse(process.argv);

if (!program.args.length) program.help();

// EOF //
