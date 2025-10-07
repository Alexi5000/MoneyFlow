"""
Main API router that includes all v1 API endpoints.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import users, transactions, budgets, categories, ai

# Create the main API router
api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(
    users.router,
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

api_router.include_router(
    transactions.router,
    prefix="/transactions",
    tags=["transactions"],
    responses={404: {"description": "Not found"}},
)

api_router.include_router(
    budgets.router,
    prefix="/budgets",
    tags=["budgets"],
    responses={404: {"description": "Not found"}},
)

api_router.include_router(
    categories.router,
    prefix="/categories",
    tags=["categories"],
    responses={404: {"description": "Not found"}},
)

api_router.include_router(
    ai.router,
    prefix="/ai",
    tags=["ai"],
    responses={404: {"description": "Not found"}},
)
