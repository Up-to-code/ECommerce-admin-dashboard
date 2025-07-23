// Mock data for the eCommerce dashboard
export const mockStats = {
  totalRevenue: 245231.89,
  totalOrders: 3420,
  totalCustomers: 1847,
  totalProducts: 573,
  conversionRate: 3.2,
  avgOrderValue: 89.5,
  customerLifetimeValue: 324.0,
  returnRate: 2.1,
}

export const mockSalesData = [
  { date: "Jan 1", sales: 4200, orders: 28, customers: 22, revenue: 4200, day: "Mon" },
  { date: "Jan 2", sales: 3800, orders: 25, customers: 20, revenue: 3800, day: "Tue" },
  { date: "Jan 3", sales: 5200, orders: 35, customers: 28, revenue: 5200, day: "Wed" },
  { date: "Jan 4", sales: 4800, orders: 32, customers: 25, revenue: 4800, day: "Thu" },
  { date: "Jan 5", sales: 6200, orders: 42, customers: 35, revenue: 6200, day: "Fri" },
  { date: "Jan 6", sales: 7800, orders: 52, customers: 45, revenue: 7800, day: "Sat" },
  { date: "Jan 7", sales: 8200, orders: 55, customers: 48, revenue: 8200, day: "Sun" },
  { date: "Jan 8", sales: 5800, orders: 39, customers: 32, revenue: 5800, day: "Mon" },
  { date: "Jan 9", sales: 6800, orders: 46, customers: 38, revenue: 6800, day: "Tue" },
  { date: "Jan 10", sales: 7200, orders: 48, customers: 40, revenue: 7200, day: "Wed" },
  { date: "Jan 11", sales: 6500, orders: 44, customers: 36, revenue: 6500, day: "Thu" },
  { date: "Jan 12", sales: 8500, orders: 57, customers: 49, revenue: 8500, day: "Fri" },
  { date: "Jan 13", sales: 9200, orders: 62, customers: 54, revenue: 9200, day: "Sat" },
  { date: "Jan 14", sales: 8800, orders: 59, customers: 51, revenue: 8800, day: "Sun" },
]

export const mockRecentOrders = [
  {
    id: "#ORD-3421",
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    status: "completed",
    total: 156.99,
    date: "2024-01-15",
    items: 3,
    avatar: "SJ",
  },
  {
    id: "#ORD-3420",
    customer: "Michael Chen",
    email: "m.chen@email.com",
    status: "processing",
    total: 89.5,
    date: "2024-01-15",
    items: 2,
    avatar: "MC",
  },
  {
    id: "#ORD-3419",
    customer: "Emma Wilson",
    email: "emma.w@email.com",
    status: "shipped",
    total: 234.75,
    date: "2024-01-14",
    items: 4,
    avatar: "EW",
  },
  {
    id: "#ORD-3418",
    customer: "David Rodriguez",
    email: "d.rodriguez@email.com",
    status: "pending",
    total: 67.25,
    date: "2024-01-14",
    items: 1,
    avatar: "DR",
  },
  {
    id: "#ORD-3417",
    customer: "Lisa Anderson",
    email: "lisa.a@email.com",
    status: "completed",
    total: 445.0,
    date: "2024-01-13",
    items: 6,
    avatar: "LA",
  },
]

export const mockLowStockItems = [
  {
    name: "iPhone 15 Pro Max",
    stock: 2,
    sku: "IP15PM-256",
    category: "Electronics",
    price: 1199.0,
    image: "/placeholder.svg?height=40&width=40&text=iPhone",
  },
  {
    name: "MacBook Air M3",
    stock: 1,
    sku: "MBA-M3-512",
    category: "Computers",
    price: 1499.0,
    image: "/placeholder.svg?height=40&width=40&text=MacBook",
  },
  {
    name: "AirPods Pro 2nd Gen",
    stock: 3,
    sku: "APP-2ND-USB",
    category: "Audio",
    price: 249.0,
    image: "/placeholder.svg?height=40&width=40&text=AirPods",
  },
  {
    name: 'iPad Pro 12.9"',
    stock: 4,
    sku: "IPP-129-1TB",
    category: "Tablets",
    price: 1299.0,
    image: "/placeholder.svg?height=40&width=40&text=iPad",
  },
  {
    name: "Apple Watch Ultra 2",
    stock: 2,
    sku: "AWU2-49MM",
    category: "Wearables",
    price: 799.0,
    image: "/placeholder.svg?height=40&width=40&text=Watch",
  },
]

export const mockTopProducts = [
  { name: "iPhone 15 Pro", sales: 156, revenue: 155844, growth: 12.5 },
  { name: "MacBook Air M3", sales: 89, revenue: 133411, growth: 8.3 },
  { name: "AirPods Pro", sales: 234, revenue: 58266, growth: 15.7 },
  { name: "iPad Air", sales: 145, revenue: 87145, growth: 6.2 },
  { name: "Apple Watch Series 9", sales: 178, revenue: 71022, growth: 9.8 },
]

export const mockCustomerInsights = [
  { metric: "New Customers", value: 156, change: 12.5, period: "This month" },
  { metric: "Returning Customers", value: 89, change: -3.2, period: "This month" },
  { metric: "Customer Satisfaction", value: 4.8, change: 2.1, period: "Average rating" },
  { metric: "Support Tickets", value: 23, change: -15.6, period: "This week" },
]

export const mockRecentActivity = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    description: "Order #ORD-3421 from Sarah Johnson",
    time: "2 minutes ago",
    icon: "shopping-cart",
    color: "green",
  },
  {
    id: 2,
    type: "stock",
    title: "Low stock alert",
    description: "iPhone 15 Pro Max has only 2 items left",
    time: "15 minutes ago",
    icon: "alert-triangle",
    color: "orange",
  },
  {
    id: 3,
    type: "customer",
    title: "New customer registered",
    description: "Michael Chen joined your store",
    time: "1 hour ago",
    icon: "user-plus",
    color: "blue",
  },
  {
    id: 4,
    type: "review",
    title: "New product review",
    description: "5-star review for MacBook Air M3",
    time: "2 hours ago",
    icon: "star",
    color: "yellow",
  },
  {
    id: 5,
    type: "payment",
    title: "Payment processed",
    description: "$234.75 payment confirmed",
    time: "3 hours ago",
    icon: "credit-card",
    color: "green",
  },
]

export const mockQuickActions = [
  {
    title: "Add Product",
    description: "Create a new product listing",
    icon: "plus",
    color: "blue",
    action: "add-product",
  },
  {
    title: "Process Orders",
    description: "Review and fulfill pending orders",
    icon: "package",
    color: "green",
    action: "process-orders",
  },
  {
    title: "View Analytics",
    description: "Check detailed sales reports",
    icon: "bar-chart",
    color: "purple",
    action: "view-analytics",
  },
  {
    title: "Manage Inventory",
    description: "Update stock levels and pricing",
    icon: "boxes",
    color: "orange",
    action: "manage-inventory",
  },
]
