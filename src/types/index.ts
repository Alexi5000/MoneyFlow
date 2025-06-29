export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsGoal: number
  currentSavings: number
}

export interface Transaction {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: 'income' | 'expense'
  merchant?: string
  tags?: string[]
}

export interface Budget {
  id: string
  category: string
  allocated: number
  spent: number
  remaining: number
  period: 'monthly' | 'weekly' | 'yearly'
}

export interface AIInsight {
  id: string
  type: 'warning' | 'tip' | 'achievement'
  title: string
  description: string
  actionable: boolean
  confidence: number
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  parentId?: string
}