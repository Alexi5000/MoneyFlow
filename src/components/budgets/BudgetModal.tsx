import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Target, DollarSign, Palette } from 'lucide-react'
import { FestivalCard } from '../ui/FestivalCard'
import { ChunkyButton } from '../ui/ChunkyButton'
import { Budget } from '../../types'

interface BudgetModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (budget: Omit<Budget, 'id'>) => void
  budget?: Budget | null
}

const CATEGORIES = [
  { name: 'Food & Dining', icon: '🍽️', color: '#10b981' },
  { name: 'Transportation', icon: '🚗', color: '#3b82f6' },
  { name: 'Entertainment', icon: '🎬', color: '#8b5cf6' },
  { name: 'Shopping', icon: '🛍️', color: '#f59e0b' },
  { name: 'Health & Fitness', icon: '💪', color: '#06b6d4' },
  { name: 'Utilities', icon: '⚡', color: '#ef4444' },
  { name: 'Housing', icon: '🏠', color: '#84cc16' },
  { name: 'Education', icon: '📚', color: '#f97316' },
  { name: 'Travel', icon: '✈️', color: '#ec4899' },
  { name: 'Savings', icon: '💰', color: '#059669' },
]

const COLORS = [
  '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#06b6d4',
  '#ef4444', '#84cc16', '#f97316', '#ec4899', '#059669'
]

export const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  budget
}) => {
  const [formData, setFormData] = useState({
    category: '',
    allocated: '',
    icon: '🎯',
    color: '#10b981'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category,
        allocated: budget.allocated.toString(),
        icon: budget.icon,
        color: budget.color
      })
    } else {
      setFormData({
        category: '',
        allocated: '',
        icon: '🎯',
        color: '#10b981'
      })
    }
    setErrors({})
  }, [budget, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    const allocatedAmount = parseFloat(formData.allocated)
    if (!formData.allocated || isNaN(allocatedAmount) || allocatedAmount <= 0) {
      newErrors.allocated = 'Please enter a valid amount greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const budgetData: Omit<Budget, 'id'> = {
      category: formData.category,
      allocated: parseFloat(formData.allocated),
      spent: budget?.spent || 0,
      remaining: parseFloat(formData.allocated) - (budget?.spent || 0),
      percentage: budget ? (budget.spent / parseFloat(formData.allocated)) * 100 : 0,
      color: formData.color,
      icon: formData.icon
    }

    onSave(budgetData)
  }

  const handleCategorySelect = (category: typeof CATEGORIES[0]) => {
    setFormData(prev => ({
      ...prev,
      category: category.name,
      icon: category.icon,
      color: category.color
    }))
  }

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    return numericValue
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <FestivalCard color="purple" className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <h2 className="font-bungee text-2xl text-white">
                    {budget ? 'Edit Budget' : 'Create New Budget'}
                  </h2>
                  <p className="font-fredoka text-white">
                    Set up your spending limits and watch the magic happen! ✨
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                className="p-2 bg-white rounded-full border-3 border-black hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-black" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="bg-white rounded-2xl p-4 border-3 border-black">
                <label className="block font-bungee text-black mb-3">
                  Choose Category 🎪
                </label>
                
                {!budget && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {CATEGORIES.map((category) => (
                      <motion.button
                        key={category.name}
                        type="button"
                        onClick={() => handleCategorySelect(category)}
                        className={`p-3 rounded-xl border-3 border-black transition-all ${
                          formData.category === category.name
                            ? 'bg-festival-yellow-400 scale-105'
                            : 'bg-white hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl mb-1">{category.icon}</div>
                        <div className="font-fredoka text-xs text-black">
                          {category.name}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Custom Category Input */}
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Or enter custom category..."
                    className="w-full px-4 py-3 border-3 border-black rounded-xl font-fredoka text-black placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-festival-yellow-400"
                    disabled={!!budget}
                  />
                  {errors.category && (
                    <p className="text-red-600 font-fredoka text-sm">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Budget Amount */}
              <div className="bg-white rounded-2xl p-4 border-3 border-black">
                <label className="block font-bungee text-black mb-3">
                  Budget Amount 💰
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.allocated}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      allocated: formatCurrency(e.target.value) 
                    }))}
                    placeholder="0.00"
                    className="w-full pl-12 pr-4 py-3 border-3 border-black rounded-xl font-fredoka text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-festival-yellow-400"
                  />
                </div>
                {errors.allocated && (
                  <p className="text-red-600 font-fredoka text-sm mt-2">{errors.allocated}</p>
                )}
                <p className="font-fredoka text-gray-600 text-sm mt-2">
                  This is how much you plan to spend in this category per month
                </p>
              </div>

              {/* Icon and Color Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Icon Selection */}
                <div className="bg-white rounded-2xl p-4 border-3 border-black">
                  <label className="block font-bungee text-black mb-3">
                    Choose Icon 🎨
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['🎯', '🍽️', '🚗', '🎬', '🛍️', '💪', '⚡', '🏠', '📚', '✈️'].map((icon) => (
                      <motion.button
                        key={icon}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, icon }))}
                        className={`p-2 rounded-lg border-2 border-black text-xl ${
                          formData.icon === icon ? 'bg-festival-yellow-400' : 'bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {icon}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="bg-white rounded-2xl p-4 border-3 border-black">
                  <label className="block font-bungee text-black mb-3">
                    Choose Color 🌈
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {COLORS.map((color) => (
                      <motion.button
                        key={color}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-full border-3 border-black ${
                          formData.color === color ? 'ring-4 ring-festival-yellow-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-2xl p-4 border-3 border-black">
                <label className="block font-bungee text-black mb-3">
                  Preview 👀
                </label>
                <div className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-300">
                  <div className="text-2xl">{formData.icon}</div>
                  <div>
                    <div className="font-bungee text-black">
                      {formData.category || 'Category Name'}
                    </div>
                    <div className="font-fredoka text-gray-600">
                      ${formData.allocated || '0'} budget
                    </div>
                  </div>
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-black ml-auto"
                    style={{ backgroundColor: formData.color }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <ChunkyButton
                  color="yellow"
                  size="lg"
                  emoji="💾"
                  onClick={handleSubmit}
                  className="flex-1"
                >
                  {budget ? 'Update Budget' : 'Create Budget'}
                </ChunkyButton>
                
                <ChunkyButton
                  color="pink"
                  size="lg"
                  emoji="❌"
                  onClick={onClose}
                >
                  Cancel
                </ChunkyButton>
              </div>
            </form>
          </FestivalCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}