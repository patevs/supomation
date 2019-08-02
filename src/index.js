/**
 *  `src/index.js`
 *
 *  * Supomation
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const globals = require('./globals');
const data = require('./data');

// const scraper = require('./scraper/scraper');

const logging = require('./utils/logging');
const utils = require('./utils/utilities');

// const axios = require('axios');

const { Select } = require('enquirer');

// const Listr = require('listr');
// const { Observable } = require('rxjs');

/***************
 * * FUNCTIONS *
 ***************/

/*
const scrapSpecials = () => {
    const targetUrl = constants.SPECIALS_BASE_URL;
    axios.get(targetUrl).then(function (response) {
        const productData = scraper.scrapProductsFromPage(response.data);
        return productData;
    });
};
*/

// -------------------------------------------------------- //

/**
 * @function runSupomationScraper
 * @description Run the Supomation WebScraper
 * @returns { void }
 */
const runSupomationScraper = () => {
    logging.log(); // new line
    logging.logInfo('Starting Supomation WebScraper...\n');
    // const specials = scrapSpecials();
    // data.saveProductData('specials', specials);
    // scrapAllCategories(constants.ALL_CATEGORIES);
    logging.logSuccess('Supomation WebScraper Finished Successfully!');
};

// -------------------------------------------------------- //

/**
 * @function processMainMenuOption
 * @description Process user selected main menu option
 * @param { string } answer - user selected option
 * @returns { void }
 */
const processMainMenuOption = answer => {
    // Format answer
    answer = answer.split(' ')[0].toLowerCase();
    // Process all options
    switch (answer) {
        case 'run':
            runSupomationScraper();
            break;
        case 'view':
            data.readProductData();
            mainMenu();
            break;
        case 'display':
            utils.help();
            mainMenu();
            break;
        case 'print':
            utils.version(globals.PROJECT_VERSION);
            mainMenu();
            break;
        case 'quit':
            utils.quit();
            break;
        default:
            // Base case - if all else fails which should never happen
            logging.logError(
                'Main menu option: ' + answer + ' is not recognised'
            );
            mainMenu();
            break;
    }
};

// -------------------------------------------------------- //

/**
 * @function mainMenu
 * @description Display the supomation main menu prompt to the user
 * @returns { void }
 */
const mainMenu = () => {
    logging.logTitle('MAIN MENU');
    const mainMenuPrompt = new Select({
        name: 'option',
        message: 'Select an option:',
        choices: [
            'Run WebScraper',
            'View Scraped Products',
            'Display Help',
            'Print Version',
            'Quit'
        ]
    });
    mainMenuPrompt
        .run()
        .then(answer => processMainMenuOption(answer))
        .catch(console.error);
};

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(() => {
    logging.logWelcome(globals.PROJECT_VERSION); // Log Supomation main welcome
    mainMenu();
})();

// EOF //
