@echo off
title MoneyFlow Frontend Server
color 0B
echo.
echo ========================================
echo   MoneyFlow Frontend Server
echo ========================================
echo.
cd /d "%~dp0"
set PATH=%PATH%;C:\Program Files\nodejs
npm run dev
pause

