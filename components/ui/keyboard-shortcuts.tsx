"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useThemeStore } from "@/lib/store/theme-store"

export function KeyboardShortcuts() {
  const router = useRouter()
  const { toggleSidebar, toggleDarkMode } = useThemeStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger if no input is focused
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      // Cmd/Ctrl + K for search
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        document.querySelector('input[placeholder*="Search"]')?.focus()
      }

      // Cmd/Ctrl + B for sidebar toggle
      if ((event.metaKey || event.ctrlKey) && event.key === "b") {
        event.preventDefault()
        toggleSidebar()
      }

      // Cmd/Ctrl + D for dark mode toggle
      if ((event.metaKey || event.ctrlKey) && event.key === "d") {
        event.preventDefault()
        toggleDarkMode()
      }

      // Number keys for navigation
      if (event.key >= "1" && event.key <= "6" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        const routes = ["/", "/orders", "/products", "/customers", "/analytics", "/settings"]
        const index = Number.parseInt(event.key) - 1
        if (routes[index]) {
          router.push(routes[index])
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [router, toggleSidebar, toggleDarkMode])

  return null
}
