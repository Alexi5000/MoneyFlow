import { Transaction, Budget } from '../store/financialStore'

export interface SpendingPrediction {
  category: string
  predictedAmount: number
  confidence: number
  trend: 'increasing' | 'decreasing' | 'stable'
  factors: string[]
}

export interface FinancialInsight {
  id: string
  type: 'warning' | 'opportunity' | 'achievement' | 'trend'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  actionable: boolean
  suggestions?: string[]
  potentialSavings?: number
}

export interface BudgetRecommendation {
  category: string
  currentBudget: number
  recommendedBudget: number
  reasoning: string
  confidence: number
}

class AIService {
  private apiKey: string | null = null
  private baseUrl = 'https://api.openai.com/v1'

  constructor() {
    // In a real app, this would come from environment variables
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null
  }

  // Analyze spending patterns using transaction history
  async analyzeSpendingPatterns(transactions: Transaction[]): Promise<SpendingPrediction[]> {
    try {
      // Group transactions by category
      const categorySpending = this.groupTransactionsByCategory(transactions)
      
      // Calculate trends and predictions
      const predictions: SpendingPrediction[] = []
      
      for (const [category, categoryTransactions] of Object.entries(categorySpending)) {
        const prediction = this.calculateCategoryPrediction(category, categoryTransactions)
        predictions.push(prediction)
      }
      
      return predictions
    } catch (error) {
      console.error('Error analyzing spending patterns:', error)
      return this.getMockPredictions()
    }
  }

  // Generate personalized financial insights
  async generateInsights(
    transactions: Transaction[],
    budgets: Budget[]
  ): Promise<FinancialInsight[]> {
    try {
      const insights: FinancialInsight[] = []
      
      // Analyze budget performance
      budgets.forEach(budget => {
        if (budget.percentage > 90) {
          insights.push({
            id: `budget_warning_${budget.id}`,
            type: 'warning',
            title: `${budget.category} Budget Alert`,
            description: `You've used ${budget.percentage.toFixed(1)}% of your ${budget.category} budget.`,
            impact: 'high',
            actionable: true,
            suggestions: [
              `Review your ${budget.category} spending`,
              'Consider adjusting your budget or reducing expenses',
              'Look for cost-saving alternatives'
            ]
          })
        }
      })
      
      // Analyze spending trends
      const recentTransactions = transactions
        .filter(t => t.type === 'expense')
        .slice(0, 30)
      
      const frequentMerchants = this.findFrequentMerchants(recentTransactions)
      
      frequentMerchants.forEach(merchant => {
        if (merchant.totalSpent > 200) {
          insights.push({
            id: `merchant_insight_${merchant.name}`,
            type: 'opportunity',
            title: `High Spending at ${merchant.name}`,
            description: `You've spent $${merchant.totalSpent.toFixed(2)} at ${merchant.name} recently.`,
            impact: 'medium',
            actionable: true,
            potentialSavings: merchant.totalSpent * 0.2,
            suggestions: [
              'Look for alternatives or discounts',
              'Consider bulk purchases for better rates',
              'Set a monthly limit for this merchant'
            ]
          })
        }
      })
      
      return insights
    } catch (error) {
      console.error('Error generating insights:', error)
      return this.getMockInsights()
    }
  }

  // Create budget recommendations based on spending history
  async createBudgetRecommendations(
    transactions: Transaction[],
    currentBudgets: Budget[]
  ): Promise<BudgetRecommendation[]> {
    try {
      const recommendations: BudgetRecommendation[] = []
      
      // Analyze spending patterns for each category
      const categorySpending = this.groupTransactionsByCategory(transactions)
      
      currentBudgets.forEach(budget => {
        const categoryTransactions = categorySpending[budget.category] || []
        const averageSpending = this.calculateAverageMonthlySpending(categoryTransactions)
        
        let recommendedBudget = budget.allocated
        let reasoning = 'Budget appears appropriate based on current spending.'
        
        if (averageSpending > budget.allocated * 1.1) {
          recommendedBudget = Math.ceil(averageSpending * 1.1)
          reasoning = 'Consider increasing budget based on consistent overspending.'
        } else if (averageSpending < budget.allocated * 0.8) {
          recommendedBudget = Math.ceil(averageSpending * 1.2)
          reasoning = 'You could reduce this budget and allocate funds elsewhere.'
        }
        
        recommendations.push({
          category: budget.category,
          currentBudget: budget.allocated,
          recommendedBudget,
          reasoning,
          confidence: this.calculateConfidence(categoryTransactions.length)
        })
      })
      
      return recommendations
    } catch (error) {
      console.error('Error creating budget recommendations:', error)
      return []
    }
  }

