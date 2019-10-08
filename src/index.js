/**
 *  `src/index.js`
 *
 *  * Supomation Core
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

const globals = require('./globals');

// const api = require('./api');

const cli = require('./cli');

/***************
 * * FUNCTIONS *
 ***************/

//

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(() => {
  console.log('Starting ' + globals.PROJECT_NAME + '...');
  console.log('Version: ' + globals.PROJECT_VERSION);
  // api.getVirtualMailer();
  cli.mainMenu();
})();

// EOF //
