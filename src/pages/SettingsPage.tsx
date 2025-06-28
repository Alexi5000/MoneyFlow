import React from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun,
  Smartphone,
  Lock,
  Eye,
  Download
} from 'lucide-react'
import { GlassmorphicCard } from '../components/UI/GlassmorphicCard'
import { NeonButton } from '../components/UI/NeonButton'
import { useUIStore } from '../store/uiStore'
import { useFinancialStore } from '../store/financialStore'

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useUIStore()
  const { user } = useFinancialStore()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassmorphicCard className="p-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Manage your account preferences and security settings</p>
          </div>
        </GlassmorphicCard>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Profile Information */}
          <GlassmorphicCard className="p-6" glow neonColor="primary">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary-500" />
              <h3 className="text-lg font-semibold text-white">Profile Information</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={user?.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-primary-500/50"
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium">{user?.name || 'Alex Johnson'}</h4>
                  <p className="text-gray-400 text-sm">{user?.email || 'alex.johnson@email.com'}</p>
                </div>
                <NeonButton variant="ghost" size="sm">
                  Change Photo
                </NeonButton>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.name || 'Alex Johnson'}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || 'alex.johnson@email.com'}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </GlassmorphicCard>

          {/* Security Settings */}
          <GlassmorphicCard className="p-6" glow neonColor="warning">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-warning-500" />
              <h3 className="text-lg font-semibold text-white">Security & Privacy</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-white font-medium">Two-Factor Authentication</div>
                    <div className="text-gray-400 text-sm">Add an extra layer of security</div>
                  </div>
                </div>
                <NeonButton variant="accent" size="sm">
                  Enable
                </NeonButton>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-white font-medium">Privacy Mode</div>
                    <div className="text-gray-400 text-sm">Hide sensitive financial data</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-white font-medium">Biometric Login</div>
                    <div className="text-gray-400 text-sm">Use fingerprint or face ID</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </GlassmorphicCard>

          {/* Connected Accounts */}
          <GlassmorphicCard className="p-6" glow neonColor="accent">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-accent-500" />
              <h3 className="text-lg font-semibold text-white">Connected Accounts</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Chase Checking</div>
                    <div className="text-gray-400 text-sm">****1234 • Connected</div>
                  </div>
                </div>
                <NeonButton variant="ghost" size="sm">
                  Manage
                </NeonButton>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">American Express</div>
                    <div className="text-gray-400 text-sm">****5678 • Connected</div>
                  </div>
                </div>
                <NeonButton variant="ghost" size="sm">
                  Manage
                </NeonButton>
              </div>
              
              <NeonButton variant="primary" size="sm" icon={<CreditCard className="w-4 h-4" />}>
                Add Account
              </NeonButton>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Quick Settings */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Appearance */}
          <GlassmorphicCard className="p-6" glow neonColor="secondary">
            <div className="flex items-center gap-3 mb-4">
              {theme === 'dark' ? (
                <Moon className="w-6 h-6 text-secondary-500" />
              ) : (
                <Sun className="w-6 h-6 text-secondary-500" />
              )}
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="text-white">Theme</span>
                <span className="text-gray-400 capitalize">{theme}</span>
              </button>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Animations</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-600"></div>
                </label>
              </div>
            </div>
          </GlassmorphicCard>

          {/* Notifications */}
          <GlassmorphicCard className="p-6" glow neonColor="warning">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-warning-500" />
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Budget Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-warning-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warning-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">AI Insights</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-warning-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warning-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Email Reports</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-warning-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warning-600"></div>
                </label>
              </div>
            </div>
          </GlassmorphicCard>

          {/* Data & Export */}
          <GlassmorphicCard className="p-6" glow neonColor="accent">
            <div className="flex items-center gap-3 mb-4">
              <Download className="w-6 h-6 text-accent-500" />
              <h3 className="text-lg font-semibold text-white">Data & Export</h3>
            </div>
            
            <div className="space-y-3">
              <NeonButton variant="ghost" size="sm" className="w-full">
                Export All Data
              </NeonButton>
              <NeonButton variant="ghost" size="sm" className="w-full">
                Download Reports
              </NeonButton>
              <NeonButton variant="warning" size="sm" className="w-full">
                Delete Account
              </NeonButton>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </div>
  )
}