'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { products } from '../../data/products'

export default function AdminDashboard() {
  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  // Mock data for dashboard
  const dashboardStats = {
    totalProducts: products.length,
    totalOrders: 156,
    totalCustomers: 1234,
    totalRevenue: 125000,
    todayOrders: 12,
    pendingOrders: 8,
    completedOrders: 148,
    lowStockProducts: 3
  }

  const recentOrders = [
    { id: 'ORD001', customer: 'Priya Sharma', amount: 1299, status: 'Pending', date: '2024-01-15' },
    { id: 'ORD002', customer: 'Rajesh Kumar', amount: 899, status: 'Completed', date: '2024-01-15' },
    { id: 'ORD003', customer: 'Anita Patel', amount: 1599, status: 'Processing', date: '2024-01-14' },
    { id: 'ORD004', customer: 'Vikram Singh', amount: 799, status: 'Shipped', date: '2024-01-14' },
    { id: 'ORD005', customer: 'Meera Gupta', amount: 1199, status: 'Pending', date: '2024-01-13' }
  ]

  const topProducts = products.slice(0, 5).map(product => ({
    ...product,
    sales: Math.floor(Math.random() * 100) + 20
  }))

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-serif font-bold text-brown-800">
                AYUMIST Admin
              </Link>
              <span className="text-sm text-gray-500">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            <Link href="/admin/dashboard" className="border-b-2 border-brown-500 text-brown-600 py-4 px-1 font-medium">
              Dashboard
            </Link>
            <Link href="/admin/products" className="text-gray-500 hover:text-gray-700 py-4 px-1 font-medium">
              Products
            </Link>
            <Link href="/admin/orders" className="text-gray-500 hover:text-gray-700 py-4 px-1 font-medium">
              Orders
            </Link>
            <Link href="/admin/customers" className="text-gray-500 hover:text-gray-700 py-4 px-1 font-medium">
              Customers
            </Link>
            <Link href="/admin/analytics" className="text-gray-500 hover:text-gray-700 py-4 px-1 font-medium">
              Analytics
            </Link>
          </nav>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">₹{dashboardStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600">{dashboardStats.totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">+8% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-purple-600">{dashboardStats.totalProducts}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">+3 new this week</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-3xl font-bold text-orange-600">{dashboardStats.totalCustomers}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-orange-600 mt-2">+15% from last month</p>
          </div>
        </div>

        {/* Quick Actions */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <Link href="/admin/products/add" className="bg-gradient-to-r from-brown-600 to-brown-700 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
    <Plus className="h-5 w-5" />
    <span className="font-semibold">Add Product</span>
  </Link>

  <Link href="/admin/orders" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
    <Eye className="h-5 w-5" />
    <span className="font-semibold">View Orders</span>
  </Link>

  <Link href="/admin/analytics" className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
    <BarChart3 className="h-5 w-5" />
    <span className="font-semibold">Analytics</span>
  </Link>

  <Link href="/admin/customers" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
    <Users className="h-5 w-5" />
    <span className="font-semibold">Customers</span>
  </Link>

  {/* 🆕 Hero Section Button */}
  <Link href="/admin/hero" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
    <Activity className="h-5 w-5" />
    <span className="font-semibold">Hero Section</span>
  </Link>
</div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg border border-cream-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-brown-800">Recent Orders</h3>
              <Link href="/admin/orders" className="text-brown-600 hover:text-brown-800 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brown-600">₹{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-lg border border-cream-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-brown-800">Top Products</h3>
              <Link href="/admin/products" className="text-brown-600 hover:text-brown-800 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 bg-cream-50 rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brown-600">₹{product.price}</p>
                    <p className="text-xs text-gray-500">⭐ {product.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}