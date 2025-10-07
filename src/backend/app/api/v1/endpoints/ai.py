"""
AI-powered analytics and prediction API endpoints.
"""

import random
from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.transaction import Transaction
from app.models.budget import Budget
from app.schemas.ai import (
    AIPrediction, AIAnalysisRequest, AIAnalysisResponse,
    FinancialInsight, BudgetRecommendation
)
from app.schemas.common import ApiResponse

router = APIRouter()


@router.get("/predictions", response_model=ApiResponse[AIPrediction])
async def get_predictions(db: Session = Depends(get_db)):
    """Get AI-powered financial predictions."""
    try:
        # Get current user
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Get user's transactions and budgets for analysis
        transactions = db.query(Transaction).filter(
            Transaction.user_id == user.id
        ).all()

        budgets = db.query(Budget).filter(
            Budget.user_id == user.id
        ).all()

        # Generate mock predictions (in production, use real AI/ML models)
        prediction = AIPrediction(
            next_month_spending={
                "amount": user.monthly_expenses * 1.05,  # 5% increase
                "confidence": 0.75,
                "trend": "increasing",
                "change": user.monthly_expenses * 0.05,
                "change_percentage": 5.0
            },
            budget_forecasts=[
                {
                    "category": budget.category,
                    "predicted": budget.allocated * 1.1,
                    "current": budget.allocated,
                    "likelihood": "high" if budget.spent > budget.allocated * 0.8 else "medium",
                    "confidence": 0.8
                }
                for budget in budgets
            ],
            savings_projection={
                "six_months": user.current_savings * 1.15,  # 15% growth
                "one_year": user.current_savings * 1.32,   # 32% growth
                "goal_achievement": "on_track" if user.current_savings > user.savings_goal * 0.5 else "needs_improvement",
                "confidence": 0.7
            }
        )

        return ApiResponse(data=prediction, success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating predictions: {str(e)}"
        )


@router.get("/insights", response_model=ApiResponse[List[FinancialInsight]])
async def get_insights(db: Session = Depends(get_db)):
    """Get AI-powered financial insights."""
    try:
        # Get current user
        user = db.query(User).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Generate mock insights (in production, use real AI analysis)
        insights = [
            FinancialInsight(
                id="insight_1",
                type="spending_alert",
                title="High Dining Expenses",
                message="You've spent 25% more on dining out this month compared to last month.",
                severity="warning",
                category="Food & Dining",
                actionable=True,
                suggestions=["Consider cooking at home 2-3 times per week", "Set a weekly dining budget"],
                potential_savings=150.0,
                confidence=0.85
            ),
            FinancialInsight(
                id="insight_2",
                type="savings_opportunity",
                title="Emergency Fund Growth",
                message="You're consistently saving 20% of your income. Consider increasing your savings rate to 25%.",
                severity="info",
                category="Savings",
                actionable=True,
                suggestions=["Increase automatic savings transfer by 5%", "Set up round-up savings"],
                potential_savings=300.0,
                confidence=0.9
            ),
            FinancialInsight(
                id="insight_3",
                type="positive_trend",
                title="Transportation Savings",
                message="Great job reducing transportation costs by 15% this month!",
                severity="success",
                category="Transportation",
                actionable=False,
                confidence=0.95
            )
        ]

        return ApiResponse(data=insights, success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating insights: {str(e)}"
        )


