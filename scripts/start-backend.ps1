# MoneyFlow Backend Startup Script
# PowerShell script to start the FastAPI backend server

Write-Host "🚀 Starting MoneyFlow Backend..." -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.8+ from https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}

# Display Python version
$pythonVersion = python --version
Write-Host "✓ $pythonVersion" -ForegroundColor Green

# Navigate to backend directory
$backendPath = Join-Path $PSScriptRoot "src\backend"
if (-not (Test-Path $backendPath)) {
    Write-Host "❌ Backend directory not found at: $backendPath" -ForegroundColor Red
    exit 1
}

Set-Location $backendPath

# Check if requirements are installed
Write-Host ""
Write-Host "📦 Checking Python dependencies..." -ForegroundColor Cyan

$pipList = pip list 2>&1
if ($pipList -notmatch "fastapi") {
    Write-Host "⚠️  FastAPI not found. Installing dependencies..." -ForegroundColor Yellow
    Write-Host ""
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

# Start the backend server
Write-Host ""
Write-Host "🔥 Starting FastAPI server..." -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""
Write-Host "📍 Backend API: http://localhost:8000" -ForegroundColor Green
Write-Host "📚 API Docs: http://localhost:8000/docs" -ForegroundColor Green
Write-Host "🏥 Health Check: http://localhost:8000/health" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Run the backend
python main.py

