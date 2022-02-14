/**
 *  `src/api.js`
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// HTTP client
// const axios = require('axios');
import axios from 'axios';
const { get } = axios;
// import axios from "axios";
// JQuery implementation
// const cheerio = require('cheerio');
// import cheerio from "cheerio";

//const Listr = require('listr');
import * as Listr from 'listr';
// const { Observable } = require('rxjs');
import { Observable } from 'rxjs';

// const Multispinner = require('multispinner');

// const scraper = require('./scraper/scraper');
import * as scraper from './scraper/scraper.js';

// const globals = require('./globals');
import * as globals from './globals.js'

/***************
 * * FUNCTIONS *
 ***************/

/*
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});
*/

// eslint-disable-next-line no-unused-vars
async function getVirtualMailer() {
  try {
    const response = await axios.get(
      'https://app.redpepperdigital.net/app/redpepper/home/91'
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

/*
function createSupomationApiInstance() {
  const instance = axios.create({
    baseURL: globals.VIRTUAL_MAILER_URL,
    timeout: 1000,
    headers: { Cookie: 'new-world-store-id=storenodeid=1260' }
  });
  return instance;
}
*/

/* axios async example
async function getUser() {
    try {
        const response = await axios.get("/user?ID=12345");
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
*/

/**
 * @function scrapCategory
 * @description Scrap a given category
 * @param { string } category - Category to scrap
 * @param { Multispinner } spinners - Multispinners
 * @returns { string } response data
 */
/*
const scrapCategory = async (category, spinners) => {
    const targetUrl = constants.CATEGORY_BASE_URL + category;
    try {
        const response = await axios.get(targetUrl);
        const productData = scraper.scrapProductsFromPage(response.data);
        data.saveProductData(category, productData);
        spinners.success(category);
        return productData;
    } catch (error) {
        spinners.error(category);
        logging.logError(error);
    }
};
*/

// -------------------------------------------------------- //

/**
 * @function scrapAllCategories
 * @description Scrap product data from all categories
 * @param { string[] } allCategories - Array of all categories
 * @returns { void }
 */
/*
const scrapAllCategories = allCategories => {
    const spinners = new Multispinner(allCategories, {
        preText: 'Category:'
    });

    // Scrap all categories
    for (let category in allCategories) {
        scrapCategory(allCategories[category], spinners);
    }

    // Handle success/error events
    spinners
        .on('success', () => {
            // does not fire if spinners.error is called
            logging.log(); // new line
            logging.logSuccess('Supomation WebScraper Finished Successfully!');
            mainMenu();
        })
        .on('err', e => {
            logging.log(); // new line
            logging.logError('Error running Supomation WebScraper: ' + e);
        });
};
*/

const getSpecials = async () => {
  const targetUrl = globals.SPECIALS_BASE_URL;
  const specialTasks = new Listr([
    {
      title: 'Scraping Category: Specials', // + logging.green('Specials'),
      task: () => {
        return new Observable((observer) => {
          observer.next('Scraping Product Data');
          axios.get(targetUrl).then((response) => {
            // return response.data;
            // grab product data from page
            const productData = scraper.scrapProductsFromPage(response.data);
            observer.next('Saving Product Data');
            console.log(productData);
            // data.saveProductData(
            //   utils.getDate(),
            //   'specials',
            //   productData
            // );
            observer.complete();
            // return productData;
          });
        });
      },
    },
  ]);
  await specialTasks.run();
};

// -------------------------------------------------------- //

export default getSpecials;

// module.exports = {
//   // getVirtualMailer,
//   getSpecials,
// };

// EOF //
