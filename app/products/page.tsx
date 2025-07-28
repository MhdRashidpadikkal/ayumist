'use client'

import React from 'react'
import Navigation from '../components/Navigation'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { useSearch } from '../contexts/SearchContext'
import { supabase } from '@/lib/supabaseClient'

export default function Products() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,
    products,
    setProducts
  } = useSearch()

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'featured', label: 'Featured First' }
  ]

  // Fetch products and categories from Supabase
  React.useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true)

      // Fetch all products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')

      if (productsError) {
        console.error('Error fetching products:', productsError.message)
      } else {
        setProducts(productsData)
        console.log('All fetched products:', productsData)
      }

      // Fetch categories and enforce exact match with AddProduct categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('products')
        .select('category')

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError.message)
      } else {
        const validCategories = ['all', 'skincare', 'haircare', 'bodycare', 'wellness']
        const uniqueCategories = [
          'all',
          ...Array.from(new Set(categoriesData.map(item => item.category).filter(Boolean)))
            .filter(cat => validCategories.includes(cat.toLowerCase()))
        ]
        setCategories(uniqueCategories)
        console.log('Fetched categories:', uniqueCategories)
      }

      setLoading(false)
    }

    fetchProductsAndCategories()
  }, [setCategories, setProducts])

  // Filtering and sorting logic
  const filteredProducts = products
    .filter((product) => {
      const normalizedCategory = (product.category || 'uncategorized').toLowerCase()
      const normalizedSelected = selectedCategory.toLowerCase()
      const matchesCategory = 
        normalizedSelected === 'all' || 
        normalizedCategory === normalizedSelected
      const matchesSearch =
        searchTerm === '' ||
        (product.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice =
        product.price != null &&
        product.price >= priceRange[0] && 
        product.price <= priceRange[1]

      console.log({
        title: product.title,
        category: product.category,
        normalizedCategory,
        selectedCategory,
        normalizedSelected,
        matchesCategory,
        searchTerm,
        matchesSearch,
        priceRange,
        matchesPrice,
        included: matchesCategory && matchesSearch && matchesPrice
      })

      return matchesCategory && matchesSearch && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.title || '').localeCompare(b.title || '')
        case 'price-low':
          return (a.price || 0) - (b.price || 0)
        case 'price-high':
          return (b.price || 0) - (a.price || 0)
        default:
          return 0
      }
    })

  console.log('Filter values:', { selectedCategory, searchTerm, priceRange })
  console.log('Filtered products:', filteredProducts)

  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brown-600 to-brown-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Our Products</h1>
          <p className="text-xl text-cream-200 mb-8">
            Discover our complete range of Ayurvedic wellness products
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchTerm && (
          <div className="mb-6 p-4 bg-cream-100 rounded-xl">
            <p className="text-brown-700">
              Showing {filteredProducts.length} results for "
              <strong>{searchTerm}</strong>"
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-cream-300 rounded-xl hover:bg-cream-50 transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5 text-brown-600" />
                <span>Filters</span>
              </button>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-cream-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all'
                      ? 'All Categories'
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-cream-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchTerm('')
                  setPriceRange([0, 10000])
                }}
                className="bg-brown-600 text-white px-4 py-2 rounded-full hover:bg-brown-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {filteredProducts.length} products
            </span>

            <div className="flex border border-cream-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-brown-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-brown-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-cream-200 animate-fade-in">
            <h3 className="text-lg font-semibold text-brown-800 mb-4">
              Advanced Filters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-2">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Availability & Rating sections (can enhance later) */}
              <div></div>
              <div></div>
            </div>
          </div>
        )}

        {/* Product List */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div
            className={`grid gap-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image_url}
                  rating={product.rating || 4}
                  reviews={product.reviews || 0}
                  description={product.description}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-12 w-12 text-cream-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or browse our categories
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchTerm('')
                  setPriceRange([0, 10000])
                }}
                className="bg-brown-600 text-white px-6 py-2 rounded-full hover:bg-brown-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}