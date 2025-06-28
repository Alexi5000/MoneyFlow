import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Menu, 
  Sun, 
  Moon,
  Plus,
  TrendingUp,
  Zap
} from 'lucide-react'
import { useNavigationStore } from '../../store/navigationStore'
import { useUIStore } from '../../store/uiStore'
import { useFinancialStore } from '../../store/financialStore'
import { GlassmorphicCard } from '../UI/GlassmorphicCard'
import { NeonButton } from '../UI/NeonButton'

export const Header: React.FC = () => {
  const { toggleSidebar, toggleMobileMenu, currentTab } = useNavigationStore()
  const { theme, toggleTheme } = useUIStore()
  const { user } = useFinancialStore()
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/' },
    { id: 'transactions', label: 'Transactions', path: '/transactions' },
    { id: 'budgets', label: 'Budgets', path: '/budgets' },
    { id: 'analytics', label: 'Analytics', path: '/analytics' },
    { id: 'ai-insights', label: 'AI Insights', path: '/ai-insights' },
    { id: 'settings', label: 'Settings', path: '/settings' },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassmorphicCard className="mx-4 mt-4 px-6 py-4" glow neonColor="primary">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-white hover:text-primary-400 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-2 text-white hover:text-primary-400 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">MoneyFlow</h1>
                <p className="text-xs text-gray-400">AI-Powered Budget Tracker</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentTab === item.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center Section - Balance Display */}
          {user && (
            <motion.div
              className="hidden md:flex items-center gap-4 px-4 py-2 bg-white/5 rounded-lg border border-white/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="text-center">
                <p className="text-xs text-gray-400">Total Balance</p>
                <p className="text-lg font-bold text-white">
                  {formatCurrency(user.totalBalance)}
                </p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-xs text-gray-400">This Month</p>
                  <p className="text-sm font-semibold text-green-400">
                    +{formatCurrency(user.monthlyIncome - user.monthlyExpenses)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Right Section - Actions & Profile */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {searchOpen && (
                <motion.div
                  className="absolute right-0 top-12 w-80 p-4 bg-gray-900/95 backdrop-blur-md rounded-lg border border-white/20 shadow-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <input
                    type="text"
                    placeholder="Search transactions, budgets..."
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                  />
                  <div className="mt-3 text-xs text-gray-400">
                    <kbd className="px-2 py-1 bg-white/10 rounded">Cmd</kbd> + <kbd className="px-2 py-1 bg-white/10 rounded">K</kbd> for quick search
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Add Transaction */}
            <NeonButton
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => console.log('Add transaction')}
              className="hidden sm:flex"
            >
              Add
            </NeonButton>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </span>
              </button>

              {notificationsOpen && (
                <motion.div
                  className="absolute right-0 top-12 w-80 p-4 bg-gray-900/95 backdrop-blur-md rounded-lg border border-white/20 shadow-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="text-white font-semibold mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-white">Budget Alert</span>
                      </div>
                      <p className="text-xs text-gray-400">You've spent 87% of your shopping budget</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-white">AI Insight</span>
                      </div>
                      <p className="text-xs text-gray-400">You could save $45/month on coffee</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">Premium Member</p>
                </div>
                <img
                  src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-primary-500/50 cursor-pointer hover:border-primary-500 transition-colors"
                />
              </div>
            )}
          </div>
        </div>
      </GlassmorphicCard>
    </motion.header>
  )
}