#!/usr/bin/env node
/**
 *  `src/index.js`
 *
 *  * Supomation
 */


'use strict';

/*************
 * * IMPORTS *
 *************/

const logging = require('./utils/logging');

/***************
 * * CONSTANTS *
 ***************/

/* // TODO: create constants module
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
*/

/***************
 * * FUNCTIONS *
 ***************/

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(function () {
    logging.logWelcome(); // Log Supomation main welcome
})();

// EOF //
