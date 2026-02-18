<div align="center">

<img src="assets/icon.png" alt="MoneyFlow Logo" width="120" />

# MoneyFlow

### AI-Powered Budget Tracker

**Stop guessing where your money goes. MoneyFlow tracks every dollar, categorizes spending with AI, and gives you the insights you need to build wealth.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.118-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)

[Features](#features) · [Quick Start](#-quick-start) · [Tech Stack](#tech-stack) · [Architecture](#-project-structure) · [Docs](#-documentation)

---

<img src="assets/cover.png" alt="MoneyFlow - AI Budget Tracker" width="100%" />

</div>

---

## The Problem

Most budgeting apps are either too simple (just a spreadsheet) or too complex (requires a finance degree). You download one, manually categorize 200 transactions, get overwhelmed by the interface, and go back to checking your bank app and hoping for the best. Meanwhile, subscriptions you forgot about keep draining your account.

## The Solution

MoneyFlow is an **AI-powered budget tracker** with a cursor.com-inspired dark interface that makes managing money feel like using a premium dev tool. Automatic transaction categorization, intelligent spending insights, beautiful 3D visualizations, and a dashboard that actually makes you want to check your finances. Full-stack React + FastAPI with real-time analytics.

> *Open MoneyFlow. See your spending breakdown in 3 seconds. Notice you spent $340 on food delivery last month. Set a budget. AI alerts you when you're trending over. Save $200/month without thinking about it.*

---

## Features

- **AI Categorization** — Transactions automatically sorted into smart categories
- **Smart Budgeting** — Set budgets with real-time progress tracking and alerts
- **Analytics Dashboard** — Comprehensive spending trends, patterns, and insights
- **3D Visualizations** — Three.js-powered financial data visualization
- **Transaction Management** — Full CRUD with search, filter, and bulk operations
- **Cursor.com Design** — Sleek black theme with orange accents, buttery smooth animations
- **Lightning Fast** — Vite HMR + FastAPI async for instant responsiveness
- **API Documentation** — Auto-generated Swagger UI and ReDoc
- **One-Click Deploy** — Makefile commands for instant setup

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3 | UI framework |
| **TypeScript** | 5.5 | Type-safe development |
| **Vite** | 5.4 | Build tool with HMR |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 10.16 | Smooth animations |
| **Zustand** | 4.4 | Lightweight state management |
| **Three.js** | — | 3D financial visualizations |
| **Lucide React** | — | Beautiful icon library |
| **React Router** | 6.26 | Client-side routing |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **FastAPI** | 0.118 | Async Python web framework |
| **Python** | 3.14 | Runtime |
| **SQLAlchemy** | 2.0 | SQL toolkit and ORM |
| **Pydantic** | 2.12 | Data validation |
| **Uvicorn** | — | ASGI server |
| **SQLite** | — | Embedded database |

---

## Quick Start

### Prerequisites

- **Python 3.8+** — [Download](https://www.python.org/downloads/)
- **Node.js 18+** — [Download](https://nodejs.org/)

### One-Click Setup

```bash
# Clone the repository
git clone https://github.com/Alexi5000/MoneyFlow.git
cd MoneyFlow

# Install and start everything
make install    # Install all dependencies
make start      # Start both frontend + backend
```

Or use the quickstart script:

```bash
.\scripts\QUICKSTART.bat
```

This will install dependencies, start the backend on port 8000, start the frontend on port 5173, and open your browser automatically.

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

### Access Points

| Service | URL |
|---|---|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:8000 |
| **API Docs (Swagger)** | http://localhost:8000/docs |
| **API Docs (ReDoc)** | http://localhost:8000/redoc |
| **Health Check** | http://localhost:8000/health |

---

## Design Philosophy

MoneyFlow's design is inspired by **cursor.com** — minimal, dark, and focused:

| Element | Value | Purpose |
|---|---|---|
| **Background** | `#000000` | Clean, professional base |
| **Surface** | `#0a0a0a`, `#222` | Depth without distraction |
| **Accent** | `#FF5F00` | Purposeful call-to-actions |
| **Typography** | System fonts | Native, fast-loading |
| **Spacing** | Generous | Breathing room for clarity |
| **Corners** | Rounded | Modern, friendly interactions |

---

## Project Structure

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
│       ├── components/      # Reusable UI components
│       ├── pages/           # Dashboard, Budgets, Analytics, Transactions, Settings
│       ├── services/        # API service layer
│       ├── store/           # Zustand state stores
│       ├── types/           # TypeScript type definitions
│       └── utils/           # Utility functions
├── config/                  # TypeScript & ESLint configurations
├── docs/                    # Full documentation suite
├── scripts/                 # Deployment & utility scripts
├── assets/                  # Cover art and branding
├── Makefile                 # Build commands
├── package.json             # Node dependencies
├── vite.config.ts           # Vite configuration
└── tailwind.config.js       # Tailwind configuration
```

---

## Development

```bash
make help           # Show all available commands
make install        # Install all dependencies
make start          # Start both servers
make stop           # Stop all servers
make test           # Run API tests
make dev            # Development mode
make build          # Build for production
make clean          # Clean build artifacts
```

---

## Sample Data

MoneyFlow ships with pre-loaded sample data so you can explore immediately:

- **User**: Alex Thompson with $15,420.75 balance
- **Budgets**: 3 active budgets (Food, Transportation, Entertainment)
- **Transactions**: 30 days of realistic sample transactions
- **Categories**: 7 predefined spending categories

---

## Documentation

- **[Documentation Index](./docs/README.md)** — Complete documentation hub
- **[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** — Full deployment instructions
- **[Quick Reference](./docs/QUICK_REFERENCE.md)** — Quick commands and troubleshooting
- **[Backend API](./docs/backend.md)** — Backend API documentation
- **[Authors](./docs/AUTHORS.md)** — Creator information

---

## Roadmap

- [ ] Bank account integration (Plaid API)
- [ ] Recurring transaction detection
- [ ] AI spending predictions and alerts
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Export to CSV/PDF
- [ ] Shared household budgets
- [ ] Investment portfolio tracking

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

MIT License — Copyright (c) 2025 Alex Cinovoj & TechTide AI. See [LICENSE](./LICENSE) for details.

---

<div align="center">

**Built by [Alex Cinovoj](https://github.com/Alexi5000) · [TechTide AI](https://github.com/Alexi5000)**

*Take control of your money.*

</div>
