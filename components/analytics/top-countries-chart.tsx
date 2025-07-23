"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { country: "USA", sales: 4500 },
  { country: "UK", sales: 3200 },
  { country: "Canada", sales: 2800 },
  { country: "Germany", sales: 2400 },
  { country: "France", sales: 2000 },
]

export function TopCountriesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="horizontal">
        <XAxis type="number" />
        <YAxis dataKey="country" type="category" width={80} />
        <Tooltip />
        <Bar dataKey="sales" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
