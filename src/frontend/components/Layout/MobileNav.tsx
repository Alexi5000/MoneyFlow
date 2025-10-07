import React from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard,
  CreditCard,
  Target,
  BarChart3,
  Brain,
  Menu
} from 'lucide-react'
import { useNavigationStore } from '../../../store/navigationStore'
import { GlassmorphicCard } from '../UI/GlassmorphicCard'

interface MobileNavItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
}

export const MobileNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useNavigationStore()

  const navItems: MobileNavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: <CreditCard className="w-5 h-5" />,
      path: '/transactions'
    },
    {
      id: 'budgets',
      label: 'Budgets',
      icon: <Target className="w-5 h-5" />,
      path: '/budgets'
    },
    {
      id: 'ai-insights',
      label: 'AI',
      icon: <Brain className="w-5 h-5" />,
      path: '/ai-insights'
    },
    {
      id: 'more',
      label: 'More',
      icon: <Menu className="w-5 h-5" />,
      path: '/more'
    }
  ]

  const handleTabClick = (item: MobileNavItem) => {
    setCurrentTab(item.id)
    
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }

  return (
    <motion.div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
    >
      <GlassmorphicCard className="px-2 py-3" glow neonColor="primary">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleTabClick(item)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                currentTab === item.id
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Icon Container */}
              <div className={`relative p-2 rounded-lg transition-all duration-300 ${
                currentTab === item.id
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg'
                  : 'bg-transparent'
              }`}>
                {item.icon}
                
                {/* Active Indicator */}
                {currentTab === item.id && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </div>
              
              {/* Label */}
              <span className={`text-xs font-medium transition-colors duration-300 ${
                currentTab === item.id ? 'text-white' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
              
              {/* Active Underline */}
              {currentTab === item.id && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-8 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  initial={{ scale: 0, x: '-50%' }}
                  animate={{ scale: 1, x: '-50%' }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </GlassmorphicCard>
    </motion.div>
  )
}