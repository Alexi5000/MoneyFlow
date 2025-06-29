import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationStore } from '../../store/navigationStore'

interface NavItem {
  id: string
  label: string
  emoji: string
  path: string
}

export const FestivalSidebar: React.FC = () => {
  const { currentTab, setCurrentTab } = useNavigationStore()

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Your Stash', emoji: '💰', path: '/' },
    { id: 'transactions', label: 'Money Moves', emoji: '🎯', path: '/transactions' },
    { id: 'budgets', label: 'Spending Vibes', emoji: '🎨', path: '/budgets' },
    { id: 'analytics', label: 'Money Magic', emoji: '✨', path: '/analytics' },
    { id: 'ai-insights', label: 'Smart Vibes', emoji: '🧠', path: '/ai-insights' },
    { id: 'settings', label: 'Your Style', emoji: '🎪', path: '/settings' },
  ]

  return (
    <motion.aside
      className="hidden lg:block fixed left-4 top-24 bottom-4 w-64 z-40"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="festival-nav h-full">
        <div className="space-y-3">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`nav-item ${currentTab === item.id ? 'active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl mr-3">{item.emoji}</span>
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Fun Footer */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-white rounded-full p-3 border-4 border-black transform rotate-2">
            <p className="font-bungee text-sm text-black">Money Party v1.0</p>
            <p className="font-fredoka text-xs text-gray-600">© 2024 Festival Finance</p>
          </div>
        </motion.div>
      </nav>
    </motion.aside>
  )
}