import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">MoneyFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-700 hover:text-gray-900">Dashboard</a>
              <a href="/transactions" className="text-gray-700 hover:text-gray-900">Transactions</a>
              <a href="/budgets" className="text-gray-700 hover:text-gray-900">Budgets</a>
              <a href="/analytics" className="text-gray-700 hover:text-gray-900">Analytics</a>
              <a href="/ai-insights" className="text-gray-700 hover:text-gray-900">AI Insights</a>
              <a href="/settings" className="text-gray-700 hover:text-gray-900">Settings</a>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};