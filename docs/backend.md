# Backend Operations for MoneyFlow

The MoneyFlow backend is a FastAPI service implemented in `src/backend/main.py`. It provides a complete demo-grade finance API for dashboard analytics, transaction management, budgets, goals, categorization rules, rule-based insights, and data export. The service currently uses deterministic seeded in-memory data so the repository can run immediately without database provisioning.

## Runtime Model

| Concern | Current Implementation |
|---|---|
| **Framework** | FastAPI with typed Pydantic response and request models. |
| **Data store** | Seeded in-memory lists for transactions, budgets, goals, category rules, categories, and account metadata. |
| **CORS** | Enabled for local frontend development and demo access. |
| **Analytics** | Calculated at request time from seeded transaction and budget state. |
| **Future persistence** | Designed to migrate to SQLAlchemy plus SQLite/PostgreSQL without changing the frontend route contract. |

> The backend is intentionally self-contained for evaluation. It should not be treated as a production financial data store until authentication, persistence, encryption, account scoping, and production CORS policies are added.

## API Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | Returns service status, version, and seeded record counts. |
| `GET` | `/api/v1/dashboard` | Returns account summary, category spend, monthly trend, cash-flow forecast, recurring candidates, and insights. |
| `GET` | `/api/v1/transactions` | Lists transactions with optional `query`, `category`, `type`, and `recurring` filters. |
| `POST` | `/api/v1/transactions` | Creates a transaction, applies category metadata, and returns the created object. |
| `DELETE` | `/api/v1/transactions/{transaction_id}` | Deletes a transaction by identifier. |
| `GET` | `/api/v1/budgets` | Lists budget envelopes with spent, remaining, and utilization metrics. |
| `GET` | `/api/v1/goals` | Lists savings goals with target amount, current amount, status, and target date. |
| `GET` | `/api/v1/rules` | Lists categorization rules used by the rule-based categorization service. |
| `POST` | `/api/v1/categorize` | Predicts a transaction category, confidence score, and explanation based on provided text/merchant data. |
| `GET` | `/api/v1/export` | Returns a complete JSON export including transactions, budgets, goals, rules, and generated timestamp metadata. |

## Data Models

The API uses Pydantic models to keep the frontend contract explicit. The most important model groups are summarized below.

| Model Group | Fields and Purpose |
|---|---|
| **Transaction** | Identifier, date, description, merchant, amount, transaction type, category metadata, payment method, recurrence flag, note, and confidence score. |
| **Budget** | Category ID, category name, limit, spent amount, remaining amount, utilization percentage, status, period, and color. |
| **Goal** | Name, target amount, current amount, progress percentage, status, target date, and priority metadata. |
| **CategoryRule** | Rule name, keywords, merchant hints, target category, confidence, and active state. |
| **Insight** | Severity, title, narrative explanation, amount impact, recommendation, and confidence. |
| **AnalyticsResponse** | Dashboard analytics payload containing summary, category spend, monthly trend, forecast, recurring candidates, and insights. |

## Categorization Flow

The categorization endpoint is designed as a deterministic stand-in for a future classification service. It evaluates merchant/title text against category rules, returns a predicted category, includes a confidence score, and explains the rationale so the UI can present rule-based transparency.

| Step | Behavior |
|---|---|
| **Input** | A transaction-like payload containing description, merchant, and amount. |
| **Rule match** | Keywords and merchants are compared against configured category rules. |
| **Fallback** | If no strong match is found, the backend returns a conservative uncategorized/default classification. |
| **Output** | Category, confidence, rationale, and optional suggested action metadata. |

## Local Development

Run the backend from the backend directory so the module import path is correct.

```bash
cd src/backend
python -m pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Once running, the interactive OpenAPI documentation is available at `http://localhost:8000/docs`, and ReDoc is available at `http://localhost:8000/redoc`.

## Validation

| Check | Command |
|---|---|
| **Import service** | `cd src/backend && python -c "import main; print(main.app.title)"` |
| **Health check** | `curl http://localhost:8000/health` |
| **Dashboard payload** | `curl http://localhost:8000/api/v1/dashboard` |
| **OpenAPI schema** | `curl http://localhost:8000/openapi.json` |

## Production Hardening Roadmap

The API is ready for the next implementation stage, but several changes should be completed before handling real personal-finance data.

| Priority | Work Item |
|---|---|
| **High** | Add authentication, account scoping, persistent storage, migrations, and secrets management. |
| **High** | Replace permissive CORS with environment-specific allowed origins. |
| **Medium** | Add request rate limiting, audit logs, and structured application logging. |
| **Medium** | Add unit tests for analytics calculations and transaction mutation behavior. |
| **Medium** | Add CSV/PDF export formats and import validation for bank transaction files. |
| **Future** | Integrate bank-data providers and optional LLM-backed insight generation behind explicit user configuration. |
