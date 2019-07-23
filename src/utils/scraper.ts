#!/usr/bin/env node

/**
 *	`src/utils/scraper.ts`
 *
 *	* Supomation Scraper Helper Functions
 *
 *  TODO: Correct type annotations
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

import cheerio from "cheerio";

/***************
 * * CONSTANTS *
 ***************/

const PRODUCT_SELECTOR: string = ".fs-product-card";
const PRODUCT_DATA_SELECTOR: string = PRODUCT_SELECTOR + "__footer-container";
const PRODUCT_NAME_SELECTOR: string = ".u-p2";

/**********************
 * * HELPER FUNCTIONS *
 **********************/

/**
 *	* Get the name of a given product element
 *
 * @param { product element } productElem
 * @returns { name of product }
 */
function getProductName(productElem: any) {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Get products name
    const pname = $(PRODUCT_NAME_SELECTOR).text();
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
function getProductData(productElem: any) {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Get the product's data
    const pdata = $(PRODUCT_DATA_SELECTOR).attr("data-options");
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
// TODO: Create product interface
function processProduct(pname: any, pdata: any) {
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

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  * scrapProducts
 *  Scrap the product data from the given page's HTML content
 *
 * @param { target page html content } pageHtmlContent
 * @returns { any[] } allProducts
 */
async function scrapProducts(pageHtmlContent: string) {
    // Array of all products to return
    let allProducts: any[] = [];
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

export { scrapProducts };

/*
module.exports = {
    scrapProducts
};
*/

// EOF //
