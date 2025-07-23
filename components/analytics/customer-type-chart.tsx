"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "New", customers: 320 },
  { name: "Returning", customers: 180 },
]

export function CustomerTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="customers" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
