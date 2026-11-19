@echo off
REM Installs packages (first run) and starts the local dev server at http://localhost:4321
cd /d "%~dp0"
title The Samsaara - dev server
echo.
echo === Installing packages (npm install) ===
powershell -NoProfile -ExecutionPolicy Bypass -Command "npm install 2>&1 | Tee-Object -FilePath install.log; exit $LASTEXITCODE"
if errorlevel 1 (
  echo.
  echo npm install FAILED - see install.log
  pause
  exit /b 1
)
echo.
echo === Starting dev server: http://localhost:4321 ===
echo Close this window to stop the server.
powershell -NoProfile -ExecutionPolicy Bypass -Command "npm run dev 2>&1 | Tee-Object -FilePath dev.log"
pause
