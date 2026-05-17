import type { Budget, BudgetRecommendation, FinancialInsight, Transaction } from '../types'

export interface SpendingPrediction {
  category: string
  predictedAmount: number
  confidence: number
  trend: 'increasing' | 'decreasing' | 'stable'
  factors: string[]
}

class AIService {
  async analyzeSpendingPatterns(transactions: Transaction[]): Promise<SpendingPrediction[]> {
    const totalsByCategory = this.groupAmountsByCategory(transactions)

    return Object.entries(totalsByCategory).map(([category, total]) => ({
      category,
      predictedAmount: Number((total * 1.05).toFixed(2)),
      confidence: transactions.length > 10 ? 0.82 : 0.65,
      trend: 'stable',
      factors: ['recent transaction history', 'category-level spending velocity'],
    }))
  }

  async generateInsights(transactions: Transaction[], budgets: Budget[]): Promise<FinancialInsight[]> {
    const totalExpenses = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)

    const overBudgetCategories = budgets.filter((budget) => budget.spent > budget.allocated)

    return [
      {
        id: 'spending-summary',
        type: 'spending_alert',
        title: 'Monthly spending snapshot',
        message: `Tracked ${transactions.length} transactions totaling $${totalExpenses.toFixed(2)} in expenses.`,
        severity: overBudgetCategories.length > 0 ? 'warning' : 'info',
        category: 'overall',
        actionable: overBudgetCategories.length > 0,
        suggestions: overBudgetCategories.map((budget) => `Review ${budget.category} spending.`),
        confidence: 0.78,
      },
    ]
  }

  async createBudgetRecommendations(budgets: Budget[]): Promise<BudgetRecommendation[]> {
    return budgets.map((budget) => {
      const isOverBudget = budget.spent > budget.allocated
      const recommendedBudget = isOverBudget ? budget.spent * 1.1 : budget.allocated

      return {
        category: budget.category,
        currentBudget: budget.allocated,
        recommendedBudget: Number(recommendedBudget.toFixed(2)),
        reasoning: isOverBudget
          ? 'Recent spending exceeded the current allocation; increase the cap or reduce category activity.'
          : 'Current allocation is consistent with observed spending.',
        confidence: isOverBudget ? 0.8 : 0.7,
        impact: isOverBudget ? 'high' : 'medium',
        effort: isOverBudget ? 'medium' : 'low',
        potentialSavings: Number(Math.max(budget.allocated - budget.spent, 0).toFixed(2)),
      }
    })
  }

  async predictFutureExpenses(transactions: Transaction[]): Promise<number> {
    const expenses = transactions.filter((transaction) => transaction.type === 'expense')
    if (expenses.length === 0) return 0

    const total = expenses.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    return Number(((total / expenses.length) * 30).toFixed(2))
  }

  private groupAmountsByCategory(transactions: Transaction[]): Record<string, number> {
    return transactions.reduce<Record<string, number>>((groups, transaction) => {
      if (transaction.type === 'expense') {
        groups[transaction.category] = (groups[transaction.category] ?? 0) + Math.abs(transaction.amount)
      }

      return groups
    }, {})
  }
}

export const aiService = new AIService()
