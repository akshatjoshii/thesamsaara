@echo off
setlocal
title Samsaara - push changes to GitHub
cd /d "%~dp0"
set "PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI"

echo === Saving your changes ===
git add -A
git diff --cached --quiet || git commit -m "Update from PC"

echo.
echo === Getting admin panel edits from GitHub ===
git pull --rebase origin main || (echo Pull failed. Send the error above to Claude. & goto :end)

echo.
echo === Uploading ===
git push origin main || (echo Push failed. Send the error above to Claude. & goto :end)
echo.
echo DONE - the live site updates in about a minute.

:end
echo.
pause
