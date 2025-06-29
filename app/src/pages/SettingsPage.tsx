import React from 'react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="settings-page">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Manage your account settings here</p>
      </div>
    </div>
  );
};