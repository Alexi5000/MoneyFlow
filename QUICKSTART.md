# 🚀 MoneyFlow - Quick Start Guide

## One-Click Deployment

```bash
.\QUICKSTART.bat
```

That's it! The script will:
1. Clean up old processes
2. Start backend server (port 8000)
3. Start frontend server (port 5173)
4. Open your browser

## What You'll See

### After ~15 seconds:
- ✅ Two CMD windows open (Backend & Frontend)
- ✅ Browser opens to http://localhost:5173
- ✅ Beautiful cursor.com-inspired dashboard loads

### The Dashboard Shows:
- **User Profile**: Alex Thompson with $15,420.75
- **Budget Cards**: 3 active budgets with progress bars
- **Financial Stats**: Income, Expenses, Savings Rate
- **Hero Section**: Large headline like cursor.com
- **Navigation**: Clean navbar with Download button

## First Time Setup

If this is your first run, dependencies will auto-install:

**Backend** (Python packages):
```
Installing: fastapi, uvicorn, sqlalchemy, pydantic, etc.
Time: ~30 seconds
```

**Frontend** (Node packages):
```
Installing: react, vite, tailwind, framer-motion, etc.
Time: ~60 seconds
```

## Access Points

Once running:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## Verify Everything Works

Run the test script:
```powershell
powershell -ExecutionPolicy Bypass -File test_api.ps1
```

Expected output:
```
[1/4] Testing Health Endpoint...
  SUCCESS: Backend is healthy
[2/4] Testing User Endpoint...
  SUCCESS: User = Alex Thompson
  Balance: 15420.75
[3/4] Testing Budgets Endpoint...
  SUCCESS: Found 3 budgets
[4/4] Testing Transactions Endpoint...
  SUCCESS: Found 5 transactions

API Testing Complete!
```

## Troubleshooting

### "Styles not loading / Looks unstyled"
**Solution**: Hard refresh your browser
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### "Connection Error" on page
**Solution**: Clear browser cache
1. Press F12
2. Go to Console tab
3. Run: `localStorage.clear(); location.reload()`

### "Port already in use"
**Solution**: Run QUICKSTART.bat again (it auto-kills old processes)

### Backend won't start
**Solution**: Install email-validator
```bash
pip install email-validator
```

## Stop Servers

Simply close the CMD windows, or:
```powershell
Get-Process | Where-Object {$_.ProcessName -eq "python" -or $_.ProcessName -eq "node"} | Stop-Process -Force
```

## Next Steps

1. ✅ Start the app: `.\QUICKSTART.bat`
2. ✅ Wait 15 seconds for servers to start
3. ✅ Hard refresh browser if needed: `Ctrl + Shift + R`
4. ✅ Explore the beautiful cursor.com-inspired interface!

---

**That's it! You're ready to go!** 🎉

For more details, see [Full Documentation](./docs/README.md)

