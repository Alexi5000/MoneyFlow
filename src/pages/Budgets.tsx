import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Target, TrendingUp, AlertTriangle, Edit3 } from 'lucide-react'
import { FestivalCard } from '../components/ui/FestivalCard'
import { ChunkyButton } from '../components/ui/ChunkyButton'
import { WavyText } from '../components/ui/WavyText'
import { ConfettiEffect } from '../components/ui/ConfettiEffect'
import { BudgetCard } from '../components/budgets/BudgetCard'
import { BudgetModal } from '../components/budgets/BudgetModal'
import { useFinancialStore } from '../store/financialStore'
import { Budget } from '../types'

export const Budgets: React.FC = () => {
  const { 
    budgets, 
    isLoading, 
    error, 
    fetchBudgets,
    updateBudget,
    createBudget 
  } = useFinancialStore()

  const [showConfetti, setShowConfetti] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)

  useEffect(() => {
    if (budgets.length === 0) {
      fetchBudgets()
    }
  }, [budgets.length, fetchBudgets])

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }

  const handleCreateBudget = () => {
    setEditingBudget(null)
    setIsModalOpen(true)
  }

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget)
    setIsModalOpen(true)
  }

  const handleSaveBudget = async (budgetData: Omit<Budget, 'id'>) => {
    try {
      if (editingBudget) {
        await updateBudget(editingBudget.id, budgetData)
      } else {
        await createBudget(budgetData)
      }
      setIsModalOpen(false)
      setEditingBudget(null)
      triggerConfetti()
    } catch (error) {
      console.error('Failed to save budget:', error)
    }
  }

  // Calculate budget statistics
  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = budgets.reduce((sum, budget) => sum + budget.remaining, 0)
  const overBudgetCount = budgets.filter(budget => budget.percentage > 100).length
  const nearLimitCount = budgets.filter(budget => budget.percentage > 80 && budget.percentage <= 100).length
  const onTrackCount = budgets.filter(budget => budget.percentage <= 80).length

  const getMotivationalMessage = () => {
    if (overBudgetCount > 0) {
      return "Time to reign in the party! 🚨 Some budgets need attention."
    } else if (nearLimitCount > 0) {
      return "Getting close to the limits! ⚠️ Keep an eye on your spending."
    } else {
      return "You're crushing it! 🎉 Your budgets are looking fantastic!"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4 animate-festival-bounce">🎯</div>
          <WavyText size="lg">Loading Your Budget Party...</WavyText>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <FestivalCard color="pink" className="text-center">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="font-bungee text-2xl text-black mb-4">Budget Party Crashed!</h2>
          <p className="font-fredoka text-gray-700 mb-6">{error}</p>
          <ChunkyButton color="yellow" onClick={() => fetchBudgets()}>
            Restart the Party! 🔄
          </ChunkyButton>
        </FestivalCard>
      </div>
    )
  }

  return (
    <>
      <ConfettiEffect trigger={showConfetti} />
      <div className="min-h-screen bg-cream p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WavyText size="xl" className="mb-4">
              Budget Festival Central! 🎯
            </WavyText>
            <motion.p
              className="font-fredoka text-xl text-gray-700 max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Watch your money flow like liquid magic! 💧✨ 
              {getMotivationalMessage()}
            </motion.p>
            
            <ChunkyButton 
              color="purple" 
              emoji="🎯" 
              onClick={handleCreateBudget}
              rotation={2}
            >
              Create New Budget
            </ChunkyButton>
          </motion.div>

          {/* Budget Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FestivalCard color="yellow" rotation={1}>
                <div className="text-center">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-bungee text-lg text-white mb-2">Total Budget</h3>
                  <div className="bg-white rounded-2xl p-4 border-3 border-black">
                    <div className="text-2xl font-bungee text-black">
                      ${totalAllocated.toFixed(0)}
                    </div>
                    <div className="text-sm font-fredoka text-gray-600">
                      Allocated this month
                    </div>
                  </div>
                </div>
              </FestivalCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FestivalCard color="pink" rotation={-1}>
                <div className="text-center">
                  <div className="text-4xl mb-3">💸</div>
                  <h3 className="font-bungee text-lg text-white mb-2">Total Spent</h3>
                  <div className="bg-white rounded-2xl p-4 border-3 border-black">
                    <div className="text-2xl font-bungee text-black">
                      ${totalSpent.toFixed(0)}
                    </div>
                    <div className="text-sm font-fredoka text-gray-600">
                      {((totalSpent / totalAllocated) * 100).toFixed(1)}% of budget
                    </div>
                  </div>
                </div>
              </FestivalCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FestivalCard color="green" rotation={2}>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bungee text-lg text-white mb-2">On Track</h3>
                  <div className="bg-white rounded-2xl p-4 border-3 border-black">
                    <div className="text-2xl font-bungee text-black">
                      {onTrackCount}
                    </div>
                    <div className="text-sm font-fredoka text-gray-600">
                      Budgets doing great!
                    </div>
                  </div>
                </div>
              </FestivalCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FestivalCard color="orange" rotation={-2}>
                <div className="text-center">
                  <div className="text-4xl mb-3">⚠️</div>
                  <h3 className="font-bungee text-lg text-white mb-2">Alerts</h3>
                  <div className="bg-white rounded-2xl p-4 border-3 border-black">
                    <div className="text-2xl font-bungee text-black">
                      {overBudgetCount + nearLimitCount}
                    </div>
                    <div className="text-sm font-fredoka text-gray-600">
                      Need attention
                    </div>
                  </div>
                </div>
              </FestivalCard>
            </motion.div>
          </div>

          {/* Budget Cards Grid */}
          {budgets.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center mb-8">
                <h2 className="font-bungee text-3xl text-festival-purple-500 mb-2 transform -rotate-1">
                  Your Liquid Budget Meters! 💧
                </h2>
                <p className="font-fredoka text-lg text-gray-700">
                  Watch your spending flow like colorful liquid magic!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {budgets.map((budget, index) => (
                  <motion.div
                    key={budget.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BudgetCard
                      budget={budget}
                      onEdit={() => handleEditBudget(budget)}
                      onCelebrate={triggerConfetti}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FestivalCard color="purple" className="text-center p-12">
                <div className="text-8xl mb-6">🎪</div>
                <h2 className="font-bungee text-3xl text-white mb-4">
                  No Budgets Yet!
                </h2>
                <p className="font-fredoka text-xl text-white mb-8">
                  Time to start your budget party! Create your first budget and watch the liquid magic begin! ✨
                </p>
                <ChunkyButton 
                  color="yellow" 
                  size="lg" 
                  emoji="🎯" 
                  onClick={handleCreateBudget}
                >
                  Create Your First Budget!
                </ChunkyButton>
              </FestivalCard>
            </motion.div>
          )}

          {/* Budget Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FestivalCard color="green" className="p-6">
              <div className="text-center mb-6">
                <h2 className="font-bungee text-2xl text-white mb-2">
                  Budget Party Tips! 🎉
                </h2>
                <p className="font-fredoka text-white">
                  Pro tips to keep your financial festival flowing smoothly!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-4 border-3 border-black transform rotate-1">
                  <div className="text-3xl mb-2">🌊</div>
                  <h3 className="font-bungee text-black mb-2">Watch the Flow</h3>
                  <p className="font-fredoka text-gray-700 text-sm">
                    Green liquid = you're doing great! Yellow = getting close. Red = time to slow down!
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border-3 border-black transform -rotate-1">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-bungee text-black mb-2">Set Realistic Goals</h3>
                  <p className="font-fredoka text-gray-700 text-sm">
                    Start with achievable budgets and adjust as you learn your spending patterns!
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border-3 border-black transform rotate-1">
                  <div className="text-3xl mb-2">🎊</div>
                  <h3 className="font-bungee text-black mb-2">Celebrate Wins</h3>
                  <p className="font-fredoka text-gray-700 text-sm">
                    Stayed under budget? That's worth a celebration! Small wins lead to big success!
                  </p>
                </div>
              </div>
            </FestivalCard>
          </motion.div>
        </div>
      </div>

      {/* Budget Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingBudget(null)
        }}
        onSave={handleSaveBudget}
        budget={editingBudget}
      />
    </>
  )
}