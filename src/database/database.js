/**
 *  `src/database/database.js`
 *
 *  * Supomation Database Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const helpers = require('./helpers');

/***************
 * * CONSTANTS *
 ***************/

const DATA_DIR = 'data/';

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  @function setupDataDir
 *  @description Ensures the data/date directory exists
 *  @param { string } date - todays date formatted as: yyyy-mm-dd
 *  @returns { void }
 */
const setupDataDir = date => {
  helpers.ensureDateDirExists(DATA_DIR, date);
};

// -------------------------------------------------------- //

/**
 *  @function saveProductData
 *  @description Save given product data to file
 *  @param { string } date - todays date formatted as: yyyy-mm-dd
 *  @param { string } fileName - name of the data file to save
 *  @param { object } productData - JSON object containing product data to save
 *  @returns { boolean }
 */
const saveProductData = (date, fileName, productData) => {
  // Construct file path
  const filePath = DATA_DIR + date + '/' + fileName + '.json';
  // Convert JSON data to string
  const data = JSON.stringify(productData, null, 4);
  // Write data to file
  return helpers.writeProductDataFile(filePath, data);
};

// -------------------------------------------------------- //

/**
 *  @function loadProductData
 *  @description Load given product data from disk
 *  @param { string } date
 *  @param { string } fileName
 *  @returns { void }
 */
// TODO: Allow for the selection of which data to load
const loadProductData = (date, fileName) => {
  // Path to data/date directory
  let dataDirPath = DATA_DIR + date;
  // Path to products data file
  const dataFilePath = dataDirPath + '/' + fileName + '.json';
  // Read product data file
  const dataFile = helpers.readProductDataFile(dataFilePath);
  // Parse product data to JSON
  const productData = JSON.parse(dataFile);
  // Display product data in table
  helpers.displayProductDataTable(productData);
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
  setupDataDir,
  saveProductData,
  loadProductData
};

// EOF //
