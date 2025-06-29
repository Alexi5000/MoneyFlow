import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockBackendService } from '../services/mockBackendService'

export interface Transaction {
  id: string
  amount: number
  category: string
  subcategory?: string
  description: string
  date: string
  type: 'income' | 'expense'
  merchant?: string
  location?: string
  paymentMethod?: string
}

export interface Budget {
  id: string
  category: string
  allocated: number
  spent: number
  remaining: number
  percentage: number
  color: string
  icon: string
}

export interface User {
  id: string
  name: string
  email: string
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsGoal: number
  currentSavings: number
  avatar?: string
}

interface FinancialState {
  user: User | null
  transactions: Transaction[]
  budgets: Budget[]
  categories: any[]
  isLoading: boolean
  error: string | null
  
  // Actions
  initializeData: () => Promise<void>
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => Promise<void>
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  setBudgets: (budgets: Budget[]) => void
  updateBudget: (id: string, budget: Partial<Budget>) => Promise<void>
  createBudget: (budget: Omit<Budget, 'id'>) => Promise<void>
  deleteBudget: (id: string) => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Data fetching
  fetchTransactions: (filters?: any) => Promise<void>
  fetchRecentTransactions: (limit?: number) => Promise<void>
  fetchBudgets: () => Promise<void>
  fetchCategories: () => Promise<void>
  
