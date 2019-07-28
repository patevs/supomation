@ECHO OFF
REM Script to download project dependencies documentation

CLS
ECHO. && ECHO [4mRunning script to download Supomation project dependency documentation[0m

:: To download a file from GitHub:
:: CALL curl https://raw.githubusercontent.com/user/repository/branch/filename

IF EXIST ..\docs (
    ECHO. && ECHO [96m Deleting old docs directory... [0m
    RMDIR /S /Q ..\docs
    ECHO [92m  Done! [0m
)

ECHO. && ECHO [96m Creating docs directory... [0m
CALL mkdir ..\docs
ECHO [92m  Done! [0m

ECHO. && ECHO [92mDownloading Documentation for Project Dependencies... [0m

REM :: Move into docs directory
CALL cd ..\docs

ECHO. && ECHO [96mAxios: [0m
CALL curl https://raw.githubusercontent.com/axios/axios/master/README.md -o axios.md -#

ECHO. && ECHO [96mBoxen: [0m
CALL curl https://raw.githubusercontent.com/sindresorhus/boxen/master/readme.md -o boxen.md -#

ECHO. && ECHO [96mChalk: [0m
CALL curl https://raw.githubusercontent.com/chalk/chalk/master/readme.md -o chalk.md -#

ECHO. && ECHO [96mCheerio: [0m
CALL curl https://raw.githubusercontent.com/cheeriojs/cheerio/master/Readme.md -o cheerio.md -#

ECHO. && ECHO [96mClear: [0m
CALL curl https://raw.githubusercontent.com/bahamas10/node-clear/master/README.md -o clear.md -#

ECHO. && ECHO [96mEnquirer: [0m
CALL curl https://raw.githubusercontent.com/enquirer/enquirer/master/README.md -o enquirer.md -#

REM :: ECHO. && ECHO [96mDotenv: [0m
REM :: CALL curl https://raw.githubusercontent.com/motdotla/dotenv/master/README.md -o dotenv.md -#

REM :: ECHO. && ECHO [96mInquirer.js: [0m
REM :: CALL curl https://raw.githubusercontent.com/SBoudrias/Inquirer.js/master/README.md -o inquirer.md -#

ECHO. && ECHO [96mLog-Symbols: [0m
CALL curl https://raw.githubusercontent.com/sindresorhus/log-symbols/master/readme.md -o log-synbols.md -#

ECHO. && ECHO [96mMultispinner: [0m
CALL curl https://raw.githubusercontent.com/codekirei/node-multispinner/master/readme.md -o multispinner.md -#

REM :: ECHO. && ECHO [96mSignale: [0m
REM :: CALL curl https://raw.githubusercontent.com/klaussinani/signale/master/readme.md -o signale.md -#

REM :: ECHO. && ECHO [96mWrite-Json-File: [0m
REM :: CALL curl https://raw.githubusercontent.com/sindresorhus/write-json-file/master/readme.md -o write-json-file.md -#

ECHO. && ECHO [92mDone! [0m

GOTO :EOF
