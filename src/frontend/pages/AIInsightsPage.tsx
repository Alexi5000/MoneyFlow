import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, TrendingUp, Shield } from 'lucide-react'
import { GlassmorphicCard } from '../components/UI/GlassmorphicCard'
import { PredictionPanel } from '../components/Dashboard/PredictionPanel'

export const AIInsightsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassmorphicCard className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-8 h-8 text-primary-500" />
                <h1 className="text-2xl font-bold text-white">AI Financial Insights</h1>
                <span className="px-2 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full">
                  NEW
                </span>
              </div>
              <p className="text-gray-400">Powered by advanced machine learning and predictive analytics</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">Live Analysis</span>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* AI Prediction Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <PredictionPanel />
      </motion.div>

      {/* AI Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Financial Health Score */}
          <GlassmorphicCard className="p-6" glow neonColor="accent">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-accent-500" />
              <h3 className="text-lg font-semibold text-white">Financial Health Score</h3>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-accent-400 mb-2">8.7</div>
              <div className="text-sm text-gray-400">out of 10</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Spending Control</span>
                <span className="text-green-400">Excellent</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Savings Rate</span>
                <span className="text-green-400">Good</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Budget Adherence</span>
                <span className="text-yellow-400">Fair</span>
              </div>
            </div>
          </GlassmorphicCard>

          {/* Smart Recommendations */}
          <GlassmorphicCard className="p-6" glow neonColor="primary">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-primary-500" />
              <h3 className="text-lg font-semibold text-white">Smart Recommendations</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm font-medium text-white mb-1">Optimize Coffee Spending</div>
                <div className="text-xs text-gray-400">Save $45/month by making coffee at home 3 days per week</div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm font-medium text-white mb-1">Review Subscriptions</div>
                <div className="text-xs text-gray-400">Cancel unused streaming services to save $25/month</div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm font-medium text-white mb-1">Increase Savings</div>
                <div className="text-xs text-gray-400">Boost emergency fund by $150/month</div>
              </div>
            </div>
          </GlassmorphicCard>

          {/* Anomaly Detection */}
          <GlassmorphicCard className="p-6" glow neonColor="warning">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-warning-500" />
              <h3 className="text-lg font-semibold text-white">Anomaly Detection</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-white">All Clear</div>
                  <div className="text-xs text-gray-400">No unusual spending detected</div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              
              <div className="text-center text-sm text-gray-400">
                AI monitors your spending patterns 24/7 to detect unusual activity and potential fraud.
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      </motion.div>

      {/* AI Chat Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassmorphicCard className="p-6" glow neonColor="secondary">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-secondary-500" />
            <h3 className="text-lg font-semibold text-white">AI Chat Assistant</h3>
            <span className="px-2 py-1 bg-secondary-500/20 text-secondary-400 text-xs rounded-full">
              Coming Soon
            </span>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-400 mb-2">Ask me anything about your finances:</div>
            <div className="space-y-2">
              <div className="text-sm text-white">"How much did I spend on food last month?"</div>
              <div className="text-sm text-white">"When will I reach my savings goal?"</div>
              <div className="text-sm text-white">"What's my biggest expense category?"</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask your AI financial assistant..."
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              disabled
            />
            <button
              className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg opacity-50 cursor-not-allowed"
              disabled
            >
              Send
            </button>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  )
}