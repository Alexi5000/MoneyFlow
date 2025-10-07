"""
SQLAlchemy models for Category data.
"""

from sqlalchemy import Column, String, DateTime, ForeignKey, func
from sqlalchemy.ext.declarative import declarative_base
from app.core.database import Base


class Category(Base):
    """Category model for storing transaction categories."""

    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    color = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    parent_id = Column(String, ForeignKey("categories.id"), nullable=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)  # null for global categories
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
