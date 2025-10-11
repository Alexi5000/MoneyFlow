# MoneyFlow Full-Stack Startup Script
# PowerShell script to start both backend and frontend concurrently

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  💰 MoneyFlow - Full-Stack Local Deployment" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Function to check prerequisites
function Test-Prerequisites {
    $allGood = $true
    
    # Check Python
    if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Python is not installed" -ForegroundColor Red
        $allGood = $false
    } else {
        $pythonVersion = python --version
        Write-Host "✓ $pythonVersion installed" -ForegroundColor Green
    }
    
    # Check Node.js
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Node.js is not installed" -ForegroundColor Red
        $allGood = $false
    } else {
        $nodeVersion = node --version
        Write-Host "✓ Node.js $nodeVersion installed" -ForegroundColor Green
    }
    
    return $allGood
}

# Check prerequisites
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Cyan
if (-not (Test-Prerequisites)) {
    Write-Host ""
    Write-Host "❌ Missing prerequisites. Please install required software." -ForegroundColor Red
    Write-Host "   - Python 3.8+: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "   - Node.js 18+: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🚀 Starting MoneyFlow services..." -ForegroundColor Cyan
Write-Host ""

# Start backend in a new window
Write-Host "📡 Starting Backend API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\start-backend.ps1"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in a new window
Write-Host "🎨 Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\start-frontend.ps1"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "  ✅ MoneyFlow is starting!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend:      http://localhost:5173" -ForegroundColor Cyan
Write-Host "📡 Backend API:   http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 API Docs:      http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "🏥 Health Check:  http://localhost:8000/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tip: Both servers will open in new windows." -ForegroundColor Yellow
Write-Host "    Close those windows to stop the servers." -ForegroundColor Yellow
Write-Host ""
Write-Host "⏳ Waiting for servers to fully start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Open browser
Write-Host ""
Write-Host "🌐 Opening MoneyFlow in your default browser..." -ForegroundColor Cyan
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "✅ Deployment complete! Enjoy using MoneyFlow! 💰" -ForegroundColor Green
Write-Host ""

