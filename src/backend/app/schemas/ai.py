"""
Pydantic schemas for AI-related operations.
"""

from typing import Optional, List
from pydantic import BaseModel


class SpendingForecast(BaseModel):
    """Schema for spending forecast data."""
    amount: float
    confidence: float
    trend: str
    change: float
    change_percentage: float


class BudgetForecast(BaseModel):
    """Schema for budget forecast data."""
    category: str
    predicted: float
    current: float
    likelihood: str
    confidence: float


class SavingsProjection(BaseModel):
    """Schema for savings projection data."""
    six_months: float
    one_year: float
    goal_achievement: str
    confidence: float


class AIPrediction(BaseModel):
    """Schema for AI prediction response."""
    next_month_spending: SpendingForecast
    budget_forecasts: List[BudgetForecast]
    savings_projection: SavingsProjection


class FinancialInsight(BaseModel):
    """Schema for financial insight."""
    id: str
    type: str
    title: str
    message: str
    severity: str
    category: str
    actionable: bool
    suggestions: Optional[List[str]] = None
    potential_savings: Optional[float] = None
    progress: Optional[float] = None
    confidence: Optional[float] = None


class BudgetRecommendation(BaseModel):
    """Schema for budget recommendation."""
    category: str
    current_budget: float
    recommended_budget: float
    reasoning: str
    confidence: float
    impact: str
    effort: str
    potential_savings: float


class AIAnalysisRequest(BaseModel):
    """Schema for AI analysis request."""
    user_id: str
    timeframe: str = "month"
    include_forecasting: bool = True
    include_budget_recommendations: bool = True
    include_risk_analysis: bool = True


class AIAnalysisResponse(BaseModel):
    """Schema for AI analysis response."""
    predictions: AIPrediction
    insights: List[FinancialInsight]
    recommendations: List[BudgetRecommendation]
    summary: str
    confidence: float
    generated_at: str
