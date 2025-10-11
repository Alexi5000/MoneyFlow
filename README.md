# MoneyFlow - AI-Powered Budget Tracker

> **A beautiful, cursor.com-inspired financial management application built with modern web technologies.**

Built to make you extraordinarily productive, MoneyFlow is the best way to manage your finances.

## ✨ Features

- 💰 **Smart Budgeting** - Track budgets with beautiful visualizations and real-time updates
- 📊 **Transaction Management** - Automatic categorization and intelligent insights
- 🎨 **Cursor.com Design** - Sleek black theme with orange accents, exactly like cursor.com
- 📈 **Analytics Dashboard** - Comprehensive financial analytics and trends
- ⚡ **Lightning Fast** - Built with Vite for instant hot module replacement
- 🎯 **AI-Powered** - Intelligent recommendations and spending analysis

## 🚀 Tech Stack

### Frontend
- **React** 18.3.1 with TypeScript 5.5.3
- **Vite** 5.4.2 - Lightning-fast build tool
- **Tailwind CSS** 3.4.10 - Utility-first styling
- **Framer Motion** 10.16.16 - Smooth animations
- **Zustand** 4.4.7 - State management
- **React Router DOM** 6.26.2 - Client-side routing
- **Lucide React** - Beautiful icons
- **Three.js** - 3D visualizations

### Backend
- **FastAPI** 0.118.3 - Modern Python web framework
- **Python** 3.14 - Latest Python
- **SQLAlchemy** 2.0.44 - SQL toolkit and ORM
- **Pydantic** 2.12 - Data validation
- **Uvicorn** - ASGI server
- **SQLite** - Embedded database

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** → [Download](https://www.python.org/downloads/)
- **Node.js 18+** → [Download](https://nodejs.org/)

### One-Click Deployment

**Windows (Recommended):**
```bash
.\QUICKSTART.bat
```

This will:
1. Install all dependencies
2. Start backend on port 8000
3. Start frontend on port 5173
4. Open browser automatically

### Manual Start

**Backend:**
```bash
cd src/backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend (New Terminal):**
```bash
npm install
npm run dev
```

### 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 📁 Project Structure

```
MoneyFlow/
├── src/
│   ├── backend/              # FastAPI Backend
│   │   ├── app/
│   │   │   ├── api/         # API endpoints
│   │   │   ├── core/        # Config & database
│   │   │   ├── models/      # SQLAlchemy models
│   │   │   ├── schemas/     # Pydantic schemas
│   │   │   └── middleware/  # Custom middleware
│   │   ├── main.py          # FastAPI application
│   │   └── requirements.txt # Python dependencies
│   └── frontend/            # React Frontend
│       ├── components/      # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── store/          # Zustand stores
│       ├── types/          # TypeScript types
│       └── utils/          # Utility functions
├── config/                 # Build configurations
│   ├── vite.config.ts     # Vite configuration
│   ├── tailwind.config.ts # Tailwind configuration
│   └── postcss.config.js  # PostCSS configuration
├── tailwind.config.js     # Root Tailwind config
├── postcss.config.js      # Root PostCSS config
├── vite.config.ts         # Root Vite config
└── QUICKSTART.bat         # One-click deployment
```

## 🎨 Design Philosophy

MoneyFlow's design is inspired by **cursor.com**:

- **Pure Black** (`#000000`) - Clean, professional background
- **Subtle Grays** (`#0a0a0a`, `#222`) - Depth without distraction
- **Orange Accent** (`#FF5F00`) - Purposeful call-to-actions
- **System Fonts** - Native, fast-loading typography
- **Generous Spacing** - Breathing room for clarity
- **Rounded Buttons** - Modern, friendly interactions

## 🛠️ Development

```bash
# Frontend Development
npm run dev          # Start dev server (HMR enabled)
npm run build        # Production build
npm run lint         # Lint code
npm run preview      # Preview production build

# Backend Development
cd src/backend
uvicorn main:app --reload  # Start with auto-reload
pytest                      # Run tests
```

## 🧪 Testing

**Test Backend APIs:**
```powershell
powershell -ExecutionPolicy Bypass -File test_api.ps1
```

Expected output:
```
✓ Health Endpoint: Backend is healthy
✓ User API: Alex Thompson ($15,420.75)
✓ Budgets API: 3 budgets found
✓ Transactions API: Transactions loaded
```

## 📦 Sample Data

MoneyFlow includes pre-loaded sample data:
- **User**: Alex Thompson with $15,420.75 balance
- **Budgets**: 3 active budgets (Food, Transportation, Entertainment)
- **Transactions**: 30 days of sample transactions
- **Categories**: 7 predefined categories

## 🌐 API Documentation

Interactive API docs available at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📚 Documentation

- **[Deployment Complete](./DEPLOYMENT_SUCCESS.md)** - Deployment summary
- **[Design Match](./✅_CURSOR_DESIGN_COMPLETE.md)** - Cursor.com design details
- **[Final Status](./🎉_DEPLOYMENT_AND_DESIGN_COMPLETE.md)** - Complete status

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

---

**✅ Full Stack Deployed & Running | 🎨 Cursor.com Design Complete | 🚀 Ready for Development**
