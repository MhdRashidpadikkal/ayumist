'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import ReviewSection from '../../components/ReviewSection'
import { supabase } from '@/lib/supabaseClient'
import { Heart, RotateCcw, Shield, ShoppingCart, Star, Truck } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useReviews } from '../../contexts/ReviewContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [selectedImage, setSelectedImage] = useState(0)

  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { getAverageRating, getTotalReviews } = useReviews()

  // 🔽 Load product from Supabase using ID
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching product:', error.message)
        setProduct(null)
      } else {
        setProduct(data)
      }

      setLoading(false)
    }

    if (id) fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="text-center py-20">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <Navigation />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link href="/products" className="text-brown-600 underline">Back to Products</Link>
        </div>
      </div>
    )
  }

  const productImages = [
    product.image_url,
    "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&w=800"
  ]

  const averageRating = getAverageRating(product.id)
  const totalReviews = getTotalReviews(product.id)
  const isLiked = isFavorite(product.id)

  const handleAddToCart = () => addToCart(product, quantity)
  const handleToggleFavorite = () =>
    isLiked ? removeFromFavorites(product.id) : addToFavorites(product.id)

  return (
    <div>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-brown-600 hover:text-brown-700">Home</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li><Link href="/products" className="text-brown-600 hover:text-brown-700">Products</Link></li>
            <li><span className="text-gray-500">/</span></li>
            <li className="text-gray-500">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-3xl overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-brown-500 opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={image} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-800">{product.name}</h1>
              <div className="flex items-center space-x-4 mt-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < averageRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({totalReviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-brown-600 font-serif">₹{product.price}</span>
                {product.original_price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.original_price}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="bg-cream-50 p-6 rounded-2xl">
              <h3 className="font-semibold text-gray-800 mb-3">Product Description:</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-600">-</button>
                <span className="px-4 py-2 border-x border-gray-300 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-600">+</button>
              </div>
              <button onClick={handleToggleFavorite} className="text-gray-600 hover:text-red-500">
                <Heart className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
              </button>
            </div>

            <div className="space-y-4">
              <button onClick={handleAddToCart} className="w-full bg-brown-600 text-white py-4 px-8 rounded-full font-semibold text-lg shadow hover:bg-brown-700 transition flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>

              <Link href="/checkout" className="w-full block text-center bg-gold-500 hover:bg-gold-600 text-white py-4 px-8 rounded-full font-semibold text-lg shadow">
                Buy Now
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="h-8 w-8 text-brown-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">100% Natural</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-brown-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-brown-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">30-Day Return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'ingredients', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-brown-500 text-brown-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            )}

            {activeTab === 'ingredients' && (
              <ul className="space-y-2 text-gray-700">
                <li>• Neem Extract</li>
                <li>• Turmeric Root</li>
                <li>• Aloe Vera</li>
              </ul>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection productId={product.id} productName={product.name} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
