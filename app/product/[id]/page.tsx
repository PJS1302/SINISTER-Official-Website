"use client"

import { useParams, useRouter } from "next/navigation"
import { useProducts } from "../../../contexts/product-context"
import { useCart } from "../../../contexts/cart-context"
import { useWishlist } from "../../../contexts/wishlist-context"
import Header from "../../../components/header"
import CartPanel from "../../../components/cart-panel"
import WishlistModal from "../../../components/wishlist-modal"
import ProductReviews from "../../../components/product-reviews"
import ProductRating from "../../../components/product-rating"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { getProductById } = useProducts()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist } = useWishlist()

  const productId = params.id as string
  const product = getProductById(productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-creepster text-red-600 mb-4">PRODUCT NOT FOUND</h1>
          <p className="text-gray-400 mb-4">This SINISTER product has vanished into the shadows.</p>
          <Button onClick={() => router.push("/shop")} className="bg-red-600 hover:bg-red-700">
            Return to Shop
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product)
  }

  const handleBuyNow = () => {
    addItem(product)
    router.push("/checkout")
  }

  const handleAddToWishlist = () => {
    addToWishlist(product)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CartPanel />
      <WishlistModal />

      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-gray-400 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden border border-red-600">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-creepster text-red-600 mb-4">{product.name}</h1>
              <ProductRating productId={product.id} size="lg" />
            </div>

            <div className="text-4xl font-bold text-green-400">₹{product.price}</div>

            <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleAddToWishlist}
                  variant="outline"
                  className={`px-6 py-3 border-2 transition-colors ${
                    isInWishlist(product.id)
                      ? "bg-red-600 border-red-600 text-white"
                      : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <Button onClick={handleBuyNow} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                Buy Now
              </Button>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">SINISTER Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Premium quality materials</li>
                <li>• Official SINISTER branding</li>
                <li>• Perfect for horror enthusiasts</li>
                <li>• Limited edition design</li>
                <li>• Fast shipping worldwide</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} productName={product.name} />
      </div>
    </div>
  )
}
