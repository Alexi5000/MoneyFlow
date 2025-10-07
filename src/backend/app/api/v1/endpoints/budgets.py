"""
Budget management API endpoints.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.budget import Budget
from app.models.user import User
from app.schemas.budget import BudgetCreate, BudgetUpdate, Budget, BudgetList
from app.schemas.common import ApiResponse

router = APIRouter()


@router.get("/", response_model=ApiResponse[BudgetList])
async def get_budgets(db: Session = Depends(get_db)):
    """Get all budgets for current user."""
    try:
        # Get current user
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Get user's budgets
        budgets = db.query(Budget).filter(Budget.user_id == user.id).all()

        # Calculate totals
        total_allocated = sum(budget.allocated for budget in budgets)
        total_spent = sum(budget.spent for budget in budgets)
        total_remaining = sum(budget.remaining for budget in budgets)

        return ApiResponse(
            data=BudgetList(
                budgets=budgets,
                total_allocated=total_allocated,
                total_spent=total_spent,
                total_remaining=total_remaining
            ),
            success=True
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching budgets: {str(e)}"
        )


@router.post("/", response_model=ApiResponse[Budget])
async def create_budget(budget: BudgetCreate, db: Session = Depends(get_db)):
    """Create a new budget."""
    try:
        # Get current user
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Create budget
        db_budget = Budget(
            **budget.dict(),
            user_id=user.id,
            spent=0.0,
            remaining=budget.allocated,
            percentage=0.0
        )

        db.add(db_budget)
        db.commit()
        db.refresh(db_budget)

        return ApiResponse(
            data=db_budget,
            success=True,
            message="Budget created successfully"
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating budget: {str(e)}"
        )


@router.get("/{budget_id}", response_model=ApiResponse[Budget])
async def get_budget(budget_id: str, db: Session = Depends(get_db)):
    """Get budget by ID."""
    try:
        budget = db.query(Budget).filter(Budget.id == budget_id).first()
        if not budget:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Budget not found"
            )

        return ApiResponse(data=budget, success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching budget: {str(e)}"
        )


@router.put("/{budget_id}", response_model=ApiResponse[Budget])
async def update_budget(
    budget_id: str,
    budget_update: BudgetUpdate,
    db: Session = Depends(get_db)
):
    """Update budget."""
    try:
        # Get existing budget
        budget = db.query(Budget).filter(Budget.id == budget_id).first()
        if not budget:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Budget not found"
            )

        # Get current user to verify ownership
        user = db.query(User).first()
        if budget.user_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this budget"
            )

        # Update fields
        update_data = budget_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            if hasattr(budget, field):
                setattr(budget, field, value)

        # Recalculate remaining amount
        budget.remaining = budget.allocated - budget.spent
        budget.percentage = (budget.spent / budget.allocated * 100) if budget.allocated > 0 else 0

        db.commit()
        db.refresh(budget)

        return ApiResponse(
            data=budget,
            success=True,
            message="Budget updated successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating budget: {str(e)}"
        )


@router.delete("/{budget_id}", response_model=ApiResponse[dict])
async def delete_budget(budget_id: str, db: Session = Depends(get_db)):
    """Delete budget."""
    try:
        # Get budget
        budget = db.query(Budget).filter(Budget.id == budget_id).first()
        if not budget:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Budget not found"
            )

        # Get current user to verify ownership
        user = db.query(User).first()
        if budget.user_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this budget"
            )

        # Delete budget
        db.delete(budget)
        db.commit()

        return ApiResponse(
            data={"deleted": True},
            success=True,
            message="Budget deleted successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting budget: {str(e)}"
        )
