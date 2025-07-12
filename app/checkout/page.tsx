'use client'

import React from 'react'
import Navigation from '../components/Navigation'
import { CreditCard, MapPin, Phone, Mail, User, Lock } from 'lucide-react'

export default function Checkout() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order in just a few steps</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-cream-200">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-cream-50 rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="AYUMIST Skin Dew Gel"
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">AYUMIST Skin Dew Gel</h3>
                  <p className="text-gray-600 text-sm">Qty: 1</p>
                </div>
                <p className="font-bold text-brown-600">₹899</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹899</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-brown-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">₹161</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>₹1,060</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-brown-50 to-brown-100 rounded-2xl">
              <div className="flex items-center space-x-2 text-brown-700">
                <Lock className="h-5 w-5" />
                <span className="font-semibold">Secure Payment</span>
              </div>
              <p className="text-sm text-brown-600 mt-1">Your payment information is encrypted and secure</p>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Customer Information */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <User className="h-6 w-6 text-brown-600" />
                <span>Customer Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-brown-600" />
                <span>Shipping Address</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                    placeholder="Enter your full address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                    >
                      <option value="">Select State</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="delhi">Delhi</option>
                      <option value="gujarat">Gujarat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                      placeholder="000000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-brown-600" />
                <span>Payment Method</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-cream-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brown-600"
                  />
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Credit/Debit Card</span>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-cream-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brown-600"
                  />
                  <span className="font-medium text-gray-800">UPI</span>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-cream-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brown-600"
                  />
                  <span className="font-medium text-gray-800">Cash on Delivery</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button className="w-full bg-gradient-to-r from-brown-500 to-brown-600 text-white py-4 px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Place Order - ₹1,060
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}