// ✅ ADVANCED PATTERNS - Professional usage patterns

import React from 'react'
import { 
  LayoutDashboard,
  CreditCard,
  Target,
  TrendingUp,
  Brain,
  Settings,
  ChevronRight
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ✅ Navigation items with icons
interface NavItem {
  id: string
  label: string
  icon: LucideIcon // Using the type correctly
  path: string
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'transactions', label: 'Transactions', icon: CreditCard, path: '/transactions' },
  { id: 'budgets', label: 'Budgets', icon: Target, path: '/budgets' },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp, path: '/analytics' },
  { id: 'ai-insights', label: 'AI Insights', icon: Brain, path: '/ai-insights' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
]

// ✅ Sidebar component using icons properly
const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        {navigationItems.map((item) => {
          const IconComponent = item.icon // Get the icon component
          
          return (
            <a key={item.id} href={item.path} className="nav-link">
              <IconComponent className="w-5 h-5 mr-3" />
              {item.label}
              <ChevronRight className="w-4 h-4 ml-auto" />
            </a>
          )
        })}
      </nav>
    </aside>
  )
}

// ✅ Dynamic icon rendering
interface DynamicIconProps {
  iconName: string
  className?: string
}

// Icon mapping for dynamic usage
const iconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  transactions: CreditCard,
  budgets: Target,
  analytics: TrendingUp,
  insights: Brain,
  settings: Settings,
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, className }) => {
  const IconComponent = iconMap[iconName]
  
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found`)
    return null
  }
  
  return <IconComponent className={className} />
}

// ✅ Usage in components
const FeatureCard: React.FC<{ feature: string; description: string }> = ({ 
  feature, 
  description 
}) => {
  return (
    <div className="feature-card">
      <DynamicIcon iconName={feature.toLowerCase()} className="w-8 h-8 mb-4" />
      <h3>{feature}</h3>
      <p>{description}</p>
    </div>
  )
}

export { Sidebar, DynamicIcon, FeatureCard }