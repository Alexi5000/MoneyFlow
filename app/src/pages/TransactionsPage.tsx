import React from 'react';

export const TransactionsPage: React.FC = () => {
  return (
    <div className="transactions-page">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Transactions</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Your transactions will appear here</p>
      </div>
    </div>
  );
};