@echo off
title MoneyFlow - Deployment Launcher
color 0E
cls
echo.
echo ============================================================
echo            MoneyFlow - Local Deployment Launcher
echo ============================================================
echo.
echo This will start both Backend and Frontend servers...
echo.
echo Backend will run on: http://localhost:8000
echo Frontend will run on: http://localhost:5173
echo.
echo Two new windows will open - DO NOT CLOSE THEM!
echo.
pause
echo.
echo Starting Backend Server...
start "MoneyFlow Backend" /D "%~dp0src\backend" "C:\Users\Alex\AppData\Local\Programs\Python\Python313\python.exe" main.py

echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
set PATH=%PATH%;C:\Program Files\nodejs
start "MoneyFlow Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ============================================================
echo   Both servers are starting!
echo ============================================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Waiting 8 seconds before opening browser...
timeout /t 8 /nobreak >nul

echo Opening MoneyFlow in browser...
start http://localhost:5173

echo.
echo ============================================================
echo   MoneyFlow is now running!
echo ============================================================
echo.
echo - Two server windows are open (Backend and Frontend)
echo - Your browser should show MoneyFlow at http://localhost:5173
echo - Keep both server windows open while using the app
echo - Press any key to close this launcher window
echo.
pause >nul

