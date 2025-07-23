"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "./animated-counter"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: number
  change?: number
  changeType?: "positive" | "negative" | "neutral"
  prefix?: string
  suffix?: string
  icon?: React.ComponentType<{ className?: string }>
  className?: string
  loading?: boolean
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  prefix = "",
  suffix = "",
  icon: Icon,
  className,
  loading = false,
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (changeType) {
      case "positive":
        return <TrendingUp className="h-3 w-3" />
      case "negative":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
      case "negative":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  if (loading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 bg-muted rounded animate-pulse w-24" />
          <div className="h-4 w-4 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-muted rounded animate-pulse w-20 mb-2" />
          <div className="h-4 bg-muted rounded animate-pulse w-32" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg group border-l-4 border-l-transparent hover:border-l-primary",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          <AnimatedCounter end={value} prefix={prefix} suffix={suffix} duration={1500} />
        </div>
        {change !== undefined && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={cn("flex items-center space-x-1 text-xs", getTrendColor())}>
              {getTrendIcon()}
              <span>{Math.abs(change)}%</span>
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  )
}
