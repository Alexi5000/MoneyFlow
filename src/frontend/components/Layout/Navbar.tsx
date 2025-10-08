import React from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useFinancialStore } from '../../../store/financialStore'

export const Navbar: React.FC = () => {
  const { user } = useFinancialStore()

  const navItems = [
    { path: '/', label: 'Portfolio' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/budgets', label: 'Budgets' },
    { path: '/analytics', label: 'Analytics' },
  ]

  return (
    <motion.nav
      className="glass-card border-b border-white/10 backdrop-blur-xl sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MoneyFlow</h1>
              <p className="text-xs text-gray-400 -mt-1">Crypto Portfolio</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* User Profile */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {user ? (
              <div className="text-right">
                <div className="text-sm font-medium text-white">{user.name}</div>
                <div className="text-xs text-gray-400">
                  ${user.totalBalance.toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}