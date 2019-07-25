/**********************
 * * PROMPT FUNCTIONS *
 **********************/

/**
 *	* processMainMenuOption
 * 	Process user selected main menu option
 * @param { prompt answers } answers
 * @returns { void }
 */
/*
async function processMainMenuOption(answers) {
    // Get user selected option
    const option = answers.option;
    // Process option
    switch (option) {
        case 'r':
            await runWebScraper();
            // . promptMain();
            break;
        case 'g':
            logging.log('\n TO BE IMPLEMENTED: GET VIRTUAL MAILER...\n');
            // . getVirtualMailer();
            promptMain();
            break;
        case 'd':
            utils.help();
            promptMain();
            break;
        case 'p':
            utils.version();
            promptMain();
            break;
        case 'q':
            utils.quit();
            break;
        default:
            logging.logError(
                'Main menu option: ' + option + ' is not recognised'
            );
            promptMain();
    }
}
*/

// ------------------------------------------ //

/**
 *	* promptMain
 * Display the main menu prompt
 * @returns { void }
 */
/*
function promptMain() {
    // Print menu title
    logging.logTitle('MAIN MENU');
    // Main menu prompt
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Select an option:',
                choices: [
                    'Run WebScraper',
                    'Get Virtual Mailer',
                    new inquirer.Separator(),
                    'Display Help',
                    'Print Version',
                    new inquirer.Separator(),
                    'Quit Supomation CLI'
                ],
                filter: function (val) {
                    return val.charAt(0).toLowerCase();
                }
            }
        ])
        .then(answers => {
            processMainMenuOption(answers);
        });
}
*/

// EOF //
