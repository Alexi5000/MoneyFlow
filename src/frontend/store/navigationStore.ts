import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BreadcrumbItem {
  label: string
  path: string
}

export interface QuickAction {
  id: string
  label: string
  icon: string
  action: () => void
  shortcut?: string
}

interface NavigationState {
  currentTab: string
  sidebarCollapsed: boolean
  mobileMenuOpen: boolean
  breadcrumbs: BreadcrumbItem[]
  navigationHistory: string[]
  quickActions: QuickAction[]
  
  // Actions
  setCurrentTab: (tab: string) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
  addToHistory: (path: string) => void
  setQuickActions: (actions: QuickAction[]) => void
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set, get) => ({
      currentTab: 'dashboard',
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      breadcrumbs: [],
      navigationHistory: [],
      quickActions: [],

      setCurrentTab: (currentTab) => {
        set({ currentTab })
        get().addToHistory(currentTab)
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
      },

      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

      toggleMobileMenu: () => {
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }))
      },

      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

      setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

      addToHistory: (path) => {
        set((state) => ({
          navigationHistory: [path, ...state.navigationHistory.filter(p => p !== path)].slice(0, 10)
        }))
      },

      setQuickActions: (quickActions) => set({ quickActions }),
    }),
    {
      name: 'moneyflow-navigation-store',
      partialize: (state) => ({
        currentTab: state.currentTab,
        sidebarCollapsed: state.sidebarCollapsed,
        navigationHistory: state.navigationHistory,
      }),
    }
  )
)