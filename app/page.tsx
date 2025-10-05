"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "../components/header"
import CartPanel from "../components/cart-panel"
import WishlistModal from "../components/wishlist-modal"
import AuthGuard from "../components/auth-guard"

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 29,
    hours: 23,
    minutes: 45,
    seconds: 1,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <CartPanel />
        <WishlistModal />

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <div className="relative mb-8">
            <h1 className="font-creepster text-6xl md:text-8xl lg:text-9xl text-red-600 drop-shadow-lg blood-drip">
              FEAR LIVES IN THE
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
            </h1>
          </div>
          <div className="relative mb-12">
            <h2 className="font-creepster text-6xl md:text-8xl lg:text-9xl text-red-600 drop-shadow-lg blood-drip">
              SHADOWS
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
            </h2>
          </div>

          <div className="w-full max-w-4xl h-1 bg-red-600 mb-8"></div>

          <p className="text-xl mb-12">The terror arrives in...</p>

          {/* Countdown Timer */}
          <div className="flex space-x-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-sm uppercase tracking-wider">DAYS</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-sm uppercase tracking-wider">HOURS</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-sm uppercase tracking-wider">MINUTES</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-sm uppercase tracking-wider">SECONDS</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-6">
            <a
              href="https://www.youtube.com/@CitProductionHouse"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 border-2 border-red-600 transition-colors"
            >
              Watch Trailer
            </a>
            <Link
              href="/shop"
              className="bg-transparent hover:bg-red-600 text-white px-8 py-3 border-2 border-red-600 transition-colors inline-block"
            >
              Explore Merchandise
            </Link>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
