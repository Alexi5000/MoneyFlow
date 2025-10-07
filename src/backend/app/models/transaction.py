"""
SQLAlchemy models for Transaction data.
"""

from sqlalchemy import Column, String, Float, DateTime, Text, Enum, ForeignKey, func
from sqlalchemy.ext.declarative import declarative_base
from app.core.database import Base


class Transaction(Base):
    """Transaction model for storing financial transactions."""

    __tablename__ = "transactions"

    id = Column(String, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    subcategory = Column(String, nullable=True)
    description = Column(Text, nullable=False)
    type = Column(String, nullable=False)  # 'income' or 'expense'
    merchant = Column(String, nullable=True)
    location = Column(String, nullable=True)
    payment_method = Column(String, nullable=True)
    date = Column(DateTime(timezone=True), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
