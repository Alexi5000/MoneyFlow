"""
Pydantic schemas for Budget-related operations.
"""

from typing import Optional
from pydantic import BaseModel


class BudgetBase(BaseModel):
    """Base budget schema with common fields."""
    category: str
    allocated: float
    color: str = "#3B82F6"
    icon: str = "💰"


class BudgetCreate(BudgetBase):
    """Schema for creating a new budget."""
    pass


class BudgetUpdate(BaseModel):
    """Schema for updating budget information."""
    category: Optional[str] = None
    allocated: Optional[float] = None
    color: Optional[str] = None
    icon: Optional[str] = None


class BudgetInDBBase(BudgetBase):
    """Base schema for budget data from database."""
    id: str
    spent: float = 0.0
    remaining: float = 0.0
    percentage: float = 0.0
    user_id: str

    class Config:
        """Pydantic configuration."""
        from_attributes = True


class Budget(BudgetInDBBase):
    """Complete budget schema for API responses."""
    pass


class BudgetProgress(Budget):
    """Budget with progress calculations."""
    spent_percentage: float = 0.0
    remaining_percentage: float = 0.0


class BudgetList(BaseModel):
    """Schema for paginated budget list."""
    budgets: list[Budget]
    total_allocated: float
    total_spent: float
    total_remaining: float
