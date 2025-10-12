import React, { useEffect } from 'react'
import { useFinancialStore } from '../store/financialStore'

export const SettingsPage: React.FC = () => {
  const { user, initializeData } = useFinancialStore()

  useEffect(() => {
    if (!user) {
      initializeData()
    }
  }, [user, initializeData])

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-[48px] font-normal text-white mb-3 leading-tight">Resources</h1>
          <p className="text-[16px] text-gray-400">Documentation, guides, and helpful information</p>
        </div>
            
        {/* Resources Sections */}
        <div className="space-y-6">
          {/* Documentation */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-8 hover:border-[#333] transition-colors">
            <h2 className="text-[20px] font-medium text-white mb-6">Documentation</h2>
            <div className="space-y-4">
              <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-3 hover:text-[#FF5F00] transition-colors group">
                <span className="text-gray-300 text-[15px] group-hover:text-[#FF5F00]">API Documentation</span>
                <span className="text-gray-600 text-[13px]">→</span>
              </a>
              <a href="./docs/README.md" className="flex items-center justify-between py-3 border-t border-[#222] hover:text-[#FF5F00] transition-colors group">
                <span className="text-gray-300 text-[15px] group-hover:text-[#FF5F00]">User Guide</span>
                <span className="text-gray-600 text-[13px]">→</span>
              </a>
              <a href="./docs/DEPLOYMENT_GUIDE.md" className="flex items-center justify-between py-3 border-t border-[#222] hover:text-[#FF5F00] transition-colors group">
                <span className="text-gray-300 text-[15px] group-hover:text-[#FF5F00]">Deployment Guide</span>
                <span className="text-gray-600 text-[13px]">→</span>
              </a>
            </div>
          </div>
            
          {/* User Profile */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-8">
            <h2 className="text-[20px] font-medium text-white mb-6">User Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-400 text-[14px]">Name</span>
                <span className="text-white text-[15px] font-medium">{user?.name || 'User'}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-[#222]">
                <span className="text-gray-400 text-[14px]">Email</span>
                <span className="text-white text-[15px] font-medium">{user?.email || 'user@moneyflow.app'}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-[#222]">
                <span className="text-gray-400 text-[14px]">Monthly Income</span>
                <span className="text-white text-[15px] font-medium">${user?.monthly_income || 0}</span>
              </div>
            </div>
          </div>
            
          {/* Preferences */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-8">
            <h2 className="text-[20px] font-medium text-white mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-400 text-[14px]">Theme</span>
                <span className="text-white text-[15px] font-medium">Dark</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-[#222]">
                <span className="text-gray-400 text-[14px]">Currency</span>
                <span className="text-white text-[15px] font-medium">USD</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-[#222]">
                <span className="text-gray-400 text-[14px]">Language</span>
                <span className="text-white text-[15px] font-medium">English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
