"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Download, Maximize2 } from "lucide-react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 24 }, (_, i) => i)

// Generate more realistic heatmap data
const generateHeatmapData = () => {
  return days.flatMap((day, dayIndex) =>
    hours.map((hour) => {
      // Simulate realistic patterns
      let baseValue = 20

      // Weekend boost
      if (dayIndex >= 5) baseValue += 30

      // Peak hours (9-11 AM, 2-4 PM, 7-9 PM)
      if ((hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16) || (hour >= 19 && hour <= 21)) {
        baseValue += 40
      }

      // Night hours reduction
      if (hour >= 23 || hour <= 6) baseValue -= 15

      // Add some randomness
      const randomVariation = Math.random() * 20 - 10
      const value = Math.max(0, Math.min(100, baseValue + randomVariation))

      return {
        day,
        dayIndex,
        hour,
        value: Math.round(value),
        sales: Math.round(value * 2.5),
        orders: Math.round(value * 0.8),
      }
    }),
  )
}

const heatmapData = generateHeatmapData()

const getIntensityColor = (value: number, colorScheme: string) => {
  const intensity = value / 100

  switch (colorScheme) {
    case "blue":
      return `rgba(59, 130, 246, ${0.1 + intensity * 0.8})`
    case "green":
      return `rgba(16, 185, 129, ${0.1 + intensity * 0.8})`
    case "purple":
      return `rgba(139, 92, 246, ${0.1 + intensity * 0.8})`
    case "orange":
      return `rgba(249, 115, 22, ${0.1 + intensity * 0.8})`
    default:
      return `rgba(59, 130, 246, ${0.1 + intensity * 0.8})`
  }
}

const colorSchemes = [
  { value: "blue", label: "Blue", color: "#3b82f6" },
  { value: "green", label: "Green", color: "#10b981" },
  { value: "purple", label: "Purple", color: "#8b5cf6" },
  { value: "orange", label: "Orange", color: "#f97316" },
]

const metrics = [
  { value: "value", label: "Activity" },
  { value: "sales", label: "Sales" },
  { value: "orders", label: "Orders" },
]

export function InteractiveHeatmap() {
  const [selectedMetric, setSelectedMetric] = useState("value")
  const [colorScheme, setColorScheme] = useState("blue")
  const [hoveredCell, setHoveredCell] = useState<any>(null)

  const maxValue = Math.max(...heatmapData.map((d) => d[selectedMetric as keyof typeof d] as number))
  const avgValue =
    heatmapData.reduce((sum, d) => sum + (d[selectedMetric as keyof typeof d] as number), 0) / heatmapData.length

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Sales Activity Heatmap</span>
            </CardTitle>
            <CardDescription>
              Visualize sales patterns by day and hour to optimize your business operations
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              Peak: {Math.round(maxValue)} at{" "}
              {hoveredCell ? `${hoveredCell.day} ${hoveredCell.hour}:00` : "various times"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {metrics.map((metric) => (
                  <SelectItem key={metric.value} value={metric.value}>
                    {metric.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={colorScheme} onValueChange={setColorScheme}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorSchemes.map((scheme) => (
                  <SelectItem key={scheme.value} value={scheme.value}>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scheme.color }} />
                      <span>{scheme.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="mr-2 h-4 w-4" />
              Fullscreen
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Hour labels */}
          <div className="grid grid-cols-25 gap-1 text-xs">
            <div></div>
            {hours.map((hour) => (
              <div key={hour} className="text-center text-muted-foreground font-mono">
                {hour.toString().padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <TooltipProvider>
            {days.map((day, dayIndex) => (
              <div key={day} className="grid grid-cols-25 gap-1">
                <div className="flex items-center text-sm font-medium text-muted-foreground w-12">{day}</div>
                {hours.map((hour) => {
                  const cellData = heatmapData.find((d) => d.day === day && d.hour === hour)
                  const value = (cellData?.[selectedMetric as keyof typeof cellData] as number) || 0
                  const normalizedValue = (value / maxValue) * 100

                  return (
                    <Tooltip key={`${day}-${hour}`}>
                      <TooltipTrigger asChild>
                        <div
                          className="w-6 h-6 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md border border-border/20"
                          style={{
                            backgroundColor: getIntensityColor(normalizedValue, colorScheme),
                          }}
                          onMouseEnter={() => setHoveredCell(cellData)}
                          onMouseLeave={() => setHoveredCell(null)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-center">
                          <div className="font-semibold">
                            {day} {hour}:00
                          </div>
                          <div className="text-sm">
                            {selectedMetric === "value" && `Activity: ${value}`}
                            {selectedMetric === "sales" && `Sales: $${value.toLocaleString()}`}
                            {selectedMetric === "orders" && `Orders: ${value}`}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            ))}
          </TooltipProvider>

          {/* Legend */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Less</span>
              <div className="flex space-x-1">
                {[0, 25, 50, 75, 100].map((intensity) => (
                  <div
                    key={intensity}
                    className="w-4 h-4 rounded-sm border border-border/20"
                    style={{
                      backgroundColor: getIntensityColor(intensity, colorScheme),
                    }}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">More</span>
            </div>

            <div className="text-sm text-muted-foreground">
              Average: {Math.round(avgValue)}{" "}
              {selectedMetric === "sales" ? "sales" : selectedMetric === "orders" ? "orders" : "activity"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
