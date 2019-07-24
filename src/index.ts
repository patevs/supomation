#!/usr/bin/env node

/**
 *  `src/index.ts`
 *
 *  * Supomation CLI
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// Logging Utilities
import * as logging from './utils/logging';

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

/***************
 * * FUNCTIONS *
 ***************/

const runWebScraper = () => {
    const category = ALL_CATEGORIES[0];
    const target = CATEGORY_BASE_URL + category;
    logging.log(target);
};

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(function() {
    logging.logWelcome(); // Log Supomation main welcome
    logging.logInfo('Starting Supomation WebScraper...');
    runWebScraper();
    // promptMain(); // Main menu prompt
})();

// EOF //
