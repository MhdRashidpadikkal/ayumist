'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminAnalytics() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: 125000,
      previous: 110000,
      growth: 13.6
    },
    orders: {
      current: 156,
      previous: 142,
      growth: 9.9
    },
    customers: {
      current: 1234,
      previous: 1156,
      growth: 6.7
    },
    products: {
      current: 24,
      previous: 22,
      growth: 9.1
    }
  }

  const salesData = [
    { month: 'Jan', sales: 45000, orders: 89 },
    { month: 'Feb', sales: 52000, orders: 102 },
    { month: 'Mar', sales: 48000, orders: 95 },
    { month: 'Apr', sales: 61000, orders: 118 },
    { month: 'May', sales: 55000, orders: 108 },
    { month: 'Jun', sales: 67000, orders: 125 },
    { month: 'Jul', sales: 72000, orders: 142 },
    { month: 'Aug', sales: 68000, orders: 134 },
    { month: 'Sep', sales: 75000, orders: 148 },
    { month: 'Oct', sales: 82000, orders: 156 },
    { month: 'Nov', sales: 78000, orders: 152 },
    { month: 'Dec', sales: 85000, orders: 165 }
  ]

  const topProducts = [
    { name: 'AYUMIST Skin Dew Gel', sales: 89, revenue: 79911 },
    { name: 'AYUMIST Glow Nectar Face Cream', sales: 76, revenue: 98724 },
    { name: 'AYUMIST Kesh Nectar Hair Oil', sales: 65, revenue: 51935 },
    { name: 'AYUMIST Shine Dew Shampoo', sales: 58, revenue: 37642 },
    { name: 'AYUMIST Soft Dew Body Lotion', sales: 52, revenue: 46748 }
  ]

  const customerInsights = {
    newCustomers: 89,
    returningCustomers: 67,
    averageOrderValue: 1250,
    customerLifetimeValue: 3200
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-2xl font-serif font-bold text-brown-800">
                AYUMIST Admin
              </Link>
              <span className="text-sm text-gray-500">Analytics</span>
            </div>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 py-4 px-1 font-medium">
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
            <Link href="/admin/analytics" className="border-b-2 border-brown-500 text-brown-600 py-4 px-1 font-medium">
              Analytics
            </Link>
          </nav>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${analyticsData.revenue.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analyticsData.revenue.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{analyticsData.revenue.growth}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-800">₹{analyticsData.revenue.current.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">vs ₹{analyticsData.revenue.previous.toLocaleString()} last month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${analyticsData.orders.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analyticsData.orders.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{analyticsData.orders.growth}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-800">{analyticsData.orders.current}</p>
            <p className="text-sm text-gray-500 mt-1">vs {analyticsData.orders.previous} last month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${analyticsData.customers.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analyticsData.customers.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{analyticsData.customers.growth}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Customers</h3>
            <p className="text-3xl font-bold text-gray-800">{analyticsData.customers.current}</p>
            <p className="text-sm text-gray-500 mt-1">vs {analyticsData.customers.previous} last month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${analyticsData.products.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analyticsData.products.growth > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{analyticsData.products.growth}%</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Products</h3>
            <p className="text-3xl font-bold text-gray-800">{analyticsData.products.current}</p>
            <p className="text-sm text-gray-500 mt-1">vs {analyticsData.products.previous} last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-cream-200 p-6">
            <h3 className="text-xl font-serif font-bold text-brown-800 mb-6">Sales Overview</h3>
            <div className="space-y-4">
              {salesData.slice(-6).map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-brown-500 to-brown-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.sales / 85000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">₹{data.sales.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{data.orders} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-lg border border-cream-200 p-6">
            <h3 className="text-xl font-serif font-bold text-brown-800 mb-6">Top Products</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brown-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brown-600">₹{product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="bg-white rounded-2xl shadow-lg border border-cream-200 p-6">
          <h3 className="text-xl font-serif font-bold text-brown-800 mb-6">Customer Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{customerInsights.newCustomers}</p>
              <p className="text-sm text-gray-600">New Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">{customerInsights.returningCustomers}</p>
              <p className="text-sm text-gray-600">Returning Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">₹{customerInsights.averageOrderValue}</p>
              <p className="text-sm text-gray-600">Avg Order Value</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">₹{customerInsights.customerLifetimeValue}</p>
              <p className="text-sm text-gray-600">Customer LTV</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}