import React from 'react'
import { Bell, Search, Settings, User, Moon, Sun, Menu } from 'lucide-react'
import { Button } from '../ui/Button'
import { useTheme } from '../../hooks/useTheme'
import { clsx } from 'clsx'

interface HeaderProps {
  onMenuClick: () => void
  isSidebarOpen: boolean
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, isSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-600 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon={Menu}
            onClick={onMenuClick}
            className="lg:hidden"
          />
          <div className="hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-modernize bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            icon={theme === 'light' ? Moon : Sun}
            onClick={toggleTheme}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Bell}
            className="relative"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error-500 rounded-full"></span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={Settings}
          />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Premium User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}