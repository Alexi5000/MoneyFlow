import { create } from 'zustand'

interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  activeView: 'dashboard' | 'transactions' | 'budgets' | 'insights' | 'settings'
  isAnimating: boolean
  notifications: Notification[]
  
  // Actions
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
  setActiveView: (view: UIState['activeView']) => void
  setAnimating: (animating: boolean) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timestamp: number
  duration?: number
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: 'dark',
  sidebarOpen: true,
  mobileMenuOpen: false,
  activeView: 'dashboard',
  isAnimating: false,
  notifications: [],

  toggleTheme: () => {
    const { theme } = get()
    const newTheme = theme === 'light' ? 'dark' : 'light'
    set({ theme: newTheme })
    
    // Update document class for theme switching
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
  },

  setTheme: (theme) => {
    set({ theme })
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }))
  },

  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

  toggleMobileMenu: () => {
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }))
  },

  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

  setActiveView: (activeView) => set({ activeView }),

  setAnimating: (isAnimating) => set({ isAnimating }),

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    }

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }))

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        get().removeNotification(newNotification.id)
      }, notification.duration || 5000)
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  },

  clearNotifications: () => set({ notifications: [] }),
}))