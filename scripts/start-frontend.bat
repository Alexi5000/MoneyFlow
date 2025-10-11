@echo off
echo ========================================
echo   MoneyFlow Frontend Server
echo ========================================
echo.
cd /d "%~dp0"
call npm run dev
pause

