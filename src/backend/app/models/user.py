"""
SQLAlchemy models for User data.
"""

from sqlalchemy import Column, String, Float, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from app.core.database import Base


class User(Base):
    """User model for storing user profile information."""

    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    total_balance = Column(Float, default=0.0)
    monthly_income = Column(Float, default=0.0)
    monthly_expenses = Column(Float, default=0.0)
    savings_goal = Column(Float, default=0.0)
    current_savings = Column(Float, default=0.0)
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
