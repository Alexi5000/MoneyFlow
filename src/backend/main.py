"""
MoneyFlow Backend API Server.

This module provides a complete FastAPI application for the MoneyFlow personal
finance platform. It intentionally uses an in-memory seed store for a reliable
self-contained demo while preserving clean API contracts that can be migrated to
SQLAlchemy or PostgreSQL without changing the frontend integration surface.
"""

from __future__ import annotations

from collections import defaultdict
from datetime import date as Date, datetime, timedelta
from enum import Enum
from statistics import mean
from typing import Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


class TransactionType(str, Enum):
    income = "income"
    expense = "expense"
    transfer = "transfer"


class Transaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    date: Date
    merchant: str
    category: str
    amount: float
    type: TransactionType
    account: str = "Everyday Checking"
    note: str | None = None
    recurring: bool = False
    confidence: float = Field(default=0.92, ge=0, le=1)


class TransactionCreate(BaseModel):
    date: Date = Field(default_factory=Date.today)
    merchant: str = Field(min_length=2)
    category: str = Field(min_length=2)
    amount: float = Field(gt=0)
    type: TransactionType
    account: str = "Everyday Checking"
    note: str | None = None
    recurring: bool = False


class Budget(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    category: str
    limit: float = Field(gt=0)
    period: Literal["monthly", "weekly", "annual"] = "monthly"
    color: str = "#8b5cf6"


class Goal(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    target: float = Field(gt=0)
    saved: float = Field(ge=0)
    due_date: Date
    priority: Literal["low", "medium", "high"] = "medium"


class CategoryRule(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    pattern: str
    category: str
    transaction_type: TransactionType = TransactionType.expense
    confidence: float = Field(default=0.9, ge=0, le=1)


class Insight(BaseModel):
    id: str
    title: str
    description: str
    severity: Literal["positive", "neutral", "warning", "critical"]
    impact: float
    action: str


class DashboardSummary(BaseModel):
    net_worth: float
    monthly_income: float
    monthly_expenses: float
    savings_rate: float
    cash_flow: float
    budget_used_percent: float
    runway_months: float
    transactions_count: int


class AnalyticsResponse(BaseModel):
    summary: DashboardSummary
    category_spend: list[dict]
    monthly_trend: list[dict]
    cashflow_forecast: list[dict]
    recurring_candidates: list[dict]
    insights: list[Insight]


TODAY = Date.today()
CURRENT_MONTH_START = TODAY.replace(day=1)

transactions: list[Transaction] = [
    Transaction(date=CURRENT_MONTH_START, merchant="TechTide Labs", category="Salary", amount=8250, type="income", account="Everyday Checking", recurring=True, confidence=0.99),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=1), merchant="Figma Subscription", category="Software", amount=18, type="expense", account="Founder Card", recurring=True, confidence=0.96),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=2), merchant="Developer Tools", category="Software", amount=20, type="expense", account="Founder Card", recurring=True, confidence=0.98),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=3), merchant="Whole Foods", category="Groceries", amount=124.38, type="expense", account="Everyday Checking", confidence=0.91),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=4), merchant="Blue Bottle Coffee", category="Dining", amount=16.45, type="expense", account="Everyday Checking", confidence=0.88),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=5), merchant="MTA", category="Transportation", amount=34, type="expense", account="Everyday Checking", recurring=True, confidence=0.93),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=6), merchant="Notion", category="Software", amount=10, type="expense", account="Founder Card", recurring=True, confidence=0.97),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=7), merchant="Landlord", category="Housing", amount=2450, type="expense", account="Everyday Checking", recurring=True, confidence=0.99),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=8), merchant="Con Edison", category="Utilities", amount=142.22, type="expense", account="Everyday Checking", recurring=True, confidence=0.95),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=9), merchant="Client Retainer", category="Consulting", amount=2100, type="income", account="Business Reserve", recurring=True, confidence=0.94),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=10), merchant="Amazon", category="Shopping", amount=76.19, type="expense", account="Founder Card", confidence=0.84),
    Transaction(date=CURRENT_MONTH_START + timedelta(days=11), merchant="Delta", category="Travel", amount=348.27, type="expense", account="Founder Card", confidence=0.89),
]

budgets: list[Budget] = [
    Budget(category="Housing", limit=2600, color="#f97316"),
    Budget(category="Groceries", limit=650, color="#22c55e"),
    Budget(category="Dining", limit=420, color="#f43f5e"),
    Budget(category="Transportation", limit=220, color="#06b6d4"),
    Budget(category="Software", limit=180, color="#8b5cf6"),
    Budget(category="Shopping", limit=350, color="#eab308"),
    Budget(category="Travel", limit=500, color="#3b82f6"),
    Budget(category="Utilities", limit=260, color="#14b8a6"),
]

