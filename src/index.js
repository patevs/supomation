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

const api = require('./api');

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
  api.getVirtualMailer();
})();

// EOF //
