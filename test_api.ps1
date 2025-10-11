Write-Host "Testing MoneyFlow APIs..." -ForegroundColor Cyan
Write-Host ""

# Test Health
Write-Host "[1/4] Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8000/health"
    Write-Host "  SUCCESS: Backend is $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "  FAILED: $_" -ForegroundColor Red
}

# Test User
Write-Host "[2/4] Testing User Endpoint..." -ForegroundColor Yellow
try {
    $user = Invoke-RestMethod -Uri "http://localhost:8000/api/v1/users/me"
    Write-Host "  SUCCESS: User = $($user.data.name)" -ForegroundColor Green
    Write-Host "  Balance: $($user.data.total_balance)" -ForegroundColor Cyan
} catch {
    Write-Host "  FAILED: $_" -ForegroundColor Red
}

# Test Budgets
Write-Host "[3/4] Testing Budgets Endpoint..." -ForegroundColor Yellow
try {
    $budgets = Invoke-RestMethod -Uri "http://localhost:8000/api/v1/budgets/"
    Write-Host "  SUCCESS: Found $($budgets.data.budgets.Count) budgets" -ForegroundColor Green
} catch {
    Write-Host "  FAILED: $_" -ForegroundColor Red
}

# Test Transactions
Write-Host "[4/4] Testing Transactions Endpoint..." -ForegroundColor Yellow
try {
    $transactions = Invoke-RestMethod -Uri "http://localhost:8000/api/v1/transactions/recent?limit=5"
    Write-Host "  SUCCESS: Found $($transactions.data.Count) transactions" -ForegroundColor Green
} catch {
    Write-Host "  FAILED: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "API Testing Complete!" -ForegroundColor Green

