/**
 *  `src/index.js`
 *
 *  * Supomation Core
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const globals = require('./globals');
const scraper = require('./scraper');
const axios = require('axios');
const Listr = require('listr');

const { Observable } = require('rxjs');

/***************
 * * FUNCTIONS *
 ***************/

const scrapSpecials = async () => {
  const targetUrl = globals.SPECIALS_BASE_URL;
  const specialTasks = new Listr([
    {
      title: 'Scraping Category: Specials', // + logging.green('Specials'),
      task: () => {
        return new Observable(observer => {
          observer.next('Scraping Product Data');
          axios.get(targetUrl).then(response => {
            // return response.data;
            // grab product data from page
            const productData = scraper.scrapProductsFromPage(response.data);
            observer.next('Saving Product Data');
            console.log(productData);
            /*
            data.saveProductData(
              utils.getDate(),
              'specials',
              productData
            );
            */
            observer.complete();
            // return productData;
          });
        });
      }
    }
  ]);
  await specialTasks.run();
};

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(() => {
  console.log('Starting Supomation...');
  console.log('Version: ' + globals.PROJECT_VERSION);
  // const specialsData =
  scrapSpecials();
  // console.log(specialsData);
})();

// EOF //
