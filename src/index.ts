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

/*
const getCategoryPage = async (category: string, prompt: any) => {
    // Category target url
    const targetUrl = CATEGORY_BASE_URL + category;
    // prompt.pending('[2/4] - Getting target: ' + targetUrl);
    try {
        const response = await axios.get(targetUrl);
        prompt.await(
            '[2/4] - Scraping products from category: ' +
                logging.green(category)
        );

        // return response.data;
        // Scrap products from page
        const productsData = scraper.scrapProductsFromPage(response.data);
        const numProducts: string = productsData.length.toString();
        prompt.success(
            '[3/4] - Scraped ' +
                logging.blue(numProducts) +
                ' products from category: ' +
                logging.green(category)
        );
        return productsData;
    } catch (error) {
        prompt.error('ERROR getting target: ' + error);
        logging.logError(error);
        return;
    }
    // return;
};
*/

// ------------------------------------------ //

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

const initCategoryPrompt = (category: string) => {
    // Category target url
    const prompt = new Signale({ interactive: true, scope: 'supomation' });
    prompt.pending('.....');
    // Initialize a new prompt
    // const prompt = initPrompt();
    prompt.await('[1/4] - Getting category: ' + logging.green(category));
    return prompt;
};

// ------------------------------------------ //

const scrapAllCategories = (allCategories: string[]) => {
    // ..
    const category0 = allCategories[0];
    const prompt0 = initCategoryPrompt(category0);
    // const categoryPageData =
    // getCategoryPage(category0, prompt0);
    prompt0.success('[4/4] - Saved products from: ' + logging.green(category0));
    // logging.log(); // new line
    // utils.saveProductData(category0, productsPageData);
    const category1 = allCategories[1];
    const prompt1 = initCategoryPrompt(category1);
    prompt1.success('[4/4] - Saved products from: ' + logging.green(category0));

    // getCategoryPage(category1, prompt1);
    // Get contents of target page
    // const target = CATEGORY_BASE_URL + category;
    // const pageContents = await getPageContents(target);
    // prompt.await(
    //     '[2/4] - Scraping products from category: ' + logging.green(category)
    // );
    // Get contents of target page
    // const pageContents = await getPageContents(target);

    // Scrap products from page
    // const productsData = scraper.scrapProductsFromPage(pageContents);
    // const numProducts: string = productsData.length.toString();
    // Save Product Data
    // utils.saveProductData(category, productsData);
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
    // await scrapCategory(ALL_CATEGORIES[2]);
    // await scrapCategory(ALL_CATEGORIES[3]);

    // await scrapCategory(ALL_CATEGORIES[4]);
    scrapAllCategories(ALL_CATEGORIES);
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
