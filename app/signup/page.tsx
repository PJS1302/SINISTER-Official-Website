"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          loggedIn: true,
        }),
      )
      setIsLoading(false)
      router.push("/")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className="font-creepster text-4xl md:text-6xl text-red-600 blood-drip">
              JOIN THE CULT
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
              <span className="blood-drop"></span>
            </h1>
          </div>
          <p className="text-gray-400 mt-4">Become part of the horror family</p>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg border-2 border-red-900 shadow-2xl relative overflow-hidden">
          {/* Blood splatter decorations */}
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80"></div>

          {/* Realistic blood drops */}
          <div className="absolute top-2 left-1/4 w-6 h-8 bg-red-600 rounded-full opacity-70 transform rotate-12"></div>
          <div className="absolute top-4 right-1/3 w-4 h-6 bg-red-700 rounded-full opacity-60 transform -rotate-6"></div>
          <div className="absolute bottom-2 left-1/3 w-5 h-7 bg-red-600 rounded-full opacity-65 transform rotate-45"></div>
          <div className="absolute bottom-4 right-1/4 w-3 h-5 bg-red-700 rounded-full opacity-55 transform -rotate-12"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="creepy-input w-full px-4 py-3 rounded-lg"
                placeholder="Enter your name..."
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="creepy-input w-full px-4 py-3 rounded-lg"
                placeholder="Enter your email..."
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="creepy-input w-full px-4 py-3 pr-12 rounded-lg"
                  placeholder="Create a password..."
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="creepy-input w-full px-4 py-3 pr-12 rounded-lg"
                  placeholder="Confirm your password..."
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="creepy-button w-full py-3 px-4 rounded-lg font-semibold text-lg"
            >
              {isLoading ? "JOINING THE DARKNESS..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-6 text-center relative z-10">
            <p className="text-gray-400">
              Already part of the cult?{" "}
              <Link href="/login" className="text-red-400 hover:text-red-300 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
