<p align="center">
  <a href="https://github.com/Alexi5000/MoneyFlow#readme">
    <img src="./docs/assets/moneyflow-readme-hero.svg" alt="MoneyFlow automation budget tracker dashboard preview" width="100%" />
  </a>
</p>

<p align="center">
  <strong>A local budgeting demo with a dark dashboard, rule-based categorization, budget envelopes, savings goals, and a React plus FastAPI foundation.</strong>
</p>

<p align="center">
  <a href="./docs/README.md"><strong>Documentation</strong></a>
  ·
  <a href="./docs/backend.md"><strong>API Reference</strong></a>
  ·
  <a href="./docs/STATE_OF_THE_ART_BUILDOUT_PLAN.md"><strong>Architecture</strong></a>
  ·
  <a href="./docs/CREDITS.md"><strong>Credits</strong></a>
  ·
  <a href="https://github.com/Alexi5000/MoneyFlow/issues"><strong>Issues</strong></a>
</p>

<p align="center">
  <a href="https://github.com/Alexi5000/MoneyFlow"><img alt="Repository" src="https://img.shields.io/badge/repo-Alexi5000%2FMoneyFlow-16a34a?style=for-the-badge&logo=github"></a>
  <a href="./src/frontend/App.tsx"><img alt="Frontend" src="https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-2563eb?style=for-the-badge&logo=react"></a>
  <a href="./src/backend/main.py"><img alt="Backend" src="https://img.shields.io/badge/backend-FastAPI-059669?style=for-the-badge&logo=fastapi"></a>
  <a href="./package.json"><img alt="Build" src="https://img.shields.io/badge/build-Vite%20%2B%20npm-f59e0b?style=for-the-badge&logo=vite"></a>
  <a href="./docs/CREDITS.md"><img alt="Credits" src="https://img.shields.io/badge/inspiration-license--safe-111827?style=for-the-badge"></a>
</p>

---

## Alexi5000 Fork Purpose

MoneyFlow is Alexi5000’s local-first budgeting and cash-flow product foundation. It is maintained as a practical reference for careful AI-assisted application development: deterministic calculations, typed service contracts, observable validation, and explicit boundaries around sensitive financial data. The repository reflects experience building agent workflows and automations with Cursor, Claude, Codex-class tools, and comparable systems while keeping current financial behavior understandable without relying on an AI model.

The current application uses seeded local data. It is not a bank connection, hosted financial service, tax product, or personalized financial advisor. See [FORK_POLICY.md](./FORK_POLICY.md) for the engineering and integration boundary.

## Why MoneyFlow

MoneyFlow turns personal finance into a **high-signal operating system** instead of another spreadsheet. The platform combines a polished dark dashboard, deterministic seeded demo data, a typed FastAPI contract, and a React experience that remains explorable even when the backend is offline. The repository is built as a product foundation: the current implementation is local-first and demo-ready, while the architecture leaves a clear path toward persistent storage, authentication, bank-sync providers, and production deployment.

The README has been redesigned to follow the same above-the-fold conventions used by strong open-source landing pages: a visual project banner, meaningful badges, immediate documentation links, quick-start commands, API tables, and clear attribution boundaries. Public README pattern research was guided by the curated `awesome-readme` collection and `Best-README-Template`, both of which emphasize screenshots, badges, concise summaries, quick links, installation guidance, roadmap context, and credits as hallmarks of useful project front pages.[1] [2]

| Product Layer | What Is Implemented |
|---|---|
| **Frontend cockpit** | A React 18 and TypeScript dashboard with cursor-style dark surfaces, responsive navigation, KPI cards, charts, budgets, goals, settings, and demo fallback state. |
| **Backend platform** | A FastAPI service with health checks, typed Pydantic models, seeded finance data, transaction CRUD, analytics, categorization, budgets, goals, rules, and export payloads. |
| **Finance intelligence** | rule-based insight cards, rule-driven category suggestions, confidence scoring, recurring-spend signals, cash-flow summaries, savings-rate metrics, and budget-health analysis. |
| **Documentation system** | A root landing page, backend reference, buildout architecture, final status, deployment notes, and license-safe inspiration credits. |
| **Validation posture** | A reusable backend contract script, production frontend build checks, documentation reference scans, and repository hygiene checks. |

