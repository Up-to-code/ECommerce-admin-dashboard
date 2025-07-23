"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts"

const data = [
  { name: "Electronics", value: 45, color: "#0088FE" },
  { name: "Audio", value: 25, color: "#00C49F" },
  { name: "Wearables", value: 20, color: "#FFBB28" },
  { name: "Accessories", value: 10, color: "#FF8042" },
]

export function SalesByCategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
