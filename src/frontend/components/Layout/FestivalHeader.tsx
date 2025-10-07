import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChunkyButton } from '../UI/ChunkyButton'
import { ConfettiEffect } from '../UI/ConfettiEffect'
import { useFinancialStore } from '../../../store/financialStore'

export const FestivalHeader: React.FC = () => {
  const { user } = useFinancialStore()
  const [showConfetti, setShowConfetti] = useState(false)

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }

  return (
    <>
      <ConfettiEffect trigger={showConfetti} />
      <motion.header
        className="p-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="emoji-icon">
              💰
            </div>
            <div>
              <h1 className="wavy-text text-4xl md:text-5xl">
                <span className="word-1 text-pink-500">Money</span>
                <span className="word-2 text-yellow-500">Flow</span>
                <span className="word-3 text-orange-500">Party!</span>
              </h1>
              <p className="font-fredoka text-lg text-gray-700 text-center">
                Your Financial Festival! 🎉
              </p>
            </div>
          </motion.div>

          {/* User Info */}
          {user && (
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-right hidden md:block">
                <p className="font-bungee text-lg text-black">Hey {user.name.split(' ')[0]}! 👋</p>
                <p className="font-fredoka text-sm text-gray-600">Ready to party with your money?</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-pink-400 rounded-full transform rotate-3" />
                <img
                  src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                  alt={user.name}
                  className="relative w-16 h-16 rounded-full border-4 border-black object-cover z-10"
                />
              </div>
            </motion.div>
          )}

          {/* Action Button */}
          <ChunkyButton
            color="yellow"
            emoji="🎊"
            onClick={triggerConfetti}
            className="hidden md:block"
          >
            Celebrate!
          </ChunkyButton>
        </div>
      </motion.header>
    </>
  )
}