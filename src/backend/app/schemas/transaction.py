"""
Pydantic schemas for Transaction-related operations.
"""

from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from enum import Enum


class TransactionType(str, Enum):
    """Transaction type enumeration."""
    INCOME = "income"
    EXPENSE = "expense"


class TransactionBase(BaseModel):
    """Base transaction schema with common fields."""
    amount: float
    category: str
    subcategory: Optional[str] = None
    description: str
    type: TransactionType
    merchant: Optional[str] = None
    location: Optional[str] = None
    payment_method: Optional[str] = None


class TransactionCreate(TransactionBase):
    """Schema for creating a new transaction."""
    date: Optional[datetime] = None


class TransactionUpdate(BaseModel):
    """Schema for updating transaction information."""
    amount: Optional[float] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    description: Optional[str] = None
    type: Optional[TransactionType] = None
    merchant: Optional[str] = None
    location: Optional[str] = None
    payment_method: Optional[str] = None
    date: Optional[datetime] = None


class TransactionInDBBase(TransactionBase):
    """Base schema for transaction data from database."""
    id: str
    date: datetime
    user_id: str

    class Config:
        """Pydantic configuration."""
        from_attributes = True


class Transaction(TransactionInDBBase):
    """Complete transaction schema for API responses."""
    pass


class TransactionList(BaseModel):
    """Schema for paginated transaction list."""
    transactions: list[Transaction]
    total: int
    page: int
    limit: int
    total_pages: int
