import React from 'react';

export const BudgetsPage: React.FC = () => {
  return (
    <div className="budgets-page">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Budgets</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Manage your budgets here</p>
      </div>
    </div>
  );
};