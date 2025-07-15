'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, ShoppingCart, Menu, X, Search, User, Heart, Facebook, Instagram, Youtube } from 'lucide-react'
import SearchBar from './SearchBar'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import Image from 'next/image'
import logo from '../../public/assets/ayumist-logo.png'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const pathname = usePathname()
  const { getCartCount } = useCart()
  const { getFavoritesCount } = useFavorites()

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brown-800 text-cream-100 py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>📞</span>
              <span>090488 67707</span>
            </span>
            <span className="hidden md:block">|</span>
            <span className="hidden md:block">✉️ info@ayumist.com</span>
          </div>
          <div className="hidden md:block">
            <span>Free Shipping on orders above ₹1499</span>
          </div>
          <div className="flex items-center space-x-4">
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
              <Instagram className='w-5'/>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
              <Youtube className='w-5'/>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
              <Facebook className='w-5'/>
            </a>
           
            
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="border-brown-700 ">
                <Image src={logo} alt='logo' width={50} height={50}/>
              </div>
              <div>
                <span className="text-3xl font-serif font-bold text-brown-800 tracking-wide">
                  AYUMIST
                </span>
                <p className="text-xs text-brown-600 -mt-1">Ayurveda for Everyone</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`font-medium transition-all duration-300 relative group ${
                  isActive('/') ? 'text-brown-800' : 'text-brown-600 hover:text-brown-800'
                }`}
              >
                HOME
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${
                  isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                href="/products" 
                className={`font-medium transition-all duration-300 relative group ${
                  isActive('/products') ? 'text-brown-800' : 'text-brown-600 hover:text-brown-800'
                }`}
              >
                SHOP
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${
                  isActive('/products') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                href="/about" 
                className={`font-medium transition-all duration-300 relative group ${
                  isActive('/about') ? 'text-brown-800' : 'text-brown-600 hover:text-brown-800'
                }`}
              >
                OUR STORY
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${
                  isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link 
                href="/contact" 
                className={`font-medium transition-all duration-300 relative group ${
                  isActive('/contact') ? 'text-brown-800' : 'text-brown-600 hover:text-brown-800'
                }`}
              >
                CONTACT
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${
                  isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-brown-600 hover:text-brown-800 transition-colors duration-300 group"
              >
                <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </button>

              <Link href="/favorites" className="relative p-2 text-brown-600 hover:text-brown-800 transition-colors duration-300 group">
                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                {getFavoritesCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {getFavoritesCount()}
                  </span>
                )}
              </Link>
              
              <Link href="/cart" className="relative p-2 text-brown-600 hover:text-brown-800 transition-colors duration-300 group">
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              <Link href="/admin" className="p-2 text-brown-600 hover:text-brown-800 transition-colors duration-300 group">
                <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>

              <button
                className="lg:hidden p-2 text-brown-600 hover:text-brown-800 transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-cream-200 bg-white p-4 animate-slide-in">
            <div className="max-w-2xl mx-auto">
              <SearchBar onClose={() => setIsSearchOpen(false)} autoFocus />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-cream-200 animate-slide-in">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <Link href="/" className="block py-2 text-brown-700 hover:text-brown-900 font-medium transition-colors duration-300">
                HOME
              </Link>
              <Link href="/products" className="block py-2 text-brown-700 hover:text-brown-900 font-medium transition-colors duration-300">
                SHOP
              </Link>
              <Link href="/about" className="block py-2 text-brown-700 hover:text-brown-900 font-medium transition-colors duration-300">
                OUR STORY
              </Link>
              <Link href="/contact" className="block py-2 text-brown-700 hover:text-brown-900 font-medium transition-colors duration-300">
                CONTACT
              </Link>
              <div className="pt-4 border-t border-cream-200">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navigation