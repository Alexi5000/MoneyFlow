import { create } from 'zustand'
import { mockBackendService } from '../services/mockBackendService'

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
  error: string | null
  
  // Actions
  setPredictions: (predictions: Prediction) => void
  setInsights: (insights: Insight[]) => void
  setRecommendations: (recommendations: Recommendation[]) => void
  setAnalyzing: (analyzing: boolean) => void
  setAnalysisProgress: (progress: number) => void
  setError: (error: string | null) => void
  updateLastAnalysis: () => void
  
  // AI Analysis functions
  analyzeSpendingPatterns: () => Promise<void>
  generateInsights: () => Promise<void>
  createRecommendations: () => Promise<void>
  fetchAIData: () => Promise<void>
  
  // Utility functions
  getInsightsByCategory: (category: string) => Insight[]
  getRecommendationsByImpact: (impact: 'low' | 'medium' | 'high') => Recommendation[]
  shouldRefreshAnalysis: () => boolean
  resetAnalysis: () => void
}

export const useAIStore = create<AIState>((set, get) => ({
  predictions: null,
  insights: [],
  recommendations: [],
  isAnalyzing: false,
  lastAnalysis: null,
  analysisProgress: 0,
  error: null,

  setPredictions: (predictions) => set({ predictions }),
  setInsights: (insights) => set({ insights }),
  setRecommendations: (recommendations) => set({ recommendations }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisProgress: (analysisProgress) => set({ analysisProgress }),
  setError: (error) => set({ error }),
  updateLastAnalysis: () => set({ lastAnalysis: Date.now() }),

  analyzeSpendingPatterns: async () => {
    set({ isAnalyzing: true, analysisProgress: 0, error: null })
    
    try {
      // Simulate AI analysis with progress updates
      for (let i = 0; i <= 100; i += 20) {
        set({ analysisProgress: i })
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
      const response = await mockBackendService.triggerAIAnalysis()
      
      if (response.success) {
        set({
          predictions: response.data.predictions,
          insights: response.data.insights,
          recommendations: response.data.recommendations,
          isAnalyzing: false,
          lastAnalysis: Date.now(),
          analysisProgress: 100,
          error: null
        })
      } else {
        set({ 
          error: response.message || 'Failed to analyze spending patterns',
          isAnalyzing: false,
          analysisProgress: 0
        })
      }
    } catch (error) {
      console.error('Failed to analyze spending patterns:', error)
      set({ 
        error: 'Failed to analyze spending patterns. Please try again.',
        isAnalyzing: false, 
        analysisProgress: 0 
      })
    }
  },

  generateInsights: async () => {
    set({ isAnalyzing: true, error: null })
    
    try {
      const response = await mockBackendService.fetchAIInsights()
      
      if (response.success) {
        set({ 
          insights: response.data,
          isAnalyzing: false,
          error: null
        })
      } else {
        set({ 
          error: response.message || 'Failed to generate insights',
          isAnalyzing: false
        })
      }
    } catch (error) {
      console.error('Failed to generate insights:', error)
      set({ 
        error: 'Failed to generate insights. Please try again.',
        isAnalyzing: false 
      })
    }
  },

  createRecommendations: async () => {
    set({ isAnalyzing: true, error: null })
    
    try {
      const response = await mockBackendService.fetchAIRecommendations()
      
      if (response.success) {
        set({ 
          recommendations: response.data,
          isAnalyzing: false,
          error: null
        })
      } else {
        set({ 
          error: response.message || 'Failed to create recommendations',
          isAnalyzing: false
        })
      }
    } catch (error) {
      console.error('Failed to create recommendations:', error)
      set({ 
        error: 'Failed to create recommendations. Please try again.',
        isAnalyzing: false 
      })
    }
  },

  fetchAIData: async () => {
    set({ isAnalyzing: true, error: null })
    
    try {
      // Fetch all AI data in parallel
      const [predictionsResponse, insightsResponse, recommendationsResponse] = await Promise.all([
        mockBackendService.fetchAIPredictions(),
        mockBackendService.fetchAIInsights(),
        mockBackendService.fetchAIRecommendations()
      ])

      if (predictionsResponse.success && insightsResponse.success && recommendationsResponse.success) {
        set({
          predictions: predictionsResponse.data,
          insights: insightsResponse.data,
          recommendations: recommendationsResponse.data,
          isAnalyzing: false,
          lastAnalysis: Date.now(),
          error: null
        })
      } else {
        const errors = [
          !predictionsResponse.success && predictionsResponse.message,
          !insightsResponse.success && insightsResponse.message,
          !recommendationsResponse.success && recommendationsResponse.message
        ].filter(Boolean)
        
        set({ 
          error: errors.join(', ') || 'Failed to fetch AI data',
          isAnalyzing: false
        })
      }
    } catch (error) {
      console.error('Failed to fetch AI data:', error)
      set({ 
        error: 'Failed to fetch AI data. Please try again.',
        isAnalyzing: false 
      })
    }
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

  resetAnalysis: () => {
    set({
      predictions: null,
      insights: [],
      recommendations: [],
      isAnalyzing: false,
      lastAnalysis: null,
      analysisProgress: 0,
      error: null
    })
  },
}))