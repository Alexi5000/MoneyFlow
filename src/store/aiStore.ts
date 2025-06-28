import { create } from 'zustand'

interface Prediction {
  nextMonthSpending: {
    amount: number
    confidence: number
    trend: string
    change: number
    changePercentage: number
  }
  budgetForecasts: Array<{
    category: string
    predicted: number
    current: number
    likelihood: string
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
  }
  riskAnalysis: {
    overbudgetRisk: {
      level: string
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

interface Insight {
  id: string
  type: string
  title: string
  message: string
  severity: 'success' | 'warning' | 'info' | 'error'
  category: string
  actionable: boolean
  potentialSavings?: number
  progress?: number
  suggestions?: string[]
}

interface Recommendation {
  id: string
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  effort: 'low' | 'medium' | 'high'
  potentialSavings: number
  category: string
}

interface AIState {
  predictions: Prediction | null
  insights: Insight[]
  recommendations: Recommendation[]
  isAnalyzing: boolean
  lastAnalysis: number | null
  analysisProgress: number
  
  // Actions
  setPredictions: (predictions: Prediction) => void
  setInsights: (insights: Insight[]) => void
  setRecommendations: (recommendations: Recommendation[]) => void
  setAnalyzing: (analyzing: boolean) => void
  setAnalysisProgress: (progress: number) => void
  updateLastAnalysis: () => void
  
  // AI Analysis functions
  analyzeSpendingPatterns: () => Promise<void>
  generateInsights: () => Promise<void>
  createRecommendations: () => Promise<void>
  
  // Utility functions
  getInsightsByCategory: (category: string) => Insight[]
  getRecommendationsByImpact: (impact: 'low' | 'medium' | 'high') => Recommendation[]
  shouldRefreshAnalysis: () => boolean
}

export const useAIStore = create<AIState>((set, get) => ({
  predictions: null,
  insights: [],
  recommendations: [],
  isAnalyzing: false,
  lastAnalysis: null,
  analysisProgress: 0,

  setPredictions: (predictions) => set({ predictions }),
  setInsights: (insights) => set({ insights }),
  setRecommendations: (recommendations) => set({ recommendations }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisProgress: (analysisProgress) => set({ analysisProgress }),
  updateLastAnalysis: () => set({ lastAnalysis: Date.now() }),

  analyzeSpendingPatterns: async () => {
    set({ isAnalyzing: true, analysisProgress: 0 })
    
    // Simulate AI analysis with progress updates
    for (let i = 0; i <= 100; i += 10) {
      set({ analysisProgress: i })
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    // In a real app, this would call an AI service
    // For now, we'll use mock data
    try {
      const response = await fetch('/src/data/aiPredictions.json')
      const data = await response.json()
      
      set({
        predictions: data.predictions,
        insights: data.insights,
        recommendations: data.recommendations,
        isAnalyzing: false,
        lastAnalysis: Date.now(),
        analysisProgress: 100
      })
    } catch (error) {
      console.error('Failed to analyze spending patterns:', error)
      set({ isAnalyzing: false, analysisProgress: 0 })
    }
  },

  generateInsights: async () => {
    // This would typically call an AI service to generate personalized insights
    // For now, we'll simulate the process
    set({ isAnalyzing: true })
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    set({ isAnalyzing: false })
  },

  createRecommendations: async () => {
    // This would typically call an AI service to create personalized recommendations
    set({ isAnalyzing: true })
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    set({ isAnalyzing: false })
  },

  getInsightsByCategory: (category) => {
    const { insights } = get()
    return insights.filter(insight => insight.category === category)
  },

  getRecommendationsByImpact: (impact) => {
    const { recommendations } = get()
    return recommendations.filter(rec => rec.impact === impact)
  },

  shouldRefreshAnalysis: () => {
    const { lastAnalysis } = get()
    if (!lastAnalysis) return true
    
    // Refresh analysis if it's been more than 24 hours
    const twentyFourHours = 24 * 60 * 60 * 1000
    return Date.now() - lastAnalysis > twentyFourHours
  },
}))