---

## Product Preview

The graphic above is a repository-local SVG preview of the MoneyFlow design language. It is intentionally stored at [`docs/assets/moneyflow-readme-hero.svg`](./docs/assets/moneyflow-readme-hero.svg) so the README remains visually rich without depending on a third-party screenshot host.

| Experience | Detail |
|---|---|
| **Command Dashboard** | Net balance, income, expense, savings-rate, budget-health, and automation-confidence cards give a quick executive summary. |
| **Analytics Canvas** | Cash-flow trend charts, category distribution, recurring-spend analysis, and insight prioritization turn raw transactions into decisions. |
| **Budget Studio** | Category envelopes show utilization, remaining funds, status labels, and practical warnings when a category is at risk. |
| **Goals Workspace** | Savings goals track current progress, targets, date metadata, and next-step recommendations. |
| **Transaction Intelligence** | Transaction rows include merchant details, category metadata, recurring markers, search and filters, and creation/deletion flows. |
| **Settings and Export** | The app exposes API connectivity, refresh behavior, configuration hints, and export readiness for future integrations. |

---

## Use Cases

| Use case | What MoneyFlow demonstrates |
|---|---|
| **Budgeting prototype** | A deterministic dashboard for balances, spending, envelopes, savings goals, and cash-flow summaries using seeded data. |
| **Full-stack contract reference** | A React and TypeScript frontend paired with a typed FastAPI API whose public route behavior is exercised in smoke tests. |
| **Responsible automation foundation** | A clear boundary for future import, classification, or provider integrations: server-side secrets, consent, auditability, and deterministic validation before handling real records. |
| **AI-assisted engineering practice** | An application that can be evolved with modern agent-development tools while retaining human-readable financial logic, repeatable tests, and explicit review gates. |

## Built With

MoneyFlow deliberately keeps the stack familiar, inspectable, and easy to run locally. The frontend and backend are separated cleanly, but the contracts are aligned so the repository can evolve into a hosted platform without a rewrite.

| Area | Technology |
|---|---|
| **Interface** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, and Lucide icons. |
| **API** | Python, FastAPI, Pydantic, Uvicorn, and CORS middleware. |
| **Data model** | In-memory seeded finance records with typed transaction, budget, goal, rule, analytics, and export models. |
| **Validation** | Frontend linting and type checks, dependency-free repository contracts, FastAPI request-level smoke tests, the established backend contract script, and a Vite production build. |
| **Package workflow** | `npm` is the validated frontend package-manager path for this repository buildout. |

---

## Verified Setup

The fastest way to evaluate MoneyFlow is to run the FastAPI backend and Vite frontend in two terminals. The frontend reads `VITE_MONEYFLOW_API_URL` when present and otherwise points to the local backend default.

| Requirement | Recommended Version |
|---|---|
| **Node.js** | 22.12 or newer on the Node 22 line used by CI; Vite also supports Node 20.19+. |
| **Python** | 3.10 or newer. |
| **npm** | Current stable npm bundled with Node.js. |

```bash
# Clone the repository
git clone https://github.com/Alexi5000/MoneyFlow.git
cd MoneyFlow

# Create an isolated backend environment and install pinned dependencies
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r src/backend/requirements.txt

# Install the locked frontend dependency graph
npm ci

# Verify linting, TypeScript, smoke suites, and production build
npm run quality
npm run validate:backend
```

Start the backend first:

```bash
uvicorn src.backend.main:app --reload --host 127.0.0.1 --port 8000
```

Then start the frontend:

```bash
npm run dev
```

Open the Vite URL shown in the terminal. If the API is not reachable, the frontend falls back to embedded demo data so the visual experience remains testable.

