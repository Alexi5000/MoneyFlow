import { User, Transaction, Budget, AIInsight } from '../types'

// API service for MoneyFlow backend
class ApiService {
  private baseUrl = 'http://localhost:8000/api/v1'

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

    return response.json()
  }

  async getUser(): Promise<User> {
    const response = await this.request<{ data: User; success: boolean }>('/users/me')
    return response.data
  }

  async getTransactions(): Promise<Transaction[]> {
    const response = await this.request<{ data: Transaction[]; success: boolean }>('/transactions/recent?limit=20')
    return response.data
  }

  async getBudgets(): Promise<Budget[]> {
    const response = await this.request<{ data: { budgets: Budget[]; total_allocated: number; total_spent: number; total_remaining: number }; success: boolean }>('/budgets/')
    return response.data.budgets
  }

  async getAIInsights(): Promise<AIInsight[]> {
    const response = await this.request<{ data: any[]; success: boolean }>('/ai/insights')
    return response.data
  }

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const response = await this.request<{ data: Transaction; success: boolean }>('/transactions/', {
      method: 'POST',
      body: JSON.stringify(transaction),
    })
    return response.data
  }

  async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await this.request<{ data: Transaction; success: boolean }>(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction),
    })
    return response.data
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.request(`/transactions/${id}`, {
      method: 'DELETE',
    })
  }

  async createBudget(budget: Omit<Budget, 'id'>): Promise<Budget> {
    const response = await this.request<{ data: Budget; success: boolean }>('/budgets/', {
      method: 'POST',
      body: JSON.stringify(budget),
    })
    return response.data
  }

  async updateBudget(id: string, budget: Partial<Budget>): Promise<Budget> {
    const response = await this.request<{ data: Budget; success: boolean }>(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(budget),
    })
    return response.data
  }

  async deleteBudget(id: string): Promise<void> {
    await this.request(`/budgets/${id}`, {
      method: 'DELETE',
    })
  }

  async getAIPredictions(): Promise<any> {
    const response = await this.request<{ data: any; success: boolean }>('/ai/predictions')
    return response.data
  }

  async getCategories(): Promise<any[]> {
    const response = await this.request<{ data: any[]; success: boolean }>('/categories/')
    return response.data
  }
}

export const apiService = new ApiService()