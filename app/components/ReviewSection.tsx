'use client'

import React from 'react'
import { Star, ThumbsUp, User, CheckCircle } from 'lucide-react'
import { useReviews } from '../contexts/ReviewContext'

interface ReviewSectionProps {
  productId: number;
  productName: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId, productName }) => {
  const { 
    getProductReviews, 
    getAverageRating, 
    getTotalReviews, 
    addReview, 
    markHelpful 
  } = useReviews()
  
  const [showReviewForm, setShowReviewForm] = React.useState(false)
  const [reviewForm, setReviewForm] = React.useState({
    userName: '',
    userEmail: '',
    rating: 5,
    title: '',
    comment: '',
    verified: false
  })

  const productReviews = getProductReviews(productId)
  const averageRating = getAverageRating(productId)
  const totalReviews = getTotalReviews(productId)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    addReview({
      productId,
      ...reviewForm
    })
    setReviewForm({
      userName: '',
      userEmail: '',
      rating: 5,
      title: '',
      comment: '',
      verified: false
    })
    setShowReviewForm(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setReviewForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]
    productReviews.forEach(review => {
      distribution[review.rating - 1]++
    })
    return distribution.reverse()
  }

  const ratingDistribution = getRatingDistribution()

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-cream-200 p-8">
      {/* Review Summary */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-serif font-bold text-brown-800">Customer Reviews</h3>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gradient-to-r from-brown-600 to-brown-700 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            Write a Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-brown-700 mb-2">{averageRating}</div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(averageRating) ? 'text-gold-400 fill-gold-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gold-400 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: totalReviews > 0 ? `${(ratingDistribution[index] / totalReviews) * 100}%` : '0%'
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{ratingDistribution[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-8 p-6 bg-cream-50 rounded-2xl animate-fade-in">
          <h4 className="text-xl font-semibold text-brown-800 mb-4">Write Your Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="userName"
                  value={reviewForm.userName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-cream-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-2">Email</label>
                <input
                  type="email"
                  name="userEmail"
                  value={reviewForm.userEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-cream-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brown-700 mb-2">Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setReviewForm(prev => ({ ...prev, rating }))}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        rating <= reviewForm.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brown-700 mb-2">Review Title</label>
              <input
                type="text"
                name="title"
                value={reviewForm.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-cream-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brown-700 mb-2">Your Review</label>
              <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-cream-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-colors"
                placeholder="Share your experience with this product"
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="verified"
                checked={reviewForm.verified}
                onChange={handleInputChange}
                className="h-4 w-4 text-brown-600 rounded"
              />
              <label className="text-sm text-brown-700">I am a verified purchaser</label>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-brown-600 to-brown-700 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-3 border border-brown-300 text-brown-600 rounded-full hover:bg-brown-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {productReviews.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-cream-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No reviews yet</h4>
            <p className="text-gray-500">Be the first to review {productName}</p>
          </div>
        ) : (
          productReviews.map((review) => (
            <div key={review.id} className="border border-cream-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-brown-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h5 className="font-semibold text-brown-800">{review.userName}</h5>
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="font-semibold text-brown-800 mb-2">{review.title}</h6>
              <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => markHelpful(review.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-brown-600 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                {review.verified && (
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ReviewSection