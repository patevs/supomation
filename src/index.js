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

const mainMenu = () => {
    const prompt = new Select({
        name: 'color',
        message: 'Pick a flavor',
        choices: ['apple', 'grape', 'watermelon', 'cherry', 'orange']
    });
    prompt.run()
        .then(answer => logging.log('Answer:', answer))
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
