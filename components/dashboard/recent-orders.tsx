import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  {
    id: "#3210",
    customer: "Olivia Martin",
    status: "completed",
    total: "$42.25",
    date: "2024-01-15",
  },
  {
    id: "#3209",
    customer: "Ava Johnson",
    status: "processing",
    total: "$74.99",
    date: "2024-01-14",
  },
  {
    id: "#3208",
    customer: "Michael Johnson",
    status: "shipped",
    total: "$64.75",
    date: "2024-01-13",
  },
  {
    id: "#3207",
    customer: "Lisa Anderson",
    status: "pending",
    total: "$34.50",
    date: "2024-01-12",
  },
]

const statusColors = {
  completed: "bg-green-100 text-green-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  pending: "bg-yellow-100 text-yellow-800",
}

export function RecentOrders() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
              </TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
