"use client"

import { useWishlist } from "../contexts/wishlist-context"
import { useCart } from "../contexts/cart-context"
import { X, Heart, ShoppingCart } from "lucide-react"

export default function WishlistModal() {
  const { state, removeItem, toggleModal } = useWishlist()
  const { addItem } = useCart()

  if (!state.isModalOpen) return null

  const handleMoveToCart = (product: any) => {
    addItem(product)
    removeItem(product.id)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleModal} />
      <div className="absolute inset-4 bg-gray-900 rounded-lg shadow-xl max-w-4xl mx-auto">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 p-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <Heart className="mr-2 h-6 w-6 text-red-400" />
              Wishlist ({state.items.length})
            </h2>
            <button onClick={toggleModal} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Heart className="h-16 w-16 mb-4" />
                <p>Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.items.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-white mb-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-red-400">${item.price}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="px-4 py-2 rounded-lg border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
