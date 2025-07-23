import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { OrdersPage } from "@/components/orders/orders-page"

export default function Orders() {
  return (
    <DashboardLayout>
      <OrdersPage />
    </DashboardLayout>
  )
}
