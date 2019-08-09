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

//

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(() => {
    utils.welcome(globals.PROJECT_VERSION);
})();

// EOF //
