"use client"

import Header from "../../components/header"
import CartPanel from "../../components/cart-panel"
import WishlistModal from "../../components/wishlist-modal"
import { Skull, Users, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <CartPanel />
      <WishlistModal />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-red-600 mb-6">About Sinister</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Welcome to the dark side of merchandise. We are your premier destination for horror-inspired collectibles,
              apparel, and art that celebrates the macabre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Born from a passion for the darker side of cinema and art, Sinister was founded by horror enthusiasts
                  who wanted to create a space where fans could find authentic, high-quality merchandise that truly
                  captures the essence of fear.
                </p>
                <p>
                  From classic horror movie memorabilia to contemporary dark art, we curate collections that speak to
                  the soul of every horror aficionado. Our mission is to bring the shadows to light through carefully
                  selected items that celebrate the beauty in darkness.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <Skull className="h-16 w-16 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Why Choose Sinister?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Authentic horror merchandise from trusted sources
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Exclusive limited edition collectibles
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Support for independent horror artists
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Fast, secure shipping worldwide
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-gray-900 rounded-lg p-8">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">
                Join thousands of horror fans in our growing community of collectors and enthusiasts.
              </p>
            </div>

            <div className="text-center bg-gray-900 rounded-lg p-8">
              <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-400">
                Every item is carefully inspected to ensure it meets our high standards for authenticity and quality.
              </p>
            </div>

            <div className="text-center bg-gray-900 rounded-lg p-8">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Passion</h3>
              <p className="text-gray-400">
                We're not just a store - we're horror fans serving horror fans with genuine passion and expertise.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Join the Darkness</h2>
            <p className="text-gray-300 mb-6">
              Ready to explore our collection of horror treasures? From vintage movie posters to contemporary dark art,
              we have something to satisfy every taste for the macabre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors inline-block"
              >
                Browse Collection
              </a>
              <a
                href="/gallery"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors inline-block"
              >
                View Fan Gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
