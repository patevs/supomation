@ECHO OFF
REM Script to download project dependencies documentation

CLS
ECHO. && ECHO Downloading Documentation for Project Dependencies...

:: CALL curl https://raw.githubusercontent.com/user/repository/branch/filename

ECHO. && ECHO Axios:
CALL curl https://raw.githubusercontent.com/axios/axios/master/README.md -o docs\axios.md -#

ECHO. && ECHO Boxen:
CALL curl https://raw.githubusercontent.com/sindresorhus/boxen/master/readme.md -o docs\boxen.md -#

ECHO. && ECHO Chalk:
CALL curl https://raw.githubusercontent.com/chalk/chalk/master/readme.md -o docs\chalk.md -#

ECHO. && ECHO Cheerio:
CALL curl https://raw.githubusercontent.com/cheeriojs/cheerio/master/Readme.md -o docs\cheerio.md -#

ECHO. && ECHO Dotenv:
CALL curl https://raw.githubusercontent.com/motdotla/dotenv/master/README.md -o docs\dotenv.md -#

ECHO. && ECHO Inquirer.js:
CALL curl https://raw.githubusercontent.com/SBoudrias/Inquirer.js/master/README.md -o docs\inquirer.md -#

ECHO. && ECHO Log-Symbols:
CALL curl https://raw.githubusercontent.com/sindresorhus/log-symbols/master/readme.md -o docs\log-synbols.md -#

ECHO. && ECHO Signale:
CALL curl https://raw.githubusercontent.com/klaussinani/signale/master/readme.md -o docs\signale.md -#

ECHO. && ECHO Write-Json-File:
CALL curl https://raw.githubusercontent.com/sindresorhus/write-json-file/master/readme.md -o docs\write-json-file.md -#

ECHO. && ECHO Done!

GOTO :EOF
