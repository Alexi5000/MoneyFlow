import React from 'react'
import { User, Bell, Shield, CreditCard } from 'lucide-react'
import { PageContainer } from '../components/ui/PageContainer'
import { BaseCard } from '../components/ui/BaseCard'
import { Button } from '../components/ui/Button'

export const SettingsPage: React.FC = () => {
  return (
    <PageContainer
      title="Settings"
      subtitle="Manage your account preferences and security"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <BaseCard>
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Information
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-modernize bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-modernize bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-modernize bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <Button>Save Changes</Button>
            </div>
          </BaseCard>

          {/* Security Settings */}
          <BaseCard>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Security & Privacy
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
          </BaseCard>
        </div>

        {/* Quick Settings */}
        <div className="space-y-6">
          <BaseCard>
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Budget Alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Transaction Updates</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </BaseCard>

          <BaseCard>
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Connected Accounts
              </h3>
            </div>
            
            <div className="text-center py-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                No accounts connected yet
              </p>
              <Button variant="outline" size="sm">
                Connect Account
              </Button>
            </div>
          </BaseCard>
        </div>
      </div>
    </PageContainer>
  )
}