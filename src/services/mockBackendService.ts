import { Transaction, Budget, User } from '../store/financialStore'

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Generate unique IDs
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginationParams {
  limit?: number
  offset?: number
}

export interface TransactionFilters {
  category?: string
  type?: 'income' | 'expense'
  dateRange?: {
    start: string
    end: string
  }
}

class MockBackendService {
  private async fetchJsonData<T>(path: string): Promise<T> {
    try {
      const response = await fetch(path)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${path}:`, error)
      throw error
    }
  }

  // User Management
  async fetchUser(): Promise<ApiResponse<User>> {
    await delay(300)
    try {
      const data = await this.fetchJsonData<{ user: User }>('/data/mockFinancialData.json')
      return {
        data: data.user,
        success: true,
        message: 'User fetched successfully'
      }
    } catch (error) {
      return {
        data: {} as User,
        success: false,
        message: 'Failed to fetch user data'
      }
    }
  }

  async updateUser(updates: Partial<User>): Promise<ApiResponse<User>> {
    await delay(400)
    try {
      const data = await this.fetchJsonData<{ user: User }>('/data/mockFinancialData.json')
      const updatedUser = { ...data.user, ...updates }
      return {
        data: updatedUser,
        success: true,
        message: 'User updated successfully'
      }
    } catch (error) {
      return {
        data: {} as User,
        success: false,
        message: 'Failed to update user'
      }
    }
  }

  // Transaction Management
  async fetchTransactions(
    filters?: TransactionFilters,
    pagination?: PaginationParams
  ): Promise<ApiResponse<Transaction[]>> {
    await delay(600)
    try {
      const data = await this.fetchJsonData<{ transactions: Transaction[] }>('/data/mockFinancialData.json')
      let filteredTransactions = [...data.transactions]

      // Apply filters
      if (filters?.category) {
        filteredTransactions = filteredTransactions.filter(t => t.category === filters.category)
      }
      
      if (filters?.type) {
        filteredTransactions = filteredTransactions.filter(t => t.type === filters.type)
      }
      
      if (filters?.dateRange) {
        const startDate = new Date(filters.dateRange.start)
        const endDate = new Date(filters.dateRange.end)
        filteredTransactions = filteredTransactions.filter(t => {
          const transactionDate = new Date(t.date)
          return transactionDate >= startDate && transactionDate <= endDate
        })
      }

      // Apply pagination
      const limit = pagination?.limit || 50
      const offset = pagination?.offset || 0
      const paginatedTransactions = filteredTransactions.slice(offset, offset + limit)

      return {
        data: paginatedTransactions,
        success: true,
        message: `Fetched ${paginatedTransactions.length} transactions`
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch transactions'
      }
    }
  }

  async fetchRecentTransactions(limit: number = 10): Promise<ApiResponse<Transaction[]>> {
    await delay(400)
    try {
      const data = await this.fetchJsonData<{ transactions: Transaction[] }>('/data/mockFinancialData.json')
      const sortedTransactions = [...data.transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)

      return {
        data: sortedTransactions,
        success: true,
        message: `Fetched ${sortedTransactions.length} recent transactions`
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch recent transactions'
      }
    }
  }

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<ApiResponse<Transaction>> {
    await delay(500)
    
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${generateId()}`
    }

    return {
      data: newTransaction,
      success: true,
      message: 'Transaction created successfully'
    }
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    await delay(400)
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
    await delay(300)
    return {
      data: true,
      success: true,
      message: 'Transaction deleted successfully'
    }
  }

  // Budget Management
  async fetchBudgets(): Promise<ApiResponse<Budget[]>> {
    await delay(400)
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

  async createBudget(budget: Omit<Budget, 'id'>): Promise<ApiResponse<Budget>> {
    await delay(500)
    
    const newBudget: Budget = {
      ...budget,
      id: `budget_${generateId()}`
    }

    return {
      data: newBudget,
      success: true,
      message: 'Budget created successfully'
    }
  }

  async updateBudget(id: string, updates: Partial<Budget>): Promise<ApiResponse<Budget>> {
    await delay(400)
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

  async deleteBudget(id: string): Promise<ApiResponse<boolean>> {
    await delay(300)
    return {
      data: true,
      success: true,
      message: 'Budget deleted successfully'
    }
  }

  // Categories Management
  async fetchCategories(): Promise<ApiResponse<any[]>> {
    await delay(200)
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

  // AI/Analytics Services
  async fetchAIPredictions(): Promise<ApiResponse<any>> {
    await delay(1000)
    try {
      const data = await this.fetchJsonData<{ predictions: any }>('/data/aiPredictions.json')
      return {
        data: data.predictions,
        success: true,
        message: 'AI predictions generated successfully'
      }
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'Failed to fetch AI predictions'
      }
    }
  }

  async fetchAIInsights(): Promise<ApiResponse<any[]>> {
    await delay(800)
    try {
      const data = await this.fetchJsonData<{ insights: any[] }>('/data/aiPredictions.json')
      return {
        data: data.insights,
        success: true,
        message: 'AI insights generated successfully'
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch AI insights'
      }
    }
  }

  async fetchAIRecommendations(): Promise<ApiResponse<any[]>> {
    await delay(600)
    try {
      const data = await this.fetchJsonData<{ recommendations: any[] }>('/data/aiPredictions.json')
      return {
        data: data.recommendations,
        success: true,
        message: 'AI recommendations generated successfully'
      }
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch AI recommendations'
      }
    }
  }

  async triggerAIAnalysis(): Promise<ApiResponse<{
    predictions: any
    insights: any[]
    recommendations: any[]
  }>> {
    await delay(2000)
    try {
      const data = await this.fetchJsonData<{
        predictions: any
        insights: any[]
        recommendations: any[]
      }>('/data/aiPredictions.json')
      
      return {
        data: {
          predictions: data.predictions,
          insights: data.insights,
          recommendations: data.recommendations
        },
        success: true,
        message: 'AI analysis completed successfully'
      }
    } catch (error) {
      return {
        data: {
          predictions: null,
          insights: [],
          recommendations: []
        },
        success: false,
        message: 'Failed to complete AI analysis'
      }
    }
  }

  // Utility methods
  async getFinancialSummary(): Promise<ApiResponse<{
    totalIncome: number
    totalExpenses: number
    netWorth: number
    savingsRate: number
  }>> {
    await delay(300)
    try {
      const data = await this.fetchJsonData<{ transactions: Transaction[] }>('/data/mockFinancialData.json')
      
      const totalIncome = data.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
      
      const totalExpenses = data.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
      
      const netWorth = totalIncome - totalExpenses
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
}

// Export singleton instance
export const mockBackendService = new MockBackendService()