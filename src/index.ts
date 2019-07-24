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
// JQuery Implementation
import cheerio from 'cheerio';

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

// Product Selectors
const PRODUCT_SELECTOR: string = '.fs-product-card';
const PRODUCT_DATA_SELECTOR: string = PRODUCT_SELECTOR + '__footer-container';
const PRODUCT_NAME_SELECTOR: string = '.u-p2';

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  * processProduct
 * @param productName
 * @param productData
 */
const processProduct = (productName: string, productData: any) => {
    // Get the product's unique id
    const pid = productData.productId;
    // Get the product's details
    const pdetails = productData.ProductDetails;
    // Create a product object
    const product = {
        uid: pid,
        name: productName,
        pricePer: pdetails.PricePerItem,
        priceMode: pdetails.PriceMode,
        baseUnit: pdetails.PricePreBaseUnitText
    };
    // Return the processed product
    return product;
};

// ------------------------------------------ //

/**
 *  * getProductName
 * @param { CheerioElement } productElem
 */
const getProductName = (productElem: CheerioElement) => {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Get products name
    const pname = $(PRODUCT_NAME_SELECTOR).text();
    // Remove whitespace and return the result
    return pname.trim();
};

// ------------------------------------------ //

/**
 *  * getProductData
 * @param { CheerioElement }  productElem
 */
const getProductData = (productElem: CheerioElement) => {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Get the product's data
    const pdata = $(PRODUCT_DATA_SELECTOR).attr('data-options');
    // Parse product data as JSON and return the result
    return JSON.parse(pdata);
};

// ------------------------------------------ //

/**
 *  * scrapProductsFromPage
 * @param { string } pageHtmlContent
 */
const scrapProductsFromPage = (category: string, pageHtmlContent: string) => {
    logging.log('Scraping Products from category: ' + category);
    // Array of all products to return
    // tslint:disable-next-line: prefer-const
    let allProducts = [];
    // Load the target page HTML content into cheerio
    const $ = cheerio.load(pageHtmlContent);
    // Select all products from target page
    const productElems = $(PRODUCT_SELECTOR);
    const numProducts = productElems.length;
    // Iterate over all products
    for (let i = 0; i < numProducts; i++) {
        // Get the current product element
        const productElem = productElems[i];
        // Get the name of the current product
        const productName = getProductName(productElem);
        // Get the data for the current product
        const productData = getProductData(productElem);
        // Process the current product
        const product = processProduct(productName, productData);
        // Push product object into products array
        allProducts.push(product);
    }

    // Return array containing all products
    return allProducts;
};

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
    // logging.log(pageContents);
    const products = scrapProductsFromPage(category, pageContents);
    logging.log(products);
    // TODO: Do something with product data
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
