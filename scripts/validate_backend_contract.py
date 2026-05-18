"""Validate the MoneyFlow FastAPI backend contract.

This script intentionally imports the local backend module and exercises the route
handler functions directly so CI or local maintainers can confirm that seeded data
and API contracts are available without starting a server.
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BACKEND = ROOT / "src" / "backend"
sys.path.insert(0, str(BACKEND))

import main  # noqa: E402


def main_check() -> None:
    dashboard = main.get_dashboard()
    transactions = main.list_transactions()
    budgets = main.list_budgets()
    goals = main.list_goals()
    rules = main.list_rules()
    health = main.health_check()
    route_paths = sorted(
        route.path
        for route in main.app.routes
        if hasattr(route, "path") and (route.path.startswith("/api") or route.path == "/health")
    )

    expected_routes = {
        "/health",
        "/api/v1/dashboard",
        "/api/v1/transactions",
        "/api/v1/transactions/{transaction_id}",
        "/api/v1/budgets",
        "/api/v1/goals",
        "/api/v1/rules",
        "/api/v1/categorize",
        "/api/v1/export",
    }
    missing = expected_routes.difference(route_paths)
    if missing:
        raise AssertionError(f"Missing expected routes: {sorted(missing)}")

    checks = {
        "app_title": main.app.title,
        "health_status": health["status"],
        "transactions": len(transactions),
        "budgets": len(budgets),
        "goals": len(goals),
        "rules": len(rules),
        "category_spend": len(dashboard.category_spend),
        "monthly_trend": len(dashboard.monthly_trend),
        "cashflow_forecast": len(dashboard.cashflow_forecast),
        "recurring_candidates": len(dashboard.recurring_candidates),
        "insights": len(dashboard.insights),
        "routes": route_paths,
    }

    if checks["transactions"] < 1 or checks["budgets"] < 1 or checks["insights"] < 1:
        raise AssertionError(f"Seeded backend data is incomplete: {checks}")

    for key, value in checks.items():
        print(f"{key}={value}")


if __name__ == "__main__":
    main_check()
