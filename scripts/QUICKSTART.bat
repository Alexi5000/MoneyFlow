@echo off
title MoneyFlow - Quick Start

REM Navigate to project root
cd /d "%~dp0"

echo ================================================
echo          MONEYFLOW - QUICK START
echo ================================================
echo.

REM Kill any existing processes
echo Cleaning up old processes...
taskkill /F /IM python.exe >nul 2>&1
taskkill /F /IM node.exe >nul 2>&1
ping -n 3 127.0.0.1 >nul

REM Start Backend
echo.
echo [1/2] Starting Backend (Port 8000)...
cd src\backend
start "MoneyFlow-Backend" cmd /k "uvicorn main:app --host 0.0.0.0 --port 8000 --reload"
cd ..\..
ping -n 5 127.0.0.1 >nul

REM Start Frontend
echo [2/2] Starting Frontend (Port 5173)...
start "MoneyFlow-Frontend" cmd /k "npm run dev"
ping -n 3 127.0.0.1 >nul

echo.
echo ================================================
echo          SERVERS RUNNING!
echo ================================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Opening browser in 3 seconds...
ping -n 4 127.0.0.1 >nul
start http://localhost:5173
echo.
echo Check the separate CMD windows for logs.
echo.

