import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Target, TrendingUp, AlertTriangle } from 'lucide-react'
import { GlassmorphicCard } from '../components/UI/GlassmorphicCard'
import { NeonButton } from '../components/UI/NeonButton'
import { LiquidBudgetGauge } from '../components/Dashboard/LiquidBudgetGauge'
import { useFinancialStore } from '../store/financialStore'

export const BudgetsPage: React.FC = () => {
  const { budgets } = useFinancialStore()

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
              <h1 className="text-2xl font-bold text-white mb-2">Budgets & Goals</h1>
              <p className="text-gray-400">Track your spending and achieve your financial goals</p>
            </div>
            
            <div className="flex items-center gap-3">
              <NeonButton
                variant="ghost"
                size="sm"
                icon={<Target className="w-4 h-4" />}
              >
                Set Goal
              </NeonButton>
              
              <NeonButton
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
              >
                Create Budget
              </NeonButton>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Budget Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlassmorphicCard className="p-6" glow neonColor="primary">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Budget Overview</h2>
            <div className="text-sm text-gray-400">Liquid Fill Indicators</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {budgets.map((budget) => (
              <LiquidBudgetGauge
                key={budget.id}
                category={budget.category}
                spent={budget.spent}
                allocated={budget.allocated}
                percentage={budget.percentage}
                color={budget.color}
                icon={budget.icon}
              />
            ))}
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Budget Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget Alerts */}
          <GlassmorphicCard className="p-6" glow neonColor="warning">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-warning-500" />
              <h3 className="text-lg font-semibold text-white">Budget Alerts</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-red-400 font-medium">Shopping</span>
                  <span className="text-red-400 text-sm">87%</span>
                </div>
                <p className="text-xs text-gray-400">Close to budget limit</p>
              </div>
              
              <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-yellow-400 font-medium">Transportation</span>
                  <span className="text-yellow-400 text-sm">82%</span>
                </div>
                <p className="text-xs text-gray-400">Monitor spending</p>
              </div>
            </div>
          </GlassmorphicCard>

          {/* Savings Goals */}
          <GlassmorphicCard className="p-6" glow neonColor="accent">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-accent-500" />
              <h3 className="text-lg font-semibold text-white">Savings Goals</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Emergency Fund</span>
                  <span className="text-white">87.5%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full w-[87.5%]" />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>$8,750</span>
                  <span>$10,000</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Vacation Fund</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full w-[45%]" />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>$2,250</span>
                  <span>$5,000</span>
                </div>
              </div>
            </div>
          </GlassmorphicCard>

          {/* Budget Performance */}
          <GlassmorphicCard className="p-6" glow neonColor="secondary">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-secondary-500" />
              <h3 className="text-lg font-semibold text-white">Performance</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Budgeted</span>
                <span className="text-white font-semibold">$3,150</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Spent</span>
                <span className="text-white font-semibold">$2,383</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Remaining</span>
                <span className="text-green-400 font-semibold">$767</span>
              </div>
              <div className="border-t border-white/10 pt-2">
                <div className="flex justify-between">
                  <span className="text-white font-medium">On Track</span>
                  <span className="text-green-400 font-bold">75.6%</span>
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      </motion.div>
    </div>
  )
}