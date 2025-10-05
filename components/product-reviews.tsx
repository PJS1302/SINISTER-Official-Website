"use client"

import { useState } from "react"
import { useReviews } from "../contexts/review-context"
import { useAuth } from "../contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Star, ThumbsUp, Verified } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

interface ProductReviewsProps {
  productId: string
  productName: string
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { getProductReviews, getAverageRating, getReviewCount, addReview, markHelpful } = useReviews()
  const { user } = useAuth()
  const [isWritingReview, setIsWritingReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  })

  const reviews = getProductReviews(productId)
  const averageRating = getAverageRating(productId)
  const reviewCount = getReviewCount(productId)

  const handleSubmitReview = () => {
    if (!user || !newReview.title.trim() || !newReview.comment.trim()) return

    addReview({
      productId,
      userId: user.id,
      userName: user.email.split("@")[0],
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      verified: true,
    })

    setNewReview({ rating: 5, title: "", comment: "" })
    setIsWritingReview(false)
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-red-500 text-red-500" : "text-gray-400"
            } ${interactive ? "cursor-pointer hover:text-red-400" : ""}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card className="bg-gray-900 border-red-600">
        <CardHeader>
          <CardTitle className="text-red-600">SINISTER Reviews</CardTitle>
          <CardDescription className="text-gray-400">What other victims think about {productName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-3xl font-bold text-white">{averageRating}</div>
            {renderStars(Math.round(averageRating))}
            <div className="text-gray-400">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length
              const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0
              return (
                <div key={rating} className="flex items-center space-x-2 text-sm">
                  <span className="w-8 text-gray-400">{rating}★</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="w-8 text-gray-400 text-right">{count}</span>
                </div>
              )
            })}
          </div>

          {/* Write Review Button */}
          {user && (
            <Dialog open={isWritingReview} onOpenChange={setIsWritingReview}>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-red-600 hover:bg-red-700">Write a SINISTER Review</Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-red-600">
                <DialogHeader>
                  <DialogTitle className="text-red-600">Share Your SINISTER Experience</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Tell other victims about {productName}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                    {renderStars(newReview.rating, true, (rating) => setNewReview((prev) => ({ ...prev, rating })))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Review Title</label>
                    <Input
                      value={newReview.title}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Sum up your SINISTER experience..."
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Review</label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                      placeholder="Share your thoughts about this SINISTER product..."
                      rows={4}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSubmitReview}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={!newReview.title.trim() || !newReview.comment.trim()}
                    >
                      Submit Review
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsWritingReview(false)}
                      className="border-gray-600 text-gray-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-gray-900 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Verified className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      {renderStars(review.rating)}
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-white mb-2">{review.title}</h4>
              <p className="text-gray-300 mb-4">{review.comment}</p>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markHelpful(review.id)}
                  className="text-gray-400 hover:text-white"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-400">No reviews yet for this SINISTER product.</p>
            <p className="text-gray-500 text-sm mt-2">Be the first to share your terrifying experience!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
