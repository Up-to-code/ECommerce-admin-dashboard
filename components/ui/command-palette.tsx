"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  Plus,
  Download,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Command {
  id: string
  title: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  category: string
  keywords: string[]
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const commands: Command[] = [
    // Navigation
    {
      id: "nav-dashboard",
      title: "Go to Dashboard",
      description: "View dashboard overview",
      icon: LayoutDashboard,
      action: () => router.push("/"),
      category: "Navigation",
      keywords: ["dashboard", "home", "overview"],
    },
    {
      id: "nav-orders",
      title: "Go to Orders",
      description: "Manage customer orders",
      icon: ShoppingCart,
      action: () => router.push("/orders"),
      category: "Navigation",
      keywords: ["orders", "sales", "customers"],
    },
    {
      id: "nav-products",
      title: "Go to Products",
      description: "Manage product inventory",
      icon: Package,
      action: () => router.push("/products"),
      category: "Navigation",
      keywords: ["products", "inventory", "catalog"],
    },
    {
      id: "nav-customers",
      title: "Go to Customers",
      description: "View customer information",
      icon: Users,
      action: () => router.push("/customers"),
      category: "Navigation",
      keywords: ["customers", "users", "contacts"],
    },
    {
      id: "nav-analytics",
      title: "Go to Analytics",
      description: "View sales analytics",
      icon: BarChart3,
      action: () => router.push("/analytics"),
      category: "Navigation",
      keywords: ["analytics", "reports", "charts", "data"],
    },
    {
      id: "nav-settings",
      title: "Go to Settings",
      description: "Configure store settings",
      icon: Settings,
      action: () => router.push("/settings"),
      category: "Navigation",
      keywords: ["settings", "configuration", "preferences"],
    },
    // Actions
    {
      id: "action-add-product",
      title: "Add New Product",
      description: "Create a new product",
      icon: Plus,
      action: () => {
        router.push("/products")
        // Trigger add product modal
      },
      category: "Actions",
      keywords: ["add", "create", "new", "product"],
    },
    {
      id: "action-export-data",
      title: "Export Data",
      description: "Download store data",
      icon: Download,
      action: () => {
        // Trigger export
      },
      category: "Actions",
      keywords: ["export", "download", "data", "backup"],
    },
    {
      id: "action-customize-theme",
      title: "Customize Theme",
      description: "Change dashboard appearance",
      icon: Palette,
      action: () => router.push("/theme-customizer"),
      category: "Actions",
      keywords: ["theme", "customize", "appearance", "colors"],
    },
  ]

  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase()
    return (
      command.title.toLowerCase().includes(searchLower) ||
      command.description?.toLowerCase().includes(searchLower) ||
      command.keywords.some((keyword) => keyword.includes(searchLower))
    )
  })

  const groupedCommands = filteredCommands.reduce(
    (acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = []
      }
      acc[command.category].push(command)
      return acc
    },
    {} as Record<string, Command[]>,
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const selectedCommand = filteredCommands[selectedIndex]
        if (selectedCommand) {
          selectedCommand.action()
          onOpenChange(false)
          setSearch("")
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, selectedIndex, filteredCommands, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search..."
            className="border-0 p-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
          <Badge variant="outline" className="ml-auto">
            ⌘K
          </Badge>
        </div>

        <ScrollArea className="max-h-96">
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No commands found.</div>
          ) : (
            <div className="p-2">
              {Object.entries(groupedCommands).map(([category, commands]) => (
                <div key={category} className="mb-4">
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {category}
                  </div>
                  <div className="space-y-1">
                    {commands.map((command, index) => {
                      const globalIndex = filteredCommands.indexOf(command)
                      return (
                        <div
                          key={command.id}
                          className={cn(
                            "flex items-center space-x-3 rounded-md px-2 py-2 text-sm cursor-pointer transition-colors",
                            globalIndex === selectedIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                          )}
                          onClick={() => {
                            command.action()
                            onOpenChange(false)
                            setSearch("")
                          }}
                        >
                          <command.icon className="h-4 w-4" />
                          <div className="flex-1">
                            <div className="font-medium">{command.title}</div>
                            {command.description && (
                              <div className="text-xs text-muted-foreground">{command.description}</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
