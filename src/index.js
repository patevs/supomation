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

const { Select } = require('enquirer');

/***************
 * * CONSTANTS *
 ***************/

/* // TODO: Create constants module
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
*/

/***************
 * * FUNCTIONS *
 ***************/

const runSupomationScraper = async () => {
    await setTimeout(() => {
        logging.log('TODO: RUN WEBSCRAPER...');
    }, 2000);
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