  // Predict future expenses based on historical data
  async predictFutureExpenses(
    transactions: Transaction[],
    timeframe: 'week' | 'month' | 'quarter'
  ): Promise<{ category: string; predicted: number; confidence: number }[]> {
    try {
      const categorySpending = this.groupTransactionsByCategory(transactions)
      const predictions = []
      
      for (const [category, categoryTransactions] of Object.entries(categorySpending)) {
        const expenseTransactions = categoryTransactions.filter(t => t.type === 'expense')
        
        if (expenseTransactions.length === 0) continue
        
        const averageMonthly = this.calculateAverageMonthlySpending(expenseTransactions)
        let predicted = averageMonthly
        
        // Adjust based on timeframe
        switch (timeframe) {
          case 'week':
            predicted = averageMonthly / 4.33 // Average weeks per month
            break
          case 'quarter':
            predicted = averageMonthly * 3
            break
          // month is default
        }
        
        // Apply seasonal adjustments and trends
        const trend = this.calculateTrend(expenseTransactions)
        predicted *= (1 + trend)
        
        predictions.push({
          category,
          predicted: Math.round(predicted * 100) / 100,
          confidence: this.calculateConfidence(expenseTransactions.length)
        })
      }
      
      return predictions
    } catch (error) {
      console.error('Error predicting future expenses:', error)
      return []
    }
  }

  // Helper methods
  private groupTransactionsByCategory(transactions: Transaction[]): Record<string, Transaction[]> {
    return transactions.reduce((groups, transaction) => {
      const category = transaction.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(transaction)
      return groups
    }, {} as Record<string, Transaction[]>)
  }

  private calculateCategoryPrediction(category: string, transactions: Transaction[]): SpendingPrediction {
    const expenseTransactions = transactions.filter(t => t.type === 'expense')
    const averageSpending = this.calculateAverageMonthlySpending(expenseTransactions)
    const trend = this.calculateTrend(expenseTransactions)
    
    return {
      category,
      predictedAmount: Math.round(averageSpending * (1 + trend) * 100) / 100,
      confidence: this.calculateConfidence(expenseTransactions.length),
      trend: trend > 0.05 ? 'increasing' : trend < -0.05 ? 'decreasing' : 'stable',
      factors: this.identifySpendingFactors(expenseTransactions)
    }
  }

  private calculateAverageMonthlySpending(transactions: Transaction[]): number {
    if (transactions.length === 0) return 0
    
    const totalSpending = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
    const monthsSpan = this.calculateMonthsSpan(transactions)
    
    return monthsSpan > 0 ? totalSpending / monthsSpan : totalSpending
  }

  private calculateMonthsSpan(transactions: Transaction[]): number {
    if (transactions.length === 0) return 1
    
    const dates = transactions.map(t => new Date(t.date))
    const earliest = new Date(Math.min(...dates.map(d => d.getTime())))
    const latest = new Date(Math.max(...dates.map(d => d.getTime())))
    
    const monthsDiff = (latest.getFullYear() - earliest.getFullYear()) * 12 + 
                      (latest.getMonth() - earliest.getMonth()) + 1
    
    return Math.max(1, monthsDiff)
  }

