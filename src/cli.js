#!/usr/bin/env node
/**
 *  `src/cli.js`
 *
 *  * Supomation CLI
 */

'use strict';

const meow = require('meow');

const cli = meow(`
  Usage: supomation [options]

  Options:
        --lang LANG    set the language

  Other options:
    -h, --help         show usage information
    -v, --version      print version info and exit
`, {
        string: ['lang'],
        boolean: ['help', 'version'],
        alias: { h: 'help', v: 'version' }
    });

// EOF //
