import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../layout/Header'
import { Sidebar } from '../layout/Sidebar'

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <div className="lg:ml-64">
        <Header onMenuClick={handleMenuClick} isSidebarOpen={sidebarOpen} />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}