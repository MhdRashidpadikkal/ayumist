'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, X, Clock, TrendingUp } from 'lucide-react'
import { useSearch } from '../contexts/SearchContext'

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, autoFocus = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { 
    searchTerm, 
    setSearchTerm, 
    products, 
    searchHistory, 
    addToSearchHistory,
    clearSearchHistory 
  } = useSearch()

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    if (searchTerm.length > 0) {
      const productSuggestions = products
        .filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .slice(0, 5)
        .map(product => product.name)
      
      const tagSuggestions = Array.from(new Set(
        products.flatMap(product => product.tags)
          .filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )).slice(0, 3)

      setSuggestions([...productSuggestions, ...tagSuggestions])
    } else {
      setSuggestions([])
    }
  }, [searchTerm, products])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    addToSearchHistory(term)
    setIsOpen(false)
    if (onClose) onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
  }

  const handleClear = () => {
    setSearchTerm('')
    setSuggestions([])
    setIsOpen(false)
  }

  const trendingSearches = ['Face Cream', 'Hair Oil', 'Natural Soap', 'Herbal Tea']

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-12 py-3 bg-white border border-cream-300 rounded-full focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-300 shadow-lg"
          placeholder="Search for products, ingredients, or benefits..."
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-cream-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto animate-fade-in">
          {/* Recent Searches */}
          {searchHistory.length > 0 && searchTerm === '' && (
            <div className="p-4 border-b border-cream-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Searches
                </h3>
                <button
                  onClick={clearSearchHistory}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-1">
                {searchHistory.slice(0, 5).map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-cream-50 rounded-lg transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {searchTerm === '' && (
            <div className="p-4 border-b border-cream-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1 bg-cream-100 text-brown-700 text-sm rounded-full hover:bg-cream-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {suggestions.length > 0 && searchTerm && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Suggestions</h3>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-cream-50 rounded-lg transition-colors"
                  >
                    <Search className="h-3 w-3 inline mr-2 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchTerm && suggestions.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No suggestions found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20   z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default SearchBar