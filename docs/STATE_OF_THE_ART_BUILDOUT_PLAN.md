# MoneyFlow State-of-the-Art Buildout Plan

MoneyFlow will be expanded from a thin Vite/FastAPI shell into a complete full-stack personal-finance platform. The current repository contains a React entry point, a Tailwind design foundation, and a FastAPI `main.py`, but most referenced frontend pages and backend modules are absent. The buildout therefore needs to provide a coherent application model, a working API, a polished dashboard, and documentation that makes the repository ready for serious use.

## Research-Informed Product Direction

The feature direction is inspired by established open-source finance projects without copying incompatible source code. **Firefly III** demonstrates the value of self-hosting, recurring transactions, rule-based transaction handling, savings goals, REST APIs, multi-currency support, Docker deployment, and charts. Its AGPL-3.0 license makes it appropriate as product inspiration only unless MoneyFlow intentionally adopts AGPL obligations.[^1] **Actual Budget** demonstrates a local-first budget product with synchronization, envelope budgeting education, Docker/local deployment options, TypeScript-heavy implementation, and community documentation. Its MIT license is more permissive, but MoneyFlow will still use original implementation rather than wholesale copying.[^2] **Maybe Finance** demonstrates a polished self-hosted consumer-finance experience with data exports, chat-style AI endpoints, Sankey-style cash-flow thinking, and self-hosting setup polish, but its archived AGPL-3.0 repository and trademark guidance require caution.[^3] Smaller React dashboard examples reinforce familiar UX patterns such as KPI cards, transaction CRUD, local data persistence, charts, budget progress bars, theme support, and responsive layouts.[^4]

| Inspiration Source | Safe MoneyFlow Adaptation | Licensing Boundary |
| --- | --- | --- |
| Firefly III | Self-hosting posture, rules, recurring transactions, goals, REST-first API, reports, multi-currency language. | Use concepts only because the project is AGPL-3.0. |
| Actual Budget | Envelope budgeting concepts, education-first onboarding, sync/local-first positioning, typed app structure. | MIT-compatible patterns may be adapted with attribution, but original code is preferred. |
| Maybe Finance | Investor-grade dashboard polish, export flows, AI/chat endpoints, cash-flow visualization ideas. | Use concepts only unless AGPL obligations and trademark restrictions are intentionally accepted. |
| React dashboard examples | KPI cards, charts, budget progress indicators, responsive Tailwind UI, local demo data fallback. | Implement original components and acknowledge inspiration in docs. |

## Target Architecture

MoneyFlow will remain a **React + TypeScript + Tailwind + FastAPI** application, matching the repository description. The frontend will be organized with clear slices for shared UI primitives, finance data models, API clients, dashboard widgets, transaction management, budgets, analytics, and settings. The backend will expose a documented REST API with deterministic demo data, transaction CRUD, budget and goal management, analytics summaries, AI-style insights, recurring transaction suggestions, and health/readiness endpoints.

| Layer | Implementation Target | Key Responsibilities |
| --- | --- | --- |
| Frontend shell | Vite, React Router, Tailwind, Framer Motion, Recharts, React Three Fiber fallback-safe visualization. | Navigation, responsive dark UI, dashboard pages, charts, transactions, budgets, analytics, settings. |
| State and data | Typed API client with graceful local demo fallback. | Fetch backend data when available, preserve a high-quality demo mode when offline. |
| Backend API | FastAPI, SQLite via standard library, Pydantic models, CORS, OpenAPI. | Provide seeded finance data, CRUD endpoints, budget analytics, category rules, insights, export-ready responses. |
| Documentation | README, docs hub, architecture, research notes, deployment guide, API reference. | Explain setup, features, inspiration boundaries, roadmap, and validation status. |

## Core Feature Scope

The first full-platform buildout will ship a working application rather than a placeholder. It will include a dashboard with net worth, income, expenses, savings rate, cash-flow runway, budget health, category distribution, weekly trend charts, AI-style insight cards, recent transactions, and goal progress. The transactions page will support searching, filtering, category chips, merchant intelligence, and transaction creation through the API. The budgets page will model category budgets, utilization, remaining allowance, alerts, and savings goals. The analytics page will include trend charts, category breakdowns, forecast cards, recurring-pattern suggestions, and a 3D finance visualization panel. The settings page will document AI rules, import/export readiness, privacy posture, and platform configuration.

## Attribution Policy

MoneyFlow will include a clear inspirations section, but it will not imply that external maintainers contributed directly to this repository unless they actually submitted work to MoneyFlow. The README and credits documentation will credit the projects used for product inspiration and identify licensing boundaries. No generated assistant identity will be added as a contributor.

## Validation Targets

The completed buildout should pass `npm run build`, avoid TypeScript dead-code failures, provide an importable backend with working FastAPI routes, avoid committing transient caches, preserve license-safe attribution, and document what changed. If dependency installation or execution fails due to environment drift, the failure mode and remediation will be captured in the final status notes.

## References

[^1]: [Firefly III GitHub Repository](https://github.com/firefly-iii/firefly-iii)
[^2]: [Actual Budget GitHub Repository](https://github.com/actualbudget/actual)
[^3]: [Maybe Finance GitHub Repository](https://github.com/maybe-finance/maybe)
[^4]: [Personal Finance Dashboard by Bhavesh Chaudhary](https://github.com/iambhavesh55/personal-finance-dashboard)