  private calculateTrend(transactions: Transaction[]): number {
    if (transactions.length < 4) return 0
    
    // Simple linear regression to calculate trend
    const sortedTransactions = transactions
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    const n = sortedTransactions.length
    const x = Array.from({ length: n }, (_, i) => i)
    const y = sortedTransactions.map(t => Math.abs(t.amount))
    
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0)
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const avgY = sumY / n
    
    return avgY > 0 ? slope / avgY : 0 // Normalize by average
  }

  private calculateConfidence(dataPoints: number): number {
    // Confidence increases with more data points, capped at 0.95
    return Math.min(0.95, 0.3 + (dataPoints * 0.05))
  }

  private identifySpendingFactors(transactions: Transaction[]): string[] {
    const factors = []
    
    // Analyze day of week patterns
    const dayOfWeekSpending = transactions.reduce((acc, t) => {
      const day = new Date(t.date).getDay()
      acc[day] = (acc[day] || 0) + Math.abs(t.amount)
      return acc
    }, {} as Record<number, number>)
    
    const weekendSpending = (dayOfWeekSpending[0] || 0) + (dayOfWeekSpending[6] || 0)
    const weekdaySpending = Object.entries(dayOfWeekSpending)
      .filter(([day]) => day !== '0' && day !== '6')
      .reduce((sum, [, amount]) => sum + amount, 0)
    
    if (weekendSpending > weekdaySpending * 0.4) {
      factors.push('Higher weekend spending')
    }
    
    // Analyze merchant frequency
    const merchantCounts = transactions.reduce((acc, t) => {
      if (t.merchant) {
        acc[t.merchant] = (acc[t.merchant] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)
    
    const frequentMerchants = Object.entries(merchantCounts)
      .filter(([, count]) => count > 3)
      .map(([merchant]) => merchant)
    
    if (frequentMerchants.length > 0) {
      factors.push(`Frequent purchases at ${frequentMerchants[0]}`)
    }
    
    return factors
  }

  private findFrequentMerchants(transactions: Transaction[]): Array<{ name: string; count: number; totalSpent: number }> {
    const merchantData = transactions.reduce((acc, t) => {
      if (t.merchant) {
        if (!acc[t.merchant]) {
          acc[t.merchant] = { count: 0, totalSpent: 0 }
        }
        acc[t.merchant].count++
        acc[t.merchant].totalSpent += Math.abs(t.amount)
      }
      return acc
    }, {} as Record<string, { count: number; totalSpent: number }>)
    
    return Object.entries(merchantData)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5)
  }

  // Mock data for development
  private getMockPredictions(): SpendingPrediction[] {
    return [
      {
        category: 'Food & Dining',
        predictedAmount: 650,
        confidence: 0.87,
        trend: 'increasing',
        factors: ['Higher weekend spending', 'Frequent coffee purchases']
      },
      {
        category: 'Transportation',
        predictedAmount: 280,
        confidence: 0.72,
        trend: 'stable',
        factors: ['Consistent gas prices', 'Regular commute pattern']
      },
      {
        category: 'Entertainment',
        predictedAmount: 220,
        confidence: 0.81,
        trend: 'increasing',
        factors: ['New streaming subscriptions', 'More social activities']
      }
    ]
  }

  private getMockInsights(): FinancialInsight[] {
    return [
      {
        id: 'insight_1',
        type: 'opportunity',
        title: 'Coffee Spending Optimization',
        description: 'You could save $45/month by making coffee at home 3 days per week.',
        impact: 'medium',
        actionable: true,
        potentialSavings: 45,
        suggestions: [
          'Invest in a quality coffee maker',
          'Buy coffee beans in bulk',
          'Limit coffee shop visits to 2 days per week'
        ]
      },
      {
        id: 'insight_2',
        type: 'warning',
        title: 'Shopping Budget Alert',
        description: 'You\'re approaching your shopping budget limit with 2 weeks left in the month.',
        impact: 'high',
        actionable: true,
        suggestions: [
          'Review upcoming purchases',
          'Look for deals and discounts',
          'Consider postponing non-essential items'
        ]
      }
    ]
  }
}

export const aiService = new AIService()