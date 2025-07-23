"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useThemeStore } from "@/lib/store/theme-store"
import { Palette, Layout, Type, BracketsIcon as Spacing } from "lucide-react"

const colorOptions = [
  { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
  { name: "Green", value: "#10b981", class: "bg-green-500" },
  { name: "Purple", value: "#8b5cf6", class: "bg-purple-500" },
  { name: "Red", value: "#ef4444", class: "bg-red-500" },
  { name: "Orange", value: "#f97316", class: "bg-orange-500" },
  { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
]

export function ThemeCustomizer() {
  const {
    primaryColor,
    sidebarCollapsed,
    darkMode,
    sidebarLayout,
    setPrimaryColor,
    toggleSidebar,
    toggleDarkMode,
    setSidebarLayout,
  } = useThemeStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Theme Customizer</h1>
          <p className="text-muted-foreground">Customize your dashboard appearance</p>
        </div>
        <Button onClick={() => window.location.reload()}>Apply Changes</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Colors</span>
            </CardTitle>
            <CardDescription>Choose your primary color scheme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setPrimaryColor(color.value)}
                    className={`
                      w-full h-12 rounded-lg border-2 transition-all
                      ${color.class}
                      ${primaryColor === color.value ? "border-white shadow-lg scale-105" : "border-transparent"}
                    `}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layout className="h-5 w-5" />
              <span>Layout</span>
            </CardTitle>
            <CardDescription>Configure your dashboard layout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Collapsed Sidebar</Label>
                <p className="text-sm text-muted-foreground">Minimize sidebar by default</p>
              </div>
              <Switch checked={sidebarCollapsed} onCheckedChange={toggleSidebar} />
            </div>
            <div className="space-y-2">
              <Label>Sidebar Layout</Label>
              <Select value={sidebarLayout} onValueChange={setSidebarLayout}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vertical">Vertical</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Type className="h-5 w-5" />
              <span>Typography</span>
            </CardTitle>
            <CardDescription>Font and text settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select defaultValue="inter">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Font Size</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Spacing className="h-5 w-5" />
              <span>Spacing</span>
            </CardTitle>
            <CardDescription>Adjust spacing and density</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Component Density</Label>
              <Select defaultValue="comfortable">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Border Radius</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your customizations look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sample Dashboard</h3>
              <Button size="sm" style={{ backgroundColor: primaryColor }}>
                Primary Button
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded p-3">
                <div className="text-sm text-muted-foreground">Total Sales</div>
                <div className="text-2xl font-bold">$12,345</div>
              </div>
              <div className="border rounded p-3">
                <div className="text-sm text-muted-foreground">Orders</div>
                <div className="text-2xl font-bold">1,234</div>
              </div>
              <div className="border rounded p-3">
                <div className="text-sm text-muted-foreground">Customers</div>
                <div className="text-2xl font-bold">567</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
