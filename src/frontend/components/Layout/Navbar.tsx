import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { PhotoCard } from '../ui/PhotoCard'
import { RainbowStripes } from '../ui/RainbowStripes'
import { ConfettiEffect } from '../ui/ConfettiEffect'
import { useFinancialStore } from '../../../store/financialStore'

export const Navbar: React.FC = () => {
  const { user } = useFinancialStore()
  const [showConfetti, setShowConfetti] = useState(false)

  const navItems = [
    { path: '/', label: 'Dashboard', emoji: '🏠' },
    { path: '/transactions', label: 'Transactions', emoji: '💸' },
    { path: '/budgets', label: 'Budgets', emoji: '🎯' },
    { path: '/analytics', label: 'AI Insights', emoji: '🤖' },
  ]

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }

  return (
    <>
      <ConfettiEffect trigger={showConfetti} />
      <RainbowStripes />
      
      <motion.nav
        className="relative z-10 bg-white border-b-6 border-black shadow-festival-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              onClick={triggerConfetti}
              style={{ cursor: 'pointer' }}
            >
              <div className="text-4xl">💰</div>
              <div>
                <h1 className="font-bungee text-3xl text-festival-pink-500 transform -rotate-2">
                  MoneyFlow
                </h1>
                <p className="font-fredoka text-sm text-gray-600 transform rotate-1">
                  Your Financial Festival!
                </p>
              </div>
            </motion.div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-2xl border-3 border-black font-fredoka font-bold transition-all duration-300 transform hover:scale-105 ${
                        isActive
                          ? 'bg-festival-yellow-400 text-black shadow-festival rotate-1'
                          : 'bg-white text-gray-700 hover:bg-festival-pink-100 hover:-rotate-1'
                      }`
                    }
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* User Avatar */}
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <PhotoCard
                  src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                  alt={user.name}
                  name={user.name.split(' ')[0]}
                  bgColor="purple"
                  className="w-16 h-20"
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t-3 border-black bg-festival-orange-400 p-4">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-black shadow-festival scale-110'
                      : 'text-white hover:bg-white hover:text-black'
                  }`
                }
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-fredoka text-xs font-bold">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  )
}