goals: list[Goal] = [
    Goal(name="Emergency runway", target=25000, saved=14350, due_date=TODAY + timedelta(days=210), priority="high"),
    Goal(name="Tax reserve", target=12000, saved=6800, due_date=TODAY + timedelta(days=120), priority="high"),
    Goal(name="Engineering workstation", target=4200, saved=2100, due_date=TODAY + timedelta(days=95), priority="medium"),
]

rules: list[CategoryRule] = [
    CategoryRule(pattern="cursor", category="Software", confidence=0.98),
    CategoryRule(pattern="notion", category="Software", confidence=0.97),
    CategoryRule(pattern="whole foods", category="Groceries", confidence=0.95),
    CategoryRule(pattern="landlord", category="Housing", confidence=0.99),
]


def month_key(value: Date) -> str:
    return value.strftime("%b %Y")


def monthly_transactions() -> list[Transaction]:
    return [item for item in transactions if item.date >= CURRENT_MONTH_START]


def build_summary() -> DashboardSummary:
    current = monthly_transactions()
    income = sum(item.amount for item in current if item.type == TransactionType.income)
    expenses = sum(item.amount for item in current if item.type == TransactionType.expense)
    cash_flow = income - expenses
    total_budget = sum(item.limit for item in budgets)
    budget_used_percent = round((expenses / total_budget) * 100, 2) if total_budget else 0
    savings_rate = round((cash_flow / income) * 100, 2) if income else 0
    runway_months = round((sum(goal.saved for goal in goals) + cash_flow) / max(expenses, 1), 1)
    net_worth = 76420 + cash_flow + sum(goal.saved for goal in goals)
    return DashboardSummary(
        net_worth=round(net_worth, 2),
        monthly_income=round(income, 2),
        monthly_expenses=round(expenses, 2),
        savings_rate=savings_rate,
        cash_flow=round(cash_flow, 2),
        budget_used_percent=budget_used_percent,
        runway_months=runway_months,
        transactions_count=len(transactions),
    )


def build_category_spend() -> list[dict]:
    spend_by_category: dict[str, float] = defaultdict(float)
    for item in monthly_transactions():
        if item.type == TransactionType.expense:
            spend_by_category[item.category] += item.amount
    budget_lookup = {item.category: item for item in budgets}
    return [
        {
            "category": category,
            "amount": round(amount, 2),
            "budget": budget_lookup.get(category).limit if category in budget_lookup else None,
            "color": budget_lookup.get(category).color if category in budget_lookup else "#64748b",
            "usedPercent": round((amount / budget_lookup[category].limit) * 100, 2) if category in budget_lookup else None,
        }
        for category, amount in sorted(spend_by_category.items(), key=lambda pair: pair[1], reverse=True)
    ]


def build_monthly_trend() -> list[dict]:
    rows = []
    base_income = 7800
    base_expense = 4200
    for index in range(5, -1, -1):
        anchor = (CURRENT_MONTH_START - timedelta(days=30 * index)).replace(day=1)
        if index == 0:
            income = sum(item.amount for item in monthly_transactions() if item.type == TransactionType.income)
            expenses = sum(item.amount for item in monthly_transactions() if item.type == TransactionType.expense)
        else:
            income = base_income + (5 - index) * 180
            expenses = base_expense + ((index % 3) * 240) - (5 - index) * 80
        rows.append({"month": month_key(anchor), "income": round(income, 2), "expenses": round(expenses, 2), "savings": round(income - expenses, 2)})
    return rows


def build_forecast() -> list[dict]:
    current = build_summary()
    trend = build_monthly_trend()
    savings_values = [row["savings"] for row in trend]
    avg_savings = mean(savings_values) if savings_values else current.cash_flow
    rows = []
    projected_balance = current.net_worth
    for month in range(1, 7):
        expected = avg_savings * (1 + month * 0.012)
        projected_balance += expected
        rows.append({"period": f"+{month}M", "projectedNetWorth": round(projected_balance, 2), "expectedSavings": round(expected, 2)})
    return rows


def build_recurring_candidates() -> list[dict]:
    return [
        {
            "merchant": item.merchant,
            "category": item.category,
            "amount": item.amount,
            "cadence": "monthly",
            "confidence": item.confidence,
            "nextExpectedDate": (item.date + timedelta(days=30)).isoformat(),
        }
        for item in transactions
        if item.recurring
    ]


