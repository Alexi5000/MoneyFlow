import { User, Transaction, Budget, AIPrediction, FinancialInsight, BudgetRecommendation } from '../types'

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Generate unique IDs
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

class MockBackendService {
  private async fetchJsonData<T>(path: string): Promise<T> {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`)
    }
    return response.json()
  }

  // User Profile
  async getUserProfile(): Promise<ApiResponse<User>> {
    await delay(600)
    try {
      const data = await this.fetchJsonData<{ user: User }>('/data/mockFinancialData.json')
      return {
        data: data.user,
        success: true,
        message: 'User profile fetched successfully'
      }
    } catch (error) {
      return {
        data: {} as User,
        success: false,
        message: 'Failed to fetch user profile'
      }
    }
  }

  async updateUserProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    await delay(800)
    try {
      const data = await this.fetchJsonData<{ user: User }>('/data/mockFinancialData.json')
      const updatedUser = { ...data.user, ...updates }
      return {
        data: updatedUser,
        success: true,
        message: 'User profile updated successfully'
      }
    } catch (error) {
      return {
        data: {} as User,
        success: false,
        message: 'Failed to update user profile'
      }
    }
  }

  // Transactions
  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    await delay(750)
    try {
      const data = await this.fetchJsonData<{ transactions: Transaction[] }>('/data/mockFinancialData.json')
      return {
        data: data.transactions,
        success: true,
        message: 'Transactions fetched successfully'
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch transactions'
      }
    }
  }

  async getRecentTransactions(limit: number = 10): Promise<ApiResponse<Transaction[]>> {
    await delay(500)
    try {
      const data = await this.fetchJsonData<{ transactions: Transaction[] }>('/data/mockFinancialData.json')
      const recentTransactions = data.transactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
      
      return {
        data: recentTransactions,
        success: true,
        message: `${recentTransactions.length} recent transactions fetched`
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch recent transactions'
      }
    }
  }

  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<ApiResponse<Transaction>> {
    await delay(900)
    
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${generateId()}`
    }

    // Simulate validation
    if (!transaction.amount || !transaction.category || !transaction.description) {
      return {
        data: {} as Transaction,
        success: false,
        message: 'Missing required transaction fields'
      }
    }

