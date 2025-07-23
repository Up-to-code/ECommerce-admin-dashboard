"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeState {
  primaryColor: string
  sidebarCollapsed: boolean
  darkMode: boolean
  sidebarLayout: "vertical" | "horizontal"
  setPrimaryColor: (color: string) => void
  toggleSidebar: () => void
  toggleDarkMode: () => void
  setSidebarLayout: (layout: "vertical" | "horizontal") => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      primaryColor: "#3b82f6",
      sidebarCollapsed: false,
      darkMode: false,
      sidebarLayout: "vertical",
      setPrimaryColor: (color) => set({ primaryColor: color }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setSidebarLayout: (layout) => set({ sidebarLayout: layout }),
    }),
    {
      name: "theme-storage",
    },
  ),
)
