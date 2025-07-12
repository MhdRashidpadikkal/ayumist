'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import ReviewSection from '../../components/ReviewSection'
import { Star, ShoppingCart, Heart, Shield, Truck, RotateCcw } from 'lucide-react'
import { products } from '../../data/products'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { useReviews } from '../../contexts/ReviewContext'

export default function ProductDetail() {
  const params = useParams()
  const [quantity, setQuantity] = React.useState(1)
  const [activeTab, setActiveTab] = React.useState('description')
  const [selectedImage, setSelectedImage] = React.useState(0)
  
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { getAverageRating, getTotalReviews } = useReviews()

  const product = products.find(p => p.id === parseInt(params.id as string))

  if (!product) {
    return (
      <div>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
          <Link href="/products" className="text-brown-600 hover:text-brown-700">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const productImages = [
    product.image,
    "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&w=800"
  ]

  const averageRating = getAverageRating(product.id)
  const totalReviews = getTotalReviews(product.id)
  const isLiked = isFavorite(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleToggleFavorite = () => {
    if (isLiked) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

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
          {/* Product Images */}
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
                  className={`w-full h-24 object-cover rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedImage === index 
                      ? 'ring-2 ring-brown-500 opacity-100' 
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
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
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="bg-cream-50 p-6 rounded-2xl">
              <h3 className="font-semibold text-gray-800 mb-3">Product Description:</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-brown-600 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-brown-600 transition-colors"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleToggleFavorite}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-brown-600 to-brown-700 text-white py-4 px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              
              <Link
                href="/checkout"
                className="w-full bg-gold-500 hover:bg-gold-600 text-white py-4 px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Buy Now</span>
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

        {/* Product Details Tabs */}
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
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Benefits:</h4>
                <ul className="space-y-2">
                  {product.tags.map((tag, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-brown-500 rounded-full"></div>
                      <span className="text-gray-700 capitalize">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Natural Ingredients:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-cream-50 p-6 rounded-2xl">
                    <h5 className="font-semibold text-brown-800 mb-3">Primary Ingredients</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Organic Aloe Vera Extract</li>
                      <li>• Pure Turmeric Powder</li>
                      <li>• Natural Rose Water</li>
                      <li>• Vitamin E Oil</li>
                    </ul>
                  </div>
                  <div className="bg-cream-50 p-6 rounded-2xl">
                    <h5 className="font-semibold text-brown-800 mb-3">Supporting Herbs</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Neem Extract</li>
                      <li>• Sandalwood Oil</li>
                      <li>• Coconut Oil</li>
                      <li>• Natural Glycerin</li>
                    </ul>
                  </div>
                </div>
              </div>
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