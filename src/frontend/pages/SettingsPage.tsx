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
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your MoneyFlow preferences</p>
            </div>
            
        {/* Settings Sections */}
        <div className="space-y-6">
          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Name</span>
                <span className="text-white">{user?.name || 'User'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-800">
                <span className="text-gray-400">Email</span>
                <span className="text-white">{user?.email || 'user@moneyflow.app'}</span>
                </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-800">
                <span className="text-gray-400">Monthly Income</span>
                <span className="text-white">${user?.monthly_income || 0}</span>
              </div>
            </div>
            </div>
            
          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Theme</span>
                <span className="text-white">Dark</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-800">
                <span className="text-gray-400">Currency</span>
                <span className="text-white">USD</span>
              </div>
            </div>
              </div>
            </div>
      </div>
    </div>
  )
}
