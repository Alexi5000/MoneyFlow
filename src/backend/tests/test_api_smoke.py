from fastapi.testclient import TestClient

from src.backend.main import app


client = TestClient(app)


def test_health_and_dashboard_contract_are_available() -> None:
    health = client.get("/health")
    assert health.status_code == 200
    assert health.json()["status"] == "healthy"

    dashboard = client.get("/api/v1/dashboard")
    assert dashboard.status_code == 200
    payload = dashboard.json()
    assert payload["summary"]["transactions_count"] >= 1
    assert payload["monthly_trend"]
    assert payload["insights"]


def test_known_and_fallback_categorization_are_explainable() -> None:
    known = client.post("/api/v1/categorize", params={"merchant": "Cursor Pro"})
    assert known.status_code == 200
    assert known.json() == {
        "merchant": "Cursor Pro",
        "category": "Software",
        "confidence": 0.98,
        "source": "rule",
    }

    fallback = client.post("/api/v1/categorize", params={"merchant": "Neighborhood Cafe"})
    assert fallback.status_code == 200
    assert fallback.json()["category"] == "Dining"
    assert fallback.json()["source"] == "ai-fallback"


def test_transaction_creation_is_filterable_and_reversible() -> None:
    create = client.post(
        "/api/v1/transactions",
        json={
            "merchant": "MoneyFlow smoke market",
            "category": "Groceries",
            "amount": 12.34,
            "type": "expense",
            "note": "temporary API smoke fixture",
        },
    )
    assert create.status_code == 201
    transaction = create.json()
    assert transaction["merchant"] == "MoneyFlow smoke market"

    try:
        listed = client.get("/api/v1/transactions", params={"search": "smoke market"})
        assert listed.status_code == 200
        assert [item["id"] for item in listed.json()] == [transaction["id"]]
    finally:
        deleted = client.delete(f"/api/v1/transactions/{transaction['id']}")
        assert deleted.status_code == 200
        assert deleted.json() == {"deleted": True, "id": transaction["id"]}


def test_export_includes_all_seeded_resource_collections() -> None:
    response = client.get("/api/v1/export")
    assert response.status_code == 200
    payload = response.json()
    assert payload["transactions"]
    assert payload["budgets"]
    assert payload["goals"]
    assert payload["rules"]
    assert payload["exportedAt"].endswith("Z")
