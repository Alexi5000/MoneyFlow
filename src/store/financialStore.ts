import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Transaction, Budget } from '../types'
import { mockBackendService } from '../services/mockBackendService'

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
      error: null,

      setUser: (user) => set({ user }),
      setTransactions: (transactions) => set({ transactions }),
      setBudgets: (budgets) => set({ budgets }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      fetchUserData: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await mockBackendService.getUserProfile()
          if (response.success) {
            set({ user: response.data })
          } else {
            set({ error: response.message || 'Failed to fetch user data' })
          }
        } catch (error) {
          set({ error: 'Failed to fetch user data' })
        } finally {
          set({ isLoading: false })
        }
      },

      fetchTransactions: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await mockBackendService.getTransactions()
          if (response.success) {
            set({ transactions: response.data })
          } else {
            set({ error: response.message || 'Failed to fetch transactions' })
          }
        } catch (error) {
          set({ error: 'Failed to fetch transactions' })
        } finally {
          set({ isLoading: false })
        }
      },

      fetchBudgets: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await mockBackendService.getBudgets()
          if (response.success) {
            set({ budgets: response.data })
          } else {
            set({ error: response.message || 'Failed to fetch budgets' })
          }
        } catch (error) {
          set({ error: 'Failed to fetch budgets' })
        } finally {
          set({ isLoading: false })
        }
      },

      initializeData: async () => {
        const { fetchUserData, fetchTransactions, fetchBudgets } = get()
        await Promise.all([
          fetchUserData(),
          fetchTransactions(),
          fetchBudgets()
        ])
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