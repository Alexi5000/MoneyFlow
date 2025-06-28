import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertTriangle, Target, Brain, Zap } from 'lucide-react'
import { useAIStore } from '../../store/aiStore'
import { GlassmorphicCard } from '../UI/GlassmorphicCard'
import { AIAnalysisLoader } from '../UI/LoadingSpinner'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export const PredictionPanel: React.FC = () => {
  const { 
    predictions, 
    insights, 
    recommendations, 
    isAnalyzing, 
    analysisProgress,
    analyzeSpendingPatterns,
    shouldRefreshAnalysis 
  } = useAIStore()
  
  const [activeTab, setActiveTab] = useState<'predictions' | 'insights' | 'recommendations'>('predictions')
  
  useEffect(() => {
    if (shouldRefreshAnalysis()) {
      analyzeSpendingPatterns()
    }
  }, [analyzeSpendingPatterns, shouldRefreshAnalysis])
  
  if (isAnalyzing) {
    return (
      <GlassmorphicCard className="p-6">
        <AIAnalysisLoader progress={analysisProgress} />
      </GlassmorphicCard>
    )
  }
  
  if (!predictions) {
    return (
      <GlassmorphicCard className="p-6">
        <div className="text-center">
          <Brain className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">AI Analysis Ready</h3>
          <p className="text-gray-400 mb-4">Get personalized insights about your spending patterns</p>
          <button
            onClick={analyzeSpendingPatterns}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
          >
            Start Analysis
          </button>
        </div>
      </GlassmorphicCard>
    )
  }
  
  const spendingTrendData = [
    { month: 'Jan', actual: 3200, predicted: 3400 },
    { month: 'Feb', actual: 3450, predicted: 3600 },
    { month: 'Mar', actual: 3850, predicted: 3920 },
    { month: 'Apr', actual: null, predicted: 4100 },
    { month: 'May', actual: null, predicted: 4200 },
    { month: 'Jun', actual: null, predicted: 4150 }
  ]
  
  return (
    <GlassmorphicCard className="p-6" glow neonColor="primary">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Financial Insights</h2>
            <p className="text-sm text-gray-400">Powered by advanced analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-400">Live Analysis</span>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/5 rounded-lg p-1">
        {[
          { key: 'predictions', label: 'Predictions', icon: TrendingUp },
          { key: 'insights', label: 'Insights', icon: AlertTriangle },
          { key: 'recommendations', label: 'Tips', icon: Target }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === key
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Next Month Prediction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassmorphicCard className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-400">Next Month Spending</h3>
                  <div className="flex items-center gap-1">
                    {predictions.nextMonthSpending.trend === 'increasing' ? (
                      <TrendingUp className="w-4 h-4 text-red-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-400" />
                    )}
                    <span className="text-xs text-gray-400">
                      {(predictions.nextMonthSpending.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ${predictions.nextMonthSpending.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">
                  {predictions.nextMonthSpending.changePercentage > 0 ? '+' : ''}
                  {predictions.nextMonthSpending.changePercentage.toFixed(1)}% from this month
                </div>
              </GlassmorphicCard>
              
              <GlassmorphicCard className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-400">Savings Goal Progress</h3>
                  <Target className="w-4 h-4 text-accent-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  ${predictions.savingsProjection.oneYear.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">
                  Projected in 12 months
                </div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(predictions.savingsProjection.confidence * 100)}%` }}
                  />
                </div>
              </GlassmorphicCard>
            </div>
            
            {/* Spending Trend Chart */}
            <GlassmorphicCard className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Spending Trend & Predictions</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingTrendData}>
                    <defs>
                      <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#actualGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="#ec4899"
                      fillOpacity={1}
                      fill="url(#predictedGradient)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassmorphicCard>
          </motion.div>
        )}
        
        {activeTab === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {insights.map((insight) => (
              <GlassmorphicCard key={insight.id} className="p-4" hover>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    insight.severity === 'success' ? 'bg-green-500/20 text-green-400' :
                    insight.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    insight.severity === 'error' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{insight.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{insight.message}</p>
                    {insight.potentialSavings && (
                      <div className="text-green-400 text-sm font-medium mb-2">
                        Potential savings: ${insight.potentialSavings}/month
                      </div>
                    )}
                    {insight.suggestions && (
                      <div className="space-y-1">
                        {insight.suggestions.map((suggestion, index) => (
                          <div key={index} className="text-xs text-gray-500 flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary-500 rounded-full" />
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </GlassmorphicCard>
            ))}
          </motion.div>
        )}
        
        {activeTab === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {recommendations.map((rec) => (
              <GlassmorphicCard key={rec.id} className="p-4" hover>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-white">{rec.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                      rec.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {rec.impact} impact
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.effort === 'high' ? 'bg-red-500/20 text-red-400' :
                      rec.effort === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {rec.effort} effort
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-green-400 font-medium">
                    Save ${rec.potentialSavings}/month
                  </div>
                  <button className="px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
                    Apply Tip
                  </button>
                </div>
              </GlassmorphicCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassmorphicCard>
  )
}