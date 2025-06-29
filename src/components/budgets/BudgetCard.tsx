import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit3, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import { FestivalCard } from '../ui/FestivalCard'
import { ChunkyButton } from '../ui/ChunkyButton'
import { LiquidFillIndicator } from './LiquidFillIndicator'
import { Budget } from '../../types'

interface BudgetCardProps {
  budget: Budget
  onEdit: () => void
  onCelebrate: () => void
}

export const BudgetCard: React.FC<BudgetCardProps> = ({
  budget,
  onEdit,
  onCelebrate
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusInfo = () => {
    if (budget.percentage > 100) {
      return {
        status: 'over',
        message: 'Over Budget! 🚨',
        color: 'pink',
        icon: AlertTriangle,
        textColor: 'text-red-600'
      }
    } else if (budget.percentage > 80) {
      return {
        status: 'warning',
        message: 'Getting Close! ⚠️',
        color: 'orange',
        icon: TrendingUp,
        textColor: 'text-orange-600'
      }
    } else {
      return {
        status: 'good',
        message: 'Looking Great! ✨',
        color: 'green',
        icon: CheckCircle,
        textColor: 'text-green-600'
      }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  const handleCelebration = () => {
    if (statusInfo.status === 'good') {
      onCelebrate()
    }
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <FestivalCard 
        color={statusInfo.color as any}
        className="p-6 h-full"
        hover={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{budget.icon}</div>
            <div>
              <h3 className="font-bungee text-lg text-white">
                {budget.category}
              </h3>
              <p className={`font-fredoka text-sm ${statusInfo.textColor}`}>
                {statusInfo.message}
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={onEdit}
            className="p-2 bg-white rounded-full border-3 border-black hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit3 className="w-4 h-4 text-black" />
          </motion.button>
        </div>

        {/* Liquid Fill Indicator */}
        <div className="flex justify-center mb-6">
          <LiquidFillIndicator
            percentage={budget.percentage}
            size="md"
            animated={true}
            showBubbles={true}
          />
        </div>

        {/* Budget Details */}
        <div className="bg-white rounded-2xl p-4 border-3 border-black mb-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-bungee text-lg text-black">
                ${budget.spent.toFixed(0)}
              </div>
              <div className="font-fredoka text-sm text-gray-600">Spent</div>
            </div>
            <div>
              <div className="font-bungee text-lg text-black">
                ${budget.allocated.toFixed(0)}
              </div>
              <div className="font-fredoka text-sm text-gray-600">Budget</div>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t-2 border-gray-200">
            <div className="text-center">
              <div className={`font-bungee text-xl ${
                budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                ${Math.abs(budget.remaining).toFixed(0)}
              </div>
              <div className="font-fredoka text-sm text-gray-600">
                {budget.remaining >= 0 ? 'Remaining' : 'Over Budget'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          {statusInfo.status === 'good' ? (
            <ChunkyButton
              color="yellow"
              size="sm"
              emoji="🎉"
              onClick={handleCelebration}
            >
              Celebrate!
            </ChunkyButton>
          ) : statusInfo.status === 'warning' ? (
            <ChunkyButton
              color="orange"
              size="sm"
              emoji="⚠️"
              onClick={onEdit}
            >
              Adjust Budget
            </ChunkyButton>
          ) : (
            <ChunkyButton
              color="pink"
              size="sm"
              emoji="🚨"
              onClick={onEdit}
            >
              Need Help!
            </ChunkyButton>
          )}
        </div>

        {/* Hover Effects */}
        <motion.div
          className="absolute inset-0 bg-white bg-opacity-10 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Status Indicator */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-3 border-black flex items-center justify-center ${
          statusInfo.status === 'good' ? 'bg-green-400' :
          statusInfo.status === 'warning' ? 'bg-orange-400' : 'bg-red-400'
        }`}>
          <StatusIcon className="w-3 h-3 text-white" />
        </div>
      </FestivalCard>
    </motion.div>
  )
}