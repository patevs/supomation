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

const constants = require('./constants');
const data = require('./data');

const scraper = require('./scraper/scraper');

const logging = require('./utils/logging');
const utils = require('./utils/utilities');

const axios = require('axios');
const { Select } = require('enquirer');
const Multispinner = require('multispinner');
const Listr = require('listr');

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

// -------------------------------------------------------- //

/**
 * @function scrapAllCategories
 * @description Scrap product data from all categories
 * @param { string[] } allCategories - Array of all categories
 * @returns { void }
 */
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

// -------------------------------------------------------- //

const scrapSpecials = () => {
    const targetUrl = constants.SPECIALS_BASE_URL;
    axios
        .get(targetUrl)
        .then(function (response) {
            const productData = scraper.scrapProductsFromPage(response.data);
            return productData;
        });
};

// -------------------------------------------------------- //

const runTasks = () => {
    logging.logInfo("Running Tasks...");
    const tasks = new Listr([
        {
            title: 'Task 1',
            task: () => 'Foo'
        }
    ]);
    tasks.run();
};

// -------------------------------------------------------- //

/**
 * @function runSupomationScraper
 * @description Runs the Supomation WebScraper
 * @returns { void }
 */
const runSupomationScraper = () => {
    logging.logInfo('Starting Supomation WebScraper...\n');
    runTasks();
    // const specials = scrapSpecials();
    // data.saveProductData('specials', specials);
    // scrapAllCategories(constants.ALL_CATEGORIES);
};

// -------------------------------------------------------- //

/**
 * @function processMainMenuOption
 * @description Process user selected main menu option
 * @param { string } answer - user selected option
 * @returns { void }
 */
const processMainMenuOption = async answer => {
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
            utils.version(constants.PROJECT_VERSION);
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
// TODO: Move this into seperate module
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

(function () {
    logging.logWelcome(constants.PROJECT_VERSION); // Log Supomation main welcome
    mainMenu();
})();

// EOF //
