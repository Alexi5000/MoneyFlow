# MoneyFlow Documentation

**MoneyFlow** is documented as a full-stack automation budget platform with a React frontend, FastAPI backend, seeded finance analytics, and license-safe open-source inspiration notes. This index points maintainers to the most important product, implementation, deployment, and attribution documents.

| Document | Purpose |
|---|---|
| **[Project README](../README.md)** | Main product overview, quick start, route map, API contract, and roadmap. |
| **[State-of-the-Art Buildout Plan](./STATE_OF_THE_ART_BUILDOUT_PLAN.md)** | Architecture plan and implementation rationale based on repository inspection and open-source research. |
| **[Credits and Inspiration](./CREDITS.md)** | Authorship, third-party inspiration, and license-safety boundaries. |
| **[Backend API](./backend.md)** | Technical API documentation for the FastAPI service. |
| **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** | Local and production deployment guidance. |
| **[Quick Reference](./QUICK_REFERENCE.md)** | Common commands and troubleshooting shortcuts. |
| **[Authors](./AUTHORS.md)** | Creator and project-owner information. |
| **[Final Status](./FINAL_STATUS.md)** | Historical final-status documentation retained from the earlier repository state. |
| **[Hackathon Checklist](./HACKATHON_READY_CHECKLIST.md)** | Presentation and readiness checklist retained for demo use. |

## Current Build Summary

MoneyFlow now contains a complete platform slice rather than a placeholder application. The frontend reads from the FastAPI API when available, falls back to local demo data when offline, and exposes dashboard, transaction, budget, analytics, and settings routes. The backend exposes health, dashboard, transaction, budget, goal, rule, categorization, and export endpoints.

| Layer | Implementation |
|---|---|
| **Frontend** | `src/frontend/App.tsx`, `src/frontend/main.tsx`, `src/frontend/index.css`, and `src/frontend/vite-env.d.ts`. |
| **Backend** | `src/backend/main.py` with typed Pydantic models, seeded data, analytics helpers, CORS, and API routes. |
| **Configuration** | Root `tsconfig.json` references the TypeScript configs under `config/`, and the production build uses Vite. |
| **Validation** | `npm run build` succeeds, with a non-blocking Vite chunk-size warning caused by visualization dependencies. |

## Local Development

| Task | Command |
|---|---|
| **Install frontend dependencies** | `npm install` |
| **Install backend dependencies** | `python -m pip install -r src/backend/requirements.txt` |
| **Run backend** | `cd src/backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload` |
| **Run frontend** | `npm run dev` |
| **Build frontend** | `npm run build` |
| **Open API docs** | `http://localhost:8000/docs` |

## Important Maintenance Notes

The current backend is intentionally seeded and in-memory so the repo can present a polished full-stack experience without requiring database setup. A future persistence milestone should introduce SQLAlchemy models, migrations, and environment-specific database URLs before production use.

The credits file should be updated before importing any direct third-party source code. AGPL projects researched for this buildout are treated only as product inspiration unless the repository intentionally adopts compatible obligations.
