'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminOrders() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  // Mock orders data
  const orders = [
    {
      id: 'ORD001',
      customer: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      amount: 1299,
      status: 'Pending',
      date: '2024-01-15',
      items: 2,
      address: 'Mumbai, Maharashtra'
    },
    {
      id: 'ORD002',
      customer: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 98765 43211',
      amount: 899,
      status: 'Completed',
      date: '2024-01-15',
      items: 1,
      address: 'Delhi, Delhi'
    },
    {
      id: 'ORD003',
      customer: 'Anita Patel',
      email: 'anita@example.com',
      phone: '+91 98765 43212',
      amount: 1599,
      status: 'Processing',
      date: '2024-01-14',
      items: 3,
      address: 'Bangalore, Karnataka'
    },
    {
      id: 'ORD004',
      customer: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 98765 43213',
      amount: 799,
      status: 'Shipped',
      date: '2024-01-14',
      items: 1,
      address: 'Pune, Maharashtra'
    },
    {
      id: 'ORD005',
      customer: 'Meera Gupta',
      email: 'meera@example.com',
      phone: '+91 98765 43214',
      amount: 1199,
      status: 'Cancelled',
      date: '2024-01-13',
      items: 2,
      address: 'Chennai, Tamil Nadu'
    }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'processing':
        return <Package className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    completed: orders.filter(o => o.status === 'Completed').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length
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
              <span className="text-sm text-gray-500">Orders</span>
            </div>
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Orders</span>
            </button>
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
            <Link href="/admin/orders" className="border-b-2 border-brown-500 text-brown-600 py-4 px-1 font-medium">
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

        {/* Order Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-brown-600">{orderStats.total}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
            <p className="text-sm text-gray-600">Processing</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
            <p className="text-sm text-gray-600">Shipped</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-green-600">{orderStats.completed}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-red-600">{orderStats.cancelled}</p>
            <p className="text-sm text-gray-600">Cancelled</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-cream-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brown-800">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brown-800">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brown-800">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brown-800">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brown-800">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brown-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-brown-600">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.items} items</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                        <p className="text-sm text-gray-600">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-brown-600">₹{order.amount}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800">{order.date}</p>
                      <p className="text-sm text-gray-600">{order.address}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <select className="text-sm border border-gray-300 rounded px-2 py-1">
                          <option value={order.status}>{order.status}</option>
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}