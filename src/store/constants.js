#!/usr/bin/env node
/**
 *  `src/store/constants.js`
 *
 *  * Supomation Contants
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const pjson = require('../../package.json');

/***************
 * * CONSTANTS *
 ***************/

// Project version
const PROJECT_VERSION = pjson.version;

// Base URL target
const BASE_URL = 'https://www.ishopnewworld.co.nz';
const CATEGORY_BASE_URL = BASE_URL + '/category/';

// Array of all categories
const ALL_CATEGORIES = [
    'fresh-foods-and-bakery',
    'chilled-frozen-and-desserts',
    'pantry',
    'personal-care',
    'kitchen-dining-and-household'
];

/*************
 * * EXPORTS *
 *************/

module.exports = {
    PROJECT_VERSION,
    CATEGORY_BASE_URL,
    ALL_CATEGORIES
};

// EOF //
