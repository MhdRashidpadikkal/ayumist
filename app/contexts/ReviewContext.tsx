'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Review {
  id: string;
  productId: number;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
  getTotalReviews: (productId: number) => number;
  markHelpful: (reviewId: string) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export const useReviews = () => {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider')
  }
  return context
}

// Sample initial reviews
const initialReviews: Review[] = [
  {
    id: '1',
    productId: 1,
    userName: 'Priya Sharma',
    userEmail: 'priya@example.com',
    rating: 5,
    title: 'Amazing product!',
    comment: 'This gel has transformed my skin. It feels so hydrated and glowing. Highly recommend!',
    date: '2024-01-15',
    verified: true,
    helpful: 12
  },
  {
    id: '2',
    productId: 1,
    userName: 'Rajesh Kumar',
    userEmail: 'rajesh@example.com',
    rating: 4,
    title: 'Good quality',
    comment: 'Nice product with natural ingredients. Takes time to show results but worth it.',
    date: '2024-01-10',
    verified: true,
    helpful: 8
  },
  {
    id: '3',
    productId: 2,
    userName: 'Anita Patel',
    userEmail: 'anita@example.com',
    rating: 5,
    title: 'Love this cream!',
    comment: 'The glow nectar cream is fantastic. My skin looks radiant and feels so soft.',
    date: '2024-01-12',
    verified: true,
    helpful: 15
  },
  {
    id: '4',
    productId: 3,
    userName: 'Vikram Singh',
    userEmail: 'vikram@example.com',
    rating: 5,
    title: 'Best hair oil ever!',
    comment: 'My hair has become so much stronger and shinier. The herbal blend is amazing.',
    date: '2024-01-08',
    verified: true,
    helpful: 20
  }
]

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)

  useEffect(() => {
    const savedReviews = localStorage.getItem('ayumist_reviews')
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('ayumist_reviews', JSON.stringify(reviews))
  }, [reviews])

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    }
    setReviews(prev => [newReview, ...prev])
  }

  const getProductReviews = (productId: number): Review[] => {
    return reviews.filter(review => review.productId === productId)
  }

  const getAverageRating = (productId: number): number => {
    const productReviews = getProductReviews(productId)
    if (productReviews.length === 0) return 0
    
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0)
    return Math.round((totalRating / productReviews.length) * 10) / 10
  }

  const getTotalReviews = (productId: number): number => {
    return getProductReviews(productId).length
  }

  const markHelpful = (reviewId: string) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    )
  }

  const value = {
    reviews,
    addReview,
    getProductReviews,
    getAverageRating,
    getTotalReviews,
    markHelpful
  }

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  )
}