"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar, BarChart3, LineChartIcon, Activity } from "lucide-react"
import { mockSalesData } from "@/lib/mock-data"

const chartTypes = [
  { value: "line", label: "Line Chart", icon: LineChartIcon },
  { value: "area", label: "Area Chart", icon: Activity },
  { value: "bar", label: "Bar Chart", icon: BarChart3 },
]

const metrics = [
  { value: "sales", label: "Sales", color: "#3b82f6" },
  { value: "orders", label: "Orders", color: "#10b981" },
  { value: "customers", label: "Customers", color: "#f59e0b" },
  { value: "revenue", label: "Revenue", color: "#ef4444" },
]

const timeRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "14d", label: "Last 14 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
]

export function AdvancedSalesChart() {
  const [chartType, setChartType] = useState("area")
  const [selectedMetric, setSelectedMetric] = useState("sales")
  const [timeRange, setTimeRange] = useState("14d")

  const currentMetric = metrics.find((m) => m.value === selectedMetric)
  const currentData = mockSalesData.slice(0, timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : mockSalesData.length)

  const renderChart = () => {
    const commonProps = {
      data: currentData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    }

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentMetric?.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={currentMetric?.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value, name) => [
                selectedMetric === "revenue" ? `$${Number(value).toLocaleString()}` : Number(value).toLocaleString(),
                currentMetric?.label,
              ]}
            />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={currentMetric?.color}
              fillOpacity={1}
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        )
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey={selectedMetric} fill={currentMetric?.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={currentMetric?.color}
              strokeWidth={3}
              dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: currentMetric?.color, strokeWidth: 2 }}
            />
          </LineChart>
        )
    }
  }

  const calculateTrend = () => {
    if (currentData.length < 2) return { value: 0, isPositive: true }
    const latest = currentData[currentData.length - 1][selectedMetric as keyof (typeof currentData)[0]]
    const previous = currentData[currentData.length - 2][selectedMetric as keyof (typeof currentData)[0]]
    const change = ((Number(latest) - Number(previous)) / Number(previous)) * 100
    return { value: Math.abs(change), isPositive: change >= 0 }
  }

  const trend = calculateTrend()

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Interactive sales data visualization</CardDescription>
            </div>
          </div>
          <Badge variant={trend.isPositive ? "default" : "destructive"} className="flex items-center space-x-1">
            {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{trend.value.toFixed(1)}%</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {chartTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      <type.icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {metrics.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value}>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }} />
                      <span>{metric.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {metrics.map((metric) => {
            const latestValue = currentData[currentData.length - 1]?.[metric.value as keyof (typeof currentData)[0]]
            return (
              <div
                key={metric.value}
                className={`p-3 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                  selectedMetric === metric.value ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedMetric(metric.value)}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <div className="text-xl font-bold">
                  {metric.value === "revenue"
                    ? `$${Number(latestValue).toLocaleString()}`
                    : Number(latestValue).toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
