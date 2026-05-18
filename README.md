# MoneyFlow

**MoneyFlow** is an AI-powered budget tracker and personal-finance command center with a Cursor-inspired dark interface, a FastAPI analytics backend, and a React + TypeScript dashboard. The project now presents a complete full-stack platform experience: seeded finance data, budget and goal tracking, rule-based categorization, real-time analytics, insight generation, transaction creation, demo fallback data, and polished responsive dashboards.

> MoneyFlow is built as an original implementation. The product direction is inspired by established open-source finance tools such as Firefly III, Actual Budget, Maybe Finance, and modern React finance dashboards, but this repository does not copy AGPL-licensed source code into the project. Inspiration and licensing notes are documented in [Credits and Inspiration](./docs/CREDITS.md).[1] [2] [3] [4]

| Area | Current Buildout |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Recharts, Framer Motion, Lucide icons, responsive dark dashboard shell. |
| **Backend** | FastAPI service with seeded in-memory finance data, dashboard analytics, transaction CRUD, budget and goal endpoints, categorization rules, and export payloads. |
| **Analytics** | Monthly cash-flow series, category breakdowns, budget utilization, goal progress, AI-style insights, confidence scoring, and recommended actions. |
| **Reliability** | Frontend API client includes demo fallback data so the UI remains explorable even when the backend is offline. |
| **Documentation** | Architecture plan, backend API docs, credits, deployment notes, and quick reference guides are included under `docs/`. |

## Feature Highlights

MoneyFlow is designed to feel like a premium financial cockpit rather than a basic expense table. The dashboard combines high-level financial health metrics with actionable explanations, while the underlying API exposes structured data that can later be swapped from seeded demo records to a persistent database.

| Feature | Description |
|---|---|
| **AI Command Dashboard** | Displays balance, income, expenses, savings rate, cash-flow trend, budget health, and insight cards. |
| **Smart Transactions** | Supports transaction listing, filtering, creation, deletion, category metadata, confidence scoring, and recurring markers. |
| **Budget Studio** | Shows category budgets, spent amounts, remaining balances, utilization percentages, and status states. |
| **Goals and Envelopes** | Tracks goal progress and target dates, borrowing envelope-budgeting ideas from open-source finance products without copying their code.[2] |
| **Categorization Engine** | Provides rule metadata and an `/api/v1/categorize` endpoint for merchant/title-driven category suggestions. |
| **Analytics Workspace** | Visualizes category mix, monthly cash flow, recurring spending, risk signals, and AI-style recommendations. |
| **Export Readiness** | Exposes an `/api/v1/export` endpoint returning transactions, budgets, goals, rules, and generated timestamp metadata. |
| **Responsive UI** | Includes desktop sidebar navigation, mobile top navigation, glassy cards, orange-accent visual hierarchy, and accessible semantic sections. |

## Screens and Routes

| Route | Purpose |
|---|---|
| `/` | Executive dashboard with KPIs, charts, category distribution, insights, recent transactions, budget health, and goal progress. |
| `/transactions` | Transaction operations including search/filter views and new transaction submission. |
| `/budgets` | Budget control center with utilization states and category progress. |
| `/analytics` | AI finance intelligence surface with insight prioritization and recurring-spend analysis. |
| `/settings` | Platform configuration, API status, data export hints, and refresh actions. |

## API Contract

The backend lives in `src/backend/main.py` and is intentionally self-contained for easy local evaluation. It uses typed Pydantic models, FastAPI route declarations, CORS configuration, and deterministic seeded data.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Returns service status, version, and seeded-record counts. |
| `GET` | `/api/v1/dashboard` | Returns analytics summary, category spend, monthly trend, cash-flow forecast, recurring candidates, and insights. |
| `GET` | `/api/v1/transactions` | Lists transactions with optional query, category, type, and recurring filters. |
| `POST` | `/api/v1/transactions` | Creates a transaction and applies categorization metadata. |
| `DELETE` | `/api/v1/transactions/{transaction_id}` | Deletes a transaction by identifier. |
| `GET` | `/api/v1/budgets` | Lists budget envelopes and current utilization. |
| `GET` | `/api/v1/goals` | Lists savings goals and progress metadata. |
| `GET` | `/api/v1/rules` | Lists merchant and keyword categorization rules. |
| `POST` | `/api/v1/categorize` | Predicts category, confidence, and rationale for a transaction-like payload. |
| `GET` | `/api/v1/export` | Returns a complete JSON export payload for local backup or integration work. |

## Quick Start

The project can be evaluated with the backend and frontend running in separate terminals. The frontend defaults to `http://127.0.0.1:8000` for API calls and can be pointed elsewhere with `VITE_MONEYFLOW_API_URL`.

| Requirement | Recommended Version |
|---|---|
| **Node.js** | 18 or newer |
| **Python** | 3.10 or newer |
| **Package manager** | `npm` is the validated path for this build. |

