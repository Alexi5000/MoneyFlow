// ✅ CORRECT USAGE - This is how to properly use Lucide icons

import React from 'react'
// Import specific icons as named exports
import { 
  Home, 
  User, 
  Settings, 
  ChevronRight,
  DollarSign,
  TrendingUp,
  CreditCard 
} from 'lucide-react'

// For TypeScript typing, import the type separately
import type { LucideIcon } from 'lucide-react'

// ✅ Basic icon usage
const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>
        <Home className="w-6 h-6 mr-2" />
        Dashboard
      </h1>
      
      <div className="stats">
        <div className="stat-card">
          <DollarSign className="w-8 h-8 text-green-500" />
          <span>$12,450</span>
        </div>
        
        <div className="stat-card">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          <span>Income</span>
        </div>
      </div>
    </div>
  )
}

// ✅ Using LucideIcon type for TypeScript props
interface ButtonProps {
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }> // Correct type
  // OR use the LucideIcon type like this:
  iconComponent?: LucideIcon
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon: IconComponent, 
  onClick 
}) => {
  return (
    <button onClick={onClick} className="btn">
      {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
      {children}
    </button>
  )
}

// ✅ Usage with proper typing
const App: React.FC = () => {
  return (
    <div>
      <Button icon={Settings}>
        Settings
      </Button>
      
      <Button icon={User}>
        Profile
      </Button>
    </div>
  )
}

export default App