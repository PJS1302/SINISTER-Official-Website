"use client"

import Link from "next/link"
import { useCart } from "../contexts/cart-context"
import { useWishlist } from "../contexts/wishlist-context"
import { useAuth } from "../contexts/auth-context"
import { ShoppingBag, Heart, Search, User, LogOut } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const { state: cartState, toggleCart } = useCart()
  const { state: wishlistState, toggleModal } = useWishlist()
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <header className="flex items-center justify-between p-6 border-b border-red-900 bg-black">
      <div className="flex items-center space-x-8">
        <Link href="/" className="relative">
          <span className="font-creepster text-3xl text-red-600">SINISTER</span>
        </Link>
        <nav className="flex space-x-6">
          <Link href="/" className="hover:text-red-400 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-red-400 transition-colors">
            About
          </Link>
          <Link href="/shop" className="hover:text-red-400 transition-colors">
            Shop
          </Link>
          <Link href="/orders" className="hover:text-red-400 transition-colors">
            Orders
          </Link>
          <Link href="/gallery" className="hover:text-red-400 transition-colors">
            Gallery
          </Link>
          <Link href="/analytics" className="hover:text-red-400 transition-colors">
            Analytics
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <button onClick={toggleModal} className="relative text-white hover:text-red-400 transition-colors">
          <Heart className="h-6 w-6" />
          {wishlistState.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {wishlistState.items.length}
            </span>
          )}
        </button>

        <button onClick={toggleCart} className="relative text-white hover:text-red-400 transition-colors">
          <ShoppingBag className="h-6 w-6" />
          {cartState.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartState.items.length}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
          >
            <User className="h-6 w-6" />
            {user && <span className="text-sm">{user.name}</span>}
          </button>

          {showUserMenu && user && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-red-900 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-red-900">
                <p className="text-sm text-gray-300">Signed in as</p>
                <p className="text-sm font-medium text-white">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-left text-red-400 hover:bg-red-900 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
