@echo off
title MoneyFlow Backend Server
color 0A
echo.
echo ========================================
echo   MoneyFlow Backend Server
echo ========================================
echo.
cd /d "%~dp0src\backend"
"C:\Users\Alex\AppData\Local\Programs\Python\Python313\python.exe" main.py
pause

