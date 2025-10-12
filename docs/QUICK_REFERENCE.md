# MoneyFlow - Quick Reference

**Created by**: Alex Cinovoj & TechTide AI  
**Version**: 1.0.0

---

## 🚀 Start Application

```bash
.\scripts\QUICKSTART.bat
```

Wait 15 seconds, then open: http://localhost:5173

---

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health**: http://localhost:8000/health

---

## 📄 Essential Pages

1. **Home** - http://localhost:5173/
2. **Budgets** - http://localhost:5173/budgets
3. **Transactions** - http://localhost:5173/transactions
4. **Analytics** - http://localhost:5173/analytics
5. **Resources** - http://localhost:5173/settings

---

## 🧪 Testing

```powershell
powershell -ExecutionPolicy Bypass -File scripts/review_app.ps1
```

---

## 🛑 Stop Servers

```powershell
Get-Process python,node | Stop-Process -Force
```

---

## 🔄 Troubleshooting

### "Styles not loading"
```
1. Hard refresh: Ctrl + Shift + R
2. Clear cache: F12 → Application → Clear site data
3. Restart: .\scripts\QUICKSTART.bat
```

### "Connection error"
```
1. Check backend: curl http://localhost:8000/health
2. Clear localStorage: F12 → Console → localStorage.clear()
3. Restart servers
```

---

**© 2025 Alex Cinovoj & TechTide AI**