## Configuration and Deployment

Copy [`.env.example`](./.env.example) to `.env` to override the public backend URL with `VITE_MONEYFLOW_API_URL`. Restart Vite after changing it. Never put credentials in `VITE_*` variables; they are embedded in the browser bundle.

The backend stores seeded records in memory and has no account authentication. Changes disappear when it restarts. Keep the API bound to loopback for local evaluation. See the [deployment guide](./docs/DEPLOYMENT_GUIDE.md) for preview, verification, and production prerequisites.

---

## API Surface

The backend lives in [`src/backend/main.py`](./src/backend/main.py). It is intentionally self-contained for review and local evaluation, while still using typed route handlers and response models.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Returns service health, version metadata, and seeded-record counts. |
| `GET` | `/api/v1/dashboard` | Returns the analytics summary, monthly trend, category spend, cash-flow forecast, recurring candidates, and insight payloads. |
| `GET` | `/api/v1/transactions` | Lists transactions with optional query, category, type, and recurring filters. |
| `POST` | `/api/v1/transactions` | Creates a transaction and applies categorization metadata. |
| `DELETE` | `/api/v1/transactions/{transaction_id}` | Deletes a transaction by identifier. |
| `GET` | `/api/v1/budgets` | Lists budget envelopes with spend, remaining amount, utilization, and status. |
| `GET` | `/api/v1/goals` | Lists savings goals with target amounts, current amounts, progress, and dates. |
| `GET` | `/api/v1/rules` | Lists merchant and keyword categorization rules. |
| `POST` | `/api/v1/categorize` | Predicts a category, confidence level, and rationale for transaction-like input. |
| `GET` | `/api/v1/export` | Returns a JSON export payload containing transactions, budgets, goals, rules, and generation metadata. |

---

## Validation

MoneyFlow includes repeatable validation commands so future changes can be checked without relying on ad hoc manual inspection.

```bash
# Run linting, type checks, repository-contract smoke checks,
# FastAPI request-level smoke checks, and the production build.
npm run quality

# Run the established backend contract check directly when debugging API behavior.
npm run validate:backend
```

| Validation Area | Expected Result |
|---|---|
| **Repository contract** | The dependency-free Node smoke suite checks documentation, environment safety, policies, application surfaces, and CI coverage. |
| **FastAPI smoke suite** | Request-level tests exercise health, dashboard, categorization, export, and reversible transaction lifecycle behavior. |
| **Backend contract** | The established validation script checks imports, route registration, seeded analytics, and transaction CRUD behavior. |
| **Frontend quality** | ESLint and TypeScript check the active React entry points before Vite creates a production bundle. |
| **Environment safety** | The committed `.env.example` documents public browser configuration and prohibits client-side secrets. |

---

## Repository Map

| Path | Purpose |
|---|---|
| [`src/frontend/App.tsx`](./src/frontend/App.tsx) | Main React application, routes, dashboard views, API client, and demo fallback data. |
| [`src/frontend/main.tsx`](./src/frontend/main.tsx) | Frontend entry point. |
| [`src/frontend/index.css`](./src/frontend/index.css) | Tailwind and global styling entry. |
| [`src/backend/main.py`](./src/backend/main.py) | FastAPI app, models, seeded data, route handlers, analytics, and categorization logic. |
| [`scripts/validate_backend_contract.py`](./scripts/validate_backend_contract.py) | Reusable backend contract validation script. |
| [`docs/backend.md`](./docs/backend.md) | Backend reference and route behavior documentation. |
| [`docs/STATE_OF_THE_ART_BUILDOUT_PLAN.md`](./docs/STATE_OF_THE_ART_BUILDOUT_PLAN.md) | Architecture and implementation plan for the current platform buildout. |
| [`docs/CREDITS.md`](./docs/CREDITS.md) | Open-source inspiration, authorship, and license-boundary notes. |
| [`docs/assets/moneyflow-readme-hero.svg`](./docs/assets/moneyflow-readme-hero.svg) | Branded README hero graphic. |

