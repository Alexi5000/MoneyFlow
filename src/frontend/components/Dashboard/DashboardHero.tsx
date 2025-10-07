import React from 'react'
import { motion } from 'framer-motion'
import { Plus, TrendingUp, Eye, Zap } from 'lucide-react'
import { useFinancialStore } from '../../../store/financialStore'
import { GlassmorphicCard } from '../UI/GlassmorphicCard'
import { NeonButton } from '../UI/NeonButton'
import { MoneyParticleSystem } from './MoneyParticleSystem'
import { Avatar } from '../UI/ImageWithFallback'

export const DashboardHero: React.FC = () => {
  const { user, getTotalIncome, getTotalExpenses } = useFinancialStore()
  
  if (!user) return null
  
  const totalIncome = getTotalIncome()
  const totalExpenses = getTotalExpenses()
  const netWorth = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }
  
  return (
    <div className="relative overflow-hidden">
      <MoneyParticleSystem count={500} speed={0.3} color="#6366f1" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Welcome Card */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassmorphicCard className="p-6 h-full" glow neonColor="primary">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar
                    src={user.avatar}
                    name={user.name}
                    size="lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Welcome back, {user.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-gray-400">
                    Here's your financial overview for today
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-400">Live Data</span>
              </div>
            </div>
            
            {/* Balance Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                <motion.div
                  className="text-3xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {formatCurrency(user.totalBalance)}
                </motion.div>
              </div>
              
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400 mb-1">This Month</p>
                <div className="text-xl font-semibold text-green-400">
                  +{formatCurrency(totalIncome)}
                </div>
                <div className="text-lg font-semibold text-red-400">
                  -{formatCurrency(totalExpenses)}
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400 mb-1">Savings Rate</p>
                <div className="text-2xl font-bold text-accent-400">
                  {savingsRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">
                  {savingsRate > 20 ? 'Excellent!' : savingsRate > 10 ? 'Good' : 'Needs work'}
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <NeonButton
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => console.log('Add transaction')}
              >
                Add Transaction
              </NeonButton>
              <NeonButton
                variant="secondary"
                size="sm"
                icon={<TrendingUp className="w-4 h-4" />}
                onClick={() => console.log('View reports')}
              >
                View Reports
              </NeonButton>
              <NeonButton
                variant="ghost"
                size="sm"
                icon={<Eye className="w-4 h-4" />}
                onClick={() => console.log('AI insights')}
              >
                AI Insights
              </NeonButton>
            </div>
          </GlassmorphicCard>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Savings Goal Progress */}
          <GlassmorphicCard className="p-4" glow neonColor="accent">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-400">Savings Goal</h3>
              <div className="text-xs text-accent-400 font-medium">
                {((user.currentSavings / user.savingsGoal) * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="mb-3">
              <div className="text-xl font-bold text-white">
                {formatCurrency(user.currentSavings)}
              </div>
              <div className="text-sm text-gray-400">
                of {formatCurrency(user.savingsGoal)} goal
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <motion.div
                className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(user.currentSavings / user.savingsGoal) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            
            <div className="text-xs text-gray-400">
              {formatCurrency(user.savingsGoal - user.currentSavings)} remaining
            </div>
          </GlassmorphicCard>
          
          {/* Monthly Summary */}
          <GlassmorphicCard className="p-4" glow neonColor="warning">
            <h3 className="text-sm font-medium text-gray-400 mb-3">This Month</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Income</span>
                <span className="text-green-400 font-medium">
                  +{formatCurrency(user.monthlyIncome)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Expenses</span>
                <span className="text-red-400 font-medium">
                  -{formatCurrency(user.monthlyExpenses)}
                </span>
              </div>
              
              <div className="border-t border-white/10 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Net</span>
                  <span className={`font-bold ${
                    user.monthlyIncome - user.monthlyExpenses > 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {user.monthlyIncome - user.monthlyExpenses > 0 ? '+' : ''}
                    {formatCurrency(user.monthlyIncome - user.monthlyExpenses)}
                  </span>
                </div>
              </div>
            </div>
          </GlassmorphicCard>
          
          {/* Quick Stat */}
          <GlassmorphicCard className="p-4" glow neonColor="secondary">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {formatNumber(Math.abs(netWorth))}
              </div>
              <div className="text-sm text-gray-400">
                Net Worth {netWorth >= 0 ? 'Growth' : 'Deficit'}
              </div>
              <div className={`text-xs mt-1 ${
                netWorth >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {netWorth >= 0 ? '↗' : '↘'} 
                {netWorth >= 0 ? 'Positive trend' : 'Needs attention'}
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </div>
  )
}