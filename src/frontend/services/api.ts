import {
  ApiResponse,
  AIPrediction,
  Budget,
  BudgetRecommendation,
  Category,
  FinancialInsight,
  Transaction,
  User,
} from '../types'

type BackendUser = {
  id: string
  name: string
  email: string
  total_balance: number
  monthly_income: number
  monthly_expenses: number
  savings_goal: number
  current_savings: number
  avatar?: string
}

type BackendTransaction = {
  id: string
  amount: number
  category: string
  subcategory?: string
  description: string
  date: string
  type: 'income' | 'expense'
  merchant?: string
  location?: string
  payment_method?: string
}

type BackendBudget = Budget & {
  user_id?: string
}

type BackendBudgetList = {
  budgets: BackendBudget[]
  total_allocated: number
  total_spent: number
  total_remaining: number
}

type BackendPrediction = {
  next_month_spending: {
    amount: number
    confidence: number
    trend: 'increasing' | 'decreasing' | 'stable'
    change?: number
    change_percentage: number
  }
  budget_forecasts: AIPrediction['budgetForecasts']
  savings_projection: {
    six_months: number
    one_year: number
    goal_achievement: string
    confidence: number
  }
  spending_patterns?: AIPrediction['spendingPatterns']
  risk_analysis?: AIPrediction['riskAnalysis']
}

type BackendRecommendation = {
  category: string
  current_budget: number
  recommended_budget: number
  reasoning: string
  confidence: number
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  potential_savings: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1'

const normalizeUser = (user: BackendUser): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  totalBalance: user.total_balance,
  monthlyIncome: user.monthly_income,
  monthlyExpenses: user.monthly_expenses,
  savingsGoal: user.savings_goal,
  currentSavings: user.current_savings,
  avatar: user.avatar,
})

const normalizeTransaction = (transaction: BackendTransaction): Transaction => ({
  id: transaction.id,
  amount: transaction.amount,
  category: transaction.category,
  subcategory: transaction.subcategory,
  description: transaction.description,
  date: transaction.date,
  type: transaction.type,
  merchant: transaction.merchant,
  location: transaction.location,
  paymentMethod: transaction.payment_method,
})

const normalizePrediction = (prediction: BackendPrediction): AIPrediction => ({
  nextMonthSpending: {
    amount: prediction.next_month_spending.amount,
    confidence: prediction.next_month_spending.confidence,
    trend: prediction.next_month_spending.trend,
    changePercentage: prediction.next_month_spending.change_percentage,
  },
  budgetForecasts: prediction.budget_forecasts,
  savingsProjection: {
    sixMonths: prediction.savings_projection.six_months,
    oneYear: prediction.savings_projection.one_year,
    goalAchievement: prediction.savings_projection.goal_achievement,
    confidence: prediction.savings_projection.confidence,
  },
  spendingPatterns: prediction.spending_patterns ?? {
    peakDays: [],
    peakHours: [],
    seasonalTrends: {},
    averageTransactionSize: 0,
  },
  riskAnalysis: prediction.risk_analysis ?? {
    overbudgetRisk: {
      level: 'low',
      categories: [],
      probability: 0,
    },
    emergencyFundStatus: {
      recommended: 0,
      current: 0,
      shortfall: 0,
      monthsToGoal: 0,
    },
  },
})

const normalizeRecommendation = (recommendation: BackendRecommendation): BudgetRecommendation => ({
  category: recommendation.category,
  currentBudget: recommendation.current_budget,
  recommendedBudget: recommendation.recommended_budget,
  reasoning: recommendation.reasoning,
  confidence: recommendation.confidence,
  impact: recommendation.impact,
  effort: recommendation.effort,
  potentialSavings: recommendation.potential_savings,
})

const toBackendTransaction = (transaction: Partial<Transaction>): Record<string, unknown> => ({
  ...transaction,
  payment_method: transaction.paymentMethod,
})

// API service for MoneyFlow backend
class ApiService {
  private readonly baseUrl = API_BASE_URL

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  }

  async getUser(): Promise<User> {
    const response = await this.request<ApiResponse<BackendUser>>('/users/me')
    return normalizeUser(response.data)
  }

  async getTransactions(): Promise<Transaction[]> {
    const response = await this.request<ApiResponse<BackendTransaction[]>>('/transactions/recent?limit=20')
    return response.data.map(normalizeTransaction)
  }

  async getBudgets(): Promise<Budget[]> {
    const response = await this.request<ApiResponse<BackendBudgetList>>('/budgets/')
    return response.data.budgets
  }

  async getAIInsights(): Promise<FinancialInsight[]> {
    const response = await this.request<ApiResponse<FinancialInsight[]>>('/ai/insights')
    return response.data
  }

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const response = await this.request<ApiResponse<BackendTransaction>>('/transactions/', {
      method: 'POST',
      body: JSON.stringify(toBackendTransaction(transaction)),
    })
    return normalizeTransaction(response.data)
  }

  async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await this.request<ApiResponse<BackendTransaction>>(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toBackendTransaction(transaction)),
    })
    return normalizeTransaction(response.data)
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.request<ApiResponse<{ deleted: boolean }>>(`/transactions/${id}`, {
      method: 'DELETE',
    })
  }

  async createBudget(budget: Omit<Budget, 'id'>): Promise<Budget> {
    const response = await this.request<ApiResponse<Budget>>('/budgets/', {
      method: 'POST',
      body: JSON.stringify(budget),
    })
    return response.data
  }

  async updateBudget(id: string, budget: Partial<Budget>): Promise<Budget> {
    const response = await this.request<ApiResponse<Budget>>(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(budget),
    })
    return response.data
  }

  async deleteBudget(id: string): Promise<void> {
    await this.request<ApiResponse<{ deleted: boolean }>>(`/budgets/${id}`, {
      method: 'DELETE',
    })
  }

  async getAIPredictions(): Promise<AIPrediction> {
    const response = await this.request<ApiResponse<BackendPrediction>>('/ai/predictions')
    return normalizePrediction(response.data)
  }

  async getAIRecommendations(): Promise<BudgetRecommendation[]> {
    const response = await this.request<ApiResponse<BackendRecommendation[]>>('/ai/recommendations')
    return response.data.map(normalizeRecommendation)
  }

  async getCategories(): Promise<Category[]> {
    const response = await this.request<ApiResponse<Category[]>>('/categories/')
    return response.data
  }
}

export const apiService = new ApiService()
