@ECHO OFF
REM Script to download project dependencies documentation

REM :: https://raw.githubusercontent.com/user/repository/branch/filename

CLS
ECHO. && ECHO Downloading documentation for project dependencies... && ECHO.

REM :: CALL cd ../
REM :: CALL npm list --depth=0

:: CALL curl https://raw.githubusercontent.com/user/repository/branch/filename

CALL curl https://raw.githubusercontent.com/axios/axios/blob/master/README.md

GOTO :EOF
