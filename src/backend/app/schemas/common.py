"""
Common Pydantic schemas used across the application.
"""

from typing import List, Optional, Any, Dict
from pydantic import BaseModel


class Category(BaseModel):
    """Schema for transaction category."""
    id: str
    name: str
    color: str
    icon: str
    parent_id: Optional[str] = None
    subcategories: Optional[List[str]] = None


class ApiResponse(BaseModel):
    """Generic API response schema."""
    data: Any
    success: bool
    message: Optional[str] = None
    errors: Optional[List[str]] = None


class Pagination(BaseModel):
    """Schema for pagination information."""
    page: int
    limit: int
    total: int
    total_pages: int


class PaginatedResponse(BaseModel):
    """Generic paginated response schema."""
    data: List[Any]
    pagination: Pagination
    success: bool = True


class FilterOptions(BaseModel):
    """Schema for filtering options."""
    date_range: Optional[Dict[str, str]] = None
    categories: Optional[List[str]] = None
    types: Optional[List[str]] = None
    amount_range: Optional[Dict[str, float]] = None
    merchants: Optional[List[str]] = None


class ErrorResponse(BaseModel):
    """Schema for error responses."""
    detail: str
    error_code: Optional[str] = None
    field_errors: Optional[Dict[str, List[str]]] = None


class SuccessResponse(BaseModel):
    """Schema for success responses."""
    message: str
    data: Optional[Any] = None
