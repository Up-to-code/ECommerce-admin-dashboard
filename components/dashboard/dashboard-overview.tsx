"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  ArrowUpRight,
  Eye,
  RefreshCw,
  Download,
  Plus,
  AlertTriangle,
  Star,
  CreditCard,
  UserPlus,
  BarChart3,
  Boxes,
} from "lucide-react"
import { MetricCard } from "../ui/metric-card"
import { AdvancedSalesChart } from "../charts/advanced-sales-chart"
import {
  mockStats,
  mockRecentOrders,
  mockLowStockItems,
  mockTopProducts,
  mockRecentActivity,
  mockQuickActions,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
}

const activityIcons = {
  "shopping-cart": ShoppingCart,
  "alert-triangle": AlertTriangle,
  "user-plus": UserPlus,
  star: Star,
  "credit-card": CreditCard,
}

const actionIcons = {
  plus: Plus,
  package: Package,
  "bar-chart": BarChart3,
  boxes: Boxes,
}

export function DashboardOverview() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState("7d")

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="transition-all duration-200 hover:scale-105 bg-transparent"
          >
            <RefreshCw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="transition-all duration-200 hover:scale-105">
            <Eye className="mr-2 h-4 w-4" />
            View Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={mockStats.totalRevenue}
          change={20.1}
          changeType="positive"
          prefix="$"
          icon={DollarSign}
          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        />
        <MetricCard
          title="Orders"
          value={mockStats.totalOrders}
          change={15.3}
          changeType="positive"
          icon={ShoppingCart}
          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        />
        <MetricCard
          title="Customers"
          value={mockStats.totalCustomers}
          change={8.2}
          changeType="positive"
          icon={Users}
          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        />
        <MetricCard
          title="Products"
          value={mockStats.totalProducts}
          change={2.1}
          changeType="neutral"
          icon={Package}
          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        />
      </div>

      {/* Quick Actions */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plus className="h-4 w-4 text-primary" />
            </div>
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Frequently used actions to manage your store efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockQuickActions.map((action, index) => {
              const Icon = actionIcons[action.icon as keyof typeof actionIcons]
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all duration-200 hover:scale-105 group bg-transparent"
                >
                  <div
                    className={cn(
                      "p-3 rounded-full transition-colors",
                      action.color === "blue" && "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
                      action.color === "green" && "bg-green-100 text-green-600 group-hover:bg-green-200",
                      action.color === "purple" && "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
                      action.color === "orange" && "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdvancedSalesChart />
        </div>

        {/* Top Products */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <span>Top Products</span>
            </CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTopProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">${product.revenue.toLocaleString()}</p>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {product.growth}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders from your customers</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition-all duration-200 hover:border-primary/20"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">{order.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.id} • {order.items} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                    <div className="text-right">
                      <p className="font-medium text-sm">${order.total}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {/* Low Stock Alert */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Low Stock Alert</CardTitle>
                    <CardDescription className="text-sm">Items need restocking</CardDescription>
                  </div>
                </div>
                <Badge variant="destructive" className="text-xs">
                  {mockLowStockItems.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLowStockItems.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive" className="text-xs">
                        {item.stock} left
                      </Badge>
                      <Button size="sm" variant="outline" className="mt-1 h-6 text-xs bg-transparent">
                        Restock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <RefreshCw className="h-4 w-4 text-purple-600" />
                </div>
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.slice(0, 4).map((activity) => {
                  const Icon = activityIcons[activity.icon as keyof typeof activityIcons]
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div
                        className={cn(
                          "p-2 rounded-full",
                          activity.color === "green" && "bg-green-100 text-green-600",
                          activity.color === "orange" && "bg-orange-100 text-orange-600",
                          activity.color === "blue" && "bg-blue-100 text-blue-600",
                          activity.color === "yellow" && "bg-yellow-100 text-yellow-600",
                        )}
                      >
                        <Icon className="h-3 w-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
