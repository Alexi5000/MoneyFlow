import mockFinancialData from '../data/mockFinancialData.json'
import aiPredictionsData from '../data/aiPredictions.json'
import { Transaction, Budget, User } from '../store/financialStore'

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Generate unique IDs
const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

// In-memory storage to simulate database persistence
let userData: User = { ...mockFinancialData.user } as User
let transactionsData: Transaction[] = [...mockFinancialData.transactions] as Transaction[]
let budgetsData: Budget[] = [...mockFinancialData.budgets] as Budget[]
let categoriesData = [...mockFinancialData.categories]

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
  // User Management
  async fetchUser(): Promise<ApiResponse<User>> {
    await delay(300)
    return {
      data: userData,
      success: true,
      message: 'User fetched successfully'
    }
  }

  async updateUser(updates: Partial<User>): Promise<ApiResponse<User>> {
    await delay(400)
    userData = { ...userData, ...updates }
    return {
      data: userData,
      success: true,
      message: 'User updated successfully'
    }
  }

  // Transaction Management
  async fetchTransactions(
    filters?: TransactionFilters,
    pagination?: PaginationParams
  ): Promise<ApiResponse<Transaction[]>> {
    await delay(600)
    
    let filteredTransactions = [...transactionsData]

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
  }

  async fetchRecentTransactions(limit: number = 10): Promise<ApiResponse<Transaction[]>> {
    await delay(400)
    
    const sortedTransactions = [...transactionsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)

    return {
      data: sortedTransactions,
      success: true,
      message: `Fetched ${sortedTransactions.length} recent transactions`
    }
  }

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<ApiResponse<Transaction>> {
    await delay(500)
    
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn_${generateId()}`
    }
    
    transactionsData.unshift(newTransaction)
    
    // Update user balance
    if (transaction.type === 'income') {
      userData.totalBalance += transaction.amount
      userData.monthlyIncome += transaction.amount
    } else {
      userData.totalBalance -= Math.abs(transaction.amount)
      userData.monthlyExpenses += Math.abs(transaction.amount)
    }

    // Update budget spending if applicable
    const relatedBudget = budgetsData.find(b => b.category === transaction.category)
    if (relatedBudget && transaction.type === 'expense') {
      relatedBudget.spent += Math.abs(transaction.amount)
      relatedBudget.remaining = relatedBudget.allocated - relatedBudget.spent
      relatedBudget.percentage = (relatedBudget.spent / relatedBudget.allocated) * 100
    }

    return {
      data: newTransaction,
      success: true,
      message: 'Transaction created successfully'
    }
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    await delay(400)
    
    const transactionIndex = transactionsData.findIndex(t => t.id === id)
    if (transactionIndex === -1) {
      return {
        data: {} as Transaction,
        success: false,
        message: 'Transaction not found'
      }
    }

    const oldTransaction = transactionsData[transactionIndex]
    const updatedTransaction = { ...oldTransaction, ...updates }
    transactionsData[transactionIndex] = updatedTransaction

    return {
      data: updatedTransaction,
      success: true,
      message: 'Transaction updated successfully'
    }
  }

  async deleteTransaction(id: string): Promise<ApiResponse<boolean>> {
    await delay(300)
    
    const transactionIndex = transactionsData.findIndex(t => t.id === id)
    if (transactionIndex === -1) {
      return {
        data: false,
        success: false,
        message: 'Transaction not found'
      }
    }

    const transaction = transactionsData[transactionIndex]
    transactionsData.splice(transactionIndex, 1)

    // Update user balance
    if (transaction.type === 'income') {
      userData.totalBalance -= transaction.amount
      userData.monthlyIncome -= transaction.amount
    } else {
      userData.totalBalance += Math.abs(transaction.amount)
      userData.monthlyExpenses -= Math.abs(transaction.amount)
    }

    return {
      data: true,
      success: true,
      message: 'Transaction deleted successfully'
    }
  }

  // Budget Management
  async fetchBudgets(): Promise<ApiResponse<Budget[]>> {
    await delay(400)
    return {
      data: budgetsData,
      success: true,
      message: 'Budgets fetched successfully'
    }
  }

  async createBudget(budget: Omit<Budget, 'id'>): Promise<ApiResponse<Budget>> {
    await delay(500)
    
    const newBudget: Budget = {
      ...budget,
      id: `budget_${generateId()}`
    }
    
    budgetsData.push(newBudget)

    return {
      data: newBudget,
      success: true,
      message: 'Budget created successfully'
    }
  }

  async updateBudget(id: string, updates: Partial<Budget>): Promise<ApiResponse<Budget>> {
    await delay(400)
    
    const budgetIndex = budgetsData.findIndex(b => b.id === id)
    if (budgetIndex === -1) {
      return {
        data: {} as Budget,
        success: false,
        message: 'Budget not found'
      }
    }

    const updatedBudget = { ...budgetsData[budgetIndex], ...updates }
    budgetsData[budgetIndex] = updatedBudget

    return {
      data: updatedBudget,
      success: true,
      message: 'Budget updated successfully'
    }
  }

  async deleteBudget(id: string): Promise<ApiResponse<boolean>> {
    await delay(300)
    
    const budgetIndex = budgetsData.findIndex(b => b.id === id)
    if (budgetIndex === -1) {
      return {
        data: false,
        success: false,
        message: 'Budget not found'
      }
    }

    budgetsData.splice(budgetIndex, 1)

    return {
      data: true,
      success: true,
      message: 'Budget deleted successfully'
    }
  }

  // Categories Management
  async fetchCategories(): Promise<ApiResponse<typeof categoriesData>> {
    await delay(200)
    return {
      data: categoriesData,
      success: true,
      message: 'Categories fetched successfully'
    }
  }

  // AI/Analytics Services
  async fetchAIPredictions(): Promise<ApiResponse<typeof aiPredictionsData.predictions>> {
    await delay(1000) // Simulate AI processing time
    return {
      data: aiPredictionsData.predictions,
      success: true,
      message: 'AI predictions generated successfully'
    }
  }

  async fetchAIInsights(): Promise<ApiResponse<typeof aiPredictionsData.insights>> {
    await delay(800)
    return {
      data: aiPredictionsData.insights,
      success: true,
      message: 'AI insights generated successfully'
    }
  }

  async fetchAIRecommendations(): Promise<ApiResponse<typeof aiPredictionsData.recommendations>> {
    await delay(600)
    return {
      data: aiPredictionsData.recommendations,
      success: true,
      message: 'AI recommendations generated successfully'
    }
  }

  async triggerAIAnalysis(): Promise<ApiResponse<{
    predictions: typeof aiPredictionsData.predictions
    insights: typeof aiPredictionsData.insights
    recommendations: typeof aiPredictionsData.recommendations
  }>> {
    // Simulate progressive analysis
    await delay(2000)
    
    return {
      data: {
        predictions: aiPredictionsData.predictions,
        insights: aiPredictionsData.insights,
        recommendations: aiPredictionsData.recommendations
      },
      success: true,
      message: 'AI analysis completed successfully'
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
    
    const totalIncome = transactionsData
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalExpenses = transactionsData
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
  }

  // Reset data to initial state (useful for testing)
  async resetData(): Promise<ApiResponse<boolean>> {
    await delay(200)
    
    userData = { ...mockFinancialData.user } as User
    transactionsData = [...mockFinancialData.transactions] as Transaction[]
    budgetsData = [...mockFinancialData.budgets] as Budget[]
    categoriesData = [...mockFinancialData.categories]

    return {
      data: true,
      success: true,
      message: 'Data reset to initial state'
    }
  }
}

// Export singleton instance
export const mockBackendService = new MockBackendService()