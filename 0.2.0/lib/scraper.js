#!/usr/bin/env node

/**
 *	`lib/scraper.js`
 *
 *	* Scraper Helper Functions
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

const cheerio = require("cheerio");

/***************
 * * CONSTANTS *
 ***************/

// Product CSS selector
const PRODUCT_SELECTOR = ".fs-product-card";

/***************
 * * FUNCTIONS *
 ***************/

/**
*	* Get the name of a given product element
*
* @param { product element } productElem
* @returns { name of product }
*/
function getProductName(productElem) {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Product name CSS selector
    const nameSelector = ".u-p2";
    // Get products name
    const pname = $(nameSelector).text();
    // Remove whitespace and return the result
    return pname.trim();
}

// ------------------------------------------ //

/**
 *	* Get the data for a given product element
 *
 * @param { product element } productElem
 * @returns { product data }
 */
function getProductData(productElem) {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Product data CSS selector
    const dataSelector = PRODUCT_SELECTOR + "__footer-container";
    // Get the product's data
    const pdata = $(dataSelector).attr("data-options");
    // Parse product data as JSON and return the result
    return JSON.parse(pdata);
}

// ------------------------------------------ //

/**
 *	* Process the data for a given product
 *
 * @param { Product's name } pname
 * @param { Product's data } pdata
 * @returns { product }
 */
function processProduct(pname, pdata) {
    // Get the product's unique id
    const pid = pdata.productId;
    // Get the product's details
    const pdetails = pdata.ProductDetails;
    // Get the product's price info
    const priceMode = pdetails.PriceMode;
    const pricePer = pdetails.PricePerItem;
    // . console.log(pdetails);
    const baseUnit = pdetails.PricePreBaseUnitText;
    // Create a product object
    const product = {
        uid: pid,
        name: pname,
        pricePer: pricePer,
        priceMode: priceMode,
        baseUnit: baseUnit
    };
    // Return the processed product
    return product;
}

// ------------------------------------------ //

/**
 *	* Scrap the product data from the current page
 *
 * @param { target page html content } pageHtmlContent
 */
function scrapProducts(pageHtmlContent) {
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
        let pname = getProductName(productElem);
        // Get the data for the current product
        let pdata = getProductData(productElem);
        // Process the current product
        let product = processProduct(pname, pdata);
        // Push product object into products array
        allProducts.push(product);
    }

    // Return array containing all products
    return allProducts;
}


/*************
 * * EXPORTS *
 *************/

module.exports = {
    scrapProducts
}


// EOF //

