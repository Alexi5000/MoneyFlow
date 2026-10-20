# MoneyFlow development and deployment

[Overview](../README.md) · [Documentation](README.md) · [API reference](backend.md) · [Security](../SECURITY.md)

MoneyFlow runs as a local demo: a React frontend and a FastAPI API with seeded, in-memory records. The active API in `src/backend/main.py` does not provide account authentication, database persistence, or bank connectivity. Restarting it resets changes. Legacy database modules do not make the active API persistent.

## Local setup

Run from the repository root. Use Node 22.12+ on the Node 22 line used by CI and Python 3.10+ (CI uses 3.12).

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r src/backend/requirements.txt
npm ci
```

These commands target a POSIX shell. On Windows, use a Python-enabled POSIX environment such as WSL for the complete quality command, whose scripts invoke `python3`. Native PowerShell startup can use `py -m venv .venv` and `.venv\Scripts\Activate.ps1`; the full native Windows quality flow has not been verified. Use separate terminals for backend and frontend; activate the Python environment in the backend terminal.

```bash
uvicorn src.backend.main:app --host 127.0.0.1 --port 8000 --reload
```

```bash
npm run dev
```

Open the frontend URL printed by Vite. API documentation is at `http://127.0.0.1:8000/docs` and health at `http://127.0.0.1:8000/health`. Embedded demo data appears when the API is unavailable; seeing a dashboard alone does not prove the API works.

## Configuration

Copy [`.env.example`](../.env.example) to `.env` to set `VITE_MONEYFLOW_API_URL`. Its default is `http://127.0.0.1:8000`. Vite embeds this public URL during the build; rebuild to change a deployed bundle. Never place secrets in `VITE_*` values.

The active API permits wildcard CORS and has no authentication. Keep development on loopback. Public hosting requires separate authentication and authorization work; CORS is not an access-control boundary.

## Verification

With the Python environment activated:

```bash
npm run quality
npm run validate:backend
```

Quality runs lint, TypeScript, repository and API tests, and the frontend build. For a running API:

```bash
curl --fail http://127.0.0.1:8000/health
curl --fail http://127.0.0.1:8000/api/v1/dashboard
```

Review dashboard, budgets, transactions, analytics, and settings on desktop and mobile. Verify API/demo status and transaction creation in the interface. Deletion and JSON export are API operations; use the API docs or request-level tests to exercise them, since the current interface has no delete or export controls. Stop only your servers with Ctrl+C in their terminals.

## Production bundle preview

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

Vite writes `dist/`. Preview serves it locally; it does not deploy the application or start the Python API. A static host must route application URLs back to `index.html` for browser-router navigation.

## Before public deployment

Real financial use requires durable storage and migrations, authenticated accounts, per-user authorization, appropriate CORS origins, HTTPS, server-side secrets, backups, and tests of those boundaries. These are prerequisites, not implemented features. Use the [API reference](backend.md) for current routes instead of historical user/account endpoints.

A passing build does not establish deployment. Validate the hosted URL, routing, API connection, and data boundaries separately, preserving existing domains and visibility.
