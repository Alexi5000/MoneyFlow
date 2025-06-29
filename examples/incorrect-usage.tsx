// ❌ INCORRECT USAGE - These will cause the error

import React from 'react'
// This is WRONG - LucideIcon is not a component
import { DivideIcon as LucideIcon } from 'lucide-react'

// This is also WRONG - trying to use LucideIcon as a component
const MyComponent: React.FC = () => {
  return (
    <div>
      {/* This will fail */}
      <LucideIcon name="home" />
    </div>
  )
}

// Another common mistake
interface ButtonProps {
  // This import is wrong for component usage
  icon: LucideIcon
}

const Button: React.FC<ButtonProps> = ({ icon: Icon }) => {
  return (
    <button>
      {/* This won't work */}
      <Icon />
    </button>
  )
}