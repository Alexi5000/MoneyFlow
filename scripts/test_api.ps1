Write-Host "Testing MoneyFlow APIs..." -ForegroundColor Cyan
Write-Host ""

$BaseUrl = "http://localhost:8000"
$failures = 0

# Test Health
Write-Host "[1/4] Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$BaseUrl/health"
    if ($health.status -ne "healthy") { throw "unexpected status '$($health.status)'" }
    Write-Host "  SUCCESS: Backend is $($health.status)" -ForegroundColor Green
} catch {
    $failures++
    Write-Host "  FAILED: $_" -ForegroundColor Red
}

# Test Dashboard
Write-Host "[2/4] Testing Dashboard Endpoint..." -ForegroundColor Yellow
try {
    $dashboard = Invoke-RestMethod -Uri "$BaseUrl/api/v1/dashboard"
    if ($null -eq $dashboard.summary) { throw "response has no summary" }
    Write-Host "  SUCCESS: Net worth = $($dashboard.summary.net_worth)" -ForegroundColor Green
    Write-Host "  Transactions tracked: $($dashboard.summary.transactions_count)" -ForegroundColor Cyan
} catch {
    $failures++
    Write-Host "  FAILED: $_" -ForegroundColor Red
}

# Test Budgets (bare JSON list)
Write-Host "[3/4] Testing Budgets Endpoint..." -ForegroundColor Yellow
try {
    $budgets = @(Invoke-RestMethod -Uri "$BaseUrl/api/v1/budgets" | ForEach-Object { $_ })
    Write-Host "  SUCCESS: Found $($budgets.Count) budgets" -ForegroundColor Green
} catch {
    $failures++
    Write-Host "  FAILED: $_" -ForegroundColor Red
}

# Test Transactions (bare JSON list, newest first)
Write-Host "[4/4] Testing Transactions Endpoint..." -ForegroundColor Yellow
try {
    $transactions = @(Invoke-RestMethod -Uri "$BaseUrl/api/v1/transactions" | ForEach-Object { $_ })
    $recent = @($transactions | Select-Object -First 5)
    Write-Host "  SUCCESS: Found $($transactions.Count) transactions (showing $($recent.Count) most recent)" -ForegroundColor Green
    foreach ($item in $recent) {
        Write-Host "    $($item.date)  $($item.merchant)  $($item.amount)" -ForegroundColor Cyan
    }
} catch {
    $failures++
    Write-Host "  FAILED: $_" -ForegroundColor Red
}

Write-Host ""
if ($failures -gt 0) {
    Write-Host "API Testing Complete: $failures check(s) failed." -ForegroundColor Red
    exit 1
}
Write-Host "API Testing Complete!" -ForegroundColor Green
