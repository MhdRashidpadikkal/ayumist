'use client'

import React from 'react'
import { MessageCircle, X } from 'lucide-react'

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)

  const handleWhatsAppClick = () => {
    const phone = '+919876543210' // Replace with actual WhatsApp number
    const message = 'Hello! I would like to know more about AYUMIST products.'
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-cream-200 w-80 animate-scale-in">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">AYUMIST Support</h3>
                <p className="text-sm text-green-100">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                👋 Hi there! Welcome to AYUMIST. How can we help you today?
              </p>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppClick}
                className="w-full text-left p-3 bg-cream-50 hover:bg-cream-100 rounded-lg transition-colors text-sm"
              >
                💬 Chat with us on WhatsApp
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="w-full text-left p-3 bg-cream-50 hover:bg-cream-100 rounded-lg transition-colors text-sm"
              >
                📦 Track my order
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="w-full text-left p-3 bg-cream-50 hover:bg-cream-100 rounded-lg transition-colors text-sm"
              >
                🌿 Product recommendations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <div className="relative">
        <button
          onClick={toggleChat}
          className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-float"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
        
        {/* Notification Badge */}
        {isVisible && !isOpen && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
            1
          </div>
        )}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
              Chat with us
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>

      {/* Pulse Animation */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 pointer-events-none"></div>
    </div>
  )
}

export default WhatsAppChat