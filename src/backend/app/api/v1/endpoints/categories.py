"""
Category management API endpoints.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.category import Category as CategoryModel
from app.models.user import User
from app.schemas.common import ApiResponse, Category

router = APIRouter()


@router.get("/", response_model=ApiResponse[List[Category]])
async def get_categories(db: Session = Depends(get_db)):
    """Get all categories (global categories only)."""
    try:
        # Get global categories (no user_id filter for system categories)
        categories = db.query(CategoryModel).filter(CategoryModel.user_id.is_(None)).all()

        return ApiResponse(data=[Category.model_validate(cat) for cat in categories], success=True)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching categories: {str(e)}"
        )


@router.get("/user", response_model=ApiResponse[List[Category]])
async def get_user_categories(db: Session = Depends(get_db)):
    """Get categories for current user (including user-specific ones)."""
    try:
        # Get current user
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Get user's categories + global categories
        user_categories = db.query(CategoryModel).filter(
            CategoryModel.user_id == user.id
        ).all()

        global_categories = db.query(CategoryModel).filter(
            CategoryModel.user_id.is_(None)
        ).all()

        # Combine and return all categories
        all_categories = global_categories + user_categories

        return ApiResponse(data=[Category.model_validate(cat) for cat in all_categories], success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching user categories: {str(e)}"
        )
