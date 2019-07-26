#!/usr/bin/env node
/**
 *  `src/index.js`
 *
 *  * Supomation
 */


'use strict';

/*************
 * * IMPORTS *
 *************/

const logging = require('./utils/logging');
const utils = require('./utils/utilities');
const scraper = require('./utils/scraper');

const axios = require('axios');
const { Select } = require('enquirer');
const Multispinner = require('multispinner');

/***************
 * * CONSTANTS *
 ***************/

// TODO: Create constants module
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

/***************
 * * FUNCTIONS *
 ***************/

const scrapCategory = async (category, spinners) => {
    // logging.log('Scraping Category: ' + category);
    const targetUrl = CATEGORY_BASE_URL + category;
    try {
        const response = await axios.get(targetUrl);
        spinners.success(category);
        scraper.scrapProductsFromPage(response.data);
        return response.data;
    } catch (error) {
        spinners.error(category);
        logging.logError(error);
    }
};

const runSupomationScraper = () => {
    logging.logInfo('Starting Supomation WebScraper...');
    const spinners = new Multispinner(ALL_CATEGORIES, {
        preText: 'Category: '
    });
    // finish spinners in staggered timeouts
    scrapCategory(ALL_CATEGORIES[0], spinners);
    scrapCategory(ALL_CATEGORIES[1], spinners);
    scrapCategory(ALL_CATEGORIES[2], spinners);
    scrapCategory(ALL_CATEGORIES[3], spinners);
    scrapCategory(ALL_CATEGORIES[4], spinners);
    // setTimeout(() => spinners.success(ALL_CATEGORIES[0]), 1000);
    // setTimeout(() => spinners.error(ALL_CATEGORIES[1]), 1500);
    // setTimeout(() => spinners.success(ALL_CATEGORIES[2]), 2000);
    // setTimeout(() => spinners.error(ALL_CATEGORIES[3]), 2500);
    // setTimeout(() => spinners.success(ALL_CATEGORIES[4]), 2500);

    // do something on success/error events
    spinners.on('success', () => {
        // does not fire in this example because m.error is called
        logging.logSuccess('Finished running Supomation WebScraper!');
        // console.log('done without errors!');
    }).on('err', (e) => {
        logging.logError('Error running Supomation WebScraper: ' + e);
        // console.log(`${e} spinner finished with an error`);
    });
    // mainMenu();
};

// -------------------------------------------------------- //

/**
 * @function processMainMenuOption
 * @description Process user selected main menu option
 * @param { string } answer - user selected option
 * @returns { void }
 */
const processMainMenuOption = (answer) => {
    // Format answer
    answer = answer.split(' ')[0].toLowerCase();
    // Process all options
    switch (answer) {
        case 'run':
            runSupomationScraper();
            break;
        case 'display':
            utils.help();
            mainMenu();
            break;
        case 'print':
            utils.version();
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
            'Display Help',
            'Print Version',
            'Quit'
        ]
    });
    mainMenuPrompt.run()
        .then(answer => processMainMenuOption(answer))
        .catch(console.error);
};

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(function () {
    logging.logWelcome(); // Log Supomation main welcome
    mainMenu();
})();

// EOF //