---

## Open-Source Inspiration and License Boundaries

MoneyFlow was designed after reviewing leading open-source personal-finance and dashboard projects, including Firefly III, Actual Budget, Maybe Finance, and a modern React finance dashboard. Those projects informed product-level ideas such as budget envelopes, local-first finance workflows, polished dashboards, and clear documentation, but this repository does **not** vendor their code. The implementation in this repository is written for MoneyFlow and keeps inspiration credits separate from direct contribution claims.[3] [4] [5] [6]

| Inspiration Source | What MoneyFlow Learned | Boundary |
|---|---|---|
| **Firefly III** | Rich personal-finance domain coverage and serious self-hosted budgeting conventions.[3] | Inspiration only; no source code copied. |
| **Actual Budget** | Local-first budgeting, envelope-style thinking, and practical finance workflows.[4] | Inspiration only; no source code copied. |
| **Maybe Finance** | Modern personal-finance product feel and strong dashboard positioning.[5] | Inspiration only; no source code copied. |
| **React finance dashboard examples** | Dashboard layout ideas, KPI-first presentation, and chart-heavy finance interfaces.[6] | Inspiration only; no source code copied. |

> **Attribution note:** External projects listed above are credited as inspiration sources. They are not represented as direct contributors to MoneyFlow unless they have contributed directly to this repository through GitHub history.

---

## Roadmap

MoneyFlow is now a strong full-stack foundation. The next production-oriented stage should replace the seeded in-memory data with durable services and explicit user boundaries.

| Stage | Focus |
|---|---|
| **Persistence** | Add a real database layer, migrations, seed scripts, and environment-based configuration. |
| **Authentication** | Add user accounts, session management, protected routes, and per-user finance records. |
| **Bank connectivity** | Integrate a provider such as Plaid or a CSV import pipeline for real transaction ingestion. |
| **classification services** | Replace deterministic categorization with provider-backed enrichment, explainability, and human approval flows. |
| **Deployment** | Add production Docker or platform-specific deployment instructions with environment validation. |
| **Testing** | Expand unit, integration, accessibility, and end-to-end coverage across frontend and backend flows. |

---

## Support

For reproducible setup failures, documentation corrections, or feature discussions, open a public issue with your operating system, Node.js and Python versions, exact commands, and non-sensitive output. See [SUPPORT.md](./SUPPORT.md) for routing guidance.

Do **not** post account data, bank tokens, credentials, personal financial records, or suspected vulnerabilities in public issues. Follow [SECURITY.md](./SECURITY.md) for private security reporting.

## Contributing

Contributions should preserve the repository’s attribution boundaries, avoid introducing license-incompatible source code, and keep the frontend and backend contracts synchronized. A good pull request should include a concise description, screenshots or API examples when applicable, and validation evidence from the backend contract script and frontend production build.

```bash
git checkout -b feature/your-moneyflow-improvement
npm run quality
npm run validate:backend
```

---

## License

MoneyFlow is released under the MIT License. See [LICENSE](./LICENSE) for details. Third-party projects referenced in this README retain their own licenses, authorship, and contribution histories.

<p align="center">
  <strong>Built by <a href="https://github.com/Alexi5000">Alex Cinovoj</a></strong>
</p>

<p align="center">
  <em>Take control of your money with a modern automation finance cockpit.</em>
</p>

---

## References

[1]: https://github.com/matiassingers/awesome-readme "awesome-readme: curated README examples"
[2]: https://github.com/othneildrew/Best-README-Template "Best-README-Template"
[3]: https://github.com/firefly-iii/firefly-iii "Firefly III"
[4]: https://github.com/actualbudget/actual "Actual Budget"
[5]: https://github.com/maybe-finance/maybe "Maybe Finance"
[6]: https://github.com/iambhavesh55/personal-finance-dashboard "Personal Finance Dashboard"
