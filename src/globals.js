/**
 *  `src/globals.js`
 *
 *  * Supomation Core Global Constants
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const pjson = require('../package.json');

/***************
 * * CONSTANTS *
 ***************/

// const VIRTUAL_MAILER_URL: string =
//    "https://www.newworld.co.nz/savings/virtualmailer/";

// https://app.redpepperdigital.net/app/redpepper/home/91

// Base URL target
const BASE_URL = 'https://www.ishopnewworld.co.nz';
const SPECIALS_BASE_URL = BASE_URL + '/specials';
const CATEGORY_BASE_URL = BASE_URL + '/category/';

// Array of all categories
const ALL_CATEGORIES = [
  'fresh-foods-and-bakery',
  'chilled-frozen-and-desserts',
  'pantry',
  'personal-care',
  'kitchen-dining-and-household'
];

/*************
 * * EXPORTS *
 *************/

module.exports = {
  PROJECT_NAME: pjson.name,
  PROJECT_VERSION: pjson.version,
  SPECIALS_BASE_URL,
  CATEGORY_BASE_URL,
  ALL_CATEGORIES
};

// EOF //
