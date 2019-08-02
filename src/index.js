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

const data = require('./database/database');

const scraper = require('./scraper/scraper');

const logging = require('./utils/logging');
const utils = require('./utils/utilities');

const axios = require('axios');

const { Select } = require('enquirer');

const Listr = require('listr');
const { Observable } = require('rxjs');

/***************
 * * FUNCTIONS *
 ***************/

// TODO: Move this to seperate module
const scrapSpecials = async () => {
    const targetUrl = globals.SPECIALS_BASE_URL;
    const specialTasks = new Listr([
        {
            title: 'Scraping Category: ' + logging.green('Specials'),
            task: () => {
                return new Observable(observer => {
                    observer.next('Scraping Product Data');
                    axios.get(targetUrl).then(response => {
                        // const productData =
                        scraper.scrapProductsFromPage(response.data);
                        observer.next('Saving Product Data');
                        // data.saveProductData('specials', productData);
                        observer.complete();
                        // return productData;
                    });
                });
            }
        }
    ]);
    await specialTasks.run();
};

// -------------------------------------------------------- //

/**
 * @function runSupomationScraper
 * @description Run the Supomation WebScraper
 * @returns { void }
 */
const runSupomationScraper = async () => {
    // TODO: Ensure data directory exists
    data.setupDataDir(globals.DATA_DIR, utils.getDate);
    logging.log(); // new line
    logging.logInfo('Starting Supomation WebScraper...\n');
    await scrapSpecials();
    // scrapAllCategories(constants.ALL_CATEGORIES);
    logging.log(); // new line
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
        //        case 'view':
        //            data.readProductData();
        //            mainMenu();
        //            break;
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
            //            'View Scraped Products',
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
    logging.logWelcome(globals.PROJECT_VERSION, utils.getDateFull()); // Log Supomation main welcome
    mainMenu();
})();

// EOF //
