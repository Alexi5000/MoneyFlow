import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard,
  CreditCard,
  Target,
  BarChart3,
  Brain,
  Settings,
  Plus,
  Clock,
  Tag,
  Download,
  Upload,
  PieChart,
  TrendingUp,
  FileText,
  MessageSquare,
  Shield,
  Bell,
  HelpCircle,
  User,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import { useNavigationStore } from '../../../store/navigationStore'
import { GlassmorphicCard } from '../UI/GlassmorphicCard'

interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  children?: NavigationItem[]
  badge?: string
}

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, currentTab, setCurrentTab } = useNavigationStore()
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['overview'])

  const navigationItems: NavigationItem[] = [
    {
      id: 'overview',
      label: 'OVERVIEW',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/',
      children: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/' },
        { id: 'quick-actions', label: 'Quick Actions', icon: <Plus className="w-4 h-4" />, path: '/quick-actions' },
        { id: 'recent-activity', label: 'Recent Activity', icon: <Clock className="w-4 h-4" />, path: '/recent' },
      ]
    },
    {
      id: 'transactions',
      label: 'TRANSACTIONS',
      icon: <CreditCard className="w-5 h-5" />,
      path: '/transactions',
      children: [
        { id: 'all-transactions', label: 'All Transactions', icon: <CreditCard className="w-4 h-4" />, path: '/transactions' },
        { id: 'add-transaction', label: 'Add Transaction', icon: <Plus className="w-4 h-4" />, path: '/transactions/add' },
        { id: 'recurring', label: 'Recurring Payments', icon: <Clock className="w-4 h-4" />, path: '/transactions/recurring' },
        { id: 'categories', label: 'Categories', icon: <Tag className="w-4 h-4" />, path: '/transactions/categories' },
        { id: 'import-export', label: 'Import/Export', icon: <Upload className="w-4 h-4" />, path: '/transactions/import' },
      ]
    },
    {
      id: 'budgets',
      label: 'BUDGETS & GOALS',
      icon: <Target className="w-5 h-5" />,
      path: '/budgets',
      children: [
        { id: 'budget-overview', label: 'Budget Overview', icon: <PieChart className="w-4 h-4" />, path: '/budgets' },
        { id: 'create-budget', label: 'Create Budget', icon: <Plus className="w-4 h-4" />, path: '/budgets/create' },
        { id: 'savings-goals', label: 'Savings Goals', icon: <Target className="w-4 h-4" />, path: '/budgets/goals' },
        { id: 'budget-analytics', label: 'Budget Analytics', icon: <BarChart3 className="w-4 h-4" />, path: '/budgets/analytics' },
        { id: 'budget-alerts', label: 'Budget Alerts', icon: <Bell className="w-4 h-4" />, path: '/budgets/alerts' },
      ]
    },
    {
      id: 'analytics',
      label: 'ANALYTICS & REPORTS',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/analytics',
      children: [
        { id: 'spending-analysis', label: 'Spending Analysis', icon: <PieChart className="w-4 h-4" />, path: '/analytics/spending' },
        { id: 'income-tracking', label: 'Income Tracking', icon: <TrendingUp className="w-4 h-4" />, path: '/analytics/income' },
        { id: 'trend-analysis', label: 'Trend Analysis', icon: <BarChart3 className="w-4 h-4" />, path: '/analytics/trends' },
        { id: 'custom-reports', label: 'Custom Reports', icon: <FileText className="w-4 h-4" />, path: '/analytics/reports' },
        { id: 'export-reports', label: 'Export Reports', icon: <Download className="w-4 h-4" />, path: '/analytics/export' },
      ]
    },
    {
      id: 'ai-insights',
      label: 'AI INSIGHTS',
      icon: <Brain className="w-5 h-5" />,
      path: '/ai-insights',
      badge: 'NEW',
      children: [
        { id: 'predictions', label: 'Spending Predictions', icon: <TrendingUp className="w-4 h-4" />, path: '/ai-insights/predictions' },
        { id: 'recommendations', label: 'Smart Recommendations', icon: <Brain className="w-4 h-4" />, path: '/ai-insights/recommendations' },
        { id: 'health-score', label: 'Financial Health Score', icon: <Shield className="w-4 h-4" />, path: '/ai-insights/health' },
        { id: 'anomaly-detection', label: 'Anomaly Detection', icon: <Bell className="w-4 h-4" />, path: '/ai-insights/anomalies' },
        { id: 'ai-chat', label: 'AI Chat Assistant', icon: <MessageSquare className="w-4 h-4" />, path: '/ai-insights/chat' },
      ]
    },
    {
      id: 'account',
      label: 'ACCOUNT',
      icon: <User className="w-5 h-5" />,
      path: '/account',
      children: [
        { id: 'profile', label: 'Profile Settings', icon: <User className="w-4 h-4" />, path: '/account/profile' },
        { id: 'connected-accounts', label: 'Connected Accounts', icon: <CreditCard className="w-4 h-4" />, path: '/account/connections' },
        { id: 'security', label: 'Security & Privacy', icon: <Shield className="w-4 h-4" />, path: '/account/security' },
        { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, path: '/account/notifications' },
        { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" />, path: '/account/help' },
      ]
    },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      toggleSection(item.id)
    } else {
      setCurrentTab(item.id)
    }
  }

  return (
    <AnimatePresence>
      <motion.aside
        className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
      >
        <div className="h-full p-4">
          <GlassmorphicCard className="h-full p-4 overflow-y-auto custom-scrollbar">
            <nav className="space-y-2">
              {navigationItems.map((section) => (
                <div key={section.id} className="space-y-1">
                  {/* Section Header */}
                  <button
                    onClick={() => handleItemClick(section)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-300 group ${
                      currentTab === section.id || expandedSections.includes(section.id)
                        ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {section.icon}
                      {!sidebarCollapsed && (
                        <span className="text-sm font-medium">{section.label}</span>
                      )}
                    </div>
                    
                    {!sidebarCollapsed && (
                      <div className="flex items-center gap-2">
                        {section.badge && (
                          <span className="px-2 py-1 text-xs bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full">
                            {section.badge}
                          </span>
                        )}
                        {section.children && (
                          <motion.div
                            animate={{ rotate: expandedSections.includes(section.id) ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>
                    )}
                  </button>

                  {/* Section Children */}
                  <AnimatePresence>
                    {!sidebarCollapsed && section.children && expandedSections.includes(section.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 space-y-1 overflow-hidden"
                      >
                        {section.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => setCurrentTab(child.id)}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-300 ${
                              currentTab === child.id
                                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {child.icon}
                            <span className="text-sm">{child.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            {!sidebarCollapsed && (
              <motion.div
                className="mt-8 pt-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-2">MoneyFlow v1.0.0</div>
                  <div className="text-xs text-gray-500">© 2024 MoneyFlow Team</div>
                </div>
              </motion.div>
            )}
          </GlassmorphicCard>
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}