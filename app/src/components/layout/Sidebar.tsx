import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  CreditCard, 
  Target, 
  TrendingUp, 
  Brain, 
  Settings,
  X
} from 'lucide-react'
import { clsx } from 'clsx'
import { Button } from '../ui/Button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: CreditCard },
  { path: '/budgets', label: 'Budgets', icon: Target },
  { path: '/analytics', label: 'Analytics', icon: TrendingUp },
  { path: '/ai-insights', label: 'AI Insights', icon: Brain },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={clsx(
        'fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-600 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-600">
          <div>
            <h1 className="text-xl font-bold text-primary-500">MoneyFlow</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI-Powered Finance</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={X}
            onClick={onClose}
            className="lg:hidden"
          />
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-3 py-2.5 text-sm font-medium rounded-modernize transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-dark-700 dark:hover:text-white'
                  )
                }
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-dark-600">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">MoneyFlow v1.0.0</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">© 2024 MoneyFlow</p>
          </div>
        </div>
      </aside>
    </>
  )
}