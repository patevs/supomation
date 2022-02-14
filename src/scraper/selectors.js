/**
 *	`src/scraper/selectors.js`
 *
 *	* Supomation Scraper Selectors
 */

'use strict';

/***************
 * * CONSTANTS *
 ***************/

// Element Selectors
const PRODUCT_SELECTOR = '.fs-product-card';
const PRODUCT_DATA_SELECTOR = PRODUCT_SELECTOR + '__footer-container';

/*************
 * * EXPORTS *
 *************/

export default {
  PRODUCT_SELECTOR,
  PRODUCT_DATA_SELECTOR,
  PRODUCT_NAME_SELECTOR: '.u-p2',
  PRODUCT_QUANTITY_SELECTOR: '.u-p3',
}

// module.exports = {
//   PRODUCT_SELECTOR,
//   PRODUCT_DATA_SELECTOR,
//   PRODUCT_NAME_SELECTOR: '.u-p2',
//   PRODUCT_QUANTITY_SELECTOR: '.u-p3',
// };

// EOF //
