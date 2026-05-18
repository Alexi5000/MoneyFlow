export const CATEGORIES = [
  { id: 'food', name: 'Food & Dining', color: '#10B981', icon: '🍽️' },
  { id: 'transport', name: 'Transportation', color: '#3B82F6', icon: '🚗' },
  { id: 'entertainment', name: 'Entertainment', color: '#8B5CF6', icon: '🎬' },
  { id: 'shopping', name: 'Shopping', color: '#F59E0B', icon: '🛍️' },
  { id: 'bills', name: 'Bills & Utilities', color: '#EF4444', icon: '📄' },
  { id: 'health', name: 'Health & Fitness', color: '#06B6D4', icon: '💪' },
  { id: 'education', name: 'Education', color: '#84CC16', icon: '📚' },
  { id: 'travel', name: 'Travel', color: '#F97316', icon: '✈️' },
]

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const

export const BUDGET_PERIODS = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const
