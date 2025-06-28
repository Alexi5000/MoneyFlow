import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Filter, Search, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useFinancialStore } from '../../store/financialStore'
import { GlassmorphicCard } from '../UI/GlassmorphicCard'

export const TransactionFlow: React.FC = () => {
  const { transactions, getRecentTransactions } = useFinancialStore()
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  
  const recentTransactions = getRecentTransactions(20)
  
  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || transaction.category === selectedCategory
    
    return matchesFilter && matchesSearch && matchesCategory
  })
  
  const categories = [...new Set(transactions.map(t => t.category))]
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount))
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Food & Dining': '🍽️',
      'Transportation': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Health & Fitness': '💪',
      'Housing': '🏠',
      'Income': '💰',
    }
    return icons[category] || '💳'
  }
  
  return (
    <GlassmorphicCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Transaction Flow</h2>
          <p className="text-sm text-gray-400">Recent financial activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Last 30 days</span>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {/* Type Filter */}
        <div className="flex bg-white/10 rounded-lg p-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'income', label: 'Income' },
            { key: 'expense', label: 'Expenses' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category} className="bg-gray-800">
              {category}
            </option>
          ))}
        </select>
      </div>
      
      {/* Transaction List */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
            >
              <GlassmorphicCard 
                className="p-4 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                hover
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Transaction Icon */}
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    
                    {/* Transaction Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                        <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                          {transaction.description}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{transaction.category}</span>
                        {transaction.merchant && (
                          <>
                            <span>•</span>
                            <span>{transaction.merchant}</span>
                          </>
                        )}
                        {transaction.paymentMethod && (
                          <>
                            <span>•</span>
                            <span>{transaction.paymentMethod}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Amount and Date */}
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
                
                {/* Transaction Flow Animation */}
                <motion.div
                  className={`absolute left-0 top-0 w-1 h-full rounded-l-lg ${
                    transaction.type === 'income' ? 'bg-green-400' : 'bg-red-400'
                  }`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </GlassmorphicCard>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">No transactions found</div>
            <div className="text-sm text-gray-500">
              Try adjusting your filters or search terms
            </div>
          </div>
        )}
      </div>
      
      {/* Summary */}
      {filteredTransactions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-400">Total Transactions</div>
              <div className="text-lg font-bold text-white">{filteredTransactions.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Income</div>
              <div className="text-lg font-bold text-green-400">
                +{formatCurrency(
                  filteredTransactions
                    .filter(t => t.type === 'income')
                    .reduce((sum, t) => sum + t.amount, 0)
                )}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Expenses</div>
              <div className="text-lg font-bold text-red-400">
                -{formatCurrency(
                  filteredTransactions
                    .filter(t => t.type === 'expense')
                    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassmorphicCard>
  )
}