// Core User Interface
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

// Transaction Interface
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

// Budget Interface
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

// AI Prediction Interface
export interface AIPrediction {
  nextMonthSpending: {
    amount: number
    confidence: number
    trend: 'increasing' | 'decreasing' | 'stable'
    changePercentage: number
  }
  budgetForecasts: Array<{
    category: string
    predicted: number
    current: number
    likelihood: 'high' | 'medium' | 'low'
    confidence: number
  }>
  savingsProjection: {
    sixMonths: number
    oneYear: number
    goalAchievement: string
    confidence: number
  }
  spendingPatterns: {
    peakDays: string[]
    peakHours: number[]
    seasonalTrends: Record<string, string>
    averageTransactionSize: number
  }
  riskAnalysis: {
    overbudgetRisk: {
      level: 'low' | 'medium' | 'high'
      categories: string[]
      probability: number
    }
    emergencyFundStatus: {
      recommended: number
      current: number
      shortfall: number
      monthsToGoal: number
    }
  }
}

// Financial Insight Interface
export interface FinancialInsight {
  id: string
  type: 'spending_alert' | 'savings_opportunity' | 'positive_trend' | 'goal_progress' | 'anomaly_detection'
  title: string
  message: string
  severity: 'success' | 'warning' | 'info' | 'error'
  category: string
  actionable: boolean
  suggestions?: string[]
  potentialSavings?: number
  progress?: number
  confidence?: number
}

// Budget Recommendation Interface
export interface BudgetRecommendation {
  category: string
  currentBudget: number
  recommendedBudget: number
  reasoning: string
  confidence: number
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  potentialSavings: number
}

// Category Interface
export interface Category {
  id: string
  name: string
  color: string
  icon: string
  parentId?: string
  subcategories?: string[]
}

// Financial Goal Interface
export interface FinancialGoal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'active' | 'completed' | 'paused'
}

// Notification Interface
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: string
  read: boolean
  actionUrl?: string
  actionText?: string
}

// Account Interface (for connected bank accounts)
export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  currency: string
  institution: string
  lastSynced: string
  isActive: boolean
}

// Recurring Transaction Interface
export interface RecurringTransaction {
  id: string
  amount: number
  category: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  nextDate: string
  endDate?: string
  isActive: boolean
  type: 'income' | 'expense'
}

// Investment Interface
export interface Investment {
  id: string
  symbol: string
  name: string
  shares: number
  currentPrice: number
  totalValue: number
  gainLoss: number
  gainLossPercentage: number
  purchaseDate: string
}

// Financial Summary Interface
export interface FinancialSummary {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
  debtToIncomeRatio: number
  emergencyFundMonths: number
}

// AI Analysis Request Interface
export interface AIAnalysisRequest {
  userId: string
  timeframe: 'week' | 'month' | 'quarter' | 'year'
  includeForecasting: boolean
  includeBudgetRecommendations: boolean
  includeRiskAnalysis: boolean
}

// AI Analysis Response Interface
export interface AIAnalysisResponse {
  predictions: AIPrediction
  insights: FinancialInsight[]
  recommendations: BudgetRecommendation[]
  summary: string
  confidence: number
  generatedAt: string
}

// Chart Data Interface
export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }>
}

// Filter Options Interface
export interface FilterOptions {
  dateRange?: {
    start: string
    end: string
  }
  categories?: string[]
  types?: ('income' | 'expense')[]
  amountRange?: {
    min: number
    max: number
  }
  merchants?: string[]
}

// Pagination Interface
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// API Response Interface
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
  pagination?: Pagination
}

// User Preferences Interface
export interface UserPreferences {
  currency: string
  dateFormat: string
  theme: 'light' | 'dark' | 'auto'
  notifications: {
    email: boolean
    push: boolean
    budgetAlerts: boolean
    goalReminders: boolean
    weeklyReports: boolean
  }
  privacy: {
    shareData: boolean
    analytics: boolean
  }
}

// Export all types
export type {
  User,
  Transaction,
  Budget,
  AIPrediction,
  FinancialInsight,
  BudgetRecommendation,
  Category,
  FinancialGoal,
  Notification,
  Account,
  RecurringTransaction,
  Investment,
  FinancialSummary,
  AIAnalysisRequest,
  AIAnalysisResponse,
  ChartData,
  FilterOptions,
  Pagination,
  ApiResponse,
  UserPreferences
}

// Utility types
export type TransactionType = Transaction['type']
export type InsightSeverity = FinancialInsight['severity']
export type GoalStatus = FinancialGoal['status']
export type AccountType = Account['type']
export type NotificationType = Notification['type']

// Enum-like constants
export const TRANSACTION_TYPES = {
  INCOME: 'income' as const,
  EXPENSE: 'expense' as const,
}

export const INSIGHT_SEVERITIES = {
  SUCCESS: 'success' as const,
  WARNING: 'warning' as const,
  INFO: 'info' as const,
  ERROR: 'error' as const,
}

export const GOAL_STATUSES = {
  ACTIVE: 'active' as const,
  COMPLETED: 'completed' as const,
  PAUSED: 'paused' as const,
}

export const ACCOUNT_TYPES = {
  CHECKING: 'checking' as const,
  SAVINGS: 'savings' as const,
  CREDIT: 'credit' as const,
  INVESTMENT: 'investment' as const,
}