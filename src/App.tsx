import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { TransactionsPage } from './pages/TransactionsPage'
import { BudgetsPage } from './pages/BudgetsPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { AIInsightsPage } from './pages/AIInsightsPage'
import { SettingsPage } from './pages/SettingsPage'
import { ErrorBoundary } from './components/UI/ErrorBoundary'
import { PerformanceDisplay } from './components/UI/PerformanceMonitor'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    // Initialize theme on app load
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Show performance monitor in development
  const showPerformanceMonitor = import.meta.env.DEV

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="budgets" element={<BudgetsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="ai-insights" element={<AIInsightsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        
        {/* Performance Monitor (Development Only) */}
        <PerformanceDisplay 
          show={showPerformanceMonitor} 
          position="bottom-right" 
        />
      </Router>
    </ErrorBoundary>
  )
}

export default App