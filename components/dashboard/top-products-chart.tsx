"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "iPhone 15", sales: 120 },
  { name: "MacBook Pro", sales: 80 },
  { name: "iPad Air", sales: 95 },
  { name: "AirPods", sales: 150 },
  { name: "Apple Watch", sales: 110 },
]

export function TopProductsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
