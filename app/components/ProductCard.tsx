

'use client'

import Link from 'next/link'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import React from 'react'

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image_url: string;
  rating: number;
  reviews: number;
  description: string;
  originalPrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image_url,
  rating,
  reviews,
  description,
  originalPrice
}) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [showAddedToCart, setShowAddedToCart] = React.useState(false)
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const isLiked = isFavorite(id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ id, name, price, image_url })
    setShowAddedToCart(true)
    setTimeout(() => setShowAddedToCart(false), 2000)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    isLiked ? removeFromFavorites(id) : addToFavorites(id)
  }

 

  return (
    <Link
      href={`/product/${id}`}
      className="bg-white rounded-3xl shadow-lg transition-all duration-500 overflow-hidden border border-cream-200 animate-fade-in relative min-h-[550px] w-full block pb-3"
    >
      {/* Added to Cart Notification */}
      {showAddedToCart && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold z-20 animate-bounce-in">
          Added to Cart!
        </div>
      )}

      {/* Image Area - hover effects apply only here */}
      <div
        className="relative overflow-hidden h-72 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce-in">
            {discount}% OFF
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 z-10"
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isLiked
                ? 'text-red-500 fill-red-500 scale-110'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* Floating Add to Cart button on image hover */}
        <div
          className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 h-52 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors duration-300 ${
                    i < rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">({reviews})</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-brown-700 font-serif">
                ₹{price}
              </span>
              {originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{originalPrice}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          {/* Product Name */}
          <h3 className="text-xl font-serif font-semibold text-brown-800 mb-3 transition-colors duration-300 line-clamp-2 leading-tight">
            {name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* View Details */}
          <div className="inline-flex items-center text-brown-600 hover:text-brown-800 font-medium transition-colors duration-300 mt-auto">
            <span>View Details</span>
            <svg
              className="ml-1 h-4 w-4 hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
