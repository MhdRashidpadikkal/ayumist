'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { supabase } from '@/lib/supabaseClient'

interface Product {
  id: number
  title: string
  price: number
  image_url: string
}

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch full product info from Supabase
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartItems.length === 0) {
        setProducts([])
        return
      }

      const ids = cartItems.map((item) => item.id)
      const { data, error } = await supabase
        .from('products')
        .select('id, title, price, image_url')
        .in('id', ids)

      if (error) {
        console.error('Failed to fetch products:', error.message)
      } else {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchCartProducts()
  }, [cartItems])

  const mergedCart = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.id)
    return {
      ...item,
      name: product?.title || 'Product Name',
      price: product?.price || 0,
      image: product?.image_url || ''
    }
  })

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="text-center py-16 text-gray-500">Loading cart...</div>
      </div>
    )
  }

  if (mergedCart.length === 0) {
    return (
      <div>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="h-16 w-16 text-cream-400" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center bg-gradient-to-r from-brown-600 to-brown-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {mergedCart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200 animate-fade-in"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-brown-600 font-bold text-xl">₹{item.price}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 rounded-full bg-cream-100 hover:bg-cream-200 transition-colors"
                    >
                      <Minus className="h-4 w-4 text-brown-600" />
                    </button>

                    <span className="w-12 text-center font-semibold text-gray-800">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 rounded-full bg-cream-100 hover:bg-cream-200 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-brown-600" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors mt-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-cream-200 h-fit">
            <h2 className="text-xl font-serif font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">
                  ₹{Math.round(getCartTotal() * 0.18)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{Math.round(getCartTotal() * 1.18)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-gradient-to-r from-brown-600 to-brown-700 text-white py-4 px-6 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mb-4"
            >
              <span>Proceed to Checkout</span>
            </Link>

            <Link
              href="/products"
              className="w-full bg-white border-2 border-brown-200 text-brown-600 py-3 px-6 rounded-full font-semibold hover:bg-brown-50 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
