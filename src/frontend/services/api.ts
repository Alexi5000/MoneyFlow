import { User, Transaction, Budget, AIInsight } from '../types'

// Mock API service - replace with real API calls
class ApiService {
  private baseUrl = '/api'

  async getUser(): Promise<User> {
    // Mock user data
    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      totalBalance: 12450.00,
      monthlyIncome: 5230.00,
      monthlyExpenses: 3120.00,
      savingsGoal: 10000.00,
      currentSavings: 2110.00
    }
  }

  async getTransactions(): Promise<Transaction[]> {
    // Mock transaction data
    return [
      {
        id: '1',
        amount: -85.50,
        category: 'Food',
        description: 'Grocery Store',
        date: '2024-01-15',
        type: 'expense',
        merchant: 'Whole Foods'
      },
      {
        id: '2',
        amount: 5230.00,
        category: 'Salary',
        description: 'Monthly Salary',
        date: '2024-01-01',
        type: 'income'
      }
    ]
  }

  async getBudgets(): Promise<Budget[]> {
    // Mock budget data
    return [
      {
        id: '1',
        category: 'Food',
        allocated: 500,
        spent: 425,
        remaining: 75,
        period: 'monthly'
      }
    ]
  }

  async getAIInsights(): Promise<AIInsight[]> {
    // Mock AI insights
    return [
      {
        id: '1',
        type: 'tip',
        title: 'Spending Pattern Detected',
        description: 'You tend to spend more on weekends. Consider setting a weekend budget.',
        actionable: true,
        confidence: 0.85
      }
    ]
  }
}

export const apiService = new ApiService()