    return {
      data: newTransaction,
      success: true,
      message: 'Transaction added successfully'
    }
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    await delay(700)
    try {
      const data = await this.fetchJsonData<{ transactions: Transaction[] }>('/data/mockFinancialData.json')
      const transaction = data.transactions.find(t => t.id === id)
      
      if (!transaction) {
        return {
          data: {} as Transaction,
          success: false,
          message: 'Transaction not found'
        }
      }

      const updatedTransaction = { ...transaction, ...updates }
      return {
        data: updatedTransaction,
        success: true,
        message: 'Transaction updated successfully'
      }
    } catch (error) {
      return {
        data: {} as Transaction,
        success: false,
        message: 'Failed to update transaction'
      }
    }
  }

  async deleteTransaction(id: string): Promise<ApiResponse<boolean>> {
    await delay(500)
    return {
      data: true,
      success: true,
      message: 'Transaction deleted successfully'
    }
  }

  // Budgets
  async getBudgets(): Promise<ApiResponse<Budget[]>> {
    await delay(600)
    try {
      const data = await this.fetchJsonData<{ budgets: Budget[] }>('/data/mockFinancialData.json')
      return {
        data: data.budgets,
        success: true,
        message: 'Budgets fetched successfully'
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch budgets'
      }
    }
  }

  async updateBudget(id: string, updates: Partial<Budget>): Promise<ApiResponse<Budget>> {
    await delay(800)
    try {
      const data = await this.fetchJsonData<{ budgets: Budget[] }>('/data/mockFinancialData.json')
      const budget = data.budgets.find(b => b.id === id)
      
      if (!budget) {
        return {
          data: {} as Budget,
          success: false,
          message: 'Budget not found'
        }
      }

      const updatedBudget = { ...budget, ...updates }
      // Recalculate percentage and remaining
      updatedBudget.percentage = (updatedBudget.spent / updatedBudget.allocated) * 100
      updatedBudget.remaining = updatedBudget.allocated - updatedBudget.spent

      return {
        data: updatedBudget,
        success: true,
        message: 'Budget updated successfully'
      }
    } catch (error) {
      return {
        data: {} as Budget,
        success: false,
        message: 'Failed to update budget'
      }
    }
  }

  async createBudget(budget: Omit<Budget, 'id'>): Promise<ApiResponse<Budget>> {
    await delay(900)
    
    const newBudget: Budget = {
      ...budget,
      id: `budget_${generateId()}`,
      spent: 0,
      remaining: budget.allocated,
      percentage: 0
    }

    return {
      data: newBudget,
      success: true,
      message: 'Budget created successfully'
    }
  }

  // AI Predictions
  async getAIPredictions(): Promise<ApiResponse<AIPrediction>> {
    await delay(1200) // Longer delay to simulate AI processing
    try {
      const data = await this.fetchJsonData<{ predictions: AIPrediction }>('/data/aiPredictions.json')
      return {
        data: data.predictions,
        success: true,
        message: 'AI predictions generated successfully'
      }
    } catch (error) {
      return {
        data: {} as AIPrediction,
        success: false,
        message: 'Failed to generate AI predictions'
      }
    }
  }

  // Financial Insights
  async getFinancialInsights(): Promise<ApiResponse<FinancialInsight[]>> {
    await delay(1000)
    try {
      const data = await this.fetchJsonData<{ insights: FinancialInsight[] }>('/data/aiPredictions.json')
      return {
        data: data.insights,
        success: true,
        message: 'Financial insights generated successfully'
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to generate financial insights'
      }
    }
  }

  // Budget Recommendations
  async getBudgetRecommendations(): Promise<ApiResponse<BudgetRecommendation[]>> {
    await delay(1100)
    try {
      const data = await this.fetchJsonData<{ recommendations: BudgetRecommendation[] }>('/data/aiPredictions.json')
      return {
        data: data.recommendations,
        success: true,
        message: 'Budget recommendations generated successfully'
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to generate budget recommendations'
      }
    }
  }

  // Categories
  async getCategories(): Promise<ApiResponse<any[]>> {
    await delay(400)
    try {
      const data = await this.fetchJsonData<{ categories: any[] }>('/data/mockFinancialData.json')
      return {
        data: data.categories,
        success: true,
        message: 'Categories fetched successfully'
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch categories'
      }
    }
  }

  // Financial Summary
  async getFinancialSummary(): Promise<ApiResponse<{
    totalIncome: number
    totalExpenses: number
    netWorth: number
    savingsRate: number
  }>> {
    await delay(600)
    try {
      const [userResponse, transactionsResponse] = await Promise.all([
        this.getUserProfile(),
        this.getTransactions()
      ])

      if (!userResponse.success || !transactionsResponse.success) {
        throw new Error('Failed to fetch required data')
      }

      const user = userResponse.data
      const transactions = transactionsResponse.data

      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)

      const netWorth = user.totalBalance
      const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

      return {
        data: {
          totalIncome,
          totalExpenses,
          netWorth,
          savingsRate
        },
        success: true,
        message: 'Financial summary calculated successfully'
      }
    } catch (error) {
      return {
        data: {
          totalIncome: 0,
          totalExpenses: 0,
          netWorth: 0,
          savingsRate: 0
        },
        success: false,
        message: 'Failed to calculate financial summary'
      }
    }
  }

  // Simulate AI Analysis
  async triggerAIAnalysis(): Promise<ApiResponse<{
    predictions: AIPrediction
    insights: FinancialInsight[]
    recommendations: BudgetRecommendation[]
  }>> {
    await delay(2000) // Longer delay for comprehensive AI analysis
    try {
      const [predictionsResponse, insightsResponse, recommendationsResponse] = await Promise.all([
        this.getAIPredictions(),
        this.getFinancialInsights(),
        this.getBudgetRecommendations()
      ])

      if (!predictionsResponse.success || !insightsResponse.success || !recommendationsResponse.success) {
        throw new Error('Failed to complete AI analysis')
      }

      return {
        data: {
          predictions: predictionsResponse.data,
          insights: insightsResponse.data,
          recommendations: recommendationsResponse.data
        },
        success: true,
        message: 'AI analysis completed successfully'
      }
    } catch (error) {
      return {
        data: {
          predictions: {} as AIPrediction,
          insights: [],
          recommendations: []
        },
        success: false,
        message: 'Failed to complete AI analysis'
      }
    }
  }
}

// Export singleton instance
export const mockBackendService = new MockBackendService()