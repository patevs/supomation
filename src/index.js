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

const utils = require('./utils/utilities');

/***************
 * * FUNCTIONS *
 ***************/

/*
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
                        const productData = scraper.scrapProductsFromPage(
                            response.data
                        );
                        observer.next('Saving Product Data');
                        data.saveProductData(
                            utils.getDate(),
                            'specials',
                            productData
                        );
                        observer.complete();
                        // return productData;
                    });
                });
            }
        }
    ]);
    await specialTasks.run();
};
*/

// -------------------------------------------------------- //

/**
 * @function runSupomationScraper
 * @description Run the Supomation WebScraper
 * @returns { void }
 */
/*
const runSupomationScraper = async () => {
    // Ensure data directory exists
    data.setupDataDir(utils.getDate());
    logging.log(); // new line
    logging.logInfo('Starting Supomation WebScraper...\n');
    await scrapSpecials();
    // scrapAllCategories(constants.ALL_CATEGORIES);
    logging.log(); // new line
    logging.logSuccess('Supomation WebScraper Finished Successfully!');
    scraperHasRun = true;
    mainMenu();
};
*/

// -------------------------------------------------------- //

/**
 * @function processMainMenuOption
 * @description Process user selected main menu option
 * @param { string } answer - user selected option
 * @returns { void }
 */
/*
const processMainMenuOption = answer => {
    // Format answer
    answer = answer.split(' ')[0].toLowerCase();
    // Process all options
    switch (answer) {
        case 'run':
            runSupomationScraper();
            break;
        case 'view':
            data.loadProductData(utils.getDate(), 'specials');
            // data.readProductData();
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
*/

// -------------------------------------------------------- //

/**
 *  @function getMainMenuChoices
 *  @description Returns array containing all main menu prompt options
 *  @returns { string[] } mainMenuChoices
 */
/*
const getMainMenuChoices = () => {
    let mainMenuChoices = [
        'Run WebScraper',
        'Display Help',
        'Print Version',
        'Quit'
    ];
    if (scraperHasRun) {
        mainMenuChoices.splice(1, 0, 'View Scraped Products');
    }
    return mainMenuChoices;
};
*/

// -------------------------------------------------------- //

/**
 * @function mainMenu
 * @description Display the supomation main menu prompt to the user
 * @returns { void }
 */
/*
const mainMenu = () => {
    logging.logTitle('MAIN MENU');
    const mainMenuPrompt = new Select({
        name: 'option',
        message: 'Select an option:',
        choices: getMainMenuChoices()
    });
    mainMenuPrompt
        .run()
        .then(answer => processMainMenuOption(answer))
        .catch(console.error);
};
*/

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(() => {
    utils.welcome(globals.PROJECT_VERSION);
})();

// EOF //
