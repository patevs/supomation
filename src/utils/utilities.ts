#!/usr/bin/env node

/**
 *	`src/utils/utilities.ts`
 *
 *	* Supomation CLI Utility Helper Functions
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// JSON file writer
import writeJsonFile from 'write-json-file';

/***************
 * * FUNCTIONS *
 ***************/

/**
 *  * saveProductData
 * @param { string } fileName
 * @param { any } productData
 */
const saveProductData = async (fileName: string, productData: any) => {
    const d = new Date();
    const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    const filePath = 'data/' + date + '/' + fileName + '.json';
    // TODO: Wrap in try/catch
    await writeJsonFile(filePath, productData);
};

/*************
 * * EXPORTS *
 *************/

export { saveProductData };

// EOF //
