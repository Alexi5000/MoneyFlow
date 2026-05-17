import { create } from 'zustand'
import { apiService } from '../services/api'
import { AIPrediction, BudgetRecommendation, FinancialInsight } from '../types'

interface AIState {
  predictions: AIPrediction | null
  insights: FinancialInsight[]
  recommendations: BudgetRecommendation[]
  isAnalyzing: boolean
  lastAnalysis: number | null
  analysisProgress: number
  error: string | null

  // Actions
  setPredictions: (predictions: AIPrediction) => void
  setInsights: (insights: FinancialInsight[]) => void
  setRecommendations: (recommendations: BudgetRecommendation[]) => void
  setAnalyzing: (analyzing: boolean) => void
  setAnalysisProgress: (progress: number) => void
  setError: (error: string | null) => void
  updateLastAnalysis: () => void

  // AI analysis functions
  analyzeSpendingPatterns: () => Promise<void>
  generateInsights: () => Promise<void>
  createRecommendations: () => Promise<void>
  fetchAIData: () => Promise<void>

  // Utility functions
  getInsightsByCategory: (category: string) => FinancialInsight[]
  getRecommendationsByImpact: (impact: 'low' | 'medium' | 'high') => BudgetRecommendation[]
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
      for (let progress = 0; progress <= 80; progress += 20) {
        set({ analysisProgress: progress })
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      const [predictions, insights, recommendations] = await Promise.all([
        apiService.getAIPredictions(),
        apiService.getAIInsights(),
        apiService.getAIRecommendations(),
      ])

      set({
        predictions,
        insights,
        recommendations,
        isAnalyzing: false,
        lastAnalysis: Date.now(),
        analysisProgress: 100,
        error: null,
      })
    } catch (error) {
      console.error('Failed to analyze spending patterns:', error)
      set({
        error: 'Failed to analyze spending patterns. Please try again.',
        isAnalyzing: false,
        analysisProgress: 0,
      })
    }
  },

  generateInsights: async () => {
    set({ isAnalyzing: true, error: null })

    try {
      const insights = await apiService.getAIInsights()

      set({
        insights,
        isAnalyzing: false,
        error: null,
      })
    } catch (error) {
      console.error('Failed to generate insights:', error)
      set({
        error: 'Failed to generate insights. Please try again.',
        isAnalyzing: false,
      })
    }
  },

  createRecommendations: async () => {
    set({ isAnalyzing: true, error: null })

    try {
      const recommendations = await apiService.getAIRecommendations()

      set({
        recommendations,
        isAnalyzing: false,
        error: null,
      })
    } catch (error) {
      console.error('Failed to create recommendations:', error)
      set({
        error: 'Failed to create recommendations. Please try again.',
        isAnalyzing: false,
      })
    }
  },

  fetchAIData: async () => {
    set({ isAnalyzing: true, error: null })

    try {
      const [predictions, insights, recommendations] = await Promise.all([
        apiService.getAIPredictions(),
        apiService.getAIInsights(),
        apiService.getAIRecommendations(),
      ])

      set({
        predictions,
        insights,
        recommendations,
        isAnalyzing: false,
        lastAnalysis: Date.now(),
        analysisProgress: 100,
        error: null,
      })
    } catch (error) {
      console.error('Failed to fetch AI data:', error)
      set({
        error: 'Failed to fetch AI data. Please try again.',
        isAnalyzing: false,
      })
    }
  },

  getInsightsByCategory: (category) => {
    const { insights } = get()
    return insights.filter((insight) => insight.category === category)
  },

  getRecommendationsByImpact: (impact) => {
    const { recommendations } = get()
    return recommendations.filter((recommendation) => recommendation.impact === impact)
  },

  shouldRefreshAnalysis: () => {
    const { lastAnalysis } = get()
    if (!lastAnalysis) return true

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
      error: null,
    })
  },
}))
