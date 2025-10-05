"use client"

import { useReviews } from "../contexts/review-context"
import { Star } from "lucide-react"

interface ProductRatingProps {
  productId: string
  showCount?: boolean
  size?: "sm" | "md" | "lg"
}

export default function ProductRating({ productId, showCount = true, size = "md" }: ProductRatingProps) {
  const { getAverageRating, getReviewCount } = useReviews()

  const averageRating = getAverageRating(productId)
  const reviewCount = getReviewCount(productId)

  const starSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"

  if (reviewCount === 0) {
    return (
      <div className={`flex items-center space-x-1 ${textSize} text-gray-400`}>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={`${starSize} text-gray-600`} />
          ))}
        </div>
        {showCount && <span>No reviews</span>}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-1 ${textSize}`}>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(averageRating) ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        ))}
      </div>
      <span className="text-white font-medium">{averageRating}</span>
      {showCount && (
        <span className="text-gray-400">
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  )
}
