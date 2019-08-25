@ECHO OFF
REM Script to resize an image to multiple sizes and generate a favicon.
REM Requires ImageMagick to be installed.

CLS
ECHO. & ECHO [100;4mImage Resize and Favicon Generation Script[0m

REM Verify ImageMagick is installed & can be found

ECHO. & ECHO [92m Verifying ImageMagick Installation... [0m

ECHO. & ECHO  [45m ImageMagick Installation: [0m & ECHO.

WHERE magick
IF %ERRORLEVEL% NEQ 0 ECHO. & ECHO [91m ImageMagick installation could not be found... exiting! [0m & GOTO :EOF

REM Begin resizing

ECHO. & ECHO [92m All Requirements Satisfied! Resizing Images... [0m & ECHO.

REM 256x256
REM :: CALL magick mogrify -resize 256x256 -write icon-256.png icon-512.png

REM 192x192
ECHO [92m 192x192: [0m & ECHO.
CALL magick mogrify -monitor -resize 192x192 -write icon-192.png icon-512.png

REM 128x128
ECHO. & ECHO [92m 128x128: [0m & ECHO.
CALL magick mogrify -monitor -resize 128x128 -write icon-128.png icon-512.png

REM 32x32
ECHO. & ECHO [92m 32x32: [0m & ECHO.
CALL magick mogrify -monitor -resize 32x32 -write icon-32.png icon-512.png

REM 16x16
ECHO. & ECHO [92m 16x16: [0m & ECHO.
CALL magick mogrify -monitor -resize 16x16 -write icon-16.png icon-512.png

ECHO. & ECHO [42m Finished Resizing Images! [0m & ECHO.

REM Generate a favicon

ECHO [92m Generating a favicon... [0m & ECHO.

CALL magick convert -monitor icon-16.png icon-32.png icon-128.png favicon.ico

ECHO. & ECHO  [42m Done! [0m & ECHO.

GOTO :EOF
