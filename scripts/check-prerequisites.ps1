# MoneyFlow Prerequisites Checker
# Verifies all required software is installed

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "  🔍 MoneyFlow Prerequisites Check" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version 2>&1
    Write-Host "  ✅ $pythonVersion" -ForegroundColor Green
    
    # Check Python version (need 3.8+)
    $versionMatch = [regex]::Match($pythonVersion, "(\d+)\.(\d+)")
    if ($versionMatch.Success) {
        $major = [int]$versionMatch.Groups[1].Value
        $minor = [int]$versionMatch.Groups[2].Value
        
        if ($major -lt 3 -or ($major -eq 3 -and $minor -lt 8)) {
            Write-Host "  ⚠️  Warning: Python 3.8+ recommended (you have $pythonVersion)" -ForegroundColor Yellow
        }
    }
    
    # Check pip
    if (Get-Command pip -ErrorAction SilentlyContinue) {
        $pipVersion = pip --version 2>&1
        Write-Host "  ✅ pip installed" -ForegroundColor Green
    } else {
        Write-Host "  ❌ pip not found" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  ❌ Python not found" -ForegroundColor Red
    Write-Host "     Install from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "     Minimum version: Python 3.8" -ForegroundColor Yellow
    $allGood = $false
}

Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "  ✅ Node.js $nodeVersion" -ForegroundColor Green
    
    # Check Node version (need 18+)
    $versionNumber = $nodeVersion -replace 'v', ''
    $major = [int]($versionNumber.Split('.')[0])
    
    if ($major -lt 18) {
        Write-Host "  ⚠️  Warning: Node.js 18+ recommended (you have $nodeVersion)" -ForegroundColor Yellow
    }
    
    # Check npm
    if (Get-Command npm -ErrorAction SilentlyContinue) {
        $npmVersion = npm --version
        Write-Host "  ✅ npm $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "  ❌ npm not found" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "  ❌ Node.js not found" -ForegroundColor Red
    Write-Host "     Install from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "     Minimum version: Node.js 18" -ForegroundColor Yellow
    $allGood = $false
}

Write-Host ""

# Check Git (optional)
Write-Host "Checking Git (optional)..." -ForegroundColor Yellow
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitVersion = git --version
    Write-Host "  ✅ $gitVersion" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Git not found (optional but recommended)" -ForegroundColor Yellow
    Write-Host "     Install from: https://git-scm.com/downloads" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

# Final status
if ($allGood) {
    Write-Host ""
    Write-Host "  ✅ ALL PREREQUISITES MET!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  You're ready to deploy MoneyFlow!" -ForegroundColor Green
    Write-Host "  Run: .\start-moneyflow.ps1" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "  ❌ MISSING PREREQUISITES" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Please install the missing software above and run this script again." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Pause if running directly
if ($MyInvocation.InvocationName -ne '&') {
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

exit $(if ($allGood) { 0 } else { 1 })

