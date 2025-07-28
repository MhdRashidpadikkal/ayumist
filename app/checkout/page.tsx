"use client"

import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { CreditCard, MapPin, Phone, Mail, User, Lock } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useCart } from '../contexts/CartContext'

interface Product {
  id: number
  title: string
  price: number
  image_url: string
}

export default function Checkout() {
  const { cartItems } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    paymentMethod: 'card'
  })

  useEffect(() => {
    async function fetchCartProducts() {
      if (cartItems.length === 0) {
        setProducts([])
        return
      }
      const ids = cartItems.map(item => item.id)
      const { data, error } = await supabase
        .from('products')
        .select('id, title, price, image_url')
        .in('id', ids)

      if (error) console.error('Error loading cart products:', error)
      else setProducts(data || [])
    }
    fetchCartProducts()
  }, [cartItems])

  const subtotal = products.reduce((sum, p) => {
    const qty = cartItems.find(c => c.id === p.id)?.quantity || 1
    return sum + p.price * qty
  }, 0)
  const shipping = subtotal > 1499 ? 0 : 99
  const tax = +(subtotal * 0.18).toFixed(2)
  const total = +(subtotal + shipping + tax).toFixed(2)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

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
              {products.map(prod => {
                const qty = cartItems.find(c => c.id === prod.id)?.quantity || 1
                return (
                  <div key={prod.id} className="flex items-center space-x-4 p-4 bg-cream-50 rounded-2xl">
                    <img
                      src={prod.image_url}
                      alt={prod.title}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{prod.title}</h3>
                      <p className="text-gray-600 text-sm">Qty: {qty}</p>
                    </div>
                    <p className="font-bold text-brown-600">₹{(prod.price * qty).toFixed(0)}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-brown-600 font-semibold">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-semibold">₹{tax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-brown-50 to-brown-100 rounded-2xl">
              <div className="flex items-center space-x-2 text-brown-700">
                <Lock className="h-5 w-5" />
                <span className="font-semibold">Secure Payment</span>
              </div>
              <p className="text-sm text-brown-600 mt-1">
                Your payment info is encrypted and secure
              </p>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <User className="h-6 w-6 text-brown-600" />
                <span>Customer Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                />
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />  
                  <input
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-brown-600" />
                <span>Shipping Address</span>
              </h2>

              <div className="space-y-6">
                <input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                  />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                  >
                    <option value="">State</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="karnataka">Karnataka</option>
                  </select>
                  <input
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-brown-600" />
                <span>Payment Method</span>
              </h2>

              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brown-600"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brown-600"
                  />
                  <span>UPI</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brown-600"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-brown-500 to-brown-600 text-white py-4 px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Place Order - ₹{total.toFixed(0)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
