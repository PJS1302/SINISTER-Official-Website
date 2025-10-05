"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../../components/header"
import CartPanel from "../../components/cart-panel"
import WishlistModal from "../../components/wishlist-modal"
import { Search, Package } from "lucide-react"

export default function TrackingSearchPage() {
  const [trackingId, setTrackingId] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingId.trim()) {
      router.push(`/tracking/${trackingId.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CartPanel />
      <WishlistModal />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto text-center">
          <Package className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-red-600 mb-4">Track Your Order</h1>
          <p className="text-gray-400 mb-8">Enter your order ID to track your package and see delivery updates</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Order ID (e.g., ORD-1234567890-abc123def)"
                className="w-full bg-gray-900 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Track Order
            </button>
          </form>

          <div className="mt-8 text-left bg-gray-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Need help finding your order ID?</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Check your email confirmation</li>
              <li>• Look in your account order history</li>
              <li>• Order IDs start with "ORD-" followed by numbers and letters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
