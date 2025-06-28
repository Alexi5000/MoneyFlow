import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, Download, Upload } from 'lucide-react'
import { GlassmorphicCard } from '../components/UI/GlassmorphicCard'
import { NeonButton } from '../components/UI/NeonButton'
import { TransactionFlow } from '../components/Transactions/TransactionFlow'

export const TransactionsPage: React.FC = () => {
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
              <h1 className="text-2xl font-bold text-white mb-2">Transactions</h1>
              <p className="text-gray-400">Manage and track all your financial transactions</p>
            </div>
            
            <div className="flex items-center gap-3">
              <NeonButton
                variant="ghost"
                size="sm"
                icon={<Filter className="w-4 h-4" />}
              >
                Filter
              </NeonButton>
              
              <NeonButton
                variant="ghost"
                size="sm"
                icon={<Download className="w-4 h-4" />}
              >
                Export
              </NeonButton>
              
              <NeonButton
                variant="ghost"
                size="sm"
                icon={<Upload className="w-4 h-4" />}
              >
                Import
              </NeonButton>
              
              <NeonButton
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
              >
                Add Transaction
              </NeonButton>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Transaction Flow Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TransactionFlow />
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassmorphicCard className="p-6" glow neonColor="primary">
            <h3 className="text-lg font-semibold text-white mb-2">This Month</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Income</span>
                <span className="text-green-400 font-semibold">+$5,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Expenses</span>
                <span className="text-red-400 font-semibold">-$3,851</span>
              </div>
              <div className="border-t border-white/10 pt-2">
                <div className="flex justify-between">
                  <span className="text-white font-medium">Net</span>
                  <span className="text-green-400 font-bold">+$1,349</span>
                </div>
              </div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6" glow neonColor="secondary">
            <h3 className="text-lg font-semibold text-white mb-2">Categories</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Food & Dining</span>
                <span className="text-white">$425</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transportation</span>
                <span className="text-white">$245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shopping</span>
                <span className="text-white">$350</span>
              </div>
            </div>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6" glow neonColor="accent">
            <h3 className="text-lg font-semibold text-white mb-2">Recent Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Today</span>
                <span className="text-white">3 transactions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">This Week</span>
                <span className="text-white">12 transactions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">This Month</span>
                <span className="text-white">47 transactions</span>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      </motion.div>
    </div>
  )
}