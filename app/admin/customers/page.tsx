'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Eye, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Star
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminCustomers() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  // Mock customers data
  const customers = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      joinDate: '2023-12-15',
      totalOrders: 8,
      totalSpent: 12450,
      lastOrder: '2024-01-15',
      status: 'Active',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=B8956B&color=fff'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 98765 43211',
      location: 'Delhi, Delhi',
      joinDate: '2023-11-20',
      totalOrders: 5,
      totalSpent: 8750,
      lastOrder: '2024-01-12',
      status: 'Active',
      avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=B8956B&color=fff'
    },
    {
      id: 3,
      name: 'Anita Patel',
      email: 'anita@example.com',
      phone: '+91 98765 43212',
      location: 'Bangalore, Karnataka',
      joinDate: '2023-10-08',
      totalOrders: 12,
      totalSpent: 18900,
      lastOrder: '2024-01-10',
      status: 'VIP',
      avatar: 'https://ui-avatars.com/api/?name=Anita+Patel&background=B8956B&color=fff'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 98765 43213',
      location: 'Pune, Maharashtra',
      joinDate: '2023-09-25',
      totalOrders: 3,
      totalSpent: 4200,
      lastOrder: '2024-01-08',
      status: 'Active',
      avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=B8956B&color=fff'
    },
    {
      id: 5,
      name: 'Meera Gupta',
      email: 'meera@example.com',
      phone: '+91 98765 43214',
      location: 'Chennai, Tamil Nadu',
      joinDate: '2023-08-12',
      totalOrders: 15,
      totalSpent: 22300,
      lastOrder: '2024-01-05',
      status: 'VIP',
      avatar: 'https://ui-avatars.com/api/?name=Meera+Gupta&background=B8956B&color=fff'
    },
    {
      id: 6,
      name: 'Arjun Reddy',
      email: 'arjun@example.com',
      phone: '+91 98765 43215',
      location: 'Hyderabad, Telangana',
      joinDate: '2023-07-30',
      totalOrders: 1,
      totalSpent: 899,
      lastOrder: '2023-12-20',
      status: 'Inactive',
      avatar: 'https://ui-avatars.com/api/?name=Arjun+Reddy&background=B8956B&color=fff'
    }
  ]

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Active').length,
    vip: customers.filter(c => c.status === 'VIP').length,
    inactive: customers.filter(c => c.status === 'Inactive').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'VIP':
        return 'bg-purple-100 text-purple-800'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
              <span className="text-sm text-gray-500">Customers</span>
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
            <Link href="/admin/customers" className="border-b-2 border-brown-500 text-brown-600 py-4 px-1 font-medium">
              Customers
            </Link>
            <Link href="/admin/analytics" className="text-gray-500 hover:text-gray-700 py-4 px-1 font-medium">
              Analytics
            </Link>
          </nav>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-brown-600">{customerStats.total}</p>
            <p className="text-sm text-gray-600">Total Customers</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-green-600">{customerStats.active}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-purple-600">{customerStats.vip}</p>
            <p className="text-sm text-gray-600">VIP</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-2xl font-bold text-gray-600">{customerStats.inactive}</p>
            <p className="text-sm text-gray-600">Inactive</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-lg font-bold text-blue-600">₹{customerStats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg border border-cream-200 text-center">
            <p className="text-lg font-bold text-orange-600">₹{Math.round(customerStats.averageOrderValue)}</p>
            <p className="text-sm text-gray-600">Avg Order Value</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-2xl shadow-lg border border-cream-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{customer.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {customer.joinDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-cream-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <ShoppingBag className="h-4 w-4 text-brown-600" />
                    <span className="text-lg font-bold text-brown-600">{customer.totalOrders}</span>
                  </div>
                  <p className="text-xs text-gray-600">Orders</p>
                </div>
                <div className="text-center p-3 bg-cream-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-lg font-bold text-green-600">₹{customer.totalSpent.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-600">Total Spent</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Last Order: {customer.lastOrder}</p>
                <button className="w-full bg-brown-600 text-white py-2 px-4 rounded-lg hover:bg-brown-700 transition-colors flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredCustomers.length} of {customers.length} customers
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