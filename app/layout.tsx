import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './contexts/AuthContext'
import { SearchProvider } from './contexts/SearchContext'
import { CartProvider } from './contexts/CartContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { ReviewProvider } from './contexts/ReviewContext'
import WhatsAppChat from './components/WhatsAppChat'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'AYUMIST - Premium Ayurvedic Wellness',
  description: 'Discover authentic Ayurvedic products for natural wellness and beauty. Premium quality, 100% natural ingredients.',
  keywords: 'ayurveda, natural products, wellness, skincare, haircare, herbal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-cream-50">
        <AuthProvider>
          <SearchProvider>
            <CartProvider>
              <FavoritesProvider>
                <ReviewProvider>
                  {children}
                  <WhatsAppChat />
                </ReviewProvider>
              </FavoritesProvider>
            </CartProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  )
}