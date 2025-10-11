# MoneyFlow Documentation

## 📚 Documentation Index

### Getting Started
- **[Current Status](./CURRENT_STATUS.md)** - System status and latest build info
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[Quick Start](../README.md#quick-start)** - Fast deployment with QUICKSTART.bat

### Design
- **[Cursor.com Design](../✅_CURSOR_DESIGN_COMPLETE.md)** - Design specifications matching cursor.com
- **[Design Philosophy](../README.md#design-philosophy)** - Color scheme and typography

### Backend
- **[Backend Documentation](./backend.md)** - FastAPI backend details
- **[API Endpoints](./DEPLOYMENT_GUIDE.md#api-endpoints)** - All available API routes

### Testing
- **[API Testing](../test_api.ps1)** - PowerShell script to test all endpoints
- **[Troubleshooting](./DEPLOYMENT_GUIDE.md#troubleshooting)** - Common issues and solutions

## 🚀 Quick Links

### Application Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### Development
- Start App: `.\QUICKSTART.bat`
- Test APIs: `powershell -ExecutionPolicy Bypass -File test_api.ps1`
- Frontend Dev: `npm run dev`
- Backend Dev: `cd src/backend && uvicorn main:app --reload`

## 📊 Current Build

**Version**: 1.0.0  
**Status**: 🟢 Fully Operational  
**Design**: 🎨 Cursor.com Match Complete  
**Last Updated**: October 11, 2025

### Tech Stack
- **Frontend**: React 18.3.1 + TypeScript 5.5.3 + Vite 5.4.2
- **Backend**: FastAPI 0.118.3 + Python 3.14 + SQLAlchemy 2.0.44
- **Styling**: Tailwind CSS 3.4.10 (Cursor.com inspired)
- **State**: Zustand 4.4.7
- **Animations**: Framer Motion 10.16.16

## 🎯 Key Features

- ✅ Full-stack application (React + FastAPI)
- ✅ Cursor.com-inspired design (black theme, orange accents)
- ✅ Real-time data updates
- ✅ Beautiful animations
- ✅ Responsive layout
- ✅ API documentation (Swagger UI)
- ✅ Sample data pre-loaded
- ✅ Hot module replacement (HMR)

## 📁 File Organization

### Root Documentation
- `README.md` - Main project README
- `QUICKSTART.bat` - One-click deployment script
- `test_api.ps1` - API testing script
- `DEPLOYMENT_SUCCESS.md` - Deployment summary
- `✅_CURSOR_DESIGN_COMPLETE.md` - Design specifications
- `🎉_DEPLOYMENT_AND_DESIGN_COMPLETE.md` - Complete status

### docs/ Folder
- `README.md` - This file (documentation index)
- `CURRENT_STATUS.md` - Latest build info and status
- `DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `backend.md` - Backend API documentation

### Legacy Documentation
All old deployment docs have been consolidated. Legacy files in `docs/deployment/` are kept for reference only.

## 🆘 Need Help?

1. **Deployment Issues**: See [Deployment Guide](./DEPLOYMENT_GUIDE.md)
2. **API Issues**: Run `test_api.ps1` to diagnose
3. **Design Questions**: See [Cursor Design](../✅_CURSOR_DESIGN_COMPLETE.md)
4. **Backend Details**: See [Backend Docs](./backend.md)

---

**All documentation is up-to-date with the latest build!**

