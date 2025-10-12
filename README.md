# MoneyFlow - AI-Powered Budget Tracker

> **A beautiful, cursor.com-inspired financial management application built with modern web technologies.**

Built to make you extraordinarily productive, MoneyFlow is the best way to manage your finances.

**Created by**: Alex Cinovoj & TechTide AI  
**Version**: 1.0.0  
**License**: MIT

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

**Using Make (Recommended):**
```bash
make install    # Install dependencies
make start      # Start both servers
```

**Or using scripts:**
```bash
.\scripts\QUICKSTART.bat
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
├── config/                  # TypeScript & ESLint configurations
│   ├── tsconfig.json       # TypeScript configuration
│   ├── eslint.config.js    # ESLint configuration
│   └── package.json        # Config dependencies
├── docs/                    # Documentation
│   ├── README.md           # Documentation index
│   ├── CURRENT_STATUS.md   # System status
│   ├── DEPLOYMENT_GUIDE.md # Deployment instructions
│   └── backend.md          # Backend API docs
├── scripts/                 # Deployment & utility scripts
│   ├── QUICKSTART.bat      # One-click start
│   ├── test_api.ps1        # API testing
│   └── review_app.ps1      # Full app review
├── node_modules/            # npm dependencies (auto-generated)
├── README.md                # This file
├── LICENSE                  # MIT License
├── Makefile                 # Build commands
├── .gitignore              # Git ignore rules
├── package.json            # Node dependencies
├── index.html              # Entry HTML file
├── vite.config.ts          # Vite config proxy → config/
├── tailwind.config.js      # Tailwind proxy → config/
└── postcss.config.js       # PostCSS proxy → config/
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
# Using Makefile (Recommended)
make help           # Show all commands
make install        # Install dependencies
make start          # Start both servers
make stop           # Stop all servers
make test           # Test all APIs
make dev            # Development mode
make build          # Build for production
make clean          # Clean build artifacts

# Or directly
npm run dev         # Frontend dev server
cd src/backend && uvicorn main:app --reload  # Backend dev
```

## 🧪 Testing

**Test Backend APIs:**
```bash
make test
# Or manually:
# powershell -ExecutionPolicy Bypass -File scripts/test_api.ps1
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

- **[Documentation Index](./docs/README.md)** - Complete documentation hub
- **[Final Status](./docs/FINAL_STATUS.md)** - Project status and verification
- **[Quick Reference](./docs/QUICK_REFERENCE.md)** - Quick commands and troubleshooting
- **[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Full deployment instructions
- **[Cursor.com Design](./docs/✅_CURSOR_DESIGN_COMPLETE.md)** - Design specifications
- **[Authors](./docs/AUTHORS.md)** - Creator information

## 👥 Credits

**Created and Developed by:**
- **Alex Cinovoj** - Lead Developer
- **TechTide AI** - Development Partner

### Technology Stack
- Frontend: React 18.3 + TypeScript 5.5 + Vite 5.4
- Backend: FastAPI 0.118 + Python 3.14 + SQLAlchemy 2.0
- Styling: Tailwind CSS 3.4 (Cursor.com-inspired)
- State: Zustand 4.4
- Animations: Framer Motion 10.16

### Design Inspiration
- Cursor.com - Modern, clean aesthetic
- Pure black (#000) backgrounds
- Orange (#FF5F00) accent colors
- System fonts and generous spacing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License

Copyright (c) 2025 Alex Cinovoj & TechTide AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

---

**✅ Full Stack Application | 🎨 Cursor.com Design | 🚀 Production Ready**

**Creators**: Alex Cinovoj & TechTide AI © 2025
