import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const lowStockItems = [
  { name: "iPhone 15 Pro", stock: 2, sku: "IP15P-128" },
  { name: "MacBook Air M2", stock: 1, sku: "MBA-M2-256" },
  { name: 'iPad Pro 12.9"', stock: 3, sku: "IPP-129-512" },
  { name: "AirPods Pro", stock: 5, sku: "APP-2ND" },
]

export function LowStockAlert() {
  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.sku} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="space-y-1">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive">{item.stock} left</Badge>
            <Button size="sm" variant="outline">
              Restock
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
