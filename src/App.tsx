import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FestivalLayout } from './components/Layout/FestivalLayout'
import { FestivalDashboardPage } from './pages/FestivalDashboardPage'
import { TransactionsPage } from './pages/TransactionsPage'
import { BudgetsPage } from './pages/BudgetsPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { AIInsightsPage } from './pages/AIInsightsPage'
import { SettingsPage } from './pages/SettingsPage'
import { ErrorBoundary } from './components/UI/ErrorBoundary'
import { useFinancialStore } from './store/financialStore'

function App() {
  const { initializeData } = useFinancialStore()

  useEffect(() => {
    // Initialize data on app load
    initializeData()
  }, [initializeData])

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<FestivalLayout />}>
            <Route index element={<FestivalDashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="budgets" element={<BudgetsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="ai-insights" element={<AIInsightsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App