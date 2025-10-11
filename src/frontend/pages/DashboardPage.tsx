import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, PieChart, Target } from 'lucide-react'
import { useFinancialStore } from '../store/financialStore'
import { formatCurrency } from '../utils/formatters'

export const DashboardPage: React.FC = () => {
  const { 
    user, 
    budgets, 
    transactions, 
    isLoading, 
    error, 
    initializeData,
    getTotalIncome,
    getTotalExpenses,
    getSavingsRate
  } = useFinancialStore()

  useEffect(() => {
    const loadData = async () => {
      // Always clear error on mount
      setError(null)
      
      // Force fresh data load
      console.log('Initializing MoneyFlow data...')
      await initializeData()
    }
    loadData()
  }, [])

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Unable to connect
            </h1>
            <p className="text-xl text-gray-400 mb-2">
              The backend server isn't responding
            </p>
            <p className="text-sm text-gray-500 font-mono mb-8">
              {error}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setError(null)
                initializeData()
              }}
              className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-all font-medium inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry Connection
            </button>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#111] text-white border border-gray-800 rounded-md hover:bg-[#1a1a1a] transition-all font-medium inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              API Docs
            </a>
          </div>

          <div className="mt-12 p-6 bg-[#0a0a0a] border border-gray-900 rounded-lg text-left">
            <h3 className="text-sm font-semibold text-white mb-3">Troubleshooting Steps:</h3>
            <ol className="text-sm text-gray-400 space-y-2">
              <li className="flex gap-2">
                <span className="text-gray-600">1.</span>
                <span>Ensure backend is running: <code className="text-blue-400 bg-[#111] px-2 py-0.5 rounded text-xs">uvicorn main:app --reload</code></span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-600">2.</span>
                <span>Check backend at: <a href="http://localhost:8000/health" target="_blank" className="text-blue-400 hover:underline">http://localhost:8000/health</a></span>
              </li>
              <li className="flex gap-2">
                <span className="text-gray-600">3.</span>
                <span>Run quick start: <code className="text-blue-400 bg-[#111] px-2 py-0.5 rounded text-xs">.\QUICKSTART.bat</code></span>
              </li>
            </ol>
          </div>
        </motion.div>
      </div>
    )
  }

  const totalIncome = getTotalIncome()
  const totalExpenses = getTotalExpenses()
  const savingsRate = getSavingsRate()

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section - Exactly like Cursor.com */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <h1 className="text-[52px] md:text-[64px] lg:text-[72px] font-normal text-white mb-8 leading-[1.1] tracking-tight">
            Built to make you extraordinarily productive,<br />
            MoneyFlow is the best way to manage your finances.
          </h1>
          
          <button className="mt-4 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all font-medium text-[15px] inline-flex items-center gap-2">
            Download for Windows <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Dashboard Preview - Like Cursor's code editor mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0d0d0d] border border-[#222] rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Mockup Header */}
          <div className="bg-[#1a1a1a] border-b border-[#222] p-3.5 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#333]"></div>
              <div className="w-3 h-3 rounded-full bg-[#333]"></div>
              <div className="w-3 h-3 rounded-full bg-[#333]"></div>
            </div>
            <div className="text-gray-400 text-sm ml-3 font-medium">MoneyFlow</div>
          </div>

          {/* Tabs */}
          <div className="bg-[#111] border-b border-[#222] px-4 flex items-center gap-1 h-11">
            <div className="px-4 py-2 bg-[#1a1a1a] text-white text-[13px] rounded-t border-t border-x border-[#222]">
              dashboard.tsx
            </div>
            <div className="px-4 py-2 text-gray-500 text-[13px] hover:text-gray-300 cursor-pointer">
              budgets.tsx
            </div>
            <div className="px-4 py-2 text-gray-500 text-[13px] hover:text-gray-300 cursor-pointer">
              transactions.tsx
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-6">
                <div className="text-[13px] text-gray-500 mb-2 font-medium">Total Income</div>
                <div className="text-3xl font-semibold text-white">{formatCurrency(totalIncome)}</div>
                <div className="text-[13px] text-green-500 mt-2">+8.2% this month</div>
              </div>
              <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-6">
                <div className="text-[13px] text-gray-500 mb-2 font-medium">Total Expenses</div>
                <div className="text-3xl font-semibold text-white">{formatCurrency(totalExpenses)}</div>
                <div className="text-[13px] text-red-500 mt-2">+3.1% this month</div>
              </div>
              <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-6">
                <div className="text-[13px] text-gray-500 mb-2 font-medium">Savings Rate</div>
                <div className="text-3xl font-semibold text-white">{savingsRate.toFixed(1)}%</div>
                <div className="text-[13px] text-blue-500 mt-2">Above average</div>
              </div>
            </div>

            {/* Budgets */}
            {budgets.length > 0 && (
              <div>
                <h3 className="text-white font-medium text-[15px] mb-4">Recent Budgets</h3>
                <div className="space-y-3">
                  {budgets.slice(0, 3).map((budget) => {
                    const percentage = (budget.spent / budget.allocated) * 100
                    return (
                      <div key={budget.id} className="bg-[#0f0f0f] border border-[#222] rounded-lg p-4 hover:border-gray-700 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{budget.icon}</span>
                            <span className="text-white text-[14px] font-medium">{budget.category}</span>
                          </div>
                          <span className="text-gray-500 text-[13px] font-medium">
                            {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                          </span>
                        </div>
                        <div className="w-full bg-[#222] rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${percentage > 90 ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Trusted By Section */}
      <div className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[15px] text-gray-400 mb-12">
            Trusted every day by millions of professional savers.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
            <div className="text-white text-xl font-semibold">Chase</div>
            <div className="text-white text-xl font-semibold">Wells Fargo</div>
            <div className="text-white text-xl font-semibold">Bank of America</div>
            <div className="text-white text-xl font-semibold">Capital One</div>
          </div>
        </div>
      </div>

      {/* Features Section - Like Cursor's "Agent" section */}
      <div className="bg-black py-32">
        <div className="max-w-6xl mx-auto px-6 text-center mb-20">
          <h2 className="text-[40px] md:text-[48px] font-normal text-white mb-6 leading-tight">
            Financial insights at your fingertips
          </h2>
          <p className="text-[18px] text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Track spending, manage budgets, and achieve your financial goals with intelligent automation.
          </p>
          <button className="mt-8 text-[#FF5F00] hover:text-[#ff7a33] flex items-center gap-2 mx-auto text-[15px] font-medium transition-colors">
            Learn about MoneyFlow <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feature Cards - Like "Stay on the frontier" */}
      <div className="bg-black py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[40px] font-normal text-white mb-16">Stay on the frontier</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-8 hover:border-[#333] transition-colors">
              <div className="mb-6">
                <TrendingUp className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] font-medium text-white mb-4">Track your spending</h3>
              <p className="text-[15px] text-gray-400 leading-relaxed mb-6">
                Monitor every transaction with automatic categorization and real-time insights into your spending patterns.
              </p>
              <button className="text-[#FF5F00] hover:text-[#ff7a33] flex items-center gap-2 text-[14px] font-medium transition-colors">
                Explore budgets <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-8 hover:border-[#333] transition-colors">
              <div className="mb-6">
                <PieChart className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] font-medium text-white mb-4">Complete financial understanding</h3>
              <p className="text-[15px] text-gray-400 leading-relaxed mb-6">
                MoneyFlow learns your spending habits and provides personalized recommendations to help you save more.
              </p>
              <button className="text-[#FF5F00] hover:text-[#ff7a33] flex items-center gap-2 text-[14px] font-medium transition-colors">
                Learn about analytics <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-8 hover:border-[#333] transition-colors">
              <div className="mb-6">
                <Target className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] font-medium text-white mb-4">Develop enduring wealth</h3>
              <p className="text-[15px] text-gray-400 leading-relaxed mb-6">
                Set budgets, track progress, and get AI-powered insights to accelerate your journey to financial freedom.
              </p>
              <button className="text-[#FF5F00] hover:text-[#ff7a33] flex items-center gap-2 text-[14px] font-medium transition-colors">
                Explore goals <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - Like Cursor's user quotes */}
      <div className="bg-black py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-8">
              <p className="text-[15px] text-gray-300 mb-8 leading-relaxed font-normal">
                It was night and day from one month to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best savers were using MoneyFlow.
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-medium text-[15px]">Sarah Chen</div>
                  <div className="text-gray-500 text-[13px]">Financial Analyst, TechCorp</div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-8">
              <p className="text-[15px] text-gray-300 mb-8 leading-relaxed font-normal">
                The most useful financial tool I currently pay for, hands down, is MoneyFlow. It's fast, autocompletes when and where you need it to, handles budgets properly.
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                  alt="Marcus Lee"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-medium text-[15px]">Marcus Lee</div>
                  <div className="text-gray-500 text-[13px]">Creator of BudgetApp</div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-8">
              <p className="text-[15px] text-gray-300 mb-8 leading-relaxed font-normal">
                It's official. I love MoneyFlow budgeting. It's wild how easy it makes financial planning and tracking.
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
                  alt="Alex Rivera"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-medium text-[15px]">Alex Rivera</div>
                  <div className="text-gray-500 text-[13px]">Small Business Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-40 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[56px] md:text-[64px] font-normal text-white mb-10 leading-tight">
            Try MoneyFlow now.
          </h2>
          <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all font-medium text-[15px] inline-flex items-center gap-2">
            Download for Windows <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Footer - Like Cursor's footer */}
      <footer className="bg-black border-t border-[#1a1a1a] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            <div>
              <h4 className="text-white font-medium mb-5 text-[15px]">Product</h4>
              <ul className="space-y-3 text-gray-400 text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors">Budgets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Transactions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Insights</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-5 text-[15px]">Resources</h4>
              <ul className="space-y-3 text-gray-400 text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors">Download</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-[15px]">Company</h4>
              <ul className="space-y-3 text-gray-400 text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-[15px]">Legal</h4>
              <ul className="space-y-3 text-gray-400 text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-5 text-[15px]">Connect</h4>
              <ul className="space-y-3 text-gray-400 text-[14px]">
                <li><a href="#" className="hover:text-white transition-colors">X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#1a1a1a] text-gray-500 text-[13px] flex items-center justify-between">
            <div>© 2025 MoneyFlow, Inc.</div>
            <div className="flex items-center gap-4">
              <button className="hover:text-gray-400 transition-colors">English</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
