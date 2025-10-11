@echo off
cls
echo.
echo ============================================================
echo            MoneyFlow - Starting Servers
echo ============================================================
echo.
echo Starting Backend Server...
start "MoneyFlow Backend" cmd /k "cd /d %~dp0src\backend && title MoneyFlow Backend && color 0A && C:\Users\Alex\AppData\Local\Programs\Python\Python313\python.exe main.py"

echo.
echo Waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "MoneyFlow Frontend" cmd /k "cd /d %~dp0 && title MoneyFlow Frontend && color 0B && set PATH=%PATH%;C:\Program Files\nodejs && npm run dev"

echo.
echo ============================================================
echo   Both servers are starting!
echo ============================================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Waiting 15 seconds for servers to initialize...
timeout /t 15 /nobreak >nul

echo.
echo Opening browser...
start http://localhost:5173

echo.
echo ============================================================
echo   MoneyFlow is ready!
echo ============================================================
echo.
echo Keep both server windows open!
echo Press any key to exit this window...
pause >nul

