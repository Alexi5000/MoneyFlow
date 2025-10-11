import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Transaction, Budget } from '../types'
import { apiService } from '../services/api'

interface FinancialState {
  user: User | null
  transactions: Transaction[]
  budgets: Budget[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User) => void
  setTransactions: (transactions: Transaction[]) => void
  setBudgets: (budgets: Budget[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Data fetching
  fetchUserData: () => Promise<void>
  fetchTransactions: () => Promise<void>
  fetchBudgets: () => Promise<void>
  initializeData: () => Promise<void>
  
  // Computed values
  getTotalIncome: () => number
  getTotalExpenses: () => number
  getSavingsRate: () => number
  getRecentTransactions: (limit?: number) => Transaction[]
}

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set, get) => ({
      user: null,
      transactions: [],
      budgets: [],
      isLoading: false,
      error: null, // Always start with no error

      setUser: (user) => set({ user }),
      setTransactions: (transactions) => set({ transactions }),
      setBudgets: (budgets) => set({ budgets }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      fetchUserData: async () => {
        try {
          const user = await apiService.getUser()
          set({ user, error: null })
          return true
        } catch (error) {
          console.error('Failed to fetch user:', error)
          set({ error: error instanceof Error ? error.message : 'Failed to fetch user data' })
          return false
        }
      },

      fetchTransactions: async () => {
        try {
          const transactions = await apiService.getTransactions()
          set({ transactions })
          return true
        } catch (error) {
          console.error('Failed to fetch transactions:', error)
          // Don't set global error for transactions
          return false
        }
      },

      fetchBudgets: async () => {
        try {
          const budgets = await apiService.getBudgets()
          set({ budgets })
          return true
        } catch (error) {
          console.error('Failed to fetch budgets:', error)
          // Don't set global error for budgets
          return false
        }
      },

      initializeData: async () => {
        set({ isLoading: true, error: null })
        try {
          const { fetchUserData, fetchTransactions, fetchBudgets } = get()
          
          // Fetch user first (critical)
          const userSuccess = await fetchUserData()
          if (!userSuccess) {
            throw new Error('Failed to connect to backend. Please ensure the server is running.')
          }
          
          // Fetch other data (non-critical, continue even if they fail)
          await Promise.allSettled([
            fetchTransactions(),
            fetchBudgets()
          ])
          
          set({ isLoading: false })
        } catch (error) {
          set({ 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to initialize data'
          })
        }
      },

      getTotalIncome: () => {
        const { transactions } = get()
        return transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0)
      },

      getTotalExpenses: () => {
        const { transactions } = get()
        return transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0)
      },

      getSavingsRate: () => {
        const { getTotalIncome, getTotalExpenses } = get()
        const income = getTotalIncome()
        const expenses = getTotalExpenses()
        return income > 0 ? ((income - expenses) / income) * 100 : 0
      },

      getRecentTransactions: (limit = 5) => {
        const { transactions } = get()
        return transactions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, limit)
      },
    }),
    {
      name: 'moneyflow-financial-store',
      partialize: (state) => ({
        user: state.user,
        transactions: state.transactions,
        budgets: state.budgets,
      }),
    }
  )
)