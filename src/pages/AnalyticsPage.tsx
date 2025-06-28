import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react'
import { GlassmorphicCard } from '../components/UI/GlassmorphicCard'
import { NeonButton } from '../components/UI/NeonButton'
import { ExpensePieChart3D } from '../components/Dashboard/ExpensePieChart3D'

export const AnalyticsPage: React.FC = () => {
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
              <h1 className="text-2xl font-bold text-white mb-2">Analytics & Reports</h1>
              <p className="text-gray-400">Deep insights into your financial patterns and trends</p>
            </div>
            
            <div className="flex items-center gap-3">
              <NeonButton
                variant="ghost"
                size="sm"
                icon={<Download className="w-4 h-4" />}
              >
                Export Report
              </NeonButton>
              
              <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="month" className="bg-gray-800">This Month</option>
                <option value="quarter" className="bg-gray-800">This Quarter</option>
                <option value="year" className="bg-gray-800">This Year</option>
              </select>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Expense Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassmorphicCard className="p-6" glow neonColor="primary">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Spending Analysis</h2>
              <div className="text-sm text-gray-400">Interactive 3D View</div>
            </div>
            <ExpensePieChart3D />
          </GlassmorphicCard>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassmorphicCard className="p-6" glow neonColor="accent">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-accent-500" />
              <h3 className="text-lg font-semibold text-white">Trends</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Growth</span>
                <span className="text-green-400 font-semibold">+12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Savings Rate</span>
                <span className="text-green-400 font-semibold">25.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Expense Ratio</span>
                <span className="text-yellow-400 font-semibold">74.1%</span>
              </div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6" glow neonColor="secondary">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-secondary-500" />
              <h3 className="text-lg font-semibold text-white">Top Categories</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-400">Food & Dining</span>
                </div>
                <span className="text-white font-semibold">$425</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-gray-400">Shopping</span>
                </div>
                <span className="text-white font-semibold">$350</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-gray-400">Transportation</span>
                </div>
                <span className="text-white font-semibold">$245</span>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassmorphicCard className="p-6" glow neonColor="primary">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">$5,200</div>
              <div className="text-sm text-gray-400 mb-2">Total Income</div>
              <div className="text-green-400 text-sm">+8.2% from last month</div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6" glow neonColor="warning">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">$3,851</div>
              <div className="text-sm text-gray-400 mb-2">Total Expenses</div>
              <div className="text-red-400 text-sm">+5.1% from last month</div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6" glow neonColor="accent">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">$1,349</div>
              <div className="text-sm text-gray-400 mb-2">Net Savings</div>
              <div className="text-green-400 text-sm">+15.3% from last month</div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6" glow neonColor="secondary">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">47</div>
              <div className="text-sm text-gray-400 mb-2">Transactions</div>
              <div className="text-blue-400 text-sm">-2 from last month</div>
            </div>
          </GlassmorphicCard>
        </div>
      </motion.div>
    </div>
  )
}