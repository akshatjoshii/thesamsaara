@echo off
cd /d "%~dp0"
move /y commit-msg.txt "%TEMP%\samsaara-commit-msg.txt" >nul
set "PATH=%PATH%;C:\Program Files\Git\cmd"
(
echo === status ===
git status --short
git add -A
git diff --cached --quiet || git commit -F "%TEMP%\samsaara-commit-msg.txt"
echo === pull ===
git pull --rebase origin main
echo === push ===
git push origin main
echo === result ===
git log -3 --format="%%h %%an %%s"
git status -sb
echo FINISHED
) > push-redesign.log 2>&1
del "%~f0"
