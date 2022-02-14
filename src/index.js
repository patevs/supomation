/**
 *  `src/index.js`
 *
 *  * Supomation Core
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// import PROJECT_NAME from './globals.js';
// import PROJECT_VERSION from './globals.js';

import { PROJECT_NAME, PROJECT_VERSION } from './globals.js'

// const api = require('./api');
// import { api } from './api.js';

import mainMenu from './cli.js';

/***************
 * * FUNCTIONS *
 ***************/

//

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(() => {
  console.log('Starting ' + PROJECT_NAME + '...');
  console.log('Version: ' + PROJECT_VERSION);
  // api.getVirtualMailer();
  mainMenu();
})();

// EOF //
