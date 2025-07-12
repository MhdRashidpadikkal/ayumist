'use client'

import React from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import ProductCard from '../components/ProductCard'
import { Heart, ArrowLeft } from 'lucide-react'
import { useFavorites } from '../contexts/FavoritesContext'
import { products } from '../data/products'

export default function Favorites() {
  const { favorites } = useFavorites()

  const favoriteProducts = products.filter(product => favorites.includes(product.id))

  if (favoriteProducts.length === 0) {
    return (
      <div>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="h-16 w-16 text-cream-400" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">No Favorites Yet</h1>
            <p className="text-gray-600 mb-8">Start adding products to your favorites to see them here.</p>
            <Link
              href="/products"
              className="inline-flex items-center bg-gradient-to-r from-brown-600 to-brown-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">My Favorites</h1>
            <p className="text-gray-600">{favoriteProducts.length} products in your wishlist</p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-brown-600 hover:text-brown-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}