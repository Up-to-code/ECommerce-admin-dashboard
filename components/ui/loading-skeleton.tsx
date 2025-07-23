"use client"

import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  variant?: "default" | "card" | "table" | "chart"
}

export function LoadingSkeleton({ className, variant = "default" }: LoadingSkeletonProps) {
  if (variant === "card") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded w-5/6 animate-pulse" />
        </div>
      </div>
    )
  }

  if (variant === "table") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-muted rounded flex-1 animate-pulse" />
            <div className="h-4 bg-muted rounded flex-1 animate-pulse" />
            <div className="h-4 bg-muted rounded flex-1 animate-pulse" />
            <div className="h-4 bg-muted rounded w-20 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === "chart") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />
        <div className="h-64 bg-muted rounded animate-pulse" />
        <div className="flex justify-between">
          <div className="h-4 bg-muted rounded w-16 animate-pulse" />
          <div className="h-4 bg-muted rounded w-16 animate-pulse" />
        </div>
      </div>
    )
  }

  return <div className={cn("h-4 bg-muted rounded animate-pulse", className)} />
}
