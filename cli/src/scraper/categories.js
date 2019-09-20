/*************
 * * IMPORTS *
 *************/

// const axios = require('axios');
// const Multispinner = require('multispinner');

/***************
 * * FUNCTIONS *
 ***************/

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

// -------------------------------------------------------- //
