"""
Transaction management API endpoints.
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, desc
from datetime import datetime, timedelta

from app.core.database import get_db
from app.models.transaction import Transaction
from app.models.user import User
from app.schemas.transaction import (
    TransactionCreate, TransactionUpdate, Transaction,
    TransactionList, TransactionType
)
from app.schemas.common import ApiResponse, FilterOptions

router = APIRouter()


@router.get("/", response_model=ApiResponse[TransactionList])
async def get_transactions(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    category: Optional[str] = Query(None),
    type_filter: Optional[TransactionType] = Query(None),
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    db: Session = Depends(get_db)
):
    """Get transactions with optional filtering and pagination."""
    try:
        # Get current user (in production, from JWT token)
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Build query
        query = db.query(Transaction).filter(Transaction.user_id == user.id)

        # Apply filters
        if category:
            query = query.filter(Transaction.category == category)

        if type_filter:
            query = query.filter(Transaction.type == type_filter.value)

        if start_date:
            query = query.filter(Transaction.date >= start_date)

        if end_date:
            query = query.filter(Transaction.date <= end_date)

        # Order by date (newest first)
        query = query.order_by(desc(Transaction.date))

        # Get total count for pagination
        total = query.count()

        # Apply pagination
        transactions = query.offset(skip).limit(limit).all()

        # Calculate total pages
        total_pages = (total + limit - 1) // limit

        return ApiResponse(
            data=TransactionList(
                transactions=transactions,
                total=total,
                page=(skip // limit) + 1,
                limit=limit,
                total_pages=total_pages
            ),
            success=True
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching transactions: {str(e)}"
        )


@router.get("/recent", response_model=ApiResponse[List[Transaction]])
async def get_recent_transactions(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get recent transactions."""
    try:
        # Get current user
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Get recent transactions
        transactions = (
            db.query(Transaction)
            .filter(Transaction.user_id == user.id)
            .order_by(desc(Transaction.date))
            .limit(limit)
            .all()
        )

        return ApiResponse(data=transactions, success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching recent transactions: {str(e)}"
        )


@router.post("/", response_model=ApiResponse[Transaction])
async def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db)
):
    """Create a new transaction."""
    try:
        # Get current user
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Create transaction
        db_transaction = Transaction(
            **transaction.dict(),
            user_id=user.id
        )

        db.add(db_transaction)
        db.commit()
        db.refresh(db_transaction)

        # Update user balance
        if transaction.type == TransactionType.INCOME:
            user.total_balance += transaction.amount
        else:
            user.total_balance -= transaction.amount

        db.commit()

        return ApiResponse(
            data=db_transaction,
            success=True,
            message="Transaction created successfully"
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating transaction: {str(e)}"
        )


@router.get("/{transaction_id}", response_model=ApiResponse[Transaction])
async def get_transaction(transaction_id: str, db: Session = Depends(get_db)):
    """Get transaction by ID."""
    try:
        transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
        if not transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transaction not found"
            )

        return ApiResponse(data=transaction, success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching transaction: {str(e)}"
        )


@router.put("/{transaction_id}", response_model=ApiResponse[Transaction])
async def update_transaction(
    transaction_id: str,
    transaction_update: TransactionUpdate,
    db: Session = Depends(get_db)
):
    """Update transaction."""
    try:
        # Get existing transaction
        transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
        if not transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transaction not found"
            )

        # Get current user to verify ownership
        user = db.query(User).first()
        if transaction.user_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this transaction"
            )

        # Update fields
        update_data = transaction_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            if hasattr(transaction, field):
                setattr(transaction, field, value)

        db.commit()
        db.refresh(transaction)

        return ApiResponse(
            data=transaction,
            success=True,
            message="Transaction updated successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating transaction: {str(e)}"
        )


@router.delete("/{transaction_id}", response_model=ApiResponse[dict])
async def delete_transaction(transaction_id: str, db: Session = Depends(get_db)):
    """Delete transaction."""
    try:
        # Get transaction
        transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
        if not transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Transaction not found"
            )

        # Get current user to verify ownership
        user = db.query(User).first()
        if transaction.user_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this transaction"
            )

        # Store amount for balance adjustment
        amount = transaction.amount

        # Delete transaction
        db.delete(transaction)
        db.commit()

        # Update user balance
        if transaction.type == TransactionType.INCOME:
            user.total_balance -= amount
        else:
            user.total_balance += amount

        db.commit()

        return ApiResponse(
            data={"deleted": True},
            success=True,
            message="Transaction deleted successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting transaction: {str(e)}"
        )