@router.get("/recommendations", response_model=ApiResponse[List[BudgetRecommendation]])
async def get_recommendations(db: Session = Depends(get_db)):
    """Get AI-powered budget recommendations."""
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

        # Generate mock recommendations (in production, use real AI analysis)
        recommendations = [
            BudgetRecommendation(
                category="Food & Dining",
                current_budget=800.0,
                recommended_budget=650.0,
                reasoning="Based on your spending patterns, you consistently spend less than your current budget in this category.",
                confidence=0.8,
                impact="medium",
                effort="low",
                potential_savings=150.0
            ),
            BudgetRecommendation(
                category="Entertainment",
                current_budget=300.0,
                recommended_budget=350.0,
                reasoning="Your entertainment spending has increased 20% month-over-month. Consider a slight budget increase.",
                confidence=0.75,
                impact="low",
                effort="low",
                potential_savings=-50.0
            ),
            BudgetRecommendation(
                category="Transportation",
                current_budget=400.0,
                recommended_budget=380.0,
                reasoning="You've been consistently under budget in transportation. A small reduction would be appropriate.",
                confidence=0.85,
                impact="low",
                effort="low",
                potential_savings=20.0
            )
        ]

        return ApiResponse(data=recommendations, success=True)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating recommendations: {str(e)}"
        )


@router.post("/analyze", response_model=ApiResponse[AIAnalysisResponse])
async def analyze_finances(
    request: AIAnalysisRequest,
    db: Session = Depends(get_db)
):
    """Perform comprehensive AI analysis of user's finances."""
    try:
        # Get current user
        user = db.query(User).filter(User.id == request.user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Get user's financial data
        transactions = db.query(Transaction).filter(
            Transaction.user_id == user.id
        ).all()

        budgets = db.query(Budget).filter(
            Budget.user_id == user.id
        ).all()

        # Generate comprehensive analysis (in production, use real AI models)
        # For now, return the same data as individual endpoints
        prediction = AIPrediction(
            next_month_spending={
                "amount": user.monthly_expenses * 1.05,
                "confidence": 0.75,
                "trend": "increasing",
                "change": user.monthly_expenses * 0.05,
                "change_percentage": 5.0
            },
            budget_forecasts=[
                {
                    "category": budget.category,
                    "predicted": budget.allocated * 1.1,
                    "current": budget.allocated,
                    "likelihood": "high" if budget.spent > budget.allocated * 0.8 else "medium",
                    "confidence": 0.8
                }
                for budget in budgets
            ],
            savings_projection={
                "six_months": user.current_savings * 1.15,
                "one_year": user.current_savings * 1.32,
                "goal_achievement": "on_track" if user.current_savings > user.savings_goal * 0.5 else "needs_improvement",
                "confidence": 0.7
            }
        )

        insights = [
            FinancialInsight(
                id="insight_1",
                type="spending_alert",
                title="High Dining Expenses",
                message="You've spent 25% more on dining out this month compared to last month.",
                severity="warning",
                category="Food & Dining",
                actionable=True,
                suggestions=["Consider cooking at home 2-3 times per week", "Set a weekly dining budget"],
                potential_savings=150.0,
                confidence=0.85
            ),
            FinancialInsight(
                id="insight_2",
                type="savings_opportunity",
                title="Emergency Fund Growth",
                message="You're consistently saving 20% of your income. Consider increasing your savings rate to 25%.",
                severity="info",
                category="Savings",
                actionable=True,
                suggestions=["Increase automatic savings transfer by 5%", "Set up round-up savings"],
                potential_savings=300.0,
                confidence=0.9
            )
        ]

        recommendations = [
            BudgetRecommendation(
                category="Food & Dining",
                current_budget=800.0,
                recommended_budget=650.0,
                reasoning="Based on your spending patterns, you consistently spend less than your current budget in this category.",
                confidence=0.8,
                impact="medium",
                effort="low",
                potential_savings=150.0
            )
        ]

        analysis_response = AIAnalysisResponse(
            predictions=prediction,
            insights=insights,
            recommendations=recommendations,
            summary="Comprehensive financial analysis completed. Focus on dining expenses and consider increasing savings rate.",
            confidence=0.82,
            generated_at=datetime.utcnow().isoformat()
        )

        return ApiResponse(
            data=analysis_response,
            success=True,
            message="Financial analysis completed successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error performing financial analysis: {str(e)}"
        )
