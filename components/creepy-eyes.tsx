"use client"

import { useEffect, useState } from "react"

export default function CreepyEyes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isStaring, setIsStaring] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const startStaring = () => {
      setIsStaring(true)
      setTimeout(() => setIsStaring(false), 2000 + Math.random() * 3000)
    }

    // Initial window size
    updateWindowSize()

    const staringInterval = setInterval(startStaring, 5000 + Math.random() * 10000)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", updateWindowSize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", updateWindowSize)
      clearInterval(staringInterval)
    }
  }, [])

  const calculateEyePosition = (eyeX: number, eyeY: number) => {
    if (isStaring) {
      // Death stare - eyes look directly forward
      return { x: 0, y: 0 }
    }

    const deltaX = mousePosition.x - eyeX
    const deltaY = mousePosition.y - eyeY
    const angle = Math.atan2(deltaY, deltaX)
    const distance = Math.min(8, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 20)

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    }
  }

  const leftEyeX = windowSize.width / 2 - 64
  const rightEyeX = windowSize.width / 2 + 64
  const eyeY = 50

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div className="relative">
        {/* Left Eye */}
        <div className="absolute -left-16 top-0 w-12 h-12 bg-white rounded-full border-2 border-red-600 shadow-2xl">
          <div
            className={`w-6 h-6 bg-red-600 rounded-full transition-all duration-300 ${
              isStaring ? "animate-pulse bg-red-700" : ""
            }`}
            style={{
              transform: `translate(${12 + calculateEyePosition(leftEyeX, eyeY).x}px, ${12 + calculateEyePosition(leftEyeX, eyeY).y}px)`,
            }}
          >
            <div
              className={`w-3 h-3 bg-black rounded-full absolute top-1.5 left-1.5 ${isStaring ? "animate-pulse" : ""}`}
            ></div>
            {isStaring && <div className="absolute -inset-2 bg-red-600 rounded-full opacity-30 animate-ping"></div>}
          </div>
        </div>

        {/* Right Eye */}
        <div className="absolute -right-16 top-0 w-12 h-12 bg-white rounded-full border-2 border-red-600 shadow-2xl">
          <div
            className={`w-6 h-6 bg-red-600 rounded-full transition-all duration-300 ${
              isStaring ? "animate-pulse bg-red-700" : ""
            }`}
            style={{
              transform: `translate(${12 + calculateEyePosition(rightEyeX, eyeY).x}px, ${12 + calculateEyePosition(rightEyeX, eyeY).y}px)`,
            }}
          >
            <div
              className={`w-3 h-3 bg-black rounded-full absolute top-1.5 left-1.5 ${isStaring ? "animate-pulse" : ""}`}
            ></div>
            {isStaring && <div className="absolute -inset-2 bg-red-600 rounded-full opacity-30 animate-ping"></div>}
          </div>
        </div>

        {isStaring && (
          <>
            <div className="absolute -left-16 top-12 w-1 h-8 bg-gradient-to-b from-red-600 to-red-800 rounded-full animate-pulse opacity-80">
              <div className="absolute bottom-0 w-2 h-2 bg-red-600 rounded-full transform translate-x-[-2px]"></div>
            </div>
            <div className="absolute -right-16 top-12 w-1 h-8 bg-gradient-to-b from-red-600 to-red-800 rounded-full animate-pulse opacity-80">
              <div className="absolute bottom-0 w-2 h-2 bg-red-600 rounded-full transform translate-x-[-2px]"></div>
            </div>
          </>
        )}

        <div className="absolute -left-20 -top-2 w-16 h-16 bg-red-900 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute -right-20 -top-2 w-16 h-16 bg-red-900 rounded-full opacity-10 blur-xl"></div>
      </div>
    </div>
  )
}
