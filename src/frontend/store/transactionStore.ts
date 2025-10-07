import { create } from 'zustand'
import { Transaction } from '../types'

interface TransactionState {
  transactions: Transaction[]
  isLoading: boolean
  error: string | null
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setTransactions: (transactions: Transaction[]) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,
  addTransaction: (transaction) => set((state) => ({
    transactions: [
      ...state.transactions,
      { ...transaction, id: Date.now().toString() }
    ]
  })),
  updateTransaction: (id, updates) => set((state) => ({
    transactions: state.transactions.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    )
  })),
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter((t) => t.id !== id)
  })),
  setTransactions: (transactions) => set({ transactions })
}))