"use client"

import { useState, useEffect } from "react"

interface SinisterRedEyesProps {
  className?: string
  size?: "sm" | "md" | "lg"
  animate?: boolean
}

export default function SinisterRedEyes({ className = "", size = "md", animate = true }: SinisterRedEyesProps) {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    if (!animate) return

    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 200)
      },
      3000 + Math.random() * 2000,
    ) // Random blink between 3-5 seconds

    return () => clearInterval(blinkInterval)
  }, [animate])

  const sizeClasses = {
    sm: "w-16 h-8",
    md: "w-24 h-12",
    lg: "w-32 h-16",
  }

  const eyeSize = {
    sm: { width: 24, height: 12, pupil: 8 },
    md: { width: 36, height: 18, pupil: 12 },
    lg: { width: 48, height: 24, pupil: 16 },
  }

  const { width, height, pupil } = eyeSize[size]

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Left Eye - Pure red glow with black center */}
      <div className="absolute left-0 top-0" style={{ width: width, height: height }}>
        <div
          className={`relative transition-all duration-200 ${isBlinking ? "scale-y-10" : "scale-y-100"}`}
          style={{
            width: width,
            height: height,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "transparent",
              boxShadow: `
                0 0 15px rgba(220, 38, 38, 1),
                0 0 25px rgba(220, 38, 38, 0.8),
                0 0 35px rgba(220, 38, 38, 0.6),
                inset 0 0 10px rgba(220, 38, 38, 0.9)
              `,
              borderRadius: "50%",
              width: width,
              height: height,
            }}
          />

          {/* Black pupil - larger and more prominent */}
          <div
            className={`absolute bg-black rounded-full transition-all duration-200 ${
              isBlinking ? "scale-0" : "scale-100"
            }`}
            style={{
              width: pupil * 1.2,
              height: pupil * 1.2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 5px rgba(0, 0, 0, 1)",
            }}
          />
        </div>
      </div>

      {/* Right Eye - Pure red glow with black center */}
      <div className="absolute right-0 top-0" style={{ width: width, height: height }}>
        <div
          className={`relative transition-all duration-200 ${isBlinking ? "scale-y-10" : "scale-y-100"}`}
          style={{
            width: width,
            height: height,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "transparent",
              boxShadow: `
                0 0 15px rgba(220, 38, 38, 1),
                0 0 25px rgba(220, 38, 38, 0.8),
                0 0 35px rgba(220, 38, 38, 0.6),
                inset 0 0 10px rgba(220, 38, 38, 0.9)
              `,
              borderRadius: "50%",
              width: width,
              height: height,
            }}
          />

          {/* Black pupil - larger and more prominent */}
          <div
            className={`absolute bg-black rounded-full transition-all duration-200 ${
              isBlinking ? "scale-0" : "scale-100"
            }`}
            style={{
              width: pupil * 1.2,
              height: pupil * 1.2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 5px rgba(0, 0, 0, 1)",
            }}
          />
        </div>
      </div>

      {animate && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)",
            filter: "blur(8px)",
            transform: "scale(1.8)",
          }}
        />
      )}
    </div>
  )
}

export { SinisterRedEyes }
