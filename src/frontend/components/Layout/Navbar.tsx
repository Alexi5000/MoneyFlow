import React from 'react'
import { NavLink } from 'react-router-dom'
import { Wallet } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5">
            <Wallet className="w-5 h-5 text-white" strokeWidth={2} />
            <span className="text-white font-medium text-base tracking-tight">MONEYFLOW</span>
          </NavLink>

          {/* Center Navigation */}
          <div className="flex items-center gap-8">
            <NavLink to="/budgets" className="text-gray-300 hover:text-white transition-colors text-[15px] font-normal">
              Budgets
            </NavLink>
            <NavLink to="/transactions" className="text-gray-300 hover:text-white transition-colors text-[15px] font-normal">
              Transactions
            </NavLink>
            <NavLink to="/analytics" className="text-gray-300 hover:text-white transition-colors text-[15px] font-normal">
              Analytics
            </NavLink>
            <NavLink to="/settings" className="text-gray-300 hover:text-white transition-colors text-[15px] font-normal">
              Resources
            </NavLink>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-300 transition-colors text-[15px] font-normal">
              Sign in
            </button>
            <button className="px-6 py-2 bg-white text-black hover:bg-gray-100 rounded-full font-medium text-[15px] transition-all">
              Download
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
