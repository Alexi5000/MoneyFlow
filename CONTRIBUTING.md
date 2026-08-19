# Contributing to MoneyFlow

Thank you for improving MoneyFlow. This repository is a local-first budgeting and cash-flow application, so contributors should preserve the distinction between seeded demo behavior and any future production financial-data integration.

## Before opening a pull request

Use Node.js 20 or newer and Python 3.10 or newer. Create an isolated Python environment, install the pinned backend requirements, install the locked frontend dependencies, and run the complete contract.

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r src/backend/requirements.txt
npm ci
npm run quality
npm run validate:backend
```

On Windows PowerShell, activate the environment with `.\.venv\Scripts\Activate.ps1`.

## Change boundaries

Keep a change focused on one observable behavior or one repository-quality concern. When modifying an API route, update its response contract, FastAPI smoke test, and documentation together. When modifying the frontend’s API configuration, preserve the local fallback experience and update `.env.example` if the public configuration contract changes.

Do not add client-side credentials, real financial records, bank tokens, or production database exports. Vite variables beginning with `VITE_` are public browser inputs, not a secret store.

## Pull request checklist

Describe the user-visible or API-visible behavior that changed, state the commands run and their results, and include screenshots or request/response examples when they clarify the change. Keep upstream inspiration and license attribution accurate. Report security-sensitive findings through [SECURITY.md](SECURITY.md), not a pull request or public issue.

## Code of conduct

By participating, you agree to follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