def build_insights() -> list[Insight]:
    summary = build_summary()
    category_spend = build_category_spend()
    top_category = category_spend[0] if category_spend else {"category": "spending", "amount": 0, "usedPercent": 0}
    return [
        Insight(
            id="savings-rate",
            title="Strong savings momentum",
            description=f"Your current savings rate is {summary.savings_rate}%, which gives you a healthy runway for upcoming goals.",
            severity="positive" if summary.savings_rate >= 25 else "neutral",
            impact=summary.savings_rate,
            action="Route surplus cash into the highest-priority goal before discretionary spend expands.",
        ),
        Insight(
            id="top-category",
            title=f"{top_category['category']} is the leading expense area",
            description=f"This category accounts for ${top_category['amount']:,.2f} of current-month expenses.",
            severity="warning" if top_category.get("usedPercent", 0) and top_category["usedPercent"] > 85 else "neutral",
            impact=float(top_category["amount"]),
            action="Review upcoming recurring charges and decide whether any can be paused or renegotiated.",
        ),
        Insight(
            id="automation",
            title="Automation opportunity detected",
            description=f"MoneyFlow found {len(build_recurring_candidates())} recurring patterns that can power cash-flow forecasts.",
            severity="positive",
            impact=len(build_recurring_candidates()),
            action="Turn recurring candidates into rules so future imports are categorized automatically.",
        ),
    ]


app = FastAPI(
    title="MoneyFlow API",
    description="intelligent budget tracker API with analytics, budgets, goals, rules, and forecast endpoints.",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict:
    return {
        "status": "healthy",
        "service": "moneyflow-api",
        "version": "2.0.0",
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }


@app.get("/api/v1/dashboard", response_model=AnalyticsResponse)
def get_dashboard() -> AnalyticsResponse:
    return AnalyticsResponse(
        summary=build_summary(),
        category_spend=build_category_spend(),
        monthly_trend=build_monthly_trend(),
        cashflow_forecast=build_forecast(),
        recurring_candidates=build_recurring_candidates(),
        insights=build_insights(),
    )


@app.get("/api/v1/transactions", response_model=list[Transaction])
def list_transactions(
    search: str | None = None,
    category: str | None = None,
    transaction_type: TransactionType | None = None,
) -> list[Transaction]:
    rows = transactions
    if search:
        needle = search.lower()
        rows = [item for item in rows if needle in item.merchant.lower() or needle in item.category.lower() or (item.note and needle in item.note.lower())]
    if category:
        rows = [item for item in rows if item.category.lower() == category.lower()]
    if transaction_type:
        rows = [item for item in rows if item.type == transaction_type]
    return sorted(rows, key=lambda item: item.date, reverse=True)


@app.post("/api/v1/transactions", response_model=Transaction, status_code=201)
def create_transaction(payload: TransactionCreate) -> Transaction:
    matched_rule = next((rule for rule in rules if rule.pattern.lower() in payload.merchant.lower()), None)
    payload_data = payload.model_dump()
    payload_data["category"] = matched_rule.category if matched_rule else payload.category
    transaction = Transaction(**payload_data, confidence=matched_rule.confidence if matched_rule else 0.86)
    transactions.append(transaction)
    return transaction


@app.delete("/api/v1/transactions/{transaction_id}")
def delete_transaction(transaction_id: str) -> dict:
    for index, item in enumerate(transactions):
        if item.id == transaction_id:
            transactions.pop(index)
            return {"deleted": True, "id": transaction_id}
    raise HTTPException(status_code=404, detail="Transaction not found")


@app.get("/api/v1/budgets", response_model=list[Budget])
def list_budgets() -> list[Budget]:
    return budgets


@app.get("/api/v1/goals", response_model=list[Goal])
def list_goals() -> list[Goal]:
    return goals


@app.get("/api/v1/rules", response_model=list[CategoryRule])
def list_rules() -> list[CategoryRule]:
    return rules


@app.post("/api/v1/categorize")
def categorize_merchant(merchant: str = Query(..., min_length=2)) -> dict:
    matched_rule = next((rule for rule in rules if rule.pattern.lower() in merchant.lower()), None)
    if matched_rule:
        return {"merchant": merchant, "category": matched_rule.category, "confidence": matched_rule.confidence, "source": "rule"}
    fallback = "Dining" if any(word in merchant.lower() for word in ["coffee", "cafe", "restaurant"]) else "Shopping"
    return {"merchant": merchant, "category": fallback, "confidence": 0.72, "source": "ai-fallback"}


@app.get("/api/v1/export")
def export_data() -> dict:
    return {
        "exportedAt": datetime.utcnow().isoformat() + "Z",
        "transactions": [item.model_dump(mode="json") for item in transactions],
        "budgets": [item.model_dump(mode="json") for item in budgets],
        "goals": [item.model_dump(mode="json") for item in goals],
        "rules": [item.model_dump(mode="json") for item in rules],
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
