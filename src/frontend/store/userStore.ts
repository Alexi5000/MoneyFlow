import { create } from 'zustand'
import { User } from '../types'

interface UserState {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
  clearUser: () => set({ user: null })
}))