import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '../src/components/Layout/Layout'
import { DashboardPage } from '../src/pages/DashboardPage'
import { TransactionsPage } from '../src/pages/TransactionsPage'
import { BudgetsPage } from '../src/pages/BudgetsPage'
import { AnalyticsPage } from '../src/pages/AnalyticsPage'
import { AIInsightsPage } from '../src/pages/AIInsightsPage'
import { SettingsPage } from '../src/pages/SettingsPage'

function App() {
  return (
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
    </Router>
  )
}

export default App