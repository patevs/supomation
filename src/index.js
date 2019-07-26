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

/**
 * @function processMainMenuOption
 * @description Process user selected main menu option
 * @param { string } answer - user selected option
 * @returns { void }
 */
const processMainMenuOption = (answer) => {
    // Get user selected option
    // const option = answers.option;
    logging.log(answer);
    // Process option
    /*
    switch (answer) {
        case 'r':
            // await runWebScraper();
            // . promptMain();
            break;
        case 'g':
            logging.log('\n TO BE IMPLEMENTED: GET VIRTUAL MAILER...\n');
            // . getVirtualMailer();
            // promptMain();
            break;
        case 'd':
            // utils.help();
            // promptMain();
            break;
        case 'p':
            // utils.version();
            // promptMain();
            break;
        case 'q':
            // utils.quit();
            break;
        default:
            logging.logError(
                'Main menu option: ' + answer + ' is not recognised'
            );
        // promptMain();
    }
    */
}

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
