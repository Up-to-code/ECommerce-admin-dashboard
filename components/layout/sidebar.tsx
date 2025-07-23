"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useThemeStore } from "@/lib/store/theme-store"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  Store,
  Palette,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  collapsed: boolean
}

export function Sidebar({ open, onOpenChange, collapsed }: SidebarProps) {
  const pathname = usePathname()
  const { toggleSidebar, primaryColor } = useThemeStore()

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r transition-all duration-300 ease-in-out transform",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Store className="h-6 w-6" style={{ color: primaryColor }} />
            <span className="font-bold text-lg">eCommerce</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200 hover:scale-105 hover:shadow-sm",
                    collapsed && "px-2",
                    isActive && "bg-primary/10 text-primary shadow-sm",
                  )}
                  style={isActive ? { backgroundColor: `${primaryColor}15`, color: primaryColor } : {}}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Theme Customizer */}
      {!collapsed && (
        <div className="p-3 border-t">
          <Link href="/theme-customizer">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Palette className="h-4 w-4" />
              <span className="ml-3">Customize</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
