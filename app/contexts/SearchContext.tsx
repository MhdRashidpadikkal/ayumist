'use client'

import React, { createContext, useContext, useState } from 'react'

interface SearchContextType {
  categories: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  sortBy: string
  setSortBy: React.Dispatch<React.SetStateAction<string>>
  priceRange: [number, number]
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  products: any[]
  setProducts: React.Dispatch<React.SetStateAction<any[]>>
  searchHistory: string[]
  addToSearchHistory: (term: string) => void
  clearSearchHistory: () => void
}

const SearchContext = createContext<SearchContextType>({
  categories: ['all', 'skincare', 'haircare', 'bodycare', 'wellness'],
  setCategories: () => {},
  selectedCategory: 'all',
  setSelectedCategory: () => {},
  sortBy: 'name',
  setSortBy: () => {},
  priceRange: [0, 10000],
  setPriceRange: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  products: [],
  setProducts: () => {},
  searchHistory: [],
  addToSearchHistory: () => {},
  clearSearchHistory: () => {}
})

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<string[]>([
    'all',
    'skincare',
    'haircare',
    'bodycare',
    'wellness'
  ])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const addToSearchHistory = (term: string) => {
    setSearchHistory(prev => [term, ...prev.filter(t => t !== term)].slice(0, 10))
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
  }

  return (
    <SearchContext.Provider
      value={{
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
        setProducts,
        searchHistory,
        addToSearchHistory,
        clearSearchHistory
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}