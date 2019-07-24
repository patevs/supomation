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

// HTTP Client
import axios from 'axios';

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

const PRODUCT_SELECTOR: string = '.fs-product-card';
const PRODUCT_DATA_SELECTOR: string = PRODUCT_SELECTOR + '__footer-container';
const PRODUCT_NAME_SELECTOR: string = '.u-p2';

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  * scrapProductsFromPage
 *  Scrap the product data from the given page's HTML content
 *
 * @param { target page html content } pageHtmlContent
 * @returns allProducts
 */
/*
async function scrapProductsFromPage(pageHtmlContent: string) {
    // Array of all products to return
    let allProducts = [];
    // Load the target page HTML content into cheerio
    const $ = cheerio.load(pageHtmlContent);
    // Select all products from target page
    let productElems = $(PRODUCT_SELECTOR);
    let numProducts = productElems.length;
    // Iterate over all products
    for (let i = 0; i < numProducts; i++) {
        // Get the current product element
        let productElem = productElems[i];
        // Get the name of the current product
        // let pname = getProductName(productElem);
        // Get the data for the current product
        // let pdata = getProductData(productElem);
        // Process the current product
        // let product = processProduct(pname, pdata);
        // Push product object into products array
        // allProducts.push(product);
    }

    // Return array containing all products
    return allProducts;
}
*/

// ------------------------------------------ //

/**
 *  * getPageContents
 * @param { string } targetUrl
 */
const getPageContents = async (targetUrl: string) => {
    logging.log(targetUrl);
    //
    try {
        const response = await axios.get(targetUrl);
        return response.data;
        // const products = await scraper.scrapProducts(data);
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
    const pageContents = await getPageContents(target);
    logging.log(pageContents);
    // TODO: Scrap products from page
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
