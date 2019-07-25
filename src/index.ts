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
// Utility Helpers
import * as utils from './utils/utilities';
// Database Helpers
import * as db from './utils/db';

// HTTP Client
import axios from 'axios';
// Interactive logging
import { Signale } from 'signale';

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

/**
 *  * getPageContents
 * @param { string } targetUrl
 */
const getPageContents = async (targetUrl: string) => {
    try {
        const response = await axios.get(targetUrl);
        return response.data;
    } catch (error) {
        logging.logError(error);
    }
};

// ------------------------------------------ //

/**
 *  *initPrompt
 * @param { string } category
 */
const initPrompt = () => {
    const prompt = new Signale({ interactive: true, scope: 'supomation' });
    return prompt;
};

// ------------------------------------------ //

/**
 *  *scrapCategory
 * @param { string } category
 */
const scrapCategory = async (category: string) => {
    // Category target url
    const target = CATEGORY_BASE_URL + category;
    // Initialize a new prompt
    const prompt = initPrompt();
    prompt.await(
        '[1/4] - Getting page contents for category: ' + logging.green(category)
    );
    // Get contents of target page
    const pageContents = await getPageContents(target);
    prompt.await(
        '[2/4] - Scraping products from category: ' + logging.green(category)
    );
    // Scrap products from page
    const productsData = scraper.scrapProductsFromPage(pageContents);
    const numProducts: string = productsData.length.toString();

    prompt.success(
        '[3/4] - Scraped ' +
            logging.blue(numProducts) +
            ' products from category: ' +
            logging.green(category)
    );
    // Save Product Data
    utils.saveProductData(category, productsData);
    prompt.success(
        '[4/4] - Saved ' +
            logging.blue(numProducts) +
            ' products from: ' +
            logging.green(category)
    );
    logging.log(); // new line
};

// ------------------------------------------ //

/**
 *  * runWebScraper
 */
const runWebScraper = async () => {
    logging.logInfo('Starting Supomation WebScraper...\n');
    // Scrap each category
    await scrapCategory(ALL_CATEGORIES[0]);
    await scrapCategory(ALL_CATEGORIES[1]);
    await scrapCategory(ALL_CATEGORIES[2]);
    await scrapCategory(ALL_CATEGORIES[3]);
    // await scrapCategory(ALL_CATEGORIES[4]);
    logging.logSuccess(logging.green('DONE!'));
};

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(async function() {
    logging.logWelcome(); // Log Supomation main welcome
    await runWebScraper(); // Run Supomation WebScraper
    // promptMain(); // Main menu prompt
    db.connectToDb();
})();

// EOF //
