#!/usr/bin/env node
/**
 *  `src/constants.js`
 *
 *  * Supomation Contants
 */

'use strict';

/***************
 * * CONSTANTS *
 ***************/

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
    CATEGORY_BASE_URL,
    ALL_CATEGORIES
};

// EOF //