```bash
# Clone the repository
git clone https://github.com/Alexi5000/MoneyFlow.git
cd MoneyFlow

# Frontend dependencies
npm install

# Backend dependencies
python -m pip install -r src/backend/requirements.txt
```

Start the backend first:

```bash
cd src/backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Start the frontend in a second terminal:

```bash
npm run dev
```

Then open `http://localhost:5173`. API docs are available at `http://localhost:8000/docs` when the backend is running.

## Validation

This buildout has been validated with the production frontend build and direct backend import/API checks. The current frontend bundle is produced with `npm run build`; Vite reports one non-blocking chunk-size warning because the dashboard intentionally includes rich visualization and animation dependencies.

| Command | Purpose |
|---|---|
| `npm run build` | Type-checks the active React app and creates the production Vite bundle. |
| `python -c "import main"` from `src/backend` | Confirms the backend entry point imports cleanly. |
| `uvicorn main:app --reload` from `src/backend` | Runs the local API service for interactive testing. |

## Project Structure

```text
MoneyFlow/
├── config/                         # TypeScript project references
├── docs/                           # Architecture, API, credits, deployment, and readiness notes
├── src/
│   ├── backend/
│   │   ├── main.py                 # FastAPI application and finance analytics API
│   │   └── requirements.txt        # Python dependencies
│   └── frontend/
│       ├── App.tsx                 # Full MoneyFlow dashboard application
│       ├── index.css               # Tailwind and global visual system
│       ├── main.tsx                # React entry point
│       └── vite-env.d.ts           # Vite TypeScript environment declarations
├── package.json                    # Frontend scripts and dependencies
├── tsconfig.json                   # Root TypeScript build references
├── vite.config.ts                  # Vite configuration
└── tailwind.config.js              # Tailwind design tokens
```

## Open-Source Inspiration and License Safety

MoneyFlow draws product inspiration from open-source finance projects, especially self-hosted budgeting, envelope systems, rule-based categorization, data export, and dashboard analytics. Firefly III and Maybe Finance are AGPL-oriented projects, so they are treated as feature inspiration only unless future maintainers intentionally adopt compatible obligations.[1] [3] Actual Budget and the reviewed React finance dashboard are MIT-licensed references, but MoneyFlow still uses an original implementation with attribution rather than wholesale copying.[2] [4]

| Project | Inspiration Used | License Boundary |
|---|---|---|
| **Firefly III** | Self-hosted finance positioning, rules, budgets, savings goals, API-first coverage. | Feature inspiration only because of AGPL-3.0 licensing.[1] |
| **Actual Budget** | Envelope-budgeting language, local-first mindset, onboarding and documentation focus. | MIT reference; original MoneyFlow code remains preferred.[2] |
| **Maybe Finance** | Polished finance cockpit, exports, AI/chat direction, Sankey-style future roadmap. | Feature inspiration only because of AGPL/trademark constraints noted by the project.[3] |
| **React Finance Dashboard** | Compact React dashboard patterns, Recharts, Tailwind UI, local demo fallback ideas. | MIT reference; adapted as original MoneyFlow implementation.[4] |

## Roadmap

MoneyFlow is now ready for a final-stage expansion path that can add durable persistence and bank-grade integrations without changing the core product direction. The next logical step is moving seeded in-memory data into SQLite/PostgreSQL with migrations, then layering authentication, Plaid-style bank sync, recurring transaction detection, export formats, and household collaboration.

| Stage | Planned Work |
|---|---|
| **Persistence** | Replace seeded runtime records with SQLAlchemy models, migrations, and local SQLite/PostgreSQL profiles. |
| **Bank Connectivity** | Add provider abstractions for Plaid-style account sync, transaction import, and balance refresh. |
| **AI Services** | Add pluggable LLM-backed insight generation, anomaly detection, and cash-flow forecasting. |
| **Reports** | Add CSV/PDF exports, tax summaries, category drill-downs, and Sankey cash-flow diagrams. |
| **Security** | Add authentication, account scoping, encrypted secrets, and production CORS policies. |
| **Deployment** | Add Docker Compose and production environment templates for self-hosted installations. |

## Contributing

Contributions should preserve the license-safe implementation boundary described above. If a future change directly imports third-party source code, it must verify license compatibility, retain required notices, and document the origin in `docs/CREDITS.md` before merging.

## License

MoneyFlow is released under the MIT License. See [LICENSE](./LICENSE) for details.

<div align="center">

**Built by [Alex Cinovoj](https://github.com/Alexi5000) · TechTide AI**

*Take control of your money with a modern AI finance cockpit.*

</div>

## References

[1]: https://github.com/firefly-iii/firefly-iii "Firefly III on GitHub"
[2]: https://github.com/actualbudget/actual "Actual Budget on GitHub"
[3]: https://github.com/maybe-finance/maybe "Maybe Finance on GitHub"
[4]: https://github.com/iambhavesh55/personal-finance-dashboard "React TypeScript Personal Finance Dashboard on GitHub"
