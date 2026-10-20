# MoneyFlow quick reference

[Setup and deployment](DEPLOYMENT_GUIDE.md) · [Overview](../README.md) · [API reference](backend.md)

Run from the repository root after setup. Activate `.venv` for Python commands.

| Task | Command |
|---|---|
| Install locked frontend packages | `npm ci` |
| Start local API | `uvicorn src.backend.main:app --host 127.0.0.1 --port 8000 --reload` |
| Start frontend in another terminal | `npm run dev` |
| Run quality gates | `npm run quality` |
| Verify backend contract | `npm run validate:backend` |
| Build frontend | `npm run build` |
| Preview built frontend locally | `npm run preview -- --host 127.0.0.1` |
| Check running API | `curl --fail http://127.0.0.1:8000/health` |

Use the address printed by Vite. Application routes are `/`, `/budgets`, `/transactions`, `/analytics`, and `/settings`. API docs are at `http://127.0.0.1:8000/docs`.

The dashboard displays embedded demo data when the backend is unavailable. Check health and the interface's data-source status before diagnosing connection issues. Backend records reset on restart.

If a port is occupied, stop the specific process you started or select another port. Update `VITE_MONEYFLOW_API_URL` and restart Vite when changing the backend address. Stop development servers with Ctrl+C in their own terminals; do not terminate every Python or Node process on the machine.