  // Computed values
  getTotalIncome: () => number
  getTotalExpenses: () => number
  getTransactionsByCategory: (category: string) => Transaction[]
  getBudgetByCategory: (category: string) => Budget | undefined
  getRecentTransactions: (limit?: number) => Transaction[]
}

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set, get) => ({
      user: null,
      transactions: [],
      budgets: [],
      categories: [],
      isLoading: false,
      error: null,

      initializeData: async () => {
        set({ isLoading: true, error: null })
        
        try {
          // Fetch user data
          const userResponse = await mockBackendService.fetchUser()
          if (userResponse.success) {
            set({ user: userResponse.data })
          }

          // Fetch transactions
          const transactionsResponse = await mockBackendService.fetchTransactions()
          if (transactionsResponse.success) {
            set({ transactions: transactionsResponse.data })
          }

          // Fetch budgets
          const budgetsResponse = await mockBackendService.fetchBudgets()
          if (budgetsResponse.success) {
            set({ budgets: budgetsResponse.data })
          }

          // Fetch categories
          const categoriesResponse = await mockBackendService.fetchCategories()
          if (categoriesResponse.success) {
            set({ categories: categoriesResponse.data })
          }

          set({ isLoading: false })
        } catch (error) {
          console.error('Failed to initialize data:', error)
          set({ 
            error: 'Failed to load data. Please try again.', 
            isLoading: false 
          })
        }
      },

      setUser: (user) => set({ user }),
      
      updateUser: async (updates) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.updateUser(updates)
          if (response.success) {
            set({ user: response.data, isLoading: false })
          } else {
            set({ error: response.message || 'Failed to update user', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to update user:', error)
          set({ error: 'Failed to update user', isLoading: false })
        }
      },
      
      addTransaction: async (transaction) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.createTransaction(transaction)
          if (response.success) {
            set((state) => ({
              transactions: [response.data, ...state.transactions],
              isLoading: false
            }))
            
            // Refresh user data to get updated balance
            const userResponse = await mockBackendService.fetchUser()
            if (userResponse.success) {
              set({ user: userResponse.data })
            }
            
            // Refresh budgets to get updated spending
            const budgetsResponse = await mockBackendService.fetchBudgets()
            if (budgetsResponse.success) {
              set({ budgets: budgetsResponse.data })
            }
          } else {
            set({ error: response.message || 'Failed to add transaction', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to add transaction:', error)
          set({ error: 'Failed to add transaction', isLoading: false })
        }
      },
      
      updateTransaction: async (id, updatedTransaction) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.updateTransaction(id, updatedTransaction)
          if (response.success) {
            set((state) => ({
              transactions: state.transactions.map((t) =>
                t.id === id ? response.data : t
              ),
              isLoading: false
            }))
          } else {
            set({ error: response.message || 'Failed to update transaction', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to update transaction:', error)
          set({ error: 'Failed to update transaction', isLoading: false })
        }
      },
      
      deleteTransaction: async (id) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.deleteTransaction(id)
          if (response.success) {
            set((state) => ({
              transactions: state.transactions.filter((t) => t.id !== id),
              isLoading: false
            }))
            
            // Refresh user data to get updated balance
            const userResponse = await mockBackendService.fetchUser()
            if (userResponse.success) {
              set({ user: userResponse.data })
            }
          } else {
            set({ error: response.message || 'Failed to delete transaction', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to delete transaction:', error)
          set({ error: 'Failed to delete transaction', isLoading: false })
        }
      },
      
      setBudgets: (budgets) => set({ budgets }),
      
      updateBudget: async (id, updatedBudget) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.updateBudget(id, updatedBudget)
          if (response.success) {
            set((state) => ({
              budgets: state.budgets.map((b) =>
                b.id === id ? response.data : b
              ),
              isLoading: false
            }))
          } else {
            set({ error: response.message || 'Failed to update budget', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to update budget:', error)
          set({ error: 'Failed to update budget', isLoading: false })
        }
      },

      createBudget: async (budget) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.createBudget(budget)
          if (response.success) {
            set((state) => ({
              budgets: [...state.budgets, response.data],
              isLoading: false
            }))
          } else {
            set({ error: response.message || 'Failed to create budget', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to create budget:', error)
          set({ error: 'Failed to create budget', isLoading: false })
        }
      },

      deleteBudget: async (id) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.deleteBudget(id)
          if (response.success) {
            set((state) => ({
              budgets: state.budgets.filter((b) => b.id !== id),
              isLoading: false
            }))
          } else {
            set({ error: response.message || 'Failed to delete budget', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to delete budget:', error)
          set({ error: 'Failed to delete budget', isLoading: false })
        }
      },
      
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Data fetching methods
      fetchTransactions: async (filters) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.fetchTransactions(filters)
          if (response.success) {
            set({ transactions: response.data, isLoading: false })
          } else {
            set({ error: response.message || 'Failed to fetch transactions', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to fetch transactions:', error)
          set({ error: 'Failed to fetch transactions', isLoading: false })
        }
      },

      fetchRecentTransactions: async (limit = 10) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.fetchRecentTransactions(limit)
          if (response.success) {
            set({ transactions: response.data, isLoading: false })
          } else {
            set({ error: response.message || 'Failed to fetch recent transactions', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to fetch recent transactions:', error)
          set({ error: 'Failed to fetch recent transactions', isLoading: false })
        }
      },

      fetchBudgets: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.fetchBudgets()
          if (response.success) {
            set({ budgets: response.data, isLoading: false })
          } else {
            set({ error: response.message || 'Failed to fetch budgets', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to fetch budgets:', error)
          set({ error: 'Failed to fetch budgets', isLoading: false })
        }
      },

      fetchCategories: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await mockBackendService.fetchCategories()
          if (response.success) {
            set({ categories: response.data, isLoading: false })
          } else {
            set({ error: response.message || 'Failed to fetch categories', isLoading: false })
          }
        } catch (error) {
          console.error('Failed to fetch categories:', error)
          set({ error: 'Failed to fetch categories', isLoading: false })
        }
      },
      
      // Computed values
      getTotalIncome: () => {
        const { transactions } = get()
        return transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0)
      },
      
      getTotalExpenses: () => {
        const { transactions } = get()
        return transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0)
      },
      
      getTransactionsByCategory: (category) => {
        const { transactions } = get()
        return transactions.filter((t) => t.category === category)
      },
      
      getBudgetByCategory: (category) => {
        const { budgets } = get()
        return budgets.find((b) => b.category === category)
      },
      
      getRecentTransactions: (limit = 10) => {
        const { transactions } = get()
        return transactions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit)
      },
    }),
    {
      name: 'moneyflow-financial-store',
      partialize: (state) => ({
        // Only persist essential data, not loading states
        user: state.user,
        transactions: state.transactions,
        budgets: state.budgets,
        categories: state.categories,
      }),
    }
  )
)