#!/usr/bin/env node
'use strict';
const meow = require('meow');
const supomation = require('.');

const cli = meow(`
	Usage
	  $ supomation [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ supomation
	  unicorns & rainbows
	  $ supomation ponies
	  ponies & rainbows
`);

console.log(supomation(cli.input[0] || 'unicorns'));
