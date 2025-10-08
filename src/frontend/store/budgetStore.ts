import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Budget } from '../types'
import { apiService } from '../services/api'

interface BudgetAlert {
  id: string
  budgetId: string
  type: 'approaching_limit' | 'over_budget' | 'goal_achieved'
  message: string
  severity: 'info' | 'warning' | 'error' | 'success'
  timestamp: string
  dismissed: boolean
}

interface BudgetState {
  budgets: Budget[]
  alerts: BudgetAlert[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setBudgets: (budgets: Budget[]) => void
  addBudget: (budget: Budget) => void
  updateBudget: (id: string, updates: Partial<Budget>) => void
  deleteBudget: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Alert management
  addAlert: (alert: Omit<BudgetAlert, 'id' | 'timestamp'>) => void
  dismissAlert: (alertId: string) => void
  clearAlerts: () => void
  
  // Data fetching
  fetchBudgets: () => Promise<void>
  createBudget: (budget: Omit<Budget, 'id'>) => Promise<void>
  
  // Computed values
  getTotalAllocated: () => number
  getTotalSpent: () => number
  getOverBudgetCount: () => number
  getNearLimitCount: () => number
  getBudgetHealth: () => 'excellent' | 'good' | 'warning' | 'critical'
  
  // Alert generation
  checkBudgetAlerts: () => void
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set, get) => ({
      budgets: [],
      alerts: [],
      isLoading: false,
      error: null,

      setBudgets: (budgets) => {
        set({ budgets })
        get().checkBudgetAlerts()
      },

      addBudget: (budget) => {
        set((state) => ({ budgets: [...state.budgets, budget] }))
        get().checkBudgetAlerts()
      },

      updateBudget: (id, updates) => {
        set((state) => ({
          budgets: state.budgets.map((budget) =>
            budget.id === id ? { ...budget, ...updates } : budget
          )
        }))
        get().checkBudgetAlerts()
      },

      deleteBudget: (id) => {
        set((state) => ({
          budgets: state.budgets.filter((budget) => budget.id !== id),
          alerts: state.alerts.filter((alert) => alert.budgetId !== id)
        }))
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Alert management
      addAlert: (alertData) => {
        const alert: BudgetAlert = {
          ...alertData,
          id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          dismissed: false
        }
        
        set((state) => ({
          alerts: [alert, ...state.alerts.filter(a => 
            !(a.budgetId === alert.budgetId && a.type === alert.type)
          )]
        }))
      },

      dismissAlert: (alertId) => {
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === alertId ? { ...alert, dismissed: true } : alert
          )
        }))
      },

      clearAlerts: () => set({ alerts: [] }),

      // Data fetching
      fetchBudgets: async () => {
        set({ isLoading: true, error: null })
        try {
          const budgets = await apiService.getBudgets()
          get().setBudgets(budgets)
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch budgets' })
        } finally {
          set({ isLoading: false })
        }
      },

      createBudget: async (budgetData) => {
        set({ isLoading: true, error: null })
        try {
          const budget = await apiService.createBudget(budgetData)
          get().addBudget(budget)
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to create budget' })
        } finally {
          set({ isLoading: false })
        }
      },

      // Computed values
      getTotalAllocated: () => {
        const { budgets } = get()
        return budgets.reduce((sum, budget) => sum + budget.allocated, 0)
      },

      getTotalSpent: () => {
        const { budgets } = get()
        return budgets.reduce((sum, budget) => sum + budget.spent, 0)
      },

      getOverBudgetCount: () => {
        const { budgets } = get()
        return budgets.filter(budget => budget.percentage > 100).length
      },

      getNearLimitCount: () => {
        const { budgets } = get()
        return budgets.filter(budget => budget.percentage > 80 && budget.percentage <= 100).length
      },

      getBudgetHealth: () => {
        const { budgets } = get()
        const overBudget = budgets.filter(b => b.percentage > 100).length
        const nearLimit = budgets.filter(b => b.percentage > 80 && b.percentage <= 100).length
        
        if (overBudget > 0) return 'critical'
        if (nearLimit > budgets.length * 0.5) return 'warning'
        if (nearLimit > 0) return 'good'
        return 'excellent'
      },

      // Alert generation
      checkBudgetAlerts: () => {
        const { budgets, addAlert } = get()
        
        budgets.forEach((budget) => {
          // Over budget alert
          if (budget.percentage > 100) {
            addAlert({
              budgetId: budget.id,
              type: 'over_budget',
              message: `You've exceeded your ${budget.category} budget by $${Math.abs(budget.remaining).toFixed(2)}!`,
              severity: 'error'
            })
          }
          // Approaching limit alert
          else if (budget.percentage > 80) {
            addAlert({
              budgetId: budget.id,
              type: 'approaching_limit',
              message: `You're at ${budget.percentage.toFixed(1)}% of your ${budget.category} budget.`,
              severity: 'warning'
            })
          }
          // Goal achieved (staying under budget)
          else if (budget.percentage < 50 && budget.spent > 0) {
            addAlert({
              budgetId: budget.id,
              type: 'goal_achieved',
              message: `Great job! You're only using ${budget.percentage.toFixed(1)}% of your ${budget.category} budget.`,
              severity: 'success'
            })
          }
        })
      },
    }),
    {
      name: 'moneyflow-budget-store',
      partialize: (state) => ({
        budgets: state.budgets,
        alerts: state.alerts.filter(alert => !alert.dismissed),
      }),
    }
  )
)