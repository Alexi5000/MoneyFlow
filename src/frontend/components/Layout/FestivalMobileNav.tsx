import React from 'react'
import { motion } from 'framer-motion'
import { useNavigationStore } from '../../../store/navigationStore'

interface MobileNavItem {
  id: string
  label: string
  emoji: string
  path: string
}

export const FestivalMobileNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useNavigationStore()

  const navItems: MobileNavItem[] = [
    { id: 'dashboard', label: 'Stash', emoji: '💰', path: '/' },
    { id: 'transactions', label: 'Moves', emoji: '🎯', path: '/transactions' },
    { id: 'budgets', label: 'Vibes', emoji: '🎨', path: '/budgets' },
    { id: 'ai-insights', label: 'Magic', emoji: '✨', path: '/ai-insights' },
    { id: 'settings', label: 'Style', emoji: '🎪', path: '/settings' },
  ]

  return (
    <motion.div
      className="lg:hidden fixed bottom-4 left-4 right-4 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
    >
      <div className="bg-orange-500 p-3 rounded-3xl border-4 border-black shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
                currentTab === item.id
                  ? 'bg-yellow-400 text-black scale-110'
                  : 'text-white'
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="font-fredoka font-bold text-xs">{item.label}</span>
              
              {currentTab === item.id && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full border-2 border-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}