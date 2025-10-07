"""
Pydantic schemas for User-related operations.
"""

from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    """Base user schema with common fields."""
    name: str
    email: EmailStr
    monthly_income: float = 0.0
    monthly_expenses: float = 0.0
    savings_goal: float = 0.0
    current_savings: float = 0.0


class UserCreate(UserBase):
    """Schema for creating a new user."""
    pass


class UserUpdate(BaseModel):
    """Schema for updating user information."""
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    monthly_income: Optional[float] = None
    monthly_expenses: Optional[float] = None
    savings_goal: Optional[float] = None
    current_savings: Optional[float] = None
    avatar: Optional[str] = None


class UserInDBBase(UserBase):
    """Base schema for user data from database."""
    id: str
    total_balance: float
    avatar: Optional[str] = None

    class Config:
        """Pydantic configuration."""
        from_attributes = True


class User(UserInDBBase):
    """Complete user schema for API responses."""
    pass


class UserProfile(User):
    """User profile with computed financial summaries."""
    pass
