import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FestivalCard } from '../UI/FestivalCard'
import { ChunkyButton } from '../UI/ChunkyButton'
import { PhotoCard } from '../UI/PhotoCard'
import { ConfettiEffect } from '../UI/ConfettiEffect'
import { useFinancialStore } from '../../store/financialStore'

export const FestivalDashboardHero: React.FC = () => {
  const { user, getTotalIncome, getTotalExpenses } = useFinancialStore()
  const [showConfetti, setShowConfetti] = useState(false)
  
  if (!user) return null
  
  const totalIncome = getTotalIncome()
  const totalExpenses = getTotalExpenses()
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const triggerCelebration = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }
  
  return (
    <>
      <ConfettiEffect trigger={showConfetti} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Balance Card */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FestivalCard color="yellow" className="h-full">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <PhotoCard
                src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                alt={user.name}
                name={user.name.split(' ')[0]}
                bgColor="pink"
                className="flex-shrink-0"
              />
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-bungee text-3xl md:text-4xl text-black mb-2">
                  Your Money Stash! 💰
                </h2>
                <div className="space-y-2">
                  <div className="bg-white rounded-2xl p-4 border-3 border-black transform -rotate-1">
                    <p className="font-fredoka text-sm text-gray-600">Total Balance</p>
                    <p className="font-bungee text-3xl text-black">
                      {formatCurrency(user.totalBalance)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-400 rounded-2xl p-3 border-3 border-black transform rotate-1">
                      <p className="font-fredoka text-xs text-black">This Month In</p>
                      <p className="font-bungee text-lg text-black">
                        +{formatCurrency(totalIncome)}
                      </p>
                    </div>
                    
                    <div className="bg-pink-400 rounded-2xl p-3 border-3 border-black transform -rotate-1">
                      <p className="font-fredoka text-xs text-white">This Month Out</p>
                      <p className="font-bungee text-lg text-white">
                        -{formatCurrency(totalExpenses)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <ChunkyButton
                color="pink"
                emoji="💸"
                onClick={triggerCelebration}
              >
                Add Money Move
              </ChunkyButton>
              <ChunkyButton
                color="purple"
                emoji="📊"
                rotation={2}
              >
                See Magic
              </ChunkyButton>
              <ChunkyButton
                color="green"
                emoji="🎯"
                rotation={-2}
              >
                Set Goals
              </ChunkyButton>
            </div>
          </FestivalCard>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Savings Goal */}
          <FestivalCard color="green" rotation={-2}>
            <div className="text-center">
              <div className="emoji-icon mx-auto mb-3">
                🎯
              </div>
              <h3 className="font-bungee text-lg text-white mb-2">Savings Party!</h3>
              
              <div className="bg-white rounded-2xl p-4 border-3 border-black mb-3">
                <div className="text-2xl font-bungee text-black">
                  {formatCurrency(user.currentSavings)}
                </div>
                <div className="text-sm font-fredoka text-gray-600">
                  of {formatCurrency(user.savingsGoal)} goal
                </div>
              </div>
              
              <div className="w-full bg-white rounded-full h-4 border-3 border-black mb-2">
                <motion.div
                  className="bg-green-500 h-full rounded-full border-2 border-black"
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.currentSavings / user.savingsGoal) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              
              <div className="text-xs font-fredoka text-white">
                {((user.currentSavings / user.savingsGoal) * 100).toFixed(1)}% Complete! 🎉
              </div>
            </div>
          </FestivalCard>
          
          {/* Savings Rate */}
          <FestivalCard color="purple" rotation={2}>
            <div className="text-center">
              <div className="emoji-icon mx-auto mb-3">
                ⚡
              </div>
              <h3 className="font-bungee text-lg text-white mb-2">Savings Power!</h3>
              
              <div className="bg-white rounded-2xl p-4 border-3 border-black">
                <div className="text-3xl font-bungee text-black">
                  {savingsRate.toFixed(1)}%
                </div>
                <div className="text-sm font-fredoka text-gray-600">
                  {savingsRate > 20 ? 'Amazing! 🔥' : savingsRate > 10 ? 'Good job! 👍' : 'Keep going! 💪'}
                </div>
              </div>
            </div>
          </FestivalCard>
          
          {/* Fun Fact */}
          <FestivalCard color="orange" rotation={-1}>
            <div className="text-center">
              <div className="emoji-icon mx-auto mb-3">
                🎪
              </div>
              <h3 className="font-bungee text-lg text-white mb-2">Fun Fact!</h3>
              
              <div className="bg-white rounded-2xl p-4 border-3 border-black">
                <div className="text-lg font-bungee text-black mb-1">
                  {Math.abs(user.monthlyIncome - user.monthlyExpenses) > 1000 ? '🚀' : '🌟'}
                </div>
                <div className="text-sm font-fredoka text-gray-600">
                  {user.monthlyIncome - user.monthlyExpenses > 0 
                    ? `You're saving ${formatCurrency(user.monthlyIncome - user.monthlyExpenses)} monthly!`
                    : 'Time to boost those savings!'
                  }
                </div>
              </div>
            </div>
          </FestivalCard>
        </motion.div>
      </div>
    </>
  )
}