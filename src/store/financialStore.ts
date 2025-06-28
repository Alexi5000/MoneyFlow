import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User) => void
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setBudgets: (budgets: Budget[]) => void
  updateBudget: (id: string, budget: Partial<Budget>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
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
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }
        
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }))
        
        // Update user balance
        const { user } = get()
        if (user) {
          const newBalance = transaction.type === 'income' 
            ? user.totalBalance + transaction.amount
            : user.totalBalance - Math.abs(transaction.amount)
          
          set({
            user: { ...user, totalBalance: newBalance }
          })
        }
      },
      
      updateTransaction: (id, updatedTransaction) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTransaction } : t
          ),
        }))
      },
      
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }))
      },
      
      setBudgets: (budgets) => set({ budgets }),
      
      updateBudget: (id, updatedBudget) => {
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...updatedBudget } : b
          ),
        }))
      },
      
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
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
        user: state.user,
        transactions: state.transactions,
        budgets: state.budgets,
      }),
    }
  )
)