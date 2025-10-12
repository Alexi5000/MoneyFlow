# MoneyFlow - Complete Deployment Guide

**Created by**: Alex Cinovoj & TechTide AI  
**Version**: 1.0.0  
**Copyright**: © 2025

## 🎯 Quick Deployment (Recommended)

### Windows One-Click Start

```bash
.\QUICKSTART.bat
```

This automated script will:
1. ✅ Stop any existing servers
2. ✅ Start backend on port 8000
3. ✅ Start frontend on port 5173
4. ✅ Open browser automatically
5. ✅ Display server URLs

### Expected Output

```
================================================
         MONEYFLOW - QUICK START
================================================

Cleaning up old processes...
[1/2] Starting Backend (Port 8000)...
[2/2] Starting Frontend (Port 5173)...

================================================
         SERVERS RUNNING!
================================================

Frontend: http://localhost:5173
Backend:  http://localhost:8000
API Docs: http://localhost:8000/docs
```

## 📋 Manual Deployment

### Step 1: Install Dependencies

**Backend:**
```bash
cd src/backend
pip install -r requirements.txt
```

**Frontend:**
```bash
npm install
```

### Step 2: Start Backend

```bash
cd src/backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Expected output:
```
[START] MoneyFlow Backend API v1.0.0
[ENV] Environment: development
[URL] API URL: http://localhost:8000
[SUCCESS] Database tables created successfully
INFO: Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Start Frontend

**In a new terminal:**
```bash
npm run dev
```

Expected output:
```
VITE v5.4.19  ready in 500 ms
➜  Local:   http://localhost:5173/
```

### Step 4: Verify Deployment

**Test Backend:**
```powershell
powershell -ExecutionPolicy Bypass -File test_api.ps1
```

Should show:
```
✓ Health Endpoint: Backend is healthy
✓ User API: Working
✓ Budgets API: Working
✓ Transactions API: Working
```

**Test Frontend:**
Open http://localhost:5173 in your browser.

## 🔧 Configuration

### Backend Configuration

File: `src/backend/app/core/config.py`

```python
HOST: str = "localhost"
PORT: int = 8000
DATABASE_URL: str = "sqlite:///./moneyflow.db"
BACKEND_CORS_ORIGINS: List = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]
```

### Frontend Configuration

File: `vite.config.ts`

```typescript
server: {
  port: 5173,
  host: 'localhost',
  hmr: true,
}
```

### Tailwind Configuration

Files: `tailwind.config.js`, `postcss.config.js`

```javascript
// Cursor.com color scheme
colors: {
  primary: '#000000',     // Pure black
  accent: '#FF5F00',      // Cursor orange
  border: '#222222',      // Subtle borders
}
```

## 🗄️ Database Setup

### Automatic Initialization

The database auto-initializes on first run with:
- ✅ Tables created (users, transactions, budgets, categories)
- ✅ Sample user (Alex Thompson, $15,420.75)
- ✅ 3 sample budgets
- ✅ 30 days of transactions
- ✅ 7 predefined categories

### Manual Initialization

```bash
cd src/backend
python -c "from app.core.database import init_db; init_db()"
```

## 🧪 Testing

### Backend API Tests

```powershell
# Test all endpoints
powershell -ExecutionPolicy Bypass -File test_api.ps1

# Test specific endpoints
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/users/me
curl http://localhost:8000/api/v1/budgets/
```

### Frontend Testing

1. Open http://localhost:5173
2. Check browser console (F12) for errors
3. Verify data loads:
   - User profile displayed
   - Budgets showing
   - Transactions loaded

## 🐛 Troubleshooting

### Backend Won't Start

**Error: "ModuleNotFoundError: No module named 'email_validator'"**
```bash
pip install email-validator
```

**Error: "Port 8000 already in use"**
```bash
# Windows
Get-Process | Where-Object {$_.Name -eq "python"} | Stop-Process -Force

# Or change port in config.py
```

### Frontend Won't Start

**Error: "Port 5173 already in use"**
```bash
# Windows
Get-Process | Where-Object {$_.Name -eq "node"} | Stop-Process -Force

# Or change port in vite.config.ts
```

**Styles Not Loading**
```bash
1. Hard refresh: Ctrl + Shift + R
2. Clear browser cache (F12 → Application → Clear site data)
3. Restart Vite: npm run dev
```

### Connection Error in Browser

1. **Check backend is running:**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Clear localStorage:**
   - Press F12 (DevTools)
   - Go to Console
   - Run: `localStorage.clear(); location.reload()`

3. **Restart both servers:**
   ```bash
   .\QUICKSTART.bat
   ```

## 🔒 Security Notes

### Development Mode
- CORS enabled for localhost
- No authentication required
- Sample data pre-loaded
- All endpoints open

### Production Deployment
- Add JWT authentication
- Configure proper CORS origins
- Use PostgreSQL instead of SQLite
- Set up environment variables
- Enable HTTPS

## 📊 API Endpoints

### Users
- `GET /api/v1/users/me` - Get current user
- `PUT /api/v1/users/me` - Update user profile

### Transactions
- `GET /api/v1/transactions/` - Get all transactions (paginated)
- `GET /api/v1/transactions/recent?limit=10` - Get recent transactions
- `POST /api/v1/transactions/` - Create transaction
- `PUT /api/v1/transactions/{id}` - Update transaction
- `DELETE /api/v1/transactions/{id}` - Delete transaction

### Budgets
- `GET /api/v1/budgets/` - Get all budgets
- `POST /api/v1/budgets/` - Create budget
- `PUT /api/v1/budgets/{id}` - Update budget
- `DELETE /api/v1/budgets/{id}` - Delete budget

### Categories
- `GET /api/v1/categories/` - Get all categories
- `GET /api/v1/categories/user` - Get user categories

### AI
- `GET /api/v1/ai/predictions` - Get AI predictions
- `GET /api/v1/ai/insights` - Get financial insights

## 🎨 Design System

### Colors (Cursor.com Inspired)
```css
Background:  #000000  /* Pure black */
Cards:       #0a0a0a  /* Very dark gray */
Borders:     #222222  /* Subtle borders */
Accent:      #FF5F00  /* Cursor orange */
Text:        #ffffff, #d4d4d4, #a3a3a3
```

### Typography
```css
Hero:        72px, font-normal, line-height 1.1
Sections:    40-48px, font-normal
Body:        15px, font-normal
Small:       13-14px
Font Family: System fonts (SF Pro, Segoe UI, Roboto)
```

### Components
- **Buttons**: rounded-full, px-8 py-3
- **Cards**: bg-[#0a0a0a], border-[#222], p-8
- **Nav**: h-16, gap-8, text-[15px]

## 🚀 Performance

- **Vite HMR**: Instant updates during development
- **Code Splitting**: Optimized bundle sizes
- **Lazy Loading**: Routes loaded on demand
- **SQLite**: Fast local database
- **Tailwind JIT**: Only used styles compiled

## 📖 Additional Documentation

- **[Design Match Guide](./✅_CURSOR_DESIGN_COMPLETE.md)** - Cursor.com design details
- **[API Testing](./test_api.ps1)** - Backend API test script
- **[Deployment Status](./DEPLOYMENT_SUCCESS.md)** - Current deployment info

---

**Status**: 🟢 Fully Operational | **Design**: 🎨 Cursor.com Match | **Version**: 1.0.0

