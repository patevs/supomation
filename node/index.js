#!/usr/bin/env node

/**
 *  `index.js`
 */

// IMPORTS
var program = require('commander');

program
  .version('0.0.1')
  .description('Application simple description')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz')
  .parse(process.argv);

if (!program.args.length) program.help();


// EOF //
