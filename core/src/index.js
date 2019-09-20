/**
 *  `src/index.js`
 *
 *  * Supomation Core
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

//

/***************
 * * FUNCTIONS *
 ***************/

//

/*
function createAxiosInstance() {
    // TODO: Allow selection of store id
    const instance = axios.create({
        baseURL: VIRTUAL_MAILER_URL,
        timeout: 1000,
        headers: { Cookie: "new-world-store-id=storenodeid=1260" }
    });
    instance.get(VIRTUAL_MAILER_URL).then(function(response) {
        const data = response.data;
        const $ = cheerio.load(data);
        let catelogScript = $("#__red-pepper-catalog")
            .next()
            .html();
        // Ensure catelogScript is not null
        if (catelogScript !== null) {
            catelogScript = catelogScript.trim();
            const len = catelogScript.length;
            let catelogId = catelogScript.substr(len - 4, 2);
            // . logging.log(catelogId);
        }
    });
}
*/

// --------------------------------------------------------------- //

async function getMailer() {
  try {
    const response = await axios.get(
      "https://app.redpepperdigital.net/app/redpepper/home/91"
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(() => {
  console.log('Starting Supomation...');
  getMailer();
})();

// EOF //
