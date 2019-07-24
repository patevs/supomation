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
// Scraper Utilities
import * as scraper from './utils/scraper';

// HTTP Client
import axios from 'axios';

// JSON file writer
// const writeJsonFile = require('write-json-file');

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

const saveProductData = (filePath: string, productData: any) => {
    logging.log('Saving Product Data...');
};

// ------------------------------------------ //

/**
 *  * getPageContents
 * @param { string } targetUrl
 */
const getPageContents = async (targetUrl: string) => {
    // logging.log(targetUrl);
    try {
        const response = await axios.get(targetUrl);
        return response.data;
    } catch (error) {
        logging.logError(error);
    }
};

// ------------------------------------------ //

/**
 *  * runWebScraper
 */
const runWebScraper = async () => {
    logging.logInfo('Starting Supomation WebScraper...\n');
    const category = ALL_CATEGORIES[0];
    const target = CATEGORY_BASE_URL + category;
    // Get contents of target page
    const pageContents = await getPageContents(target);
    // logging.log(pageContents);
    // Scrap products from page
    const productsData = scraper.scrapProductsFromPage(pageContents);
    // logging.log(productsData);
    saveProductData(category, productsData);
};

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(function() {
    logging.logWelcome(); // Log Supomation main welcome
    runWebScraper(); // Run Supomation WebScraper
    // promptMain(); // Main menu prompt
})();

// EOF //
