"""
SQLAlchemy models for Budget data.
"""

from sqlalchemy import Column, String, Float, DateTime, ForeignKey, func
from sqlalchemy.ext.declarative import declarative_base
from app.core.database import Base


class Budget(Base):
    """Budget model for storing budget information."""

    __tablename__ = "budgets"

    id = Column(String, primary_key=True, index=True)
    category = Column(String, nullable=False)
    allocated = Column(Float, nullable=False)
    spent = Column(Float, default=0.0)
    remaining = Column(Float, default=0.0)
    percentage = Column(Float, default=0.0)
    color = Column(String, default="#3B82F6")
    icon = Column(String, default="💰")
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
