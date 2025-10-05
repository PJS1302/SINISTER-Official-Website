"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../../contexts/cart-context"
import { useWishlist } from "../../contexts/wishlist-context"
import { useProducts } from "../../contexts/product-context"
import type { Product } from "../../contexts/cart-context"
import Header from "../../components/header"
import CartPanel from "../../components/cart-panel"
import WishlistModal from "../../components/wishlist-modal"
import PromotionalBanners from "../../components/promotional-banners"
import ProductRating from "../../components/product-rating"
import { Heart, ShoppingCart, Search, Eye } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

export default function ShopPage() {
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  const { collections, searchProducts } = useProducts()
  const [selectedCollection, setSelectedCollection] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const router = useRouter()

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product)
  }

  const handleBuyNow = (product: Product) => {
    addItem(product)
    router.push("/checkout")
  }

  const handleViewProduct = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = searchProducts(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const calculateDiscount = (price: number, productId: string) => {
    // Special discounts for different product types
    if (productId.includes("st-")) return 20 // T-shirts 20% off
    if (productId.includes("sh-")) return 25 // Hoodies 25% off
    if (productId.includes("sa-")) return 15 // Accessories 15% off
    if (productId.includes("sc-")) return 30 // Collectibles 30% off
    return 10 // Default 10% off
  }

  const getDiscountedPrice = (price: number, productId: string) => {
    const discount = calculateDiscount(price, productId)
    return Math.round(price * (1 - discount / 100))
  }

  const displayProducts = searchQuery.trim() ? searchResults : collections[selectedCollection].products

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CartPanel />
      <WishlistModal />

      <div className="container mx-auto px-6 py-8">
        <PromotionalBanners />

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-creepster text-red-600">SINISTER SHOP</h1>
          </div>
          <p className="text-gray-400 text-lg">Where nightmares become reality</p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search SINISTER products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-gray-900 border-red-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Collection Tabs */}
        {!searchQuery.trim() && (
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2 bg-gray-900 p-2 rounded-lg">
              {collections.map((collection, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCollection(index)}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                    selectedCollection === index ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collection/Search Info */}
        <div className="text-center mb-6">
          {searchQuery.trim() ? (
            <p className="text-gray-400">
              Found {searchResults.length} SINISTER products for "{searchQuery}"
            </p>
          ) : (
            <div>
              <h2 className="text-2xl font-creepster text-red-500 mb-2">{collections[selectedCollection].name}</h2>
              <p className="text-gray-400">{collections[selectedCollection].description}</p>
              <Badge variant="outline" className="mt-2">
                {collections[selectedCollection].products.length} items
              </Badge>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => {
            const discountPercent = calculateDiscount(product.price, product.id)
            const discountedPrice = getDiscountedPrice(product.price, product.id)

            return (
              <div
                key={product.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors border border-gray-700 hover:border-red-600 relative"
              >
                {discountPercent > 0 && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
                    {discountPercent}% OFF
                  </div>
                )}

                <div className="relative">
                  <img
                    src={
                      product.image ||
                      `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(`SINISTER ${product.name || "/placeholder.svg"} horror merchandise with red eyes and dark gothic design`)}`
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    onClick={() => handleViewProduct(product.id)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-75 p-2"
                    size="sm"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-400">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{product.description}</p>

                  <div className="mb-3">
                    <ProductRating productId={product.id} size="sm" />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      {discountPercent > 0 ? (
                        <>
                          <span className="text-2xl font-bold text-red-500">₹{discountedPrice}</span>
                          <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                        </>
                      ) : (
                        /* Changed regular price color from green to red */
                        <span className="text-2xl font-bold text-red-500">₹{product.price}</span>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-black hover:bg-gray-800 border border-red-600 text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="bg-crimson hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-semibold"
                      style={{ backgroundColor: "#DC143C" }}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`px-3 py-2 rounded-lg border-2 transition-colors ${
                        isInWishlist(product.id)
                          ? "bg-red-600 border-red-600 text-white"
                          : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {searchQuery.trim() && searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No SINISTER products found for "{searchQuery}"</p>
            <p className="text-gray-500 text-sm mt-2">
              Try searching for t-shirts, phone cases, hoodies, or accessories
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
