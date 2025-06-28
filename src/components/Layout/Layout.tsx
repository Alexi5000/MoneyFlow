import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { Footer } from './Footer'
import { useNavigationStore } from '../../store/navigationStore'
import { useUIStore } from '../../store/uiStore'

export const Layout: React.FC = () => {
  const location = useLocation()
  const { sidebarCollapsed, setCurrentTab } = useNavigationStore()
  const { theme } = useUIStore()

  // Update current tab based on route
  useEffect(() => {
    const path = location.pathname
    if (path === '/') {
      setCurrentTab('dashboard')
    } else if (path.startsWith('/transactions')) {
      setCurrentTab('transactions')
    } else if (path.startsWith('/budgets')) {
      setCurrentTab('budgets')
    } else if (path.startsWith('/analytics')) {
      setCurrentTab('analytics')
    } else if (path.startsWith('/ai-insights')) {
      setCurrentTab('ai-insights')
    } else if (path.startsWith('/settings')) {
      setCurrentTab('settings')
    }
  }, [location.pathname, setCurrentTab])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case 'd':
            event.preventDefault()
            setCurrentTab('dashboard')
            window.history.pushState({}, '', '/')
            break
          case 't':
            event.preventDefault()
            setCurrentTab('transactions')
            window.history.pushState({}, '', '/transactions')
            break
          case 'b':
            event.preventDefault()
            setCurrentTab('budgets')
            window.history.pushState({}, '', '/budgets')
            break
          case 'a':
            event.preventDefault()
            setCurrentTab('analytics')
            window.history.pushState({}, '', '/analytics')
            break
          case 'i':
            event.preventDefault()
            setCurrentTab('ai-insights')
            window.history.pushState({}, '', '/ai-insights')
            break
          case '/':
            event.preventDefault()
            // Show help/shortcuts modal
            console.log('Show shortcuts help')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setCurrentTab])

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <Header />
      
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } pb-20 lg:pb-0`}
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <Footer />
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}